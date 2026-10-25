// Techniques d'entraînement de 5e : « Aires » (aire).
// D'après propositions/referentiels/5e/aire.json (lot 5) : les descriptions de niveau sont la spécification.
// Avec π : on calcule avec la vraie valeur de π (touche π de la calculatrice) et on demande la valeur
// arrondie au dixième ; seule cette valeur est acceptée (décision de l'enseignant, au lieu de « prendre 3,14 »).
(function () {
  const { L, T, ent, choix, net, decimal, decimales, facile } = Savoirs.calculsOutils;
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  const PI = " Donner la valeur arrondie au dixième.";
  const au10 = (x) => net(Math.round(x * 10) / 10);
  // Une valeur trop proche d'un « 5 » au centième rendrait l'arrondi discutable : on tire alors d'autres nombres
  const ambigu = (x) => Math.abs(x * 10 - Math.floor(x * 10) - 0.5) < 0.02;
  // Fin de correction : « ≈ 69,115 cm, soit 69,1 cm au dixième. » (u : unité écrite hors formule)
  const arrondi = (x, u) => "\\approx " + L(net(Math.round(x * 1000) / 1000)) + "$ " + u + ", soit $" + L(au10(x)) + "$ " + u + " au dixième.";
  const tirer = (f) => { for (;;) { const e = f(); if (!ambigu(e.valeur)) { delete e.valeur; return e; } } };
  const cm2 = "cm$^{2}$", m2 = "\\ \\text{m}^{2}";
  // Figures cotées (js/moteur/schemas.js) : les longueurs sont écrites sur la figure plutôt que dans l'énoncé
  const S = Savoirs.schemas, cm = (x) => T(x) + " cm";
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
            return { enonce: "Calculer l'aire de ce triangle.", schema: S.triangle({ b: b, h: h, eb: cm(b), eh: cm(h) }), reponse: b * h / 2, unite: "cm²", correction: "$\\mathcal{A} = \\dfrac{b \\times h}{2} = \\dfrac{" + b + " \\times " + h + "}{2} = \\dfrac{" + b * h + "}{2} = " + b * h / 2 + "$ " + cm2 + "." };
          }
        },
        2: () => {
          if (facile(2)) { const b = ent(2, 9), h = ent(2, 9); return { enonce: "Calculer l'aire de ce parallélogramme.", schema: S.parallelogramme({ b: b, h: h, eb: cm(b), eh: cm(h) }), reponse: b * h, unite: "cm²", correction: "$\\mathcal{A} = b \\times h = " + b + " \\times " + h + " = " + b * h + "$ " + cm2 + "." }; }
          // Une seule dimension décimale : 6,9 × 4,7 était trop long à la main
          const b = dec(1.1, 9.9), h = ent(2, 9), p = net(b * h);
          if (Math.random() < 0.5) return { enonce: "Calculer l'aire de ce parallélogramme.", schema: S.parallelogramme({ b: b, h: h, eb: cm(b), eh: cm(h) }), reponse: p, unite: "cm²", correction: "$\\mathcal{A} = b \\times h = " + L(b) + " \\times " + L(h) + " = " + L(p) + "$ " + cm2 + "." };
          return { enonce: "Calculer l'aire de ce triangle.", schema: S.triangle({ b: b, h: h, eb: cm(b), eh: cm(h) }), reponse: net(p / 2), unite: "cm²", correction: "$\\mathcal{A} = \\dfrac{b \\times h}{2} = \\dfrac{" + L(b) + " \\times " + L(h) + "}{2} = \\dfrac{" + L(p) + "}{2} = " + L(net(p / 2)) + "$ " + cm2 + "." };
        },
        3: () => {
          // Base de 10 au plus : diviser 42,9 par 13 était trop long
          const b = ent(2, 10), h = dec(1.1, 9.9);
          if (Math.random() < 0.5) { const a = net(b * h); return { enonce: "Ce parallélogramme a pour aire $" + L(a) + "\\ \\text{cm}^{2}$. Calculer sa hauteur.", schema: S.parallelogramme({ b: b, h: h, eb: cm(b), eh: "?" }), reponse: h, unite: "cm", correction: "$\\mathcal{A} = b \\times h$ donc $h = \\dfrac{\\mathcal{A}}{b} = \\dfrac{" + L(a) + "}{" + b + "} = " + L(h) + "$ cm." }; }
          const a = net(b * h / 2);
          return { enonce: "Ce triangle a pour aire $" + L(a) + "\\ \\text{cm}^{2}$. Calculer sa hauteur.", schema: S.triangle({ b: b, h: h, eb: cm(b), eh: "?" }), reponse: h, unite: "cm", correction: "$\\mathcal{A} = \\dfrac{b \\times h}{2}$ donc $h = \\dfrac{2 \\times \\mathcal{A}}{b} = \\dfrac{2 \\times " + L(a) + "}{" + b + "} = \\dfrac{" + L(net(2 * a)) + "}{" + b + "} = " + L(h) + "$ cm." };
        }
      }
    },
    {
      id: "aire-cercle", chap: "aire", titre: "Périmètre et aire d'un disque", format: "nombre",
      niveaux: {
        1: () => tirer(() => {
          const r = facile(1) ? 10 : ent(1, 15), p = 2 * Math.PI * r;
          return { valeur: p, enonce: "Calculer le périmètre de ce cercle." + PI, schema: S.disque({ er: cm(r) }), reponse: au10(p), unite: "cm", correction: "$P = 2 \\times \\pi \\times r = 2 \\times \\pi \\times " + r + " " + arrondi(p, "cm") };
        }),
        2: () => tirer(() => {
          if (Math.random() < 0.5 || facile(2)) { const r = facile(2) ? 10 : ent(2, 12), a = Math.PI * r * r; return { valeur: a, enonce: "Calculer l'aire de ce disque." + PI, schema: S.disque({ er: cm(r) }), reponse: au10(a), unite: "cm²", correction: "$\\mathcal{A} = \\pi \\times r^{2} = \\pi \\times " + r + "^{2} = \\pi \\times " + r * r + " " + arrondi(a, cm2) }; }
          const d = ent(2, 30), p = Math.PI * d;
          return { valeur: p, enonce: "Calculer le périmètre de ce cercle." + PI, schema: S.disque({ ed: cm(d) }), reponse: au10(p), unite: "cm", correction: "$P = \\pi \\times d = \\pi \\times " + d + " " + arrondi(p, "cm") };
        }),
        3: () => tirer(() => {
          const cas = ent(1, 4);
          if (cas === 1) { const r = dec(1.1, 5.9), r2 = net(r * r), a = Math.PI * r2; return { valeur: a, enonce: "Calculer l'aire de ce disque." + PI, schema: S.disque({ er: cm(r) }), reponse: au10(a), unite: "cm²", correction: "$\\mathcal{A} = \\pi \\times r^{2} = \\pi \\times " + L(r) + "^{2} = \\pi \\times " + L(r2) + " " + arrondi(a, cm2) }; }
          if (cas === 2) { const r = ent(2, 12), m = Math.PI * r * r / 2; return { valeur: m, enonce: "Calculer l'aire de ce demi-disque." + PI, schema: S.disque({ demi: true, er: cm(r) }), reponse: au10(m), unite: "cm²", correction: "Le demi-disque a pour aire la moitié de celle du disque : $\\mathcal{A} = \\dfrac{\\pi \\times " + r + "^{2}}{2} = \\dfrac{\\pi \\times " + r * r + "}{2} " + arrondi(m, cm2) }; }
          if (cas === 3) {
            // Périmètre donné au dixième ; le rayon retrouvé, arrondi au dixième, est un nombre entier
            const r = ent(2, 20), p = au10(2 * Math.PI * r), rr = p / (2 * Math.PI);
            return { valeur: rr, enonce: "Ce cercle a pour périmètre $" + L(p) + "$ cm. Calculer son rayon." + PI, schema: S.disque({ er: "?" }), reponse: au10(rr), unite: "cm", correction: "$P = 2 \\times \\pi \\times r$, donc $r = \\dfrac{P}{2 \\times \\pi} = \\dfrac{" + L(p) + "}{2 \\times \\pi} " + arrondi(rr, "cm") };
          }
          let d; do { d = dec(2.1, 9.9); } while (decimales(d) !== 1);
          const r = net(d / 2), r2 = net(r * r), a = Math.PI * r2;
          return { valeur: a, enonce: "Calculer l'aire de ce disque." + PI, schema: S.disque({ ed: cm(d) }), reponse: au10(a), unite: "cm²", correction: "Le rayon est $r = " + L(d) + " \\div 2 = " + L(r) + "$ cm. $\\mathcal{A} = \\pi \\times r^{2} = \\pi \\times " + L(r) + "^{2} = \\pi \\times " + L(r2) + " " + arrondi(a, cm2) };
        })
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
          if (facile(1)) { const a = ent(2, 6), b = ent(2, 6); return { enonce: "Cette figure est formée de deux carrés accolés. Calculer son aire.", schema: S.deuxCarres({ a: a, b: b, ea: cm(a), eb: cm(b) }), reponse: a * a + b * b, unite: "cm²", correction: "Aire du premier carré : $" + a + " \\times " + a + " = " + a * a + "$ " + cm2 + ". Aire du second : $" + b + " \\times " + b + " = " + b * b + "$ " + cm2 + ". Total : $" + a * a + " + " + b * b + " = " + (a * a + b * b) + "$ " + cm2 + "." }; }
          for (;;) {
            const lo = ent(3, 15), la = ent(2, 12), h = ent(2, 10);
            if (la >= lo || (la * h) % 2) continue;
            const r = lo * la, t = la * h / 2;
            return { enonce: "Cette figure est formée d'un rectangle et d'un triangle. Calculer son aire.", schema: S.rectangleTriangle({ lo: lo, la: la, h: h, elo: cm(lo), ela: cm(la), eh: cm(h) }), reponse: r + t, unite: "cm²", correction: "Aire du rectangle : $" + lo + " \\times " + la + " = " + r + "$ " + cm2 + ". Aire du triangle : $\\dfrac{" + la + " \\times " + h + "}{2} = " + t + "$ " + cm2 + ". Total : $" + r + " + " + t + " = " + (r + t) + "$ " + cm2 + "." };
          }
        },
        2: () => {
          if (facile(2)) { const lo = ent(8, 20), la = ent(5, 12), a = ent(1, 4), b = ent(1, 4), r = lo * la; return { enonce: "Une plaque rectangulaire est percée d'un trou rectangulaire. Calculer l'aire de la plaque percée (en couleur).", schema: S.plaqueTrou({ lo: lo, la: la, a: a, b: b, elo: cm(lo), ela: cm(la), ea: cm(a), eb: cm(b) }), reponse: r - a * b, unite: "cm²", correction: "Aire de la plaque : $" + lo + " \\times " + la + " = " + r + "$ " + cm2 + ". Aire du trou : $" + a + " \\times " + b + " = " + a * b + "$ " + cm2 + ". Aire restante : $" + r + " - " + a * b + " = " + (r - a * b) + "$ " + cm2 + "." }; }
          // Dans chaque produit, un seul nombre décimal (au lieu de 12,6 × 4,5 − 2,1 × 3,4 ÷ 2)
          // Le trou (ou le triangle) doit tenir dans le rectangle : b plus petit que la largeur
          const lo = dec(6.1, 12.9), la = ent(3, 6), a = dec(1.1, 2.9), b = 2 * ent(1, Math.floor((la - 1) / 2)), r = net(lo * la);
          if (Math.random() < 0.5) { const t = net(a * b), s = net(r - t); return { enonce: "On découpe un trou rectangulaire dans un rectangle. Calculer l'aire restante (en couleur).", schema: S.plaqueTrou({ lo: lo, la: la, a: a, b: b, elo: cm(lo), ela: cm(la), ea: cm(a), eb: cm(b) }), reponse: s, unite: "cm²", correction: "Aire du rectangle : $" + L(lo) + " \\times " + L(la) + " = " + L(r) + "$ " + cm2 + ". Aire du trou : $" + L(a) + " \\times " + L(b) + " = " + L(t) + "$ " + cm2 + ". Aire restante : $" + L(r) + " - " + L(t) + " = " + L(s) + "$ " + cm2 + "." }; }
          const t = net(a * b / 2), s = net(r - t);
          return { enonce: "On découpe un triangle dans un rectangle. Calculer l'aire restante (en couleur).", schema: S.rectangleMoinsTriangle({ lo: lo, la: la, a: a, b: b, elo: cm(lo), ela: cm(la), ea: cm(a), eb: cm(b) }), reponse: s, unite: "cm²", correction: "Aire du rectangle : $" + L(lo) + " \\times " + L(la) + " = " + L(r) + "$ " + cm2 + ". Aire du triangle : $\\dfrac{" + L(a) + " \\times " + L(b) + "}{2} = " + L(t) + "$ " + cm2 + ". Aire restante : $" + L(r) + " - " + L(t) + " = " + L(s) + "$ " + cm2 + "." };
        },
        3: () => tirer(() => {
          const cas = ent(1, 3);
          if (cas === 1) { const c = ent(2, 20), r = net(c / 2), s = c * c - Math.PI * r * r; return { valeur: s, enonce: "On découpe dans un carré le disque qui touche ses quatre côtés. Calculer l'aire restante (en couleur)." + PI, schema: S.carreDisque({ ec: cm(c) }), reponse: au10(s), unite: "cm²", correction: "Le rayon du disque est $" + c + " \\div 2 = " + L(r) + "$ cm. Aire restante = aire du carré − aire du disque : $" + c + " \\times " + c + " - \\pi \\times " + L(r) + "^{2} = " + c * c + " - " + L(net(r * r)) + " \\times \\pi " + arrondi(s, cm2) }; }
          if (cas === 2) {
            const la = 2 * ent(1, 6), lo = ent(la + 1, 20), r = la / 2, rect = lo * la, s = rect + Math.PI * r * r / 2;
            return { valeur: s, enonce: "Cette figure est formée d'un rectangle et d'un demi-disque. Calculer son aire." + PI, schema: S.rectangleDemiDisque({ lo: lo, la: la, elo: cm(lo), ela: cm(la) }), reponse: au10(s), unite: "cm²", correction: "Aire du rectangle : $" + lo + " \\times " + la + " = " + rect + "$ " + cm2 + ". Le rayon du demi-disque est $" + la + " \\div 2 = " + r + "$ cm. Aire de la figure : $" + rect + " + \\dfrac{\\pi \\times " + r + "^{2}}{2} " + arrondi(s, cm2) };
          }
          const R = ent(3, 12), r = ent(1, R - 1), s = Math.PI * (R * R - r * r);
          return { valeur: s, enonce: "Une couronne est la partie comprise entre deux cercles de même centre. Calculer l'aire de cette couronne (en couleur)." + PI, schema: S.couronne({ R: R, r: r, eR: cm(R), er: cm(r) }), reponse: au10(s), unite: "cm²", correction: "Aire de la couronne = aire du grand disque − aire du petit disque : $\\pi \\times " + R + "^{2} - \\pi \\times " + r + "^{2} = \\pi \\times (" + R * R + " - " + r * r + ") = " + (R * R - r * r) + " \\times \\pi " + arrondi(s, cm2) };
        })
      }
    },
    {
      id: "aire-cout", chap: "aire", titre: "Aire et prix", format: "nombre",
      niveaux: {
        1: () => {
          // Petits nombres : côtés jusqu'à 10 m, prix jusqu'à 20 € (5 × 11 × 33 était trop lourd)
          const lo = ent(2, 10), la = ent(2, 8), p = facile(1) ? 10 : choix([2, 3, 4, 5, 10, 15, 20]), [quoi, de] = choix(MATIERES), a = lo * la;
          return { enonce: quoi + " rectangulaire de $" + lo + "$ m sur $" + la + "$ m est recouvert" + (quoi === "Une terrasse" ? "e" : "") + " " + de + " à $" + p + "$ € le $\\text{m}^{2}$. Calculer le coût total.", reponse: a * p, unite: "€", correction: "Aire : $" + lo + " \\times " + la + " = " + a + m2 + "$. Coût : $" + a + " \\times " + p + " = " + L(a * p) + "$ €." };
        },
        2: () => {
          const p = choix([2, 4, 5, 10, 15, 20]);
          if (facile(2)) { const b = ent(2, 9), h = ent(2, 9); return { enonce: "Un terrain en forme de parallélogramme de base $" + b + "$ m et de hauteur $" + h + "$ m est recouvert de gazon à $" + p + "$ € le $\\text{m}^{2}$. Calculer le coût total.", reponse: b * h * p, unite: "€", correction: "Aire : $" + b + " \\times " + h + " = " + b * h + m2 + "$. Coût : $" + b * h + " \\times " + p + " = " + L(b * h * p) + "$ €." }; }
          for (;;) {
            // Une seule dimension décimale et un prix simple
            const b = dec(1.1, 9.9), h = ent(2, 10), tri = Math.random() < 0.5, a = net(tri ? b * h / 2 : b * h), c = net(a * p);
            if (decimales(c) > 2) continue; // un prix s'écrit avec au plus deux chiffres après la virgule
            return tri
              ? { enonce: "Un terrain en forme de triangle de base $" + L(b) + "$ m et de hauteur $" + L(h) + "$ m est recouvert de gazon à $" + p + "$ € le $\\text{m}^{2}$. Calculer le coût total.", reponse: c, unite: "€", correction: "Aire : $\\dfrac{" + L(b) + " \\times " + L(h) + "}{2} = " + L(a) + m2 + "$. Coût : $" + L(a) + " \\times " + p + " = " + L(c) + "$ €." }
              : { enonce: "Un terrain en forme de parallélogramme de base $" + L(b) + "$ m et de hauteur $" + L(h) + "$ m est recouvert de gazon à $" + p + "$ € le $\\text{m}^{2}$. Calculer le coût total.", reponse: c, unite: "€", correction: "Aire : $" + L(b) + " \\times " + L(h) + " = " + L(a) + m2 + "$. Coût : $" + L(a) + " \\times " + p + " = " + L(c) + "$ €." };
          }
        },
        3: () => {
          // Côtés multiples de 5 dm et prix simple (85 × 43 dm à 31 € était trop long)
          const lo = 5 * ent(4, 12), la = 5 * ent(4, 10), p = choix([2, 4, 5, 10, 20, 25]), a = lo * la, m = net(a / 100), c = net(m * p);
          return { enonce: "Une pièce rectangulaire mesure $" + lo + "$ dm sur $" + la + "$ dm. On recouvre son sol de " + choix(["carrelage", "moquette", "parquet"]) + " à $" + p + "$ € le $\\text{m}^{2}$. Calculer le coût total.", reponse: c, unite: "€", correction: "Aire : $" + lo + " \\times " + la + " = " + L(a) + "\\ \\text{dm}^{2}$, soit $" + L(a) + " \\div 100 = " + L(m) + m2 + "$. Coût : $" + L(m) + " \\times " + p + " = " + L(c) + "$ €." };
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("5e", aire);
})();
