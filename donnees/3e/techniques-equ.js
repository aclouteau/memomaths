// Techniques d'entraînement de 3e : « Équations » (equ).
// D'après propositions/referentiels/3e/equ.json (lot 4) : les descriptions de niveau sont la spécification.
// Les solutions non entières sont attendues en fraction irréductible « a/b » ; pas de racine irrationnelle.
(function () {
  const { L, T, P, ent, choix, net, nonNul, facile, pgcd, polyTexte, polyLatex, substituer } = Savoirs.calculsOutils;
  const signe = () => choix([1, -1]);
  const pm = (a, b) => ent(a, b) * signe();
  // Fraction n/d : réduite, en texte ("-9/2" ou "4") et en LaTeX
  const red = (n, d) => { const g = pgcd(n, d) || 1, s = d < 0 ? -1 : 1; return [(s * n) / g, (s * d) / g]; };
  const fTexte = (n, d) => { const [a, b] = red(n, d); return b === 1 ? String(a) : a + "/" + b; };
  const fLatex = (n, d) => { const [a, b] = red(n, d); return b === 1 ? String(a) : (a < 0 ? "-" : "") + "\\dfrac{" + Math.abs(a) + "}{" + b + "}"; };
  const affine = (a, b) => polyLatex([a, b]);
  // Résolution rédigée de A x = B (A ≠ 0)
  const diviser = (A, B) => {
    const brut = "\\dfrac{" + L(B) + "}{" + L(A) + "}", s = fLatex(B, A);
    return "On divise par $" + L(A) + "$ : $x = " + brut + (brut !== s ? " = " + s : "") + "$. La solution est $" + s + "$.";
  };
  // ax + b = cx + d, rédigé
  function resoudre(a, b, c, d) {
    const A = a - c, B = d - b;
    const g = c === 0 ? "On isole le terme en $x$ : $" + (a === 1 ? "" : a === -1 ? "-" : a) + "x = " + d + " - " + P(b) + "$. On réduit : $" + (A === 1 ? "" : A === -1 ? "-" : A) + "x = " + B + "$. "
      : "On regroupe les termes en $x$ à gauche et les nombres à droite : $" + affine(a, 0) + " - " + (c < 0 ? "(" + affine(c, 0) + ")" : affine(c, 0)) + " = " + d + " - " + P(b) + "$. On réduit : $" + (A === 1 ? "" : A === -1 ? "-" : A) + "x = " + B + "$. ";
    return g + (A === 1 ? "La solution est $" + B + "$." : diviser(A, B));
  }

  const MULTIPLES = { 2: "double", 3: "triple", 4: "quadruple", 5: "quintuple" };

  const equ = [
    {
      id: "eq-lineaire", chap: "equ", titre: "Résoudre une équation du premier degré", format: "fraction",
      niveaux: {
        1: () => {
          const a = ent(2, 9), x = ent(1, 9), b = facile(1) ? 0 : nonNul(-12, 12), c = a * x + b;
          if (c <= 0) return equ[0].niveaux[1]();
          return { enonce: "Quelle est la solution de l'équation $" + affine(a, b) + " = " + c + "$ ?", reponse: String(x), correction: b === 0 ? diviser(a, c) : resoudre(a, b, 0, c) };
        },
        2: () => {
          if (facile(2)) return equ[0].niveaux[1]();
          for (;;) {
            const a = ent(1, 9), c = ent(1, 9), b = nonNul(-12, 12), x = nonNul(-9, 9);
            if (a === c) continue;
            const d = a * x + b - c * x;
            if (Math.abs(d) > 40) continue;
            return { enonce: "Quelle est la solution de l'équation $" + affine(a, b) + " = " + affine(c, d) + "$ ?", reponse: String(x), correction: resoudre(a, b, c, d) };
          }
        },
        3: () => {
          const fin = " Donner la solution sous la forme d'un entier ou d'une fraction irréductible.";
          for (;;) {
            const forme = Math.random();
            if (forme < 0.35) {
              const a = pm(2, 9), b = nonNul(-9, 9), c = nonNul(-30, 30), A = a, B = c - a * b, [n, d] = red(B, A);
              if (d > 12) continue;
              return { enonce: "Résoudre l'équation $" + a + "(" + affine(1, b) + ") = " + c + "$." + fin, reponse: fTexte(B, A), correction: "On développe : $" + affine(a, a * b) + " = " + c + "$. " + resoudre(a, a * b, 0, c) };
            }
            if (forme < 0.7) {
              const a = pm(1, 9), c = pm(1, 9), b = nonNul(-12, 12), d = nonNul(-12, 12);
              if (a === c) continue;
              const [n, den] = red(d - b, a - c);
              if (den > 12) continue;
              return { enonce: "Résoudre l'équation $" + affine(a, b) + " = " + affine(c, d) + "$." + fin, reponse: fTexte(d - b, a - c), correction: resoudre(a, b, c, d) };
            }
            const a = pm(2, 5), b = pm(1, 5), c = nonNul(-9, 9), d = pm(1, 9), e = nonNul(-12, 12);
            if (a * b === d) continue;
            const [n, den] = red(e - a * c, a * b - d);
            if (den > 12) continue;
            return { enonce: "Résoudre l'équation $" + a + "(" + affine(b, c) + ") = " + affine(d, e) + "$." + fin, reponse: fTexte(e - a * c, a * b - d), correction: "On développe : $" + affine(a * b, a * c) + " = " + affine(d, e) + "$. " + resoudre(a * b, a * c, d, e) };
          }
        }
      }
    },
    {
      id: "eq-produit-nul", chap: "equ", titre: "Résoudre une équation produit nul", format: "fraction",
      niveaux: Object.fromEntries([1, 2, 3].map((niveau) => [niveau, () => {
        for (;;) {
          let f1, f2; // facteurs [a, b] : ax + b
          if (niveau === 1) { const p = pm(1, 9), q = pm(1, 9); f1 = facile(1) ? [1, 0] : [1, p]; f2 = [1, q]; }
          else if (niveau === 2) { const a = ent(1, 5), c = ent(1, 5), s1 = nonNul(-9, 9), s2 = nonNul(-9, 9); f1 = facile(2) ? [1, 0] : [a, -a * s1]; f2 = [c, -c * s2]; if (a === 1 && c === 1) continue; }
          else {
            if (Math.random() < 0.3) { f1 = [1, 0]; f2 = [ent(2, 7), nonNul(-9, 9)]; }
            else { f1 = [ent(2, 7), nonNul(-9, 9)]; f2 = [ent(1, 7), nonNul(-9, 9)]; }
            if (pgcd(...f2) !== 1 || pgcd(...f1) !== 1 || (red(-f1[1], f1[0])[1] === 1 && red(-f2[1], f2[0])[1] === 1)) continue;
          }
          const s1 = [-f1[1], f1[0]], s2 = [-f2[1], f2[0]], v1 = s1[0] / s1[1], v2 = s2[0] / s2[1];
          if (v1 === v2) continue;
          const petite = Math.random() < 0.5, choisie = (petite ? v1 < v2 : v1 > v2) ? s1 : s2;
          const facteur = (f) => (f[1] === 0 && f[0] === 1 ? "x" : "(" + affine(f[0], f[1]) + ")");
          const ecrit = facteur(f1) + facteur(f2), resol = (f, s) => "$" + affine(f[0], f[1]) + " = 0$ donne " + (f[0] === 1 ? "$x = " + fLatex(...s) + "$" : "$" + f[0] + "x = " + -f[1] + "$, donc $x = " + fLatex(...s) + "$");
          return {
            enonce: "Résoudre l'équation $" + ecrit + " = 0$. Donner la " + (petite ? "plus petite" : "plus grande") + " solution" + (niveau === 3 ? " (entier ou fraction irréductible)." : "."),
            reponse: fTexte(...choisie),
            correction: "Un produit est nul si et seulement si l'un de ses facteurs est nul. " + resol(f1, s1) + " ; " + resol(f2, s2) + ". Les solutions sont $" + fLatex(...s1) + "$ et $" + fLatex(...s2) + "$. La " + (petite ? "plus petite" : "plus grande") + " est $" + fLatex(...choisie) + "$."
          };
        }
      }]))
    },
    {
      id: "eq-carre-nb", chap: "equ", titre: "Équations avec x²", format: "nombre",
      niveaux: {
        // Pas d'équation x² = a avec a négatif (décision de l'enseignant) : x² = s², solution positive
        1: () => {
          const s = facile(1) ? 1 : ent(2, 12);
          return {
            enonce: "Résoudre l'équation $x^{2} = " + s * s + "$. Quelle est la solution positive ?", reponse: s,
            correction: "On cherche les nombres dont le carré est $" + s * s + "$ : $" + s + "^{2} = " + s * s + "$ et $(-" + s + ")^{2} = " + s * s + "$. Donc $x = " + s + "$ ou $x = -" + s + "$. La solution positive est $" + s + "$."
          };
        },
        2: () => {
          const a = facile(2) ? 1 : ent(2, 9), s = ent(1, 12), b = a * s * s;
          return {
            enonce: "Résoudre l'équation $" + (a === 1 ? "" : a) + "x^{2} = " + b + "$. Quelle est la solution positive ?", reponse: s,
            correction: (a === 1 ? "" : "On divise par $" + a + "$ : $x^{2} = \\dfrac{" + b + "}{" + a + "} = " + s * s + "$. ") + "Donc $x = " + s + "$ ou $x = -" + s + "$. La solution positive est $" + s + "$."
          };
        },
        3: () => {
          // Pas de x² égal à un décimal (décision de l'enseignant) : ax² + b = c, solution entière
          const a = ent(1, 6), s = ent(2, 9), b = nonNul(-30, 30), c = a * s * s + b;
          return {
            enonce: "Résoudre l'équation $" + polyLatex([a, 0, b]) + " = " + c + "$. Quelle est la solution positive ?", reponse: s,
            correction: "On isole $x^{2}$ : $" + (a === 1 ? "" : a) + "x^{2} = " + c + " - " + P(b) + " = " + a * s * s + "$" + (a === 1 ? "" : ", puis $x^{2} = \\dfrac{" + a * s * s + "}{" + a + "} = " + s * s + "$") + ". Donc $x = " + s + "$ ou $x = -" + s + "$. La solution positive est $" + s + "$."
          };
        }
      }
    },
    {
      id: "eq-probleme", chap: "equ", titre: "Mettre un problème en équation", format: "nombre",
      niveaux: (function () {
        const double = () => { const x = ent(2, 20); return { enonce: "Le double d'un nombre est " + 2 * x + ". Quel est ce nombre ?", reponse: x, correction: "Soit $x$ le nombre. On a $2x = " + 2 * x + "$, donc $x = \\dfrac{" + 2 * x + "}{2} = " + x + "$." }; };
        return {
          1: () => {
            if (facile(1)) return double();
            const a = ent(2, 9), b = ent(1, 15), x = ent(1, 12), plus = Math.random() < 0.5, r = plus ? a * x + b : a * x - b;
            return {
              enonce: "Je pense à un nombre. Je le multiplie par " + a + ", puis " + (plus ? "j'ajoute " : "je soustrais ") + b + ". Je trouve " + T(r) + ". Quel est ce nombre ?", reponse: x,
              correction: "Soit $x$ le nombre. On a $" + affine(a, plus ? b : -b) + " = " + r + "$. " + resoudre(a, plus ? b : -b, 0, r)
            };
          },
          2: () => {
            if (facile(2)) return double();
            const cas = ent(1, 3);
            if (cas === 1) {
              const l = ent(2, 30), k = ent(1, 15), P2 = 2 * (l + l + k), longueur = Math.random() < 0.5;
              return {
                enonce: "La longueur d'un rectangle mesure " + k + " cm de plus que sa largeur. Son périmètre est " + P2 + " cm. Quelle est sa " + (longueur ? "longueur" : "largeur") + " ?", reponse: longueur ? l + k : l, unite: "cm",
                correction: "Soit $x$ la largeur, en cm. La longueur est $x + " + k + "$ et le périmètre est $2(x + x + " + k + ") = 4x + " + 2 * k + "$. On résout $4x + " + 2 * k + " = " + P2 + "$ : " + resoudre(4, 2 * k, 0, P2) + (longueur ? " La longueur est $" + l + " + " + k + " = " + (l + k) + "$ cm." : "")
              };
            }
            if (cas === 2) {
              const x = ent(-10, 40), s = 3 * x + 3;
              return { enonce: "La somme de trois nombres entiers consécutifs est " + T(s) + ". Quel est le plus petit de ces nombres ?", reponse: x, correction: "Soit $x$ le plus petit. Les trois nombres sont $x$, $x + 1$ et $x + 2$, de somme $3x + 3$. On résout $3x + 3 = " + s + "$ : " + resoudre(3, 3, 0, s) };
            }
            const k = ent(1, 10), x = ent(5, 40), s = 2 * x + k;
            return {
              enonce: "Marie a " + k + " an" + (k > 1 ? "s" : "") + " de plus que son frère. La somme de leurs âges est " + s + " ans. Quel âge a son frère ?", reponse: x, unite: "ans",
              correction: "Soit $x$ l'âge du frère, en années. Marie a $x + " + k + "$ ans et la somme des âges est $x + (x + " + k + ") = 2x + " + k + "$. On résout $2x + " + k + " = " + s + "$ : " + resoudre(2, k, 0, s)
            };
          },
          3: () => {
            if (Math.random() < 0.5) {
              for (;;) {
                const n = ent(4, 30), p = ent(3, 12), q = ent(3, 12), I = ent(0, 60);
                if (p === q) continue;
                const J = I + (p - q) * n;
                if (J < 0) continue;
                const club = (ins, prix) => (ins ? ins + " € d'inscription puis " + prix + " € par séance" : prix + " € par séance, sans inscription");
                return {
                  enonce: "Le club A demande " + club(I, p) + ". Le club B demande " + club(J, q) + ". Pour combien de séances les deux clubs coûtent-ils le même prix ?", reponse: n, unite: "séances",
                  correction: "Soit $x$ le nombre de séances. Prix au club A : $" + affine(p, I) + "$ ; au club B : $" + affine(q, J) + "$. On résout $" + affine(p, I) + " = " + affine(q, J) + "$ : " + resoudre(p, I, q, J)
                };
              }
            }
            for (;;) {
              const k = ent(2, 5), m = ent(2, 5), b = ent(1, 20), x = ent(1, 15);
              if (k === m) continue;
              const d = m * x - k * x - b;
              if (d <= 0) continue;
              return {
                enonce: "Le " + MULTIPLES[k] + " d'un nombre, augmenté de " + b + ", est égal au " + MULTIPLES[m] + " de ce nombre, diminué de " + d + ". Quel est ce nombre ?", reponse: x,
                correction: "Soit $x$ le nombre. On a $" + affine(k, b) + " = " + affine(m, -d) + "$. " + resoudre(k, b, m, -d)
              };
            }
          }
        };
      })()
    },
    {
      id: "eq-verif", chap: "equ", titre: "Un nombre est-il solution ?", format: "choix", options: ["oui", "non"],
      niveaux: (function () {
        function ex(gauche, droite, v) {
          const X = Savoirs.expressions, G = X.latex(gauche), D = X.latex(droite), g = X.evaluer(gauche, { x: v }), d = X.evaluer(droite, { x: v }), oui = g === d;
          return {
            enonce: choix(["Est-ce que $" + L(v) + "$ est une solution de l'équation $" + G + " = " + D + "$ ?", "Le nombre $" + L(v) + "$ est-il solution de l'équation $" + G + " = " + D + "$ ?"]),
            reponse: oui ? "oui" : "non",
            correction: "On remplace $x$ par $" + L(v) + "$. À gauche : $" + substituer(G, v) + " = " + L(g) + "$. À droite : $" + L(d) + "$" + (/x/.test(D) ? " (car $" + substituer(D, v) + " = " + L(d) + "$)" : "") + ". " +
              (oui ? "Les deux résultats sont égaux : $" + L(v) + "$ est solution." : "Les deux résultats sont différents : $" + L(v) + "$ n'est pas solution.")
          };
        }
        return {
          1: () => { const a = ent(2, 9), b = nonNul(-9, 9), v = facile(1) ? 0 : ent(1, 9), oui = Math.random() < 0.5, c = a * v + b + (oui ? 0 : pm(1, 5)); return ex(polyTexte([a, b]), String(c), v); },
          2: () => {
            for (;;) {
              const a = pm(1, 9), c = pm(1, 9), b = nonNul(-12, 12), v = facile(2) ? 0 : ent(-9, 9), oui = Math.random() < 0.5;
              if (a === c) continue;
              const d = a * v + b - c * v + (oui ? 0 : pm(1, 5));
              return ex(polyTexte([a, b]), polyTexte([c, d]), v);
            }
          },
          3: () => {
            const oui = Math.random() < 0.5;
            if (Math.random() < 0.5) {
              const a = pm(1, 4), b = pm(1, 9), v = nonNul(-7, 7), c = a * v * v + b * v + (oui ? 0 : pm(1, 5));
              return ex(polyTexte([a, b, 0]), String(c), v);
            }
            const p = pm(1, 9), q = pm(1, 9), v = oui ? choix([-p, -q]) : ent(-10, 10);
            const e = ex("(" + polyTexte([1, p]) + ")(" + polyTexte([1, q]) + ")", "0", v);
            return e;
          }
        };
      })()
    },
    {
      id: "eq-traduire", chap: "equ", titre: "Traduire un énoncé par une expression", format: "expression", forme: "quelconque",
      niveaux: {
        1: () => {
          if (facile(1)) return { enonce: "Soit $x$ un nombre. Écrire l'expression « le double de $x$ ».", reponse: "2x", correction: "Le double de $x$ s'écrit $2x$." };
          const k = ent(2, 5), b = ent(1, 12), plus = Math.random() < 0.5;
          return { enonce: "Soit $x$ un nombre. Écrire l'expression « le " + MULTIPLES[k] + " de $x$, " + (plus ? "augmenté" : "diminué") + " de " + b + " ».", reponse: polyTexte([k, plus ? b : -b]), correction: "Le " + MULTIPLES[k] + " de $x$ s'écrit $" + k + "x$ ; on " + (plus ? "ajoute " : "retranche ") + b + " : $" + polyLatex([k, plus ? b : -b]) + "$." };
        },
        2: () => {
          if (facile(2)) return { enonce: "Soit $x$ un nombre. Écrire l'expression « le carré de $x$ ».", reponse: "x^2", correction: "Le carré de $x$ s'écrit $x^{2}$." };
          const b = ent(1, 9), somme = Math.random() < 0.5, e = polyTexte([1, somme ? b : -b]), el = polyLatex([1, somme ? b : -b]);
          if (Math.random() < 0.3) return { enonce: "Soit $x$ un nombre. Écrire l'expression « le carré de la " + (somme ? "somme" : "différence") + " de $x$ et de " + b + " ».", reponse: "(" + e + ")^2", correction: "La " + (somme ? "somme" : "différence") + " de $x$ et de " + b + " s'écrit $" + el + "$ ; son carré s'écrit $(" + el + ")^{2}$." };
          const k = ent(2, 5);
          return { enonce: "Soit $x$ un nombre. Écrire l'expression « le " + MULTIPLES[k] + " de la " + (somme ? "somme" : "différence") + " de $x$ et de " + b + " ».", reponse: k + "(" + e + ")", correction: "La " + (somme ? "somme" : "différence") + " de $x$ et de " + b + " s'écrit $" + el + "$ ; le " + MULTIPLES[k] + " de cette " + (somme ? "somme" : "différence") + " s'écrit $" + k + "(" + el + ")$." };
        },
        3: () => {
          const cas = ent(1, 5);
          if (cas === 1) {
            const a = ent(1, 9), b = ent(1, 9), c = [3, b - a];
            return { enonce: "Léa a $x$ ans. Son frère a " + a + " an" + (a > 1 ? "s" : "") + " de moins qu'elle et sa sœur a " + b + " an" + (b > 1 ? "s" : "") + " de plus qu'elle. Donner la somme des âges des trois enfants, en fonction de $x$, sous forme réduite.", reponse: polyTexte(c), correction: "Léa a $x$ ans, son frère a $x - " + a + "$ ans et sa sœur a $x + " + b + "$ ans. La somme est $x + (x - " + a + ") + (x + " + b + ") = " + polyLatex(c) + "$." };
          }
          if (cas === 2) {
            const n = ent(3, 5), c = [n, n * (n - 1) / 2], termes = Array.from({ length: n }, (_, i) => (i ? "(x + " + i + ")" : "x"));
            return { enonce: "On note $x$ le plus petit de " + n + " nombres entiers consécutifs. Donner leur somme, en fonction de $x$, sous forme réduite.", reponse: polyTexte(c), correction: "Les nombres sont " + termes.map((t) => "$" + t.replace(/[()]/g, "") + "$").join(", ") + ". Leur somme est $" + termes.join(" + ") + " = " + polyLatex(c) + "$." };
          }
          if (cas === 3) {
            const k = ent(2, 4), m = ent(1, 9), c = [2 + 2 * k, 2 * m];
            return { enonce: "Un rectangle a pour largeur $x$ cm et sa longueur est égale à " + k + " fois sa largeur, plus " + m + " cm. Donner son périmètre, en fonction de $x$, sous forme réduite.", reponse: polyTexte(c), correction: "La longueur est $" + k + "x + " + m + "$. Le périmètre est $2(x + " + k + "x + " + m + ") = 2(" + (k + 1) + "x + " + m + ") = " + polyLatex(c) + "$." };
          }
          if (cas === 4) {
            const k = ent(2, 5), m = ent(1, 9), c = [k + 1, m];
            return { enonce: "Tom a $x$ billes. Léa a " + k + " fois plus de billes que Tom, plus " + m + ". Donner le nombre total de billes des deux enfants, en fonction de $x$, sous forme réduite.", reponse: polyTexte(c), correction: "Léa a $" + k + "x + " + m + "$ billes. Le total est $x + " + k + "x + " + m + " = " + polyLatex(c) + "$." };
          }
          return { enonce: "On note $2x$ le plus petit de deux nombres pairs consécutifs. Donner leur somme, en fonction de $x$, sous forme réduite.", reponse: "4x+2", correction: "Le nombre pair suivant est $2x + 2$. La somme est $2x + (2x + 2) = 4x + 2$." };
        }
      }
    },
    {
      id: "eq-factoriser", chap: "equ", titre: "Factoriser pour résoudre", format: "expression", forme: "factorisee",
      niveaux: {
        1: () => { const n = ent(2, 12); return { enonce: "Pour résoudre l'équation $x^{2} - " + n * n + " = 0$, on factorise d'abord son membre de gauche. Écrire cette factorisation.", reponse: "(x-" + n + ")(x+" + n + ")", correction: "C'est une différence de deux carrés : $x^{2} - " + n + "^{2} = (x - " + n + ")(x + " + n + ")$." }; },
        2: () => {
          for (;;) {
            const g = facile(2) ? 1 : ent(2, 7), c = ent(1, 4), d = pm(1, 9);
            if (pgcd(c, d) !== 1) continue;
            const gx = g === 1 ? "x" : g + "x";
            return { enonce: "Factoriser le membre de gauche de l'équation $" + polyLatex([g * c, g * d, 0]) + " = 0$ afin de la résoudre.", reponse: gx + "(" + polyTexte([c, d]) + ")", correction: "Le facteur commun est $" + gx + "$ : $" + polyLatex([g * c, g * d, 0]) + " = " + gx + "(" + polyLatex([c, d]) + ")$." };
          }
        },
        3: () => {
          if (Math.random() < 0.5) {
            const a = pm(1, 9);
            return { enonce: "Factoriser le membre de gauche de l'équation $" + polyLatex([1, 2 * a, a * a]) + " = 0$ afin de la résoudre.", reponse: "(" + polyTexte([1, a]) + ")^2", correction: "C'est le développement d'un carré : $" + polyLatex([1, 2 * a, a * a]) + " = x^{2} " + (a < 0 ? "-" : "+") + " 2 \\times x \\times " + Math.abs(a) + " + " + Math.abs(a) + "^{2} = (" + polyLatex([1, a]) + ")^{2}$." };
          }
          for (;;) {
            const a = pm(1, 8), n = ent(2, 9);
            if (Math.abs(a) === n) continue;
            const f1 = polyTexte([1, a - n]), f2 = polyTexte([1, a + n]), A = polyLatex([1, a]);
            return {
              enonce: "Factoriser le membre de gauche de l'équation $(" + A + ")^{2} - " + n * n + " = 0$ afin de la résoudre.", reponse: "(" + f1 + ")(" + f2 + ")",
              correction: "C'est une différence de deux carrés : $(" + A + ")^{2} - " + n + "^{2} = (" + A + " - " + n + ")(" + A + " + " + n + ") = (" + polyLatex([1, a - n]) + ")(" + polyLatex([1, a + n]) + ")$."
            };
          }
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("3e", equ);
})();
