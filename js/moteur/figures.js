// Petits schémas de géométrie dessinés en SVG (pas d'image à télécharger : ils marchent hors ligne et
// suivent le mode clair ou sombre). Un savoir peut avoir un champ « figure » :
//   { "type": "paralleles", "marques": "alternes", "mesures": false, "moment": "question" }
// moment « question » : sous la question (le schéma montre la configuration sans donner la réponse) ;
// moment « apres » : avec la correction (le schéma, souvent avec les mesures, montrerait la réponse).
// Couleurs : classes fig-a (bleu) et fig-b (orange), définies dans css/style.css.
(function () {
  const L = 300, H = 170; // taille du dessin (viewBox)
  const rad = (d) => (d * Math.PI) / 180;
  // Point à distance r de (cx, cy), dans la direction d (degrés, sens direct, 0 vers la droite)
  const pt = (cx, cy, r, d) => [cx + r * Math.cos(rad(d)), cy - r * Math.sin(rad(d))];
  const f = (x) => Math.round(x * 10) / 10;
  const ligne = (a, b, classe) => '<line x1="' + f(a[0]) + '" y1="' + f(a[1]) + '" x2="' + f(b[0]) + '" y2="' + f(b[1]) + '" class="' + (classe || "fig-trait") + '"/>';
  const demiDroite = (c, d, long) => ligne(c, pt(c[0], c[1], long, d));
  const droite = (c, d, long) => ligne(pt(c[0], c[1], long, d + 180), pt(c[0], c[1], long, d));
  const texte = (p, t, classe) => '<text x="' + f(p[0]) + '" y="' + f(p[1]) + '" class="' + (classe || "fig-texte") + '">' + t + "</text>";
  const point = (p) => '<circle cx="' + f(p[0]) + '" cy="' + f(p[1]) + '" r="2.5" class="fig-point"/>';
  // Angle marqué entre les directions d1 et d2 (sens direct de d1 à d2) : secteur teinté et arc
  function angle(c, d1, d2, r, classe, mesure) {
    const [x1, y1] = pt(c[0], c[1], r, d1), [x2, y2] = pt(c[0], c[1], r, d2), grand = (d2 - d1 + 360) % 360 > 180 ? 1 : 0;
    const secteur = "M" + f(c[0]) + " " + f(c[1]) + " L" + f(x1) + " " + f(y1) + " A" + r + " " + r + " 0 " + grand + " 0 " + f(x2) + " " + f(y2) + " Z";
    const arc = "M" + f(x1) + " " + f(y1) + " A" + r + " " + r + " 0 " + grand + " 0 " + f(x2) + " " + f(y2);
    let s = '<path d="' + secteur + '" class="' + classe + ' fig-secteur"/><path d="' + arc + '" class="' + classe + ' fig-arc"/>';
    if (mesure) s += texte(pt(c[0], c[1], r + 16, (d1 + ((d2 - d1 + 360) % 360) / 2)), mesure + "°", "fig-mesure " + classe);
    return s;
  }
  // Petit carré d'angle droit entre les directions d et d + 90
  function angleDroit(c, d, cote) {
    const a = pt(c[0], c[1], cote, d), b = pt(a[0], a[1], cote, d + 90), e = pt(c[0], c[1], cote, d + 90);
    return '<path d="M' + f(a[0]) + " " + f(a[1]) + " L" + f(b[0]) + " " + f(b[1]) + " L" + f(e[0]) + " " + f(e[1]) + '" class="fig-trait fig-fin"/>';
  }
  const svg = (contenu, titre, hauteur) => '<svg class="figure-svg" viewBox="0 0 ' + L + " " + (hauteur || H) + '" role="img" aria-label="' + titre + '">' + contenu + "</svg>";

  const DESSINS = {
    // Deux droites sécantes en O ; « opposes » : deux angles opposés par le sommet
    secantes: (o) => {
      const c = [150, 85], d1 = 20, d2 = 125;
      // « O » dans un des angles non marqués, pour ne chevaucher ni les arcs ni les droites
      let s = droite(c, d1, 130) + droite(c, d2, 95) + point(c) + texte(pt(c[0] - 5, c[1] + 5, 30, 165), "O");
      s += angle(c, d1, d2, 30, "fig-a", o.mesures && 105) + angle(c, d1 + 180, d2 + 180, 30, "fig-b", o.mesures && 105);
      return svg(s, "Deux droites sécantes en O et deux angles opposés par le sommet");
    },
    // Deux droites parallèles coupées par une sécante ; « alternes » ou « correspondants »
    paralleles: (o) => {
      const y1 = 55, y2 = 120, dSec = 62, p1 = [172, y1], p2 = [172 - (y2 - y1) / Math.tan(rad(dSec)), y2];
      // La sécante dépasse les deux parallèles, sans sortir du dessin
      let s = ligne([15, y1], [285, y1]) + ligne([15, y2], [285, y2]) + ligne(pt(p1[0], p1[1], 45, dSec), pt(p2[0], p2[1], 45, dSec + 180));
      s += texte([268, y1 - 8], "(d)") + texte([268, y2 - 8], "(d')") + point(p1) + point(p2);
      const m = o.mesures && dSec;
      if (o.marques === "correspondants") s += angle(p1, 0, dSec, 24, "fig-a", m) + angle(p2, 0, dSec, 24, "fig-b", m);
      else s += angle(p1, 180, 180 + dSec, 24, "fig-a", m) + angle(p2, 0, dSec, 24, "fig-b", m);
      return svg(s, "Deux droites parallèles (d) et (d') coupées par une sécante, avec deux angles " + (o.marques === "correspondants" ? "correspondants" : "alternes-internes"));
    },
    // Deux angles adjacents dont les côtés non communs sont alignés (sur une droite)
    adjacents: (o) => {
      const c = [150, 125], a = 55;
      let s = ligne([20, c[1]], [280, c[1]]) + demiDroite(c, a, 110) + point(c);
      s += angle(c, 0, a, 34, "fig-a", o.mesures && a) + angle(c, a, 180, 26, "fig-b", o.mesures && 180 - a);
      return svg(s, "Deux angles adjacents sur une droite");
    },
    // Un angle droit partagé en deux angles
    complementaires: (o) => {
      const c = [110, 140], a = 35;
      let s = demiDroite(c, 0, 170) + demiDroite(c, 90, 125) + demiDroite(c, a, 150) + point(c) + angleDroit(c, 0, 12);
      s += angle(c, 0, a, 52, "fig-a", o.mesures && a) + angle(c, a, 90, 40, "fig-b", o.mesures && 90 - a);
      return svg(s, "Un angle droit partagé en deux angles complémentaires");
    },
    // Quatre angles autour d'un point
    tour: (o) => {
      const c = [150, 85], ds = [15, 110, 165, 255], cl = ["fig-a", "fig-b", "fig-a", "fig-b"];
      let s = ds.map((d) => demiDroite(c, d, 78)).join("") + point(c);
      ds.forEach((d, i) => { const e = ds[(i + 1) % 4] + (i === 3 ? 360 : 0); s += angle(c, d, e, 34 + 8 * (i % 2), cl[i], o.mesures && e - d); });
      return svg(s, "Quatre angles autour d'un point");
    },
    // Un angle et sa bissectrice (en pointillés)
    bissectrice: (o) => {
      const c = [70, 140], a = 80;
      let s = demiDroite(c, 0, 210) + demiDroite(c, a, 135) + ligne(c, pt(c[0], c[1], 200, a / 2), "fig-trait fig-pointille") + point(c);
      s += angle(c, 0, a / 2, 70, "fig-a", o.mesures && a / 2) + angle(c, a / 2, a, 70, "fig-a", o.mesures && a / 2);
      return svg(s, "Un angle et sa bissectrice, qui le partage en deux angles égaux");
    },
    // Un angle plat
    plat: (o) => {
      const c = [150, 75];
      let s = demiDroite(c, 0, 125) + demiDroite(c, 180, 125) + point(c) + angle(c, 0, 180, 40, "fig-a", o.mesures && 180);
      return svg(s, "Un angle plat", 95);
    },
    // Trois angles côte à côte : aigu, droit, obtus
    "aigu-droit-obtus": () => {
      let s = "";
      [[10, 50, "aigu", "fig-a"], [105, 90, "droit", "fig-b"], [200, 130, "obtus", "fig-a"]].forEach(([x, a, nom, cl]) => {
        const c = [x + (a > 90 ? 40 : 5), 90];
        s += demiDroite(c, 0, 58) + demiDroite(c, a, 62) + (a === 90 ? angleDroit(c, 0, 12) : angle(c, 0, a, 22, cl)) + texte([c[0] + (a > 90 ? -25 : 8), 122], nom);
      });
      return svg(s, "Un angle aigu, un angle droit et un angle obtus", 130);
    }
  };

  // ---------- Figures « à toucher » : l'élève répond en touchant un angle ----------
  // Chaque angle possible est une zone : secteur invisible (assez grand pour le doigt) et arc en pointillés.
  // Un angle est repéré par « p-k » : point d'intersection p, k-ième angle en tournant à partir de la première demi-droite.
  const T = 300, TH = 240, C = [150, 120];
  const direction = (d) => ["vers la droite", "en haut à droite", "vers le haut", "en haut à gauche", "vers la gauche", "en bas à gauche", "vers le bas", "en bas à droite"][Math.round((((d % 360) + 360) % 360) / 45) % 8];
  // Angles autour d'un point : demi-droites dans l'ordre croissant des directions
  function anglesAutour(p, nom, dirs) {
    const ds = dirs.map((d) => ((d % 360) + 360) % 360).sort((a, b) => a - b);
    return ds.map((d, k) => { const e = ds[(k + 1) % ds.length] + (k === ds.length - 1 ? 360 : 0); return { id: nom + "-" + k, c: p, d1: d, d2: e, milieu: (d + e) / 2 }; });
  }
  // Les angles d'une figure à toucher (et ses traits) ; sert aussi aux exercices pour trouver la bonne réponse
  function anglesDe(spec) {
    let traits = "", angles = [];
    if (spec.type === "secantes") {
      spec.dirs.forEach((d) => { traits += droite(C, d, 170); });
      traits += point(C);
      angles = anglesAutour(C, "O", spec.dirs.concat(spec.dirs.map((d) => d + 180)));
    } else {
      // Deux parallèles de direction rot, coupées par une sécante de direction rot + s ; (d) passe par p1, (d') par p2
      const dl = spec.rot, ds = spec.rot + spec.s, p1 = pt(C[0], C[1], 56, ds), p2 = pt(C[0], C[1], 56, ds + 180);
      traits += droite(p1, dl, 200) + droite(p2, dl, 200) + droite(C, ds, 190) + point(p1) + point(p2);
      // Étiquettes au bout des droites, sans sortir du dessin
      const etiquette = (p, t) => { const q = pt(p[0], p[1], 92, dl); return texte([Math.min(275, Math.max(8, q[0])), Math.min(TH - 6, Math.max(16, q[1] - 6))], t); };
      traits += etiquette(p1, "(d)") + etiquette(p2, "(d')");
      // Un angle est « intérieur » (entre les parallèles) si sa bissectrice va vers l'autre droite
      const dedans = (a, versAutre) => Math.cos(rad(a.milieu - versAutre)) > 0;
      angles = anglesAutour(p1, "1", [dl, ds, dl + 180, ds + 180]).map((a) => Object.assign(a, { interieur: dedans(a, ds + 180) }))
        .concat(anglesAutour(p2, "2", [dl, ds, dl + 180, ds + 180]).map((a) => Object.assign(a, { interieur: dedans(a, ds) })));
    }
    return { traits: traits, angles: angles };
  }
  function figureToucher(spec) {
    const { traits, angles } = anglesDe(spec);
    const parId = Object.fromEntries(angles.map((a) => [a.id, a]));
    const marque = parId[spec.marque];
    // Arcs bien visibles et zones assez grandes pour le doigt ; pour deux parallèles, les zones des deux points
    // d'intersection (distants de 112) ne se chevauchent pas
    const ra = spec.type === "secantes" ? 44 : 36, rz = spec.type === "secantes" ? 80 : 54;
    let s = traits + angle(marque.c, marque.d1, marque.d2, ra, "fig-b");
    // Zones à toucher : celles des candidats ; numéros pour le lecteur d'écran
    const zones = spec.candidats.map((id, i) => {
      const a = parId[id], r = rz, [x1, y1] = pt(a.c[0], a.c[1], r, a.d1), [x2, y2] = pt(a.c[0], a.c[1], r, a.d2), g = a.d2 - a.d1 > 180 ? 1 : 0;
      const secteur = "M" + f(a.c[0]) + " " + f(a.c[1]) + " L" + f(x1) + " " + f(y1) + " A" + r + " " + r + " 0 " + g + " 0 " + f(x2) + " " + f(y2) + " Z";
      const [u1, v1] = pt(a.c[0], a.c[1], ra, a.d1), [u2, v2] = pt(a.c[0], a.c[1], ra, a.d2);
      const arc = "M" + f(u1) + " " + f(v1) + " A" + ra + " " + ra + " 0 " + g + " 0 " + f(u2) + " " + f(v2);
      const plein = "M" + f(a.c[0]) + " " + f(a.c[1]) + " L" + f(u1) + " " + f(v1) + " A" + ra + " " + ra + " 0 " + g + " 0 " + f(u2) + " " + f(v2) + " Z";
      return '<g class="zone-angle" data-zone="' + id + '" role="button" tabindex="0" aria-label="Angle ' + (i + 1) + ", " + direction(a.milieu) +
        (spec.type === "secantes" ? "" : a.id[0] === "1" ? ", sur la droite (d)" : ", sur la droite (d')") + '">' +
        '<path d="' + secteur + '" class="zone-cible"/><path d="' + plein + '" class="zone-plein"/><path d="' + arc + '" class="zone-arc"/></g>';
    }).join("");
    return '<svg class="figure-svg figure-toucher" viewBox="0 0 ' + T + " " + TH + '" role="group" aria-label="Figure : touche un angle">' +
      '<defs><pattern id="hachures-figure" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" class="hachure"/></pattern></defs>' +
      s + zones + "</svg>";
  }

  Savoirs.figures = {
    // Renvoie le SVG d'une figure, ou "" si le type est inconnu
    dessiner: (spec) => (spec && DESSINS[spec.type] ? DESSINS[spec.type](spec) : ""),
    // Figure dont l'élève touche un angle (format de réponse « toucher »)
    toucher: figureToucher,
    // Angles d'une figure à toucher : [{ id, d1, d2, milieu, interieur }]
    angles: (spec) => anglesDe(spec).angles.map((a) => ({ id: a.id, d1: a.d1, d2: a.d2, milieu: a.milieu, interieur: a.interieur })),
    // Bloc HTML prêt à insérer
    bloc: (spec) => { const s = Savoirs.figures.dessiner(spec); return s ? '<div class="figure">' + s + "</div>" : ""; }
  };
})();
