// Techniques d'entraînement de 3e : « Fonctions affines » (faff).
// D'après propositions/referentiels/3e/faff.json (lot 7) : les descriptions de niveau sont la spécification.
// Ajouts (schémas acceptés par l'enseignant) : « Quelle droite ? » (toucher la droite qui représente f) et
// « Lire a et b sur un graphique » (droite tracée dans un repère quadrillé).
(function () {
  const { L, ent, choix, net, facile, nonNul, pgcd, polyTexte, polyLatex } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const P = (x) => (x < 0 ? "(" + L(x) + ")" : L(x));
  const plus = (b) => (b < 0 ? " - " + L(-b) : " + " + L(b));
  const expr = (a, b) => polyLatex([a, b]); // 2x + 3, -x - 1…
  const moins = (u, v) => L(u) + " - " + P(v); // u − v écrit comme en classe : 14 − (−10)

  // ---------- Image ----------
  function image(niveau) {
    let a, b, x;
    if (niveau === 1) { a = ent(2, 9); b = ent(1, 10); x = facile(1) ? 0 : ent(1, 10); }
    else if (niveau === 2) {
      const simple = facile(2);
      do { a = simple ? ent(2, 9) : nonNul(-9, 9); b = simple ? ent(1, 10) : nonNul(-10, 10); x = simple ? ent(1, 10) : nonNul(-10, 10); } while (Math.abs(a) < 2 || (!simple && a > 0 && b > 0 && x > 0));
    } else { a = choix([0.5, -0.5, 1.5, 2.5, -1.5, 0.25]); b = nonNul(-10, 10); do { x = nonNul(-12, 12); } while (Math.abs(x) < 2); }
    const ax = net(a * x), r = net(ax + b);
    return {
      enonce: choix(["Soit $f(x) = " + expr(a, b) + "$. Calculer $f(" + L(x) + ")$.", "Calculer l'image de $" + L(x) + "$ par la fonction $f : x \\mapsto " + expr(a, b) + "$."]),
      reponse: r,
      correction: "$f(" + L(x) + ") = " + L(a) + " \\times " + P(x) + plus(b) + " = " + L(ax) + plus(b) + " = " + L(r) + "$."
    };
  }

  // ---------- Antécédent ----------
  function antecedent(niveau) {
    let a, b, x, y;
    if (niveau === 1) { a = ent(2, 9); b = ent(1, 10); x = facile(1) ? 1 : ent(2, 10); }
    else if (niveau === 2) {
      const simple = facile(2);
      do { a = simple ? ent(2, 9) : nonNul(-9, 9); b = simple ? ent(1, 10) : nonNul(-10, 10); x = simple ? ent(1, 10) : nonNul(-10, 10); } while (Math.abs(a) < 2 || (!simple && a > 0 && b > 0 && x > 0));
    } else {
      do { a = nonNul(-9, 9); b = nonNul(-10, 10); y = ent(-20, 20); } while (Math.abs(a) < 2 || (y - b) % a === 0);
      let n = y - b, d = a; if (d < 0) { n = -n; d = -d; } const g = pgcd(Math.abs(n), d);
      return {
        enonce: "Soit $f(x) = " + expr(a, b) + "$. Quel est l'antécédent de $" + L(y) + "$ ? Donner la réponse sous forme de fraction irréductible.",
        format: "fraction", reponse: n / g + "/" + d / g,
        correction: "On résout $" + expr(a, b) + " = " + L(y) + "$ : $" + (a === -1 ? "-" : L(a)) + "x = " + moins(y, b) + " = " + L(y - b) + "$, donc $x = \\dfrac{" + L(y - b) + "}{" + L(a) + "} = " +
          (n < 0 ? "-" : "") + "\\dfrac{" + Math.abs(n / g) + "}{" + d / g + "}$."
      };
    }
    y = a * x + b;
    return {
      enonce: choix(["Soit $f(x) = " + expr(a, b) + "$. Quel est l'antécédent de $" + L(y) + "$ ?", "Soit $f(x) = " + expr(a, b) + "$. Trouver le nombre $x$ tel que $f(x) = " + L(y) + "$."]),
      format: "nombre", reponse: x,
      correction: "On résout $" + expr(a, b) + " = " + L(y) + "$ : $" + L(a) + "x = " + moins(y, b) + " = " + L(y - b) + "$, donc $x = \\dfrac{" + L(y - b) + "}{" + L(a) + "} = " + L(x) + "$."
    };
  }

  // ---------- Expression de f(x) ----------
  function expression(niveau) {
    if (niveau === 1) {
      const a = ent(2, 9);
      if (facile(1)) return { enonce: "$f$ est une fonction linéaire de coefficient $" + a + "$. Donner l'expression de $f(x)$.", reponse: polyTexte([a, 0]), correction: "Une fonction linéaire s'écrit $f(x) = ax$ : $f(x) = " + a + "x$." };
      const b = ent(1, 10);
      return { enonce: "$f$ est une fonction affine de coefficient directeur $" + a + "$ et d'ordonnée à l'origine $" + b + "$. Donner l'expression de $f(x)$.", reponse: polyTexte([a, b]),
        correction: "$f(x) = ax + b$ avec $a = " + a + "$ et $b = " + b + "$ : $f(x) = " + expr(a, b) + "$." };
    }
    if (niveau === 2) {
      const simple = facile(2);
      let a, x0, b; do { a = simple ? ent(2, 9) : nonNul(-9, 9); x0 = simple ? ent(1, 5) : nonNul(-5, 5); b = simple ? ent(1, 10) : nonNul(-10, 10); } while (Math.abs(a) < 2 && !simple || (!simple && a > 0 && x0 > 0 && b > 0));
      const y = a * x0 + b;
      return { enonce: "$f$ est une fonction affine de coefficient directeur $" + L(a) + "$ telle que $f(" + L(x0) + ") = " + L(y) + "$. Donner l'expression de $f(x)$.", reponse: polyTexte([a, b]),
        correction: "$f(x) = " + (a === -1 ? "-" : L(a)) + "x + b$ et $f(" + L(x0) + ") = " + L(y) + "$, donc $" + L(a) + " \\times " + P(x0) + " + b = " + L(y) + "$, soit $" + L(a * x0) + " + b = " + L(y) + "$ et $b = " + L(b) + "$. Donc $f(x) = " + expr(a, b) + "$." };
    }
    let a, b, x1, x2; do { a = nonNul(-6, 6); b = ent(-10, 10); x1 = ent(-4, 6); x2 = ent(x1 + 1, 7); } while (x2 > 7);
    const y1 = a * x1 + b, y2 = a * x2 + b;
    return { enonce: "$f$ est une fonction affine telle que $f(" + L(x1) + ") = " + L(y1) + "$ et $f(" + L(x2) + ") = " + L(y2) + "$. Donner l'expression de $f(x)$.", reponse: polyTexte([a, b]),
      correction: "$a = \\dfrac{" + moins(y2, y1) + "}{" + moins(x2, x1) + "} = \\dfrac{" + L(y2 - y1) + "}{" + L(x2 - x1) + "} = " + L(a) + "$. Puis $f(" + L(x1) + ") = " + L(y1) + "$ donne $" + L(a) + " \\times " + P(x1) + " + b = " + L(y1) +
        "$, donc $b = " + L(b) + "$. $f(x) = " + expr(a, b) + "$." };
  }

  // ---------- Quelle droite représente f ? (toucher) ----------
  const NOMS = ["(d1)", "(d2)", "(d3)"];
  function droite(niveau) {
    const pentes = niveau === 1 ? [1, 2, 3, -1, -2] : niveau === 2 ? [1, 2, -1, -2, -3, 3] : [0.5, -0.5, 1.5, -1.5, 2, -2];
    let a, b, autres;
    do {
      a = choix(pentes); b = nonNul(-3, 3);
      // Une droite de même coefficient (b différent) et une de même ordonnée à l'origine (a différent)
      autres = [{ a: a, b: choix([-b, b + choix([-2, 2])]) }, { a: choix(pentes.filter((p) => p !== a)), b: b }];
      if (niveau === 3 && Math.random() < 0.5) autres[1] = { a: -a, b: -b };
    } while (autres.some((d) => Math.abs(d.b) > 4 || (d.a === a && d.b === b)));
    const noms = melanger(NOMS.slice()), droites = [{ a: a, b: b, nom: noms[0] }].concat(autres.map((d, i) => Object.assign(d, { nom: noms[i + 1] })));
    return {
      enonce: "Touche la droite qui représente la fonction affine $f(x) = " + expr(a, b) + "$.",
      format: "toucher", aide: "Touche une des trois droites.",
      figure: Savoirs.schemas.repere({ xmin: -5, xmax: 5, ymin: -5, ymax: 5, droites: melanger(droites), zones: true }),
      reponse: noms[0], libelle: "la droite $" + noms[0] + "$",
      correction: "L'ordonnée à l'origine est $b = " + L(b) + "$ : la droite coupe l'axe des ordonnées au point $(0\\,;\\," + L(b) + ")$. Le coefficient directeur est $a = " + L(a) + "$ : quand $x$ augmente de $1$, $y$ " +
        (a > 0 ? "augmente" : "diminue") + " de $" + L(Math.abs(a)) + "$. C'est $" + noms[0] + "$."
    };
  }

  // ---------- Lire a et b sur un graphique ----------
  function lecture(niveau) {
    let a, b;
    const p = niveau === 3 ? 2 : 1; // second point marqué : x = p (le point d'ordonnée entière)
    do {
      if (niveau === 1) { a = nonNul(-3, 3); b = nonNul(-4, 4); }
      else if (niveau === 2) { a = nonNul(-3, 3); b = ent(-3, 3); }
      else { a = choix([0.5, -0.5, 1.5, -1.5, 2.5]); b = ent(-3, 3); }
    } while (Math.abs(b + a * p) > 4);
    const lireB = niveau === 1, q = [p, net(b + a * p)];
    return {
      enonce: "La droite tracée représente une fonction affine $f(x) = ax + b$. " + (lireB ? "Lire son ordonnée à l'origine $b$." : "Lire son coefficient directeur $a$."),
      schema: Savoirs.schemas.repere({ xmin: -5, xmax: 5, ymin: -5, ymax: 5, droites: [{ a: a, b: b }], points: lireB ? [] : [{ x: 0, y: b }, { x: q[0], y: q[1] }] }),
      reponse: lireB ? b : a,
      correction: lireB ? "La droite coupe l'axe des ordonnées au point $(0\\,;\\," + L(b) + ")$ : $b = " + L(b) + "$."
        : "La droite passe par $(0\\,;\\," + L(b) + ")$ et $(" + q[0] + "\\,;\\," + L(q[1]) + ")$. Quand $x$ augmente de $" + p + "$, $y$ " + (a > 0 ? "augmente" : "diminue") + " de $" + L(Math.abs(a * p)) + "$ : $a = \\dfrac{" + L(net(a * p)) + "}{" + p + "} = " + L(a) + "$."
    };
  }

  Savoirs.enregistrerTechniques("3e", [
    { id: "faff-image", chap: "faff", titre: "Image par une fonction affine", format: "nombre", niveaux: { 1: () => image(1), 2: () => image(2), 3: () => image(3) } },
    { id: "faff-antecedent", chap: "faff", titre: "Antécédent par une fonction affine", format: "nombre", niveaux: { 1: () => antecedent(1), 2: () => antecedent(2), 3: () => antecedent(3) } },
    { id: "faff-expression", chap: "faff", titre: "Expression d'une fonction affine", format: "expression", forme: "developpee_reduite", niveaux: { 1: () => expression(1), 2: () => expression(2), 3: () => expression(3) } },
    { id: "faff-droite", chap: "faff", titre: "Quelle droite représente f ?", format: "toucher", niveaux: { 1: () => droite(1), 2: () => droite(2), 3: () => droite(3) } },
    { id: "faff-lecture", chap: "faff", titre: "Lire a et b sur un graphique", format: "nombre", niveaux: { 1: () => lecture(1), 2: () => lecture(2), 3: () => lecture(3) } }
  ]);
})();
