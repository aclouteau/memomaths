// Techniques d'entraînement de 5e : « Proportionnalité » (prop).
// D'après propositions/referentiels/5e/prop.json (lot 8) : les descriptions de niveau sont la spécification.
// Pas de produit en croix en 5e (4e) : passage par l'unité, multiples, coefficient.
(function () {
  const { L, T, ent, choix, net, facile } = Savoirs.calculsOutils;
  const euros = (x) => (Number.isInteger(x) ? T(x) : x.toFixed(2).replace(".", ",")) + " €";
  const eurosL = (x) => (Number.isInteger(x) ? L(x) : x.toFixed(2).replace(".", "{,}"));
  // [singulier, pluriel, prix, « un seul » ou « une seule »]
  const ARTICLES = [["cahier", "cahiers", 2.5, "un seul"], ["stylo", "stylos", 1.5, "un seul"], ["baguette", "baguettes", 1.2, "une seule"], ["classeur", "classeurs", 3.5, "un seul"], ["gomme", "gommes", 0.8, "une seule"], ["croissant", "croissants", 1.1, "un seul"]];

  // ---------- Coefficient ----------
  function coefficient(niveau) {
    if (niveau === 3) {
      const [un, plusieurs, p, seul] = choix(ARTICLES), n = ent(2, 12), total = net(n * p);
      return { enonce: n + " " + plusieurs + " coûtent " + euros(total) + ". Quel est le prix d'" + seul + " " + un + " ?", reponse: p, unite: "€",
        correction: "On divise : $" + eurosL(total) + " \\div " + n + " = " + eurosL(p) + "$ €." };
    }
    let k, a;
    if (niveau === 1) { k = facile(1) ? 2 : ent(2, 9); a = ent(2, 10); }
    else if (facile(2)) { k = ent(2, 9); a = ent(2, 10); }
    else { k = choix([0.4, 0.5, 0.6, 1.2, 1.5, 2.5, 3.5]); const pas = k === 0.4 || k === 0.6 || k === 1.2 ? 5 : 2; a = pas * ent(1, Math.floor(40 / pas)); }
    const b = net(a * k);
    return {
      enonce: Math.random() < 0.5 ? "Une grandeur vaut $" + L(a) + "$ quand l'autre vaut $" + L(b) + "$ ; elles sont proportionnelles. Quel est le coefficient ?" : "Dans un tableau de proportionnalité, $" + L(a) + "$ correspond à $" + L(b) + "$. Quel est le coefficient de proportionnalité ?",
      reponse: k, correction: "Coefficient : $" + L(b) + " \\div " + L(a) + " = " + L(k) + "$."
    };
  }

  // ---------- Quatrième proportionnelle ----------
  function quatrieme(niveau) {
    if (niveau === 1) {
      const n = ent(2, 5), f = facile(1) ? 2 : ent(2, 4), p = ent(3, 12), [obj, objs] = choix([["place de cinéma", "places de cinéma"], ["entrée à la piscine", "entrées à la piscine"], ["ticket de bus", "tickets de bus"]]);
      return { enonce: n + " " + objs + " coûtent " + n * p + " €. Combien coûtent " + n * f + " " + objs + " ?", reponse: n * p * f, unite: "€",
        correction: "$" + n * f + "$ est $" + f + "$ fois plus grand que $" + n + "$ : $" + n * p + " \\times " + f + " = " + n * p * f + "$ €." };
    }
    if (niveau === 2) {
      const [un, plusieurs, p, seul] = choix(ARTICLES);
      let n, m; do { n = ent(2, 8); m = facile(2) ? 2 * n : ent(2, 12); } while (m === n || (!facile(2) && m % n === 0));
      const total = net(n * p), r = net(m * p);
      return { enonce: n + " " + plusieurs + " coûtent " + euros(total) + ". Combien coûtent " + m + " " + plusieurs + " ?", reponse: r, unite: "€",
        correction: "Prix d'" + seul + " " + un + " : $" + eurosL(total) + " \\div " + n + " = " + eurosL(p) + "$ €. Pour $" + m + "$ : $" + m + " \\times " + L(p) + " = " + eurosL(r) + "$ €." };
    }
    if (Math.random() < 0.5) {
      for (;;) {
        const n = choix([4, 6, 8]), m = choix([2, 3, 5, 10, 12]), g = ent(1, 10) * 25 * (n / 2), r = g * m / n;
        if (m === n || !Number.isInteger(r)) continue;
        return { enonce: "Une recette pour " + n + " personnes demande " + g + " g de farine. Quelle masse de farine faut-il pour " + m + " personnes ?", reponse: r, unite: "g",
          correction: "Pour une personne : $" + g + " \\div " + n + " = " + L(g / n) + "$ g. Pour $" + m + "$ personnes : $" + m + " \\times " + L(g / n) + " = " + r + "$ g." };
      }
    }
    const v = 10 * ent(2, 9), t = ent(2, 5), t2 = ent(2, 10);
    return { enonce: "Une voiture roulant à vitesse constante parcourt " + v * t + " km en " + t + " h. Quelle distance parcourt-elle en " + t2 + " h ?", reponse: v * t2, unite: "km",
      correction: "En $1$ h : $" + v * t + " \\div " + t + " = " + v + "$ km. En $" + t2 + "$ h : $" + t2 + " \\times " + v + " = " + v * t2 + "$ km." };
  }

  // ---------- Pourcentages ----------
  function pourcentage(niveau) {
    if (niveau === 3) {
      if (Math.random() < 0.5) {
        for (;;) {
          const N = choix([20, 25, 30]), t = choix([10, 20, 40, 50, 60, 80, 30, 70]), r = N * t / 100;
          if (!Number.isInteger(r)) continue;
          return { enonce: "Dans une classe de " + N + " élèves, " + t + " % font du sport en club. Combien d'élèves font du sport en club ?", reponse: r,
            correction: "$" + N + " \\times \\dfrac{" + t + "}{100} = " + r + "$ élèves." };
        }
      }
      for (;;) {
        const p = 10 * ent(2, 12), t = choix([10, 20, 25, 30, 40, 50]), remise = net(p * t / 100), r = net(p - remise);
        if (!Number.isInteger(remise * 10)) continue;
        return { enonce: "Un article coûte " + p + " €. Il est soldé à −" + t + " %. Quel est son nouveau prix ?", reponse: r, unite: "€",
          correction: "Remise : $" + p + " \\times \\dfrac{" + t + "}{100} = " + L(remise) + "$ €. Nouveau prix : $" + p + " - " + L(remise) + " = " + L(r) + "$ €." };
      }
    }
    for (;;) {
      const t = niveau === 1 ? (facile(1) ? 50 : choix([10, 20, 25, 50])) : (facile(2) ? 10 : choix([5, 15, 30, 40, 60, 75])), N = niveau === 1 ? 20 * ent(1, 20) : 20 * ent(1, 30), r = N * t / 100;
      if (!Number.isInteger(r)) continue;
      const expl = t === 10 ? "$10\\,\\%$, c'est diviser par $10$ : $" + L(N) + " \\div 10 = " + L(r) + "$." : t === 50 ? "$50\\,\\%$, c'est la moitié : $" + L(N) + " \\div 2 = " + L(r) + "$." :
        t === 25 ? "$25\\,\\%$, c'est le quart : $" + L(N) + " \\div 4 = " + L(r) + "$." : "$" + L(N) + " \\times \\dfrac{" + t + "}{100} = \\dfrac{" + L(N * t) + "}{100} = " + L(r) + "$.";
      return { enonce: "Calculer $" + t + "\\,\\%$ de $" + L(N) + "$.", reponse: r, correction: expl };
    }
  }

  // ---------- Échelles ----------
  const echelleL = (e) => "\\dfrac{1}{" + L(e) + "}";
  function echelle(niveau) {
    if (niveau === 3) {
      for (;;) {
        const e = choix([10000, 25000, 50000, 100000]), km = choix([0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]), cmReel = km * 100000, r = net(cmReel / e);
        if (r < 1 || r > 30 || !Number.isInteger(r * 10)) continue;
        return { enonce: "Sur une carte à l'échelle $" + echelleL(e) + "$, quelle longueur (en cm) représente une distance réelle de " + T(km) + " km ?", reponse: r, unite: "cm",
          correction: "$" + L(km) + "$ km $= " + L(cmReel) + "$ cm ; sur la carte : $" + L(cmReel) + " \\div " + L(e) + " = " + L(r) + "$ cm." };
      }
    }
    if (niveau === 1) {
      const e = facile(1) ? 100 : choix([100, 1000, 10000, 100000]), d = ent(2, 12), cmR = d * e;
      return { enonce: "Sur un plan à l'échelle $" + echelleL(e) + "$, deux points sont distants de " + d + " cm. Quelle est la distance réelle en mètres ?", reponse: cmR / 100, unite: "m",
        correction: "$" + d + " \\times " + L(e) + " = " + L(cmR) + "$ cm, soit $" + L(cmR / 100) + "$ m." };
    }
    const simple = facile(2), e = simple ? 1000 : choix([1000, 10000, 25000, 50000, 100000]), d = simple ? ent(2, 12) : (Math.random() < 0.5 ? ent(2, 12) : ent(11, 99) / 10);
    const cmR = net(d * e), enKm = e >= 10000 && Math.random() < 0.6, r = enKm ? net(cmR / 100000) : net(cmR / 100);
    return { enonce: "Sur une carte à l'échelle $" + echelleL(e) + "$, deux villages sont à " + T(d) + " cm l'un de l'autre. Quelle est la distance réelle en " + (enKm ? "km" : "m") + " ?", reponse: r, unite: enKm ? "km" : "m",
      correction: "$" + L(d) + " \\times " + L(e) + " = " + L(cmR) + "$ cm, soit $" + L(r) + "$ " + (enKm ? "km" : "m") + "." };
  }

  Savoirs.enregistrerTechniques("5e", [
    { id: "prop-coefficient", chap: "prop", titre: "Coefficient de proportionnalité", format: "nombre", niveaux: { 1: () => coefficient(1), 2: () => coefficient(2), 3: () => coefficient(3) } },
    { id: "prop-quatrieme", chap: "prop", titre: "Calculer une quantité proportionnelle", format: "nombre", niveaux: { 1: () => quatrieme(1), 2: () => quatrieme(2), 3: () => quatrieme(3) } },
    { id: "prop-pourcentage", chap: "prop", titre: "Appliquer un pourcentage", format: "nombre", niveaux: { 1: () => pourcentage(1), 2: () => pourcentage(2), 3: () => pourcentage(3) } },
    { id: "prop-echelle", chap: "prop", titre: "Échelles", format: "nombre", niveaux: { 1: () => echelle(1), 2: () => echelle(2), 3: () => echelle(3) } }
  ]);
})();
