// Techniques d'entraînement de 3e : « Géométrie dans l'espace » (esp).
// D'après propositions/referentiels/3e/esp.json (lot 7) : les descriptions de niveau sont la spécification.
// Les volumes et les aires sont dans le chapitre « Périmètre, aire et volume » (pv). La génératrice et la réduction
// reprennent les générateurs de 4e (donnees/4e/techniques-vol.js), appelés au moment du tirage.
(function () {
  const { L, T, ent, choix, net, facile, fixe } = Savoirs.calculsOutils;
  const cm = (x) => T(x) + " cm";
  const TRIPLETS = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]];
  const DECIMAUX = [[0.6, 0.8, 1], [1.5, 2, 2.5], [2.1, 2.8, 3.5], [4.5, 6, 7.5], [0.5, 1.2, 1.3], [0.9, 1.2, 1.5], [1.8, 2.4, 3], [2.4, 3.2, 4], [3.6, 4.8, 6]];
  function arrondi(x, d) {
    const y = x * Math.pow(10, d), f = y - Math.floor(y);
    if (f < 0.05 || f > 0.95 || Math.abs(f - 0.5) < 0.05) return null;
    return Math.round(y) / Math.pow(10, d);
  }
  const c2 = (x) => L(net(x * x));
  const rappel = "La section est un cercle de centre $H$ ; le triangle $OHM$ est rectangle en $H$, donc $R^{2} = d^{2} + r^{2}$";

  // R : rayon de la sphère, d : distance du centre au plan, r : rayon de la section ; cherche : "r", "d" ou "R"
  function section(R, d, r, cherche, arr) {
    const fig = Savoirs.schemas.sectionBoule({ R: R, d: d, eR: cherche === "R" ? "?" : "R = " + cm(R), ed: cherche === "d" ? "?" : cm(d), er: cherche === "r" ? "?" : cm(r) });
    let enonce, rep, corr;
    if (cherche === "r") {
      const s = net(R * R - d * d); rep = arr ? arrondi(Math.sqrt(s), 1) : r;
      enonce = choix(["Une sphère de rayon " + cm(R) + " est coupée par un plan situé à " + cm(d) + " de son centre. Calculer le rayon de la section.", "Un plan coupe une boule de rayon " + cm(R) + " à " + cm(d) + " de son centre. Quel est le rayon du cercle obtenu ?"]);
      corr = rappel + ", donc $r^{2} = R^{2} - d^{2} = " + L(R) + "^{2} - " + L(d) + "^{2} = " + c2(R) + " - " + c2(d) + " = " + L(s) + "$ et $r = \\sqrt{" + L(s) + "}" + (arr ? " \\approx " + fixe(rep, 1) : " = " + L(r)) + "$ cm.";
    } else if (cherche === "d") {
      rep = d; const s = net(R * R - r * r);
      enonce = "Une sphère de rayon " + cm(R) + " est coupée par un plan. La section est un cercle de rayon " + cm(r) + ". À quelle distance du centre de la sphère se trouve le plan ?";
      corr = rappel + ", donc $d^{2} = R^{2} - r^{2} = " + L(R) + "^{2} - " + L(r) + "^{2} = " + c2(R) + " - " + c2(r) + " = " + L(s) + "$ et $d = " + L(d) + "$ cm.";
    } else {
      rep = R; const s = net(d * d + r * r);
      enonce = "Une sphère est coupée par un plan situé à " + cm(d) + " de son centre. La section est un cercle de rayon " + cm(r) + ". Calculer le rayon de la sphère.";
      corr = "$R^{2} = d^{2} + r^{2} = " + L(d) + "^{2} + " + L(r) + "^{2} = " + c2(d) + " + " + c2(r) + " = " + L(s) + "$, donc $R = " + L(R) + "$ cm.";
    }
    return { enonce: enonce + (arr ? " Donner la valeur arrondie au dixième." : ""), schema: fig, reponse: rep, unite: "cm", correction: corr };
  }
  function sectionSphere(niveau) {
    if (niveau === 1) { const [a, b, c] = facile(1) ? [8, 6, 10] : choix(TRIPLETS), [r, d] = Math.random() < 0.5 ? [a, b] : [b, a]; return section(c, d, r, "r"); }
    if (niveau === 2) { const [a, b, c] = facile(2) ? [3, 4, 5] : choix(TRIPLETS), [r, d] = Math.random() < 0.5 ? [a, b] : [b, a]; return section(c, d, r, choix(["d", "R"])); }
    const type = choix(["aire", "decimal", "arrondi"]);
    if (type === "decimal") { const [a, b, c] = choix(DECIMAUX), [r, d] = Math.random() < 0.5 ? [a, b] : [b, a]; return section(c, d, r, choix(["r", "r", "d"])); }
    if (type === "arrondi") { let R, d, e; do { R = ent(3, 12); d = ent(1, R - 1); e = arrondi(Math.sqrt(R * R - d * d), 1); } while (e === null); return section(R, d, Math.sqrt(R * R - d * d), "r", true); }
    let a, b, c, v, rep;
    do { [a, b, c] = choix(TRIPLETS); if (Math.random() < 0.5) [a, b] = [b, a]; v = Math.PI * a * a; rep = arrondi(v, 1); } while (rep === null);
    return {
      enonce: "Une sphère de rayon " + cm(c) + " est coupée par un plan situé à " + cm(b) + " de son centre. Calculer l'aire de la section. Donner la valeur arrondie au dixième.",
      schema: Savoirs.schemas.sectionBoule({ R: c, d: b, eR: "R = " + cm(c), ed: cm(b), er: "r" }),
      reponse: rep, unite: "cm²",
      correction: rappel + ", donc $r^{2} = " + c + "^{2} - " + b + "^{2} = " + (c * c) + " - " + (b * b) + " = " + a * a + "$ et $r = " + a + "$ cm. Aire du disque : $\\pi \\times r^{2} = " + a * a + "\\pi \\approx " + fixe(v, 3) + "$ cm², soit $" + fixe(rep, 1) + "$ cm² au dixième."
    };
  }

  const V = (f, ...args) => () => Savoirs.volumesPyrCone[f](...args);
  Savoirs.enregistrerTechniques("3e", [
    { id: "esp-section-sphere", chap: "esp", titre: "Section d'une sphère par un plan", format: "nombre", calculatrice: [3], niveaux: { 1: () => sectionSphere(1), 2: () => sectionSphere(2), 3: () => sectionSphere(3) } },
    { id: "esp-generatrice", chap: "esp", titre: "Génératrice, hauteur et rayon d'un cône", format: "nombre", calculatrice: [3], niveaux: { 1: V("generatrice1", 1), 2: V("generatrice2", 2), 3: V("generatrice3") } },
    { id: "esp-reduction", chap: "esp", titre: "Réduction d'une pyramide", format: "nombre", niveaux: { 1: V("reduction1", "pyramide", 1), 2: V("reduction2", "pyramide", 2), 3: V("reduction3", "pyramide") } }
  ]);
})();
