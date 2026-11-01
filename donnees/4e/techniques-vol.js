// Techniques d'entraînement de 4e : « Volumes (pyramide et cône) » (vol).
// D'après propositions/referentiels/4e/pyr.json et cone.json (lot 6), puis la mise à jour de novembre 2026
// (MISE-A-JOUR-2026-11-COURS.md) : pyr et cone fusionnés dans vol ; faces, arêtes et génératrice retirées
// (les générateurs de génératrice restent pour la 3e) ; conversions, solides droits et repérage ajoutés.
// Avec π : vraie valeur, réponse arrondie au dixième (calculatrice), cas d'arrondi ambigu exclus.
(function () {
  const { L, T, ent, choix, net, facile, fixe } = Savoirs.calculsOutils;
  const S = Savoirs.schemas;
  const cm = (x) => T(x) + " cm";
  // Valeur arrondie à d chiffres, ou null si le chiffre suivant rend l'arrondi ambigu (…,x5) ou si le calcul tombe juste
  function arrondi(x, d) {
    const y = x * Math.pow(10, d), f = y - Math.floor(y);
    if (f < 0.05 || f > 0.95 || Math.abs(f - 0.5) < 0.05) return null;
    return Math.round(y) / Math.pow(10, d);
  }
  const cube = (k) => net(k * k * k);

  // ---------- Volume d'une pyramide ----------
  function pyrVolume1(niveau) {
    let c, h;
    do { c = facile(niveau) ? 3 : ent(2, 6); h = ent(2, 9); } while ((c * c * h) % 3);
    const B = c * c, V = B * h / 3;
    return {
      enonce: "Calculer le volume de cette pyramide à base carrée.",
      schema: S.pyramide({ lo: c, h: h, elo: cm(c), eh: cm(h) }),
      reponse: V, unite: "cm³",
      correction: "Aire de la base : $\\mathcal{B} = " + c + " \\times " + c + " = " + B + "$ cm². $V = \\dfrac{\\mathcal{B} \\times h}{3} = \\dfrac{" + B + " \\times " + h + "}{3} = \\dfrac{" + B * h + "}{3} = " + V + "$ cm³."
    };
  }
  function pyrVolume2(niveau) {
    if (facile(niveau)) {
      const B = 3 * ent(1, 10), h = ent(2, 12), V = B * h / 3;
      return { enonce: "Une pyramide a une base d'aire " + B + " cm² et une hauteur de " + h + " cm. Calculer son volume.", reponse: V, unite: "cm³",
        correction: "$V = \\dfrac{\\mathcal{B} \\times h}{3} = \\dfrac{" + B + " \\times " + h + "}{3} = " + V + "$ cm³." };
    }
    if (Math.random() < 0.5) {
      let lo, la, h; do { lo = ent(3, 10); la = ent(2, 8); h = ent(2, 12); } while (la >= lo || (lo * la * h) % 3);
      const B = lo * la, V = B * h / 3;
      return {
        enonce: "Calculer le volume de cette pyramide à base rectangulaire.",
        schema: S.pyramide({ lo: lo, la: la, h: h, elo: cm(lo), ela: cm(la), eh: cm(h) }),
        reponse: V, unite: "cm³",
        correction: "Aire de la base : $\\mathcal{B} = " + lo + " \\times " + la + " = " + B + "$ cm². $V = \\dfrac{\\mathcal{B} \\times h}{3} = \\dfrac{" + B + " \\times " + h + "}{3} = " + V + "$ cm³."
      };
    }
    let b, hb, h; do { b = ent(2, 12); hb = ent(2, 10); h = ent(2, 12); } while ((b * hb) % 2 || ((b * hb / 2) * h) % 3);
    const B = b * hb / 2, V = B * h / 3;
    return {
      enonce: "Une pyramide a pour base un triangle de base " + b + " cm et de hauteur " + hb + " cm ; la hauteur de la pyramide mesure " + h + " cm. Calculer son volume.",
      reponse: V, unite: "cm³",
      correction: "Aire de la base : $\\mathcal{B} = \\dfrac{" + b + " \\times " + hb + "}{2} = " + B + "$ cm². $V = \\dfrac{\\mathcal{B} \\times h}{3} = \\dfrac{" + B + " \\times " + h + "}{3} = " + V + "$ cm³."
    };
  }
  function pyrVolume3() {
    const type = choix(["hauteur", "base", "litres"]);
    if (type === "litres") {
      const c = choix([10, 20, 30, 40]), h = 3 * ent(2, 10), V = c * c * h / 3;
      return {
        enonce: "Calculer le volume de cette pyramide à base carrée, en litres.",
        schema: S.pyramide({ lo: c, h: h, elo: cm(c), eh: cm(h) }),
        reponse: net(V / 1000), unite: "L",
        correction: "$V = \\dfrac{" + c + "^{2} \\times " + h + "}{3} = \\dfrac{" + L(c * c) + " \\times " + h + "}{3} = " + L(V) + "$ cm³. Comme $1$ L $= 1\\,000$ cm³, $V = " + L(net(V / 1000)) + "$ L."
      };
    }
    let B, h; do { B = ent(2, 30); h = ent(2, 15); } while ((B * h) % 3);
    const V = B * h / 3;
    if (type === "hauteur") return {
      enonce: "Une pyramide a un volume de " + V + " cm³ et une base d'aire " + B + " cm². Calculer sa hauteur.", reponse: h, unite: "cm",
      correction: "$V = \\dfrac{\\mathcal{B} \\times h}{3}$ donc $\\mathcal{B} \\times h = 3V = " + 3 * V + "$ et $h = \\dfrac{" + 3 * V + "}{" + B + "} = " + h + "$ cm."
    };
    return {
      enonce: "Une pyramide a un volume de " + V + " cm³ et une hauteur de " + h + " cm. Calculer l'aire de sa base.", reponse: B, unite: "cm²",
      correction: "$V = \\dfrac{\\mathcal{B} \\times h}{3}$ donc $\\mathcal{B} \\times h = 3V = " + 3 * V + "$ et $\\mathcal{B} = \\dfrac{" + 3 * V + "}{" + h + "} = " + B + "$ cm²."
    };
  }

  // ---------- Agrandissement et réduction (pyramide ou cône) ----------
  function volumeObtenu(solide, k, V) {
    const k3 = cube(k), r = net(V * k3);
    return {
      enonce: "Un" + (solide === "pyramide" ? "e pyramide" : " cône") + " de volume " + T(V) + " cm³ est " + (k > 1 ? "agrandi" : "réduit") + (solide === "pyramide" ? "e" : "") +
        " avec un rapport $k = " + L(k) + "$. Calculer le volume " + (solide === "pyramide" ? "de la pyramide obtenue." : "du cône obtenu."),
      reponse: r, unite: "cm³",
      correction: "Les volumes sont multipliés par $k^{3} = " + L(k) + "^{3} = " + L(k3) + "$ : $" + L(V) + " \\times " + L(k3) + " = " + L(r) + "$ cm³."
    };
  }
  function reduction1(solide, niveau) {
    const k = facile(niveau) ? 2 : choix([2, 3]);
    return volumeObtenu(solide, k, k === 2 ? ent(2, 12) : ent(2, 5));
  }
  function reduction2(solide, niveau) {
    if (facile(niveau)) return volumeObtenu(solide, 2, ent(2, 12));
    if (Math.random() < 0.3) { // aire de la base
      const k = choix([2, 3, 0.5, 0.1]), m = k === 0.5 ? 4 : k === 0.1 ? 100 : 1, B = m * ent(Math.ceil((k < 1 ? 4 * m : 2) / m), Math.floor((k < 1 ? 50 * m : 20) / m)), k2 = net(k * k), r = net(B * k2);
      const de = solide === "pyramide" ? "La base d'une pyramide" : "La base d'un cône";
      return {
        enonce: de + " a une aire de " + T(B) + " cm². " + (solide === "pyramide" ? "La pyramide" : "Le cône") + " est " + (k > 1 ? "agrandi" : "réduit") + (solide === "pyramide" ? "e" : "") + " avec un rapport $k = " + L(k) + "$. Calculer l'aire de la nouvelle base.",
        reponse: r, unite: "cm²",
        correction: "Les aires sont multipliées par $k^{2} = " + L(k) + "^{2} = " + L(k2) + "$ : $" + L(B) + " \\times " + L(k2) + " = " + L(r) + "$ cm²."
      };
    }
    const k = choix([0.5, 0.1, 4, 5]);
    return volumeObtenu(solide, k, k === 0.5 ? 8 * ent(1, 25) : k === 0.1 ? 1000 * ent(1, 20) : ent(2, 9));
  }
  function reduction3(solide) {
    const type = choix(["hauteurs", "volumes", "avant"]), un = solide === "pyramide" ? "Une pyramide" : "Un cône";
    if (type === "hauteurs") {
      const k = choix([2, 3, 0.5]), h1 = k === 0.5 ? 2 * ent(2, 9) : ent(2, 12), h2 = net(k * h1), V = k === 0.5 ? 8 * ent(1, 15) : ent(2, 15), k3 = cube(k), r = net(V * k3);
      return {
        enonce: un + " de hauteur " + h1 + " cm et de volume " + V + " cm³ est transformé" + (solide === "pyramide" ? "e" : "") + " en " + (solide === "pyramide" ? "une pyramide semblable" : "un cône semblable") + " de hauteur " + T(h2) + " cm. Calculer le volume " + (solide === "pyramide" ? "de la pyramide obtenue." : "du cône obtenu."),
        reponse: r, unite: "cm³",
        correction: "Le rapport est $k = \\dfrac{" + L(h2) + "}{" + h1 + "} = " + L(k) + "$. Les volumes sont multipliés par $k^{3} = " + L(k3) + "$ : $" + V + " \\times " + L(k3) + " = " + L(r) + "$ cm³."
      };
    }
    if (type === "volumes") {
      const k = ent(2, 5), V = ent(2, 12), r = V * k * k * k;
      return {
        enonce: un + " de volume " + V + " cm³ est agrandi" + (solide === "pyramide" ? "e" : "") + " : son volume devient " + T(r) + " cm³. Quel est le rapport $k$ de l'agrandissement ?",
        reponse: k,
        correction: "Les volumes sont multipliés par $k^{3} = \\dfrac{" + L(r) + "}{" + V + "} = " + k * k * k + "$. Or $" + k + "^{3} = " + k * k * k + "$, donc $k = " + k + "$."
      };
    }
    const k = choix([2, 3]), V = ent(2, 15), r = V * k * k * k;
    return {
      enonce: un + " a été agrandi" + (solide === "pyramide" ? "e" : "") + " avec un rapport $k = " + k + "$ : son volume est maintenant " + T(r) + " cm³. Quel était son volume avant l'agrandissement ?",
      reponse: V, unite: "cm³",
      correction: "Les volumes ont été multipliés par $k^{3} = " + k * k * k + "$. Avant : $" + L(r) + " \\div " + k * k * k + " = " + V + "$ cm³."
    };
  }

  // ---------- Conversions d'unités de volume ----------
  // Facteurs en cm³ ; « L » et « dm³ » sont la même unité, « mL » et « cm³ » aussi
  const UNITES = { "m³": 1e6, "dm³": 1e3, "L": 1e3, "cm³": 1, "mL": 1 };
  const uL = (u) => ({ "m³": "\\text{m}^{3}", "dm³": "\\text{dm}^{3}", "cm³": "\\text{cm}^{3}", "L": "\\text{L}", "mL": "\\text{mL}" })[u];
  const RAPPELS = { "m³-dm³": "$1\\ \\text{m}^{3} = 1\\,000\\ \\text{dm}^{3}$", "dm³-cm³": "$1\\ \\text{dm}^{3} = 1\\,000\\ \\text{cm}^{3}$", "dm³-L": "$1\\ \\text{dm}^{3} = 1$ L",
    "cm³-mL": "$1\\ \\text{cm}^{3} = 1$ mL", "L-cm³": "$1$ L $= 1\\,000\\ \\text{cm}^{3}$", "L-mL": "$1$ L $= 1\\,000$ mL", "m³-L": "$1\\ \\text{m}^{3} = 1\\,000\\ \\text{dm}^{3} = 1\\,000$ L",
    "dm³-mL": "$1\\ \\text{dm}^{3} = 1$ L $= 1\\,000$ mL", "m³-cm³": "$1\\ \\text{m}^{3} = 1\\,000\\ \\text{dm}^{3} = 1\\,000\\,000\\ \\text{cm}^{3}$" };
  const rappel = (u1, u2) => RAPPELS[u1 + "-" + u2] || RAPPELS[u2 + "-" + u1];
  function convertir(v, u1, u2) {
    const r = net(v * UNITES[u1] / UNITES[u2]);
    return {
      enonce: "Compléter : $" + L(v) + "\\ " + uL(u1) + " = \\dots\\ " + uL(u2) + "$",
      reponse: r, unite: u2,
      correction: rappel(u1, u2) + ", donc $" + L(v) + "\\ " + uL(u1) + " = " + L(r) + "\\ " + uL(u2) + "$."
    };
  }
  function conversion1(niveau) {
    if (facile(niveau)) return convertir(ent(2, 9), "dm³", "L");
    const [u1, u2] = choix([["m³", "dm³"], ["dm³", "cm³"], ["dm³", "L"], ["L", "dm³"], ["cm³", "mL"], ["L", "cm³"], ["L", "mL"]]);
    return convertir(UNITES[u1] === UNITES[u2] ? ent(2, 500) : ent(2, 9), u1, u2);
  }
  function conversion2(niveau) {
    if (facile(niveau)) return convertir(ent(2, 9), ...choix([["m³", "dm³"], ["dm³", "cm³"]]));
    const [u1, u2] = choix([["m³", "dm³"], ["dm³", "cm³"], ["L", "cm³"], ["L", "mL"], ["cm³", "dm³"], ["cm³", "L"], ["mL", "L"], ["dm³", "m³"]]);
    const grand = UNITES[u1] > UNITES[u2];
    const v = grand ? choix([0.5, 1.5, 2.5, 0.25, 0.75, 3.2, 0.8, 1.2]) : 100 * ent(1, 99) * choix([1, 10]);
    return convertir(v, u1, u2);
  }
  function conversion3() {
    const type = choix(["deux", "deux", "situation"]);
    if (type === "deux") {
      const [u1, u2] = choix([["m³", "L"], ["m³", "cm³"], ["cm³", "m³"], ["L", "m³"], ["dm³", "mL"], ["mL", "dm³"]]);
      const grand = UNITES[u1] > UNITES[u2];
      const v = grand ? choix([0.5, 1.2, 2.4, 0.06, 0.75, 0.125, 3.5]) : choix([1000, 1500, 2500, 750, 125, 45000, 600]);
      return convertir(v, u1, u2);
    }
    const cas = choix(["aquarium", "piscine", "bouteilles"]);
    if (cas === "aquarium") {
      const lo = choix([40, 50, 60, 80]), la = choix([20, 25, 30]), h = choix([30, 40, 50]), V = lo * la * h;
      return { enonce: "Un aquarium a la forme d'un pavé droit de " + lo + " cm sur " + la + " cm, et de " + h + " cm de hauteur. Combien de litres d'eau peut-il contenir ?",
        schema: S.pave({ lo: lo, la: la, h: h, elo: cm(lo), ela: cm(la), eh: cm(h) }), reponse: net(V / 1000), unite: "L",
        correction: "$V = " + lo + " \\times " + la + " \\times " + h + " = " + L(V) + "$ cm³. Comme $1$ L $= 1\\,000$ cm³, il contient $" + L(net(V / 1000)) + "$ L." };
    }
    if (cas === "piscine") {
      const lo = choix([8, 10, 12]), la = choix([4, 5, 6]), h = choix([1.2, 1.5, 2]), V = net(lo * la * h);
      return { enonce: "Une piscine a la forme d'un pavé droit de " + lo + " m sur " + la + " m, et de " + T(h) + " m de profondeur. Combien de litres d'eau faut-il pour la remplir ?",
        reponse: net(V * 1000), unite: "L",
        correction: "$V = " + lo + " \\times " + la + " \\times " + L(h) + " = " + L(V) + "\\ \\text{m}^{3}$. Comme $1\\ \\text{m}^{3} = 1\\,000$ L, il faut $" + L(net(V * 1000)) + "$ L." };
    }
    const b = choix([25, 33, 50, 75]), n = choix([2, 4, 6, 8, 12]), V = b * 10 * n;
    return { enonce: "On remplit " + n + " bouteilles de " + b + " cL. Quel volume d'eau faut-il, en $\\text{cm}^{3}$ ?", reponse: V, unite: "cm³",
      correction: "$" + b + "$ cL $= " + b * 10 + "$ mL $= " + b * 10 + "\\ \\text{cm}^{3}$. Pour " + n + " bouteilles : $" + n + " \\times " + b * 10 + " = " + L(V) + "\\ \\text{cm}^{3}$." };
  }

  // ---------- Volume d'un solide droit : V = aire de la base × hauteur ----------
  function droit1(niveau) {
    const lo = facile(niveau) ? 5 : ent(2, 10), la = facile(niveau) ? 2 : ent(2, 8), h = ent(2, 10), V = lo * la * h;
    return { enonce: "Calculer le volume de ce pavé droit.", schema: S.pave({ lo: lo, la: la, h: h, elo: cm(lo), ela: cm(la), eh: cm(h) }), reponse: V, unite: "cm³",
      correction: "$V = L \\times \\ell \\times h = " + lo + " \\times " + la + " \\times " + h + " = " + V + "$ cm³." };
  }
  function droit2(niveau) {
    if (facile(niveau) || Math.random() < 0.4) {
      const B = ent(3, 40), h = ent(2, 12);
      return { enonce: "Un prisme droit a une base d'aire " + B + " cm² et une hauteur de " + h + " cm. Calculer son volume.", schema: S.prisme({ eh: cm(h) }), reponse: B * h, unite: "cm³",
        correction: "$V = \\mathcal{B} \\times h = " + B + " \\times " + h + " = " + B * h + "$ cm³." };
    }
    let a, b, h; do { a = ent(2, 10); b = ent(2, 10); h = ent(2, 12); } while ((a * b) % 2);
    const B = a * b / 2;
    return { enonce: "La base d'un prisme droit est un triangle rectangle dont les côtés de l'angle droit mesurent " + a + " cm et " + b + " cm. La hauteur du prisme est " + h + " cm. Calculer son volume.",
      schema: S.prisme({ eh: cm(h) }), reponse: B * h, unite: "cm³",
      correction: "Aire de la base : $\\mathcal{B} = \\dfrac{" + a + " \\times " + b + "}{2} = " + B + "$ cm². $V = \\mathcal{B} \\times h = " + B + " \\times " + h + " = " + B * h + "$ cm³." };
  }
  function droit3() {
    let r, h, v, a;
    do { r = ent(1, 8); h = ent(2, 15); v = Math.PI * r * r * h; a = arrondi(v, 1); } while (a === null);
    return { enonce: "Calculer le volume de ce cylindre. Donner la valeur arrondie au dixième.", schema: S.cylindre({ r: r, h: h, er: cm(r), eh: cm(h) }), reponse: a, unite: "cm³",
      correction: "La base est un disque : $\\mathcal{B} = \\pi \\times r^{2}$. $V = \\pi \\times " + r + "^{2} \\times " + h + " = " + r * r * h + "\\pi \\approx " + fixe(v, 3) + "$ cm³, soit $" + fixe(a, 1) + "$ cm³ au dixième." };
  }

  // ---------- Repérage dans un pavé droit ----------
  const SOMMETS = { A: [0, 0, 0], B: [1, 0, 0], C: [1, 1, 0], D: [0, 1, 0], E: [0, 0, 1], F: [1, 0, 1], G: [1, 1, 1], H: [0, 1, 1] };
  const coord = (p) => "(" + p.map(T).join(" ; ") + ")";
  const repere = "Le repère a pour origine $A$ : l'axe des abscisses suit $[AB]$, celui des ordonnées $[AD]$ et celui des altitudes $[AE]$.";
  function dims() { let lo, la, h; do { lo = ent(2, 8); la = ent(2, 6); h = ent(2, 6); } while (lo === la || la === h || lo === h); return [lo, la, h]; }
  // Quatre coordonnées proposées : la bonne et des permutations ou erreurs fréquentes
  function propositions(p) {
    const opts = [coord(p)], essais = [[p[1], p[0], p[2]], [p[2], p[1], p[0]], [p[0], p[2], p[1]], [p[1], p[2], p[0]], [p[2], p[0], p[1]]];
    for (const e of melange(essais)) { const c = coord(e); if (opts.indexOf(c) < 0) opts.push(c); if (opts.length === 4) break; }
    let k = 1; while (opts.length < 4) { const c = coord([p[0] + k, p[1], p[2]]); if (opts.indexOf(c) < 0) opts.push(c); k++; }
    return melange(opts);
  }
  const melange = (l) => Savoirs.melanger(l.slice());
  function reperage1(niveau) {
    const [lo, la, h] = dims(), n = facile(niveau) ? "G" : choix(["B", "C", "D", "E", "F", "G", "H"]), p = SOMMETS[n].map((u, i) => u * [lo, la, h][i]);
    const i = facile(niveau) ? 2 : choix([0, 1, 2]);
    const quoi = ["l'abscisse", "l'ordonnée", "l'altitude"][i];
    return {
      enonce: repere + " Quelle est " + quoi + " du point $" + n + "$ ?",
      schema: S.paveRepere({ lo: lo, la: la, h: h }), reponse: p[i],
      correction: "$" + n + "$ a pour coordonnées $" + coord(p) + "$ : abscisse $" + p[0] + "$, ordonnée $" + p[1] + "$, altitude $" + p[2] + "$. Donc " + quoi + " de $" + n + "$ est $" + p[i] + "$."
    };
  }
  function reperage2(niveau) {
    const [lo, la, h] = dims(), n = facile(niveau) ? "G" : choix(["C", "F", "G", "H", "B", "D", "E"]), p = SOMMETS[n].map((u, i) => u * [lo, la, h][i]);
    return {
      enonce: repere + " Quelles sont les coordonnées du point $" + n + "$ ?",
      schema: S.paveRepere({ lo: lo, la: la, h: h }), format: "choix", options: propositions(p), reponse: coord(p),
      correction: "On lit dans l'ordre l'abscisse (selon $[AB]$), l'ordonnée (selon $[AD]$) puis l'altitude (selon $[AE]$) : $" + n + " " + coord(p) + "$."
    };
  }
  function reperage3() {
    let lo, la, h; do { [lo, la, h] = dims(); } while (lo % 2 || la % 2 || h % 2);
    const cas = choix([
      ["le milieu de l'arête $[FG]$", [lo, la / 2, h]], ["le milieu de l'arête $[EH]$", [0, la / 2, h]], ["le milieu de l'arête $[BF]$", [lo, 0, h / 2]],
      ["le milieu de l'arête $[CG]$", [lo, la, h / 2]], ["le centre de la face $EFGH$", [lo / 2, la / 2, h]], ["le centre de la face $ABCD$", [lo / 2, la / 2, 0]],
      ["le centre de la face $BCGF$", [lo, la / 2, h / 2]]
    ]);
    const p = cas[1];
    return {
      enonce: repere + " Le point $M$ est " + cas[0] + ". Quelles sont ses coordonnées ?",
      schema: S.paveRepere({ lo: lo, la: la, h: h, point: { x: p[0], y: p[1], z: p[2], nom: "M" } }), format: "choix", options: propositions(p), reponse: coord(p),
      correction: "On lit l'abscisse (selon $[AB]$), l'ordonnée (selon $[AD]$) puis l'altitude (selon $[AE]$) ; pour un milieu, on prend la moitié de la longueur de l'arête : $M " + coord(p) + "$."
    };
  }

  // ---------- Volume d'un cône ----------
  function coneVolume1(niveau) {
    let B, h; do { B = ent(2, 30); h = facile(niveau) ? 3 : ent(2, 12); } while ((B * h) % 3);
    const V = B * h / 3;
    return { enonce: "Un cône a une base d'aire " + B + " cm² et une hauteur de " + h + " cm. Calculer son volume.", reponse: V, unite: "cm³",
      correction: "$V = \\dfrac{\\mathcal{B} \\times h}{3} = \\dfrac{" + B + " \\times " + h + "}{3} = \\dfrac{" + B * h + "}{3} = " + V + "$ cm³." };
  }
  function coneAvecPi(r, h, diametre, debut) {
    const v = Math.PI * r * r * h / 3, a = arrondi(v, 1);
    if (a === null) return null;
    return {
      enonce: "Calculer le volume de ce cône de révolution. Donner la valeur arrondie au dixième.",
      schema: S.cone({ r: r, h: h, er: diametre ? null : cm(r), ed: diametre ? cm(2 * r) : null, eh: cm(h) }),
      reponse: a, unite: "cm³",
      correction: (debut || "") + "$V = \\dfrac{\\pi \\times r^{2} \\times h}{3} = \\dfrac{\\pi \\times " + L(r) + "^{2} \\times " + L(h) + "}{3} \\approx " + fixe(v, 3) + "$ cm³, soit $" + fixe(a, 1) + "$ cm³ au dixième."
    };
  }
  function coneVolume2(niveau) {
    let e; do { e = coneAvecPi(ent(1, 6), facile(niveau) ? 3 : ent(2, 12)); } while (!e);
    return e;
  }
  function coneVolume3() {
    let e;
    do {
      // En 4e, la génératrice n'est plus au programme : plus de cas « rayon et génératrice »
      const type = choix(["diametre", "demi"]);
      if (type === "diametre") { const d = 2 * ent(2, 10); e = coneAvecPi(d / 2, ent(2, 15), true, "Le rayon est $" + d + " \\div 2 = " + d / 2 + "$ cm. "); }
      else if (type === "demi") e = coneAvecPi(ent(1, 9) + 0.5, ent(2, 15));
      else {
        const [a, b, g] = choix([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15]]), [r, h] = Math.random() < 0.5 ? [a, b] : [b, a];
        e = coneAvecPi(r, h, false, "");
        if (e) {
          e.enonce = "Un cône de révolution a pour rayon " + r + " cm et pour génératrice " + g + " cm. Calculer son volume. Donner la valeur arrondie au dixième.";
          e.schema = S.coneGeneratrice({ r: r, h: h, er: cm(r), eg: cm(g) });
          e.correction = "D'abord la hauteur (Pythagore, la génératrice est l'hypoténuse) : $h^{2} = " + g + "^{2} - " + r + "^{2} = " + (g * g) + " - " + (r * r) + " = " + h * h + "$, donc $h = " + h + "$ cm. " + e.correction;
        }
      }
    } while (!e);
    return e;
  }

  // ---------- Génératrice, hauteur et rayon ----------
  const TRIPLETS = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]];
  const DECIMAUX = [[0.6, 0.8, 1], [1.5, 2, 2.5], [2.1, 2.8, 3.5], [4.5, 6, 7.5], [0.5, 1.2, 1.3], [1.8, 2.4, 3], [2.4, 3.2, 4], [3.6, 4.8, 6], [1.5, 3.6, 3.9], [2.5, 6, 6.5], [3, 7.2, 7.8], [4.2, 5.6, 7]];
  const triangleCone = "Le triangle formé par la hauteur, le rayon et la génératrice est rectangle ; la génératrice $g$ est l'hypoténuse : ";
  function generatrice(r, h, g, cherche, arr) {
    const fig = S.coneGeneratrice({ r: r, h: h, er: cherche === "r" ? "?" : cm(r), eh: cherche === "h" ? "?" : cm(h), eg: cherche === "g" ? "?" : cm(g) });
    const nom = { g: "la longueur de la génératrice de ce cône de révolution", h: "la hauteur de ce cône de révolution", r: "le rayon de ce cône de révolution" }[cherche];
    const c2 = (x) => L(net(x * x));
    let corr, rep;
    if (cherche === "g") { const s = net(r * r + h * h); rep = arr ? arrondi(Math.sqrt(s), 1) : g; corr = triangleCone + "$g^{2} = " + L(h) + "^{2} + " + L(r) + "^{2} = " + c2(h) + " + " + c2(r) + " = " + L(s) + "$, donc $g = \\sqrt{" + L(s) + "}" + (arr ? " \\approx " + fixe(rep, 1) : " = " + L(g)) + "$ cm."; }
    else { const [conn, nomC] = cherche === "h" ? [r, "r"] : [h, "h"], s = net(g * g - conn * conn); rep = cherche === "h" ? h : r; corr = "La génératrice est l'hypoténuse : $" + cherche + "^{2} = g^{2} - " + nomC + "^{2} = " + L(g) + "^{2} - " + L(conn) + "^{2} = " + c2(g) + " - " + c2(conn) + " = " + L(s) + "$, donc $" + cherche + " = " + L(rep) + "$ cm."; }
    return { enonce: "Calculer " + nom + (arr ? ". Donner la valeur arrondie au dixième." : "."), schema: fig, reponse: rep, unite: "cm", correction: corr };
  }
  function generatrice1(niveau) {
    const [a, b, g] = facile(niveau) ? [3, 4, 5] : choix(TRIPLETS), [r, h] = Math.random() < 0.5 ? [a, b] : [b, a];
    return generatrice(r, h, g, "g");
  }
  function generatrice2(niveau) {
    if (facile(niveau)) { const [r, h] = choix([[6, 8], [8, 6]]); return generatrice(r, h, 10, "g"); }
    const [a, b, g] = choix(TRIPLETS), [r, h] = Math.random() < 0.5 ? [a, b] : [b, a];
    return generatrice(r, h, g, choix(["h", "r"]));
  }
  function generatrice3() {
    if (Math.random() < 0.6) {
      const [a, b, g] = choix(DECIMAUX), [r, h] = Math.random() < 0.5 ? [a, b] : [b, a];
      return generatrice(r, h, g, choix(["g", "h", "r"]));
    }
    let r, h, e;
    do { r = ent(2, 12); h = ent(2, 12); e = arrondi(Math.sqrt(r * r + h * h), 1); } while (e === null);
    return generatrice(r, h, Math.sqrt(r * r + h * h), "g", true);
  }

  // Les ids pyr-… et cone-… sont gardés : la progression des élèves est conservée
  const vol = [
    { id: "vol-conversion", chap: "vol", titre: "Convertir des volumes et des contenances", format: "nombre", niveaux: { 1: () => conversion1(1), 2: () => conversion2(2), 3: () => conversion3() } },
    { id: "vol-droit", chap: "vol", titre: "Volume d'un pavé, d'un prisme ou d'un cylindre", format: "nombre", calculatrice: [3], niveaux: { 1: () => droit1(1), 2: () => droit2(2), 3: () => droit3() } },
    { id: "pyr-volume", chap: "vol", titre: "Volume d'une pyramide", format: "nombre", niveaux: { 1: () => pyrVolume1(1), 2: () => pyrVolume2(2), 3: () => pyrVolume3() } },
    { id: "cone-volume", chap: "vol", titre: "Volume d'un cône", format: "nombre", calculatrice: [2, 3], niveaux: { 1: () => coneVolume1(1), 2: () => coneVolume2(2), 3: () => coneVolume3() } },
    { id: "pyr-reduction", chap: "vol", titre: "Agrandissement et réduction d'une pyramide", format: "nombre", niveaux: { 1: () => reduction1("pyramide", 1), 2: () => reduction2("pyramide", 2), 3: () => reduction3("pyramide") } },
    { id: "cone-reduction", chap: "vol", titre: "Agrandissement et réduction d'un cône", format: "nombre", niveaux: { 1: () => reduction1("cone", 1), 2: () => reduction2("cone", 2), 3: () => reduction3("cone") } },
    { id: "vol-reperage", chap: "vol", titre: "Se repérer dans un pavé droit", format: "nombre", niveaux: { 1: () => reperage1(1), 2: () => reperage2(2), 3: () => reperage3() } }
  ];

  // La génératrice et la réduction servent aussi en 3e (donnees/3e/techniques-esp.js)
  Savoirs.volumesPyrCone = { pyrVolume1, pyrVolume2, pyrVolume3, reduction1, reduction2, reduction3, generatrice1, generatrice2, generatrice3 };
  Savoirs.enregistrerTechniques("4e", vol);
})();
