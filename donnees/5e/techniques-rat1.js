// Techniques d'entraînement de 5e : « Nombres rationnels : fractions, pourcentages » (rat1).
// D'après propositions/referentiels/5e/rat1.json (lot 5) : les descriptions de niveau sont la spécification.
(function () {
  const { L, T, ent, choix, net, facile, pgcd } = Savoirs.calculsOutils;
  const PC = "\\,\\%";
  // Fraction irréductible p/q tirée au hasard (q ≥ 2)
  function irreductible(pMin, pMax, qMin, qMax) {
    for (;;) { const p = ent(pMin, pMax), q = ent(qMin, qMax); if (pgcd(p, q) === 1) return [p, q]; }
  }
  function simplifier(p, q, k) {
    const a = p * k, b = q * k;
    return { enonce: "Donner la forme irréductible de $\\dfrac{" + a + "}{" + b + "}$.", reponse: q === 1 ? String(p) : p + "/" + q, correction: "$" + a + "$ et $" + b + "$ sont divisibles par $" + k + "$ : $\\dfrac{" + a + "}{" + b + "} = \\dfrac{" + a + " \\div " + k + "}{" + b + " \\div " + k + "} = " + (q === 1 ? p : "\\dfrac{" + p + "}{" + q + "}") + "$." };
  }
  function versDecimal(dens, maxNum) {
    const b = choix(dens);
    let a; do { a = ent(1, maxNum(b)); } while (a % b === 0);
    const r = net(a / b);
    return { enonce: "Écrire $\\dfrac{" + a + "}{" + b + "}$ sous forme décimale.", reponse: r, correction: "$\\dfrac{" + a + "}{" + b + "} = " + a + " \\div " + b + " = " + L(r) + "$." };
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
        // Plus simple (385/525 simplifié par 35 était trop dur) : facteurs et fractions plus petits
        2: () => { const k = ent(3, 10); if (facile(2)) return simplifier(ent(2, 12), 1, k); const [p, q] = irreductible(1, 12, 2, 10); return simplifier(p, q, k); },
        3: () => { const k = choix([11, 12, 15, 20, 25]), [p, q] = irreductible(2, 12, 3, 12); return simplifier(p, q, k); }
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
      id: "rat-decimal", chap: "rat1", titre: "Fraction et écriture décimale", format: "nombre",
      niveaux: {
        1: () => (facile(1) ? versDecimal([10], () => 99) : versDecimal([2, 4, 5], (b) => 2 * b + 5)),
        // Sans 16, 80 ni 125 (3/16 = 0,1875 était trop long à la main) ; les huitièmes seulement au niveau 3
        2: () => (facile(2) ? versDecimal([100], () => 199) : versDecimal([20, 25, 50], (b) => 2 * b)),
        3: () => versDecimal([8, 40, 200], (b) => 2 * b)
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
