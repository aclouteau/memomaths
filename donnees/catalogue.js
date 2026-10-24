// Niveaux proposés à l'accueil. Pour en ajouter un : créer donnees/<niveau>/savoirs.js,
// l'ajouter ici et dans la liste FICHIERS de sw.js.
// parDefaut : niveau proposé au premier lancement.
// themes : thème de maths de chaque chapitre (donne sa couleur d'accent) :
//   nombres, geometrie, fonctions, grandeurs, probabilites
Savoirs.catalogue = [
  { id: "5e", titre: "5e", fichiers: ["donnees/5e/savoirs.js"],
    themes: {
      pre: "grandeurs", rel1: "nombres", ench: "nombres", tri: "geometrie", puis: "nombres",
      sym: "geometrie", lit: "nombres", aire: "grandeurs", div: "nombres", rat1: "nombres",
      ang: "geometrie", rel2: "nombres", sol: "grandeurs", rat2: "nombres", prop: "fonctions",
      equ: "nombres", para: "geometrie", don: "probabilites", fonc: "fonctions", proba: "probabilites"
    } },
  { id: "4e", titre: "4e", fichiers: ["donnees/4e/savoirs.js"], parDefaut: true,
    themes: {
      pre: "grandeurs", rel1: "nombres", pyth: "geometrie", stat: "probabilites", rel2: "nombres",
      transl: "geometrie", frac1: "nombres", recip: "geometrie", prop: "fonctions", rot: "geometrie",
      frac2: "nombres", sembl: "geometrie", puis: "nombres", pyr: "geometrie", equ: "nombres",
      gc: "grandeurs", sci: "nombres", cone: "geometrie", proba: "probabilites"
    } },
  { id: "3e", titre: "3e", fichiers: ["donnees/3e/savoirs.js"],
    themes: {
      pre: "grandeurs", proba: "probabilites", rf: "nombres", pyth: "geometrie", prem: "nombres",
      agr: "geometrie", lit: "nombres", homo: "geometrie", fgen: "fonctions", thal: "geometrie",
      equ: "nombres", stat: "probabilites", puis: "nombres", flin: "fonctions", faff: "fonctions",
      trig: "geometrie", esp: "geometrie", sembl: "geometrie"
    } }
];
