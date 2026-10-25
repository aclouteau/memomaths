// Schémas cotés des exercices d'entraînement (« Je m'entraîne ») : figures planes, solides, triangle rectangle,
// configurations de Thalès. Dessins SVG (hors ligne, mode clair ou sombre), pas en vraie grandeur.
// Un générateur d'exercice renvoie par exemple :
//   { enonce: "Calculer l'aire de ce triangle.", schema: Savoirs.schemas.triangle({ b: 6, h: 4, eb: "6 cm", eh: "4 cm" }), … }
// Les nombres (b, h…) ne servent qu'aux proportions ; les étiquettes (eb, eh…) sont écrites telles quelles
// (« ? » pour la longueur cherchée). Le schéma s'affiche sous l'énoncé (js/modes/appliquer.js).
(function () {
  const f = (x) => Math.round(x * 10) / 10;
  const P = (p) => f(p[0]) + " " + f(p[1]);
  const borne = (x, a, b) => Math.max(a, Math.min(b, x));
  const milieu = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const plus = (a, v, k) => [a[0] + v[0] * k, a[1] + v[1] * k];
  const unitaire = (a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; };

  const seg = (a, b, classe) => '<line x1="' + f(a[0]) + '" y1="' + f(a[1]) + '" x2="' + f(b[0]) + '" y2="' + f(b[1]) + '" class="fig-trait' + (classe ? " " + classe : "") + '"/>';
  const cache = (a, b) => seg(a, b, "fig-fin fig-pointille"); // arête cachée, hauteur
  const poly = (pts, classe) => '<polygon points="' + pts.map(P).join(" ") + '" class="' + (classe || "fig-trait fig-surface") + '"/>';
  const chemin = (d, classe) => '<path d="' + d + '" class="' + classe + '"/>';
  const rond = (c, r, classe) => '<circle cx="' + f(c[0]) + '" cy="' + f(c[1]) + '" r="' + f(r) + '" class="' + (classe || "fig-trait fig-surface") + '"/>';
  const point = (p) => '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="2.5" class="fig-point"/>';
  const ecrire = (p, t, classe) => '<text x="' + f(p[0]) + '" y="' + f(p[1]) + '" class="' + classe + (t === "?" ? " fig-inconnue" : "") + '">' + t + "</text>";
  const largeur = (t) => String(t).length * 3.9; // demi-largeur approximative d'une étiquette (police 14 px)
  // Étiquette d'un côté [ab], posée au milieu, du côté opposé au point « centre »
  function cote(a, b, t, centre, ecart) {
    if (!t) return "";
    const m = milieu(a, b), u = unitaire(a, b);
    let n = [-u[1], u[0]];
    if ((m[0] - centre[0]) * n[0] + (m[1] - centre[1]) * n[1] < 0) n = [-n[0], -n[1]];
    return ecrire(plus(m, n, (ecart || 11) + Math.abs(n[0]) * largeur(t)), t, "fig-cote");
  }
  // Nom d'un point, écarté du point « centre »
  const nom = (p, t, centre) => ecrire(plus(p, unitaire(centre, p), 13), t, "fig-nom");
  // Angle droit en p, entre les directions vers q et vers r
  function droit(p, q, r, c) {
    c = c || 9;
    const u = unitaire(p, q), v = unitaire(p, r), a = plus(p, u, c), b = plus(a, v, c), e = plus(p, v, c);
    return chemin("M" + P(a) + " L" + P(b) + " L" + P(e), "fig-trait fig-fin");
  }
  // Petit trait de codage (côtés de même longueur) au milieu de [ab]
  function code(a, b) {
    const m = milieu(a, b), u = unitaire(a, b), n = [-u[1], u[0]];
    return seg(plus(m, n, -5), plus(m, n, 5), "fig-fin");
  }
  // Demi-ellipse : « devant » (vers le bas, trait plein) ou « derriere » (vers le haut, pointillés)
  const demiEllipse = (c, rx, ry, devant) => chemin("M" + P([c[0] - rx, c[1]]) + " A" + f(rx) + " " + f(ry) + " 0 0 " + (devant ? 0 : 1) + " " + P([c[0] + rx, c[1]]),
    devant ? "fig-trait" : "fig-trait fig-fin fig-pointille");
  // Deux longueurs a × b ramenées dans une boîte W × H, sans rapport plus grand que 3
  function tailles(a, b, W, H) {
    a = Math.max(a, b / 3); b = Math.max(b, a / 3);
    const s = Math.min(W / a, H / b);
    return [a * s, b * s];
  }
  const svg = (contenu, hauteur, titre) => '<svg class="figure-svg schema" viewBox="0 0 300 ' + f(hauteur) + '" role="img" aria-label="' + (titre || "Schéma") + '">' + contenu + "</svg>";
  const surface = (d) => chemin(d, "fig-surface-seule");

  const S = {};

  // ---------- Figures planes ----------
  // Rectangle (lo × la) ; carre: true pour un carré (côtés codés, une seule étiquette)
  S.rectangle = (o) => {
    const [w, h] = o.carre ? [100, 100] : tailles(o.lo, o.la, 190, 100), x = 150 - w / 2, y = 16;
    const A = [x, y + h], B = [x + w, y + h], C = [x + w, y], D = [x, y], c = [150, y + h / 2];
    let s = poly([A, B, C, D]) + droit(A, B, D) + droit(B, C, A) + droit(C, D, B) + droit(D, A, C);
    if (o.carre) s += code(A, B) + code(B, C) + code(C, D) + code(D, A);
    s += cote(A, B, o.elo, c, o.carre ? 17 : 11) + (o.carre ? "" : cote(B, C, o.ela, c));
    if (o.diag) s += seg(A, C, "fig-b") + cote(A, C, o.ediag, [x + w, y + h], 4);
    return svg(s, y + h + 30, o.carre ? "Carré" : "Rectangle");
  };
  // Triangle de base b et de hauteur h (hauteur en pointillés)
  S.triangle = (o) => {
    const [w, h] = tailles(o.b, o.h, 200, 110), x = 150 - w / 2, y = 14;
    const A = [x, y + h], B = [x + w, y + h], C = [x + w * 0.35, y], H = [C[0], y + h];
    let s = poly([A, B, C]) + cache(C, H) + droit(H, B, C);
    s += cote(A, B, o.eb, C) + (o.eh ? ecrire([H[0] + 9 + largeur(o.eh), y + h * 0.6], o.eh, "fig-cote") : "");
    return svg(s, y + h + 30, "Triangle");
  };
  // Parallélogramme de base b et de hauteur h
  S.parallelogramme = (o) => {
    const [w, h] = tailles(o.b, o.h, 170, 100), d = w * 0.3, x = 150 - (w + d) / 2, y = 14;
    const A = [x, y + h], B = [x + w, y + h], C = [x + w + d, y], D = [x + d, y], H = [D[0], y + h];
    let s = poly([A, B, C, D]) + cache(D, H) + droit(H, B, D);
    s += cote(A, B, o.eb, D) + (o.eh ? ecrire([H[0] + 10 + largeur(o.eh), y + h / 2], o.eh, "fig-cote") : "");
    return svg(s, y + h + 30, "Parallélogramme");
  };
  // Triangle quelconque (périmètre) : trois étiquettes
  S.triangleQuelconque = (o) => {
    const A = [50, 140], B = [250, 140], C = [170, 20], c = [157, 100];
    return svg(poly([A, B, C]) + cote(A, B, o.e1, c) + cote(B, C, o.e2, c) + cote(C, A, o.e3, c), 170, "Triangle");
  };
  // Disque de rayon r (er) ou de diamètre (ed) ; demi: true pour un demi-disque
  S.disque = (o) => {
    const R = 58, c = [150, o.demi ? 82 : 72];
    let s = o.demi ? chemin("M" + P([c[0] - R, c[1]]) + " A" + R + " " + R + " 0 0 1 " + P([c[0] + R, c[1]]) + " Z", "fig-trait fig-surface") : rond(c, R);
    if (o.ed) s += seg([c[0] - R, c[1]], [c[0] + R, c[1]], "fig-b") + ecrire([c[0], c[1] + (o.demi ? 16 : -12)], o.ed, "fig-cote");
    else if (o.er) s += seg(c, [c[0] + R, c[1]], "fig-b") + ecrire([c[0] + R / 2, c[1] + (o.demi ? 16 : -12)], o.er, "fig-cote");
    s += point(c);
    return svg(s, o.demi ? 112 : 146, o.demi ? "Demi-disque" : "Disque");
  };

  // ---------- Figures composées (aires) ----------
  // Deux carrés accolés de côtés a et b
  S.deuxCarres = (o) => {
    const k = Math.min(100 / Math.max(o.a, o.b), 220 / (o.a + o.b)), a = o.a * k, b = o.b * k, x = 150 - (a + b) / 2, y = 14 + Math.max(a, b);
    const s = poly([[x, y], [x + a, y], [x + a, y - a], [x, y - a]]) + poly([[x + a, y], [x + a + b, y], [x + a + b, y - b], [x + a, y - b]]) +
      cote([x, y], [x + a, y], o.ea, [x, 0]) + cote([x + a, y], [x + a + b, y], o.eb, [x, 0]);
    return svg(s, y + 30, "Deux carrés accolés");
  };
  // Rectangle lo × la prolongé à droite par un triangle (base = la, hauteur h)
  S.rectangleTriangle = (o) => {
    const [w, l] = tailles(o.lo, o.la, 150, 90), t = borne(w * o.h / o.lo, 25, 80), x = 150 - (w + t) / 2, y = 14;
    const A = [x, y + l], B = [x + w, y + l], C = [x + w, y], D = [x, y], E = [x + w + t, y + l / 2], H = [x + w, y + l / 2];
    const s = surface("M" + P(A) + " L" + P(B) + " L" + P(E) + " L" + P(C) + " L" + P(D) + " Z") +
      seg(A, B) + seg(B, E) + seg(E, C) + seg(C, D) + seg(D, A) + seg(B, C, "fig-fin") + cache(H, E) + droit(H, E, C) + droit(A, B, D) + droit(D, A, C) +
      cote(A, B, o.elo, C) + cote(D, A, o.ela, B) + ecrire([(H[0] + E[0]) / 2, H[1] - 11], o.eh, "fig-cote");
    return svg(s, y + l + 30, "Rectangle et triangle");
  };
  // Rectangle lo × la prolongé à droite par un demi-disque de diamètre la
  S.rectangleDemiDisque = (o) => {
    const [w, l] = tailles(o.lo, o.la, 170, 90), r = l / 2, x = 150 - (w + r) / 2, y = 14;
    const A = [x, y + l], B = [x + w, y + l], C = [x + w, y], D = [x, y];
    const s = surface("M" + P(A) + " L" + P(B) + " A" + f(r) + " " + f(r) + " 0 0 0 " + P(C) + " L" + P(D) + " Z") +
      chemin("M" + P(B) + " A" + f(r) + " " + f(r) + " 0 0 0 " + P(C), "fig-trait") + seg(A, B) + seg(C, D) + seg(D, A) + seg(B, C, "fig-fin fig-pointille") +
      droit(A, B, D) + droit(D, A, C) + cote(A, B, o.elo, C) + cote(D, A, o.ela, B);
    return svg(s, y + l + 30, "Rectangle et demi-disque");
  };
  // Rectangle lo × la percé d'un trou rectangulaire a × b (le trou n'est pas colorié)
  S.plaqueTrou = (o) => {
    const [w, l] = tailles(o.lo, o.la, 200, 110), x = 150 - w / 2, y = 14, k = w / o.lo;
    const a = borne(o.a * k, 18, w * 0.6), b = borne(o.b * k, 14, l * 0.6), tx = x + w * 0.55 - a / 2, ty = y + l / 2 - b / 2;
    const A = [x, y + l], B = [x + w, y + l], C = [x + w, y], D = [x, y];
    const d = "M" + P(A) + " L" + P(B) + " L" + P(C) + " L" + P(D) + " Z M" + P([tx, ty]) + " L" + P([tx + a, ty]) + " L" + P([tx + a, ty + b]) + " L" + P([tx, ty + b]) + " Z";
    const s = chemin(d, "fig-trait fig-surface fig-pair") + cote(A, B, o.elo, C) + cote(D, A, o.ela, B) +
      ecrire([tx + a / 2, ty - 9], o.ea, "fig-cote petit") + ecrire([tx + a + 8 + largeur(o.eb) * 0.8, ty + b / 2], o.eb, "fig-cote petit");
    return svg(s, y + l + 30, "Plaque percée");
  };
  // Rectangle lo × la dont on a retiré un triangle (base a sur le bord du haut, hauteur b vers l'intérieur)
  S.rectangleMoinsTriangle = (o) => {
    const [w, l] = tailles(o.lo, o.la, 200, 110), x = 150 - w / 2, y = 26, k = w / o.lo;
    const a = borne(o.a * k, 30, w * 0.7), b = borne(o.b * k, 20, l * 0.85), tx = x + w / 2 - a / 2;
    const A = [x, y + l], B = [x + w, y + l], C = [x + w, y], D = [x, y], T1 = [tx, y], T2 = [tx + a, y], S3 = [tx + a * 0.4, y + b], H = [S3[0], y];
    const s = chemin("M" + P(A) + " L" + P(B) + " L" + P(C) + " L" + P(T2) + " L" + P(S3) + " L" + P(T1) + " L" + P(D) + " Z", "fig-trait fig-surface") +
      seg(T1, T2, "fig-fin fig-pointille") + cache(H, S3) + droit(H, T2, S3, 6) + cote(A, B, o.elo, C) + cote(D, A, o.ela, B) +
      ecrire([tx + a / 2, y - 10], o.ea, "fig-cote") + ecrire([S3[0] + 9 + largeur(o.eb), y + b / 2 + 2], o.eb, "fig-cote");
    return svg(s, y + l + 30, "Rectangle dont on a retiré un triangle");
  };
  // Carré de côté c dont on a retiré le disque qui touche ses quatre côtés
  S.carreDisque = (o) => {
    const c = 110, x = 95, y = 14, r = c / 2, m = [x + r, y + r];
    const d = "M" + P([x, y]) + " L" + P([x + c, y]) + " L" + P([x + c, y + c]) + " L" + P([x, y + c]) + " Z M" + P([m[0] - r, m[1]]) + " A" + r + " " + r + " 0 1 0 " + P([m[0] + r, m[1]]) + " A" + r + " " + r + " 0 1 0 " + P([m[0] - r, m[1]]) + " Z";
    return svg(chemin(d, "fig-trait fig-surface fig-pair") + point(m) + cote([x, y + c], [x + c, y + c], o.ec, m), y + c + 30, "Carré dont on a retiré un disque");
  };
  // Couronne entre deux cercles de même centre (rayons R et r)
  S.couronne = (o) => {
    const R = 62, r = borne(R * o.r / o.R, 16, R - 14), m = [150, 76];
    const anneau = (q) => "M" + P([m[0] - q, m[1]]) + " A" + f(q) + " " + f(q) + " 0 1 0 " + P([m[0] + q, m[1]]) + " A" + f(q) + " " + f(q) + " 0 1 0 " + P([m[0] - q, m[1]]) + " Z";
    const s = chemin(anneau(R) + " " + anneau(r), "fig-trait fig-surface fig-pair") + point(m) +
      seg(m, [m[0] + R * 0.8, m[1] - R * 0.6], "fig-b") + ecrire([m[0] + R * 0.4 + 14, m[1] - R * 0.3 - 10], o.eR, "fig-cote") +
      seg(m, [m[0] - r, m[1]], "fig-b") + ecrire([m[0] - r / 2, m[1] + 13], o.er, "fig-cote petit");
    return svg(s, 152, "Couronne");
  };

  // ---------- Solides (perspective cavalière, arêtes cachées en pointillés) ----------
  // Pavé droit lo × la × h (la : profondeur) ; cube: true (une seule étiquette) ; diag: grande diagonale
  S.pave = (o) => {
    const k = o.cube ? 1 : Math.min(150 / o.lo, 85 / o.h, 110 / o.la);
    const w = o.cube ? 95 : borne(o.lo * k, 40, 170), h = o.cube ? 95 : borne(o.h * k, 30, 100), p = o.cube ? 95 : borne(o.la * k, 30, 110);
    const dx = p * 0.55, dy = p * 0.4, x = 150 - (w + dx) / 2, Y = 12 + dy + h;
    const F1 = [x, Y], F2 = [x + w, Y], F3 = [x + w, Y - h], F4 = [x, Y - h], v = [dx, -dy];
    const [B1, B2, B3, B4] = [F1, F2, F3, F4].map((q) => plus(q, v, 1));
    let s = poly([F1, F2, F3, F4], "fig-trait fig-surface") + poly([F4, F3, B3, B4], "fig-trait fig-surface fig-dessus") + poly([F2, B2, B3, F3], "fig-trait fig-surface fig-cote-solide") +
      cache(F1, B1) + cache(B1, B2) + cache(B1, B4);
    if (o.diag) s += seg(F1, B3, "fig-b fig-pointille") + ecrire(plus(milieu(F1, B3), [0.6, 0.8], 12), o.ediag || "", "fig-cote");
    s += cote(F1, F2, o.elo, F4) + (o.cube ? "" : cote(F1, F4, o.eh, F2) + cote(F2, B2, o.ela, F1));
    return svg(s, Y + 28, o.cube ? "Cube" : "Pavé droit");
  };
  S.cube = (o) => S.pave({ cube: true, elo: o.ec });
  // Cylindre de rayon r et de hauteur h
  S.cylindre = (o) => {
    const k = Math.min(60 / o.r, 110 / o.h), rx = borne(o.r * k, 32, 75), h = borne(o.h * k, 40, 115), ry = rx * 0.28, haut = [150, 30 + ry], bas = [150, 30 + ry + h];
    const s = surface("M" + P([150 - rx, haut[1]]) + " L" + P([150 - rx, bas[1]]) + " A" + f(rx) + " " + f(ry) + " 0 0 0 " + P([150 + rx, bas[1]]) + " L" + P([150 + rx, haut[1]]) + " Z") +
      '<ellipse cx="150" cy="' + f(haut[1]) + '" rx="' + f(rx) + '" ry="' + f(ry) + '" class="fig-trait fig-surface fig-dessus"/>' +
      demiEllipse(bas, rx, ry, true) + demiEllipse(bas, rx, ry, false) + seg([150 - rx, haut[1]], [150 - rx, bas[1]]) + seg([150 + rx, haut[1]], [150 + rx, bas[1]]) +
      point(haut) + (o.ed ? seg([150 - rx, haut[1]], [150 + rx, haut[1]], "fig-b") + ecrire([150, haut[1] - ry - 9], o.ed, "fig-cote")
        : seg(haut, [150 + rx, haut[1]], "fig-b") + ecrire([150 + rx / 2, haut[1] - ry - 9], o.er || "", "fig-cote")) +
      ecrire([150 + rx + 10 + largeur(o.eh || ""), (haut[1] + bas[1]) / 2], o.eh || "", "fig-cote");
    return svg(s, bas[1] + ry + 16, "Cylindre");
  };
  // Cône de révolution de rayon r et de hauteur h
  S.cone = (o) => {
    const k = Math.min(60 / o.r, 110 / o.h), rx = borne(o.r * k, 32, 75), h = borne(o.h * k, 50, 120), ry = rx * 0.28, S0 = [150, 12], O = [150, 12 + h];
    const s = surface("M" + P(S0) + " L" + P([150 - rx, O[1]]) + " A" + f(rx) + " " + f(ry) + " 0 0 0 " + P([150 + rx, O[1]]) + " Z") +
      demiEllipse(O, rx, ry, true) + demiEllipse(O, rx, ry, false) + seg(S0, [150 - rx, O[1]]) + seg(S0, [150 + rx, O[1]]) +
      cache(S0, O) + droit(O, [150 + rx, O[1]], S0, 7) + point(O) +
      (o.ed ? seg([150 - rx, O[1]], [150 + rx, O[1]], "fig-b") + ecrire([150 + rx / 2 + 4, O[1] + ry + 12], o.ed, "fig-cote petit")
        : seg(O, [150 + rx, O[1]], "fig-b") + ecrire([150 + rx / 2 + 4, O[1] - 9], o.er || "", "fig-cote petit")) + ecrire([150 - rx * 0.45 - 9 - largeur(o.eh ? "h = " + o.eh : ""), 12 + h * 0.45], o.eh ? "h = " + o.eh : "", "fig-cote");
    return svg(s, O[1] + ry + 16, "Cône");
  };
  // Pyramide à base rectangulaire (lo × la, ou carrée) et de hauteur h
  S.pyramide = (o) => {
    const la = o.la || o.lo, k = Math.min(140 / o.lo, 90 / la, 100 / o.h);
    const w = borne(o.lo * k, 70, 160), p = borne(la * k, 40, 100), h = borne(o.h * k, 50, 110), dx = p * 0.55, dy = p * 0.4, x = 150 - (w + dx) / 2, Y = 12 + h + dy / 2 + dy / 2;
    const P1 = [x, Y], P2 = [x + w, Y], P3 = [x + w + dx, Y - dy], P4 = [x + dx, Y - dy], O = milieu(P1, P3), S0 = [O[0], O[1] - h];
    const s = poly([P1, P2, S0], "fig-trait fig-surface") + poly([P2, P3, S0], "fig-trait fig-surface fig-cote-solide") +
      cache(P1, P4) + cache(P4, P3) + cache(P4, S0) + cache(S0, O) + droit(O, P2, S0, 7) + point(O) +
      cote(P1, P2, o.elo, S0) + (o.la ? cote(P2, P3, o.ela, P1) : "");
    // Hauteur : pas de place à côté des pointillés, l'étiquette « h = … » est à gauche de l'arête [SP1]
    const q = plus(S0, [P1[0] - S0[0], P1[1] - S0[1]], 0.45), eh = o.eh ? "h = " + o.eh : "";
    return svg(s + ecrire([q[0] - 9 - largeur(eh), q[1]], eh, "fig-cote"), Y + 28, "Pyramide");
  };
  // Prisme droit à base triangulaire (base coloriée), de hauteur h
  S.prisme = (o) => {
    const h = 95, w = 150, x = 75, Y = 150;
    const A = [x, Y], B = [x + w, Y], C = [x + w * 0.62, Y - 40], v = [0, -h], [A2, B2, C2] = [A, B, C].map((q) => plus(q, v, 1));
    const s = poly([A, B, B2, A2], "fig-trait fig-surface") + poly([B, C, C2, B2], "fig-trait fig-surface fig-cote-solide") +
      poly([A2, B2, C2], "fig-trait fig-surface fig-dessus") + cache(A, C) + cache(C, B) + cache(C, C2) + seg(A, B) +
      chemin("M" + P(A) + " L" + P(B) + " L" + P(C) + " Z", "fig-base") +
      ecrire([B[0] + 12 + largeur(o.eh || ""), (B[1] + B2[1]) / 2 + 12], o.eh || "", "fig-cote") +
      (o.eb ? ecrire([x + w * 0.5, Y + 17], o.eb, "fig-cote petit") : "");
    return svg(s, Y + 28, "Prisme droit");
  };
  // Boule de rayon r
  S.boule = (o) => {
    const R = 62, c = [150, 74], ry = R * 0.27;
    const s = rond(c, R) + demiEllipse(c, R, ry, true) + demiEllipse(c, R, ry, false) + point(c) +
      (o.ed ? seg([c[0] - R, c[1]], [c[0] + R, c[1]], "fig-b") + ecrire([c[0], c[1] - ry - 11], o.ed, "fig-cote")
        : seg(c, [c[0] + R * 0.82, c[1] - R * 0.57], "fig-b") + ecrire([c[0] + R * 0.3, c[1] - R * 0.42], o.er || "", "fig-cote"));
    return svg(s, 148, "Boule");
  };

  // ---------- Triangle rectangle (Pythagore) ----------
  // droit : nom du sommet de l'angle droit ; base, haut : les deux autres sommets ; lb, lh : longueurs des côtés
  // de l'angle droit (proportions) ; eb, eh, ehyp : étiquettes. miroir : angle droit en bas à droite.
  S.triangleRectangle = (o) => {
    const [w, h] = tailles(o.lb, o.lh, 190, 110), m = o.miroir ? -1 : 1, x0 = 150 - m * w / 2, y = 20;
    const D = [x0, y + h], B = [x0 + m * w, y + h], H = [x0, y], c = [(D[0] + B[0] + H[0]) / 3, (D[1] + B[1] + H[1]) / 3];
    const s = poly([D, B, H]) + droit(D, B, H, 10) + nom(D, o.droit, c) + nom(B, o.base, c) + nom(H, o.haut, c) +
      cote(D, B, o.eb, H) + cote(D, H, o.eh, B) + cote(B, H, o.ehyp, D);
    const dit = (n, e) => (e ? ", " + n + " = " + (e === "?" ? "inconnue" : e) : "");
    return svg(s, y + h + 32, "Triangle rectangle en " + o.droit + dit(o.droit + o.base, o.eb) + dit(o.droit + o.haut, o.eh) + dit(o.base + o.haut, o.ehyp));
  };
  // Le même, à partir d'un triangle des exercices de Pythagore : t = { droit, c1, c2, hyp } (noms des côtés, « AB »…)
  // et l = { c1: [longueur, étiquette], c2: […], hyp: […] } ; l'angle droit est à gauche ou à droite, au hasard
  S.pythagore = (t, l) => {
    const autre = (s) => s.replace(t.droit, "");
    return S.triangleRectangle({ droit: t.droit, base: autre(t.c1), haut: autre(t.c2), lb: l.c1[0], lh: l.c2[0], eb: l.c1[1], eh: l.c2[1], ehyp: l.hyp[1], miroir: Math.random() < 0.5 });
  };

  // ---------- Thalès ----------
  // Configuration « triangle » (M sur [AB], N sur [AC]) ou « papillon » (M et N de l'autre côté de A), rapport k = AM/AB.
  // noms : { A, B, C, M, N } ; (MN) et (BC) dessinées en couleur, sauf « neutre » (parallèles ou pas ? à l'élève de le dire),
  // où kN = AN/AC peut différer de k.
  S.thales = (o) => {
    const t = o.noms, k = borne(o.k, 0.25, 0.8), kN = o.kN ? borne(o.kN, 0.2, 0.85) : k;
    let A, B, C, M, N, h;
    if (o.papillon) {
      const kk = borne(o.k, 0.35, 0.75);
      A = [125, 70]; B = [A[0] - 95, A[1] + 90]; C = [A[0] + 95, A[1] + 70];
      M = plus(A, [B[0] - A[0], B[1] - A[1]], -kk); N = plus(A, [C[0] - A[0], C[1] - A[1]], -kk);
      const dy = 14 - Math.min(M[1], N[1]);
      [A, B, C, M, N] = [A, B, C, M, N].map((p) => [p[0], p[1] + dy]);
      h = Math.max(B[1], C[1]) + 26;
    } else {
      A = [120, 22]; B = [35, 170]; C = [262, 158];
      M = plus(A, [B[0] - A[0], B[1] - A[1]], k); N = plus(A, [C[0] - A[0], C[1] - A[1]], kN);
      h = 196;
    }
    const centre = o.papillon ? A : [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3], couleur = o.neutre ? "" : "fig-a";
    const s = seg(o.papillon ? M : A, B) + seg(o.papillon ? N : A, C) + seg(B, C, couleur) + seg(M, N, couleur) +
      [A, B, C, M, N].map(point).join("") +
      (o.papillon ? ecrire([A[0] - 17, A[1] + 1], t.A, "fig-nom") : nom(A, t.A, centre)) +
      nom(B, t.B, centre) + nom(C, t.C, centre) +
      nom(M, t.M, centre) + nom(N, t.N, centre);
    return svg(s, h, "Configuration de Thalès");
  };

  Savoirs.schemas = S;
})();
