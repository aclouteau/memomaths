// Techniques d'entraînement de 4e : « Translations » (transl).
// D'après propositions/referentiels/4e/transl.json (lot 1) : les descriptions de niveau sont la spécification.
// Notation de la classe : « translation de (+3 ; −2) », sans le mot vecteur.
(function () {
  const { L, P, ent, choix, net, nonNul, decimal, signeAuHasard, facile } = Savoirs.calculsOutils;
  const LETTRES = ["M", "P", "Q", "R", "S", "T", "N", "U"];
  const sg = (v) => (v < 0 ? L(v) : "+" + L(v)); // composante écrite avec son signe
  const translation = (a, b) => "$(" + sg(a) + " ; " + sg(b) + ")$";
  const point = (nom, x, y) => "$" + nom + "(" + L(x) + " ; " + L(y) + ")$";
  const plus = (v) => (v < 0 ? " - " + L(-v) : " + " + L(v));

  // Coordonnées tirées selon le niveau : niveau 1, entiers de −6 à 8 ; niveau 2, de −9 à 9 ; niveau 3, de −12 à 12
  const coord = (niveau) => (niveau === 1 ? ent(-6, 8) : niveau === 2 ? ent(-9, 9) : ent(-12, 12));
  // Niveau 3 : exactement un des nombres tirés devient un décimal à un chiffre (jamais entier)
  function unDecimal(nombres) {
    const i = ent(0, nombres.length - 1);
    nombres[i] = decimal(11.9, 1) * (nombres[i] < 0 ? -1 : nombres[i] > 0 ? 1 : signeAuHasard());
    return nombres;
  }
  // Contrôle des nombres négatifs : niveaux 1 et 2, aucun négatif dans le cas facile, au moins un sinon ;
  // niveau 3, au moins deux négatifs et un résultat de valeur absolue au plus 25
  function accepte(niveau, sansNegatif, nombres, r) {
    const neg = nombres.filter((x) => x < 0).length;
    if (niveau === 3) return neg >= 2 && Math.abs(r) <= 25;
    return sansNegatif ? neg === 0 : neg >= 1;
  }
  const quelle = (abscisse) => (abscisse ? "l'abscisse" : "l'ordonnée");

  function exImage(niveau) {
    const sansNegatif = facile(niveau);
    for (;;) {
      let n = niveau === 1 ? [ent(1, 8), ent(1, 8), coord(1), coord(1)] : niveau === 2 ? [nonNul(-9, 9), nonNul(-9, 9), coord(2), coord(2)] : [nonNul(-12, 12), nonNul(-12, 12), coord(3), coord(3)];
      if (niveau === 3) n = unDecimal(n);
      const [a, b, x, y] = n, abscisse = Math.random() < 0.5, r = net(abscisse ? x + a : y + b);
      if (!accepte(niveau, sansNegatif, n.concat([r]), r)) continue;
      const M = choix(LETTRES);
      return {
        enonce: "La translation de " + translation(a, b) + " transforme le point " + point(M, x, y) + " en $" + M + "'$. Quelle est " + quelle(abscisse) + " de $" + M + "'$ ?",
        reponse: r,
        correction: "Dans un repère, la translation de " + translation(a, b) + " ajoute $" + L(a) + "$ à l'abscisse et $" + L(b) + "$ à l'ordonnée : $(x ; y)$ devient $(x" + plus(a) + " ; y" + plus(b) + ")$. " +
          (abscisse ? "Abscisse" : "Ordonnée") + " de $" + M + "'$ : $" + L(abscisse ? x : y) + " + " + P(abscisse ? a : b) + " = " + L(r) + "$."
      };
    }
  }

  function exAntecedent(niveau) {
    const sansNegatif = facile(niveau);
    for (;;) {
      let n = niveau === 1 ? [ent(1, 8), ent(1, 8), coord(1), coord(1)] : niveau === 2 ? [nonNul(-9, 9), nonNul(-9, 9), coord(2), coord(2)] : [nonNul(-12, 12), nonNul(-12, 12), coord(3), coord(3)];
      if (niveau === 3) n = unDecimal(n);
      const [a, b, x, y] = n, x2 = net(x + a), y2 = net(y + b), abscisse = Math.random() < 0.5, r = abscisse ? x : y;
      if (!accepte(niveau, sansNegatif, [a, b, x2, y2, r], r)) continue;
      const M = choix(LETTRES), k = abscisse ? a : b;
      return {
        enonce: "Le point $" + M + "'$ de coordonnées $(" + L(x2) + " ; " + L(y2) + ")$ est l'image d'un point $" + M + "$ par la translation de " + translation(a, b) + ". Quelle est " + quelle(abscisse) + " de $" + M + "$ ?",
        reponse: r,
        correction: "La translation ajoute $" + L(a) + "$ à l'abscisse et $" + L(b) + "$ à l'ordonnée de $" + M + "$ ; pour revenir de $" + M + "'$ à $" + M + "$, on les retranche. " +
          (abscisse ? "Abscisse" : "Ordonnée") + " de $" + M + "$ : $" + L(abscisse ? x2 : y2) + " - " + P(k) + " = " + L(r) + "$."
      };
    }
  }

  function exDeplacement(niveau) {
    const sansNegatif = facile(niveau);
    for (;;) {
      let n = [coord(niveau), coord(niveau), coord(niveau), coord(niveau)];
      if (niveau === 3) n = unDecimal(n);
      const [xA, yA, xB, yB] = n;
      if (niveau === 1 && (xB <= xA || yB <= yA)) continue;
      const horizontal = Math.random() < 0.5, r = net(horizontal ? xB - xA : yB - yA);
      if (r === 0 || !accepte(niveau, sansNegatif, n, r)) continue;
      const mot = horizontal ? "abscisse" : "ordonnée";
      return {
        enonce: "Une translation transforme le point " + point("A", xA, yA) + " en " + point("B", xB, yB) + ". Quel est son déplacement " + (horizontal ? "horizontal" : "vertical") +
          " (de combien l'" + mot + " augmente ou diminue) ?",
        reponse: r,
        correction: "Déplacement " + (horizontal ? "horizontal" : "vertical") + " = " + mot + " d'arrivée − " + mot + " de départ : $" + L(horizontal ? xB : yB) + " - " + P(horizontal ? xA : yA) + " = " + L(r) + "$." +
          (r < 0 ? " Le résultat est négatif : l'" + mot + " diminue." : "")
      };
    }
  }

  function exImageAB(niveau) {
    const sansNegatif = facile(niveau);
    for (;;) {
      let n = Array.from({ length: 6 }, () => coord(niveau));
      if (niveau === 3) n = unDecimal(n);
      const [xA, yA, xB, yB, x, y] = n;
      if (niveau === 1 && (xB < xA || yB < yA)) continue;
      const abscisse = Math.random() < 0.5, d = net(abscisse ? xB - xA : yB - yA), r = net((abscisse ? x : y) + d);
      if (d === 0 || !accepte(niveau, sansNegatif, n.concat([r]), r)) continue;
      const M = choix(LETTRES);
      return {
        enonce: "La translation qui transforme " + point("A", xA, yA) + " en " + point("B", xB, yB) + " transforme " + point(M, x, y) + " en $" + M + "'$. Quelle est " + quelle(abscisse) + " de $" + M + "'$ ?",
        reponse: r,
        correction: "Déplacement " + (abscisse ? "horizontal" : "vertical") + " : $" + L(abscisse ? xB : yB) + " - " + P(abscisse ? xA : yA) + " = " + L(d) + "$. On l'ajoute à " + quelle(abscisse) +
          " de $" + M + "$ : $" + L(abscisse ? x : y) + " + " + P(d) + " = " + L(r) + "$."
      };
    }
  }

  function exParallelogramme(niveau) {
    const sansNegatif = facile(niveau);
    for (;;) {
      let n = Array.from({ length: 6 }, () => coord(niveau));
      if (niveau === 3) n = unDecimal(n);
      const [xA, yA, xB, yB, xC, yC] = n;
      // Trois points non alignés
      if (Math.abs((xB - xA) * (yC - yA) - (yB - yA) * (xC - xA)) < 1e-9) continue;
      const abscisse = Math.random() < 0.5, d = net(abscisse ? xC - xB : yC - yB), r = net((abscisse ? xA : yA) + d);
      if (d === 0 || !accepte(niveau, sansNegatif, n.concat([r]), r)) continue;
      return {
        enonce: "$ABCD$ est un parallélogramme avec " + point("A", xA, yA) + ", " + point("B", xB, yB) + " et " + point("C", xC, yC) + ". Quelle est " + quelle(abscisse) + " du point $D$ ?",
        reponse: r,
        correction: "$ABCD$ est un parallélogramme : la translation qui transforme $B$ en $C$ transforme $A$ en $D$. Déplacement " + (abscisse ? "horizontal" : "vertical") + " : $" +
          L(abscisse ? xC : yC) + " - " + P(abscisse ? xB : yB) + " = " + L(d) + "$ ; $" + (abscisse ? "x_D" : "y_D") + " = " + L(abscisse ? xA : yA) + " + " + P(d) + " = " + L(r) + "$."
      };
    }
  }

  // ---------- Périmètre ou aire d'une figure translatée ----------
  const LONGUEURS = "Une translation conserve les longueurs, donc l'image a le même périmètre : ";
  const AIRES = "Une translation conserve les aires, donc l'image a la même aire : ";
  const demandePerimetre = "Quel est le périmètre de son image (en cm) ?", demandeAire = "Quelle est l'aire de son image (en cm²) ?";
  const T = Savoirs.calculsOutils.T;
  function rectangle(a, b, aire) {
    return aire
      ? { enonce: "Un rectangle de " + T(a) + " cm sur " + T(b) + " cm est translaté. " + demandeAire, reponse: net(a * b), unite: "cm²", correction: AIRES + "$" + L(a) + " \\times " + L(b) + " = " + L(net(a * b)) + "$ cm²." }
      : { enonce: "Un rectangle de " + T(a) + " cm sur " + T(b) + " cm est translaté. " + demandePerimetre, reponse: net(2 * (a + b)), unite: "cm",
        correction: LONGUEURS + "$2 \\times (" + L(a) + " + " + L(b) + ")" + (Number.isInteger(a + b) && Number.isInteger(a) ? "" : " = 2 \\times " + L(net(a + b))) + " = " + L(net(2 * (a + b))) + "$ cm." };
  }
  function triangleRectangle(a, b) {
    const r = net((a * b) / 2);
    return {
      enonce: "Un triangle rectangle dont les côtés de l'angle droit mesurent " + T(a) + " cm et " + T(b) + " cm est translaté. " + demandeAire, reponse: r, unite: "cm²",
      correction: AIRES + "$\\dfrac{" + L(a) + " \\times " + L(b) + "}{2} = " + (Number.isInteger(a) && Number.isInteger(b) ? "" : "\\dfrac{" + L(net(a * b)) + "}{2} = ") + L(r) + "$ cm²."
    };
  }
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };

  const transl = [
    { id: "image-point", chap: "transl", titre: "Coordonnées de l'image d'un point", format: "nombre", niveaux: { 1: () => exImage(1), 2: () => exImage(2), 3: () => exImage(3) } },
    { id: "antecedent", chap: "transl", titre: "Retrouver le point de départ", format: "nombre", niveaux: { 1: () => exAntecedent(1), 2: () => exAntecedent(2), 3: () => exAntecedent(3) } },
    { id: "deplacement", chap: "transl", titre: "Déplacement d'une translation", format: "nombre", niveaux: { 1: () => exDeplacement(1), 2: () => exDeplacement(2), 3: () => exDeplacement(3) } },
    { id: "image-ab", chap: "transl", titre: "Image d'un point, déplacement donné par deux points", format: "nombre", niveaux: { 1: () => exImageAB(1), 2: () => exImageAB(2), 3: () => exImageAB(3) } },
    { id: "parallelogramme", chap: "transl", titre: "Quatrième sommet d'un parallélogramme", format: "nombre", niveaux: { 1: () => exParallelogramme(1), 2: () => exParallelogramme(2), 3: () => exParallelogramme(3) } },
    {
      id: "conservation", chap: "transl", titre: "Périmètre ou aire d'une figure translatée", format: "nombre",
      niveaux: {
        1: () => {
          const cas = ent(1, 4);
          if (cas <= 2) { const a = ent(3, 12); return rectangle(a, ent(2, a - 1), cas === 2); }
          const c = ent(3, 15);
          return cas === 3
            ? { enonce: "Un carré de côté " + c + " cm est translaté. " + demandePerimetre, reponse: 4 * c, unite: "cm", correction: "Une translation conserve les longueurs, donc l'image est un carré de côté " + c + " cm : $4 \\times " + c + " = " + 4 * c + "$ cm." }
            : { enonce: "Un carré de côté " + c + " cm est translaté. " + demandeAire, reponse: c * c, unite: "cm²", correction: "Une translation conserve les aires, donc l'image est un carré de côté " + c + " cm : $" + c + " \\times " + c + " = " + c * c + "$ cm²." };
        },
        2: () => {
          const cas = ent(1, 4);
          if (cas <= 2) return rectangle(dec(1.5, 12), ent(2, 9), cas === 2);
          if (cas === 3) { let a, b; do { a = ent(3, 15); b = ent(3, 15); } while (a === b); return triangleRectangle(a, b); }
          let a, b, c;
          do { a = ent(3, 15); b = ent(3, 15); c = ent(3, 15); } while (a === b || b === c || a === c || a + b <= c || a + c <= b || b + c <= a);
          return {
            enonce: "Un triangle dont les côtés mesurent " + a + " cm, " + b + " cm et " + c + " cm est translaté. " + demandePerimetre, reponse: a + b + c, unite: "cm",
            correction: LONGUEURS + "$" + a + " + " + b + " + " + c + " = " + (a + b + c) + "$ cm."
          };
        },
        3: () => {
          const cas = ent(1, 3);
          if (cas === 1) return triangleRectangle(dec(1.5, 12), dec(1.5, 12));
          if (cas === 2) {
            let a, b;
            do { a = dec(1.5, 12); b = dec(1.5, 12); } while (a === b);
            return {
              enonce: "Un parallélogramme de côtés " + T(a) + " cm et " + T(b) + " cm est translaté. " + demandePerimetre, reponse: net(2 * (a + b)), unite: "cm",
              correction: LONGUEURS + "$2 \\times (" + L(a) + " + " + L(b) + ") = 2 \\times " + L(net(a + b)) + " = " + L(net(2 * (a + b))) + "$ cm."
            };
          }
          return rectangle(dec(1.5, 9.9), dec(1.5, 9.9), true);
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("4e", transl);
})();
