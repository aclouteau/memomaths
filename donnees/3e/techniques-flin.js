// Techniques d'entraînement de 3e : « Fonctions linéaires » (flin).
// D'après propositions/referentiels/3e/flin.json (lot 7) : les descriptions de niveau sont la spécification.
// Ajout (schémas acceptés par l'enseignant) : « Quelle droite ? », toucher la droite qui représente f dans un repère.
(function () {
  const { L, ent, choix, net, facile, nonNul, pgcd } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const P = (x) => (x < 0 ? "(" + L(x) + ")" : L(x));
  // Coefficient écrit en LaTeX : 7, -7, 2{,}5, \dfrac{2}{3}, -\dfrac{1}{3} ; fr = [p, q] pour une fraction
  const coefTex = (a, fr) => (fr ? (fr[0] < 0 ? "-" : "") + "\\dfrac{" + Math.abs(fr[0]) + "}{" + fr[1] + "}" : L(a));
  const fx = (a, fr) => (fr ? coefTex(a, fr) : a === 1 ? "" : a === -1 ? "-" : L(a)) + "x";
  const FRACS = [[2, 3], [4, 3], [-2, 3], [5, 3], [3, 4], [-1, 3]];
  const relatifs = (niveau, min, max) => { // a et x relatifs, au moins un négatif (sauf cas facile)
    const simple = facile(niveau);
    let a, x; do { a = simple ? ent(2, 9) : nonNul(-9, 9); x = simple ? ent(min, max) : nonNul(-max, max); } while (Math.abs(a) < 2 || Math.abs(x) < min || (!simple && a > 0 && x > 0));
    return [a, x];
  };

  // ---------- Image ----------
  function image(niveau) {
    let a, x, fr = null;
    if (niveau === 1) { a = ent(2, 9); x = facile(1) ? 1 : ent(2, 10); }
    else if (niveau === 2) [a, x] = relatifs(2, 1, 10);
    else if (Math.random() < 0.5) { fr = choix(FRACS); a = fr[0] / fr[1]; x = fr[1] * nonNul(-4, 4); }
    else { a = choix([0.5, 1.5, 2.5, -0.5, -1.5, 0.1, -0.1, 0.25]); do { x = nonNul(-12, 12); } while (Math.abs(x) < 2 || (a === 0.25 && x % 2)); }
    const r = net(a * x);
    return {
      enonce: choix(["Soit $f(x) = " + fx(a, fr) + "$. Calculer $f(" + L(x) + ")$.", "Calculer l'image de $" + L(x) + "$ par la fonction linéaire $f : x \\mapsto " + fx(a, fr) + "$."]),
      reponse: r,
      correction: fr ? "$f(" + L(x) + ") = " + coefTex(a, fr) + " \\times " + P(x) + " = \\dfrac{" + fr[0] + " \\times " + P(x) + "}{" + fr[1] + "} = \\dfrac{" + L(fr[0] * x) + "}{" + fr[1] + "} = " + L(r) + "$."
        : "$f(" + L(x) + ") = " + L(a) + " \\times " + P(x) + " = " + L(r) + "$."
    };
  }

  // ---------- Antécédent ----------
  function antecedent(niveau) {
    let a, x;
    if (niveau === 1) { a = ent(2, 9); x = facile(1) ? 1 : ent(2, 10); }
    else if (niveau === 2) [a, x] = relatifs(2, 1, 10);
    else { a = choix([0.5, 2.5, -0.5, 0.25, 1.5, 0.1]); do { x = nonNul(-20, 20); } while (Math.abs(x) < 2); }
    const y = net(a * x);
    return {
      enonce: choix(["Soit $f(x) = " + fx(a) + "$. Quel est l'antécédent de $" + L(y) + "$ ?", "Soit $f(x) = " + fx(a) + "$. Trouver le nombre $x$ tel que $f(x) = " + L(y) + "$."]),
      reponse: x,
      correction: "On résout $" + fx(a) + " = " + L(y) + "$ : $x = " + (niveau === 3 ? L(y) + " \\div " + P(a) : "\\dfrac{" + L(y) + "}{" + L(a) + "}") + " = " + L(x) + "$."
    };
  }

  // ---------- Coefficient ----------
  function coefficient(niveau) {
    if (niveau < 3) {
      let a, x;
      if (niveau === 1) { a = ent(2, 9); x = facile(1) ? 1 : ent(2, 10); } else [a, x] = relatifs(2, 1, 10);
      const y = a * x;
      return {
        enonce: choix(["$f$ est une fonction linéaire telle que $f(" + L(x) + ") = " + L(y) + "$. Calculer son coefficient $a$.", "La fonction linéaire $f$ vérifie $f(" + L(x) + ") = " + L(y) + "$. Quel est son coefficient $a$ ?"]),
        format: "nombre", reponse: a,
        correction: "$f(x) = ax$ et $f(" + L(x) + ") = " + L(y) + "$, donc $a = \\dfrac{" + L(y) + "}{" + L(x) + "} = " + L(a) + "$."
      };
    }
    let p, q; do { q = ent(3, 7); p = nonNul(-3 * q, 3 * q); } while (pgcd(Math.abs(p), q) !== 1 || Math.abs(p) < 1);
    // x0 multiple du dénominateur : l'image est entière, et la fraction se simplifie parfois
    const x = q * nonNul(-2, 2), y = p * x / q;
    return {
      enonce: "$f$ est une fonction linéaire telle que $f(" + L(x) + ") = " + L(y) + "$. Calculer son coefficient $a$ (fraction irréductible).",
      format: "fraction", reponse: p + "/" + q,
      correction: "$a = \\dfrac{f(" + L(x) + ")}{" + L(x) + "} = \\dfrac{" + L(y) + "}{" + L(x) + "} = " + coefTex(p / q, [p, q]) + "$."
    };
  }

  // ---------- Quelle droite représente f ? (toucher) ----------
  const NOMS = ["(d_1)", "(d_2)", "(d_3)"].map((n) => n.replace("_", "")); // (d1), (d2), (d3)
  function droite(niveau) {
    let pentes;
    if (niveau === 1) pentes = melanger([1, 2, 3, -1, -2, -3]).slice(0, 3);
    else if (niveau === 2) pentes = melanger([0.5, 2, -1, -2, 1, -0.5, 3]).slice(0, 3);
    else pentes = melanger([[1, 3], [-2, 3], [3, 2], [-1, 2], [2, 1], [-3, 2], [1, 4]]).slice(0, 3).map((f) => f[0] / f[1]);
    const a = pentes[0], noms = melanger(NOMS.slice());
    const droites = pentes.map((p, i) => ({ a: p, b: 0, nom: noms[i] }));
    // Niveau 2 : une des autres droites ne passe pas par l'origine (même coefficient que f)
    if (niveau >= 2 && Math.random() < 0.5) droites[1] = { a: a, b: choix([-2, 2, 1, -1]), nom: noms[1] };
    const fr = niveau === 3 ? [[1, 3], [-2, 3], [3, 2], [-1, 2], [2, 1], [-3, 2], [1, 4]].find((f) => Math.abs(f[0] / f[1] - a) < 1e-9) : null;
    const q = fr ? fr[1] : Number.isInteger(a) ? 1 : 2, pt = [q, net(a * q)];
    return {
      enonce: "Touche la droite qui représente la fonction linéaire $f(x) = " + fx(a, fr && fr[1] !== 1 ? fr : null) + "$.",
      format: "toucher", aide: "Touche une des trois droites.",
      figure: Savoirs.schemas.repere({ xmin: -5, xmax: 5, ymin: -5, ymax: 5, droites: melanger(droites), zones: true }),
      reponse: noms[0], libelle: "la droite $" + noms[0] + "$",
      correction: "Une fonction linéaire est représentée par une droite qui passe par l'origine. De plus $f(" + pt[0] + ") = " + L(pt[1]) + "$ : la droite passe par le point de coordonnées $(" + pt[0] + "\\,;\\," + L(pt[1]) + ")$. C'est $" + noms[0] + "$."
    };
  }

  Savoirs.enregistrerTechniques("3e", [
    { id: "flin-image", chap: "flin", titre: "Image par une fonction linéaire", format: "nombre", niveaux: { 1: () => image(1), 2: () => image(2), 3: () => image(3) } },
    { id: "flin-antecedent", chap: "flin", titre: "Antécédent par une fonction linéaire", format: "nombre", niveaux: { 1: () => antecedent(1), 2: () => antecedent(2), 3: () => antecedent(3) } },
    { id: "flin-coefficient", chap: "flin", titre: "Coefficient d'une fonction linéaire", format: "nombre", niveaux: { 1: () => coefficient(1), 2: () => coefficient(2), 3: () => coefficient(3) } },
    { id: "flin-droite", chap: "flin", titre: "Quelle droite représente f ?", format: "toucher", niveaux: { 1: () => droite(1), 2: () => droite(2), 3: () => droite(3) } }
  ]);
})();
