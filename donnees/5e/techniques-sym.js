// Techniques d'entraînement de 5e : « Symétrie centrale » (sym).
// D'après propositions/referentiels/5e/sym.json (lot 5) : les descriptions de niveau sont la spécification.
(function () {
  const { L, T, ent, choix, net, decimal, facile } = Savoirs.calculsOutils;
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  const p = (x) => x + "'";
  const LETTRES = ["A", "B", "C", "D", "E", "F", "G", "H", "K", "L", "M", "N", "P", "R", "S", "T"];
  const TRIANGLES = ["ABC", "DEF", "GHI", "MNP", "RST", "KLU"];
  const deg = (x) => L(x) + "^{\\circ}";
  const angle = (l, s) => { const [a, b] = l.filter((x) => x !== s); return "\\widehat{" + a + s + b + "}"; };
  const angleP = (l, s) => { const [a, b] = l.filter((x) => x !== s); return "\\widehat{" + p(a) + p(s) + p(b) + "}"; };
  const triangleSym = (l) => "Le triangle $" + l.map(p).join("") + "$ est le symétrique du triangle $" + l.join("") + "$ par rapport à $O$";

  const sym = [
    {
      id: "sc-distances", chap: "sym", titre: "Distances avec une symétrie centrale", format: "nombre",
      niveaux: {
        1: () => {
          const M = choix(LETTRES), d = Math.random() < 0.5 ? ent(2, 20) : dec(1.1, 9.9);
          if (facile(1)) return { enonce: "Le point $" + p(M) + "$ est le symétrique de $" + M + "$ par rapport à $O$ et $O" + M + " = " + L(d) + "$ cm. Calculer $O" + p(M) + "$.", reponse: d, unite: "cm", correction: "$O$ est le milieu de $[" + M + p(M) + "]$ donc $O" + p(M) + " = O" + M + " = " + L(d) + "$ cm." };
          return { enonce: "Le point $" + p(M) + "$ est le symétrique de $" + M + "$ par rapport à $O$ et $O" + M + " = " + L(d) + "$ cm. Calculer $" + M + p(M) + "$.", reponse: net(2 * d), unite: "cm", correction: "$O$ est le milieu de $[" + M + p(M) + "]$ donc $O" + p(M) + " = O" + M + " = " + L(d) + "$ cm. Alors $" + M + p(M) + " = 2 \\times " + L(d) + " = " + L(net(2 * d)) + "$ cm." };
        },
        2: () => {
          const [M, N] = [choix(LETTRES.slice(0, 8)), choix(LETTRES.slice(8))];
          const dd = facile(2) ? 2 * ent(2, 40) : Math.random() < 0.5 ? 2 * ent(2, 40) : net(2 * dec(1.1, 9.9));
          if (facile(2) || Math.random() < 0.6) { const prime = Math.random() < 0.5 && !facile(2); return { enonce: "Le point $" + p(M) + "$ est le symétrique de $" + M + "$ par rapport à $O$ et $" + M + p(M) + " = " + L(dd) + "$ cm. Calculer $O" + (prime ? p(M) : M) + "$.", reponse: net(dd / 2), unite: "cm", correction: "$O$ est le milieu de $[" + M + p(M) + "]$ : $O" + (prime ? p(M) : M) + " = " + L(dd) + " \\div 2 = " + L(net(dd / 2)) + "$ cm." }; }
          const l = dec(1.1, 9.9);
          return { enonce: "Les points $" + p(M) + "$ et $" + p(N) + "$ sont les symétriques de $" + M + "$ et $" + N + "$ par rapport à $O$. On sait que $" + M + N + " = " + L(l) + "$ cm. Calculer $" + p(M) + p(N) + "$.", reponse: l, unite: "cm", correction: "La symétrie centrale conserve les longueurs : $" + p(M) + p(N) + " = " + M + N + " = " + L(l) + "$ cm." };
        },
        3: () => {
          const cas = ent(1, 3);
          if (cas === 1) {
            for (;;) {
              const l = choix(TRIANGLES).split(""), c = [dec(1.1, 9.9), dec(1.1, 9.9), dec(1.1, 9.9)], t = c.slice().sort((a, b) => a - b);
              if (t[0] + t[1] <= t[2]) continue;
              const per = net(c[0] + c[1] + c[2]);
              return { enonce: triangleSym(l) + ". On a $" + l[0] + l[1] + " = " + L(c[0]) + "$ cm, $" + l[1] + l[2] + " = " + L(c[1]) + "$ cm et $" + l[0] + l[2] + " = " + L(c[2]) + "$ cm. Calculer le périmètre du triangle $" + l.map(p).join("") + "$.", reponse: per, unite: "cm", correction: "La symétrie centrale conserve les longueurs, donc le périmètre : $" + c.map(L).join(" + ") + " = " + L(per) + "$ cm." };
            }
          }
          if (cas === 2) {
            const om = dec(3.1, 9.9), on = dec(1.1, 2.9), r = net(om - on);
            return { enonce: "Les points $O$, $N$ et $M$ sont alignés dans cet ordre, avec $OM = " + L(om) + "$ cm et $ON = " + L(on) + "$ cm. Les points $" + p("M") + "$ et $" + p("N") + "$ sont les symétriques de $M$ et $N$ par rapport à $O$. Calculer $" + p("M") + p("N") + "$.", reponse: r, unite: "cm", correction: "$N$ est entre $O$ et $M$ : $MN = OM - ON = " + L(om) + " - " + L(on) + " = " + L(r) + "$ cm. La symétrie centrale conserve les longueurs : $" + p("M") + p("N") + " = MN = " + L(r) + "$ cm." };
          }
          const M = choix(LETTRES), dia = net(2 * dec(1.1, 9.9));
          return { enonce: "Le point $" + p(M) + "$ est le symétrique de $" + M + "$ par rapport à $O$. Le cercle de centre $O$ passant par $" + M + "$ a pour diamètre " + T(dia) + " cm. Calculer $" + M + p(M) + "$.", reponse: dia, unite: "cm", correction: "Le diamètre du cercle est $" + L(dia) + "$ cm : le rayon $O" + M + "$ vaut $" + L(dia) + " \\div 2 = " + L(net(dia / 2)) + "$ cm. Comme $O$ est le milieu de $[" + M + p(M) + "]$, $" + M + p(M) + " = 2 \\times O" + M + " = 2 \\times " + L(net(dia / 2)) + " = " + L(dia) + "$ cm." };
        }
      }
    },
    {
      id: "sc-angles", chap: "sym", titre: "Angles et symétrie centrale", format: "nombre",
      niveaux: (function () {
        function ex(a) {
          const l = choix(TRIANGLES).split(""), s = l[1];
          return { enonce: triangleSym(l) + " et $" + angle(l, s) + " = " + deg(a) + "$. Combien mesure $" + angleP(l, s) + "$ ?", reponse: a, unite: "°", correction: "La symétrie centrale conserve les angles : $" + angleP(l, s) + " = " + angle(l, s) + " = " + deg(a) + "$." };
        }
        return {
          1: () => ex(facile(1) ? 90 : ent(10, 170)),
          2: () => ex(facile(2) ? ent(10, 170) : dec(10.1, 169.9)),
          3: () => {
            const l = choix(TRIANGLES).split(""), [A, B, C] = l;
            if (Math.random() < 0.5) {
              for (;;) {
                const a = ent(20, 100), b = ent(20, 100);
                if (a + b >= 170) continue;
                const r = 180 - a - b;
                return { enonce: triangleSym(l) + ". On sait que $" + angle(l, A) + " = " + deg(a) + "$ et $" + angle(l, B) + " = " + deg(b) + "$. Calculer $" + angleP(l, C) + "$.", reponse: r, unite: "°", correction: "Dans le triangle $" + l.join("") + "$ : $" + angle(l, C) + " = 180^{\\circ} - (" + deg(a) + " + " + deg(b) + ") = " + deg(r) + "$. La symétrie centrale conserve les angles : $" + angleP(l, C) + " = " + deg(r) + "$." };
              }
            }
            const base = ent(20, 80), sommet = 180 - 2 * base;
            return { enonce: "Le triangle $" + l.join("") + "$ est isocèle en $" + A + "$ et $" + angle(l, B) + " = " + deg(base) + "$. Le triangle $" + l.map(p).join("") + "$ est son symétrique par rapport à $O$. Calculer $" + angleP(l, A) + "$.", reponse: sommet, unite: "°", correction: "Les angles à la base d'un triangle isocèle sont égaux : $" + angle(l, B) + " = " + angle(l, C) + " = " + deg(base) + "$. Donc $" + angle(l, A) + " = 180^{\\circ} - 2 \\times " + deg(base) + " = " + deg(sommet) + "$. La symétrie centrale conserve les angles : $" + angleP(l, A) + " = " + deg(sommet) + "$." };
          }
        };
      })()
    },
    {
      id: "sc-aires", chap: "sym", titre: "Aires et périmètres conservés", format: "nombre",
      niveaux: {
        1: () => {
          if (facile(1)) { const c = ent(2, 30); return { enonce: "Le carré $" + "ABCD".split("").map(p).join("") + "$ est le symétrique du carré $ABCD$ par rapport à $O$, et $AB = " + c + "$ cm. Quel est le périmètre de $" + "ABCD".split("").map(p).join("") + "$ ?", reponse: 4 * c, unite: "cm", correction: "La symétrie centrale conserve les longueurs : le carré symétrique a aussi pour côté " + c + " cm. Périmètre : $4 \\times " + c + " = " + 4 * c + "$ cm." }; }
          const a = ent(2, 99);
          return { enonce: "La figure $F'$ est la symétrique de la figure $F$ par rapport à $O$. L'aire de $F$ est " + a + " cm². Quelle est l'aire de $F'$ ?", reponse: a, unite: "cm²", correction: "La symétrie centrale conserve les aires : l'aire de $F'$ est aussi " + a + " cm²." };
        },
        2: () => {
          const [Lg, lg] = facile(2) ? [ent(5, 20), ent(2, 4)] : [dec(2.1, 9.9), dec(1.1, 1.9)], aire = Math.random() < 0.5, nom = "GHID", np = nom.split("").map(p).join("");
          const r = aire ? net(Lg * lg) : net(2 * (Lg + lg));
          return {
            enonce: "Le rectangle $" + np + "$ est le symétrique du rectangle $" + nom + "$ par rapport à $O$, avec $GH = " + L(Lg) + "$ cm et $HI = " + L(lg) + "$ cm. Calculer " + (aire ? "l'aire" : "le périmètre") + " de $" + np + "$.", reponse: r, unite: aire ? "cm²" : "cm",
            correction: aire ? "La symétrie centrale conserve les aires : l'aire de $" + np + "$ est celle de $" + nom + "$ : $" + L(Lg) + " \\times " + L(lg) + " = " + L(r) + "$ cm²." : "La symétrie centrale conserve les longueurs : le périmètre de $" + np + "$ est celui de $" + nom + "$ : $2 \\times (" + L(Lg) + " + " + L(lg) + ") = " + L(r) + "$ cm."
          };
        },
        3: () => {
          const cas = ent(1, 3);
          if (cas === 1) { const b = dec(2.1, 9.9), h = ent(2, 9), r = net(b * h / 2); return { enonce: "Le triangle $" + "ABC".split("").map(p).join("") + "$ est le symétrique du triangle $ABC$ par rapport à $O$. Le triangle $ABC$ a pour base " + T(b) + " cm et pour hauteur associée " + h + " cm. Calculer l'aire de $" + "ABC".split("").map(p).join("") + "$.", reponse: r, unite: "cm²", correction: "La symétrie centrale conserve les aires : $\\dfrac{" + L(b) + " \\times " + h + "}{2} = " + L(r) + "$ cm²." }; }
          if (cas === 2) { const b = dec(2.1, 9.9), h = dec(1.1, 4.9), r = net(b * h); return { enonce: "Le parallélogramme $" + "ABCD".split("").map(p).join("") + "$ est le symétrique du parallélogramme $ABCD$ par rapport à $O$. Le parallélogramme $ABCD$ a pour base " + T(b) + " cm et pour hauteur " + T(h) + " cm. Calculer l'aire de $" + "ABCD".split("").map(p).join("") + "$.", reponse: r, unite: "cm²", correction: "La symétrie centrale conserve les aires : aire de $" + "ABCD".split("").map(p).join("") + "$ = aire de $ABCD$ = $" + L(b) + " \\times " + L(h) + " = " + L(r) + "$ cm²." }; }
          const r = dec(1.1, 5.9);
          return { enonce: "Le disque $D'$ est le symétrique d'un disque $D$ de rayon " + T(r) + " cm par rapport à un point $O$. Quel est le diamètre de $D'$, en cm ?", reponse: net(2 * r), unite: "cm", correction: "La symétrie centrale conserve les longueurs : $D'$ a aussi pour rayon " + T(r) + " cm. Son diamètre est $2 \\times " + L(r) + " = " + L(net(2 * r)) + "$ cm." };
        }
      }
    },
    // (« Abscisse du symétrique » retiré : pas de coordonnées dans les transformations, décision de l'enseignant.)
    {
      id: "sc-centre-oui-non", chap: "sym", titre: "A-t-elle un centre de symétrie ?", format: "choix", options: ["oui", "non"],
      niveaux: {
        1: () => {
          const F = [["un carré", true, "un carré"], ["un rectangle", true, "un rectangle"], ["un losange", true, "un losange"], ["un parallélogramme", true, "un parallélogramme"], ["un cercle", true, "un cercle"],
            ["un triangle équilatéral", false, "un triangle équilatéral"], ["un triangle isocèle", false, "un triangle isocèle"], ["un trapèze isocèle", false, "un trapèze isocèle"], ["un triangle rectangle", false, "un triangle rectangle"], ["un cerf-volant", false, "un cerf-volant"]];
          const [nom, oui] = facile(1) ? choix([F[0], F[4]]) : choix(F);
          const Nom = nom.charAt(0).toUpperCase() + nom.slice(1);
          return {
            enonce: Nom + " possède-t-il un centre de symétrie ?", reponse: oui ? "oui" : "non",
            correction: oui ? (nom === "un cercle" ? "Le centre du cercle est un centre de symétrie : oui." : (nom === "un parallélogramme" ? "" : "C'est un parallélogramme particulier : ") + "le point d'intersection de ses diagonales est un centre de symétrie. Oui.") : Nom + " ne se superpose pas à lui-même après un demi-tour : non."
          };
        },
        2: () => {
          const NOMS = { 3: "triangle équilatéral", 4: "carré", 5: "pentagone régulier", 6: "hexagone régulier", 7: "heptagone régulier", 8: "octogone régulier", 9: "polygone régulier à 9 côtés", 10: "décagone régulier", 11: "polygone régulier à 11 côtés", 12: "dodécagone régulier" };
          const n = facile(2) ? choix([4, 6]) : ent(3, 12), oui = n % 2 === 0, nom = NOMS[n];
          return { enonce: "Un " + nom + " possède-t-il un centre de symétrie ?", reponse: oui ? "oui" : "non", correction: "Un polygone régulier à " + n + " côtés a un nombre " + (oui ? "pair de côtés : chaque sommet a un sommet opposé, donc il a un centre de symétrie." : "impair de côtés : un sommet se retrouve en face d'un côté après un demi-tour, donc il n'a pas de centre de symétrie.") };
        },
        3: () => {
          const l = choix("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")), oui = "HINOSXZ".includes(l);
          return { enonce: "La lettre « " + l + " » écrite en majuscule d'imprimerie possède-t-elle un centre de symétrie ?", reponse: oui ? "oui" : "non", correction: "Après un demi-tour, la lettre « " + l + " » " + (oui ? "se superpose à elle-même : oui." : "ne se superpose pas à elle-même : non.") };
        }
      }
    },
    {
      id: "sc-parallelogramme", chap: "sym", titre: "Le centre d'un parallélogramme", format: "nombre",
      niveaux: (function () {
        const NOMS = ["ABCD", "RSTU", "EFGH", "KLMN"];
        return {
          1: () => {
            const [A, B, C, D] = choix(NOMS).split(""), q = A + B + C + D;
            if (facile(1)) { const d = ent(2, 12); return { enonce: "Le quadrilatère $" + q + "$ est un parallélogramme de centre $O$ et $O" + A + " = " + d + "$ cm. Calculer $O" + C + "$.", reponse: d, unite: "cm", correction: "Les diagonales d'un parallélogramme ont le même milieu $O$ : $O" + C + " = O" + A + " = " + d + "$ cm." }; }
            const d = ent(2, 30);
            return { enonce: "Le quadrilatère $" + q + "$ est un parallélogramme de centre $O$ et $O" + A + " = " + d + "$ cm. Calculer $" + A + C + "$.", reponse: 2 * d, unite: "cm", correction: "Les diagonales d'un parallélogramme ont le même milieu $O$ : $O" + A + " = O" + C + " = " + d + "$ cm. Donc $" + A + C + " = 2 \\times " + d + " = " + 2 * d + "$ cm." };
          },
          2: () => {
            const [A, B, C, D] = choix(NOMS).split(""), q = A + B + C + D, diag = choix([[A, C], [B, D]]), l = facile(2) || Math.random() < 0.5 ? 2 * ent(2, 20) : net(2 * dec(2.1, 9.9)), r = net(l / 2);
            return { enonce: "Le quadrilatère $" + q + "$ est un parallélogramme de centre $O$ et $" + diag.join("") + " = " + L(l) + "$ cm. Calculer $O" + diag[0] + "$.", reponse: r, unite: "cm", correction: "Le centre $O$ est le milieu de la diagonale $[" + diag.join("") + "]$ : $O" + diag[0] + " = " + L(l) + " \\div 2 = " + L(r) + "$ cm." };
          },
          3: () => {
            const [A, B, C, D] = choix(NOMS).split(""), q = A + B + C + D, d1 = net(2 * dec(2.1, 9.9)), d2 = net(2 * dec(2.1, 9.9));
            if (Math.random() < 0.5) { const r = net(d1 / 2 + d2 / 2); return { enonce: "Le quadrilatère $" + q + "$ est un parallélogramme de centre $O$, avec $" + A + C + " = " + L(d1) + "$ cm et $" + B + D + " = " + L(d2) + "$ cm. Calculer $O" + A + " + O" + B + "$.", reponse: r, unite: "cm", correction: "$O" + A + " = " + L(d1) + " \\div 2 = " + L(net(d1 / 2)) + "$ cm et $O" + B + " = " + L(d2) + " \\div 2 = " + L(net(d2 / 2)) + "$ cm. Donc $O" + A + " + O" + B + " = " + L(net(d1 / 2)) + " + " + L(net(d2 / 2)) + " = " + L(r) + "$ cm." }; }
            const ob = dec(1.1, 9.9);
            return { enonce: "Le quadrilatère $" + q + "$ est un parallélogramme de centre $O$, avec $" + A + C + " = " + L(d1) + "$ cm et $O" + B + " = " + L(ob) + "$ cm. Calculer $" + B + D + "$.", reponse: net(2 * ob), unite: "cm", correction: "La longueur $" + A + C + "$ ne sert pas. $O$ est le milieu de $[" + B + D + "]$ : $" + B + D + " = 2 \\times " + L(ob) + " = " + L(net(2 * ob)) + "$ cm." };
          }
        };
      })()
    }
  ];

  Savoirs.enregistrerTechniques("5e", sym);
})();
