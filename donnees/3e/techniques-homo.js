// Techniques d'entraînement de 3e : « Homothéties et transformations » (homo).
// D'après propositions/referentiels/3e/homo.json (lot 4) : les descriptions de niveau sont la spécification.
(function () {
  const { L, T, P, ent, choix, net, nonNul, decimal, decimales, facile, F } = Savoirs.calculsOutils;
  const signe = () => choix([1, -1]);
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  const SEGMENTS = [["A", "B"], ["C", "D"], ["K", "L"], ["U", "V"], ["E", "F"], ["R", "S"]];
  const kLatex = (k) => L(k);
  const RAPPORTS = [0.1, 0.2, 0.25, 0.4, 0.6, 0.75, 1.2, 1.5, 2.5, 3.5];

  function exLongueur(k, l, inverse) {
    const [A, B] = choix(SEGMENTS), r = net(Math.abs(k) * l), ak = Math.abs(k);
    if (inverse) {
      return {
        enonce: "L'homothétie de rapport $k = " + kLatex(k) + "$ transforme $[" + A + B + "]$ en $[" + A + "'" + B + "']$. On mesure $" + A + "'" + B + "' = " + L(r) + "$ cm. Calculer $" + A + B + "$.",
        reponse: l, unite: "cm", correction: "Les longueurs obtenues sont égales aux longueurs de départ multipliées par $|k| = " + L(ak) + "$ : $" + A + B + " = " + L(r) + " \\div " + L(ak) + " = " + L(l) + "$ cm."
      };
    }
    return {
      enonce: choix(["L'homothétie de centre $O$ et de rapport $k = " + kLatex(k) + "$ transforme le segment $[" + A + B + "]$ en $[" + A + "'" + B + "']$. Sachant que $" + A + B + " = " + L(l) + "$ cm, calculer $" + A + "'" + B + "'$.",
        "Une homothétie de rapport $k = " + kLatex(k) + "$ transforme $[" + A + B + "]$ en $[" + A + "'" + B + "']$. On sait que $" + A + B + " = " + L(l) + "$ cm. Quelle est la longueur $" + A + "'" + B + "'$ ?"]),
      reponse: r, unite: "cm", correction: "Les longueurs sont multipliées par $|k|$ : $" + A + "'" + B + "' = " + L(ak) + " \\times " + L(l) + " = " + L(r) + "$ cm."
    };
  }
  function exAire(k, A, inverse) {
    const k2 = net(k * k), r = net(k2 * A), kk = k < 0 ? "(" + L(k) + ")" : L(k);
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
          const a = Math.abs(k), grand = a > 1;
          return {
            enonce: enonce, reponse: grand ? "agrandissement" : "réduction",
            correction: "On compare $|k|$ à 1 : $|" + L(k) + "| = " + L(a) + "$, qui est " + (grand ? "supérieur" : "inférieur") + " à 1. C'est donc " + (grand ? "un agrandissement." : "une réduction.") +
              (k < 0 ? " Le signe de $k$ n'a pas d'influence : il indique seulement que $M$ et $M'$ sont de part et d'autre de $O$." : "")
          };
        };
        return {
          1: () => { const k = facile(1) ? 2 : Math.random() < 0.5 ? choix([3, 4, 5, 10, 1.5, 2.5, 3.5, 1.2]) : choix([0.1, 0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8]); return ex(k, "Une homothétie a pour rapport $k = " + L(k) + "$. S'agit-il d'un agrandissement ou d'une réduction ?"); },
          2: () => { const k = facile(2) ? -2 : -choix([0.1, 0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8, 1.5, 2, 2.5, 3, 4, 5, 7.5]); return ex(k, "L'homothétie de centre $O$ et de rapport $k = " + L(k) + "$ est-elle un agrandissement ou une réduction ?"); },
          3: () => {
            let a, b;
            do { a = Math.random() < 0.5 ? ent(2, 15) : dec(1.1, 9.9); b = Math.random() < 0.5 ? ent(2, 15) : dec(1.1, 9.9); } while (a === b);
            const meme = Math.random() < 0.5, grand = b > a;
            return {
              enonce: "Une homothétie de centre $O$ transforme $M$ en $M'$. On donne $OM = " + L(a) + "$ cm et $OM' = " + L(b) + "$ cm, et $M'$ est " + (meme ? "du même côté de $O$ que $M$" : "de l'autre côté de $O$ par rapport à $M$") + ". Cette homothétie est-elle un agrandissement ou une réduction ?",
              reponse: grand ? "agrandissement" : "réduction",
              correction: "Le rapport vérifie $|k| = \\dfrac{OM'}{OM} = \\dfrac{" + L(b) + "}{" + L(a) + "}$, et $" + L(b) + (grand ? " > " : " < ") + L(a) + "$ : $|k|$ est " + (grand ? "supérieur" : "inférieur") + " à 1. C'est donc " + (grand ? "un agrandissement." : "une réduction.") +
                " Le côté de $M'$ par rapport à $O$ ne change rien (il donne seulement le signe de $k$)."
            };
          }
        };
      })()
    },
    {
      id: "homo-longueur", chap: "homo", titre: "Longueur de l'image d'un segment", format: "nombre",
      niveaux: {
        1: () => exLongueur(facile(1) ? 2 : choix([3, 4, 5, 6, 10]), ent(2, 20)),
        2: () => { for (;;) { const k = (facile(2) ? 0.5 : choix(RAPPORTS)) * signe(), l = Math.random() < 0.5 ? ent(3, 40) : dec(1.1, 9.9); if (decimales(net(Math.abs(k) * l)) > 2) continue; return exLongueur(k, l); } },
        3: () => { for (;;) { const k = choix(RAPPORTS) * signe(), l = Math.random() < 0.5 ? ent(3, 40) : dec(1.1, 9.9); if (decimales(net(Math.abs(k) * l)) > 2) continue; return exLongueur(k, l, true); } }
      }
    },
    {
      id: "homo-aire", chap: "homo", titre: "Aire de l'image d'une figure", format: "nombre",
      niveaux: {
        1: () => exAire(facile(1) ? 2 : choix([3, 4, 5]), ent(2, 20)),
        2: () => exAire((facile(2) ? 0.5 : choix([0.1, 0.3, 0.6, 0.75, 1.2, 1.5, 2.5, 0.2, 0.4])) * signe(), Math.random() < 0.5 ? ent(3, 60) : dec(1.1, 9.9)),
        3: () => { for (;;) { const k = choix([0.1, 0.3, 0.6, 0.75, 1.2, 1.5, 2.5, 0.2, 0.4, 2, 3]) * signe(), A = Math.random() < 0.5 ? ent(3, 80) : dec(1.1, 9.9); if (decimales(net(k * k * A)) > 3) continue; return exAire(k, A, true); } }
      }
    },
    {
      id: "homo-rapport", chap: "homo", titre: "Rapport d'une homothétie", format: "nombre",
      niveaux: (function () {
        function ex(om, k) {
          const om2 = net(Math.abs(k) * om), meme = k > 0;
          return {
            enonce: meme ? "$M'$ est l'image de $M$ par une homothétie de centre $O$. $M$ et $M'$ sont du même côté de $O$, avec $OM = " + L(om) + "$ cm et $OM' = " + L(om2) + "$ cm. Calculer le rapport $k$."
              : "Les points $O$, $M$ et $M'$ sont alignés, $M'$ est l'image de $M$ par l'homothétie de centre $O$, et $M$ et $M'$ sont de part et d'autre de $O$. On donne $OM = " + L(om) + "$ cm et $OM' = " + L(om2) + "$ cm. Quel est le rapport $k$ de l'homothétie ?",
            reponse: k,
            correction: "Le rapport vérifie $|k| = \\dfrac{OM'}{OM} = \\dfrac{" + L(om2) + "}{" + L(om) + "} = " + L(Math.abs(k)) + "$. $M$ et $M'$ sont " + (meme ? "du même côté de $O$ : $k$ est positif." : "de part et d'autre de $O$ : $k$ est négatif.") + " Donc $k = " + L(k) + "$."
          };
        }
        return {
          1: () => { for (;;) { const k = facile(1) ? 2 : choix([3, 4, 5, 1.5, 2.5, 0.5, 0.25, 0.2, 0.4, 0.6, 0.75, 0.8]), om = ent(2, 24); if (decimales(net(k * om)) > 1) continue; return ex(om, k); } },
          2: () => { for (;;) { const k = facile(2) ? -1 : -choix([1.5, 2, 2.5, 3, 4, 5, 0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8, 1.25]), om = ent(2, 24); if (decimales(net(-k * om)) > 1) continue; return ex(om, k); } },
          3: () => {
            for (;;) {
              const c = ent(-8, 8), m = ent(-12, 12), k = choix([2, 3, 4, -2, -3, 0.5, -0.5, 1.5, -1.5, -1, 2.5]);
              if (m === c) continue;
              const m2 = net(c + k * (m - c));
              if (decimales(m2) > 1 || Math.abs(m2) > 40) continue;
              return {
                enonce: "Sur une droite graduée, l'homothétie de centre $O$ d'abscisse " + T(c) + " transforme le point $M$ d'abscisse " + T(m) + " en $M'$ d'abscisse " + T(m2) + ". Quel est son rapport $k$ ?", reponse: k,
                correction: "On calcule les distances algébriques à $O$ : $m - c = " + m + " - " + P(c) + " = " + (m - c) + "$ et $m' - c = " + L(m2) + " - " + P(c) + " = " + L(net(m2 - c)) + "$. Donc $k = \\dfrac{" + L(net(m2 - c)) + "}{" + (m - c) + "} = " + L(k) + "$."
              };
            }
          }
        };
      })()
    },
    {
      id: "homo-coordonnees", chap: "homo", titre: "Coordonnées de l'image", format: "nombre",
      niveaux: (function () {
        function ex(k, kTexte, x, y) {
          const abscisse = Math.random() < 0.5, x2 = net(k * x), y2 = net(k * y), r = abscisse ? x2 : y2;
          return {
            enonce: "Dans un repère d'origine $O$, l'homothétie $h$ de centre $O$ a pour rapport $k = " + kTexte + "$. Le point $M$ a pour coordonnées $(" + L(x) + " ; " + L(y) + ")$ et $M'$ est son image par $h$. Quelle est " + (abscisse ? "l'abscisse" : "l'ordonnée") + " de $M'$ ?",
            reponse: r,
            correction: "Les coordonnées sont multipliées par $k$ : $M'(" + kTexte + " \\times " + P(x) + " ; " + kTexte + " \\times " + P(y) + ") = M'(" + L(x2) + " ; " + L(y2) + ")$. " + (abscisse ? "L'abscisse" : "L'ordonnée") + " de $M'$ est $" + L(r) + "$."
          };
        }
        return {
          1: () => { const k = facile(1) ? 2 : choix([3, 4, 5]); return ex(k, L(k), ent(1, 9), ent(1, 9)); },
          2: () => { const k = facile(2) ? -1 : choix([-2, -3, -4, -0.5, -1.5, -2.5, -0.25, 0.5, 1.5, 2.5]); for (;;) { const x = nonNul(-9, 9), y = nonNul(-9, 9); if (decimales(k * x) > 2 || decimales(k * y) > 2) continue; return ex(k, k < 0 ? "-" + L(-k) : L(k), x, y); } },
          3: () => {
            const nonEntier = Math.random() < 0.7;
            for (;;) {
              const [n, d] = choix([[2, 3], [-3, 4], [5, 4], [3, 5], [-2, 5], [4, 5], [-5, 2], [7, 4], [-3, 2], [5, 8], [-4, 3]]), k = n / d, x = nonNul(-12, 12), y = nonNul(-12, 12);
              const a = net(k * x), b = net(k * y);
              if (decimales(a) > 2 || decimales(b) > 2 || Math.abs(a * 100 - Math.round(a * 100)) > 1e-6 || Math.abs(b * 100 - Math.round(b * 100)) > 1e-6) continue;
              if ((Number.isInteger(a) && Number.isInteger(b)) === nonEntier) continue;
              return ex(k, F(n, d), x, y);
            }
          }
        };
      })()
    }
  ];

  Savoirs.enregistrerTechniques("3e", homo);
})();
