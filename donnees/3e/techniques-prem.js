// Techniques d'entraînement de 3e : « Nombres premiers et PGCD » (prem).
// D'après propositions/referentiels/3e/prem.json (lot 3) : les descriptions de niveau sont la spécification.
// PGCD : pas d'algorithme d'Euclide ; liste des diviseurs au niveau 1, décompositions en facteurs premiers ensuite.
(function () {
  const { ent, choix, facile, pgcd } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const estPremier = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
  const PREMIERS = Array.from({ length: 300 }, (_, i) => i).filter(estPremier);
  // Décomposition : [[p, e], …]
  function decomposer(n) { const r = []; for (let p = 2; p * p <= n; p++) { let e = 0; while (n % p === 0) { n /= p; e++; } if (e) r.push([p, e]); } if (n > 1) r.push([n, 1]); return r; }
  const nbFacteurs = (n) => decomposer(n).reduce((s, [, e]) => s + e, 0);
  const ecrire = (dec) => dec.map(([p, e]) => (e > 1 ? p + "^{" + e + "}" : String(p))).join(" \\times ");
  // Étapes « au tableau » : 98 = 2 × 49 = 2 × 7 × 7 = 2 × 7²
  function etapes(n) {
    const f = [], m = [];
    let r = n, p = 2;
    while (r > 1) {
      if (p * p > r) { f.push(r); r = 1; }
      else if (r % p === 0) { f.push(p); r /= p; }
      else { p++; continue; }
      const ligne = f.join(" \\times ") + (r > 1 ? " \\times " + r : "");
      if (ligne !== m[m.length - 1]) m.push(ligne);
    }
    const finale = ecrire(decomposer(n));
    return "$" + n + " = " + m.join(" = ") + (m[m.length - 1] !== finale ? " = " + finale : "") + "$";
  }
  const diviseurs = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
  const liste = (l) => (l.length > 1 ? l.slice(0, -1).join(", ") + " et " + l[l.length - 1] : String(l[0]));
  // PGCD par les décompositions : facteurs communs avec le plus petit exposant
  function parDecompositions(a, b) {
    const da = decomposer(a), db = decomposer(b), communs = da.filter(([p]) => db.some(([q]) => q === p)).map(([p, e]) => [p, Math.min(e, db.find(([q]) => q === p)[1])]);
    const g = pgcd(a, b);
    return "On décompose : $" + a + " = " + ecrire(da) + "$ et $" + b + " = " + ecrire(db) + "$. " +
      (communs.length ? "Facteurs premiers communs, avec le plus petit exposant : $" + ecrire(communs) + (communs.length > 1 || communs[0][1] > 1 ? " = " + g : "") + "$. "
        : "Ils n'ont aucun facteur premier commun : ils sont premiers entre eux. ");
  }
  const parDiviseurs = (a, b) => "Diviseurs de $" + a + "$ : " + liste(diviseurs(a)) + ". Diviseurs de $" + b + "$ : " + liste(diviseurs(b)) + ". ";

  // Test de primalité rédigé : on essaie les nombres premiers p tels que p² ≤ n
  function testPremier(n) {
    const essais = PREMIERS.filter((p) => p * p <= n), suivant = PREMIERS.find((p) => p * p > n);
    const diviseur = essais.find((p) => n % p === 0);
    if (diviseur) {
      const raison = diviseur === 2 ? "car il est pair" : diviseur === 3 ? "car la somme de ses chiffres, " + String(n).split("").reduce((s, c) => s + +c, 0) + ", est divisible par 3"
        : diviseur === 5 ? "car il se termine par " + (n % 10) : "";
      return "$" + n + "$ est divisible par $" + diviseur + "$" + (raison ? " " + raison : "") + " : $" + n + " = " + diviseur + " \\times " + n / diviseur + "$. Il a donc un diviseur autre que 1 et lui-même : il n'est pas premier.";
    }
    const tests = essais.map((p) => p === 2 ? "$" + n + "$ est impair" : p === 3 ? "la somme de ses chiffres est " + String(n).split("").reduce((s, c) => s + +c, 0) + ", qui n'est pas divisible par 3"
      : p === 5 ? "il ne se termine ni par 0 ni par 5" : "$" + n + " = " + p + " \\times " + Math.floor(n / p) + " + " + (n % p) + "$ avec un reste non nul");
    return "On teste les nombres premiers dont le carré est inférieur ou égal à $" + n + "$ (car $" + suivant + "^{2} = " + suivant * suivant + " > " + n + "$) : " + liste(essais) + ". Aucun ne divise $" + n + "$ : " + tests.join(" ; ") + ". Donc $" + n + "$ est premier.";
  }
  const FORMULES = [(n) => "Le nombre $" + n + "$ est-il premier ?", (n) => "$" + n + "$ est-il un nombre premier ?", (n) => "Peut-on dire que $" + n + "$ est un nombre premier ?"];

  // Chiffre manquant : nombre (tableau de chiffres) dont la case i est inconnue, divisible par d (3 ou 9)
  function exChiffre(chiffres, i, d, quarante5) {
    const connus = chiffres.filter((_, k) => k !== i), s = connus.reduce((a, b) => a + b, 0);
    let c = 0; while ((s + c) % d !== 0) c++;
    const ecrit = chiffres.map((x, k) => (k === i ? "*" : x)).join(""), complet = chiffres.map((x, k) => (k === i ? c : x)).join("");
    return {
      enonce: "Quel est le plus petit chiffre à écrire à la place de * pour que le nombre $" + ecrit + "$ soit divisible par " + (quarante5 ? 45 : d) + " ?", reponse: c,
      correction: (quarante5 ? "Un nombre est divisible par 45 quand il est divisible par 5 et par 9. Il se termine par " + chiffres[chiffres.length - 1] + " : il est divisible par 5. " : "") +
        "Un nombre est divisible par " + d + " quand la somme de ses chiffres l'est. $" + connus.join(" + ") + " = " + s + "$ ; il faut ajouter à " + s + " le plus petit chiffre qui donne un multiple de " + d + " : c'est $" + c + "$ (" + s + " + " + c + " = " + (s + c) + "). Le nombre " + complet + " convient."
    };
  }
  function tirerChiffre(longueur, d, reponseVoulue, quarante5) {
    for (;;) {
      const ch = [ent(1, 9)].concat(Array.from({ length: longueur - 1 }, () => ent(0, 9)));
      if (quarante5) ch[longueur - 1] = choix([0, 5]);
      const i = ent(1, quarante5 ? longueur - 2 : longueur - 1);
      const ex = exChiffre(ch, i, d, quarante5);
      if (reponseVoulue(ex.reponse)) return ex;
    }
  }

  // Situations de partage
  const PARTAGES = [
    { texte: (a, b) => "Pour un tournoi, " + a + " filles et " + b + " garçons forment des équipes identiques, sans exclure personne, avec le plus grand nombre d'équipes possible. Combien d'équipes y a-t-il ?", mot: "équipes", parPart: (a, b, g) => ["Combien de garçons y a-t-il dans chaque équipe ?", b / g, "garçons"] },
    { texte: (a, b) => "Nadia a " + a + " roses et " + b + " tulipes. Elle veut faire le plus grand nombre possible de bouquets identiques en utilisant toutes les fleurs. Combien de bouquets peut-elle faire ?", mot: "bouquets", parPart: (a, b, g) => ["Combien de roses y a-t-il dans chaque bouquet ?", a / g, "roses"] },
    { texte: (a, b) => "Un confiseur a " + a + " bonbons au citron et " + b + " bonbons à la fraise. Il veut faire le plus grand nombre possible de sachets identiques en utilisant tous les bonbons. Combien de sachets peut-il faire ?", mot: "sachets", parPart: (a, b, g) => ["Combien de bonbons au citron y a-t-il dans chaque sachet ?", a / g, "bonbons au citron"] }
  ];
  function exPartage(a, b, niveau, methode) {
    const g = pgcd(a, b), mur = Math.random() < 0.3;
    const calcul = "On cherche le PGCD de $" + a + "$ et $" + b + "$. " + methode(a, b) + "Le PGCD est $" + g + "$. ";
    if (mur) {
      const [L1, H] = a >= b ? [a, b] : [b, a];
      const debut = "Un mur rectangulaire mesure " + L1 + " cm de long et " + H + " cm de haut. On veut le recouvrir, sans découpe, avec des carreaux carrés tous identiques, de côté le plus grand possible. ";
      if (niveau === 3) return { enonce: debut + "Combien de carreaux met-on sur la hauteur du mur ?", reponse: H / g, correction: calcul + "Carreaux sur la hauteur : $" + H + " \\div " + g + " = " + H / g + "$." };
      return { enonce: debut + "Quelle est la longueur du côté d'un carreau ?", reponse: g, unite: "cm", correction: calcul + "Réponse : des carreaux de $" + g + "$ cm de côté." };
    }
    const s = choix(PARTAGES);
    if (niveau === 3) { const [q, r, u] = s.parPart(a, b, g); return { enonce: s.texte(a, b).replace(/Combien[^?]*\?$/, q), reponse: r, unite: u, correction: calcul + "Il y a " + g + " " + s.mot + ", donc $" + (u.startsWith("garçons") ? b : a) + " \\div " + g + " = " + r + "$ " + u + " par part." }; }
    return { enonce: s.texte(a, b), reponse: g, unite: s.mot, correction: calcul + "Réponse : $" + g + "$ " + s.mot + "." };
  }

  const prem = [
    {
      id: "est-premier", chap: "prem", titre: "Un nombre est-il premier ?", format: "choix", options: ["premier", "composé"],
      niveaux: Object.fromEntries([1, 2, 3].map((niveau) => [niveau, () => {
        let n;
        if (facile(niveau)) n = niveau === 1 ? 2 * ent(5, 24) : 5 * ent(11, 23);
        else if (Math.random() < 0.5) n = choix(PREMIERS.filter((p) => (niveau === 1 ? p >= 11 && p <= 47 : niveau === 2 ? p >= 51 && p <= 119 : p >= 121 && p <= 249)));
        else {
          const composes = [];
          for (let k = niveau === 1 ? 9 : niveau === 2 ? 51 : 121; k <= (niveau === 1 ? 49 : niveau === 2 ? 119 : 249); k += 2) {
            if (estPremier(k)) continue;
            const plusPetit = decomposer(k)[0][0];
            if (niveau === 2 && plusPetit === 5) continue;
            if (niveau === 3 && plusPetit < 7) continue;
            composes.push(k);
          }
          n = choix(composes);
        }
        return { enonce: choix(FORMULES)(n), reponse: estPremier(n) ? "premier" : "composé", correction: testPremier(n) };
      }]))
    },
    {
      id: "chiffre-manquant", chap: "prem", titre: "Chiffre manquant et critères de divisibilité", format: "nombre",
      niveaux: {
        1: () => { const zero = facile(1); return tirerChiffre(ent(3, 4), 3, (r) => (zero ? r === 0 : r > 0)); },
        2: () => { const zero = facile(2); return tirerChiffre(ent(4, 5), 9, (r) => (zero ? r === 0 : r > 0)); },
        3: () => { const q = Math.random() < 1 / 3; return tirerChiffre(ent(6, 7), 9, (r) => r >= 1 && r <= 8, q); }
      }
    },
    {
      id: "facteur-premier", chap: "prem", titre: "Le plus grand facteur premier", format: "nombre",
      niveaux: (function () {
        const ex = (n) => {
          const p = decomposer(n).slice(-1)[0][0];
          return {
            enonce: choix([(k) => "Dans la décomposition de $" + k + "$ en produit de facteurs premiers, quel est le plus grand facteur premier ?", (k) => "Quel est le plus grand facteur premier de $" + k + "$ ?"])(n),
            reponse: p, correction: "On décompose : " + etapes(n) + ". Le plus grand facteur premier de $" + n + "$ est $" + p + "$."
          };
        };
        return {
          1: () => { if (facile(1)) return ex(choix([16, 32, 64, 128])); for (;;) { const n = ent(20, 100); if (estPremier(n) || (n & (n - 1)) === 0) continue; return ex(n); } },
          2: () => { if (facile(2)) return ex(choix([128, 256])); for (;;) { const n = ent(101, 500); if (estPremier(n) || (n & (n - 1)) === 0 || decomposer(n).slice(-1)[0][0] < 5) continue; return ex(n); } },
          3: () => { for (;;) { const n = ent(501, 2000); if (nbFacteurs(n) < 3 || decomposer(n).slice(-1)[0][0] < 17) continue; return ex(n); } }
        };
      })()
    },
    {
      id: "exposant", chap: "prem", titre: "Exposant dans une décomposition", format: "nombre",
      niveaux: (function () {
        const ex = (n, p) => {
          const e = (decomposer(n).find(([q]) => q === p) || [p, 0])[1];
          return {
            enonce: choix([(k) => "Dans la décomposition de $" + k + "$ en produit de facteurs premiers, quel est l'exposant de $" + p + "$ ?", (k) => "$" + k + "$ est décomposé en produit de facteurs premiers. Quel est l'exposant de $" + p + "$ dans cette décomposition ?"])(n),
            reponse: e, correction: "On décompose : " + etapes(n) + ". L'exposant de $" + p + "$ est $" + e + "$."
          };
        };
        // Nombre fait de facteurs premiers choisis, exposants de 1 à eMax, entre min et max
        function tirer(premiers, k, eMax, min, max) {
          for (;;) {
            const ps = melanger(premiers.slice()).slice(0, k), es = ps.map(() => ent(1, eMax)), n = ps.reduce((s, p, i) => s * Math.pow(p, es[i]), 1);
            if (n >= min && n <= max) return ex(n, choix(ps));
          }
        }
        return {
          1: () => (facile(1) ? tirer([2, 3, 5], 1, 7, 24, 200) : (() => { const paire = choix([[2, 3], [2, 5], [3, 5]]); return tirer(paire, 2, 4, 24, 200); })()),
          2: () => (facile(2) ? tirer([2, 3, 5, 7], 1, 10, 12, 3000) : tirer([2, 3, 5, 7], ent(2, 3), 4, 12, 3000)),
          3: () => tirer([2, 3, 5, 7, 11, 13], 3, 6, 1000, 20000)
        };
      })()
    },
    {
      id: "pgcd", chap: "prem", titre: "Calculer un PGCD", format: "nombre",
      niveaux: {
        1: () => {
          const multiple = facile(1);
          for (;;) {
            let a = ent(12, 60), b = multiple ? a * ent(2, 5) : ent(12, 60);
            if (multiple) { a = ent(12, 30); b = a * ent(2, 5); if (b > 60) continue; }
            else if (a === b || a % b === 0 || b % a === 0 || pgcd(a, b) < 2) continue;
            const g = pgcd(a, b);
            return { enonce: "Calculer le PGCD de $" + a + "$ et $" + b + "$.", reponse: g, correction: parDiviseurs(a, b) + "Le plus grand diviseur commun est $" + g + "$ : le PGCD de $" + a + "$ et $" + b + "$ est $" + g + "$." };
          }
        },
        2: () => {
          const multiple = facile(2);
          for (;;) {
            const a = ent(40, 400), b = multiple ? a * ent(2, 4) : ent(40, 400);
            if (b > 400 || a === b || nbFacteurs(a) < 3 || nbFacteurs(b) < 3 || pgcd(a, b) < 2) continue;
            if (!multiple && (a % b === 0 || b % a === 0)) continue;
            const g = pgcd(a, b);
            return { enonce: choix(["Calculer", "Déterminer"]) + " le PGCD de $" + a + "$ et $" + b + "$.", reponse: g, correction: parDecompositions(a, b) + "Le PGCD de $" + a + "$ et $" + b + "$ est $" + g + "$." };
          }
        },
        3: () => {
          const premiersEntreEux = Math.random() < 0.1;
          for (;;) {
            const a = ent(300, 3000), b = ent(300, 3000), g = pgcd(a, b);
            if (a === b || nbFacteurs(a) < 4 || nbFacteurs(b) < 4 || (premiersEntreEux ? g !== 1 : g < 6)) continue;
            return { enonce: "Calculer le PGCD de $" + a + "$ et $" + b + "$.", reponse: g, correction: parDecompositions(a, b) + "Le PGCD de $" + a + "$ et $" + b + "$ est $" + g + "$." };
          }
        }
      }
    },
    {
      id: "fraction-irred", chap: "prem", titre: "Rendre une fraction irréductible", format: "fraction",
      niveaux: (function () {
        function ex(a, b, methode) {
          const g = pgcd(a, b), r = b / g === 1 ? String(a / g) : a / g + "/" + b / g;
          return {
            enonce: choix([(x, y) => "Écrire la fraction $\\dfrac{" + x + "}{" + y + "}$ sous forme irréductible.", (x, y) => "Rendre irréductible la fraction $\\dfrac{" + x + "}{" + y + "}$."])(a, b),
            reponse: r, correction: methode(a, b) + "Le PGCD de $" + a + "$ et $" + b + "$ est $" + g + "$. Donc $\\dfrac{" + a + "}{" + b + "} = \\dfrac{" + a + " \\div " + g + "}{" + b + " \\div " + g + "} = " + (b / g === 1 ? a / g : "\\dfrac{" + a / g + "}{" + b / g + "}") + "$."
          };
        }
        // Fraction p×g / q×g avec p/q irréductible et pgcd voulu
        function tirer(gChoix, max, methode) {
          for (;;) {
            const g = gChoix(), p = ent(1, Math.floor(max / g)), q = ent(2, Math.floor(max / g));
            if (p === q || pgcd(p, q) !== 1) continue;
            return ex(p * g, q * g, methode);
          }
        }
        return {
          1: () => { const deux = facile(1); for (;;) { const ex1 = tirer(() => (deux ? 2 : ent(3, 9)), 60, parDiviseurs); const [a, b] = ex1.enonce.match(/\{(\d+)\}\{(\d+)\}/).slice(1).map(Number); if (a >= 6 && b >= 6) return ex1; } },
          2: () => tirer(() => (facile(2) ? 10 : (() => { let g; do { g = ent(7, 30); } while (g % 10 === 0); return g; })()), 400, parDecompositions),
          3: () => tirer(() => ent(12, 60), 3000, parDecompositions)
        };
      })()
    },
    {
      id: "pgcd-situation", chap: "prem", titre: "Problèmes de partage et PGCD", format: "nombre",
      niveaux: {
        1: () => {
          const multiple = facile(1);
          for (;;) {
            const a = ent(20, 100), b = multiple ? a * ent(2, 4) : ent(20, 100);
            if (b > 200 || a === b || pgcd(a, b) < 2 || (!multiple && (a % b === 0 || b % a === 0))) continue;
            return exPartage(a, b, 1, parDiviseurs);
          }
        },
        2: () => {
          const multiple = facile(2);
          for (;;) {
            const a = ent(60, 400), b = multiple ? a * ent(2, 4) : ent(60, 400);
            if (b > 480 || a === b || nbFacteurs(a) < 3 || nbFacteurs(b) < 3 || pgcd(a, b) < 2 || (!multiple && (a % b === 0 || b % a === 0))) continue;
            return exPartage(a, b, 2, parDecompositions);
          }
        },
        3: () => {
          for (;;) {
            const a = ent(300, 900), b = ent(300, 900);
            if (a === b || nbFacteurs(a) < 4 || nbFacteurs(b) < 4 || pgcd(a, b) < 6) continue;
            return exPartage(a, b, 3, parDecompositions);
          }
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("3e", prem);
})();
