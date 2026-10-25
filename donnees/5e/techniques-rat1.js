// Techniques d'entraînement de 5e : « Nombres rationnels : fractions, pourcentages » (rat1).
// D'après propositions/referentiels/5e/rat1.json (lot 5) : les descriptions de niveau sont la spécification.
(function () {
  const { L, T, ent, choix, net, decimal, facile, pgcd, ppcm } = Savoirs.calculsOutils;
  const PC = "\\,\\%";
  // Fraction irréductible p/q tirée au hasard (q ≥ 2)
  function irreductible(pMin, pMax, qMin, qMax) {
    for (;;) { const p = ent(pMin, pMax), q = ent(qMin, qMax); if (pgcd(p, q) === 1) return [p, q]; }
  }
  function simplifier(p, q, k) {
    const a = p * k, b = q * k;
    return { enonce: "Donner la forme irréductible de $\\dfrac{" + a + "}{" + b + "}$.", reponse: q === 1 ? String(p) : p + "/" + q, correction: "$" + a + "$ et $" + b + "$ sont divisibles par $" + k + "$ : $\\dfrac{" + a + "}{" + b + "} = \\dfrac{" + a + " \\div " + k + "}{" + b + " \\div " + k + "} = " + (q === 1 ? p : "\\dfrac{" + p + "}{" + q + "}") + "$." };
  }
  // Décimal → fraction irréductible
  function decimalFraction(x, chiffres) {
    const p = Math.pow(10, chiffres), n = Math.round(x * p), g = pgcd(n, p);
    return { enonce: "Écrire $" + L(x) + "$ sous la forme d'une fraction irréductible.", reponse: n / g + "/" + p / g, correction: "$" + L(x) + " = \\dfrac{" + n + "}{" + L(p) + "}$" + (g > 1 ? ". On simplifie par $" + g + "$ : $\\dfrac{" + n + "}{" + L(p) + "} = \\dfrac{" + n / g + "}{" + p / g + "}$." : ", et cette fraction est irréductible.") };
  }
  function versDecimal(dens, maxNum) {
    const b = choix(dens);
    let a; do { a = ent(1, maxNum(b)); } while (a % b === 0);
    const r = net(a / b);
    return { enonce: "Écrire $\\dfrac{" + a + "}{" + b + "}$ sous forme décimale.", reponse: r, correction: "$\\dfrac{" + a + "}{" + b + "} = " + a + " \\div " + b + " = " + L(r) + "$." };
  }
  function comparer(a, b, c, d) {
    const g = a * d < c * b ? "<" : ">", f1 = "\\dfrac{" + a + "}{" + b + "}", f2 = "\\dfrac{" + c + "}{" + d + "}", fin = "on écrit $" + f1 + " " + g + " " + f2 + "$.";
    if (b === d) return { g: g, texte: "Les deux fractions ont le même dénominateur $" + b + "$ : la plus grande est celle qui a le plus grand numérateur. Comme $" + a + " " + g + " " + c + "$, " + fin };
    if (a === c) return { g: g, texte: "Les deux fractions ont le même numérateur $" + a + "$ : la plus grande est celle qui a le plus petit dénominateur. Comme $" + b + (g === "<" ? " > " : " < ") + d + "$, " + fin };
    const m = ppcm(b, d), n1 = a * m / b, n2 = c * m / d;
    return { g: g, texte: "Dénominateur commun $" + m + "$ : $" + f1 + " = " + (m === b ? f1 : "\\dfrac{" + n1 + "}{" + m + "}") + "$ et $" + f2 + " = " + (m === d ? f2 : "\\dfrac{" + n2 + "}{" + m + "}") + "$. Comme $" + n1 + " " + g + " " + n2 + "$, " + fin };
  }
  function exComparer(a, b, c, d) {
    const r = comparer(a, b, c, d);
    return { enonce: "Compléter par $<$ ou $>$ : $\\dfrac{" + a + "}{" + b + "} \\ldots \\dfrac{" + c + "}{" + d + "}$.", reponse: r.g, correction: r.texte };
  }
  function memeDenominateur(dMin, dMax) {
    const d = ent(dMin, dMax);
    let a, c; do { a = ent(1, 2 * d); c = ent(1, 2 * d); } while (a === c);
    return exComparer(a, d, c, d);
  }
  const pourcentDe = (p, n) => { const r = net(p * n / 100); return { enonce: choix(["Calculer $" + p + PC + "$ de $" + L(n) + "$.", "Quel est le nombre égal à $" + p + PC + "$ de $" + L(n) + "$ ?"]), reponse: r, correction: "$" + p + PC + " = \\dfrac{" + p + "}{100}$ donc $" + p + PC + "$ de $" + L(n) + "$ vaut $\\dfrac{" + p + "}{100} \\times " + L(n) + " = " + L(r) + "$." }; };
  function fractionDe(a, b, n) {
    const part = n / b;
    if (a === 1) return { enonce: "Calculer " + (b === 2 ? "la moitié de $" + n + "$." : "$\\dfrac{1}{" + b + "}$ de $" + n + "$."), reponse: part, correction: "Prendre " + (b === 2 ? "la moitié" : "$\\dfrac{1}{" + b + "}$") + " de $" + n + "$, c'est le diviser par $" + b + "$ : $" + n + " \\div " + b + " = " + part + "$." };
    return { enonce: "Calculer les $\\dfrac{" + a + "}{" + b + "}$ de $" + n + "$.", reponse: a * part, correction: "On divise $" + n + "$ par $" + b + "$ : $" + n + " \\div " + b + " = " + part + "$, puis on multiplie par $" + a + "$ : $" + part + " \\times " + a + " = " + a * part + "$." };
  }

  const rat1 = [
    {
      id: "rat-simplifier", chap: "rat1", titre: "Simplifier une fraction", format: "fraction",
      niveaux: {
        1: () => { const k = facile(1) ? 10 : ent(2, 5); for (;;) { const [p, q] = irreductible(1, 9, 2, 9); if (p * k <= 120 && q * k <= 120) return simplifier(p, q, k); } },
        2: () => { const k = ent(6, 12); if (facile(2)) return simplifier(ent(2, 15), 1, k); const [p, q] = irreductible(1, 15, 2, 12); return simplifier(p, q, k); },
        3: () => { const k = choix([12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 28, 30, 33, 35, 36, 45]), [p, q] = irreductible(2, 20, 3, 16); return simplifier(p, q, k); }
      }
    },
    {
      id: "rat-fractions-egales", chap: "rat1", titre: "Fractions égales", format: "nombre",
      niveaux: {
        1: () => {
          const k = facile(1) ? 10 : ent(2, 5), [p, q] = irreductible(1, 9, 2, 9);
          if (Math.random() < 0.5) return { enonce: "Compléter l'égalité : $\\dfrac{" + p + "}{" + q + "} = \\dfrac{" + p * k + "}{\\square}$.", reponse: q * k, correction: "On passe de $" + p + "$ à $" + p * k + "$ en multipliant par $" + k + "$. On multiplie aussi le dénominateur par $" + k + "$ : $" + q + " \\times " + k + " = " + q * k + "$." };
          return { enonce: "Compléter l'égalité : $\\dfrac{" + p + "}{" + q + "} = \\dfrac{\\square}{" + q * k + "}$.", reponse: p * k, correction: "On passe de $" + q + "$ à $" + q * k + "$ en multipliant par $" + k + "$. On multiplie aussi le numérateur par $" + k + "$ : $" + p + " \\times " + k + " = " + p * k + "$." };
        },
        2: () => {
          if (facile(2)) { const q = choix([2, 4, 5, 10, 20, 25, 50]), k = 100 / q; let p; do { p = ent(1, q - 1); } while (pgcd(p, q) !== 1); return { enonce: "Compléter l'égalité : $\\dfrac{" + p + "}{" + q + "} = \\dfrac{\\square}{100}$.", reponse: p * k, correction: "On passe de $" + q + "$ à $100$ en multipliant par $" + k + "$. On multiplie aussi le numérateur : $" + p + " \\times " + k + " = " + p * k + "$." }; }
          const k = ent(6, 12), [p, q] = irreductible(1, 15, 2, 12);
          if (Math.random() < 0.5) return { enonce: "Compléter l'égalité : $\\dfrac{" + p + "}{" + q + "} = \\dfrac{\\square}{" + q * k + "}$.", reponse: p * k, correction: "On passe de $" + q + "$ à $" + q * k + "$ en multipliant par $" + k + "$. On multiplie aussi le numérateur : $" + p + " \\times " + k + " = " + p * k + "$." };
          return { enonce: "Compléter l'égalité : $\\dfrac{" + p * k + "}{" + q * k + "} = \\dfrac{\\square}{" + q + "}$.", reponse: p, correction: "On passe de $" + q * k + "$ à $" + q + "$ en divisant par $" + k + "$. On divise aussi le numérateur : $" + p * k + " \\div " + k + " = " + p + "$." };
        },
        3: () => {
          if (Math.random() < 0.5) { const k = ent(3, 12), [p, q] = irreductible(1, 12, 2, 12); return { enonce: "Compléter l'égalité : $\\dfrac{" + p + "}{" + q + "} = \\dfrac{" + p * k + "}{\\square}$.", reponse: q * k, correction: "On passe de $" + p + "$ à $" + p * k + "$ en multipliant par $" + k + "$ ($" + p * k + " \\div " + p + " = " + k + "$). On multiplie aussi le dénominateur : $" + q + " \\times " + k + " = " + q * k + "$." }; }
          let k1, k2; do { k1 = ent(2, 6); k2 = ent(2, 6); } while (k1 === k2);
          const [p, q] = irreductible(1, 9, 2, 9);
          return { enonce: "Compléter l'égalité : $\\dfrac{" + p * k1 + "}{" + q * k1 + "} = \\dfrac{\\square}{" + q * k2 + "}$.", reponse: p * k2, correction: "On simplifie d'abord par $" + k1 + "$ : $\\dfrac{" + p * k1 + "}{" + q * k1 + "} = \\dfrac{" + p + "}{" + q + "}$. Puis on passe de $" + q + "$ à $" + q * k2 + "$ en multipliant par $" + k2 + "$ : $" + p + " \\times " + k2 + " = " + p * k2 + "$." };
        }
      }
    },
    {
      id: "rat-comparer", chap: "rat1", titre: "Comparer deux fractions", format: "choix", options: ["<", ">"],
      niveaux: {
        1: () => {
          if (facile(1) || Math.random() < 0.5) return memeDenominateur(3, 15);
          const a = ent(1, 9); let b, d; do { b = ent(2, 15); d = ent(2, 15); } while (b === d);
          return exComparer(a, b, a, d);
        },
        2: () => {
          if (facile(2)) return memeDenominateur(3, 20);
          for (;;) {
            const d = ent(2, 10), D = d * ent(2, 5), a = ent(1, 2 * d), c = ent(1, 2 * D);
            if (a * D === c * d) continue;
            return Math.random() < 0.5 ? exComparer(a, d, c, D) : exComparer(c, D, a, d);
          }
        },
        3: () => {
          if (Math.random() < 0.6) {
            for (;;) {
              const [b, d] = choix([[3, 4], [5, 8], [7, 12], [3, 5], [4, 7], [5, 6], [7, 8], [7, 9], [6, 9], [8, 12], [9, 12], [4, 5]]), a = ent(1, 2 * b), c = ent(1, 2 * d);
              if (a * d === c * b) continue;
              return Math.random() < 0.5 ? exComparer(a, b, c, d) : exComparer(c, d, a, b);
            }
          }
          for (;;) {
            const b = choix([2, 4, 5, 8, 20, 25]), a = ent(1, 2 * b - 1), v = net(a / b), x = decimal(1.99, 2);
            if (v === x) continue;
            const g = v < x ? "<" : ">", gauche = Math.random() < 0.5, f = "\\dfrac{" + a + "}{" + b + "}";
            const s1 = gauche ? f : L(x), s2 = gauche ? L(x) : f, gg = gauche ? g : g === "<" ? ">" : "<";
            return { enonce: "Compléter par $<$ ou $>$ : $" + s1 + " \\ldots " + s2 + "$.", reponse: gg, correction: "$" + f + " = " + a + " \\div " + b + " = " + L(v) + "$. Comme $" + (gauche ? L(v) + " " + gg + " " + L(x) : L(x) + " " + gg + " " + L(v)) + "$, on écrit $" + s1 + " " + gg + " " + s2 + "$." };
          }
        }
      }
    },
    {
      id: "rat-decimal", chap: "rat1", titre: "Fraction et écriture décimale", format: "nombre",
      niveaux: {
        1: () => (facile(1) ? versDecimal([10], () => 99) : versDecimal([2, 4, 5], (b) => 2 * b + 5)),
        2: () => (facile(2) ? versDecimal([100], () => 199) : versDecimal([8, 20, 25, 50], (b) => 2 * b)),
        3: () => versDecimal([16, 40, 80, 125, 200, 250], (b) => 2 * b)
      }
    },
    {
      id: "rat-decimal-fraction", chap: "rat1", titre: "Décimal et fraction irréductible", format: "fraction",
      niveaux: {
        1: () => { if (facile(1)) return decimalFraction(0.5, 1); let x; do { x = decimal(4.9, 1); } while (x < 1.1); return decimalFraction(x, 1); },
        2: () => (facile(2) ? (() => { const x = choix([0.25, 0.75, 0.05, 0.5]); return decimalFraction(x, x === 0.5 ? 1 : 2); })() : decimalFraction(decimal(2.99, 2), 2)),
        3: () => { let n; do { n = ent(1, 2999); } while (n % 10 === 0); return decimalFraction(n / 1000, 3); }
      }
    },
    {
      id: "rat-pourcentage", chap: "rat1", titre: "Calculer un pourcentage", format: "nombre",
      niveaux: {
        1: () => {
          const p = facile(1) ? 50 : choix([10, 20, 25, 50]), m = { 10: 10, 20: 5, 25: 4, 50: 2 }[p];
          return pourcentDe(p, m * ent(Math.ceil(20 / m), Math.floor(400 / m)));
        },
        2: () => pourcentDe(facile(2) ? 50 : choix([5, 20, 30, 40, 60, 75, 80]), 20 * ent(2, 40)),
        3: () => {
          const cas = ent(1, 3);
          if (cas === 1) return pourcentDe(choix([8, 12, 15, 16, 18, 35, 45, 65, 85]), choix([10, 50, 100]) * ent(1, 10));
          if (cas === 2) {
            for (;;) {
              const p = choix([5, 10, 20, 25, 30, 40, 60, 75, 80]), pas = 100 / pgcd(p, 100), total = pas * ent(1, Math.floor(500 / pas)), part = total * p / 100;
              if (total < 4 || part < 1) continue;
              const [groupe, membres, qui] = choix([["un club", "membres", "sont des filles"], ["un collège", "élèves", "sont demi-pensionnaires"], ["un sondage", "personnes interrogées", "ont répondu « oui »"]]);
              return { enonce: "Dans " + groupe + " de " + T(total) + " " + membres + ", " + T(part) + " " + qui + ". Quel pourcentage des " + membres + " cela représente-t-il ?", reponse: p, unite: "%", correction: "La part est $\\dfrac{" + part + "}{" + total + "}$. On cherche le nombre sur $100$ : $\\dfrac{" + part + "}{" + total + "} = " + L(net(part / total)) + " = \\dfrac{" + p + "}{100}$, soit $" + p + PC + "$." };
            }
          }
          const p = choix([5, 10, 20, 25, 40, 50, 75]), pas = 100 / pgcd(p, 100), total = pas * ent(Math.ceil(20 / pas), Math.floor(1000 / pas)), v = total * p / 100;
          return { enonce: "Léa a dépensé $" + p + PC + "$ de ses économies, soit " + T(v) + " €. Combien avait-elle d'économies ?", reponse: total, unite: "€", correction: "$" + p + PC + "$ des économies valent " + T(v) + " €, donc $1" + PC + "$ vaut $" + L(v) + " \\div " + p + " = " + L(net(v / p)) + "$ € et $100" + PC + "$ valent $" + L(net(v / p)) + " \\times 100 = " + L(total) + "$ €." };
        }
      }
    },
    {
      id: "rat-fraction-quantite", chap: "rat1", titre: "Fraction d'une quantité", format: "nombre",
      niveaux: {
        1: () => { const b = facile(1) ? 2 : ent(3, 6); return fractionDe(1, b, b * ent(2, Math.floor(120 / b))); },
        2: () => {
          const [a, b] = facile(2) ? choix([[3, 4], [2, 3], [3, 10], [7, 10], [3, 5]]) : (() => { for (;;) { const b = ent(3, 9), a = ent(2, b - 1); if (pgcd(a, b) === 1) return [a, b]; } })();
          return fractionDe(a, b, b * ent(2, 15));
        },
        3: () => {
          let a, b; do { b = ent(3, 9); a = ent(2, b - 1); } while (pgcd(a, b) !== 1);
          const argent = Math.random() < 0.5, total = argent ? b * ent(3, 12) : b * ent(Math.ceil(18 / b), Math.floor(36 / b)), part = total / b * a;
          if (argent) return { enonce: "Tom a dépensé les $\\dfrac{" + a + "}{" + b + "}$ de son argent de poche, soit " + part + " €. Combien avait-il au départ ?", reponse: total, unite: "€", correction: "Les $\\dfrac{" + a + "}{" + b + "}$ valent " + part + " €, donc $\\dfrac{1}{" + b + "}$ vaut $" + part + " \\div " + a + " = " + part / a + "$ €. La somme entière vaut $" + part / a + " \\times " + b + " = " + total + "$ €." };
          return { enonce: "Dans une classe de " + total + " élèves, les $\\dfrac{" + a + "}{" + b + "}$ des élèves sont demi-pensionnaires. Combien d'élèves ne sont pas demi-pensionnaires ?", reponse: total - part, correction: "Les demi-pensionnaires : $\\dfrac{" + a + "}{" + b + "} \\times " + total + " = " + part + "$ élèves. Les autres : $" + total + " - " + part + " = " + (total - part) + "$ élèves." };
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("5e", rat1);
})();
