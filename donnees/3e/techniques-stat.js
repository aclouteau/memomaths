// Techniques d'entraînement de 3e : « Statistiques » (stat).
// D'après propositions/referentiels/3e/stat.json (lot 7) : les descriptions de niveau sont la spécification.
// Les séries « valeur (effectif) » sont affichées dans un vrai tableau (décision de l'enseignant). Pas de quartiles.
(function () {
  const { L, T, ent, choix, net, facile, tableau } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const serie = (v) => v.map((x) => T(x)).join(" ; ");
  const range = (v) => v.slice().sort((a, b) => a - b);
  const CONTEXTES = [["le nombre de buts marqués lors de", "matchs"], ["les notes de", "élèves"], ["le nombre de livres lus par", "élèves"]];
  const rang = (k) => k + "^{\\text{e}}";
  // Tableau affiché sous l'énoncé, à la place de la figure (vrai tableau, décision de l'enseignant)
  const tab = (lignes) => '<div class="tableau-donnees">' + Savoirs.maths.texte(tableau(lignes)) + "</div>";

  // ---------- Étendue ----------
  function etendue(niveau) {
    if (niveau === 1) {
      const n = ent(6, 8), v = Array.from({ length: n }, () => ent(0, 20)), [ctx, qui] = choix(CONTEXTES), max = Math.max(...v), min = Math.min(...v);
      const donnees = facile(1) ? range(v) : v;
      return { enonce: "Voici " + ctx + " " + n + " " + qui + " : " + serie(donnees) + ". Calculer l'étendue de cette série.", reponse: max - min,
        correction: "Plus grande valeur : $" + max + "$ ; plus petite : $" + min + "$. Étendue : $" + max + " - " + min + " = " + (max - min) + "$." };
    }
    if (niveau === 2) {
      if (Math.random() < 0.3) {
        const n = ent(6, 8), v = Array.from({ length: n }, () => net(ent(120, 185) / 100)), max = Math.max(...v), min = Math.min(...v), e = net(max - min);
        return { enonce: "Voici les tailles (en m) de " + n + " élèves : " + serie(v) + ". Calculer l'étendue de cette série.", reponse: e, unite: "m",
          correction: "Plus grande valeur : $" + L(max) + "$ ; plus petite : $" + L(min) + "$. Étendue : $" + L(max) + " - " + L(min) + " = " + L(e) + "$ m." };
      }
      const n = ent(6, 8), positif = facile(2);
      let v; do { v = Array.from({ length: n }, () => (positif ? ent(1, 15) : ent(-8, 15))); } while (!positif && !v.some((x) => x < 0));
      const max = Math.max(...v), min = Math.min(...v);
      return { enonce: "Voici les températures (en °C) relevées à midi pendant " + n + " jours : " + serie(v) + ". Calculer l'étendue de cette série.", reponse: max - min, unite: "°C",
        correction: "Plus grande valeur : $" + L(max) + "$ ; plus petite : $" + L(min) + "$. Étendue : $" + L(max) + " - " + (min < 0 ? "(" + L(min) + ")" : L(min)) + " = " + (max - min) + "$ °C." };
    }
    if (Math.random() < 0.5) {
      const k = ent(4, 6), notes = range(melanger(Array.from({ length: 16 }, (_, i) => i + 5)).slice(0, k)), eff = notes.map(() => ent(1, 9));
      const max = notes[k - 1], min = notes[0];
      return { enonce: "Voici les notes d'une classe. Calculer l'étendue de cette série.", schema: tab([["Note"].concat(notes), ["Effectif"].concat(eff)]), reponse: max - min,
        correction: "Les effectifs n'interviennent pas. Plus grande note : $" + max + "$ ; plus petite : $" + min + "$. Étendue : $" + max + " - " + min + " = " + (max - min) + "$." };
    }
    const min = ent(2, 30), e = ent(5, 40);
    return { enonce: "Dans une série, la plus petite valeur est " + min + " et l'étendue est " + e + ". Quelle est la plus grande valeur ?", reponse: min + e,
      correction: "Étendue = plus grande valeur − plus petite valeur, donc plus grande valeur $= " + min + " + " + e + " = " + (min + e) + "$." };
  }

  // ---------- Médiane ----------
  function mediane(niveau) {
    if (niveau < 3) {
      const impair = niveau === 1 || facile(2), n = impair ? choix([5, 7, 9]) : choix([6, 8, 10]);
      let v; do { v = Array.from({ length: n }, () => ent(0, 20)); } while (new Set(v).size < n - 2);
      const r = range(v), dejaRangee = (niveau === 1 && facile(1)) || (niveau === 2 && impair), donnees = dejaRangee ? r : v;
      let rep, corr;
      if (n % 2) { const m = (n + 1) / 2; rep = r[m - 1]; corr = "L'effectif est impair ($" + n + "$) : la médiane est la $" + rang(m) + "$ valeur, soit $" + rep + "$."; }
      else { const m = n / 2; rep = net((r[m - 1] + r[m]) / 2); corr = "L'effectif est pair ($" + n + "$) : la médiane est le milieu des $" + rang(m) + "$ et $" + rang(m + 1) + "$ valeurs, $\\dfrac{" + r[m - 1] + " + " + r[m] + "}{2} = " + L(rep) + "$."; }
      return { enonce: "Voici les notes de " + n + " élèves : " + serie(donnees) + ". Déterminer la médiane de cette série.", reponse: rep,
        correction: (dejaRangee ? "La série est rangée. " : "Série rangée : " + serie(r) + ". ") + corr };
    }
    let notes, eff, N;
    do { const k = ent(4, 5); notes = range(melanger(Array.from({ length: 16 }, (_, i) => i + 5)).slice(0, k)); eff = notes.map(() => ent(1, 9)); N = eff.reduce((a, b) => a + b, 0); } while (N < 12);
    const cumul = []; eff.reduce((a, b, i) => (cumul[i] = a + b), 0);
    const position = (p) => notes[cumul.findIndex((c) => c >= p)];
    let rep, corr;
    if (N % 2) { const p = (N + 1) / 2; rep = position(p); corr = "Effectif total : $" + N + "$ (impair) : la médiane est la $" + rang(p) + "$ valeur. Effectifs cumulés : " + cumul.join(" ; ") + ". La $" + rang(p) + "$ valeur est $" + rep + "$."; }
    else {
      const p = N / 2, a = position(p), b = position(p + 1); rep = net((a + b) / 2);
      corr = "Effectif total : $" + N + "$ (pair) : la médiane est le milieu des $" + rang(p) + "$ et $" + rang(p + 1) + "$ valeurs. Effectifs cumulés : " + cumul.join(" ; ") + ". Ces valeurs sont $" + a + "$ et $" + b + "$" +
        (a === b ? ", donc la médiane est $" + a + "$." : ", donc la médiane est $\\dfrac{" + a + " + " + b + "}{2} = " + L(rep) + "$.");
    }
    return { enonce: "Voici les notes obtenues dans une classe. Déterminer la note médiane.", schema: tab([["Note"].concat(notes), ["Effectif"].concat(eff)]), reponse: rep, correction: corr };
  }

  // ---------- Moyenne ----------
  function moyennePonderee(notes, eff, unite, titre) {
    const S = notes.reduce((s, x, i) => s + x * eff[i], 0), N = eff.reduce((a, b) => a + b, 0), m = net(S / N);
    return {
      enonce: "Voici les " + (titre || "notes") + " d'un groupe. Calculer la note moyenne.", schema: tab([["Note"].concat(notes), ["Effectif"].concat(eff)]), reponse: m, unite: unite || "",
      correction: "Somme des notes : $" + notes.map((x, i) => x + " \\times " + eff[i]).join(" + ") + " = " + S + "$. Effectif total : $" + eff.join(" + ") + " = " + N + "$. Moyenne : $\\dfrac{" + S + "}{" + N + "} = " + L(m) + "$."
    };
  }
  function moyenne(niveau) {
    if (niveau === 1) {
      let notes, eff, S, N;
      do { notes = range(melanger([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 3)); eff = facile(1) ? [1, 1, 1] : notes.map(() => ent(1, 4)); S = notes.reduce((s, x, i) => s + x * eff[i], 0); N = eff.reduce((a, b) => a + b, 0); } while (S % N);
      return moyennePonderee(notes, eff);
    }
    if (niveau === 2) {
      let notes, eff, S, N;
      do {
        if (facile(2)) { notes = range(melanger(Array.from({ length: 16 }, (_, i) => i + 5)).slice(0, 3)); eff = [2, 2, 2]; }
        else { notes = range(melanger(Array.from({ length: 16 }, (_, i) => i + 5)).slice(0, 4)); eff = notes.map(() => ent(1, 6)); }
        S = notes.reduce((s, x, i) => s + x * eff[i], 0); N = eff.reduce((a, b) => a + b, 0);
      } while (Math.abs(S / N * 100 - Math.round(S / N * 100)) > 1e-9);
      return moyennePonderee(notes, eff);
    }
    // Niveau 3 : cinq notes et des effectifs plus grands (plus de classes, décision de l'enseignant)
    let notes, eff, S, N;
    do {
      notes = range(melanger(Array.from({ length: 16 }, (_, i) => i + 5)).slice(0, 5)); eff = notes.map(() => ent(1, 9));
      S = notes.reduce((s, x, i) => s + x * eff[i], 0); N = eff.reduce((a, b) => a + b, 0);
    } while (Math.abs(S / N * 100 - Math.round(S / N * 100)) > 1e-9);
    return moyennePonderee(notes, eff);
  }

  Savoirs.enregistrerTechniques("3e", [
    { id: "st-etendue-calc", chap: "stat", titre: "Calculer une étendue", format: "nombre", niveaux: { 1: () => etendue(1), 2: () => etendue(2), 3: () => etendue(3) } },
    { id: "st-mediane-calc", chap: "stat", titre: "Déterminer une médiane", format: "nombre", niveaux: { 1: () => mediane(1), 2: () => mediane(2), 3: () => mediane(3) } },
    { id: "st-moyenne-calc", chap: "stat", titre: "Moyenne avec des effectifs", format: "nombre", niveaux: { 1: () => moyenne(1), 2: () => moyenne(2), 3: () => moyenne(3) } }
  ]);
})();
