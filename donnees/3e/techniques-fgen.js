// Techniques d'entraînement de 3e : « Fonctions : généralités » (fgen).
// D'après propositions/referentiels/3e/fgen.json (lot 4) : les descriptions de niveau sont la spécification.
// Les valeurs d'une fonction sont données en liste « f(−2) = 5 ; … » (pas de tableau).
(function () {
  const { L, T, P, ent, choix, net, nonNul, decimales, facile, polyTexte, polyLatex, substituer } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const signe = () => choix([1, -1]);
  const pm = (a, b) => ent(a, b) * signe();
  const nom = () => choix(["f", "g", "h"]);
  const val = (c, x) => net(c.reduce((s, a) => s * x + a, 0)); // Horner : c du plus haut degré au terme constant
  // f(x) = … pour x = v : écriture « au tableau » 9 × 3 − 6 = 27 − 6 = 21
  function image(f, c, v) {
    const latex = polyLatex(c), sub = substituer(latex, v), r = val(c, v);
    const termes = c.map((a, i) => net(a * Math.pow(v, c.length - 1 - i))).filter((t, i) => c[i] !== 0);
    const milieu = termes.length > 1 ? " = " + termes.map((t, i) => (i === 0 ? L(t) : t < 0 ? " - " + L(-t) : " + " + L(t))).join("") : "";
    return { latex: latex, r: r, calcul: "$" + f + "(" + L(v) + ") = " + sub + milieu + " = " + L(r) + "$" };
  }
  const DEMI = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5];

  // ---------- Tarifs ----------
  const TARIFS = [
    { debut: (a, b) => "Un taxi facture une prise en charge de " + T(b) + " € puis " + T(a) + " € par kilomètre parcouru.", x: "kilomètres", unite: "km", question: "Quelle distance, en km, a-t-on parcourue", pour: (x) => x + " km" },
    { debut: (a, b) => "Une salle de sport demande " + T(b) + " € d'inscription puis " + T(a) + " € par séance.", x: "séances", unite: "séances", question: "Combien de séances a-t-on faites", pour: (x) => x + " séance" + (x > 1 ? "s" : "") },
    { debut: (a, b) => "Un imprimeur facture " + T(b) + " € de frais de préparation puis " + T(a) + " € par photo imprimée.", x: "photos", unite: "photos", question: "Combien de photos a-t-on imprimées", pour: (x) => x + " photo" + (x > 1 ? "s" : "") },
    { debut: (a, b) => "Un loueur de vélos demande " + T(b) + " € de frais de dossier puis " + T(a) + " € par heure de location.", x: "heures", unite: "heures", question: "Combien d'heures a duré la location", pour: (x) => x + " heure" + (x > 1 ? "s" : "") }
  ];

  const fgen = [
    {
      id: "fg-image-calcul", chap: "fgen", titre: "Calculer l'image d'un nombre", format: "nombre",
      niveaux: {
        1: () => { const f = nom(), c = [ent(2, 9), nonNul(-12, 12)], v = facile(1) ? 0 : ent(1, 9), i = image(f, c, v); return { enonce: "Soit $" + f + "$ la fonction définie par $" + f + "(x) = " + i.latex + "$. Calculer l'image de $" + v + "$ par $" + f + "$.", reponse: i.r, correction: i.calcul + "." }; },
        2: () => {
          const f = nom(), a = ent(2, 6), b = pm(1, 9), forme = ent(1, 4), c = forme === 1 ? [-a, b] : forme === 2 ? [a, b] : forme === 3 ? [a, 0, b] : [a, b, 0];
          const v = facile(2) ? 0 : nonNul(-6, 6), i = image(f, c, v);
          return { enonce: "On considère la fonction $" + f + "$ définie par $" + f + "(x) = " + i.latex + "$. Quelle est l'image de $" + L(v) + "$ par $" + f + "$ ?", reponse: i.r, correction: i.calcul + "." };
        },
        3: () => {
          for (;;) {
            const f = nom(), c = [pm(1, 4), pm(1, 9), pm(1, 9)], v = Math.random() < 0.6 ? nonNul(-8, 8) : choix(DEMI) * signe(), i = image(f, c, v);
            if (decimales(i.r) > 2) continue;
            return { enonce: "Soit $" + f + "$ la fonction définie par $" + f + "(x) = " + i.latex + "$. Calculer l'image de $" + L(v) + "$ par $" + f + "$.", reponse: i.r, correction: i.calcul + "." };
          }
        }
      }
    },
    {
      id: "fg-antecedent", chap: "fgen", titre: "Trouver l'antécédent d'un nombre", format: "nombre",
      niveaux: (function () {
        function affine(f, a, b, x) {
          const y = net(a * x + b), d = net(y - b);
          return {
            enonce: choix(["On considère la fonction $" + f + "$ définie par $" + f + "(x) = " + polyLatex([a, b]) + "$. Déterminer l'antécédent de $" + L(y) + "$ par $" + f + "$.", "Soit $" + f + "$ la fonction définie par $" + f + "(x) = " + polyLatex([a, b]) + "$. Quel est l'antécédent de $" + L(y) + "$ par $" + f + "$ ?"]),
            reponse: x,
            correction: "On résout $" + f + "(x) = " + L(y) + "$, c'est-à-dire $" + polyLatex([a, b]) + " = " + L(y) + "$. On obtient $" + (a === 1 ? "" : a === -1 ? "-" : L(a)) + "x = " + L(y) + " - " + P(b) + " = " + L(d) + "$ puis $x = \\dfrac{" + L(d) + "}{" + L(a) + "} = " + L(x) + "$. L'antécédent de $" + L(y) + "$ est $" + L(x) + "$."
          };
        }
        return {
          1: () => affine(nom(), ent(2, 9), nonNul(-12, 12), facile(1) ? 0 : ent(1, 9)),
          2: () => affine(nom(), pm(2, 9), nonNul(-15, 15), facile(2) ? 0 : nonNul(-9, 9)),
          3: () => {
            if (Math.random() < 0.6) {
              for (;;) { const den = choix([2, 4, 5]), n = nonNul(-30, 30), x = n / den; if (Number.isInteger(x) || decimales(x) > 2) continue; return affine(nom(), pm(2, 9), nonNul(-15, 15), x); }
            }
            const f = nom(), a = ent(2, 5), b = nonNul(-20, 20), x = ent(2, 9), y = a * x * x + b;
            return {
              enonce: "Soit $" + f + "$ la fonction définie par $" + f + "(x) = " + polyLatex([a, 0, b]) + "$. Quel est l'antécédent positif de $" + y + "$ par $" + f + "$ ?", reponse: x,
              correction: "On résout $" + polyLatex([a, 0, b]) + " = " + y + "$ : $" + a + "x^{2} = " + y + " - " + P(b) + " = " + a * x * x + "$, donc $x^{2} = " + x * x + "$. Les antécédents sont $" + x + "$ et $-" + x + "$ ; l'antécédent positif est $" + x + "$."
            };
          }
        };
      })()
    },
    {
      id: "fg-lecture", chap: "fgen", titre: "Lire dans une liste ou un tableau de valeurs", format: "nombre",
      niveaux: (function () {
        // Valeurs données une fois sur deux en liste « f(−2) = 5 ; … », une fois sur deux en tableau de valeurs
        // (décision de l'enseignant : les deux présentations)
        function valeurs(f, xs, ys) {
          if (Math.random() < 0.5) return { texte: "On donne quelques valeurs de la fonction $" + f + "$ : " + xs.map((x, k) => "$" + f + "(" + x + ") = " + ys[k] + "$").join(" ; ") + ".", ou: "la liste", ici: "de cette liste" };
          const ligne = (titre, l) => titre + " & " + l.join(" & ");
          return {
            texte: "Voici un tableau de valeurs de la fonction $" + f + "$ : $\\begin{array}{|c|" + xs.map(() => "c|").join("") + "}\\hline " + ligne("x", xs) + " \\\\ \\hline " + ligne(f + "(x)", ys) + " \\\\ \\hline\\end{array}$",
            ou: "le tableau", ici: "de la première ligne du tableau"
          };
        }
        return {
          1: () => {
            const f = nom(), zero = facile(1);
            for (;;) {
              const xs = melanger(Array.from({ length: 11 }, (_, i) => i - 4)).slice(0, 4).sort((a, b) => a - b);
              if (zero && !xs.includes(0)) continue;
              const ys = xs.map(() => ent(-12, 12)), i = zero ? xs.indexOf(0) : ent(0, 3), v = valeurs(f, xs, ys);
              return { enonce: v.texte + " Quelle est l'image de $" + xs[i] + "$ par $" + f + "$ ?", reponse: ys[i], correction: "On lit dans " + v.ou + " : $" + f + "(" + xs[i] + ") = " + ys[i] + "$. L'image de $" + xs[i] + "$ est $" + ys[i] + "$." };
            }
          },
          2: () => {
            const f = nom(), zero = facile(2);
            for (;;) {
              const xs = melanger(Array.from({ length: 15 }, (_, i) => i - 6)).slice(0, 5).sort((a, b) => a - b), ys = xs.map(() => ent(-15, 15));
              if (new Set(ys).size < 5 || (zero && !xs.includes(0))) continue;
              const i = zero ? xs.indexOf(0) : ent(0, 4), v = valeurs(f, xs, ys);
              return { enonce: v.texte + " Quel est l'antécédent de $" + ys[i] + "$ par $" + f + "$ ?", reponse: xs[i], correction: "On cherche dans " + v.ou + " le nombre $x$ tel que $" + f + "(x) = " + ys[i] + "$ : c'est $x = " + xs[i] + "$ car $" + f + "(" + xs[i] + ") = " + ys[i] + "$. L'antécédent de $" + ys[i] + "$ est $" + xs[i] + "$." };
            }
          },
          3: () => {
            const f = nom(), voulu = ent(0, 3);
            for (;;) {
              const xs = melanger(Array.from({ length: 15 }, (_, i) => i - 6)).slice(0, 6).sort((a, b) => a - b), ys = xs.map(() => ent(-5, 15));
              const y = voulu === 0 ? ent(-5, 15) : ys[ent(0, 5)], k = ys.filter((w) => w === y).length;
              if (k !== voulu || new Set(ys).size === 6) continue;
              const liste = xs.filter((_, i) => ys[i] === y), v = valeurs(f, xs, ys);
              return {
                enonce: v.texte + " Combien de nombres " + v.ici + " ont pour image $" + y + "$ par $" + f + "$ ?", reponse: k,
                correction: "On cherche dans " + v.ou + " les $x$ tels que $" + f + "(x) = " + y + "$ : " + (k ? liste.map((x) => "$" + x + "$").join(", ") : "aucun") + ". Il y en a $" + k + "$."
              };
            }
          }
        };
      })()
    },
    {
      id: "fg-point-courbe", chap: "fgen", titre: "Un point est-il sur la courbe ?", format: "choix", options: ["oui", "non"],
      niveaux: Object.fromEntries([1, 2, 3].map((niveau) => [niveau, () => {
        const f = nom(), oui = Math.random() < 0.5;
        for (;;) {
          let c, v;
          if (niveau === 1) { c = [ent(2, 9), nonNul(-12, 12)]; v = facile(1) ? 0 : ent(1, 8); }
          else if (niveau === 2) { const a = pm(2, 6), b = pm(1, 9), forme = ent(1, 3); c = forme === 1 ? [a, b] : forme === 2 ? [a, 0, b] : [a, b, 0]; v = facile(2) ? 0 : ent(-6, 6); }
          else { c = [pm(1, 4), pm(1, 9), pm(1, 9)]; v = Math.random() < 0.6 ? nonNul(-7, 7) : choix([0.5, 1.5, 2.5]) * signe(); }
          const i = image(f, c, v);
          let y = i.r;
          if (!oui) y = niveau === 3 && i.r !== 0 && Math.random() < 0.4 ? -i.r : net(i.r + ent(1, 3) * signe());
          if (decimales(y) > 2) continue;
          return {
            enonce: "Soit $" + f + "$ la fonction définie par $" + f + "(x) = " + i.latex + "$. Le point $A(" + L(v) + " ; " + L(y) + ")$ appartient-il à la courbe représentative de $" + f + "$ ?",
            reponse: oui ? "oui" : "non",
            correction: "On calcule l'image de $" + L(v) + "$ : " + i.calcul + ". " + (oui ? "Comme $" + f + "(" + L(v) + ") = " + L(y) + "$, le point $A$ appartient à la courbe." : "Comme $" + f + "(" + L(v) + ") = " + L(i.r) + " \\neq " + L(y) + "$, le point $A$ n'appartient pas à la courbe.")
          };
        }
      }]))
    },
    {
      id: "fg-situation", chap: "fgen", titre: "Une fonction pour un tarif", format: "nombre",
      niveaux: (function () {
        function inverse(a, b, x) {
          const s = choix(TARIFS), y = net(a * x + b), d = net(y - b);
          return {
            enonce: s.debut(a, b) + " On note $f(x)$ le prix à payer pour $x$ " + s.x + ". " + s.question + " si on a payé " + T(y) + " € ?", reponse: x, unite: s.unite,
            correction: "On cherche l'antécédent de $" + L(y) + "$ : $" + L(a) + "x + " + L(b) + " = " + L(y) + "$, donc $" + L(a) + "x = " + L(y) + " - " + L(b) + " = " + L(d) + "$ puis $x = \\dfrac{" + L(d) + "}{" + L(a) + "} = " + x + "$. Réponse : " + s.pour(x) + "."
          };
        }
        return {
          1: () => {
            const s = choix(TARIFS), a = ent(2, 9), b = ent(1, 30), x = facile(1) ? 0 : ent(1, 12), y = a * x + b;
            return {
              enonce: s.debut(a, b) + " On note $f(x)$ le prix à payer pour $x$ " + s.x + ". Quel est le prix à payer pour " + s.pour(x) + " ?", reponse: y, unite: "€",
              correction: "On calcule l'image de $" + x + "$ : $f(" + x + ") = " + a + " \\times " + x + " + " + b + " = " + a * x + " + " + b + " = " + y + "$ €."
            };
          },
          // Prix unitaires simples : diviser par 7,9 ou par 0,67 était trop long à la main
          2: () => inverse(choix([2, 3, 4, 5, 1.5, 2.5]), ent(1, 30), facile(2) ? 0 : ent(2, 40)),
          3: () => inverse(choix([0.25, 0.4, 0.5, 0.75, 1.25, 0.2]), ent(5, 60), ent(10, 90))
        };
      })()
    },
    {
      id: "fg-coefficient", chap: "fgen", titre: "Trouver un coefficient d'une fonction", format: "nombre",
      niveaux: {
        1: () => {
          const f = nom(), a = ent(2, 9), b = nonNul(-12, 12), k = facile(1) ? 1 : ent(2, 9), y = a * k + b;
          return {
            enonce: "Soit $" + f + "$ la fonction définie par $" + f + "(x) = ax " + (b < 0 ? "- " + -b : "+ " + b) + "$, où $a$ est un nombre. On sait que $" + f + "(" + k + ") = " + y + "$. Quelle est la valeur de $a$ ?", reponse: a,
            correction: "On remplace $x$ par $" + k + "$ : $" + f + "(" + k + ") = a \\times " + k + " " + (b < 0 ? "- " + -b : "+ " + b) + " = " + y + "$, donc $" + (k === 1 ? "" : k) + "a = " + y + " - " + P(b) + " = " + (y - b) + "$ et $a = " + (k === 1 ? a : "\\dfrac{" + (y - b) + "}{" + k + "} = " + a) + "$."
          };
        },
        2: () => {
          const f = nom(), a = pm(2, 9), b = nonNul(-12, 12), k = facile(2) ? 0 : nonNul(-8, 8), y = a * k + b;
          return {
            enonce: "Soit $" + f + "$ la fonction définie par $" + f + "(x) = " + (a < 0 ? "-" + -a : a) + "x + b$, où $b$ est un nombre. On sait que $" + f + "(" + k + ") = " + y + "$. Quelle est la valeur de $b$ ?", reponse: b,
            correction: "On remplace $x$ par $" + k + "$ : $" + f + "(" + k + ") = " + a + " \\times " + P(k) + " + b = " + a * k + " + b = " + y + "$, donc $b = " + y + " - " + P(a * k) + " = " + b + "$."
          };
        },
        3: () => {
          const f = nom();
          if (Math.random() < 0.6) {
            for (;;) {
              const a = pm(1, 6), b = nonNul(-12, 12), k1 = ent(-5, 5), k2 = ent(-5, 5);
              if (k1 >= k2) continue;
              const y1 = a * k1 + b, y2 = a * k2 + b, quoi = Math.random() < 0.5 ? "a" : "b";
              return {
                enonce: "Soit $" + f + "$ la fonction définie par $" + f + "(x) = ax + b$, où $a$ et $b$ sont deux nombres. On sait que $" + f + "(" + k1 + ") = " + y1 + "$ et $" + f + "(" + k2 + ") = " + y2 + "$. Quelle est la valeur de $" + quoi + "$ ?", reponse: quoi === "a" ? a : b,
                correction: "On a $a \\times " + P(k1) + " + b = " + y1 + "$ et $a \\times " + P(k2) + " + b = " + y2 + "$. En soustrayant, $a \\times (" + k2 + " - " + P(k1) + ") = " + y2 + " - " + P(y1) + "$, soit $" + (k2 - k1) + "a = " + (y2 - y1) + "$, donc $a = \\dfrac{" + (y2 - y1) + "}{" + (k2 - k1) + "} = " + a + "$. Puis $b = " + y1 + " - " + P(a) + " \\times " + P(k1) + " = " + b + "$."
              };
            }
          }
          const a = pm(1, 6), b = nonNul(-12, 12), k = nonNul(-6, 6), y = a * k * k + b;
          return {
            enonce: "Soit $" + f + "$ la fonction définie par $" + f + "(x) = ax^{2} " + (b < 0 ? "- " + -b : "+ " + b) + "$, où $a$ est un nombre. On sait que $" + f + "(" + k + ") = " + y + "$. Quelle est la valeur de $a$ ?", reponse: a,
            correction: "On remplace $x$ par $" + k + "$ : $a \\times " + P(k) + "^{2} " + (b < 0 ? "- " + -b : "+ " + b) + " = " + y + "$, donc $" + k * k + "a = " + y + " - " + P(b) + " = " + (y - b) + "$ et $a = \\dfrac{" + (y - b) + "}{" + k * k + "} = " + a + "$."
          };
        }
      }
    },
    {
      id: "fg-combinaison", chap: "fgen", titre: "Combiner des images", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((niveau) => [niveau, () => {
        if (niveau === 3) {
          const cf = [pm(1, 9), nonNul(-9, 9)], cg = [pm(1, 4), choix([0, nonNul(-9, 9)]), nonNul(-9, 9)], a = nonNul(-6, 6), b = nonNul(-6, 6), op = choix(["+", "-", "\\times"]);
          const fa = image("f", cf, a), gb = image("g", cg, b), r = op === "+" ? fa.r + gb.r : op === "-" ? fa.r - gb.r : fa.r * gb.r;
          return {
            enonce: "On considère les fonctions $f$ et $g$ définies par $f(x) = " + fa.latex + "$ et $g(x) = " + gb.latex + "$. Calculer $f(" + a + ") " + op + " g(" + b + ")$.", reponse: r,
            correction: fa.calcul + " et " + gb.calcul + ". Donc $f(" + a + ") " + op + " g(" + b + ") = " + P(fa.r) + " " + op + " " + P(gb.r) + " = " + r + "$."
          };
        }
        const f = nom(), c = niveau === 1 ? [ent(2, 9), nonNul(-9, 9)] : choix([[pm(2, 9), nonNul(-9, 9)], [pm(1, 4), 0, nonNul(-9, 9)], [ent(1, 4), pm(1, 9), 0]]);
        let a = niveau === 1 ? ent(1, 9) : nonNul(-6, 6), b = niveau === 1 ? ent(1, 9) : nonNul(-6, 6);
        if (facile(niveau)) b = 0;
        if (a === b) a = a === 9 ? 8 : a + 1;
        const op = choix(["+", "-"]), A = image(f, c, a), B = image(f, c, b), r = op === "+" ? A.r + B.r : A.r - B.r;
        return {
          enonce: choix(["Soit $" + f + "$ la fonction définie par $" + f + "(x) = " + A.latex + "$. Calculer $" + f + "(" + a + ") " + op + " " + f + "(" + b + ")$.", "On considère la fonction $" + f + "$ définie par $" + f + "(x) = " + A.latex + "$. Calculer $" + f + "(" + a + ") " + op + " " + f + "(" + b + ")$."]),
          reponse: r, correction: A.calcul + " et " + B.calcul + ". Donc $" + f + "(" + a + ") " + op + " " + f + "(" + b + ") = " + P(A.r) + " " + op + " " + P(B.r) + " = " + r + "$."
        };
      }]))
    },
    {
      id: "fg-geometrie", chap: "fgen", titre: "Une fonction dans une figure", format: "nombre",
      niveaux: {
        1: () => {
          const f = nom(), x = facile(1) ? 1 : ent(2, 15), aire = Math.random() < 0.5;
          return aire
            ? { enonce: "On note $" + f + "(x)$ l'aire d'un carré de côté $x$ cm. Quelle est l'image de $" + x + "$ par $" + f + "$ ?", reponse: x * x, unite: "cm²", correction: "L'aire d'un carré de côté $" + x + "$ cm est $" + x + " \\times " + x + " = " + x * x + "$ cm². L'image de $" + x + "$ est $" + x * x + "$." }
            : { enonce: "On note $" + f + "(x)$ le périmètre d'un carré de côté $x$ cm. Quelle est l'image de $" + x + "$ par $" + f + "$ ?", reponse: 4 * x, unite: "cm", correction: "Le périmètre d'un carré de côté $" + x + "$ cm est $4 \\times " + x + " = " + 4 * x + "$ cm. L'image de $" + x + "$ est $" + 4 * x + "$." };
        },
        2: () => {
          const f = nom(), k = ent(2, 9), x = ent(2, 12), perimetre = facile(2) || Math.random() < 0.4, l = x + k;
          return perimetre
            ? { enonce: "On note $" + f + "(x)$ le périmètre d'un rectangle de largeur $x$ cm et de longueur $(x + " + k + ")$ cm. Quelle est l'image de $" + x + "$ par $" + f + "$ ?", reponse: 2 * (x + l), unite: "cm", correction: "La largeur est $" + x + "$ cm et la longueur est $" + x + " + " + k + " = " + l + "$ cm. Le périmètre est $2 \\times (" + x + " + " + l + ") = " + 2 * (x + l) + "$ cm." }
            : { enonce: "On note $" + f + "(x)$ l'aire d'un rectangle de largeur $x$ cm et de longueur $(x + " + k + ")$ cm. Quelle est l'image de $" + x + "$ par $" + f + "$ ?", reponse: x * l, unite: "cm²", correction: "La largeur est $" + x + "$ cm et la longueur est $" + x + " + " + k + " = " + l + "$ cm. L'aire est $" + x + " \\times " + l + " = " + x * l + "$ cm²." };
        },
        3: () => {
          const f = nom(), k = ent(2, 9), x = ent(2, 12);
          if (Math.random() < 0.5) {
            const p = 4 * x + 2 * k;
            return { enonce: "On note $" + f + "(x)$ le périmètre d'un rectangle de largeur $x$ cm et de longueur $(x + " + k + ")$ cm. Quel est l'antécédent de $" + p + "$ par $" + f + "$ ?", reponse: x, unite: "cm", correction: "Le périmètre est $2(x + x + " + k + ") = 4x + " + 2 * k + "$. On résout $4x + " + 2 * k + " = " + p + "$ : $4x = " + (p - 2 * k) + "$, donc $x = " + x + "$." };
          }
          const A = x * (x + k);
          return { enonce: "On note $" + f + "(x)$ l'aire d'un rectangle de largeur $x$ cm et de longueur $(x + " + k + ")$ cm. Quel est l'antécédent positif de $" + A + "$ par $" + f + "$ ?", reponse: x, unite: "cm", correction: "L'aire est $x(x + " + k + ")$. On cherche $x$ tel que $x(x + " + k + ") = " + A + "$. On essaie : $" + x + " \\times " + (x + k) + " = " + A + "$, donc $x = " + x + "$ (c'est le seul antécédent positif car l'aire augmente avec $x$)." };
        }
      }
    },
    {
      id: "fg-programme-expression", chap: "fgen", titre: "Donner l'expression de f(x) d'un programme", format: "expression", forme: "developpee_reduite",
      niveaux: {
        1: () => {
          const a = ent(2, 9), b = ent(1, 9), s = signe(), seul = facile(1), c = seul ? [a, 0] : [a, s * b];
          const etapes = seul ? "multiplier par " + a : "multiplier par " + a + " ; " + (s > 0 ? "ajouter " : "soustraire ") + b;
          return {
            enonce: "Voici un programme de calcul : choisir un nombre ; " + etapes + ". On note $f(x)$ le résultat obtenu quand on choisit le nombre $x$. Donner $f(x)$ sous forme développée et réduite.", reponse: polyTexte(c),
            correction: "On suit le programme étape par étape : après la première étape on obtient $" + a + " \\times x = " + a + "x$" + (seul ? "" : " ; puis $" + polyLatex(c) + "$") + ". Donc $f(x) = " + polyLatex(c) + "$."
          };
        },
        2: () => {
          const simple = facile(2);
          // Familles alternées : multiplier / ajouter-soustraire
          const debutMult = !simple && Math.random() < 0.5, ops = [];
          const nb = simple ? 2 : 3;
          for (let i = 0; i < nb; i++) {
            const mult = debutMult ? i % 2 === 0 : i % 2 === 1;
            ops.push(mult ? { t: "multiplier par " + ent(2, 9) } : choix([{ t: "ajouter " + ent(1, 9) }, { t: "soustraire " + ent(1, 9) }]));
          }
          let c = [1, 0], latex = "x";
          const etapes = ops.map((o) => {
            const k = +o.t.match(/\d+/)[0];
            if (/multiplier/.test(o.t)) { latex = k + "(" + polyLatex(c) + ")"; c = [c[0] * k, c[1] * k]; latex = (c[1] === 0 ? polyLatex(c) : latex + " = " + polyLatex(c)); }
            else { c = [c[0], c[1] + (/ajouter/.test(o.t) ? k : -k)]; latex = polyLatex(c); }
            return "$" + latex + "$";
          });
          return {
            enonce: "Voici un programme de calcul : choisir un nombre ; " + ops.map((o) => o.t).join(" ; ") + ". On note $f(x)$ le résultat obtenu quand on choisit le nombre $x$. Donner $f(x)$ sous forme développée et réduite.", reponse: polyTexte(c),
            correction: "On suit le programme étape par étape : " + etapes.join(" ; puis ") + ". Donc $f(x) = " + polyLatex(c) + "$."
          };
        },
        3: () => {
          const forme = ent(1, 4), a = ent(2, 9), b = ent(1, 9), s = signe();
          let ops, c, etapes;
          if (forme === 1) { ops = [(s > 0 ? "ajouter " : "soustraire ") + b, "élever au carré"]; c = [1, 2 * s * b, b * b]; etapes = "$" + polyLatex([1, s * b]) + "$ ; puis $(" + polyLatex([1, s * b]) + ")^{2} = " + polyLatex(c) + "$"; }
          else if (forme === 2) { ops = ["élever au carré", "multiplier par " + a, "soustraire " + b]; c = [a, 0, -b]; etapes = "$x^{2}$ ; puis $" + a + "x^{2}$ ; puis $" + polyLatex(c) + "$"; }
          else if (forme === 3) { ops = ["multiplier par " + a, "ajouter " + b, "élever au carré"]; c = [a * a, 2 * a * b, b * b]; etapes = "$" + a + "x$ ; puis $" + polyLatex([a, b]) + "$ ; puis $(" + polyLatex([a, b]) + ")^{2} = " + polyLatex(c) + "$"; }
          else { ops = ["élever au carré", "ajouter " + b, "multiplier par " + a]; c = [a, 0, a * b]; etapes = "$x^{2}$ ; puis $x^{2} + " + b + "$ ; puis $" + a + "(x^{2} + " + b + ") = " + polyLatex(c) + "$"; }
          return {
            enonce: "Voici un programme de calcul : choisir un nombre ; " + ops.join(" ; ") + ". On note $f(x)$ le résultat obtenu quand on choisit le nombre $x$. Donner $f(x)$ sous forme développée et réduite.", reponse: polyTexte(c),
            correction: "On suit le programme étape par étape : " + etapes + ". Donc $f(x) = " + polyLatex(c) + "$."
          };
        }
      }
    },
    {
      id: "fg-expression-figure", chap: "fgen", titre: "Exprimer une longueur ou une aire avec x", format: "expression", forme: "developpee_reduite",
      niveaux: {
        1: () => {
          const aire = Math.random() < 0.5, fin = ", sous forme développée et réduite.";
          if (facile(1)) return aire ? { enonce: "Un carré a pour côté $x$ cm. Donner l'aire de ce carré" + fin, reponse: "x^2", correction: "L'aire est $x \\times x = x^{2}$." } : { enonce: "Un carré a pour côté $x$ cm. Donner le périmètre de ce carré" + fin, reponse: "4x", correction: "Le périmètre est $4 \\times x = 4x$." };
          const k = ent(2, 12);
          return aire
            ? { enonce: "Un rectangle a pour largeur $x$ cm et pour longueur $(x + " + k + ")$ cm. Donner l'aire de ce rectangle" + fin, reponse: polyTexte([1, k, 0]), correction: "L'aire est $x(x + " + k + ") = x \\times x + x \\times " + k + " = " + polyLatex([1, k, 0]) + "$." }
            : { enonce: "Un rectangle a pour largeur $x$ cm et pour longueur $(x + " + k + ")$ cm. Donner le périmètre de ce rectangle" + fin, reponse: polyTexte([4, 2 * k]), correction: "Le périmètre est $2(x + x + " + k + ") = 2(2x + " + k + ") = " + polyLatex([4, 2 * k]) + "$." };
        },
        2: () => {
          const k = ent(1, 9), fin = ", sous forme développée et réduite.";
          if (facile(2)) return { enonce: "Un carré a pour côté $(x + " + k + ")$ cm. Donner son périmètre" + fin, reponse: polyTexte([4, 4 * k]), correction: "Le périmètre est $4(x + " + k + ") = " + polyLatex([4, 4 * k]) + "$." };
          const cas = ent(1, 3);
          if (cas === 1) return { enonce: "Un carré a pour côté $(x + " + k + ")$ cm. Donner son aire" + fin, reponse: polyTexte([1, 2 * k, k * k]), correction: "L'aire est $(x + " + k + ")^{2} = x^{2} + 2 \\times x \\times " + k + " + " + k + "^{2} = " + polyLatex([1, 2 * k, k * k]) + "$." };
          if (cas === 2) return { enonce: "Un carré a pour côté $(x + " + k + ")$ cm. Donner son périmètre" + fin, reponse: polyTexte([4, 4 * k]), correction: "Le périmètre est $4(x + " + k + ") = " + polyLatex([4, 4 * k]) + "$." };
          const a = ent(1, 9), b = ent(1, 9), c = [1, a + b, a * b];
          return { enonce: "Un rectangle a pour côtés $(x + " + a + ")$ cm et $(x + " + b + ")$ cm. Donner son aire" + fin, reponse: polyTexte(c), correction: "L'aire est $(x + " + a + ")(x + " + b + ") = x^{2} + " + b + "x + " + a + "x + " + a * b + " = " + polyLatex(c) + "$." };
        },
        3: () => {
          const fin = ", sous forme développée et réduite.";
          if (Math.random() < 0.5) {
            const a = ent(1, 9), b = ent(1, 9), c = [0, a + b, a * b];
            return { enonce: "On retire un carré de côté $x$ cm d'un rectangle de côtés $(x + " + a + ")$ cm et $(x + " + b + ")$ cm. Donner l'aire de la partie restante" + fin, reponse: polyTexte(c), correction: "L'aire est $(x + " + a + ")(x + " + b + ") - x^{2} = x^{2} + " + (a + b) + "x + " + a * b + " - x^{2} = " + polyLatex(c) + "$." };
          }
          const a = ent(1, 9), b = ent(1, 9), c = [1, 2 * a, a * a - b * b];
          return { enonce: "On retire un carré de côté $" + b + "$ cm d'un carré de côté $(x + " + a + ")$ cm. Donner l'aire de la partie restante" + fin, reponse: polyTexte(c), correction: "L'aire est $(x + " + a + ")^{2} - " + b + "^{2} = x^{2} + " + 2 * a + "x + " + a * a + " - " + b * b + " = " + polyLatex(c) + "$." };
        }
      }
    },
    {
      id: "fg-expression-tarif", chap: "fgen", titre: "Exprimer un prix en fonction de x", format: "expression", forme: "developpee_reduite",
      niveaux: {
        1: () => {
          const s = choix(TARIFS.slice(0, 3)), a = ent(2, 9), b = ent(1, 30);
          if (facile(1)) return { enonce: "Un article coûte " + a + " € l'unité. Donner le prix de $x$ articles, en fonction de $x$.", reponse: a + "x", correction: "Le prix est $" + a + " \\times x = " + a + "x$." };
          return { enonce: s.debut(a, b) + " Donner le prix pour $x$ " + s.x + ", en fonction de $x$.", reponse: polyTexte([a, b]), correction: "Le prix est la somme des frais fixes et du prix à l'unité multiplié par $x$ : $" + b + " + " + a + " \\times x = " + polyLatex([a, b]) + "$." };
        },
        2: () => {
          const r = facile(2) ? 50 : choix([10, 15, 20, 25, 30, 40]), k = net(1 - r / 100);
          return { enonce: "Un article coûte $x$ euros. Il est soldé avec une remise de " + r + " %. Donner le nouveau prix, en fonction de $x$.", reponse: polyTexte([k, 0]), correction: "Une remise de " + r + " % multiplie le prix par $1 - \\dfrac{" + r + "}{100} = " + L(k) + "$. Le nouveau prix est $" + L(k) + "x$." };
        },
        3: () => {
          if (Math.random() < 0.5) {
            const s = choix(TARIFS.slice(0, 3)), a = ent(2, 9), b = ent(1, 30), r = choix([10, 20, 25, 30, 40, 50]), k = net(1 - r / 100), c = [net(k * a), net(k * b)];
            return { enonce: s.debut(a, b) + " Avec une remise de " + r + " % sur le total, donner le prix pour $x$ " + s.x + ", en fonction de $x$, sous forme développée et réduite.", reponse: polyTexte(c), correction: "Avant la remise, le prix est $" + polyLatex([a, b]) + "$ €. La remise de " + r + " % multiplie par $" + L(k) + "$ : $" + L(k) + "(" + polyLatex([a, b]) + ") = " + polyLatex(c) + "$." };
          }
          for (;;) {
            const u = choix([10, 20, 25, 30, 40, 50]), v = choix([10, 20, 25, 30, 40, 50]), k1 = net(1 + u / 100), k2 = net(1 - v / 100), k = net(k1 * k2);
            if (k === 1 || decimales(k) > 2) continue;
            return { enonce: "Un article coûte $x$ euros. Son prix augmente de " + u + " %, puis baisse de " + v + " %. Donner le prix final, en fonction de $x$.", reponse: polyTexte([k, 0]), correction: "Une hausse de " + u + " % multiplie par $" + L(k1) + "$ et une baisse de " + v + " % multiplie par $" + L(k2) + "$ : le prix final est $" + L(k1) + " \\times " + L(k2) + " \\times x = " + L(k) + "x$." };
          }
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("3e", fgen);
})();
