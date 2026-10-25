// Techniques d'entraînement de 5e : « Triangle : constructions et droites remarquables » (tri).
// D'après propositions/referentiels/5e/tri.json (lot 5) : les descriptions de niveau sont la spécification.
// Les configurations sont décrites par un texte (l'application n'affiche pas de figure).
(function () {
  const { L, T, ent, choix, net, decimal, facile } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  const TRIANGLES = ["ABC", "DEF", "MNP", "RST", "KLO", "GHI", "UVW"];
  const deg = (x) => L(x) + "^{\\circ}";
  // Angle au sommet s du triangle (lettres l) : \widehat{ASB}
  const angle = (l, s) => { const [a, b] = l.filter((x) => x !== s); return "\\widehat{" + a + s + b + "}"; };

  function exTroisieme(l, s1, a1, s2, a2, s3) {
    const r = 180 - a1 - a2;
    return {
      enonce: "Dans le triangle $" + l.join("") + "$, $" + angle(l, s1) + " = " + deg(a1) + "$ et $" + angle(l, s2) + " = " + deg(a2) + "$. Calculer $" + angle(l, s3) + "$.", reponse: r, unite: "°",
      correction: "La somme des angles d'un triangle est $180^{\\circ}$ : $" + angle(l, s3) + " = 180^{\\circ} - (" + deg(a1) + " + " + deg(a2) + ") = 180^{\\circ} - " + deg(a1 + a2) + " = " + deg(r) + "$."
    };
  }

  const tri = [
    {
      id: "tri-angle-tiers", chap: "tri", titre: "Calculer un angle d'un triangle", format: "nombre",
      niveaux: {
        1: () => {
          const l = choix(TRIANGLES).split(""), [s1, s2, s3] = melanger(l.slice());
          if (facile(1)) return exTroisieme(l, s1, ent(20, 80), s2, 90, s3);
          for (;;) { const a = ent(15, 100), b = ent(15, 100); if (a + b <= 165) return exTroisieme(l, s1, a, s2, b, s3); }
        },
        2: () => {
          const l = choix(TRIANGLES).split(""), [S, B1, B2] = melanger(l.slice());
          if (facile(2)) return { enonce: "Le triangle $" + l.join("") + "$ est équilatéral. Calculer $" + angle(l, S) + "$.", reponse: 60, unite: "°", correction: "Les trois angles d'un triangle équilatéral sont égaux : $180^{\\circ} \\div 3 = 60^{\\circ}$." };
          if (Math.random() < 0.5) {
            const sommet = 2 * ent(10, 85), base = (180 - sommet) / 2;
            return { enonce: "Le triangle $" + l.join("") + "$ est isocèle en $" + S + "$ et $" + angle(l, S) + " = " + deg(sommet) + "$. Calculer $" + angle(l, B1) + "$.", reponse: base, unite: "°", correction: "Les angles à la base d'un triangle isocèle sont égaux : $" + angle(l, B1) + " = " + angle(l, B2) + " = (180^{\\circ} - " + deg(sommet) + ") \\div 2 = " + deg(180 - sommet) + " \\div 2 = " + deg(base) + "$." };
          }
          const base = ent(20, 85), sommet = 180 - 2 * base;
          return { enonce: "Le triangle $" + l.join("") + "$ est isocèle en $" + S + "$ et $" + angle(l, B1) + " = " + deg(base) + "$. Calculer $" + angle(l, S) + "$.", reponse: sommet, unite: "°", correction: "Les angles à la base d'un triangle isocèle sont égaux : $" + angle(l, B1) + " = " + angle(l, B2) + " = " + deg(base) + "$. Donc $" + angle(l, S) + " = 180^{\\circ} - 2 \\times " + deg(base) + " = 180^{\\circ} - " + deg(2 * base) + " = " + deg(sommet) + "$." };
        },
        3: () => {
          const l = choix(TRIANGLES).split(""), [s1, s2, s3] = melanger(l.slice()), cas = ent(1, 4);
          if (cas === 1) {
            const k = choix([2, 3]), a = ent(10, 40), b = k * a, r = 180 - a - b;
            return { enonce: "Dans le triangle $" + l.join("") + "$, $" + angle(l, s1) + " = " + deg(a) + "$ et $" + angle(l, s2) + "$ est " + (k === 2 ? "le double" : "le triple") + " de $" + angle(l, s1) + "$. Calculer $" + angle(l, s3) + "$.", reponse: r, unite: "°", correction: "$" + angle(l, s2) + " = " + k + " \\times " + deg(a) + " = " + deg(b) + "$. Donc $" + angle(l, s3) + " = 180^{\\circ} - (" + deg(a) + " + " + deg(b) + ") = 180^{\\circ} - " + deg(a + b) + " = " + deg(r) + "$." };
          }
          if (cas === 2) {
            const a = ent(20, 70), e = ent(5, 30), b = a + e, r = 180 - a - b;
            return { enonce: "Dans le triangle $" + l.join("") + "$, $" + angle(l, s1) + " = " + deg(a) + "$ et $" + angle(l, s2) + "$ mesure $" + deg(e) + "$ de plus que $" + angle(l, s1) + "$. Calculer $" + angle(l, s3) + "$.", reponse: r, unite: "°", correction: "$" + angle(l, s2) + " = " + deg(a) + " + " + deg(e) + " = " + deg(b) + "$. Donc $" + angle(l, s3) + " = 180^{\\circ} - (" + deg(a) + " + " + deg(b) + ") = 180^{\\circ} - " + deg(a + b) + " = " + deg(r) + "$." };
          }
          if (cas === 3) {
            const a = ent(30, 85), b = ent(30, 85), c = 180 - a - b, ext = 180 - c;
            if (c <= 0) return tri[0].niveaux[3]();
            const [X, Y] = l.filter((x) => x !== s3), P = ["E", "X", "Z"].find((x) => !l.includes(x));
            return { enonce: "Dans le triangle $" + l.join("") + "$, $" + angle(l, s1) + " = " + deg(a) + "$ et $" + angle(l, s2) + " = " + deg(b) + "$. On prolonge le côté $[" + s1 + s3 + "]$ au-delà de $" + s3 + "$ jusqu'à un point $" + P + "$. Calculer l'angle $\\widehat{" + s2 + s3 + P + "}$.", reponse: ext, unite: "°", correction: "$" + angle(l, s3) + " = 180^{\\circ} - (" + deg(a) + " + " + deg(b) + ") = " + deg(c) + "$. Les angles $" + angle(l, s3) + "$ et $\\widehat{" + s2 + s3 + P + "}$ sont supplémentaires : $\\widehat{" + s2 + s3 + P + "} = 180^{\\circ} - " + deg(c) + " = " + deg(ext) + "$." + (X && Y ? "" : "") };
          }
          // Isocèle : angle au sommet = k fois un angle à la base (k = 2, 3, 4 ou 1/2)
          const [S, B1] = [s1, s2], k = choix([2, 3, 4, 0.5]), base = net(180 / (2 + k)), sommet = net(k * base);
          const mot = { 2: "le double", 3: "le triple", 4: "le quadruple", 0.5: "la moitié" }[k];
          return {
            enonce: "Le triangle $" + l.join("") + "$ est isocèle en $" + S + "$ et son angle au sommet $" + angle(l, S) + "$ est " + mot + " d'un angle à la base. Calculer $" + angle(l, S) + "$.", reponse: sommet, unite: "°",
            correction: "Si un angle à la base mesure $x$, l'angle au sommet mesure $" + L(k) + " \\times x$ et $x + x + " + L(k) + " \\times x = " + L(2 + k) + " \\times x = 180^{\\circ}$. Donc $x = 180^{\\circ} \\div " + L(2 + k) + " = " + deg(base) + "$ et $" + angle(l, S) + " = " + L(k) + " \\times " + deg(base) + " = " + deg(sommet) + "$."
          };
        }
      }
    },
    {
      id: "tri-construire", chap: "tri", titre: "Peut-on construire ce triangle ?", format: "choix", options: ["oui", "non"],
      niveaux: Object.fromEntries([1, 2, 3].map((niveau) => [niveau, () => {
        let c;
        if (facile(niveau)) c = niveau === 1 ? (() => { const a = ent(2, 15); return [a, a, a]; })() : [3, 4, 5];
        else {
          const oui = Math.random() < 0.5;
          for (;;) {
            if (niveau === 3) { const a = dec(1.1, 5.9), b = dec(1.1, 5.9), s = net(a + b), e = choix([0, 0.1, 0.2, -0.1, -0.2]); c = [a, b, net(s + e)]; }
            else { const v = () => (niveau === 1 ? ent(2, 15) : Math.random() < 0.5 ? ent(2, 11) : dec(1.1, 11.9)); c = [v(), v(), v()]; }
            const t = c.slice().sort((x, y) => x - y);
            if (Math.abs(t[0] + t[1] - t[2]) < 1e-9 && niveau < 3) continue;
            if (niveau < 3 && (t[0] + t[1] > t[2]) !== oui) continue;
            break;
          }
          c = melanger(c);
        }
        const l = choix(TRIANGLES).split(""), noms = [l[0] + l[1], l[1] + l[2], l[0] + l[2]];
        const i = c.indexOf(Math.max(...c)), autres = c.filter((_, k) => k !== i), s = net(autres[0] + autres[1]), possible = c[i] < s - 1e-9;
        return {
          enonce: "Peut-on construire un triangle $" + l.join("") + "$ tel que $" + noms[0] + " = " + L(c[0]) + "$ cm, $" + noms[1] + " = " + L(c[1]) + "$ cm et $" + noms[2] + " = " + L(c[2]) + "$ cm ?",
          reponse: possible ? "oui" : "non",
          correction: "Le plus grand côté est $" + noms[i] + " = " + L(c[i]) + "$ cm. La somme des deux autres côtés : $" + L(autres[0]) + " + " + L(autres[1]) + " = " + L(s) + "$ cm. " +
            (possible ? "Comme $" + L(c[i]) + " < " + L(s) + "$, la construction est possible." : Math.abs(c[i] - s) < 1e-9 ? "Le plus grand côté est égal à la somme des deux autres : les trois points seraient alignés (triangle aplati), on ne peut pas construire ce triangle." : "Comme $" + L(c[i]) + " > " + L(s) + "$, la construction est impossible.")
        };
      }]))
    },
    {
      id: "tri-troisieme-cote", chap: "tri", titre: "Longueurs possibles du troisième côté", format: "nombre",
      niveaux: (function () {
        function ex(a, b, quoi) {
          const l = choix(TRIANGLES).split(""), n1 = l[0] + l[1], n2 = l[1] + l[2], n3 = l[0] + l[2], s = net(a + b), d = net(Math.abs(a - b));
          const maxi = Number.isInteger(s) ? s - 1 : Math.floor(s), mini = Math.floor(d) + 1;
          const debut = "Le triangle $" + l.join("") + "$ a pour côtés $" + n1 + " = " + L(a) + "$ cm et $" + n2 + " = " + L(b) + "$ cm. ";
          if (quoi === "max") return { enonce: debut + "Quelle est la plus grande longueur entière possible, en cm, pour $" + n3 + "$ ?", reponse: maxi, unite: "cm", correction: "La longueur de $" + n3 + "$ doit être strictement inférieure à $" + L(a) + " + " + L(b) + " = " + L(s) + "$. La plus grande valeur entière est donc $" + maxi + "$." };
          if (quoi === "min") return { enonce: debut + "Quelle est la plus petite longueur entière possible, en cm, pour $" + n3 + "$ ?", reponse: mini, unite: "cm", correction: "La longueur de $" + n3 + "$ doit être strictement supérieure à la différence des deux autres côtés : $" + L(Math.max(a, b)) + " - " + L(Math.min(a, b)) + " = " + L(d) + "$. La plus petite valeur entière est donc $" + mini + "$." };
          return { enonce: debut + "Combien de longueurs entières, en cm, sont possibles pour $" + n3 + "$ ?", reponse: maxi - mini + 1, correction: "On doit avoir $" + L(d) + " < " + n3 + " < " + L(s) + "$. Les valeurs entières vont de $" + mini + "$ à $" + maxi + "$ : il y en a $" + maxi + " - " + mini + " + 1 = " + (maxi - mini + 1) + "$." };
        }
        const differents = (f) => { for (;;) { const a = f(), b = f(); if (a !== b) return [a, b]; } };
        return {
          1: () => { if (facile(1)) return ex(1, ent(2, 15), "max"); const [a, b] = differents(() => ent(2, 15)); return ex(a, b, "max"); },
          2: () => { if (facile(2)) return ex(1, ent(2, 20), "min"); const [a, b] = differents(() => ent(2, 20)); return ex(a, b, "min"); },
          3: () => { const [a, b] = differents(() => dec(1.1, 9.9)); return ex(a, b, choix(["max", "min", "nombre"])); }
        };
      })()
    },
    {
      id: "tri-perimetre", chap: "tri", titre: "Périmètre d'un triangle", format: "nombre",
      niveaux: (function () {
        function isocele(l, c, b) {
          const [S, X, Y] = l, p = net(2 * c + b);
          return { enonce: "Le triangle $" + l.join("") + "$ est isocèle en $" + S + "$ avec $" + S + X + " = " + L(c) + "$ cm et $" + X + Y + " = " + L(b) + "$ cm. Calculer son périmètre.", reponse: p, unite: "cm", correction: "Comme le triangle est isocèle en $" + S + "$, $" + S + Y + " = " + S + X + " = " + L(c) + "$ cm. Périmètre : $2 \\times " + L(c) + " + " + L(b) + " = " + L(net(2 * c)) + " + " + L(b) + " = " + L(p) + "$ cm." };
        }
        return {
          1: () => {
            const l = choix(TRIANGLES).split("");
            if (facile(1)) { const c = ent(2, 20); return { enonce: "Le triangle $" + l.join("") + "$ est équilatéral de côté " + c + " cm. Calculer son périmètre.", reponse: 3 * c, unite: "cm", correction: "Les trois côtés sont égaux : $3 \\times " + c + " = " + 3 * c + "$ cm." }; }
            for (;;) { const c = ent(3, 20), b = ent(2, 25); if (b < 2 * c && b !== c) return isocele(l, c, b); }
          },
          2: () => {
            const l = choix(TRIANGLES).split("");
            if (facile(2)) { const c = dec(1.1, 9.9), p = net(3 * c); return { enonce: "Le triangle $" + l.join("") + "$ est équilatéral de côté " + T(c) + " cm. Calculer son périmètre.", reponse: p, unite: "cm", correction: "Les trois côtés sont égaux : $3 \\times " + L(c) + " = " + L(p) + "$ cm." }; }
            for (;;) {
              const c = dec(1.1, 9.9), b = dec(1.1, 9.9);
              if (b >= 2 * c || b === c) continue;
              if (Math.random() < 0.5) return isocele(l, c, b);
              const [S, X, Y] = l, p = net(2 * c + b);
              return { enonce: "Le triangle $" + l.join("") + "$ est isocèle en $" + S + "$. Sa base $[" + X + Y + "]$ mesure " + T(b) + " cm et son périmètre est " + T(p) + " cm. Calculer $" + S + X + "$.", reponse: c, unite: "cm", correction: "Les deux côtés égaux mesurent ensemble $" + L(p) + " - " + L(b) + " = " + L(net(2 * c)) + "$ cm. Donc $" + S + X + " = " + L(net(2 * c)) + " \\div 2 = " + L(c) + "$ cm." };
            }
          },
          3: () => {
            const l = choix(TRIANGLES).split(""), n = [l[0] + l[1], l[1] + l[2], l[0] + l[2]];
            for (;;) {
              const c = [dec(1.1, 9.9), dec(1.1, 9.9), dec(1.1, 9.9)], t = c.slice().sort((x, y) => x - y);
              if (t[0] + t[1] <= t[2]) continue;
              const p = net(c[0] + c[1] + c[2]);
              if (Math.random() < 0.5) return { enonce: "Le triangle $" + l.join("") + "$ a pour côtés $" + n[0] + " = " + L(c[0]) + "$ cm, $" + n[1] + " = " + L(c[1]) + "$ cm et $" + n[2] + " = " + L(c[2]) + "$ cm. Calculer son périmètre.", reponse: p, unite: "cm", correction: "Périmètre : $" + c.map(L).join(" + ") + " = " + L(p) + "$ cm." };
              return { enonce: "Le triangle $" + l.join("") + "$ a pour périmètre " + T(p) + " cm, avec $" + n[0] + " = " + L(c[0]) + "$ cm et $" + n[1] + " = " + L(c[1]) + "$ cm. Calculer $" + n[2] + "$.", reponse: c[2], unite: "cm", correction: "$" + n[2] + " = " + L(p) + " - (" + L(c[0]) + " + " + L(c[1]) + ") = " + L(p) + " - " + L(net(c[0] + c[1])) + " = " + L(c[2]) + "$ cm." };
            }
          }
        };
      })()
    },
    {
      id: "tri-mediatrice", chap: "tri", titre: "Médiatrice et cercle circonscrit", format: "nombre",
      niveaux: {
        1: () => { const [A, B] = choix([["A", "B"], ["G", "H"], ["E", "F"], ["K", "L"]]), d = ent(2, 15); return { enonce: "Le point $M$ est sur la médiatrice du segment $[" + A + B + "]$ et $M" + A + " = " + d + "$ cm. Calculer $M" + B + "$.", reponse: d, unite: "cm", correction: "Un point de la médiatrice est à égale distance des extrémités du segment : $M" + B + " = M" + A + " = " + d + "$ cm." }; },
        2: () => {
          const l = choix(TRIANGLES.filter((t) => !t.includes("O"))).split(""), cas = ent(1, 3), r = facile(2) ? ent(2, 15) : dec(1.1, 9.9);
          if (cas === 1 || facile(2)) return { enonce: "Le point $O$ est le centre du cercle circonscrit au triangle $" + l.join("") + "$. On a $O" + l[0] + " = " + L(r) + "$ cm. Calculer $O" + l[2] + "$.", reponse: r, unite: "cm", correction: "Le centre du cercle circonscrit est à égale distance des trois sommets : $O" + l[0] + " = O" + l[1] + " = O" + l[2] + " = " + L(r) + "$ cm." };
          if (cas === 2) return { enonce: "Le cercle circonscrit au triangle $" + l.join("") + "$ a pour rayon " + T(r) + " cm. Quel est son diamètre, en cm ?", reponse: net(2 * r), unite: "cm", correction: "Le diamètre est le double du rayon : $2 \\times " + L(r) + " = " + L(net(2 * r)) + "$ cm." };
          const s = 2 * ent(2, 30);
          return { enonce: "Le point $I$ est le milieu du segment $[" + l[0] + l[1] + "]$, qui mesure " + s + " cm. La médiatrice de $[" + l[0] + l[1] + "]$ passe par $I$. Calculer $I" + l[0] + "$.", reponse: s / 2, unite: "cm", correction: "La médiatrice coupe le segment en son milieu : $I" + l[0] + " = " + s + " \\div 2 = " + s / 2 + "$ cm." };
        },
        3: () => {
          const l = choix(TRIANGLES.filter((t) => !t.includes("O") && !t.includes("M"))).split(""), cas = ent(1, 3);
          if (cas === 1) { const d = dec(2.1, 19.9), r = net(d / 2); return { enonce: "Le cercle circonscrit au triangle $" + l.join("") + "$ a pour diamètre " + T(d) + " cm. Quel est son rayon, en cm ?", reponse: r, unite: "cm", correction: "Le rayon est la moitié du diamètre : $" + L(d) + " \\div 2 = " + L(r) + "$ cm." }; }
          if (cas === 2) {
            const a = dec(2.1, 9.9), ab = dec(1.1, 9.9), p = net(2 * a + ab);
            return { enonce: "Le point $M$ est sur la médiatrice du segment $[" + l[0] + l[1] + "]$, avec $M" + l[0] + " = " + L(a) + "$ cm et $" + l[0] + l[1] + " = " + L(ab) + "$ cm. Calculer le périmètre du triangle $M" + l[0] + l[1] + "$.", reponse: p, unite: "cm", correction: "$M$ est sur la médiatrice de $[" + l[0] + l[1] + "]$, donc $M" + l[1] + " = M" + l[0] + " = " + L(a) + "$ cm. Périmètre : $2 \\times " + L(a) + " + " + L(ab) + " = " + L(p) + "$ cm." };
          }
          const r = dec(1.1, 9.9), d = net(2 * r);
          return { enonce: "Le point $O$ est le centre du cercle circonscrit au triangle $" + l.join("") + "$. On sait que $O" + l[2] + " = " + L(r) + "$ cm. Calculer la longueur $" + l[0] + l[1] + "$, sachant que $[" + l[0] + l[1] + "]$ est un diamètre de ce cercle.", reponse: d, unite: "cm", correction: "$O" + l[2] + "$ est un rayon du cercle : le rayon vaut $" + L(r) + "$ cm. Le diamètre $" + l[0] + l[1] + "$ vaut $2 \\times " + L(r) + " = " + L(d) + "$ cm." };
        }
      }
    },
    {
      id: "tri-rectangle", chap: "tri", titre: "Angles d'un triangle rectangle", format: "nombre",
      niveaux: (function () {
        function ex(l, a) {
          const [A, B, C] = l, r = net(90 - a);
          return { enonce: "Le triangle $" + l.join("") + "$ est rectangle en $" + A + "$ et $" + angle(l, B) + " = " + deg(a) + "$. Calculer $" + angle(l, C) + "$.", reponse: r, unite: "°", correction: "Les angles aigus d'un triangle rectangle sont complémentaires : $" + angle(l, C) + " = 90^{\\circ} - " + deg(a) + " = " + deg(r) + "$." };
        }
        return {
          1: () => ex(choix(TRIANGLES).split(""), facile(1) ? 45 : ent(10, 80)),
          2: () => ex(choix(TRIANGLES).split(""), facile(2) ? ent(10, 80) : dec(10.1, 89.9)),
          3: () => {
            const l = choix(TRIANGLES).split(""), [A, B, C] = l;
            if (Math.random() < 0.5) {
              const e = 2 * ent(1, 20), petit = (90 - e) / 2, grand = petit + e;
              return { enonce: "Le triangle $" + l.join("") + "$ est rectangle en $" + A + "$ et $" + angle(l, B) + "$ mesure $" + deg(e) + "$ de plus que $" + angle(l, C) + "$. Calculer $" + angle(l, B) + "$.", reponse: grand, unite: "°", correction: "Les angles aigus sont complémentaires : $" + angle(l, C) + " + " + angle(l, B) + " = 90^{\\circ}$, avec $" + angle(l, B) + " = " + angle(l, C) + " + " + deg(e) + "$. Donc $2 \\times " + angle(l, C) + " = 90^{\\circ} - " + deg(e) + " = " + deg(90 - e) + "$, $" + angle(l, C) + " = " + deg(petit) + "$ et $" + angle(l, B) + " = " + deg(grand) + "$." };
            }
            const k = choix([2, 3, 4, 5, 8]), x = net(90 / (k + 1)), r = net(k * x), mot = { 2: "deux", 3: "trois", 4: "quatre", 5: "cinq", 8: "huit" }[k];
            return { enonce: "Le triangle $" + l.join("") + "$ est rectangle en $" + A + "$ et $" + angle(l, B) + "$ est égal à " + mot + " fois $" + angle(l, C) + "$. Calculer $" + angle(l, B) + "$.", reponse: r, unite: "°", correction: "Si $" + angle(l, C) + " = x$ alors $" + angle(l, B) + " = " + k + " \\times x$ et $x + " + k + " \\times x = " + (k + 1) + " \\times x = 90^{\\circ}$, donc $x = 90^{\\circ} \\div " + (k + 1) + " = " + deg(x) + "$. Alors $" + angle(l, B) + " = " + k + " \\times " + deg(x) + " = " + deg(r) + "$." };
          }
        };
      })()
    }
  ];

  Savoirs.enregistrerTechniques("5e", tri);
})();
