// Techniques d'entraînement de 5e : « Équations » (equ).
// D'après propositions/referentiels/5e/equ.json (lot 8) : les descriptions de niveau sont la spécification.
// En 5e : x + b = c, x − b = c, ax = c et le test d'une solution (équations en plusieurs étapes : 4e).
// La technique « Une égalité est-elle vraie ? » (lit-egalite, donnees/5e/techniques-lit.js) est aussi rattachée à ce chapitre.
(function () {
  const { L, ent, choix, net, facile } = Savoirs.calculsOutils;
  const dec1 = () => { for (;;) { const k = ent(1, 99); if (k % 10) return k / 10; } }; // 0,1 à 9,9

  function addition(niveau) {
    let x, b, forme;
    if (niveau === 1) { x = ent(1, 20); b = ent(1, 20); forme = facile(1) ? "plus" : choix(["plus", "moins"]); }
    else if (niveau === 2) { x = ent(1, 60); b = ent(1, 50); forme = facile(2) ? "gauche" : choix(["devant", "gauche", "moins"]); }
    else { x = dec1(); b = dec1(); forme = choix(["plus", "moins"]); }
    if (forme === "moins") {
      const c = net(x - b);
      if (c <= 0) return addition(niveau);
      return { enonce: "Résoudre l'équation $x - " + L(b) + " = " + L(c) + "$.", reponse: x, correction: "On ajoute $" + L(b) + "$ aux deux membres : $x = " + L(c) + " + " + L(b) + " = " + L(x) + "$." };
    }
    const c = net(x + b);
    const eq = forme === "devant" ? L(b) + " + x = " + L(c) : forme === "gauche" ? L(c) + " = x + " + L(b) : "x + " + L(b) + " = " + L(c);
    return { enonce: "Résoudre l'équation $" + eq + "$.", reponse: x, correction: "On soustrait $" + L(b) + "$ aux deux membres : $x = " + L(c) + " - " + L(b) + " = " + L(x) + "$." };
  }

  function produit(niveau) {
    if (niveau === 3) {
      const n = ent(2, 20);
      if (Math.random() < 0.5) {
        const k = choix([2, 4, 5, 10]);
        return { enonce: "Résoudre l'équation $x \\div " + k + " = " + n + "$.", reponse: n * k, correction: "On multiplie les deux membres par $" + k + "$ : $x = " + n + " \\times " + k + " = " + n * k + "$." };
      }
      const [a, inv] = choix([[0.5, 2], [0.25, 4], [0.2, 5], [0.1, 10]]);
      return { enonce: "Résoudre l'équation $" + L(a) + "x = " + n + "$.", reponse: n * inv,
        correction: "$x = " + n + " \\div " + L(a) + " = " + n * inv + "$ (diviser par $" + L(a) + "$, c'est multiplier par $" + inv + "$)." };
    }
    let a, x;
    if (niveau === 1) { a = facile(1) ? 2 : ent(2, 10); x = ent(1, 10); }
    else if (facile(2)) { a = ent(2, 10); x = ent(1, 10); }
    else { do { a = ent(2, 10); x = Math.random() < 0.5 ? ent(11, 50) : dec1() + ent(0, 9); x = net(x); } while (a * x > 200 || Number.isInteger(x) && x <= 10); }
    const c = net(a * x);
    return { enonce: niveau === 1 && Math.random() < 0.5 ? "Trouver le nombre $x$ tel que $" + a + "x = " + L(c) + "$." : "Résoudre l'équation $" + a + "x = " + L(c) + "$.", reponse: x,
      correction: "On divise les deux membres par $" + a + "$ : $x = " + L(c) + " \\div " + a + " = " + L(x) + "$." };
  }

  function verifier(niveau) {
    const oui = (niveau === 1 && facile(1)) || (niveau === 2 && facile(2)) || Math.random() < 0.5;
    if (niveau === 2) {
      for (;;) {
        const a = ent(3, 10), c = ent(2, a - 1), s = ent(1, 10), b = ent(2, 10), d = (a - c) * s + b;
        if (d < 2 || d > 100) continue;
        let t = s; if (!oui) do { t = s + choix([-2, -1, 1, 2]); } while (t < 1);
        const g = a * t + b, dr = c * t + d;
        return { enonce: "Le nombre $" + t + "$ est-il solution de l'équation $" + a + "x + " + b + " = " + c + "x + " + d + "$ ?", reponse: g === dr ? "oui" : "non",
          correction: "Membre de gauche : $" + a + " \\times " + t + " + " + b + " = " + g + "$. Membre de droite : $" + c + " \\times " + t + " + " + d + " = " + dr + "$. " + (g === dr ? "Les deux membres sont égaux : oui." : "Les deux membres sont différents : non.") };
      }
    }
    const a = ent(2, niveau === 1 ? 5 : 9), b = ent(1, 10), s = niveau === 1 ? ent(1, 8) : ent(1, 32) / 10, c = net(a * s + b);
    let t = s; if (!oui) do { t = niveau === 1 ? s + choix([-2, -1, 1, 2]) : net(s + choix([-0.2, -0.1, 0.1, 0.2, 1])); } while (t <= 0);
    const v = net(a * t + b);
    return { enonce: "Le nombre $" + L(t) + "$ est-il solution de l'équation $" + a + "x + " + b + " = " + L(c) + "$ ?", reponse: v === c ? "oui" : "non",
      correction: "On remplace $x$ par $" + L(t) + "$ : $" + a + " \\times " + L(t) + " + " + b + " = " + L(v) + "$. " + (v === c ? "On trouve bien $" + L(c) + "$ : oui." : "On ne trouve pas $" + L(c) + "$ : non.") };
  }

  function probleme(niveau) {
    if (niveau === 1) {
      const x = ent(2, 50), b = ent(2, 50), plus = facile(1) || Math.random() < 0.5;
      if (!plus && x - b < 1) return probleme(1);
      const r = plus ? x + b : x - b;
      return { enonce: "Je pense à un nombre. Je lui " + (plus ? "ajoute " : "enlève ") + b + " et j'obtiens " + r + ". Quel est ce nombre ?", reponse: x,
        correction: "On résout $x " + (plus ? "+ " : "- ") + b + " = " + r + "$ : $x = " + r + (plus ? " - " : " + ") + b + " = " + x + "$." };
    }
    if (niveau === 2) {
      const a = facile(2) ? 2 : ent(2, 10), x = ent(2, 20);
      if (Math.random() < 0.5) return { enonce: "Je pense à un nombre. Je le multiplie par " + a + " et j'obtiens " + a * x + ". Quel est ce nombre ?", reponse: x, correction: "On résout $" + a + "x = " + a * x + "$ : $x = " + a * x + " \\div " + a + " = " + x + "$." };
      return { enonce: a + " billets d'entrée identiques coûtent " + a * x + " €. Quel est le prix d'un billet ?", reponse: x, unite: "€", correction: "On résout $" + a + "x = " + a * x + "$ : $x = " + a * x + " \\div " + a + " = " + x + "$ €." };
    }
    if (Math.random() < 0.5) {
      const c = ent(5, 40), p = 4 * c;
      return { enonce: "Un carré a un périmètre de " + p + " cm. Quelle est la longueur de son côté ?", reponse: c, unite: "cm", correction: "On résout $4x = " + p + "$ : $x = " + p + " \\div 4 = " + c + "$ cm." };
    }
    const e = ent(8, 14), ecart = ent(20, 35), [qui, lui, de] = choix([["Sa mère", "Léo", "de Léo"], ["Son père", "Inès", "d'Inès"], ["Sa grand-mère", "Noah", "de Noah"]]);
    return { enonce: qui + " a " + ecart + " ans de plus que " + lui + ". " + qui + " a " + (e + ecart) + " ans. Quel âge a " + lui + " ?", reponse: e, unite: "ans",
      correction: "On appelle $x$ l'âge " + de + " : $x + " + ecart + " = " + (e + ecart) + "$, donc $x = " + (e + ecart) + " - " + ecart + " = " + e + "$ ans." };
  }

  Savoirs.enregistrerTechniques("5e", [
    { id: "equ5-addition", chap: "equ", titre: "Équations x + b = c et x − b = c", format: "nombre", niveaux: { 1: () => addition(1), 2: () => addition(2), 3: () => addition(3) } },
    { id: "equ5-produit", chap: "equ", titre: "Équations ax = c", format: "nombre", niveaux: { 1: () => produit(1), 2: () => produit(2), 3: () => produit(3) } },
    { id: "equ5-verifier", chap: "equ", titre: "Tester une solution", format: "choix", options: ["oui", "non"], niveaux: { 1: () => verifier(1), 2: () => verifier(2), 3: () => verifier(3) } },
    { id: "equ5-probleme", chap: "equ", titre: "Problèmes avec une équation", format: "nombre", niveaux: { 1: () => probleme(1), 2: () => probleme(2), 3: () => probleme(3) } }
  ]);
})();
