// Techniques d'entraînement de 5e : « Aires » (aire).
// D'après propositions/referentiels/5e/aire.json (lot 5) : les descriptions de niveau sont la spécification.
// On prend 3,14 pour π : la réponse attendue est la valeur décimale exacte du calcul.
(function () {
  const { L, T, ent, choix, net, decimal, decimales, facile } = Savoirs.calculsOutils;
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  const PI = " Prendre $3{,}14$ pour $\\pi$.";
  const cm2 = "cm$^{2}$", m2 = "\\ \\text{m}^{2}";
  const MATIERES = [["Un terrain", "de gazon"], ["Le sol d'une pièce", "de carrelage"], ["Une terrasse", "de dalles"], ["Un mur", "de peinture"]];

  const aire = [
    {
      id: "aire-base-hauteur", chap: "aire", titre: "Aire d'un triangle ou d'un parallélogramme", format: "nombre",
      niveaux: {
        1: () => {
          const f = facile(1);
          for (;;) {
            const b = ent(2, 20), h = f ? 2 : ent(3, 20);
            if ((b * h) % 2) continue;
            return { enonce: "Un triangle a pour base $" + b + "$ cm et pour hauteur $" + h + "$ cm. Calculer son aire.", reponse: b * h / 2, unite: "cm²", correction: "$\\mathcal{A} = \\dfrac{b \\times h}{2} = \\dfrac{" + b + " \\times " + h + "}{2} = \\dfrac{" + b * h + "}{2} = " + b * h / 2 + "$ " + cm2 + "." };
          }
        },
        2: () => {
          if (facile(2)) { const b = ent(2, 9), h = ent(2, 9); return { enonce: "Un parallélogramme a pour base $" + b + "$ cm et pour hauteur $" + h + "$ cm. Calculer son aire.", reponse: b * h, unite: "cm²", correction: "$\\mathcal{A} = b \\times h = " + b + " \\times " + h + " = " + b * h + "$ " + cm2 + "." }; }
          const b = dec(1.1, 9.9), h = dec(1.1, 9.9), p = net(b * h);
          if (Math.random() < 0.5) return { enonce: "Un parallélogramme a pour base $" + L(b) + "$ cm et pour hauteur $" + L(h) + "$ cm. Calculer son aire.", reponse: p, unite: "cm²", correction: "$\\mathcal{A} = b \\times h = " + L(b) + " \\times " + L(h) + " = " + L(p) + "$ " + cm2 + "." };
          return { enonce: "Un triangle a pour base $" + L(b) + "$ cm et pour hauteur $" + L(h) + "$ cm. Calculer son aire.", reponse: net(p / 2), unite: "cm²", correction: "$\\mathcal{A} = \\dfrac{b \\times h}{2} = \\dfrac{" + L(b) + " \\times " + L(h) + "}{2} = \\dfrac{" + L(p) + "}{2} = " + L(net(p / 2)) + "$ " + cm2 + "." };
        },
        3: () => {
          const b = ent(2, 20), h = dec(1.1, 9.9);
          if (Math.random() < 0.5) { const a = net(b * h); return { enonce: "Un parallélogramme a pour aire $" + L(a) + "\\ \\text{cm}^{2}$ et pour base $" + b + "$ cm. Calculer sa hauteur.", reponse: h, unite: "cm", correction: "$\\mathcal{A} = b \\times h$ donc $h = \\dfrac{\\mathcal{A}}{b} = \\dfrac{" + L(a) + "}{" + b + "} = " + L(h) + "$ cm." }; }
          const a = net(b * h / 2);
          return { enonce: "Un triangle a pour aire $" + L(a) + "\\ \\text{cm}^{2}$ et pour base $" + b + "$ cm. Calculer sa hauteur.", reponse: h, unite: "cm", correction: "$\\mathcal{A} = \\dfrac{b \\times h}{2}$ donc $h = \\dfrac{2 \\times \\mathcal{A}}{b} = \\dfrac{2 \\times " + L(a) + "}{" + b + "} = \\dfrac{" + L(net(2 * a)) + "}{" + b + "} = " + L(h) + "$ cm." };
        }
      }
    },
    {
      id: "aire-cercle", chap: "aire", titre: "Périmètre et aire d'un disque", format: "nombre",
      niveaux: {
        1: () => {
          const r = facile(1) ? 10 : ent(1, 15), p = net(2 * 3.14 * r);
          const enonce = choix(["Un cercle a pour rayon $" + r + "$ cm. Calculer son périmètre.", "Calculer la longueur d'un cercle de rayon $" + r + "$ cm.", "Une roue a pour rayon $" + r + "$ cm. Calculer la longueur d'un tour de roue."]);
          return { enonce: enonce + PI, reponse: p, unite: "cm", correction: "$P = 2 \\times \\pi \\times r = 2 \\times 3{,}14 \\times " + r + " = " + L(p) + "$ cm." };
        },
        2: () => {
          if (facile(2)) return { enonce: "Un disque a pour rayon $10$ cm. Calculer son aire." + PI, reponse: 314, unite: "cm²", correction: "$\\mathcal{A} = \\pi \\times r^{2} = 3{,}14 \\times 10^{2} = 3{,}14 \\times 100 = 314$ " + cm2 + "." };
          if (Math.random() < 0.5) { const r = ent(2, 12), a = net(3.14 * r * r); return { enonce: "Un disque a pour rayon $" + r + "$ cm. Calculer son aire." + PI, reponse: a, unite: "cm²", correction: "$\\mathcal{A} = \\pi \\times r^{2} = 3{,}14 \\times " + r + "^{2} = 3{,}14 \\times " + r * r + " = " + L(a) + "$ " + cm2 + "." }; }
          const d = ent(2, 30), p = net(3.14 * d);
          return { enonce: "Un cercle a pour diamètre $" + d + "$ cm. Calculer son périmètre." + PI, reponse: p, unite: "cm", correction: "$P = \\pi \\times d = 3{,}14 \\times " + d + " = " + L(p) + "$ cm." };
        },
        3: () => {
          const cas = ent(1, 4);
          if (cas === 1) { const r = dec(1.1, 5.9), r2 = net(r * r), a = net(3.14 * r2); return { enonce: "Un disque a pour rayon $" + L(r) + "$ cm. Calculer son aire." + PI, reponse: a, unite: "cm²", correction: "$\\mathcal{A} = \\pi \\times r^{2} = 3{,}14 \\times " + L(r) + "^{2} = 3{,}14 \\times " + L(r2) + " = " + L(a) + "$ " + cm2 + "." }; }
          if (cas === 2) { const r = ent(2, 12), a = net(3.14 * r * r), m = net(a / 2); return { enonce: "Un demi-disque a pour rayon $" + r + "$ cm. Calculer son aire." + PI, reponse: m, unite: "cm²", correction: "L'aire du disque entier est $3{,}14 \\times " + r + "^{2} = 3{,}14 \\times " + r * r + " = " + L(a) + "$ " + cm2 + ". Le demi-disque en a la moitié : $" + L(a) + " \\div 2 = " + L(m) + "$ " + cm2 + "." }; }
          if (cas === 3) { const r = ent(2, 20), p = net(6.28 * r); return { enonce: "Un cercle a pour périmètre $" + L(p) + "$ cm. Calculer son rayon." + PI, reponse: r, unite: "cm", correction: "$P = 2 \\times \\pi \\times r = 6{,}28 \\times r$, donc $r = " + L(p) + " \\div 6{,}28 = " + r + "$ cm." }; }
          let d; do { d = dec(2.1, 9.9); } while (decimales(d) !== 1);
          const r = net(d / 2), r2 = net(r * r), a = net(3.14 * r2);
          return { enonce: "Un disque a pour diamètre $" + L(d) + "$ cm. Calculer son aire." + PI, reponse: a, unite: "cm²", correction: "Le rayon est $r = " + L(d) + " \\div 2 = " + L(r) + "$ cm. $\\mathcal{A} = \\pi \\times r^{2} = 3{,}14 \\times " + L(r) + "^{2} = 3{,}14 \\times " + L(r2) + " = " + L(a) + "$ " + cm2 + "." };
        }
      }
    },
    {
      id: "aire-conversion", chap: "aire", titre: "Convertir des aires", format: "nombre",
      niveaux: {
        1: () => {
          const v = facile(1) ? 1 : ent(2, 60), [u, w] = choix([["m", "dm"], ["dm", "cm"]]);
          return { enonce: "Convertir $" + v + "\\ \\text{" + u + "}^{2}$ en $\\text{" + w + "}^{2}$.", reponse: v * 100, unite: w + "²", correction: "Pour passer des $\\text{" + u + "}^{2}$ aux $\\text{" + w + "}^{2}$, on multiplie par $100$ : $" + v + " \\times 100 = " + L(v * 100) + "$." };
        },
        2: () => {
          const [grand, petit] = choix([["m", "dm"], ["dm", "cm"]]), multiplier = Math.random() < 0.5, f = facile(2);
          const v = f ? (multiplier ? ent(2, 9) : 100 * ent(2, 59)) : Math.random() < 0.5 ? dec(1.1, 9.9) : ent(101, 5999);
          const r = net(multiplier ? v * 100 : v / 100), [u, w] = multiplier ? [grand, petit] : [petit, grand];
          return { enonce: "Convertir $" + L(v) + "\\ \\text{" + u + "}^{2}$ en $\\text{" + w + "}^{2}$.", reponse: r, unite: w + "²", correction: "Pour passer des $\\text{" + u + "}^{2}$ aux $\\text{" + w + "}^{2}$, on " + (multiplier ? "multiplie" : "divise") + " par $100$ : $" + L(v) + (multiplier ? " \\times " : " \\div ") + "100 = " + L(r) + "$." };
        },
        3: () => {
          if (Math.random() < 0.5) { let v; do { v = decimal(9.9, ent(1, 2)); } while (v < 0.11); const r = net(v * 10000); return { enonce: "Convertir $" + L(v) + "\\ \\text{m}^{2}$ en $\\text{cm}^{2}$.", reponse: r, unite: "cm²", correction: "Pour passer des $\\text{m}^{2}$ aux $\\text{cm}^{2}$, on multiplie par $10\\,000$ : $" + L(v) + " \\times 10\\,000 = " + L(r) + "$." }; }
          const v = ent(101, 99999), r = net(v / 10000);
          return { enonce: "Convertir $" + L(v) + "\\ \\text{cm}^{2}$ en $\\text{m}^{2}$.", reponse: r, unite: "m²", correction: "Pour passer des $\\text{cm}^{2}$ aux $\\text{m}^{2}$, on divise par $10\\,000$ : $" + L(v) + " \\div 10\\,000 = " + L(r) + "$." };
        }
      }
    },
    {
      id: "aire-figure-composee", chap: "aire", titre: "Aire d'une figure composée", format: "nombre",
      niveaux: {
        1: () => {
          if (facile(1)) { const a = ent(2, 6), b = ent(2, 6); return { enonce: "Une figure est formée de deux carrés accolés, de côtés $" + a + "$ cm et $" + b + "$ cm. Calculer l'aire de la figure.", reponse: a * a + b * b, unite: "cm²", correction: "Aire du premier carré : $" + a + " \\times " + a + " = " + a * a + "$ " + cm2 + ". Aire du second : $" + b + " \\times " + b + " = " + b * b + "$ " + cm2 + ". Total : $" + a * a + " + " + b * b + " = " + (a * a + b * b) + "$ " + cm2 + "." }; }
          for (;;) {
            const lo = ent(3, 15), la = ent(2, 12), h = ent(2, 10);
            if (la >= lo || (la * h) % 2) continue;
            const r = lo * la, t = la * h / 2;
            return { enonce: "Un rectangle de longueur $" + lo + "$ cm et de largeur $" + la + "$ cm est prolongé par un triangle dont la base est la largeur du rectangle et dont la hauteur mesure $" + h + "$ cm. Calculer l'aire de la figure.", reponse: r + t, unite: "cm²", correction: "Aire du rectangle : $" + lo + " \\times " + la + " = " + r + "$ " + cm2 + ". Aire du triangle : $\\dfrac{" + la + " \\times " + h + "}{2} = " + t + "$ " + cm2 + ". Total : $" + r + " + " + t + " = " + (r + t) + "$ " + cm2 + "." };
          }
        },
        2: () => {
          if (facile(2)) { const lo = ent(8, 20), la = ent(5, 12), a = ent(1, 4), b = ent(1, 4), r = lo * la; return { enonce: "Une plaque rectangulaire de $" + lo + "$ cm sur $" + la + "$ cm est percée d'un trou rectangulaire de $" + a + "$ cm sur $" + b + "$ cm. Calculer l'aire de la plaque percée.", reponse: r - a * b, unite: "cm²", correction: "Aire de la plaque : $" + lo + " \\times " + la + " = " + r + "$ " + cm2 + ". Aire du trou : $" + a + " \\times " + b + " = " + a * b + "$ " + cm2 + ". Aire restante : $" + r + " - " + a * b + " = " + (r - a * b) + "$ " + cm2 + "." }; }
          const lo = dec(6.1, 12.9), la = dec(3.1, 5.9), a = dec(1.1, 2.9), b = dec(1.1, 2.9), r = net(lo * la);
          if (Math.random() < 0.5) { const t = net(a * b), s = net(r - t); return { enonce: "On découpe dans un rectangle de $" + L(lo) + "$ cm sur $" + L(la) + "$ cm un trou rectangulaire de $" + L(a) + "$ cm sur $" + L(b) + "$ cm. Calculer l'aire restante.", reponse: s, unite: "cm²", correction: "Aire du rectangle : $" + L(lo) + " \\times " + L(la) + " = " + L(r) + "$ " + cm2 + ". Aire du trou : $" + L(a) + " \\times " + L(b) + " = " + L(t) + "$ " + cm2 + ". Aire restante : $" + L(r) + " - " + L(t) + " = " + L(s) + "$ " + cm2 + "." }; }
          const t = net(a * b / 2), s = net(r - t);
          return { enonce: "On découpe dans un rectangle de $" + L(lo) + "$ cm sur $" + L(la) + "$ cm un triangle de base $" + L(a) + "$ cm et de hauteur $" + L(b) + "$ cm. Calculer l'aire restante.", reponse: s, unite: "cm²", correction: "Aire du rectangle : $" + L(lo) + " \\times " + L(la) + " = " + L(r) + "$ " + cm2 + ". Aire du triangle : $\\dfrac{" + L(a) + " \\times " + L(b) + "}{2} = " + L(t) + "$ " + cm2 + ". Aire restante : $" + L(r) + " - " + L(t) + " = " + L(s) + "$ " + cm2 + "." };
        },
        3: () => {
          const cas = ent(1, 3);
          if (cas === 1) { const c = ent(2, 20), r = net(c / 2), d = net(3.14 * r * r), s = net(c * c - d); return { enonce: "Un disque est découpé dans un carré de côté $" + c + "$ cm ; il touche les quatre côtés du carré. Calculer l'aire du carré restant." + PI, reponse: s, unite: "cm²", correction: "Le rayon du disque est $" + c + " \\div 2 = " + L(r) + "$ cm. Aire du carré : $" + c + " \\times " + c + " = " + c * c + "$ " + cm2 + ". Aire du disque : $3{,}14 \\times " + L(r) + "^{2} = " + L(d) + "$ " + cm2 + ". Aire restante : $" + c * c + " - " + L(d) + " = " + L(s) + "$ " + cm2 + "." }; }
          if (cas === 2) {
            const la = 2 * ent(1, 6), lo = ent(la + 1, 20), r = la / 2, rect = lo * la, demi = net(3.14 * r * r / 2), s = net(rect + demi);
            return { enonce: "Une figure est formée d'un rectangle de $" + lo + "$ cm sur $" + la + "$ cm et d'un demi-disque dont le diamètre est la largeur du rectangle. Calculer l'aire de la figure." + PI, reponse: s, unite: "cm²", correction: "Aire du rectangle : $" + lo + " \\times " + la + " = " + rect + "$ " + cm2 + ". Le rayon du demi-disque est $" + la + " \\div 2 = " + r + "$ cm ; son aire est $\\dfrac{3{,}14 \\times " + r + "^{2}}{2} = " + L(demi) + "$ " + cm2 + ". Total : $" + rect + " + " + L(demi) + " = " + L(s) + "$ " + cm2 + "." };
          }
          const R = ent(3, 12), r = ent(1, R - 1), A = net(3.14 * R * R), a = net(3.14 * r * r), s = net(A - a);
          return { enonce: "Une couronne est la partie comprise entre deux cercles de même centre, de rayons $" + R + "$ cm et $" + r + "$ cm. Calculer l'aire de la couronne." + PI, reponse: s, unite: "cm²", correction: "Aire du grand disque : $3{,}14 \\times " + R + "^{2} = " + L(A) + "$ " + cm2 + ". Aire du petit disque : $3{,}14 \\times " + r + "^{2} = " + L(a) + "$ " + cm2 + ". Aire de la couronne : $" + L(A) + " - " + L(a) + " = " + L(s) + "$ " + cm2 + "." };
        }
      }
    },
    {
      id: "aire-cout", chap: "aire", titre: "Aire et prix", format: "nombre",
      niveaux: {
        1: () => {
          const lo = ent(2, 15), la = ent(2, 12), p = facile(1) ? 10 : ent(2, 40), [quoi, de] = choix(MATIERES), a = lo * la;
          return { enonce: quoi + " rectangulaire de $" + lo + "$ m sur $" + la + "$ m est recouvert" + (quoi === "Une terrasse" ? "e" : "") + " " + de + " à $" + p + "$ € le $\\text{m}^{2}$. Calculer le coût total.", reponse: a * p, unite: "€", correction: "Aire : $" + lo + " \\times " + la + " = " + a + m2 + "$. Coût : $" + a + " \\times " + p + " = " + L(a * p) + "$ €." };
        },
        2: () => {
          const p = ent(2, 40);
          if (facile(2)) { const b = ent(2, 9), h = ent(2, 9); return { enonce: "Un terrain en forme de parallélogramme de base $" + b + "$ m et de hauteur $" + h + "$ m est recouvert de gazon à $" + p + "$ € le $\\text{m}^{2}$. Calculer le coût total.", reponse: b * h * p, unite: "€", correction: "Aire : $" + b + " \\times " + h + " = " + b * h + m2 + "$. Coût : $" + b * h + " \\times " + p + " = " + L(b * h * p) + "$ €." }; }
          for (;;) {
            const b = dec(1.1, 9.9), h = dec(1.1, 9.9), tri = Math.random() < 0.5, a = net(tri ? b * h / 2 : b * h), c = net(a * p);
            if (decimales(c) > 2) continue; // un prix s'écrit avec au plus deux chiffres après la virgule
            return tri
              ? { enonce: "Un terrain en forme de triangle de base $" + L(b) + "$ m et de hauteur $" + L(h) + "$ m est recouvert de gazon à $" + p + "$ € le $\\text{m}^{2}$. Calculer le coût total.", reponse: c, unite: "€", correction: "Aire : $\\dfrac{" + L(b) + " \\times " + L(h) + "}{2} = " + L(a) + m2 + "$. Coût : $" + L(a) + " \\times " + p + " = " + L(c) + "$ €." }
              : { enonce: "Un terrain en forme de parallélogramme de base $" + L(b) + "$ m et de hauteur $" + L(h) + "$ m est recouvert de gazon à $" + p + "$ € le $\\text{m}^{2}$. Calculer le coût total.", reponse: c, unite: "€", correction: "Aire : $" + L(b) + " \\times " + L(h) + " = " + L(a) + m2 + "$. Coût : $" + L(a) + " \\times " + p + " = " + L(c) + "$ €." };
          }
        },
        3: () => {
          const lo = ent(11, 99), la = ent(11, 99), p = ent(2, 40), a = lo * la, m = net(a / 100), c = net(m * p);
          return { enonce: "Une pièce rectangulaire mesure $" + lo + "$ dm sur $" + la + "$ dm. On recouvre son sol de " + choix(["carrelage", "moquette", "parquet"]) + " à $" + p + "$ € le $\\text{m}^{2}$. Calculer le coût total.", reponse: c, unite: "€", correction: "Aire : $" + lo + " \\times " + la + " = " + L(a) + "\\ \\text{dm}^{2}$, soit $" + L(a) + " \\div 100 = " + L(m) + m2 + "$. Coût : $" + L(m) + " \\times " + p + " = " + L(c) + "$ €." };
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("5e", aire);
})();
