// Techniques d'entraînement de 5e : « Enchaînements d'opérations » (ench).
// D'après propositions/referentiels/5e/ench.json (lot 5) : les descriptions de niveau sont la spécification.
// Aucun résultat négatif (les relatifs viennent après) ; corrections écrites étape par étape (calculEtapes).
(function () {
  const { L, T, ent, choix, net, decimal, decimales, facile, calculEtapes } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  const PRIORITES = "Les multiplications et les divisions sont prioritaires sur les additions et les soustractions : ";
  const PARENTHESES = "On calcule d'abord ce qui est entre parenthèses, puis les multiplications et les divisions, puis les additions et les soustractions, en allant de gauche à droite : ";
  // Expression acceptable : tous les résultats intermédiaires positifs ou nuls, au plus maxDec chiffres après la virgule
  function essayer(fabrique, entier, maxDec) {
    for (let i = 0; i < 2000; i++) {
      const texte = fabrique(), c = calculEtapes(texte);
      if (c.intermediaires.some((v) => v < 0 || decimales(v) > (maxDec || 0))) continue;
      if (entier && !Number.isInteger(c.valeur)) continue;
      return c;
    }
    return null;
  }
  const exCalcul = (c, regle) => ({ enonce: "Calculer $" + c.latex + "$.", reponse: c.valeur, correction: regle + "$" + c.etapes + "$." });
  const n = () => ent(2, 12);
  // a/b avec division exacte : "q*b/b" n'est pas joli ; on écrit le dividende déjà calculé
  const quotient = (bMin, bMax, qMin, qMax) => { const b = ent(bMin, bMax), q = ent(qMin, qMax); return b * q + "/" + b; };

  // ---------- Achats ----------
  // [singulier, pluriel, prix minimal, prix maximal] : chaque article reçoit un prix vraisemblable
  const ARTICLES = [["cahier", "cahiers", 1, 6], ["stylo", "stylos", 1, 5], ["croissant", "croissants", 1, 3], ["classeur", "classeurs", 2, 9],
    ["jeu de cartes", "jeux de cartes", 2, 12], ["T-shirt", "T-shirts", 5, 20], ["livre", "livres", 5, 30], ["ballon", "ballons", 5, 35],
    ["sac à dos", "sacs à dos", 15, 50], ["jeu vidéo", "jeux vidéo", 15, 50], ["casque audio", "casques audio", 20, 50]];
  // Deux articles différents dont les prix p1 et p2 sont vraisemblables
  function deuxArticles(p1, p2) {
    const pour = (p) => melanger(ARTICLES.filter((a) => a[2] <= p && p <= a[3]));
    const a1 = pour(p1)[0];
    return [a1, pour(p2).find((a) => a !== a1)];
  }
  const PRENOMS = ["Léa", "Marc", "Inès", "Tom", "Sami", "Jade"];
  const prix = () => (Math.random() < 0.3 ? ent(1, 49) : ent(11, 499) / 10);
  const article = (q, a, p) => q + " " + (q > 1 ? a[1] : a[0]) + " à " + T(p) + " € l'un";

  const ench = [
    {
      id: "ench-sans-paren", chap: "ench", titre: "Calcul sans parenthèses", format: "nombre",
      niveaux: {
        1: () => {
          const simple = facile(1);
          const formes = simple ? [() => n() + "+" + n() + "-" + n(), () => ent(10, 60) + "-" + n() + "+" + n()]
            : [() => n() + "*" + n() + "+" + n(), () => n() + "+" + n() + "*" + n(), () => n() + "*" + n() + "-" + n(), () => ent(10, 60) + "-" + n() + "*" + n(), () => quotient(2, 12, 2, 12) + "+" + n(), () => ent(10, 60) + "-" + quotient(2, 9, 2, 6)];
          return exCalcul(essayer(() => choix(formes)(), true), simple ? "Additions et soustractions ont la même priorité : on calcule de gauche à droite. " : PRIORITES);
        },
        2: () => {
          const simple = facile(2);
          const formes = simple ? [() => n() + "*" + n() + "+" + n() + "*" + n(), () => n() + "+" + n() + "*" + n() + "+" + n()]
            : [() => n() + "+" + quotient(2, 12, 2, 12) + "-" + n(), () => ent(10, 80) + "-" + n() + "*" + n() + "+" + n(), () => n() + "*" + n() + "-" + n() + "+" + n(), () => n() + "+" + n() + "*" + n() + "-" + n(), () => ent(10, 80) + "-" + quotient(2, 9, 2, 9) + "+" + n(), () => n() + "*" + n() + "-" + quotient(2, 9, 2, 9)];
          return exCalcul(essayer(() => choix(formes)(), true), PRIORITES);
        },
        3: () => {
          const formes = [() => ent(2, 40) + "/" + choix([2, 4]) + "+" + n() + "*" + dec(1.1, 5.9) + "-" + ent(1, 9), () => dec(1.1, 5.9) + "*" + n() + "+" + ent(2, 40) + "/" + choix([2, 4]),
            () => ent(10, 50) + "-" + dec(1.1, 5.9) + "*" + ent(2, 6) + "+" + ent(2, 40) + "/4", () => n() + "*" + dec(1.1, 5.9) + "-" + ent(2, 30) + "/" + choix([2, 4]) + "+" + n()];
          return exCalcul(essayer(() => choix(formes)(), false, 2), PRIORITES);
        }
      }
    },
    {
      id: "ench-avec-paren", chap: "ench", titre: "Calcul avec parenthèses", format: "nombre",
      niveaux: {
        1: () => {
          if (facile(1)) return exCalcul(essayer(() => n() + "+(" + n() + "*" + n() + ")", true), PARENTHESES);
          const formes = [() => "(" + n() + "+" + n() + ")*" + n(), () => n() + "*(" + n() + "+" + n() + ")", () => ent(20, 60) + "-(" + n() + "+" + n() + ")", () => n() + "*(" + ent(13, 30) + "-" + n() + ")", () => "(" + ent(13, 30) + "-" + n() + ")*" + n()];
          return exCalcul(essayer(() => choix(formes)(), true), PARENTHESES);
        },
        2: () => {
          if (facile(2)) return exCalcul(essayer(() => n() + "*(" + n() + "+" + n() + ")", true), PARENTHESES);
          const formes = [() => "(" + n() + "+" + n() + ")*(" + n() + "-" + n() + ")", () => n() + "*(" + n() + "+" + n() + ")-" + n(), () => "(" + n() + "+" + n() + "*" + n() + ")/" + ent(2, 9),
            () => ent(60, 120) + "/(" + n() + "+" + n() + ")", () => "(" + ent(30, 60) + "-" + n() + ")*(" + n() + "-1)+" + n(), () => n() + "*(" + n() + "+" + n() + ")+(" + n() + "-1)*" + n()];
          return exCalcul(essayer(() => choix(formes)(), true), PARENTHESES);
        },
        3: () => {
          const m = () => ent(2, 9), d = () => dec(1.1, 5.9);
          const formes = [() => m() + "*[(" + m() + "+" + m() + ")-" + m() + "]", () => "[" + m() + "+(" + m() + "-" + m() + ")]*" + m(), () => ent(20, 90) + "-[" + m() + "*(" + m() + "-" + m() + ")]",
            () => "(" + d() + "+" + m() + ")*(" + m() + "-" + m() + ")", () => m() + "*(" + d() + "+" + m() + ")-" + m(), () => "(" + m() + "+" + m() + ")*" + d() + "-(" + m() + "+" + m() + ")"];
          return exCalcul(essayer(() => choix(formes)(), false, 2), PARENTHESES);
        }
      }
    },
    {
      id: "ench-fraction-barre", chap: "ench", titre: "Calcul avec une barre de fraction", format: "nombre",
      niveaux: (function () {
        function ex(num, den, entier, maxDec) {
          for (let i = 0; i < 3000; i++) {
            const N = calculEtapes(num()), D = calculEtapes(den());
            if (N.intermediaires.concat(D.intermediaires).some((v) => v < 0) || N.valeur <= 0 || D.valeur <= 0) continue;
            const r = net(N.valeur / D.valeur);
            if (entier ? !Number.isInteger(r) : Number.isInteger(r) || decimales(r) > maxDec || Math.abs(r * 100 - Math.round(r * 100)) > 1e-9) continue;
            const latex = "\\dfrac{" + N.latex + "}{" + D.latex + "}";
            return {
              enonce: "Calculer $" + latex + "$.", reponse: r,
              correction: "La barre de fraction joue le rôle de parenthèses : on calcule le numérateur et le dénominateur avant de diviser. " + (N.intermediaires.length ? "Numérateur : $" + N.etapes + "$. " : "") +
                (D.intermediaires.length ? "Dénominateur : $" + D.etapes + "$. " : "") + "Donc $" + latex + " = " + L(N.valeur) + " \\div " + L(D.valeur) + " = " + L(r) + "$."
            };
          }
        }
        return {
          1: () => (facile(1) ? ex(() => String(ent(10, 99)), () => String(ent(2, 9)), true) : ex(() => ent(10, 60) + "+" + ent(10, 60), () => String(ent(2, 9)), true)),
          2: () => {
            if (facile(2)) { const c = ent(2, 9); return ex(() => n() + "*" + c, () => String(c), true); }
            return ex(() => choix([() => n() + "*" + n() + "+" + n(), () => n() + "*" + n() + "-" + n(), () => n() + "*" + n()])(), () => choix([() => String(ent(2, 12)), () => ent(2, 12) + "+1", () => ent(3, 12) + "-1", () => n() + "+" + n()])(), true);
          },
          3: () => ex(() => choix([() => n() + "*" + n() + "-" + n() + "*" + n(), () => n() + "+" + n() + "*" + n(), () => n() + "*" + n() + "+" + n() + "*" + n()])(), () => choix([() => n() + "-" + n(), () => n() + "+" + n(), () => ent(2, 5) + "*" + ent(2, 5)])(), false, 2)
        };
      })()
    },
    {
      id: "ench-distrib", chap: "ench", titre: "Distributivité pour calculer vite", format: "nombre",
      niveaux: (function () {
        function ex(k, base, c) {
          const m = base + c, r = net(k * m), plus = c > 0, C = Math.abs(c);
          return {
            enonce: "Calculer astucieusement $" + L(k) + " \\times " + L(m) + "$.", reponse: r,
            correction: "On écrit $" + L(m) + " = " + L(base) + (plus ? " + " : " - ") + C + "$. Alors $" + L(k) + " \\times " + L(m) + " = " + L(k) + " \\times " + L(base) + (plus ? " + " : " - ") + L(k) + " \\times " + C + " = " + L(net(k * base)) + (plus ? " + " : " - ") + L(net(k * C)) + " = " + L(r) + "$."
          };
        }
        const pm = (a, b) => ent(a, b) * choix([1, -1]);
        return {
          // Niveau 1 : 98 à 102 seulement (9 × 97 était déjà difficile pour démarrer)
          1: () => (facile(1) ? ex(ent(2, 9), 100, 1) : ex(ent(2, 9), 100, pm(1, 2))),
          2: () => {
            if (facile(2)) return ex(ent(11, 30), 100, 1);
            const [base, c] = choix([[100, pm(1, 5)], [200, pm(1, 4)], [10, pm(1, 1)], [20, pm(1, 1)], [50, pm(1, 1)]]);
            return ex(ent(11, 30), base, c);
          },
          3: () => {
            const k = Math.random() < 0.5 ? choix([dec(1.1, 5.9), 2.5, 7.5]) : ent(12, 49);
            const [base, c] = choix([[100, pm(1, 4)], [1000, pm(1, 9)], [10, pm(1, 1)]]);
            return ex(k, base, c);
          }
        };
      })()
    },
    {
      id: "ench-factorisation", chap: "ench", titre: "Factoriser pour calculer vite", format: "nombre",
      niveaux: (function () {
        function ex(k, termes, moins, kDevant) {
          const total = net(moins ? termes[0] - termes[1] : termes.reduce((a, b) => a + b, 0)), r = net(k * total);
          const ecrit = termes.map((t) => (kDevant ? L(k) + " \\times " + L(t) : L(t) + " \\times " + L(k))).join(moins ? " - " : " + ");
          return {
            enonce: "Calculer astucieusement $" + ecrit + "$.", reponse: r,
            correction: "On factorise par $" + L(k) + "$ : $" + ecrit + " = " + L(k) + " \\times (" + termes.map(L).join(moins ? " - " : " + ") + ") = " + L(k) + " \\times " + L(total) + " = " + L(r) + "$."
          };
        }
        const couper = (total) => { const a = ent(1, total - 1); return [a, total - a]; };
        return {
          1: () => {
            const k = ent(2, 19), total = choix([10, 100]);
            return ex(k, facile(1) ? [total / 2, total / 2] : couper(total), false, true);
          },
          2: () => {
            const k = ent(11, 49), total = facile(2) ? 10 : choix([10, 20, 50, 100, 1000]), forme = ent(1, 3);
            if (forme === 3) { const b = ent(1, total), a = b + total; return ex(k, [a, b], true, true); }
            return ex(k, couper(total), false, forme === 1);
          },
          3: () => {
            if (Math.random() < 0.5) { const total = choix([100, 1000]); let a, b; do { a = ent(1, total - 2); b = ent(1, total - a - 1); } while (total - a - b < 1); return ex(ent(11, 49), [a, b, total - a - b], false, true); }
            const k = dec(1.1, 9.9);
            if (Math.random() < 0.5) { const a = dec(0.1, 9.9); return ex(k, [a, net(10 - a)], false, true); }
            return ex(k, couper(100), false, true);
          }
        };
      })()
    },
    {
      id: "ench-regrouper", chap: "ench", titre: "Regrouper pour calculer vite", format: "nombre",
      niveaux: (function () {
        function produit(paire, autres, enTete) {
          const facteurs = enTete ? paire.concat(autres) : melanger(paire.concat(autres)), p = net(paire[0] * paire[1]), reste = net(autres.reduce((a, b) => a * b, 1)), r = net(p * reste);
          return {
            enonce: "Calculer astucieusement $" + facteurs.map(L).join(" \\times ") + "$.", reponse: r,
            correction: "On regroupe les facteurs dont le produit est simple : $" + L(paire[0]) + " \\times " + L(paire[1]) + " = " + L(p) + "$. Alors $" + facteurs.map(L).join(" \\times ") + " = " + L(p) + " \\times " + autres.map(L).join(" \\times ") + (autres.length > 1 ? " = " + L(p) + " \\times " + L(reste) : "") + " = " + L(r) + "$."
          };
        }
        return {
          1: () => (facile(1) ? produit(choix([[5, 2], [25, 4]]), [ent(2, 9)], true) : produit(choix([[25, 4], [5, 2], [50, 2], [20, 5], [125, 8]]), [ent(3, 19)])),
          2: () => {
            if (facile(2) || Math.random() < 0.5) {
              const [a, b] = facile(2) ? [50, 50] : (() => { const x = ent(11, 89); return [x, 100 - x]; })();
              const [c, d] = (() => { const x = ent(11, 89); return [x, 100 - x]; })(), v = melanger([a, b, c, d]);
              return {
                enonce: "Calculer astucieusement $" + v.join(" + ") + "$.", reponse: a + b + c + d,
                correction: "On regroupe les nombres dont la somme est 100 : $" + a + " + " + b + " = 100$ et $" + c + " + " + d + " = 100$. Alors $" + v.join(" + ") + " = 100 + 100 = 200$."
              };
            }
            return produit(choix([[25, 4], [125, 8], [5, 20], [50, 2], [250, 4], [75, 4]]), [ent(3, 19), ent(3, 19)]);
          },
          3: () => {
            const paire = choix([[0.25, 4], [0.5, 2], [1.25, 8], [2.5, 4], [0.75, 4], [0.5, 20], [0.2, 5], [0.4, 25], [1.5, 2], [3.5, 2]]);
            const autres = Math.random() < 0.5 ? [ent(11, 49)] : [ent(11, 49), choix([ent(2, 9), dec(1.1, 5.9)])];
            return produit(paire, autres);
          }
        };
      })()
    },
    {
      id: "ench-div-decimal", chap: "ench", titre: "Division par un décimal", format: "nombre",
      niveaux: (function () {
        function ex(d, q) {
          const a = net(q * d), k = Math.pow(10, decimales(d)), A = net(a * k), D = net(d * k);
          return {
            enonce: "Calculer $" + L(a) + " \\div " + L(d) + "$.", reponse: q,
            correction: "On multiplie le dividende et le diviseur par $" + L(k) + "$ pour que le diviseur soit un entier : $" + L(a) + " \\div " + L(d) + " = " + L(A) + " \\div " + L(D) + " = " + L(q) + "$."
          };
        }
        const quotientN = () => (Math.random() < 0.5 ? ent(2, 40) : dec(1.1, 9.9));
        return {
          // Diviseurs simples et quotient entier aux niveaux 1 et 2 (5,239 ÷ 1,69 était trop long à la main)
          1: () => ex(facile(1) ? 0.5 : choix([0.1, 0.2, 0.5]), ent(2, 30)),
          2: () => ex(facile(2) ? 0.1 : ent(2, 9) / 10, ent(2, 30)),
          3: () => ex(choix([0.25, 0.4, 1.2, 1.5, 2.5, 0.12, 0.15, 0.05]), quotientN())
        };
      })()
    },
    {
      id: "ench-situation", chap: "ench", titre: "Problème à plusieurs étapes", format: "nombre",
      niveaux: {
        1: () => {
          // Niveau 1 : prix entiers (34,8 € × 4 + 16,9 € × 9 était trop lourd pour démarrer)
          const qui = choix(PRENOMS), q1 = ent(2, 9), q2 = ent(2, 9), p1 = ent(1, 20), p2 = ent(1, 20), [a1, a2] = deuxArticles(p1, p2);
          if (facile(1)) { const r = net(q1 * p1); return { enonce: qui + " achète " + article(q1, a1, p1) + ". Quel est le prix total, en euros ?", reponse: r, unite: "€", correction: "Prix total : $" + q1 + " \\times " + L(p1) + " = " + L(r) + "$ €." }; }
          const t1 = net(q1 * p1), t2 = net(q2 * p2), r = net(t1 + t2);
          return { enonce: qui + " achète " + article(q1, a1, p1) + " et " + article(q2, a2, p2) + ". Quel est le prix total, en euros ?", reponse: r, unite: "€", correction: "Prix total : $" + q1 + " \\times " + L(p1) + " + " + q2 + " \\times " + L(p2) + " = " + L(t1) + " + " + L(t2) + " = " + L(r) + "$ €." };
        },
        2: () => {
          for (;;) {
            const qui = choix(PRENOMS), q1 = ent(2, 9), q2 = ent(2, 9), p1 = ent(11, 99) / 10, p2 = ent(11, 99) / 10, [a1, a2] = deuxArticles(p1, p2);
            const t1 = net(q1 * p1), t2 = net(q2 * p2), dep = net(t1 + t2), billet = [10, 20, 50, 100].find((b) => b > dep), r = net(billet - dep);
            if (!billet) continue;
            return {
              enonce: qui + " achète " + article(q1, a1, p1) + " et " + article(q2, a2, p2) + ". " + (["Léa", "Inès", "Jade"].includes(qui) ? "Elle" : "Il") + " paie avec un billet de " + billet + " €. Combien d'euros lui rend-on ?", reponse: r, unite: "€",
              correction: "Dépense : $" + q1 + " \\times " + L(p1) + " + " + q2 + " \\times " + L(p2) + " = " + L(t1) + " + " + L(t2) + " = " + L(dep) + "$ €. On rend $" + billet + " - " + L(dep) + " = " + L(r) + "$ €."
            };
          }
        },
        3: () => {
          for (;;) {
            const cas = ent(1, 3);
            if (cas === 1) {
              const amis = ent(2, 6), q1 = ent(2, 9), q2 = ent(2, 9), p1 = ent(11, 99) / 10, p2 = ent(11, 99) / 10, [a1, a2] = deuxArticles(p1, p2);
              const tot = net(q1 * p1 + q2 * p2), r = net(tot / amis);
              if (decimales(r) > 2 || Math.abs(r * 100 - Math.round(r * 100)) > 1e-9) continue;
              return { enonce: amis + " amis achètent ensemble " + article(q1, a1, p1) + " et " + article(q2, a2, p2) + ". Ils partagent la dépense en parts égales. Combien d'euros chacun paie-t-il ?", reponse: r, unite: "€", correction: "Dépense : $" + q1 + " \\times " + L(p1) + " + " + q2 + " \\times " + L(p2) + " = " + L(net(q1 * p1)) + " + " + L(net(q2 * p2)) + " = " + L(tot) + "$ €. Chacun paie $" + L(tot) + " \\div " + amis + " = " + L(r) + "$ €." };
            }
            if (cas === 2) {
              const q = ent(3, 9), p = ent(11, 199) / 10, [a1] = deuxArticles(p, p), remise = ent(2, 10), tot = net(q * p), r = net(tot - remise);
              if (r <= 0) continue;
              return { enonce: "Un magasin vend " + q + " " + a1[1] + " à " + T(p) + " € l'un et fait une remise de " + remise + " € sur le total. Combien d'euros paie-t-on ?", reponse: r, unite: "€", correction: "Prix avant remise : $" + q + " \\times " + L(p) + " = " + L(tot) + "$ €. Avec la remise : $" + L(tot) + " - " + remise + " = " + L(r) + "$ €." };
            }
            const paquets = ent(3, 9), parPaquet = ent(4, 10), manque = ent(1, 9), p = ent(11, 39) / 10, livres = paquets * parPaquet - manque, r = net(livres * p);
            if (livres <= 0) continue;
            return { enonce: "Une école commande " + paquets + " paquets de " + parPaquet + " cahiers. Il manque " + manque + " cahier" + (manque > 1 ? "s" : "") + " à la livraison. Chaque cahier livré coûte " + T(p) + " €. Combien d'euros l'école doit-elle payer ?", reponse: r, unite: "€", correction: "Nombre de cahiers livrés : $" + paquets + " \\times " + parPaquet + " - " + manque + " = " + livres + "$. Prix à payer : $" + livres + " \\times " + L(p) + " = " + L(r) + "$ €." };
          }
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("5e", ench);
})();
