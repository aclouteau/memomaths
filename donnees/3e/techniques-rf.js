// Techniques d'entraînement de 3e : « Nombres relatifs et fractions » (rf).
// D'après propositions/referentiels/3e/rf.json (lot 3) : les descriptions de niveau sont la spécification.
// format "fraction" : seule la forme irréductible est acceptée ; un résultat entier s'écrit « 2 ».
(function () {
  const { L, ent, choix, net, nonNul, facile, pgcd } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const S = (x) => "(" + (x < 0 ? "" : "+") + x + ")";
  const P = (x) => (x < 0 ? "(" + x + ")" : String(x));

  // ---------- Fractions exactes [n, d] (d > 0) ----------
  const red = ([n, d]) => { const g = pgcd(n, d) || 1, s = d < 0 ? -1 : 1; return [(s * n) / g, (s * d) / g]; };
  const mul = (x, y) => red([x[0] * y[0], x[1] * y[1]]);
  const inv = (x) => red([x[1], x[0]]);
  const add = (x, y) => red([x[0] * y[1] + y[0] * x[1], x[1] * y[1]]);
  const sub = (x, y) => add(x, [-y[0], y[1]]);
  const chaine = (x) => { const [n, d] = red(x); return d === 1 ? String(n) : n + "/" + d; };
  const F = ([n, d]) => (d === 1 ? String(n) : (n < 0 ? "-" : "") + "\\dfrac{" + Math.abs(n) + "}{" + d + "}");
  const FP = (x) => (x[0] < 0 ? "\\left(" + F(x) + "\\right)" : F(x));
  const irreductible = (n, d) => pgcd(n, d) === 1;
  function fraction(nMin, nMax, dMin, dMax, moinsDeUn) {
    for (;;) { const n = ent(nMin, nMax), d = ent(dMin, dMax); if (n === d || !irreductible(n, d) || (moinsDeUn && n >= d)) continue; return [n, d]; }
  }
  const signe = (x) => [choix([1, -1]) * x[0], x[1]];
  const enonceCalcul = (latex, entier) => "Calculer $" + latex + "$ et donner le résultat sous la forme d'une fraction irréductible" + (entier ? " (ou d'un entier)." : ".");

  // Produit de deux fractions (signe d'abord quand il y a des négatifs)
  function correctionProduit(x, y) {
    const neg = (x[0] < 0) + (y[0] < 0), ax = [Math.abs(x[0]), x[1]], ay = [Math.abs(y[0]), y[1]];
    const brut = [ax[0] * ay[0], ax[1] * ay[1]], r = red(brut);
    const calcul = "$" + F(ax) + " \\times " + F(ay) + " = \\dfrac{" + ax[0] + " \\times " + ay[0] + "}{" + ax[1] + " \\times " + ay[1] + "} = \\dfrac{" + brut[0] + "}{" + brut[1] + "}" +
      (r[0] !== brut[0] || r[1] !== brut[1] ? " = " + F(r) : "") + "$";
    if (!neg) return calcul + ".";
    return "Le produit est " + (neg === 2 ? "positif (deux facteurs négatifs). " : "négatif (un seul facteur négatif). ") + calcul + (neg === 1 ? ", donc le résultat est $" + F([-r[0], r[1]]) + "$." : ".");
  }
  // Somme ou différence au même dénominateur, puis simplification
  function correctionSomme(x, y, moins) {
    const m = x[1] * y[1] / pgcd(x[1], y[1]), X = x[0] * (m / x[1]), Y = y[0] * (m / y[1]), brut = moins ? X - Y : X + Y, r = red([brut, m]);
    return "$" + FP(x) + (moins ? " - " : " + ") + FP(y) + (x[1] === y[1] && y[0] >= 0 ? "" : " = \\dfrac{" + X + "}{" + m + "}" + (moins ? " - " : " + ") + (Y < 0 ? "\\left(\\dfrac{" + Y + "}{" + m + "}\\right)" : "\\dfrac{" + Y + "}{" + m + "}")) +
      " = \\dfrac{" + X + (moins ? " - " : " + ") + P(Y) + "}{" + m + "} = " + F([brut, m]) + (r[1] !== m ? " = " + F(r) : "") + "$";
  }
  const quotient = (x, y) => "Diviser par $" + FP(y) + "$ revient à multiplier par son inverse $" + FP(inv(y)) + "$ : $" + FP(x) + " \\div " + FP(y) + " = " + FP(x) + " \\times " + FP(inv(y)) + "$. " + correctionProduit(x, inv(y));

  // ---------- Expressions ----------
  function expression(forme, a, b, c, d) {
    const p = (x, y) => correctionProduit(x, y).replace(/\.$/, "");
    const q = (x, y) => "$" + FP(x) + " \\div " + FP(y) + " = " + FP(x) + " \\times " + FP(inv(y)) + "$, soit " + p(x, inv(y));
    switch (forme) {
      case "a+bc": { const bc = mul(b, c); return { latex: F(a) + " + " + F(b) + " \\times " + F(c), r: add(a, bc), c: "La multiplication est prioritaire : " + p(b, c) + ". Puis l'addition : " + correctionSomme(a, bc, false) + "." }; }
      case "ab+c": { const ab = mul(a, b); return { latex: F(a) + " \\times " + F(b) + " + " + F(c), r: add(ab, c), c: "La multiplication est prioritaire : " + p(a, b) + ". Puis l'addition : " + correctionSomme(ab, c, false) + "." }; }
      case "ab-c": { const ab = mul(a, b); return { latex: F(a) + " \\times " + F(b) + " - " + F(c), r: sub(ab, c), c: "La multiplication est prioritaire : " + p(a, b) + ". Puis la soustraction : " + correctionSomme(ab, c, true) + "." }; }
      case "(a+b)c": { const s = add(a, b); return { latex: "\\left(" + F(a) + " + " + F(b) + "\\right) \\times " + F(c), r: mul(s, c), c: "On calcule d'abord la parenthèse : " + correctionSomme(a, b, false) + ". Puis le produit : " + p(s, c) + "." }; }
      case "(a-b)c": { const s = sub(a, b); return { latex: "\\left(" + F(a) + " - " + F(b) + "\\right) \\times " + F(c), r: mul(s, c), c: "On calcule d'abord la parenthèse : " + correctionSomme(a, b, true) + ". Puis le produit : " + p(s, c) + "." }; }
      case "a-b/c": { const bc = mul(b, inv(c)); return { latex: F(a) + " - " + F(b) + " \\div " + F(c), r: sub(a, bc), c: "La division est prioritaire : " + q(b, c) + ". Puis la soustraction : " + correctionSomme(a, bc, true) + "." }; }
      case "ab-c/d": { const ab = mul(a, b), cd = mul(c, inv(d)); return { latex: F(a) + " \\times " + F(b) + " - " + F(c) + " \\div " + F(d), r: sub(ab, cd), c: "Multiplication et division sont prioritaires. " + p(a, b) + " ; " + q(c, d) + ". Puis la soustraction : " + correctionSomme(ab, cd, true) + "." }; }
      case "a/b+cd": { const ab = mul(a, inv(b)), cd = mul(c, d); return { latex: F(a) + " \\div " + F(b) + " + " + F(c) + " \\times " + F(d), r: add(ab, cd), c: "Division et multiplication sont prioritaires. " + q(a, b) + " ; " + p(c, d) + ". Puis l'addition : " + correctionSomme(ab, cd, false) + "." }; }
      case "(a-b)/c": { const s = sub(a, b); return { latex: "\\left(" + F(a) + " - " + F(b) + "\\right) \\div " + F(c), r: mul(s, inv(c)), c: "On calcule d'abord la parenthèse : " + correctionSomme(a, b, true) + ". Puis la division : " + q(s, c) + "." }; }
      case "barre-somme": { const s = add(a, b); return { latex: "\\dfrac{" + F(a) + " + " + F(b) + "}{" + F(c) + "}", r: mul(s, inv(c)), c: "La grande barre signifie une division : on calcule d'abord le numérateur, " + correctionSomme(a, b, false) + ". Puis la division : " + q(s, c) + "." }; }
      case "barre-diff": { const s = sub(b, c); return { latex: "\\dfrac{" + F(a) + "}{" + F(b) + " - " + F(c) + "}", r: mul(a, inv(s)), c: "La grande barre signifie une division : on calcule d'abord le dénominateur, " + correctionSomme(b, c, true) + ". Puis la division : " + q(a, s) + "." }; }
      default: return { latex: F(a) + " \\times " + F(b), r: mul(a, b), c: correctionProduit(a, b) };
    }
  }

  // ---------- Signe d'un produit ou d'un quotient ----------
  function correctionSigne(neg, puissances) {
    return (puissances ? "On regarde le signe de chaque terme (une puissance de nombre négatif est négative si l'exposant est impair, positive s'il est pair) : " + puissances + ". Il y a " : "Il y a ") +
      neg + (puissances ? " terme" + (neg > 1 ? "s" : "") + " négatif" + (neg > 1 ? "s" : "") : " facteur" + (neg > 1 ? "s" : "") + " négatif" + (neg > 1 ? "s" : "")) +
      (puissances ? "" : ". Ce nombre est " + (neg % 2 ? "impair" : "pair")) + ", donc le résultat est " + (neg % 2 ? "négatif." : "positif.");
  }

  const rf = [
    {
      id: "relatifs-calcul", chap: "rf", titre: "Calculs avec des nombres relatifs", format: "nombre",
      niveaux: {
        1: () => {
          const positifs = facile(1);
          for (;;) {
            const a = ent(1, 30) * (positifs ? 1 : choix([1, -1])), b = ent(1, 30) * (positifs ? 1 : choix([1, -1])), moins = Math.random() < 0.5, r = moins ? a - b : a + b;
            if ((!positifs && a > 0 && b > 0) || a === -b && !moins || (moins && a === b) || r === 0) continue;
            const b2 = moins ? -b : b;
            const regle = (a < 0) === (b2 < 0) ? "même signe : on additionne les distances à zéro et on garde le signe commun."
              : "signes contraires : on soustrait les distances à zéro et on garde le signe de celui qui est le plus loin de 0.";
            return {
              enonce: "Calculer $" + S(a) + (moins ? " - " : " + ") + S(b) + "$.", reponse: r,
              correction: (moins ? "Soustraire, c'est ajouter l'opposé : $" + S(a) + " - " + S(b) + " = " + S(a) + " + " + S(b2) + "$. Puis, " : "Addition : ") + regle + " $" + S(a) + " + " + S(b2) + " = " + r + "$."
            };
          }
        },
        2: () => {
          const positifs = facile(2);
          for (;;) {
            const x = ent(2, 12) * (positifs ? 1 : choix([1, -1])), y = ent(2, 12) * (positifs ? 1 : choix([1, -1]));
            if (!positifs && x > 0 && y > 0) continue;
            const signeTexte = (x < 0) === (y < 0) ? "même signe : le " : "signes contraires : le ";
            if (Math.random() < 0.5) return { enonce: "Calculer $" + P(x) + " \\times " + P(y) + "$.", reponse: x * y, correction: "Règle des signes : " + signeTexte + "produit est " + (x * y > 0 ? "positif" : "négatif") + ". $" + P(x) + " \\times " + P(y) + " = " + x * y + "$." };
            const a = x * y;
            return { enonce: "Calculer $" + P(a) + " \\div " + P(x) + "$.", reponse: y, correction: "Règle des signes : " + ((a < 0) === (x < 0) ? "même signe : le " : "signes contraires : le ") + "quotient est " + (y > 0 ? "positif" : "négatif") + ". $" + P(a) + " \\div " + P(x) + " = " + y + "$." };
          }
        },
        3: () => {
          for (;;) {
            const v = () => ent(2, 9) * choix([1, -1]), a = v(), b = v(), c = v(), d = v(), forme = ent(1, 6);
            let latex, r, corr;
            if (forme === 1) { r = a + b * c; latex = a + " + " + P(b) + " \\times " + P(c); corr = "La multiplication est prioritaire : $" + P(b) + " \\times " + P(c) + " = " + b * c + "$. Puis $" + a + " + " + P(b * c) + " = " + r + "$."; }
            else if (forme === 2) { r = a - b * c; latex = a + " - " + P(b) + " \\times " + P(c); corr = "La multiplication est prioritaire : $" + P(b) + " \\times " + P(c) + " = " + b * c + "$. Puis $" + a + " - " + P(b * c) + " = " + r + "$."; }
            else if (forme === 3) { r = a * b - c * d; latex = P(a) + " \\times " + P(b) + " - " + P(c) + " \\times " + P(d); corr = "Les multiplications sont prioritaires : $" + P(a) + " \\times " + P(b) + " = " + a * b + "$ et $" + P(c) + " \\times " + P(d) + " = " + c * d + "$. Puis $" + a * b + " - " + P(c * d) + " = " + r + "$."; }
            else if (forme === 4) { r = (a - b) * c; latex = "(" + a + " - " + P(b) + ") \\times " + P(c); corr = "On calcule d'abord la parenthèse : $" + a + " - " + P(b) + " = " + (a - b) + "$. Puis $" + P(a - b) + " \\times " + P(c) + " = " + r + "$."; }
            else if (forme === 5) { const n = -Math.abs(a); r = n * n + b; latex = "(" + n + ")^{2} + " + P(b); corr = "La puissance est prioritaire : $(" + n + ")^{2} = " + n * n + "$. Puis $" + n * n + " + " + P(b) + " = " + r + "$."; }
            else { const n = b; r = a + n * n * n; latex = a + " + " + P(n) + "^{3}"; corr = "La puissance est prioritaire : $" + P(n) + "^{3} = " + n * n * n + "$. Puis $" + a + " + " + P(n * n * n) + " = " + r + "$."; }
            // Aucun cas facile : au moins un nombre négatif dans le calcul
            if (r === 0 || Math.abs(r) > 99 || !/\(-|^-| -\d/.test(latex)) continue;
            return { enonce: "Calculer $" + latex + "$.", reponse: r, correction: corr };
          }
        }
      }
    },
    {
      id: "signe-produit", chap: "rf", titre: "Signe d'un produit ou d'un quotient", format: "signe",
      niveaux: {
        1: () => {
          const positifs = facile(1);
          for (;;) {
            const f = [ent(2, 20), ent(2, 20), ent(2, 20)].map((x) => x * (positifs ? 1 : choix([1, -1]))), neg = f.filter((x) => x < 0).length;
            if (!positifs && neg === 0) continue;
            return { enonce: "Sans calculer, donner le signe de $" + f.map(P).join(" \\times ") + "$.", reponse: neg % 2 ? -1 : 1, correction: correctionSigne(neg) };
          }
        },
        2: () => {
          const positifs = facile(2);
          for (;;) {
            const n = ent(4, 5), f = Array.from({ length: n }, () => ent(2, 20) * (positifs ? 1 : choix([1, -1]))), neg = f.filter((x) => x < 0).length;
            if (!positifs && neg === 0) continue;
            const ops = Array.from({ length: n - 1 }, () => choix([" \\times ", " \\div "]));
            return { enonce: "Sans calculer, donner le signe de $" + P(f[0]) + f.slice(1).map((x, i) => ops[i] + P(x)).join("") + "$.", reponse: neg % 2 ? -1 : 1, correction: correctionSigne(neg) };
          }
        },
        3: () => {
          for (;;) {
            const n = ent(3, 4), t = Array.from({ length: n }, () => ({ b: ent(2, 9) * choix([1, -1]), e: ent(1, 6) }));
            if (!t.some((x) => x.b < 0)) continue;
            const ecrire = (x) => (x.b < 0 ? "(" + x.b + ")" : String(x.b)) + (x.e > 1 ? "^{" + x.e + "}" : "");
            const negatif = (x) => x.b < 0 && x.e % 2 === 1, neg = t.filter(negatif).length;
            const ops = Array.from({ length: n - 1 }, () => choix([" \\times ", " \\div "]));
            return {
              enonce: "Sans calculer, donner le signe de $" + ecrire(t[0]) + t.slice(1).map((x, i) => ops[i] + ecrire(x)).join("") + "$.", reponse: neg % 2 ? -1 : 1,
              correction: correctionSigne(neg, t.map((x) => "$" + ecrire(x) + "$ est " + (negatif(x) ? "négatif" : "positif")).join(", "))
            };
          }
        }
      }
    },
    {
      id: "fractions-somme", chap: "rf", titre: "Additionner et soustraire des fractions", format: "fraction",
      niveaux: {
        1: () => {
          const meme = facile(1);
          for (;;) {
            const d1 = ent(2, 9), d2 = meme ? d1 : d1 * choix([2, 3]);
            if (d2 > 18) continue;
            const x = [ent(1, d1 - 1), d1], y = [ent(1, d2 - 1), d2];
            if (!irreductible(...x) || !irreductible(...y) || (meme && x[0] === y[0])) continue;
            const [u, v] = melanger([x, y]), moins = Math.random() < 0.5, r = moins ? sub(u, v) : add(u, v);
            if (r[0] <= 0) continue;
            return { enonce: enonceCalcul(F(u) + (moins ? " - " : " + ") + F(v), true), reponse: chaine(r), correction: "On met les fractions au même dénominateur, puis on additionne ou soustrait les numérateurs, enfin on simplifie. " + correctionSomme(u, v, moins) + "." };
          }
        },
        2: () => {
          const meme = facile(2);
          for (;;) {
            const [d1, d2] = meme ? (() => { const d = ent(3, 9); return [d, d]; })() : melanger(choix([[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [3, 7], [2, 7], [5, 6], [4, 7], [5, 8], [3, 8], [2, 9], [4, 9], [5, 9], [7, 8]]));
            const x = signe([ent(1, 8), d1]), y = signe([ent(1, 8), d2]);
            if (!irreductible(...x) || !irreductible(...y) || (x[0] > 0 && y[0] > 0)) continue;
            const moins = Math.random() < 0.5, r = moins ? sub(x, y) : add(x, y);
            if (r[0] === 0 || r[1] > 36) continue;
            return { enonce: enonceCalcul(F(x) + (moins ? " - " : " + ") + FP(y), true), reponse: chaine(r), correction: "On met les fractions au même dénominateur, puis on additionne ou soustrait les numérateurs, enfin on simplifie. " + correctionSomme(x, y, moins) + "." };
          }
        },
        3: () => {
          for (;;) {
            let x, y;
            if (Math.random() < 0.25) { x = [nonNul(-4, 4), 1]; const d = ent(3, 12); y = signe([ent(1, 2 * d), d]); }
            else { const [d1, d2] = melanger(choix([[6, 8], [4, 6], [6, 9], [8, 12], [10, 15], [12, 18], [6, 10], [9, 12], [14, 21], [10, 25], [12, 16], [15, 20], [8, 20], [6, 15], [12, 20]])); x = signe([ent(1, 2 * d1), d1]); y = signe([ent(1, 2 * d2), d2]); }
            if (!irreductible(...x) || !irreductible(...y)) continue;
            const moins = Math.random() < 0.5, r = moins ? sub(x, y) : add(x, y);
            if (!moins && x[0] > 0 && y[0] > 0) continue;
            // Dénominateur du résultat de 40 au plus (−47/42 était trop lourd)
            if (r[0] === 0 || Math.abs(r[0]) > 99 || r[1] > 40) continue;
            return { enonce: enonceCalcul(F(x) + (moins ? " - " : " + ") + FP(y), true), reponse: chaine(r), correction: "On met les fractions au même dénominateur, puis on additionne ou soustrait les numérateurs, enfin on simplifie. " + correctionSomme(x, y, moins) + "." };
          }
        }
      }
    },
    {
      id: "fractions-produit-quotient", chap: "rf", titre: "Multiplier et diviser des fractions", format: "fraction",
      niveaux: {
        1: () => {
          const simple = facile(1);
          for (;;) {
            const x = fraction(1, 8, 2, 9, true), y = fraction(1, 8, 2, 9, true), div = Math.random() < 0.5, z = div ? inv(y) : y;
            const brut = [x[0] * z[0], x[1] * z[1]], r = red(brut);
            if (r[1] === 1 || irreductible(...brut) !== simple) continue;
            return { enonce: enonceCalcul(F(x) + (div ? " \\div " : " \\times ") + F(y), true), reponse: chaine(r), correction: div ? quotient(x, y) : correctionProduit(x, y) };
          }
        },
        2: () => {
          const simple = facile(2);
          for (;;) {
            const x = signe(fraction(1, 15, 2, 15)), y = signe(fraction(1, 15, 2, 15)), div = Math.random() < 0.5, z = div ? inv(y) : y;
            const brut = [x[0] * z[0], x[1] * z[1]], r = red(brut);
            if (irreductible(...brut) !== simple || Math.abs(r[0]) > 99 || r[1] > 99) continue;
            return { enonce: enonceCalcul(FP(x) + (div ? " \\div " : " \\times ") + FP(y), true), reponse: chaine(r), correction: div ? quotient(x, y) : correctionProduit(x, y) };
          }
        },
        3: () => {
          for (;;) {
            const x = signe(fraction(2, 30, 3, 30)), y = signe(fraction(2, 30, 3, 30)), div = Math.random() < 0.5, z = div ? inv(y) : y;
            // Deux simplifications possibles (en croix)
            if (pgcd(x[0], z[1]) === 1 || pgcd(z[0], x[1]) === 1) continue;
            const r = mul(x, z);
            if (Math.abs(r[0]) > 99 || r[1] > 99) continue;
            if (div && Math.random() < 0.6) {
              return {
                enonce: enonceCalcul("\\dfrac{" + F(x) + "}{" + F(y) + "}", true), reponse: chaine(r),
                correction: "La grande barre signifie une division : $\\dfrac{" + F(x) + "}{" + F(y) + "} = " + FP(x) + " \\div " + FP(y) + "$. " + quotient(x, y)
              };
            }
            return { enonce: enonceCalcul(FP(x) + (div ? " \\div " : " \\times ") + FP(y), true), reponse: chaine(r), correction: div ? quotient(x, y) : correctionProduit(x, y) };
          }
        }
      }
    },
    {
      id: "fractions-expression", chap: "rf", titre: "Calculs mêlant les quatre opérations", format: "fraction",
      niveaux: {
        1: () => {
          // Niveau 1 : produit, ou somme avec un produit dont le résultat garde un petit dénominateur commun
          const forme = facile(1) || Math.random() < 0.5 ? "produit" : choix(["a+bc", "ab+c", "ab-c"]);
          for (;;) {
            const f = () => fraction(1, 5, 2, 6, true), e = expression(forme, f(), f(), f());
            if (e.r[0] <= 0 || e.r[1] === 1 || e.r[1] > 24) continue;
            return { enonce: enonceCalcul(e.latex), reponse: chaine(e.r), correction: e.c };
          }
        },
        2: () => {
          const forme = facile(2) ? "produit" : choix(["(a+b)c", "(a-b)c", "a-b/c", "a+bc", "ab-c"]);
          for (;;) {
            const f = () => fraction(1, 8, 2, 9, true), e = expression(forme, f(), f(), f());
            // Résultat de dénominateur 36 au plus (1/63 était trop lourd)
            if (e.r[0] <= 0 || e.r[1] === 1 || e.r[1] > 36) continue;
            return { enonce: enonceCalcul(e.latex), reponse: chaine(e.r), correction: e.c };
          }
        },
        3: () => {
          const forme = choix(["ab-c/d", "a/b+cd", "(a-b)/c", "a-b/c", "(a-b)c", "barre-somme", "barre-diff"]);
          for (;;) {
            const f = () => fraction(1, 8, 2, 9, true), a = Math.random() < 0.4 ? (() => { const x = f(); return [-x[0], x[1]]; })() : f();
            let e;
            try { e = expression(forme, a, f(), f(), f()); } catch (err) { continue; }
            if (!e.r[1] || e.r[0] === 0 || e.r[1] === 1 || Math.abs(e.r[0]) > 99 || e.r[1] > 99) continue;
            return { enonce: enonceCalcul(e.latex, true), reponse: chaine(e.r), correction: e.c };
          }
        }
      }
    },
    {
      id: "fractions-partage", chap: "rf", titre: "Problèmes de partage avec des fractions", format: "fraction",
      niveaux: (function () {
        const objet = () => choix(["du gâteau", "de la tarte", "de la pizza"]);
        function deuxParts(dMin, dMax, meme) {
          for (;;) {
            const d1 = ent(dMin, dMax), d2 = meme ? d1 : ent(dMin, dMax), x = [ent(1, d1 - 1), d1], y = [ent(1, d2 - 1), d2];
            if (!irreductible(...x) || !irreductible(...y) || (!meme && d1 === d2)) continue;
            const s = add(x, y);
            if (s[0] >= s[1]) continue;
            return [x, y, s];
          }
        }
        return {
          1: () => {
            const [x, y, s] = deuxParts(2, 8, facile(1)), o = objet();
            return { enonce: "Léa mange $" + F(x) + "$ " + o + " et Tom en mange $" + F(y) + "$. Quelle fraction " + o + " ont-ils mangée à eux deux ? (fraction irréductible)", reponse: chaine(s), correction: "On additionne les deux fractions : " + correctionSomme(x, y, false) + "." };
          },
          2: () => {
            const [x, y, s] = deuxParts(3, 10, facile(2)), o = objet(), r = sub([1, 1], s);
            return {
              enonce: "Léa mange $" + F(x) + "$ " + o + " et Tom en mange $" + F(y) + "$. Quelle fraction " + o + " reste-t-il ? (fraction irréductible)", reponse: chaine(r),
              correction: "Part mangée : " + correctionSomme(x, y, false) + ". Il reste $1 - " + F(s) + " = " + F(r) + "$."
            };
          },
          3: () => {
            for (;;) {
              const x = fraction(1, 7, 2, 8, true), y = fraction(1, 7, 2, 8, true), reste1 = sub([1, 1], x), part2 = mul(y, reste1), reste = sub(reste1, part2), utilise = add(x, part2);
              if (reste[0] <= 0) continue;
              const demandeReste = Math.random() < 0.5;
              const c = choix([["Un cycliste parcourt", "de son trajet", "Quelle fraction de son trajet lui reste-t-il à parcourir ?", "Quelle fraction de son trajet a-t-il parcourue en tout ?"],
                ["Une famille dépense", "de son budget de vacances pour le logement", "Quelle fraction du budget reste-t-il ?", "Quelle fraction du budget a-t-elle dépensée en tout ?"]]);
              const deuxieme = c[0] === "Un cycliste parcourt" ? "puis les $" + F(y) + "$ de ce qui reste" : "puis les $" + F(y) + "$ de ce qui reste pour les repas";
              return {
                enonce: c[0] + " les $" + F(x) + "$ " + c[1] + ", " + deuxieme + ". " + (demandeReste ? c[2] : c[3]) + " (fraction irréductible)",
                reponse: chaine(demandeReste ? reste : utilise),
                correction: "Après la première étape, il reste $1 - " + F(x) + " = " + F(reste1) + "$. Deuxième étape : $" + F(y) + "$ de ce reste, soit $" + F(y) + " \\times " + F(reste1) + " = " + F(part2) + "$. " +
                  (demandeReste ? "Il reste " + correctionSomme(reste1, part2, true) + "." : "En tout : " + correctionSomme(x, part2, false) + ".")
              };
            }
          }
        };
      })()
    }
  ];

  Savoirs.enregistrerTechniques("3e", rf);
})();
