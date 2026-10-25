// Techniques d'entraînement de 4e : « Statistiques » (stat).
// D'après propositions/referentiels/4e/stat.json (lot 1) : les descriptions de niveau sont la spécification.
// L'étendue n'est pas au programme de cette 4e (décision de l'enseignant).
(function () {
  const { L, T, P, ent, choix, net, decimales, facile, pluriel } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const somme = (l) => net(l.reduce((a, b) => a + b, 0));
  // Moyenne exacte avec au plus deux chiffres après la virgule ?
  const exacte = (x) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;
  const range = (t) => t.every((x, i) => i === 0 || t[i - 1] <= x);
  const listeTexte = (v) => v.map(T).join(" ; ");

  // Séries de valeurs entières (min, max) et décimales (en dixièmes)
  const ENTIERS = {
    notes: { min: 4, max: 19, debut: "Notes obtenues à des devoirs de mathématiques (sur 20)", unite: "" },
    buts: { min: 0, max: 8, debut: "Nombre de buts marqués par une équipe à chacun de ses matchs", unite: "buts" },
    trajets: { min: 8, max: 40, debut: "Temps de trajet, en minutes, relevés par un élève sur plusieurs matins", unite: "min" },
    livres: { min: 0, max: 9, debut: "Nombre de livres lus pendant l'été par des élèves d'une classe", unite: "livres" },
    ages: { min: 12, max: 17, debut: "Âges, en années, des joueurs d'une équipe de handball", unite: "ans" },
    pages: { min: 5, max: 60, debut: "Nombre de pages lues chaque jour par un élève", unite: "pages" }
  };
  const TEMPERATURES = { debut: "Températures relevées à midi, en °C", unite: "°C" };
  const DECIMAUX = {
    cent: { min: 140, max: 200, debut: "Temps réalisés par des élèves au 100 m, en secondes", unite: "s" },
    vols: { min: 10, max: 120, debut: "Durées, en heures, de vols d'un avion", unite: "h" },
    colis: { min: 8, max: 95, debut: "Masses, en kg, de colis pesés à la poste", unite: "kg" },
    velo: { min: 120, max: 480, debut: "Distances, en km, parcourues à vélo par une cycliste chaque dimanche", unite: "km" }
  };
  const tirerEntiers = (s, n) => Array.from({ length: n }, () => ent(s.min, s.max));
  const tirerDecimaux = (s, n) => Array.from({ length: n }, () => ent(s.min, s.max) / 10);

  // ---------- Moyenne ----------
  function exMoyenne(s, v) {
    const n = v.length, t = somme(v), m = net(t / n);
    return {
      enonce: s.debut + " : " + listeTexte(v) + ". Calculer la moyenne de cette série.",
      reponse: m, unite: s.unite,
      correction: "Moyenne = somme des valeurs ÷ effectif total. $(" + v.map(P).join(" + ") + ") \\div " + n + " = " + L(t) + " \\div " + n + " = " + L(m) + "$."
    };
  }

  // Effectifs : k nombres de min à max, de somme total (au hasard), ou null
  function effectifs(k, total, min, max) {
    for (let essai = 0; essai < 2000; essai++) {
      const e = Array.from({ length: k - 1 }, () => ent(min, max));
      const dernier = total - e.reduce((a, b) => a + b, 0);
      if (dernier >= min && dernier <= max) return melanger(e.concat([dernier]));
    }
    return null;
  }
  // k valeurs entières distinctes de min à max, rangées
  function valeursDistinctes(k, min, max) {
    const toutes = melanger(Array.from({ length: max - min + 1 }, (_, i) => min + i));
    return toutes.slice(0, k).sort((a, b) => a - b);
  }
  function exPonderee(debut, v, e, unite) {
    const N = e.reduce((a, b) => a + b, 0), produits = v.map((x, i) => net(x * e[i])), t = somme(produits), m = net(t / N);
    return {
      enonce: debut + " : " + v.map((x, i) => T(x) + " (" + e[i] + " fois)").join(" ; ") + ". Calculer la moyenne de cette série.",
      reponse: m, unite: unite || "",
      correction: "On multiplie chaque valeur par son effectif : $(" + v.map((x, i) => L(x) + " \\times " + e[i]).join(" + ") + ") \\div " + N + " = (" +
        produits.map(L).join(" + ") + ") \\div " + N + " = " + L(t) + " \\div " + N + " = " + L(m) + "$."
    };
  }

  // ---------- Médiane ----------
  function exMediane(s, v) {
    const t = v.slice().sort((a, b) => a - b), n = t.length;
    const deja = range(v);
    let fin, m;
    if (n % 2) {
      m = t[(n - 1) / 2];
      fin = "(effectif impair) : la médiane est la valeur du milieu, la " + (n + 1) / 2 + "e, soit " + T(m) + ".";
    } else {
      const a = t[n / 2 - 1], b = t[n / 2];
      m = net((a + b) / 2);
      fin = "(effectif pair) : la médiane est le milieu des " + n / 2 + "e et " + (n / 2 + 1) + "e valeurs, $\\dfrac{" + P(a) + " + " + P(b) + "}{2} = " + L(m) + "$.";
    }
    return {
      enonce: s.debut + " : " + listeTexte(v) + ". Déterminer la médiane de cette série.",
      reponse: m, unite: s.unite,
      correction: (deja ? "Les valeurs sont déjà rangées dans l'ordre croissant" : "On range les valeurs dans l'ordre croissant") + " : " + listeTexte(t) +
        ". Il y a " + n + " valeurs " + fin
    };
  }
  // Série désordonnée (sauf si on veut une série déjà rangée)
  const ordonner = (v, dejaRange) => (dejaRange ? v.slice().sort((a, b) => a - b) : (() => { let w; do { w = melanger(v); } while (range(w) && new Set(v).size > 1); return w; })());

  // ---------- Fréquences ----------
  // Lieu de la population d'élèves selon sa taille
  const eleves = (N) => (N <= 35 ? "Dans une classe de " + N + " élèves" : N <= 200 ? "Parmi les " + N + " élèves de 4e d'un collège" : "Dans un collège de " + N + " élèves");
  const FREQUENCES = {
    velo: { classe: true, texte: (N, n) => eleves(N) + ", " + n + " élèves viennent au collège à vélo.", quoi: "des élèves qui viennent à vélo" },
    billes: { texte: (N, n) => "Dans un sac de " + N + " billes, " + n + " billes sont rouges.", quoi: "des billes rouges" },
    matchs: { texte: (N, n) => "Une équipe a joué " + N + " matchs et en a gagné " + n + ".", quoi: "des matchs gagnés" },
    chocolat: { texte: (N, n) => "Sur " + N + " personnes interrogées, " + n + " préfèrent le chocolat noir.", quoi: "des personnes qui préfèrent le chocolat noir" },
    demi: { classe: true, texte: (N, n) => eleves(N) + ", " + n + " élèves sont demi-pensionnaires.", quoi: "des élèves demi-pensionnaires" },
    pommiers: { texte: (N, n) => "Dans un verger de " + N + " arbres, " + n + " arbres sont des pommiers.", quoi: "des pommiers" },
    baguette: { texte: (N, n) => "Sur " + N + " clients d'une boulangerie, " + n + " achètent une baguette.", quoi: "des clients qui achètent une baguette" }
  };
  function exFrequence(N, n, pourcent) {
    // Pour un petit effectif, pas de situation de classe (les billes à la place)
    let cle = choix(Object.keys(FREQUENCES));
    if (N < 15 && FREQUENCES[cle].classe) cle = "billes";
    const s = FREQUENCES[cle], f = net(n / N), p = net(f * 100);
    return {
      enonce: s.texte(N, n) + " Quelle est la fréquence " + s.quoi + (pourcent ? ", en pourcentage ?" : ", sous forme décimale ?"),
      reponse: pourcent ? p : f, unite: pourcent ? "%" : "",
      correction: "Fréquence = effectif ÷ effectif total. $f = \\dfrac{" + n + "}{" + N + "} = " + L(f) + (pourcent ? " = " + L(p) + "\\,\\%" : "") + "$."
    };
  }
  const pourcentTexte = (p) => T(p) + " %";
  const EFFECTIFS = {
    demi: {
      pourcent: (N, p) => eleves(N) + ", " + pourcentTexte(p) + " des élèves sont demi-pensionnaires. Combien d'élèves sont demi-pensionnaires ?",
      decimal: (N, f) => eleves(N) + ", la fréquence des élèves demi-pensionnaires est " + T(f) + ". Combien d'élèves sont demi-pensionnaires ?", unite: "élèves"
    },
    chocolat: {
      pourcent: (N, p) => "Sur " + N + " personnes interrogées, " + pourcentTexte(p) + " préfèrent le chocolat noir. Combien de personnes cela représente-t-il ?",
      decimal: (N, f) => "On a interrogé " + N + " personnes : la fréquence de celles qui préfèrent le chocolat noir est " + T(f) + ". Combien de personnes préfèrent le chocolat noir ?", unite: "personnes"
    },
    matchs: {
      pourcent: (N, p) => "Une équipe a joué " + N + " matchs. La fréquence des matchs gagnés est " + pourcentTexte(p) + ". Combien de matchs a-t-elle gagnés ?",
      decimal: (N, f) => "Une équipe a joué " + N + " matchs. La fréquence des matchs gagnés est " + T(f) + ". Combien de matchs a-t-elle gagnés ?", unite: "matchs"
    },
    pommiers: {
      pourcent: (N, p) => "Dans un verger de " + N + " arbres, " + pourcentTexte(p) + " des arbres sont des pommiers. Combien y a-t-il de pommiers ?",
      decimal: (N, f) => "Dans un verger de " + N + " arbres, la fréquence des pommiers est " + T(f) + ". Combien y a-t-il de pommiers ?", unite: "pommiers"
    },
    baguette: {
      pourcent: (N, p) => "Sur " + N + " clients d'une boulangerie, " + pourcentTexte(p) + " achètent une baguette. Combien de clients achètent une baguette ?",
      decimal: (N, f) => "Une boulangerie a eu " + N + " clients ; la fréquence des clients qui achètent une baguette est " + T(f) + ". Combien de clients ont acheté une baguette ?", unite: "clients"
    }
  };
  function exEffectif(N, p, enDecimal) {
    const s = EFFECTIFS[choix(Object.keys(EFFECTIFS))], f = net(p / 100), r = Math.round(f * N);
    return {
      enonce: enDecimal ? s.decimal(N, f) : s.pourcent(N, p), reponse: r, unite: s.unite,
      correction: enDecimal ? "Effectif = fréquence × effectif total. $" + L(f) + " \\times " + N + " = " + r + "$."
        : "Une fréquence de " + pourcentTexte(p) + " signifie : " + pourcentTexte(p) + " de l'effectif total. $\\dfrac{" + L(p) + "}{100} \\times " + N + " = " + L(f) + " \\times " + N + " = " + r + "$."
    };
  }

  // ---------- Note manquante ----------
  const PRENOMS = [["Sofia", "elle"], ["Camille", "elle"], ["Malik", "il"], ["Léa", "elle"], ["Emma", "elle"], ["Yanis", "il"],
    ["Hugo", "il"], ["Lucas", "il"], ["Inès", "elle"], ["Nathan", "il"], ["Chloé", "elle"], ["Adam", "il"]];
  const NOMBRES = { 3: "trois", 4: "quatre", 5: "cinq", 6: "six", 7: "sept" };
  function exNoteManquante(notes, m) {
    const [prenom, pronom] = choix(PRENOMS), n = notes.length, total = net(m * (n + 1)), deja = somme(notes), x = net(total - deja);
    // Avec des demi-points, « ; » sépare les notes (la virgule est déjà prise par les décimaux)
    const sep = notes.some((v) => !Number.isInteger(v)) ? " ; " : ", ";
    const liste = notes.slice(0, -1).map(T).join(sep) + " et " + T(notes[n - 1]);
    return {
      enonce: prenom + " a obtenu " + liste + " aux " + NOMBRES[n] + " premiers devoirs de mathématiques (notes sur 20). Quelle note doit-" + pronom +
        " obtenir au devoir suivant pour que sa moyenne sur les " + NOMBRES[n + 1] + " devoirs soit de " + T(m) + " ?",
      reponse: x,
      correction: "Pour " + (n + 1) + " notes et une moyenne de " + T(m) + ", la somme des notes doit être " + (n + 1) + " × " + T(m) + " = " + T(total) +
        ". Les " + n + " notes déjà obtenues font " + notes.map(T).join(" + ") + " = " + T(deja) + ". La note cherchée est " + T(total) + " − " + T(deja) + " = " + T(x) + "."
    };
  }

  // ---------- Moyenne d'une série en classes ----------
  const CLASSES = {
    tailles: { debut: (N) => "Tailles de " + N + " élèves, en cm", lettre: "t", unite: "cm", qui: ["élève", "élèves"] },
    masses: { debut: (N) => "Masses de " + N + " élèves, en kg", lettre: "m", unite: "kg", qui: ["élève", "élèves"] },
    trajets: { debut: (N) => "Durées de trajet de " + N + " élèves, en minutes", lettre: "d", unite: "min", qui: ["élève", "élèves"] },
    ages: { debut: (N) => "Âges de " + N + " adhérents d'un club, en années", lettre: "a", unite: "ans", qui: ["adhérent", "adhérents"] }
  };
  function exClasses(c, depart, largeur, e) {
    const N = e.reduce((a, b) => a + b, 0);
    const bornes = e.map((_, i) => depart + i * largeur), centres = bornes.map((b) => net(b + largeur / 2));
    const produits = centres.map((x, i) => net(x * e[i])), t = somme(produits), m = net(t / N);
    return {
      enonce: c.debut(N) + " : " + bornes.map((b, i) => "$" + b + " \\leqslant " + c.lettre + " < " + (b + largeur) + "$ (" + pluriel(e[i], c.qui[0], c.qui[1]) + ")").join(" ; ") +
        ". Calculer une valeur approchée de la moyenne en utilisant les centres des classes.",
      reponse: m, unite: c.unite,
      correction: "On remplace chaque classe par son centre : " + centres.map((x) => "$" + L(x) + "$").join(", ") + ". Moyenne approchée $= (" +
        centres.map((x, i) => L(x) + " \\times " + e[i]).join(" + ") + ") \\div " + N + " = " + L(t) + " \\div " + N + " = " + L(m) + "$."
    };
  }

  const stat = [
    {
      id: "moyenne-simple", chap: "stat", titre: "Moyenne d'une série de valeurs", format: "nombre",
      niveaux: {
        1: () => {
          const s = ENTIERS[choix(Object.keys(ENTIERS))];
          for (;;) {
            const v = tirerEntiers(s, ent(4, 5));
            if (new Set(v).size < 3 || somme(v) % v.length) continue;
            return exMoyenne(s, v);
          }
        },
        2: () => {
          const s = ENTIERS[choix(Object.keys(ENTIERS))], entiere = facile(1);
          for (;;) {
            const n = choix(s.max - s.min >= 9 ? [5, 6, 8, 10] : [5, 6, 8]), v = tirerEntiers(s, n), m = somme(v) / n;
            if (new Set(v).size < 3 || !exacte(m) || Number.isInteger(m) !== entiere) continue;
            return exMoyenne(s, v);
          }
        },
        3: () => {
          for (;;) {
            if (Math.random() < 0.5) {
              const v = tirerEntiers({ min: -6, max: 14 }, choix([6, 8, 10])), m = somme(v) / v.length;
              if (!v.some((x) => x < 0) || !v.some((x) => x > 0) || !exacte(m) || Number.isInteger(m)) continue;
              return exMoyenne(TEMPERATURES, v);
            }
            const s = DECIMAUX[choix(Object.keys(DECIMAUX))], v = tirerDecimaux(s, choix([5, 6, 8, 10])), m = somme(v) / v.length;
            if (v.filter((x) => !Number.isInteger(x)).length <= v.length / 2 || !exacte(m) || Number.isInteger(net(m))) continue;
            return exMoyenne(s, v);
          }
        }
      }
    },
    {
      id: "moyenne-ponderee", chap: "stat", titre: "Moyenne d'une série avec effectifs", format: "nombre",
      niveaux: {
        1: () => {
          const entiere = Math.random() < 0.3;
          for (;;) {
            const N = choix([4, 5, 8, 10]), e = effectifs(3, N, 1, 5);
            if (!e) continue;
            const v = valeursDistinctes(3, 6, 16), m = somme(v.map((x, i) => x * e[i])) / N;
            if (Math.abs(m * 10 - Math.round(m * 10)) > 1e-6 || Number.isInteger(net(m)) !== entiere) continue;
            return exPonderee("Notes de " + N + " élèves à un devoir", v, e);
          }
        },
        2: () => {
          const entiere = Math.random() < 0.1, trajets = Math.random() < 0.5;
          for (;;) {
            const k = ent(4, 5), N = choix([8, 10, 12, 15, 16, 20, 25]), e = effectifs(k, N, 1, 6);
            if (!e) continue;
            const v = valeursDistinctes(k, 5, 18), m = somme(v.map((x, i) => x * e[i])) / N;
            if (!exacte(m) || Number.isInteger(net(m)) !== entiere) continue;
            return trajets ? exPonderee("Temps de trajet, en minutes, de " + N + " élèves", v, e, "min") : exPonderee("Notes de " + N + " élèves à un devoir", v, e);
          }
        },
        3: () => {
          const cadre = choix(["notes", "pointures", "cdi"]);
          for (;;) {
            const k = ent(5, 6), N = choix([20, 25, 30, 40, 50]), e = effectifs(k, N, 1, 9);
            if (!e || new Set(e).size < 3) continue;
            const v = cadre === "pointures" ? valeursDistinctes(k, 34, 46) : valeursDistinctes(k, 0, 20), m = somme(v.map((x, i) => x * e[i])) / N;
            if (!exacte(m) || Number.isInteger(net(m))) continue;
            const debut = cadre === "pointures" ? "Pointures de " + N + " élèves" : cadre === "cdi" ? "Nombres de visites au CDI de " + N + " élèves en un mois" : "Notes de " + N + " élèves à un contrôle";
            return exPonderee(debut, v, e);
          }
        }
      }
    },
    {
      id: "mediane-calc", chap: "stat", titre: "Médiane d'une série de valeurs", format: "nombre",
      niveaux: {
        1: () => {
          const s = ENTIERS[choix(["notes", "buts", "livres", "ages"])];
          for (;;) {
            const n = choix([5, 7]), v = tirerEntiers(s, n);
            if (n - new Set(v).size > 1) continue;
            return exMediane(s, ordonner(v, facile(1)));
          }
        },
        2: () => {
          const cle = choix(["notes", "trajets", "ages", "pages"]), s = ENTIERS[cle];
          for (;;) {
            const n = cle === "ages" ? 6 : choix([6, 8, 10]), v = tirerEntiers(s, n), t = v.slice().sort((a, b) => a - b);
            // Deux valeurs centrales égales : moins d'un cas sur trois
            if (t[n / 2 - 1] === t[n / 2] && Math.random() < 0.7) continue;
            return exMediane(s, ordonner(v, facile(2)));
          }
        },
        3: () => {
          const n = ent(9, 12);
          if (Math.random() < 0.5) {
            let v;
            do { v = tirerEntiers({ min: -9, max: 12 }, n); } while (!v.some((x) => x < 0));
            return exMediane(TEMPERATURES, ordonner(v, false));
          }
          const s = DECIMAUX[choix(Object.keys(DECIMAUX))];
          return exMediane(s, ordonner(tirerDecimaux(s, n), false));
        }
      }
    },
    {
      id: "frequence-calc", chap: "stat", titre: "Calculer une fréquence", format: "nombre",
      niveaux: {
        1: () => {
          const simple = facile(1);
          for (;;) {
            const N = simple ? choix([10, 100]) : choix([5, 20, 25, 40, 50]), n = ent(2, N - 2);
            if (N === 5 && n * 2 === N) continue;
            if (decimales(n / N) > 2) continue;
            return exFrequence(N, n, false);
          }
        },
        2: () => {
          const entier = Math.random() < 0.7;
          for (;;) {
            const N = choix([20, 25, 40, 50, 80, 200]), n = ent(2, N - 2), p = net((n / N) * 100);
            if (decimales(p) > 1 || Number.isInteger(p) !== entier) continue;
            return exFrequence(N, n, true);
          }
        },
        3: () => {
          for (;;) {
            const N = choix([8, 40, 200, 250, 500]), n = ent(2, N - 2), p = net((n / N) * 100);
            if (decimales(p) !== 1) continue;
            return exFrequence(N, n, true);
          }
        }
      }
    },
    {
      id: "effectif-freq", chap: "stat", titre: "Retrouver un effectif à partir d'une fréquence", format: "nombre",
      niveaux: {
        1: () => {
          const moitie = facile(1);
          for (;;) {
            const N = choix([20, 25, 50, 100, 200]), p = moitie ? 50 : ent(5, 90), r = (p * N) / 100;
            if (!moitie && p === 50) continue;
            if (!Number.isInteger(r) || r < 2 || r > N - 2) continue;
            return exEffectif(N, p, false);
          }
        },
        2: () => {
          for (;;) {
            const N = choix([40, 60, 80, 120, 150, 250, 300, 500]), p = ent(5, 95), r = net((p * N) / 100);
            if (p === 50 || !Number.isInteger(r) || r < 2 || r > N - 2) continue;
            return exEffectif(N, p, Math.random() < 0.5);
          }
        },
        3: () => {
          for (;;) {
            const N = choix([40, 80, 200, 400, 800]), m = ent(11, 949), p = m / 10, r = net((m * N) / 1000);
            if (m % 10 === 0 || !Number.isInteger(r) || r < 2) continue;
            return exEffectif(N, p, false);
          }
        }
      }
    },
    {
      id: "note-manquante", chap: "stat", titre: "Trouver la note manquante pour une moyenne donnée", format: "nombre",
      niveaux: {
        1: () => {
          for (;;) {
            const notes = [ent(6, 19), ent(6, 19), ent(6, 19)], m = ent(8, 16), x = 4 * m - somme(notes);
            if (new Set(notes).size < 2 || x < 0 || x > 20 || x === m) continue;
            return exNoteManquante(notes, m);
          }
        },
        2: () => {
          for (;;) {
            const n = ent(3, 5), notes = Array.from({ length: n }, () => ent(6, 19));
            const m = Math.random() < 0.5 ? ent(8, 16) : ent(16, 33) / 2, x = net((n + 1) * m - somme(notes));
            if (new Set(notes).size < 2 || x < 0 || x > 20 || x === m) continue;
            return exNoteManquante(notes, m);
          }
        },
        3: () => {
          const entiere = Math.random() < 0.3;
          for (;;) {
            const n = ent(4, 6), notes = Array.from({ length: n }, () => ent(12, 38) / 2);
            const m = ent(21, 33) / 2, x = net((n + 1) * m - somme(notes));
            if (new Set(notes).size < 3 || !notes.some((v) => !Number.isInteger(v)) || x < 0 || x > 20 || x === m || Number.isInteger(x) !== entiere) continue;
            return exNoteManquante(notes, m);
          }
        }
      }
    },
    {
      id: "moyenne-classes", chap: "stat", titre: "Moyenne d'une série en classes", format: "nombre",
      niveaux: {
        1: () => {
          const largeur = choix([10, 20]), a = largeur === 10 ? 10 * ent(1, 19) : 20 * ent(1, 9), b = a + largeur, c = a + largeur / 2;
          return {
            enonce: "Calculer le centre de la classe $" + a + " \\leqslant t < " + b + "$.", reponse: c,
            correction: "Le centre est le milieu de l'intervalle : $\\dfrac{" + a + " + " + b + "}{2} = \\dfrac{" + (a + b) + "}{2} = " + c + "$."
          };
        },
        2: () => {
          const tailles = Math.random() < 0.5, depart = tailles ? choix([140, 150, 160]) : choix([40, 50]);
          for (;;) {
            const N = choix([8, 10, 12, 15, 16, 20]), e = effectifs(3, N, 1, 8);
            if (!e) continue;
            const m = somme(e.map((x, i) => (depart + 10 * i + 5) * x)) / N;
            if (Math.abs(m * 10 - Math.round(m * 10)) > 1e-6 || Number.isInteger(net(m))) continue;
            return exClasses(CLASSES[tailles ? "tailles" : "masses"], depart, 10, e);
          }
        },
        3: () => {
          const cle = choix(Object.keys(CLASSES));
          const depart = { tailles: choix([130, 140, 150]), masses: choix([30, 40, 50]), trajets: choix([0, 10]), ages: choix([20, 30]) }[cle];
          const largeur = cle === "ages" ? choix([10, 20]) : choix([5, 10]);
          for (;;) {
            const k = ent(4, 5), N = choix([20, 25, 40, 50]), e = effectifs(k, N, 1, 12);
            if (!e || new Set(e).size < 3) continue;
            const m = somme(e.map((x, i) => (depart + largeur * i + largeur / 2) * x)) / N;
            if (!exacte(m) || Number.isInteger(net(m))) continue;
            return exClasses(CLASSES[cle], depart, largeur, e);
          }
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("4e", stat);
})();
