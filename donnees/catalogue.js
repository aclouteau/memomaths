// Niveaux proposés à l'accueil. Pour en ajouter un : créer donnees/<niveau>/savoirs.js,
// l'ajouter ici et dans la liste FICHIERS de sw.js.
// fichiers : savoirs.js, puis les techniques (« Je m'entraîne ») quand le niveau en a : techniques.js (rel2), puis un fichier par chapitre.
// parDefaut : niveau proposé au premier lancement.
// themes : thème de maths de chaque chapitre (donne sa couleur d'accent) :
//   nombres, geometrie, fonctions, grandeurs, probabilites
Savoirs.catalogue = [
  { id: "5e", titre: "5e", fichiers: ["donnees/5e/savoirs.js",
      "donnees/5e/techniques-rel1.js", "donnees/5e/techniques-ench.js", "donnees/5e/techniques-tri.js", "donnees/5e/techniques-puis.js", "donnees/5e/techniques-sym.js",
      "donnees/5e/techniques-lit.js", "donnees/5e/techniques-aire.js", "donnees/5e/techniques-div.js", "donnees/5e/techniques-rat1.js", "donnees/5e/techniques-ang.js",
      "donnees/5e/techniques-rel2.js", "donnees/5e/techniques-sol.js", "donnees/5e/techniques-rat2.js", "donnees/5e/techniques-prop.js", "donnees/5e/techniques-equ.js",
      "donnees/5e/techniques-para.js", "donnees/5e/techniques-don.js", "donnees/5e/techniques-fonc.js", "donnees/5e/techniques-proba.js"],
    themes: {
      pre: "grandeurs", rel1: "nombres", ench: "nombres", tri: "geometrie", puis: "nombres",
      sym: "geometrie", lit: "nombres", aire: "grandeurs", div: "nombres", rat1: "nombres",
      ang: "geometrie", rel2: "nombres", sol: "grandeurs", rat2: "nombres", prop: "fonctions",
      equ: "nombres", para: "geometrie", don: "probabilites", fonc: "fonctions", proba: "probabilites"
    } },
  { id: "4e", titre: "4e", fichiers: ["donnees/4e/savoirs.js", "donnees/4e/techniques.js", "donnees/4e/techniques-rel1.js", "donnees/4e/techniques-pyth.js",
      "donnees/4e/techniques-stat.js", "donnees/4e/techniques-transl.js", "donnees/4e/techniques-frac1.js", "donnees/4e/techniques-recip.js",
      "donnees/4e/techniques-prop.js", "donnees/4e/techniques-rot.js", "donnees/4e/techniques-frac2.js",
      "donnees/4e/techniques-sembl.js", "donnees/4e/techniques-puis.js", "donnees/4e/techniques-vol.js", "donnees/4e/techniques-lit.js",
      "donnees/4e/techniques-equ.js", "donnees/4e/techniques-gc.js", "donnees/4e/techniques-sci.js", "donnees/4e/techniques-proba.js"], parDefaut: true,
    // Chapitres fusionnés (novembre 2026) : un ancien choix « jusqu'à Pyramides » vaut « Volumes » (14, après « Calcul littéral ») ;
    // « jusqu'à Cône » (17, après la notation scientifique) vaut « Notation scientifique » (17)
    renommes: { pyr: "vol", cone: "sci" },
    themes: {
      pre: "grandeurs", rel1: "nombres", pyth: "geometrie", stat: "probabilites", rel2: "nombres",
      transl: "geometrie", frac1: "nombres", recip: "geometrie", prop: "fonctions", rot: "geometrie",
      frac2: "nombres", sembl: "geometrie", puis: "nombres", vol: "grandeurs", lit: "nombres", equ: "nombres",
      gc: "grandeurs", sci: "nombres", proba: "probabilites"
    } },
  { id: "3e", titre: "3e", fichiers: ["donnees/3e/savoirs.js", "donnees/3e/techniques-proba.js", "donnees/3e/techniques-rf.js", "donnees/3e/techniques-pyth.js",
      "donnees/3e/techniques-prem.js", "donnees/3e/techniques-agr.js", "donnees/3e/techniques-lit.js",
      "donnees/3e/techniques-homo.js", "donnees/3e/techniques-fgen.js", "donnees/3e/techniques-thal.js", "donnees/3e/techniques-equ.js",
      "donnees/3e/techniques-pv.js", "donnees/3e/techniques-stat.js", "donnees/3e/techniques-puis.js", "donnees/3e/techniques-flin.js",
      "donnees/3e/techniques-faff.js", "donnees/3e/techniques-trig.js", "donnees/3e/techniques-esp.js", "donnees/3e/techniques-sembl.js",
      "donnees/3e/techniques-pourc.js"],
    // Chapitre fusionné (novembre 2026) : « Triangles semblables » (dernier chapitre, 17) est dans « Thalès » ;
    // un ancien choix « jusqu'à Triangles semblables » vaut donc le dernier chapitre restant, « Géométrie dans l'espace »
    renommes: { sembl: "esp" },
    // Chapitre « Périmètre, aire et volume » (pv, toujours jouable) : il regroupe aussi les savoirs et exercices de 5e et 4e
    // sur ces calculs et les conversions d'unités (rattachés ici au lieu de leur chapitre de révision : pas de copie,
    // la progression des élèves est conservée). Les formules en double d'un niveau à l'autre ne sont posées qu'une fois.
    // Chapitre « Proportionnalité et pourcentages » (pourc, toujours jouable) : même principe pour les savoirs de 4e et 5e.
    // Chapitre « Géométrie dans l'espace » (esp) : le repérage dans un pavé droit vu en 4e y est rattaché (leçon de 3e).
    regroupe: [{
      chap: "pv",
      savoirs: { "5e": ["aire-para", "aire-carre-c", "perim-carre", "perim-rect-c", "aire-hauteur", "aire-perim-diam", "aire-compose", "aire-demi", "aire-pi", "aire-diametre", "conv-aire", "vol-cube", "vol-cyl", "litre", "sol-dm3"],
        "4e": ["vol-m3", "vol-dm3-litre", "vol-cm3-ml"] },
      doublons: { "5e": ["aire-rect-carre", "puis-aire-carre", "puis-vol-cube", "vol-pave", "vol-prisme", "aire-tri", "aire-disque", "perim-cercle"], "4e": ["aire-para", "aire-rect", "aire-tri", "aire-disque", "perim-cercle", "vol-pave", "vol-prisme", "pyr-vol", "cone-vol"] },
      techniques: ["t-5e-aire-base-hauteur", "t-5e-aire-cercle", "t-5e-aire-conversion", "t-5e-aire-figure-composee", "t-5e-aire-cout", "t-5e-puis-aire-volume", "t-5e-tri-perimetre",
        "t-4e-vol-conversion", "t-4e-vol-droit"]
    }, {
      chap: "pourc",
      savoirs: { "4e": ["prop-def", "prop-coef", "prop-unite"], "5e": ["pourcent10"] }
    }, {
      chap: "esp",
      savoirs: { "4e": ["vol-reperage", "vol-reperage-ordre"] },
      techniques: ["t-4e-vol-reperage"]
    }],
    themes: {
      pv: "grandeurs", pre: "grandeurs", proba: "probabilites", rf: "nombres", pyth: "geometrie", prem: "nombres",
      agr: "geometrie", lit: "nombres", homo: "geometrie", fgen: "fonctions", thal: "geometrie",
      equ: "nombres", stat: "probabilites", puis: "nombres", flin: "fonctions", faff: "fonctions",
      trig: "geometrie", esp: "geometrie", pourc: "fonctions"
    } }
];
