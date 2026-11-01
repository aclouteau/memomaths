// Techniques d'entraînement de 4e : « Probabilités » (proba).
// D'après propositions/referentiels/4e/proba.json (lot 6) : les descriptions de niveau sont la spécification.
// Réponses en fraction irréductible (l'application dit « Simplifie encore » sans compter d'erreur).
(function () {
  const { L, T, ent, choix, net, facile, pgcd } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const COULEURS = [["noire", "noires"], ["blanche", "blanches"], ["rouge", "rouges"], ["verte", "vertes"], ["bleue", "bleues"], ["jaune", "jaunes"]];
  const boules = (n, c) => n + " boule" + (n > 1 ? "s " + c[1] : " " + c[0]);
  const fr = (n, d) => { const g = pgcd(n, d); return n / g + "/" + d / g; };
  // Fraction, puis sa forme simplifiée si elle existe : \dfrac{12}{22} = \dfrac{6}{11}
  const frTex = (n, d) => { const g = pgcd(n, d); return "\\dfrac{" + n + "}{" + d + "}" + (g > 1 ? (d / g === 1 ? " = " + n / g : " = \\dfrac{" + n / g + "}{" + d / g + "}") : ""); };
  const liste = (l) => l.join(", ");
  const tirage = "On tire une boule au hasard. ";

  // ---------- Urne ----------
  function urne(niveau) {
    const [c1, c2, c3] = melanger(COULEURS.slice());
    if (niveau === 1) {
      let r, o; do { r = facile(1) ? 1 : ent(2, 9); o = ent(1, 9); } while (pgcd(r, r + o) !== 1);
      return { enonce: "Un sac contient " + boules(r, c1) + " et " + boules(o, c2) + ". " + tirage + "Quelle est la probabilité de tirer une boule " + c1[0] + " ?", reponse: fr(r, r + o),
        correction: "Il y a $" + r + " + " + o + " = " + (r + o) + "$ boules au total, dont " + r + " favorable" + (r > 1 ? "s" : "") + ". $P = " + frTex(r, r + o) + "$." };
    }
    if (niveau === 2) {
      const a = facile(2) ? 1 : ent(1, 8), b = ent(1, 8), c = ent(1, 8), n = a + b + c, deux = !facile(2) && Math.random() < 0.4;
      const debut = "Un sac contient " + boules(a, c1) + ", " + boules(b, c2) + " et " + boules(c, c3) + ". " + tirage;
      if (deux) return { enonce: debut + "Quelle est la probabilité de tirer une boule " + c1[0] + " ou " + c2[0] + " ?", reponse: fr(a + b, n),
        correction: "Il y a $" + a + " + " + b + " + " + c + " = " + n + "$ boules, dont $" + a + " + " + b + " = " + (a + b) + "$ favorables. $P = " + frTex(a + b, n) + "$." };
      return { enonce: debut + "Quelle est la probabilité de tirer une boule " + c1[0] + " ?", reponse: fr(a, n),
        correction: "Il y a $" + a + " + " + b + " + " + c + " = " + n + "$ boules, dont " + a + " favorable" + (a > 1 ? "s" : "") + ". $P = " + frTex(a, n) + "$." };
    }
    const a = ent(2, 12), b = ent(2, 12), c = ent(2, 12), n = a + b + c, type = choix(["contraire", "ni", "ajout"]);
    const debut = "Un sac contient " + boules(a, c1) + ", " + boules(b, c2) + " et " + boules(c, c3) + ". ";
    if (type === "contraire") return { enonce: debut + tirage + "Quelle est la probabilité de ne pas tirer une boule " + c1[0] + " ?", reponse: fr(b + c, n),
      correction: "Il y a $" + a + " + " + b + " + " + c + " = " + n + "$ boules, dont $" + b + " + " + c + " = " + (b + c) + "$ ne sont pas " + c1[1] + ". $P = " + frTex(b + c, n) + "$." };
    if (type === "ni") return { enonce: debut + tirage + "Quelle est la probabilité de ne tirer ni une boule " + c1[0] + " ni une boule " + c2[0] + " ?", reponse: fr(c, n),
      correction: "Il y a $" + n + "$ boules ; seules les " + c + " boules " + c3[1] + " ne sont ni " + c1[1] + " ni " + c2[1] + ". $P = " + frTex(c, n) + "$." };
    const k = ent(1, 6), n2 = n + k;
    return { enonce: debut + "On ajoute " + boules(k, c1) + " dans le sac, puis on tire une boule au hasard. Quelle est la probabilité de tirer une boule " + c1[0] + " ?", reponse: fr(a + k, n2),
      correction: "Après l'ajout, il y a $" + a + " + " + k + " = " + (a + k) + "$ boules " + c1[1] + " sur $" + n + " + " + k + " = " + n2 + "$ boules. $P = " + frTex(a + k, n2) + "$." };
  }

  // ---------- Dé ou cartes ----------
  const multiples = (N, k) => Array.from({ length: N }, (_, i) => i + 1).filter((x) => x % k === 0);
  const PREMIERS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
  function de(niveau) {
    if (niveau === 1) {
      const N = facile(1) ? 6 : choix([6, 8, 10, 12, 20]), k = ent(1, N);
      return { enonce: "On lance un dé équilibré à " + N + " faces numérotées de 1 à " + N + ". Quelle est la probabilité d'obtenir le nombre " + k + " ?", reponse: "1/" + N,
        correction: "Une seule face sur $" + N + "$ porte le nombre " + k + ". $P = \\dfrac{1}{" + N + "}$." };
    }
    if (niveau === 2) {
      const N = facile(2) ? 6 : choix([6, 8, 10, 12, 20]), type = facile(2) ? "pair" : choix(["pair", "mult", "sup"]);
      let fav, quoi;
      if (type === "pair") { fav = multiples(N, 2); quoi = "un nombre pair"; }
      else if (type === "mult") { const k = choix([3, 4, 5].filter((x) => x < N)); fav = multiples(N, k); quoi = "un multiple de " + k; }
      else { const k = ent(2, N - 2); fav = Array.from({ length: N - k }, (_, i) => k + 1 + i); quoi = "un nombre strictement supérieur à " + k; }
      return { enonce: "On lance un dé équilibré à " + N + " faces numérotées de 1 à " + N + ". Quelle est la probabilité d'obtenir " + quoi + " ?", reponse: fr(fav.length, N),
        correction: "Les issues favorables sont " + liste(fav) + " : $" + fav.length + "$ issue" + (fav.length > 1 ? "s" : "") + " sur $" + N + "$. $P = " + frTex(fav.length, N) + "$." };
    }
    const N = choix([10, 12, 20, 30]), tout = Array.from({ length: N }, (_, i) => i + 1), type = choix(["premier", "ni", "non"]);
    let fav, quoi;
    if (type === "premier") { fav = PREMIERS.filter((p) => p <= N); quoi = "un nombre premier"; }
    else if (type === "ni") { const [k, l] = choix([[2, 3], [2, 5], [3, 5]]); fav = tout.filter((x) => x % k && x % l); quoi = "un nombre qui n'est ni un multiple de " + k + " ni un multiple de " + l; }
    else { const k = choix([2, 3, 5]); fav = tout.filter((x) => x % k); quoi = "un nombre qui n'est pas un multiple de " + k; }
    return { enonce: "On tire au hasard une carte numérotée de 1 à " + N + ". Quelle est la probabilité d'obtenir " + quoi + " ?", reponse: fr(fav.length, N),
      correction: "Les issues favorables sont " + liste(fav) + " : $" + fav.length + "$ issues sur $" + N + "$. $P = " + frTex(fav.length, N) + "$." };
  }

  // ---------- Événement contraire ----------
  function contraire(niveau) {
    if (niveau === 1) {
      let q, a; if (facile(1)) { q = 10; a = ent(1, 9); } else { q = choix([4, 5, 8, 10, 20, 25, 50, 100]); a = ent(1, q - 1); }
      const p = net(a / q), r = net(1 - p);
      return { enonce: "La probabilité d'un événement $A$ est " + T(p) + ". Quelle est la probabilité de l'événement contraire de $A$ ?", format: "nombre", reponse: r,
        correction: "$P(\\text{non } A) = 1 - P(A) = 1 - " + L(p) + " = " + L(r) + "$." };
    }
    if (niveau === 2) {
      let q, p; if (facile(2)) { q = 4; p = choix([1, 3]); } else do { q = ent(3, 15); p = ent(1, q - 1); } while (pgcd(p, q) !== 1);
      return { enonce: "La probabilité d'un événement $A$ est $\\dfrac{" + p + "}{" + q + "}$. Quelle est la probabilité de l'événement contraire de $A$ ?", reponse: fr(q - p, q),
        correction: "$P(\\text{non } A) = 1 - \\dfrac{" + p + "}{" + q + "} = \\dfrac{" + q + "}{" + q + "} - \\dfrac{" + p + "}{" + q + "} = \\dfrac{" + (q - p) + "}{" + q + "}$." };
    }
    const type = choix(["pourcent", "ni", "urne"]);
    if (type === "pourcent") { const p = ent(8, 85); return { enonce: "La probabilité d'un événement $A$ est $" + p + "\\,\\%$. Quelle est la probabilité de l'événement contraire, en pourcentage ?", format: "nombre", reponse: 100 - p, unite: "%",
      correction: "$P(\\text{non } A) = 100\\,\\% - " + p + "\\,\\% = " + (100 - p) + "\\,\\%$." }; }
    if (type === "ni") {
      const q = choix([8, 12, 20, 24]); let a, b; do { a = ent(1, q - 2); b = ent(1, q - 2); } while (a + b >= q);
      return { enonce: "Dans une expérience, l'événement $A$ a pour probabilité $\\dfrac{" + a + "}{" + q + "}$ et l'événement $B$ (incompatible avec $A$) a pour probabilité $\\dfrac{" + b + "}{" + q + "}$. Quelle est la probabilité de l'événement « ni $A$ ni $B$ » ?",
        reponse: fr(q - a - b, q), correction: "$P(A \\text{ ou } B) = \\dfrac{" + a + "}{" + q + "} + \\dfrac{" + b + "}{" + q + "} = \\dfrac{" + (a + b) + "}{" + q + "}$ donc $P(\\text{ni } A \\text{ ni } B) = 1 - \\dfrac{" + (a + b) + "}{" + q + "} = " + frTex(q - a - b, q) + "$." };
    }
    const n = ent(20, 50), r = ent(3, n - 3);
    return { enonce: "Une urne contient " + n + " boules dont " + r + " sont rouges. On tire une boule au hasard. Quelle est la probabilité de ne pas tirer de boule rouge ?", reponse: fr(n - r, n),
      correction: "$P(\\text{rouge}) = \\dfrac{" + r + "}{" + n + "}$, donc $P(\\text{non rouge}) = 1 - \\dfrac{" + r + "}{" + n + "} = " + frTex(n - r, n) + "$." };
  }

  // ---------- Fréquence ----------
  // [expériences, événement, verbe, « de » + événement (élision), question « combien de fois … ? »]
  const EXPERIENCES = [["lancers d'une pièce", "« pile »", "sort", "de « pile »", "« pile » est-il sorti"], ["lancers d'un dé", "« six »", "sort", "de « six »", "« six » est-il sorti"],
    ["tirages", "une boule rouge", "sort", "d'une boule rouge", "une boule rouge est-elle sortie"], ["lancers d'une punaise", "« pointe en haut »", "apparaît", "de « pointe en haut »", "« pointe en haut » est-il apparu"]];
  function frequence(niveau) {
    const [exp, ev, verbe, deEv, combien] = choix(EXPERIENCES);
    const proba = ev === "« six »" ? 1 / 6 : ev === "« pile »" ? 0.5 : 0.35;
    const vraisemblable = (n) => Math.max(1, Math.min(n - 1, Math.round(n * proba * (0.7 + Math.random() * 0.6))));
    if (niveau < 3) {
      const n = niveau === 1 ? (facile(1) ? 100 : choix([10, 20, 25, 50, 100])) : (facile(2) ? 1000 : choix([40, 50, 200, 250, 400, 500]));
      let k; do { k = vraisemblable(n); } while (niveau === 2 && n !== 1000 && Math.abs(k / n * 100 - Math.round(k / n * 100)) > 1e-9);
      const f = net(k / n);
      return { enonce: "Sur " + T(n) + " " + exp + ", " + ev + " " + verbe + " " + k + " fois. Quelle est la fréquence " + deEv + " (en nombre décimal) ?", reponse: f,
        correction: "$f = \\dfrac{" + k + "}{" + L(n) + "} = " + L(f) + "$." };
    }
    const type = choix(["pourcent", "occurrences", "reunies"]);
    if (type === "pourcent") {
      const n = choix([20, 25, 50, 200, 500]), k = vraisemblable(n), f = net(k / n * 100);
      return { enonce: "Sur " + n + " " + exp + ", " + ev + " " + verbe + " " + k + " fois. Quelle est la fréquence " + deEv + " en pourcentage ?", reponse: f, unite: "%",
        correction: "$f = \\dfrac{" + k + "}{" + n + "} = " + L(net(k / n)) + "$, soit $" + L(f) + "\\,\\%$." };
    }
    if (type === "occurrences") {
      let n, p, k; do { n = choix([50, 100, 200, 400, 500]); p = choix([10, 15, 20, 25, 30, 40, 45, 60]); k = n * p / 100; } while (!Number.isInteger(k)); // un nombre de fois est entier
      return { enonce: "On a fait " + n + " " + exp + ". La fréquence " + deEv + " est de $" + p + "\\,\\%$. Combien de fois " + combien + " ?", reponse: k, unite: "fois",
        correction: "$" + p + "\\,\\%$ de $" + n + "$ : $\\dfrac{" + p + "}{100} \\times " + n + " = " + k + "$ fois." };
    }
    let n1, n2, k1, k2, f;
    do { n1 = choix([50, 100, 150]); n2 = choix([50, 100, 200, 250]); k1 = vraisemblable(n1); k2 = vraisemblable(n2); f = (k1 + k2) / (n1 + n2); } while (Math.abs(f * 1000 - Math.round(f * 1000)) > 1e-9);
    return { enonce: "Dans une première série de " + n1 + " " + exp + ", " + ev + " " + verbe + " " + k1 + " fois ; dans une seconde série de " + n2 + " " + exp + ", " + ev + " " + verbe + " " + k2 + " fois. Quelle est la fréquence " + deEv + " sur l'ensemble des deux séries (en nombre décimal) ?",
      reponse: net(f), correction: "Sur l'ensemble : $" + k1 + " + " + k2 + " = " + (k1 + k2) + "$ fois " + ev + " pour $" + n1 + " + " + n2 + " = " + (n1 + n2) + "$ " + exp + ". $f = \\dfrac{" + (k1 + k2) + "}{" + (n1 + n2) + "} = " + L(net(f)) + "$." };
  }

  const proba = [
    { id: "proba-urne", chap: "proba", titre: "Probabilité dans une urne", format: "fraction", niveaux: { 1: () => urne(1), 2: () => urne(2), 3: () => urne(3) } },
    { id: "proba-de", chap: "proba", titre: "Probabilité avec un dé ou des cartes", format: "fraction", niveaux: { 1: () => de(1), 2: () => de(2), 3: () => de(3) } },
    { id: "proba-contraire", chap: "proba", titre: "Événement contraire", format: "fraction", niveaux: { 1: () => contraire(1), 2: () => contraire(2), 3: () => contraire(3) } },
    { id: "proba-frequence", chap: "proba", titre: "Fréquence d'un événement", format: "nombre", niveaux: { 1: () => frequence(1), 2: () => frequence(2), 3: () => frequence(3) } }
  ];

  Savoirs.enregistrerTechniques("4e", proba);
})();
