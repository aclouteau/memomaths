// Techniques d'entraînement de 5e : « Calcul littéral » (lit).
// D'après propositions/referentiels/5e/lit.json (lot 5) : les descriptions de niveau sont la spécification.
// Cinq techniques ont une réponse « expression » (js/moteur/expressions.js) ; la factorisation est au programme.
(function () {
  const { L, T, ent, choix, net, decimal, facile, pgcd, polyTexte, polyLatex } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  const P = (x) => (x < 0 ? "(" + L(x) + ")" : L(x));
  const MULTIPLES = { 2: "double", 3: "triple", 4: "quadruple", 5: "quintuple" };
  // Termes [coefficient, degré] écrits à la suite, dans l'ordre donné
  const monome = (c, d) => (d > 0 && Math.abs(c) === 1 ? "" : String(Math.abs(c))) + (d > 0 ? "x" + (d > 1 ? "^{" + d + "}" : "") : "");
  const ecrire = (l) => l.map(([c, d], i) => (i === 0 ? (c < 0 ? "-" : "") : c < 0 ? " - " : " + ") + monome(c, d)).join("");
  const regroupe = (l) => {
    const c = [0, 0, 0], parts = [];
    [2, 1, 0].forEach((d) => {
      const t = l.filter(([, e]) => e === d);
      if (!t.length) return;
      const s = t.reduce((a, [k]) => a + k, 0); c[2 - d] = s;
      parts.push((d === 2 ? "les termes en $x^{2}$ : $" : d === 1 ? "les termes en $x$ : $" : "les termes constants : $") + ecrire(t) + " = " + polyLatex(d === 2 ? [s, 0, 0] : d === 1 ? [s, 0] : [s]) + "$");
    });
    return { c: c, texte: "On regroupe les termes de même nature : " + parts.join(" ; ") + ". L'expression réduite est $" + polyLatex(c) + "$." };
  };

  const lit = [
    {
      id: "lit-valeur", chap: "lit", titre: "Valeur d'une expression", format: "nombre",
      niveaux: {
        1: () => {
          const x = ent(1, 9), b = ent(1, 20);
          if (facile(1)) return { enonce: "Calculer $x + " + b + "$ pour $x = " + x + "$.", reponse: x + b, correction: "On remplace $x$ par $" + x + "$ : $" + x + " + " + b + " = " + (x + b) + "$." };
          for (;;) {
            const a = ent(2, 9), moins = Math.random() < 0.5, r = moins ? a * x - b : a * x + b;
            if (r < 0) continue;
            return { enonce: "Calculer $" + a + "x " + (moins ? "-" : "+") + " " + b + "$ pour $x = " + x + "$.", reponse: r, correction: "On remplace $x$ par $" + x + "$ : $" + a + " \\times " + x + " " + (moins ? "-" : "+") + " " + b + " = " + a * x + " " + (moins ? "-" : "+") + " " + b + " = " + r + "$." };
          }
        },
        2: () => {
          const a = ent(2, 9), b = ent(2, 9), c = ent(1, 20);
          if (facile(2)) { const x = ent(2, 9); return { enonce: "Calculer $" + a + "x$ pour $x = " + x + "$.", reponse: a * x, correction: "On remplace $x$ par $" + x + "$ : $" + a + " \\times " + x + " = " + a * x + "$." }; }
          const cas = ent(1, 4);
          if (cas === 1) { const x = ent(2, 9), r = a * x * x + c; return { enonce: "Calculer $" + a + "x^{2} + " + c + "$ pour $x = " + x + "$.", reponse: r, correction: "On remplace $x$ par $" + x + "$ : $" + a + " \\times " + x + "^{2} + " + c + " = " + a + " \\times " + x * x + " + " + c + " = " + a * x * x + " + " + c + " = " + r + "$." }; }
          if (cas === 2) { const x = Math.random() < 0.5 ? ent(2, 9) : dec(1.1, 5.9), r = net(a * x + b * x + c); return { enonce: "Calculer $" + a + "x + " + b + "x + " + c + "$ pour $x = " + L(x) + "$.", reponse: r, correction: "On remplace $x$ par $" + L(x) + "$ : $" + a + " \\times " + L(x) + " + " + b + " \\times " + L(x) + " + " + c + " = " + L(net(a * x)) + " + " + L(net(b * x)) + " + " + c + " = " + L(r) + "$." }; }
          const x = ent(1, 9), y = ent(1, 9);
          if (cas === 3) { const r = a * x + b * y; return { enonce: "Calculer $" + a + "x + " + b + "y$ pour $x = " + x + "$ et $y = " + y + "$.", reponse: r, correction: "On remplace $x$ par $" + x + "$ et $y$ par $" + y + "$ : $" + a + " \\times " + x + " + " + b + " \\times " + y + " = " + a * x + " + " + b * y + " = " + r + "$." }; }
          const r = a * (x + y);
          return { enonce: "Calculer $" + a + "(x + y)$ pour $x = " + x + "$ et $y = " + y + "$.", reponse: r, correction: "On remplace $x$ par $" + x + "$ et $y$ par $" + y + "$ : $" + a + " \\times (" + x + " + " + y + ") = " + a + " \\times " + (x + y) + " = " + r + "$." };
        },
        3: () => {
          const a = ent(2, 9), b = ent(2, 9), x = ent(2, 9), cas = ent(1, 4);
          if (cas === 1) { for (;;) { const c = ent(1, 60), r = a * x * x - c; if (r >= 0) return { enonce: "Calculer $" + a + "x^{2} - " + c + "$ pour $x = " + x + "$.", reponse: r, correction: "On remplace $x$ par $" + x + "$ : $" + a + " \\times " + x + "^{2} - " + c + " = " + a + " \\times " + x * x + " - " + c + " = " + a * x * x + " - " + c + " = " + r + "$." }; } }
          if (cas === 2) { const r = a * x * x + b * x; return { enonce: "Calculer $" + a + "x^{2} + " + b + "x$ pour $x = " + x + "$.", reponse: r, correction: "On remplace $x$ par $" + x + "$ : $" + a + " \\times " + x + "^{2} + " + b + " \\times " + x + " = " + a * x * x + " + " + b * x + " = " + r + "$." }; }
          if (cas === 3) { const y = ent(2, 9), r = a * (x + y); return { enonce: "Calculer $" + a + "(x + y)$ pour $x = " + x + "$ et $y = " + y + "$.", reponse: r, correction: "On remplace : $" + a + " \\times (" + x + " + " + y + ") = " + a + " \\times " + (x + y) + " = " + r + "$." }; }
          const xd = dec(1.1, 5.9), c = ent(1, 20), r = net(a * xd + c);
          return { enonce: "Calculer $" + a + "x + " + c + "$ pour $x = " + L(xd) + "$.", reponse: r, correction: "On remplace $x$ par $" + L(xd) + "$ : $" + a + " \\times " + L(xd) + " + " + c + " = " + L(net(a * xd)) + " + " + c + " = " + L(r) + "$." };
        }
      }
    },
    {
      id: "lit-egalite", chap: "lit", titre: "Une égalité est-elle vraie ?", format: "choix", options: ["oui", "non"],
      niveaux: {
        1: () => {
          const a = ent(2, 9), b = ent(1, 9), x = ent(1, 9), vraie = facile(1) || Math.random() < 0.5, g = a * x + b, c = vraie ? g : g + choix([1, -1, 2, -2, 3]);
          return { enonce: "L'égalité $" + a + "x + " + b + " = " + c + "$ est-elle vraie pour $x = " + x + "$ ?", reponse: vraie ? "oui" : "non", correction: "Pour $x = " + x + "$ : $" + a + " \\times " + x + " + " + b + " = " + a * x + " + " + b + " = " + g + "$. " + (vraie ? "C'est bien égal à " + c + " : l'égalité est vraie." : "Ce n'est pas égal à " + c + " : l'égalité est fausse.") };
        },
        2: () => {
          for (;;) {
            const [a, c] = facile(2) ? [5, 2] : [ent(1, 9), ent(1, 9)], b = ent(1, 20), x = ent(1, 9), vraie = Math.random() < 0.5;
            if (a === c) continue;
            // Vraie : d choisi pour que les deux membres soient égaux pour cette valeur de x
            const d = vraie ? a * x + b - c * x : b + ent(-5, 5);
            if (d < 0 || (!vraie && a * x + b === c * x + d)) continue;
            const g = a * x + b, dr = c * x + d, ok = g === dr;
            return { enonce: "L'égalité $" + polyLatex([a, b]) + " = " + polyLatex([c, d]) + "$ est-elle vraie pour $x = " + x + "$ ?", reponse: ok ? "oui" : "non", correction: "Pour $x = " + x + "$ : le membre de gauche vaut $" + (a === 1 ? "" : a + " \\times ") + x + " + " + b + " = " + g + "$ et le membre de droite vaut $" + (c === 1 ? "" : c + " \\times ") + x + (d ? " + " + d : "") + " = " + dr + "$. " + (ok ? "Les deux membres sont égaux : l'égalité est vraie." : "Les deux membres sont différents : l'égalité est fausse.") };
          }
        },
        3: () => {
          const x = ent(1, 9), cas = ent(1, 3);
          if (cas === 1) { const k = ent(1, 9), g = x * x, d = k * x, ok = g === d; return { enonce: "L'égalité $x^{2} = " + k + "x$ est-elle vraie pour $x = " + x + "$ ?", reponse: ok ? "oui" : "non", correction: "Pour $x = " + x + "$ : $" + x + "^{2} = " + g + "$ et $" + k + " \\times " + x + " = " + d + "$. " + (ok ? "C'est égal : l'égalité est vraie." : "Ce n'est pas égal : l'égalité est fausse.") }; }
          if (cas === 2) { const k = ent(2, 9), a = ent(1, 9), b = choix([k * a, a]), g = k * (x + a), d = k * x + b, ok = g === d; return { enonce: "L'égalité $" + k + "(x + " + a + ") = " + k + "x + " + b + "$ est-elle vraie pour $x = " + x + "$ ?", reponse: ok ? "oui" : "non", correction: "Pour $x = " + x + "$ : $" + k + " \\times (" + x + " + " + a + ") = " + k + " \\times " + (x + a) + " = " + g + "$ et $" + k + " \\times " + x + " + " + b + " = " + k * x + " + " + b + " = " + d + "$. " + (ok ? "C'est égal : l'égalité est vraie." : "Ce n'est pas égal : l'égalité est fausse.") }; }
          const F = choix([["x + x", "2x", (v) => v + v, (v) => 2 * v], ["x \\times x", "x^{2}", (v) => v * v, (v) => v * v], ["x \\times x", "2x", (v) => v * v, (v) => 2 * v], ["3x + 2x", "5x^{2}", (v) => 5 * v, (v) => 5 * v * v], ["3x + 2x", "5x", (v) => 5 * v, (v) => 5 * v]]);
          const g = F[2](x), d = F[3](x), ok = g === d;
          return { enonce: "L'égalité $" + F[0] + " = " + F[1] + "$ est-elle vraie pour $x = " + x + "$ ?", reponse: ok ? "oui" : "non", correction: "Pour $x = " + x + "$ : le membre de gauche vaut $" + g + "$ et le membre de droite vaut $" + d + "$. " + (ok ? "C'est égal : l'égalité est vraie pour $x = " + x + "$." : "Ce n'est pas égal : l'égalité est fausse.") };
        }
      }
    },
    {
      id: "lit-reduire-expr", chap: "lit", titre: "Réduire une expression", format: "expression", forme: "developpee_reduite",
      niveaux: {
        1: () => { const l = facile(1) ? [[ent(1, 9), 1], [ent(1, 9), 1]] : melanger([[ent(1, 9), 1], [ent(1, 9), 1], [ent(1, 9), 0], [ent(1, 9), 0]]), r = regroupe(l); return { enonce: "Réduire l'expression $" + ecrire(l) + "$.", reponse: polyTexte(r.c), correction: r.texte }; },
        2: () => {
          if (facile(2)) { const l = melanger([[ent(1, 9), 1], [ent(1, 9), 1], [ent(1, 9), 0]]), r = regroupe(l); return { enonce: "Réduire l'expression $" + ecrire(l) + "$.", reponse: polyTexte(r.c), correction: r.texte }; }
          for (;;) {
            const a = ent(2, 9), c = ent(1, a - 1), b = ent(2, 15), d = ent(1, b - 1), l = melanger([[a, 1], [-c, 1], [b, 0], [-d, 0]].concat(Math.random() < 0.5 ? [[ent(1, 9), 1]] : []));
            if (l[0][0] < 0) continue;
            const r = regroupe(l);
            if (r.c.some((x, i) => i > 0 && x <= 0)) continue;
            return { enonce: "Réduire l'expression $" + ecrire(l) + "$.", reponse: polyTexte(r.c), correction: r.texte };
          }
        },
        3: () => {
          for (;;) {
            const l = melanger([[ent(1, 9), 2], [ent(1, 9), 2], [ent(1, 9), 1], [ent(1, 9), 1], [ent(1, 9), 0], [ent(1, 9), 0]]);
            if (Math.random() < 0.7) { const i = ent(1, 5); l[i] = [-l[i][0], l[i][1]]; }
            const r = regroupe(l);
            if (r.c.some((x) => x <= 0)) continue;
            return { enonce: "Réduire l'expression $" + ecrire(l) + "$.", reponse: polyTexte(r.c), correction: r.texte };
          }
        }
      }
    },
    {
      id: "lit-developper-expr", chap: "lit", titre: "Développer une expression", format: "expression", forme: "developpee_reduite",
      niveaux: {
        1: () => { const k = ent(2, 9), a = facile(1) ? 1 : ent(1, 12); return { enonce: "Développer $" + k + "(x + " + a + ")$.", reponse: polyTexte([k, k * a]), correction: "$" + k + "(x + " + a + ") = " + k + " \\times x + " + k + " \\times " + a + " = " + polyLatex([k, k * a]) + "$." }; },
        2: () => {
          const k = ent(2, 9);
          if (facile(2)) { const b = ent(1, 9); return { enonce: "Développer et réduire $" + k + "(x + " + b + ")$.", reponse: polyTexte([k, k * b]), correction: "$" + k + "(x + " + b + ") = " + k + " \\times x + " + k + " \\times " + b + " = " + polyLatex([k, k * b]) + "$." }; }
          if (Math.random() < 0.5) { const a = ent(2, 9), b = ent(1, 9); return { enonce: "Développer et réduire $" + k + "(" + a + "x + " + b + ")$.", reponse: polyTexte([k * a, k * b]), correction: "$" + k + "(" + a + "x + " + b + ") = " + k + " \\times " + a + "x + " + k + " \\times " + b + " = " + polyLatex([k * a, k * b]) + "$." }; }
          const c = ent(3, 10), d = ent(1, 9);
          return { enonce: "Développer et réduire $" + k + "(" + c + "x - " + d + ")$.", reponse: polyTexte([k * c, -k * d]), correction: "$" + k + "(" + c + "x - " + d + ") = " + k + " \\times " + c + "x - " + k + " \\times " + d + " = " + polyLatex([k * c, -k * d]) + "$." };
        },
        3: () => {
          const k = ent(2, 9);
          if (Math.random() < 0.5) { const a = ent(2, 6), b = ent(1, 9), m = ent(1, 20), c = [k * a, k * b + m]; return { enonce: "Développer et réduire $" + k + "(" + a + "x + " + b + ") + " + m + "$.", reponse: polyTexte(c), correction: "$" + k + "(" + a + "x + " + b + ") + " + m + " = " + k * a + "x + " + k * b + " + " + m + " = " + polyLatex(c) + "$." }; }
          const l = ent(2, 9), b = ent(1, 9), c = ent(1, 9), r = [k + l, k * b + l * c];
          return { enonce: "Développer et réduire $" + k + "(x + " + b + ") + " + l + "(x + " + c + ")$.", reponse: polyTexte(r), correction: "$" + k + "(x + " + b + ") + " + l + "(x + " + c + ") = " + k + "x + " + k * b + " + " + l + "x + " + l * c + " = " + polyLatex(r) + "$." };
        }
      }
    },
    {
      id: "lit-factoriser-expr", chap: "lit", titre: "Factoriser une expression", format: "expression", forme: "factorisee",
      niveaux: {
        1: () => { const k = ent(2, 9), a = facile(1) ? 1 : ent(2, 12); return { enonce: "Factoriser $" + k + "x + " + k + " \\times " + a + "$.", reponse: k + "(x+" + a + ")", correction: "Le facteur commun est $" + k + "$ : $" + k + "x + " + k + " \\times " + a + " = " + k + " \\times x + " + k + " \\times " + a + " = " + k + "(x + " + a + ")$." }; },
        2: () => { const k = ent(2, 9), a = facile(2) ? 1 : ent(2, 12), moins = Math.random() < 0.5, s = moins ? " - " : " + "; return { enonce: "Factoriser $" + k + "x" + s + k * a + "$.", reponse: k + "(x" + (moins ? "-" : "+") + a + ")", correction: "Le facteur commun est $" + k + "$ car $" + k * a + " = " + k + " \\times " + a + "$ : $" + k + "x" + s + k * a + " = " + k + " \\times x" + s + k + " \\times " + a + " = " + k + "(x" + s + a + ")$." }; },
        3: () => {
          if (Math.random() < 0.4) { const a = ent(2, 12); return { enonce: "Factoriser $x^{2} + " + a + "x$.", reponse: "x(x+" + a + ")", correction: "Le facteur commun est $x$ : $x^{2} + " + a + "x = x \\times x + x \\times " + a + " = x(x + " + a + ")$." }; }
          for (;;) {
            const g = ent(2, 6), p = ent(2, 5), q = ent(1, 9), moins = Math.random() < 0.5, s = moins ? " - " : " + ";
            if (pgcd(p, q) !== 1) continue;
            return { enonce: "Factoriser $" + g * p + "x" + s + g * q + "$.", reponse: g + "(" + p + "x" + (moins ? "-" : "+") + q + ")", correction: "Le plus grand facteur commun de $" + g * p + "$ et $" + g * q + "$ est $" + g + "$ : $" + g * p + "x" + s + g * q + " = " + g + " \\times " + p + "x" + s + g + " \\times " + q + " = " + g + "(" + p + "x" + s + q + ")$." };
          }
        }
      }
    },
    {
      id: "lit-ecrire-expr", chap: "lit", titre: "Écrire une expression", format: "expression", forme: "quelconque",
      niveaux: {
        1: () => {
          if (facile(1)) return { enonce: "Écrire l'expression « le triple de $x$ ».", reponse: "3x", correction: "Le triple de $x$ s'écrit $3x$." };
          const k = ent(2, 5), b = ent(1, 12), plus = Math.random() < 0.5;
          return { enonce: "Écrire l'expression « le " + MULTIPLES[k] + " de $x$, " + (plus ? "augmenté" : "diminué") + " de " + b + " ».", reponse: polyTexte([k, plus ? b : -b]), correction: "Le " + MULTIPLES[k] + " de $x$ s'écrit $" + k + "x$ ; on " + (plus ? "ajoute" : "retranche") + " $" + b + "$ : $" + polyLatex([k, plus ? b : -b]) + "$." };
        },
        2: () => {
          if (facile(2)) return { enonce: "Un carré a pour côté $x$ cm. Écrire son périmètre en fonction de $x$.", reponse: "4x", correction: "Le périmètre est $4 \\times x = 4x$." };
          const cas = ent(1, 3);
          if (cas === 1) { const p = ent(1, 4), s = ent(1, 9); return { enonce: "Un cahier coûte " + p + " € et un stylo coûte " + s + " €. Écrire le prix de $x$ cahiers et d'un stylo, en fonction de $x$.", reponse: polyTexte([p, s]), correction: "$x$ cahiers coûtent $" + p + " \\times x = " + p + "x$ € ; avec le stylo : $" + polyLatex([p, s]) + "$." }; }
          if (cas === 2) { const l = ent(2, 9); return { enonce: "Un rectangle a pour largeur $x$ cm et pour longueur " + l + " cm. Écrire son périmètre en fonction de $x$.", reponse: "2(x+" + l + ")", correction: "Le périmètre est $2 \\times (\\text{largeur} + \\text{longueur}) = 2 \\times (x + " + l + ") = 2(x + " + l + ")$ (ou $2x + " + 2 * l + "$)." }; }
          const k = ent(2, 5), b = ent(1, 9);
          return { enonce: "Écrire l'expression « le " + MULTIPLES[k] + " de la somme de $x$ et de " + b + " ».", reponse: k + "(x+" + b + ")", correction: "La somme de $x$ et de " + b + " s'écrit $x + " + b + "$ ; son " + MULTIPLES[k] + " s'écrit $" + k + "(x + " + b + ")$." };
        },
        3: () => {
          const cas = ent(1, 4);
          if (cas === 1) { const a = ent(1, 9), b = ent(1, 9), c = [3, a - b]; return { enonce: "Tom a $x$ ans. Sa sœur a " + a + " an" + (a > 1 ? "s" : "") + " de plus que lui et son frère a " + b + " an" + (b > 1 ? "s" : "") + " de moins que lui. Écrire la somme de leurs trois âges en fonction de $x$.", reponse: polyTexte(c), correction: "Les âges sont $x$, $x + " + a + "$ et $x - " + b + "$. Leur somme est $x + (x + " + a + ") + (x - " + b + ") = " + polyLatex(c) + "$." }; }
          if (cas === 2) { const n = ent(3, 5), c = [n, n * (n - 1) / 2], t = Array.from({ length: n }, (_, i) => (i ? "x + " + i : "x")); return { enonce: "On note $x$ le plus petit de " + { 3: "trois", 4: "quatre", 5: "cinq" }[n] + " entiers consécutifs. Écrire leur somme en fonction de $x$.", reponse: polyTexte(c), correction: "Les nombres sont " + t.map((s) => "$" + s + "$").join(", ") + ". Leur somme est $" + t.map((s, i) => (i ? "(" + s + ")" : s)).join(" + ") + " = " + polyLatex(c) + "$." }; }
          const k = ent(1, 9);
          if (cas === 3) { const c = [3, 2 * k]; return { enonce: "Un triangle isocèle a pour base $x$ cm et ses deux côtés égaux mesurent $(x + " + k + ")$ cm. Écrire son périmètre en fonction de $x$.", reponse: polyTexte(c), correction: "Le périmètre est $x + (x + " + k + ") + (x + " + k + ") = " + polyLatex(c) + "$." }; }
          return { enonce: "Un rectangle a pour largeur $x$ cm et pour longueur $(x + " + k + ")$ cm. Écrire son aire en fonction de $x$.", reponse: "x(x+" + k + ")", correction: "L'aire est $x \\times (x + " + k + ") = x(x + " + k + ")$ (ou $" + polyLatex([1, k, 0]) + "$)." };
        }
      }
    },
    {
      id: "lit-programme-expr", chap: "lit", titre: "Programme de calcul et expression", format: "expression", forme: "developpee_reduite",
      niveaux: {
        1: () => {
          const a = ent(2, 9), b = ent(1, 9), plus = Math.random() < 0.5;
          if (facile(1)) return { enonce: "Programme : choisir un nombre $x$ ; multiplier par " + a + ". Écrire le résultat en fonction de $x$.", reponse: a + "x", correction: "Après la multiplication : $" + a + " \\times x = " + a + "x$." };
          return { enonce: "Programme : choisir un nombre $x$ ; multiplier par " + a + " ; " + (plus ? "ajouter " : "soustraire ") + b + ". Écrire le résultat en fonction de $x$.", reponse: polyTexte([a, plus ? b : -b]), correction: "Après la multiplication : $" + a + " \\times x = " + a + "x$. Puis on " + (plus ? "ajoute" : "soustrait") + " " + b + " : $" + polyLatex([a, plus ? b : -b]) + "$." };
        },
        2: () => {
          const a = ent(2, 9), b = ent(1, 9);
          if (facile(2)) return { enonce: "Programme : choisir un nombre $x$ ; multiplier par " + a + " ; ajouter " + b + ". Écrire le résultat en fonction de $x$ sous forme développée et réduite.", reponse: polyTexte([a, b]), correction: "Après la multiplication : $" + a + "x$. Puis on ajoute " + b + " : $" + polyLatex([a, b]) + "$." };
          return { enonce: "Programme : choisir un nombre $x$ ; ajouter " + b + " ; multiplier par " + a + ". Écrire le résultat en fonction de $x$ sous forme développée et réduite.", reponse: polyTexte([a, a * b]), correction: "Après l'addition : $x + " + b + "$. Puis on multiplie par " + a + " : $" + a + "(x + " + b + ") = " + polyLatex([a, a * b]) + "$." };
        },
        3: () => {
          const a = ent(2, 9), b = ent(1, 9), c = ent(2, 9);
          if (Math.random() < 0.5) { const r = [a * c, b * c]; return { enonce: "Programme : choisir un nombre $x$ ; multiplier par " + a + " ; ajouter " + b + " ; multiplier par " + c + ". Écrire le résultat en fonction de $x$ sous forme développée et réduite.", reponse: polyTexte(r), correction: "Après la multiplication par " + a + " : $" + a + "x$. Après l'addition : $" + a + "x + " + b + "$. Puis on multiplie par " + c + " : $" + c + "(" + a + "x + " + b + ") = " + polyLatex(r) + "$." }; }
          const d = ent(1, 9), r = [a, a * b + d];
          return { enonce: "Programme : choisir un nombre $x$ ; ajouter " + b + " ; multiplier par " + a + " ; ajouter " + d + ". Écrire le résultat en fonction de $x$ sous forme développée et réduite.", reponse: polyTexte(r), correction: "Après l'addition : $x + " + b + "$. Après la multiplication : $" + a + "(x + " + b + ") = " + polyLatex([a, a * b]) + "$. Puis on ajoute " + d + " : $" + polyLatex(r) + "$." };
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("5e", lit);
})();
