// Techniques d'entraînement de 4e : « Nombres relatifs : addition et soustraction » (rel1).
// D'après propositions/referentiels/4e/rel1.json (lot 1) : les descriptions de niveau sont la spécification.
// Notation de la classe : les positifs sont écrits avec leur signe, (+5).
(function () {
  const { L, T, S, P, ent, choix, net, nonNul, decimal, decimales, facile } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  // Tirage pondéré : selon([[0.45, "a"], [0.55, "b"]])
  const selon = (liste) => { let r = Math.random(); for (const [p, v] of liste) { if ((r -= p) < 0) return v; } return liste[liste.length - 1][1]; };
  // Signes de deux nombres selon le cas tiré
  const signes = (cas) => (cas === "contraires" ? choix([[1, -1], [-1, 1]]) : cas === "negatifs" ? [-1, -1] : [1, 1]);
  const somme = (l) => net(l.reduce((a, b) => a + b, 0));
  const minuscule = (s) => s.charAt(0).toLowerCase() + s.slice(1);

  // Correction d'une addition a + b, comme au tableau (f : écriture des nombres, par défaut L)
  function regle(a, b, f) {
    f = f || L;
    const r = net(a + b);
    if (r === 0) return "Les deux nombres sont opposés : leur somme est nulle, $" + S(a) + " + " + S(b) + " = 0$.";
    const A = Math.abs(a), B = Math.abs(b);
    if ((a < 0) === (b < 0)) {
      return "Même signe : on additionne les distances à zéro, $" + f(A) + " + " + f(B) + " = " + f(net(A + B)) +
        "$, et on garde le signe commun" + (a < 0 ? ", donc $" + f(r) + "$." : ".");
    }
    const grand = A > B ? a : b, petit = Math.min(A, B);
    return "Signes contraires : on soustrait les distances à zéro, $" + f(Math.abs(grand)) + " - " + f(petit) + " = " + f(Math.abs(r)) +
      "$, et on garde le signe du nombre le plus éloigné de 0, ici $" + f(grand) + "$ (" +
      (grand < 0 ? "négatif), donc $" + f(r) + "$." : "positif).");
  }
  // Correction d'une soustraction a − b : on ajoute l'opposé
  function soustraction(a, b) {
    return "Soustraire, c'est ajouter l'opposé : $" + S(a) + " - " + S(b) + " = " + S(a) + " + " + S(-b) + "$. " + regle(a, -b);
  }

  // Termes d'une somme : on regroupe les positifs, puis les négatifs
  function regrouper(termes) {
    const pos = termes.filter((x) => x > 0), neg = termes.filter((x) => x < 0);
    const sp = somme(pos), sn = somme(neg), r = net(sp + sn);
    const lignePos = pos.length > 1 ? pos.map(L).join(" + ") + " = " + L(sp) : L(sp);
    const ligneNeg = neg.length > 1 ? L(neg[0]) + neg.slice(1).map((x) => " - " + L(-x)).join("") + " = " + L(sn) : L(sn);
    return "On regroupe les termes positifs, puis les termes négatifs. Termes positifs : $" + lignePos + "$ ; termes négatifs : $" + ligneNeg +
      "$. Puis $" + L(sp) + " - " + L(-sn) + " = " + L(r) + "$" + (r !== 0 ? " (on garde le signe du plus éloigné de 0)." : ".");
  }
  // Écriture simplifiée (sans parenthèses) : -5 + 12 - 3
  const sansParentheses = (termes) => L(termes[0]) + termes.slice(1).map((x) => (x < 0 ? " - " + L(-x) : " + " + L(x))).join("");
  // Deux termes opposés dans la liste ?
  const opposes = (t) => t.some((x, i) => t.some((y, j) => j > i && x === -y));
  // Distances à zéro → termes signés, avec nbNeg termes négatifs placés au hasard
  function avecSignes(distances, nbNeg) {
    const places = melanger(distances.map((_, i) => i)).slice(0, nbNeg);
    return distances.map((d, i) => (places.includes(i) ? -d : d));
  }

  // ---------- Opposé et distance à zéro ----------
  function exOppDist(x, ecriture, calcul) {
    const opp = Math.random() < 0.5;
    const r = opp ? 0 - x : Math.abs(x);
    const fin = x === 0 ? (opp ? "L'opposé de 0 est 0." : "La distance à zéro de 0 est 0.")
      : opp ? "L'opposé de $" + L(x) + "$ est $" + L(r) + "$" + (calcul ? "." : " : même distance à zéro, signe contraire.")
        : "La distance à zéro de $" + L(x) + "$ est $" + L(r) + "$" + (calcul ? "." : " : c'est le nombre sans son signe.");
    return {
      enonce: "Donner " + (opp ? "l'opposé" : "la distance à zéro") + (calcul ? " du nombre $" : " de $") + ecriture + "$",
      reponse: r, correction: (calcul ? calcul + " " : "") + fin
    };
  }

  // ---------- Additions et soustractions de deux nombres ----------
  function deuxNombres(niveau, valeur, poids, pasEgaux) {
    for (;;) {
      const cas = selon(poids);
      if (cas === "opposes") { const x = ent(1, 20); return choix([[x, -x], [-x, x]]); }
      if (cas === "egaux") { const x = -ent(1, 20); return [x, x]; }
      const s = signes(cas), a = valeur() * s[0], b = valeur() * s[1];
      if (pasEgaux && Math.abs(a) === Math.abs(b)) continue;
      if (cas === "positifs" && a === b) continue;
      return [a, b];
    }
  }

  // ---------- Comparer : correction ----------
  function correctionComparer(v, grand) {
    const neg = v.filter((x) => x < 0), pos = v.filter((x) => x > 0);
    const liste = (l) => l.map((x) => "$" + L(x) + "$").join(" ; ");
    if (grand) {
      if (pos.length && !neg.length && !v.includes(0)) return "Tous les nombres sont positifs : le plus grand est $" + L(Math.max(...pos)) + "$.";
      if (pos.length === 1) return "Seul $" + L(pos[0]) + "$ est positif : c'est le plus grand.";
      if (pos.length > 1) return "Les nombres positifs sont plus grands que les négatifs. Parmi les positifs (" + liste(pos) + "), le plus grand est $" + L(Math.max(...pos)) + "$.";
      const d = Math.min(...neg.map(Math.abs));
      return "Tous les nombres sont négatifs : le plus grand est celui dont la distance à zéro est la plus petite. Distances à zéro : " +
        liste(neg.map(Math.abs)) + " ; la plus petite est $" + L(d) + "$, donc $" + L(-d) + "$.";
    }
    if (!neg.length) return "Tous les nombres sont positifs : le plus petit est $" + L(Math.min(...v)) + "$.";
    if (neg.length === 1) return "Seul $" + L(neg[0]) + "$ est négatif, il est plus petit que tous les autres : c'est le plus petit.";
    const d = Math.max(...neg.map(Math.abs));
    return "Le plus petit est un nombre négatif ; entre négatifs, le plus petit est celui dont la distance à zéro est la plus grande. Distances à zéro : " +
      liste(neg.map(Math.abs)) + " ; la plus grande est $" + L(d) + "$, donc $" + L(-d) + "$.";
  }
  function exComparer(v) {
    const grand = Math.random() < 0.5;
    return {
      enonce: "Quel est le plus " + (grand ? "grand" : "petit") + " de ces nombres : " + v.map((x) => "$" + L(x) + "$").join(" ; ") + " ?",
      reponse: grand ? Math.max(...v) : Math.min(...v), correction: correctionComparer(v, grand)
    };
  }
  const distincts = (v) => new Set(v).size === v.length;

  // ---------- Distance sur une droite graduée ----------
  const POINTS = [["A", "B"], ["M", "N"], ["E", "F"], ["R", "S"], ["K", "L"]];
  function exDistance(x1, x2) {
    const [n1, n2] = choix(POINTS), nom = n1 + n2;
    const g = Math.max(x1, x2), p = Math.min(x1, x2), d = net(g - p);
    return {
      enonce: "Sur une droite graduée, les points $" + n1 + "$ et $" + n2 + "$ ont pour abscisses $" + L(x1) + "$ et $" + L(x2) + "$. Calculer la distance $" + nom + "$.",
      reponse: d,
      correction: "La distance est la plus grande abscisse moins la plus petite : $" + nom + " = " + L(g) + " - " + P(p) +
        (p < 0 ? " = " + L(g) + " + " + L(-p) : "") + " = " + L(d) + "$."
    };
  }

  // ---------- Signe d'une somme ----------
  function regleSigne(a, b) {
    if ((a < 0) === (b < 0)) return "Même signe : la somme garde ce signe, elle est " + (a < 0 ? "négative." : "positive.");
    const grand = Math.abs(a) > Math.abs(b) ? a : b;
    return "Signes contraires : le signe est celui du nombre le plus éloigné de 0. $" + L(Math.abs(grand)) + " > " + L(Math.min(Math.abs(a), Math.abs(b))) +
      "$ (distances à zéro), donc la somme est " + (grand < 0 ? "négative." : "positive.");
  }

  const rel1 = [
    {
      id: "opp-dist", chap: "rel1", titre: "Opposé et distance à zéro", format: "nombre",
      niveaux: {
        1: () => { const x = Math.random() < 0.1 ? 0 : facile(1) ? ent(1, 30) : -ent(1, 30); return exOppDist(x, L(x)); },
        2: () => { const x = decimal(19.9, 1) * (facile(2) ? 1 : -1); return exOppDist(x, L(x)); },
        3: () => {
          for (;;) {
            const a = ent(1, 25), b = ent(1, 25), forme = ent(1, 4);
            const [x1, op, x2] = forme === 1 ? [-a, "+", b] : forme === 2 ? [-a, "-", b] : forme === 3 ? [a, "-", -b] : [-a, "+", -b];
            const r = op === "+" ? x1 + x2 : x1 - x2;
            if (r === 0) continue;
            return exOppDist(r, S(x1) + " " + op + " " + S(x2), op === "+" ? regle(x1, x2) : soustraction(x1, x2));
          }
        }
      }
    },
    {
      id: "add-deux", chap: "rel1", titre: "Addition de deux relatifs", format: "nombre",
      niveaux: {
        1: () => {
          const [a, b] = deuxNombres(1, () => ent(1, 20), [[0.45, "contraires"], [0.35, "negatifs"], [0.08, "opposes"], [0.12, "positifs"]]);
          return { enonce: "Calculer $" + S(a) + " + " + S(b) + "$", reponse: net(a + b), correction: regle(a, b) };
        },
        2: () => {
          let a, b;
          do {
            [a, b] = deuxNombres(2, () => (Math.random() < 0.5 ? ent(2, 30) : decimal(9.9, 1)), [[0.6, "contraires"], [0.35, "negatifs"], [0.05, "positifs"]], true);
          } while (!decimales(a) && !decimales(b));
          return { enonce: "Calculer $" + S(a) + " + " + S(b) + "$", reponse: net(a + b), correction: regle(a, b) };
        },
        3: () => {
          let a, b;
          do {
            const s = signes(selon([[0.6, "contraires"], [0.4, "negatifs"]]));
            a = decimal(20, 2) * s[0];
            b = choix([() => ent(2, 40), () => decimal(19.9, 1), () => decimal(20, 2)])() * s[1];
          } while (Math.abs(a) === Math.abs(b));
          if (Math.random() < 0.5) [a, b] = [b, a];
          return { enonce: "Calculer $" + S(a) + " + " + S(b) + "$", reponse: net(a + b), correction: regle(a, b) };
        }
      }
    },
    {
      id: "sous-deux", chap: "rel1", titre: "Soustraction de deux relatifs", format: "nombre",
      niveaux: {
        1: () => {
          const [a, b] = deuxNombres(1, () => ent(1, 20), [[0.45, "contraires"], [0.38, "negatifs"], [0.05, "egaux"], [0.12, "positifs"]]);
          return { enonce: "Calculer $" + S(a) + " - " + S(b) + "$", reponse: net(a - b), correction: soustraction(a, b) };
        },
        2: () => {
          const [a, b] = deuxNombres(2, () => (Math.random() < 0.5 ? ent(2, 30) : decimal(9.9, 1)), [[0.55, "contraires"], [0.4, "negatifs"], [0.05, "positifs"]], true);
          return { enonce: "Calculer $" + S(a) + " - " + S(b) + "$", reponse: net(a - b), correction: soustraction(a, b) };
        },
        3: () => {
          const [a, b] = deuxNombres(3, () => (Math.random() < 0.5 ? decimal(20, 2) : decimal(19.9, 1)), [[0.55, "contraires"], [0.45, "negatifs"]], true);
          return { enonce: "Calculer $" + S(a) + " - " + S(b) + "$", reponse: net(a - b), correction: soustraction(a, b) };
        }
      }
    },
    {
      id: "somme-alg", chap: "rel1", titre: "Somme algébrique sans parenthèses", format: "nombre",
      niveaux: {
        1: () => {
          for (;;) {
            const t = avecSignes([ent(1, 20), ent(1, 20), ent(1, 20)], ent(1, 2));
            const r = somme(t);
            if (opposes(t) || Math.abs(r) > 40 || (r === 0 && Math.random() < 0.8)) continue;
            return { enonce: "Calculer $" + sansParentheses(t) + "$", reponse: r, correction: regrouper(t) };
          }
        },
        2: () => {
          for (;;) {
            const n = ent(4, 5), t = avecSignes(Array.from({ length: n }, () => ent(1, 30)), ent(2, n - 1));
            const r = somme(t);
            if (opposes(t) || Math.abs(r) > 60 || (r === 0 && Math.random() < 0.8)) continue;
            return { enonce: "Calculer $" + sansParentheses(t) + "$", reponse: r, correction: regrouper(t) };
          }
        },
        3: () => {
          for (;;) {
            const n = ent(5, 6), nbDec = ent(1, 2);
            const distances = melanger(Array.from({ length: n }, (_, i) => (i < nbDec ? decimal(9.9, 1) : ent(1, 30))));
            const t = avecSignes(distances, ent(2, n - 1));
            const r = somme(t);
            if (opposes(t) || Math.abs(r) > 50 || (r === 0 && Math.random() < 0.95)) continue;
            return { enonce: "Calculer $" + sansParentheses(t) + "$", reponse: r, correction: regrouper(t) };
          }
        }
      }
    },
    {
      id: "somme-paren", chap: "rel1", titre: "Somme de relatifs avec parenthèses", format: "nombre",
      niveaux: (function () {
        // n termes avec parenthèses, reliés par + ou − (au moins un −)
        function exParentheses(niveau, n, max, borne, unDecimal) {
          for (;;) {
            const distances = Array.from({ length: n }, () => ent(1, max));
            if (unDecimal) distances[ent(0, n - 1)] = decimal(9.9, 1);
            const t = facile(niveau) ? distances : avecSignes(distances, ent(1, n));
            const ops = Array.from({ length: n - 1 }, () => choix(["+", "-"]));
            if (!ops.includes("-")) ops[ent(0, n - 2)] = "-";
            const effectifs = t.map((x, i) => (i > 0 && ops[i - 1] === "-" ? -x : x));
            const r = somme(effectifs);
            if (Math.abs(r) > borne) continue;
            const ecriture = S(t[0]) + t.slice(1).map((x, i) => " " + ops[i] + " " + S(x)).join("");
            return {
              enonce: "Calculer $" + ecriture + "$", reponse: r,
              correction: "On supprime les parenthèses ($a + (-b) = a - b$ et $a - (-b) = a + b$) : $" + ecriture + " = " + sansParentheses(effectifs) + "$. " + regrouper(effectifs)
            };
          }
        }
        return { 1: () => exParentheses(1, 3, 15, 40), 2: () => exParentheses(2, 4, 20, 60), 3: () => exParentheses(3, 5, 20, 50, true) };
      })()
    },
    {
      id: "distance-axe", chap: "rel1", titre: "Distance sur une droite graduée", format: "nombre",
      niveaux: {
        1: () => {
          let a, b;
          do { const s = signes(selon([[0.55, "contraires"], [0.33, "negatifs"], [0.12, "positifs"]])); a = ent(1, 15) * s[0]; b = ent(1, 15) * s[1]; } while (a === b);
          return exDistance(a, b);
        },
        2: () => {
          let a, b;
          const v = () => (Math.random() < 0.7 ? decimal(9.9, 1) : ent(1, 15));
          do { const s = signes(selon([[0.55, "contraires"], [0.4, "negatifs"], [0.05, "positifs"]])); a = v() * s[0]; b = v() * s[1]; } while (a === b);
          return exDistance(a, b);
        },
        3: () => {
          const v = () => decimal(15, choix([1, 2]));
          if (Math.random() < 0.5) {
            let a, b;
            do { const s = signes(choix(["contraires", "negatifs"])); a = v() * s[0]; b = v() * s[1]; } while (a === b);
            return exDistance(a, b);
          }
          const [n1, n2] = choix(POINTS);
          const xA = v() * (Math.random() < 0.7 ? -1 : 1), d = Math.random() < 0.5 ? ent(2, 15) : decimal(15, 1), droite = Math.random() < 0.5;
          const r = net(droite ? xA + d : xA - d);
          return {
            enonce: "Sur une droite graduée, le point $" + n1 + "$ a pour abscisse $" + L(xA) + "$. Le point $" + n2 + "$ est à " + (droite ? "droite" : "gauche") +
              " de $" + n1 + "$, à la distance " + T(d) + ". Quelle est l'abscisse de $" + n2 + "$ ?",
            reponse: r,
            correction: "Un point à droite a une abscisse plus grande (on ajoute), à gauche plus petite (on retranche) : $" + P(xA) + (droite ? " + " : " - ") + L(d) +
              " = " + L(r) + "$, donc l'abscisse de $" + n2 + "$ est $" + L(r) + "$."
          };
        }
      }
    },
    {
      id: "plus-grand", chap: "rel1", titre: "Comparer des relatifs", format: "nombre",
      niveaux: {
        1: () => {
          let v;
          const tousPositifs = facile(1);
          do { v = tousPositifs ? [ent(1, 20), ent(1, 20), ent(1, 20)] : [nonNul(-20, 20), nonNul(-20, 20), nonNul(-20, 20)]; } while (!distincts(v) || (!tousPositifs && !v.some((x) => x < 0)));
          return exComparer(v);
        },
        2: () => {
          let v;
          const tousPositifs = facile(2);
          do { v = Array.from({ length: 4 }, () => decimal(9.9, 1) * (tousPositifs ? 1 : choix([1, -1]))); } while (!distincts(v) || (!tousPositifs && v.filter((x) => x < 0).length < 2));
          return exComparer(v);
        },
        3: () => {
          let v;
          do {
            const E = ent(1, 9);
            const memePartie = [E + ent(1, 9) / 10, E + ent(1, 9) / 100, E + decimal(0.99, 2)];
            v = memePartie.concat([decimal(9.9, 1), decimal(9.99, 2)]).map((x) => -net(x));
          } while (!distincts(v));
          const grand = Math.random() < 0.5;
          if (!grand && Math.random() < 0.3) { const i = v.indexOf(Math.max(...v)); v[i] = 0; }
          v = melanger(v);
          return {
            enonce: "Quel est le plus " + (grand ? "grand" : "petit") + " de ces nombres : " + v.map((x) => "$" + L(x) + "$").join(" ; ") + " ?",
            reponse: grand ? Math.max(...v) : Math.min(...v), correction: correctionComparer(v, grand)
          };
        }
      }
    },
    {
      id: "situation-rel1", chap: "rel1", titre: "Situation concrète avec des relatifs", format: "nombre",
      niveaux: {
        1: () => {
          const ctx = choix(["temperature", "plongeur", "compte"]);
          for (;;) {
            if (ctx === "temperature") {
              const cas = selon([[0.45, "nh"], [0.35, "pb"], [0.08, "nb"], [0.12, "ph"]]);
              const init = cas[0] === "n" ? -ent(1, 20) : ent(1, 25), v = ent(2, 20), hausse = cas[1] === "h", r = hausse ? init + v : init - v;
              if (Math.abs(r) > 35) continue;
              const h1 = ent(5, 9), h2 = h1 + ent(2, 6);
              return {
                enonce: "Il fait " + T(init) + " °C à " + h1 + " h. À " + h2 + " h, la température a " + (hausse ? "monté" : "baissé") + " de " + v + " °C. Quelle est la température à " + h2 + " h ?",
                reponse: r, unite: "°C", correction: regle(init, hausse ? v : -v) + " Température : $" + L(r) + "$ °C."
              };
            }
            if (ctx === "plongeur") {
              const init = -ent(5, 40), v = ent(2, 20), descend = Math.random() < 0.5, r = descend ? init - v : init + v;
              if (r < -60 || r >= 0) continue;
              return {
                enonce: "Un plongeur est à une altitude de " + T(init) + " m (par rapport à la surface de la mer). Il " + (descend ? "descend" : "remonte") + " de " + v + " m. Quelle est sa nouvelle altitude ?",
                reponse: r, unite: "m", correction: regle(init, descend ? -v : v) + " Altitude : $" + L(r) + "$ m."
              };
            }
            const cas = selon([[0.45, "nh"], [0.35, "pb"], [0.2, "nb"]]);
            const init = (cas[0] === "n" ? -1 : 1) * ent(20, 300), v = ent(10, 300), hausse = cas[1] === "h", r = hausse ? init + v : init - v;
            return {
              enonce: "Le solde d'un compte est de " + T(init) + " €. " + (hausse ? "On dépose " + T(v) + " € sur le compte." : "On retire " + T(v) + " € du compte.") + " Quel est le nouveau solde ?",
              reponse: r, unite: "€", correction: regle(init, hausse ? v : -v) + " Solde : $" + L(r) + "$ €."
            };
          }
        },
        2: () => {
          const { fixe, fixeTexte } = Savoirs.calculsOutils;
          const ctx = choix(["temperature", "plongeur", "compte"]);
          for (;;) {
            if (ctx === "temperature") {
              const init = decimal(20, 1) * (Math.random() < 0.8 ? -1 : 1), v = decimal(15, 1), hausse = Math.random() < 0.5, r = net(hausse ? init + v : init - v);
              if (r === 0 || Math.abs(r) > 30 || v < 0.5) continue;
              return {
                enonce: "Il fait " + T(init) + " °C. La température " + (hausse ? "monte" : "baisse") + " de " + T(v) + " °C. Quelle est la nouvelle température ?",
                reponse: r, unite: "°C", correction: regle(init, hausse ? v : -v) + " Température : $" + L(r) + "$ °C."
              };
            }
            if (ctx === "plongeur") {
              const init = -decimal(40, 1), v = decimal(15, 1), descend = Math.random() < 0.5, r = net(descend ? init - v : init + v);
              if (init > -5 || r < -60 || r >= 0) continue;
              return {
                enonce: "Un plongeur est à une altitude de " + T(init) + " m. Il " + (descend ? "descend" : "remonte") + " de " + T(v) + " m. Quelle est sa nouvelle altitude ?",
                reponse: r, unite: "m", correction: regle(init, descend ? -v : v) + " Altitude : $" + L(r) + "$ m."
              };
            }
            // Euros avec centimes (0,50 €), écrits avec deux décimales partout
            const init = (Math.random() < 0.8 ? -1 : 1) * ent(40, 600) / 2, v = ent(20, 600) / 2, hausse = Math.random() < 0.5, r = net(hausse ? init + v : init - v);
            if (Number.isInteger(init) && Number.isInteger(v)) continue;
            const f = (x) => fixe(x, 2);
            return {
              enonce: "Le solde d'un compte est de " + fixeTexte(init, 2) + " €. " + (hausse ? "On dépose " + fixeTexte(v, 2) + " € sur le compte." : "On retire " + fixeTexte(v, 2) + " € du compte.") + " Quel est le nouveau solde ?",
              reponse: r, unite: "€", correction: regle(init, hausse ? v : -v, f) + " Solde : $" + f(r) + "$ €."
            };
          }
        },
        3: () => {
          for (;;) {
            if (Math.random() < 0.5) {
              // Deux variations successives de température
              const t0 = nonNul(-12, 12), v1 = ent(2, 18), v2 = ent(2, 18);
              if (v1 === v2) continue;
              const monteDabord = Math.random() < 0.5, s1 = monteDabord ? v1 : -v1, s2 = monteDabord ? -v2 : v2;
              const t1 = t0 + s1, t2 = t1 + s2;
              if (t1 === 0 || (t0 > 0 && t1 > 0 && t2 > 0)) continue;
              const h = ent(5, 9);
              return {
                enonce: "À " + h + " h, il fait " + T(t0) + " °C. La température " + (monteDabord ? "monte de " + v1 + " °C, puis baisse de " + v2 : "baisse de " + v1 + " °C, puis monte de " + v2) + " °C. Quelle est la température finale ?",
                reponse: t2, unite: "°C",
                correction: "D'abord : " + minuscule(regle(t0, s1)) + " Ensuite : " + minuscule(regle(t1, s2)) + " Température finale : $" + L(t2) + "$ °C."
              };
            }
            // Variation entre deux valeurs : valeur finale moins valeur initiale
            const plongeur = Math.random() < 0.5;
            const vi = plongeur ? -ent(5, 40) : nonNul(-20, 20), vf = plongeur ? -ent(5, 40) : nonNul(-20, 20);
            if (vi === vf || (vi > 0 && vf > 0)) continue;
            const r = vf - vi;
            return {
              enonce: plongeur
                ? "Un plongeur passe de l'altitude " + T(vi) + " m à l'altitude " + T(vf) + " m. Quelle est la variation d'altitude (valeur finale moins valeur initiale) ?"
                : "La température passe de " + T(vi) + " °C à " + T(vf) + " °C. Quelle est la variation de température (valeur finale moins valeur initiale) ?",
              reponse: r, unite: plongeur ? "m" : "°C",
              correction: "Variation = valeur finale − valeur initiale : $" + S(vf) + " - " + S(vi) + " = " + L(r) + "$. " + soustraction(vf, vi)
            };
          }
        }
      }
    },
    {
      id: "signe-somme", chap: "rel1", titre: "Signe d'une somme ou d'une différence sans calculer", format: "signe",
      niveaux: {
        1: () => {
          let a, b;
          do { const s = signes(selon([[0.55, "contraires"], [0.33, "negatifs"], [0.12, "positifs"]])); a = ent(1, 50) * s[0]; b = ent(1, 50) * s[1]; } while (Math.abs(a) === Math.abs(b));
          return { enonce: "Sans calculer, donner le signe de $" + S(a) + " + " + S(b) + "$", reponse: a + b > 0 ? 1 : -1, correction: regleSigne(a, b) };
        },
        2: () => {
          let a, b;
          const v = () => (Math.random() < 0.7 ? decimal(50, 1) : ent(1, 50));
          do { const s = signes(selon([[0.55, "contraires"], [0.4, "negatifs"], [0.05, "positifs"]])); a = v() * s[0]; b = v() * s[1]; } while (Math.abs(a) === Math.abs(b));
          return { enonce: "Sans calculer, donner le signe de $" + S(a) + " + " + S(b) + "$", reponse: a + b > 0 ? 1 : -1, correction: regleSigne(a, b) };
        },
        3: () => {
          let a, b, moins;
          do {
            const s = signes(selon([[0.6, "contraires"], [0.4, "negatifs"]]));
            a = decimal(50, choix([1, 2])) * s[0]; b = decimal(50, choix([1, 2])) * s[1]; moins = Math.random() < 0.6;
          } while (Math.abs(a) === Math.abs(b));
          const b2 = moins ? -b : b, r = net(a + b2);
          return {
            enonce: "Sans calculer, donner le signe de $" + S(a) + (moins ? " - " : " + ") + S(b) + "$", reponse: r > 0 ? 1 : -1,
            correction: (moins ? "Soustraire, c'est ajouter l'opposé : $" + S(a) + " - " + S(b) + " = " + S(a) + " + " + S(b2) + "$. " : "") + regleSigne(a, b2)
          };
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("4e", rel1);
})();
