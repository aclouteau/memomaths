// Mode « Quel outil ? » : un énoncé de problème, et 4 à 6 noms de savoirs. L'élève choisit celui
// qui permet de le résoudre (aucun calcul demandé). Correction avec l'explication de l'énoncé.
//
// La fiche de progression est celle du savoir attendu (bon), compétence « outil ».
// Les mauvaises réponses (autres) dont le chapitre n'est pas débloqué sont ignorées et remplacées
// par d'autres savoirs débloqués du même niveau, de préférence du même type.
(function () {
  const MIN_FAUX = 3, MAX_FAUX = 5;

  Savoirs.modes.push({
    id: "outil",
    interne: true, // mis de côté : ses meilleurs énoncés serviront au futur mode « Problèmes »
    titre: "Quel outil ?",
    description: "Lis l'énoncé et choisis le savoir qui permet de le résoudre.",
    competence: "outil",
    masquerChapitre: true, // le chapitre de l'énoncé donnerait la réponse

    // Une carte par savoir attendu : si plusieurs énoncés ont le même, l'un d'eux est tiré au hasard
    // chapDebloque(id) : le chapitre de l'énoncé est-il débloqué ? (sinon : un chapitre qui a des savoirs jouables)
    cartes: function (jouables, niveau, chapDebloque) {
      const debloques = new Set(jouables.map((s) => s.id));
      const chapitres = new Set(jouables.map((s) => s.chap));
      const ouvert = chapDebloque || ((id) => chapitres.has(id));
      const parSavoir = {};
      for (const o of niveau.outils || []) {
        if (!debloques.has(o.bon) || !ouvert(o.chap)) continue;
        (parSavoir[o.bon] = parSavoir[o.bon] || []).push(o);
      }
      return Object.keys(parSavoir).map((id) => {
        const outil = Savoirs.melanger(parSavoir[id])[0];
        const bon = niveau.savoirs.find((s) => s.id === id);
        return {
          id: id, chap: outil.chap, type: bon.type, titre: bon.titre, reponse: bon.reponse,
          note: outil.explication, etiquetteNote: "Pourquoi", outil: outil
        };
      });
    },

    afficher: function (carte, zone, fini, contexte) {
      const jouables = contexte.jouables;
      const bon = contexte.niveau.savoirs.find((s) => s.id === carte.id);
      const titres = new Set([bon.titre]); // deux savoirs de même titre ne peuvent pas être proposés ensemble
      const faux = [];
      const ajouter = (s) => {
        if (!s || s.id === bon.id || titres.has(s.titre) || faux.length >= MAX_FAUX) return;
        titres.add(s.titre);
        faux.push(s);
      };
      const debloques = new Set(jouables.map((s) => s.id));
      carte.outil.autres.forEach((id) => { if (debloques.has(id)) ajouter(jouables.find((s) => s.id === id)); });
      const nbFaux = Math.max(MIN_FAUX, faux.length);
      // Compléter avec d'autres savoirs débloqués, ceux du même type d'abord
      const reserve = Savoirs.melanger(jouables).sort((a, b) => (a.type === bon.type ? 0 : 1) - (b.type === bon.type ? 0 : 1));
      for (const s of reserve) { if (faux.length >= nbFaux) break; ajouter(s); }

      const propositions = Savoirs.melanger([{ texte: bon.titre, bonne: true }]
        .concat(faux.map((s) => ({ texte: s.titre, bonne: false }))));
      Savoirs.choix(zone, "Quel outil ?", carte.outil.enonce, propositions, fini);
    }
  });
})();
