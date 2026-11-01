// Techniques d'entraînement de 3e : « Trigonométrie » (trig).
// D'après propositions/referentiels/3e/trig.json (lot 7) : les descriptions de niveau sont la spécification.
// Figure : triangle rectangle coté, angle marqué (js/moteur/schemas.js). Ajout : « Quel côté ? » (toucher le côté
// adjacent, opposé ou l'hypoténuse). Angles au degré, longueurs au dixième (calculatrice), cas d'arrondi ambigu exclus.
(function () {
  const { L, T, ent, choix, net, facile, pgcd, fixe } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const NOMS = ["ABC", "DEF", "MNP", "RST", "KLO", "EFG"];
  const TRIPLETS = [[3, 4, 5], [6, 8, 10], [9, 12, 15], [12, 16, 20], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]];
  const rad = (d) => d * Math.PI / 180, deg = (r) => r * 180 / Math.PI;
  const cm = (x) => T(x) + " cm";
  // Valeur arrondie, ou null si le chiffre suivant rend l'arrondi ambigu ou si le calcul tombe presque juste
  function arrondi(x, d) {
    const y = x * Math.pow(10, d), f = y - Math.floor(y);
    if (f < 0.05 || f > 0.95 || Math.abs(f - 0.5) < 0.05) return null;
    return Math.round(y) / Math.pow(10, d);
  }
  const frac = (n, d) => { const g = pgcd(n, d); return { n: n / g, d: d / g }; };

  // Triangle rectangle en X ; l'angle étudié est en Y (« \widehat{XYZ} ») : adjacent [XY], opposé [XZ], hypoténuse [YZ]
  function triangle(niveau) {
    const [X, Y, Z] = choix(NOMS).split("");
    const seg = (u, v) => (Math.random() < 0.5 || niveau === 1 ? u + v : v + u);
    return { X: X, Y: Y, Z: Z, angle: "\\widehat{" + X + Y + Z + "}", adj: seg(X, Y), opp: seg(X, Z), hyp: seg(Y, Z), haut: niveau >= 2 && Math.random() < 0.5 };
  }
  // Figure : l (longueurs adj, opp pour les proportions), e (étiquettes adj, opp, hyp), eangle
  function figure(t, adj, opp, e, eangle) {
    return Savoirs.schemas.triangleTrigo(t.haut
      ? { droit: t.X, base: t.Z, haut: t.Y, lb: opp, lh: adj, eb: e.opp, eh: e.adj, ehyp: e.hyp, angle: "haut", eangle: eangle, miroir: Math.random() < 0.5 }
      : { droit: t.X, base: t.Y, haut: t.Z, lb: adj, lh: opp, eb: e.adj, eh: e.opp, ehyp: e.hyp, angle: "base", eangle: eangle, miroir: Math.random() < 0.5 });
  }
  const debut = (t) => "Le triangle $" + t.X + t.Y + t.Z + "$ est rectangle en $" + t.X + "$.";
  const RAPPORT = {
    cos: { nom: "\\cos", mots: "\\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}", haut: "adj", bas: "hyp" },
    sin: { nom: "\\sin", mots: "\\dfrac{\\text{côté opposé}}{\\text{hypoténuse}}", haut: "opp", bas: "hyp" },
    tan: { nom: "\\tan", mots: "\\dfrac{\\text{côté opposé}}{\\text{côté adjacent}}", haut: "opp", bas: "adj" }
  };

  // ---------- Écrire un cosinus, un sinus ou une tangente (fraction) ----------
  function rapport(niveau) {
    const t = triangle(niveau), [a, b, c] = choix(TRIPLETS), [adj, opp] = Math.random() < 0.5 ? [a, b] : [b, a], v = { adj: adj, opp: opp, hyp: c };
    const r = niveau === 1 ? (facile(1) ? "cos" : choix(["cos", "sin"])) : choix(["cos", "sin", "tan"]), R = RAPPORT[r];
    const f = frac(v[R.haut], v[R.bas]);
    let etiq = { adj: cm(adj), opp: cm(opp), hyp: cm(c) }, pyth = "";
    if (niveau === 3) { // deux côtés seulement : le troisième par Pythagore
      const cache = choix(["adj", "opp", "hyp"]); etiq[cache] = "";
      const nomC = t[cache];
      pyth = "Avec le théorème de Pythagore : $" + (cache === "hyp" ? nomC + "^{2} = " + adj + "^{2} + " + opp + "^{2} = " + c * c : nomC + "^{2} = " + c + "^{2} - " + (cache === "adj" ? opp : adj) + "^{2} = " + v[cache] * v[cache]) +
        "$, donc $" + nomC + " = " + v[cache] + "$ cm. ";
    }
    return {
      enonce: debut(t) + " Calculer $" + R.nom + "(" + t.angle + ")$ sous forme de fraction irréductible.",
      schema: figure(t, adj, opp, etiq),
      reponse: f.n + "/" + f.d,
      correction: pyth + "$" + R.nom + "(" + t.angle + ") = " + R.mots + " = \\dfrac{" + t[R.haut] + "}{" + t[R.bas] + "} = \\dfrac{" + v[R.haut] + "}{" + v[R.bas] + "}" + (f.d !== v[R.bas] ? " = \\dfrac{" + f.n + "}{" + f.d + "}" : "") + "$."
    };
  }

  // ---------- Calculer une longueur ----------
  function longueur(niveau) {
    let t, ang, r, conn, cherche, val, res, x;
    do {
      t = triangle(niveau); ang = ent(15, 75); const A = rad(ang);
      if (niveau === 1) { r = facile(1) ? "cos" : choix(["cos", "sin"]); conn = "hyp"; val = ent(3, 15); cherche = r === "cos" ? "adj" : "opp"; x = val * (r === "cos" ? Math.cos(A) : Math.sin(A)); }
      else if (niveau === 2) {
        r = facile(2) ? "cos" : choix(["cos", "sin", "tan"]); val = ent(2, 20);
        if (r === "tan") { conn = "adj"; cherche = "opp"; x = val * Math.tan(A); } else { conn = "hyp"; cherche = r === "cos" ? "adj" : "opp"; x = val * (r === "cos" ? Math.cos(A) : Math.sin(A)); }
      } else {
        r = choix(["cos", "sin", "tan"]); val = ent(2, 15);
        if (r === "tan") { conn = "opp"; cherche = "adj"; x = val / Math.tan(A); } else { conn = r === "cos" ? "adj" : "opp"; cherche = "hyp"; x = val / (r === "cos" ? Math.cos(A) : Math.sin(A)); }
      }
      res = arrondi(x, 1);
    } while (res === null || x > 60);
    const R = RAPPORT[r], longueurs = { [conn]: val, [cherche]: x };
    const A = rad(ang), adjL = longueurs.adj || (longueurs.hyp ? longueurs.hyp * Math.cos(A) : longueurs.opp / Math.tan(A)), oppL = adjL * Math.tan(A);
    const etiq = { adj: "", opp: "", hyp: "" }; etiq[conn] = cm(val); etiq[cherche] = "?";
    const formule = "$" + R.nom + "(" + t.angle + ") = \\dfrac{" + t[R.haut] + "}{" + t[R.bas] + "}$";
    const calcul = R.haut === cherche ? t[cherche] + " = " + val + " \\times " + R.nom + "(" + ang + "^{\\circ})" : t[cherche] + " = \\dfrac{" + val + "}{" + R.nom + "(" + ang + "^{\\circ})}";
    const role = { adj: "le côté adjacent à $" + t.angle + "$", opp: "le côté opposé à $" + t.angle + "$", hyp: "l'hypoténuse" };
    return {
      enonce: debut(t) + " Calculer $" + t[cherche] + "$. Donner la valeur arrondie au dixième.",
      schema: figure(t, adjL, oppL, etiq, ang + "°"),
      reponse: res, unite: "cm",
      correction: "$[" + t[conn] + "]$ est " + role[conn] + " et $[" + t[cherche] + "]$ " + role[cherche] + " : " + formule + ", donc $" + calcul + " \\approx " + fixe(x, 3) + "$ cm, soit $" + fixe(res, 1) + "$ cm au dixième."
    };
  }

  // ---------- Calculer un angle ----------
  function angle(niveau) {
    if (niveau === 1) {
      let r, v, a, ar;
      do {
        r = facile(1) ? "cos" : choix(["cos", "sin", "tan"]); v = r === "tan" ? ent(2, 30) / 10 : ent(1, 9) / 10;
        a = deg(r === "cos" ? Math.acos(v) : r === "sin" ? Math.asin(v) : Math.atan(v)); ar = Math.abs(a - Math.round(a)) < 1e-6 ? Math.round(a) : arrondi(a, 0);
      } while (ar === null);
      const t = triangle(1), R = RAPPORT[r];
      return {
        enonce: choix([debut(t).replace(".", "") + " et $" + R.nom + "(" + t.angle + ") = " + L(v) + "$. Donner la mesure de $" + t.angle + "$ arrondie au degré.",
          "Dans le triangle $" + t.X + t.Y + t.Z + "$ rectangle en $" + t.X + "$, on sait que $" + R.nom + "(" + t.angle + ") = " + L(v) + "$. Calculer $" + t.angle + "$ (arrondir au degré)."]),
        reponse: ar, unite: "°",
        correction: "$" + t.angle + " = " + R.nom + "^{-1}(" + L(v) + ")" + (Number.isInteger(a) || Math.abs(a - Math.round(a)) < 1e-6 ? " = " + Math.round(a) + "^{\\circ}$." : " \\approx " + fixe(a, 2) + "^{\\circ}$, soit $" + ar + "^{\\circ}$ au degré près.")
      };
    }
    let t, r, u, w, a, ar;
    do {
      t = triangle(niveau); r = niveau === 2 ? choix(["cos", "sin"]) : choix(["cos", "sin", "tan", "tan"]);
      if (r === "tan") { u = ent(2, 15); w = ent(2, 15); a = deg(Math.atan(u / w)); } // u opposé, w adjacent
      else { w = ent(3, 15); u = ent(2, w - 1); a = deg(r === "cos" ? Math.acos(u / w) : Math.asin(u / w)); } // u : côté, w : hypoténuse
      ar = arrondi(a, 0);
    } while (ar === null);
    const R = RAPPORT[r], A = rad(a);
    let adjL, oppL, etiq;
    if (r === "tan") { adjL = w; oppL = u; etiq = { adj: cm(w), opp: cm(u), hyp: "" }; }
    else if (r === "cos") { adjL = u; oppL = u * Math.tan(A); etiq = { adj: cm(u), opp: "", hyp: cm(w) }; }
    else { oppL = u; adjL = u / Math.tan(A); etiq = { adj: "", opp: cm(u), hyp: cm(w) }; }
    const n = r === "tan" ? u : u, d = r === "tan" ? w : w;
    return {
      enonce: debut(t) + " Calculer $" + t.angle + "$. Donner la valeur arrondie au degré.",
      schema: figure(t, adjL, oppL, etiq, "?"),
      reponse: ar, unite: "°",
      correction: "$" + R.nom + "(" + t.angle + ") = \\dfrac{" + t[R.haut] + "}{" + t[R.bas] + "} = \\dfrac{" + n + "}{" + d + "}$, donc $" + t.angle + " = " + R.nom + "^{-1}\\left(\\dfrac{" + n + "}{" + d + "}\\right) \\approx " + fixe(a, 2) + "^{\\circ}$, soit $" + ar + "^{\\circ}$ au degré près."
    };
  }

  // ---------- Quel côté ? (toucher) ----------
  const ROLES = { adj: "le côté adjacent à l'angle marqué", opp: "le côté opposé à l'angle marqué", hyp: "l'hypoténuse" };
  function cote(niveau) {
    const t = triangle(niveau === 1 ? 1 : 2), [a, b] = choix([[3, 4], [4, 3], [5, 12], [12, 5], [8, 6]]);
    let cherche, question;
    if (niveau < 3) { cherche = niveau === 1 ? choix(["adj", "opp", "adj", "opp", "hyp"]) : choix(["adj", "opp"]); question = "Touche " + ROLES[cherche] + "."; }
    else {
      const r = choix(["cos", "sin", "tan"]), R = RAPPORT[r];
      cherche = r === "tan" ? choix(["adj", "opp"]) : R.haut;
      const connu = r === "tan" ? (cherche === "adj" ? "le côté opposé" : "le côté adjacent") : "l'hypoténuse";
      question = "Pour calculer $" + R.nom + "(" + t.angle + ")$, on utilise " + connu + " et un autre côté. Touche cet autre côté.";
    }
    const fig = Savoirs.schemas.triangleTrigo(Object.assign(t.haut
      ? { droit: t.X, base: t.Z, haut: t.Y, lb: b, lh: a, angle: "haut" }
      : { droit: t.X, base: t.Y, haut: t.Z, lb: a, lh: b, angle: "base" }, { miroir: niveau >= 2 && Math.random() < 0.5, zones: true }));
    return {
      enonce: debut(t) + " " + question, format: "toucher", aide: "Touche un côté du triangle.",
      figure: fig, reponse: cherche, libelle: "le côté $[" + t[cherche] + "]$",
      correction: "L'hypoténuse est $[" + t.hyp + "]$, le côté opposé à l'angle droit. Pour l'angle $" + t.angle + "$ : le côté adjacent est $[" + t.adj + "]$ (il touche l'angle) et le côté opposé est $[" + t.opp + "]$ (en face de l'angle). " +
        (niveau === 3 ? "$\\cos = " + RAPPORT.cos.mots + "$, $\\sin = " + RAPPORT.sin.mots + "$, $\\tan = " + RAPPORT.tan.mots + "$. " : "") + "Réponse : $[" + t[cherche] + "]$."
    };
  }

  Savoirs.enregistrerTechniques("3e", [
    { id: "trig-cotes", chap: "trig", titre: "Côté adjacent, côté opposé, hypoténuse", format: "toucher", niveaux: { 1: () => cote(1), 2: () => cote(2), 3: () => cote(3) } },
    { id: "trig-rapport", chap: "trig", titre: "Écrire un cosinus, un sinus ou une tangente", format: "fraction", niveaux: { 1: () => rapport(1), 2: () => rapport(2), 3: () => rapport(3) } },
    { id: "trig-longueur", chap: "trig", titre: "Calculer une longueur", format: "nombre", calculatrice: [1, 2, 3], niveaux: { 1: () => longueur(1), 2: () => longueur(2), 3: () => longueur(3) } },
    { id: "trig-angle-calc", chap: "trig", titre: "Calculer un angle", format: "nombre", calculatrice: [1, 2, 3], niveaux: { 1: () => angle(1), 2: () => angle(2), 3: () => angle(3) } }
  ]);
})();
