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
  // Pavé droit ABCDEFGH muni d'un repère d'origine A : x selon (AB), y selon (AD), z selon (AE).
  // lo, la, h : dimensions (entiers, écrites sur les arêtes) ; point : { x, y, z, nom } point supplémentaire à placer
  S.paveRepere = (o) => {
    const k = Math.min(140 / o.lo, 80 / o.h, 100 / o.la);
    const w = borne(o.lo * k, 60, 150), h = borne(o.h * k, 45, 95), p = borne(o.la * k, 40, 100);
    const dx = p * 0.55, dy = p * 0.4, x = 130 - (w + dx) / 2, Y = 30 + dy + h;
    const A = [x, Y], B = [x + w, Y], F = [x + w, Y - h], E = [x, Y - h], v = [dx, -dy];
    const [D, C, G, H] = [A, B, F, E].map((q) => plus(q, v, 1));
    const en = (X, Yy, Z) => [x + X / o.lo * w + Yy / o.la * dx, Y - Z / o.h * h - Yy / o.la * dy];
    const centre = en(o.lo / 2, o.la / 2, o.h / 2);
    // Les axes sont dits dans l'énoncé (l'axe des ordonnées, vers l'arrière, se lirait mal en perspective)
    let s = poly([A, B, F, E], "fig-trait fig-surface") + poly([E, F, G, H], "fig-trait fig-surface fig-dessus") + poly([B, C, G, F], "fig-trait fig-surface fig-cote-solide") +
      cache(A, D) + cache(D, C) + cache(D, H);
    [[A, "A"], [B, "B"], [C, "C"], [D, "D"], [E, "E"], [F, "F"], [G, "G"], [H, "H"]].forEach(([q, t]) => { s += nom(q, t, centre); });
    s += cote(A, B, String(o.lo), E, 16) + cote(B, C, String(o.la), A, 6) + cote(A, E, String(o.h), B);
    if (o.point) { const q = en(o.point.x, o.point.y, o.point.z); s += point(q) + ecrire([q[0] + 10, q[1] + 15], o.point.nom, "fig-nom"); }
    return svg(s, Y + 30, "Pavé droit dans un repère");
  };
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

  // ---------- Deux triangles semblables ----------
  // angA, angB : angles en A et en B du premier triangle (donnent sa forme) ; k : rapport (le second est plus grand
  // ou plus petit à l'œil, sans être en vraie grandeur) ; miroir : le second est retourné ; tourne : il est tourné (degrés).
  // noms1, noms2 : ["A", "B", "C"] ; cotes1, cotes2 : étiquettes des côtés [AB, BC, CA] ; angles1, angles2 : étiquettes
  // des angles [A, B, C] ; marques2 : arcs de couleur sur les angles du second ([1, 0, 2] : un arc en A, deux en C).
  // zones : « cotes2 » pour toucher un côté du second triangle (ids « 0 », « 1 », « 2 » : DE, EF, FD).
  function sommets(angA, angB) {
    const a = angA * Math.PI / 180, b = angB * Math.PI / 180, d = Math.sin(b) / Math.sin(a + b);
    return [[0, 0], [1, 0], [d * Math.cos(a), -d * Math.sin(a)]];
  }
  function placer(pts, s, cx, bas) {
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const mx = (Math.min(...xs) + Math.max(...xs)) / 2, my = Math.max(...ys);
    return pts.map((p) => [cx + (p[0] - mx) * s, bas + (p[1] - my) * s]);
  }
  const etendue = (pts) => { const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]); return [Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)]; };
  function marqueAngle(p, q, r, n, rayon) {
    let s = "";
    const u = unitaire(p, q), v = unitaire(p, r), a1 = Math.atan2(u[1], u[0]), a2 = Math.atan2(v[1], v[0]);
    let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
    for (let i = 0; i < n; i++) {
      const R = rayon + 5 * i, x = plus(p, u, R), y = plus(p, v, R);
      s += chemin("M" + P(x) + " A" + R + " " + R + " 0 0 " + (d > 0 ? 1 : 0) + " " + P(y), "fig-trait fig-fin fig-a fig-arc");
    }
    return s;
  }
  // Étiquette d'angle, à l'intérieur du triangle, sur la bissectrice
  function etiquetteAngle(p, q, r, t) {
    if (!t) return "";
    const u = unitaire(p, q), v = unitaire(p, r), b = unitaire([0, 0], [u[0] + v[0], u[1] + v[1]]);
    // Plus près du sommet dans un petit triangle, plus loin dans un angle aigu (pour ne pas toucher les côtés)
    const cote = Math.min(Math.hypot(q[0] - p[0], q[1] - p[1]), Math.hypot(r[0] - p[0], r[1] - p[1]));
    const demi = Math.acos(Math.max(-1, Math.min(1, u[0] * v[0] + u[1] * v[1]))) / 2;
    const d = Math.min(cote * 0.45, Math.max(26, 17 / Math.max(0.2, Math.sin(demi))));
    return ecrire(plus(plus(p, b, d), [0, 2], 1), t, "fig-cote petit");
  }
  S.triangles = (o) => {
    const base = sommets(o.angA, o.angB), k = o.k || 1, vis = borne(k, 0.6, 1.7);
    let deux = base.map((p) => [p[0] * (o.miroir ? -1 : 1), p[1]]);
    if (o.tourne) { const t = o.tourne * Math.PI / 180; deux = deux.map((p) => [p[0] * Math.cos(t) - p[1] * Math.sin(t), p[0] * Math.sin(t) + p[1] * Math.cos(t)]); }
    const [w1, h1] = etendue(base), [w2, h2] = etendue(deux);
    const s = Math.min(118 / w1, 118 / (w2 * vis), 100 / h1, 100 / (h2 * vis));
    const H = Math.max(h1, h2 * vis) * s, bas = 18 + H;
    const t1 = placer(base, s, 76, bas), t2 = placer(deux, s * vis, 222, bas);
    const dessin = (t, noms, cotes, angles, marques) => {
      const c = [(t[0][0] + t[1][0] + t[2][0]) / 3, (t[0][1] + t[1][1] + t[2][1]) / 3];
      let r = poly(t);
      [0, 1, 2].forEach((i) => {
        const p = t[i], q = t[(i + 1) % 3], w = t[(i + 2) % 3];
        r += nom(p, noms[i], c) + cote(p, q, cotes && cotes[i], c, 8);
        if (marques && marques[i]) r += marqueAngle(p, q, w, marques[i], 16);
        if (angles && angles[i]) r += etiquetteAngle(p, q, w, angles[i]);
      });
      return r;
    };
    let contenu = dessin(t1, o.noms1, o.cotes1, o.angles1, o.marques1) + dessin(t2, o.noms2, o.cotes2, o.angles2, o.marques2);
    if (o.zones === "cotes2") contenu += [0, 1, 2].map((i) => zoneSeg(String(i), t2[i], t2[(i + 1) % 3], "Côté " + o.noms2[i] + o.noms2[(i + 1) % 3])).join("");
    return (o.zones ? svgToucher : svg)(contenu, bas + 30, "Deux triangles semblables");
  };

  // ---------- Triangle rectangle avec un angle marqué (trigonométrie) ----------
  // Comme triangleRectangle, plus : angle (« base » ou « haut ») : sommet de l'angle marqué ; eangle : son étiquette ;
  // zones : true pour toucher un côté (ids « adj », « opp », « hyp » par rapport à l'angle marqué)
  S.triangleTrigo = (o) => {
    const [w, h] = tailles(o.lb, o.lh, 180, 105), m = o.miroir ? -1 : 1, x0 = 150 - m * w / 2, y = 20;
    const D = [x0, y + h], B = [x0 + m * w, y + h], H = [x0, y], c = [(D[0] + B[0] + H[0]) / 3, (D[1] + B[1] + H[1]) / 3];
    const enB = o.angle !== "haut", S0 = enB ? B : H, autre = enB ? H : B;
    let s = poly([D, B, H]) + droit(D, B, H, 10) + nom(D, o.droit, c) + nom(B, o.base, c) + nom(H, o.haut, c) +
      cote(D, B, o.eb, H) + cote(D, H, o.eh, B) + cote(B, H, o.ehyp, D) + marqueAngle(S0, D, autre, 1, 22) + etiquetteAngle(S0, D, autre, o.eangle);
    if (o.zones) {
      const adj = [D, S0], opp = [D, autre];
      s += zoneSeg("adj", adj[0], adj[1], "Côté " + o.droit + (enB ? o.base : o.haut)) + zoneSeg("opp", opp[0], opp[1], "Côté " + o.droit + (enB ? o.haut : o.base)) +
        zoneSeg("hyp", B, H, "Côté " + o.base + o.haut);
    }
    return (o.zones ? svgToucher : svg)(s, y + h + 32, "Triangle rectangle en " + o.droit);
  };

  // ---------- Cône avec sa génératrice ----------
  // er, eh, eg : étiquettes du rayon, de la hauteur et de la génératrice (« ? » pour la longueur cherchée)
  S.coneGeneratrice = (o) => {
    const k = Math.min(70 / o.r, 115 / o.h), rx = borne(o.r * k, 38, 80), h = borne(o.h * k, 55, 120), ry = rx * 0.28, S0 = [150, 12], O = [150, 12 + h], R = [150 + rx, O[1]];
    const s = surface("M" + P(S0) + " L" + P([150 - rx, O[1]]) + " A" + f(rx) + " " + f(ry) + " 0 0 0 " + P(R) + " Z") +
      demiEllipse(O, rx, ry, true) + demiEllipse(O, rx, ry, false) + seg(S0, [150 - rx, O[1]]) + seg(S0, R, "fig-b") +
      seg(S0, O, "fig-fin") + droit(O, R, S0, 7) + point(O) + seg(O, R, "fig-b") +
      ecrire([150 + rx / 2, O[1] + 15], o.er || "", "fig-cote petit") +
      // Hauteur : « ? » le long des pointillés, sinon « h = … » à gauche du cône (pas de place à l'intérieur)
      (o.eh === "?" ? ecrire([150 - 12, 12 + h * 0.6], "?", "fig-cote") : o.eh ? ecrire([150 - rx * 0.45 - 9 - largeur("h = " + o.eh), 12 + h * 0.45], "h = " + o.eh, "fig-cote") : "") +
      ecrire([150 + rx / 2 + 12 + largeur(o.eg || ""), 12 + h * 0.45], o.eg || "", "fig-cote");
    return svg(s, O[1] + ry + 16, "Cône : rayon, hauteur et génératrice");
  };

  // ---------- Boule coupée par un plan (section : un cercle) ----------
  // eR : rayon de la boule ; ed : distance du centre au plan ; er : rayon de la section
  S.sectionBoule = (o) => {
    const R = 66, c = [150, 80], d = borne(R * o.d / o.R, 14, R - 16), r = Math.sqrt(R * R - d * d), y = c[1] - d, ry = r * 0.27, H = [c[0], y], M = [c[0] + r, y];
    const s = rond(c, R) + '<ellipse cx="' + f(c[0]) + '" cy="' + f(y) + '" rx="' + f(r) + '" ry="' + f(ry) + '" class="fig-trait fig-surface fig-dessus"/>' +
      point(c) + point(H) + seg(c, H, "fig-fin fig-pointille") + seg(H, M, "fig-b") + seg(c, M, "fig-a") + droit(H, c, M, 6) +
      ecrire([c[0] - 9 - largeur(o.ed || ""), (c[1] + y) / 2 + 4], o.ed || "", "fig-cote petit") +
      ecrire([c[0] + r / 2, y - 8], o.er || "", "fig-cote petit") + ecrire([c[0] + r / 2 + 14 + largeur(o.eR || ""), (c[1] + y) / 2 + 10], o.eR || "", "fig-cote petit") +
      ecrire([c[0] - 9, c[1] + 15], "O", "fig-nom") + ecrire([c[0] - 9, y - 6], "H", "fig-nom") + ecrire([M[0] + 10, y - 2], "M", "fig-nom");
    return svg(s, c[1] + R + 10, "Boule coupée par un plan");
  };

  // ---------- Repère et droites (fonctions) ----------
  // xmin…xmax, ymin…ymax : fenêtre (entiers) ; droites : [{ a, b, nom }] (y = ax + b) ; points : [{ x, y, nom }] ;
  // zones : true pour toucher une droite (id = son nom)
  S.repere = (o) => {
    const x0 = o.xmin, x1 = o.xmax, y0 = o.ymin, y1 = o.ymax, W = 260, H = Math.min(270, W * (y1 - y0) / (x1 - x0)), g = 20, ux = W / (x1 - x0), uy = H / (y1 - y0);
    const X = (x) => g + (x - x0) * ux, Y = (y) => 12 + (y1 - y) * uy;
    let s = "";
    for (let x = x0; x <= x1; x++) s += seg([X(x), Y(y0)], [X(x), Y(y1)], "fig-grille");
    for (let y = y0; y <= y1; y++) s += seg([X(x0), Y(y)], [X(x1), Y(y)], "fig-grille");
    s += seg([X(x0), Y(0)], [X(x1), Y(0)], "fig-axe") + seg([X(0), Y(y0)], [X(0), Y(y1)], "fig-axe") +
      ecrire([X(0) - 8, Y(0) + 14], "0", "fig-graduation") + ecrire([X(1), Y(0) + 14], "1", "fig-graduation") + ecrire([X(0) - 8, Y(1) + 4], "1", "fig-graduation");
    const pas = o.graduations || 0;
    if (pas) for (let x = x0; x <= x1; x++) if (x && x !== 1 && x % pas === 0) s += ecrire([X(x), Y(0) + 14], String(x).replace("-", "−"), "fig-graduation");
    if (pas) for (let y = y0; y <= y1; y++) if (y && y !== 1 && y % pas === 0) s += ecrire([X(0) - 10, Y(y) + 4], String(y).replace("-", "−"), "fig-graduation");
    // Une droite est coupée au bord de la fenêtre
    const bout = (d) => {
      const pts = [];
      const ajoute = (x, y) => { if (x >= x0 - 1e-9 && x <= x1 + 1e-9 && y >= y0 - 1e-9 && y <= y1 + 1e-9) pts.push([x, y]); };
      ajoute(x0, d.a * x0 + d.b); ajoute(x1, d.a * x1 + d.b);
      if (d.a) { ajoute((y0 - d.b) / d.a, y0); ajoute((y1 - d.b) / d.a, y1); }
      pts.sort((p, q) => p[0] - q[0]);
      return pts.length >= 2 ? [[X(pts[0][0]), Y(pts[0][1])], [X(pts[pts.length - 1][0]), Y(pts[pts.length - 1][1])]] : null;
    };
    (o.droites || []).forEach((d, i) => {
      const b = bout(d);
      if (!b) return;
      s += seg(b[0], b[1], "fig-courbe fig-courbe-" + (i % 3));
      if (d.nom) { const q = plus(b[1], unitaire(b[1], b[0]), 26); s += ecrire([borne(q[0] + 4, 30, 290), borne(q[1] - 8, 14, Y(y0) - 4)], d.nom, "fig-nom fig-nom-droite"); }
      if (o.zones) s += zoneSeg(d.nom, b[0], b[1], "Droite " + d.nom);
    });
    (o.points || []).forEach((p) => { s += point([X(p.x), Y(p.y)]) + (p.nom ? ecrire([X(p.x) + 10, Y(p.y) - 6], p.nom, "fig-nom") : ""); });
    return (o.zones ? svgToucher : svg)(s, Y(y0) + 14, "Repère");
  };

  // ---------- Diagramme en barres ----------
  // barres : [{ nom, valeur }] ; pas : graduation de l'axe vertical ; titre : texte sous l'axe
  S.barres = (o) => {
    const n = o.barres.length, max = Math.max(...o.barres.map((b) => b.valeur)), haut = Math.ceil(max / o.pas) * o.pas, H = 130, x0 = 42, W = 245, y0 = 12 + H;
    const Y = (v) => y0 - v * H / haut, l = W / n;
    let s = "";
    for (let v = 0; v <= haut; v += o.pas) s += seg([x0, Y(v)], [x0 + W, Y(v)], "fig-grille") + ecrire([x0 - 8, Y(v) + 4], String(v), "fig-graduation fig-gauche");
    o.barres.forEach((b, i) => {
      const x = x0 + i * l + l * 0.2;
      s += '<rect x="' + f(x) + '" y="' + f(Y(b.valeur)) + '" width="' + f(l * 0.6) + '" height="' + f(y0 - Y(b.valeur)) + '" class="fig-trait fig-barre"/>' +
        ecrire([x + l * 0.3, y0 + 15], b.nom, "fig-graduation");
    });
    s += seg([x0, y0], [x0 + W, y0], "fig-axe") + seg([x0, y0], [x0, 8], "fig-axe");
    return svg(s, y0 + 24, o.titre || "Diagramme en barres");
  };

  // ---------- Histogramme (classes de même amplitude, rectangles collés) ----------
  // depart, amplitude : bornes des classes ; effectifs : un par classe ; pas : graduation de l'axe vertical ; unite : texte sous l'axe
  S.histogramme = (o) => {
    const n = o.effectifs.length, max = Math.max(...o.effectifs), haut = Math.ceil(max / o.pas) * o.pas, H = 130, x0 = 42, W = 240, y0 = 12 + H;
    const Y = (v) => y0 - v * H / haut, l = W / n;
    let s = "";
    for (let v = 0; v <= haut; v += o.pas) s += seg([x0, Y(v)], [x0 + W, Y(v)], "fig-grille") + ecrire([x0 - 8, Y(v) + 4], String(v), "fig-graduation fig-gauche");
    o.effectifs.forEach((e, i) => {
      s += '<rect x="' + f(x0 + i * l) + '" y="' + f(Y(e)) + '" width="' + f(l) + '" height="' + f(y0 - Y(e)) + '" class="fig-trait fig-barre"/>';
    });
    for (let i = 0; i <= n; i++) s += ecrire([x0 + i * l, y0 + 15], String(o.depart + i * o.amplitude), "fig-graduation" + (n > 6 ? " petit" : ""));
    s += seg([x0, y0], [x0 + W + 6, y0], "fig-axe") + seg([x0, y0], [x0, 8], "fig-axe") + (o.unite ? ecrire([x0 + W / 2, y0 + 32], o.unite, "fig-graduation") : "");
    return svg(s, y0 + (o.unite ? 40 : 24), o.titre || "Histogramme");
  };

  // ---------- Roue (ou disque) partagée en secteurs égaux ----------
  // secteurs : liste de textes (un par secteur, dans l'ordre) ; les secteurs de même texte ont le même motif
  S.roue = (o) => {
    const n = o.secteurs.length, c = [150, 82], R = 70, sortes = [...new Set(o.secteurs)];
    let s = "";
    o.secteurs.forEach((t, i) => {
      const a1 = -Math.PI / 2 + 2 * Math.PI * i / n, a2 = a1 + 2 * Math.PI / n, p1 = [c[0] + R * Math.cos(a1), c[1] + R * Math.sin(a1)], p2 = [c[0] + R * Math.cos(a2), c[1] + R * Math.sin(a2)];
      const am = (a1 + a2) / 2, e = [c[0] + R * 0.64 * Math.cos(am), c[1] + R * 0.64 * Math.sin(am) + 5];
      s += chemin("M" + P(c) + " L" + P(p1) + " A" + R + " " + R + " 0 0 1 " + P(p2) + " Z", "fig-trait fig-part fig-part-" + (sortes.indexOf(t) % 4)) +
        ecrire(e, t, "fig-cote " + (n > 8 ? "petit" : ""));
    });
    s += chemin("M" + P([c[0] - 7, c[1] - R - 12]) + " L" + P([c[0] + 7, c[1] - R - 12]) + " L" + P([c[0], c[1] - R + 2]) + " Z", "fig-fleche-roue");
    return svg(s, c[1] + R + 10, "Roue partagée en " + n + " secteurs égaux");
  };

  // ---------- Balance en équilibre (équations) ----------
  // gauche, droite : listes de « x » et de nombres (masses) ; une boîte par élément
  S.balance = (o) => {
    const plateau = (cx, liste) => {
      const l = liste.length, w = Math.min(40, 110 / l);
      return liste.map((t, i) => {
        const x = cx - (l * w) / 2 + i * w, inconnue = t === "x", h = inconnue ? 30 : 24;
        return '<rect x="' + f(x + 1) + '" y="' + f(96 - h) + '" width="' + f(w - 2) + '" height="' + h + '" rx="4" class="fig-trait ' + (inconnue ? "fig-boite-x" : "fig-surface") + '"/>' +
          ecrire([x + w / 2, 96 - h / 2 + 5], t, "fig-cote" + (inconnue ? " fig-inconnue" : ""));
      }).join("");
    };
    const s = seg([150, 104], [150, 150]) + chemin("M120 158 L180 158 L150 136 Z", "fig-trait fig-surface") + seg([25, 104], [275, 104]) +
      seg([40, 96], [140, 96], "fig-epais") + seg([160, 96], [260, 96], "fig-epais") + seg([90, 96], [90, 104]) + seg([210, 96], [210, 104]) +
      plateau(90, o.gauche) + plateau(210, o.droite);
    return svg(s, 166, "Balance en équilibre");
  };

  // ---------- Flèches d'une évolution : départ ×k arrivée (ou plusieurs évolutions de suite) ----------
  // valeurs : textes des cases (« ? » pour la valeur cherchée) ; etiquettes : textes des flèches (« × 1,2 ») ;
  // legendes : textes sous les cases (« avant », « après »)
  S.fleche = (o) => {
    const v = o.valeurs, n = v.length, l = n === 2 ? 112 : 84, pas = n === 2 ? 176 : 108, x0 = 150 - pas * (n - 1) / 2;
    let s = "";
    v.forEach((t, i) => {
      const cx = x0 + i * pas;
      s += '<rect x="' + f(cx - l / 2) + '" y="34" width="' + l + '" height="40" rx="10" class="fig-trait fig-surface"/>' + ecrire([cx, 55], t, "fig-cote" + (n > 2 ? " petit" : "")) +
        (o.legendes && o.legendes[i] ? ecrire([cx, 92], o.legendes[i], "fig-graduation") : "");
      if (i < n - 1) {
        const a = cx + l / 2 - 14, b = cx + pas - l / 2 + 14, m = (a + b) / 2;
        s += chemin("M" + f(a) + " 30 Q" + f(m) + " 2 " + f(b) + " 30", "fig-trait fig-b fig-fleche") + chemin("M" + f(b - 7) + " 21 L" + f(b + 1) + " 31 L" + f(b - 12) + " 32", "fig-trait fig-b") +
          ecrire([m, 12], o.etiquettes[i], "fig-cote" + (n > 2 ? " petit" : ""));
      }
    });
    return svg(s, o.legendes ? 102 : 84, "Évolution : " + v.join(", ") + " ; " + o.etiquettes.join(", "));
  };

  // ---------- Parallélogramme (côtés et angles) ----------
  // noms : « ABCD » ; ecotes : étiquettes [AB, BC, CD, DA] ; eangles : étiquettes des angles [A, B, C, D] ; incl : décalage du haut
  S.para = (o) => {
    const d = o.incl == null ? 45 : o.incl, w = 170, h = 90, x = 150 - (w + d) / 2, y = 18;
    const A = [x, y + h], B = [x + w, y + h], C = [x + w + d, y], D = [x + d, y], t = [A, B, C, D], c = milieu(A, C);
    let s = poly(t);
    t.forEach((p, i) => {
      const q = t[(i + 1) % 4], r = t[(i + 3) % 4];
      s += nom(p, o.noms[i], c) + cote(p, q, o.ecotes && o.ecotes[i], c, 8) + (o.eangles && o.eangles[i] ? marqueAngle(p, q, r, 1, 16) + etiquetteAngle(p, q, r, o.eangles[i]) : "");
    });
    if (o.diagonales) s += seg(A, C, "fig-fin") + seg(B, D, "fig-fin") + point(c) + ecrire([c[0], c[1] + 18], o.centre || "", "fig-nom");
    return svg(s, y + h + 30, "Parallélogramme " + o.noms.join(""));
  };

  // ---------- Zones à toucher (format « toucher » des exercices, js/modes/appliquer.js) ----------
  // Un côté ou une droite : une large bande invisible (pour le doigt) et un trait qui se colore après la réponse
  function zoneSeg(id, a, b, etiquette) {
    const d = "M" + P(a) + " L" + P(b);
    return '<g class="zone-angle zone-seg" data-zone="' + id + '" role="button" tabindex="0" aria-label="' + etiquette + '">' +
      '<path d="' + d + '" class="zone-cible"/><path d="' + d + '" class="zone-arc"/></g>';
  }
  const svgToucher = (contenu, hauteur, titre) => '<svg class="figure-svg schema figure-toucher" viewBox="0 0 300 ' + f(hauteur) + '" role="group" aria-label="' + (titre || "Figure") + ' : touche la bonne réponse">' + contenu + "</svg>";

  Savoirs.schemas = S;
})();
