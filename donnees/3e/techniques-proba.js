// Techniques d'entraînement de 3e : « Probabilités » (proba).
// D'après propositions/referentiels/3e/proba.json (lot 3) : les descriptions de niveau sont la spécification.
// Les tirages sans remise n'apparaissent qu'au niveau 3 (décision de l'enseignant).
// Une probabilité se donne en fraction irréductible (format "fraction"), sauf quand l'exercice précise un autre format.
(function () {
  const { L, T, ent, choix, net, facile, pgcd, decimales } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const red = (n, d) => { const g = pgcd(n, d) || 1; return [n / g, d / g]; };
  const chaine = (n, d) => { const [a, b] = red(n, d); return b === 1 ? String(a) : a + "/" + b; };
  const F = (n, d) => (d === 1 ? String(n) : "\\dfrac{" + n + "}{" + d + "}");
  // \dfrac{n}{d}, suivi de la fraction simplifiée quand elle se simplifie
  const FS = (n, d) => { const [a, b] = red(n, d); return F(n, d) + (a !== n ? " = " + F(a, b) : ""); };
  const QF = " (fraction irréductible)";

  // Couleurs : [singulier, pluriel] (accord féminin : une bille)
  const COULEURS = [["rouge", "rouges"], ["bleue", "bleues"], ["verte", "vertes"], ["jaune", "jaunes"], ["noire", "noires"], ["blanche", "blanches"]];
  const billes = (n, c) => n + " bille" + (n > 1 ? "s " + c[1] : " " + c[0]);

  // ---------- Événements sur des nombres de 1 à n ----------
  const PROPRIETES = [
    { texte: "un nombre pair", ok: (k) => k % 2 === 0 },
    { texte: "un nombre impair", ok: (k) => k % 2 === 1 },
    { texte: "un multiple de 3", ok: (k) => k % 3 === 0 },
    { texte: "un multiple de 4", ok: (k) => k % 4 === 0 },
    { texte: "un nombre premier", ok: (k) => [2, 3, 5, 7, 11, 13, 17, 19].includes(k) },
    { texte: "un carré parfait", ok: (k) => [1, 4, 9, 16].includes(k) }
  ];
  function evenementsNombres(n) {
    const l = PROPRIETES.slice();
    for (let m = 2; m < n; m++) l.push({ texte: "un nombre supérieur ou égal à " + m, ok: (k) => k >= m }, { texte: "un nombre strictement inférieur à " + m, ok: (k) => k < m });
    [12, 24, 30, 36].forEach((m) => l.push({ texte: "un diviseur de " + m, ok: (k) => m % k === 0 }));
    return l.filter((e) => { const f = Array.from({ length: n }, (_, i) => i + 1).filter(e.ok).length; return f >= 2 && f < n; });
  }
  function exNombres(intro, n, e, mot) {
    const fav = Array.from({ length: n }, (_, i) => i + 1).filter(e.ok);
    return {
      enonce: intro + " Quelle est la probabilité d'obtenir " + e.texte + " ?" + QF, reponse: chaine(fav.length, n),
      correction: "Les " + n + " " + mot + " sont équiprobables. " + (mot === "jetons" ? "Jetons" : "Issues") + " favorables : " + fav.join(", ") + ", soit " + fav.length + " " + (mot === "jetons" ? "jetons" : "issues") +
        ". $P = " + FS(fav.length, n) + "$."
    };
  }

  // ---------- Jeu de 32 cartes ----------
  const CARTES = [
    { texte: "un cœur", n: 8, explication: "Il y a 8 cœurs" },
    { texte: "un roi", n: 4, explication: "Il y a 4 rois" },
    { texte: "une figure (valet, dame ou roi)", n: 12, explication: "Il y a 3 figures par couleur, soit $3 \\times 4 = 12$ figures" },
    { texte: "un as ou un roi", n: 8, explication: "Il y a 4 as et 4 rois, soit 8 cartes" },
    { texte: "une carte rouge", n: 16, explication: "Les cœurs et les carreaux sont rouges : $8 + 8 = 16$ cartes" },
    { texte: "une carte noire qui n'est pas une figure", n: 10, explication: "Il y a 16 cartes noires, dont 6 figures : $16 - 6 = 10$ cartes" },
    { texte: "une carte qui n'est ni un cœur ni une figure", n: 15, explication: "Il y a 8 cœurs et 9 figures qui ne sont pas des cœurs : $32 - 8 - 9 = 15$ cartes" },
    { texte: "un pique ou un roi", n: 11, explication: "Il y a 8 piques et 3 rois qui ne sont pas des piques : $8 + 3 = 11$ cartes" }
  ];
  // ---------- Deux dés ----------
  const ISSUES = []; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) ISSUES.push([a, b]);
  const premier = (k) => [2, 3, 5, 7, 11].includes(k);
  const DES = {
    2: [
      { texte: "un double (deux fois le même nombre)", ok: ([a, b]) => a === b },
      { texte: "une somme paire", ok: ([a, b]) => (a + b) % 2 === 0 },
      { texte: "une somme supérieure ou égale à 10", ok: ([a, b]) => a + b >= 10 },
      { texte: "une somme inférieure ou égale à 4", ok: ([a, b]) => a + b <= 4 },
      { texte: "un produit égal à 6", ok: ([a, b]) => a * b === 6 },
      { texte: "au moins un 6", ok: ([a, b]) => a === 6 || b === 6 },
      { texte: "une somme égale à 7 ou à 11", ok: ([a, b]) => a + b === 7 || a + b === 11 },
      { texte: "deux nombres qui diffèrent de 1 (le plus grand moins le plus petit vaut 1)", ok: ([a, b]) => Math.abs(a - b) === 1 }
    ],
    3: [
      { texte: "une somme qui est un nombre premier", ok: ([a, b]) => premier(a + b) },
      { texte: "un produit pair", ok: ([a, b]) => (a * b) % 2 === 0 },
      { texte: "un produit multiple de 3", ok: ([a, b]) => (a * b) % 3 === 0 },
      { texte: "deux nombres qui diffèrent de 2 (le plus grand moins le plus petit vaut 2)", ok: ([a, b]) => Math.abs(a - b) === 2 },
      { texte: "un produit strictement supérieur à 20", ok: ([a, b]) => a * b > 20 },
      { texte: "deux nombres dont le plus grand est 4", ok: ([a, b]) => Math.max(a, b) === 4 },
      { texte: "aucun 6", ok: ([a, b]) => a !== 6 && b !== 6 },
      { texte: "un produit impair", ok: ([a, b]) => (a * b) % 2 === 1 },
      { texte: "une somme multiple de 3", ok: ([a, b]) => (a + b) % 3 === 0 },
      { texte: "une somme qui n'est pas un multiple de 4", ok: ([a, b]) => (a + b) % 4 !== 0 }
    ]
  };
  const introDes = () => choix(["On lance deux dés équilibrés à 6 faces.", "Dans un jeu, on lance deux dés équilibrés à 6 faces.", "Camille lance deux dés équilibrés à 6 faces, un rouge et un bleu."]);

  // ---------- Contextes ----------
  const CONTRAIRES = [
    ["que le bus arrive à l'heure", "qu'il n'arrive pas à l'heure"], ["de gagner à ce jeu", "de ne pas gagner"],
    ["qu'un élève tiré au hasard soit demi-pensionnaire", "qu'il ne soit pas demi-pensionnaire"], ["qu'un composant soit défectueux", "qu'il ne soit pas défectueux"],
    ["de tirer une bille rouge dans ce sac", "de ne pas tirer une bille rouge"], ["qu'il pleuve demain", "qu'il ne pleuve pas demain"]
  ];
  const INCOMPATIBLES = [
    { debut: "Une roue est partagée en secteurs rouges, bleus et verts. On la fait tourner.", a: "rouge", b: "bleu", question: (ni) => "que la roue " + (ni ? "ne s'arrête ni sur le rouge ni sur le bleu" : "s'arrête sur le rouge ou sur le bleu") },
    { debut: "Un sachet contient des bonbons à la fraise, au citron et à la menthe. On prend un bonbon au hasard.", a: "fraise", b: "citron", question: (ni) => (ni ? "que le bonbon ne soit ni à la fraise ni au citron" : "que le bonbon soit à la fraise ou au citron") }
  ];
  const P = (x) => "P(\\text{" + x + "})";

  const proba = [
    {
      id: "proba-equi", chap: "proba", titre: "Probabilité d'un événement", format: "fraction",
      niveaux: {
        1: () => {
          const une = facile(1);
          for (;;) {
            const [c1, c2] = melanger(COULEURS.slice()).slice(0, 2), n1 = une ? 1 : ent(2, 9), n2 = ent(1, 9), N = n1 + n2;
            if (N < 3 || N > 12) continue;
            const ordre = Math.random() < 0.5;
            return {
              enonce: "Un sac contient " + (ordre ? billes(n1, c1) + " et " + billes(n2, c2) : billes(n2, c2) + " et " + billes(n1, c1)) + ". On tire une bille au hasard. Quelle est la probabilité de tirer une bille " + c1[0] + " ?" + QF,
              reponse: chaine(n1, N),
              correction: "Les billes sont indiscernables au toucher : il y a équiprobabilité. $P = \\dfrac{\\text{issues favorables}}{\\text{issues possibles}} = " + FS(n1, N) + "$."
            };
          }
        },
        2: () => {
          const de = Math.random() < 0.3, n = de ? 6 : choix([8, 10, 12]);
          const intro = de ? "On lance un dé équilibré à 6 faces." : "On fait tourner une roue équilibrée partagée en " + n + " secteurs numérotés de 1 à " + n + ".";
          if (facile(2)) { const k = ent(1, n); return { enonce: intro + " Quelle est la probabilité d'obtenir le " + k + " ?" + QF, reponse: "1/" + n, correction: "Les " + n + " issues sont équiprobables et une seule est favorable : $P = " + F(1, n) + "$." }; }
          return exNombres(intro, n, choix(evenementsNombres(n)), "issues");
        },
        3: () => {
          const sorte = ent(1, 3);
          if (sorte === 1) {
            const e = choix(CARTES);
            return {
              enonce: "On tire une carte au hasard dans un jeu de 32 cartes (7, 8, 9, 10, valet, dame, roi et as dans chacune des 4 couleurs : cœur, carreau, pique, trèfle). Quelle est la probabilité de tirer " + e.texte + " ?" + QF,
              reponse: chaine(e.n, 32), correction: "Les 32 cartes sont équiprobables. " + e.explication + ". $P = " + FS(e.n, 32) + "$."
            };
          }
          if (sorte === 2) {
            for (;;) {
              const r = ent(1, 8), b = ent(1, 8), v = ent(1, 8), N = r + b + v;
              if (N < 8 || N > 20) continue;
              const e = choix([["pas rouge", "ne soit pas rouge", N - r, "Billes qui ne sont pas rouges : $" + b + " + " + v + " = " + (N - r) + "$"],
                ["pas bleue", "ne soit pas bleue", N - b, "Billes qui ne sont pas bleues : $" + r + " + " + v + " = " + (N - b) + "$"],
                ["ni rouge ni bleue", "ne soit ni rouge ni bleue", v, "Seules les " + v + " billes vertes conviennent"],
                ["rouge ou bleue", "soit rouge ou bleue", r + b, "Billes rouges ou bleues : $" + r + " + " + b + " = " + (r + b) + "$"]]);
              return {
                enonce: "Un sac contient " + billes(r, COULEURS[0]) + ", " + billes(b, COULEURS[1]) + " et " + billes(v, COULEURS[2]) + ". On tire une bille au hasard. Quelle est la probabilité que la bille " + e[1] + " ?" + QF,
                reponse: chaine(e[2], N), correction: "Il y a " + N + " billes, toutes équiprobables. " + e[3] + ". $P = " + FS(e[2], N) + "$."
              };
            }
          }
          const ev = choix([
            { texte: "un multiple de 3 ou de 5", ok: (k) => k % 3 === 0 || k % 5 === 0 }, { texte: "un multiple de 4 ou de 6", ok: (k) => k % 4 === 0 || k % 6 === 0 },
            { texte: "un nombre premier", ok: (k) => [2, 3, 5, 7, 11, 13, 17, 19].includes(k) }, { texte: "un diviseur de 20", ok: (k) => 20 % k === 0 },
            { texte: "un nombre impair", ok: (k) => k % 2 === 1 }, { texte: "un carré parfait", ok: (k) => [1, 4, 9, 16].includes(k) }
          ]);
          return exNombres("On tire un jeton au hasard dans un sac contenant 20 jetons numérotés de 1 à 20.", 20, ev, "jetons");
        }
      }
    },
    {
      id: "proba-contraire", chap: "proba", titre: "Événement contraire", format: "fraction",
      niveaux: {
        1: () => {
          const [ev, co] = choix(CONTRAIRES), p = facile(1) ? 0.5 : choix([0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9]), r = net(1 - p);
          return { format: "nombre", enonce: "La probabilité " + ev + " est de " + T(p) + ". Quelle est la probabilité " + co + " ?", reponse: r, correction: "La probabilité de l'événement contraire est $1 - P(A) = 1 - " + L(p) + " = " + L(r) + "$." };
        },
        2: () => {
          const [ev, co] = choix(CONTRAIRES), p = facile(2) ? 50 : Math.random() < 0.6 ? 5 * choix([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19]) : (() => { let x; do { x = ent(1, 99); } while (x % 5 === 0); return x; })();
          return {
            format: "nombre", enonce: "La probabilité " + ev + " est de " + p + " %. Quelle est la probabilité " + co + " ? (en pourcentage)", reponse: 100 - p, unite: "%",
            correction: "La probabilité de l'événement contraire est $1 - P(A)$, soit $100\\,\\% - " + p + "\\,\\% = " + (100 - p) + "\\,\\%$."
          };
        },
        3: () => {
          const [ev, co] = choix(CONTRAIRES), d = ent(3, 20);
          let a; do { a = ent(1, d - 1); } while (pgcd(a, d) !== 1);
          return {
            enonce: "La probabilité " + ev + " est de $" + F(a, d) + "$. Quelle est la probabilité " + co + " ?" + QF, reponse: chaine(d - a, d),
            correction: "La probabilité de l'événement contraire est $1 - P(A) = 1 - " + F(a, d) + " = " + F(d, d) + " - " + F(a, d) + " = " + F(d - a, d) + "$."
          };
        }
      }
    },
    // (« Événements incompatibles », P(A ou B) = P(A) + P(B), retiré : pas au programme, décision de l'enseignant.)
    {
      id: "proba-deux-epreuves", chap: "proba", titre: "Deux épreuves successives (avec ou sans remise)", format: "fraction",
      niveaux: (function () {
        const AVEC = " On tire une bille, on note sa couleur, on la remet dans le sac, puis on tire une seconde bille.";
        const SANS = " On tire une bille, on note sa couleur, on ne la remet pas dans le sac, puis on tire une seconde bille.";
        return {
          1: () => {
            const pareil = facile(1);
            for (;;) {
              const r = ent(1, 7), b = pareil ? r : ent(1, 7), N = r + b;
              if (N > 8 || (!pareil && r === b)) continue;
              const ev = choix([["deux billes rouges", r, r], ["deux billes bleues", b, b], ["une bille rouge puis une bille bleue (dans cet ordre)", r, b]]);
              return {
                enonce: "Un sac contient " + billes(r, COULEURS[0]) + " et " + billes(b, COULEURS[1]) + "." + AVEC + " Quelle est la probabilité d'obtenir " + ev[0] + " ?" + QF,
                reponse: chaine(ev[1] * ev[2], N * N),
                correction: "Tirage avec remise : les deux tirages se font dans le même sac. On multiplie les probabilités le long de la branche : $P = " + F(ev[1], N) + " \\times " + F(ev[2], N) + " = " + FS(ev[1] * ev[2], N * N) + "$."
              };
            }
          },
          2: () => {
            const pareil = facile(2);
            for (;;) {
              const r = ent(1, 9), b = pareil ? r : ent(1, 9), N = r + b;
              if (N > 10 || N < 3 || (!pareil && r === b)) continue;
              const meme = Math.random() < 0.5, f = meme ? r * r + b * b : 2 * r * b;
              return {
                enonce: "Un sac contient " + billes(r, COULEURS[0]) + " et " + billes(b, COULEURS[1]) + "." + AVEC + " Quelle est la probabilité d'obtenir deux billes " + (meme ? "de la même couleur" : "de couleurs différentes") + " ?" + QF,
                reponse: chaine(f, N * N),
                correction: "On additionne les deux branches favorables. " + (meme
                  ? "$P(RR) = " + F(r, N) + " \\times " + F(r, N) + "$ et $P(BB) = " + F(b, N) + " \\times " + F(b, N) + "$, soit $P = " + F(r * r, N * N) + " + " + F(b * b, N * N)
                  : "$P(RB) = " + F(r, N) + " \\times " + F(b, N) + "$ et $P(BR) = " + F(b, N) + " \\times " + F(r, N) + "$, soit $P = " + F(r * b, N * N) + " + " + F(r * b, N * N)) + " = " + FS(f, N * N) + "$."
              };
            }
          },
          3: () => {
            const sans = Math.random() < 0.5;
            for (;;) {
              const r = ent(sans ? 2 : 1, 6), b = ent(sans ? 2 : 1, 6), v = ent(sans ? 2 : 1, 6), N = r + b + v;
              if (N < 6 || N > 12) continue;
              const total = sans ? N * (N - 1) : N * N, deux = (c) => (sans ? c * (c - 1) : c * c);
              const memeF = deux(r) + deux(b) + deux(v);
              const sacTexte = "Un sac contient " + billes(r, COULEURS[0]) + ", " + billes(b, COULEURS[1]) + " et " + billes(v, COULEURS[2]) + "." + (sans ? SANS : AVEC);
              const produit = (c) => (sans ? c + " \\times " + (c - 1) : c + "^{2}");
              const totalTexte = sans ? N + " \\times " + (N - 1) : N + "^{2}";
              const cas = choix(sans ? ["meme", "diff", "rouge", "rb"] : ["meme", "diff", "rouge"]);
              const methode = sans ? "Tirage sans remise : pour le second tirage, il reste " + (N - 1) + " billes. " : "Tirage avec remise. ";
              if (cas === "meme" || cas === "diff") {
                const exp = "\\dfrac{" + produit(r) + " + " + produit(b) + " + " + produit(v) + "}{" + totalTexte + "} = " + F(memeF, total);
                return {
                  enonce: sacTexte + " Quelle est la probabilité d'obtenir deux billes " + (cas === "meme" ? "de la même couleur" : "de couleurs différentes") + " ?" + QF,
                  reponse: cas === "meme" ? chaine(memeF, total) : chaine(total - memeF, total),
                  correction: methode + (cas === "meme" ? "On additionne les trois branches « même couleur » : $P = " + exp + (red(memeF, total)[1] !== total ? " = " + F(...red(memeF, total)) : "") + "$."
                    : "L'événement est le contraire de « même couleur ». $P(\\text{même couleur}) = " + exp + "$. Donc $P = 1 - " + F(memeF, total) + " = " + FS(total - memeF, total) + "$.")
                };
              }
              if (cas === "rouge") {
                const aucune = deux(N - r);
                return {
                  enonce: sacTexte + " Quelle est la probabilité d'obtenir au moins une bille rouge ?" + QF, reponse: chaine(total - aucune, total),
                  correction: methode + "« Au moins une rouge » est le contraire de « aucune rouge ». $P(\\text{aucune rouge}) = \\dfrac{" + produit(N - r) + "}{" + totalTexte + "} = " + F(aucune, total) +
                    "$. Donc $P = 1 - " + F(aucune, total) + " = " + FS(total - aucune, total) + "$."
                };
              }
              return {
                enonce: sacTexte + " Quelle est la probabilité d'obtenir une bille rouge puis une bille bleue (dans cet ordre) ?" + QF, reponse: chaine(r * b, total),
                correction: methode + "On multiplie les probabilités le long de la branche : $P = " + F(r, N) + " \\times " + F(b, N - 1) + " = " + FS(r * b, total) + "$."
              };
            }
          }
        };
      })()
    },
    {
      id: "proba-deux-des", chap: "proba", titre: "Lancer deux dés", format: "fraction",
      niveaux: {
        1: () => {
          const s = facile(1) ? choix([2, 12]) : ent(3, 11), fav = ISSUES.filter(([a, b]) => a + b === s);
          return {
            enonce: introDes() + " On additionne les deux nombres obtenus. Quelle est la probabilité d'obtenir une somme égale à " + s + " ?" + QF, reponse: chaine(fav.length, 36),
            correction: "On utilise le tableau des 36 issues équiprobables. Somme " + s + " : " + fav.map(([a, b]) => "(" + a + " ; " + b + ")").join(", ") + ", soit " + fav.length + " issue" + (fav.length > 1 ? "s" : "") + ". $P = " + FS(fav.length, 36) + "$."
          };
        },
        2: () => {
          const e = facile(2) ? choix([{ texte: "deux fois le 6", ok: ([a, b]) => a === 6 && b === 6 }, { texte: "deux fois le 1", ok: ([a, b]) => a === 1 && b === 1 }]) : choix(DES[2]);
          const f = ISSUES.filter(e.ok).length;
          return { enonce: introDes() + " Quelle est la probabilité d'obtenir " + e.texte + " ?" + QF, reponse: chaine(f, 36), correction: "Il y a 36 issues équiprobables (tableau à double entrée). Issues favorables : " + f + ". $P = " + FS(f, 36) + "$." };
        },
        3: () => {
          const e = choix(DES[3]), f = ISSUES.filter(e.ok).length;
          return { enonce: introDes() + " Quelle est la probabilité d'obtenir " + e.texte + " ?" + QF, reponse: chaine(f, 36), correction: "Il y a 36 issues équiprobables. On les dénombre avec un tableau à double entrée : " + f + " issues sont favorables. $P = " + FS(f, 36) + "$." };
        }
      }
    },
    {
      id: "frequence", chap: "proba", titre: "Fréquence et probabilité", format: "nombre",
      niveaux: (function () {
        const EXPERIENCES = [
          { texte: (N, k) => "On lance une pièce de monnaie " + T(N) + " fois et on obtient pile exactement " + k + " fois.", quoi: "de l'obtention de pile" },
          { texte: (N, k) => "On lance un dé " + T(N) + " fois et on obtient un 6 exactement " + k + " fois.", quoi: "de l'obtention de 6" },
          { texte: (N, k) => "On tire " + T(N) + " fois une bille dans un sac, en la remettant à chaque fois, et on obtient une bille rouge " + k + " fois.", quoi: "de l'obtention d'une bille rouge" }
        ];
        return {
          1: () => {
            const cent = facile(1);
            for (;;) {
              const N = cent ? 100 : choix([10, 20, 25, 40, 50, 200]), k = ent(1, N - 1), f = net(k / N), e = choix(EXPERIENCES);
              if (decimales(f) > 2) continue;
              return {
                enonce: e.texte(N, k) + " Quelle est la fréquence " + e.quoi + " ? (nombre décimal)", reponse: f,
                correction: "La fréquence est $\\dfrac{\\text{effectif}}{\\text{nombre d'expériences}} = \\dfrac{" + k + "}{" + L(N) + "} = " + L(f) + "$."
              };
            }
          },
          2: () => {
            const cent = facile(2);
            for (;;) {
              const N = cent ? 100 : choix([40, 80, 200, 250, 400, 500, 1000]), k = ent(1, N - 1), p = net((k / N) * 100), e = choix(EXPERIENCES);
              if (decimales(p) > 1) continue;
              return {
                enonce: e.texte(N, k) + " Quelle est la fréquence " + e.quoi + ", en pourcentage ?", reponse: p, unite: "%",
                correction: "La fréquence est $\\dfrac{" + k + "}{" + L(N) + "} \\times 100\\,\\% = " + L(p) + "\\,\\%$."
              };
            }
          },
          3: () => {
            for (;;) {
              const [a, b] = choix([[1, 2], [1, 6], [1, 4], [3, 10], [15, 100], [1, 5], [5, 8], [7, 20], [3, 8], [2, 5], [1, 3]]), N = choix([200, 400, 500, 800, 1000, 1200, 2000, 2400, 5000]), r = (a * N) / b;
              if (!Number.isInteger(r)) continue;
              const c = choix([
                ["qu'une graine germe", "On sème " + T(N) + " graines.", "Combien de graines peut-on s'attendre à voir germer ?"],
                ["de tirer une bille rouge dans un sac", "On répète " + T(N) + " fois ce tirage, en remettant la bille à chaque fois.", "Combien de billes rouges peut-on s'attendre à obtenir ?"],
                ["de gagner à un jeu", "On joue " + T(N) + " parties.", "Combien de parties peut-on s'attendre à gagner ?"]
              ]);
              return {
                enonce: "La probabilité " + c[0] + " est $" + F(a, b) + "$. " + c[1] + " " + c[2] + " (calculer l'effectif attendu)", reponse: r,
                correction: "Quand le nombre d'expériences est grand, la fréquence se rapproche de la probabilité : effectif attendu $= " + F(a, b) + " \\times " + L(N) + " = " + L(r) + "$."
              };
            }
          }
        };
      })()
    }
  ];

  Savoirs.enregistrerTechniques("3e", proba);
})();
