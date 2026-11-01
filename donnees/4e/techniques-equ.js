// Techniques d'entraînement de 4e : « Équations » (equ).
// D'après propositions/referentiels/4e/equ.json (lot 6) : les descriptions de niveau sont la spécification.
// Solutions entières aux niveaux 1 et 2 (format nombre), fraction irréductible au niveau 3.
(function () {
  const { L, T, ent, choix, facile, pgcd, nonNul } = Savoirs.calculsOutils;
  const P = (x) => (x < 0 ? "(" + L(x) + ")" : L(x));
  // Monôme ax écrit simplement : 2x, -x, x
  const ax = (a, v) => (a === 1 ? "" : a === -1 ? "-" : L(a)) + (v || "x");
  const plus = (b) => (b < 0 ? " - " + L(-b) : " + " + L(b)); // + 5, - 5
  const lin = (a, b) => ax(a) + (b ? plus(b) : ""); // ax + b
  // Fraction irréductible : réponse "n/d" (ou "n" si entière) et écriture LaTeX
  function frac(n, d) { if (d < 0) { n = -n; d = -d; } const g = pgcd(n, d) || 1; return { n: n / g, d: d / g }; }
  const repFrac = (f) => (f.d === 1 ? String(f.n) : f.n + "/" + f.d);
  const texFrac = (f) => (f.d === 1 ? L(f.n) : (f.n < 0 ? "-" : "") + "\\dfrac{" + Math.abs(f.n) + "}{" + f.d + "}");
  // Étapes de la classe
  const oterConstante = (b) => (b > 0 ? "On retranche $" + L(b) + "$ aux deux membres" : "On ajoute $" + L(-b) + "$ aux deux membres");
  const oterX = (c) => (c > 0 ? "On retranche $" + ax(c) + "$ aux deux membres" : "On ajoute $" + ax(-c) + "$ aux deux membres");
  // Fin de la résolution : a x = s  →  x = s / a
  function diviser(a, s) {
    const f = frac(s, a);
    if (a === 1) return { texte: "", f: f };
    return { texte: " On divise les deux membres par $" + L(a) + "$ : $x = \\dfrac{" + L(s) + "}{" + L(a) + "}" + (f.d === 1 ? " = " + L(f.n) : f.n !== s || f.d !== a ? " = " + texFrac(f) : "") + "$.", f: f };
  }
  const consigneFrac = " Donner la solution sous forme de fraction irréductible.";

  // ---------- ax + b = c ----------
  function simple(niveau) {
    let a, b, x, c;
    if (niveau === 1) {
      a = ent(2, 9); b = ent(1, 20); x = ent(1, 12);
      if (facile(1)) { if (Math.random() < 0.5) a = 1; else b = 0; }
    } else if (niveau === 2) {
      if (facile(2)) { a = ent(2, 9); b = ent(1, 20); x = ent(1, 12); }
      else do { a = nonNul(-9, 9); b = nonNul(-20, 20); x = nonNul(-12, 12); } while (Math.abs(a) < 2 || (a > 0 && b > 0 && x > 0 && a * x + b > 0));
    } else {
      do { a = ent(-7, 9); b = nonNul(-20, 20); c = ent(-20, 20); } while (Math.abs(a) < 2 || (c - b) % a === 0);
    }
    if (niveau < 3) c = a * x + b;
    const etape1 = b ? oterConstante(b) + " : $" + ax(a) + " = " + L(c - b) + "$." : "", d = diviser(a, c - b);
    return {
      enonce: "Résoudre l'équation $" + lin(a, b) + " = " + L(c) + "$." + (niveau === 3 ? consigneFrac : ""),
      format: niveau === 3 ? "fraction" : "nombre",
      reponse: niveau === 3 ? repFrac(d.f) : x,
      correction: (etape1 + d.texte).trim() || "$x = " + L(c) + "$."
    };
  }

  // ---------- ax + b = cx + d ----------
  function deuxCotes(niveau) {
    let a, b, c, d, x;
    if (niveau === 1) {
      do { a = ent(2, 9); c = ent(1, 8); } while (a <= c);
      x = ent(1, 12); b = ent(1, 15);
      if (facile(1)) c = 0;
      d = (a - c) * x + b;
    } else if (niveau === 2) {
      if (facile(2)) { do { a = ent(2, 9); c = ent(1, 8); } while (a <= c); x = ent(1, 10); b = ent(1, 15); }
      else do { a = nonNul(-9, 9); c = nonNul(-9, 9); x = nonNul(-10, 10); b = nonNul(-15, 15); } while (a === c || (a > 0 && c > 0 && x > 0 && b > 0));
      d = (a - c) * x + b;
    } else {
      do { a = nonNul(-9, 9); c = nonNul(-9, 9); b = nonNul(-12, 12); d = nonNul(-12, 12); } while (a === c || (d - b) % (a - c) === 0);
    }
    const e = a - c, droite = c ? lin(c, d) : L(d);
    let corr = "";
    if (c) corr += oterX(c) + " : $" + lin(e, b) + " = " + L(d) + "$. ";
    corr += oterConstante(b) + " : $" + ax(e) + " = " + L(d - b) + "$.";
    const fin = diviser(e, d - b);
    return {
      enonce: "Résoudre l'équation $" + lin(a, b) + " = " + droite + "$." + (niveau === 3 ? consigneFrac : ""),
      format: niveau === 3 ? "fraction" : "nombre",
      reponse: niveau === 3 ? repFrac(fin.f) : x,
      correction: corr + fin.texte
    };
  }

  // ---------- a(x + b) = c ----------
  const paren = (a, b) => (a === -1 ? "-" : L(a)) + "(x" + plus(b) + ")";
  function parentheses(niveau) {
    let a, b, x;
    if (niveau === 1) {
      a = ent(2, 9); b = ent(1, 9); x = ent(1, 10);
      if (facile(1)) { const c = a * x; return { enonce: "Résoudre l'équation $" + a + " \\times x = " + c + "$.", format: "nombre", reponse: x, correction: "On divise les deux membres par $" + a + "$ : $x = \\dfrac{" + c + "}{" + a + "} = " + x + "$." }; }
    } else if (niveau === 2) {
      if (facile(2)) { a = ent(2, 7); b = ent(1, 9); x = ent(1, 9); }
      else do { a = nonNul(-7, 7); b = nonNul(-9, 9); x = nonNul(-9, 9); } while (Math.abs(a) < 2 || (a > 0 && b > 0 && x > 0));
    } else return parentheses3();
    const c = a * (x + b), ab = a * b;
    return {
      enonce: "Résoudre l'équation $" + paren(a, b) + " = " + L(c) + "$.", format: "nombre", reponse: x,
      correction: "On développe : $" + lin(a, ab) + " = " + L(c) + "$. " + oterConstante(ab) + " : $" + ax(a) + " = " + L(c - ab) + "$." + diviser(a, c - ab).texte
    };
  }
  function parentheses3() {
    let a, b, c, d, e, s;
    if (Math.random() < 0.5) { // a(x + b) = c(x + d)
      do { a = nonNul(-6, 6); b = nonNul(-9, 9); c = nonNul(-6, 6); d = nonNul(-9, 9); } while (Math.abs(a) < 2 || Math.abs(c) < 2 || a === c || a * b === c * d);
      const ab = a * b, cd = c * d, k = a - c, f = diviser(k, cd - ab);
      return {
        enonce: "Résoudre l'équation $" + paren(a, b) + " = " + paren(c, d) + "$. Donner la solution sous forme de fraction irréductible ou d'entier.",
        format: "fraction", reponse: repFrac(f.f),
        correction: "On développe : $" + lin(a, ab) + " = " + lin(c, cd) + "$. " + oterX(c) + " : $" + lin(k, ab) + " = " + L(cd) + "$. " + oterConstante(ab) + " : $" + ax(k) + " = " + L(cd - ab) + "$." + f.texte
      };
    }
    // a(x + b) ± c = e
    do { a = nonNul(-6, 6); b = nonNul(-9, 9); s = nonNul(-12, 12); e = ent(-20, 20); } while (Math.abs(a) < 2 || a * b + s === 0);
    const ab = a * b, k = ab + s, f = diviser(a, e - k);
    return {
      enonce: "Résoudre l'équation $" + paren(a, b) + plus(s) + " = " + L(e) + "$. Donner la solution sous forme de fraction irréductible ou d'entier.",
      format: "fraction", reponse: repFrac(f.f),
      correction: "On développe : $" + lin(a, ab) + plus(s) + " = " + L(e) + "$, soit $" + lin(a, k) + " = " + L(e) + "$. " + oterConstante(k) + " : $" + ax(a) + " = " + L(e - k) + "$." + f.texte
    };
  }

  // ---------- Équation avec une fraction ----------
  function fraction(niveau) {
    if (niveau === 1) {
      const a = facile(1) ? 2 : ent(2, 9), c = ent(1, 12);
      return { enonce: "Résoudre l'équation $\\dfrac{x}{" + a + "} = " + c + "$.", format: "nombre", reponse: a * c, correction: "On multiplie les deux membres par $" + a + "$ : $x = " + c + " \\times " + a + " = " + a * c + "$." };
    }
    if (niveau === 2) {
      const simple = facile(2), a = simple ? 2 : ent(2, 9), b = simple ? ent(1, 15) : nonNul(-15, 15), c = simple ? ent(b + 1, b + 12) : ent(-8, 12), q = c - b, x = a * q;
      return {
        enonce: "Résoudre l'équation $\\dfrac{x}{" + a + "}" + plus(b) + " = " + L(c) + "$.", format: "nombre", reponse: x,
        correction: oterConstante(b) + " : $\\dfrac{x}{" + a + "} = " + L(c) + (b > 0 ? " - " + L(b) : " + " + L(-b)) + " = " + L(q) + "$. On multiplie par $" + a + "$ : $x = " + P(q) + " \\times " + a + " = " + L(x) + "$."
      };
    }
    let a, b, c, d;
    do { a = ent(2, 9); b = ent(2, 9); c = nonNul(-10, 10); d = ent(-10, 10); } while (pgcd(a, b) !== 1 || (d - c) % a === 0 || d === c);
    const q = d - c, f = frac(b * q, a);
    return {
      enonce: "Résoudre l'équation $\\dfrac{" + a + "x}{" + b + "}" + plus(c) + " = " + L(d) + "$." + consigneFrac, format: "fraction", reponse: repFrac(f),
      correction: oterConstante(c) + " : $\\dfrac{" + a + "x}{" + b + "} = " + L(q) + "$. On multiplie par $" + b + "$ : $" + a + "x = " + P(q) + " \\times " + b + " = " + L(b * q) + "$. On divise par $" + a + "$ : $x = " + texFrac(f) + "$."
    };
  }

  // ---------- Ce nombre est-il solution ? ----------
  function solution(niveau) {
    const oui = Math.random() < 0.5;
    if (niveau === 1) {
      const a = ent(2, 9), b = ent(1, 15), x = ent(1, 10), c = a * x + b;
      let t = x; if (!oui) do { t = x + choix([-3, -2, -1, 1, 2, 3]); } while (t < 1);
      const v = a * t + b;
      return { enonce: "Le nombre $" + t + "$ est-il solution de l'équation $" + lin(a, b) + " = " + c + "$ ?", reponse: v === c ? "oui" : "non",
        correction: "Pour $x = " + t + "$ : $" + a + " \\times " + t + " + " + b + " = " + v + "$. " + (v === c ? "Cela vaut bien $" + c + "$ : oui." : "Cela ne vaut pas $" + c + "$ : non.") };
    }
    if (niveau === 2) {
      let a, b, c, d, x;
      do { a = nonNul(-9, 9); c = nonNul(-9, 9); x = ent(-8, 10); b = nonNul(-15, 15); } while (a === c);
      d = (a - c) * x + b;
      let t = x; if (!oui && !facile(2)) do { t = x + choix([-2, -1, 1, 2]); } while (t < -8 || t > 10);
      const g = a * t + b, dr = c * t + d;
      return { enonce: "Le nombre $" + L(t) + "$ est-il solution de l'équation $" + lin(a, b) + " = " + lin(c, d) + "$ ?", reponse: g === dr ? "oui" : "non",
        correction: "Pour $x = " + L(t) + "$ : le membre de gauche vaut $" + L(a) + " \\times " + P(t) + plus(b) + " = " + L(g) + "$ et celui de droite vaut $" + L(c) + " \\times " + P(t) + plus(d) + " = " + L(dr) + "$. " +
          (g === dr ? "Ils sont égaux : oui." : "Ils ne sont pas égaux : non.") };
    }
    // Valeur fractionnaire p/q dans ax + b = c, avec a multiple de q
    let q, m, p, b;
    do { q = ent(2, 7); m = choix([1, 1, 2, -1]); p = nonNul(-9, 9); b = nonNul(-12, 12); } while (pgcd(Math.abs(p), q) !== 1 || Math.abs(q * m) > 9);
    const a = q * m, c = m * p + b;
    let pt = p; if (!oui) do { pt = p + choix([-2, -1, 1, 2]); } while (pt === 0 || pgcd(Math.abs(pt), q) !== 1);
    const v = m * pt + b, ft = texFrac({ n: pt, d: q });
    return {
      enonce: "Le nombre $" + ft + "$ est-il solution de l'équation $" + lin(a, b) + " = " + L(c) + "$ ?", reponse: v === c ? "oui" : "non",
      correction: "Pour $x = " + ft + "$ : $" + L(a) + " \\times " + (pt < 0 ? "\\left(" + ft + "\\right)" : ft) + " = " + L(m * pt) + "$, puis $" + L(m * pt) + plus(b) + " = " + L(v) + "$. " + (v === c ? "Cela vaut bien $" + L(c) + "$ : oui." : "Cela ne vaut pas $" + L(c) + "$ : non.")
    };
  }

  // ---------- Mise en équation ----------
  function probleme(niveau) {
    if (niveau === 1) {
      const a = facile(1) ? 2 : ent(2, 9), b = ent(1, 15), x = ent(1, 15), c = a * x + b;
      return {
        enonce: "Je pense à un nombre. Je le multiplie par " + a + ", puis j'ajoute " + b + " : j'obtiens " + c + ". Quel est ce nombre ?", reponse: x,
        correction: "Soit $x$ le nombre. L'équation est $" + a + "x + " + b + " = " + c + "$. On retranche $" + b + "$ aux deux membres : $" + a + "x = " + (c - b) + "$. On divise les deux membres par $" + a + "$ : $x = \\dfrac{" + (c - b) + "}{" + a + "} = " + x + "$. Le nombre cherché est $" + x + "$."
      };
    }
    if (niveau === 2) {
      let e, x, Pm;
      do { e = facile(2) ? 2 * ent(1, 3) : ent(2, 12); x = ent(3, 25); Pm = 4 * x + 2 * e; } while (Pm < 20 || Pm > 120);
      return {
        enonce: "Ce rectangle a pour périmètre " + Pm + " cm. Sa longueur dépasse sa largeur de " + e + " cm. Calculer sa largeur $x$.",
        schema: Savoirs.schemas.rectangle({ lo: x + e, la: x, elo: "x + " + e, ela: "x" }),
        reponse: x, unite: "cm",
        correction: "La longueur est $x + " + e + "$. Le périmètre est $2 \\times (x + x + " + e + ") = " + Pm + "$, soit $4x + " + 2 * e + " = " + Pm + "$. On retranche $" + 2 * e + "$ aux deux membres : $4x = " + (Pm - 2 * e) +
          "$. On divise les deux membres par $4$ : $x = \\dfrac{" + (Pm - 2 * e) + "}{4} = " + x + "$. La largeur est $" + x + "$ cm."
      };
    }
    const type = choix(["ages", "formules", "consecutifs"]);
    if (type === "ages") {
      let m, x, n; do { m = ent(3, 6); x = ent(4, 14); n = ent(2, 10); } while (m * x < 26 || m * x > 55);
      const S = (m + 1) * x + 2 * n;
      return {
        enonce: "Un père a " + m + " fois l'âge de son fils. Dans " + n + " ans, la somme de leurs âges sera " + S + " ans. Quel est l'âge du fils aujourd'hui ?", reponse: x, unite: "ans",
        correction: "Soit $x$ l'âge du fils ; le père a $" + m + "x$ ans. Dans " + n + " ans : $(x + " + n + ") + (" + m + "x + " + n + ") = " + S + "$, soit $" + (m + 1) + "x + " + 2 * n + " = " + S + "$. On retranche $" + 2 * n +
          "$ : $" + (m + 1) + "x = " + (S - 2 * n) + "$. On divise par $" + (m + 1) + "$ : $x = " + x + "$. Le fils a " + x + " ans."
      };
    }
    if (type === "formules") {
      let a, b, x; do { a = ent(6, 15); b = ent(2, 10); x = ent(5, 20); } while (b >= a || (a - b) * x > 150);
      const F = (a - b) * x;
      return {
        enonce: "À la piscine, la formule A coûte " + a + " € par séance. La formule B coûte un abonnement de " + F + " €, puis " + b + " € par séance. Pour combien de séances les deux formules coûtent-elles le même prix ?",
        reponse: x, unite: "séances",
        correction: "Soit $x$ le nombre de séances. Formule A : $" + a + "x$ ; formule B : $" + F + " + " + b + "x$. On résout $" + a + "x = " + F + " + " + b + "x$. On retranche $" + b + "x$ aux deux membres : $" + (a - b) + "x = " + F +
          "$. On divise par $" + (a - b) + "$ : $x = " + x + "$. Pour " + x + " séances, les deux formules coûtent le même prix."
      };
    }
    const x = ent(5, 60), S = 3 * x + 3;
    return {
      enonce: "Trois entiers consécutifs ont pour somme " + S + ". Quel est le plus petit de ces trois entiers ?", reponse: x,
      correction: "Soit $x$ le plus petit entier ; les trois entiers sont $x$, $x + 1$ et $x + 2$. L'équation est $x + (x + 1) + (x + 2) = " + S + "$, soit $3x + 3 = " + S + "$. On retranche $3$ aux deux membres : $3x = " + (S - 3) +
        "$. On divise les deux membres par $3$ : $x = \\dfrac{" + (S - 3) + "}{3} = " + x + "$. Le plus petit entier est $" + x + "$."
    };
  }

  const equ = [
    { id: "equ-simple", chap: "equ", titre: "Équation ax + b = c", format: "fraction", niveaux: { 1: () => simple(1), 2: () => simple(2), 3: () => simple(3) } },
    { id: "equ-deux-cotes", chap: "equ", titre: "Équation avec x des deux côtés", format: "fraction", niveaux: { 1: () => deuxCotes(1), 2: () => deuxCotes(2), 3: () => deuxCotes(3) } },
    { id: "equ-parentheses", chap: "equ", titre: "Équation avec parenthèses", format: "fraction", niveaux: { 1: () => parentheses(1), 2: () => parentheses(2), 3: () => parentheses(3) } },
    { id: "equ-fraction", chap: "equ", titre: "Équation avec une fraction", format: "fraction", niveaux: { 1: () => fraction(1), 2: () => fraction(2), 3: () => fraction(3) } },
    { id: "equ-solution-oui-non", chap: "equ", titre: "Ce nombre est-il solution ?", format: "choix", options: ["oui", "non"], niveaux: { 1: () => solution(1), 2: () => solution(2), 3: () => solution(3) } },
    { id: "equ-probleme", chap: "equ", titre: "Mise en équation", format: "nombre", niveaux: { 1: () => probleme(1), 2: () => probleme(2), 3: () => probleme(3) } }
  ];

  Savoirs.enregistrerTechniques("4e", equ);
})();
