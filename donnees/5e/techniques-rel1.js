// Techniques d'entraînement de 5e : « Nombres relatifs : repérage et comparaison » (rel1).
// D'après propositions/referentiels/5e/rel1.json (lot 5) : les descriptions de niveau sont la spécification.
(function () {
  const { L, T, ent, choix, net, nonNul, facile } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const signe = () => choix([1, -1]);
  // Décimal à un chiffre après la virgule (dixièmes non nuls), de 1,1 à 9,9 ou de 10,1 à 99,9
  const dec1 = () => { for (;;) { const k = Math.random() < 0.5 ? ent(11, 99) : ent(101, 999); if (k % 10) return k / 10; } };
  const liste = (v) => v.map((x) => "$" + L(x) + "$").join(" ; ");
  const range = (v) => v.slice().sort((a, b) => a - b);
  const chaine = (v) => range(v).map((x) => "$" + L(x) + "$").join(" < ");
  const RANGS = { 2: "deuxième", 3: "troisième", 4: "quatrième", 5: "cinquième" };
  // Six nombres de même partie entière pour plusieurs (niveau 3)
  function serieFine() {
    for (;;) {
      const E = ent(1, 9), v = [];
      const prend = (x) => { x = net(x); if (!v.includes(x) && x !== 0) v.push(x); };
      for (let i = 0; i < 3; i++) prend(-(E + choix([ent(1, 9) / 10, ent(1, 99) / 100])));
      while (v.length < 6) prend(signe() * (ent(1, 9) + choix([ent(1, 9) / 10, ent(1, 99) / 100])));
      if (v.some((x) => x < 0) && v.length === 6) return melanger(v);
    }
  }

  const rel1 = [
    {
      id: "rel-oppose-abs", chap: "rel1", titre: "Opposé et valeur absolue", format: "nombre",
      niveaux: {
        1: () => { let x; do { x = nonNul(-30, 30); } while (Math.abs(x) === 1); if (facile(1)) x = Math.abs(x); else if (x > 0) x = -x; return { enonce: "Donner l'opposé de $" + L(x) + "$.", reponse: -x, correction: "L'opposé de $" + L(x) + "$ est le nombre de signe contraire : $" + L(-x) + "$." }; },
        2: () => {
          const x = dec1() * (facile(2) ? 1 : -1), opp = Math.random() < 0.5;
          return opp ? { enonce: "Donner l'opposé de $" + L(x) + "$.", reponse: -x, correction: "L'opposé de $" + L(x) + "$ est $" + L(-x) + "$." }
            : { enonce: "Donner la valeur absolue de $" + L(x) + "$.", reponse: Math.abs(x), correction: "La valeur absolue de $" + L(x) + "$ est sa distance à zéro : $" + L(Math.abs(x)) + "$." };
        },
        3: () => {
          const x = dec1() * signe(), n = ent(2, 3), mots = [];
          let m = choix(["opp", "abs"]);
          for (let i = 0; i < n; i++) { mots.push(m); m = m === "opp" ? "abs" : "opp"; }
          // mots[0] est le plus extérieur ; on calcule de l'intérieur (fin) vers l'extérieur
          let v = x; const etapes = [];
          for (let i = n - 1; i >= 0; i--) { const avant = v; v = mots[i] === "opp" ? -v : Math.abs(v); etapes.push((mots[i] === "opp" ? "l'opposé de $" : "la valeur absolue de $") + L(avant) + "$ est $" + L(v) + "$"); }
          const texte = mots.map((w) => (w === "opp" ? "l'opposé de " : "la valeur absolue de ")).join("");
          return { enonce: "Donner " + texte + "$" + L(x) + "$.", reponse: v, correction: "On calcule de l'intérieur vers l'extérieur : " + etapes.join(" ; ") + ". Le résultat est $" + L(v) + "$." };
        }
      }
    },
    {
      id: "rel-extreme", chap: "rel1", titre: "Le plus grand ou le plus petit", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((niveau) => [niveau, () => {
        let v;
        const simple = facile(niveau);
        for (;;) {
          if (niveau === 1) v = simple ? Array.from({ length: 4 }, () => ent(1, 30)) : Array.from({ length: 4 }, () => nonNul(-20, 20));
          else if (niveau === 2) v = simple ? Array.from({ length: 4 }, () => dec1()) : Array.from({ length: 5 }, (_, i) => (i === 4 && Math.random() < 0.3 ? ent(-9, 9) : -dec1()));
          else v = serieFine();
          if (new Set(v).size !== v.length) continue;
          if (niveau === 1 && !simple && !(v.some((x) => x < 0) && v.some((x) => x > 0))) continue;
          if (niveau === 2 && !simple && v.filter((x) => x < 0).length < 4) continue;
          break;
        }
        const grand = Math.random() < 0.5, r = grand ? Math.max(...v) : Math.min(...v);
        return {
          enonce: "Quel est le plus " + (grand ? "grand" : "petit") + " nombre de cette liste : " + liste(v) + " ?", reponse: r,
          correction: "On range les nombres du plus petit au plus grand : " + chaine(v) + "." + (v.filter((x) => x < 0).length > 1 ? " Pour deux négatifs, le plus petit est celui qui a la plus grande valeur absolue." : "") + " Le plus " + (grand ? "grand" : "petit") + " est $" + L(r) + "$."
        };
      }]))
    },
    {
      id: "rel-rang", chap: "rel1", titre: "Ranger dans l'ordre croissant", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((niveau) => [niveau, () => {
        let v;
        const simple = facile(niveau);
        for (;;) {
          if (niveau === 1) v = simple ? Array.from({ length: 4 }, () => ent(1, 30)) : Array.from({ length: 4 }, () => nonNul(-20, 20));
          else if (niveau === 2) v = simple ? Array.from({ length: 4 }, () => dec1()) : Array.from({ length: 5 }, (_, i) => (i === 4 && Math.random() < 0.4 ? ent(-9, 9) : -dec1()));
          else v = serieFine();
          if (new Set(v).size !== v.length) continue;
          if (niveau === 1 && !simple && !(v.some((x) => x < 0) && v.some((x) => x > 0))) continue;
          if (niveau === 2 && !simple && v.filter((x) => x < 0).length < 4) continue;
          break;
        }
        const k = niveau === 1 ? ent(2, 3) : niveau === 2 ? ent(2, Math.min(4, v.length - 1)) : ent(2, 5), r = range(v)[k - 1];
        return {
          enonce: "On range les nombres de la liste " + liste(v) + " du plus petit au plus grand. Quel nombre est en " + RANGS[k] + " position ?", reponse: r,
          correction: "Du plus petit au plus grand : " + chaine(v) + ". Le " + RANGS[k] + " est $" + L(r) + "$."
        };
      }]))
    },
    {
      id: "rel-entre", chap: "rel1", titre: "Compter les entiers entre deux nombres", format: "nombre",
      niveaux: (function () {
        function ex(a, b) {
          const bas = Math.floor(a) + 1, haut = Math.ceil(b) - 1, n = haut - bas + 1, ints = Array.from({ length: n }, (_, i) => bas + i);
          const detail = n === 0
            ? "$" + L(a) + "$ et $" + L(b) + "$ sont deux entiers qui se suivent : il n'y a aucun entier entre les deux. On en compte $0$."
            : Number.isInteger(a) && Number.isInteger(b) && n <= 12
            ? "Les entiers sont " + ints.map((x) => "$" + x + "$").join(", ") + " : on en compte " + n + "."
            : "Le plus petit entier supérieur à $" + L(a) + "$ est $" + bas + "$ et le plus grand entier inférieur à $" + L(b) + "$ est $" + haut + "$. Les entiers vont de $" + bas + "$ à $" + haut + "$ : il y en a $" + haut + " - " + (bas < 0 ? "(" + bas + ")" : bas) + " + 1 = " + n + "$.";
          return { enonce: "Combien d'entiers relatifs sont strictement compris entre $" + L(a) + "$ et $" + L(b) + "$ ?", reponse: n, correction: detail };
        }
        return {
          1: () => (facile(1) ? ex(0, ent(3, 9)) : ex(-ent(1, 9), ent(1, 9))),
          2: () => {
            if (facile(2)) return ex(-ent(2, 9), -1);
            if (Math.random() < 0.6) { for (;;) { const a = -ent(4, 40), b = -ent(1, 37); if (b - a >= 3) return ex(a, b); } }
            return ex(-ent(10, 40), ent(10, 40));
          },
          3: () => ex(-ent(10, 79) / 10, Math.random() < 0.5 ? ent(11, 69) / 10 : ent(1, 6))
        };
      })()
    },
    {
      id: "rel-voisin", chap: "rel1", titre: "Entier juste au-dessous, au-dessus ou le plus proche", format: "nombre",
      niveaux: (function () {
        function ex(x, sorte) {
          const bas = Math.floor(x), haut = Math.ceil(x);
          if (sorte === "inf") return { enonce: "Donner le plus grand entier relatif inférieur à $" + L(x) + "$.", reponse: bas, correction: "Sur la droite graduée, l'entier juste à gauche de $" + L(x) + "$ est $" + bas + "$ (et $" + haut + "$ est à droite de $" + L(x) + "$)." };
          if (sorte === "sup") return { enonce: "Donner le plus petit entier relatif supérieur à $" + L(x) + "$.", reponse: haut, correction: "Sur la droite graduée, l'entier juste à droite de $" + L(x) + "$ est $" + haut + "$ (et $" + bas + "$ est à gauche de $" + L(x) + "$)." };
          const r = x - bas < haut - x ? bas : haut;
          return { enonce: "Donner l'entier relatif le plus proche de $" + L(x) + "$.", reponse: r, correction: "$" + L(x) + "$ est compris entre $" + bas + "$ et $" + haut + "$ ; il est plus proche de $" + r + "$ (écart de $" + L(net(Math.abs(x - r))) + "$)." };
        }
        return {
          1: () => ex(facile(1) ? -ent(1, 9) / 10 : -(ent(1, 9) + ent(1, 9) / 10), "inf"),
          2: () => ex(facile(2) ? -ent(1, 9) / 10 : dec1() * signe(), choix(["inf", "sup"])),
          3: () => ex(net((ent(1, 99) + choix([0.01, 0.02, 0.98, 0.99, 0.05, 0.95, ent(1, 99) / 100])) * signe()), choix(["inf", "sup", "proche"]))
        };
      })()
    },
    {
      id: "rel-distance", chap: "rel1", titre: "Distance entre deux points d'une droite graduée", format: "nombre",
      niveaux: (function () {
        const POINTS = [["A", "B"], ["M", "N"], ["R", "S"], ["E", "F"]];
        function ex(a, b, situation) {
          const [P, Q] = choix(POINTS), d = net(Math.abs(a - b)), meme = a * b > 0;
          const regle = a === 0 || b === 0 ? "L'un des points est l'origine : la distance est la valeur absolue de l'autre abscisse, $" + L(d) + "$."
            : meme ? "Les deux nombres ont le même signe : on retranche la plus petite valeur absolue à la plus grande. $" + L(Math.max(Math.abs(a), Math.abs(b))) + " - " + L(Math.min(Math.abs(a), Math.abs(b))) + " = " + L(d) + "$."
              : "Les deux nombres sont de signes contraires : on additionne leurs valeurs absolues. $" + L(Math.abs(a)) + " + " + L(Math.abs(b)) + " = " + L(d) + "$.";
          if (situation === "temp") return { enonce: "À midi, il fait " + T(a) + " °C ; le soir, il fait " + T(b) + " °C. Quel est l'écart entre ces deux températures, en °C ?", reponse: d, unite: "°C", correction: regle };
          if (situation === "alt") return { enonce: "Un oiseau vole à l'altitude " + T(a) + " m et un poisson nage à l'altitude " + T(b) + " m. Quelle distance verticale les sépare, en m ?", reponse: d, unite: "m", correction: regle };
          return { enonce: "Sur une droite graduée, le point $" + P + "$ a pour abscisse $" + L(a) + "$ et le point $" + Q + "$ a pour abscisse $" + L(b) + "$. Quelle est la distance $" + P + Q + "$ ?", reponse: d, correction: regle };
        }
        return {
          1: () => { if (facile(1)) return ex(0, nonNul(-30, 30)); const s = signe(); const [a, b] = melanger([s * ent(1, 15), s * ent(16, 30)]); return ex(a, b); },
          2: () => { if (facile(2)) { const a = ent(1, 20); return ex(a, -a); } const [a, b] = melanger([ent(1, 20), -ent(1, 20)]); return ex(a, b); },
          3: () => {
            if (Math.random() < 0.5) { const s = Math.random() < 0.5; return s ? ex(dec1() * signe(), dec1() * signe(), choix(["temp", "alt"])) : ex(dec1() * signe(), dec1() * signe()); }
            for (;;) { const a = dec1() * signe(), b = dec1() * signe(); if (a !== b) return ex(a, b); }
          }
        };
      })()
    }
  ];

  Savoirs.enregistrerTechniques("5e", rel1);
})();
