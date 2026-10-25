// Techniques d'entraînement de 5e : « Puissances : carré et cube » (puis).
// D'après propositions/referentiels/5e/puis.json (lot 5) : les descriptions de niveau sont la spécification.
(function () {
  const { L, T, ent, choix, net, decimal, decimales, facile, calculEtapes } = Savoirs.calculsOutils;
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  const carreTexte = (a) => "$" + L(a) + "^{2} = " + L(a) + " \\times " + L(a) + " = " + L(net(a * a)) + "$.";
  const cubeTexte = (a) => "$" + L(a) + "^{3} = " + L(a) + " \\times " + L(a) + " \\times " + L(a) + " = " + L(net(a * a)) + " \\times " + L(a) + " = " + L(net(a * a * a)) + "$.";
  const formulation = (latex) => choix(["Quel est le carré de $" + latex + "$ ?", "Donner la valeur de $" + latex + "^{2}$.", "Calculer $" + latex + "^{2}$."]);
  // Expression avec des puissances : on remplace d'abord les puissances (et les parenthèses avant elles), puis calculEtapes
  function exPriorites(latex, sansPuissances, etapeParenthese) {
    const c = calculEtapes(sansPuissances);
    if (c.intermediaires.some((v) => v < 0) || c.valeur < 0) return null;
    return {
      enonce: "Calculer $" + latex + "$.", reponse: c.valeur,
      correction: "On respecte les priorités : parenthèses, puis puissances, puis multiplications, puis additions et soustractions. $" + latex + (etapeParenthese ? " = " + etapeParenthese : "") + " = " + c.etapes + "$."
    };
  }

  const puis = [
    {
      // Carrés entiers et décimaux réunis (décision de l'enseignant) : 6², puis 20² ou 200², puis 0,4²
      id: "puis-carre", chap: "puis", titre: "Carré d'un nombre", format: "nombre",
      niveaux: {
        1: () => { const a = facile(1) ? choix([0, 1, 10]) : ent(2, 10); return { enonce: formulation(L(a)), reponse: a * a, correction: carreTexte(a) }; },
        2: () => {
          const c = ent(1, 9), z = Math.random() < 0.75 ? 1 : 2, a = c * Math.pow(10, z);
          return { enonce: formulation(L(a)), reponse: a * a, correction: carreTexte(a) + " On calcule $" + c + " \\times " + c + " = " + c * c + "$, puis on écrit " + 2 * z + " zéros." };
        },
        3: () => {
          const c = facile(3) ? 5 : ent(1, 9), a = c / 10, r = net(a * a);
          return { enonce: formulation(L(a)), reponse: r, correction: "$" + L(a) + "^{2} = " + L(a) + " \\times " + L(a) + "$. On calcule $" + c + " \\times " + c + " = " + c * c + "$, puis on place 2 chiffres après la virgule : $" + L(r) + "$." };
        }
      }
    },
    {
      id: "puis-cube", chap: "puis", titre: "Cube d'un nombre", format: "nombre",
      niveaux: {
        1: () => { const a = facile(1) ? choix([0, 1, 10]) : choix([2, 3, 4, 5, 10]); return { enonce: choix(["Écrire $" + a + "^{3}$ sans exposant.", "Calculer $" + a + "^{3}$."]), reponse: a * a * a, correction: cubeTexte(a) }; },
        2: () => { const a = facile(2) ? choix([10, 20, 30]) : choix([6, 7, 8, 9]); return { enonce: "Donner la valeur de $" + a + "^{3}$.", reponse: a * a * a, correction: cubeTexte(a) }; },
        3: () => { const a = Math.random() < 0.6 ? choix([11, 12, 13, 14, 15, 20, 25]) : ent(1, 5) / 10; return { enonce: "Calculer $" + L(a) + "^{3}$.", reponse: net(a * a * a), correction: cubeTexte(a) }; }
      }
    },
    {
      id: "puis-priorites", chap: "puis", titre: "Priorités avec des puissances", format: "nombre",
      niveaux: {
        1: () => {
          for (;;) {
            const a = ent(2, 9), b = ent(2, 9), c = ent(2, 12), A = a * a, B = b * b;
            const forme = facile(1) ? 0 : ent(1, 4);
            const ex = [() => exPriorites(a + "^{2} + " + c, A + "+" + c), () => exPriorites(c + " + " + a + "^{2}", c + "+" + A), () => exPriorites(c + " \\times " + a + "^{2}", c + "*" + A),
              () => exPriorites(ent(A, A + 40) + " - " + a + "^{2}", null), () => exPriorites(a + "^{2} + " + b + "^{2}", A + "+" + B)][forme];
            if (forme === 3) { const n = ent(A + 1, A + 40), r = exPriorites(n + " - " + a + "^{2}", n + "-" + A); if (r) return r; continue; }
            const r = ex(); if (r) return r;
          }
        },
        2: () => {
          for (;;) {
            const a = ent(2, 9), b = ent(2, 9), c = ent(2, 12);
            if (facile(2)) return exPriorites(a + "^{2} + " + c, a * a + "+" + c);
            const forme = ent(1, 5);
            let r;
            if (forme === 1) r = exPriorites("(" + a + " + " + b + ")^{2}", String((a + b) * (a + b)), (a + b) + "^{2}");
            else if (forme === 2) { const s = ent(a + 1, a + 9); r = exPriorites("(" + s + " - " + a + ")^{2}", String((s - a) * (s - a)), (s - a) + "^{2}"); }
            else if (forme === 3) r = exPriorites(a + "^{2} - " + b + "^{2}", a * a + "-" + b * b);
            else if (forme === 4) r = exPriorites(a + "^{2} \\times " + b, a * a + "*" + b);
            else r = exPriorites(a + "^{3} + " + c, a * a * a + "+" + c);
            if (r) return r;
          }
        },
        3: () => {
          for (;;) {
            const a = ent(2, 9), b = ent(2, 9), c = ent(2, 12), d = ent(2, 9), forme = ent(1, 5);
            let r;
            if (forme === 1) r = exPriorites(c + " \\times " + a + "^{2} - " + d + " \\times " + b, c + "*" + a * a + "-" + d + "*" + b);
            else if (forme === 2) r = exPriorites("(" + a + " + " + b + ")^{2} - " + c, (a + b) * (a + b) + "-" + c, (a + b) + "^{2} - " + c);
            else if (forme === 3) r = exPriorites(a + "^{3} + " + b + "^{2}", a * a * a + "+" + b * b);
            else if (forme === 4) r = exPriorites(c + " \\times (" + a + "^{2} + " + b + ")", c + "*(" + a * a + "+" + b + ")");
            else r = exPriorites(a + "^{3} - " + c + " \\times " + a, a * a * a + "-" + c + "*" + a);
            if (r) return r;
          }
        }
      }
    },
    {
      id: "puis-aire-volume", chap: "puis", titre: "Aire d'un carré et volume d'un cube", format: "nombre",
      niveaux: (function () {
        const aire = (c, u) => ({ enonce: "Un carré a pour côté " + T(c) + " " + u + ". Calculer son aire.", reponse: net(c * c), unite: u + "²", correction: "Aire : $" + L(c) + "^{2} = " + L(c) + " \\times " + L(c) + " = " + L(net(c * c)) + "$ " + u + "²." });
        const volume = (a, u) => ({ enonce: "Un cube a pour arête " + T(a) + " " + u + ". Calculer son volume.", reponse: net(a * a * a), unite: u + "³", correction: "Volume : $" + L(a) + "^{3} = " + L(a) + " \\times " + L(a) + " \\times " + L(a) + " = " + L(net(a * a * a)) + "$ " + u + "³." });
        return {
          1: () => (facile(1) || Math.random() < 0.6 ? aire(ent(2, 12), "cm") : volume(ent(2, 6), "cm")),
          2: () => {
            if (facile(2)) return aire(ent(2, 12), "m");
            const cas = ent(1, 3);
            if (cas === 1) return aire(dec(1.1, 9.9), "cm");
            if (cas === 2) return volume(Math.random() < 0.5 ? ent(7, 12) : ent(1, 9) / 2, "cm");
            for (;;) {
              const g = ent(5, 12), p = ent(2, g - 2), r = g * g - p * p;
              return { enonce: "Un carré de côté " + g + " cm est découpé : on lui retire un carré de côté " + p + " cm dans un coin. Calculer l'aire de la figure obtenue.", reponse: r, unite: "cm²", correction: "Aire du grand carré : $" + g + "^{2} = " + g * g + "$ cm² ; aire du petit carré : $" + p + "^{2} = " + p * p + "$ cm². Aire restante : $" + g * g + " - " + p * p + " = " + r + "$ cm²." };
            }
          },
          3: () => {
            const cas = ent(1, 3);
            if (cas === 1) return aire(dec(1.1, 5.9), "m");
            if (cas === 2) return volume(dec(1.1, 4.9), "dm");
            const k = choix([2, 3]), cube = Math.random() < 0.5, a = ent(2, 9);
            return cube
              ? { enonce: "Un cube a pour arête " + a + " cm. Combien de fois son volume est-il plus grand si on multiplie son arête par " + k + " ?", reponse: k * k * k, correction: "Si l'arête est multipliée par $" + k + "$, le volume est multiplié par $" + k + "^{3} = " + k * k * k + "$." }
              : { enonce: "Un carré a pour côté " + a + " cm. Combien de fois son aire est-elle plus grande si on multiplie son côté par " + k + " ?", reponse: k * k, correction: "Si le côté est multiplié par $" + k + "$, l'aire est multipliée par $" + k + "^{2} = " + k * k + "$." };
          }
        };
      })()
    },
    {
      id: "puis-racine", chap: "puis", titre: "Quel nombre a pour carré… ?", format: "nombre",
      niveaux: (function () {
        const ex = (a) => {
          const c = net(a * a);
          return { enonce: choix(["Quel nombre positif a pour carré " + T(c) + " ?", "Quel est le nombre positif dont le carré est " + T(c) + " ?"]), reponse: a, correction: "On cherche $a$ tel que $a \\times a = " + L(c) + "$. Comme $" + L(a) + " \\times " + L(a) + " = " + L(c) + "$, le nombre cherché est $" + L(a) + "$." };
        };
        return {
          // Simple (décision de l'enseignant) : carrés parfaits jusqu'à 100, puis jusqu'à 144 (et parfois 400),
          // puis quelques décimaux très simples (0,04 ; 0,25 ; 0,81)
          1: () => ex(facile(1) ? choix([1, 2, 10]) : ent(2, 10)),
          2: () => ex(facile(2) ? 20 : choix([7, 8, 9, 10, 11, 11, 12, 12, 20])),
          3: () => ex(ent(1, 9) / 10)
        };
      })()
    }
    // (« Volume d'un cube en litres » retiré à la demande de l'enseignant, avec le savoir sur 1 dm³ = 1 L.)
  ];

  Savoirs.enregistrerTechniques("5e", puis);
})();
