// Les écrans de MémoMaths : prénom, accueil, séance de 10 cartes, fin de séance, « Mon bilan », menu.
(function () {
  const m = Savoirs.maths;
  const profils = Savoirs.profils;
  const ecran = document.getElementById("ecran");
  const barreSeance = document.getElementById("barre-seance");
  const menu = document.getElementById("menu");

  const NB_CARTES = 10;
  const MIN_CARTES = 6;        // en dessous, un mode est grisé à l'accueil
  const POIDS_REVISION = 0.3;  // chance d'être tiré d'un savoir des années précédentes, par rapport à un savoir de l'année
  const ANNEES = ["6e", "5e", "4e", "3e"];
  const COMPETENCES = ["completer", "reconstituer", "appliquer", "outil", "rappel"];
  const TYPES = { formule: "Formule", propriete: "Propriété", definition: "Définition", regle: "Règle", technique: "Entraînement" };
  const BRAVO = ["Bravo !", "Exact !", "C'est ça !", "Bien vu !", "Parfait !"];
  const CLE_NIVEAU = "savoirs.niveau";
  const CLE_APPARENCE = "savoirs.apparence";

  let joueur = profils.actif();
  let niveau = null;   // données du niveau chargé
  let entree = null;   // son entrée dans le catalogue (themes)
  let progression = null;
  let seance = null;
  let lien = lireLien();

  // ---------- Petits outils ----------

  function hasard(liste) { return liste[Math.floor(Math.random() * liste.length)]; }
  function pluriel(n, mot, motPluriel) { return n + " " + (n > 1 ? (motPluriel || mot + "s") : mot); }
  function lireLocal(cle) { try { return localStorage.getItem(cle); } catch (e) { return null; } }
  function ecrireLocal(cle, v) { try { localStorage.setItem(cle, v); } catch (e) { /* stockage refusé */ } }

  // Les écrans autres que l'accueil ajoutent une étape dans l'historique :
  // le bouton « retour » du téléphone ramène alors à l'accueil au lieu de quitter le site.
  function afficher(html, classe) {
    const racine = classe === "ecran-accueil" || (classe === "ecran-prenom" && !joueur);
    if (!racine && !(history.state && history.state.memo)) history.pushState({ memo: 1 }, "");
    ecran.className = classe || "";
    ecran.innerHTML = html;
    ecran.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  function surClic(selecteur, action) {
    const el = ecran.querySelector(selecteur);
    if (el) el.addEventListener("click", action);
  }

  // Lien de l'enseignant (…/#niveau=4e&jusqua=pyth, ou …/#niveau=3e&reviser=thal pour réviser un chapitre) :
  // la partie après # reste sur l'appareil
  function lireLien() {
    const p = new URLSearchParams(location.hash.slice(1));
    if (!p.get("niveau") && !p.get("jusqua") && !p.get("reviser")) return null;
    history.replaceState(history.state, "", location.pathname + location.search);
    return { niveau: p.get("niveau"), jusqua: p.get("jusqua"), reviser: p.get("reviser") };
  }

  // Après le chargement : lancer la révision demandée par le lien, sinon l'accueil
  function apresLien() {
    if (lien && lien.reviser && joueur && chapitre(lien.reviser)) {
      const id = lien.reviser;
      lien.reviser = null;
      reviser(id);
      return;
    }
    accueil();
  }

  // ---------- Niveau, chapitres, déblocage ----------

  function reglages() { return profils.reglages(joueur, niveau.id) || {}; }
  function changerReglages(changement) { profils.enregistrerReglages(joueur, niveau.id, Object.assign(reglages(), changement)); }

  function chapitre(id) { return niveau.chapitres.find((c) => c.id === id); }
  // Couleur du thème : elle est donnée par le catalogue du niveau d'où vient le chapitre
  function theme(idChap) {
    const c = chapitre(idChap);
    const origine = c && Savoirs.catalogue.find((e) => e.id === c.origine);
    return (c && origine && (origine.themes || {})[c.idTheme]) || "nombres";
  }
  function anterieur(chap) { return ANNEES.indexOf(chap.annee) < ANNEES.indexOf(niveau.niveau); }
  function chapitresAnnee() {
    return niveau.chapitres.filter((c) => !anterieur(c)).sort((a, b) => a.ordre - b.ordre);
  }
  // Années révisées en plus de celle-ci (« 5e et 4e » en 3e), d'après les chapitres de révision
  function anneesRevisees() {
    return [...new Set(niveau.chapitres.filter((c) => c.revision).map((c) => c.origine))].sort((a, b) => ANNEES.indexOf(a) - ANNEES.indexOf(b));
  }

  // Chapitre atteint choisi par l'élève (sinon celui du lien, sinon le premier)
  function chapitreChoisi() {
    const r = reglages();
    return chapitre(r.jusqua) || chapitre(r.lien) || chapitresAnnee()[0];
  }

  function debloque(chap) { return anterieur(chap) || chap.ordre <= chapitreChoisi().ordre; }
  function savoirsJouables() { return niveau.savoirs.filter((s) => debloque(chapitre(s.chap))); }

  // Mélange des années : en 3e, on joue aussi les savoirs de 4e et de 5e (en 4e, ceux de 5e), comme des
  // chapitres de révision toujours débloqués. Un savoir présent dans plusieurs années (même id) n'est gardé
  // qu'une fois, dans sa version la plus récente ; sa progression est commune (voir progression.js).
  // Les chapitres de révision prennent l'id « 4e:pyth » pour ne pas se confondre avec ceux de l'année.
  function combiner(id) {
    const base = Savoirs.niveaux[id];
    const avant = Savoirs.catalogue
      .filter((e) => ANNEES.indexOf(e.id) < ANNEES.indexOf(base.niveau) && Savoirs.niveaux[e.id])
      .sort((a, b) => ANNEES.indexOf(b.id) - ANNEES.indexOf(a.id)); // la plus récente d'abord
    const ids = new Set(base.savoirs.map((s) => s.id));
    const enonces = new Set(base.outils.map((o) => o.enonce));
    // Techniques d'entraînement : la clé « t-4e-prod-deux » sert à la progression (même clé dans tous les niveaux)
    const techniquesDe = (idNiveau, pre) => (Savoirs.techniques[idNiveau] || []).map((t) =>
      Object.assign({}, t, { chap: pre + t.chap, cle: "t-" + idNiveau + "-" + t.id }));
    const n = {
      id: base.id, titre: base.titre, niveau: base.niveau,
      chapitres: base.chapitres.map((c) => Object.assign({}, c, { origine: base.id, idTheme: c.id })),
      savoirs: base.savoirs.slice(), outils: base.outils.slice(), techniques: techniquesDe(base.id, "")
    };
    for (const e of avant) {
      const d = Savoirs.niveaux[e.id], pre = e.id + ":";
      for (const c of d.chapitres) n.chapitres.push({ id: pre + c.id, titre: c.titre, ordre: c.ordre, annee: e.id, origine: e.id, idTheme: c.id, revision: true });
      for (const s of d.savoirs) if (!ids.has(s.id)) { ids.add(s.id); n.savoirs.push(Object.assign({}, s, { chap: pre + s.chap })); }
      for (const o of d.outils) if (!enonces.has(o.enonce)) { enonces.add(o.enonce); n.outils.push(Object.assign({}, o, { id: pre + o.id, chap: pre + o.chap })); }
      n.techniques = n.techniques.concat(techniquesDe(e.id, pre));
    }
    return n;
  }

  function chargerNiveau(id) {
    entree = Savoirs.catalogue.find((n) => n.id === id) || Savoirs.catalogue[0];
    const aCharger = Savoirs.catalogue.filter((e) => ANNEES.indexOf(e.id) <= ANNEES.indexOf(entree.id));
    return Promise.all(aCharger.map((e) => Savoirs.charger(e.id))).then(() => {
      niveau = combiner(entree.id);
      ecrireLocal(CLE_NIVEAU, entree.id);
      // Le niveau est aussi retenu pour chaque prénom (frère et sœur sur la même tablette)
      if (joueur) profils.enregistrerReglages(joueur, "general", { niveau: entree.id });
      progression = joueur ? new Savoirs.Progression(joueur) : null;
    });
  }

  // Le lien de l'enseignant pré-sélectionne son chapitre (sans jamais revenir en arrière sur le choix de l'élève)
  function appliquerLien() {
    if (!lien || !joueur || !niveau || (lien.niveau && lien.niveau !== niveau.id)) return;
    const chap = chapitre(lien.jusqua);
    if (!chap) return;
    const choisi = chapitre(reglages().jusqua);
    changerReglages({ lien: chap.id, jusqua: !choisi || choisi.ordre < chap.ordre ? chap.id : choisi.id });
    lien.jusqua = null;
  }

  // ---------- Dessin d'une rosace en vitrail (un triangle par savoir) ----------

  // Polygone régulier découpé en triangles depuis le centre, côté du haut horizontal.
  // Moins de 6 savoirs : chaque savoir est répété (triangles k, k + n, k + 2n…) pour garder
  // au moins 6 vitraux et une figure symétrique, comme une vraie rosace.
  function rosace(etats, idTheme, verrouille) {
    const n = Math.max(etats.length, 1);
    const cotes = n * Math.ceil(6 / n);
    const R = 44;
    const point = (k) => {
      const a = (-90 - 180 / cotes + 360 * k / cotes) * Math.PI / 180;
      return (50 + R * Math.cos(a)).toFixed(1) + " " + (50 + R * Math.sin(a)).toFixed(1);
    };
    let vitraux = "";
    for (let k = 0; k < cotes; k++) {
      vitraux += '<path class="p-' + (etats[k % n] || "nouveau") + '" d="M50 50 L' + point(k) + " L" + point(k + 1) + 'Z"/>';
    }
    return '<svg class="rosace theme-' + idTheme + (verrouille ? " verrouillee" : "") + '" viewBox="0 0 100 100" aria-hidden="true">' +
      vitraux + '<circle class="coeur" cx="50" cy="50" r="' + (n > 10 ? 9 : 7) + '"/></svg>';
  }

  function etatsChapitre(chap) {
    return niveau.savoirs.filter((s) => s.chap === chap.id).map((s) => progression.etatSavoir(COMPETENCES, s.id));
  }

  // ---------- Écran du prénom ----------

  function ecranPrenom() {
    barreSeance.hidden = true;
    const noms = profils.noms();
    afficher(
      '<section class="bienvenue">' +
      '<h1>' + (noms.length ? "Qui révise ?" : "Bienvenue !") + "</h1>" +
      (noms.length ? '<div class="liste-profils">' + noms.map((n, i) =>
        '<button class="bouton-profil" data-i="' + i + '"><span class="initiale" aria-hidden="true">' + m.echapper(n.charAt(0).toUpperCase()) + "</span>" + m.echapper(n) + "</button>").join("") + "</div>" +
        '<p class="separateur">ou</p>' : "") +
      '<form id="form-prenom" class="bloc">' +
      '<label class="champ"><span>' + (noms.length ? "Nouveau prénom" : "Comment t'appelles-tu ?") + "</span>" +
      '<input id="prenom" autocomplete="off" maxlength="20" placeholder="Ton prénom ou un pseudo" aria-describedby="aide-prenom"></label>' +
      '<p id="aide-prenom" class="aide aide-prenom">Ton prénom ou un pseudo, comme tu préfères.</p>' +
      // La classe dès le départ : sinon un élève de 5e ou de 3e commence sans le savoir en 4e
      (Savoirs.catalogue.length > 1
        ? '<div class="champ"><span id="titre-classe">Ta classe</span><div class="interrupteur choix-niveau" role="group" aria-labelledby="titre-classe">' +
          Savoirs.catalogue.map((n) => '<button type="button" data-classe="' + n.id + '" aria-pressed="' + (n.id === niveau.id) + '">' + m.echapper(n.titre) + "</button>").join("") +
          "</div></div>"
        : "") +
      '<p id="erreur-prenom" class="erreur" role="alert"></p>' +
      '<button class="bouton-principal" type="submit">C\'est parti</button>' +
      "</form>" +
      '<div class="actions"><button class="bouton-lien" data-action="recuperer">J\'ai déjà une progression sur un autre appareil</button></div>' +
      "</section>", "ecran-prenom");
    surClic('[data-action="recuperer"]', sauvegarde);

    ecran.querySelectorAll(".bouton-profil").forEach((b) => b.addEventListener("click", () => {
      profils.choisir(noms[+b.dataset.i]);
      changerJoueur();
    }));
    let classe = niveau.id;
    ecran.querySelectorAll("[data-classe]").forEach((b) => b.addEventListener("click", () => {
      classe = b.dataset.classe;
      ecran.querySelectorAll("[data-classe]").forEach((x) => x.setAttribute("aria-pressed", x === b));
    }));
    ecran.querySelector("#form-prenom").addEventListener("submit", (e) => {
      e.preventDefault();
      const erreur = profils.ajouter(ecran.querySelector("#prenom").value);
      if (erreur) { ecran.querySelector("#erreur-prenom").textContent = erreur; return; }
      profils.enregistrerReglages(profils.actif(), "general", { niveau: classe });
      changerJoueur();
    });
    if (!noms.length) ecran.querySelector("#prenom").focus();
  }

  function changerJoueur() {
    joueur = profils.actif();
    const sien = (profils.reglages(joueur, "general") || {}).niveau;
    chargerNiveau((lien && lien.niveau) || sien || niveau.id).then(() => {
      appliquerLien();
      apresLien();
    });
  }

  // ---------- Accueil ----------

  function accueil() {
    // Revenir en arrière dans l'historique : l'accueil est alors affiché par l'événement popstate
    if (history.state && history.state.memo) { history.back(); return; }
    if (!joueur) return ecranPrenom();
    seance = null;
    barreSeance.hidden = true;
    const r = reglages();
    const choisi = chapitreChoisi();
    const modeChoisi = modeActuel();
    const jouables = savoirsJouables();
    const revisees = anneesRevisees();
    const sus = jouables.filter((s) => progression.etatSavoir(COMPETENCES, s.id) === "su").length;

    // Deux boutons : « J'apprends » (toujours jouable) et « Je m'entraîne » (grisé s'il a moins de 6 cartes)
    const modes = modesVisibles().map((md) => md === modesVisibles()[0] || nbCartes(md) >= MIN_CARTES
      ? '<button class="puce-mode" role="radio" aria-checked="' + (md === modeChoisi) + '" data-mode="' + md.id + '">' + md.titre + "</button>"
      : '<button class="puce-mode" disabled>' + md.titre + " <small>pas encore assez de cartes</small></button>").join("");

    // Aperçu des rosaces : les 12 chapitres débloqués les plus récents
    const rosaces = niveau.chapitres.filter((c) => !c.revision).sort((a, b) => a.ordre - b.ordre).filter(debloque).slice(-12)
      .map((c) => rosace(etatsChapitre(c), theme(c.id))).join("");

    afficher(
      '<section class="accueil">' +
      '<h1 class="bonjour">Bonjour <span>' + m.echapper(joueur) + "</span></h1>" +
      '<p class="sous-titre">' + NB_CARTES + " cartes pour réviser tes savoirs de maths, à ton rythme.</p>" +
      '<div class="bloc reglages">' +
      (Savoirs.catalogue.length > 1
        ? '<div class="champ"><span id="titre-niveau">Mon niveau</span><div class="interrupteur choix-niveau" role="group" aria-labelledby="titre-niveau">' +
          Savoirs.catalogue.map((n) => '<button data-niveau="' + n.id + '" aria-pressed="' + (n.id === niveau.id) + '">' + m.echapper(n.titre) + "</button>").join("") +
          "</div></div>"
        : "") +
      '<label class="champ"><span>Où en es-tu dans le programme ?</span><select id="choix-chap">' + chapitresAnnee().map((c) =>
        '<option value="' + c.id + '"' + (c === choisi ? " selected" : "") + ">" + c.ordre + ". " + m.echapper(c.titre) + "</option>").join("") +
      "</select></label>" +
      '<p class="aide">' + (revisees.length ? "Avec des révisions de " + revisees.join(" et ") + " · " : "") +
      pluriel(jouables.length, "savoir") + "</p>" +
      '<p id="avertissement" class="avertissement" hidden><span aria-hidden="true">!</span> Ce chapitre n\'a peut-être pas encore été vu en classe.</p>' +
      "</div>" +
      '<h2 id="titre-modes" class="titre-modes">Que souhaites-tu faire ?</h2>' +
      '<div class="modes" role="radiogroup" aria-labelledby="titre-modes">' + modes + "</div>" +
      '<p id="description-mode" class="description-mode" aria-live="polite">' + m.echapper(modeChoisi.description) + "</p>" +
      '<button id="jouer" class="bouton-principal grand">Jouer</button>' +
      '<button id="reviser" class="bouton-lien lien-reviser">' + texteReviser(modeChoisi) + "</button>" +
      '<button id="voir-bilan" class="apercu-jardin">' +
      '<span class="mini-jardin" aria-hidden="true">' + rosaces + "</span>" +
      '<span class="apercu-texte"><strong>Mon bilan</strong><span>' +
      (sus ? pluriel(sus, "savoir su", "savoirs sus") + " sur " + jouables.length : "Tes rosaces attendent leurs premières couleurs") +
      "</span></span><span class=\"fleche\" aria-hidden=\"true\">›</span></button>" +
      '<p class="serie">' + texteSerie() + "</p>" +
      // Visible seulement quand le navigateur propose l'installation (Chrome ou Edge, sur Android ou ordinateur)
      '<button id="installer" class="bouton-secondaire bouton-installer"' + (invitation ? "" : " hidden") + ">Installer MémoMaths sur cet appareil</button>" +
      "</section>", "ecran-accueil");

    majAvertissement();
    ecran.querySelectorAll("[data-niveau]").forEach((b) => b.addEventListener("click", () => {
      if (b.dataset.niveau === niveau.id) return;
      chargerNiveau(b.dataset.niveau).then(() => {
        appliquerLien();
        accueil();
        const meme = ecran.querySelector('[data-niveau="' + b.dataset.niveau + '"]');
        if (meme) meme.focus();
      });
    }));
    ecran.querySelector("#choix-chap").addEventListener("change", (e) => { changerReglages({ jusqua: e.target.value }); accueil(); ecran.querySelector("#choix-chap").focus(); });
    ecran.querySelectorAll(".puce-mode[data-mode]").forEach((b) => b.addEventListener("click", () => {
      changerReglages({ mode: b.dataset.mode });
      ecran.querySelectorAll(".puce-mode[data-mode]").forEach((x) => x.setAttribute("aria-checked", x === b));
      const choisi = Savoirs.modes.find((md) => md.id === b.dataset.mode);
      ecran.querySelector("#description-mode").textContent = choisi.description;
      ecran.querySelector("#reviser").textContent = texteReviser(choisi);
    }));
    surClic("#jouer", () => jouer());
    surClic("#voir-bilan", bilan);
    surClic("#reviser", ecranReviser);
    surClic("#installer", installer);
  }

  // Le lien « un seul chapitre » suit le mode choisi (la séance n'est pas la même)
  function texteReviser(mode) {
    return mode.id === "appliquer" ? "M'entraîner sur un seul chapitre" : "Apprendre un seul chapitre";
  }

  function majAvertissement() {
    const lienChap = chapitre(reglages().lien);
    ecran.querySelector("#avertissement").hidden = !(lienChap && chapitreChoisi().ordre > lienChap.ordre);
  }

  // Encouragement discret : jamais de reproche quand la série s'arrête
  function texteSerie() {
    const auj = Savoirs.Progression.aujourdhui();
    const semaine = profils.jours(joueur).filter((j) => auj - j < 7).length;
    if (semaine >= 2) return "Tu as travaillé " + semaine + " jours cette semaine.";
    if (profils.jours(joueur).includes(auj)) return "Tu as déjà travaillé aujourd'hui.";
    return "";
  }

  // ---------- Séance ----------

  function cartesDuMode(mode) {
    return mode.cartes(savoirsJouables(), niveau, (idChap) => { const c = chapitre(idChap); return !!c && debloque(c); });
  }
  function nbCartes(mode) { return cartesDuMode(mode).length; }

  // Les modes proposés à l'accueil (les autres sont des formes de carte utilisées par « J'apprends »)
  function modesVisibles() { return Savoirs.modes.filter((md) => !md.interne); }

  // Le mode choisi, sauf s'il a trop peu de cartes dans les chapitres choisis : alors « J'apprends ».
  // Un ancien choix (« Je complète », « Je reconstitue », « Quel outil ? ») devient « J'apprends ».
  function modeActuel() {
    const choisi = modesVisibles().find((md) => md.id === reglages().mode);
    return choisi && nbCartes(choisi) >= MIN_CARTES ? choisi : modesVisibles()[0];
  }

  // Un seul chapitre (avant un contrôle) : selon le mode choisi, ses exercices ou ses savoirs.
  // Les cartes sont tirées par répétition espacée, en évitant de demander deux fois le même savoir.
  function reviser(idChap) {
    const chap = chapitre(idChap);
    if (!chap) { accueil(); return; }
    const duChapitre = niveau.savoirs.filter((s) => s.chap === idChap);
    const reserve = savoirsJouables().concat(duChapitre.filter((s) => !debloque(chap)));
    const ouvert = (id) => id === idChap || (chapitre(id) && debloque(chapitre(id)));

    // « Je m'entraîne » choisi et chapitre avec des techniques : seulement ses techniques, à des valeurs
    // toujours nouvelles (une technique peut revenir dans la séance), les moins sues d'abord
    const entrainement = Savoirs.modes.find((md) => md.id === "appliquer");
    if (reglages().mode === "appliquer") {
      const techniques = entrainement.cartes(reserve, niveau, ouvert).filter((c) => c.chap === idChap && c.type === "technique");
      if (techniques.length) {
        const ordre = () => techniques.map((c) => ({ c: c, cle: Math.pow(Math.random(), 1 / progression.poids("appliquer", c.id)) }))
          .sort((a, b) => b.cle - a.cle).map((x) => x.c);
        let cartes = [];
        while (cartes.length < NB_CARTES) cartes = cartes.concat(ordre());
        cartes = cartes.slice(0, NB_CARTES).map((c) => Object.assign({}, c)); // une copie par carte (chacune a sa réponse)
        seance = { cartes: cartes, modes: cartes.map(() => entrainement), i: 0, resultats: [], chapitre: idChap };
        afficherCarte();
        return;
      }
    }

    // « J'apprends » : les savoirs du chapitre (chacun sous la forme qui lui convient), puis, s'il en reste
    // moins de 10, des exercices d'entraînement du même chapitre pour compléter la séance
    const apprendre = Savoirs.modes.find((md) => md.id === "apprendre");
    const cle = (mode, carte) => Math.pow(Math.random(), 1 / progression.poids(mode.competenceDe ? mode.competenceDe(carte, progression) : mode.competence, carte.id));
    const tri = (mode, cartes) => cartes.map((c) => ({ carte: c, mode: mode, cle: cle(mode, c) })).sort((a, b) => b.cle - a.cle);
    const choisis = tri(apprendre, apprendre.cartes(reserve, niveau, ouvert).filter((c) => c.chap === idChap)).slice(0, NB_CARTES);
    const exercices = tri(entrainement, entrainement.cartes(reserve, niveau, ouvert).filter((c) => c.chap === idChap));
    for (let k = 0; exercices.length && choisis.length < NB_CARTES; k++) {
      const t = exercices[k % exercices.length];
      if (k >= exercices.length && t.carte.type !== "technique") break; // un exemple fixe ne revient pas
      choisis.push({ carte: Object.assign({}, t.carte), mode: t.mode });
    }
    if (!choisis.length) { accueil(); return; }
    seance = { cartes: choisis.map((t) => t.carte), modes: choisis.map((t) => t.mode), i: 0, resultats: [], chapitre: idChap };
    afficherCarte();
  }

  // Choisir le chapitre à réviser : ceux de l'année (et leurs acquis), dans l'ordre du cours
  function ecranReviser() {
    barreSeance.hidden = true;
    const lienChap = chapitre(reglages().lien);
    const chapitres = niveau.chapitres.filter((c) => !c.revision).sort((a, b) => a.ordre - b.ordre);
    afficher(
      '<section class="reviser"><h1>' + (reglages().mode === "appliquer" ? "M'entraîner sur un chapitre" : "Apprendre un chapitre") + "</h1>" +
      '<p class="sous-titre">' + (reglages().mode === "appliquer"
        ? "10 exercices sur ce chapitre seulement, avec des nombres toujours nouveaux."
        : "Les savoirs de ce chapitre seulement, puis quelques exercices s'il en reste de la place.") + "</p>" +
      '<div class="liste-chapitres">' + chapitres.map((c) => {
        const plusLoin = !debloque(c) && (!lienChap || c.ordre > lienChap.ordre);
        return '<button class="ligne-chapitre theme-' + theme(c.id) + '" data-chap="' + c.id + '">' + rosace(etatsChapitre(c), theme(c.id)) +
          '<span><strong>' + (c.ordre ? c.ordre + ". " : "") + m.echapper(c.titre) + "</strong>" +
          (plusLoin ? "<small>Peut-être pas encore vu en classe</small>" : "") + "</span></button>";
      }).join("") + "</div>" +
      '<div class="actions"><button class="bouton-lien" data-action="retour">Accueil</button></div></section>', "ecran-reviser");
    ecran.querySelectorAll("[data-chap]").forEach((b) => b.addEventListener("click", () => reviser(b.dataset.chap)));
    surClic('[data-action="retour"]', accueil);
  }

  // cartes (et modes) : pour refaire une liste précise (cartes ratées), sinon tirage par répétition espacée
  function jouer(cartes, modes) {
    const mode = modeActuel();
    const rattrapage = !!cartes;
    if (!cartes) {
      const possibles = cartesDuMode(mode);
      const recent = chapitreChoisi().ordre;
      // Petit bonus pour le chapitre choisi et celui d'avant ; les révisions des années précédentes
      // comptent moins, pour que l'année en cours reste la plus présente
      // « J'apprends » : la répétition espacée suit la forme de carte de chaque savoir
      const competence = mode.competenceDe ? (s) => mode.competenceDe(s, progression) : mode.competence;
      cartes = progression.choisir(competence, possibles, NB_CARTES, (s) => {
        const c = chapitre(s.chap);
        // Les techniques (exercices générés) comptent double par rapport aux exemples fixes des savoirs
        const technique = s.type === "technique" ? 2 : 1;
        if (c.revision) return POIDS_REVISION * technique;
        return (!anterieur(c) && c.ordre >= recent - 1 ? 1.5 : 1) * technique;
      });
    }
    if (!cartes.length) { accueil(); return; }
    seance = { mode: mode, cartes: cartes, modes: modes || null, i: 0, resultats: [], rattrapage: rattrapage };
    afficherCarte();
  }

  // Mode de la carte en cours (une révision de chapitre mélange les modes)
  function modeCarte(i) { return seance.modes ? seance.modes[i] : seance.mode; }

  function majBarreSeance() {
    barreSeance.hidden = false;
    barreSeance.innerHTML =
      '<span class="compteur">' + Math.min(seance.i + 1, seance.cartes.length) + " / " + seance.cartes.length + "</span>" +
      '<span class="segments" aria-hidden="true">' + seance.cartes.map((c, i) => {
        const r = seance.resultats[i];
        return '<span class="segment' + (r === true ? " juste" : r === false ? " faux" : i === seance.i ? " courant" : "") + '"></span>';
      }).join("") + "</span>";
  }

  function afficherCarte() {
    const savoir = seance.cartes[seance.i];
    const mode = modeCarte(seance.i);
    const chap = chapitre(savoir.chap);
    // « Quel outil ? » (et « J'applique » pour un savoir déjà su, une fois sur deux) : le chapitre et le type
    // du savoir donneraient la réponse, on ne les montre pas (sauf quand on révise justement ce chapitre)
    const contexte = { jouables: savoirsJouables(), niveau: niveau, progression: progression };
    const cache = !seance.chapitre && (mode.masquerChapitre || (!!mode.masquer && mode.masquer(savoir, contexte)));
    contexte.masque = cache;
    majBarreSeance();
    afficher(
      '<article class="carte theme-' + (cache ? "neutre" : theme(chap.id)) + '" data-savoir="' + savoir.id + '">' +
      '<div class="carte-tete"><span class="puce-chap">' + m.echapper(cache ? mode.etiquetteMasquee || "Problème" : chap.titre + (chap.revision ? " (" + chap.origine + ")" : "")) + "</span>" +
      '<span class="type">' + (cache ? "" : TYPES[savoir.type] || "") + "</span></div>" +
      '<div class="carte-corps"></div>' +
      '<div class="carte-pied" hidden></div>' +
      "</article>", "ecran-carte");

    const pied = ecran.querySelector(".carte-pied");
    mode.afficher(savoir, ecran.querySelector(".carte-corps"), (juste) => {
      progression.noter(mode.competenceDe ? savoir._competence : mode.competence, savoir.id, juste);
      seance.resultats[seance.i] = juste;
      majBarreSeance();
      const derniere = seance.i === seance.cartes.length - 1;
      pied.innerHTML =
        '<p class="verdict ' + (juste ? "juste" : "faux") + '"><span class="icone" aria-hidden="true">' + (juste ? "✓" : "✗") + "</span>" +
        (juste ? hasard(BRAVO) : (mode.competenceDe && savoir._messageFaux) || mode.messageFaux || "Pas tout à fait : la bonne réponse est en bleu.") + "</p>" +
        (savoir.note ? '<p class="note"><strong>' + (savoir.etiquetteNote || "À retenir") + " :</strong> " + m.texte(savoir.note) + "</p>" : "") +
        '<button id="suivant" class="bouton-principal">' + (derniere ? "Voir le bilan" : "Suivant") + "</button>";
      pied.hidden = false;
      const suivant = pied.querySelector("#suivant");
      suivant.addEventListener("click", () => {
        if (derniere) finSeance();
        else { seance.i++; afficherCarte(); }
      });
      suivant.focus({ preventScroll: true });
      pied.scrollIntoView({ block: "nearest", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }, contexte);
  }

  // ---------- Fin de séance ----------

  function finSeance() {
    profils.noterJour(joueur, Savoirs.Progression.aujourdhui());
    barreSeance.hidden = true;
    const justes = seance.cartes.filter((c, i) => seance.resultats[i]);
    const ratees = seance.cartes.filter((c, i) => !seance.resultats[i]);
    // Séance « Je m'entraîne » : on parle d'exercices réussis ; sinon de savoirs retenus
    const exercices = seance.cartes.every((c, i) => modeCarte(i).id === "appliquer");
    const reussis = exercices ? pluriel(justes.length, "exercice réussi", "exercices réussis") : pluriel(justes.length, "savoir retenu", "savoirs retenus");
    let message;
    if (!ratees.length && seance.rattrapage) message = (justes.length > 1 ? "Les " + justes.length + " cartes ratées sont rattrapées. Elles reviendront" : "La carte ratée est rattrapée. Elle reviendra") + " bientôt pour vérifier.";
    else if (!ratees.length) message = reussis + " aujourd'hui. Superbe séance !";
    else if (!justes.length) message = (exercices ? "Ces exercices" : "Ces savoirs") + " reviendront demain : c'est en se trompant qu'on apprend.";
    else message = reussis + " aujourd'hui, " + ratees.length + " à revoir demain.";

    afficher(
      '<section class="fin">' +
      '<div class="fin-tete">' +
      '<div class="fin-cercles" aria-hidden="true">' + seance.cartes.map((c, i) =>
        '<span class="rond ' + (seance.resultats[i] ? "juste" : "faux") + '">' + (seance.resultats[i] ? "✓" : "✗") + "</span>").join("") + "</div>" +
      "<h1>" + (ratees.length <= justes.length ? hasard(["Belle séance !", "Bien travaillé !"]) : "Séance terminée") + "</h1>" +
      '<p class="message">' + message + "</p></div>" +
      '<div class="actions">' +
      (ratees.length ? '<button id="refaire" class="bouton-principal">Refaire ' + (ratees.length > 1 ? "les " + ratees.length + " cartes ratées" : "la carte ratée") + "</button>" : "") +
      '<button id="encore" class="bouton-' + (ratees.length ? "secondaire" : "principal") + '">' + (seance.chapitre ? "Encore ce chapitre" : "Nouvelle séance") + "</button>" +
      "</div>" +
      '<ul class="resultats">' + seance.cartes.map((c, i) => {
        const ok = seance.resultats[i];
        return '<li class="' + (ok ? "juste" : "faux") + '"><span class="pastille" aria-hidden="true">' + (ok ? "✓" : "✗") + "</span>" +
          '<div><span class="sr">' + (ok ? "Juste : " : "À revoir : ") + "</span><strong>" + m.texte(c.titre) + "</strong>" +
          (ok ? "" : '<span class="rappel">' + m.texte(c.reponse) + "</span>") + "</div></li>";
      }).join("") + "</ul>" +
      '<div class="actions"><button id="vers-bilan" class="bouton-secondaire">Mon bilan</button>' +
      '<button id="vers-accueil" class="bouton-lien">Accueil</button></div>' +
      "</section>", "ecran-fin");

    // Refaire les ratées, chacune dans son mode (une révision de chapitre mélange les modes)
    const indicesRates = Savoirs.melanger(seance.cartes.map((c, i) => i).filter((i) => !seance.resultats[i]));
    const modesRates = seance.modes ? indicesRates.map((i) => seance.modes[i]) : null;
    const chapitreRevise = seance.chapitre;
    surClic("#refaire", () => jouer(indicesRates.map((i) => seance.cartes[i]), modesRates));
    surClic("#encore", () => (chapitreRevise ? reviser(chapitreRevise) : jouer()));
    surClic("#vers-bilan", bilan);
    surClic("#vers-accueil", accueil);
  }

  // ---------- Mon bilan : une rosace par chapitre ----------

  function bilan() {
    seance = null;
    barreSeance.hidden = true;
    const ETATS = { su: "su", hesitant: "hésitant", "a-revoir": "à revoir", nouveau: "jamais vu" };
    // L'année en cours d'abord, puis les révisions des années précédentes (la plus récente d'abord)
    const groupes = [{ titre: "", origine: niveau.id }].concat(anneesRevisees().reverse().map((a) => ({ titre: "Révisions de " + a, origine: a })));
    const tous = savoirsJouables().map((s) => progression.etatSavoir(COMPETENCES, s.id));
    const nbSus = tous.filter((e) => e === "su").length;

    afficher(
      '<section class="bilan">' +
      "<h1>Mon bilan</h1>" +
      '<p class="sous-titre">' + (nbSus ? "Chaque savoir su colore un vitrail de tes rosaces : " + pluriel(nbSus, "savoir su", "savoirs sus") + " pour l'instant."
        : "Chaque savoir su colorera un vitrail de tes rosaces.") + "</p>" +
      '<ul class="legende">' + Object.keys(ETATS).map((e) => '<li><span class="echantillon e-' + e + '" aria-hidden="true"></span>' + ETATS[e] + "</li>").join("") + "</ul>" +
      groupes.map((g) => (g.titre ? '<h2 class="groupe-titre">' + g.titre + "</h2>" : "") +
      '<div class="jardin">' + niveau.chapitres.filter((c) => c.origine === g.origine && niveau.savoirs.some((s) => s.chap === c.id))
        .sort((a, b) => a.ordre - b.ordre).map((c) => {
        const savoirs = niveau.savoirs.filter((s) => s.chap === c.id);
        const etats = savoirs.map((s) => progression.etatSavoir(COMPETENCES, s.id));
        const ouvert = debloque(c);
        const sus = etats.filter((e) => e === "su").length;
        return '<details class="parcelle theme-' + theme(c.id) + (ouvert ? "" : " verrouillee") + '">' +
          "<summary>" + rosace(etats, theme(c.id), !ouvert) +
          '<span class="parcelle-titre">' + m.echapper(c.titre) + "</span>" +
          '<span class="parcelle-compte">' + (ouvert ? sus + " / " + savoirs.length + " sus" : "Pas encore choisi") + "</span></summary>" +
          '<ul class="liste-savoirs">' + savoirs.map((s, i) =>
            '<li><span class="echantillon e-' + etats[i] + '" aria-hidden="true"></span><span class="sr">' + ETATS[etats[i]] + " : </span>" + m.texte(s.titre) + "</li>").join("") + "</ul>" +
          '<button class="bouton-secondaire bouton-reviser" data-reviser="' + c.id + '">Réviser ce chapitre</button>' +
          "</details>";
      }).join("") + "</div>").join("") +
      '<div class="actions"><button id="jouer-bilan" class="bouton-principal">Jouer</button>' +
      '<button id="vers-accueil" class="bouton-lien">Accueil</button></div>' +
      "</section>", "ecran-bilan");

    surClic("#jouer-bilan", () => jouer());
    ecran.querySelectorAll("[data-reviser]").forEach((b) => b.addEventListener("click", () => reviser(b.dataset.reviser)));
    surClic("#vers-accueil", accueil);
  }

  // ---------- Changer d'appareil : code ou lien de sauvegarde ----------

  // Adresse à mettre dans le lien (impossible à connaître quand la page est ouverte depuis un fichier)
  function adresse() { return location.protocol.startsWith("http") ? location.origin + location.pathname : null; }

  // Copie un texte ; renvoie une promesse vraie si c'est fait, fausse si le navigateur refuse
  function copierTexte(texte) {
    if (!navigator.clipboard) return Promise.resolve(false);
    return navigator.clipboard.writeText(texte).then(() => true, () => false);
  }

  function sauvegarde() {
    barreSeance.hidden = true;
    const url = adresse();
    afficher(
      '<section class="sauvegarde">' +
      "<h1>Changer d'appareil</h1>" +
      (joueur
        ? '<div class="bloc">' +
          "<h2>Emporter ma progression</h2>" +
          "<p>Pour retrouver la progression de <strong>" + m.echapper(joueur) + "</strong> sur un autre téléphone ou ordinateur :</p>" +
          '<ol class="etapes"><li>Touche « Préparer l\'envoi ».</li>' +
          "<li>Envoie-toi le " + (url ? "lien (ou le code)" : "code") + " : message, e-mail…</li>" +
          "<li>Sur l'autre appareil, " + (url ? "ouvre le lien : MémoMaths propose de récupérer ta progression. Avec le code : " : "") +
          "menu, « Changer d'appareil », puis colle-le en bas de l'écran.</li></ol>" +
          '<button class="bouton-principal" data-action="creer">Préparer l\'envoi</button>' +
          '<div class="zone-code" hidden><div class="actions">' +
          (navigator.share && url ? '<button class="bouton-principal" data-action="partager">Envoyer…</button>' : "") +
          (url ? '<button class="bouton-secondaire" data-action="copier-lien">Copier le lien</button>' : "") +
          '<button class="bouton-secondaire" data-action="copier-code">Copier le code</button></div>' +
          '<p class="info" role="status"></p>' +
          '<details><summary>Voir le code</summary><textarea class="code" readonly rows="4" aria-label="Code de sauvegarde"></textarea></details>' +
          "</div></div>"
        : "") +
      '<div class="bloc">' +
      "<h2>Récupérer une progression</h2>" +
      '<label class="champ"><span>Colle ici le code reçu</span>' +
      '<textarea class="code code-a-importer" rows="4" placeholder="SAV1-…" autocomplete="off" spellcheck="false"></textarea></label>' +
      '<p class="erreur" role="alert"></p>' +
      '<button class="bouton-secondaire" data-action="importer">Récupérer</button>' +
      "</div>" +
      '<div class="actions"><button class="bouton-lien" data-action="retour">' + (joueur ? "Accueil" : "Retour") + "</button></div>" +
      "</section>", "ecran-sauvegarde");

    const zone = ecran.querySelector(".zone-code");
    const champCode = zone && zone.querySelector("textarea");
    const info = zone && zone.querySelector(".info");
    let code = "", lienSauvegarde = "";
    const action = (nom, f) => surClic('[data-action="' + nom + '"]', f);

    action("creer", () => {
      code = profils.exporter(joueur);
      lienSauvegarde = url ? url + "#importer=" + profils.codePourLien(code) : "";
      champCode.value = code;
      zone.hidden = false;
      info.textContent = "";
    });
    // Copie dans le presse-papiers ; si le navigateur refuse, on montre le texte sélectionné à copier à la main
    function copier(texte, quoi) {
      copierTexte(texte).then((ok) => {
        if (ok) { info.textContent = "✓ " + (quoi === "lien" ? "Lien copié." : "Code copié."); return; }
        champCode.value = texte;
        champCode.parentNode.open = true;
        champCode.focus();
        champCode.select();
        info.textContent = "Le " + quoi + " est sélectionné : copie-le (appui long, puis « Copier »).";
      });
    }
    action("copier-lien", () => copier(lienSauvegarde, "lien"));
    action("copier-code", () => copier(code, "code"));
    action("partager", () => {
      navigator.share({
        title: "MémoMaths – progression de " + joueur,
        text: "Pour retrouver la progression de " + joueur + " dans MémoMaths, ouvre ce lien sur l'autre appareil :",
        url: lienSauvegarde
      }).catch(() => { /* partage annulé */ });
    });
    action("importer", () => {
      const erreur = ecran.querySelector(".erreur");
      try { confirmerImport(profils.lireCode(ecran.querySelector(".code-a-importer").value)); } catch (e) { erreur.textContent = e.message; }
    });
    ecran.querySelector(".code-a-importer").addEventListener("input", () => { ecran.querySelector(".erreur").textContent = ""; });
    action("retour", () => (joueur ? accueil() : ecranPrenom()));
  }

  // Avant d'importer : dire ce qui va se passer et demander confirmation
  function confirmerImport(donnees) {
    barreSeance.hidden = true;
    const existant = profils.noms().find((n) => n.toLowerCase() === donnees.nom.toLowerCase());
    const cible = existant || donnees.nom;
    let nbFiches = 0;
    for (const n in donnees.progression) for (const c in donnees.progression[n]) nbFiches += Object.keys(donnees.progression[n][c]).length;
    afficher(
      '<section class="sauvegarde"><h1>Récupérer une progression</h1><div class="bloc">' +
      "<p>Ce code contient la progression de <strong>" + m.echapper(donnees.nom) + "</strong> (" + pluriel(nbFiches, "réponse mémorisée", "réponses mémorisées") + ").</p>" +
      "<p>" + (existant
        ? "Elle sera ajoutée à celle de <strong>" + m.echapper(cible) + "</strong> déjà présente sur cet appareil : pour chaque savoir, le résultat le plus récent est gardé. Rien n'est effacé."
        : "Le prénom <strong>" + m.echapper(cible) + "</strong> sera créé sur cet appareil.") + "</p>" +
      '<p class="erreur" role="alert"></p>' +
      '<div class="actions"><button class="bouton-principal" data-action="ok">Récupérer</button>' +
      '<button class="bouton-lien" data-action="annuler">Annuler</button></div>' +
      "</div></section>", "ecran-sauvegarde");
    surClic('[data-action="ok"]', () => {
      const erreur = profils.importer(donnees, cible);
      if (erreur) { ecran.querySelector(".erreur").textContent = erreur; return; }
      joueur = cible;
      const sien = (profils.reglages(joueur, "general") || {}).niveau;
      chargerNiveau(sien || niveau.id).then(() => {
        afficher('<section class="sauvegarde"><div class="bloc fin-import"><p class="verdict juste"><span class="icone" aria-hidden="true">✓</span>C\'est fait !</p>' +
          "<p>La progression de <strong>" + m.echapper(cible) + "</strong> est sur cet appareil.</p>" +
          '<button class="bouton-principal" data-action="accueil">Accueil</button></div></section>', "ecran-sauvegarde");
        surClic('[data-action="accueil"]', accueil);
      });
    });
    surClic('[data-action="annuler"]', () => (joueur ? accueil() : ecranPrenom()));
  }

  // Page ouverte depuis un lien de sauvegarde (…/#importer=SAV1-…) ? La partie après # reste sur l'appareil.
  function lireLienImport() {
    const trouve = location.hash.match(/^#importer=(.+)$/);
    if (!trouve) return null;
    history.replaceState(history.state, "", location.pathname + location.search); // pour ne pas réimporter en rechargeant
    try { return { donnees: profils.lireCode(decodeURIComponent(trouve[1])) }; } catch (e) { return { erreur: e.message }; }
  }

  function ouvrirLienImport(lu) {
    if (lu.donnees) { confirmerImport(lu.donnees); return; }
    afficher('<section class="sauvegarde"><h1>Lien de sauvegarde illisible</h1><div class="bloc">' +
      "<p>" + m.echapper(lu.erreur) + "</p>" +
      "<p>Le lien a peut-être été coupé en route. Demande-le à nouveau, ou utilise plutôt le code (menu, « Changer d'appareil »).</p>" +
      '<button class="bouton-principal" data-action="continuer">Continuer</button></div></section>', "ecran-sauvegarde");
    surClic('[data-action="continuer"]', accueil);
  }

  // ---------- À propos et confidentialité ----------

  function aPropos() {
    barreSeance.hidden = true;
    afficher(
      '<section class="a-propos"><h1>À propos</h1>' +
      '<div class="bloc"><h2>MémoMaths</h2>' +
      "<p>Une application pour apprendre et retenir les savoirs du cours de maths du collège (5e, 4e, 3e) : " +
      "formules, propriétés, définitions et règles. Sans chronomètre, sans classement.</p>" +
      "<p>Conçue par <strong>A. Clouteau, enseignant de mathématiques</strong>.</p></div>" +
      '<div class="bloc"><h2>Tes données</h2><ul class="points">' +
      "<li>Pas de compte, pas de mot de passe.</li>" +
      "<li>Ton prénom et ta progression restent <strong>sur cet appareil</strong>, dans ton navigateur. " +
      "Rien n'est envoyé à ton professeur ni à personne.</li>" +
      "<li>Pas de publicité, pas de mesure d'audience, aucun contenu chargé depuis un autre site.</li>" +
      "<li>Ton prénom ou un pseudo suffit : pas besoin de ton nom.</li>" +
      "<li>Le site est hébergé par GitHub Pages (GitHub, Inc.). Comme pour tout site internet, l'hébergeur enregistre " +
      "automatiquement quelques informations techniques sur les visites (par exemple l'adresse internet de l'appareil), " +
      "pour faire fonctionner et protéger le service. Ton prénom et tes réponses n'en font jamais partie.</li>" +
      "</ul>" +
      (joueur
        ? '<button class="bouton-secondaire bouton-effacer" data-action="effacer">Effacer « ' + m.echapper(joueur) + " » et sa progression</button>" +
          '<p class="aide confirmation" hidden>Tout ce qui concerne ce prénom sera effacé de cet appareil. Si tu veux le garder, fais d\'abord une sauvegarde (menu, « Changer d\'appareil »).</p>'
        : "") +
      "</div>" +
      '<div class="bloc"><h2>Licences</h2>' +
      "<p>Contenu (savoirs, énoncés, icônes) : © A. Clouteau, sous licence " +
      '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0</a>. ' +
      "Tu peux le réutiliser et le partager en citant l'auteur, sans usage commercial, et sous la même licence.</p>" +
      "<p>Code de l'application : licence MIT. Affichage des formules : KaTeX (licence MIT), copié dans le site.</p>" +
      "<p>Détails dans les fichiers LICENCES.md et LICENSE.txt.</p></div>" +
      '<div class="actions"><button class="bouton-lien" data-action="retour">Accueil</button></div></section>', "ecran-a-propos");

    // Effacer en deux temps, pour éviter une fausse manœuvre
    const effacer = ecran.querySelector('[data-action="effacer"]');
    if (effacer) effacer.addEventListener("click", () => {
      const confirmation = ecran.querySelector(".confirmation");
      if (confirmation.hidden) {
        confirmation.hidden = false;
        effacer.textContent = "Oui, effacer « " + joueur + " »";
        effacer.classList.add("danger");
        return;
      }
      profils.supprimer(joueur);
      joueur = null;
      progression = null;
      accueil();
    });
    surClic('[data-action="retour"]', accueil);
  }

  // ---------- Menu ----------

  function appliquerApparence(valeur) {
    if (valeur === "clair" || valeur === "sombre") document.documentElement.dataset.theme = valeur;
    else delete document.documentElement.dataset.theme;
  }

  function ouvrirMenu() {
    const apparence = lireLocal(CLE_APPARENCE) || "auto";
    menu.innerHTML =
      '<div class="menu-tete"><h2>Menu</h2><button class="bouton-icone" data-action="fermer" aria-label="Fermer">✕</button></div>' +
      (joueur ? '<p class="menu-joueur">Profil : <strong>' + m.echapper(joueur) + "</strong></p>" : "") +
      '<button class="menu-item" data-action="bilan">Mon bilan</button>' +
      '<button class="menu-item" data-action="prenom">Changer de prénom</button>' +
      '<button class="menu-item" data-action="sauvegarde">Changer d\'appareil <small>sauvegarde</small></button>' +
      (dejaInstallee() ? "" : '<button class="menu-item" data-action="installer">Installer sur cet appareil</button>') +
      '<button class="menu-item" data-action="a-propos">À propos et confidentialité</button>' +
      '<fieldset class="menu-apparence"><legend>Apparence</legend><div class="interrupteur">' +
      [["auto", "Auto"], ["clair", "Clair"], ["sombre", "Sombre"]].map(([v, t]) =>
        '<button data-apparence="' + v + '" aria-pressed="' + (v === apparence) + '">' + t + "</button>").join("") +
      "</div></fieldset>" +
      '<p class="menu-info">MémoMaths fonctionne sans compte : ta progression reste sur cet appareil.</p>';
    menu.showModal();
  }

  menu.addEventListener("click", (e) => {
    if (e.target === menu) { menu.close(); return; } // clic à côté de la fenêtre
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.apparence) {
      ecrireLocal(CLE_APPARENCE, b.dataset.apparence);
      appliquerApparence(b.dataset.apparence);
      menu.querySelectorAll("[data-apparence]").forEach((x) => x.setAttribute("aria-pressed", x === b));
      return;
    }
    const action = b.dataset.action;
    if (!action) return;
    menu.close();
    if (action === "bilan" && joueur) bilan();
    if (action === "prenom") ecranPrenom();
    if (action === "sauvegarde") sauvegarde();
    if (action === "a-propos") aPropos();
    if (action === "installer") installer();
  });

  document.getElementById("btn-menu").addEventListener("click", ouvrirMenu);
  document.getElementById("btn-accueil").addEventListener("click", () => { if (niveau) accueil(); });

  // Bouton « retour » du téléphone ou du navigateur
  window.addEventListener("popstate", () => {
    if (menu.open) menu.close();
    if (niveau) accueil();
  });

  // Lien de l'enseignant (ou de sauvegarde) ouvert alors que la page était déjà affichée
  window.addEventListener("hashchange", () => {
    const lu = lireLienImport();
    if (lu && niveau) { ouvrirLienImport(lu); return; }
    lien = lireLien();
    if (!lien || !niveau) return;
    const suite = lien.niveau && lien.niveau !== niveau.id ? chargerNiveau(lien.niveau) : Promise.resolve();
    suite.then(() => { appliquerLien(); apresLien(); });
  });

  // ---------- Installer l'application ----------
  // Chrome et Edge (Android, ordinateur) proposent l'installation : on garde leur invitation pour notre bouton.
  // Safari (iPhone, iPad) ne le permet pas : on explique « Partager → Sur l'écran d'accueil ».
  let invitation = null;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    invitation = e;
    const bouton = ecran.querySelector("#installer");
    if (bouton) bouton.hidden = false;
  });
  window.addEventListener("appinstalled", () => { invitation = null; });
  function dejaInstallee() { return matchMedia("(display-mode: standalone)").matches || navigator.standalone === true; }
  function surIPhone() { return /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); }

  function installer() {
    if (invitation) {
      invitation.prompt();
      invitation.userChoice.then(() => { invitation = null; accueil(); });
      return;
    }
    barreSeance.hidden = true;
    afficher(
      '<section class="a-propos"><h1>Installer MémoMaths</h1><div class="bloc">' +
      (dejaInstallee()
        ? "<p>MémoMaths est déjà installé sur cet appareil.</p>"
        : surIPhone()
          ? '<ol class="etapes"><li>Ouvre MémoMaths dans <strong>Safari</strong>.</li>' +
            "<li>Touche le bouton <strong>Partager</strong> (le carré avec une flèche vers le haut).</li>" +
            "<li>Choisis <strong>Sur l'écran d'accueil</strong>, puis <strong>Ajouter</strong>.</li></ol>"
          : '<ol class="etapes"><li>Ouvre le menu du navigateur (les trois points <strong>⋮</strong>, en haut à droite).</li>' +
            "<li>Choisis <strong>Installer l'application</strong> ou <strong>Ajouter à l'écran d'accueil</strong>.</li></ol>") +
      "<p>MémoMaths s'ouvre alors comme une application, et marche même sans internet.</p></div>" +
      '<div class="actions"><button class="bouton-lien" data-action="retour">Accueil</button></div></section>', "ecran-installer");
    surClic('[data-action="retour"]', accueil);
  }

  // ---------- Hors ligne ----------
  // Le service worker garde MémoMaths sur l'appareil (impossible quand la page est ouverte depuis un fichier).
  // Sur le serveur de test local, il est désactivé pour toujours voir la dernière version, sauf avec ?hors-ligne.
  const local = location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if ("serviceWorker" in navigator && location.protocol !== "file:" && (!local || location.search.includes("hors-ligne"))) {
    navigator.serviceWorker.register("sw.js").catch(() => { /* MémoMaths marche quand même, en ligne */ });
  }

  // ---------- Démarrage ----------

  // Page rechargée pendant une séance : on repart de l'accueil sans revenir en arrière
  if (history.state && history.state.memo) history.replaceState(null, "");
  const premier = (lien && lien.niveau) || (joueur && (profils.reglages(joueur, "general") || {}).niveau) ||
    lireLocal(CLE_NIVEAU) || (Savoirs.catalogue.find((n) => n.parDefaut) || Savoirs.catalogue[0] || {}).id;
  const importAuDemarrage = lireLienImport();
  chargerNiveau(premier)
    .then(() => {
      appliquerLien();
      if (importAuDemarrage) ouvrirLienImport(importAuDemarrage);
      else apresLien();
    })
    .catch((err) => afficher('<section class="bloc"><h1>Oups</h1><p>' + m.echapper(err.message) + "</p></section>"));
})();
