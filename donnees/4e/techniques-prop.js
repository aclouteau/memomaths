// Techniques d'entraînement de 4e : « Proportionnalité et pourcentages » (prop).
// D'après propositions/referentiels/4e/prop.json (lot 2) : les descriptions de niveau sont la spécification.
// Les prix sont toujours écrits avec deux chiffres après la virgule (36,00 €), avec des prix unitaires réalistes.
(function () {
  const { L, T, ent, choix, net, facile, fixe, fixeTexte, decimales } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const euros = (x) => fixeTexte(x, 2) + " €"; // dans une phrase
  const E = (x) => fixe(x, 2); // dans une formule
  const pourcent = (t) => L(t) + "\\,\\%";

  // Articles : quantité écrite, prix unitaire réaliste (min, max en €), unité du coefficient
  const ARTICLES = [
    { q: (n) => T(n) + " kg de pommes", court: (n) => T(n) + " kg", min: 2, max: 5, unite: "€/kg", un: "le prix d'un kilogramme" },
    { q: (n) => T(n) + " m de tissu", court: (n) => T(n) + " m", min: 3, max: 15, unite: "€/m", un: "le prix d'un mètre" },
    { q: (n) => T(n) + " L d'essence", court: (n) => T(n) + " L", min: 1.6, max: 2.2, entier: 2, unite: "€/L", un: "le prix d'un litre" },
    { q: (n) => T(n) + " kg de farine", court: (n) => T(n) + " kg", min: 1, max: 3, unite: "€/kg", un: "le prix d'un kilogramme" },
    { q: (n) => T(n) + " m de ruban", court: (n) => T(n) + " m", min: 1, max: 4, unite: "€/m", un: "le prix d'un mètre" },
    { q: (n) => T(n) + " cahiers", court: (n) => T(n) + " cahiers", min: 1, max: 4, unite: "€/cahier", un: "le prix d'un cahier" },
    { q: (n) => T(n) + " m de grillage", court: (n) => T(n) + " m", min: 3, max: 12, unite: "€/m", un: "le prix d'un mètre" }
  ];
  // Prix unitaire : entier (niveau 1), un chiffre après la virgule (niveau 2), deux chiffres jamais multiples de 0,1 (niveau 3)
  function prixUnitaire(a, niveau) {
    if (niveau === 1) return a.entier || ent(a.min, a.max);
    for (;;) {
      const p = niveau === 2 ? ent(a.min * 10, a.max * 10) / 10 : ent(a.min * 100, a.max * 100) / 100;
      if (niveau === 2 && !Number.isInteger(p)) return p;
      if (niveau === 3 && Math.round(p * 100) % 10 !== 0) return p;
    }
  }

  // ---------- Proportionnel ou non ----------
  const RELEVES = [
    { debut: "Une station relève le prix de l'essence : ", q: (n) => T(n) + " L", fin: "au volume", demi: true },
    { debut: "Un marchand relève le prix de pommes : ", q: (n) => T(n) + " kg", fin: "à la masse", demi: true },
    { debut: "Une mercière relève le prix d'un tissu : ", q: (n) => T(n) + " m", fin: "à la longueur", demi: true },
    { debut: "Un théâtre affiche ses tarifs : ", q: (n) => T(n) + " places", fin: "au nombre de places", demi: false }
  ];
  function exProportionnel(niveau) {
    for (;;) {
      const r = choix(RELEVES), n = niveau === 3 ? 4 : 3;
      const coef = niveau === 1 ? (facile(1) ? 2 : ent(3, 9)) : niveau === 2 ? (facile(2) ? 2 : choix([0.8, 1.2, 1.5, 1.8, 2.5, 3.5, 4.5, 7.5]))
        : choix([0.35, 0.75, 0.95, 1.15, 1.25, 1.35, 1.65, 2.15, 2.45]);
      const quantite = () => (niveau === 1 ? ent(2, 12) : niveau === 2 ? ent(2, 20) : r.demi && Math.random() < 0.4 ? ent(4, 60) / 2 : ent(2, 30));
      let q = Array.from({ length: n }, quantite);
      if (new Set(q).size < n) continue;
      q = niveau === 3 && Math.random() < 0.4 ? q : q.sort((a, b) => a - b); // niveau 3 : tableau non rangé 4 fois sur 10
      let p = q.map((x) => net(x * coef));
      const proportionnel = Math.random() < 0.5;
      if (!proportionnel) {
        if (Math.random() < 0.5) {
          // Un seul prix faussé
          const i = ent(0, n - 1), d = (niveau === 1 ? ent(1, 3) : niveau === 2 ? choix([0.5, 1, 1.5, 2]) : ent(1, 5) / 10) * choix([1, -1]);
          p[i] = net(p[i] + d);
        } else {
          // Frais fixes ajoutés à chaque prix
          const f = niveau === 1 ? 5 : niveau === 2 ? ent(1, 5) : choix([0.5, 1, 1.5]);
          p = p.map((x) => net(x + f));
        }
      }
      if (p.some((x) => x <= 0 || decimales(x) > 2)) continue;
      const quotients = p.map((x, i) => x / q[i]);
      const egaux = quotients.every((x) => Math.abs(x - quotients[0]) < 1e-9);
      if (egaux !== proportionnel) continue;
      const ecrireQuotient = (x, i) => "$" + E(x) + " \\div " + L(q[i]) + (Math.abs(quotients[i] * 100 - Math.round(quotients[i] * 100)) < 1e-9 ? " = " : " \\approx ") + L(net(Math.round(quotients[i] * 100) / 100)) + "$";
      const liste = q.map((x, i) => r.q(x) + (x === 1 ? " coûte " : " coûtent ") + euros(p[i]));
      return {
        enonce: r.debut + liste.slice(0, -1).join(", ") + " et " + liste[n - 1] + ". Le prix est-il proportionnel " + r.fin + " ?",
        reponse: proportionnel ? "proportionnel" : "non proportionnel",
        correction: "Deux grandeurs sont proportionnelles si le quotient prix ÷ quantité est toujours le même. On calcule : " + p.map(ecrireQuotient).join(" ; ") + ". " +
          (proportionnel ? "Les quotients sont tous égaux : c'est une situation de proportionnalité." : "Les quotients ne sont pas tous égaux : ce n'est pas une situation de proportionnalité.")
      };
    }
  }

  const prop = [
    {
      id: "coef-prop", chap: "prop", titre: "Coefficient de proportionnalité", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((n) => [n, () => {
        const a = choix(ARTICLES), pu = prixUnitaire(a, n), q = n === 1 ? ent(2, 12) : n === 2 ? ent(2, 20) : ent(4, 40), p = net(q * pu);
        return {
          enonce: a.q(q) + " coûtent " + euros(p) + ". Quel est le coefficient de proportionnalité, c'est-à-dire " + a.un + " (en " + a.unite + ") ?",
          reponse: pu, unite: a.unite,
          correction: "Coefficient = prix ÷ quantité $= " + E(p) + " \\div " + q + " = " + L(pu) + "$ " + a.unite + "."
        };
      }]))
    },
    {
      id: "quatrieme", chap: "prop", titre: "Quatrième proportionnelle", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((n) => [n, () => {
        for (;;) {
          const recette = n < 3 && Math.random() < 1 / 3;
          let q1, q2;
          if (n === 1) { q1 = ent(2, 6); q2 = q1 * ent(2, 5); }
          else { q1 = ent(3, n === 2 ? 12 : 16); q2 = ent(4, n === 2 ? 20 : 30); if (q2 === q1 || q2 % q1 === 0) continue; }
          if (recette) {
            // Farine : multiples de 50 g (niveau 1) ou de 10 g de 60 à 400 g (niveau 2), résultat entier
            const f = n === 1 ? 50 * ent(1, 6) : 10 * ent(6, 40), r = (f * q2) / q1, u = f / q1;
            if (!Number.isInteger(r) || decimales(u) > 1) continue;
            return {
              enonce: "Une recette pour " + q1 + " personnes demande " + f + " g de farine. Quelle quantité de farine (en g) faut-il pour " + q2 + " personnes ?",
              reponse: r, unite: "g",
              correction: n === 1 ? q2 + " personnes, c'est " + q2 / q1 + " fois plus que " + q1 + " : on multiplie par " + q2 / q1 + ". $" + f + " \\times " + q2 / q1 + " = " + r + "$ g."
                : "Passage à l'unité : pour 1 personne, $" + f + " \\div " + q1 + " = " + L(u) + "$ g ; pour " + q2 + " personnes, $" + q2 + " \\times " + L(u) + " = " + L(r) + "$ g."
            };
          }
          const a = choix(ARTICLES), pu = prixUnitaire(a, n), p1 = net(q1 * pu), p2 = net(q2 * pu);
          return {
            enonce: a.q(q1) + " coûtent " + euros(p1) + ". Combien coûtent " + a.q(q2) + " (en €) ?",
            reponse: p2, unite: "€",
            correction: n === 1 ? a.court(q2) + ", c'est " + q2 / q1 + " fois plus que " + a.court(q1) + " : on multiplie le prix par " + q2 / q1 + ". $" + E(p1) + " \\times " + q2 / q1 + " = " + E(p2) + "$ €."
              : "Passage à l'unité : pour 1, $" + E(p1) + " \\div " + q1 + " = " + E(pu) + "$ € ; pour " + q2 + ", $" + q2 + " \\times " + E(pu) + " = " + E(p2) + "$ €."
          };
        }
      }]))
    },
    {
      id: "pourcentage-de", chap: "prop", titre: "Calculer un pourcentage d'une quantité", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((n) => [n, () => {
        const entier = Math.random() < 0.4;
        for (;;) {
          let t, V, unite;
          if (n === 1) { t = facile(1) ? choix([10, 50]) : choix([20, 25, 30, 40, 60, 75]); V = 20 * ent(2, 30); unite = choix(["€", "kg", "L"]); }
          else if (n === 2) { t = ent(3, 97); V = 10 * ent(4, 80); unite = choix(["€", "kg", "L", "m"]); if (t % 10 === 0 || t === 25 || t === 75) continue; }
          else { t = choix([0.5, 1.5, 2.5, 7.5, 12.5, 17.5, 32.5, 3.5, 105, 120, 125, 150]); V = 8 * ent(2, 60); unite = choix(["€", "kg", "L", "m"]); }
          const k = net(t / 100), r = net(k * V);
          if (decimales(r) > 2) continue;
          // Niveau 3 : un résultat entier au plus une fois sur deux
          if (n === 3 && Number.isInteger(r) !== entier) continue;
          return {
            enonce: "Calculer $" + pourcent(t) + "$ de " + T(V) + " " + unite + ".", reponse: r, unite: unite,
            correction: "Prendre $" + pourcent(t) + "$ d'une quantité, c'est la multiplier par $\\dfrac{" + L(t) + "}{100} = " + L(k) + "$. $" + L(k) + " \\times " + L(V) + " = " + L(r) + "$ " + unite + "."
          };
        }
      }]))
    },
    {
      id: "hausse-baisse", chap: "prop", titre: "Hausse et baisse en pourcentage", format: "nombre",
      niveaux: (function () {
        const coefficient = (t, hausse) => net(1 + (hausse ? t : -t) / 100);
        const phrase = (t, hausse) => (hausse ? "Hausse" : "Baisse") + " de $" + pourcent(t) + "$ : coefficient multiplicateur $1 " + (hausse ? "+" : "-") + " \\dfrac{" + L(t) + "}{100} = " + L(coefficient(t, hausse)) + "$.";
        function uneEvolution(P, t) {
          const hausse = Math.random() < 0.5, r = net(P * coefficient(t, hausse));
          if (decimales(r) > 2) return null;
          return {
            enonce: "Un article coûte " + euros(P) + ". Son prix " + (hausse ? "augmente" : "baisse") + " de $" + pourcent(t) + "$. Quel est son nouveau prix (en €) ?",
            reponse: r, unite: "€", correction: phrase(t, hausse) + " Nouveau prix : $" + E(P) + " \\times " + L(coefficient(t, hausse)) + " = " + E(r) + "$ €."
          };
        }
        return {
          1: () => { for (;;) { const ex = uneEvolution(20 * ent(2, 40), choix([10, 20, 25, 50])); if (ex) return ex; } },
          2: () => { for (;;) { const t = ent(3, 45); if (t % 10 === 0) continue; const ex = uneEvolution(10 * ent(5, 80), t); if (ex) return ex; } },
          3: () => {
            const une = Math.random() < 0.5; // tiré avant les rejets : une fois sur deux, deux évolutions
            for (;;) {
              // Une évolution d'un taux demi-entier (2,5 % ; 3,5 % … 47,5 %)
              if (une) { const ex = uneEvolution(10 * ent(4, 60), ent(2, 47) + 0.5); if (ex) return ex; continue; }
              // Deux évolutions successives : hausse puis baisse, ou l'inverse
              const P = 10 * ent(4, 60), t1 = ent(5, 45), t2 = ent(5, 45), hausseDabord = Math.random() < 0.5;
              const c1 = coefficient(t1, hausseDabord), c2 = coefficient(t2, !hausseDabord), p1 = net(P * c1), r = net(p1 * c2);
              if (decimales(p1) > 2 || decimales(r) > 2) continue;
              return {
                enonce: "Un article coûte " + euros(P) + ". Son prix " + (hausseDabord ? "augmente" : "baisse") + " de $" + pourcent(t1) + "$, puis " + (hausseDabord ? "baisse" : "augmente") +
                  " de $" + pourcent(t2) + "$. Quel est son nouveau prix (en €) ?",
                reponse: r, unite: "€",
                correction: phrase(t1, hausseDabord) + " " + phrase(t2, !hausseDabord) + " Après la première évolution : $" + E(P) + " \\times " + L(c1) + " = " + E(p1) +
                  "$ € ; après la seconde : $" + E(p1) + " \\times " + L(c2) + " = " + E(r) + "$ €."
              };
            }
          }
        };
      })()
    },
    {
      id: "taux-evol", chap: "prop", titre: "Taux d'évolution", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((n) => [n, () => {
        for (;;) {
          const V0 = n === 1 ? choix([10, 20, 40, 50, 80, 100, 200]) : n === 2 ? choix([20, 25, 40, 50, 80, 120, 150, 200, 250]) : choix([40, 80, 120, 160, 200, 240, 400, 800]);
          let t = n === 1 ? choix([5, 10, 15, 20, 25, 30, 50]) : n === 2 ? ent(3, 60) : ent(5, 190) / 10;
          if (n === 3 && Number.isInteger(t)) continue;
          if (n > 1 && Math.random() < 0.5) t = -t;
          const V1 = net(V0 * (1 + t / 100)), diff = net(V1 - V0), taux = net(diff / V0);
          if (decimales(V1) > 2) continue;
          return {
            enonce: "Un prix passe de " + euros(V0) + " à " + euros(V1) + ". Quel est le taux d'évolution, en pourcentage (négatif s'il s'agit d'une baisse) ?",
            reponse: t, unite: "%",
            correction: "Taux d'évolution $= \\dfrac{V_1 - V_0}{V_0} = \\dfrac{" + E(V1) + " - " + E(V0) + "}{" + E(V0) + "} = \\dfrac{" + L(diff) + "}{" + L(V0) + "} = " + L(taux) +
              "$, soit une " + (t > 0 ? "hausse de " + T(t) + " %." : "baisse de " + T(-t) + " % : le taux d'évolution est $" + L(t) + "\\,\\%$.")
          };
        }
      }]))
    },
    {
      id: "echelle", chap: "prop", titre: "Échelle", format: "nombre",
      niveaux: {
        1: () => {
          const e = choix([50, 100, 200, 500, 1000]), d = ent(2, 40), cm = d * e, m = net(cm / 100);
          return {
            enonce: "Sur un plan à l'échelle $\\dfrac{1}{" + L(e) + "}$, une longueur mesure " + d + " cm. Quelle est la longueur réelle (en m) ?", reponse: m, unite: "m",
            correction: "Longueur réelle $= " + d + " \\times " + L(e) + " = " + L(cm) + "$ cm $= " + L(m) + "$ m."
          };
        },
        2: () => {
          const e = choix([10000, 20000, 25000, 50000, 100000]), d = ent(2, 30), cm = d * e, km = net(cm / 100000);
          return {
            enonce: "Sur une carte à l'échelle $\\dfrac{1}{" + L(e) + "}$, deux villes sont distantes de " + d + " cm. Quelle est la distance réelle (en km) ?", reponse: km, unite: "km",
            correction: "Distance réelle $= " + d + " \\times " + L(e) + " = " + L(cm) + "$ cm $= " + L(km) + "$ km."
          };
        },
        3: () => {
          for (;;) {
            const e = choix([20000, 25000, 50000, 100000, 200000, 250000]);
            if (Math.random() < 0.5) {
              const d = ent(12, 150) / 10, cm = net(d * e), km = net(cm / 100000);
              return {
                enonce: "Sur une carte à l'échelle $\\dfrac{1}{" + L(e) + "}$, deux villes sont distantes de " + T(d) + " cm. Quelle est la distance réelle (en km) ?", reponse: km, unite: "km",
                correction: "Distance réelle $= " + L(d) + " \\times " + L(e) + " = " + L(cm) + "$ cm $= " + L(km) + "$ km."
              };
            }
            const km = ent(5, 300) / 10, cm = net(km * 100000), d = net(cm / e);
            if (decimales(d) > 2) continue;
            return {
              enonce: "Deux villes sont distantes de " + T(km) + " km. Quelle est leur distance sur une carte à l'échelle $\\dfrac{1}{" + L(e) + "}$ (en cm) ?", reponse: d, unite: "cm",
              correction: T(km) + " km $= " + L(cm) + "$ cm. Distance sur la carte $= " + L(cm) + " \\div " + L(e) + " = " + L(d) + "$ cm."
            };
          }
        }
      }
    },
    {
      id: "prop-oui-non", chap: "prop", titre: "Reconnaître une situation de proportionnalité", format: "choix", options: ["proportionnel", "non proportionnel"],
      niveaux: { 1: () => exProportionnel(1), 2: () => exProportionnel(2), 3: () => exProportionnel(3) }
    }
  ];

  Savoirs.enregistrerTechniques("4e", prop);
})();
