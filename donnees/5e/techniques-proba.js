// Techniques d'entraînement de 5e : « Probabilités » (proba).
// D'après propositions/referentiels/5e/proba.json (lot 8) : les descriptions de niveau sont la spécification.
// format "fraction" : seule la fraction irréductible est acceptée (« Simplifie encore ») ; réponse "n/d".
(function () {
  const { ent, choix, facile, pgcd, F } = Savoirs.calculsOutils;
  function reduite(n, d) { const g = pgcd(n, d) || 1; return n / g + "/" + d / g; }
  const simplif = (n, d) => { const g = pgcd(n, d); return g > 1 ? " = " + (d / g === 1 ? n / g : F(n / g, d / g)) : ""; };
  const COULEURS = [["rouge", "rouges"], ["bleue", "bleues"], ["verte", "vertes"], ["jaune", "jaunes"], ["noire", "noires"]];
  const boules = (n, c) => n + " boule" + (n > 1 ? "s " + c[1] : " " + c[0]);
  const liste = (l) => l.slice(0, -1).join(", ") + " et " + l[l.length - 1];

  // ---------- Urne ----------
  function urne(niveau) {
    for (;;) {
      const cs = Savoirs.melanger(COULEURS.slice()).slice(0, niveau === 1 ? 2 : 3);
      const n = cs.map(() => ent(1, niveau === 1 ? 9 : niveau === 2 ? 8 : 10));
      if (niveau === 1 && facile(1)) n[0] = 1;
      const N = n.reduce((s, x) => s + x, 0);
      if (niveau === 3) {
        const fav = N - n[0];
        return { enonce: "Un sac contient " + liste(cs.map((c, i) => boules(n[i], c))) + ". On tire une boule au hasard. Quelle est la probabilité qu'elle ne soit pas " + cs[0][0] + " ?", reponse: reduite(fav, N),
          correction: "Les boules qui ne sont pas " + cs[0][1] + " : $" + n.slice(1).join(" + ") + " = " + fav + "$ sur $" + N + "$. $P = " + F(fav, N) + simplif(fav, N) + "$." };
      }
      const simple = pgcd(n[0], N) === 1;
      if (niveau === 2 && (facile(2) ? !simple : simple)) continue;
      return { enonce: "Un sac contient " + liste(cs.map((c, i) => boules(n[i], c))) + ". On tire une boule au hasard. Quelle est la probabilité qu'elle soit " + cs[0][0] + " ?" + (niveau === 2 ? " Donner la fraction irréductible." : ""),
        reponse: reduite(n[0], N), correction: "Il y a $" + N + "$ boules en tout, dont $" + n[0] + "$ " + (n[0] > 1 ? cs[0][1] : cs[0][0]) + ". $P = " + F(n[0], N) + simplif(n[0], N) + "$." };
    }
  }

  // ---------- Dé, cartes, roue ----------
  function de(niveau) {
    if (niveau === 1) {
      const k = ent(2, 5), cas = facile(1) ? ["obtenir 6", [6]] : choix([
        ["obtenir " + k, [k]], ["obtenir un nombre différent de " + k, [1, 2, 3, 4, 5, 6].filter((x) => x !== k)], ["obtenir un nombre pair", [2, 4, 6]], ["obtenir un nombre impair", [1, 3, 5]],
        ["obtenir un multiple de 3", [3, 6]], ["obtenir un nombre inférieur ou égal à " + k, [1, 2, 3, 4, 5, 6].filter((x) => x <= k)], ["obtenir un nombre supérieur ou égal à " + k, [1, 2, 3, 4, 5, 6].filter((x) => x >= k)]
      ]);
      const f = cas[1].length;
      return { enonce: "On lance un dé équilibré à 6 faces. Quelle est la probabilité d'" + cas[0] + " ?", reponse: reduite(f, 6),
        correction: "Issues favorables : $" + cas[1].join("$, $") + "$, soit $" + f + "$ sur $6$ : $P = " + F(f, 6) + simplif(f, 6) + "$." };
    }
    if (niveau === 2) {
      const N = facile(2) ? 10 : choix([8, 10, 12, 15, 20, 30]), m = facile(2) ? 2 : choix([2, 3, 4, 5, 10].filter((x) => x < N));
      const mult = []; for (let x = m; x <= N; x += m) mult.push(x);
      return { enonce: "On tire au hasard une carte parmi des cartes numérotées de 1 à " + N + ". Quelle est la probabilité d'obtenir un multiple de " + m + " ?", reponse: reduite(mult.length, N),
        correction: "Multiples de $" + m + "$ : $" + mult.join("$, $") + "$, soit $" + mult.length + "$ cartes sur $" + N + "$ : $P = " + F(mult.length, N) + simplif(mult.length, N) + "$." };
    }
    for (;;) {
      const N = ent(4, 10), r = ent(1, N - 2), b = ent(1, N - r - 1), v = N - r - b;
      const noms = [["rouge", "rouges", r], ["bleu", "bleus", b], ["vert", "verts", v]], c = choix(noms);
      const secteurs = Savoirs.melanger(noms.flatMap(([u, , n]) => Array(n).fill(u)));
      return { enonce: "Une roue est partagée en " + N + " secteurs identiques : " + r + " " + (r > 1 ? "rouges" : "rouge") + ", " + b + " " + (b > 1 ? "bleus" : "bleu") + ", " + v + " " + (v > 1 ? "verts" : "vert") + ". On la fait tourner. Quelle est la probabilité de tomber sur le " + c[0] + " ?",
        schema: Savoirs.schemas.roue({ secteurs: secteurs.map((s) => s.charAt(0).toUpperCase()) }), reponse: reduite(c[2], N),
        correction: "$" + c[2] + "$ secteur" + (c[2] > 1 ? "s " + c[1] : " " + c[0]) + " sur $" + N + "$ : $P = " + F(c[2], N) + simplif(c[2], N) + "$." };
    }
  }

  // ---------- Comparer deux sacs ----------
  function comparer(niveau) {
    for (;;) {
      let ra, na, rb, nb;
      if (niveau === 1) {
        if (facile(1) || Math.random() < 0.5) { na = nb = ent(1, 9); ra = ent(1, 9); rb = ent(1, 9); }
        else { const T = ent(4, 12); ra = ent(1, T - 1); rb = ent(1, T - 1); na = T - ra; nb = T - rb; }
      } else if (niveau === 2) {
        ra = ent(1, 9); na = ent(1, 9); rb = ent(1, 9); nb = ent(1, 9);
        const ta = ra + na, tb = rb + nb;
        if (facile(2) ? ta !== tb : (ta === tb || (ta % tb && tb % ta))) continue;
      } else {
        ra = ent(2, 12); na = ent(2, 12); rb = ent(2, 12); nb = ent(2, 12);
        const ta = ra + na, tb = rb + nb, m = ta * tb / pgcd(ta, tb);
        if (ta % tb === 0 || tb % ta === 0 || m > 40) continue;
      }
      const ta = ra + na, tb = rb + nb;
      if (ra * tb === rb * ta || (niveau < 3 && (na > 9 || nb > 9))) continue;
      const m = ta * tb / pgcd(ta, tb), A = ra * m / ta, B = rb * m / tb, gagnant = A > B ? "sac A" : "sac B";
      const meme = ta === tb ? "" : " Au même dénominateur : $" + F(A, m) + "$ et $" + F(B, m) + "$.";
      return { enonce: "Le sac A contient " + ra + " boule" + (ra > 1 ? "s rouges" : " rouge") + " et " + na + " boule" + (na > 1 ? "s noires" : " noire") + " ; le sac B contient " + rb + " boule" + (rb > 1 ? "s rouges" : " rouge") + " et " + nb + " boule" + (nb > 1 ? "s noires" : " noire") + ". Dans quel sac a-t-on le plus de chances de tirer une boule rouge ?",
        reponse: gagnant, correction: "Sac A : $P = " + F(ra, ta) + "$ ; sac B : $P = " + F(rb, tb) + "$." + meme + " La plus grande probabilité est celle du " + gagnant + "." };
    }
  }

  Savoirs.enregistrerTechniques("5e", [
    { id: "proba5-urne", chap: "proba", titre: "Tirage dans un sac", format: "fraction", niveaux: { 1: () => urne(1), 2: () => urne(2), 3: () => urne(3) } },
    { id: "proba5-de", chap: "proba", titre: "Dés, cartes et roues", format: "fraction", niveaux: { 1: () => de(1), 2: () => de(2), 3: () => de(3) } },
    { id: "proba5-comparer", chap: "proba", titre: "Comparer deux probabilités", format: "choix", options: ["sac A", "sac B"], niveaux: { 1: () => comparer(1), 2: () => comparer(2), 3: () => comparer(3) } }
  ]);
})();
