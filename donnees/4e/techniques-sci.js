// Techniques d'entraînement de 4e : « Puissances : notation scientifique » (sci).
// D'après propositions/referentiels/4e/sci.json (lot 6) : les descriptions de niveau sont la spécification.
// Les nombres sont construits en écriture exacte (chiffres + exposant) pour éviter les arrondis de l'ordinateur
// sur les très petits nombres. Générateurs partagés avec la 3e (Savoirs.notationScientifique).
(function () {
  const { L, ent, choix, facile } = Savoirs.calculsOutils;

  // Nombre m × 10^e (m entier positif) : écriture LaTeX (virgule, espaces fines dans la partie entière) et valeur
  function nombre(m, e) {
    let s = String(m), entier, dec = "";
    if (e >= 0) entier = s + "0".repeat(e);
    else {
      const k = -e;
      if (s.length > k) { entier = s.slice(0, s.length - k); dec = s.slice(s.length - k); }
      else { entier = "0"; dec = "0".repeat(k - s.length) + s; }
      dec = dec.replace(/0+$/, "");
    }
    entier = entier.replace(/^0+(?=\d)/, "");
    const groupes = entier.length > 4 ? entier.replace(/\B(?=(\d{3})+$)/g, "\\,") : entier;
    return { tex: groupes + (dec ? "{,}" + dec : ""), val: parseFloat(m + "e" + e) };
  }
  const chiffres = (m) => String(m).length;
  // a écrit avec sa virgule : mantisse entière m avec d décimales (m = 381, d = 2 : 3,81)
  const aTex = (m, d) => nombre(m, -d).tex;
  const nsci = (m, d, n) => aTex(m, d) + " \\times 10^{" + n + "}";
  const rangs = (k) => k + " rang" + (k > 1 ? "s" : "");
  const forme = "$a \\times 10^{n}$ avec $1 \\leqslant a < 10$";
  // Mantisse à une décimale non entière (1,1 à 9,9)
  const mant1 = () => { let m; do { m = ent(11, 99); } while (m % 10 === 0); return m; };

  // ---------- L'exposant n ----------
  function exposant1(niveau) {
    let m, d, n;
    if (facile(niveau)) { m = ent(1, 9); d = 0; n = ent(1, 4); } else { m = ent(11, 99); d = 1; n = ent(2, 9); if (m % 10 === 0) { m /= 10; d = 0; } }
    const x = nombre(m, n - d).tex;
    return {
      enonce: choix(["$" + x + " = a \\times 10^{n}$ avec $1 \\leqslant a < 10$. Donner $n$.", "Écrire $" + x + "$ en notation scientifique " + forme + ". Donner $n$."]),
      reponse: n,
      correction: "On déplace la virgule de $" + n + "$ " + rangs(n).replace(/^\d+ /, "") + " vers la gauche pour obtenir $" + aTex(m, d) + "$ : $" + x + " = " + nsci(m, d, n) + "$. Donc $n = " + n + "$."
    };
  }
  function exposant2(niveau) {
    let m, d, n;
    if (facile(niveau)) { m = ent(1, 9); d = 0; n = ent(1, 3); } else { m = mant1(); d = 1; n = ent(1, 9); }
    const x = nombre(m, -n - d).tex;
    return {
      enonce: "$" + x + " = a \\times 10^{n}$ avec $1 \\leqslant a < 10$. Donner $n$.", reponse: -n,
      correction: "On déplace la virgule de $" + n + "$ " + rangs(n).replace(/^\d+ /, "") + " vers la droite pour obtenir $" + aTex(m, d) + "$ : $" + x + " = " + nsci(m, d, -n) + "$. Donc $n = " + (-n) + "$."
    };
  }
  function exposant3() {
    const type = choix(["grand", "nonReduit", "produit"]);
    if (type === "grand") {
      let m; do { m = ent(101, 999); } while (m % 10 === 0);
      const n = ent(4, 12), x = nombre(m, n - 2).tex;
      return { enonce: "Écrire $" + x + "$ en notation scientifique " + forme + ". Donner $n$.", reponse: n,
        correction: "On déplace la virgule de $" + n + "$ rangs vers la gauche : $" + x + " = " + nsci(m, 2, n) + "$. Donc $n = " + n + "$." };
    }
    if (type === "nonReduit") {
      const c = choix([12, 15, 25, 35, 45, 64, 85, 125, 250, 340]), e = ent(-9, 9), k = chiffres(c) - 1, n = e + k, m = Number(String(c).replace(/0+$/, "")), d = chiffres(m) - 1;
      return { enonce: "Écrire $" + c + " \\times 10^{" + e + "}$ en notation scientifique " + forme + ". Donner $n$.", reponse: n,
        correction: "$" + c + " = " + nsci(m, d, k) + "$ donc $" + c + " \\times 10^{" + e + "} = " + aTex(m, d) + " \\times 10^{" + k + (e < 0 ? " + (" + e + ")" : " + " + e) + "} = " + nsci(m, d, n) + "$. Donc $n = " + n + "$." };
    }
    let x, y; do { x = ent(2, 9); y = ent(2, 9); } while (x * y < 10);
    const p = ent(-5, 6), q = ent(-5, 6), xy = x * y, n = p + q + 1, m = xy % 10 ? xy : xy / 10, d = xy % 10 ? 1 : 0;
    return { enonce: "Écrire $(" + x + " \\times 10^{" + p + "}) \\times (" + y + " \\times 10^{" + q + "})$ en notation scientifique " + forme + ". Donner $n$.", reponse: n,
      correction: "$" + x + " \\times " + y + " = " + xy + "$ et $10^{" + p + "} \\times 10^{" + q + "} = 10^{" + (p + q) + "}$, donc le produit vaut $" + xy + " \\times 10^{" + (p + q) + "} = " + nsci(m, d, 1) + " \\times 10^{" + (p + q) + "} = " + nsci(m, d, n) + "$. Donc $n = " + n + "$." };
  }

  // ---------- De la notation scientifique à l'écriture décimale ----------
  function decimal(niveau) {
    let m, d, n;
    if (niveau === 1) { if (facile(1)) { m = ent(2, 9); d = 0; n = ent(1, 3); } else { m = mant1(); d = 1; n = ent(2, 6); } }
    else if (niveau === 2) { if (facile(2)) { m = ent(2, 9); d = 0; n = -ent(1, 2); } else { m = mant1(); d = 1; n = -ent(1, 6); } }
    else { do { m = ent(101, 999); } while (m % 10 === 0); d = 2; do { n = ent(-8, 8); } while (n === 0); }
    const r = nombre(m, n - d);
    return {
      enonce: "Écrire $" + nsci(m, d, n) + "$ en écriture décimale.", reponse: r.val,
      correction: (n > 0 ? "On multiplie par $10^{" + n + "}$ : on déplace la virgule de $" + n + "$ " + rangs(n).replace(/^\d+ /, "") + " vers la droite."
        : "Exposant négatif : on déplace la virgule de $" + (-n) + "$ " + rangs(-n).replace(/^\d+ /, "") + " vers la gauche.") + " $" + nsci(m, d, n) + " = " + r.tex + "$."
    };
  }

  // ---------- Le nombre a ----------
  function mantisse(niveau) {
    if (niveau === 1) {
      let m, d, n;
      if (facile(1)) { m = ent(2, 9); d = 0; } else { do { m = ent(11, 99); } while (m % 10 === 0); d = 1; if (Math.random() < 0.4) { do { m = ent(101, 999); } while (m % 10 === 0); d = 2; } }
      n = ent(Math.max(3, d + 1), 9);
      const x = nombre(m, n - d).tex;
      return { enonce: "Écrire $" + x + "$ en notation scientifique $a \\times 10^{n}$. Donner $a$.", reponse: nombre(m, -d).val,
        correction: "On déplace la virgule de $" + n + "$ rangs vers la gauche : $" + x + " = " + nsci(m, d, n) + "$. Donc $a = " + aTex(m, d) + "$." };
    }
    if (niveau === 2) {
      let c; if (facile(2)) c = 10 * ent(1, 9) * choix([1, 10]); else do { c = ent(12, 989); } while (c % 10 === 0);
      const e = ent(-9, 9), cr = Number(String(c).replace(/0+$/, "")), k = chiffres(c) - 1, d = chiffres(cr) - 1, n = e + k;
      return { enonce: "Écrire $" + c + " \\times 10^{" + e + "}$ en notation scientifique $a \\times 10^{n}$. Donner $a$.", reponse: nombre(cr, -d).val,
        correction: "$" + c + " = " + nsci(cr, d, k) + "$ donc le nombre vaut $" + nsci(cr, d, n) + "$. Donc $a = " + aTex(cr, d) + "$." };
    }
    let m, k; do { m = ent(101, 9999); k = ent(1, 7); } while (m % 10 === 0 || chiffres(m) - 1 === k);
    const x = nombre(m, -k), d = chiffres(m) - 1, n = d - k;
    return { enonce: "Écrire $" + x.tex + "$ en notation scientifique $a \\times 10^{n}$. Donner $a$.", reponse: nombre(m, -d).val,
      correction: "On déplace la virgule de $" + Math.abs(n) + "$ " + rangs(Math.abs(n)).replace(/^\d+ /, "") + " vers la " + (n >= 0 ? "gauche" : "droite") + " : $" + x.tex + " = " + nsci(m, d, n) + "$. Donc $a = " + aTex(m, d) + "$." };
  }

  // ---------- Produit ----------
  function calcul(niveau) {
    if (niveau === 1) {
      const x = facile(1) ? 1 : ent(2, 4), y = ent(2, 4), m = ent(1, 6), n = ent(1, 6), r = nombre(x * y, m + n);
      return { enonce: "Calculer $(" + x + " \\times 10^{" + m + "}) \\times (" + y + " \\times 10^{" + n + "})$. Donner le résultat en écriture décimale.", reponse: r.val,
        correction: "$" + x + " \\times " + y + " = " + x * y + "$ et $10^{" + m + "} \\times 10^{" + n + "} = 10^{" + (m + n) + "}$ donc le produit vaut $" + x * y + " \\times 10^{" + (m + n) + "} = " + r.tex + "$." };
    }
    if (niveau === 2) {
      const simple = facile(2), x = ent(2, 9), y = ent(2, 9);
      let m, n; do { m = simple ? ent(1, 5) : ent(-5, 5); n = simple ? ent(1, 5) : ent(-5, 5); } while (m + n < -7 || m + n > 7 || (!simple && m >= 0 && n >= 0));
      const r = nombre(x * y, m + n);
      return { enonce: "Calculer $(" + x + " \\times 10^{" + m + "}) \\times (" + y + " \\times 10^{" + n + "})$. Donner le résultat en écriture décimale.", reponse: r.val,
        correction: "$" + x + " \\times " + y + " = " + x * y + "$ et $10^{" + m + "} \\times 10^{" + n + "} = 10^{" + (m + n) + "}$ donc le produit vaut $" + x * y + " \\times 10^{" + (m + n) + "} = " + r.tex + "$." };
    }
    const x = mant1(), y = ent(2, 9), m = ent(-4, 4), n = ent(-4, 4), p = x * y, r = nombre(p, m + n - 1);
    return { enonce: "Calculer $(" + aTex(x, 1) + " \\times 10^{" + m + "}) \\times (" + y + " \\times 10^{" + n + "})$. Donner le résultat en écriture décimale.", reponse: r.val,
      correction: "$" + aTex(x, 1) + " \\times " + y + " = " + aTex(p, 1) + "$ et $10^{" + m + "} \\times 10^{" + n + "} = 10^{" + (m + n) + "}$ donc le produit vaut $" + aTex(p, 1) + " \\times 10^{" + (m + n) + "} = " + r.tex + "$." };
  }

  // ---------- Comparer ----------
  function comparer(niveau) {
    let m1, m2, n1, n2;
    if (niveau === 1) {
      m1 = mant1(); m2 = facile(1) ? m1 : mant1();
      do { n1 = ent(2, 9); n2 = ent(2, 9); } while (n1 === n2);
    } else if (niveau === 2) {
      m1 = mant1(); m2 = mant1();
      if (!facile(2) && Math.random() < 0.6) { n1 = n2 = ent(-9, 9); while (m1 === m2) m2 = mant1(); }
      else do { n1 = ent(-9, 9); n2 = ent(-9, 9); } while (n1 === n2);
    } else {
      m1 = mant1(); m2 = mant1(); n1 = ent(-9, 8); n2 = n1 + 1;
      if (Math.random() < 0.5) [n1, n2] = [n2, n1];
      while ((n1 > n2) === (m1 > m2)) { m1 = mant1(); m2 = mant1(); } // le nombre a le plus grand n'est pas celui du plus grand exposant
    }
    const v1 = nombre(m1, n1 - 1).val, v2 = nombre(m2, n2 - 1).val, r = v1 < v2 ? "<" : ">";
    const a = nsci(m1, 1, n1), b = nsci(m2, 1, n2);
    return {
      enonce: "Compléter par $<$ ou $>$ : $" + a + " \\ldots " + b + "$.", reponse: r,
      correction: n1 === n2 ? "Les exposants sont égaux ($" + n1 + "$) : on compare les nombres $a$ : $" + aTex(m1, 1) + (r === "<" ? " < " : " > ") + aTex(m2, 1) + "$. Donc $" + a + " " + r + " " + b + "$."
        : "On compare d'abord les exposants : $" + n1 + (n1 > n2 ? " > " : " < ") + n2 + "$. Les nombres sont en notation scientifique, donc le plus grand exposant donne le plus grand nombre : $" + a + " " + r + " " + b + "$."
    };
  }

  Savoirs.notationScientifique = { exposant1, exposant2, exposant3, decimal, mantisse, calcul, comparer };

  const sci = [
    { id: "sci-exposant", chap: "sci", titre: "Exposant d'une notation scientifique", format: "nombre", niveaux: { 1: () => exposant1(1), 2: () => exposant2(2), 3: () => exposant3() } },
    { id: "sci-decimal", chap: "sci", titre: "De la notation scientifique à l'écriture décimale", format: "nombre", niveaux: { 1: () => decimal(1), 2: () => decimal(2), 3: () => decimal(3) } },
    { id: "sci-mantisse", chap: "sci", titre: "Le nombre a de la notation scientifique", format: "nombre", niveaux: { 1: () => mantisse(1), 2: () => mantisse(2), 3: () => mantisse(3) } },
    { id: "sci-calcul", chap: "sci", titre: "Produit en notation scientifique", format: "nombre", niveaux: { 1: () => calcul(1), 2: () => calcul(2), 3: () => calcul(3) } },
    { id: "sci-comparer", chap: "sci", titre: "Comparer deux nombres en notation scientifique", format: "choix", options: ["<", ">"], niveaux: { 1: () => comparer(1), 2: () => comparer(2), 3: () => comparer(3) } }
  ];

  Savoirs.enregistrerTechniques("4e", sci);
})();
