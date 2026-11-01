// Techniques d'entraînement de 5e : « Parallélogrammes » (para).
// D'après propositions/referentiels/5e/para.json (lot 8) : les descriptions de niveau sont la spécification.
(function () {
  const { L, ent, choix, net, facile } = Savoirs.calculsOutils;
  const NOMS = [["A", "B", "C", "D"], ["M", "N", "O", "P"], ["E", "F", "G", "H"], ["I", "J", "K", "L"], ["R", "S", "T", "U"]];
  const ang = (p) => "\\widehat{" + p + "}";
  const deg = (x) => x + "^{\\circ}";

  // ---------- Angles ----------
  function angle(niveau) {
    if (niveau === 3) {
      const n = choix(NOMS), m = choix([2, 3, 4, 5, 8, 9]), petit = 180 / (m + 1), grand = m * petit;
      const mots = { 2: "deux", 3: "trois", 4: "quatre", 5: "cinq", 8: "huit", 9: "neuf" };
      return { enonce: "$" + n.join("") + "$ est un parallélogramme et l'angle $" + ang(n[0]) + "$ est " + mots[m] + " fois plus grand que l'angle $" + ang(n[1]) + "$. Quelle est la mesure de $" + ang(n[0]) + "$ ?",
        reponse: grand, unite: "°",
        correction: "Les angles consécutifs sont supplémentaires : $" + ang(n[0]) + " + " + ang(n[1]) + " = 180^{\\circ}$, soit $" + (m + 1) + "$ fois $" + ang(n[1]) + "$. Donc $" + ang(n[1]) + " = 180^{\\circ} \\div " + (m + 1) + " = " + deg(petit) + "$ et $" + ang(n[0]) + " = " + m + " \\times " + deg(petit) + " = " + deg(grand) + "$." };
    }
    const n = choix(NOMS), losange = niveau === 2 && Math.random() < 0.4;
    let a; do { a = ent(20, 160); } while (a === 90);
    const oppose = (niveau === 1 && facile(1)) || (niveau === 2 && facile(2)) ? true : niveau === 1 ? Math.random() < 0.4 : Math.random() < 0.35;
    const cible = oppose ? n[2] : choix([n[1], n[3]]), r = oppose ? a : 180 - a;
    return { enonce: "$" + n.join("") + "$ est un " + (losange ? "losange" : "parallélogramme") + " et $" + ang(n[0]) + " = " + deg(a) + "$. Quelle est la mesure de $" + ang(cible) + "$ ?", reponse: r, unite: "°",
      correction: (losange ? "Un losange est un parallélogramme. " : "") + (oppose ? "$" + ang(n[0]) + "$ et $" + ang(cible) + "$ sont opposés : ils sont égaux, donc $" + ang(cible) + " = " + deg(a) + "$."
        : "$" + ang(n[0]) + "$ et $" + ang(cible) + "$ sont consécutifs : ils sont supplémentaires, donc $" + ang(cible) + " = 180^{\\circ} - " + deg(a) + " = " + deg(r) + "$.") };
  }

  // ---------- Côtés et périmètre ----------
  function longueur(niveau) {
    const n = choix(NOMS), c1 = n[0] + n[1], c2 = n[1] + n[2];
    if (niveau === 1) {
      const a = ent(2, 15), b = ent(2, 15);
      if (facile(1) || Math.random() < 0.3) return { enonce: "$" + n.join("") + "$ est un parallélogramme avec $" + c1 + " = " + a + "$ cm. Quelle est la longueur $" + n[2] + n[3] + "$ ?", reponse: a, unite: "cm",
        correction: "Les côtés opposés d'un parallélogramme sont égaux : $" + n[2] + n[3] + " = " + c1 + " = " + a + "$ cm." };
      return { enonce: "$" + n.join("") + "$ est un parallélogramme avec $" + c1 + " = " + a + "$ cm et $" + c2 + " = " + b + "$ cm. Calculer son périmètre.", reponse: 2 * (a + b), unite: "cm",
        correction: "Les côtés opposés sont égaux : $P = 2 \\times (" + a + " + " + b + ") = " + 2 * (a + b) + "$ cm." };
    }
    if (niveau === 2) {
      if (facile(2)) { const c = ent(2, 30); return { enonce: "Un losange a des côtés de " + c + " cm. Calculer son périmètre.", reponse: 4 * c, unite: "cm", correction: "Les quatre côtés d'un losange sont égaux : $P = 4 \\times " + c + " = " + 4 * c + "$ cm." }; }
      const a = ent(2, 30), b = ent(2, 30), p = 2 * (a + b);
      return { enonce: "$" + n.join("") + "$ est un parallélogramme de périmètre " + p + " cm avec $" + c1 + " = " + a + "$ cm. Calculer $" + c2 + "$.", reponse: b, unite: "cm",
        correction: "$" + c1 + " + " + c2 + " = " + p + " \\div 2 = " + (a + b) + "$ cm, donc $" + c2 + " = " + (a + b) + " - " + a + " = " + b + "$ cm." };
    }
    if (Math.random() < 0.5) {
      const c = ent(4, 40) / 2, p = 4 * c;
      return { enonce: "Un losange a un périmètre de " + p + " cm. Quelle est la longueur de son côté ?", reponse: c, unite: "cm",
        correction: "Les quatre côtés d'un losange sont égaux : $" + L(p) + " \\div 4 = " + L(c) + "$ cm." };
    }
    let a; do { a = ent(11, 99) / 10; } while (Number.isInteger(a));
    const b = ent(2, 15), p = net(2 * (a + b));
    return { enonce: "$" + n.join("") + "$ est un parallélogramme avec $" + c1 + " = " + L(a) + "$ cm et $" + c2 + " = " + b + "$ cm. Calculer son périmètre.", reponse: p, unite: "cm",
      correction: "$P = 2 \\times (" + L(a) + " + " + b + ") = 2 \\times " + L(net(a + b)) + " = " + L(p) + "$ cm." };
  }

  // ---------- Diagonales ----------
  function diagonale(niveau) {
    const n = choix(NOMS), centre = n.includes("O") ? "Z" : "O";
    if (niveau === 1) {
      const d = facile(1) ? 10 : 2 * ent(2, 15);
      return { enonce: "$" + n.join("") + "$ est un parallélogramme de centre $" + centre + "$ et $" + n[0] + n[2] + " = " + d + "$ cm. Calculer $" + n[0] + centre + "$.", reponse: d / 2, unite: "cm",
        correction: "Les diagonales se coupent en leur milieu $" + centre + "$ : $" + n[0] + centre + " = " + d + " \\div 2 = " + d / 2 + "$ cm." };
    }
    if (niveau === 2) {
      const h = facile(2) ? ent(2, 15) : (() => { let x; do { x = ent(11, 99) / 10; } while (Number.isInteger(x)); return x; })();
      return { enonce: "$" + n.join("") + "$ est un parallélogramme de centre $" + centre + "$ et $" + n[1] + centre + " = " + L(h) + "$ cm. Calculer $" + n[1] + n[3] + "$.", reponse: net(2 * h), unite: "cm",
        correction: "$" + centre + "$ est le milieu de $[" + n[1] + n[3] + "]$ : $" + n[1] + n[3] + " = 2 \\times " + L(h) + " = " + L(net(2 * h)) + "$ cm." };
    }
    const d = Math.random() < 0.5 ? ent(3, 30) : ent(21, 199) / 10;
    return { enonce: "$" + n.join("") + "$ est un rectangle de centre $" + centre + "$ et $" + n[0] + n[2] + " = " + L(d) + "$ cm. Calculer $" + n[1] + centre + "$.", reponse: net(d / 2), unite: "cm",
      correction: "Les diagonales d'un rectangle ont la même longueur et le même milieu : $" + n[1] + n[3] + " = " + n[0] + n[2] + " = " + L(d) + "$ cm, donc $" + n[1] + centre + " = " + L(d) + " \\div 2 = " + L(net(d / 2)) + "$ cm." };
  }

  // ---------- Nature ----------
  // Propriétés d'un parallélogramme et ce qu'elles donnent
  const PROPS = {
    angle: { texte: "a un angle droit", donne: "rectangle" },
    cotes: { texte: "a deux côtés consécutifs de même longueur", donne: "losange" },
    diagEgales: { texte: "a des diagonales de même longueur", donne: "rectangle" },
    diagPerp: { texte: "a des diagonales perpendiculaires", donne: "losange" }
  };
  function nature(niveau) {
    const n = choix(NOMS).join("");
    if (niveau === 3) {
      const cible = choix(["carré", "rectangle", "losange"]);
      if (Math.random() < 0.5) { // une propriété du rectangle et une du losange : c'est un carré
        const r = choix(["angle", "diagEgales"]), l = choix(["cotes", "diagPerp"]);
        return { enonce: "On sait que le parallélogramme $" + n + "$ " + PROPS[r].texte + " et " + PROPS[l].texte.replace(/^a /, "") + ". Peut-on affirmer que c'est un " + cible + " ?", reponse: "oui",
          correction: "C'est à la fois un rectangle et un losange, donc un carré : oui." };
      }
      // deux propriétés de la même famille : seulement un rectangle (ou seulement un losange)
      const [p1, p2] = choix([["angle", "diagEgales"], ["cotes", "diagPerp"]]), donne = PROPS[p1].donne, oui = cible === donne;
      return { enonce: "On sait que le parallélogramme $" + n + "$ " + PROPS[p1].texte + " et " + PROPS[p2].texte.replace(/^a /, "") + ". Peut-on affirmer que c'est un " + cible + " ?", reponse: oui ? "oui" : "non",
        correction: "Les deux propriétés disent la même chose : c'est un " + donne + (oui ? " : oui." : ", mais rien ne dit que c'est aussi un " + (donne === "rectangle" ? "losange" : "rectangle") + " : non.") };
    }
    const cles = niveau === 1 ? ["angle", "cotes"] : ["diagEgales", "diagPerp"];
    const p = niveau === 1 && facile(1) ? "angle" : choix(cles), cible = niveau === 1 && facile(1) ? "rectangle" : choix(["rectangle", "losange"]), oui = PROPS[p].donne === cible;
    return { enonce: "On sait que le parallélogramme $" + n + "$ " + PROPS[p].texte + ". Peut-on affirmer que c'est un " + cible + " ?", reponse: oui ? "oui" : "non",
      correction: "Un parallélogramme qui " + PROPS[p].texte + " est un " + PROPS[p].donne + (oui ? " : oui." : ", mais pas forcément un " + cible + " : non.") };
  }

  Savoirs.enregistrerTechniques("5e", [
    { id: "para-angle", chap: "para", titre: "Angles d'un parallélogramme", format: "nombre", niveaux: { 1: () => angle(1), 2: () => angle(2), 3: () => angle(3) } },
    { id: "para-longueur", chap: "para", titre: "Côtés et périmètre", format: "nombre", niveaux: { 1: () => longueur(1), 2: () => longueur(2), 3: () => longueur(3) } },
    { id: "para-diagonale", chap: "para", titre: "Diagonales", format: "nombre", niveaux: { 1: () => diagonale(1), 2: () => diagonale(2), 3: () => diagonale(3) } },
    { id: "para-nature", chap: "para", titre: "Rectangle, losange ou carré ?", format: "choix", options: ["oui", "non"], niveaux: { 1: () => nature(1), 2: () => nature(2), 3: () => nature(3) } }
  ]);
})();
