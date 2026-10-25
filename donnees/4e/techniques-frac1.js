// Techniques d'entraînement de 4e : « Fractions : addition et soustraction » (frac1).
// D'après propositions/referentiels/4e/frac1.json (lot 1) : les descriptions de niveau sont la spécification.
// format "fraction" : l'élève écrit une fraction ; seule la fraction irréductible est acceptée (« Simplifie encore »).
// La réponse attendue est une chaîne "n/d" (fraction irréductible, signe au numérateur).
(function () {
  const { L, P, ent, choix, net, facile, pgcd, ppcm, F } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  // Fraction irréductible "n/d" (d > 0)
  function reduite(n, d) { const g = pgcd(n, d) || 1, s = d < 0 ? -1 : 1; return (s * n) / g + "/" + Math.abs(d) / g; }
  // Numérateur tiré au hasard, premier avec d, de 1 à max
  const premierAvec = (d, max) => { let n; do { n = ent(1, max); } while (pgcd(n, d) !== 1); return n; };
  // Étape de simplification (rien si la fraction est déjà irréductible)
  function simplification(n, d) {
    const g = pgcd(n, d);
    if (g === 1) return "";
    return " On simplifie en divisant par " + g + " : $" + (n < 0 ? "-" : "") + "\\dfrac{" + Math.abs(n) + " \\div " + g + "}{" + d + " \\div " + g + "} = " + F(n / g, d / g) + "$.";
  }
  // Seconde fraction d'un calcul : entre parenthèses si elle est négative
  const second = (n, d) => (n < 0 ? "\\left(" + F(n, d) + "\\right)" : F(n, d));
  // Mise au dénominateur m : 3/2 = (3 × 2)/(2 × 2) = 6/4
  const conversion = (n, d, m) => F(n, d) + " = \\dfrac{" + L(n) + " \\times " + m / d + "}{" + d + " \\times " + m / d + "} = \\dfrac{" + L((n * m) / d) + "}{" + m + "}";

  // Somme ou différence n1/d1 ± n2/d2, avec la correction comme au tableau
  function calcul(n1, d1, n2, d2, moins) {
    const m = ppcm(d1, d2), N1 = (n1 * m) / d1, N2 = (n2 * m) / d2, r = moins ? N1 - N2 : N1 + N2;
    const convs = [d1 !== m ? conversion(n1, d1, m) : null, d2 !== m ? conversion(n2, d2, m) : null].filter(Boolean);
    const debut = d1 === d2 ? "" : "Dénominateur commun : " + m + ". $" + convs.join("$ et $") + "$. ";
    const operation = (moins ? "on soustrait" : "on additionne") + " les numérateurs et on garde le dénominateur. $\\dfrac{" + L(N1) + (moins ? " - " : " + ") + P(N2) + "}{" + m + "} = " + F(r, m) + "$.";
    return { r: r, m: m, reponse: reduite(r, m), correction: debut + "Même dénominateur : " + operation + simplification(r, m) };
  }
  const enonceCalcul = (n1, d1, n2, d2, moins) => "Calculer $" + F(n1, d1) + (moins ? " - " : " + ") + second(n2, d2) + "$ et donner le résultat sous la forme d'une fraction irréductible.";

  // ---------- Comparer ----------
  function exComparer(n1, d1, n2, d2) {
    const m = ppcm(d1, d2), N1 = (n1 * m) / d1, N2 = (n2 * m) / d2, premier = N1 > N2;
    const [gn, gd] = premier ? [n1, d1] : [n2, d2];
    const ecrire = (n, d) => (d === m ? F(n, d) : F(n, d) + " = \\dfrac{" + L((n * m) / d) + "}{" + m + "}");
    const negatives = n1 < 0;
    return {
      enonce: "Quelle est la plus grande des deux fractions $" + F(n1, d1) + "$ et $" + F(n2, d2) + "$ ? Répondre par cette fraction.",
      reponse: reduite(gn, gd),
      correction: "Dénominateur commun : " + m + ". $" + ecrire(n1, d1) + "$ et $" + ecrire(n2, d2) + "$. Comme $" + L(Math.max(N1, N2)) + " > " + L(Math.min(N1, N2)) +
        "$, la plus grande est $" + F(gn, gd) + "$" + (negatives ? " (la plus proche de 0)." : ".")
    };
  }
  const multiples = (a, b) => a % b === 0 || b % a === 0;

  // ---------- Situations ----------
  const SOMMES = [
    (f1, f2) => "Lors d'une randonnée, Inès parcourt $" + f1 + "$ du trajet le matin et $" + f2 + "$ l'après-midi. Quelle fraction du trajet a-t-elle parcourue en tout ?",
    (f1, f2) => "Dans une classe, $" + f1 + "$ des élèves apprennent l'espagnol et $" + f2 + "$ apprennent l'allemand (chaque élève n'apprend qu'une de ces deux langues). Quelle fraction des élèves apprend l'espagnol ou l'allemand ?",
    (f1, f2) => "Un jardin est planté de légumes sur $" + f1 + "$ de sa surface et de fleurs sur $" + f2 + "$ de sa surface. Quelle fraction de la surface est plantée ?",
    (f1, f2) => "Un livre a été lu : $" + f1 + "$ lundi et $" + f2 + "$ mardi. Quelle fraction du livre a été lue en tout ?"
  ];
  const RESTES = [
    (f1, f2) => "On a mangé $" + f1 + "$ d'un gâteau samedi et $" + f2 + "$ dimanche. Quelle fraction du gâteau reste-t-il ?",
    (f1, f2) => "Une piscine est remplie à $" + f1 + "$ de sa capacité le matin, puis on ajoute $" + f2 + "$ de sa capacité l'après-midi. Quelle fraction de la capacité reste à remplir ?",
    (f1, f2) => "Un peintre peint $" + f1 + "$ d'un mur le matin et $" + f2 + "$ l'après-midi. Quelle fraction du mur reste à peindre ?"
  ];
  function exSituation(n1, d1, n2, d2, reste) {
    const c = calcul(n1, d1, n2, d2, false);
    const texte = choix(reste ? RESTES : SOMMES)(F(n1, d1), F(n2, d2)) + " Donner une fraction irréductible.";
    if (!reste) return { enonce: texte, reponse: c.reponse, correction: c.correction };
    const [sn, sd] = c.reponse.split("/").map(Number);
    return {
      enonce: texte, reponse: reduite(sd - sn, sd),
      correction: "On additionne d'abord les deux fractions. " + c.correction + " Le tout vaut 1 : il reste $1 - " + F(sn, sd) + " = \\dfrac{" + sd + "}{" + sd + "} - " + F(sn, sd) + " = " + F(sd - sn, sd) + "$."
    };
  }
  // Deux fractions irréductibles de même dénominateur c, de somme inférieure à 1
  function memeDenominateur(cMin, cMax) {
    for (;;) {
      const c = ent(cMin, cMax), n1 = premierAvec(c, c - 1), n2 = premierAvec(c, c - 1);
      if (n1 + n2 < c) return [n1, c, n2, c];
    }
  }

  const frac1 = [
    {
      id: "fraction-egale", chap: "frac1", titre: "Compléter une égalité de fractions", format: "nombre",
      niveaux: (function () {
        function exEgalite(a, b, k, diviser) {
          const enonce = diviser
            ? "Compléter l'égalité : $\\dfrac{" + L(a * k) + "}{" + b * k + "} = \\dfrac{\\ldots}{" + b + "}$."
            : "Compléter l'égalité : $\\dfrac{" + L(a) + "}{" + b + "} = \\dfrac{\\ldots}{" + b * k + "}$.";
          const correction = diviser
            ? "On passe de " + b * k + " à " + b + " en divisant par " + k + " (car $" + b * k + " \\div " + b + " = " + k + "$). On divise donc aussi le numérateur par " + k +
              " : $\\dfrac{" + L(a * k) + " \\div " + k + "}{" + b * k + " \\div " + k + "} = \\dfrac{" + L(a) + "}{" + b + "}$."
            : "On passe de " + b + " à " + b * k + " en multipliant par " + k + " (car $" + b * k + " \\div " + b + " = " + k + "$). On multiplie donc aussi le numérateur par " + k +
              " : $\\dfrac{" + L(a) + " \\times " + k + "}{" + b + " \\times " + k + "} = \\dfrac{" + L(a * k) + "}{" + b * k + "}$.";
          return { enonce: enonce, reponse: diviser ? a : a * k, correction: correction };
        }
        return {
          1: () => { const b = ent(2, 9); return exEgalite(ent(1, b + 3), b, facile(1) ? 2 : choix([3, 4, 5, 10]), false); },
          2: () => {
            const k = facile(2) ? 2 : ent(3, 9);
            if (Math.random() < 0.6) return exEgalite(ent(1, 15), ent(2, 12), k, false);
            const b = ent(2, 9);
            return exEgalite(ent(1, b + 3), b, k, true);
          },
          3: () => { const b = ent(2, 9), a = ent(1, 15) * (Math.random() < 0.5 ? -1 : 1); return exEgalite(a, b, ent(6, 12), Math.random() < 0.5); }
        };
      })()
    },
    {
      id: "simplifier", chap: "frac1", titre: "Simplifier une fraction", format: "fraction",
      niveaux: (function () {
        function exSimplifier(p, q, g, negatif) {
          const n = p * g, d = q * g, s = negatif ? "-" : "";
          return {
            enonce: "Simplifier la fraction $" + s + "\\dfrac{" + n + "}{" + d + "}$ pour obtenir une fraction irréductible.",
            reponse: (negatif ? -p : p) + "/" + q,
            correction: g === 1
              ? "Le plus grand diviseur commun de " + n + " et " + d + " est 1 : ces deux nombres n'ont pas d'autre diviseur commun, la fraction est déjà irréductible, donc $" + s + "\\dfrac{" + n + "}{" + d + "}$."
              : "Le plus grand diviseur commun de " + n + " et " + d + " est " + g + ". On divise le numérateur et le dénominateur par " + g + " : $" + s + "\\dfrac{" + n + " \\div " + g + "}{" + d + " \\div " + g + "} = " + s + "\\dfrac{" + p + "}{" + q + "}$."
          };
        }
        return {
          1: () => {
            const g = facile(1) ? 1 : choix([2, 3, 4, 5]);
            for (;;) { const q = ent(2, 9), p = premierAvec(q, q - 1); if (q * g <= 45) return exSimplifier(p, q, g); }
          },
          2: () => {
            const g = facile(2) ? 1 : ent(3, 9);
            for (;;) { const q = ent(3, 12), p = premierAvec(q, 2 * q - 1); if (p * g <= 108 && q * g <= 108) return exSimplifier(p, q, g); }
          },
          3: () => {
            for (;;) { const q = ent(4, 16), p = premierAvec(q, 2 * q - 1), g = ent(6, 15); if (p * g <= 465 && q * g <= 465) return exSimplifier(p, q, g, Math.random() < 0.5); }
          }
        };
      })()
    },
    {
      id: "comparer", chap: "frac1", titre: "Comparer deux fractions", format: "fraction",
      niveaux: {
        1: () => {
          for (;;) {
            const d = ent(2, 6), D = d * ent(2, 4), n1 = premierAvec(d, Math.floor(1.5 * d)), n2 = premierAvec(D, Math.floor(1.5 * D));
            if (n1 / d >= 1.5 || n2 / D >= 1.5 || Math.abs(n1 / d - n2 / D) < 1 / 12) continue;
            const [a, b] = melanger([[n1, d], [n2, D]]);
            return exComparer(a[0], a[1], b[0], b[1]);
          }
        },
        2: () => {
          for (;;) {
            const d1 = ent(3, 12), d2 = ent(3, 12);
            if (d1 === d2 || multiples(d1, d2)) continue;
            const n1 = premierAvec(d1, Math.floor(1.5 * d1)), n2 = premierAvec(d2, Math.floor(1.5 * d2));
            if (n1 / d1 >= 1.5 || n2 / d2 >= 1.5 || Math.abs(n1 / d1 - n2 / d2) < 0.1) continue;
            return exComparer(n1, d1, n2, d2);
          }
        },
        3: () => {
          for (;;) {
            const d1 = ent(3, 12), d2 = ent(3, 12);
            if (d1 === d2 || multiples(d1, d2)) continue;
            const n1 = premierAvec(d1, Math.floor(1.5 * d1)), n2 = premierAvec(d2, Math.floor(1.5 * d2)), ecart = Math.abs(n1 / d1 - n2 / d2);
            if (n1 / d1 >= 1.5 || n2 / d2 >= 1.5 || ecart < 1 / 60 || ecart > 1 / 3) continue;
            return exComparer(-n1, d1, -n2, d2);
          }
        }
      }
    },
    {
      id: "add-meme", chap: "frac1", titre: "Additionner ou soustraire des fractions de même dénominateur", format: "fraction",
      niveaux: {
        1: () => {
          const aSimplifier = Math.random() < 0.5;
          for (;;) {
            const c = ent(3, 12), n1 = premierAvec(c, c - 1), n2 = premierAvec(c, c - 1), s = n1 + n2;
            if (s % c === 0 || (pgcd(s, c) > 1) !== aSimplifier) continue;
            const k = calcul(n1, c, n2, c, false);
            return { enonce: enonceCalcul(n1, c, n2, c, false), reponse: k.reponse, correction: k.correction };
          }
        },
        2: () => {
          const aSimplifier = Math.random() < 0.75, moins = Math.random() < 0.5;
          for (;;) {
            const c = ent(4, 12), n1 = premierAvec(c, 2 * c - 1), n2 = premierAvec(c, 2 * c - 1), r = moins ? n1 - n2 : n1 + n2;
            if (r <= 0 || r % c === 0 || r > 3 * c || (pgcd(r, c) > 1) !== aSimplifier) continue;
            const k = calcul(n1, c, n2, c, moins);
            return { enonce: enonceCalcul(n1, c, n2, c, moins), reponse: k.reponse, correction: k.correction };
          }
        },
        3: () => {
          for (;;) {
            const c = ent(6, 20), s = [[-1, 1], [1, -1], [-1, -1]][ent(0, 2)], moins = Math.random() < 0.5;
            const n1 = s[0] * premierAvec(c, 2 * c - 1), n2 = s[1] * premierAvec(c, 2 * c - 1), r = moins ? n1 - n2 : n1 + n2;
            if (r === 0 || r % c === 0 || Math.abs(r) > 3 * c || pgcd(r, c) === 1) continue;
            const k = calcul(n1, c, n2, c, moins);
            return { enonce: enonceCalcul(n1, c, n2, c, moins), reponse: k.reponse, correction: k.correction };
          }
        }
      }
    },
    {
      id: "add-diff", chap: "frac1", titre: "Additionner ou soustraire des fractions de dénominateurs différents", format: "fraction",
      niveaux: {
        1: () => {
          const aSimplifier = Math.random() < 0.5;
          for (;;) {
            const b = ent(2, 6), d = b * ent(2, 4), n1 = premierAvec(b, 2 * b - 1), n2 = premierAvec(d, 2 * d - 1);
            const [x, y] = melanger([[n1, b], [n2, d]]), k = calcul(x[0], x[1], y[0], y[1], false);
            if (k.r % k.m === 0 || k.r > 3 * k.m || (pgcd(k.r, k.m) > 1) !== aSimplifier) continue;
            return { enonce: enonceCalcul(x[0], x[1], y[0], y[1], false), reponse: k.reponse, correction: k.correction };
          }
        },
        2: () => {
          const premiers = Math.random() < 0.25, moins = Math.random() < 0.5;
          for (;;) {
            const d1 = ent(2, 12), d2 = ent(2, 12);
            if (d1 === d2 || multiples(d1, d2) || (pgcd(d1, d2) === 1) !== premiers) continue;
            const n1 = premierAvec(d1, 2 * d1 - 1), n2 = premierAvec(d2, 2 * d2 - 1), k = calcul(n1, d1, n2, d2, moins);
            if (k.r <= 0 || k.r % k.m === 0 || k.r > 3 * k.m) continue;
            return { enonce: enonceCalcul(n1, d1, n2, d2, moins), reponse: k.reponse, correction: k.correction };
          }
        },
        3: () => {
          for (;;) {
            const [d1, d2] = melanger(choix([[4, 6], [6, 9], [4, 10], [6, 8], [6, 10], [8, 12], [9, 12], [10, 15], [12, 18]]));
            const s = [[-1, 1], [1, -1], [-1, -1]][ent(0, 2)], moins = Math.random() < 0.5;
            const n1 = s[0] * premierAvec(d1, 2 * d1 - 1), n2 = s[1] * premierAvec(d2, 2 * d2 - 1), k = calcul(n1, d1, n2, d2, moins);
            if (k.r === 0 || k.r % k.m === 0 || Math.abs(k.r) > 3 * k.m) continue;
            return { enonce: enonceCalcul(n1, d1, n2, d2, moins), reponse: k.reponse, correction: k.correction };
          }
        }
      }
    },
    {
      id: "situation-frac1", chap: "frac1", titre: "Situation avec des fractions", format: "fraction",
      niveaux: {
        1: () => { const [n1, d1, n2, d2] = memeDenominateur(4, 12); return exSituation(n1, d1, n2, d2, Math.random() < 0.5); },
        2: () => {
          if (Math.random() < 0.5) {
            for (;;) {
              const b = ent(2, 6), d = b * ent(2, 4), n1 = premierAvec(b, b - 1), n2 = premierAvec(d, d - 1);
              if (n1 / b + n2 / d >= 1) continue;
              const [x, y] = melanger([[n1, b], [n2, d]]);
              return exSituation(x[0], x[1], y[0], y[1], false);
            }
          }
          const [n1, d1, n2, d2] = memeDenominateur(6, 12);
          return exSituation(n1, d1, n2, d2, true);
        },
        3: () => {
          for (;;) {
            const [d1, d2] = melanger(choix([[3, 4], [4, 6], [3, 5], [6, 9], [4, 10], [6, 10], [5, 6], [3, 8], [4, 5], [6, 8], [5, 8], [2, 5], [4, 9]]));
            const n1 = premierAvec(d1, d1 - 1), n2 = premierAvec(d2, d2 - 1);
            if (n1 / d1 + n2 / d2 >= 1) continue;
            return exSituation(n1, d1, n2, d2, Math.random() < 0.4);
          }
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("4e", frac1);
})();
