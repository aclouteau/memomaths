// Techniques d'entraînement de 3e : « Calcul littéral » (lit).
// D'après propositions/referentiels/3e/lit.json (lot 4) : les descriptions de niveau sont la spécification.
// Les techniques à réponse « expression » (format "expression", forme "developpee_reduite" ou "factorisee")
// sont corrigées par js/moteur/expressions.js ; la réponse attendue est écrite en texte simple ("x^2+6x+9").
(function () {
  const { L, P, ent, choix, net, nonNul, facile, pgcd, polyTexte, polyLatex, substituer } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const X = () => Savoirs.expressions;
  const signe = () => choix([1, -1]);
  const pm = (a, b) => { const v = ent(a, b); return v * signe(); }; // ±a à ±b
  // Termes [coefficient, degré] écrits à la suite, dans l'ordre donné : 8 + 7x + 6 + 6x
  const monome = (c, d) => (d > 0 && Math.abs(c) === 1 ? "" : String(Math.abs(c))) + (d > 0 ? "x" + (d > 1 ? "^{" + d + "}" : "") : "");
  const ecrireTermes = (l) => l.map(([c, d], i) => (i === 0 ? (c < 0 ? "-" : "") : c < 0 ? " - " : " + ") + monome(c, d)).join("");
  const reduire = (l) => { const c = [0, 0, 0]; l.forEach(([a, d]) => { c[2 - d] += a; }); return c; };
  const affine = (a, b) => polyLatex([a, b]);
  // (px + q) en LaTeX, entre parenthèses
  const par = (p, q) => "(" + affine(p, q) + ")";
  const evaluer = (texte, v) => X().evaluer(texte, { x: v });
  const COEF = { 2: "le coefficient de $x^{2}$", 1: "le coefficient de $x$", 0: "le terme constant" };
  // Produit (px + q)(sx + t) développé, étape par étape
  function double(p, q, s, t) {
    const termes = [[p * s, 2], [p * t, 1], [q * s, 1], [q * t, 0]].filter(([c]) => c !== 0);
    return { etape: ecrireTermes(termes), c: [p * s, p * t + q * s, q * t] };
  }

  // ---------- Générateurs communs (coefficient demandé, ou expression) ----------
  function tirerReduction(niveau) {
    if (niveau === 1) {
      const deux = facile(1), l = deux ? [[ent(1, 9), 1], [ent(1, 9), 1]] : melanger([[ent(1, 9), 1], [ent(1, 9), 1], [ent(1, 9), 0], [ent(1, 9), 0]]);
      return { latex: ecrireTermes(l), c: reduire(l), seulX: deux, deg: deux ? 1 : choix([1, 0]) };
    }
    if (niveau === 2) {
      const deux = facile(2);
      for (;;) {
        const l = deux ? [[pm(1, 9), 2], [pm(1, 9), 2]] : melanger([[pm(1, 9), 2], [pm(1, 9), 2], [pm(1, 9), 1], [pm(1, 9), 1], [pm(1, 9), 0], [pm(1, 9), 0]]);
        const c = reduire(l);
        if (deux ? c[0] === 0 : c.some((x) => x === 0)) continue;
        return { latex: ecrireTermes(l), c: c, deg: deux ? 2 : choix([2, 1, 0]) };
      }
    }
    for (;;) {
      const p = ent(1, 6), q = pm(1, 9), u = ent(1, 6), w = pm(1, 9), k = ent(2, 5), t = pm(1, 6), v = pm(1, 9);
      const A = p - u + k * t, B = q - w + k * v;
      if (A === 0 || B === 0) continue;
      const sans = ecrireTermes([[p, 1], [q, 0], [-u, 1], [-w, 0], [k * t, 1], [k * v, 0]]);
      return {
        latex: par(p, q) + " - " + par(u, w) + " + " + k + par(t, v), c: [0, A, B], deg: choix([1, 0]),
        etapes: "On supprime les parenthèses (le signe $-$ change les signes) et on distribue : $" + par(p, q) + " - " + par(u, w) + " + " + k + par(t, v) + " = " + sans + " = " + polyLatex([A, B]) + "$."
      };
    }
  }
  function tirerDeveloppement(niveau) {
    if (niveau === 1) {
      const k = ent(2, 9), a = facile(1) ? 1 : ent(2, 9), b = pm(1, 9);
      return { latex: k + par(a, b), c: [0, k * a, k * b], etapes: "$" + k + par(a, b) + " = " + k + " \\times " + monome(a, 1) + (b < 0 ? " - " : " + ") + k + " \\times " + Math.abs(b) + " = " + affine(k * a, k * b) + "$." };
    }
    if (niveau === 2) {
      if (facile(2)) { const b = pm(1, 9); return { latex: "x" + par(1, b), c: [1, b, 0], etapes: "$x" + par(1, b) + " = x \\times x + x \\times " + P(b) + " = " + polyLatex([1, b, 0]) + "$." }; }
      if (Math.random() < 0.6) {
        for (;;) {
          const a = pm(1, 9), b = pm(1, 9);
          if (a === b || a + b === 0) continue;
          const d = double(1, a, 1, b);
          return { latex: par(1, a) + par(1, b), c: d.c, etapes: "$" + par(1, a) + par(1, b) + " = " + d.etape + " = " + polyLatex(d.c) + "$." };
        }
      }
      for (;;) {
        const k = ent(2, 6), m = pm(2, 6), a = ent(1, 5), b = pm(1, 9), c = ent(1, 5), d = pm(1, 9), A = k * a + m * c, B = k * b + m * d;
        if (A === 0 || B === 0) continue;
        const latex = k + par(a, b) + (m < 0 ? " - " : " + ") + Math.abs(m) + par(c, d);
        return { latex: latex, c: [0, A, B], etapes: "On distribue : $" + latex + " = " + ecrireTermes([[k * a, 1], [k * b, 0], [m * c, 1], [m * d, 0]]) + "$. On regroupe : $" + affine(A, B) + "$." };
      }
    }
    for (;;) {
      const p = pm(1, 5), q = pm(1, 9), s = pm(1, 5), t = pm(1, 9);
      if (Math.abs(p) < 2 && Math.abs(s) < 2) continue;
      const d = double(p, q, s, t);
      if (d.c[1] === 0) continue;
      if (Math.random() < 0.6) return { latex: par(p, q) + par(s, t), c: d.c, etapes: "$" + par(p, q) + par(s, t) + " = " + d.etape + " = " + polyLatex(d.c) + "$." };
      const u = pm(1, 9), w = pm(1, 9), e = double(1, u, 1, w), c = [d.c[0] - 1, d.c[1] - e.c[1], d.c[2] - e.c[2]];
      if (c.some((x) => x === 0)) continue;
      const latex = par(p, q) + par(s, t) + " - " + par(1, u) + par(1, w);
      return {
        latex: latex, c: c,
        etapes: "On développe chaque produit : $" + par(p, q) + par(s, t) + " = " + polyLatex(d.c) + "$ et $" + par(1, u) + par(1, w) + " = " + polyLatex(e.c) + "$. Donc $" + latex + " = " + polyLatex(d.c) + " - (" + polyLatex(e.c) + ") = " + polyLatex(c) + "$."
      };
    }
  }
  function tirerIdentite(niveau) {
    if (niveau === 1) { const a = facile(1) ? 1 : ent(2, 12); return { latex: "(x + " + a + ")^{2}", c: [1, 2 * a, a * a], etapes: "$(x + " + a + ")^{2} = x^{2} + 2 \\times x \\times " + a + " + " + a + "^{2} = " + polyLatex([1, 2 * a, a * a]) + "$." }; }
    if (niveau === 2) {
      if (facile(2) || Math.random() < 0.5) {
        const a = facile(2) ? 1 : ent(2, 12);
        return { latex: "(x + " + a + ")(x - " + a + ")", c: [1, 0, -a * a], etapes: "$(x + " + a + ")(x - " + a + ") = x^{2} - " + a + "^{2} = " + polyLatex([1, 0, -a * a]) + "$." };
      }
      const a = ent(2, 9);
      return { latex: "(x - " + a + ")^{2}", c: [1, -2 * a, a * a], etapes: "$(x - " + a + ")^{2} = x^{2} - 2 \\times x \\times " + a + " + " + a + "^{2} = " + polyLatex([1, -2 * a, a * a]) + "$." };
    }
    const p = ent(2, 5), q = ent(1, 9);
    if (Math.random() < 0.6) {
      const s = signe(), c = [p * p, 2 * p * q * s, q * q];
      return { latex: "(" + p + "x " + (s < 0 ? "-" : "+") + " " + q + ")^{2}", c: c, etapes: "$(" + p + "x " + (s < 0 ? "-" : "+") + " " + q + ")^{2} = (" + p + "x)^{2} " + (s < 0 ? "-" : "+") + " 2 \\times " + p + "x \\times " + q + " + " + q + "^{2} = " + polyLatex(c) + "$." };
    }
    return { latex: "(" + p + "x + " + q + ")(" + p + "x - " + q + ")", c: [p * p, 0, -q * q], etapes: "$(" + p + "x + " + q + ")(" + p + "x - " + q + ") = (" + p + "x)^{2} - " + q + "^{2} = " + polyLatex([p * p, 0, -q * q]) + "$." };
  }
  // Factorisations : énoncé (coefficients développés), réponse factorisée (texte), étapes
  function tirerFactorisation(niveau) {
    if (niveau === 1) {
      for (;;) {
        const k = ent(2, 9), a = facile(1) ? 1 : ent(1, 6), b = pm(1, 9);
        if (pgcd(a, b) !== 1) continue;
        return { c: [0, k * a, k * b], k: k, reponse: k + "(" + polyTexte([a, b]) + ")", etapes: "Le plus grand facteur commun de $" + k * a + "$ et de $" + Math.abs(k * b) + "$ est $" + k + "$ : $" + affine(k * a, k * b) + " = " + k + "(" + affine(a, b) + ")$." };
      }
    }
    if (niveau === 2) {
      for (;;) {
        const g = facile(2) ? 1 : ent(2, 9), c = ent(1, 5), d = pm(1, 9);
        if (pgcd(c, d) !== 1) continue;
        const gx = g === 1 ? "x" : g + "x";
        return { c: [g * c, g * d, 0], k: g, reponse: gx + "(" + polyTexte([c, d]) + ")", etapes: "Le facteur commun est $" + gx + "$ : $" + polyLatex([g * c, g * d, 0]) + " = " + gx + "(" + affine(c, d) + ")$." };
      }
    }
    const forme = ent(1, 3);
    if (forme === 1) {
      for (;;) {
        const m = ent(1, 6), n = ent(2, 12);
        if (pgcd(m, n) !== 1) continue;
        const mx = m === 1 ? "x" : m + "x";
        return { c: [m * m, 0, -n * n], reponse: "(" + mx + "-" + n + ")(" + mx + "+" + n + ")", etapes: "C'est une différence de deux carrés : $" + polyLatex([m * m, 0, -n * n]) + " = (" + mx + ")^{2} - " + n + "^{2} = (" + mx + " - " + n + ")(" + mx + " + " + n + ")$." };
      }
    }
    if (forme === 2) {
      for (;;) {
        const p = ent(1, 4), q = pm(1, 9);
        if (pgcd(p, q) !== 1) continue;
        const c = [p * p, 2 * p * q, q * q], px = p === 1 ? "x" : p + "x";
        return { c: c, reponse: "(" + polyTexte([p, q]) + ")^2", etapes: "C'est le développement d'un carré : $" + polyLatex(c) + " = (" + px + ")^{2} " + (q < 0 ? "-" : "+") + " 2 \\times " + px + " \\times " + Math.abs(q) + " + " + Math.abs(q) + "^{2} = (" + affine(p, q) + ")^{2}$." };
      }
    }
    for (;;) {
      const a = pm(1, 9), b = pm(1, 5), c = pm(1, 9), d = pm(1, 5), e = pm(1, 9), moins = Math.random() < 0.5;
      const P2 = moins ? b - d : b + d, Q2 = moins ? c - e : c + e;
      if (P2 === 0 || Q2 === 0 || pgcd(P2, Q2) !== 1) continue;
      const latex = par(1, a) + par(b, c) + (moins ? " - " : " + ") + par(1, a) + par(d, e);
      return {
        latex: latex, reponse: "(" + polyTexte([1, a]) + ")(" + polyTexte([P2, Q2]) + ")", p: P2, q: Q2, a: a,
        etapes: "On met $" + par(1, a) + "$ en facteur : $" + latex + " = " + par(1, a) + "[" + par(b, c) + (moins ? " - " : " + ") + par(d, e) + "] = " + par(1, a) + par(P2, Q2) + "$."
      };
    }
  }

  // ---------- Programmes de calcul ----------
  const OPS = {
    mult: (k) => ({ texte: "multiplier par " + (k < 0 ? "−" + -k : k), f: (v) => v * k, inv: "Diviser par " + (k < 0 ? "−" + -k : k), finv: (v) => v / k, famille: "mult" }),
    plus: (k) => ({ texte: "ajouter " + k, f: (v) => v + k, inv: "Soustraire " + k, finv: (v) => v - k, famille: "add" }),
    moins: (k) => ({ texte: "soustraire " + k, f: (v) => v - k, inv: "Ajouter " + k, finv: (v) => v + k, famille: "add" }),
    carre: () => ({ texte: "élever au carré", f: (v) => v * v, famille: "carre" })
  };
  function programme(n, choisir) {
    for (;;) {
      const ops = [];
      while (ops.length < n) { const o = choisir(ops.length); if (ops.length && o.famille === ops[ops.length - 1].famille) continue; ops.push(o); }
      return ops;
    }
  }
  const majuscule = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const lit = [
    {
      id: "reduction-coef", chap: "lit", titre: "Réduire une expression", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((n) => [n, () => {
        const r = tirerReduction(n), reponse = r.c[2 - r.deg], quoi = COEF[r.deg];
        return {
          enonce: choix(["Réduire $" + r.latex + "$ : quel est " + quoi + " de l'expression réduite ?", "On réduit l'expression $" + r.latex + "$. Quel est " + quoi + " du résultat ?"]), reponse: reponse,
          correction: (r.etapes || "On regroupe les termes de même nature : $" + r.latex + " = " + polyLatex(r.c) + "$.") + " Donc " + quoi + " est $" + L(reponse) + "$."
        };
      }]))
    },
    {
      id: "valeur-expression", chap: "lit", titre: "Valeur d'une expression littérale", format: "nombre",
      niveaux: {
        1: () => { const a = ent(2, 9), b = nonNul(-9, 9), x = facile(1) ? 0 : ent(1, 9), r = a * x + b; return { enonce: "Quelle est la valeur de $" + affine(a, b) + "$ quand $x = " + x + "$ ?", reponse: r, correction: "On remplace $x$ par $" + x + "$ : $" + substituer(affine(a, b), x) + " = " + L(a * x) + (b < 0 ? " - " + -b : " + " + b) + " = " + r + "$." }; },
        2: () => {
          const x = facile(2) ? 0 : nonNul(-6, 6), a = ent(2, 5), b = ent(1, 9), forme = ent(1, 4);
          const c = forme === 1 ? [a * signe(), 0, b * signe()] : forme === 2 ? [a * signe(), b, 0] : forme === 3 ? [a * signe(), -b, 0] : [-a, 0, b];
          const latex = forme === 4 ? b + " - " + a + "x^{2}" : polyLatex(c), r = c[0] * x * x + c[1] * x + c[2];
          return { enonce: "Quelle est la valeur de $" + latex + "$ quand $x = " + x + "$ ?", reponse: r, correction: "On remplace $x$ par $" + x + "$ : $" + substituer(latex, x) + " = " + r + "$." };
        },
        3: () => {
          const x = nonNul(-6, 6);
          if (Math.random() < 0.5) {
            const c = [pm(1, 4), pm(1, 9), pm(1, 9)], latex = polyLatex(c), r = c[0] * x * x + c[1] * x + c[2];
            return { enonce: "Calculer $" + latex + "$ pour $x = " + x + "$.", reponse: r, correction: "On remplace $x$ par $" + x + "$ : $" + substituer(latex, x) + " = " + L(c[0] * x * x) + (c[1] * x < 0 ? " - " : " + ") + Math.abs(c[1] * x) + (c[2] < 0 ? " - " : " + ") + Math.abs(c[2]) + " = " + r + "$." };
          }
          const p = pm(1, 5), q = pm(1, 9), s = pm(1, 5), t = pm(1, 9), A = p * x + q, B = s * x + t, latex = par(p, q) + par(s, t);
          return { enonce: "Calculer $" + latex + "$ pour $x = " + x + "$.", reponse: A * B, correction: "On remplace $x$ par $" + x + "$ : $" + substituer(latex, x) + " = " + P(A) + " \\times " + P(B) + " = " + A * B + "$." };
        }
      }
    },
    {
      id: "developpement-coef", chap: "lit", titre: "Coefficient après développement", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((n) => [n, () => {
        let d, deg;
        if (n === 1) { const f = facile(1); d = tirerDeveloppement(1); deg = f ? 1 : choix([1, 0]); if (f) { const k = ent(2, 9), b = pm(1, 9); d = { latex: k + par(1, b), c: [0, k, k * b], etapes: "$" + k + par(1, b) + " = " + k + " \\times x " + (b < 0 ? "-" : "+") + " " + k + " \\times " + Math.abs(b) + " = " + affine(k, k * b) + "$." }; } }
        else if (n === 2) {
          if (facile(2)) { const a = pm(1, 9); let b; do { b = pm(1, 9); } while (b === a || a + b === 0); const e = double(1, a, 1, b); d = { latex: par(1, a) + par(1, b), c: e.c, etapes: "$" + par(1, a) + par(1, b) + " = " + e.etape + " = " + polyLatex(e.c) + "$." }; deg = 2; }
          else if (Math.random() < 0.6) { d = tirerDeveloppement(2); while (d.c[0] !== 1) d = tirerDeveloppement(2); deg = choix([1, 0]); }
          else { const a = pm(1, 9), c = [1, 2 * a, a * a]; d = { latex: par(1, a) + "^{2}", c: c, etapes: "$" + par(1, a) + "^{2} = x^{2} " + (a < 0 ? "-" : "+") + " 2 \\times x \\times " + Math.abs(a) + " + " + Math.abs(a) + "^{2} = " + polyLatex(c) + "$." }; deg = choix([1, 0]); }
        } else {
          for (;;) {
            if (Math.random() < 0.3) { const p = pm(2, 5), q = pm(1, 9), c = [p * p, 2 * p * q, q * q]; d = { latex: par(p, q) + "^{2}", c: c, etapes: "$" + par(p, q) + "^{2} = " + par(p, q) + par(p, q) + " = " + double(p, q, p, q).etape + " = " + polyLatex(c) + "$." }; }
            else d = tirerDeveloppement(3);
            if (d.c.every((x) => x !== 0)) break;
          }
          deg = choix([2, 1, 0]);
        }
        const r = d.c[2 - deg];
        return {
          enonce: choix(["Développer et réduire $" + d.latex + "$ : quel est " + COEF[deg] + " du résultat ?", "On développe et on réduit $" + d.latex + "$. Quel est " + COEF[deg] + " dans le résultat ?"]),
          reponse: r, correction: (n === 1 ? "On distribue : " : "") + d.etapes + " Donc " + COEF[deg] + " est $" + L(r) + "$."
        };
      }]))
    },
    // (« Calcul astucieux avec les identités remarquables » retiré à la demande de l'enseignant, avec le savoir lit-id-calc.)
    {
      id: "facteur-commun", chap: "lit", titre: "Factoriser", format: "nombre",
      niveaux: {
        1: () => { const f = tirerFactorisation(1); return { enonce: "On factorise $" + polyLatex(f.c) + "$ avec le plus grand facteur commun possible : $" + polyLatex(f.c) + " = k(\\dots)$. Quelle est la valeur de $k$ ?", reponse: f.k, correction: f.etapes + " Donc $k = " + f.k + "$." }; },
        2: () => { const f = tirerFactorisation(2); return { enonce: "On factorise $" + polyLatex(f.c) + "$ avec le plus grand facteur commun possible : $" + polyLatex(f.c) + " = kx(\\dots)$. Quelle est la valeur de $k$ ?", reponse: f.k, correction: f.etapes.replace("Le facteur commun est", "Le plus grand diviseur commun des coefficients est $" + f.k + "$ et $x$ est commun aux deux termes ; le facteur commun est") + " Donc $k = " + f.k + "$." }; },
        3: () => {
          if (Math.random() < 0.4) {
            for (;;) {
              const m = ent(2, 6), n = ent(2, 12);
              if (pgcd(m, n) !== 1) continue;
              const quoi = Math.random() < 0.5 ? "m" : "n";
              return {
                enonce: "On factorise $" + polyLatex([m * m, 0, -n * n]) + " = (mx - n)(mx + n)$, avec $m$ et $n$ positifs. Quelle est la valeur de $" + quoi + "$ ?", reponse: quoi === "m" ? m : n,
                correction: "C'est une différence de deux carrés : $" + polyLatex([m * m, 0, -n * n]) + " = (" + m + "x)^{2} - " + n + "^{2} = (" + m + "x - " + n + ")(" + m + "x + " + n + ")$. Donc $m = " + m + "$ et $n = " + n + "$."
              };
            }
          }
          let f; do { f = tirerFactorisation(3); } while (!f.latex);
          const quoi = Math.random() < 0.5 ? "p" : "q";
          return {
            enonce: "On factorise $" + f.latex + "$ en mettant $" + par(1, f.a) + "$ en facteur : $" + par(1, f.a) + "(px + q)$. Quelle est la valeur de $" + quoi + "$ ?", reponse: quoi === "p" ? f.p : f.q,
            correction: f.etapes + " Donc $p = " + f.p + "$ et $q = " + f.q + "$."
          };
        }
      }
    },
    {
      id: "programme-calcul", chap: "lit", titre: "Programmes de calcul", format: "nombre",
      niveaux: {
        1: () => {
          const n = facile(1) ? 0 : ent(1, 9), ops = programme(ent(2, 3), () => choix([OPS.mult(ent(2, 9)), OPS.plus(ent(1, 9)), OPS.moins(ent(1, 9))]));
          let v = n; const etapes = ops.map((o) => { v = o.f(v); return majuscule(o.texte) + " : $" + L(v) + "$."; });
          return { enonce: "Programme de calcul : choisir un nombre ; " + ops.map((o) => o.texte).join(" ; ") + ". Quel résultat obtient-on en choisissant $" + n + "$ ?", reponse: v, correction: "On choisit $" + n + "$. " + etapes.join(" ") + " Le résultat est $" + L(v) + "$." };
        },
        2: () => {
          for (;;) {
            const n = facile(2) ? 0 : nonNul(-6, 6), ops = programme(3, () => choix([OPS.mult(-ent(2, 5)), OPS.carre(), OPS.plus(ent(1, 9)), OPS.moins(ent(1, 9)), OPS.mult(ent(2, 9))]));
            if (!ops.some((o) => o.famille === "carre" || /−/.test(o.texte))) continue;
            let v = n; const etapes = ops.map((o) => { v = o.f(v); return majuscule(o.texte) + " : $" + L(v) + "$."; });
            return { enonce: "Voici un programme de calcul : choisir un nombre ; " + ops.map((o) => o.texte).join(" ; ") + ". Quel est le résultat si on choisit $" + n + "$ ?", reponse: v, correction: "On choisit $" + n + "$. " + etapes.join(" ") + " Le résultat est $" + L(v) + "$." };
          }
        },
        3: () => {
          const n = nonNul(-9, 9), ops = programme(ent(3, 4), () => choix([OPS.mult(pm(2, 6)), OPS.plus(ent(1, 9)), OPS.moins(ent(1, 9))]));
          let v = n; ops.forEach((o) => { v = o.f(v); });
          const r = v, etapes = ops.slice().reverse().map((o) => { v = o.finv(v); return o.inv + " : $" + L(v) + "$."; });
          return {
            enonce: "Programme de calcul : choisir un nombre ; " + ops.map((o) => o.texte).join(" ; ") + ". Le résultat obtenu est $" + L(r) + "$. Quel était le nombre de départ ?", reponse: n,
            correction: "Le résultat est $" + L(r) + "$. On remonte le programme en partant de la fin, avec les opérations inverses : " + etapes.join(" ") + " Le nombre choisi est $" + L(n) + "$."
          };
        }
      }
    },
    {
      id: "egalite-valeur", chap: "lit", titre: "Une égalité est-elle vraie ?", format: "choix", options: ["oui", "non"],
      niveaux: (function () {
        // Égalité gauche = droite (textes simples), testée pour x = v
        function ex(gauche, droite, v) {
          const G = X().latex(gauche), D = X().latex(droite), g = evaluer(gauche, v), d = evaluer(droite, v), oui = g === d;
          return {
            enonce: choix(["L'égalité $" + G + " = " + D + "$ est-elle vraie pour $x = " + L(v) + "$ ?", "Pour $x = " + L(v) + "$, a-t-on l'égalité $" + G + " = " + D + "$ ?"]),
            reponse: oui ? "oui" : "non",
            correction: "On remplace $x$ par $" + L(v) + "$. À gauche : $" + substituer(G, v) + " = " + L(g) + "$. À droite : $" + substituer(D, v) + " = " + L(d) + "$. " +
              (oui ? "Les deux résultats sont égaux : l'égalité est vraie pour $x = " + L(v) + "$." : "Les deux résultats sont différents ($" + L(g) + " \\neq " + L(d) + "$) : l'égalité est fausse pour $x = " + L(v) + "$.")
          };
        }
        return {
          1: () => { const k = ent(2, 9), a = ent(1, 9), v = facile(1) ? 0 : ent(1, 9); return ex(k + "(x+" + a + ")", Math.random() < 0.5 ? k + "x+" + k * a : k + "x+" + a, v); },
          2: () => {
            const v = facile(2) ? 0 : nonNul(-6, 6), vraie = Math.random() < 0.5;
            if (Math.random() < 0.5) { const a = ent(1, 9); return ex("-(x-" + a + ")", vraie ? "-x+" + a : "-x-" + a, v); }
            let a, b; do { a = pm(1, 9); b = pm(1, 9); } while (a === -b);
            return ex("(" + polyTexte([1, a]) + ")(" + polyTexte([1, b]) + ")", vraie ? polyTexte([1, a + b, a * b]) : polyTexte([1, 0, a * b]), v);
          },
          3: () => {
            const a = ent(2, 9), vraie = Math.random() < 0.5, forme = ent(1, 3);
            let v = nonNul(-8, 8);
            if (forme === 1) return ex("(x+" + a + ")^2", vraie ? polyTexte([1, 2 * a, a * a]) : polyTexte([1, 0, a * a]), v);
            if (forme === 2) { if (!vraie && Math.random() < 0.3) v = a; return ex("(x-" + a + ")^2", vraie ? polyTexte([1, -2 * a, a * a]) : polyTexte([1, 0, -a * a]), v); }
            return ex("(x+" + a + ")(x-" + a + ")", vraie ? polyTexte([1, 0, -a * a]) : polyTexte([1, 0, a * a]), v);
          }
        };
      })()
    },
    {
      id: "completer-egalite", chap: "lit", titre: "Compléter une égalité", format: "nombre",
      niveaux: {
        1: () => {
          const a = ent(2, 9), m = facile(1) ? 1 : ent(2, 9), s = signe(), b = a * m;
          return {
            enonce: "Quel nombre faut-il écrire à la place du point d'interrogation pour que l'égalité $" + a + "x " + (s < 0 ? "-" : "+") + " " + b + " = " + a + "(x " + (s < 0 ? "-" : "+") + " ?)$ soit vraie ?", reponse: m,
            correction: "Il faut que $" + a + " \\times ? = " + b + "$, donc $? = \\dfrac{" + b + "}{" + a + "} = " + m + "$. On vérifie : $" + a + "(x " + (s < 0 ? "-" : "+") + " " + m + ") = " + a + "x " + (s < 0 ? "-" : "+") + " " + b + "$."
          };
        },
        2: () => {
          const g = ent(2, 9), c = ent(1, 5), d = pm(1, 9), forme = ent(1, 3), q = "Quel nombre faut-il écrire à la place du point d'interrogation pour que l'égalité $";
          if (forme === 1) return { enonce: q + affine(g * c, g * d) + " = ?(" + affine(c, d) + ")$ soit vraie ?", reponse: g, correction: "Il faut que $? \\times " + c + " = " + g * c + "$, donc $? = " + g + "$. On vérifie : $" + g + " \\times " + P(d) + " = " + g * d + "$." };
          if (forme === 2) return { enonce: q + affine(g * c, g * d) + " = " + g + "(?x " + (d < 0 ? "-" : "+") + " " + Math.abs(d) + ")$ soit vraie ?", reponse: c, correction: "Il faut que $" + g + " \\times ? = " + g * c + "$, donc $? = \\dfrac{" + g * c + "}{" + g + "} = " + c + "$." };
          const G = facile(2) ? 1 : g, gx = G === 1 ? "x" : G + "x";
          return { enonce: q + polyLatex([G * c, G * d, 0]) + " = " + gx + "(?x " + (d < 0 ? "-" : "+") + " " + Math.abs(d) + ")$ soit vraie ?", reponse: c, correction: "Il faut que $" + G + " \\times ? = " + G * c + "$, donc $? = \\dfrac{" + G * c + "}{" + G + "} = " + c + "$. On vérifie avec le terme en $x$ : $" + G + " \\times " + P(d) + " = " + G * d + "$." };
        },
        3: () => {
          const m = ent(2, 12), n = ent(2, 6), forme = ent(1, 5), s = signe(), sg = s < 0 ? "-" : "+", q = "Quel nombre faut-il écrire à la place du point d'interrogation pour que l'égalité $";
          if (forme === 1) return { enonce: q + polyLatex([1, 2 * m * s, m * m]) + " = (x " + sg + " ?)^{2}$ soit vraie ?", reponse: m, correction: "Le double produit est $2 \\times x \\times ? = " + 2 * m + "x$, donc $? = \\dfrac{" + 2 * m + "}{2} = " + m + "$. On vérifie : $" + m + "^{2} = " + m * m + "$." };
          if (forme === 2) return { enonce: q + "x^{2} " + sg + " ?x + " + m * m + " = (x " + sg + " " + m + ")^{2}$ soit vraie ?", reponse: 2 * m, correction: "$(x " + sg + " " + m + ")^{2} = x^{2} " + sg + " 2 \\times x \\times " + m + " + " + m + "^{2} = " + polyLatex([1, 2 * m * s, m * m]) + "$, donc $? = " + 2 * m + "$." };
          if (forme === 3) return { enonce: q + "x^{2} - " + m * m + " = (x - ?)(x + ?)$ soit vraie ?", reponse: m, correction: "C'est une différence de deux carrés : $x^{2} - " + m * m + " = x^{2} - " + m + "^{2} = (x - " + m + ")(x + " + m + ")$, donc $? = " + m + "$." };
          if (forme === 4) return { enonce: q + polyLatex([n * n, 0, -m * m]) + " = (" + n + "x - ?)(" + n + "x + ?)$ soit vraie ?", reponse: m, correction: "C'est une différence de deux carrés : $" + polyLatex([n * n, 0, -m * m]) + " = (" + n + "x)^{2} - " + m + "^{2} = (" + n + "x - " + m + ")(" + n + "x + " + m + ")$, donc $? = " + m + "$." };
          return { enonce: q + polyLatex([n * n, 2 * n * m, m * m]) + " = (" + n + "x + ?)^{2}$ soit vraie ?", reponse: m, correction: "Le double produit est $2 \\times " + n + "x \\times ? = " + 2 * n * m + "x$, donc $? = \\dfrac{" + 2 * n * m + "}{" + 2 * n + "} = " + m + "$. On vérifie : $" + m + "^{2} = " + m * m + "$." };
        }
      }
    },
    {
      id: "reduire-expression", chap: "lit", titre: "Réduire une expression (réponse : l'expression)", format: "expression", forme: "developpee_reduite",
      niveaux: Object.fromEntries([1, 2, 3].map((n) => [n, () => {
        const r = tirerReduction(n);
        return {
          enonce: choix(["Écrire sous forme réduite l'expression $" + r.latex + "$.", "Réduire l'expression $" + r.latex + "$."]), reponse: polyTexte(r.c),
          correction: (r.etapes || "On regroupe les termes de même nature : $" + r.latex + " = " + polyLatex(r.c) + "$.") + " L'expression réduite est $" + polyLatex(r.c) + "$."
        };
      }]))
    },
    {
      id: "developper-expression", chap: "lit", titre: "Développer et réduire (réponse : l'expression)", format: "expression", forme: "developpee_reduite",
      niveaux: Object.fromEntries([1, 2, 3].map((n) => [n, () => { const d = tirerDeveloppement(n); return { enonce: "Développer puis réduire $" + d.latex + "$.", reponse: polyTexte(d.c), correction: d.etapes }; }]))
    },
    {
      id: "developper-identite", chap: "lit", titre: "Développer avec une identité remarquable (réponse : l'expression)", format: "expression", forme: "developpee_reduite",
      niveaux: Object.fromEntries([1, 2, 3].map((n) => [n, () => { const d = tirerIdentite(n); return { enonce: "Développer et réduire l'expression $" + d.latex + "$.", reponse: polyTexte(d.c), correction: d.etapes }; }]))
    },
    {
      id: "factoriser-expression", chap: "lit", titre: "Factoriser (réponse : l'expression)", format: "expression", forme: "factorisee",
      niveaux: Object.fromEntries([1, 2, 3].map((n) => [n, () => {
        const f = tirerFactorisation(n);
        return { enonce: "Factoriser " + (f.latex ? "l'expression $" + f.latex + "$" : "$" + polyLatex(f.c) + "$") + ".", reponse: f.reponse, correction: f.etapes };
      }]))
    }
  ];

  Savoirs.enregistrerTechniques("3e", lit);
})();
