// Valeurs tirées au hasard pour le mode « J'applique » : un générateur par savoir (même id dans tous les niveaux).
// Chaque générateur renvoie un exemple au même format que dans les données :
//   { donnees, question, reponse (nombre), unite, correction }
// Les valeurs sont choisies pour que les calculs restent faisables à la main (résultats entiers ou décimaux simples),
// sauf quand l'énoncé demande d'arrondir. Un savoir sans générateur garde ses exemples fixes.
(function () {
  const ent = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const choix = (liste) => liste[Math.floor(Math.random() * liste.length)];
  const arr = (x, d) => Math.round(x * Math.pow(10, d)) / Math.pow(10, d);
  const net = (x) => arr(x, 10); // efface les erreurs d'arrondi des calculs (0,1 + 0,2…)

  // Nombre écrit en LaTeX : virgule décimale {,} et espace fine pour les milliers
  function L(x) {
    const [e, d] = String(net(x)).split(".");
    const signe = e.startsWith("-") ? "-" : "";
    const chiffres = e.replace("-", "");
    const groupes = chiffres.length > 4 ? chiffres.replace(/\B(?=(\d{3})+$)/g, "\\,") : chiffres;
    return signe + groupes + (d ? "{,}" + d : "");
  }
  // Nombre écrit dans une phrase : virgule, et espace fine insécable pour les milliers
  function T(x) {
    const [e, d] = String(net(x)).split(".");
    const signe = e.startsWith("-") ? "−" : "";
    const chiffres = e.replace("-", "");
    const groupes = chiffres.length > 4 ? chiffres.replace(/\B(?=(\d{3})+$)/g, " ") : chiffres;
    return signe + groupes + (d ? "," + d : "");
  }
  const P = (x) => (x < 0 ? "(" + L(x) + ")" : L(x)); // nombre négatif entre parenthèses
  const ex = (donnees, question, reponse, unite, correction) => ({ donnees, question, reponse: net(reponse), unite, correction });

  // Triplets pythagoriciens (côtés de l'angle droit, hypoténuse)
  const TRIPLETS = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20], [7, 24, 25], [15, 20, 25], [20, 21, 29]];

  const G = {
    // ---------- Aires et périmètres ----------
    "aire-rect": () => { const a = ent(4, 15), b = ent(2, a - 1);
      return ex("$L = " + a + "$ cm et $\\ell = " + b + "$ cm", "Aire ?", a * b, "cm²", "$\\mathcal{A} = " + a + " \\times " + b + " = " + a * b + "$ cm²"); },
    "perim-rect": () => { const a = ent(4, 15), b = ent(2, a - 1);
      return ex("$L = " + a + "$ cm et $\\ell = " + b + "$ cm", "Périmètre ?", 2 * (a + b), "cm", "$P = 2 \\times (" + a + " + " + b + ") = " + 2 * (a + b) + "$ cm"); },
    "aire-carre": () => { const c = ent(2, 15);
      return ex("$c = " + c + "$ cm", "Aire ?", c * c, "cm²", "$\\mathcal{A} = " + c + " \\times " + c + " = " + c * c + "$ cm²"); },
    "aire-tri": () => { const b = 2 * ent(2, 8), h = ent(2, 12);
      return ex("$b = " + b + "$ cm et $h = " + h + "$ cm", "Aire ?", b * h / 2, "cm²", "$\\mathcal{A} = \\dfrac{" + b + " \\times " + h + "}{2} = " + b * h / 2 + "$ cm²"); },
    "aire-para": () => { const b = ent(3, 15), h = ent(2, 12);
      return ex("$b = " + b + "$ cm et $h = " + h + "$ cm", "Aire ?", b * h, "cm²", "$\\mathcal{A} = " + b + " \\times " + h + " = " + b * h + "$ cm²"); },
    "aire-disque": () => { const r = ent(2, 12), v = arr(Math.PI * r * r, 1);
      return ex("$r = " + r + "$ cm (arrondir au dixième)", "Aire ?", v, "cm²", "$\\mathcal{A} = \\pi \\times " + r + "^{2} = " + r * r + "\\pi \\approx " + L(v) + "$ cm²"); },
    "perim-cercle": () => { const r = ent(2, 15), v = arr(2 * Math.PI * r, 1);
      return ex("$r = " + r + "$ cm (arrondir au dixième)", "Périmètre ?", v, "cm", "$P = 2 \\times \\pi \\times " + r + " = " + 2 * r + "\\pi \\approx " + L(v) + "$ cm"); },

    // ---------- Volumes ----------
    "vol-pave": () => { const a = ent(3, 12), b = ent(2, 9), c = ent(2, 10);
      return ex("$L = " + a + "$ cm, $\\ell = " + b + "$ cm, $h = " + c + "$ cm", "Volume ?", a * b * c, "cm³", "$V = " + a + " \\times " + b + " \\times " + c + " = " + a * b * c + "$ cm³"); },
    "vol-cube": () => { const a = ent(2, 9);
      return ex("$a = " + a + "$ cm", "Volume ?", a * a * a, "cm³", "$V = " + a + "^{3} = " + a * a * a + "$ cm³"); },
    "vol-cyl": () => { const r = ent(1, 6), h = ent(2, 15), v = Math.round(Math.PI * r * r * h);
      return ex("$r = " + r + "$ cm et $h = " + h + "$ cm (arrondir à l'unité)", "Volume ?", v, "cm³", "$V = \\pi \\times " + r + "^{2} \\times " + h + " = " + r * r * h + "\\pi \\approx " + L(v) + "$ cm³"); },
    "vol-prisme": () => { const B = ent(4, 30), h = ent(2, 12);
      return ex("Prisme droit : aire de base $B = " + B + "$ cm², hauteur $h = " + h + "$ cm", "Volume ?", B * h, "cm³", "$V = B \\times h = " + B + " \\times " + h + " = " + B * h + "$ cm³"); },
    "pyr-vol": () => { const c = ent(2, 9), h = 3 * ent(1, 4);
      return ex("Base carrée de côté " + c + " cm, hauteur $h = " + h + "$ cm", "Volume ?", c * c * h / 3, "cm³",
        "$B = " + c + "^{2} = " + c * c + "$ puis $V = \\dfrac{1}{3} \\times " + c * c + " \\times " + h + " = " + c * c * h / 3 + "$ cm³"); },
    "cone-vol": () => { const r = ent(2, 6), h = ent(3, 12), v = arr(Math.PI * r * r * h / 3, 1);
      return ex("$r = " + r + "$ cm et $h = " + h + "$ cm (arrondir au dixième)", "Volume ?", v, "cm³",
        "$V = \\dfrac{1}{3} \\times \\pi \\times " + r + "^{2} \\times " + h + " \\approx " + L(v) + "$ cm³"); },
    "sph-aire": () => { const R = ent(1, 10), v = arr(4 * Math.PI * R * R, 1);
      return ex("$R = " + R + "$ cm (arrondir au dixième)", "Aire ?", v, "cm²", "$4 \\times \\pi \\times " + R + "^{2} = " + 4 * R * R + "\\pi \\approx " + L(v) + "$ cm²"); },
    "boule-vol": () => { const R = ent(1, 9), v = arr(4 / 3 * Math.PI * R * R * R, 1);
      return ex("$R = " + R + "$ cm (arrondir au dixième)", "Volume ?", v, "cm³", "$\\dfrac{4}{3} \\times \\pi \\times " + R + "^{3} \\approx " + L(v) + "$ cm³"); },

    // ---------- Pythagore, Thalès, trigonométrie ----------
    "pythagore": () => { const [a, b, c] = choix(TRIPLETS);
      if (Math.random() < 0.5) return ex("ABC rectangle en A, $AB = " + a + "$ cm et $AC = " + b + "$ cm", "Longueur de $[BC]$ ?", c, "cm",
        "$BC^{2} = " + a + "^{2} + " + b + "^{2} = " + c * c + "$ donc $BC = \\sqrt{" + c * c + "} = " + c + "$ cm");
      return ex("ABC rectangle en A, $BC = " + c + "$ cm et $AB = " + a + "$ cm", "Longueur de $[AC]$ ?", b, "cm",
        "$AC^{2} = " + c + "^{2} - " + a + "^{2} = " + b * b + "$ donc $AC = \\sqrt{" + b * b + "} = " + b + "$ cm"); },
    "thales": () => { const [p, q] = choix([[2, 5], [1, 2], [3, 4], [2, 3], [3, 5], [1, 3]]), u = ent(1, 3), w = ent(1, 4);
      const AM = p * u, AB = q * u, AN = p * w, AC = q * w;
      return ex("$(MN) \\parallel (BC)$ ; $AM = " + AM + "$, $AB = " + AB + "$, $AN = " + AN + "$", "Longueur $AC$ ?", AC, "cm",
        "$\\dfrac{" + AM + "}{" + AB + "} = \\dfrac{" + AN + "}{AC}$ donc $AC = \\dfrac{" + AN + " \\times " + AB + "}{" + AM + "} = " + AC + "$ cm"); },
    "trig-cos": () => { const [a, b, c] = choix([[3, 4, 5], [6, 8, 10], [7, 24, 25], [15, 20, 25], [9, 12, 15]]), adj = Math.random() < 0.5 ? a : b;
      return ex("ABC rectangle en A, $AB = " + adj + "$ et $BC = " + c + "$", "$\\cos(\\widehat{B})$ ?", adj / c, "",
        "$\\cos(\\widehat{B}) = \\dfrac{AB}{BC} = \\dfrac{" + adj + "}{" + c + "} = " + L(adj / c) + "$"); },
    "trig-tan": () => { const adj = choix([2, 4, 5, 8, 10]), opp = ent(1, 12);
      return ex("Côté opposé " + opp + " et côté adjacent " + adj, "$\\tan$ de l'angle ?", opp / adj, "", "$\\dfrac{" + opp + "}{" + adj + "} = " + L(opp / adj) + "$"); },
    "trig-angle": () => { const c = ent(1, 9) / 10, v = arr(Math.acos(c) * 180 / Math.PI, 1);
      return ex("$\\cos(\\widehat{B}) = " + L(c) + "$ (arrondir au dixième de degré)", "Angle $\\widehat{B}$ ?", v, "°", "$\\cos^{-1}(" + L(c) + ") \\approx " + L(v) + "^{\\circ}$"); },

    // ---------- Grandeurs : vitesses, énergie, échelles ----------
    "vitesse": () => { const v = 5 * ent(8, 24), t = ent(2, 5);
      return ex("$d = " + v * t + "$ km parcourus en $t = " + t + "$ h", "Vitesse moyenne ?", v, "km/h", "$v = \\dfrac{" + v * t + "}{" + t + "} = " + v + "$ km/h"); },
    "distance": () => { const v = 5 * ent(8, 24), t = ent(2, 5);
      return ex("$v = " + v + "$ km/h pendant $t = " + t + "$ h", "Distance ?", v * t, "km", "$d = " + v + " \\times " + t + " = " + v * t + "$ km"); },
    "temps": () => { const v = choix([40, 60, 80, 90, 100, 120]), t = choix([0.5, 1.5, 2, 2.5, 3]);
      const h = Math.floor(t), min = (t - h) * 60;
      return ex("$d = " + v * t + "$ km à $v = " + v + "$ km/h", "Durée (en heures) ?", t, "h",
        "$t = \\dfrac{" + v * t + "}{" + v + "} = " + L(t) + "$ h" + (min ? " $= " + h + "$ h " + min + " min" : "")); },
    "energie": () => { const p = choix([1, 1.5, 2, 2.5, 3, 4]), t = ent(2, 8);
      return ex("$P = " + L(p) + "$ kW pendant $t = " + t + "$ h", "Énergie ?", p * t, "kWh", "$E = " + L(p) + " \\times " + t + " = " + L(p * t) + "$ kWh"); },
    "kmh-ms": () => { const v = 18 * ent(1, 7);
      return ex(v + " km/h", "Vitesse en m/s ?", v / 3.6, "m/s", "$" + v + " \\div 3{,}6 = " + L(v / 3.6) + "$ m/s"); },
    "echelle": () => { const N = choix([10000, 20000, 25000, 50000, 100000]), d = ent(2, 12), cm = d * N;
      return ex("Échelle $\\dfrac{1}{" + L(N) + "}$ ; deux villes sont à " + d + " cm sur le plan", "Distance réelle ?", cm / 100000, "km",
        "$" + d + " \\times " + L(N) + " = " + L(cm) + "$ cm $= " + L(cm / 100000) + "$ km"); },

    // ---------- Pourcentages, proportionnalité ----------
    "pourcent": () => { const t = choix([5, 10, 15, 20, 25, 30, 40, 50, 75]), V = 20 * ent(1, 20);
      return ex("Calculer $" + t + "\\,\\%$ de " + V + " €", "Résultat ?", t * V / 100, "€", "$\\dfrac{" + t + "}{100} \\times " + V + " = " + L(t * V / 100) + "$ €"); },
    "pourcent10": () => { const N = 10 * ent(2, 60);
      return ex("Calculer $10\\,\\%$ de " + N + " €", "Résultat ?", N / 10, "€", "$" + N + " \\div 10 = " + N / 10 + "$ €"); },
    "hausse": () => { const p = 20 * ent(1, 10), t = choix([5, 10, 15, 20, 25, 30, 50]), k = 1 + t / 100;
      return ex("Un article à " + p + " € augmente de $" + t + "\\,\\%$", "Nouveau prix ?", p * k, "€",
        "$" + p + " \\times \\left(1 + \\dfrac{" + t + "}{100}\\right) = " + p + " \\times " + L(k) + " = " + L(p * k) + "$ €"); },
    "baisse": () => { const p = 20 * ent(1, 10), t = choix([5, 10, 15, 20, 25, 30, 50]), k = 1 - t / 100;
      return ex("Un article à " + p + " € baisse de $" + t + "\\,\\%$", "Nouveau prix ?", p * k, "€",
        "$" + p + " \\times \\left(1 - \\dfrac{" + t + "}{100}\\right) = " + p + " \\times " + L(k) + " = " + L(p * k) + "$ €"); },
    "prop-coef": () => { const pk = choix([1.5, 2, 2.5, 3, 3.5, 4, 4.5]), q = ent(2, 6);
      return ex(q + " kg de pommes coûtent " + T(pk * q) + " €", "Prix de 1 kg ?", pk, "€", "$" + L(pk * q) + " \\div " + q + " = " + L(pk) + "$ €/kg"); },

    // ---------- Statistiques et probabilités ----------
    "moyenne": () => { const m = ent(8, 14), ecarts = [-4, -2, 0, 1, 5].sort(() => Math.random() - 0.5), notes = ecarts.map((e) => m + e);
      return ex("Notes : " + notes.join(" ; "), "Moyenne ?", m, "", "$\\dfrac{" + notes.join(" + ") + "}{5} = \\dfrac{" + 5 * m + "}{5} = " + m + "$"); },
    "freq": () => G.frequence(),
    "frequence": () => { const N = choix([20, 25, 40, 50]), n = ent(1, N / 2);
      return ex("Sur " + N + " élèves, " + n + " ont la note 12", "Fréquence (décimale) ?", n / N, "", "$f = \\dfrac{" + n + "}{" + N + "} = " + L(n / N) + "$"); },
    "proba-f": () => { const total = choix([4, 5, 8, 10, 20]), r = ent(1, total - 1);
      return ex("Un sac contient " + r + " boule" + (r > 1 ? "s rouges" : " rouge") + " et " + (total - r) + " verte" + (total - r > 1 ? "s" : "") + " ; on tire une boule au hasard",
        "Probabilité d'obtenir une rouge (décimale) ?", r / total, "", "$P = \\dfrac{" + r + "}{" + total + "} = " + L(r / total) + "$"); },
    "proba-contraire": () => { const p = ent(1, 19) * 5 / 100;
      return ex("$P(A) = " + L(p) + "$", "$P(\\text{non } A)$ ?", 1 - p, "", "$1 - " + L(p) + " = " + L(1 - p) + "$"); },
    "st-etendue": () => { const v = Array.from({ length: ent(4, 6) }, () => ent(2, 20));
      const max = Math.max(...v), min = Math.min(...v);
      return ex("Série : " + v.join(" ; "), "Étendue ?", max - min, "", "$" + max + " - " + min + " = " + (max - min) + "$"); },
    "st-pondere": () => { const [e1, e2] = choix([[1, 3], [2, 3], [3, 2], [1, 4], [4, 1], [2, 2], [3, 7]]), a = ent(6, 12), b = a + ent(2, 6);
      const s = a * e1 + b * e2, n = e1 + e2;
      return ex("Notes : " + a + " (effectif " + e1 + ") ; " + b + " (effectif " + e2 + ")", "Moyenne ?", s / n, "",
        "$\\dfrac{" + a + " \\times " + e1 + " + " + b + " \\times " + e2 + "}{" + n + "} = \\dfrac{" + s + "}{" + n + "} = " + L(s / n) + "$"); },

    // ---------- Nombres relatifs ----------
    "rel-add": () => { const a = ent(2, 15), b = ent(2, 15);
      return ex("Calculer $(-" + a + ") + (-" + b + ")$", "Résultat ?", -(a + b), "", "$(-" + a + ") + (-" + b + ") = -(" + a + " + " + b + ") = " + -(a + b) + "$"); },
    "rel-add2": () => { const a = ent(2, 15); let b = ent(1, 14); if (b === a) b++;
      return ex("Calculer $(-" + a + ") + (+" + b + ")$", "Résultat ?", b - a, "",
        "$(-" + a + ") + " + b + " = " + (a > b ? "-(" + a + " - " + b + ")" : b + " - " + a) + " = " + (b - a) + "$"); },
    "rel-sous": () => { const a = ent(-9, 12), b = ent(2, 9);
      return ex("Calculer $" + a + " - (-" + b + ")$", "Résultat ?", a + b, "", "$" + a + " - (-" + b + ") = " + a + " + " + b + " = " + (a + b) + "$"); },
    "rel-carre-neg": () => { const n = ent(2, 12);
      return ex("Calculer $(-" + n + ")^{2}$", "Résultat ?", n * n, "", "$(-" + n + ")^{2} = (-" + n + ") \\times (-" + n + ") = " + n * n + "$"); },
    "rel-div-signe": () => { const a = ent(2, 9), b = ent(2, 9);
      return ex("Calculer $\\dfrac{-" + a * b + "}{" + b + "}$", "Résultat ?", -a, "", "$-" + a * b + " \\div " + b + " = -" + a + "$"); },

    // ---------- Calcul, puissances ----------
    "priorites": () => { const a = ent(2, 20), b = ent(2, 9), c = ent(2, 9);
      if (Math.random() < 0.5) return ex("Calculer $" + a + " + " + b + " \\times " + c + "$", "Résultat ?", a + b * c, "",
        "$" + a + " + " + b + " \\times " + c + " = " + a + " + " + b * c + " = " + (a + b * c) + "$");
      const g = b * c + a;
      return ex("Calculer $" + g + " - " + b + " \\times " + c + "$", "Résultat ?", a, "", "$" + g + " - " + b + " \\times " + c + " = " + g + " - " + b * c + " = " + a + "$"); },
    "distrib": () => { const k = ent(2, 9), a = ent(2, 12), b = ent(2, 12);
      return ex("Calculer $" + k + " \\times (" + a + " + " + b + ")$ en distribuant", "Résultat ?", k * (a + b), "",
        "$" + k + " \\times " + a + " + " + k + " \\times " + b + " = " + k * a + " + " + k * b + " = " + k * (a + b) + "$"); },
    "carre-def": () => { if (Math.random() < 0.5) { const n = ent(2, 15); return ex("Calculer $" + n + "^{2}$", "Résultat ?", n * n, "", "$" + n + "^{2} = " + n + " \\times " + n + " = " + n * n + "$"); }
      const n = ent(2, 6); return ex("Calculer $" + n + "^{3}$", "Résultat ?", n * n * n, "", "$" + n + " \\times " + n + " \\times " + n + " = " + n * n * n + "$"); },
    "carres-parfaits": () => { const n = ent(2, 15); return ex("Calculer $" + n + "^{2}$", "Résultat ?", n * n, "", "$" + n + " \\times " + n + " = " + n * n + "$"); },
    "puiss-prod": () => { const a = choix([2, 3, 10]), max = { 2: 10, 3: 6, 10: 6 }[a], m = ent(1, max - 1), n = ent(1, max - m), r = Math.pow(a, m + n);
      return ex("Calculer $" + a + "^{" + m + "} \\times " + a + "^{" + n + "}$ (donner le nombre)", "Résultat ?", r, "",
        "$" + a + "^{" + m + "} \\times " + a + "^{" + n + "} = " + a + "^{" + (m + n) + "} = " + L(r) + "$"); },
    "puiss-quot": () => { const a = choix([2, 3, 5, 10]), d = ent(1, a === 2 ? 6 : 3), n = ent(1, 5), m = n + d, r = Math.pow(a, d);
      return ex("Calculer $\\dfrac{" + a + "^{" + m + "}}{" + a + "^{" + n + "}}$ (donner le nombre)", "Résultat ?", r, "",
        "$" + a + "^{" + m + "-" + n + "} = " + a + "^{" + d + "} = " + L(r) + "$"); },
    "puiss-puiss": () => { const a = choix([2, 3]), [m, n] = a === 2 ? choix([[2, 2], [2, 3], [3, 2], [2, 4], [4, 2], [3, 3]]) : choix([[2, 2], [1, 3], [3, 1], [2, 3]]), r = Math.pow(a, m * n);
      return ex("Calculer $(" + a + "^{" + m + "})^{" + n + "}$ (donner le nombre)", "Résultat ?", r, "",
        "$(" + a + "^{" + m + "})^{" + n + "} = " + a + "^{" + m * n + "} = " + L(r) + "$"); },
    "puiss-neg": () => { const a = choix([2, 5, 10]), n = ent(1, a === 2 ? 4 : 3), d = Math.pow(a, n);
      return ex("Calculer $" + a + "^{-" + n + "}$ (donner un décimal)", "Résultat ?", 1 / d, "",
        "$" + a + "^{-" + n + "} = \\dfrac{1}{" + a + "^{" + n + "}} = \\dfrac{1}{" + L(d) + "} = " + L(1 / d) + "$"); },
    "puiss-prod2": () => { const a = ent(2, 5), b = ent(2, 5);
      return ex("Calculer $(" + a + " \\times " + b + ")^{2}$", "Résultat ?", a * a * b * b, "",
        "$" + a + "^{2} \\times " + b + "^{2} = " + a * a + " \\times " + b * b + " = " + a * a * b * b + "$"); },
    "sci-prod": () => { const [a, b] = choix([[2, 3], [3, 2], [2, 4], [4, 2], [1.5, 4], [2.5, 2], [3, 3]]), m = ent(1, 4), n = ent(1, 4), p = a * b, r = p * Math.pow(10, m + n);
      return ex("Calculer $(" + L(a) + " \\times 10^{" + m + "}) \\times (" + L(b) + " \\times 10^{" + n + "})$ (donner le résultat en nombre entier)", "Résultat ?", r, "",
        "$" + L(a) + " \\times " + L(b) + " = " + L(p) + "$ et $10^{" + m + "+" + n + "} = 10^{" + (m + n) + "}$ donc $" + L(p) + " \\times 10^{" + (m + n) + "} = " + L(r) + "$"); },

    // ---------- Fractions ----------
    "frac-add": () => G["frac-add-meme"](),
    "frac-add-meme": () => { const d = ent(3, 11), a = ent(1, d - 1), b = ent(1, d);
      return ex("Calculer $\\dfrac{" + a + "}{" + d + "} + \\dfrac{" + b + "}{" + d + "}$ (numérateur de la réponse)", "Numérateur ?", a + b, "",
        "$\\dfrac{" + a + " + " + b + "}{" + d + "} = \\dfrac{" + (a + b) + "}{" + d + "}$"); },

    // ---------- Calcul littéral, équations ----------
    "lit-distrib": () => { const x = ent(1, 9), k = ent(2, 6), a = ent(1, 9);
      return ex("Pour $x = " + x + "$, calculer $" + k + " \\times (x + " + a + ")$", "Résultat ?", k * (x + a), "",
        "$" + k + " \\times (" + x + " + " + a + ") = " + k + " \\times " + (x + a) + " = " + k * (x + a) + "$"); },
    "lit-dist": () => { const x = ent(1, 9), k = ent(2, 6), a = ent(1, 9);
      return ex("Pour $x = " + x + "$ : calculer $" + k + "(x + " + a + ")$", "Résultat ?", k * (x + a), "",
        "$" + k + " \\times " + (x + a) + " = " + k * (x + a) + "$ (et $" + k + "x + " + k * a + " = " + k * (x + a) + "$)"); },
    "lit-id1": () => { const a = ent(2, 9), b = ent(1, 6);
      return ex("Avec $a = " + a + "$ et $b = " + b + "$, calculer $(a+b)^{2}$ avec l'identité", "Résultat ?", (a + b) * (a + b), "",
        "$" + a * a + " + " + 2 * a * b + " + " + b * b + " = " + (a + b) * (a + b) + "$"); },
    "lit-id3": () => { const n = choix([20, 30, 40, 50, 60, 100]), k = ent(1, 4);
      return ex("Calculer $" + (n + k) + " \\times " + (n - k) + "$ avec $(" + n + "+" + k + ")(" + n + "-" + k + ")$", "Résultat ?", n * n - k * k, "",
        "$" + n + "^{2} - " + k + "^{2} = " + L(n * n) + " - " + k * k + " = " + L(n * n - k * k) + "$"); },
    "equ-add": () => { const x = ent(1, 20), a = ent(2, 15);
      return ex("Résoudre $x + " + a + " = " + (x + a) + "$", "Solution ?", x, "", "$x = " + (x + a) + " - " + a + " = " + x + "$"); },
    "equ-mult": () => { const x = ent(2, 12), a = ent(2, 9);
      return ex("Résoudre $" + a + "x = " + a * x + "$", "Solution ?", x, "", "$x = " + a * x + " \\div " + a + " = " + x + "$"); },
    "equ-regle": () => { const x = ent(1, 9), a = ent(2, 6), b = ent(1, 12), c = a * x + b;
      return ex("Résoudre $" + a + "x + " + b + " = " + c + "$", "Solution ?", x, "", "$" + a + "x = " + c + " - " + b + " = " + a * x + "$ donc $x = \\dfrac{" + a * x + "}{" + a + "} = " + x + "$"); },
    "eq-ax": () => { const x = ent(1, 9), c = ent(1, 4), a = c + ent(1, 3), b = ent(1, 9), d = (a - c) * x + b;
      const cx = (c === 1 ? "" : c) + "x", ecart = (a - c === 1 ? "" : a - c) + "x";
      return ex("Résoudre $" + a + "x + " + b + " = " + cx + " + " + d + "$", "Solution ?", x, "",
        "$" + a + "x - " + cx + " = " + d + " - " + b + "$ donc $" + ecart + " = " + (d - b) + "$" + (a - c === 1 ? "" : " et $x = " + x + "$")); },
    "eq-carre": () => { const n = ent(2, 12);
      return ex("Résoudre $x^{2} = " + n * n + "$ : donner la solution positive", "Solution positive ?", n, "", "$x = " + n + "$ ou $x = -" + n + "$"); },

    // ---------- Fonctions ----------
    "fg-calc": () => { const a = ent(2, 5), b = ent(1, 9), x = ent(1, 8);
      return ex("$f(x) = " + a + "x - " + b + "$ ; calculer $f(" + x + ")$", "Image ?", a * x - b, "", "$f(" + x + ") = " + a + " \\times " + x + " - " + b + " = " + (a * x - b) + "$"); },
    "fg-antec": () => { const a = ent(2, 5), b = ent(1, 9), x = ent(1, 8), y = a * x - b;
      return ex("$f(x) = " + a + "x - " + b + "$ ; antécédent de " + T(y), "Antécédent ?", x, "",
        "$" + a + "x - " + b + " = " + y + "$ donc $" + a + "x = " + (y + b) + "$ et $x = " + x + "$"); },
    "fl-a": () => { const a = choix([0.5, 1.5, 2, 2.5, 3, 4, 1.2]), x = choix([2, 4, 5, 10]);
      return ex("$f$ linéaire avec $f(" + x + ") = " + L(a * x) + "$", "Coefficient $a$ ?", a, "", "$a = \\dfrac{" + L(a * x) + "}{" + x + "} = " + L(a) + "$"); },
    "fa-calc": () => { const a = ent(-4, 5) || 2, b = ent(-5, 9), x1 = ent(0, 3), x2 = x1 + ent(1, 4), y1 = a * x1 + b, y2 = a * x2 + b;
      return ex("$f(" + x1 + ") = " + y1 + "$ et $f(" + x2 + ") = " + y2 + "$", "Coefficient directeur $a$ ?", a, "",
        "$a = \\dfrac{" + y2 + " - " + P(y1) + "}{" + x2 + " - " + x1 + "} = " + a + "$"); },

    // ---------- Transformations, agrandissements ----------
    "transl-rep": () => { const a = ent(-5, 5) || 3, b = ent(-5, 5) || -2, x = ent(-4, 6), y = ent(-4, 6);
      const signe = (n) => (n >= 0 ? "+" : "") + n;
      return ex("Translation $(" + signe(a) + " ; " + signe(b) + ")$ appliquée à $A(" + x + " ; " + y + ")$", "Abscisse de l'image ?", x + a, "",
        "$" + x + " + " + P(a) + " = " + (x + a) + "$ (et l'ordonnée : $" + y + " + " + P(b) + " = " + (y + b) + "$)"); },
    "rot-poly": () => { const [n, nom] = choix([[3, "Triangle équilatéral"], [4, "Carré"], [5, "Pentagone régulier"], [6, "Hexagone régulier"], [8, "Octogone régulier"], [10, "Décagone régulier"], [12, "Dodécagone régulier"]]);
      return ex(nom + " ($n = " + n + "$)", "Angle de la rotation ?", 360 / n, "°", "$\\dfrac{360}{" + n + "} = " + 360 / n + "^{\\circ}$"); },
    "agr-k": () => { const k = choix([0.5, 1.5, 2, 2.5, 3]), a = 2 * ent(1, 6);
      return ex("Un côté passe de " + a + " cm à " + T(a * k) + " cm", "Rapport $k$ ?", k, "", "$k = \\dfrac{" + L(a * k) + "}{" + a + "} = " + L(k) + "$"); },
    "agr-aire": () => { const k = ent(2, 12);
      return ex("Les aires sont multipliées par " + k * k, "Rapport $k$ ?", k, "", "$k = \\sqrt{" + k * k + "} = " + k + "$"); },
    "agr-vol": () => { const k = ent(2, 4), v = ent(1, 10);
      return ex("Rapport $k = " + k + "$ ; volume initial " + v + " cm³", "Nouveau volume ?", v * k * k * k, "cm³", "$" + v + " \\times " + k + "^{3} = " + v * k * k * k + "$ cm³"); },
    "homo-k": () => { const k = choix([-4, -3, -2, 2, 3, 4]), a = ent(2, 10);
      return ex("Homothétie de rapport $" + k + "$ ; aire de départ " + a + " cm²", "Aire de l'image ?", a * k * k, "cm²", "$" + a + " \\times " + P(k) + "^{2} = " + a * k * k + "$ cm²"); },

    // ---------- Arithmétique ----------
    "prem-pgcd": () => { const [p, q] = choix([[4, 3], [3, 2], [5, 3], [5, 4], [7, 4], [7, 5], [9, 5], [8, 5]]), g = ent(2, 12), a = g * p, b = g * q;
      // Algorithme d'Euclide, étape par étape
      const etapes = []; let x = a, y = b;
      while (y) { const r = x % y; etapes.push("$" + x + " = " + y + " \\times " + Math.floor(x / y) + " + " + r + "$"); x = y; y = r; }
      return ex("Calculer le PGCD de " + a + " et " + b, "PGCD ?", g, "", etapes.join(" puis ") + " : le dernier reste non nul est " + g); },
    "prem-irred": () => { const [p, q] = choix([[4, 3], [2, 3], [3, 5], [5, 4], [7, 4], [5, 7], [8, 9]]), g = ent(2, 12);
      return ex("Simplifier $\\dfrac{" + g * p + "}{" + g * q + "}$ : donner le numérateur de la fraction irréductible", "Numérateur ?", p, "",
        "$\\dfrac{" + g * p + " \\div " + g + "}{" + g * q + " \\div " + g + "} = \\dfrac{" + p + "}{" + q + "}$"); },
    "prem-decomp": () => { const facteurs = Array.from({ length: ent(3, 4) }, () => choix([2, 2, 3, 3, 5, 7])).sort((a, b) => a - b), n = facteurs.reduce((a, b) => a * b, 1);
      return ex("Décomposer " + n + " : donner le plus grand facteur premier", "Plus grand facteur premier ?", Math.max(...facteurs), "", "$" + n + " = " + facteurs.join(" \\times ") + "$"); }
  };

  Savoirs.calculs = G;
  Savoirs.calculsOutils = { L: L, T: T }; // pour les tests
})();
