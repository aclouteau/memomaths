// Techniques d'entraînement de 5e : « Nombres relatifs : repérage et comparaison » (rel1).
// D'après propositions/referentiels/5e/rel1.json (lot 5) : les descriptions de niveau sont la spécification.
(function () {
  const { L, ent, choix, net, nonNul, facile } = Savoirs.calculsOutils;
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
  ];

  Savoirs.enregistrerTechniques("5e", rel1);
})();
