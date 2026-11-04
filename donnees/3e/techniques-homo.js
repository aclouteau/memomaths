// Techniques d'entraînement de 3e : « Homothéties et transformations » (homo).
// D'après propositions/referentiels/3e/homo.json (lot 4) : les descriptions de niveau sont la spécification.
(function () {
  const { L, T, P, ent, choix, net, nonNul, decimal, decimales, facile, F } = Savoirs.calculsOutils;
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  const SEGMENTS = [["A", "B"], ["C", "D"], ["K", "L"], ["U", "V"], ["E", "F"], ["R", "S"]];
  const kLatex = (k) => L(k);
  const RAPPORTS = [0.1, 0.2, 0.25, 0.4, 0.6, 0.75, 1.2, 1.5, 2.5, 3.5];

  function exLongueur(k, l, inverse) {
    const [A, B] = choix(SEGMENTS), r = net(k * l);
    if (inverse) {
      return {
        enonce: "L'homothétie de rapport $k = " + kLatex(k) + "$ transforme $[" + A + B + "]$ en $[" + A + "'" + B + "']$. On mesure $" + A + "'" + B + "' = " + L(r) + "$ cm. Calculer $" + A + B + "$.",
        reponse: l, unite: "cm", correction: "Les longueurs obtenues sont égales aux longueurs de départ multipliées par $k = " + L(k) + "$ : $" + A + B + " = " + L(r) + " \\div " + L(k) + " = " + L(l) + "$ cm."
      };
    }
    return {
      enonce: choix(["L'homothétie de centre $O$ et de rapport $k = " + kLatex(k) + "$ transforme le segment $[" + A + B + "]$ en $[" + A + "'" + B + "']$. Sachant que $" + A + B + " = " + L(l) + "$ cm, calculer $" + A + "'" + B + "'$.",
        "Une homothétie de rapport $k = " + kLatex(k) + "$ transforme $[" + A + B + "]$ en $[" + A + "'" + B + "']$. On sait que $" + A + B + " = " + L(l) + "$ cm. Quelle est la longueur $" + A + "'" + B + "'$ ?"]),
      reponse: r, unite: "cm", correction: "Les longueurs sont multipliées par $k$ : $" + A + "'" + B + "' = " + L(k) + " \\times " + L(l) + " = " + L(r) + "$ cm."
    };
  }
  function exAire(k, A, inverse) {
    const k2 = net(k * k), r = net(k2 * A), kk = L(k);
    if (inverse) {
      return {
        enonce: "Une homothétie de rapport $k = " + L(k) + "$ transforme une figure en une figure d'aire " + T(r) + " cm². Quelle était l'aire de la figure de départ ?", reponse: A, unite: "cm²",
        correction: "Les aires sont multipliées par $k^{2} = " + kk + "^{2} = " + L(k2) + "$ : $\\mathcal{A} = " + L(r) + " \\div " + L(k2) + " = " + L(A) + "$ cm²."
      };
    }
    return {
      enonce: "L'aire d'une figure est " + T(A) + " cm². On lui applique une homothétie de rapport $k = " + L(k) + "$. Quelle est l'aire de l'image ?", reponse: r, unite: "cm²",
      correction: "Les aires sont multipliées par $k^{2}$ : $\\mathcal{A}' = k^{2} \\times \\mathcal{A} = " + kk + "^{2} \\times " + L(A) + " = " + L(k2) + " \\times " + L(A) + " = " + L(r) + "$ cm²."
    };
  }

  const homo = [
    {
      id: "agrandissement-ou-reduction", chap: "homo", titre: "Agrandissement ou réduction ?", format: "choix", options: ["agrandissement", "réduction"],
      niveaux: (function () {
        const ex = (k, enonce) => {
          const grand = k > 1;
          return {
            enonce: enonce, reponse: grand ? "agrandissement" : "réduction",
            correction: "On compare $k$ à 1 : $" + L(k) + "$ est " + (grand ? "supérieur" : "inférieur") + " à 1. C'est donc " + (grand ? "un agrandissement." : "une réduction.")
          };
        };
        return {
          1: () => { const k = facile(1) ? 2 : Math.random() < 0.5 ? choix([3, 4, 5, 10, 1.5, 2.5, 3.5, 1.2]) : choix([0.1, 0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8]); return ex(k, "Une homothétie a pour rapport $k = " + L(k) + "$. S'agit-il d'un agrandissement ou d'une réduction ?"); },
          2: () => { const k = facile(2) ? 0.5 : choix([0.1, 0.2, 0.25, 0.4, 0.6, 0.75, 0.8, 1.2, 1.5, 2.5, 3, 4, 5, 7.5]); return ex(k, "L'homothétie de centre $O$ et de rapport $k = " + L(k) + "$ est-elle un agrandissement ou une réduction ?"); },
          3: () => {
            let a, b;
            do { a = Math.random() < 0.5 ? ent(2, 15) : dec(1.1, 9.9); b = Math.random() < 0.5 ? ent(2, 15) : dec(1.1, 9.9); } while (a === b);
            const grand = b > a;
            return {
              enonce: "Une homothétie de centre $O$ et de rapport positif transforme $M$ en $M'$. On donne $OM = " + L(a) + "$ cm et $OM' = " + L(b) + "$ cm. Cette homothétie est-elle un agrandissement ou une réduction ?",
              reponse: grand ? "agrandissement" : "réduction",
              correction: "Le rapport est $k = \\dfrac{OM'}{OM} = \\dfrac{" + L(b) + "}{" + L(a) + "}$, et $" + L(b) + (grand ? " > " : " < ") + L(a) + "$ : il est " + (grand ? "supérieur" : "inférieur") + " à 1. C'est donc " + (grand ? "un agrandissement." : "une réduction.")
            };
          }
        };
      })()
    },
    {
      id: "homo-longueur", chap: "homo", titre: "Longueur de l'image d'un segment", format: "nombre",
      niveaux: {
        1: () => exLongueur(facile(1) ? 2 : choix([3, 4, 5, 6, 10]), ent(2, 20)),
        2: () => { for (;;) { const k = facile(2) ? 0.5 : choix(RAPPORTS), l = Math.random() < 0.5 ? ent(3, 40) : dec(1.1, 9.9); if (decimales(net(k * l)) > 2) continue; return exLongueur(k, l); } },
        3: () => { for (;;) { const k = choix(RAPPORTS), l = Math.random() < 0.5 ? ent(3, 40) : dec(1.1, 9.9); if (decimales(net(k * l)) > 2) continue; return exLongueur(k, l, true); } }
      }
    },
    {
      id: "homo-aire", chap: "homo", titre: "Aire de l'image d'une figure", format: "nombre",
      niveaux: {
        1: () => exAire(facile(1) ? 2 : choix([3, 4, 5]), ent(2, 20)),
        // Niveau 2 : k simple et aire entière, résultat avec au plus deux décimales (faisable à la main)
        2: () => { for (;;) { const k = facile(2) ? 0.5 : choix([0.1, 0.2, 0.3, 0.5, 1.5, 2.5]), A = ent(3, 60); if (decimales(net(k * k * A)) > 2) continue; return exAire(k, A); } },
        3: () => { for (;;) { const k = choix([0.1, 0.3, 0.6, 0.75, 1.2, 1.5, 2.5, 0.2, 0.4, 2, 3]), A = Math.random() < 0.5 ? ent(3, 80) : dec(1.1, 9.9); if (decimales(net(k * k * A)) > 3) continue; return exAire(k, A, true); } }
      }
    },
    // (« Coordonnées de l'image » retiré : pas de coordonnées dans les transformations, décision de l'enseignant.)
  ];

  Savoirs.enregistrerTechniques("3e", homo);
})();
