// Techniques d'entraînement de 5e : « Divisibilité » (div).
// D'après propositions/referentiels/5e/div.json (lot 5) : les descriptions de niveau sont la spécification.
// Critères de divisibilité : seulement par 2, 3, 5, 9 et 10 (programme de 5e).
(function () {
  const { L, ent, choix, facile } = Savoirs.calculsOutils;
  const chiffres = (n) => String(n).split("").map(Number);
  const somme = (n) => chiffres(n).reduce((a, b) => a + b, 0);
  const diviseurs = (n) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);
  const estPremier = (n) => n > 1 && diviseurs(n).length === 2;
  // Égalité de la division euclidienne, avec la vérification par l'encadrement
  function euclide(a, b) {
    const q = Math.floor(a / b), r = a % b;
    return { q: q, r: r, texte: "$" + L(b) + " \\times " + q + " = " + L(b * q) + "$ et $" + L(b) + " \\times " + (q + 1) + " = " + L(b * (q + 1)) + "$ dépasse $" + L(a) + "$. Donc $" + L(a) + " = " + L(b) + " \\times " + q + " + " + r + "$ avec $" + r + " < " + L(b) + "$." };
  }
  function divEuclidienne(a, b, quotient) {
    const e = euclide(a, b);
    return quotient
      ? { enonce: choix(["On effectue la division euclidienne de $" + L(a) + "$ par $" + b + "$. Donner le quotient.", "Dans la division euclidienne de $" + L(a) + "$ par $" + b + "$, quel est le quotient ?"]), reponse: e.q, correction: e.texte + " Le quotient est $" + e.q + "$." }
      : { enonce: choix(["On effectue la division euclidienne de $" + L(a) + "$ par $" + b + "$. Donner le reste.", "Dans la division euclidienne de $" + L(a) + "$ par $" + b + "$, quel est le reste ?"]), reponse: e.r, correction: e.texte + " Le reste est $" + e.r + "$." };
  }
  // n est-il multiple / diviseur / divisible ? Une fois sur deux, la réponse est « oui »
  function multipleDiviseur(min, max, b, formulations) {
    const oui = Math.random() < 0.5;
    let n;
    do { n = oui ? b * ent(Math.ceil(min / b), Math.floor(max / b)) : ent(min, max); } while (!oui && n % b === 0);
    const f = choix(formulations);
    const enonce = f === "multiple" ? "Le nombre $" + n + "$ est-il un multiple de $" + b + "$ ?" : f === "diviseur" ? "Le nombre $" + b + "$ est-il un diviseur de $" + n + "$ ?" : "Le nombre $" + n + "$ est-il divisible par $" + b + "$ ?";
    const q = Math.floor(n / b), r = n % b;
    return { enonce: enonce, reponse: oui ? "oui" : "non", correction: oui ? "$" + n + " = " + b + " \\times " + q + "$ : le reste est nul, $" + n + "$ est divisible par $" + b + "$. Oui." : "$" + n + " = " + b + " \\times " + q + " + " + r + "$ avec un reste $" + r + "$ non nul : $" + n + "$ n'est pas divisible par $" + b + "$. Non." };
  }
  function critere(n, d) {
    const ok = n % d === 0, u = n % 10, oui = ok ? " : oui." : " : non.";
    if (d === 2) return { ok: ok, texte: "Un nombre est divisible par $2$ quand son dernier chiffre est pair (0, 2, 4, 6 ou 8). Le dernier chiffre de $" + n + "$ est $" + u + "$" + oui };
    if (d === 5) return { ok: ok, texte: "Un nombre est divisible par $5$ quand son dernier chiffre est $0$ ou $5$. Le dernier chiffre de $" + n + "$ est $" + u + "$" + oui };
    if (d === 10) return { ok: ok, texte: "Un nombre est divisible par $10$ quand son dernier chiffre est $0$. Le dernier chiffre de $" + n + "$ est $" + u + "$" + oui };
    const s = somme(n);
    return { ok: ok, texte: "Somme des chiffres : $" + chiffres(n).join(" + ") + " = " + s + "$. Comme $" + s + "$ " + (ok ? "est" : "n'est pas") + " divisible par $" + d + "$, le nombre $" + n + "$ " + (ok ? "est" : "n'est pas") + " divisible par $" + d + "$." };
  }
  function exCritere(min, max, d, tirer) {
    const oui = Math.random() < 0.5;
    let n;
    do { n = tirer ? tirer() : ent(min, max); } while ((n % d === 0) !== oui && !tirer);
    const c = critere(n, d);
    return { enonce: "Le nombre $" + n + "$ est-il divisible par $" + d + "$ ?", reponse: c.ok ? "oui" : "non", correction: c.texte };
  }
  // Nombre dont un chiffre est remplacé par □ ; renvoie aussi la somme des chiffres connus
  function avecTrou(n, place) {
    const c = String(n).split("");
    const connus = c.filter((_, i) => i !== place).map(Number);
    c[place] = "\\square";
    return { latex: c.join(""), connus: connus, s: connus.reduce((a, b) => a + b, 0) };
  }
  function chiffreManquant(nbChiffres, d, plusGrand) {
    for (;;) {
      const n = ent(Math.pow(10, nbChiffres - 1), Math.pow(10, nbChiffres) - 1), place = ent(0, nbChiffres - 1), t = avecTrou(n, place);
      const possibles = Array.from({ length: 10 }, (_, i) => i).filter((x) => !(place === 0 && x === 0) && (t.s + x) % d === 0);
      if (!possibles.length) continue;
      const rep = plusGrand ? possibles[possibles.length - 1] : possibles[0];
      return {
        enonce: "Quel est le plus " + (plusGrand ? "grand" : "petit") + " chiffre qui peut remplacer $\\square$ pour que le nombre $" + t.latex + "$ soit divisible par $" + d + "$ ?", reponse: rep,
        correction: "Un nombre est divisible par $" + d + "$ quand la somme de ses chiffres est un multiple de $" + d + "$. La somme des chiffres connus est $" + t.connus.join(" + ") + " = " + t.s + "$. Les chiffres qui conviennent sont " + possibles.map((x) => "$" + x + "$").join(", ") + " (somme " + possibles.map((x) => "$" + (t.s + x) + "$").join(", ") + ")" + (place === 0 ? ", sans compter $0$ qui ne peut pas commencer un nombre" : "") + ". Le plus " + (plusGrand ? "grand" : "petit") + " est $" + rep + "$."
      };
    }
  }
  function nbDiviseurs(n, impairs) {
    const l = diviseurs(n).filter((d) => !impairs || d % 2);
    const enonce = impairs ? "Combien le nombre $" + n + "$ a-t-il de diviseurs impairs ?" : choix(["Combien de diviseurs possède le nombre $" + n + "$ ?", "Combien le nombre $" + n + "$ a-t-il de diviseurs ?", "Combien y a-t-il de diviseurs de $" + n + "$ ?"]);
    return { enonce: enonce, reponse: l.length, correction: "Les diviseurs " + (impairs ? "impairs " : "") + "de $" + n + "$ sont " + l.join(", ") + " : il y en a $" + l.length + "$." };
  }

  const div = [
    {
      id: "div-euclidienne", chap: "div", titre: "Division euclidienne", format: "nombre",
      niveaux: {
        1: () => (facile(1) ? divEuclidienne(ent(25, 199), 10, false) : divEuclidienne(ent(25, 199), ent(2, 9), Math.random() < 0.5)),
        2: () => {
          const b = ent(11, 30);
          if (facile(2)) return divEuclidienne(b * ent(Math.ceil(120 / b), Math.floor(999 / b)), b, Math.random() < 0.5);
          let a; do { a = ent(120, 999); } while (a % b === 0);
          return divEuclidienne(a, b, Math.random() < 0.5);
        },
        3: () => {
          const b = ent(12, 99), cas = ent(1, 3);
          if (cas < 3) return divEuclidienne(ent(1000, 9999), b, cas === 1);
          const q = ent(20, 150), r = ent(0, b - 1), a = b * q + r;
          return { enonce: "Dans une division euclidienne, le diviseur est $" + b + "$, le quotient est $" + q + "$ et le reste est $" + r + "$. Quel est le dividende ?", reponse: a, correction: "Dividende $=$ diviseur $\\times$ quotient $+$ reste : $" + b + " \\times " + q + " + " + r + " = " + L(b * q) + " + " + r + " = " + L(a) + "$." };
        }
      }
    },
    {
      id: "div-multiple-diviseur", chap: "div", titre: "Multiple, diviseur, divisible ?", format: "choix", options: ["oui", "non"],
      niveaux: {
        1: () => multipleDiviseur(12, 90, facile(1) ? 10 : ent(2, 9), ["multiple", "diviseur", "divisible"]),
        2: () => multipleDiviseur(30, 400, facile(2) ? 10 : ent(11, 25), ["multiple", "diviseur", "divisible"]),
        3: () => multipleDiviseur(100, 2400, ent(12, 60), ["multiple", "diviseur"])
      }
    },
    {
      id: "div-criteres", chap: "div", titre: "Critères de divisibilité", format: "choix", options: ["oui", "non"],
      niveaux: {
        1: () => { const d = choix([2, 5, 10]); return facile(1) ? exCritere(0, 0, d, () => 10 * ent(10, 999)) : exCritere(100, 9999, d); },
        2: () => {
          const d = choix([3, 9]);
          if (facile(2)) return exCritere(0, 0, d, () => +Array.from({ length: ent(3, 4) }, () => choix([3, 6, 9])).join(""));
          return exCritere(100, 9999, d);
        },
        3: () => exCritere(10000, 999999, choix([2, 3, 5, 9, 10]))
      }
    },
    {
      id: "div-chiffre-manquant", chap: "div", titre: "Chiffre manquant", format: "nombre",
      niveaux: {
        1: () => {
          const debut = ent(10, 99), d = facile(1) ? 10 : choix([2, 5]);
          const regle = { 2: ["son dernier chiffre est pair (0, 2, 4, 6 ou 8)", 8], 5: ["son dernier chiffre est $0$ ou $5$", 5], 10: ["son dernier chiffre est $0$", 0] }[d];
          return { enonce: "Quel est le plus grand chiffre qui peut remplacer $\\square$ pour que le nombre $" + debut + "\\square$ soit divisible par $" + d + "$ ?", reponse: regle[1], correction: "Un nombre est divisible par $" + d + "$ quand " + regle[0] + "." + (d === 10 ? " Le seul chiffre possible est $0$." : " Le plus grand est $" + regle[1] + "$.") };
        },
        2: () => {
          if (facile(2)) {
            const place = ent(0, 2), c = [choix([3, 6, 9]), choix([3, 6, 9]), choix([3, 6, 9])];
            return chiffreManquantFixe(c, place, 3);
          }
          return chiffreManquant(3, 3, false);
        },
        3: () => chiffreManquant(choix([3, 4]), 9, Math.random() < 0.5)
      }
    },
    {
      id: "div-nombre-diviseurs", chap: "div", titre: "Nombre de diviseurs", format: "nombre",
      niveaux: {
        1: () => { const f = facile(1); let n; do { n = ent(6, 30); } while (estPremier(n) !== f); return nbDiviseurs(n, false); },
        2: () => { const f = facile(2); let n; do { n = ent(31, 70); } while (f && !estPremier(n)); return nbDiviseurs(n, false); },
        3: () => nbDiviseurs(ent(71, 120), Math.random() < 0.4)
      }
    },
    {
      id: "div-problemes", chap: "div", titre: "Problèmes de partage", format: "nombre",
      niveaux: {
        1: () => {
          const k = ent(5, 12), f = facile(1);
          let n; do { n = f ? k * ent(Math.ceil(40 / k), Math.floor(200 / k)) : ent(40, 200); } while (!f && n % k === 0);
          const [objets, paquets] = choix([["livres", "cartons"], ["œufs", "boîtes"], ["crayons", "trousses"], ["photos", "pages d'album"]]), q = Math.floor(n / k), r = n % k;
          if (Math.random() < 0.5) return { enonce: "On range " + n + " " + objets + " dans des " + paquets + " de " + k + ". Combien de " + paquets + " complets obtient-on ?", reponse: q, correction: "$" + n + " = " + k + " \\times " + q + " + " + r + "$ : on obtient $" + q + "$ " + paquets + " complets." };
          return { enonce: "On range " + n + " " + objets + " dans des " + paquets + " de " + k + ". Combien de " + objets + " reste-t-il ?", reponse: r, correction: "$" + n + " = " + k + " \\times " + q + " + " + r + "$ : il reste $" + r + "$ " + objets + "." };
        },
        2: () => {
          const k = ent(12, 40), f = facile(2);
          let n; do { n = f ? k * ent(Math.ceil(100 / k), Math.floor(600 / k)) : ent(100, 600); } while (!f && n % k === 0);
          const [phrase, qui, quoi, un, pleins] = choix([["Il faut transporter " + n + " élèves. Chaque car peut en transporter " + k + ".", "élèves", "cars", "un car", "pleins"], ["Il faut ranger " + n + " bouteilles. Chaque caisse peut en contenir " + k + ".", "bouteilles", "caisses", "une caisse", "pleines"], ["Il faut placer " + n + " invités. Chaque table peut en accueillir " + k + ".", "invités", "tables", "une table", "complètes"], ["Il faut transporter " + n + " supporters. Chaque bus peut en transporter " + k + ".", "supporters", "bus", "un bus", "pleins"]]), q = Math.floor(n / k), r = n % k, rep = r ? q + 1 : q;
          return { enonce: phrase + " Combien de " + quoi + " faut-il au minimum ?", reponse: rep, correction: r ? "$" + n + " = " + k + " \\times " + q + " + " + r + "$ : " + q + " " + quoi + " sont " + pleins + " et il reste $" + r + "$ " + qui + ", pour qui il faut " + un + " de plus. Il faut donc $" + q + " + 1 = " + rep + "$ " + quoi + "." : "$" + n + " = " + k + " \\times " + q + "$ : la division tombe juste, il faut $" + q + "$ " + quoi + "." };
        },
        3: () => {
          const n = ent(200, 2000), b = ent(12, 99), q = Math.floor(n / b), r = n % b, cas = ent(1, 3), eg = "$" + L(n) + " = " + b + " \\times " + q + " + " + r + "$";
          if (cas === 1) return { enonce: "Combien y a-t-il de multiples de $" + b + "$ compris entre $1$ et $" + L(n) + "$ ?", reponse: q, correction: eg + ", donc les multiples sont $" + b + " \\times 1$, $" + b + " \\times 2$, ..., $" + b + " \\times " + q + "$ : il y en a $" + q + "$." };
          if (cas === 2) return { enonce: "Quel est le plus grand multiple de $" + b + "$ inférieur ou égal à $" + L(n) + "$ ?", reponse: b * q, correction: eg + ", donc le plus grand multiple de $" + b + "$ inférieur ou égal à $" + L(n) + "$ est $" + b + " \\times " + q + " = " + L(b * q) + "$." };
          return { enonce: "Quel est le plus petit multiple de $" + b + "$ strictement supérieur à $" + L(n) + "$ ?", reponse: b * (q + 1), correction: eg + ", donc le multiple suivant est $" + b + " \\times " + (q + 1) + " = " + L(b * (q + 1)) + "$." };
        }
      }
    }
  ];
  // Cas facile du niveau 2 : chiffres connus 3, 6 ou 9
  function chiffreManquantFixe(c, place, d) {
    const n = +c.join(""), base = avecTrou(n, place);
    const possibles = Array.from({ length: 10 }, (_, i) => i).filter((x) => !(place === 0 && x === 0) && (base.s + x) % d === 0), rep = possibles[0];
    return { enonce: "Quel est le plus petit chiffre qui peut remplacer $\\square$ pour que le nombre $" + base.latex + "$ soit divisible par $" + d + "$ ?", reponse: rep, correction: "La somme des chiffres connus est $" + base.connus.join(" + ") + " = " + base.s + "$, déjà un multiple de $" + d + "$. Le plus petit chiffre qui convient est $" + rep + "$" + (place === 0 ? " ($0$ ne peut pas commencer un nombre)" : "") + "." };
  }

  Savoirs.enregistrerTechniques("5e", div);
})();
