// Techniques d'entraînement de 3e : « Théorème de Pythagore » (pyth).
// D'après propositions/referentiels/3e/pyth.json (lot 3) : les descriptions de niveau sont la spécification.
// Au niveau 3, seule la valeur arrondie au dixième est acceptée ; un arrondi entier s'attend sous la forme « 10 ».
(function () {
  const { L, T, ent, choix, net, decimal, facile, fixe } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const carre = (x) => net(x * x);

  const ENTIERS = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25], [20, 21, 29], [9, 40, 41],
    [12, 35, 37], [10, 24, 26], [15, 36, 39], [18, 24, 30], [16, 30, 34], [21, 28, 35], [24, 32, 40]];
  const tripletEntier = (niveau) => (facile(niveau) ? [3, 4, 5] : choix(ENTIERS.slice(1)));
  // Triplets décimaux : triplets primitifs × k/10, au moins un côté non entier, sans 0,3-0,4-0,5 (cas facile à part)
  const DECIMAUX = [];
  [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]].forEach((t) => {
    for (let k = 1; k <= 30; k++) {
      const u = t.map((x) => net((x * k) / 10));
      if (u[2] <= 15 && u.some((x) => !Number.isInteger(x)) && u[2] !== 0.5) DECIMAUX.push(u);
    }
  });
  const tripletDecimal = (niveau) => (facile(niveau) ? [0.3, 0.4, 0.5] : choix(DECIMAUX));
  // Arrondi au dixième, ou null si la racine tombe juste ou trop près d'une limite (…,x5)
  function arrondi(x) {
    const y = x * 10, f = y - Math.floor(y);
    if (f < 1e-6 || f > 1 - 1e-6 || Math.abs(f - 0.5) < 0.05) return null;
    return Math.round(y) / 10;
  }
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  const TRIANGLES = ["ABC", "DEF", "MNP", "RST", "KLO", "GHI"];
  function triangle() {
    const lettres = melanger(choix(TRIANGLES).split("")), droit = choix(lettres), [u, v] = lettres.filter((l) => l !== droit);
    const seg = (a, b) => (Math.random() < 0.5 ? a + b : b + a);
    return { nom: lettres.join(""), droit: droit, c1: seg(droit, u), c2: seg(droit, v), hyp: seg(u, v) };
  }
  const fin = (r, d, unite) => (d ? "\\approx " + (Number.isInteger(r) ? String(r) : L(r)) + "$ " + unite + " (arrondi au dixième)." : "= " + L(r) + "$ " + unite + ".");
  function exHypotenuse(a, b, unite, arrondir) {
    const t = triangle(), s = net(carre(a) + carre(b)), r = arrondir ? arrondi(Math.sqrt(s)) : net(Math.sqrt(s));
    return {
      enonce: "Le triangle $" + t.nom + "$ est rectangle en $" + t.droit + "$ avec $" + t.c1 + " = " + L(a) + "$ " + unite + " et $" + t.c2 + " = " + L(b) + "$ " + unite + ". Calculer $" + t.hyp + "$" + (arrondir ? " (arrondir au dixième)." : "."),
      reponse: r, unite: unite,
      correction: "Le triangle est rectangle en $" + t.droit + "$ : d'après le théorème de Pythagore, $" + t.hyp + "^{2} = " + t.c1 + "^{2} + " + t.c2 + "^{2} = " + L(a) + "^{2} + " + L(b) + "^{2} = " + L(carre(a)) + " + " + L(carre(b)) + " = " + L(s) +
        "$. Donc $" + t.hyp + " = \\sqrt{" + L(s) + "} " + fin(r, arrondir, unite)
    };
  }
  function exCote(h, a, unite, arrondir) {
    const t = triangle(), s = net(carre(h) - carre(a)), r = arrondir ? arrondi(Math.sqrt(s)) : net(Math.sqrt(s));
    return {
      enonce: "Le triangle $" + t.nom + "$ est rectangle en $" + t.droit + "$ avec $" + t.hyp + " = " + L(h) + "$ " + unite + " et $" + t.c1 + " = " + L(a) + "$ " + unite + ". Calculer $" + t.c2 + "$" + (arrondir ? " (arrondir au dixième)." : "."),
      reponse: r, unite: unite,
      correction: "Le triangle est rectangle en $" + t.droit + "$ : d'après le théorème de Pythagore, $" + t.hyp + "^{2} = " + t.c1 + "^{2} + " + t.c2 + "^{2}$, donc $" + t.c2 + "^{2} = " + t.hyp + "^{2} - " + t.c1 + "^{2} = " +
        L(carre(h)) + " - " + L(carre(a)) + " = " + L(s) + "$. Donc $" + t.c2 + " = \\sqrt{" + L(s) + "} " + fin(r, arrondir, unite)
    };
  }

  // ---------- Le triangle est-il rectangle ? (comme en 4e) ----------
  const NIVEAU3 = [];
  [[5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]].forEach((t) => [0.25, 0.3, 0.5, 0.7, 1.5, 2.5].forEach((m) => { const u = t.map((x) => net(x * m)); if (u[2] <= 50) NIVEAU3.push(u); }));
  function exRectangle(niveau) {
    let t;
    if (facile(niveau)) t = niveau === 1 ? [3, 4, 5] : [0.3, 0.4, 0.5];
    else {
      const rectangle = Math.random() < 0.5;
      for (;;) {
        const base = niveau === 1 ? choix(ENTIERS) : niveau === 2 ? choix(DECIMAUX) : choix(NIVEAU3);
        if (rectangle) { t = base; break; }
        const d = niveau === 1 ? choix([-2, -1, 1, 2, 3]) : niveau === 2 ? choix([1, 2, 3, 4]) / 10 * choix([1, -1]) : choix([0.05, 0.1, 0.2]) * choix([1, -1]);
        const c = net(base[2] + d);
        if (c > base[0] && c > base[1] && c < base[0] + base[1]) { t = [base[0], base[1], c]; break; }
      }
    }
    const lettres = choix(TRIANGLES).split(""), s = melanger(lettres.slice());
    const nom = (u, v) => [u, v].sort((x, y) => lettres.indexOf(x) - lettres.indexOf(y)).join("");
    const cotes = [{ n: nom(s[1], s[2]), l: t[0] }, { n: nom(s[0], s[2]), l: t[1] }, { n: nom(s[0], s[1]), l: t[2] }];
    const g = carre(t[2]), somme = net(carre(t[0]) + carre(t[1])), oui = g === somme;
    return {
      enonce: "Un triangle $" + lettres.join("") + "$ a pour côtés : " + melanger(cotes).map((c) => "$" + c.n + " = " + L(c.l) + "$ cm").join(", ") + ". Le triangle est-il rectangle ?",
      reponse: oui ? "rectangle" : "non rectangle",
      correction: "Plus grand côté : $" + cotes[2].n + "$. D'une part $" + L(t[2]) + "^{2} = " + L(g) + "$. D'autre part $" + L(t[0]) + "^{2} + " + L(t[1]) + "^{2} = " + L(carre(t[0])) + " + " + L(carre(t[1])) + " = " + L(somme) + "$. " +
        (oui ? "Les deux résultats sont égaux : d'après la réciproque du théorème de Pythagore, le triangle est rectangle."
          : "Les deux résultats sont différents : d'après la contraposée du théorème de Pythagore, le triangle n'est pas rectangle.")
    };
  }

  // ---------- Situations ----------
  // [a, b, c] : c l'hypoténuse ; on cherche l'hypoténuse (cherche = "hyp") ou un côté (cherche = "cote")
  function exSituation(a, b, c, arrondir) {
    const cadre = choix(["echelle", "cable", "ecran", "randonnee", "terrain", "rampe"]);
    const N = (x) => T(x);
    const hyp = c === null;
    const s = hyp ? net(carre(a) + carre(b)) : net(carre(c) - carre(a));
    const r = arrondir ? arrondi(Math.sqrt(s)) : net(Math.sqrt(s));
    const q = arrondir ? " (arrondir au dixième)" : "";
    let enonce, unite;
    switch (cadre) {
      case "echelle": unite = "m";
        enonce = hyp ? "Le pied d'une échelle est à " + N(a) + " m d'un mur vertical et le haut de l'échelle touche le mur à " + N(b) + " m du sol. Quelle est la longueur de l'échelle ?" + q
          : "Une échelle de " + N(c) + " m est appuyée contre un mur vertical. Son pied est à " + N(a) + " m du mur. À quelle hauteur du sol l'échelle touche-t-elle le mur ?" + q; break;
      case "cable": unite = "m";
        enonce = hyp ? "Un mât vertical de " + N(b) + " m est maintenu par un câble fixé à son sommet et à un point du sol situé à " + N(a) + " m de son pied. Quelle est la longueur du câble ?" + q
          : "Un câble de " + N(c) + " m relie le sommet d'un mât vertical à un point du sol situé à " + N(a) + " m du pied du mât. Quelle est la hauteur du mât ?" + q; break;
      case "ecran": unite = "cm";
        enonce = hyp ? "Un écran rectangulaire mesure " + N(a) + " cm de large et " + N(b) + " cm de haut. Quelle est la longueur de sa diagonale ?" + q
          : "La diagonale d'un écran rectangulaire mesure " + N(c) + " cm et sa largeur " + N(a) + " cm. Quelle est sa hauteur ?" + q; break;
      case "randonnee": unite = "km";
        enonce = hyp ? "Un randonneur marche " + N(a) + " km vers l'est puis " + N(b) + " km vers le nord. À quelle distance en ligne droite est-il de son point de départ ?" + q
          : "Un randonneur marche " + N(a) + " km vers l'est puis vers le nord. Il se trouve alors à " + N(c) + " km en ligne droite de son point de départ. Combien de kilomètres a-t-il parcourus vers le nord ?" + q; break;
      case "terrain": unite = "m";
        enonce = hyp ? "Un terrain rectangulaire mesure " + N(a) + " m sur " + N(b) + " m. Quelle est la longueur de sa diagonale ?" + q
          : "La diagonale d'un terrain rectangulaire mesure " + N(c) + " m et l'un de ses côtés " + N(a) + " m. Quelle est la longueur de l'autre côté ?" + q; break;
      default: unite = "m";
        enonce = hyp ? "Une rampe monte de " + N(a) + " m sur une distance horizontale de " + N(b) + " m. Quelle est la longueur de la rampe ?" + q
          : "Une rampe de " + N(c) + " m de long monte de " + N(a) + " m. Quelle est la distance horizontale qu'elle couvre ?" + q;
    }
    return {
      enonce: enonce, reponse: r, unite: unite,
      correction: hyp ? "La situation décrit un triangle rectangle dont le côté cherché est l'hypoténuse : $\\sqrt{" + L(a) + "^{2} + " + L(b) + "^{2}} = \\sqrt{" + L(carre(a)) + " + " + L(carre(b)) + "} = \\sqrt{" + L(s) + "} " + fin(r, arrondir, unite)
        : "Le côté cherché est un côté de l'angle droit, l'hypoténuse mesurant " + N(c) + " " + unite + " : $\\sqrt{" + L(c) + "^{2} - " + L(a) + "^{2}} = \\sqrt{" + L(carre(c)) + " - " + L(carre(a)) + "} = \\sqrt{" + L(s) + "} " + fin(r, arrondir, unite)
    };
  }
  const situationTriplet = (t) => { const [a, b] = melanger([t[0], t[1]]); return Math.random() < 0.5 ? exSituation(a, b, null) : exSituation(a, null, t[2]); };

  // ---------- Grande diagonale d'un pavé droit ----------
  const QUADRUPLETS = [[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [4, 4, 7, 9], [2, 10, 11, 15], [6, 6, 7, 11], [3, 4, 12, 13], [4, 5, 20, 21], [2, 5, 14, 15],
    [8, 9, 12, 17], [1, 12, 12, 17], [6, 10, 15, 19], [4, 8, 8, 12], [2, 4, 4, 6], [3, 6, 6, 9]];
  function exPave(a, b, c, arrondir) {
    const d2 = net(carre(a) + carre(b)), D2 = net(d2 + carre(c)), r = arrondir ? arrondi(Math.sqrt(D2)) : net(Math.sqrt(D2));
    return {
      enonce: "Un pavé droit a pour dimensions " + T(a) + " cm, " + T(b) + " cm et " + T(c) + " cm. Calculer la longueur de sa grande diagonale" + (arrondir ? " (arrondir au dixième)." : "."),
      reponse: r, unite: "cm",
      correction: "Diagonale de la base : $d^{2} = " + L(a) + "^{2} + " + L(b) + "^{2} = " + L(d2) + "$. Grande diagonale $D$ : $D^{2} = d^{2} + " + L(c) + "^{2} = " + L(d2) + " + " + L(carre(c)) + " = " + L(D2) +
        "$. Donc $D = \\sqrt{" + L(D2) + "} " + fin(r, arrondir, "cm")
    };
  }

  const pyth = [
    {
      id: "hypotenuse-calcul", chap: "pyth", titre: "Calculer l'hypoténuse", format: "nombre",
      niveaux: {
        1: () => { const t = tripletEntier(1), [a, b] = melanger([t[0], t[1]]); return exHypotenuse(a, b, "cm"); },
        2: () => { const t = tripletDecimal(2), [a, b] = melanger([t[0], t[1]]); return exHypotenuse(a, b, "cm"); },
        3: () => {
          for (;;) {
            const v = () => (Math.random() < 0.5 ? dec(1.5, 9) : ent(2, 15)), a = v(), b = v();
            if (arrondi(Math.sqrt(carre(a) + carre(b))) === null) continue;
            return exHypotenuse(a, b, choix(["cm", "m"]), true);
          }
        }
      }
    },
    {
      id: "cote-calcul", chap: "pyth", titre: "Calculer un côté de l'angle droit", format: "nombre",
      niveaux: {
        1: () => { const t = tripletEntier(1); return exCote(t[2], choix([t[0], t[1]]), "cm"); },
        2: () => { const t = tripletDecimal(2); return exCote(t[2], choix([t[0], t[1]]), "cm"); },
        3: () => {
          for (;;) {
            const a = Math.random() < 0.5 ? dec(1.5, 12) : ent(2, 12), ecart = Math.random() < 0.7 ? ent(5, 100) / 10 : ent(1, 10), h = net(a + ecart);
            if (h > 30 || arrondi(Math.sqrt(carre(h) - carre(a))) === null) continue;
            return exCote(h, a, choix(["cm", "m"]), true);
          }
        }
      }
    },
    { id: "rectangle-oui-non", chap: "pyth", titre: "Le triangle est-il rectangle ?", format: "choix", options: ["rectangle", "non rectangle"], niveaux: { 1: () => exRectangle(1), 2: () => exRectangle(2), 3: () => exRectangle(3) } },
    {
      id: "pyth-situation", chap: "pyth", titre: "Problèmes avec le théorème de Pythagore", format: "nombre",
      niveaux: {
        1: () => situationTriplet(facile(1) ? [3, 4, 5] : choix([[5, 12, 13], [8, 15, 17], [9, 12, 15], [7, 24, 25], [6, 8, 10], [12, 16, 20], [20, 21, 29]])),
        2: () => situationTriplet(tripletDecimal(2)),
        3: () => {
          for (;;) {
            const v = () => (Math.random() < 0.5 ? dec(1.5, 9) : ent(2, 15)), a = v(), b = v();
            if (Math.random() < 0.5) {
              if (arrondi(Math.sqrt(carre(a) + carre(b))) === null) continue;
              return exSituation(a, b, null, true);
            }
            const h = Math.max(a, b), l = Math.min(a, b);
            if (h - l < 0.5 || arrondi(Math.sqrt(carre(h) - carre(l))) === null) continue;
            return exSituation(l, null, h, true);
          }
        }
      }
    },
    {
      id: "diagonale-pave", chap: "pyth", titre: "Grande diagonale d'un pavé droit", format: "nombre",
      niveaux: {
        1: () => { const q = facile(1) ? [1, 2, 2] : choix(QUADRUPLETS.slice(1)).slice(0, 3); const [a, b, c] = melanger(q); return exPave(a, b, c); },
        2: () => {
          if (facile(2)) { const [a, b, c] = melanger([2, 4, 4]); return exPave(a, b, c); }
          for (;;) {
            const m = choix([0.5, 0.1, 1.5, 0.4, 0.2]), q = choix(QUADRUPLETS).slice(0, 3).map((x) => net(x * m));
            if (q.every(Number.isInteger)) continue;
            const [a, b, c] = melanger(q);
            return exPave(a, b, c);
          }
        },
        3: () => {
          for (;;) {
            const v = () => (Math.random() < 0.5 ? dec(1.5, 12) : ent(2, 20)), a = v(), b = v(), c = v();
            if (arrondi(Math.sqrt(carre(a) + carre(b) + carre(c))) === null) continue;
            return exPave(a, b, c, true);
          }
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("3e", pyth);
})();
