// Profils des élèves sur cet appareil (un prénom, sans mot de passe) et code de sauvegarde
// pour transférer une progression d'un appareil à un autre par copier-coller.
//
// Stockage (localStorage) :
//   savoirs.profils     : { noms: [...], actif: "Léa", reglages: { "Léa": { "<niveau>": {...} } }, jours: { "Léa": [jours] } }
//   savoirs.progression : voir progression.js (une entrée par prénom)
(function () {
  const CLE = "savoirs.profils";
  const CLE_PROGRESSION = "savoirs.progression";
  const PREFIXE = "SAV1-";
  // Pour vérifier un code importé : identifiants courts (lettres, chiffres, tirets), limites de taille
  const CLE_SURE = /^[a-z0-9][a-z0-9-]{0,39}$/i;
  const COMPETENCES = ["completer", "reconstituer", "appliquer", "outil"];
  const TAILLE_MAX_CODE = 200000;
  const FICHES_MAX = 5000;

  function lire(cle, defaut) {
    try {
      const v = JSON.parse(localStorage.getItem(cle));
      return v == null ? defaut : v;
    } catch (e) { return defaut; }
  }

  function ecrire(cle, valeur) {
    try { localStorage.setItem(cle, JSON.stringify(valeur)); return true; } catch (e) { return false; }
  }

  function etat() {
    const e = lire(CLE, {});
    e.noms = e.noms || [];
    e.reglages = e.reglages || {};
    e.jours = e.jours || {};
    return e;
  }

  // Texte <-> base64, en passant par l'UTF-8 (pour les accents des prénoms)
  function versBase64(texte) {
    const octets = new TextEncoder().encode(texte);
    let bin = "";
    for (const o of octets) bin += String.fromCharCode(o);
    return btoa(bin);
  }
  function depuisBase64(b64) {
    const bin = atob(b64);
    const octets = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) octets[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(octets);
  }

  // La fiche la plus récente l'emporte ; à date égale, celle qui a le plus d'historique
  function plusRecente(a, b) {
    if (!a) return b;
    if (!b) return a;
    return b.d > a.d || (b.d === a.d && b.v > a.v) ? b : a;
  }

  Savoirs.profils = {
    noms: function () { return etat().noms; },

    actif: function () {
      const e = etat();
      return e.noms.includes(e.actif) ? e.actif : null;
    },

    choisir: function (nom) {
      const e = etat();
      e.actif = nom;
      ecrire(CLE, e);
    },

    // Crée le profil et le rend actif. Renvoie un message d'erreur, ou null si tout va bien.
    ajouter: function (nom) {
      nom = String(nom || "").trim().replace(/\s+/g, " ");
      if (!nom) return "Écris ton prénom.";
      if (nom.length > 20) return "Ce prénom est trop long (20 lettres au plus).";
      const e = etat();
      if (e.noms.some((n) => n.toLowerCase() === nom.toLowerCase())) return "Ce prénom existe déjà sur cet appareil.";
      e.noms.push(nom);
      e.actif = nom;
      ecrire(CLE, e);
      return null;
    },

    supprimer: function (nom) {
      const e = etat();
      e.noms = e.noms.filter((n) => n !== nom);
      delete e.reglages[nom];
      delete e.jours[nom];
      if (e.actif === nom) e.actif = null;
      ecrire(CLE, e);
      const p = lire(CLE_PROGRESSION, {});
      delete p[nom];
      ecrire(CLE_PROGRESSION, p);
    },

    reglages: function (nom, idNiveau) {
      return (etat().reglages[nom] || {})[idNiveau] || null;
    },

    enregistrerReglages: function (nom, idNiveau, reglages) {
      const e = etat();
      e.reglages[nom] = e.reglages[nom] || {};
      e.reglages[nom][idNiveau] = reglages;
      ecrire(CLE, e);
    },

    // Jours où l'élève a travaillé (pour un petit encouragement, jamais une punition)
    noterJour: function (nom, jour) {
      const e = etat();
      const j = e.jours[nom] = e.jours[nom] || [];
      if (!j.includes(jour)) j.push(jour);
      e.jours[nom] = j.slice(-60);
      ecrire(CLE, e);
    },

    jours: function (nom) {
      return etat().jours[nom] || [];
    },

    // ---------- Code de sauvegarde ----------

    // Pour que le code reste court (à envoyer par message), chaque compétence est écrite en une ligne :
    // "id:boîte.vus.justes.jour,id:…" où le jour est compté à partir du plus ancien (base).
    exporter: function (nom) {
      const prog = lire(CLE_PROGRESSION, {})[nom] || {};
      let base = Infinity;
      for (const n in prog) for (const c in prog[n]) for (const id in prog[n][c]) base = Math.min(base, prog[n][c][id].d);
      if (!isFinite(base)) base = 0;
      const compact = {};
      for (const n in prog) {
        compact[n] = {};
        for (const c in prog[n]) {
          compact[n][c] = Object.keys(prog[n][c]).map((id) => {
            const f = prog[n][c][id];
            return id + ":" + f.b + "." + f.v + "." + f.j + "." + (f.d - base);
          }).join(",");
        }
      }
      const donnees = { v: 1, nom: nom, base: base, progression: compact, reglages: etat().reglages[nom] || {} };
      return PREFIXE + versBase64(JSON.stringify(donnees));
    },

    // Version du code utilisable dans un lien (base64 « URL » : - et _ au lieu de + et /, sans =)
    codePourLien: function (code) {
      return PREFIXE + code.slice(PREFIXE.length).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    },

    // Décode un code collé (ou venu d'un lien) ; lève une erreur au message compréhensible s'il est abîmé
    // Le code peut venir de n'importe qui (lien reçu par message) : tout ce qui ne ressemble pas exactement
    // à une sauvegarde de MémoMaths est refusé, et seuls les champs attendus sont gardés.
    lireCode: function (code) {
      const brut = String(code || "").replace(/\s+/g, "");
      if (!brut) throw new Error("Colle d'abord un code.");
      if (!brut.startsWith(PREFIXE)) throw new Error("Ce texte n'est pas un code de sauvegarde de MémoMaths.");
      const abime = new Error("Ce code est incomplet ou abîmé : recopie-le en entier.");
      if (brut.length > TAILLE_MAX_CODE) throw abime;
      let b64 = brut.slice(PREFIXE.length).replace(/-/g, "+").replace(/_/g, "/");
      while (b64.length % 4) b64 += "=";
      let d;
      try { d = JSON.parse(depuisBase64(b64)); } catch (e) { d = null; }
      if (!d || typeof d !== "object" || d.v !== 1 || typeof d.nom !== "string" || !Number.isInteger(d.base) || d.base < 0 ||
          !d.progression || typeof d.progression !== "object" || Array.isArray(d.progression)) throw abime;
      const nom = d.nom.trim().replace(/\s+/g, " ");
      if (!nom || nom.length > 20) throw abime;
      // Retour au format des fiches { b, v, j, d }
      const progression = {};
      let nbFiches = 0;
      for (const n of Object.keys(d.progression)) {
        if (!CLE_SURE.test(n) || typeof d.progression[n] !== "object" || !d.progression[n]) throw abime;
        progression[n] = {};
        for (const c of Object.keys(d.progression[n])) {
          if (!COMPETENCES.includes(c)) throw abime;
          const fiches = progression[n][c] = {};
          const texte = d.progression[n][c];
          if (typeof texte !== "string") throw abime;
          for (const morceau of texte ? texte.split(",") : []) {
            const [id, valeurs] = morceau.split(":");
            const v = (valeurs || "").split(".").map(Number);
            if (!CLE_SURE.test(id || "") || v.length !== 4 || v.some((x) => !Number.isInteger(x) || x < 0 || x > 1e6)) throw abime;
            if (++nbFiches > FICHES_MAX) throw abime;
            fiches[id] = { b: Math.min(v[0], 5), v: v[1], j: Math.min(v[2], v[1]), d: v[3] + d.base };
          }
        }
      }
      // Réglages : seulement le niveau et les choix de chapitre et de mode, sous forme de courts identifiants
      const reglages = {};
      if (d.reglages && typeof d.reglages === "object") {
        for (const n of Object.keys(d.reglages)) {
          const r = d.reglages[n];
          if (!CLE_SURE.test(n) || !r || typeof r !== "object") continue;
          const propre = {};
          for (const k of ["niveau", "jusqua", "lien", "mode"]) if (typeof r[k] === "string" && CLE_SURE.test(r[k])) propre[k] = r[k];
          reglages[n] = propre;
        }
      }
      return { v: 1, nom: nom, base: d.base, progression: progression, reglages: reglages };
    },

    // Ajoute la progression d'un code au profil nomCible (créé s'il n'existe pas), sans rien perdre :
    // pour chaque savoir, la fiche la plus récente est gardée.
    importer: function (donnees, nomCible) {
      if (!this.noms().includes(nomCible)) {
        const erreur = this.ajouter(nomCible);
        if (erreur) return erreur;
      }
      const p = lire(CLE_PROGRESSION, {});
      const cible = p[nomCible] = p[nomCible] || {};
      for (const idNiveau in donnees.progression) {
        const niveau = cible[idNiveau] = cible[idNiveau] || {};
        for (const comp in donnees.progression[idNiveau]) {
          const fiches = niveau[comp] = niveau[comp] || {};
          const nouvelles = donnees.progression[idNiveau][comp];
          for (const id in nouvelles) fiches[id] = plusRecente(fiches[id], nouvelles[id]);
        }
      }
      if (!ecrire(CLE_PROGRESSION, p)) return "Impossible d'enregistrer sur cet appareil (stockage plein ou bloqué).";
      const e = etat();
      if (!e.reglages[nomCible] && donnees.reglages) e.reglages[nomCible] = donnees.reglages;
      e.actif = nomCible;
      ecrire(CLE, e);
      return null;
    }
  };
})();
