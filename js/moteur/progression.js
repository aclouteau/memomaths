// Mémoire de ce que l'élève sait, et choix des cartes par répétition espacée (boîtes de Leitner).
//
// Chaque savoir a, pour chaque compétence (completer, reconstituer, appliquer, outil),
// une boîte de 0 à 5 : une bonne réponse le fait monter d'une boîte, une erreur le renvoie en boîte 0.
// Plus la boîte est basse, plus le savoir a de chances d'être tiré ; il en a davantage encore
// quand le délai de révision de sa boîte est dépassé.
//
// Tout est enregistré dans le navigateur (localStorage), par profil, pour tous les niveaux ensemble :
// un même savoir (même id, par exemple aire-rect en 5e, 4e et 3e) a une seule progression.
//   { "<profil>": { "tous": { "<compétence>": { "<id>": { b: boîte, v: vus, j: justes, d: jour } } } } }
// Les anciennes progressions rangées par niveau ("4e", …) sont réunies dans "tous" à la première lecture.
(function () {
  const CLE = "savoirs.progression";
  const COMMUN = "tous";
  const BOITE_MAX = 5;
  const POIDS_BOITE = [8, 4, 2, 1, 0.5, 0.25];
  const POIDS_NOUVEAU = 3;
  const DELAI_JOURS = [0, 1, 2, 4, 8, 16];

  function aujourdhui() {
    return Math.floor((Date.now() - new Date().getTimezoneOffset() * 60000) / 86400000);
  }

  function lireTout() {
    try { return JSON.parse(localStorage.getItem(CLE)) || {}; } catch (e) { return {}; }
  }

  // La fiche la plus récente l'emporte ; à date égale, celle qui a le plus d'historique
  function plusRecente(a, b) {
    if (!a) return b;
    if (!b) return a;
    return b.d > a.d || (b.d === a.d && b.v > a.v) ? b : a;
  }

  class Progression {
    constructor(profil) {
      this.profil = profil;
      this.tout = lireTout();
      this.reunirNiveaux();
    }

    // Réunit dans "tous" les progressions rangées par niveau (anciennes versions, ou code de sauvegarde importé)
    reunirNiveaux() {
      const p = this.tout[this.profil];
      if (!p) return;
      let change = false;
      for (const cle of Object.keys(p)) {
        if (cle === COMMUN) continue;
        const commun = p[COMMUN] = p[COMMUN] || {};
        for (const comp in p[cle]) {
          const fiches = commun[comp] = commun[comp] || {};
          for (const id in p[cle][comp]) fiches[id] = plusRecente(fiches[id], p[cle][comp][id]);
        }
        delete p[cle];
        change = true;
      }
      if (change) this.enregistrer();
    }

    fiches(competence) {
      const p = this.tout[this.profil] = this.tout[this.profil] || {};
      const n = p[COMMUN] = p[COMMUN] || {};
      return n[competence] = n[competence] || {};
    }

    noter(competence, id, juste) {
      const fiches = this.fiches(competence);
      const f = fiches[id] = fiches[id] || { b: 0, v: 0, j: 0, d: 0 };
      f.v++;
      if (juste) {
        f.j++;
        // Su du premier coup : inutile de le redemander souvent
        f.b = Math.min(BOITE_MAX, f.b + (f.v === 1 ? 2 : 1));
      } else {
        f.b = 0;
      }
      f.d = aujourdhui();
      this.enregistrer();
    }

    enregistrer() {
      try { localStorage.setItem(CLE, JSON.stringify(this.tout)); } catch (e) { /* stockage plein ou refusé */ }
    }

    poids(competence, id) {
      const f = this.fiches(competence)[id];
      if (!f) return POIDS_NOUVEAU;
      const enRetard = aujourdhui() - f.d >= DELAI_JOURS[f.b];
      return POIDS_BOITE[f.b] * (enRetard ? 2 : 1);
    }

    // Tire nb éléments différents, chacun avec une chance proportionnelle à son poids,
    // multiplié par bonus(élément) s'il est donné (chapitres récents)
    // competence peut être une fonction (élément → compétence), pour « J'apprends » où elle dépend du savoir
    choisir(competence, elements, nb, bonus) {
      const comp = (el) => (typeof competence === "function" ? competence(el) : competence);
      return elements
        .map((el) => ({ el: el, cle: Math.pow(Math.random(), 1 / (this.poids(comp(el), el.id) * (bonus ? bonus(el) : 1))) }))
        .sort((a, b) => b.cle - a.cle)
        .slice(0, nb)
        .map((x) => x.el);
    }

    // { b, v, j, d } du savoir, ou undefined s'il n'a jamais été demandé
    fiche(competence, id) {
      return this.fiches(competence)[id];
    }

    // "nouveau" (jamais vu), "a-revoir" (raté la dernière fois), "hesitant" ou "su"
    etat(competence, id) {
      const f = this.fiches(competence)[id];
      if (!f) return "nouveau";
      if (f.b === 0) return "a-revoir";
      return f.b >= 3 ? "su" : "hesitant";
    }

    // État d'un savoir toutes compétences confondues (pour « Mon bilan ») :
    // à revoir si l'une est à revoir, su si toutes celles déjà travaillées sont sues, sinon hésitant
    etatSavoir(competences, id) {
      const etats = competences.map((c) => this.etat(c, id)).filter((e) => e !== "nouveau");
      if (!etats.length) return "nouveau";
      if (etats.includes("a-revoir")) return "a-revoir";
      return etats.every((e) => e === "su") ? "su" : "hesitant";
    }
  }

  Progression.aujourdhui = aujourdhui;
  Savoirs.Progression = Progression;
})();
