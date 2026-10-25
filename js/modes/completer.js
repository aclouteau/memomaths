// Mode « Je complète » : la question et 4 propositions (la bonne réponse et les 3 pièges, mélangés).
// Après la réponse, la note du savoir s'affiche si elle existe.
(function () {
  Savoirs.modes.push({
    id: "completer",
    interne: true, // forme de carte utilisée par « J'apprends », plus un bouton de l'accueil
    titre: "Je complète",
    description: "Choisis la bonne fin de la formule ou de la propriété.",
    competence: "completer",

    // Les cartes de ce mode : un savoir débloqué = une carte
    cartes: function (jouables) {
      return jouables.filter((s) => s.reponse && s.pieges && s.pieges.length);
    },

    // Dessine la carte dans zone ; appelle fini(juste) une fois la réponse donnée
    afficher: function (savoir, zone, fini) {
      const textes = [savoir.reponse].concat(savoir.pieges.slice(0, 3));
      // Avant la réponse, on cache les explications : sinon la bonne réponse, souvent plus courte, se devine
      const courts = textes.map(sansExplication);
      const utilisables = courts.every((c) => c.length > 0) && new Set(courts.map((c) => c.toLowerCase())).size === courts.length;
      const propositions = Savoirs.melanger(textes.map((t, i) => {
        const court = utilisables ? courts[i] : t;
        return { texte: court, complet: court !== t ? t : null, bonne: i === 0 };
      }));
      Savoirs.choix(zone, "Complète", savoir.question, propositions, fini);
      // Schéma de la configuration sous la question (js/moteur/figures.js)
      if (savoir.figure && savoir.figure.moment === "question") zone.querySelector(".question").insertAdjacentHTML("afterend", Savoirs.figures.bloc(savoir.figure));
    }
  });

  // « 16, car (−4)² = 16 » → « 16 » ; « $a(a - b)$, en mettant a en facteur » → « $a(a - b)$ ».
  // On coupe seulement devant une explication (« , car », « : », « , en oubliant »…), hors des formules $…$
  // et hors des parenthèses. Une parenthèse n'est coupée que si elle explique (« (car… », « (on… ») :
  // les autres disent souvent une condition qu'il faut garder, comme « (avec b ≠ 0) » ou « (pas le carré) ».
  const COUPURES = [/^,? car /, /^ : /, /^, qui /, /^, comme /, /^, c'est[ -]/, /^, puisque /, /^, ce qui /, /^ au lieu d/,
    /^, en (oubliant|confondant|ne |multipliant|additionnant|mettant|divisant|ajoutant|prenant|comptant|inversant|soustrayant|retirant|appliquant|lisant|croyant)/,
    /^ \((car|on |c'est|cela|confusion|oubli|sens |mots |comme |cas |le |la |les |l'|leur |ils |elle |ce |celui |celle |et non|\$|\d)/];
  // Juste après une formule seule : « $AM - MB$, la différence des deux longueurs » → « $AM - MB$ »
  const APPOSITION = /^, (la |le |les |l'|un |une )/;
  function sansExplication(texte) {
    let dansFormule = false, profondeur = 0;
    for (let i = 1; i < texte.length; i++) {
      const c = texte[i - 1];
      if (c === "$") dansFormule = !dansFormule;
      else if (!dansFormule && c === "(") profondeur++;
      else if (!dansFormule && c === ")") profondeur--;
      if (dansFormule || profondeur > 0 || texte[i] === "$") continue;
      const suite = texte.slice(i), avant = texte.slice(0, i).trim();
      if (suite.length >= 8 && (COUPURES.some((r) => r.test(suite)) || (/^\$[^$]*\$$/.test(avant) && APPOSITION.test(suite)))) return avant;
    }
    return texte;
  }
})();
