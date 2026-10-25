// Techniques d'entraînement de 4e : « Pythagore : réciproque et contraposée » (recip).
// D'après propositions/referentiels/4e/recip.json (lot 2) : les descriptions de niveau sont la spécification.
// Un triangle sur deux est rectangle : la réponse 0 à l'écart est fréquente, c'est voulu.
(function () {
  const { L, T, ent, choix, net, facile } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const carre = (x) => net(x * x);

  const ENTIERS = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25], [20, 21, 29], [9, 40, 41],
    [12, 35, 37], [10, 24, 26], [15, 36, 39], [18, 24, 30], [16, 30, 34], [21, 28, 35], [24, 32, 40]];
  // Triplets décimaux (niveau 2) : triplets primitifs × k/10, au moins un côté non entier
  const DECIMAUX = [];
  [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]].forEach((t) => {
    for (let k = 1; k <= 30; k++) {
      const u = t.map((x) => net((x * k) / 10));
      if (u[2] <= 15 && u.some((x) => !Number.isInteger(x))) DECIMAUX.push(u);
    }
  });
  // Triplets du niveau 3 : multiples par 0,25 ; 0,3 ; 0,5 ; 0,7 ; 1,5 ; 2,5 (plus grand côté au plus 50 cm)
  const NIVEAU3 = [];
  [[5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]].forEach((t) => [0.25, 0.3, 0.5, 0.7, 1.5, 2.5].forEach((m) => {
    const u = t.map((x) => net(x * m));
    if (u[2] <= 50) NIVEAU3.push(u);
  }));

  // Triangle : trois longueurs [a, b, c] (c le plus grand), rectangle ou non ; décalages possibles du plus grand côté
  function longueurs(niveau, rectangle) {
    for (;;) {
      const t = niveau === 1 ? choix(ENTIERS) : niveau === 2 ? choix(DECIMAUX) : choix(NIVEAU3);
      if (rectangle) return t;
      const d = niveau === 1 ? choix([-2, -1, 1, 2, 3]) : niveau === 2 ? choix([1, 2, 3, 4]) / 10 * choix([1, -1]) : choix([0.05, 0.1, 0.2]) * choix([1, -1]);
      const c = net(t[2] + d);
      // Le plus grand côté reste le plus grand, et le triangle existe
      if (c > t[1] && c > t[0] && c < t[0] + t[1]) return [t[0], t[1], c];
    }
  }
  // Noms des côtés : lettres du triangle, longueurs annoncées dans un ordre quelconque
  const TRIANGLES = ["ABC", "DEF", "MNP", "RST", "KLO", "GHI"];
  function triangle(t) {
    const lettres = choix(TRIANGLES).split(""), sommets = melanger(lettres.slice());
    // Le plus grand côté est opposé au sommet sommets[2]
    const nom = (u, v) => [u, v].sort((x, y) => lettres.indexOf(x) - lettres.indexOf(y)).join("");
    const cotes = [{ nom: nom(sommets[1], sommets[2]), l: t[0] }, { nom: nom(sommets[0], sommets[2]), l: t[1] }, { nom: nom(sommets[0], sommets[1]), l: t[2] }];
    return {
      lettres: lettres.join(""), grand: cotes[2], petits: [t[0], t[1]].sort((x, y) => x - y),
      texte: "Un triangle $" + lettres.join("") + "$ a pour côtés : " + melanger(cotes).map((c) => "$" + c.nom + " = " + L(c.l) + "$ cm").join(", ") + "."
    };
  }
  // Tirage d'un triangle : une fois sur deux rectangle (sauf si on l'impose)
  const tirer = (niveau, rectangle) => triangle(longueurs(niveau, rectangle === undefined ? Math.random() < 0.5 : rectangle));
  const membres = (tr) => {
    const [a, b] = tr.petits, c = tr.grand.l, g = carre(c), s = net(carre(a) + carre(b));
    return {
      g: g, s: s, ecart: net(g - s),
      unePart: "D'une part $" + L(c) + "^{2} = " + L(g) + "$. D'autre part $" + L(a) + "^{2} + " + L(b) + "^{2} = " + L(carre(a)) + " + " + L(carre(b)) + " = " + L(s) + "$."
    };
  };

  const recip = [
    {
      id: "carre-grand", chap: "recip", titre: "Carré du plus grand côté", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((n) => [n, () => {
        const tr = tirer(n), c = tr.grand.l;
        return {
          enonce: tr.texte + " Calculer le carré du plus grand côté.", reponse: carre(c), unite: "cm²",
          correction: "Le plus grand côté est $" + tr.grand.nom + "$ (" + T(c) + " cm). Son carré : $" + L(c) + "^{2} = " + L(carre(c)) + "$."
        };
      }]))
    },
    {
      id: "somme-petits", chap: "recip", titre: "Somme des carrés des deux autres côtés", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((n) => [n, () => {
        const tr = tirer(n), [a, b] = tr.petits, s = net(carre(a) + carre(b));
        return {
          enonce: tr.texte + " Calculer la somme des carrés des deux plus petits côtés.", reponse: s, unite: "cm²",
          correction: "Les deux plus petits côtés mesurent " + T(a) + " cm et " + T(b) + " cm. $" + L(a) + "^{2} + " + L(b) + "^{2} = " + L(carre(a)) + " + " + L(carre(b)) + " = " + L(s) + "$."
        };
      }]))
    },
    {
      id: "ecart-pyth", chap: "recip", titre: "Écart entre les deux membres", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((n) => [n, () => {
        // Rectangle ou non tiré avant les rejets, pour garder une fois sur deux
        const rectangle = Math.random() < 0.5;
        for (;;) {
          const tr = tirer(n, rectangle), m = membres(tr);
          // Niveau 2 : un écart non nul reste de valeur absolue au plus 3
          if (n === 2 && Math.abs(m.ecart) > 3) continue;
          return {
            enonce: tr.texte + " Calculer le carré du plus grand côté moins la somme des carrés des deux autres côtés.", reponse: m.ecart,
            correction: "Plus grand côté : $" + tr.grand.nom + "$. " + m.unePart + " Écart : $" + L(m.g) + " - " + L(m.s) + " = " + L(m.ecart) + "$. " +
              (m.ecart === 0 ? "L'écart est nul : d'après la réciproque, le triangle est rectangle." : "L'écart n'est pas nul : d'après la contraposée, le triangle n'est pas rectangle.")
          };
        }
      }]))
    },
    {
      id: "rectangle-oui-non", chap: "recip", titre: "Le triangle est-il rectangle ?", format: "choix", options: ["rectangle", "non rectangle"],
      niveaux: Object.fromEntries([1, 2, 3].map((n) => [n, () => {
        // Cas facile : le triangle 3-4-5 (niveau 1) ou 0,3-0,4-0,5 (niveau 2)
        const tr = facile(n) ? triangle(n === 1 ? [3, 4, 5] : [0.3, 0.4, 0.5]) : tirer(n), m = membres(tr), oui = m.ecart === 0;
        return {
          enonce: tr.texte + " Le triangle est-il rectangle ?", reponse: oui ? "rectangle" : "non rectangle",
          correction: "Plus grand côté : $" + tr.grand.nom + "$. " + m.unePart + (oui
            ? " Les deux résultats sont égaux : d'après la réciproque du théorème de Pythagore, le triangle est rectangle."
            : " Les deux résultats sont différents : d'après la contraposée du théorème de Pythagore, le triangle n'est pas rectangle.")
        };
      }]))
    }
  ];

  Savoirs.enregistrerTechniques("4e", recip);
})();
