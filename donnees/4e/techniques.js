// Techniques d'entraînement de 4e (« Je m'entraîne »), d'après les référentiels validés par l'enseignant
// (propositions/referentiels/4e/<chapitre>.json). Pour chaque technique : 3 niveaux, et pour chaque niveau
// un générateur qui tire des valeurs au hasard et renvoie { enonce, reponse, correction, unite? }.
// format : "nombre" (l'élève tape un nombre), "signe" (boutons « Positif » / « Négatif », réponse 1 ou −1),
// "fraction" (réponse "n/d" ou entier, seule la forme irréductible est acceptée), "choix" (deux boutons, les réponses
// possibles sont dans options) ou "expression" (réponse "x^2+6x+9", avec forme : "developpee_reduite", "factorisee"
// ou "quelconque", sur la technique ou dans l'exercice tiré ; voir js/moteur/expressions.js). Un exercice tiré peut
// aussi préciser son propre format (champ format), quand il change selon le niveau. Les autres chapitres ont chacun leur fichier : techniques-<chapitre>.js.
(function () {
  const { L, T, P, ent, choix, net } = Savoirs.calculsOutils;

  // ---------- Petits outils ----------
  const signeAuHasard = () => (Math.random() < 0.5 ? -1 : 1);
  const nonNul = (a, b) => { let x; do { x = ent(a, b); } while (x === 0); return x; };
  // Exercices sans aucun nombre négatif (contrôle : l'élève ne doit pas mettre un « − » partout) :
  // une fois sur 8 au niveau 1, une fois sur 20 au niveau 2, jamais au niveau 3 (décision de l'enseignant)
  const PART_POSITIFS = { 1: 1 / 8, 2: 1 / 20, 3: 0 };
  // Signes de deux nombres : au moins un négatif, sauf dans cette petite part de tirages
  const deuxSignes = (niveau) => (Math.random() < PART_POSITIFS[niveau] ? [1, 1] : choix([[-1, 1], [1, -1], [-1, -1]]));
  // Décimal à un chiffre après la virgule, non entier, de 0,1 à 9,9
  const d1 = () => { let k; do { k = ent(1, 99); } while (k % 10 === 0); return k / 10; };
  const decimales = (x) => { const t = String(net(x)); return t.includes(".") ? t.split(".")[1].length : 0; };
  const melanger = (l) => Savoirs.melanger(l);
  const produitDe = (f) => net(f.reduce((a, b) => a * b, 1));
  const ecrireProduit = (f) => f.map(P).join(" \\times ");
  const facteursNegatifs = (n) => (n === 0 ? "aucun facteur négatif" : n === 1 ? "un facteur négatif" : n + " facteurs négatifs");
  const majuscule = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  // Facteurs : tableau de distances à zéro et nombre de facteurs négatifs → facteurs signés (négatifs au hasard)
  function avecSignes(distances, nbNegatifs) {
    const places = melanger(distances.map((_, i) => i)).slice(0, nbNegatifs);
    return distances.map((d, i) => (places.includes(i) ? -d : d));
  }

  // Phrase sur le signe : deux facteurs (même signe / signes contraires) ou plusieurs (parité des facteurs négatifs)
  function phraseSigne(facteurs, mot) {
    const neg = facteurs.filter((x) => x < 0).length;
    const resultat = neg % 2 ? "négatif" : "positif";
    if (facteurs.length === 2) return (neg === 1 ? "Signes contraires" : "Même signe") + " : le " + mot + " est " + resultat + ".";
    if (neg === 0) return "Aucun facteur négatif : le " + mot + " est positif.";
    return majuscule(facteursNegatifs(neg)) + " (nombre " + (neg % 2 ? "impair" : "pair") + ") : le " + mot + " est " + resultat + ".";
  }

  // Correction d'un produit : le signe, puis le calcul sur les distances à zéro
  function correctionProduit(facteurs) {
    if (facteurs.some((x) => x === 0)) return "Un facteur est nul : le produit est 0.";
    const r = produitDe(facteurs);
    return phraseSigne(facteurs, "produit") + " $" + facteurs.map((x) => L(Math.abs(x))).join(" \\times ") + " = " + L(Math.abs(r)) + "$" +
      (r < 0 ? ", donc $" + L(r) + "$." : ".");
  }

  // Correction d'un quotient a ÷ b
  function correctionQuotient(a, b, mot) {
    const q = net(a / b);
    if (a === 0) return "0 divisé par un nombre non nul donne 0.";
    const signe = (a < 0) !== (b < 0) ? "Signes contraires : le " + mot + " est négatif." : "Même signe : le " + mot + " est positif.";
    const A = Math.abs(a), B = Math.abs(b), Q = Math.abs(q);
    // Diviser par un décimal : on multiplie les deux nombres par 10 ou 100
    const k = Math.pow(10, Math.max(decimales(A), decimales(B)));
    const calcul = decimales(B) > 0
      ? L(A) + " \\div " + L(B) + " = " + L(net(A * k)) + " \\div " + L(net(B * k)) + " = " + L(Q)
      : L(A) + " \\div " + L(B) + " = " + L(Q);
    return signe + " $" + calcul + "$" + (q < 0 ? ", donc $" + L(q) + "$" : "") + ".";
  }

  // Calcul d'une puissance pour l'affichage : (−a)^n, base entre parenthèses si négative
  const puissance = (base, n) => (base < 0 ? "(" + L(base) + ")" : L(base)) + "^{" + n + "}";

  // Exercice de puissance. moinsDevant : « −aⁿ » (a positif), où l'exposant ne porte que sur a.
  // Correction : le signe d'abord, puis le calcul sur la valeur absolue.
  function exercicePuissance(base, n, moinsDevant) {
    const a = Math.abs(base), absolu = net(Math.pow(a, n));
    const produit = Array.from({ length: n }, () => L(a)).join(" \\times ");
    if (moinsDevant) {
      const r = -absolu;
      return { enonce: "Calculer $-" + L(a) + "^{" + n + "}$", reponse: r,
        correction: "L'exposant ne porte que sur " + T(a) + " (pas de parenthèses) : $-" + L(a) + "^{" + n + "} = -(" + produit + ") = " + L(r) +
          "$. Ne pas confondre avec $(-" + L(a) + ")^{" + n + "} = " + L(net(Math.pow(-a, n))) + "$." };
    }
    const r = net(Math.pow(base, n));
    if (base > 0) return { enonce: "Calculer $" + puissance(base, n) + "$", reponse: r, correction: "$" + puissance(base, n) + " = " + produit + " = " + L(r) + "$." };
    const signe = n === 2 ? "Deux facteurs négatifs (même signe) : le résultat est positif."
      : n + " facteurs négatifs (nombre " + (n % 2 ? "impair" : "pair") + ") : le résultat est " + (n % 2 ? "négatif" : "positif") + ".";
    return { enonce: "Calculer $" + puissance(base, n) + "$", reponse: r,
      correction: signe + " $" + (n <= 3 ? produit : L(a) + "^{" + n + "}") + " = " + L(absolu) + "$" + (r < 0 ? ", donc $" + L(r) + "$." : ".") };
  }

  // ---------- Les techniques du chapitre « Nombres relatifs : multiplication et division » ----------
  const rel2 = [
    {
      id: "prod-deux", chap: "rel2", titre: "Produit de deux relatifs", format: "nombre",
      savoirs_lies: ["rel-signe-prod", "rel-prod-dist", "rel-prod-zero"],
      niveaux: {
        1: () => {
          let f;
          if (Math.random() < 0.1) f = melanger([nonNul(-12, 12), 0]);
          else { const s = deuxSignes(1); f = [ent(2, 12) * s[0], ent(2, 12) * s[1]]; }
          return { enonce: "Calculer $" + ecrireProduit(f) + "$", reponse: produitDe(f), correction: correctionProduit(f) };
        },
        2: () => {
          let f;
          do {
            const s = deuxSignes(2), d = Math.random() < 0.5 ? choix([0.2, 0.5, 1.5, 2.5]) : d1();
            f = melanger([ent(1, 50) * s[0], d * s[1]]);
          } while (Math.abs(produitDe(f)) > 100);
          return { enonce: "Calculer $" + ecrireProduit(f) + "$", reponse: produitDe(f), correction: correctionProduit(f) };
        },
        3: () => {
          let f;
          do { const s = deuxSignes(3); f = [d1() * s[0], d1() * s[1]]; } while (Math.abs(produitDe(f)) > 100);
          return { enonce: "Calculer $" + ecrireProduit(f) + "$", reponse: produitDe(f), correction: correctionProduit(f) };
        }
      },
      erreurs_typiques: ["Additionner au lieu de multiplier.", "Confondre avec l'addition de deux négatifs.", "Oublier le signe.", "Mal placer la virgule."]
    },

    {
      id: "quot-deux", chap: "rel2", titre: "Quotient de deux relatifs", format: "nombre",
      savoirs_lies: ["rel-div-signe", "rel-quotient-def", "rel-div0"],
      niveaux: {
        1: () => {
          if (Math.random() < 0.1) { const b = ent(2, 12) * signeAuHasard(); return { enonce: "Calculer $0 \\div " + P(b) + "$", reponse: 0, correction: correctionQuotient(0, b, "quotient") }; }
          const s = deuxSignes(1), b = ent(2, 12) * s[0], q = ent(1, 12) * s[1], a = b * q;
          return { enonce: "Calculer $" + P(a) + " \\div " + P(b) + "$", reponse: q,
            correction: correctionQuotient(a, b, "quotient") + " En effet, $" + P(q) + " \\times " + P(b) + " = " + L(a) + "$." };
        },
        2: () => {
          const s = deuxSignes(2), b = choix([2, 4, 5, 8, 10, 20]) * s[0];
          let a; do { a = ent(1, 40) * s[1]; } while (a % b === 0);
          return { enonce: "Calculer $" + P(a) + " \\div " + P(b) + "$", reponse: net(a / b), correction: correctionQuotient(a, b, "quotient") };
        },
        3: () => {
          let a, b, q;
          do {
            const s = deuxSignes(3);
            b = d1() * s[0];
            q = (Math.random() < 0.6 ? ent(2, 12) : d1()) * s[1];
            a = net(b * q);
          } while (Math.abs(a) > 100 || decimales(a) > 2);
          return { enonce: "Calculer $" + P(a) + " \\div " + P(b) + "$", reponse: net(q), correction: correctionQuotient(a, b, "quotient") };
        }
      },
      erreurs_typiques: ["Oublier le signe du quotient.", "Diviser dans le mauvais sens.", "Diviser par un décimal sans multiplier par 10."]
    },

    {
      id: "signe", chap: "rel2", titre: "Signe d'un produit ou d'un quotient sans calculer", format: "signe",
      savoirs_lies: ["rel-signe-prod", "rel-prod-impair", "rel-div-signe", "rel-prod-zero"],
      niveaux: {
        1: () => {
          const nombre = () => (Math.random() < 0.3 ? d1() : ent(1, 20));
          const s = deuxSignes(1), a = nombre() * s[0], b = nombre() * s[1], quotient = Math.random() < 0.5;
          const mot = quotient ? "quotient" : "produit";
          const signe = (a < 0) !== (b < 0) ? -1 : 1;
          return { enonce: "Sans calculer, donner le signe de $" + P(a) + (quotient ? " \\div " : " \\times ") + P(b) + "$", reponse: signe,
            correction: ((a < 0) !== (b < 0) ? "Signes contraires" : "Même signe") + " : le " + mot + " est " + (signe < 0 ? "négatif" : "positif") + "." };
        },
        2: () => {
          const n = ent(3, 5);
          const distances = Array.from({ length: n }, () => (Math.random() < 0.25 ? d1() : ent(1, 10)));
          const f = avecSignes(distances, ent(1, n));
          const neg = f.filter((x) => x < 0).length;
          return { enonce: "Sans calculer, donner le signe de $" + ecrireProduit(f) + "$", reponse: neg % 2 ? -1 : 1, correction: phraseSigne(f, "produit") };
        },
        3: () => {
          if (Math.random() < 0.5) {
            const n = ent(3, 4);
            const distances = Array.from({ length: n }, () => ent(10, 1000) / 100);
            const f = avecSignes(distances, ent(1, n));
            const neg = f.filter((x) => x < 0).length;
            return { enonce: "Sans calculer, donner le signe de $" + ecrireProduit(f) + "$", reponse: neg % 2 ? -1 : 1, correction: phraseSigne(f, "produit") };
          }
          const facteurs = () => { const n = ent(2, 3); return avecSignes(Array.from({ length: n }, () => ent(1, 9)), ent(0, n)); };
          let num, den;
          do { num = facteurs(); den = facteurs(); } while (num.concat(den).every((x) => x > 0)); // au moins un facteur négatif
          const sNum = num.filter((x) => x < 0).length % 2 ? -1 : 1, sDen = den.filter((x) => x < 0).length % 2 ? -1 : 1;
          const mot = (s) => (s < 0 ? "négatif" : "positif");
          const decrire = (f) => facteursNegatifs(f.filter((x) => x < 0).length);
          return { enonce: "Sans calculer, donner le signe de $\\dfrac{" + ecrireProduit(num) + "}{" + ecrireProduit(den) + "}$", reponse: sNum * sDen,
            correction: "Numérateur : " + decrire(num) + ", donc " + mot(sNum) + ". Dénominateur : " + decrire(den) + ", donc " + mot(sDen) +
              ". Quotient d'un " + mot(sNum) + " par un " + mot(sDen) + " : " + mot(sNum * sDen) + "." };
        }
      },
      erreurs_typiques: ["Compter les facteurs positifs au lieu des négatifs.", "Oublier un facteur négatif.", "Dans un quotient, ne regarder que le numérateur."]
    },

    {
      id: "prod-plusieurs", chap: "rel2", titre: "Produit de plusieurs facteurs relatifs", format: "nombre",
      savoirs_lies: ["rel-prod-impair", "rel-signe-prod", "rel-prod-moinsun"],
      niveaux: {
        1: () => {
          const f = avecSignes([ent(1, 5), ent(1, 5), ent(1, 5)], ent(1, 3));
          return { enonce: "Calculer $" + ecrireProduit(f) + "$", reponse: produitDe(f), correction: correctionProduit(f) };
        },
        2: () => {
          let f;
          do {
            const n = ent(4, 5);
            const distances = melanger([1, 1].concat(Array.from({ length: n - 2 }, () => ent(1, 6))));
            f = avecSignes(distances, ent(1, n));
          } while (Math.abs(produitDe(f)) > 216);
          return { enonce: "Calculer $" + ecrireProduit(f) + "$", reponse: produitDe(f), correction: correctionProduit(f) };
        },
        3: () => {
          // Un regroupement astucieux (25 × 4, 0,5 × 2…) et un ou deux autres facteurs
          let f, paire;
          do {
            paire = choix([[25, 4], [0.5, 2], [0.2, 5], [0.5, 4], [2.5, 4], [0.5, 6]]);
            const autres = Array.from({ length: ent(1, 2) }, () => (Math.random() < 0.3 ? choix([0.2, 0.5, 1.5, 2.5]) : ent(2, 19)));
            const distances = paire.concat(autres);
            f = melanger(avecSignes(distances, ent(1, distances.length)));
          } while (Math.abs(produitDe(f)) > 2000 || decimales(produitDe(f)) > 2);
          const r = produitDe(f);
          // Correction : on regroupe la paire, puis on multiplie par les autres facteurs (distances à zéro)
          let reste = f.map(Math.abs), courant = net(paire[0] * paire[1]);
          reste.splice(reste.indexOf(paire[0]), 1); reste.splice(reste.indexOf(paire[1]), 1);
          let etapes = "On regroupe $" + L(paire[0]) + " \\times " + L(paire[1]) + " = " + L(courant) + "$";
          for (const x of reste) { const suivant = net(courant * x); etapes += ", puis $" + L(courant) + " \\times " + L(x) + " = " + L(suivant) + "$"; courant = suivant; }
          return { enonce: "Calculer $" + ecrireProduit(f) + "$", reponse: r,
            correction: phraseSigne(f, "produit") + " " + etapes + (r < 0 ? ", donc $" + L(r) + "$." : ".") };
        }
      },
      erreurs_typiques: ["Mal compter les facteurs négatifs.", "Appliquer « moins par moins donne plus » à tout le produit.", "Perdre un signe en route."]
    },

    {
      id: "puissance-relatif", chap: "rel2", titre: "Carré et puissance d'un relatif", format: "nombre",
      savoirs_lies: ["rel-carre-neg", "rel-carre-pos", "rel-prod-impair", "rel-moins-carre"],
      // Trois sortes d'énoncés : (−a)ⁿ (base négative entre parenthèses), −aⁿ (l'exposant ne porte que sur a)
      // et aⁿ avec a positif (rare : exercices de contrôle sans négatif)
      niveaux: {
        1: () => (Math.random() < 0.6
          ? exercicePuissance(-ent(2, 12), 2, false)
          : exercicePuissance(-choix([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.1, 1.2]), 2, false)),
        2: () => {
          const t = Math.random();
          if (t < 0.3) return exercicePuissance(-ent(2, 6), 3, false);      // (−2)³ … (−6)³
          if (t < 0.5) return exercicePuissance(ent(2, 5), 3, true);        // −2³ … −5³
          if (t < 0.75) return exercicePuissance(ent(2, 12), 2, true);      // −2² … −12²
          if (t < 0.95) return exercicePuissance(choix([-10, -1]), choix([2, 3]), false);
          return exercicePuissance(choix([10, 1]), choix([2, 3]), false);   // contrôle sans négatif (1 sur 20)
        },
        3: () => {
          const [base, n, moinsDevant] = choix([
            [-1, ent(2, 9), false], [-2, ent(2, 6), false], [-10, ent(2, 5), false], [-3, ent(2, 4), false], [-5, 4, false],
            [-0.1, 3, false], [-0.5, 2, false], [-0.5, 3, false], [2, 4, true], [2, 5, true], [3, 3, true], [10, 3, true]
          ]);
          return exercicePuissance(base, n, moinsDevant);
        }
      },
      erreurs_typiques: ["Écrire $(-4)^{2} = -16$.", "Confondre $(-4)^{2}$ et $-4^{2}$.", "Calculer $(-3)^{2}$ comme $-3 \\times 2$."]
    },

    {
      id: "expr-prior", chap: "rel2", titre: "Expression avec priorités opératoires", format: "nombre",
      savoirs_lies: ["rel-prior", "rel-paren-ecriture", "rel-signe-prod", "rel-div-signe"],
      niveaux: {
        1: () => {
          const a = nonNul(-10, 10);
          let b, c; do { b = nonNul(-10, 10); c = nonNul(-10, 10); } while (b > 0 && c > 0);
          const p = b * c, moins = Math.random() < 0.5, r = moins ? a - p : a + p;
          return { enonce: "Calculer $" + L(a) + (moins ? " - " : " + ") + P(b) + " \\times " + P(c) + "$", reponse: r,
            correction: "La multiplication est prioritaire : $" + P(b) + " \\times " + P(c) + " = " + L(p) + "$, puis $" + L(a) + (moins ? " - " : " + ") + P(p) +
              " = " + L(r) + "$." };
        },
        2: () => {
          for (;;) {
            const forme = ent(1, 3);
            if (forme === 1) {
              const x = nonNul(-10, 10), y = ent(1, 10), plus = Math.random() < 0.5, s = plus ? x + y : x - y, z = ent(2, 10) * signeAuHasard(), r = s * z;
              if (s === 0 || Math.abs(r) > 100 || (x > 0 && z > 0 && s > 0)) continue; // au moins un relatif négatif
              return { enonce: "Calculer $(" + L(x) + (plus ? " + " : " - ") + y + ") \\times " + P(z) + "$", reponse: r,
                correction: "On calcule d'abord la parenthèse : $" + L(x) + (plus ? " + " : " - ") + y + " = " + L(s) + "$. Puis $" + P(s) + " \\times " + P(z) + " = " + L(r) + "$." };
            }
            if (forme === 2) {
              const z = -ent(2, 9), x = ent(1, 10), y = ent(1, 12), s = x - y, r = z * s;
              if (s === 0 || Math.abs(r) > 100) continue;
              return { enonce: "Calculer $" + L(z) + " \\times (" + x + " - " + y + ")$", reponse: r,
                correction: "Parenthèse : $" + x + " - " + y + " = " + L(s) + "$. Puis $" + P(z) + " \\times " + P(s) + " = " + L(r) + "$." };
            }
            const a = nonNul(-10, 10), b = nonNul(-10, 10), d = ent(2, 5) * signeAuHasard(), k = nonNul(-10, 10), c = d * k, p = a * b, r = p + k;
            if (Math.abs(r) > 100 || [a, b, c, d].every((x) => x > 0)) continue;
            return { enonce: "Calculer $" + P(a) + " \\times " + P(b) + " + " + P(c) + " \\div " + P(d) + "$", reponse: r,
              correction: "Multiplication et division d'abord : $" + P(a) + " \\times " + P(b) + " = " + L(p) + "$ et $" + P(c) + " \\div " + P(d) + " = " + L(k) +
                "$. Puis $" + L(p) + " + " + P(k) + " = " + L(r) + "$." };
          }
        },
        3: () => {
          for (;;) {
            const forme = ent(1, 3);
            if (forme === 1) {
              const B = ent(2, 6) * signeAuHasard(), q = nonNul(-6, 6), A = B * q, C = ent(2, 9), D = nonNul(-9, 9), p = C * D, r = q - p;
              if (Math.abs(r) > 100 || [A, B, D].every((x) => x > 0)) continue;
              return { enonce: "Calculer $" + P(A) + " \\div " + P(B) + " - " + C + " \\times " + P(D) + "$", reponse: r,
                correction: "$" + P(A) + " \\div " + P(B) + " = " + L(q) + "$ et $" + C + " \\times " + P(D) + " = " + L(p) + "$. Puis $" + L(q) + " - " + P(p) + " = " + L(r) + "$." };
            }
            if (forme === 2) {
              const x = ent(1, 9), y = ent(1, 14), s = x - y;
              if (s === 0 || Math.abs(s) > 6) continue;
              const q = nonNul(-5, 5), A = s * q, C = ent(2, 9), D = nonNul(-9, 9), p = C * D, r = q + p;
              if (Math.abs(r) > 100 || [A, s, D].every((x) => x > 0)) continue;
              return { enonce: "Calculer $" + P(A) + " \\div (" + x + " - " + y + ") + " + C + " \\times " + P(D) + "$", reponse: r,
                correction: "Parenthèse : $" + x + " - " + y + " = " + L(s) + "$. Puis $" + P(A) + " \\div " + P(s) + " = " + L(q) + "$ et $" + C + " \\times " + P(D) + " = " + L(p) +
                  "$. Enfin $" + L(q) + " + " + P(p) + " = " + L(r) + "$." };
            }
            // Un seul décimal par exercice, et négatif (niveau 3 : jamais d'exercice sans négatif)
            const d = -choix([0.5, 1.5, 2.5]), n = ent(2, 9), e = ent(1, 9), p = net(d * n), r = net(p - e);
            return { enonce: "Calculer $" + P(d) + " \\times " + n + " - " + L(e) + "$", reponse: r,
              correction: "$" + P(d) + " \\times " + n + " = " + L(p) + "$. Puis $" + L(p) + " - " + L(e) + " = " + L(r) + "$." };
          }
        }
      },
      erreurs_typiques: ["Calculer de gauche à droite sans les priorités.", "Oublier la parenthèse.", "Mal gérer $a - (-b)$."]
    },

    {
      id: "manquant", chap: "rel2", titre: "Trouver le nombre manquant", format: "nombre",
      savoirs_lies: ["rel-quotient-def", "rel-signe-prod", "rel-div-signe"],
      niveaux: {
        1: () => {
          const s = deuxSignes(1), a = ent(2, 12) * s[0], m = ent(1, 12) * s[1], c = a * m, devant = Math.random() < 0.5;
          return { enonce: "Trouver le nombre : $" + (devant ? P(a) + " \\times \\ldots" : "\\ldots \\times " + P(a)) + " = " + L(c) + "$", reponse: m,
            correction: "$" + P(c) + " \\div " + P(a) + " = " + L(m) + "$. Vérification : $" + (devant ? P(a) + " \\times " + P(m) : P(m) + " \\times " + P(a)) + " = " + L(c) + "$." };
        },
        2: () => {
          const s = deuxSignes(2), b = ent(2, 12) * s[0], q = ent(1, 12) * s[1], a = b * q, forme = ent(1, 3);
          if (forme === 1) return { enonce: "Trouver le nombre : $\\ldots \\div " + P(b) + " = " + L(q) + "$", reponse: a,
            correction: "Un nombre divisé par $" + L(b) + "$ donne $" + L(q) + "$ : il vaut $" + P(q) + " \\times " + P(b) + " = " + L(a) + "$." };
          if (forme === 2) return { enonce: "Trouver le nombre : $" + P(a) + " \\div \\ldots = " + L(q) + "$", reponse: b,
            correction: "Le nombre vaut $" + P(a) + " \\div " + P(q) + " = " + L(b) + "$. Vérification : $" + P(a) + " \\div " + P(b) + " = " + L(q) + "$." };
          return { enonce: "Trouver le nombre : $" + P(a) + " \\div " + P(b) + " = \\ldots$", reponse: q, correction: correctionQuotient(a, b, "quotient") };
        },
        3: () => {
          if (Math.random() < 0.5) {
            let a, m, c;
            do { const s = deuxSignes(3); a = d1() * s[0]; m = (Math.random() < 0.5 ? d1() : ent(2, 9)) * s[1]; c = net(a * m); } while (Math.abs(c) > 100);
            return { enonce: "Trouver le nombre : $" + P(a) + " \\times \\ldots = " + L(c) + "$", reponse: net(m),
              correction: "$" + P(c) + " \\div " + P(a) + " = " + L(m) + "$. Vérification : $" + P(a) + " \\times " + P(m) + " = " + L(c) + "$." };
          }
          const s = deuxSignes(3), b = choix([0.2, 0.5, 2.5, 0.4]) * s[0], q = ent(1, 12) * s[1], a = net(q * b);
          return { enonce: "Trouver le nombre : $\\ldots \\div " + P(b) + " = " + L(q) + "$", reponse: a,
            correction: "Il vaut $" + P(q) + " \\times " + P(b) + " = " + L(a) + "$. Vérification : $" + P(a) + " \\div " + P(b) + " = " + L(q) + "$." };
        }
      },
      erreurs_typiques: ["Chercher par addition ou soustraction.", "Se tromper de sens dans la division.", "Oublier le signe."]
    },

    {
      id: "quot-fraction", chap: "rel2", titre: "Quotient écrit sous forme de fraction", format: "nombre",
      savoirs_lies: ["rel-div-signe", "rel-quotient-def", "rel-prod-impair"],
      niveaux: {
        1: () => {
          const s = deuxSignes(1), b = ent(2, 12) * s[0], q = ent(1, 12) * s[1], a = b * q;
          return { enonce: "Calculer $\\dfrac{" + L(a) + "}{" + L(b) + "}$", reponse: q, correction: correctionQuotient(a, b, "quotient") };
        },
        2: () => {
          const s = deuxSignes(2), b = choix([2, 4, 5, 8, 10]) * s[0];
          let a; do { a = ent(1, 40) * s[1]; } while (a % b === 0);
          return { enonce: "Calculer $\\dfrac{" + L(a) + "}{" + L(b) + "}$", reponse: net(a / b), correction: correctionQuotient(a, b, "quotient") };
        },
        3: () => {
          for (;;) {
            const nNum = ent(1, 3), nDen = ent(1, 3);
            if (nNum + nDen < 3) continue;
            const num = Array.from({ length: nNum }, () => nonNul(-9, 9)), den = Array.from({ length: nDen }, () => nonNul(-9, 9));
            if (den.every((x) => Math.abs(x) === 1)) continue;
            // Au moins un facteur négatif, et pas de simplification évidente (même facteur en haut et en bas)
            if (num.concat(den).every((x) => x > 0)) continue;
            if (num.some((x) => den.some((y) => Math.abs(x) === Math.abs(y)))) continue;
            const N = produitDe(num), D = produitDe(den), r = net(N / D);
            if (Math.abs(r) > 50 || decimales(r) > 2 || r === 0) continue;
            const partie = (f, X, nom) => (f.length > 1 ? nom + " : $" + ecrireProduit(f) + " = " + L(X) + "$. " : "");
            return { enonce: "Calculer $\\dfrac{" + ecrireProduit(num) + "}{" + ecrireProduit(den) + "}$", reponse: r,
              correction: partie(num, N, "Numérateur") + partie(den, D, "Dénominateur") + "Quotient : $" + P(N) + " \\div " + P(D) + " = " + L(r) + "$." };
          }
        }
      },
      erreurs_typiques: ["Perdre le signe.", "Calculer le numérateur sans le signe.", "Diviser dans le mauvais sens."]
    },

    {
      id: "situation", chap: "rel2", titre: "Situation concrète avec une variation négative", format: "nombre",
      savoirs_lies: ["rel-prior", "rel-signe-prod", "rel-prod-moinsun"],
      niveaux: {
        1: () => {
          const cas = ent(1, 4);
          if (cas === 1) { const v = choix([0.5, 1, 1.5, 2, 2.5]), t = ent(4, 20), r = net(-v * t);
            return { enonce: "Un plongeur descend de " + T(v) + " m chaque seconde pendant " + t + " s. Quelle est la variation d'altitude ?", reponse: r, unite: "m",
              correction: "Chaque seconde, l'altitude varie de $" + L(-v) + "$ m : $" + P(-v) + " \\times " + t + " = " + L(r) + "$ m." }; }
          if (cas === 2) { const x = choix([1, 1.5, 2, 2.5, 3, 4, 5]), t = ent(2, 10), r = net(-x * t);
            return { enonce: "La température baisse de " + T(x) + " °C par heure pendant " + t + " h. Quelle est la variation de température ?", reponse: r, unite: "°C",
              correction: "$" + P(-x) + " \\times " + t + " = " + L(r) + "$ °C." }; }
          if (cas === 3) { const m = choix([12.5, 15, 18, 24.5, 30]), n = ent(2, 10), r = net(-m * n);
            return { enonce: "Un compte est débité de " + T(m) + (m % 1 ? "0" : "") + " € chaque jour pendant " + n + " jours. Quelle est la variation du solde ?", reponse: r, unite: "€",
              correction: "$" + P(-m) + " \\times " + n + " = " + L(r) + "$ €." }; }
          const x = ent(4, 15), t = ent(3, 20), r = -x * t;
          return { enonce: "Une baignoire se vide de " + x + " L par minute pendant " + t + " minutes. Quelle est la variation du volume d'eau ?", reponse: r, unite: "L",
            correction: "Chaque minute, le volume varie de $" + L(-x) + "$ L : $" + P(-x) + " \\times " + t + " = " + L(r) + "$ L." };
        },
        2: () => {
          for (;;) {
            const cas = ent(1, 3);
            if (cas === 1) { const h = 100 * ent(10, 30), d = 50 * ent(1, 5), t = ent(2, 6), r = h - d * t;
              if (r < 0) continue;
              return { enonce: "Un randonneur est à " + T(h) + " m d'altitude. Il descend de " + d + " m par heure pendant " + t + " h. Quelle est son altitude finale ?", reponse: r, unite: "m",
                correction: "$" + L(h) + " + " + P(-d) + " \\times " + t + " = " + L(h) + " + " + P(-d * t) + " = " + L(r) + "$ m." }; }
            if (cas === 2) { const t0 = ent(-5, 10), x = choix([0.5, 1, 1.5, 2, 2.5, 3]), t = ent(2, 8), r = net(t0 - x * t);
              return { enonce: "Il fait " + T(t0) + " °C. La température baisse de " + T(x) + " °C par heure pendant " + t + " h. Quelle est la température finale ?", reponse: r, unite: "°C",
                correction: "$" + L(t0) + " + " + P(-x) + " \\times " + t + " = " + L(t0) + " + " + P(net(-x * t)) + " = " + L(r) + "$ °C." }; }
            const s = 10 * ent(5, 30), m = choix([12.5, 15, 24.5, 30]), n = ent(2, 5), r = net(s - m * n);
            if (r < -100) continue;
            return { enonce: "Un compte affiche " + s + " €. Il subit " + n + " prélèvements de " + T(m) + (m % 1 ? "0" : "") + " €. Quel est le nouveau solde ?", reponse: r, unite: "€",
              correction: "$" + s + " + " + n + " \\times " + P(-m) + " = " + s + " + " + P(net(-m * n)) + " = " + L(r) + "$ €." };
          }
        },
        3: () => {
          const cas = ent(1, 3);
          if (cas === 1) { const p = ent(2, 5), q = ent(1, 3), b = ent(1, 10), m = ent(1, 12), r = b * p - m * q;
            const pointsQ = q > 1 ? " points" : " point";
            return { enonce: "Un jeu donne $+" + p + "$ points par bonne réponse et $-" + q + "$" + pointsQ + " par mauvaise réponse. Un élève a " +
                b + (b > 1 ? " bonnes réponses" : " bonne réponse") + " et " + m + (m > 1 ? " mauvaises réponses" : " mauvaise réponse") +
                ". Quel est son total de points ?", reponse: r, unite: "points",
              correction: "$" + b + " \\times " + p + " + " + m + " \\times (-" + q + ") = " + b * p + " + " + P(-m * q) + " = " + L(r) + "$ points." }; }
          if (cas === 2) { const h = 100 * ent(10, 30), d = 50 * ent(1, 5), t = ent(1, 4), r = h + d * t;
            return { enonce: "À 14 h, un randonneur est à " + T(h) + " m et descend de " + d + " m par heure. Quelle était son altitude " + t + " h plus tôt (temps $-" + t + "$) ?", reponse: r, unite: "m",
              correction: "$" + L(h) + " + " + P(-d) + " \\times (-" + t + ") = " + L(h) + " + " + d * t + " = " + L(r) + "$ m." }; }
          const s = 10 * ent(5, 30), m = choix([12.5, 15, 24.5, 30]), n = ent(1, 4), r = net(s + m * n);
          return { enonce: "Un compte de " + s + " € est débité de " + T(m) + (m % 1 ? "0" : "") + " € par mois. Quel était son solde " + n + " mois avant (temps $-" + n + "$) ?", reponse: r, unite: "€",
            correction: "$" + s + " + " + P(-m) + " \\times (-" + n + ") = " + s + " + " + L(net(m * n)) + " = " + L(r) + "$ €." };
        }
      },
      erreurs_typiques: ["Écrire une variation positive pour une baisse.", "Ne pas voir qu'un temps négatif change le signe.", "Ajouter avant de multiplier."]
    }
  ];

  Savoirs.enregistrerTechniques("4e", rel2);
})();
