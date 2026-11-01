// Techniques d'entraînement de 3e : triangles semblables, dans le chapitre « Triangles semblables et théorème de Thalès » (thal).
// D'après propositions/referentiels/3e/sembl.json (lot 7) : mêmes techniques et mêmes niveaux qu'en 4e
// (donnees/4e/techniques-sembl.js, chargé avec la 3e) ; les générateurs sont appelés au moment du tirage.
// Mise à jour de novembre 2026 : le chapitre sembl de 3e est fusionné dans thal (les ids des techniques ne changent pas).
(function () {
  const ids = ["sembl-reconnaitre", "sembl-homologue", "sembl-longueur", "sembl-rapport", "sembl-aire", "sembl-angle"];
  const TITRES = {
    "sembl-reconnaitre": "Triangles semblables ou non ?", "sembl-homologue": "Côtés homologues", "sembl-longueur": "Longueur dans un triangle semblable",
    "sembl-rapport": "Rapport d'un agrandissement ou d'une réduction", "sembl-aire": "Aire dans un agrandissement ou une réduction", "sembl-angle": "Angle dans un triangle semblable"
  };
  const FORMATS = { "sembl-reconnaitre": "choix", "sembl-homologue": "toucher" };
  const de4e = (id, n) => () => Savoirs.techniquesSembl.find((t) => t.id === id).niveaux[n]();
  Savoirs.enregistrerTechniques("3e", ids.map((id) => Object.assign({
    id: id, chap: "thal", titre: TITRES[id], format: FORMATS[id] || "nombre",
    niveaux: { 1: de4e(id, 1), 2: de4e(id, 2), 3: de4e(id, 3) }
  }, id === "sembl-reconnaitre" ? { options: ["semblables", "non semblables"] } : {})));
})();
