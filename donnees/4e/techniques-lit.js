// Techniques d'entraînement de 4e : « Calcul littéral » (lit), chapitre créé par la mise à jour de novembre 2026
// (MISE-A-JOUR-2026-11-COURS.md) : réduire, développer (distributivité simple), factoriser, calculer une valeur.
// Pas de double distributivité en 4e (elle est en 3e). Les réponses « expression » sont corrigées par
// js/moteur/expressions.js ; la réponse attendue est écrite en texte simple ("8x-12").
(function () {
  const { P, ent, choix, facile, pgcd, polyTexte, polyLatex } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const signe = () => choix([1, -1]);
  const pm = (a, b) => ent(a, b) * signe(); // ±a à ±b
  // Termes [coefficient, degré] écrits à la suite, dans l'ordre donné : 8 + 7x + 6 + 6x
  const monome = (c, d) => (d > 0 && Math.abs(c) === 1 ? "" : String(Math.abs(c))) + (d > 0 ? "x" + (d > 1 ? "^{" + d + "}" : "") : "");
  const ecrireTermes = (l) => l.map(([c, d], i) => (i === 0 ? (c < 0 ? "-" : "") : c < 0 ? " - " : " + ") + monome(c, d)).join("");
  const reduire = (l) => { const c = [0, 0, 0]; l.forEach(([a, d]) => { c[2 - d] += a; }); return c; };
  const affine = (a, b) => polyLatex([a, b]);
  const par = (a, b) => "(" + affine(a, b) + ")";
  // k(ax + b) : k écrit devant la parenthèse (« -3 », « x », « 2x »…)
  const facteur = (k, enX) => (enX ? (k === 1 ? "x" : k === -1 ? "-x" : k + "x") : String(k));

  // ---------- Réduire ----------
  function reduction(niveau) {
    if (niveau === 1) {
      for (;;) {
        const deux = facile(1), l = deux ? [[ent(1, 9), 1], [ent(1, 9), 1]] : melanger([[ent(1, 9), 1], [ent(1, 9), 1], [ent(1, 9), 0], [ent(1, 9), 0]]);
        if (l[0][1] === 0 && l[1][1] === 0 && !deux) continue; // pas deux nombres en tête
        return { latex: ecrireTermes(l), c: reduire(l) };
      }
    }
    if (niveau === 2) {
      for (;;) {
        const l = facile(2) ? melanger([[pm(1, 9), 1], [pm(1, 9), 1], [pm(1, 9), 0]]) : melanger([[pm(1, 9), 2], [pm(1, 9), 1], [pm(1, 9), 1], [pm(1, 9), 0], [pm(1, 9), 0]]);
        const c = reduire(l);
        if (c[1] === 0 || c[2] === 0) continue;
        return { latex: ecrireTermes(l), c: c };
      }
    }
    // Parenthèses précédées de + ou de −
    for (;;) {
      const a = ent(1, 9), b = pm(1, 9), c = ent(1, 9), d = pm(1, 9), e = pm(1, 9), moins = Math.random() < 0.7;
      const A = a + (moins ? -c : c), B = b + (moins ? -d : d) + e;
      if (A === 0 || B === 0) continue;
      const latex = affine(a, b) + (moins ? " - " : " + ") + par(c, d) + (e < 0 ? " - " : " + ") + Math.abs(e);
      const sans = ecrireTermes([[a, 1], [b, 0], [moins ? -c : c, 1], [moins ? -d : d, 0], [e, 0]]);
      return { latex: latex, c: [0, A, B], etapes: "On supprime les parenthèses" + (moins ? " (le signe $-$ devant change le signe de chaque terme)" : "") + " : $" + latex + " = " + sans + " = " + affine(A, B) + "$." };
    }
  }

  // ---------- Développer (distributivité simple) ----------
  function developpement(niveau) {
    let k, enX = false, a, b;
    if (niveau === 1) { k = ent(2, 9); a = facile(1) ? 1 : ent(2, 9); b = ent(1, 9) * (Math.random() < 0.3 ? -1 : 1); }
    else if (niveau === 2) { if (facile(2)) { k = pm(2, 9); a = 1; } else { k = pm(2, 9); a = ent(2, 9); } b = pm(1, 9); if (Math.random() < 0.35) { enX = true; k = choix([1, 2, 3, -1, -2]); } }
    else {
      for (;;) {
        const k1 = ent(2, 9), m = pm(2, 6), a1 = ent(1, 6), b1 = pm(1, 9), c1 = ent(1, 6), d1 = pm(1, 9), A = k1 * a1 + m * c1, B = k1 * b1 + m * d1;
        if (A === 0 || B === 0) continue;
        const latex = k1 + par(a1, b1) + (m < 0 ? " - " : " + ") + Math.abs(m) + par(c1, d1);
        return { latex: latex, c: [0, A, B], etapes: "On distribue : $" + latex + " = " + ecrireTermes([[k1 * a1, 1], [k1 * b1, 0], [m * c1, 1], [m * d1, 0]]) + "$. On regroupe : $" + affine(A, B) + "$." };
      }
    }
    const latex = facteur(k, enX) + par(a, b), c = enX ? [k * a, k * b, 0] : [0, k * a, k * b];
    const kL = enX ? (k === 1 ? "x" : k === -1 ? "(-x)" : (k < 0 ? "(" + k + "x)" : k + "x")) : P(k);
    return { latex: latex, c: c, etapes: "$" + latex + " = " + kL + " \\times " + monome(a, 1) + " + " + kL + " \\times " + P(b) + " = " + polyLatex(c) + "$." };
  }

  // ---------- Factoriser (facteur commun) ----------
  function factorisation(niveau) {
    for (;;) {
      if (niveau === 1) {
        const k = facile(1) ? choix([2, 3, 5]) : ent(2, 9), a = facile(1) ? 1 : ent(1, 6), b = ent(1, 9) * (Math.random() < 0.3 ? -1 : 1);
        if (pgcd(a, Math.abs(b)) !== 1) continue;
        return { c: [0, k * a, k * b], reponse: k + "(" + polyTexte([a, b]) + ")", etapes: "Le facteur commun est $" + k + "$ : $" + affine(k * a, k * b) + " = " + k + " \\times " + monome(a, 1) + (b < 0 ? " - " : " + ") + k + " \\times " + Math.abs(b) + " = " + k + par(a, b) + "$." };
      }
      if (niveau === 2) {
        if (Math.random() < 0.5) { // facteur commun x
          const c = ent(1, 9), d = pm(1, 9);
          return { c: [c, d, 0], reponse: "x(" + polyTexte([c, d]) + ")", etapes: "Le facteur commun est $x$ : $" + polyLatex([c, d, 0]) + " = x \\times " + monome(c, 1) + (d < 0 ? " - " : " + ") + "x \\times " + Math.abs(d) + " = x" + par(c, d) + "$." };
        }
        const k = ent(2, 9), a = ent(1, 6), b = pm(1, 9);
        if (pgcd(a, Math.abs(b)) !== 1) continue;
        return { c: [0, k * a, k * b], reponse: k + "(" + polyTexte([a, b]) + ")", etapes: "Le facteur commun est $" + k + "$ : $" + affine(k * a, k * b) + " = " + k + par(a, b) + "$." };
      }
      // Plus grand facteur commun, ou facteur commun kx
      if (Math.random() < 0.5) {
        const k = choix([4, 6, 8, 9, 10, 12, 15]), a = ent(1, 5), b = pm(1, 7);
        if (pgcd(a, Math.abs(b)) !== 1 || a === 1) continue;
        return { c: [0, k * a, k * b], reponse: k + "(" + polyTexte([a, b]) + ")", etapes: "Le plus grand facteur commun de $" + k * a + "$ et de $" + Math.abs(k * b) + "$ est $" + k + "$ : $" + affine(k * a, k * b) + " = " + k + par(a, b) + "$." };
      }
      const g = ent(2, 6), c = ent(1, 5), d = pm(1, 9);
      if (pgcd(c, Math.abs(d)) !== 1) continue;
      return { c: [g * c, g * d, 0], reponse: g + "x(" + polyTexte([c, d]) + ")", etapes: "Le facteur commun est $" + g + "x$ : $" + polyLatex([g * c, g * d, 0]) + " = " + g + "x" + par(c, d) + "$." };
    }
  }

  // ---------- Calculer la valeur d'une expression (substituer) ----------
  function valeur(niveau) {
    let c, x;
    if (niveau === 1) { c = [0, ent(2, 9), pm(1, 9)]; x = facile(1) ? 2 : ent(1, 6); }
    else if (niveau === 2) { if (facile(2)) { c = [0, ent(2, 9), pm(1, 9)]; x = -ent(1, 5); } else { c = [ent(1, 4), pm(0, 9), pm(1, 9)]; x = ent(1, 5); } }
    else { c = [pm(1, 4), pm(1, 9), pm(0, 9)]; x = -ent(1, 4); }
    const latex = polyLatex(c), r = c[0] * x * x + c[1] * x + c[2];
    const termes = [];
    if (c[0]) termes.push((c[0] === 1 ? "" : c[0] === -1 ? "-" : c[0] + " \\times ") + P(x) + "^{2}");
    if (c[1]) termes.push((c[1] === 1 ? "" : c[1] === -1 ? "-" : c[1] + " \\times ") + P(x));
    if (c[2]) termes.push(String(c[2]));
    const remplace = termes.join(" + ").replace(/\+ -/g, "- ");
    return {
      enonce: "Calculer la valeur de l'expression $A = " + latex + "$ pour $x = " + x + "$.", reponse: r,
      correction: "On remplace $x$ par $" + P(x) + "$ et on applique les priorités : $A = " + remplace + " = " + r + "$."
    };
  }

  const nv = (f) => ({ 1: () => f(1), 2: () => f(2), 3: () => f(3) });
  Savoirs.enregistrerTechniques("4e", [
    { id: "lit4-reduire", chap: "lit", titre: "Réduire une expression", format: "expression", forme: "developpee_reduite",
      niveaux: nv((n) => { const r = reduction(n); return { enonce: choix(["Réduire l'expression $" + r.latex + "$.", "Écrire sous forme réduite l'expression $" + r.latex + "$."]), reponse: polyTexte(r.c), correction: (r.etapes || "On regroupe les termes de même nature : $" + r.latex + " = " + polyLatex(r.c) + "$.") }; }) },
    { id: "lit4-developper", chap: "lit", titre: "Développer avec la distributivité", format: "expression", forme: "developpee_reduite",
      niveaux: nv((n) => { const d = developpement(n); return { enonce: (n === 3 ? "Développer puis réduire $" : "Développer $") + d.latex + "$.", reponse: polyTexte(d.c), correction: d.etapes }; }) },
    { id: "lit4-factoriser", chap: "lit", titre: "Factoriser avec un facteur commun", format: "expression", forme: "factorisee",
      niveaux: nv((n) => { const f = factorisation(n); return { enonce: "Factoriser $" + polyLatex(f.c) + "$.", reponse: f.reponse, correction: f.etapes }; }) },
    { id: "lit4-valeur", chap: "lit", titre: "Calculer la valeur d'une expression", format: "nombre", niveaux: nv(valeur) }
  ]);
})();
