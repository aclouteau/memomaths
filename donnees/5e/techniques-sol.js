// Techniques d'entraînement de 5e : « Solides et volumes » (sol).
// D'après propositions/referentiels/5e/sol.json (lot 8) : les descriptions de niveau sont la spécification.
// Cylindre : vraie valeur de π (calculatrice dès le niveau 1), arrondi au dixième, cas d'arrondi ambigu exclus.
(function () {
  const { L, T, ent, choix, net, facile, fixe } = Savoirs.calculsOutils;
  const Sc = Savoirs.schemas;
  const cm = (x) => T(x) + " cm";
  const dec1 = () => { for (;;) { const k = ent(11, 99); if (k % 10) return k / 10; } };
  function arrondi(x, d) {
    const y = x * Math.pow(10, d), f = y - Math.floor(y);
    if (f < 0.05 || f > 0.95 || Math.abs(f - 0.5) < 0.05) return null;
    return Math.round(y) / Math.pow(10, d);
  }

  // ---------- Pavé droit et cube ----------
  function pave(lo, la, h, texte) {
    const V = net(lo * la * h);
    return {
      enonce: texte ? "Un pavé droit mesure " + T(lo) + " cm de long, " + T(la) + " cm de large et " + T(h) + " cm de haut. Calculer son volume." : "Calculer le volume d'un pavé droit de dimensions " + T(lo) + " cm, " + T(la) + " cm et " + T(h) + " cm.",
      schema: Sc.pave({ lo: lo, la: la, h: h, elo: cm(lo), ela: cm(la), eh: cm(h) }), reponse: V, unite: "cm³",
      correction: "$V = L \\times \\ell \\times h = " + L(lo) + " \\times " + L(la) + " \\times " + L(h) + " = " + L(V) + "\\ \\text{cm}^{3}$."
    };
  }
  function cube(a) {
    return { enonce: "Un cube a une arête de " + a + " cm. Calculer son volume.", schema: Sc.cube({ ec: cm(a) }), reponse: a * a * a, unite: "cm³",
      correction: "$V = a^{3} = " + a + " \\times " + a + " \\times " + a + " = " + L(a * a * a) + "\\ \\text{cm}^{3}$." };
  }
  function pave3() {
    if (Math.random() < 0.5) {
      const lo = 10 * ent(3, 9), la = 10 * ent(2, 9), h = 10 * ent(3, 9), V = lo * la * h;
      return { enonce: "Un aquarium en forme de pavé droit mesure " + lo + " cm de long, " + la + " cm de large et " + h + " cm de haut. Combien de litres d'eau peut-il contenir ?",
        reponse: V / 1000, unite: "L",
        correction: "$V = " + lo + " \\times " + la + " \\times " + h + " = " + L(V) + "\\ \\text{cm}^{3}$. Comme $1\\ \\text{L} = 1\\ \\text{dm}^{3} = 1\\,000\\ \\text{cm}^{3}$, il contient $" + L(V / 1000) + "$ L." };
    }
    const lo = ent(3, 12), la = ent(2, 8), h = ent(2, 10), V = lo * la * h;
    return { enonce: "Un pavé droit a un volume de " + T(V) + " cm³. Sa longueur est " + lo + " cm et sa largeur " + la + " cm. Calculer sa hauteur.", reponse: h, unite: "cm",
      correction: "$V = L \\times \\ell \\times h$, donc $h = \\dfrac{V}{L \\times \\ell} = \\dfrac{" + L(V) + "}{" + lo + " \\times " + la + "} = \\dfrac{" + L(V) + "}{" + lo * la + "} = " + h + "$ cm." };
  }

  // ---------- Prisme droit ----------
  function prismeAire(B, h, texte) {
    return { enonce: texte ? "La base d'un prisme droit a une aire de " + B + " cm² ; sa hauteur mesure " + h + " cm. Calculer son volume." : "Un prisme droit a une base d'aire " + B + " cm² et une hauteur de " + h + " cm. Calculer son volume.",
      schema: Sc.prisme({ eh: cm(h) }), reponse: B * h, unite: "cm³", correction: "$V = \\mathcal{B} \\times h = " + B + " \\times " + h + " = " + B * h + "\\ \\text{cm}^{3}$." };
  }
  function prismeRect(a, b, h) {
    const B = a * b / 2;
    return { enonce: "Un prisme droit a pour base un triangle rectangle dont les côtés de l'angle droit mesurent " + a + " cm et " + b + " cm. Sa hauteur est " + h + " cm. Calculer son volume.",
      schema: Sc.prisme({ eh: cm(h) }), reponse: B * h, unite: "cm³",
      correction: "Aire de la base : $\\mathcal{B} = \\dfrac{" + a + " \\times " + b + "}{2} = " + L(B) + "\\ \\text{cm}^{2}$. $V = \\mathcal{B} \\times h = " + L(B) + " \\times " + h + " = " + L(B * h) + "\\ \\text{cm}^{3}$." };
  }
  function prisme3() {
    if (Math.random() < 0.5) {
      const B = ent(2, 30), h = ent(2, 12), V = B * h;
      return { enonce: "Un prisme droit a un volume de " + V + " cm³ et une base d'aire " + B + " cm². Calculer sa hauteur.", reponse: h, unite: "cm",
        correction: "$V = \\mathcal{B} \\times h$, donc $h = \\dfrac{V}{\\mathcal{B}} = \\dfrac{" + V + "}{" + B + "} = " + h + "$ cm." };
    }
    let b, hb; do { b = ent(3, 14); hb = ent(2, 10); } while ((b * hb) % 2);
    const B = b * hb / 2, h = ent(2, 12);
    return { enonce: "La base d'un prisme droit est un triangle de base " + b + " cm et de hauteur " + hb + " cm. La hauteur du prisme est " + h + " cm. Calculer son volume.",
      schema: Sc.prisme({ eh: cm(h) }), reponse: B * h, unite: "cm³",
      correction: "Aire de la base : $\\mathcal{B} = \\dfrac{" + b + " \\times " + hb + "}{2} = " + B + "\\ \\text{cm}^{2}$. $V = " + B + " \\times " + h + " = " + B * h + "\\ \\text{cm}^{3}$." };
  }

  // ---------- Cylindre ----------
  function cylindre(r, h, diametre) {
    const v = Math.PI * r * r * h, a = arrondi(v, 1);
    if (a === null) return null;
    return {
      enonce: "Un cylindre a pour " + (diametre ? "diamètre " + 2 * r : "rayon " + r) + " cm et pour hauteur " + h + " cm. Calculer son volume. Donner la valeur arrondie au dixième.",
      schema: Sc.cylindre({ r: r, h: h, er: diametre ? null : cm(r), ed: diametre ? cm(2 * r) : null, eh: cm(h) }), reponse: a, unite: "cm³",
      correction: (diametre ? "Le rayon est $" + 2 * r + " \\div 2 = " + r + "$ cm. " : "") + "$V = \\pi \\times r^{2} \\times h = \\pi \\times " + r + "^{2} \\times " + h + " \\approx " + fixe(v, 3) + "$ cm³, soit $" + fixe(a, 1) + "$ cm³ au dixième."
    };
  }
  function cylindre3() {
    for (;;) {
      const r = ent(3, 10), h = ent(5, 30), v = Math.PI * r * r * h, a = arrondi(v / 1000, 1);
      if (a === null) continue;
      return { enonce: "Une casserole cylindrique a un rayon de " + r + " cm et une hauteur de " + h + " cm. Quelle est sa contenance en litres ? Donner la valeur arrondie au dixième.", reponse: a, unite: "L",
        correction: "$V = \\pi \\times " + r + "^{2} \\times " + h + " \\approx " + fixe(v, 0) + "\\ \\text{cm}^{3}$, soit $" + fixe(v / 1000, 3) + "$ L (on divise par $1\\,000$) ; arrondi au dixième : $" + fixe(a, 1) + "$ L." };
    }
  }

  // ---------- Conversions ----------
  const unites = { "dm³": "\\text{dm}^{3}", "cm³": "\\text{cm}^{3}", "m³": "\\text{m}^{3}", "L": "L", "cL": "cL", "mL": "mL" };
  const RAPPEL = {
    "dm³>L": "$1\\ \\text{dm}^{3} = 1$ L", "dm³>cm³": "$1\\ \\text{dm}^{3} = 1\\,000\\ \\text{cm}^{3}$", "cm³>L": "$1\\,000\\ \\text{cm}^{3} = 1$ L", "L>cL": "$1$ L $= 100$ cL",
    "mL>cm³": "$1$ mL $= 1\\ \\text{cm}^{3}$", "m³>L": "$1\\ \\text{m}^{3} = 1\\,000$ L", "L>m³": "$1\\,000$ L $= 1\\ \\text{m}^{3}$", "L>mL": "$1$ L $= 1\\,000$ mL"
  };
  const FACT = { "dm³>L": 1, "dm³>cm³": 1000, "cm³>L": 0.001, "L>cL": 100, "mL>cm³": 1, "m³>L": 1000, "L>m³": 0.001, "L>mL": 1000 };
  function convertir(v, de, vers) {
    const k = de + ">" + vers, r = net(v * FACT[k]);
    const ecrit = (x, u) => "$" + L(x) + (u === "L" || u === "cL" || u === "mL" ? "$ " + u : "\\ " + unites[u] + "$");
    return { enonce: "Convertir " + ecrit(v, de) + " en " + (vers === "L" ? "litres" : vers === "cL" || vers === "mL" ? vers : "$" + unites[vers] + "$") + ".", reponse: r, unite: vers,
      correction: RAPPEL[k] + ", donc " + ecrit(v, de) + " $=$ " + ecrit(r, vers) + "." };
  }

  // ---------- Faces, sommets et arêtes d'un prisme ----------
  const BASES = { 3: "triangulaire", 4: "rectangulaire", 5: "pentagonale", 6: "hexagonale", 8: "octogonale" };
  function elements(n, quoi, nom) {
    const base = nom ? "à base " + BASES[n] : "dont la base a " + n + " côtés";
    if (quoi === "faces") return { enonce: "Combien de faces a un prisme droit " + base + " ?", reponse: n + 2, correction: "Deux bases et une face rectangulaire par côté de la base : $" + n + " + 2 = " + (n + 2) + "$ faces." };
    if (quoi === "sommets") return { enonce: "Combien de sommets a un prisme droit " + base + " ?", reponse: 2 * n, correction: "Chaque base a $" + n + "$ sommets : $2 \\times " + n + " = " + 2 * n + "$ sommets." };
    return { enonce: "Combien d'arêtes a un prisme droit " + base + " ?", reponse: 3 * n, correction: "$" + n + "$ arêtes sur chaque base et $" + n + "$ arêtes latérales : $3 \\times " + n + " = " + 3 * n + "$ arêtes." };
  }
  function elements3() {
    const n = ent(3, 15), quoi = choix(["faces", "sommets", "aretes"]);
    if (quoi === "faces") return { enonce: "Un prisme droit a " + (n + 2) + " faces. Combien de côtés a sa base ?", reponse: n, correction: "Il y a deux bases et une face latérale par côté : $" + (n + 2) + " - 2 = " + n + "$ côtés." };
    if (quoi === "sommets") return { enonce: "Un prisme droit a " + 2 * n + " sommets. Combien de côtés a sa base ?", reponse: n, correction: "Les sommets sont sur les deux bases : $" + 2 * n + " \\div 2 = " + n + "$ côtés." };
    return { enonce: "Un prisme droit a " + 3 * n + " arêtes. Combien de côtés a sa base ?", reponse: n, correction: "Il y a $3$ arêtes par côté de la base (deux sur les bases, une latérale) : $" + 3 * n + " \\div 3 = " + n + "$ côtés." };
  }

  const sol = [
    {
      id: "sol-pave", chap: "sol", titre: "Volume d'un pavé droit ou d'un cube", format: "nombre",
      niveaux: {
        1: () => facile(1) ? cube(ent(2, 5)) : pave(ent(2, 10), ent(2, 6), ent(2, 5), Math.random() < 0.5),
        2: () => facile(2) ? cube(10) : Math.random() < 0.3 ? cube(ent(6, 12)) : (() => { const d = [dec1(), ent(2, 9), ent(2, 6)]; return pave(d[0], d[1], d[2], true); })(),
        3: () => pave3()
      }
    },
    {
      id: "sol-prisme", chap: "sol", titre: "Volume d'un prisme droit", format: "nombre",
      niveaux: {
        1: () => prismeAire(ent(2, 20), facile(1) ? 10 : ent(2, 10), Math.random() < 0.5),
        2: () => { if (facile(2)) return prismeRect(4, ent(2, 10), ent(2, 10)); let a, b; do { a = ent(2, 10); b = ent(2, 10); } while ((a * b) % 2); return prismeRect(a, b, ent(2, 10)); },
        3: () => prisme3()
      }
    },
    {
      id: "sol-cylindre", chap: "sol", titre: "Volume d'un cylindre", format: "nombre", calculatrice: [1, 2, 3],
      niveaux: {
        1: () => { let e; do { e = cylindre(facile(1) ? 1 : ent(1, 5), ent(1, 10)); } while (!e); return e; },
        2: () => { let e; do { e = cylindre(facile(2) ? 1 : ent(1, 10), ent(2, 15), true); } while (!e); return e; },
        3: () => cylindre3()
      }
    },
    {
      id: "sol-conversion", chap: "sol", titre: "Volumes et contenances", format: "nombre",
      niveaux: {
        1: () => facile(1) ? convertir(1, "dm³", choix(["L", "cm³"])) : convertir(ent(2, 50), "dm³", choix(["L", "L", "cm³"])),
        2: () => {
          if (facile(2)) return convertir(1000, "cm³", "L");
          const cas = choix(["cm³>L", "L>cL", "mL>cm³"]);
          if (cas === "cm³>L") return convertir(100 * ent(2, 99), "cm³", "L");
          if (cas === "L>cL") return convertir(choix([0.5, 0.75, 1.5, 0.25, 2.5, 0.33, 1.2]), "L", "cL");
          return convertir(ent(20, 990), "mL", "cm³");
        },
        3: () => {
          const cas = choix(["m³>L", "L>m³", "L>mL"]);
          if (cas === "m³>L") return convertir(dec1(), "m³", "L");
          if (cas === "L>m³") return convertir(100 * ent(11, 99), "L", "m³");
          return convertir(dec1(), "L", "mL");
        }
      }
    },
    {
      id: "sol-elements", chap: "sol", titre: "Faces, sommets et arêtes d'un prisme", format: "nombre",
      niveaux: {
        1: () => elements(facile(1) ? 3 : choix([3, 4, 5, 6, 8]), choix(["faces", "sommets"]), true),
        2: () => facile(2) ? elements(4, "faces", false) : elements(ent(3, 12), choix(["faces", "sommets", "aretes"]), false),
        3: () => elements3()
      }
    }
  ];

  Savoirs.enregistrerTechniques("5e", sol);
})();
