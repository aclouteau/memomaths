// Techniques d'entraînement de 4e : « Triangles semblables » (sembl).
// D'après propositions/referentiels/4e/sembl.json (lot 6) : les descriptions de niveau sont la spécification.
// Figures : deux triangles semblables cotés (js/moteur/schemas.js), pas en vraie grandeur ; exercice « touche le côté homologue ».
(function () {
  const { L, T, ent, choix, net, facile } = Savoirs.calculsOutils;
  const melanger = (l) => Savoirs.melanger(l);
  const deg = (x) => L(x) + "^{\\circ}";
  const angle = (a, b, c) => "\\widehat{" + a + b + c + "}";
  const cm = (x) => T(x) + " cm";

  // Forme d'un triangle de côtés AB, BC, CA (angles en A et en B, en degrés) ; null si le triangle est trop aplati
  function forme(ab, bc, ca) {
    const cosA = (ab * ab + ca * ca - bc * bc) / (2 * ab * ca), cosB = (ab * ab + bc * bc - ca * ca) / (2 * ab * bc);
    if (Math.abs(cosA) >= 1 || Math.abs(cosB) >= 1) return null;
    const a = Math.acos(cosA) * 180 / Math.PI, b = Math.acos(cosB) * 180 / Math.PI;
    return a > 22 && b > 22 && 180 - a - b > 22 ? [a, b] : null;
  }
  // Troisième côté CA « vraisemblable » (pour dessiner) quand seuls AB et BC sont connus
  function formeDe(ab, bc) {
    const essais = [];
    for (let i = 0; i < 30; i++) { const ca = ab * (0.6 + Math.random() * 0.9); const f = forme(ab, bc, ca); if (f) essais.push(f); }
    return essais.length ? choix(essais) : [60, 55];
  }
  // Rapport écrit : décimal, ou fraction (2/3, 4/3)
  const RAPPORTS_FRAC = { "0.6667": [2, 3], "1.3333": [4, 3] };
  const ecritK = (k) => { const fr = RAPPORTS_FRAC[k.toFixed(4)]; return fr ? "\\dfrac{" + fr[0] + "}{" + fr[1] + "}" : L(k); };
  // Dénominateur d'un rapport (pour que les longueurs restent entières)
  const denominateur = (k) => { for (let d = 1; d <= 20; d++) if (Math.abs(k * d - Math.round(k * d)) < 1e-9) return d; return 1; };

  // Figure : ABC et DEF, mêmes formes ; le second retourné ou tourné à partir du niveau 2
  function figure(niveau, o) {
    const [angA, angB] = o.forme;
    return Savoirs.schemas.triangles(Object.assign({
      angA: angA, angB: angB, k: o.k, noms1: ["A", "B", "C"], noms2: ["D", "E", "F"],
      miroir: niveau >= 2 && Math.random() < 0.5, tourne: niveau === 3 ? choix([0, 20, -20, 160]) : 0
    }, o));
  }
  const semblables = "Les triangles $ABC$ et $DEF$ sont semblables ($A$, $B$ et $C$ correspondent à $D$, $E$ et $F$).";

  // ---------- Reconnaître des triangles semblables ----------
  function trio(min, max) { // trois angles entiers distincts de min à max, de somme 180
    let a, b, c;
    do { a = ent(min, max); b = ent(min, max); c = 180 - a - b; } while (c < min || c > max || a === b || b === c || a === c);
    return [a, b, c];
  }
  const memes = (u, v) => u.slice().sort((x, y) => x - y).join() === v.slice().sort((x, y) => x - y).join();
  function reconnaitre1(niveau) {
    let a, b, d, e;
    const oui = Math.random() < 0.5;
    do { a = ent(20, 80); b = ent(20, 80); } while (a + b >= 160 || a === b);
    if (oui) { d = a; e = b; }
    else if (facile(niveau)) { do { d = ent(20, 80); e = ent(20, 80); } while (d + e >= 160 || d === a || e === b || d === e || memes([a, b, 180 - a - b], [d, e, 180 - d - e])); }
    else {
      do { d = a; e = ent(20, 80); if (Math.random() < 0.5) { d = ent(20, 80); e = b; } }
      while (d + e >= 160 || (d === a && e === b) || d === e || memes([a, b, 180 - a - b], [d, e, 180 - d - e]));
    }
    const ok = memes([a, b, 180 - a - b], [d, e, 180 - d - e]);
    return {
      enonce: "Dans le triangle $ABC$, $" + angle("B", "A", "C") + " = " + deg(a) + "$ et $" + angle("A", "B", "C") + " = " + deg(b) + "$. Dans le triangle $DEF$, $" +
        angle("E", "D", "F") + " = " + deg(d) + "$ et $" + angle("D", "E", "F") + " = " + deg(e) + "$. Les triangles $ABC$ et $DEF$ sont-ils semblables ?",
      reponse: ok ? "semblables" : "non semblables",
      correction: "Les angles de $ABC$ sont $" + deg(a) + "$ et $" + deg(b) + "$ ; ceux de $DEF$ sont $" + deg(d) + "$ et $" + deg(e) + "$. " +
        (ok ? "Les deux triangles ont deux angles égaux deux à deux : ils sont semblables." : "Les angles ne sont pas égaux deux à deux : les triangles ne sont pas semblables.")
    };
  }
  function reconnaitre2(niveau) {
    const abc = trio(20, 100), oui = Math.random() < 0.5;
    let def;
    if (oui) def = melanger(abc.slice());
    else {
      do { def = trio(20, 100); }
      while (memes(abc, def) || (facile(niveau) ? def.some((x) => abc.includes(x)) : !def.some((x) => abc.includes(x))));
    }
    // On donne deux angles de DEF, à des places différentes de celles de ABC (D et F, ou E et F)
    const NOMS = [angle("E", "D", "F"), angle("D", "E", "F"), angle("D", "F", "E")];
    const [i, j] = choix([[0, 2], [1, 2], [2, 0], [2, 1]]), k = 3 - i - j;
    const ok = memes(abc, def);
    const nomTroisieme = NOMS[k];
    return {
      enonce: "Dans le triangle $ABC$, $" + angle("B", "A", "C") + " = " + deg(abc[0]) + "$ et $" + angle("A", "B", "C") + " = " + deg(abc[1]) + "$. Dans le triangle $DEF$, $" +
        NOMS[i] + " = " + deg(def[i]) + "$ et $" + NOMS[j] + " = " + deg(def[j]) + "$. Les triangles $ABC$ et $DEF$ sont-ils semblables ?",
      reponse: ok ? "semblables" : "non semblables",
      correction: "Dans $ABC$ : $" + angle("A", "C", "B") + " = 180^{\\circ} - " + deg(abc[0]) + " - " + deg(abc[1]) + " = " + deg(abc[2]) + "$. Dans $DEF$ : $" + nomTroisieme + " = 180^{\\circ} - " +
        deg(def[i]) + " - " + deg(def[j]) + " = " + deg(def[k]) + "$. Les angles de $ABC$ sont $" + deg(abc[0]) + "$, $" + deg(abc[1]) + "$, $" + deg(abc[2]) + "$ ; ceux de $DEF$ sont $" +
        deg(def[i]) + "$, $" + deg(def[j]) + "$, $" + deg(def[k]) + "$. " + (ok ? "Ce sont les mêmes : les triangles sont semblables." : "Les angles ne sont pas les mêmes : les triangles ne sont pas semblables.")
    };
  }
  function reconnaitre3() {
    const oui = Math.random() < 0.5, cas = choix(["isocele", "isocele", "rectangle", "rectangle", "sommets"]);
    if (cas === "rectangle") {
      const u = ent(20, 70); let v;
      if (oui) v = choix([u, 90 - u]); else do { v = ent(20, 70); } while (v === u || v === 90 - u);
      const ok = v === u || v === 90 - u;
      return {
        enonce: "Le triangle $ABC$ est rectangle en $A$ avec $" + angle("A", "B", "C") + " = " + deg(u) + "$. Le triangle $DEF$ est rectangle en $D$ avec $" + angle("D", "E", "F") + " = " + deg(v) + "$. Les triangles $ABC$ et $DEF$ sont-ils semblables ?",
        reponse: ok ? "semblables" : "non semblables",
        correction: "Les angles de $ABC$ sont $90^{\\circ}$, $" + deg(u) + "$ et $90^{\\circ} - " + deg(u) + " = " + deg(90 - u) + "$. Ceux de $DEF$ sont $90^{\\circ}$, $" + deg(v) + "$ et $" + deg(90 - v) + "$. " +
          (ok ? "Les angles sont égaux deux à deux : semblables." : "Les angles ne sont pas les mêmes : non semblables.")
      };
    }
    let s; do { s = 2 * ent(10, 85); } while (s === 60);
    const b = (180 - s) / 2;
    if (cas === "isocele") {
      let v;
      if (oui) v = b; else do { v = ent(10, 80); } while (v === b || v === 60 || memes([s, b, b], [180 - 2 * v, v, v]));
      const ok = v === b;
      return {
        enonce: "Le triangle $ABC$ est isocèle en $A$ avec $" + angle("B", "A", "C") + " = " + deg(s) + "$. Le triangle $DEF$ est isocèle en $D$ avec $" + angle("D", "E", "F") + " = " + deg(v) + "$. Les triangles $ABC$ et $DEF$ sont-ils semblables ?",
        reponse: ok ? "semblables" : "non semblables",
        correction: "Les angles à la base de $ABC$ valent $(180^{\\circ} - " + deg(s) + ") \\div 2 = " + deg(b) + "$. Ceux de $DEF$ valent $" + deg(v) + "$ et son angle au sommet vaut $180^{\\circ} - 2 \\times " + deg(v) + " = " + deg(180 - 2 * v) + "$. " +
          (ok ? "Les angles sont égaux deux à deux : semblables." : "Les angles ne sont pas les mêmes : non semblables.")
      };
    }
    let t;
    if (oui) t = s; else do { t = 2 * ent(10, 85); } while (t === s);
    const ok = t === s;
    return {
      enonce: "Les triangles $ABC$ et $DEF$ sont isocèles, en $A$ et en $D$, avec $" + angle("B", "A", "C") + " = " + deg(s) + "$ et $" + angle("E", "D", "F") + " = " + deg(t) + "$. Sont-ils semblables ?",
      reponse: ok ? "semblables" : "non semblables",
      correction: "Les angles à la base valent $(180^{\\circ} - " + deg(s) + ") \\div 2 = " + deg(b) + "$ dans $ABC$ et $(180^{\\circ} - " + deg(t) + ") \\div 2 = " + deg((180 - t) / 2) + "$ dans $DEF$. " +
        (ok ? "Les angles sont égaux deux à deux : semblables." : "Les angles ne sont pas les mêmes : non semblables.")
    };
  }

  // ---------- Longueur dans un triangle semblable ----------
  function longueurDirecte(niveau, k) { // EF = k × BC, avec AB et DE pour trouver k
    const d = denominateur(k);
    let ab, bc;
    // AB et BC pas trop différents, pour que la figure reste vraisemblable
    const ok = () => ab >= 2 && bc >= 2 && ab / bc <= 2.5 && bc / ab <= 2.5 && !(ab === bc && Math.random() < 0.7);
    if (niveau === 1) do { ab = ent(2, 12); bc = ent(2, 12); } while (!ok());
    else do { ab = d * ent(1, Math.max(1, Math.floor(16 / d))); bc = d * ent(1, Math.max(1, Math.floor(20 / d))); } while (!ok());
    const de = net(k * ab), ef = net(k * bc);
    return {
      enonce: semblables + " Calculer $EF$.",
      schema: figure(niveau, { forme: formeDe(ab, bc), k: k, cotes1: [cm(ab), cm(bc), ""], cotes2: [cm(de), "?", ""] }),
      reponse: ef, unite: "cm",
      correction: "Le rapport est $k = \\dfrac{DE}{AB} = \\dfrac{" + L(de) + "}{" + L(ab) + "} = " + ecritK(k) + "$. Donc $EF = k \\times BC = " + ecritK(k) + " \\times " + L(bc) + " = " + L(ef) + "$ cm."
    };
  }
  function longueur3() {
    const type = choix(["direct", "retour", "perimetre"]);
    if (type === "direct") return longueurDirecte(3, choix([1.5, 2.5, 0.75, 1.25, 0.4, 2 / 3, 4 / 3]));
    if (type === "retour") { // BC connaissant DE, EF et AB : BC = EF × AB / DE
      const k = choix([1.5, 2.5, 0.75, 1.25, 0.4, 2 / 3, 4 / 3]), d = denominateur(k), n = Math.round(k * d); // DE / AB = n / d
      let u, w; do { u = ent(1, 5); w = ent(1, 6); } while (u === w || u / w > 2.5 || w / u > 2.5);
      const ab = d * u, de = n * u, bc = d * w, ef = n * w;
      return {
        enonce: semblables + " Calculer $BC$.",
        schema: figure(3, { forme: formeDe(ab, bc), k: k, cotes1: [cm(ab), "?", ""], cotes2: [cm(de), cm(ef), ""] }),
        reponse: bc, unite: "cm",
        correction: "Les côtés homologues sont proportionnels : $\\dfrac{BC}{EF} = \\dfrac{AB}{DE}$ donc $BC = \\dfrac{" + L(ef) + " \\times " + L(ab) + "}{" + L(de) + "} = " + L(bc) + "$ cm."
      };
    }
    // Périmètre de DEF
    const k = choix([1.5, 2.5, 0.5, 2, 3]), d = denominateur(k);
    let ab, bc, ca, f;
    do { ab = ent(3, 12); bc = ent(3, 12); ca = ent(3, 12); f = forme(ab, bc, ca); } while (!f || (ab * k) % 1 || ((ab + bc + ca) * k) % 1 || (d > 1 && (ab + bc + ca) % d));
    const p = ab + bc + ca, de = net(k * ab), r = net(k * p);
    return {
      enonce: semblables + " Calculer le périmètre du triangle $DEF$.",
      schema: figure(3, { forme: f, k: k, cotes1: [cm(ab), cm(bc), cm(ca)], cotes2: [cm(de), "", ""] }),
      reponse: r, unite: "cm",
      correction: "Le rapport est $k = \\dfrac{DE}{AB} = \\dfrac{" + L(de) + "}{" + ab + "} = " + L(k) + "$. Le périmètre de $ABC$ est $" + ab + " + " + bc + " + " + ca + " = " + p +
        "$ cm ; les longueurs sont multipliées par $" + L(k) + "$, donc le périmètre de $DEF$ est $" + L(k) + " \\times " + p + " = " + L(r) + "$ cm."
    };
  }

  // ---------- Rapport d'un agrandissement ou d'une réduction ----------
  function rapportSimple(niveau, k) {
    const d = denominateur(k), ab = d * ent(Math.max(1, Math.ceil(2 / d)), Math.max(2, Math.floor((niveau === 1 ? 12 : 40) / d))), de = net(k * ab);
    const verbe = k > 1 ? "agrandi" : "réduit";
    if (Math.random() < 0.5) return {
      enonce: "Un triangle $ABC$ est " + verbe + " en un triangle $DEF$ avec un rapport $k = " + L(k) + "$. Calculer $DE$ sachant que $AB = " + L(ab) + "$ cm.",
      reponse: de, unite: "cm",
      correction: "$DE = k \\times AB = " + L(k) + " \\times " + L(ab) + " = " + L(de) + "$ cm."
    };
    return {
      enonce: "Un triangle $ABC$ est transformé en un triangle $DEF$ semblable. On a $AB = " + L(ab) + "$ cm et $DE = " + L(de) + "$ cm. Calculer le rapport $k$.",
      reponse: k,
      correction: "$k = \\dfrac{DE}{AB} = \\dfrac{" + L(de) + "}{" + L(ab) + "} = " + L(k) + "$." + (k > 1 ? " C'est un agrandissement." : " C'est une réduction.")
    };
  }
  function rapport3() {
    const k = choix([1.5, 2.5, 0.25, 0.2]), d = denominateur(k), type = choix(["perimetres", "depart", "perimetre"]);
    if (type === "perimetres") {
      const p1 = d * ent(Math.ceil(20 / d), Math.floor(80 / d)), p2 = net(k * p1);
      return {
        enonce: "Deux triangles semblables ont pour périmètres " + T(p1) + " cm et " + T(p2) + " cm. Calculer le rapport $k$ pour passer du premier au second.",
        reponse: k,
        correction: "Les périmètres sont multipliés par $k$ : $k = \\dfrac{" + L(p2) + "}{" + L(p1) + "} = " + L(k) + "$."
      };
    }
    if (type === "depart") {
      const ab = d * ent(Math.ceil(4 / d), Math.floor(60 / d)), de = net(k * ab);
      return {
        enonce: "Un triangle $ABC$ est transformé en un triangle semblable $DEF$ de rapport $k = " + L(k) + "$. On sait que $DE = " + L(de) + "$ cm. Calculer $AB$.",
        reponse: ab, unite: "cm",
        correction: "$DE = k \\times AB$ donc $AB = DE \\div k = " + L(de) + " \\div " + L(k) + " = " + L(ab) + "$ cm."
      };
    }
    const p1 = d * ent(Math.ceil(12 / d), Math.floor(60 / d)), p2 = net(k * p1);
    return {
      enonce: "Un triangle de périmètre " + T(p1) + " cm est " + (k > 1 ? "agrandi" : "réduit") + " avec un rapport $k = " + L(k) + "$. Calculer le périmètre du triangle obtenu.",
      reponse: p2, unite: "cm",
      correction: "Les longueurs, donc le périmètre, sont multipliées par $k$ : $" + L(k) + " \\times " + L(p1) + " = " + L(p2) + "$ cm."
    };
  }

  // ---------- Aire dans un agrandissement ou une réduction ----------
  const MULT_AIRE = { 0.5: 4, 1.5: 4, 2.5: 4, 0.25: 16, 0.1: 100 }; // aire multiple de… pour que l'aire obtenue soit entière
  function aireObtenue(k, aire) {
    const k2 = net(k * k), r = net(aire * k2);
    return {
      enonce: "Un triangle d'aire " + T(aire) + " cm² est " + (k > 1 ? "agrandi" : "réduit") + " avec un rapport $k = " + L(k) + "$. Calculer l'aire du triangle obtenu.",
      reponse: r, unite: "cm²",
      correction: "Les aires sont multipliées par $k^{2} = " + L(k) + "^{2} = " + L(k2) + "$ : $" + L(aire) + " \\times " + L(k2) + " = " + L(r) + "$ cm²."
    };
  }
  function aireDe(k, min, max) { const m = MULT_AIRE[k] || 1; return m * ent(Math.ceil(min / m), Math.floor(max / m)); }
  function aire3() {
    const k = choix([1.5, 2.5, 0.5, 0.25, 0.1]), k2 = net(k * k), type = choix(["rapport", "cotes", "inutile"]);
    const a1 = aireDe(k, k < 0.3 ? 100 : 8, k < 0.3 ? 2000 : 120), a2 = net(a1 * k2);
    if (type === "rapport") return {
      enonce: "Deux triangles semblables ont pour aires " + T(a1) + " cm² et " + T(a2) + " cm². Calculer le rapport $k$ pour passer du premier au second.",
      reponse: k,
      correction: "Les aires sont dans le rapport $k^{2} = \\dfrac{" + L(a2) + "}{" + L(a1) + "} = " + L(k2) + "$, donc $k = " + L(k) + "$ (car $" + L(k) + " \\times " + L(k) + " = " + L(k2) + "$)."
    };
    if (type === "cotes") {
      const d = denominateur(k), ab = d * ent(Math.max(1, Math.ceil(4 / d)), Math.max(2, Math.floor(40 / d))), de = net(k * ab);
      return {
        enonce: semblables + " On a $AB = " + L(ab) + "$ cm et $DE = " + L(de) + "$ cm. L'aire de $ABC$ est " + T(a1) + " cm². Calculer l'aire de $DEF$.",
        reponse: a2, unite: "cm²",
        correction: "Le rapport est $k = \\dfrac{" + L(de) + "}{" + L(ab) + "} = " + L(k) + "$. Les aires sont multipliées par $k^{2} = " + L(k2) + "$ : $" + L(a1) + " \\times " + L(k2) + " = " + L(a2) + "$ cm²."
      };
    }
    const per = ent(12, 60);
    return {
      enonce: "Un triangle a pour aire " + T(a1) + " cm² et pour périmètre " + per + " cm. Il est " + (k > 1 ? "agrandi" : "réduit") + " avec un rapport $k = " + L(k) + "$. Calculer l'aire du triangle obtenu.",
      reponse: a2, unite: "cm²",
      correction: "Le périmètre ne sert pas ici. Les aires sont multipliées par $k^{2} = " + L(k) + "^{2} = " + L(k2) + "$ : $" + L(a1) + " \\times " + L(k2) + " = " + L(a2) + "$ cm²."
    };
  }

  // ---------- Angle dans un triangle semblable ----------
  function angleSembl(niveau) {
    const direct = niveau === 1 || facile(niveau);
    let a, b; do { a = ent(20, niveau === 1 ? 80 : 100); b = ent(20, niveau === 1 ? 80 : 100); } while (a === b || 180 - a - b < 20 || 180 - a - b > 100 || 180 - a - b === a || 180 - a - b === b);
    const c = 180 - a - b, q = direct ? (niveau === 1 && facile(1) ? 0 : niveau === 1 ? 1 : choix([0, 1])) : 2;
    const NOMS = [angle("E", "D", "F"), angle("D", "E", "F"), angle("D", "F", "E")], ORIG = [angle("B", "A", "C"), angle("A", "B", "C"), angle("A", "C", "B")], val = [a, b, c];
    const etiq2 = ["", "", ""]; etiq2[q] = "?";
    return {
      enonce: semblables + " Calculer $" + NOMS[q] + "$.",
      schema: figure(niveau, { forme: [a, b], k: choix([0.8, 1.25]), angles1: [L(a) + "°", L(b) + "°", ""], angles2: etiq2, marques2: [q === 0 ? 1 : 0, q === 1 ? 1 : 0, q === 2 ? 1 : 0] }),
      reponse: val[q], unite: "°",
      correction: (q === 2 ? "Dans $ABC$, $" + ORIG[2] + " = 180^{\\circ} - " + deg(a) + " - " + deg(b) + " = " + deg(c) + "$. " : "") +
        "Les angles homologues sont égaux : $" + NOMS[q] + " = " + ORIG[q] + " = " + deg(val[q]) + "$."
    };
  }
  function angle3() {
    const cas = choix(["isocele", "rectangle", "multiple"]);
    if (cas === "rectangle") {
      const u = ent(20, 70);
      return {
        enonce: "Le triangle $ABC$ est rectangle en $A$ avec $" + angle("A", "B", "C") + " = " + deg(u) + "$. Le triangle $DEF$ est semblable à $ABC$ ($D$ correspond à $A$, $E$ à $B$). Calculer $" + angle("D", "F", "E") + "$.",
        reponse: 90 - u, unite: "°",
        correction: "$DEF$ est rectangle en $D$, donc $" + angle("D", "F", "E") + " = 90^{\\circ} - " + deg(u) + " = " + deg(90 - u) + "$ (et $" + angle("D", "E", "F") + " = " + deg(u) + "$)."
      };
    }
    if (cas === "isocele") {
      let s; do { s = 2 * ent(10, 85); } while (s === 60);
      const b = (180 - s) / 2;
      return {
        enonce: "Le triangle $ABC$ est isocèle en $A$ avec $" + angle("B", "A", "C") + " = " + deg(s) + "$. Le triangle $DEF$ est semblable à $ABC$ ($D$ correspond à $A$). Calculer $" + angle("D", "E", "F") + "$.",
        reponse: b, unite: "°",
        correction: "$DEF$ est isocèle en $D$ avec un angle au sommet de $" + deg(s) + "$. Ses angles à la base valent $(180^{\\circ} - " + deg(s) + ") \\div 2 = " + deg(b) + "$."
      };
    }
    // Angle au sommet égal à m fois un angle à la base : base = 180 ÷ (m + 2)
    const [m, mot] = choix([[2, "deux"], [3, "trois"], [4, "quatre"], [8, "huit"]]), base = 180 / (m + 2), sommet = m * base;
    const demande = Math.random() < 0.6;
    return {
      enonce: "Le triangle $ABC$ est isocèle en $A$ et son angle au sommet est " + mot + " fois un angle à la base. Le triangle $DEF$ est semblable à $ABC$ ($D$ correspond à $A$). Calculer $" + (demande ? angle("E", "D", "F") : angle("D", "E", "F")) + "$.",
      reponse: demande ? sommet : base, unite: "°",
      correction: "Si un angle à la base vaut $x$, l'angle au sommet vaut $" + m + "x$ et $x + x + " + m + "x = 180^{\\circ}$, soit $" + (m + 2) + "x = 180^{\\circ}$ et $x = " + deg(base) + "$. " +
        "L'angle au sommet vaut $" + m + " \\times " + deg(base) + " = " + deg(sommet) + "$. Les angles homologues sont égaux : $" + (demande ? angle("E", "D", "F") + " = " + deg(sommet) : angle("D", "E", "F") + " = " + deg(base)) + "$."
    };
  }

  // ---------- Exercice « touche » : le côté homologue ----------
  // Niveau 1 : même position ; niveau 2 : le second triangle est retourné ou tourné ; niveau 3 : la correspondance
  // n'est pas dite, elle se lit sur les angles marqués (un arc, deux arcs, sans arc).
  function homologue(niveau) {
    let a, b; do { a = ent(35, 80); b = ent(35, 80); } while (Math.abs(a - b) < 12 || 180 - a - b < 35 || Math.abs(180 - a - b - a) < 12 || Math.abs(180 - a - b - b) < 12);
    const i = ent(0, 2), cotes1 = ["", "", ""]; cotes1[i] = "?";
    const noms1 = ["A", "B", "C"], noms2 = ["D", "E", "F"], cote1 = noms1[i] + noms1[(i + 1) % 3], cote2 = noms2[i] + noms2[(i + 1) % 3];
    const marques = niveau === 3 ? [1, 2, 0] : null;
    return {
      enonce: (niveau === 3 ? "Les triangles $ABC$ et $DEF$ sont semblables : les angles marqués de la même façon sont égaux." : semblables) +
        " Touche le côté de $DEF$ homologue de $[" + cote1 + "]$.",
      format: "toucher",
      aide: "Touche un côté du triangle DEF.",
      figure: Savoirs.schemas.triangles({
        angA: a, angB: b, k: choix([0.7, 1.4]), noms1: noms1, noms2: noms2, cotes1: cotes1, marques1: marques, marques2: marques,
        miroir: niveau >= 2 && Math.random() < 0.6, tourne: niveau >= 2 ? choix([0, 25, -25, 180, 150]) : 0, zones: "cotes2"
      }),
      reponse: String(i), libelle: "le côté $[" + cote2 + "]$",
      correction: (niveau === 3 ? "Les angles égaux se correspondent : $A$ et $D$ (un arc), $B$ et $E$ (deux arcs), $C$ et $F$. " : "$" + noms1[i] + "$ correspond à $" + noms2[i] + "$ et $" + noms1[(i + 1) % 3] + "$ à $" + noms2[(i + 1) % 3] + "$. ") +
        "Le côté homologue de $[" + cote1 + "]$ est $[" + cote2 + "]$."
    };
  }

  const sembl = [
    {
      id: "sembl-reconnaitre", chap: "sembl", titre: "Triangles semblables ou non ?", format: "choix", options: ["semblables", "non semblables"],
      niveaux: { 1: () => reconnaitre1(1), 2: () => reconnaitre2(2), 3: () => reconnaitre3() }
    },
    {
      id: "sembl-homologue", chap: "sembl", titre: "Côtés homologues", format: "toucher",
      niveaux: { 1: () => homologue(1), 2: () => homologue(2), 3: () => homologue(3) }
    },
    {
      id: "sembl-longueur", chap: "sembl", titre: "Longueur dans un triangle semblable", format: "nombre",
      niveaux: {
        1: () => longueurDirecte(1, facile(1) ? 2 : ent(2, 5)),
        2: () => longueurDirecte(2, facile(2) ? ent(2, 5) : choix([1.5, 2.5, 0.5, 3.5])),
        3: () => longueur3()
      }
    },
    {
      id: "sembl-rapport", chap: "sembl", titre: "Rapport d'un agrandissement ou d'une réduction", format: "nombre",
      niveaux: {
        1: () => rapportSimple(1, facile(1) ? 2 : ent(2, 6)),
        2: () => rapportSimple(2, facile(2) ? ent(2, 6) : choix([0.5, 0.25, 1.5, 2.5, 0.1])),
        3: () => rapport3()
      }
    },
    {
      id: "sembl-aire", chap: "sembl", titre: "Aire dans un agrandissement ou une réduction", format: "nombre",
      niveaux: {
        1: () => aireObtenue(facile(1) ? 2 : ent(2, 4), ent(2, 20)),
        2: () => { if (facile(2)) return aireObtenue(ent(2, 5), ent(2, 20)); const k = choix([0.5, 1.5, 0.1, 3]); return aireObtenue(k, k === 3 ? ent(2, 20) : aireDe(k, k === 0.1 ? 100 : 4, k === 0.1 ? 2000 : 100)); },
        3: () => aire3()
      }
    },
    {
      id: "sembl-angle", chap: "sembl", titre: "Angle dans un triangle semblable", format: "nombre",
      niveaux: { 1: () => angleSembl(1), 2: () => angleSembl(2), 3: () => angle3() }
    }
  ];

  // Toutes ces techniques servent au chapitre « Triangles semblables et théorème de Thalès » de 3e (donnees/3e/techniques-sembl.js).
  // En 4e (mise à jour de novembre 2026), la leçon ne garde que les angles : longueurs, rapport, aire et côtés homologues sont vus en 3e.
  Savoirs.techniquesSembl = sembl;
  Savoirs.enregistrerTechniques("4e", sembl.filter((t) => t.id === "sembl-reconnaitre" || t.id === "sembl-angle"));
})();
