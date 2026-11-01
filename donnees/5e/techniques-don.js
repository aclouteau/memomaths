// Techniques d'entraînement de 5e : « Traitement de données » (don).
// D'après propositions/referentiels/5e/don.json (lot 8) : les descriptions de niveau sont la spécification.
// Séries écrites en ligne, séparées par « ; » (décision de l'enseignant).
(function () {
  const { L, T, ent, choix, net, facile } = Savoirs.calculsOutils;
  const somme = (v) => v.reduce((s, x) => s + x, 0);
  const decimales = (x) => { const t = String(net(x)); return t.includes(".") ? t.split(".")[1].length : 0; };
  const CONTEXTES = [["Dans un sac de ", " billes, ", " sont rouges."], ["Dans une classe de ", " élèves, ", " sont externes."], ["Sur ", " lancers, ", " ont donné un « 6 »."]];

  // ---------- Fréquence ----------
  function frequence(niveau) {
    if (niveau === 3) {
      for (;;) {
        const sports = Savoirs.melanger(["judo", "natation", "tennis", "basket", "football", "danse"]).slice(0, ent(3, 4));
        const e = sports.map(() => ent(1, 12)), N = somme(e);
        if ([10, 20, 25, 40, 50].indexOf(N) < 0) continue;
        const i = ent(0, sports.length - 1), p = net(e[i] / N * 100);
        return { enonce: "Sports préférés d'une classe : " + sports.map((s, k) => s + " (" + e[k] + ")").join(", ") + ". Quelle est la fréquence, en pourcentage, de « " + sports[i] + " » ?", reponse: p, unite: "%",
          correction: "Effectif total : $" + e.join(" + ") + " = " + N + "$. Fréquence : $\\dfrac{" + e[i] + "}{" + N + "} = " + L(net(e[i] / N)) + "$, soit $" + L(p) + "\\,\\%$." };
      }
    }
    for (;;) {
      const N = niveau === 1 ? (facile(1) ? 10 : choix([10, 20, 25, 50, 100])) : (facile(2) ? 100 : choix([20, 25, 40, 50, 200])), n = ent(1, N - 1), f = net(n / N);
      if (niveau === 2 && decimales(f * 100) > 1) continue;
      if (niveau === 1) {
        const c = choix(CONTEXTES);
        return { enonce: c[0] + N + c[1] + n + c[2] + " Quelle est la fréquence (en nombre décimal) ?", reponse: f, correction: "$f = \\dfrac{" + n + "}{" + N + "} = " + L(f) + "$." };
      }
      const p = net(f * 100);
      return { enonce: "Dans un collège, " + n + " élèves sur " + N + " mangent à la cantine. Quelle est la fréquence en pourcentage ?", reponse: p, unite: "%",
        correction: "$\\dfrac{" + n + "}{" + N + "} = " + L(f) + "$, soit $" + L(p) + "\\,\\%$." };
    }
  }

  // ---------- Moyenne ----------
  function moyenne(niveau) {
    if (niveau === 3) {
      if (Math.random() < 0.5) {
        for (;;) {
          const t = [ent(-5, 12), ent(-5, 12), ent(-5, 12), ent(-5, 12)], s = somme(t), m = net(s / 4);
          if (!t.some((x) => x < 0) || decimales(m) > 2) continue;
          return { enonce: "Voici les températures relevées à midi pendant quatre jours (en °C) : " + t.map((x) => T(x)).join(" ; ") + ". Calculer la température moyenne.", reponse: m, unite: "°C",
            correction: "Somme : $" + t.map((x, i) => (i && x < 0 ? "(" + L(x) + ")" : L(x))).join(" + ") + " = " + L(s) + "$. Moyenne : $" + L(s) + " \\div 4 = " + L(m) + "$ °C." };
        }
      }
      for (;;) {
        const n = [ent(4, 20), ent(4, 20), ent(4, 20)], m = ent(8, 16), x = 4 * m - somme(n);
        if (x < 0 || x > 20) continue;
        const qui = choix(["Léo", "Inès", "Noah", "Jade"]);
        return { enonce: qui + " a eu " + n.join(" ; ") + " à ses trois premiers contrôles. Quelle note doit-" + (qui === "Inès" || qui === "Jade" ? "elle" : "il") + " avoir au quatrième pour avoir " + m + " de moyenne ?", reponse: x,
          correction: "Il faut une somme de $4 \\times " + m + " = " + 4 * m + "$ points. Il y a déjà $" + somme(n) + "$ points, donc il faut $" + 4 * m + " - " + somme(n) + " = " + x + "$." };
      }
    }
    for (;;) {
      let v;
      if (niveau === 1 && facile(1)) { const a = ent(5, 15); v = [a, a, a]; }
      else { const k = niveau === 1 ? ent(3, 5) : (facile(2) ? 4 : ent(4, 5)); v = Array.from({ length: k }, () => ent(0, 20)); }
      const s = somme(v), m = net(s / v.length);
      if (niveau === 1 ? !Number.isInteger(m) : (Number.isInteger(m) || decimales(m) > 2)) continue;
      return { enonce: "Calculer la moyenne de ces notes : " + v.join(" ; ") + ".", reponse: m,
        correction: "Somme : $" + v.join(" + ") + " = " + s + "$. Moyenne : $" + s + " \\div " + v.length + " = " + L(m) + "$." };
    }
  }

  // ---------- Effectif ----------
  function effectif(niveau) {
    if (niveau === 1) {
      for (;;) {
        const t = facile(1) ? 50 : choix([10, 20, 25, 50]), N = 10 * ent(2, 20), r = N * t / 100;
        if (!Number.isInteger(r)) continue;
        return { enonce: "Dans un groupe de " + N + " personnes, " + t + " % portent des lunettes. Combien de personnes portent des lunettes ?", reponse: r, correction: "$" + N + " \\times \\dfrac{" + t + "}{100} = " + r + "$." };
      }
    }
    if (niveau === 2) {
      for (;;) {
        const f = facile(2) ? 0.5 : ent(1, 19) * 0.05, N = choix([20, 40, 50, 60, 80, 100, 200]), r = net(f * N);
        if (!Number.isInteger(r) || net(f) === 0.5 && !facile(2)) continue;
        return { enonce: "La fréquence d'une valeur est $" + L(net(f)) + "$ dans une série d'effectif total " + N + ". Quel est l'effectif de cette valeur ?", reponse: r, correction: "Effectif $= " + L(net(f)) + " \\times " + N + " = " + r + "$." };
      }
    }
    for (;;) {
      const t = choix([5, 10, 20, 25, 40, 50]), N = ent(20, 600), n = N * t / 100;
      if (!Number.isInteger(n) || n < 2) continue;
      return { enonce: n + " élèves, soit " + t + " % des élèves d'un club, ont moins de 12 ans. Combien le club compte-t-il d'élèves ?", reponse: N,
        correction: "$" + t + "\\,\\%$ correspondent à $" + n + "$ élèves, donc $1\\,\\%$ correspond à $" + n + " \\div " + t + " = " + L(net(n / t)) + "$ et $100\\,\\%$ à $" + L(N) + "$ élèves." };
    }
  }

  Savoirs.enregistrerTechniques("5e", [
    { id: "don-frequence", chap: "don", titre: "Calculer une fréquence", format: "nombre", niveaux: { 1: () => frequence(1), 2: () => frequence(2), 3: () => frequence(3) } },
    { id: "don-moyenne", chap: "don", titre: "Calculer une moyenne", format: "nombre", niveaux: { 1: () => moyenne(1), 2: () => moyenne(2), 3: () => moyenne(3) } },
    { id: "don-effectif", chap: "don", titre: "Retrouver un effectif", format: "nombre", niveaux: { 1: () => effectif(1), 2: () => effectif(2), 3: () => effectif(3) } }
  ]);
})();
