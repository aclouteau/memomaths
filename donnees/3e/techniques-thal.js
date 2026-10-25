// Techniques d'entraînement de 3e : « Théorème de Thalès » (thal).
// D'après propositions/referentiels/3e/thal.json (lot 4) : les descriptions de niveau sont la spécification.
// La configuration est montrée sur une figure (js/moteur/schemas.js) ; l'énoncé ne garde que le parallélisme et les longueurs.
(function () {
  const { L, T, ent, choix, net, decimales, facile, pgcd } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const D = (a, b) => "\\dfrac{" + a + "}{" + b + "}";
  // Cinq lettres distinctes : sommet A, points B et C du grand triangle, M et N sur les côtés
  function lettres() { const l = melanger("ABCDEFGHIJKLMNPQRSTUVWZ".split("")).slice(0, 5); return { A: l[0], B: l[1], C: l[2], M: l[3], N: l[4] }; }
  // Rapport p/q irréductible (p < q)
  function rapport(niveau, qMax) {
    if (facile(niveau)) return [1, 2];
    for (;;) { const q = ent(2, qMax), p = ent(1, Math.min(5, q - 1)); if (pgcd(p, q) === 1 && !(p === 1 && q === 2)) return [p, q]; }
  }
  const phrase = (t) => "Sur la figure, les droites $(" + t.M + t.N + ")$ et $(" + t.B + t.C + ")$ sont parallèles.";
  const figure = (t, k, papillon) => Savoirs.schemas.thales({ noms: t, k: k, papillon: papillon });
  const thales =(t) => "d'après le théorème de Thalès, $" + D(t.A + t.M, t.A + t.B) + " = " + D(t.A + t.N, t.A + t.C) + " = " + D(t.M + t.N, t.B + t.C) + "$";

  // Longueurs d'une configuration : grand triangle (AB, AC, BC) et petit (AM, AN, MN), rapport p/q.
  // unite : 1 (entiers) ou 0,1 (décimaux)
  function longueurs(p, q, decimales10) {
    const u = decimales10 ? 0.1 : 1;
    for (;;) {
      const k = [ent(decimales10 ? 10 : 1, decimales10 ? 60 : 9), ent(decimales10 ? 10 : 1, decimales10 ? 60 : 9), ent(decimales10 ? 10 : 1, decimales10 ? 60 : 9)];
      const grand = k.map((x) => net(x * q * u)), petit = k.map((x) => net(x * p * u));
      const [a, b, c] = grand;
      if (a + b <= c || a + c <= b || b + c <= a) continue;
      if (decimales10 && ![...grand, ...petit].some((x) => !Number.isInteger(x))) continue;
      return { AB: grand[0], AC: grand[1], BC: grand[2], AM: petit[0], AN: petit[1], MN: petit[2] };
    }
  }

  const thal = [
    {
      id: "thales-longueur", chap: "thal", titre: "Calculer une longueur avec Thalès", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((niveau) => [niveau, () => {
        for (;;) {
          const [p, q] = rapport(niveau, niveau === 1 ? 9 : 9), l = longueurs(p, q, niveau > 1 && Math.random() < (niveau === 2 ? 1 : 0.5)), t = lettres();
          // Deux rapports utilisés, et l'inconnue parmi leurs quatre longueurs
          const paires = melanger([["AM", "AB"], ["AN", "AC"], ["MN", "BC"]]).slice(0, 2);
          const nom = (c) => c.split("").map((x) => t[x]).join("");
          const inconnue = choix([0, 1, 2, 3]), quatre = [paires[0][0], paires[0][1], paires[1][0], paires[1][1]];
          const cible = quatre[inconnue], r = l[cible];
          const forme = niveau === 3 ? choix(["papillon", "papillon", "somme", "difference"]) : "simple";
          // Les côtés donnés directement (sauf l'inconnue)
          const donnees = quatre.filter((_, i) => i !== inconnue);
          let enonce, avant = "";
          const config = forme === "papillon"
            ? "Sur la figure, les droites $(" + t.M + t.B + ")$ et $(" + t.N + t.C + ")$ se coupent en $" + t.A + "$ et les droites $(" + t.M + t.N + ")$ et $(" + t.B + t.C + ")$ sont parallèles."
            : phrase(t);
          let listeDonnees = donnees.map((c) => "$" + nom(c) + " = " + L(l[c]) + "$ cm");
          if (forme === "somme" || forme === "difference") {
            // Une des longueurs AB ou AC est remplacée : AB = AM + MB, ou AM = AB − MB
            const cote = donnees.find((c) => c === "AB" || c === "AC" || c === "AM" || c === "AN");
            if (!cote) continue;
            const grandCote = cote === "AB" || cote === "AM" ? "AB" : "AC", petitCote = grandCote === "AB" ? "AM" : "AN";
            const reste = net(l[grandCote] - l[petitCote]), nomReste = t[petitCote[1]] + t[grandCote[1]];
            if (forme === "somme" && cote === grandCote && !donnees.includes(petitCote)) {
              listeDonnees = donnees.filter((c) => c !== grandCote).map((c) => "$" + nom(c) + " = " + L(l[c]) + "$ cm").concat(["$" + nom(petitCote) + " = " + L(l[petitCote]) + "$ cm", "$" + nomReste + " = " + L(reste) + "$ cm"]);
              avant = "On a $" + nom(grandCote) + " = " + nom(petitCote) + " + " + nomReste + " = " + L(l[petitCote]) + " + " + L(reste) + " = " + L(l[grandCote]) + "$ cm. ";
            } else if (forme === "difference" && cote === petitCote && !donnees.includes(grandCote)) {
              listeDonnees = donnees.filter((c) => c !== petitCote).map((c) => "$" + nom(c) + " = " + L(l[c]) + "$ cm").concat(["$" + nomReste + " = " + L(reste) + "$ cm", "$" + nom(grandCote) + " = " + L(l[grandCote]) + "$ cm"]);
              avant = "On a $" + nom(petitCote) + " = " + nom(grandCote) + " - " + nomReste + " = " + L(l[grandCote]) + " - " + L(reste) + " = " + L(l[petitCote]) + "$ cm. ";
            } else continue;
          }
          enonce = config + " On donne " + listeDonnees.slice(0, -1).join(", ") + " et " + listeDonnees[listeDonnees.length - 1] + ". " + choix(["Calculer la longueur $" + nom(cible) + "$.", "Quelle est la longueur $" + nom(cible) + "$ ?"]);
          // Égalité utilisée et produit en croix
          const [a, b] = paires[0], [c, d] = paires[1], val = (x) => (x === cible ? nom(x) : L(l[x]));
          const egalite = "$" + D(val(a), val(b)) + " = " + D(val(c), val(d)) + "$";
          // cible = (produit des deux termes « en croix ») ÷ le dernier
          const croix = { 0: [b, c, d], 1: [a, d, c], 2: [a, d, b], 3: [b, c, a] }[inconnue];
          const produit = net(l[croix[0]] * l[croix[1]]);
          if (Math.abs(net(produit / l[croix[2]]) - r) > 1e-9) continue;
          return {
            enonce: enonce, schema: figure(t, p / q, forme === "papillon"), reponse: r, unite: "cm",
            correction: (forme === "papillon" ? "Les droites $(" + t.M + t.B + ")$ et $(" + t.N + t.C + ")$ se coupent en $" + t.A + "$ et $(" + t.M + t.N + ") \\parallel (" + t.B + t.C + ")$ : "
              : "Les points $" + t.M + "$ et $" + t.N + "$ sont sur $[" + t.A + t.B + "]$ et $[" + t.A + t.C + "]$ et $(" + t.M + t.N + ") \\parallel (" + t.B + t.C + ")$ : ") + thales(t) + ". " + avant +
              "On remplace par les valeurs : " + egalite + ". Donc $" + nom(cible) + " = " + D(L(l[croix[0]]) + " \\times " + L(l[croix[1]]), L(l[croix[2]])) + " = " + D(L(produit), L(l[croix[2]])) + " = " + L(r) + "$ cm."
          };
        }
      }]))
    },
    {
      id: "thales-parallele-oui-non", chap: "thal", titre: "Les droites sont-elles parallèles ?", format: "choix", options: ["parallèles", "non parallèles"],
      niveaux: Object.fromEntries([1, 2, 3].map((niveau) => [niveau, () => {
        const oui = Math.random() < 0.5;
        for (;;) {
          const [p, q] = rapport(niveau, 9), u = niveau === 1 ? 1 : 0.1, t = lettres();
          const k1 = niveau === 1 ? ent(1, 9) : ent(10, 60), k2 = niveau === 1 ? ent(1, 9) : ent(10, 60);
          const AB = net(q * k1 * u), AM = net(p * k1 * u), AC = net(q * k2 * u);
          let AN = net(p * k2 * u);
          if (!oui) AN = net(AN + (niveau === 1 ? ent(1, 3) : niveau === 2 ? ent(1, 3) / 10 : 0) * choix([1, -1]));
          let NC = net(AC - AN);
          if (!oui && niveau === 3) { NC = net(NC + ent(1, 3) / 10 * choix([1, -1])); }
          const ACv = niveau === 3 ? net(AN + NC) : AC;
          if (AN <= 0 || NC <= 0 || AN >= ACv) continue;
          if (niveau > 1 && ![AB, AM, AN, ACv].some((x) => !Number.isInteger(x))) continue;
          const egaux = Math.abs(AM * ACv - AB * AN) < 1e-9;
          if (egaux !== oui) continue;
          const n = (a, b) => t[a] + t[b], MN = "(" + t.M + t.N + ")", BC = "(" + t.B + t.C + ")";
          const donnees = niveau === 3
            ? "$" + n("A", "M") + " = " + L(AM) + "$ cm, $" + n("M", "B") + " = " + L(net(AB - AM)) + "$ cm, $" + n("A", "N") + " = " + L(AN) + "$ cm et $" + n("N", "C") + " = " + L(NC) + "$ cm"
            : "$" + n("A", "M") + " = " + L(AM) + "$ cm, $" + n("A", "B") + " = " + L(AB) + "$ cm, $" + n("A", "N") + " = " + L(AN) + "$ cm et $" + n("A", "C") + " = " + L(ACv) + "$ cm";
          const debut = niveau === 3 ? "On a $" + n("A", "B") + " = " + n("A", "M") + " + " + n("M", "B") + " = " + L(AM) + " + " + L(net(AB - AM)) + " = " + L(AB) + "$ cm et $" + n("A", "C") + " = " + n("A", "N") + " + " + n("N", "C") + " = " + L(AN) + " + " + L(NC) + " = " + L(ACv) + "$ cm. " : "";
          let comparaison;
          if (niveau === 1) {
            const g1 = pgcd(AM, AB), g2 = pgcd(AN, ACv), f1 = D(AM / g1, AB / g1), f2 = D(AN / g2, ACv / g2);
            comparaison = "On a $" + D(n("A", "M"), n("A", "B")) + " = " + D(AM, AB) + (g1 > 1 ? " = " + f1 : "") + "$ et $" + D(n("A", "N"), n("A", "C")) + " = " + D(AN, ACv) + (g2 > 1 ? " = " + f2 : "") + "$. " +
              (egaux ? "Les deux rapports sont égaux" : "Les deux rapports sont différents ($" + f1 + " \\neq " + f2 + "$)");
          } else {
            comparaison = "On compare avec les produits en croix : $" + n("A", "M") + " \\times " + n("A", "C") + " = " + L(AM) + " \\times " + L(ACv) + " = " + L(net(AM * ACv)) + "$ et $" + n("A", "B") + " \\times " + n("A", "N") + " = " + L(AB) + " \\times " + L(AN) + " = " + L(net(AB * AN)) + "$. " +
              (egaux ? "Les produits en croix sont égaux, donc les rapports aussi" : "Les produits en croix sont différents, donc $" + D(n("A", "M"), n("A", "B")) + " \\neq " + D(n("A", "N"), n("A", "C")) + "$");
          }
          return {
            enonce: "Sur la figure, $" + t.M + "$ est un point du segment $[" + t.A + t.B + "]$ et $" + t.N + "$ est un point du segment $[" + t.A + t.C + "]$. On donne " + donnees + ". Les droites $" + MN + "$ et $" + BC + "$ sont-elles parallèles ?",
            schema: Savoirs.schemas.thales({ noms: t, k: AM / AB, kN: AN / ACv, neutre: true }),
            reponse: egaux ? "parallèles" : "non parallèles",
            correction: debut + comparaison + (egaux ? " ; de plus les points sont dans le même ordre : d'après la réciproque du théorème de Thalès, $" + MN + "$ et $" + BC + "$ sont parallèles." : " : d'après la contraposée du théorème de Thalès, $" + MN + "$ et $" + BC + "$ ne sont pas parallèles.")
          };
        }
      }]))
    },
    {
      id: "thales-situation", chap: "thal", titre: "Thalès dans une situation concrète", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((niveau) => [niveau, () => {
        const u = niveau === 1 ? 1 : 0.1;
        for (;;) {
          const [p, q] = rapport(niveau, 9);
          if (Math.random() < 0.5) {
            // Ombres : piquet (ou personne) h, ombre s ; objet H, ombre S ; h/H = s/S = p/q
            const [objet, deObjet] = choix([["l'arbre", "de l'arbre"], ["le lampadaire", "du lampadaire"], ["le clocher", "du clocher"], ["le pylône", "du pylône"], ["l'immeuble", "de l'immeuble"]]), personne = niveau > 1 && Math.random() < 0.5;
            const h = personne ? ent(12, 19) / 10 : niveau === 1 ? ent(1, 4) : ent(10, 40) / 10;
            const r = q / p, H = net(h * r), s = niveau === 1 ? ent(1, 6) : ent(10, 60) / 10, S = net(s * r);
            if (decimales(H) > 2 || decimales(S) > 2 || H > 60) continue;
            const intro = (personne ? "Une personne mesure " : "Un piquet vertical mesure ") + T(h) + " m. À la même heure, son ombre mesure " + T(s) + " m et l'ombre " + deObjet + " mesure " + T(S) + " m. On suppose que le sol est plat et que les rayons du soleil sont parallèles. ";
            const regle = "Les rayons du soleil sont parallèles : d'après le théorème de Thalès, $" + D("h", "H") + " = " + D("s", "S") + "$, où $h$ et $s$ sont la hauteur et l'ombre " + (personne ? "de la personne" : "du piquet") + ", et $H$ et $S$ celles " + deObjet + ". ";
            if (niveau === 3) {
              // On cherche la taille de la personne (ou du piquet) ou la longueur de son ombre
              if (Math.random() < 0.5) {
                return {
                  enonce: (personne ? "Une personne" : "Un piquet vertical") + " a une ombre de " + T(s) + " m. À la même heure, " + objet.replace(/^l/, "L") + " mesure " + T(H) + " m de haut et son ombre mesure " + T(S) + " m. On suppose que le sol est plat et que les rayons du soleil sont parallèles. Quelle est la hauteur " + (personne ? "de la personne" : "du piquet") + " ?",
                  reponse: h, unite: "m", correction: regle + "On remplace : $" + D("h", L(H)) + " = " + D(L(s), L(S)) + "$. Donc $h = " + D(L(H) + " \\times " + L(s), L(S)) + " = " + D(L(net(H * s)), L(S)) + " = " + L(h) + "$ m."
                };
              }
              return {
                enonce: (personne ? "Une personne mesure " : "Un piquet vertical mesure ") + T(h) + " m. À la même heure, " + objet + ", haut de " + T(H) + " m, a une ombre de " + T(S) + " m. On suppose que le sol est plat et que les rayons du soleil sont parallèles. Quelle est la longueur de l'ombre " + (personne ? "de la personne" : "du piquet") + " ?",
                reponse: s, unite: "m", correction: regle + "On remplace : $" + D(L(h), L(H)) + " = " + D("s", L(S)) + "$. Donc $s = " + D(L(h) + " \\times " + L(S), L(H)) + " = " + D(L(net(h * S)), L(H)) + " = " + L(s) + "$ m."
              };
            }
            return {
              enonce: intro + "Quelle est la hauteur " + deObjet + " ?", reponse: H, unite: "m",
              correction: regle + "On remplace : $" + D(L(h), "H") + " = " + D(L(s), L(S)) + "$. Donc $H = " + D(L(h) + " \\times " + L(S), L(s)) + " = " + D(L(net(h * S)), L(s)) + " = " + L(H) + "$ m."
            };
          }
          // Étang : largeur BC, avec AM, AB (ou AM et MB) et MN
          const t = lettres(), k = niveau === 1 ? ent(1, 9) : ent(10, 60), m = niveau === 1 ? ent(1, 9) : ent(10, 60);
          const AB = net(q * k * u), AM = net(p * k * u), BC = net(q * m * u), MN = net(p * m * u);
          if (niveau > 1 && ![AB, AM, MN].some((x) => !Number.isInteger(x))) continue;
          const n = (a, b) => t[a] + t[b], MB = net(AB - AM);
          const donnees = niveau === 3 ? "$" + n("A", "M") + " = " + L(AM) + "$ m, $" + n("M", "B") + " = " + L(MB) + "$ m et $" + n("M", "N") + " = " + L(MN) + "$ m"
            : "$" + n("A", "M") + " = " + L(AM) + "$ m, $" + n("A", "B") + " = " + L(AB) + "$ m et $" + n("M", "N") + " = " + L(MN) + "$ m";
          return {
            enonce: "Pour mesurer la largeur $" + n("B", "C") + "$ d'un étang, on place des piquets aux points de la figure, avec $(" + n("M", "N") + ")$ parallèle à $(" + n("B", "C") + ")$. On donne " + donnees + ". Quelle est la largeur $" + n("B", "C") + "$ de l'étang ?",
            schema: figure(t, p / q),
            reponse: BC, unite: "m",
            correction: (niveau === 3 ? "On a $" + n("A", "B") + " = " + n("A", "M") + " + " + n("M", "B") + " = " + L(AM) + " + " + L(MB) + " = " + L(AB) + "$ m. " : "") +
              "Les points $" + t.M + "$ et $" + t.N + "$ sont sur $[" + n("A", "B") + "]$ et $[" + n("A", "C") + "]$ et $(" + n("M", "N") + ") \\parallel (" + n("B", "C") + ")$ : d'après le théorème de Thalès, $" + D(n("A", "M"), n("A", "B")) + " = " + D(n("M", "N"), n("B", "C")) + "$. On remplace par les valeurs : $" + D(L(AM), L(AB)) + " = " + D(L(MN), n("B", "C")) + "$. Donc $" + n("B", "C") + " = " + D(L(AB) + " \\times " + L(MN), L(AM)) + " = " + D(L(net(AB * MN)), L(AM)) + " = " + L(BC) + "$ m."
          };
        }
      }]))
    },
    {
      id: "thales-rapport", chap: "thal", titre: "Trouver un rapport de Thalès", format: "fraction",
      niveaux: Object.fromEntries([1, 2, 3].map((niveau) => [niveau, () => {
        for (;;) {
          const [p, q] = rapport(niveau, 9), t = lettres(), dec = niveau === 3 && Math.random() < 0.5, u = dec ? 0.1 : 1;
          const k = dec ? ent(5, 40) : ent(2, 12), petit = net(p * k * u), grand = net(q * k * u);
          if (dec && Number.isInteger(petit) && Number.isInteger(grand)) continue;
          const cote = choix([["M", "B"], ["N", "C"]]), [P, G] = cote, nP = t.A + t[P], nG = t.A + t[G], reste = net(grand - petit);
          const autres = [[t.A + t.M, t.A + t.B], [t.A + t.N, t.A + t.C], [t.M + t.N, t.B + t.C]].filter(([a]) => a !== nP);
          const [num, den] = choix(autres), inverse = niveau === 3, complement = niveau === 2 || (niveau === 3 && Math.random() < 0.5);
          const donnees = complement ? "$" + nP + " = " + L(petit) + "$ cm et $" + t[P] + t[G] + " = " + L(reste) + "$ cm" : "$" + nP + " = " + L(petit) + "$ cm et $" + nG + " = " + L(grand) + "$ cm";
          // Inverse d'un rapport 1/q : un entier (« 8 » et non « 8/1 »)
          const demande = inverse ? D(den, num) : D(num, den), rep = inverse ? (p === 1 ? String(q) : q + "/" + p) : p + "/" + q, frac = inverse ? (p === 1 ? String(q) : D(q, p)) : D(p, q);
          return {
            enonce: phrase(t) + " On donne " + donnees + ". Quelle est la valeur du rapport $" + demande + "$ ? Donner la réponse sous la forme d'une fraction irréductible.",
            schema: figure(t, p / q),
            reponse: rep,
            correction: "Les points $" + t.M + "$ et $" + t.N + "$ sont sur $[" + t.A + t.B + "]$ et $[" + t.A + t.C + "]$ et $(" + t.M + t.N + ") \\parallel (" + t.B + t.C + ")$ : " + thales(t) + ". " +
              (complement ? "On a $" + nG + " = " + nP + " + " + t[P] + t[G] + " = " + L(petit) + " + " + L(reste) + " = " + L(grand) + "$ cm. " : "") +
              "On calcule $" + D(nP, nG) + " = " + D(L(petit), L(grand)) + " = " + D(p, q) + "$. " + (inverse ? "Le rapport demandé est l'inverse : $" + demande + " = " + frac + "$." : "Donc $" + demande + " = " + frac + "$.")
          };
        }
      }]))
    },
    {
      id: "thales-perimetre", chap: "thal", titre: "Périmètre d'un triangle réduit", format: "nombre",
      niveaux: Object.fromEntries([1, 2, 3].map((niveau) => [niveau, () => {
        for (;;) {
          const [p, q] = niveau === 3 ? (() => { for (;;) { const qq = ent(3, 8), pp = ent(2, qq - 1); if (pgcd(pp, qq) === 1) return [pp, qq]; } })() : rapport(niveau, 5);
          const l = longueurs(p, q, niveau === 2), t = lettres(), n = (a, b) => t[a] + t[b];
          const Pg = net(l.AB + l.AC + l.BC), Pp = net(Pg * p / q);
          if (decimales(Pp) > 2) continue;
          if (niveau === 3) {
            const parCote = Math.random() < 0.5, [a, b] = parCote ? [l.AM, l.AB] : [l.MN, l.BC], [na, nb] = parCote ? [n("A", "M"), n("A", "B")] : [n("M", "N"), n("B", "C")];
            return {
              schema: figure(t, p / q),
              enonce: phrase(t) + " On donne $" + na + " = " + L(a) + "$ cm, $" + nb + " = " + L(b) + "$ cm et le périmètre du triangle $" + t.A + t.M + t.N + "$ est " + T(Pp) + " cm. Calculer le périmètre du triangle $" + t.A + t.B + t.C + "$.",
              reponse: Pg, unite: "cm",
              correction: "D'après le théorème de Thalès, " + thales(t).replace("d'après le théorème de Thalès, ", "") + ". Le rapport est $k = " + D(na, nb) + " = " + D(L(a), L(b)) + " = " + D(p, q) + "$. Le périmètre de $" + t.A + t.M + t.N + "$ est égal à $k$ fois celui de $" + t.A + t.B + t.C + "$. Donc le périmètre de $" + t.A + t.B + t.C + "$ est $" + L(Pp) + " \\div " + D(p, q) + " = " + L(Pp) + " \\times " + D(q, p) + " = " + L(Pg) + "$ cm."
            };
          }
          return {
            enonce: phrase(t) + " On donne $" + n("A", "B") + " = " + L(l.AB) + "$ cm, $" + n("A", "C") + " = " + L(l.AC) + "$ cm, $" + n("B", "C") + " = " + L(l.BC) + "$ cm et $" + n("A", "M") + " = " + L(l.AM) + "$ cm. Calculer le périmètre du triangle $" + t.A + t.M + t.N + "$.",
            schema: figure(t, p / q),
            reponse: Pp, unite: "cm",
            correction: "Les points $" + t.M + "$ et $" + t.N + "$ sont sur $[" + n("A", "B") + "]$ et $[" + n("A", "C") + "]$ et $(" + n("M", "N") + ") \\parallel (" + n("B", "C") + ")$ : " + thales(t) + ". Le rapport est $k = " + D(n("A", "M"), n("A", "B")) + " = " + D(L(l.AM), L(l.AB)) + " = " + D(p, q) + "$. Le périmètre de $" + t.A + t.B + t.C + "$ est $" + L(l.AB) + " + " + L(l.AC) + " + " + L(l.BC) + " = " + L(Pg) + "$ cm. Le périmètre de $" + t.A + t.M + t.N + "$ est égal à $k$ fois celui du grand triangle : $" + D(p, q) + " \\times " + L(Pg) + " = " + L(Pp) + "$ cm."
          };
        }
      }]))
    }
  ];

  Savoirs.enregistrerTechniques("3e", thal);
})();
