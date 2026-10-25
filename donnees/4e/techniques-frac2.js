// Techniques d'entraînement de 4e : « Fractions : multiplication et division » (frac2).
// D'après propositions/referentiels/4e/frac2.json (lot 2) : les descriptions de niveau sont la spécification.
// format "fraction" : seule la forme irréductible est acceptée ; un résultat entier s'écrit « 2 » (réponse "2").
(function () {
  const { L, T, ent, choix, net, decimal, decimales, facile, pgcd, ppcm } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);

  // ---------- Fractions exactes [n, d] (d > 0) ----------
  const red = ([n, d]) => { const g = pgcd(n, d) || 1, s = d < 0 ? -1 : 1; return [(s * n) / g, (s * d) / g]; };
  const mul = (x, y) => red([x[0] * y[0], x[1] * y[1]]);
  const inv = (x) => red([x[1], x[0]]);
  const add = (x, y) => red([x[0] * y[1] + y[0] * x[1], x[1] * y[1]]);
  const sub = (x, y) => add(x, [-y[0], y[1]]);
  const chaine = (x) => { const [n, d] = red(x); return d === 1 ? String(n) : n + "/" + d; };
  // Écriture LaTeX : entier si d = 1 ; dans un calcul, une fraction négative est entre parenthèses
  const F = ([n, d]) => (d === 1 ? String(n) : (n < 0 ? "-" : "") + "\\dfrac{" + Math.abs(n) + "}{" + d + "}");
  const FP = (x) => (x[0] < 0 ? "\\left(" + F(x) + "\\right)" : F(x));
  const irreductible = (n, d) => pgcd(n, d) === 1;
  // Fraction irréductible tirée au hasard (numérateur de nMin à nMax, dénominateur de dMin à dMax), inférieure à 1 si demandé
  function fraction(nMin, nMax, dMin, dMax, moinsDeUn) {
    for (;;) {
      const n = ent(nMin, nMax), d = ent(dMin, dMax);
      if (n === d || !irreductible(n, d) || (moinsDeUn && n >= d)) continue;
      return [n, d];
    }
  }

  // Produit de deux fractions, rédigé comme au tableau (signe d'abord quand il y a des négatifs)
  function correctionProduit(x, y) {
    const neg = (x[0] < 0) + (y[0] < 0), ax = [Math.abs(x[0]), x[1]], ay = [Math.abs(y[0]), y[1]];
    const brut = [ax[0] * ay[0], ax[1] * ay[1]], r = red(brut);
    const calcul = "$" + F(ax) + " \\times " + F(ay) + " = \\dfrac{" + ax[0] + " \\times " + ay[0] + "}{" + ax[1] + " \\times " + ay[1] + "} = \\dfrac{" + brut[0] + "}{" + brut[1] + "}" +
      (r[0] !== brut[0] || r[1] !== brut[1] ? " = " + F(r) : "") + "$";
    if (!neg) return calcul + ".";
    return "Le produit est " + (neg === 2 ? "positif (deux facteurs négatifs). " : "négatif (un seul facteur négatif). ") + calcul +
      (neg === 1 ? ", donc le résultat est $" + F([-r[0], r[1]]) + "$." : ".");
  }
  const enonceCalcul = (latex, entier) => "Calculer $" + latex + "$ et donner le résultat sous la forme d'une fraction irréductible" + (entier ? " (ou d'un entier)." : ".");

  // Somme ou différence de deux fractions positives (ou d'un résultat de calcul), au même dénominateur
  function correctionSomme(x, y, moins) {
    const m = ppcm(x[1], y[1]), X = [x[0] * (m / x[1]), m], Y = [y[0] * (m / y[1]), m], r = moins ? sub(x, y) : add(x, y), brut = [moins ? X[0] - Y[0] : X[0] + Y[0], m];
    return "$" + F(x) + (moins ? " - " : " + ") + F(y) + (x[1] === y[1] ? "" : " = " + F(X) + (moins ? " - " : " + ") + F(Y)) + " = " + F(brut) +
      (red(brut)[1] !== m ? " = " + F(r) : "") + "$";
  }

  // ---------- Quantités ----------
  const QUANTITES = [
    { texte: (q, f) => "Un sac pèse " + T(q) + " kg. On en utilise les $" + f + "$. Quelle masse, en kg, utilise-t-on ?", unite: "kg" },
    { texte: (q, f) => "Un réservoir contient " + T(q) + " L. Les $" + f + "$ de son contenu sont consommés. Quel volume, en litres, est consommé ?", unite: "L" },
    { texte: (q, f) => "Un trajet mesure " + T(q) + " km. On en a déjà parcouru les $" + f + "$. Quelle distance, en km, a-t-on parcourue ?", unite: "km" },
    { texte: (q, f) => "Calculer les $" + f + "$ de " + T(q) + " cm.", unite: "cm" },
    { texte: (q, f) => "Calculer les $" + f + "$ de " + T(q) + " min.", unite: "min" }
  ];
  const ENTIERES = QUANTITES.concat([
    { texte: (q, f) => "Un livre a " + q + " pages. On en lit les $" + f + "$. Combien de pages lit-on ?", unite: "pages" },
    { texte: (q, f) => "Léa a " + q + " € dans sa tirelire. Elle en dépense les $" + f + "$. Combien d'euros dépense-t-elle ?", unite: "€" },
    { texte: (q, f) => "Un collège compte " + q + " élèves. Les $" + f + "$ d'entre eux sont demi-pensionnaires. Combien d'élèves sont demi-pensionnaires ?", unite: "élèves" }
  ]);
  function exFractionDe(a, b, q, liste) {
    const s = choix(liste), r = net((a * q) / b), f = "\\dfrac{" + a + "}{" + b + "}";
    return {
      enonce: s.texte(q, f), reponse: r, unite: s.unite,
      correction: "Prendre $" + f + "$ d'une quantité, c'est la multiplier par $" + f + "$ : $" + f + " \\times " + L(q) + " = \\dfrac{" + a + " \\times " + L(q) + "}{" + b + "} = " + L(r) + "$ " + s.unite + "."
    };
  }

  // ---------- Problèmes ----------
  const PROBLEMES = [
    { debut: (q) => "Léa a " + q + " € dans sa tirelire.", verbe: "Elle en dépense", utilise: "Combien d'euros a-t-elle dépensés", reste: "Combien d'euros lui reste-t-il", unite: "€" },
    { debut: (q) => "Un livre a " + q + " pages.", verbe: "Tom en lit", utilise: "Combien de pages a-t-il lues", reste: "Combien de pages lui reste-t-il à lire", unite: "pages" },
    { debut: (q) => "Un randonneur doit parcourir " + q + " km.", verbe: "Il en parcourt", utilise: "Quelle distance, en km, a-t-il parcourue", reste: "Quelle distance, en km, lui reste-t-il à parcourir", unite: "km" },
    { debut: (q) => "Une citerne contient " + q + " L d'eau.", verbe: "On en utilise", utilise: "Quel volume d'eau, en L, a-t-on utilisé", reste: "Quel volume d'eau, en L, reste-t-il", unite: "L" }
  ];
  const INVERSES = [
    { texte: (f, g, r) => "Un cycliste a parcouru les $" + f + "$ de son trajet, puis les $" + g + "$ du reste. Il lui reste " + r + " km à faire. Quelle est la longueur du trajet (en km) ?", unite: "km" },
    { texte: (f, g, r) => "On a utilisé les $" + f + "$ d'une citerne d'eau, puis les $" + g + "$ de ce qui restait. Il reste " + r + " L. Quelle était la contenance de la citerne (en L) ?", unite: "L" },
    { texte: (f, g, r) => "Léa a dépensé les $" + f + "$ de ses économies, puis les $" + g + "$ de ce qui restait. Il lui reste " + r + " €. Combien avait-elle au départ (en €) ?", unite: "€" }
  ];

  // ---------- Expressions ----------
  // Chaque forme : écriture, valeur, correction (priorités d'abord)
  function expression(forme, a, b, c, d) {
    const p = (x, y) => correctionProduit(x, y).replace(/\.$/, "");
    const q = (x, y) => "$" + F(x) + " \\div " + F(y) + " = " + F(x) + " \\times " + F(inv(y)) + "$, soit " + p(x, inv(y)).replace(/^\$/, "$");
    switch (forme) {
      case "a+bc": { const bc = mul(b, c), r = add(a, bc); return { latex: F(a) + " + " + F(b) + " \\times " + F(c), r: r, c: "La multiplication est prioritaire : " + p(b, c) + ". Puis l'addition : " + correctionSomme(a, bc, false) + "." }; }
      case "(a+b)c": { const s = add(a, b), r = mul(s, c); return { latex: "\\left(" + F(a) + " + " + F(b) + "\\right) \\times " + F(c), r: r, c: "On calcule d'abord la parenthèse : " + correctionSomme(a, b, false) + ". Puis le produit : " + p(s, c) + "." }; }
      case "(a-b)c": { const s = sub(a, b), r = mul(s, c); return { latex: "\\left(" + F(a) + " - " + F(b) + "\\right) \\times " + F(c), r: r, c: "On calcule d'abord la parenthèse : " + correctionSomme(a, b, true) + ". Puis le produit : " + p(s, c) + "." }; }
      case "ab-c": { const ab = mul(a, b), r = sub(ab, c); return { latex: F(a) + " \\times " + F(b) + " - " + F(c), r: r, c: "La multiplication est prioritaire : " + p(a, b) + ". Puis la soustraction : " + correctionSomme(ab, c, true) + "." }; }
      case "ab+c": { const ab = mul(a, b), r = add(ab, c); return { latex: F(a) + " \\times " + F(b) + " + " + F(c), r: r, c: "La multiplication est prioritaire : " + p(a, b) + ". Puis l'addition : " + correctionSomme(ab, c, false) + "." }; }
      case "a-b/c": { const bc = mul(b, inv(c)), r = sub(a, bc); return { latex: F(a) + " - " + F(b) + " \\div " + F(c), r: r, c: "La division est prioritaire : " + q(b, c) + ". Puis la soustraction : " + correctionSomme(a, bc, true) + "." }; }
      case "ab-c/d": { const ab = mul(a, b), cd = mul(c, inv(d)), r = sub(ab, cd); return { latex: F(a) + " \\times " + F(b) + " - " + F(c) + " \\div " + F(d), r: r, c: "Multiplication et division sont prioritaires. " + p(a, b) + " ; " + q(c, d) + ". Puis la soustraction : " + correctionSomme(ab, cd, true) + "." }; }
      case "(a-b)/c": { const s = sub(a, b), r = mul(s, inv(c)); return { latex: "\\left(" + F(a) + " - " + F(b) + "\\right) \\div " + F(c), r: r, c: "On calcule d'abord la parenthèse : " + correctionSomme(a, b, true) + ". Puis la division, c'est-à-dire la multiplication par l'inverse : " + q(s, c) + "." }; }
      case "a/b+cd": { const ab = mul(a, inv(b)), cd = mul(c, d), r = add(ab, cd); return { latex: F(a) + " \\div " + F(b) + " + " + F(c) + " \\times " + F(d), r: r, c: "Division et multiplication sont prioritaires. " + q(a, b) + " ; " + p(c, d) + ". Puis l'addition : " + correctionSomme(ab, cd, false) + "." }; }
      default: { const r = mul(a, b); return { latex: F(a) + " \\times " + F(b), r: r, c: correctionProduit(a, b) }; }
    }
  }

  const frac2 = [
    {
      id: "mult-frac", chap: "frac2", titre: "Multiplier deux fractions", format: "fraction",
      niveaux: {
        1: () => {
          const simple = facile(1);
          for (;;) {
            const x = fraction(1, 9, 2, 9, true), y = fraction(1, 9, 2, 9, true), brut = [x[0] * y[0], x[1] * y[1]], r = red(brut);
            if (r[1] === 1 || irreductible(...brut) !== simple) continue;
            return { enonce: enonceCalcul(F(x) + " \\times " + F(y), true), reponse: chaine(r), correction: correctionProduit(x, y) };
          }
        },
        2: () => {
          const simple = facile(2);
          for (;;) {
            let x = fraction(1, 15, 2, 15), y = fraction(1, 15, 2, 15);
            if (Math.random() < 2 / 3) { const s = choix([[-1, 1], [1, -1], [-1, -1]]); x = [s[0] * x[0], x[1]]; y = [s[1] * y[0], y[1]]; }
            const brut = [x[0] * y[0], x[1] * y[1]];
            if (irreductible(...brut) !== simple) continue;
            return { enonce: enonceCalcul(FP(x) + " \\times " + FP(y), true), reponse: chaine(red(brut)), correction: correctionProduit(x, y) };
          }
        },
        3: () => {
          for (;;) {
            let x = fraction(2, 40, 3, 40), y = fraction(2, 40, 3, 40);
            if (pgcd(x[0], y[1]) === 1 || pgcd(y[0], x[1]) === 1) continue;
            const r = mul(x, y);
            if (Math.abs(r[0]) > 99 || r[1] > 99) continue;
            x = [x[0] * choix([1, -1]), x[1]]; y = [y[0] * choix([1, -1]), y[1]];
            return { enonce: enonceCalcul(FP(x) + " \\times " + FP(y), true), reponse: chaine(mul(x, y)), correction: correctionProduit(x, y) };
          }
        }
      }
    },
    {
      id: "fraction-de", chap: "frac2", titre: "Prendre une fraction d'une quantité", format: "nombre",
      niveaux: {
        1: () => { const b = facile(1) ? 2 : choix([3, 4, 5, 10]); return exFractionDe(1, b, b * ent(2, Math.floor(100 / b)), ENTIERES); },
        2: () => {
          if (facile(2)) { const b = choix([2, 10]); return exFractionDe(1, b, b * ent(2, Math.floor(240 / b)), ENTIERES); }
          const b = choix([3, 4, 5, 6, 8, 10]);
          let a; do { a = ent(2, b - 1); } while (!irreductible(a, b));
          return exFractionDe(a, b, b * ent(2, Math.floor(240 / b)), ENTIERES);
        },
        3: () => {
          for (;;) {
            const [a, b] = fraction(2, 19, 3, 20, true), q = decimal(600, 1), r = (a * q) / b;
            if (q < 11.1 || decimales(net(r)) > 2 || Math.abs(r * 100 - Math.round(r * 100)) > 1e-6) continue;
            return exFractionDe(a, b, q, QUANTITES);
          }
        }
      }
    },
    {
      id: "inverse", chap: "frac2", titre: "Calculer l'inverse", format: "fraction",
      niveaux: (function () {
        function exInverse(x) {
          const i = inv(x), enonce = "Quel est l'inverse de $" + F(x) + "$ ? (fraction irréductible ou entier)";
          const correction = x[1] === 1
            ? "L'inverse d'un entier $n$ est $\\dfrac{1}{n}$. Ici : $" + F(i) + "$ ; on vérifie $" + FP(x) + " \\times " + FP(i) + " = 1$."
            : "On échange le numérateur et le dénominateur en gardant le signe : l'inverse de $" + F(x) + "$ est $" + F(i) + "$ ; on vérifie $" + FP(x) + " \\times " + FP(i) + " = 1$.";
          return { enonce: enonce, reponse: chaine(i), correction: correction };
        }
        return {
          1: () => {
            if (facile(1)) return exInverse([1, ent(2, 12)]);
            if (Math.random() < 0.4) return exInverse([ent(2, 12), 1]);
            return exInverse(fraction(2, 9, 2, 9));
          },
          2: () => {
            const s = choix([1, -1]);
            if (facile(2)) return exInverse([s, ent(2, 15)]);
            if (Math.random() < 0.4) return exInverse([s * ent(2, 15), 1]);
            const f = fraction(2, 15, 2, 15);
            return exInverse([s * f[0], f[1]]);
          },
          3: () => {
            const x = choix([0.1, 0.2, 0.25, 0.4, 0.5, 0.75, 0.8, 1.25, 1.2, 1.5, 1.6, 2.5, 3.5, 0.125, 0.6, 0.05, 0.04, 2.4, 2.25, 1.75]) * choix([1, -1]);
            const f = red([Math.round(x * 1000), 1000]), i = inv(f);
            return {
              enonce: "Quel est l'inverse de $" + L(x) + "$ ? (fraction irréductible ou entier)", reponse: chaine(i),
              correction: "On écrit d'abord le décimal sous forme de fraction : $" + L(x) + " = " + F(f) + "$. L'inverse s'obtient en échangeant numérateur et dénominateur : $" + F(i) + "$."
            };
          }
        };
      })()
    },
    {
      id: "div-frac", chap: "frac2", titre: "Diviser par une fraction", format: "fraction",
      niveaux: (function () {
        function exDivision(x, y) {
          const i = inv(y), r = mul(x, i);
          return {
            enonce: enonceCalcul(FP(x) + " \\div " + FP(y), true), reponse: chaine(r),
            correction: "Diviser par $" + FP(y) + "$ revient à multiplier par son inverse $" + FP(i) + "$. $" + FP(x) + " \\div " + FP(y) + " = " + FP(x) + " \\times " + FP(i) + "$. " + correctionProduit(x, i)
          };
        }
        const seSimplifie = (x, y) => !irreductible(x[0] * y[1], x[1] * y[0]);
        return {
          1: () => {
            const simple = facile(1);
            for (;;) {
              const x = fraction(1, 8, 2, 9, true), y = fraction(1, 8, 2, 9, true), r = mul(x, inv(y));
              if (r[1] === 1 || seSimplifie(x, y) === simple) continue;
              return exDivision(x, y);
            }
          },
          2: () => {
            const simple = facile(2), cas = Math.random();
            for (;;) {
              const signe = () => choix([1, -1]);
              let x, y;
              if (cas < 0.6) { const f = fraction(1, 15, 2, 15), g = fraction(1, 15, 2, 15); x = [signe() * f[0], f[1]]; y = [signe() * g[0], g[1]]; }
              else if (cas < 0.8) { const f = fraction(1, 15, 2, 15); x = [signe() * f[0], f[1]]; y = [ent(2, 12), 1]; }
              else { const g = fraction(1, 15, 2, 15); x = [signe() * ent(2, 12), 1]; y = [g[0], g[1]]; }
              if (seSimplifie(x, y) === simple) continue;
              return exDivision(x, y);
            }
          },
          3: () => {
            for (;;) {
              const f = fraction(2, 40, 3, 40), g = fraction(2, 40, 3, 40);
              if (pgcd(f[0], g[0]) === 1 || pgcd(f[1], g[1]) === 1) continue;
              const x = [choix([1, -1]) * f[0], f[1]], y = [choix([1, -1]) * g[0], g[1]], r = mul(x, inv(y));
              if (Math.abs(r[0]) > 99 || r[1] > 99) continue;
              return exDivision(x, y);
            }
          }
        };
      })()
    },
    {
      id: "expression", chap: "frac2", titre: "Calculer une expression avec des fractions", format: "fraction",
      niveaux: {
        1: () => {
          for (;;) {
            // Niveau 1 : un seul produit (3/5 + 1/6 × 2/3 était trop dur pour démarrer) ; « a + b × c » au niveau 2
            const forme = "produit", e = expression(forme, fraction(1, 5, 2, 6, true), fraction(1, 5, 2, 6, true), fraction(1, 5, 2, 6, true));
            return { enonce: enonceCalcul(e.latex), reponse: chaine(e.r), correction: e.c };
          }
        },
        2: () => {
          const forme = facile(2) ? "produit" : choix(["(a+b)c", "(a-b)c", "ab-c", "ab+c", "a+bc"]);
          for (;;) {
            const e = expression(forme, fraction(1, 8, 2, 9, true), fraction(1, 8, 2, 9, true), fraction(1, 8, 2, 9, true));
            // Résultat de dénominateur 36 au plus (73/84 était trop lourd)
            if (e.r[0] <= 0 || e.r[1] === 1 || e.r[1] > 36) continue;
            return { enonce: enonceCalcul(e.latex), reponse: chaine(e.r), correction: e.c };
          }
        },
        3: () => {
          const forme = choix(["a-b/c", "ab-c/d", "(a-b)/c", "a/b+cd"]);
          for (;;) {
            const f = () => fraction(1, 8, 2, 9, true), e = expression(forme, f(), f(), f(), f());
            if (e.r[0] === 0 || Math.abs(e.r[0]) > 99 || e.r[1] > 99) continue;
            // « ou d'un entier » toujours écrit au niveau 3, pour ne pas trahir un résultat entier
            return { enonce: enonceCalcul(e.latex, true), reponse: chaine(e.r), correction: e.c };
          }
        }
      }
    },
    {
      id: "situation-frac2", chap: "frac2", titre: "Problèmes avec des fractions", format: "nombre",
      niveaux: {
        1: () => {
          const moitie = facile(1), b = moitie ? 2 : choix([3, 4, 5, 10]), q = b * ent(2, Math.floor(120 / b)), s = choix(PROBLEMES), reste = !moitie && Math.random() < 0.5;
          const u = q / b, f = "\\dfrac{1}{" + b + "}";
          return {
            enonce: s.debut(q) + " " + s.verbe + " les $" + f + "$. " + (reste ? s.reste : s.utilise) + " ?", reponse: reste ? q - u : u, unite: s.unite,
            correction: "Quantité utilisée : $" + f + " \\times " + q + " = " + u + "$ " + s.unite + "." + (reste ? " Il reste : $" + q + " - " + u + " = " + (q - u) + "$ " + s.unite + "." : "")
          };
        },
        2: () => {
          const s = choix(PROBLEMES);
          if (facile(2)) {
            const q = 2 * ent(5, 120);
            return { enonce: s.debut(q) + " " + s.verbe + " la moitié. " + s.reste + " ?", reponse: q / 2, unite: s.unite, correction: "La moitié de " + q + " est $" + q + " \\div 2 = " + q / 2 + "$ ; il reste donc " + q / 2 + " " + s.unite + "." };
          }
          for (;;) {
            const [a, b] = fraction(1, 2, 2, 6, true), [c, d] = fraction(1, 2, 2, 6, true), q = ent(6, 240);
            const u1 = (a * q) / b, r1 = q - u1, u2 = (c * r1) / d, r2 = r1 - u2;
            if (!Number.isInteger(u1) || !Number.isInteger(u2)) continue;
            const reste = Math.random() < 0.5, f = "\\dfrac{" + a + "}{" + b + "}", g = "\\dfrac{" + c + "}{" + d + "}";
            return {
              enonce: s.debut(q) + " " + s.verbe + " d'abord les $" + f + "$, puis les $" + g + "$ de ce qui reste. " + (reste ? s.reste + " à la fin" : s.utilise + " en tout") + " ?",
              reponse: reste ? r2 : u1 + u2, unite: s.unite,
              correction: "Première étape : $" + f + " \\times " + q + " = " + u1 + "$ " + s.unite + " ; il reste $" + q + " - " + u1 + " = " + r1 + "$ " + s.unite + ". Deuxième étape : $" + g + " \\times " + r1 + " = " + u2 + "$ " + s.unite +
                (reste ? " ; il reste $" + r1 + " - " + u2 + " = " + r2 + "$ " + s.unite + "." : ". En tout : $" + u1 + " + " + u2 + " = " + (u1 + u2) + "$ " + s.unite + ".")
            };
          }
        },
        3: () => {
          for (;;) {
            const [a, b] = fraction(1, 5, 2, 8, true), [c, d] = fraction(1, 5, 2, 8, true), q = ent(20, 400);
            const r1 = q - (a * q) / b, r2 = r1 - (c * r1) / d;
            if (!Number.isInteger(r1) || !Number.isInteger(r2) || r2 < 5) continue;
            const s = choix(INVERSES), f = "\\dfrac{" + a + "}{" + b + "}", g = "\\dfrac{" + c + "}{" + d + "}";
            const k1 = red([b - a, b]), k = mul(k1, red([d - c, d]));
            return {
              enonce: s.texte(f, g, r2), reponse: q, unite: s.unite,
              correction: "Après la première étape, il reste $1 - " + f + " = " + F(k1) + "$ de la quantité. Après la seconde, il reste $" + F(k1) + " \\times \\left(1 - " + g + "\\right) = " + F(k1) + " \\times " + F(red([d - c, d])) +
                " = " + F(k) + "$ de la quantité. Donc $" + F(k) + " \\times Q = " + r2 + "$ et $Q = " + r2 + " \\div " + F(k) + " = " + q + "$ " + s.unite + "."
            };
          }
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("4e", frac2);
})();
