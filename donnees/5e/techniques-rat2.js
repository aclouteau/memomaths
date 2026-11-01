// Techniques d'entraînement de 5e : « Nombres rationnels : addition et soustraction » (rat2).
// D'après propositions/referentiels/5e/rat2.json (lot 8) : les descriptions de niveau sont la spécification.
// format "fraction" : seule la fraction irréductible est acceptée (« Simplifie encore ») ; réponse "n/d".
// En 5e, un dénominateur est un multiple de l'autre (dénominateurs quelconques : 4e).
(function () {
  const { L, ent, choix, facile, pgcd, F } = Savoirs.calculsOutils;
  function reduite(n, d) { const g = pgcd(n, d) || 1; return n / g + "/" + d / g; }
  const premierAvec = (d, max) => { let n; do { n = ent(1, max); } while (pgcd(n, d) !== 1); return n; };
  function simplification(n, d) {
    const g = pgcd(n, d);
    if (g === 1) return "";
    return " On simplifie par " + g + " : $\\dfrac{" + n + "}{" + d + "} = " + (d / g === 1 ? L(n / g) : F(n / g, d / g)) + "$.";
  }
  const conversion = (n, d, m) => F(n, d) + " = \\dfrac{" + n + " \\times " + m / d + "}{" + d + " \\times " + m / d + "} = \\dfrac{" + n * m / d + "}{" + m + "}";

  // ---------- Même dénominateur ----------
  function memeDen(niveau) {
    for (;;) {
      if (niveau === 3) {
        const c = ent(4, 15), a = ent(1, c), b = ent(1, c), d = ent(1, c), r = a + b - d;
        if (r <= 0 || pgcd(r, c) === 1) continue;
        return { enonce: "Calculer $" + F(a, c) + " + " + F(b, c) + " - " + F(d, c) + "$.", reponse: reduite(r, c),
          correction: "Même dénominateur : $\\dfrac{" + a + " + " + b + " - " + d + "}{" + c + "} = \\dfrac{" + r + "}{" + c + "}$." + simplification(r, c) };
      }
      const c = niveau === 1 ? ent(3, 12) : ent(4, 15), moins = niveau === 1 && Math.random() < 0.5, a = ent(1, c), b = ent(1, c), r = moins ? a - b : a + b;
      if (r <= 0) continue;
      const simple = pgcd(r, c) === 1;
      if (niveau === 1 && facile(1) && (!simple || moins)) continue;
      if (niveau === 2 && (facile(2) ? !simple : simple)) continue;
      return { enonce: "Calculer $" + F(a, c) + (moins ? " - " : " + ") + F(b, c) + "$" + (niveau === 2 ? " et donner le résultat sous forme irréductible." : "."), reponse: reduite(r, c),
        correction: "Même dénominateur : $" + F(a, c) + (moins ? " - " : " + ") + F(b, c) + " = \\dfrac{" + r + "}{" + c + "}$." + simplification(r, c) };
    }
  }

  // ---------- Un dénominateur multiple de l'autre ----------
  function multiple(niveau) {
    for (;;) {
      const d = ent(2, niveau === 1 ? 6 : 8), k = niveau === 1 ? (facile(1) ? 2 : choix([2, 3, 4])) : niveau === 2 ? (facile(2) ? 2 : choix([2, 3, 4])) : choix([2, 3, 4, 5]), m = d * k;
      if (m > (niveau === 3 ? 40 : 24) || (niveau === 1 && m > 24)) continue;
      const n1 = premierAvec(d, 2 * d), n2 = premierAvec(m, 2 * m), moins = niveau > 1 && !(niveau === 2 && facile(2)) && Math.random() < 0.5;
      const N1 = n1 * k, r = moins ? N1 - n2 : N1 + n2;
      if (r <= 0) continue;
      const enPremier = Math.random() < 0.5 || moins; // la fraction de dénominateur d d'abord (sinon dans l'ordre inverse)
      const ecrit = enPremier ? F(n1, d) + (moins ? " - " : " + ") + F(n2, m) : F(n2, m) + " + " + F(n1, d);
      const somme = enPremier ? "\\dfrac{" + N1 + "}{" + m + "}" + (moins ? " - " : " + ") + F(n2, m) : F(n2, m) + " + \\dfrac{" + N1 + "}{" + m + "}";
      return { enonce: "Calculer $" + ecrit + "$.", reponse: reduite(r, m),
        correction: "$" + conversion(n1, d, m) + "$, donc $" + somme + " = \\dfrac{" + r + "}{" + m + "}$." + simplification(r, m) };
    }
  }

  // ---------- Un entier et une fraction ----------
  function entier(niveau) {
    if (niveau === 1) {
      const b = facile(1) ? 2 : ent(2, 10), a = facile(1) ? 1 : ent(1, b - 1), r = b - a;
      return { enonce: "Calculer $1 - " + F(a, b) + "$.", reponse: reduite(r, b),
        correction: "$1 = " + F(b, b) + "$, donc $1 - " + F(a, b) + " = " + F(b, b) + " - " + F(a, b) + " = \\dfrac{" + r + "}{" + b + "}$." + simplification(r, b) };
    }
    if (niveau === 2) {
      for (;;) {
        const n = facile(2) ? 1 : ent(1, 5), b = ent(2, 10), a = premierAvec(b, b - 1), plus = facile(2) || Math.random() < 0.5, r = plus ? n * b + a : n * b - a;
        if (a >= b || r <= 0) continue;
        return { enonce: "Calculer $" + n + (plus ? " + " : " - ") + F(a, b) + "$.", reponse: reduite(r, b),
          correction: "$" + n + " = \\dfrac{" + n * b + "}{" + b + "}$, donc $" + n + (plus ? " + " : " - ") + F(a, b) + " = \\dfrac{" + n * b + "}{" + b + "}" + (plus ? " + " : " - ") + F(a, b) + " = \\dfrac{" + r + "}{" + b + "}$." + simplification(r, b) };
      }
    }
    for (;;) {
      const b = ent(2, 6), k = choix([2, 3]), m = b * k, a = ent(1, b - 1), c = ent(1, m - 1);
      if (pgcd(a, b) !== 1 || pgcd(c, m) !== 1) continue;
      const r = m - a * k - c;
      if (r <= 0) continue;
      const ctx = choix([
        ["Léa mange $" + F(a, b) + "$ du gâteau et Tom en mange $" + F(c, m) + "$. Quelle fraction du gâteau reste-t-il ?", "du gâteau"],
        ["Un jardin est planté de tomates sur $" + F(a, b) + "$ de sa surface et de salades sur $" + F(c, m) + "$. Quelle fraction du jardin reste libre ?", "du jardin"]
      ]);
      return { enonce: ctx[0], reponse: reduite(r, m),
        correction: "$1 - " + F(a, b) + " - " + F(c, m) + " = \\dfrac{" + m + "}{" + m + "} - \\dfrac{" + a * k + "}{" + m + "} - " + F(c, m) + " = \\dfrac{" + r + "}{" + m + "}$." + simplification(r, m) };
    }
  }

  Savoirs.enregistrerTechniques("5e", [
    { id: "rat2-meme-den", chap: "rat2", titre: "Même dénominateur", format: "fraction", niveaux: { 1: () => memeDen(1), 2: () => memeDen(2), 3: () => memeDen(3) } },
    { id: "rat2-multiple", chap: "rat2", titre: "Un dénominateur multiple de l'autre", format: "fraction", niveaux: { 1: () => multiple(1), 2: () => multiple(2), 3: () => multiple(3) } },
    { id: "rat2-entier", chap: "rat2", titre: "Un entier et une fraction", format: "fraction", niveaux: { 1: () => entier(1), 2: () => entier(2), 3: () => entier(3) } }
  ]);
})();
