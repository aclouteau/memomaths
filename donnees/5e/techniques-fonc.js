// Techniques d'entraînement de 5e : « Fonctions : premiers pas » (fonc).
// D'après propositions/referentiels/5e/fonc.json (lot 8) : les descriptions de niveau sont la spécification.
// Pas de notation f(x) en 5e (3e).
(function () {
  const { L, ent, choix, net, facile } = Savoirs.calculsOutils;
  const dec1 = () => { for (;;) { const k = ent(11, 99); if (k % 10) return k / 10; } };

  // ---------- Formules ----------
  // [texte de la formule, lettre, a, b, décimal permis]
  const LINEAIRES = [
    ["Le périmètre d'un carré de côté $c$ est $P = 4 \\times c$.", "c", "P", 4, 0, true],
    ["Le prix de $n$ croissants à $1{,}10$ € est $p = 1{,}1 \\times n$.", "n", "p", 1.1, 0, false],
    ["La distance parcourue en $t$ heures à $60$ km/h est $d = 60 \\times t$.", "t", "d", 60, 0, true]
  ];
  const AFFINES = [
    ["Le prix d'une course de taxi de $k$ km est $p = 2 \\times k + 3$.", "k", "p", 2, 3, true],
    ["Le nombre d'allumettes pour $n$ carrés alignés est $A = 3 \\times n + 1$.", "n", "A", 3, 1, false],
    ["Le coût de $n$ places de cinéma avec la carte est $c = 6 \\times n + 10$.", "n", "c", 6, 10, false]
  ];
  function formule(niveau) {
    const f = niveau === 1 ? choix(LINEAIRES) : niveau === 2 ? (facile(2) ? LINEAIRES[0] : choix(AFFINES)) : choix(LINEAIRES.concat(AFFINES));
    const [texte, x, y, a, b, decimal] = f;
    const v = niveau === 1 ? (facile(1) ? 1 : ent(2, 12)) : niveau === 2 ? ent(1, 15) : (decimal ? dec1() : ent(16, 40));
    const r = net(a * v + b);
    return { enonce: texte + " Calculer $" + y + "$ pour $" + x + " = " + L(v) + "$.", reponse: r,
      correction: "On remplace $" + x + "$ par $" + L(v) + "$ : $" + y + " = " + L(a) + " \\times " + L(v) + (b ? " + " + b : "") + " = " + L(r) + "$." };
  }

  // ---------- Programmes de calcul ----------
  function programme(niveau) {
    if (niveau === 1) {
      const a = ent(2, 6), b = ent(1, 10), x = facile(1) ? 1 : ent(2, 10);
      return { enonce: "Programme : « Choisir un nombre, le multiplier par " + a + ", puis ajouter " + b + ". » Quel résultat obtient-on avec " + x + " ?", reponse: a * x + b,
        correction: "$" + x + " \\times " + a + " = " + a * x + "$, puis $" + a * x + " + " + b + " = " + (a * x + b) + "$." };
    }
    if (niveau === 2) {
      const a = facile(2) ? 2 : ent(2, 6), b = ent(1, 10), x = ent(2, 10);
      return { enonce: "Programme : « Choisir un nombre, lui ajouter " + b + ", puis multiplier le résultat par " + a + ". » Quel résultat obtient-on avec " + x + " ?", reponse: (x + b) * a,
        correction: "$" + x + " + " + b + " = " + (x + b) + "$, puis $" + (x + b) + " \\times " + a + " = " + (x + b) * a + "$." };
    }
    const a = ent(2, 9), b = ent(1, 15), x = ent(2, 15), r = a * x + b;
    return { enonce: "Programme : « Choisir un nombre, le multiplier par " + a + ", puis ajouter " + b + ". » On obtient " + r + ". Quel nombre a-t-on choisi ?", reponse: x,
      correction: "On remonte le programme : $" + r + " - " + b + " = " + a * x + "$, puis $" + a * x + " \\div " + a + " = " + x + "$." };
  }

  // ---------- Proportionnel ou non ? ----------
  function proportionnel(niveau) {
    const oui = (niveau === 1 && facile(1)) || (niveau === 2 && facile(2)) || Math.random() < 0.5;
    let xs; do { xs = [ent(1, 10), ent(1, 10), ent(1, 10)].sort((p, q) => p - q); } while (new Set(xs).size < 3);
    const k = niveau === 3 ? choix([0.5, 1.2, 1.5, 2.5]) : ent(2, 9);
    let ys = xs.map((x) => net(k * x));
    if (!oui) {
      if (niveau === 1) ys = xs.map((x, i) => net(k * x + (i === 0 ? 0 : choix([1, 2])))); // valeurs augmentées de 1 ou 2
      else { const i = ent(0, 2); ys[i] = net(ys[i] + (niveau === 3 ? choix([0.5, -0.5]) : choix([1, -1]))); }
    }
    const quot = xs.map((x, i) => { const q = net(ys[i] / x); return Math.abs(q * 100 - Math.round(q * 100)) < 1e-9 ? L(ys[i]) + " \\div " + x + " = " + L(q) : "\\dfrac{" + L(ys[i]) + "}{" + x + "}"; });
    const egaux = new Set(xs.map((x, i) => net(ys[i] / x))).size === 1;
    return { enonce: "Ce tableau est-il un tableau de proportionnalité ? Première ligne : " + xs.join(" ; ") + ". Seconde ligne : " + ys.map((y) => String(y).replace(".", ",")).join(" ; ") + ".", reponse: egaux ? "oui" : "non",
      correction: "Quotients : $" + quot.join("$ ; $") + "$. " + (egaux ? "Ils sont tous égaux : oui." : "Ils ne sont pas tous égaux : non.") };
  }

  Savoirs.enregistrerTechniques("5e", [
    { id: "fonc-formule-calc", chap: "fonc", titre: "Calculer avec une formule", format: "nombre", niveaux: { 1: () => formule(1), 2: () => formule(2), 3: () => formule(3) } },
    { id: "fonc-programme-calc", chap: "fonc", titre: "Programmes de calcul", format: "nombre", niveaux: { 1: () => programme(1), 2: () => programme(2), 3: () => programme(3) } },
    { id: "fonc-proportionnel", chap: "fonc", titre: "Tableau de proportionnalité ou non ?", format: "choix", options: ["oui", "non"], niveaux: { 1: () => proportionnel(1), 2: () => proportionnel(2), 3: () => proportionnel(3) } }
  ]);
})();
