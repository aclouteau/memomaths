// Mode « Je complète » : la question et 4 propositions (la bonne réponse et les 3 pièges, mélangés).
// Après la réponse, la note du savoir s'affiche si elle existe.
(function () {
  Savoirs.modes.push({
    id: "completer",
    titre: "Je complète",
    description: "Choisis la bonne fin de la formule ou de la propriété.",
    competence: "completer",

    // Les cartes de ce mode : un savoir débloqué = une carte
    cartes: function (jouables) {
      return jouables.filter((s) => s.reponse && s.pieges && s.pieges.length);
    },

    // Dessine la carte dans zone ; appelle fini(juste) une fois la réponse donnée
    afficher: function (savoir, zone, fini) {
      const propositions = Savoirs.melanger([{ texte: savoir.reponse, bonne: true }]
        .concat(savoir.pieges.slice(0, 3).map((p) => ({ texte: p, bonne: false }))));
      Savoirs.choix(zone, "Complète", savoir.question, propositions, fini);
    }
  });
})();
