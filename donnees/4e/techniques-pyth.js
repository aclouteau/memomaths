// Techniques d'entraînement de 4e : « Théorème de Pythagore » (pyth).
// D'après propositions/referentiels/4e/pyth.json (lot 1) : les descriptions de niveau sont la spécification.
// Au niveau 3, seule la valeur arrondie demandée est acceptée (décision de l'enseignant) : la réponse est exacte.
(function () {
  const { L, T, ent, choix, net, decimal, facile, fixe } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const carre = (x) => net(x * x);

  // Triplets pythagoriciens entiers (niveau 1) ; 3-4-5 et 6-8-10 sont les cas faciles (1 fois sur 8)
  const FACILES = [[3, 4, 5], [6, 8, 10]];
  const TRIPLETS = [[5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25], [20, 21, 29], [9, 40, 41],
    [12, 35, 37], [10, 24, 26], [15, 36, 39], [18, 24, 30], [16, 30, 34], [21, 28, 35], [24, 32, 40]];
  const tripletEntier = (niveau) => choix(facile(niveau) ? FACILES : TRIPLETS);
  // Triplets décimaux exacts (niveau 2) : triplets primitifs multipliés par k/10, au moins un côté non entier
  const DECIMAUX = [];
  [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]].forEach((t) => {
    for (let k = 1; k <= 30; k++) {
      const u = t.map((x) => net((x * k) / 10));
      if (u[2] <= 15 && u.some((x) => !Number.isInteger(x))) DECIMAUX.push(u);
    }
  });

  // Valeur arrondie à d chiffres après la virgule, ou null si la racine tombe juste ou trop près d'une limite (…,x5)
  function arrondi(x, d) {
    const y = x * Math.pow(10, d), f = y - Math.floor(y);
    if (f < 1e-6 || f > 1 - 1e-6 || Math.abs(f - 0.5) < 0.05) return null;
    return Math.round(y) / Math.pow(10, d);
  }

  // Triangle rectangle : nom (lettres dans un ordre quelconque), sommet de l'angle droit, côtés
  const TRIANGLES = ["ABC", "DEF", "MNP", "RST", "KLO", "GHI"];
  function triangle(niveau) {
    const lettres = melanger(choix(TRIANGLES).split(""));
    // Niveau 3 : le plus souvent, l'angle droit n'est pas à la première lettre du nom
    const droit = niveau === 3 && Math.random() < 0.75 ? lettres[ent(1, 2)] : choix(lettres);
    const autres = lettres.filter((l) => l !== droit);
    const seg = (u, v) => (Math.random() < 0.5 ? u + v : v + u);
    return { nom: lettres.join(""), droit: droit, c1: seg(droit, autres[0]), c2: seg(droit, autres[1]), hyp: seg(autres[0], autres[1]) };
  }
  const debut = (t) => "Le triangle $" + t.nom + "$ est rectangle en $" + t.droit + "$";
  const estHyp = (t) => "$" + t.hyp + "$ est l'hypoténuse (côté opposé à l'angle droit en $" + t.droit + "$). D'après le théorème de Pythagore : ";

  // Hypoténuse connaissant les deux côtés de l'angle droit (d : arrondi demandé, ou rien si exact)
  function exHypotenuse(niveau, a, b, d) {
    const t = triangle(niveau), s = net(carre(a) + carre(b)), r = d ? arrondi(Math.sqrt(s), d) : net(Math.sqrt(s));
    return {
      enonce: debut(t) + " avec $" + t.c1 + " = " + L(a) + "$ cm et $" + t.c2 + " = " + L(b) + "$ cm. Calculer $" + t.hyp + "$ (en cm)." + (d ? " Arrondir au dixième." : ""),
      reponse: r, unite: "cm",
      correction: estHyp(t) + "$" + t.hyp + "^{2} = " + t.c1 + "^{2} + " + t.c2 + "^{2} = " + L(a) + "^{2} + " + L(b) + "^{2} = " + L(carre(a)) + " + " + L(carre(b)) + " = " + L(s) +
        "$, donc $" + t.hyp + " = \\sqrt{" + L(s) + "} " + (d ? "\\approx " + fixe(r, d) + "$ cm (valeur arrondie au dixième)." : "= " + L(r) + "$ cm.")
    };
  }
  // Côté de l'angle droit connaissant l'hypoténuse h et l'autre côté a
  function exCote(niveau, h, a, d) {
    const t = triangle(niveau), s = net(carre(h) - carre(a)), r = d ? arrondi(Math.sqrt(s), d) : net(Math.sqrt(s));
    return {
      enonce: debut(t) + " avec $" + t.hyp + " = " + L(h) + "$ cm et $" + t.c1 + " = " + L(a) + "$ cm. Calculer $" + t.c2 + "$ (en cm)." + (d ? " Arrondir au dixième." : ""),
      reponse: r, unite: "cm",
      correction: estHyp(t) + "$" + t.hyp + "^{2} = " + t.c1 + "^{2} + " + t.c2 + "^{2}$, donc $" + t.c2 + "^{2} = " + t.hyp + "^{2} - " + t.c1 + "^{2} = " + L(h) + "^{2} - " + L(a) + "^{2} = " +
        L(carre(h)) + " - " + L(carre(a)) + " = " + L(s) + "$, donc $" + t.c2 + " = \\sqrt{" + L(s) + "} " + (d ? "\\approx " + fixe(r, d) + "$ cm (valeur arrondie au dixième)." : "= " + L(r) + "$ cm.")
    };
  }
  // Carré d'un côté (sans racine)
  function exCarre(niveau, longueur) {
    const t = triangle(niveau);
    if (Math.random() < 0.5) {
      const a = longueur(), b = longueur(), r = net(carre(a) + carre(b));
      return {
        enonce: debut(t) + ", avec $" + t.c1 + " = " + L(a) + "$ cm et $" + t.c2 + " = " + L(b) + "$ cm. Calculer $" + t.hyp + "^{2}$.",
        reponse: r, unite: "cm²",
        correction: estHyp(t) + "$" + t.hyp + "^{2} = " + t.c1 + "^{2} + " + t.c2 + "^{2} = " + L(a) + "^{2} + " + L(b) + "^{2} = " + L(carre(a)) + " + " + L(carre(b)) + " = " + L(r) + "$."
      };
    }
    let h, a;
    do { h = longueur(); a = longueur(); } while (h <= a);
    const r = net(carre(h) - carre(a));
    return {
      enonce: debut(t) + ", avec $" + t.hyp + " = " + L(h) + "$ cm et $" + t.c1 + " = " + L(a) + "$ cm. Calculer $" + t.c2 + "^{2}$.",
      reponse: r, unite: "cm²",
      correction: estHyp(t) + "$" + t.hyp + "^{2} = " + t.c1 + "^{2} + " + t.c2 + "^{2}$, donc $" + t.c2 + "^{2} = " + t.hyp + "^{2} - " + t.c1 + "^{2} = " + L(h) + "^{2} - " + L(a) + "^{2} = " +
        L(carre(h)) + " - " + L(carre(a)) + " = " + L(r) + "$."
    };
  }
  // Longueur décimale à un chiffre (non entière) entre min et max
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };

  // ---------- Situations ----------
  // Hypoténuse (cherche = "hyp") ou côté (cherche = "cote") à partir d'un triplet [a, b, c]
  // cas (facultatif) : ce qu'on cherche ("longueur" ou "hauteur" pour l'échelle), sinon tiré au hasard
  function situation(triplet, cadre, arrondiA, casImpose) {
    const [a, b, c] = triplet;
    const d = arrondiA || 0;
    const resultat = (s) => (d ? arrondi(Math.sqrt(s), d) : net(Math.sqrt(s)));
    const finRacine = (v, s, r, u) => "$" + v + " = \\sqrt{" + L(s) + "} " + (d ? "\\approx " + fixe(r, d) + "$ " + u + (d === 2 ? " (arrondi au centième, c'est-à-dire au centimètre)." : " (arrondi au dixième).") : "= " + L(r) + "$ " + u + ".");
    const somme = (v, x, y) => { const s = net(carre(x) + carre(y)); return { s: s, texte: "$" + v + "^{2} = " + L(x) + "^{2} + " + L(y) + "^{2} = " + L(carre(x)) + " + " + L(carre(y)) + " = " + L(s) + "$, donc " }; };
    const diff = (v, x, y) => { const s = net(carre(x) - carre(y)); return { s: s, texte: "$" + v + "^{2} = " + L(x) + "^{2} - " + L(y) + "^{2} = " + L(carre(x)) + " - " + L(carre(y)) + " = " + L(s) + "$, donc " }; };
    const precision = d === 2 ? ", au centimètre près" : d === 1 ? ", arrondie au dixième" : "";

    if (cadre === "rectangle" || cadre === "ecran") {
      const longueur = Math.max(a, b), largeur = Math.min(a, b);
      const objet = cadre === "ecran" ? choix(["Un écran rectangulaire", "Un panneau rectangulaire"]) : "Un rectangle";
      if (cadre === "ecran" || Math.random() < 0.5) {
        const k = somme("d", longueur, largeur), r = resultat(k.s);
        return {
          enonce: cadre === "ecran" ? objet + " mesure " + T(longueur) + " cm sur " + T(largeur) + " cm. Quelle est la longueur de sa diagonale" + precision + " (en cm) ?"
            : "Un rectangle a pour longueur " + T(longueur) + " cm et pour largeur " + T(largeur) + " cm. Quelle est la longueur de sa diagonale (en cm) ?",
          reponse: r, unite: "cm",
          correction: "La diagonale est l'hypoténuse de l'un des deux triangles rectangles formés. " + k.texte + finRacine("d", k.s, r, "cm")
        };
      }
      const connu = choix([a, b]), autre = connu === a ? b : a, k = diff("c", c, connu), r = resultat(k.s);
      return {
        enonce: "La diagonale d'un rectangle mesure " + T(c) + " cm et l'un de ses côtés " + T(connu) + " cm. Quelle est la longueur de l'autre côté (en cm) ?",
        reponse: r, unite: "cm",
        correction: "La diagonale est l'hypoténuse d'un triangle rectangle dont les côtés de l'angle droit sont les côtés du rectangle. " + k.texte + finRacine("c", k.s, r, "cm")
      };
    }
    if (cadre === "poteau") {
      // a : hauteur du poteau, b : distance au pied, c : câble
      const intro = "Le poteau, le sol et le câble forment un triangle rectangle dont le câble est l'hypoténuse. ";
      const cas = d ? "cable" : choix(["cable", "hauteur", "distance"]);
      if (cas === "cable") {
        const k = somme("\\ell", a, b), r = resultat(k.s);
        return {
          enonce: "Un poteau vertical de " + T(a) + " m de haut est maintenu par un câble tendu entre son sommet et un point du sol situé à " + T(b) + " m de son pied. Quelle est la longueur du câble" + precision + " (en m) ?",
          reponse: r, unite: "m", correction: intro + k.texte + finRacine("\\ell", k.s, r, "m")
        };
      }
      if (cas === "hauteur") {
        const k = diff("h", c, b), r = resultat(k.s);
        return {
          enonce: "Un câble de " + T(c) + " m est tendu entre le sommet d'un poteau vertical et un point du sol situé à " + T(b) + " m du pied du poteau. Quelle est la hauteur du poteau (en m) ?",
          reponse: r, unite: "m", correction: intro + k.texte + finRacine("h", k.s, r, "m")
        };
      }
      const k = diff("d", c, a), r = resultat(k.s);
      return {
        enonce: "Un câble de " + T(c) + " m est tendu entre le sommet d'un poteau vertical de " + T(a) + " m de haut et un point du sol. À quelle distance du pied du poteau ce point se trouve-t-il (en m) ?",
        reponse: r, unite: "m", correction: intro + k.texte + finRacine("d", k.s, r, "m")
      };
    }
    if (cadre === "echelle") {
      // a : pied (distance au mur), b : hauteur atteinte sur le mur, c : échelle
      const intro = "L'échelle, le mur et le sol forment un triangle rectangle dont l'échelle est l'hypoténuse. ";
      if ((casImpose || choix(["longueur", "hauteur"])) === "longueur") {
        const k = somme("\\ell", a, b), r = resultat(k.s);
        return {
          enonce: "Le pied d'une échelle est à " + T(a) + " m d'un mur vertical et le haut de l'échelle touche le mur à " + T(b) + " m du sol. Quelle est la longueur de l'échelle" + precision + " (en m) ?",
          reponse: r, unite: "m", correction: intro + k.texte + finRacine("\\ell", k.s, r, "m")
        };
      }
      const k = diff("h", c, a), r = resultat(k.s);
      return {
        enonce: "Une échelle de " + T(c) + " m est appuyée contre un mur vertical, son pied étant à " + T(a) + " m du mur. À quelle hauteur du sol touche-t-elle le mur" + precision + " (en m) ?",
        reponse: r, unite: "m", correction: intro + k.texte + finRacine("h", k.s, r, "m")
      };
    }
    // Randonnée : a km vers l'est, puis b km vers le nord
    const est = choix([a, b]), nord = est === a ? b : a, k = somme("d", est, nord), r = resultat(k.s);
    return {
      enonce: "Une randonneuse marche " + T(est) + " km vers l'est, puis " + T(nord) + " km vers le nord. À quelle distance de son point de départ se trouve-t-elle, en ligne droite" + precision + " (en km) ?",
      reponse: r, unite: "km",
      correction: "Les deux trajets forment l'angle droit d'un triangle rectangle dont la distance cherchée est l'hypoténuse. " + k.texte + finRacine("d", k.s, r, "km")
    };
  }
  // Dix échelles réalistes : [pied, hauteur sur le mur, échelle], en m
  const ECHELLES = [[0.7, 2.4, 2.5], [1.2, 3.5, 3.7], [1.4, 4.8, 5], [2, 4.8, 5.2], [1.6, 6.3, 6.5], [2.8, 9.6, 10], [1.8, 8, 8.2], [2.1, 7.2, 7.5], [0.9, 4, 4.1], [2.4, 7, 7.4]];

  const pyth = [
    {
      id: "carre-racine", chap: "pyth", titre: "Carré et racine carrée", format: "nombre",
      niveaux: {
        1: () => {
          const cas = choix(Array.from({ length: 14 }, (_, i) => ["carre", i + 2]).concat(Array.from({ length: 11 }, (_, i) => ["racine", i + 2])));
          const a = cas[1];
          return cas[0] === "carre"
            ? { enonce: "Calculer $" + a + "^{2}$", reponse: a * a, correction: "$" + a + "^{2} = " + a + " \\times " + a + " = " + a * a + "$." }
            : { enonce: "Calculer $\\sqrt{" + a * a + "}$", reponse: a, correction: "$" + a + "^{2} = " + a * a + "$, donc $\\sqrt{" + a * a + "} = " + a + "$." };
        },
        2: () => {
          const cas = ent(1, 3);
          if (cas === 1) {
            let n;
            do { n = ent(2, 60); } while (Number.isInteger(Math.sqrt(n)));
            return { enonce: "Calculer $(\\sqrt{" + n + "})^{2}$", reponse: n, correction: "Le carré de la racine carrée de $" + n + "$ est $" + n + "$ (par définition de la racine carrée)." };
          }
          const a = cas === 2 ? ent(13, 30) : ent(13, 25);
          return cas === 2
            ? { enonce: "Calculer $\\sqrt{" + a + "^{2}}$", reponse: a, correction: "La racine carrée du carré d'un nombre positif est ce nombre : $\\sqrt{" + a + "^{2}} = " + a + "$." }
            : { enonce: "Calculer $\\sqrt{" + a * a + "}$", reponse: a, correction: "$" + a + "^{2} = " + a * a + "$, donc $\\sqrt{" + a * a + "} = " + a + "$." };
        },
        3: () => {
          // Sous le radical, des carrés déjà calculés : √(a² + b²) ou √(c² − a²)
          let t;
          if (Math.random() < 0.5) {
            const base = choix([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37]]);
            const kMax = Math.floor(41 / base[2]);
            const k = ent(1, kMax);
            t = base.map((x) => x * k);
          } else {
            const base = choix([[3, 4, 5], [5, 12, 13], [8, 15, 17]]);
            let m;
            do { m = choix([0.1, 0.2, 0.3, 0.5]); } while (base[2] * m > 10);
            t = base.map((x) => net(x * m));
          }
          const [a, b, c] = t;
          if (Math.random() < 0.5) {
            const s = net(carre(a) + carre(b));
            return {
              enonce: "Calculer $\\sqrt{" + L(carre(a)) + " + " + L(carre(b)) + "}$", reponse: c,
              correction: "On calcule d'abord sous la racine : $" + L(carre(a)) + " + " + L(carre(b)) + " = " + L(s) + "$. Puis $" + L(c) + "^{2} = " + L(s) + "$, donc $\\sqrt{" + L(s) + "} = " + L(c) + "$."
            };
          }
          const connu = choix([a, b]), r = connu === a ? b : a, s = net(carre(c) - carre(connu));
          return {
            enonce: "Calculer $\\sqrt{" + L(carre(c)) + " - " + L(carre(connu)) + "}$", reponse: r,
            correction: "On calcule d'abord sous la racine : $" + L(carre(c)) + " - " + L(carre(connu)) + " = " + L(s) + "$. Puis $" + L(r) + "^{2} = " + L(s) + "$, donc $\\sqrt{" + L(s) + "} = " + L(r) + "$."
          };
        }
      }
    },
    {
      id: "pyth-carre", chap: "pyth", titre: "Carré d'un côté avec Pythagore", format: "nombre",
      niveaux: {
        1: () => exCarre(1, () => ent(3, 15)),
        2: () => exCarre(2, () => (Math.random() < 0.7 ? dec(1.1, 9.9) : ent(3, 12))),
        3: () => exCarre(3, () => (Math.random() < 0.8 ? dec(1.1, 15) : ent(3, 20)))
      }
    },
    {
      id: "hyp-calcul", chap: "pyth", titre: "Calculer l'hypoténuse", format: "nombre",
      niveaux: {
        1: () => { const t = tripletEntier(1), [a, b] = melanger([t[0], t[1]]); return exHypotenuse(1, a, b); },
        2: () => { const t = choix(DECIMAUX), [a, b] = melanger([t[0], t[1]]); return exHypotenuse(2, a, b); },
        3: () => {
          for (;;) {
            const a = dec(1.1, 15), b = Math.random() < 0.5 ? dec(1.1, 15) : ent(3, 15);
            if (arrondi(Math.sqrt(carre(a) + carre(b)), 1) === null) continue;
            const [x, y] = melanger([a, b]);
            return exHypotenuse(3, x, y, 1);
          }
        }
      }
    },
    {
      id: "cote-droit", chap: "pyth", titre: "Calculer un côté de l'angle droit", format: "nombre",
      niveaux: {
        1: () => { const t = tripletEntier(1); return exCote(1, t[2], choix([t[0], t[1]])); },
        2: () => { const t = choix(DECIMAUX); return exCote(2, t[2], choix([t[0], t[1]])); },
        3: () => {
          for (;;) {
            const h = dec(3.1, 15), a = Math.random() < 0.7 ? dec(1.1, 14) : ent(3, 14);
            if (a > 0.9 * h || h - a < 1 || arrondi(Math.sqrt(carre(h) - carre(a)), 1) === null) continue;
            return exCote(3, h, a, 1);
          }
        }
      }
    },
    {
      id: "situation-pyth", chap: "pyth", titre: "Situation concrète avec Pythagore", format: "nombre",
      niveaux: {
        1: () => {
          const cadre = choix(["rectangle", "poteau", "randonnee"]);
          const liste = cadre === "rectangle" ? TRIPLETS : TRIPLETS.filter((t) => t[2] <= 30);
          return situation(choix(liste), cadre);
        },
        2: () => {
          const cadre = choix(["rectangle", "poteau", "randonnee", "echelle"]);
          if (cadre === "echelle") return situation(choix(ECHELLES), "echelle");
          return situation(choix(DECIMAUX), cadre);
        },
        3: () => {
          for (;;) {
            const cadre = choix(["ecran", "echelle", "poteau", "randonnee"]);
            if (cadre === "echelle") {
              // Échelle de 3 à 8 m, pied à au moins 0,6 m et au plus 45 % de la longueur ; on cherche la hauteur
              // (au centimètre), ou la longueur quand on donne le pied et la hauteur (au décimètre)
              const l = ent(30, 80) / 10, p = ent(6, Math.floor(4.5 * l)) / 10;
              if (Math.random() < 0.5) {
                if (arrondi(Math.sqrt(carre(l) - carre(p)), 2) === null) continue;
                return situation([p, 0, l], "echelle", 2, "hauteur");
              }
              const h = Math.round(Math.sqrt(carre(l) - carre(p)) * 10) / 10;
              if (arrondi(Math.sqrt(carre(p) + carre(h)), 2) === null) continue;
              return situation([p, h, 0], "echelle", 2, "longueur");
            }
            const [a, b, d] = cadre === "ecran" ? [ent(20, 120), ent(15, 120), 1]
              : cadre === "poteau" ? [ent(40, 150) / 10, ent(20, 90) / 10, 2] : [ent(15, 120) / 10, ent(15, 120) / 10, 1];
            if (a === b || arrondi(Math.sqrt(carre(a) + carre(b)), d) === null) continue;
            return situation([a, b, 0], cadre, d);
          }
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("4e", pyth);
})();
