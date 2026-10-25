// Techniques d'entraînement de 3e : « Agrandissement et réduction » (agr).
// D'après propositions/referentiels/3e/agr.json (lot 3) : les descriptions de niveau sont la spécification.
// Pas de racine cubique (décision de l'enseignant) ; échelles de cartes gardées.
(function () {
  const { L, T, ent, choix, net, decimal, decimales, facile } = Savoirs.calculsOutils;
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  const sorte = (k) => (k < 1 ? "réduction" : "agrandissement");
  const verbe = (k, f) => (k < 1 ? (f ? "réduite" : "réduit") : (f ? "agrandie" : "agrandi"));

  const agr = [
    {
      id: "rapport-k", chap: "agr", titre: "Calculer le rapport k", format: "nombre",
      niveaux: {
        1: () => {
          const k = facile(1) ? 2 : choix([3, 4, 5, 6, 1.5, 2.5]);
          for (;;) {
            const a = ent(2, 12), b = net(a * k);
            if (!Number.isInteger(b)) continue;
            return {
              enonce: choix([
                "Sur une figure, un côté mesure " + a + " cm ; après un agrandissement, le côté correspondant mesure " + b + " cm. Quel est le rapport $k$ ?",
                "Un segment de " + a + " cm est agrandi : il mesure maintenant " + b + " cm. Quel est le rapport d'agrandissement $k$ ?"]),
              reponse: k, correction: "Le rapport est la longueur obtenue divisée par la longueur de départ : $k = \\dfrac{" + b + "}{" + a + "} = " + L(k) + "$."
            };
          }
        },
        2: () => {
          const k = facile(2) ? 0.5 : choix([0.2, 0.25, 0.3, 0.4, 0.6, 0.7, 0.75, 0.8, 1.2, 1.25, 1.6]);
          for (;;) {
            const a = Math.random() < 0.5 ? ent(2, 40) : dec(1.1, 15), b = net(a * k);
            if (decimales(b) > 2) continue;
            return {
              enonce: "Sur une figure, un côté mesure " + T(a) + " cm ; après " + (k < 1 ? "une réduction" : "un agrandissement") + ", le côté correspondant mesure " + T(b) + " cm. Quel est le rapport $k$ ?",
              reponse: k, correction: "Le rapport est la longueur obtenue divisée par la longueur de départ : $k = \\dfrac{" + L(b) + "}{" + L(a) + "} = " + L(k) + "$."
            };
          }
        },
        3: () => {
          for (;;) {
            const k = ent(1, 45) * 0.05, kk = net(k), mmCm = Math.random() < 0.5;
            if (kk === 1) continue;
            // Départ en cm et arrivée en mm, ou départ en m et arrivée en cm
            const a = mmCm ? ent(2, 40) : ent(2, 40), bUnite = net(a * kk * (mmCm ? 10 : 100));
            if (!Number.isInteger(bUnite) && decimales(bUnite) > 1) continue;
            const b = net(a * kk);
            return {
              enonce: "Sur la figure de départ, un segment mesure " + a + (mmCm ? " cm" : " m") + ". Sur la figure obtenue, le segment correspondant mesure " + T(bUnite) + (mmCm ? " mm" : " cm") + ". Quel est le rapport $k$ ?",
              reponse: kk,
              correction: "On convertit en " + (mmCm ? "cm" : "m") + " : " + T(bUnite) + (mmCm ? " mm" : " cm") + " $= " + L(b) + "$ " + (mmCm ? "cm" : "m") + ". Puis $k = \\dfrac{" + L(b) + "}{" + a + "} = " + L(kk) + "$."
            };
          }
        }
      }
    },
    {
      id: "longueur-image", chap: "agr", titre: "Longueur après agrandissement ou réduction", format: "nombre",
      niveaux: {
        1: () => {
          const k = facile(1) ? 2 : choix([3, 4, 5, 6, 10]), a = ent(2, 20);
          return { enonce: "On agrandit un côté de " + a + " cm avec le rapport $k = " + k + "$. Quelle est sa nouvelle longueur ?", reponse: a * k, unite: "cm", correction: "Les longueurs sont multipliées par $k$ : $" + a + " \\times " + k + " = " + a * k + "$ cm." };
        },
        2: () => {
          // Rapport simple et longueur entière (pas de 3,5 × 7,3)
          const k = facile(2) ? 0.5 : choix([0.1, 0.2, 0.5, 1.5, 2.5, 3]), a = ent(3, 60), r = net(a * k);
          return { enonce: "On " + (k < 1 ? "réduit" : "agrandit") + " un côté de " + T(a) + " cm avec le rapport $k = " + L(k) + "$. Quelle est sa nouvelle longueur ?", reponse: r, unite: "cm", correction: "Les longueurs sont multipliées par $k$ : $" + L(a) + " \\times " + L(k) + " = " + L(r) + "$ cm." };
        },
        3: () => {
          for (;;) {
            // Retrouver la longueur de départ : rapport simple et longueur entière (54,75 ÷ 0,75 était trop long)
            const k = choix([0.1, 0.2, 0.5, 1.5, 2, 2.5, 3, 4]), depart = ent(4, 80), b = net(depart * k);
            if (decimales(b) > 2) continue;
            return {
              enonce: "Après " + (k < 1 ? "une réduction" : "un agrandissement") + " de rapport $k = " + L(k) + "$, un côté d'un " + choix(["rectangle", "triangle", "carré"]) + " mesure " + T(b) + " cm. Quelle était sa longueur avant la transformation ?",
              reponse: depart, unite: "cm",
              correction: "Les longueurs obtenues sont égales aux longueurs de départ multipliées par $k$ ; la longueur de départ est donc $" + L(b) + " \\div " + L(k) + " = " + L(depart) + "$ cm."
            };
          }
        }
      }
    },
    {
      id: "aire-image", chap: "agr", titre: "Aire après agrandissement ou réduction", format: "nombre",
      niveaux: (function () {
        const corr = (k, A, r) => "Les aires sont multipliées par $k^{2}$ : $\\mathcal{A}' = k^{2} \\times \\mathcal{A} = " + L(k) + "^{2} \\times " + L(A) + " = " + L(net(k * k)) + " \\times " + L(A) + " = " + L(r) + "$ cm².";
        return {
          1: () => { const k = facile(1) ? 2 : choix([3, 4, 5]), A = ent(2, 20), r = k * k * A; return { enonce: "Une figure d'aire " + A + " cm² est agrandie avec le rapport $k = " + k + "$. Quelle est l'aire de la figure obtenue ?", reponse: r, unite: "cm²", correction: corr(k, A, r) }; },
          2: () => {
            // Calcul faisable à la main : k simple, aire entière, au plus deux décimales au résultat
            let k, A, r; do { k = facile(2) ? 0.5 : choix([0.1, 0.2, 0.3, 0.5, 1.5, 2.5]); A = ent(3, 80); r = net(k * k * A); } while (decimales(r) > 2);
            return { enonce: "Une figure d'aire " + T(A) + " cm² est " + verbe(k, true) + " avec le rapport $k = " + L(k) + "$. Quelle est l'aire de la figure obtenue ?", reponse: r, unite: "cm²", correction: corr(k, A, r) };
          },
          3: () => {
            for (;;) {
              const k = choix([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 1.2, 1.5, 2, 2.5, 3]), a = ent(2, 20), b = net(a * k), A = ent(3, 120), r = net(k * k * A);
              if (decimales(b) > 1 || decimales(r) > 2 || b === a) continue;
              return {
                enonce: "Une figure d'aire " + A + " cm² est " + verbe(k, true) + ". Un de ses côtés, qui mesurait " + a + " cm, mesure maintenant " + T(b) + " cm. Quelle est l'aire de la figure obtenue ?",
                reponse: r, unite: "cm²", correction: "Rapport : $k = \\dfrac{" + L(b) + "}{" + a + "} = " + L(k) + "$. " + corr(k, A, r)
              };
            }
          }
        };
      })()
    },
    {
      id: "volume-image", chap: "agr", titre: "Volume après agrandissement ou réduction", format: "nombre",
      niveaux: (function () {
        const corr = (k, V, r) => "Les volumes sont multipliés par $k^{3}$ : $V' = k^{3} \\times V = " + L(k) + "^{3} \\times " + L(V) + " = " + L(net(k * k * k)) + " \\times " + L(V) + " = " + L(r) + "$ cm³.";
        return {
          1: () => { const k = facile(1) ? 2 : choix([2, 3]), V = ent(2, 10), r = k * k * k * V; return { enonce: "Le volume d'une boîte est de " + V + " cm³. On l'agrandit avec le rapport $k = " + k + "$. Quel est son nouveau volume ?", reponse: r, unite: "cm³", correction: corr(k, V, r) }; },
          2: () => {
            for (;;) {
              // Calcul faisable à la main : k simple, volume entier, au plus deux décimales au résultat
              const k = facile(2) ? 0.5 : choix([0.1, 0.2, 0.5, 1.5, 2, 3]), V = ent(3, 80), r = net(k * k * k * V);
              if (r > 20000 || decimales(r) > 2) continue;
              return { enonce: "Le volume d'une boîte est de " + T(V) + " cm³. On " + (k < 1 ? "la réduit" : "l'agrandit") + " avec le rapport $k = " + L(k) + "$. Quel est son nouveau volume ?", reponse: r, unite: "cm³", correction: corr(k, V, r) };
            }
          },
          3: () => {
            for (;;) {
              const k = choix([0.2, 0.3, 0.4, 0.5, 0.6, 1.2, 1.5, 2, 2.5, 3]), a = ent(2, 20), b = net(a * k), V = ent(3, 60), r = net(k * k * k * V);
              if (decimales(b) > 1 || b === a) continue;
              return {
                enonce: "Un solide de volume " + V + " cm³ est " + verbe(k) + ". Une de ses arêtes, qui mesurait " + a + " cm, mesure maintenant " + T(b) + " cm. Quel est le volume du solide obtenu ?",
                reponse: r, unite: "cm³", correction: "Rapport : $k = \\dfrac{" + L(b) + "}{" + a + "} = " + L(k) + "$. " + corr(k, V, r)
              };
            }
          }
        };
      })()
    },
    {
      id: "rapport-depuis-aire", chap: "agr", titre: "Retrouver k avec l'aire", format: "nombre",
      niveaux: {
        1: () => {
          const k = facile(1) ? 2 : ent(3, 12);
          return { enonce: "Dans un agrandissement, les aires sont multipliées par " + k * k + ". Quel est le rapport $k$ ?", reponse: k, correction: "Les aires sont multipliées par $k^{2}$, donc $k^{2} = " + k * k + "$ et $k = \\sqrt{" + k * k + "} = " + k + "$." };
        },
        2: () => {
          const k = facile(2) ? 0.5 : choix([0.1, 0.2, 0.3, 0.4, 0.5, 1.5, 2.5]);
          for (;;) {
            const A = ent(2, 80), B = net(k * k * A);
            if (decimales(B) > 2) continue;
            return {
              enonce: "Une figure d'aire " + T(A) + " cm² est " + verbe(k, true) + " ; la figure obtenue a pour aire " + T(B) + " cm². Quel est le rapport $k$ ?", reponse: k,
              correction: "Les aires sont multipliées par $k^{2}$ : $k^{2} = \\dfrac{" + L(B) + "}{" + L(A) + "} = " + L(net(k * k)) + "$, donc $k = \\sqrt{" + L(net(k * k)) + "} = " + L(k) + "$."
            };
          }
        },
        3: () => {
          for (;;) {
            const k = choix([2, 3, 4, 5, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.75, 1.2, 1.5, 2.5]), A = Math.random() < 0.5 ? ent(2, 60) : dec(1.1, 20), B = net(k * k * A);
            const c = Math.random() < 0.6 ? ent(3, 40) : dec(1.1, 20), r = net(c * k);
            if (decimales(B) > 4 || decimales(r) > 2) continue;
            return {
              enonce: "Une figure d'aire " + T(A) + " cm² est " + verbe(k, true) + " ; la figure obtenue a pour aire " + T(B) + " cm². Un côté de la figure de départ mesure " + T(c) + " cm. Quelle est la longueur du côté correspondant de la figure obtenue ?",
              reponse: r, unite: "cm",
              correction: "Les aires sont multipliées par $k^{2}$ : $k^{2} = \\dfrac{" + L(B) + "}{" + L(A) + "} = " + L(net(k * k)) + "$, donc $k = \\sqrt{" + L(net(k * k)) + "} = " + L(k) + "$. Les longueurs sont multipliées par $k$ : $" + L(c) + " \\times " + L(k) + " = " + L(r) + "$ cm."
            };
          }
        }
      }
    },
    {
      id: "echelle", chap: "agr", titre: "Échelle et agrandissement", format: "nombre",
      niveaux: {
        1: () => {
          const e = facile(1) ? 100 : choix([50, 200, 500]), d = ent(2, 20), cm = d * e, m = net(cm / 100);
          return {
            enonce: "Une maison est dessinée à l'échelle $\\dfrac{1}{" + e + "}$. Sur le dessin, un mur mesure " + d + " cm. Quelle est sa longueur réelle, en m ?", reponse: m, unite: "m",
            correction: "Les longueurs réelles sont " + e + " fois plus grandes : $" + d + " \\times " + e + " = " + L(cm) + "$ cm, soit $" + L(m) + "$ m."
          };
        },
        2: () => {
          if (facile(2)) { const d = ent(2, 20); return { enonce: "Un plan est à l'échelle $\\dfrac{1}{100}$. Sur le plan, une pièce mesure " + d + " cm de long. Quelle est sa longueur réelle, en m ?", reponse: d, unite: "m", correction: "Les longueurs réelles sont 100 fois plus grandes : $" + d + " \\times 100 = " + d * 100 + "$ cm, soit $" + d + "$ m." }; }
          for (;;) {
            const e = choix([10000, 25000, 50000, 100000]);
            if (Math.random() < 0.5) {
              const d = ent(12, 150) / 10, cm = net(d * e), km = net(cm / 100000);
              if (decimales(km) > 2) continue;
              return {
                enonce: "Sur une carte à l'échelle $\\dfrac{1}{" + L(e) + "}$, deux villes sont distantes de " + T(d) + " cm. Quelle est la distance réelle, en km ?", reponse: km, unite: "km",
                correction: "Les longueurs réelles sont " + T(e) + " fois plus grandes : $" + L(d) + " \\times " + L(e) + " = " + L(cm) + "$ cm, soit $" + L(km) + "$ km."
              };
            }
            const km = ent(5, 200) / 10, cm = net(km * 100000), d = net(cm / e);
            if (decimales(d) > 2 || d > 50) continue;
            return {
              enonce: "Deux villes sont distantes de " + T(km) + " km. Quelle longueur, en cm, faut-il tracer sur une carte à l'échelle $\\dfrac{1}{" + L(e) + "}$ ?", reponse: d, unite: "cm",
              correction: T(km) + " km $= " + L(cm) + "$ cm. Sur la carte, les longueurs sont " + T(e) + " fois plus petites : $" + L(cm) + " \\div " + L(e) + " = " + L(d) + "$ cm."
            };
          }
        },
        3: () => {
          for (;;) {
            const e = choix([50, 100, 200, 500, 1000]), e2 = e * e;
            if (Math.random() < 0.6) {
              const a = ent(2, 60), cm2 = a * e2, m2 = net(cm2 / 10000);
              if (decimales(m2) > 2) continue;
              return {
                enonce: "Sur un plan à l'échelle $\\dfrac{1}{" + L(e) + "}$, un terrain a pour aire " + a + " cm². Quelle est son aire réelle, en m² ?", reponse: m2, unite: "m²",
                correction: "Les longueurs sont multipliées par $" + L(e) + "$, donc les aires par $" + L(e) + "^{2} = " + L(e2) + "$ : $" + a + " \\times " + L(e2) + " = " + L(cm2) + "$ cm² $= " + L(m2) + "$ m²."
              };
            }
            const m2 = ent(6, 200), cm2 = m2 * 10000, a = net(cm2 / e2);
            if (decimales(a) > 2) continue;
            return {
              enonce: "Un terrain a pour aire réelle " + m2 + " m². Sur un plan à l'échelle $\\dfrac{1}{" + L(e) + "}$, quelle est l'aire du terrain, en cm² ?", reponse: a, unite: "cm²",
              correction: m2 + " m² $= " + L(cm2) + "$ cm². Les longueurs sont divisées par $" + L(e) + "$, donc les aires par $" + L(e) + "^{2} = " + L(e2) + "$ : $" + L(cm2) + " \\div " + L(e2) + " = " + L(a) + "$ cm²."
            };
          }
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("3e", agr);
})();
