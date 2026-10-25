// Techniques d'entraînement de 4e : « Translations » (transl).
// D'après propositions/referentiels/4e/transl.json (lot 1). Sans coordonnées (décision de l'enseignant) :
// les exercices « image d'un point dans un repère » et « quatrième sommet d'un parallélogramme » ont été retirés.
(function () {
  const { L, T, ent, choix, net, decimal } = Savoirs.calculsOutils;
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  const LETTRES = [["A", "B", "M"], ["E", "F", "P"], ["R", "S", "T"], ["K", "L", "N"]];

  // ---------- Périmètre ou aire d'une figure translatée ----------
  const LONGUEURS = "Une translation conserve les longueurs, donc l'image a le même périmètre : ";
  const AIRES = "Une translation conserve les aires, donc l'image a la même aire : ";
  const demandePerimetre = "Quel est le périmètre de son image (en cm) ?", demandeAire = "Quelle est l'aire de son image (en cm²) ?";
  function rectangle(a, b, aire) {
    return aire
      ? { enonce: "Un rectangle de " + T(a) + " cm sur " + T(b) + " cm est translaté. " + demandeAire, reponse: net(a * b), unite: "cm²", correction: AIRES + "$" + L(a) + " \\times " + L(b) + " = " + L(net(a * b)) + "$ cm²." }
      : { enonce: "Un rectangle de " + T(a) + " cm sur " + T(b) + " cm est translaté. " + demandePerimetre, reponse: net(2 * (a + b)), unite: "cm",
        correction: LONGUEURS + "$2 \\times (" + L(a) + " + " + L(b) + ")" + (Number.isInteger(a + b) && Number.isInteger(a) ? "" : " = 2 \\times " + L(net(a + b))) + " = " + L(net(2 * (a + b))) + "$ cm." };
  }
  function triangleRectangle(a, b) {
    const r = net((a * b) / 2);
    return {
      enonce: "Un triangle rectangle dont les côtés de l'angle droit mesurent " + T(a) + " cm et " + T(b) + " cm est translaté. " + demandeAire, reponse: r, unite: "cm²",
      correction: AIRES + "$\\dfrac{" + L(a) + " \\times " + L(b) + "}{2} = " + (Number.isInteger(a) && Number.isInteger(b) ? "" : "\\dfrac{" + L(net(a * b)) + "}{2} = ") + L(r) + "$ cm²."
    };
  }

  // ---------- Ce que conserve une translation (sans coordonnées) ----------
  // La translation qui transforme A en B transforme M en M' : MM' = AB (ABM'M est un parallélogramme)
  function deplacement(longueur) {
    const [A, B, M] = choix(LETTRES);
    return {
      enonce: "La translation qui transforme $" + A + "$ en $" + B + "$ transforme le point $" + M + "$ en $" + M + "'$. On sait que $" + A + B + " = " + L(longueur) + "$ cm. Calculer $" + M + M + "'$.",
      reponse: longueur, unite: "cm",
      correction: "Une translation fait glisser tous les points de la même longueur, dans la même direction et le même sens : $" + M + M + "' = " + A + B + " = " + L(longueur) + "$ cm ($" + A + B + M + "'" + M + "$ est un parallélogramme)."
    };
  }
  function segment(longueur) {
    const [A, B] = choix(LETTRES);
    return {
      enonce: "Une translation transforme le segment $[" + A + B + "]$ en $[" + A + "'" + B + "']$. On sait que $" + A + B + " = " + L(longueur) + "$ cm. Calculer $" + A + "'" + B + "'$.",
      reponse: longueur, unite: "cm",
      correction: "Une translation conserve les longueurs : $" + A + "'" + B + "' = " + A + B + " = " + L(longueur) + "$ cm."
    };
  }
  function angle(mesure) {
    const [A, B, M] = choix(LETTRES), sommet = choix([A, B, M]);
    return {
      enonce: "Dans le triangle $" + A + B + M + "$, l'angle en $" + sommet + "$ mesure $" + L(mesure) + "^{\\circ}$. Son image par une translation est le triangle $" + A + "'" + B + "'" + M + "'$. Combien mesure l'angle en $" + sommet + "'$ ?",
      reponse: mesure, unite: "°",
      correction: "Une translation conserve les angles : l'angle en $" + sommet + "'$ mesure aussi $" + L(mesure) + "^{\\circ}$."
    };
  }
  // La translation qui transforme A en B transforme C en D : ABDC est un parallélogramme de côtés AB et AC
  function parallelogramme(ab, ac) {
    const [A, B, C] = choix(LETTRES), D = { A: "D", E: "G", R: "U", K: "O" }[A], p = net(2 * (ab + ac));
    return {
      enonce: "La translation qui transforme $" + A + "$ en $" + B + "$ transforme $" + C + "$ en $" + D + "$. On sait que $" + A + B + " = " + L(ab) + "$ cm et $" + A + C + " = " + L(ac) + "$ cm. Calculer le périmètre du quadrilatère $" + A + B + D + C + "$.",
      reponse: p, unite: "cm",
      correction: "$" + A + B + D + C + "$ est un parallélogramme : $" + C + D + " = " + A + B + " = " + L(ab) + "$ cm et $" + B + D + " = " + A + C + " = " + L(ac) + "$ cm. Périmètre : $2 \\times (" + L(ab) + " + " + L(ac) + ") = " + L(p) + "$ cm."
    };
  }

  const transl = [
    {
      id: "conservation", chap: "transl", titre: "Périmètre ou aire d'une figure translatée", format: "nombre",
      niveaux: {
        1: () => {
          const cas = ent(1, 4);
          if (cas <= 2) { const a = ent(3, 12); return rectangle(a, ent(2, a - 1), cas === 2); }
          const c = ent(3, 15);
          return cas === 3
            ? { enonce: "Un carré de côté " + c + " cm est translaté. " + demandePerimetre, reponse: 4 * c, unite: "cm", correction: "Une translation conserve les longueurs, donc l'image est un carré de côté " + c + " cm : $4 \\times " + c + " = " + 4 * c + "$ cm." }
            : { enonce: "Un carré de côté " + c + " cm est translaté. " + demandeAire, reponse: c * c, unite: "cm²", correction: "Une translation conserve les aires, donc l'image est un carré de côté " + c + " cm : $" + c + " \\times " + c + " = " + c * c + "$ cm²." };
        },
        2: () => {
          const cas = ent(1, 4);
          if (cas <= 2) return rectangle(dec(1.5, 12), ent(2, 9), cas === 2);
          if (cas === 3) { let a, b; do { a = ent(3, 15); b = ent(3, 15); } while (a === b); return triangleRectangle(a, b); }
          let a, b, c;
          do { a = ent(3, 15); b = ent(3, 15); c = ent(3, 15); } while (a === b || b === c || a === c || a + b <= c || a + c <= b || b + c <= a);
          return {
            enonce: "Un triangle dont les côtés mesurent " + a + " cm, " + b + " cm et " + c + " cm est translaté. " + demandePerimetre, reponse: a + b + c, unite: "cm",
            correction: LONGUEURS + "$" + a + " + " + b + " + " + c + " = " + (a + b + c) + "$ cm."
          };
        },
        3: () => {
          const cas = ent(1, 3);
          if (cas === 1) return triangleRectangle(dec(1.5, 12), ent(2, 10));
          if (cas === 2) {
            let a, b;
            do { a = dec(1.5, 12); b = dec(1.5, 12); } while (a === b);
            return {
              enonce: "Un parallélogramme de côtés " + T(a) + " cm et " + T(b) + " cm est translaté. " + demandePerimetre, reponse: net(2 * (a + b)), unite: "cm",
              correction: LONGUEURS + "$2 \\times (" + L(a) + " + " + L(b) + ") = 2 \\times " + L(net(a + b)) + " = " + L(net(2 * (a + b))) + "$ cm."
            };
          }
          return rectangle(dec(1.5, 9.9), ent(2, 9), true);
        }
      }
    },
    {
      id: "transl-conserve", chap: "transl", titre: "Ce que conserve une translation", format: "nombre",
      niveaux: {
        1: () => (Math.random() < 0.5 ? deplacement(ent(2, 15)) : segment(ent(2, 15))),
        2: () => choix([() => deplacement(dec(1.1, 12)), () => segment(dec(1.1, 12)), () => angle(ent(15, 150))])(),
        3: () => (Math.random() < 0.6 ? parallelogramme(dec(1.1, 9.9), ent(2, 9)) : angle(dec(10.1, 150)))
      }
    }
  ];

  Savoirs.enregistrerTechniques("4e", transl);
})();
