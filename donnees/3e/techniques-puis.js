// Techniques d'entraînement de 3e : « Puissances » (puis), avec la notation scientifique.
// D'après propositions/referentiels/3e/puis.json (lot 7) : mêmes générateurs qu'en 4e (donnees/4e/techniques-puis.js
// et techniques-sci.js, chargés avec la 3e), appelés au moment du tirage.
(function () {
  const P = (f, n) => () => Savoirs.puissances[f](n);
  const N = (f, n) => () => Savoirs.notationScientifique[f](n);
  Savoirs.enregistrerTechniques("3e", [
    { id: "puis-calcul", chap: "puis", titre: "Calculer une puissance", format: "nombre", niveaux: { 1: P("calcul1", 1), 2: P("calcul2", 2), 3: P("calcul3", 3) } },
    { id: "puis-negatif", chap: "puis", titre: "Exposant négatif", format: "fraction", niveaux: { 1: P("negatif1", 1), 2: P("negatif2", 2), 3: P("negatif3", 3) } },
    { id: "puis-exposant", chap: "puis", titre: "Trouver l'exposant", format: "nombre", niveaux: { 1: P("exposant1", 1), 2: P("exposant2", 2), 3: P("exposant3", 3) } },
    { id: "puis-valeur", chap: "puis", titre: "Calculer une expression avec des puissances", format: "nombre", niveaux: { 1: P("valeur1", 1), 2: P("valeur2", 2), 3: P("valeur3", 3) } },
    { id: "sci-decimal", chap: "puis", titre: "De la notation scientifique à l'écriture décimale", format: "nombre", niveaux: { 1: N("decimal", 1), 2: N("decimal", 2), 3: N("decimal", 3) } },
    { id: "sci-calcul", chap: "puis", titre: "Produit et quotient en notation scientifique", format: "nombre", niveaux: { 1: N("calcul", 1), 2: N("calcul", 2), 3: N("calcul", 3) } },
    { id: "sci-exposant", chap: "puis", titre: "Exposant d'une notation scientifique", format: "nombre", niveaux: { 1: N("exposant1", 1), 2: N("exposant2", 2), 3: N("exposant3", 3) } }
  ]);
})();
