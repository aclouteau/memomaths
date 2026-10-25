// Techniques d'entraînement de 5e : « Angles » (ang).
// D'après propositions/referentiels/5e/ang.json (lot 5) : les descriptions de niveau sont la spécification.
(function () {
  const { L, ent, choix, net, decimal, facile } = Savoirs.calculsOutils;
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  const D = (x) => L(x) + "^{\\circ}";
  const somme = (l) => l.map(D).join(" + ");
  const total = (l) => net(l.reduce((a, b) => a + b, 0));
  const RAPPORTS = { 2: "deux", 3: "trois", 4: "quatre", 5: "cinq", 8: "huit", 9: "neuf" };
  // Deux droites sécantes (A, B, C, D sur les droites, O le point d'intersection)
  const NOMS = [["A", "B", "C", "D", "O"], ["R", "S", "T", "U", "V"], ["E", "F", "G", "H", "K"], ["M", "N", "P", "Q", "I"]];
  const ang = (a, o, b) => "\\widehat{" + a + o + b + "}";
  const secantes = (n) => "Les droites $(" + n[0] + n[1] + ")$ et $(" + n[2] + n[3] + ")$ se coupent en $" + n[4] + "$, qui est situé entre $" + n[0] + "$ et $" + n[1] + "$ et entre $" + n[2] + "$ et $" + n[3] + "$.";
  const PARA = "Deux droites parallèles sont coupées par une sécante.";

  function complementSupplement(x, supp) {
    const t = supp ? 180 : 90, r = net(t - x);
    return { enonce: "Calculer le " + (supp ? "supplémentaire" : "complémentaire") + " d'un angle de $" + D(x) + "$.", reponse: r, unite: "°", correction: "Deux angles " + (supp ? "supplémentaires" : "complémentaires") + " ont pour somme $" + D(t) + "$ : $" + D(t) + " - " + D(x) + " = " + D(r) + "$." };
  }
  function opposes(x) {
    const n = choix(NOMS), [donne, cherche] = choix([[[0, 2], [1, 3]], [[1, 3], [0, 2]], [[0, 3], [1, 2]], [[1, 2], [0, 3]]]), a1 = ang(n[donne[0]], n[4], n[donne[1]]), a2 = ang(n[cherche[0]], n[4], n[cherche[1]]);
    return { enonce: secantes(n) + " On a $" + a1 + " = " + D(x) + "$. Calculer $" + a2 + "$.", reponse: x, unite: "°", correction: "Les angles $" + a1 + "$ et $" + a2 + "$ sont opposés par le sommet : ils sont égaux. Donc $" + a2 + " = " + D(x) + "$." };
  }
  function adjacents(x) {
    const n = choix(NOMS), a1 = ang(n[0], n[4], n[2]), [a2, ligne] = choix([[ang(n[0], n[4], n[3]), [n[2], n[4], n[3]]], [ang(n[1], n[4], n[2]), [n[0], n[4], n[1]]]]), r = net(180 - x);
    return { enonce: secantes(n) + " On a $" + a1 + " = " + D(x) + "$. Calculer $" + a2 + "$.", reponse: r, unite: "°", correction: "Les points $" + ligne[0] + "$, $" + ligne[1] + "$ et $" + ligne[2] + "$ sont alignés : les angles $" + a1 + "$ et $" + a2 + "$ sont supplémentaires. Donc $" + a2 + " = " + D(180) + " - " + D(x) + " = " + D(r) + "$." };
  }
  function alternes(x) {
    const nom = choix(["alternes-internes", "correspondants"]);
    return { enonce: PARA + " Deux angles " + nom + " mesurent l'un $" + D(x) + "$. Combien mesure l'autre ?", reponse: x, unite: "°", correction: "Les droites sont parallèles : les angles " + nom + " sont égaux. L'autre angle mesure aussi $" + D(x) + "$." };
  }
  function ouiNon(angles, t, quoi, enonce) {
    const s = total(angles), ok = s === t;
    return { enonce: enonce, reponse: ok ? "oui" : "non", correction: "$" + somme(angles) + " = " + D(s) + "$. " + (ok ? "Cette somme vaut $" + D(t) + "$ : oui, " + quoi + "." : "Cette somme ne vaut pas $" + D(t) + "$ : non.") };
  }
  // Deux angles : une fois sur deux leur somme vaut t (90 ou 180), sinon elle s'en écarte un peu
  function deuxAngles(supp, decimaux, egaux) {
    const t = supp ? 180 : 90;
    for (;;) {
      const a = egaux ? t / 2 : decimaux ? dec(1.1, t - 1.1) : ent(5, t - 5), oui = egaux || Math.random() < 0.5;
      const ecart = oui ? 0 : decimaux ? choix([-1, 1]) * dec(0.1, 2.9) : choix([-1, 1]) * ent(1, 10), b = net(t - a + ecart);
      if (b <= 0 || (decimaux && Number.isInteger(b))) continue;
      const nom = supp ? "supplémentaires" : "complémentaires";
      return ouiNon([a, b], t, "ils sont " + nom, "Deux angles de $" + D(a) + "$ et $" + D(b) + "$ sont-ils " + nom + " ?");
    }
  }

  const angles = [
    {
      id: "ang-complementaire-supplementaire", chap: "ang", titre: "Angle complémentaire ou supplémentaire", format: "nombre",
      niveaux: {
        1: () => { if (facile(1)) return complementSupplement(90, true); let x; do { x = ent(10, 170); } while (x === 90); return complementSupplement(x, true); },
        2: () => {
          const f = facile(2), supp = Math.random() < 0.5;
          if (supp) return complementSupplement(f ? ent(11, 179) : dec(10.1, 179.9), true);
          return complementSupplement(f ? ent(2, 88) : dec(1.1, 88.9), false);
        },
        3: () => {
          const cas = ent(1, 3);
          if (cas === 1) { const k = choix([2, 3, 4, 5, 8, 9]), x = 180 / (k + 1); return { enonce: "Deux angles supplémentaires sont tels que le plus grand est " + RAPPORTS[k] + " fois plus grand que le plus petit. Calculer le plus petit angle.", reponse: x, unite: "°", correction: "Si le petit angle vaut $x$, le grand vaut $" + k + " \\times x$ et $x + " + k + " \\times x = " + (k + 1) + " \\times x = " + D(180) + "$, donc $x = " + D(180) + " \\div " + (k + 1) + " = " + D(x) + "$." }; }
          if (cas === 2) { const k = choix([2, 3, 4, 5, 8]), x = net(90 / (k + 1)), g = net(k * x); return { enonce: "Deux angles complémentaires sont tels que le plus grand est " + RAPPORTS[k] + " fois plus grand que le plus petit. Calculer le plus grand angle.", reponse: g, unite: "°", correction: "Si le petit angle vaut $x$, le grand vaut $" + k + " \\times x$ et $x + " + k + " \\times x = " + (k + 1) + " \\times x = " + D(90) + "$, donc $x = " + D(90) + " \\div " + (k + 1) + " = " + D(x) + "$. Le plus grand vaut $" + k + " \\times " + D(x) + " = " + D(g) + "$." }; }
          const e = 2 * ent(1, 80), g = (180 + e) / 2, p = (180 - e) / 2;
          return { enonce: "Deux angles supplémentaires diffèrent de $" + D(e) + "$. Calculer le plus grand des deux.", reponse: g, unite: "°", correction: "Si on enlève l'écart, il reste deux angles égaux au plus petit : $" + D(180) + " - " + D(e) + " = " + D(180 - e) + "$, donc le plus petit vaut $" + D(180 - e) + " \\div 2 = " + D(p) + "$ et le plus grand vaut $" + D(p) + " + " + D(e) + " = " + D(g) + "$." };
        }
      }
    },
    {
      id: "ang-secantes", chap: "ang", titre: "Droites sécantes : angles opposés et adjacents", format: "nombre",
      niveaux: {
        1: () => { if (facile(1)) return opposes(90); let x; do { x = ent(20, 160); } while (x === 90); return opposes(x); },
        2: () => adjacents(facile(2) ? ent(20, 160) : dec(10.1, 179.9)),
        3: () => {
          const n = choix(NOMS), aoc = ang(n[0], n[4], n[2]), aod = ang(n[0], n[4], n[3]), bod = ang(n[1], n[4], n[3]), boc = ang(n[1], n[4], n[2]), cas = ent(1, 3);
          if (cas === 1) { const k = choix([2, 3, 4, 5, 8, 9]), x = 180 / (k + 1); return { enonce: secantes(n) + " On sait que $" + aod + " = " + k + " \\times " + aoc + "$. Calculer $" + bod + "$.", reponse: x, unite: "°", correction: "Les angles $" + aoc + "$ et $" + aod + "$ sont supplémentaires : $" + aoc + " + " + k + " \\times " + aoc + " = " + (k + 1) + " \\times " + aoc + " = " + D(180) + "$, donc $" + aoc + " = " + D(180) + " \\div " + (k + 1) + " = " + D(x) + "$. L'angle $" + bod + "$ est opposé par le sommet à $" + aoc + "$ : $" + bod + " = " + D(x) + "$." }; }
          if (cas === 2) {
            const e = 2 * ent(1, 80), p = (180 - e) / 2, g = p + e, grand = Math.random() < 0.5;
            return { enonce: secantes(n) + " L'angle $" + aod + "$ dépasse l'angle $" + aoc + "$ de $" + D(e) + "$. Calculer $" + (grand ? boc : bod) + "$.", reponse: grand ? g : p, unite: "°", correction: "Les angles $" + aoc + "$ et $" + aod + "$ sont supplémentaires : $" + aoc + " = (" + D(180) + " - " + D(e) + ") \\div 2 = " + D(p) + "$ et $" + aod + " = " + D(p) + " + " + D(e) + " = " + D(g) + "$. L'angle $" + (grand ? boc : bod) + "$ est opposé par le sommet à $" + (grand ? aod : aoc) + "$ : il mesure $" + D(grand ? g : p) + "$." };
          }
          let x; do { x = ent(20, 160); } while (x === 90);
          return { enonce: secantes(n) + " On a $" + aoc + " = " + D(x) + "$. Calculer la somme $" + bod + " + " + aod + " + " + boc + "$.", reponse: 360 - x, unite: "°", correction: "Les quatre angles autour de $" + n[4] + "$ ont pour somme $" + D(360) + "$. Donc $" + bod + " + " + aod + " + " + boc + " = " + D(360) + " - " + D(x) + " = " + D(360 - x) + "$." };
        }
      }
    },
    {
      id: "ang-paralleles", chap: "ang", titre: "Droites parallèles et sécante", format: "nombre",
      niveaux: {
        1: () => { if (facile(1)) return alternes(90); let x; do { x = ent(20, 160); } while (x === 90); return alternes(x); },
        2: () => {
          const x = facile(2) ? ent(20, 160) : dec(10.1, 179.9);
          if (Math.random() < 0.5) return alternes(x);
          const r = net(180 - x);
          return { enonce: PARA + " Un des angles formés mesure $" + D(x) + "$. Combien mesure l'angle qui lui est adjacent, de l'autre côté de la sécante ?", reponse: r, unite: "°", correction: "Ces deux angles adjacents forment un angle plat : ils sont supplémentaires. L'angle mesure $" + D(180) + " - " + D(x) + " = " + D(r) + "$." };
        },
        3: () => {
          const cas = ent(1, 3);
          if (cas === 1) { const a = ent(20, 85), o = 180 - a; return { enonce: PARA + " Elles forment huit angles, dont l'un est aigu et mesure $" + D(a) + "$. Calculer la somme des quatre angles obtus.", reponse: 4 * o, unite: "°", correction: "Chaque angle obtus est le supplémentaire de l'angle aigu : $" + D(180) + " - " + D(a) + " = " + D(o) + "$. La somme des quatre angles obtus est $4 \\times " + D(o) + " = " + D(4 * o) + "$." }; }
          if (cas === 2) { const a = ent(20, 85); return { enonce: PARA + " Elles forment huit angles, dont l'un mesure $" + D(a) + "$. Combien de ces huit angles mesurent $" + D(a) + "$, cet angle compris ?", reponse: 4, correction: "Les angles aigus sont égaux entre eux (opposés par le sommet, alternes-internes, correspondants), et de même les angles obtus. Il y a quatre angles aigus et quatre obtus : $4$ angles mesurent $" + D(a) + "$." }; }
          const k = choix([2, 3, 4, 5, 8, 9]), x = 180 / (k + 1);
          return { enonce: PARA + " Deux angles adjacents formés par une des parallèles et la sécante sont tels que l'un mesure " + RAPPORTS[k] + " fois l'autre. Calculer le plus petit.", reponse: x, unite: "°", correction: "Ces deux angles adjacents sont supplémentaires : $x + " + k + " \\times x = " + (k + 1) + " \\times x = " + D(180) + "$, donc $x = " + D(180) + " \\div " + (k + 1) + " = " + D(x) + "$." };
        }
      }
    },
    {
      id: "ang-somme", chap: "ang", titre: "Somme d'angles adjacents", format: "nombre",
      niveaux: {
        1: () => {
          const f = facile(1);
          for (;;) {
            const a = f ? 90 : ent(15, 120), b = ent(15, 120);
            if (a + b >= 170) continue;
            const l = Math.random() < 0.5 ? [a, b] : [b, a], r = 180 - a - b;
            return { enonce: "Sur une droite, trois angles adjacents forment un angle plat. Deux d'entre eux mesurent $" + D(l[0]) + "$ et $" + D(l[1]) + "$. Calculer le troisième.", reponse: r, unite: "°", correction: "L'angle plat mesure $" + D(180) + "$ : $" + D(180) + " - (" + somme(l) + ") = " + D(180) + " - " + D(a + b) + " = " + D(r) + "$." };
          }
        },
        2: () => {
          const f = facile(2);
          for (;;) {
            const l = f ? [90, 90, ent(30, 120)] : [ent(30, 120), ent(30, 120), ent(30, 120)], s = total(l), r = 360 - s;
            if (r < 20) continue;
            const m = Savoirs.melanger(l);
            return { enonce: "Autour d'un point, quatre angles adjacents forment un tour complet. Trois d'entre eux mesurent $" + D(m[0]) + "$, $" + D(m[1]) + "$ et $" + D(m[2]) + "$. Calculer le quatrième.", reponse: r, unite: "°", correction: "Un tour complet mesure $" + D(360) + "$ : $" + D(360) + " - (" + somme(m) + ") = " + D(360) + " - " + D(s) + " = " + D(r) + "$." };
          }
        },
        3: () => {
          const cas = ent(1, 3);
          if (cas === 1) {
            for (;;) {
              const l = [dec(10.1, 80.9), dec(10.1, 80.9)], s = total(l), r = net(180 - s);
              if (s >= 170) continue;
              return { enonce: "Sur une droite, trois angles adjacents forment un angle plat. Deux d'entre eux mesurent $" + D(l[0]) + "$ et $" + D(l[1]) + "$. Calculer le troisième.", reponse: r, unite: "°", correction: "L'angle plat mesure $" + D(180) + "$ : $" + D(180) + " - (" + somme(l) + ") = " + D(180) + " - " + D(s) + " = " + D(r) + "$." };
            }
          }
          if (cas === 2) { const a = ent(21, 179), r = net(a / 2); return { enonce: "La bissectrice de l'angle $\\widehat{xOy}$ de $" + D(a) + "$ le partage en deux angles. Calculer chacun d'eux.", reponse: r, unite: "°", correction: "La bissectrice partage l'angle en deux angles égaux : $" + D(a) + " \\div 2 = " + D(r) + "$." }; }
          for (;;) {
            const k = choix([2, 3, 4, 5]), x = ent(10, 60), reste = 360 - (k + 1) * x;
            if (reste < 40) continue;
            const b = ent(20, reste - 20), c = reste - b;
            return { enonce: "Autour d'un point, quatre angles adjacents forment un tour complet. Deux d'entre eux mesurent $" + D(b) + "$ et $" + D(c) + "$ ; des deux autres, l'un est " + RAPPORTS[k] + " fois plus grand que l'autre. Calculer le plus petit des deux.", reponse: x, unite: "°", correction: "Les deux angles inconnus ont pour somme $" + D(360) + " - (" + somme([b, c]) + ") = " + D(reste) + "$. Si le petit vaut $x$, le grand vaut $" + k + " \\times x$ et $" + (k + 1) + " \\times x = " + D(reste) + "$, donc $x = " + D(reste) + " \\div " + (k + 1) + " = " + D(x) + "$." };
          }
        }
      }
    },
    {
      id: "ang-oui-non", chap: "ang", titre: "Ces angles vérifient-ils la propriété ?", format: "choix", options: ["oui", "non"],
      niveaux: {
        1: () => (facile(1) ? deuxAngles(Math.random() < 0.5, false, true) : deuxAngles(Math.random() < 0.5, false, false)),
        2: () => deuxAngles(Math.random() < 0.5, !facile(2), false),
        3: () => {
          const cas = ent(1, 3), n = cas === 3 ? 4 : 3, t = cas === 3 ? 360 : 180, oui = Math.random() < 0.5;
          for (;;) {
            const l = Array.from({ length: n - 1 }, () => ent(20, Math.floor(1.6 * t / n)));
            const der = t - total(l) + (oui ? 0 : choix([-1, 1]) * ent(1, 15));
            if (der < 10) continue;
            l.push(der);
            if (cas === 1) return ouiNon(l, t, "ces trois angles peuvent être ceux d'un triangle", "Trois angles mesurent $" + D(l[0]) + "$, $" + D(l[1]) + "$ et $" + D(l[2]) + "$. Peuvent-ils être les trois angles d'un triangle ?");
            if (cas === 2) return ouiNon(l, t, "ils forment un angle plat", "Trois angles adjacents mesurent $" + D(l[0]) + "$, $" + D(l[1]) + "$ et $" + D(l[2]) + "$. Forment-ils ensemble un angle plat ?");
            return ouiNon(l, t, "ils forment un tour complet", "Quatre angles adjacents mesurent $" + D(l[0]) + "$, $" + D(l[1]) + "$, $" + D(l[2]) + "$ et $" + D(l[3]) + "$. Forment-ils ensemble un tour complet ?");
          }
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("5e", angles);
})();
