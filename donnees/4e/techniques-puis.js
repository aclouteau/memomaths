// Techniques d'entraînement de 4e : « Puissances : exposants positifs et négatifs » (puis).
// D'après propositions/referentiels/4e/puis.json (lot 6) : les descriptions de niveau sont la spécification.
// Les générateurs servent aussi au chapitre « Puissances » de 3e (donnees/3e/techniques-puis.js) : Savoirs.puissances.
(function () {
  const { L, ent, choix, net, facile } = Savoirs.calculsOutils;
  const puiss = (a, n) => Math.round(Math.pow(a, n));
  const P = (x) => (x < 0 ? "(" + L(x) + ")" : L(x));
  const ex = (e) => (e < 0 ? "(" + e + ")" : String(e)); // exposant dans un calcul : (−4) × 3
  // Nombre décimal écrit en entier : 0{,}000001 (pas 1e-6)
  const decimal = (x) => x.toFixed(12).replace(/0+$/, "").replace(/\.$/, "").replace(".", "{,}");
  const grand = (n) => L(Math.pow(10, n)); // 1\,000\,000
  const petit = (n) => "0{,}" + "0".repeat(n - 1) + "1"; // 0,001

  // ---------- Calculer une puissance ----------
  const N1 = [];
  for (let a = 2; a <= 10; a++) N1.push([a, 2]);
  for (let a = 2; a <= 5; a++) N1.push([a, 3]);
  N1.push([2, 4], [3, 4], [2, 5], [2, 6]);
  const N2 = N1.filter(([a, n]) => !(a === 2 && n === 6));
  // Écriture d'une puissance : « (−a)^n », « −a^n » ou « a^n »
  function forme(a, n, sorte) {
    if (sorte === "paren") return { latex: "(-" + a + ")^{" + n + "}", val: puiss(-a, n), detail: n % 2 ? "L'exposant $" + n + "$ est impair : le résultat est négatif." : "L'exposant $" + n + "$ est pair : le résultat est positif." };
    if (sorte === "moins") return { latex: "-" + a + "^{" + n + "}", val: -puiss(a, n), detail: "L'exposant ne porte que sur $" + a + "$, pas sur le signe : $-" + a + "^{" + n + "} = -(" + a + "^{" + n + "})$." };
    return { latex: a + "^{" + n + "}", val: puiss(a, n), detail: "" };
  }
  const produit = (a, n) => Array(n).fill(a < 0 ? "(" + a + ")" : a).join(" \\times ");
  function calcul1(niveau) {
    if (facile(niveau)) {
      const a = ent(2, 20), n = choix([0, 1]);
      return { enonce: "Calculer $" + a + "^{" + n + "}$.", reponse: n ? a : 1, correction: n ? "$" + a + "^{1} = " + a + "$ : un seul facteur." : "Tout nombre non nul à la puissance 0 vaut 1 : $" + a + "^{0} = 1$." };
    }
    const [a, n] = choix(N1), v = puiss(a, n);
    return {
      enonce: choix(["Calculer $" + a + "^{" + n + "}$.", "Donner la valeur de $" + a + "^{" + n + "}$."]),
      reponse: v, correction: "$" + a + "^{" + n + "} = " + produit(a, n) + " = " + L(v) + "$."
    };
  }
  function calcul2(niveau) {
    if (facile(niveau)) {
      const a = ent(2, 12), n = choix([0, 1]), sorte = choix(["paren", "moins"]), f = forme(a, n, sorte);
      return { enonce: "Calculer $" + f.latex + "$.", reponse: f.val,
        correction: (sorte === "moins" ? f.detail + " " : "") + (n ? "Un seul facteur" : "Un nombre non nul à la puissance 0 vaut 1") + " : $" + f.latex + " = " + L(f.val) + "$." };
    }
    const [a, n] = choix(N2), f = forme(a, n, choix(["paren", "paren", "moins", "moins", "plus"]));
    return {
      enonce: "Calculer $" + f.latex + "$.", reponse: f.val,
      correction: (f.detail ? f.detail + " " : "") + "$" + f.latex + " = " + (f.latex.startsWith("(") ? produit(-a, n) + " = " : f.latex.startsWith("-") ? "-(" + produit(a, n) + ") = " : produit(a, n) + " = ") + L(f.val) + "$."
    };
  }
  function calcul3() {
    if (Math.random() < 0.3) {
      const n = ent(2, 7), v = puiss(-10, n);
      return { enonce: "Calculer $(-10)^{" + n + "}$.", reponse: v, correction: "L'exposant $" + n + "$ est " + (n % 2 ? "impair : le résultat est négatif" : "pair : le résultat est positif") + ", et $10^{" + n + "} = " + L(Math.pow(10, n)) + "$. Donc $(-10)^{" + n + "} = " + L(v) + "$." };
    }
    const terme = () => { let a, n; do { a = ent(2, 5); n = a === 2 ? ent(2, 4) : ent(2, 3); } while (a === 5 && n === 3); return forme(a, n, choix(["paren", "moins", "plus"])); };
    let f1, f2; do { f1 = terme(); f2 = terme(); } while (f1.latex === f2.latex || (!f1.latex.includes("-") && !f2.latex.includes("-")));
    const plus = Math.random() < 0.5, r = plus ? f1.val + f2.val : f1.val - f2.val;
    const second = f2.latex.startsWith("-") ? "(" + f2.latex + ")" : f2.latex;
    return {
      enonce: "Calculer $" + f1.latex + (plus ? " + " : " - ") + second + "$.", reponse: r,
      correction: "On calcule d'abord les puissances (l'exposant ne porte que sur ce qui est juste avant lui) : $" + f1.latex + " = " + L(f1.val) + "$ et $" + f2.latex + " = " + L(f2.val) + "$. Puis $" +
        L(f1.val) + (plus ? " + " : " - ") + P(f2.val) + " = " + L(r) + "$."
    };
  }

  // ---------- Exposant négatif ----------
  function negatif1(niveau) {
    const n = facile(niveau) ? 1 : ent(2, 8), d = decimal(Math.pow(10, -n));
    const f = choix(["Donner l'écriture décimale de $10^{-" + n + "}$.", "Écrire $10^{-" + n + "}$ sous la forme d'un nombre décimal.", "Calculer $10^{-" + n + "}$ (écriture décimale)."]);
    return { enonce: f, format: "nombre", reponse: net(Math.pow(10, -n)), correction: "$10^{-" + n + "} = \\dfrac{1}{10^{" + n + "}} = \\dfrac{1}{" + grand(n) + "} = " + d + "$." };
  }
  function negatif2(niveau) {
    let a, n; do { a = ent(2, 9); n = facile(niveau) ? 1 : ent(2, 3); } while (n === 3 && a > 6);
    return {
      enonce: "Écrire $" + a + "^{-" + n + "}$ sous la forme d'une fraction.", format: "fraction", reponse: "1/" + puiss(a, n),
      correction: "$" + a + "^{-" + n + "} = \\dfrac{1}{" + a + "^{" + n + "}} = \\dfrac{1}{" + puiss(a, n) + "}$."
    };
  }
  const BASES_DEC = [[2, 1], [2, 2], [2, 3], [2, 4], [4, 1], [4, 2], [5, 1], [5, 2], [5, 3], [8, 1], [20, 1], [20, 2], [25, 1], [50, 1]];
  function negatif3() {
    if (Math.random() < 0.3) {
      const a = choix([2, 4, 5]), n = a === 2 ? ent(1, 3) : 1, m = ent(1, 3), v = net(Math.pow(a, -n) * Math.pow(10, -m));
      return {
        enonce: "Écrire $" + a + "^{-" + n + "} \\times 10^{-" + m + "}$ en écriture décimale.", format: "nombre", reponse: v,
        correction: "$" + a + "^{-" + n + "} = \\dfrac{1}{" + puiss(a, n) + "} = " + decimal(Math.pow(a, -n)) + "$, puis multiplier par $10^{-" + m + "}$ décale la virgule de $" + m + "$ rang" + (m > 1 ? "s" : "") + " vers la gauche : $" + decimal(v) + "$."
      };
    }
    const [a, n] = choix(BASES_DEC), neg = Math.random() < 0.35, base = neg ? -a : a, v = net(Math.pow(base, -n));
    const b = neg ? "(-" + a + ")" : String(a);
    return {
      enonce: "Écrire $" + b + "^{-" + n + "}$ en écriture décimale.", format: "nombre", reponse: v,
      correction: "$" + b + "^{-" + n + "} = \\dfrac{1}{" + b + "^{" + n + "}} = \\dfrac{1}{" + L(puiss(base, n)) + "} = " + decimal(v) + "$." +
        (neg ? " L'exposant $" + n + "$ est " + (n % 2 ? "impair, donc le résultat est négatif." : "pair, donc le résultat est positif.") : "")
    };
  }

  // ---------- Trouver l'exposant ----------
  const sous = (a, k) => "Écrire $" + "%" + "$ sous la forme $" + a + "^{k}$. Donner $k$.";
  function exposant1(niveau) {
    const a = choix([2, 3, 4, 5, 6, 7, 8, 9, 10]), m = facile(niveau) ? 1 : ent(2, 12), n = ent(2, 12), prod = Math.random() < 0.5 || m <= n;
    const e = prod ? a + "^{" + m + "} \\times " + a + "^{" + n + "}" : "\\dfrac{" + a + "^{" + m + "}}{" + a + "^{" + n + "}}", k = prod ? m + n : m - n;
    return {
      enonce: sous(a).replace("%", e), reponse: k,
      correction: prod ? "On additionne les exposants : $" + e + " = " + a + "^{" + m + " + " + n + "} = " + a + "^{" + k + "}$, donc $k = " + k + "$."
        : "On soustrait les exposants : $" + e + " = " + a + "^{" + m + " - " + n + "} = " + a + "^{" + k + "}$, donc $k = " + k + "$."
    };
  }
  function exposant2(niveau) {
    const a = choix([2, 3, 4, 5, 6, 7, 10]), type = choix(["prod", "quot", "puiss"]), simple = facile(niveau);
    let m, n;
    do { m = simple ? ent(2, 9) : ent(-9, 9); n = simple ? ent(2, 9) : ent(-9, 9); } while (m === 0 || n === 0);
    if (!simple && m > 0 && n > 0) m = -m; // au moins un exposant négatif
    const b = (e) => a + "^{" + e + "}";
    if (type === "prod") { const k = m + n; return { enonce: sous(a).replace("%", b(m) + " \\times " + b(n)), reponse: k, correction: "On additionne les exposants : $" + m + " + " + ex(n) + " = " + k + "$. Donc $k = " + k + "$." }; }
    if (type === "quot") { const k = m - n; return { enonce: sous(a).replace("%", "\\dfrac{" + b(m) + "}{" + b(n) + "}"), reponse: k, correction: "On soustrait les exposants : $" + m + " - " + ex(n) + " = " + k + "$. Donc $k = " + k + "$." }; }
    const q = ent(2, 4), k = m * q;
    return { enonce: sous(a).replace("%", "\\left(" + b(m) + "\\right)^{" + q + "}"), reponse: k, correction: "On multiplie les exposants : $" + ex(m) + " \\times " + q + " = " + k + "$. Donc $k = " + k + "$." };
  }
  function exposant3() {
    const a = choix([2, 3, 5, 7, 10]), e = () => { let x; do { x = ent(-8, 8); } while (x === 0); return x; }, b = (x) => a + "^{" + x + "}";
    const type = choix(["quot-prod", "puiss-prod", "puiss-quot"]);
    if (type === "quot-prod") {
      const m = e(), n = e(), p = e(), k = m + n - p;
      return { enonce: sous(a).replace("%", "\\dfrac{" + b(m) + " \\times " + b(n) + "}{" + b(p) + "}"), reponse: k,
        correction: "Au numérateur, on additionne : $" + m + " + " + ex(n) + " = " + (m + n) + "$. Puis on soustrait l'exposant du dénominateur : $" + (m + n) + " - " + ex(p) + " = " + k + "$. Donc $k = " + k + "$." };
    }
    const m = e(), q = ent(2, 3), n = e(), mq = m * q;
    if (type === "puiss-prod") {
      const k = mq + n;
      return { enonce: sous(a).replace("%", "\\left(" + b(m) + "\\right)^{" + q + "} \\times " + b(n)), reponse: k,
        correction: "On multiplie d'abord les exposants : $" + ex(m) + " \\times " + q + " = " + mq + "$. Puis on additionne : $" + mq + " + " + ex(n) + " = " + k + "$. Donc $k = " + k + "$." };
    }
    const k = mq - n;
    return { enonce: sous(a).replace("%", "\\dfrac{\\left(" + b(m) + "\\right)^{" + q + "}}{" + b(n) + "}"), reponse: k,
      correction: "On multiplie d'abord les exposants : $" + ex(m) + " \\times " + q + " = " + mq + "$. Puis on soustrait : $" + mq + " - " + ex(n) + " = " + k + "$. Donc $k = " + k + "$." };
  }

  // ---------- Signe d'une puissance ----------
  const regle = (n) => "L'exposant $" + n + "$ est " + (n % 2 ? "impair, donc le résultat est négatif." : "pair, donc le résultat est positif.");
  function signe1(niveau) {
    const a = ent(2, 20), n = facile(niveau) ? 2 : ent(2, 9);
    return { enonce: "Le nombre $(-" + a + ")^{" + n + "}$ est-il positif ou négatif ?", reponse: n % 2 ? -1 : 1, correction: regle(n) };
  }
  function signe2(niveau) {
    const a = ent(2, 20), n = facile(niveau) ? 2 * ent(1, 5) : ent(2, 10);
    if (!facile(niveau) && Math.random() < 0.45) return { enonce: "Le nombre $-" + a + "^{" + n + "}$ est-il positif ou négatif ?", reponse: -1, correction: "L'exposant ne porte que sur $" + a + "$ : $" + a + "^{" + n + "}$ est positif, et le signe moins devant le rend négatif." };
    return { enonce: "Le nombre $(-" + a + ")^{" + n + "}$ est-il positif ou négatif ?", reponse: n % 2 ? -1 : 1, correction: regle(n) };
  }
  function signe3() {
    const type = choix(["neg", "dec", "prod"]);
    if (type === "neg") { const a = ent(2, 9), n = ent(1, 6); return { enonce: "Le nombre $(-" + a + ")^{-" + n + "}$ est-il positif ou négatif ?", reponse: n % 2 ? -1 : 1, correction: "$(-" + a + ")^{-" + n + "} = \\dfrac{1}{(-" + a + ")^{" + n + "}}$. " + regle(n) }; }
    if (type === "dec") { const d = ent(1, 15) / 10, n = ent(2, 11); return { enonce: "Le nombre $(-" + L(d) + ")^{" + n + "}$ est-il positif ou négatif ?", reponse: n % 2 ? -1 : 1, correction: regle(n) }; }
    const a = ent(2, 9), b = ent(2, 9), n = ent(2, 7), m = ent(2, 7), s = (n % 2 ? -1 : 1) * (m % 2 ? -1 : 1);
    return {
      enonce: "Le nombre $(-" + a + ")^{" + n + "} \\times (-" + b + ")^{" + m + "}$ est-il positif ou négatif ?", reponse: s,
      correction: "$(-" + a + ")^{" + n + "}$ est " + (n % 2 ? "négatif" : "positif") + " (exposant " + (n % 2 ? "impair" : "pair") + ") et $(-" + b + ")^{" + m + "}$ est " + (m % 2 ? "négatif" : "positif") +
        " (exposant " + (m % 2 ? "impair" : "pair") + "). Le produit est donc " + (s > 0 ? "positif." : "négatif.")
    };
  }

  // ---------- Puissances de 10 : l'exposant ----------
  function dix1(niveau) {
    const n = facile(niveau) ? 1 : ent(2, 9);
    return { enonce: "Écrire $" + grand(n) + "$ sous la forme $10^{k}$. Donner $k$.", reponse: n, correction: "$" + grand(n) + "$ s'écrit avec un $1$ suivi de $" + n + "$ zéro" + (n > 1 ? "s" : "") + " : $" + grand(n) + " = 10^{" + n + "}$, donc $k = " + n + "$." };
  }
  function dix2(niveau) {
    const n = facile(niveau) ? 1 : ent(1, 8);
    return { enonce: "Écrire $" + petit(n) + "$ sous la forme $10^{k}$. Donner $k$.", reponse: -n, correction: "$" + petit(n) + " = \\dfrac{1}{" + grand(n) + "} = \\dfrac{1}{10^{" + n + "}} = 10^{-" + n + "}$, donc $k = -" + n + "$." };
  }
  function dix3() {
    const m = ent(2, 9), n = ent(2, 9), type = choix(["grand-neg", "petit-grand", "quot"]);
    if (type === "grand-neg") { const k = m - n; return { enonce: "Écrire $" + grand(m) + " \\times 10^{-" + n + "}$ sous la forme $10^{k}$. Donner $k$.", reponse: k, correction: "$" + grand(m) + " = 10^{" + m + "}$, donc le produit vaut $10^{" + m + " + (-" + n + ")} = 10^{" + k + "}$, soit $k = " + k + "$." }; }
    if (type === "petit-grand") { const k = n - m; return { enonce: "Écrire $" + petit(m) + " \\times " + grand(n) + "$ sous la forme $10^{k}$. Donner $k$.", reponse: k, correction: "$" + petit(m) + " = 10^{-" + m + "}$ et $" + grand(n) + " = 10^{" + n + "}$, donc le produit vaut $10^{-" + m + " + " + n + "} = 10^{" + k + "}$, soit $k = " + k + "$." }; }
    const k = m + n;
    return { enonce: "Écrire $\\dfrac{" + grand(m) + "}{" + petit(n) + "}$ sous la forme $10^{k}$. Donner $k$.", reponse: k, correction: "$" + grand(m) + " = 10^{" + m + "}$ et $" + petit(n) + " = 10^{-" + n + "}$ donc le quotient vaut $10^{" + m + " - (-" + n + ")} = 10^{" + k + "}$, soit $k = " + k + "$." };
  }

  // ---------- Calculer une expression avec des puissances ----------
  function valeur1(niveau) {
    const prod = Math.random() < 0.5;
    let m, n;
    if (prod) { m = ent(1, 5); n = facile(niveau) ? 0 : ent(1, 6 - m); }
    else { m = ent(2, 6); n = facile(niveau) ? 0 : ent(1, m - 1); }
    const k = prod ? m + n : m - n, e = prod ? "10^{" + m + "} \\times 10^{" + n + "}" : "\\dfrac{10^{" + m + "}}{10^{" + n + "}}";
    return { enonce: "Calculer $" + e + "$.", reponse: Math.pow(10, k), correction: "$" + e + " = 10^{" + m + (prod ? " + " : " - ") + n + "} = 10^{" + k + "} = " + grand(k) + "$." };
  }
  function valeur2(niveau) {
    let m, n, k, prod;
    const simple = facile(niveau);
    do { prod = Math.random() < 0.5; m = simple ? ent(1, 5) : ent(-5, 5); n = simple ? ent(1, 5) : ent(-5, 5); k = prod ? m + n : m - n; }
    while (k < -5 || k > 6 || (!simple && m >= 0 && n >= 0) || (simple && k < 0));
    const e = prod ? "10^{" + m + "} \\times 10^{" + n + "}" : "\\dfrac{10^{" + m + "}}{10^{" + n + "}}", v = net(Math.pow(10, k));
    return { enonce: "Calculer $" + e + "$.", reponse: v, correction: "$" + e + " = 10^{" + m + (prod ? " + " + ex(n) : " - " + ex(n)) + "} = 10^{" + k + "} = " + (k >= 0 ? grand(k) : petit(-k)) + "$." };
  }
  const MAX = { 2: 8, 3: 5, 5: 3 };
  function valeur3() {
    if (Math.random() < 0.3) {
      const [a, m, n] = choix([[2, 2, 2], [2, 2, 3], [2, 3, 2], [2, 4, 2], [2, 2, 4], [3, 2, 2], [5, 1, 3], [10, 2, 3], [10, 3, 2], [10, 2, 2]]), v = puiss(a, m * n);
      return { enonce: "Calculer $\\left(" + a + "^{" + m + "}\\right)^{" + n + "}$.", reponse: v, correction: "$\\left(" + a + "^{" + m + "}\\right)^{" + n + "} = " + a + "^{" + m + " \\times " + n + "} = " + a + "^{" + m * n + "} = " + L(v) + "$." };
    }
    const a = choix([2, 3, 5]), prod = Math.random() < 0.5;
    let m, n, k;
    do { m = ent(1, 9); n = ent(1, 9); k = prod ? m + n : m - n; } while (k < 1 || k > MAX[a] || (prod && (m === 1 || n === 1) && Math.random() < 0.5) || (!prod && m < 3));
    const e = prod ? a + "^{" + m + "} \\times " + a + "^{" + n + "}" : "\\dfrac{" + a + "^{" + m + "}}{" + a + "^{" + n + "}}", v = puiss(a, k);
    return { enonce: "Calculer $" + e + "$.", reponse: v, correction: "$" + e + " = " + a + "^{" + m + (prod ? " + " : " - ") + n + "} = " + a + "^{" + k + "} = " + L(v) + "$." };
  }

  // Partagé avec la 3e (chapitre « Puissances »)
  Savoirs.puissances = { calcul1, calcul2, calcul3, negatif1, negatif2, negatif3, exposant1, exposant2, exposant3, signe1, signe2, signe3, dix1, dix2, dix3, valeur1, valeur2, valeur3 };

  const puis = [
    { id: "puis-calcul", chap: "puis", titre: "Calculer une puissance", format: "nombre", niveaux: { 1: () => calcul1(1), 2: () => calcul2(2), 3: () => calcul3() } },
    { id: "puis-negatif", chap: "puis", titre: "Exposant négatif", format: "fraction", niveaux: { 1: () => negatif1(1), 2: () => negatif2(2), 3: () => negatif3() } },
    { id: "puis-exposant", chap: "puis", titre: "Trouver l'exposant", format: "nombre", niveaux: { 1: () => exposant1(1), 2: () => exposant2(2), 3: () => exposant3() } },
    { id: "puis-signe", chap: "puis", titre: "Signe d'une puissance", format: "signe", niveaux: { 1: () => signe1(1), 2: () => signe2(2), 3: () => signe3() } },
    { id: "puis-dix", chap: "puis", titre: "Puissances de 10 : l'exposant", format: "nombre", niveaux: { 1: () => dix1(1), 2: () => dix2(2), 3: () => dix3() } },
    { id: "puis-valeur", chap: "puis", titre: "Calculer une expression avec des puissances", format: "nombre", niveaux: { 1: () => valeur1(1), 2: () => valeur2(2), 3: () => valeur3() } }
  ];

  Savoirs.enregistrerTechniques("4e", puis);
})();
