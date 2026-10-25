// Techniques d'entraînement de 4e : « Rotations » (rot).
// D'après propositions/referentiels/4e/rot.json (lot 2) : les descriptions de niveau sont la spécification.
// Les coordonnées par un quart de tour autour de l'origine sont gardées en 4e (décision de l'enseignant).
(function () {
  const { L, T, ent, choix, net, nonNul, decimal, facile, signeAuHasard } = Savoirs.calculsOutils;

  // ---------- Polygones réguliers ----------
  const NOMS = { 3: "triangle équilatéral", 4: "carré", 5: "pentagone régulier", 6: "hexagone régulier", 8: "octogone régulier", 10: "décagone régulier" };
  const nomPolygone = (n) => (NOMS[n] && Math.random() < 0.7 ? NOMS[n] : "polygone régulier à " + n + " côtés");
  // Lettres des sommets : consécutives, sans O (c'est le centre)
  const ALPHABET = "ABCDEFGHIJKLMNPQRSTUVWXYZ";
  const sommets = (n) => { const d = ent(0, ALPHABET.length - n); return ALPHABET.slice(d, d + n).split(""); };
  const ORDINAUX = { 2: "deuxième", 3: "troisième" };

  // ---------- Figures transformées par une rotation ----------
  const TRIANGLES = ["ABC", "DEF", "MNP", "RST", "GHI"], QUADRILATERES = ["ABCD", "EFGH", "MNPQ", "RSTU"];
  const prime = (nom) => nom.split("").map((l) => l + "'").join("");
  const image = (sorte, nom) => " Son image par une rotation est le " + sorte + " $" + prime(nom) + "$.";
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  function exTriangle(c) {
    const nom = choix(TRIANGLES), [A, B, C] = nom.split(""), p = net(c[0] + c[1] + c[2]);
    return {
      enonce: "Un triangle $" + nom + "$ a pour côtés $" + A + B + " = " + L(c[0]) + "$ cm, $" + B + C + " = " + L(c[1]) + "$ cm et $" + A + C + " = " + L(c[2]) + "$ cm." + image("triangle", nom) +
        " Quel est le périmètre de $" + prime(nom) + "$ ?",
      reponse: p, unite: "cm", correction: "Une rotation conserve les longueurs, donc le périmètre : $" + c.map(L).join(" + ") + " = " + L(p) + "$ cm."
    };
  }
  function exRectangle(a, b, aire) {
    const nom = choix(QUADRILATERES), r = aire ? net(a * b) : net(2 * (a + b));
    return {
      enonce: "Un rectangle $" + nom + "$ mesure " + T(a) + " cm de long et " + T(b) + " cm de large." + image("rectangle", nom) + " Quel" + (aire ? "le est l'aire" : " est le périmètre") + " de $" + prime(nom) + "$ ?",
      reponse: r, unite: aire ? "cm²" : "cm",
      correction: aire ? "Une rotation conserve les aires : $" + L(a) + " \\times " + L(b) + " = " + L(r) + "$ cm²." : "Une rotation conserve les longueurs : $2 \\times (" + L(a) + " + " + L(b) + ") = " + L(r) + "$ cm."
    };
  }
  function exCarre(c, aire) {
    const nom = choix(QUADRILATERES), r = aire ? net(c * c) : net(4 * c);
    return {
      enonce: "Un carré $" + nom + "$ a pour côté " + T(c) + " cm." + image("carré", nom) + " Quel" + (aire ? "le est l'aire" : " est le périmètre") + " de $" + prime(nom) + "$ ?",
      reponse: r, unite: aire ? "cm²" : "cm",
      correction: aire ? "Une rotation conserve les aires : $" + L(c) + " \\times " + L(c) + " = " + L(r) + "$ cm²." : "Une rotation conserve les longueurs : $4 \\times " + L(c) + " = " + L(r) + "$ cm."
    };
  }
  // Trois côtés qui forment un vrai triangle
  function cotesTriangle(tirer) { for (;;) { const c = [tirer(), tirer(), tirer()], [a, b, d] = c.slice().sort((x, y) => x - y); if (a + b > d) return c; } }

  // ---------- Coordonnées ----------
  const M = (x, y) => "(" + L(x) + "\\,;\\," + L(y) + ")";
  const ROTATIONS = {
    demi: { angle: "d'angle 180°", regle: "La rotation d'angle 180° est la symétrie centrale de centre $O$ : $(x\\,;\\,y)$ devient $(-x\\,;\\,-y)$.", f: (x, y) => [-x, -y] },
    direct: { angle: "d'angle 90° dans le sens contraire des aiguilles d'une montre", regle: "Pour un quart de tour direct (sens contraire des aiguilles d'une montre) : $(x\\,;\\,y)$ devient $(-y\\,;\\,x)$.", f: (x, y) => [-y, x] },
    horaire: { angle: "d'angle 90° dans le sens des aiguilles d'une montre", regle: "Pour un quart de tour dans le sens des aiguilles d'une montre : $(x\\,;\\,y)$ devient $(y\\,;\\,-x)$.", f: (x, y) => [y, -x] }
  };
  function exCoordonnees(rot, x, y, inverse) {
    const R = ROTATIONS[rot], abscisse = Math.random() < 0.5, mot = abscisse ? "l'abscisse" : "l'ordonnée";
    const [x2, y2] = R.f(x, y).map((v) => net(v) + 0);
    if (inverse) {
      const r = abscisse ? x : y;
      return {
        enonce: "Dans un repère orthonormé d'origine $O$, le point $M'" + M(x2, y2) + "$ est l'image du point $M$ par la rotation de centre $O$ et " + R.angle + ". Quelle est " + mot + " de $M$ ?",
        reponse: r,
        correction: R.regle + " On cherche $(x\\,;\\,y)$ tel que l'image soit $" + M(x2, y2) + "$. Ici $M" + M(x, y) + "$ : " + mot + " de $M$ est " + T(r) + "."
      };
    }
    const r = abscisse ? x2 : y2;
    return {
      enonce: "Dans un repère orthonormé d'origine $O$, on place le point $M" + M(x, y) + "$. Le point $M'$ est l'image de $M$ par la rotation de centre $O$ et " + R.angle + ". Quelle est " + mot + " de $M'$ ?",
      reponse: r, correction: R.regle + " Ici $M'" + M(x2, y2) + "$ : " + mot + " de $M'$ est " + T(r) + "."
    };
  }

  const rot = [
    {
      id: "angle-poly", chap: "rot", titre: "Angle d'une rotation d'un polygone régulier", format: "nombre",
      niveaux: {
        1: () => {
          const n = choix([3, 4, 5, 6, 8, 9, 10, 12]), nom = nomPolygone(n), r = 360 / n;
          const s = sommets(n), lettres = Math.random() < 0.5;
          return {
            enonce: lettres ? "Le " + nom + " $" + s.join("") + "$ a pour centre $O$. Quel est l'angle de la rotation de centre $O$ qui envoie $" + s[0] + "$ sur $" + s[1] + "$ ?"
              : "Un " + nom + " a pour centre $O$. Quel est l'angle de la rotation de centre $O$ qui envoie chaque sommet sur le sommet suivant ?",
            reponse: r, unite: "°", correction: "L'angle est $\\dfrac{360^{\\circ}}{n}$. Ici $n = " + n + "$ : $360 \\div " + n + " = " + r + "$."
          };
        },
        2: () => {
          for (;;) {
            const n = choix([5, 6, 8, 9, 10, 12]), demiTour = facile(2), k = demiTour ? n / 2 : ent(2, Math.ceil(n / 2) - 1);
            if (!Number.isInteger(k) || k >= n / 2 && !demiTour) continue;
            const s = sommets(n), pas = 360 / n, r = k * pas;
            return {
              enonce: "Le " + nomPolygone(n) + " $" + s.join("") + "$ a pour centre $O$. Quel est l'angle de la rotation de centre $O$ qui envoie $" + s[0] + "$ sur $" + s[k] + "$ (dans le sens direct) ?",
              reponse: r, unite: "°",
              correction: "Chaque sommet est à $\\dfrac{360^{\\circ}}{" + n + "} = " + pas + "^{\\circ}$ du suivant. De $" + s[0] + "$ à $" + s[k] + "$, il y a " + k + " « pas » : $" + k + " \\times " + pas + " = " + r + "$."
            };
          }
        },
        3: () => {
          if (Math.random() < 0.4) {
            const a = choix([24, 20, 18, 15, 12, 10, 9]), n = 360 / a;
            return {
              enonce: "Une rotation d'angle $" + a + "^{\\circ}$ envoie chaque sommet d'un polygone régulier de centre $O$ sur le sommet suivant. Combien ce polygone a-t-il de côtés ?",
              reponse: n, unite: "côtés", correction: "Le polygone a $n$ côtés avec $\\dfrac{360^{\\circ}}{n} = " + a + "^{\\circ}$ donc $n = 360 \\div " + a + " = " + n + "$."
            };
          }
          const n = choix([8, 9, 10, 12, 15, 18, 20, 24]), k = ent(2, 3), pas = 360 / n, a = k * pas;
          return {
            enonce: "Dans un polygone régulier de centre $O$, la rotation de centre $O$ et d'angle $" + a + "^{\\circ}$ (sens direct) envoie le sommet $A$ sur le " + ORDINAUX[k] +
              " sommet suivant, en comptant dans le sens direct. Combien ce polygone a-t-il de côtés ?",
            reponse: n, unite: "côtés",
            correction: "Un « pas » vaut $\\dfrac{" + a + "}{" + k + "} = " + pas + "^{\\circ}$ ; le tour complet fait $360 \\div " + pas + " = " + n + "$ pas, soit $" + n + "$ côtés."
          };
        }
      }
    },
    {
      id: "rot-conserve", chap: "rot", titre: "Ce que conserve une rotation", format: "nombre",
      niveaux: {
        1: () => {
          if (facile(1)) {
            const l = ent(2, 15), nom = choix(["AB", "CD", "EF", "MN"]);
            return {
              enonce: "Un segment $[" + nom + "]$ mesure " + l + " cm. Son image par une rotation est le segment $[" + prime(nom) + "]$. Quelle est la longueur $" + prime(nom) + "$ ?",
              reponse: l, unite: "cm", correction: "Une rotation conserve les longueurs : $" + prime(nom) + " = " + nom + " = " + l + "$ cm."
            };
          }
          const cas = ent(1, 5);
          if (cas === 1) return exTriangle(cotesTriangle(() => ent(2, 15)));
          if (cas <= 3) { let a, b; do { a = ent(2, 20); b = ent(2, 20); } while (a === b); return exRectangle(Math.max(a, b), Math.min(a, b), cas === 3); }
          return exCarre(ent(2, 16), cas === 5);
        },
        2: () => {
          if (facile(2)) {
            const a = ent(21, 169), nom = choix(TRIANGLES), [A, B, C] = nom.split("");
            return {
              enonce: "Dans un triangle $" + nom + "$, l'angle $\\widehat{" + A + B + C + "}$ mesure " + a + "°." + image("triangle", nom) + " Combien mesure l'angle $\\widehat{" + A + "'" + B + "'" + C + "'}$ ?",
              reponse: a, unite: "°", correction: "Une rotation conserve les angles : $\\widehat{" + A + "'" + B + "'" + C + "'} = \\widehat{" + A + B + C + "} = " + a + "^{\\circ}$."
            };
          }
          const cas = ent(1, 3);
          if (cas === 1) return exTriangle(cotesTriangle(() => dec(1.2, 12)));
          let a, b;
          const aire = cas === 3;
          do { a = dec(1.2, 15); b = aire && Math.random() < 0.5 ? ent(2, 12) : dec(1.2, 15); } while (a === b);
          return exRectangle(Math.max(a, b), Math.min(a, b), aire);
        },
        3: () => {
          const cas = ent(1, 3);
          if (cas === 1) {
            let a, b;
            do { a = ent(20, 110); b = ent(20, 110); } while (a + b > 150);
            const nom = choix(TRIANGLES), [A, B, C] = nom.split(""), r = 180 - a - b;
            return {
              enonce: "Dans un triangle $" + nom + "$, l'angle en $" + A + "$ mesure " + a + "° et l'angle en $" + B + "$ mesure " + b + "°." + image("triangle", nom) + " Combien mesure l'angle en $" + C + "'$ ?",
              reponse: r, unite: "°", correction: "L'angle en $" + C + "'$ est égal à l'angle en $" + C + "$ (conservation des angles). Dans $" + nom + "$ : $180 - " + a + " - " + b + " = " + r + "$°."
            };
          }
          if (cas === 2) {
            // Triangle rectangle : un côté de l'image, avec Pythagore
            const base = choix([[5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37], [10, 24, 26], [15, 36, 39],
              [18, 24, 30], [16, 30, 34], [21, 28, 35], [24, 32, 40], [3, 4, 5], [6, 8, 10]]);
            const t = Math.random() < 0.3 ? base.map((x) => x / 2) : base;
            const nom = choix(TRIANGLES), [A, B, C] = nom.split(""), hyp = Math.random() < 0.5;
            const enonce = "Le triangle $" + nom + "$ est rectangle en $" + A + "$ avec " + (hyp ? "$" + A + B + " = " + L(t[0]) + "$ cm et $" + A + C + " = " + L(t[1]) + "$ cm."
              : "$" + B + C + " = " + L(t[2]) + "$ cm et $" + A + B + " = " + L(t[0]) + "$ cm.") + image("triangle", nom) +
              " Quelle est la longueur $" + (hyp ? B + "'" + C + "'" : A + "'" + C + "'") + "$ (en cm) ?";
            const r = hyp ? t[2] : t[1], s = hyp ? net(t[0] * t[0] + t[1] * t[1]) : net(t[2] * t[2] - t[0] * t[0]);
            return {
              enonce: enonce, reponse: r, unite: "cm",
              correction: "Une rotation conserve les longueurs : $" + (hyp ? B + "'" + C + "' = " + B + C : A + "'" + C + "' = " + A + C) + "$. D'après le théorème de Pythagore dans $" + nom + "$ rectangle en $" + A + "$ : " +
                (hyp ? "$" + B + C + "^{2} = " + L(t[0]) + "^{2} + " + L(t[1]) + "^{2} = " + L(s) + "$, donc $" + B + C + " = \\sqrt{" + L(s) + "} = " + L(r) + "$ cm."
                  : "$" + A + C + "^{2} = " + L(t[2]) + "^{2} - " + L(t[0]) + "^{2} = " + L(s) + "$, donc $" + A + C + " = \\sqrt{" + L(s) + "} = " + L(r) + "$ cm.")
            };
          }
          const b = dec(1.1, 15), h = ent(2, 15), r = net((b * h) / 2), nom = choix(TRIANGLES), [A, B] = nom.split("");
          return {
            enonce: "Le triangle $" + nom + "$ a pour base $" + A + B + " = " + L(b) + "$ cm et pour hauteur correspondante " + h + " cm." + image("triangle", nom) + " Quelle est l'aire de $" + prime(nom) + "$ ?",
            reponse: r, unite: "cm²", correction: "Une rotation conserve les aires : $\\dfrac{" + L(b) + " \\times " + h + "}{2} = " + L(r) + "$ cm²."
          };
        }
      }
    },
    {
      id: "rot-coord", chap: "rot", titre: "Coordonnées de l'image par une rotation de centre O", format: "nombre",
      niveaux: {
        1: () => {
          let x = nonNul(-9, 9), y = nonNul(-9, 9);
          // Cas facile : le point est sur un axe
          if (facile(1)) { if (Math.random() < 0.5) x = 0; else y = 0; }
          return exCoordonnees("demi", x, y);
        },
        2: () => exCoordonnees(facile(2) ? "demi" : choix(["direct", "horaire"]), nonNul(-9, 9), nonNul(-9, 9)),
        3: () => {
          let x, y;
          do { x = decimal(9.9, 1) * signeAuHasard(); y = (Math.random() < 0.5 ? decimal(9.9, 1) : ent(1, 9)) * signeAuHasard(); } while (Number.isInteger(x) && Number.isInteger(y));
          if (Math.random() < 0.5) [x, y] = [y, x];
          return exCoordonnees(choix(["direct", "horaire"]), x, y, Math.random() < 0.3);
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("4e", rot);
})();
