// Techniques d'entraînement de 5e : « Opérations sur les nombres relatifs » (rel2).
// D'après propositions/referentiels/5e/rel2.json (lot 8) : les descriptions de niveau sont la spécification.
// Vocabulaire : « valeur absolue » (vue en 5e, décision de l'enseignant) ; pas de multiplication ni de règle des signes (4e).
(function () {
  const { L, S, ent, choix, net, nonNul, facile } = Savoirs.calculsOutils;
  const signe = () => choix([1, -1]);
  const dec1 = () => { for (;;) { const k = ent(11, 99); if (k % 10) return k / 10; } }; // 1,1 à 9,9
  // Somme de deux relatifs, expliquée avec les valeurs absolues
  function explSomme(a, b) {
    const r = net(a + b), da = Math.abs(a), db = Math.abs(b);
    if (a === 0 || b === 0) return "$" + L(r) + "$";
    if (a * b > 0) return "Même signe : on additionne les valeurs absolues ($" + L(da) + " + " + L(db) + " = " + L(net(da + db)) + "$) et on garde le signe : $" + L(r) + "$.";
    if (da === db) return "Deux nombres opposés : leur somme est $0$.";
    return "Signes contraires : on soustrait les valeurs absolues ($" + L(Math.max(da, db)) + " - " + L(Math.min(da, db)) + " = " + L(net(Math.abs(da - db))) + "$) et on garde le signe du nombre qui a la plus grande valeur absolue : $" + L(r) + "$.";
  }
  // Écriture simplifiée d'une suite (a1) ± (a2) ± … : ops[i] = +1 (addition) ou -1 (soustraction)
  function simplifiee(termes, ops) {
    return termes.map((t, i) => { if (i === 0) return L(t); const s = ops[i - 1] * t; return (s < 0 ? " - " : " + ") + L(Math.abs(t)); }).join("");
  }
  function avecParentheses(termes, ops) { return termes.map((t, i) => (i === 0 ? S(t) : (ops[i - 1] > 0 ? " + " : " - ") + S(t))).join(""); }

  const rel2 = [
    {
      id: "rel2-addition", chap: "rel2", titre: "Additionner des nombres relatifs", format: "nombre",
      niveaux: {
        1: () => {
          let a, b;
          if (facile(1)) { a = ent(1, 10); b = ent(1, 10); } else do { a = nonNul(-10, 10); b = nonNul(-10, 10); } while (a > 0 && b > 0);
          return { enonce: "Calculer $" + S(a) + " + " + S(b) + "$.", reponse: a + b, correction: explSomme(a, b) };
        },
        2: () => {
          let a, b;
          if (facile(2)) { a = ent(11, 60); b = ent(1, 60); }
          else if (Math.random() < 0.5) { do { a = ent(11, 60) * signe(); b = nonNul(-60, 60); } while (a > 0 && b > 0); }
          else { do { a = dec1() * signe(); b = nonNul(-9, 9); } while (a > 0 && b > 0); if (Math.random() < 0.5) [a, b] = [b, a]; }
          return { enonce: "Calculer $" + S(a) + " + " + S(b) + "$.", reponse: net(a + b), correction: explSomme(a, b) };
        },
        3: () => {
          for (;;) {
            const n = ent(3, 4), t = Array.from({ length: n }, () => nonNul(-15, 15));
            if (!t.some((x) => x > 0) || !t.some((x) => x < 0)) continue;
            const pos = t.filter((x) => x > 0).reduce((s, x) => s + x, 0), neg = t.filter((x) => x < 0).reduce((s, x) => s + x, 0);
            return {
              enonce: "Calculer $" + t.map(S).join(" + ") + "$.", reponse: pos + neg,
              correction: "On regroupe les positifs : $" + L(pos) + "$ ; puis les négatifs : $" + L(neg) + "$. Résultat : $" + L(pos) + " + " + S(neg) + " = " + L(pos + neg) + "$."
            };
          }
        }
      }
    },
    {
      id: "rel2-soustraction", chap: "rel2", titre: "Soustraire des nombres relatifs", format: "nombre",
      niveaux: {
        1: () => {
          if (facile(1)) { const a = ent(5, 10), b = ent(1, a - 1); return { enonce: "Calculer $" + a + " - " + b + "$.", reponse: a - b, correction: "$" + a + " - " + b + " = " + (a - b) + "$." }; }
          let a, b; do { a = ent(-10, 10); b = nonNul(-10, 10); } while (a > 0 && b > 0 && b < a);
          return { enonce: "Calculer $" + S(a) + " - " + S(b) + "$.", reponse: a - b, correction: "Soustraire $" + S(b) + "$, c'est ajouter son opposé $" + S(-b) + "$ : $" + S(a) + " + " + S(-b) + " = " + L(a - b) + "$." };
        },
        2: () => {
          if (facile(2)) { const a = ent(20, 50), b = ent(1, a - 1); return { enonce: "Calculer $" + S(a) + " - " + S(b) + "$.", reponse: a - b, correction: "$" + a + " - " + b + " = " + (a - b) + "$." }; }
          let a, b; do { a = Math.random() < 0.3 ? dec1() * signe() : nonNul(-50, 50); b = nonNul(-50, 50); } while (a > 0 && b > 0 && b < a);
          const r = net(a - b);
          return { enonce: "Calculer $" + S(a) + " - " + S(b) + "$.", reponse: r, correction: "Soustraire $" + S(b) + "$, c'est ajouter son opposé $" + S(-b) + "$ : $" + S(a) + " + " + S(-b) + " = " + L(r) + "$." };
        },
        3: () => {
          const a = nonNul(-20, 20), b = nonNul(-20, 20), c = nonNul(-20, 20), r = a - b - c;
          return { enonce: "Calculer $" + S(a) + " - " + S(b) + " - " + S(c) + "$.", reponse: r, correction: "Soustraire, c'est ajouter l'opposé : $" + S(a) + " + " + S(-b) + " + " + S(-c) + " = " + L(r) + "$." };
        }
      }
    },
    {
      id: "rel2-suite", chap: "rel2", titre: "Suite d'additions et de soustractions", format: "nombre",
      niveaux: {
        1: () => {
          for (;;) {
            const t = [ent(1, 10), ent(1, 10), ent(1, 10)], ops = [choix([1, -1]), choix([1, -1])];
            if (!ops.includes(-1)) continue;
            const r1 = t[0] + ops[0] * t[1], r = r1 + ops[1] * t[2];
            if (facile(1) ? (r1 < 0 || r < 0) : false) continue;
            const e = simplifiee(t, ops);
            return { enonce: "Calculer $" + e + "$.", reponse: r, correction: "On calcule de gauche à droite : $" + L(t[0]) + (ops[0] > 0 ? " + " : " - ") + t[1] + " = " + L(r1) + "$ ; $" + L(r1) + (ops[1] > 0 ? " + " : " - ") + t[2] + " = " + L(r) + "$." };
          }
        },
        2: () => {
          const t = facile(2) ? [ent(1, 15), ent(1, 15), ent(1, 15), ent(1, 15)] : [nonNul(-15, 15), ent(1, 15), ent(1, 15), ent(1, 15)];
          const ops = facile(2) ? [1, 1, 1] : [choix([1, -1]), choix([1, -1]), choix([1, -1])];
          let v = t[0]; const etapes = [];
          for (let i = 1; i < 4; i++) { const avant = v; v += ops[i - 1] * t[i]; etapes.push("$" + L(avant) + (ops[i - 1] > 0 ? " + " : " - ") + t[i] + " = " + L(v) + "$"); }
          return { enonce: "Calculer $" + simplifiee(t, ops) + "$.", reponse: v, correction: "On calcule de gauche à droite : " + etapes.join(" ; ") + "." };
        },
        3: () => {
          const a = nonNul(-15, 15), b = ent(1, 15), c = ent(1, 15), plus = Math.random() < 0.5, p = b - c, r = plus ? a + p : a - p;
          return {
            enonce: "Calculer $" + L(a) + (plus ? " + " : " - ") + "(" + b + " - " + c + ")$.", reponse: r,
            correction: "On calcule d'abord la parenthèse : $" + b + " - " + c + " = " + L(p) + "$. Puis $" + L(a) + (plus ? " + " : " - ") + S(p) + " = " + L(r) + "$."
          };
        }
      }
    },
    {
      id: "rel2-trou", chap: "rel2", titre: "Nombre manquant", format: "nombre",
      niveaux: {
        1: () => {
          let a, x;
          if (facile(1)) { a = ent(1, 10); x = ent(1, 10); } else do { a = nonNul(-10, 10); x = nonNul(-10, 10); } while (a > 0 && x > 0);
          const s = a + x;
          return { enonce: "Quel nombre faut-il ajouter à $" + L(a) + "$ pour obtenir $" + L(s) + "$ ?", reponse: x, correction: "On cherche $x$ tel que $" + L(a) + " + x = " + L(s) + "$ : $x = " + L(s) + " - " + S(a) + " = " + L(x) + "$." };
        },
        2: () => {
          let a, x;
          if (facile(2)) { a = ent(1, 30); x = ent(1, 30); } else do { a = nonNul(-30, 30); x = nonNul(-30, 30); } while (a > 0 && x > 0);
          const s = a + x;
          return { enonce: "Compléter : $" + S(a) + " + \\ldots = " + L(s) + "$.", reponse: x, correction: "Le nombre cherché est $" + L(s) + " - " + S(a) + " = " + L(x) + "$." };
        },
        3: () => {
          let a, x, d; do { a = dec1() * signe(); x = dec1() * signe(); d = net(a - x); } while (d === 0);
          return { enonce: "Compléter : $" + S(a) + " - \\ldots = " + L(d) + "$.", reponse: x, correction: "On cherche $x$ tel que $" + S(a) + " - x = " + L(d) + "$, donc $x = " + S(a) + " - " + S(d) + " = " + L(x) + "$." };
        }
      }
    },
    {
      id: "rel2-ecriture", chap: "rel2", titre: "Écriture simplifiée", format: "choix", options: ["oui", "non"],
      niveaux: (function () {
        function ex(n, premierPositif, facileCas) {
          const t = Array.from({ length: n }, (_, i) => (i === 0 && premierPositif ? ent(1, 12) : nonNul(-12, 12)));
          const ops = Array.from({ length: n - 1 }, () => (facileCas ? 1 : choix([1, -1])));
          if (facileCas) t[1] = -Math.abs(t[1]);
          const juste = simplifiee(t, ops), oui = facileCas || Math.random() < 0.5;
          let propose = juste;
          if (!oui) { // un signe faux : celui d'un terme pris au hasard (pas le premier)
            const i = ent(1, n - 1), faux = ops.slice(); faux[i - 1] = -faux[i - 1]; propose = simplifiee(t, faux);
          }
          const details = t.slice(1).map((x, i) => "$" + (ops[i] > 0 ? "+ " : "- ") + S(x) + "$ s'écrit $" + ((ops[i] * x < 0) ? "- " : "+ ") + L(Math.abs(x)) + "$").join(" ; ");
          return {
            enonce: "L'écriture simplifiée de $" + avecParentheses(t, ops) + "$ est-elle $" + propose + "$ ?", reponse: oui ? "oui" : "non",
            correction: details + ". L'écriture simplifiée est $" + juste + "$ : " + (oui ? "oui." : "non.")
          };
        }
        return { 1: () => ex(2, true, facile(1)), 2: () => ex(facile(2) ? 2 : 3, true, false), 3: () => ex(4, false, false) };
      })()
    }
  ];

  Savoirs.enregistrerTechniques("5e", rel2);
})();
