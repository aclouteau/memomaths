// Techniques d'entraînement de 3e : « Périmètre, aire et volume » (pv), chapitre toujours jouable.
// Il regroupe aussi les exercices d'aires de 5e (voir « regroupe » dans donnees/catalogue.js) ; ici : périmètres,
// aires du rectangle et du carré, volumes de tous les solides du collège, conversions de longueurs, de volumes
// et de contenances. Les longueurs sont données sur un schéma coté (js/moteur/schemas.js).
// Avec π : vraie valeur de π (touche π de la calculatrice) et valeur arrondie au dixième, comme en 5e.
(function () {
  const { L, T, ent, choix, net, decimal, facile } = Savoirs.calculsOutils;
  const S = Savoirs.schemas;
  const dec = (min, max) => { let x; do { x = decimal(max, 1); } while (x < min); return x; };
  const cm = (x, u) => T(x) + " " + (u || "cm");
  // Unité écrite hors formule (« cm³ » d'un seul tenant : « cm$^{3}$ » pouvait se couper en fin de ligne)
  const u2 = (u) => u + "²", u3 = (u) => u + "³";
  const PI = " Donner la valeur arrondie au dixième.";
  const au10 = (x) => net(Math.round(x * 10) / 10);
  const ambigu = (x) => Math.abs(x * 10 - Math.floor(x * 10) - 0.5) < 0.02;
  const arrondi = (x, u) => "\\approx " + L(net(Math.round(x * 1000) / 1000)) + "$ " + u + ", soit $" + L(au10(x)) + "$ " + u + " au dixième.";
  const tirer = (f) => { for (;;) { const e = f(); if (!ambigu(e.valeur)) { delete e.valeur; return e; } } };

  // ---------- Conversions : chaque unité est repérée par sa puissance de 10 (mètre, ou mètre cube) ----------
  const LONGUEURS = { km: 3, hm: 2, dam: 1, m: 0, dm: -1, cm: -2, mm: -3 };
  // Volumes et contenances sur la même échelle : 1 L = 1 dm³, 1 mL = 1 cm³
  const VOLUMES = { "m³": 0, "dm³": -3, "cm³": -6, L: -3, dL: -4, cL: -5, mL: -6 };
  const latexUnite = (u) => (u.endsWith("³") ? "\\text{" + u.slice(0, -1) + "}^{3}" : "\\text{" + u + "}");
  function convertir(v, de, vers, table) {
    const e = table[de] - table[vers], k = Math.pow(10, Math.abs(e)), r = net(e >= 0 ? v * k : v / k);
    const capacite = (u) => !u.endsWith("³") && table === VOLUMES;
    const rappel = table === VOLUMES && capacite(de) !== capacite(vers) ? " (rappel : $1\\ \\text{dm}^{3} = 1\\ \\text{L}$ et $1\\ \\text{cm}^{3} = 1\\ \\text{mL}$)" : "";
    return {
      enonce: "Convertir $" + L(v) + "\\ " + latexUnite(de) + "$ en $" + latexUnite(vers) + "$.", reponse: r, unite: vers,
      correction: e === 0 ? "$1\\ " + latexUnite(de) + " = 1\\ " + latexUnite(vers) + "$, donc $" + L(v) + "\\ " + latexUnite(de) + " = " + L(r) + "\\ " + latexUnite(vers) + "$."
        : "Pour passer des $" + latexUnite(de) + "$ aux $" + latexUnite(vers) + "$" + rappel + ", on " + (e > 0 ? "multiplie" : "divise") + " par $" + L(k) + "$ : $" + L(v) + (e > 0 ? " \\times " : " \\div ") + L(k) + " = " + L(r) + "$."
    };
  }
  // Valeur à convertir : entière, ou décimale ; dans le sens « diviser », un multiple du facteur si on veut un résultat entier
  function conversion(paires, table, valeur) {
    const [de, vers] = choix(paires), e = table[de] - table[vers];
    return convertir(valeur(e, Math.pow(10, Math.abs(e))), de, vers, table);
  }

  const pv = [
    {
      id: "pv-perimetre", chap: "pv", titre: "Périmètre d'un rectangle ou d'un carré", format: "nombre",
      niveaux: {
        1: () => {
          if (facile(1) || Math.random() < 0.4) { const c = facile(1) ? 5 : ent(2, 12); return { enonce: "Calculer le périmètre de ce carré.", schema: S.rectangle({ carre: true, elo: cm(c) }), reponse: 4 * c, unite: "cm", correction: "$P = 4 \\times c = 4 \\times " + c + " = " + 4 * c + "$ cm." }; }
          const lo = ent(4, 15), la = ent(2, lo - 1), p = 2 * (lo + la);
          return { enonce: "Calculer le périmètre de ce rectangle.", schema: S.rectangle({ lo: lo, la: la, elo: cm(lo), ela: cm(la) }), reponse: p, unite: "cm", correction: "$P = 2 \\times (L + \\ell) = 2 \\times (" + lo + " + " + la + ") = 2 \\times " + (lo + la) + " = " + p + "$ cm." };
        },
        2: () => {
          if (Math.random() < 0.3) { const c = dec(1.1, 9.9), p = net(4 * c); return { enonce: "Calculer le périmètre de ce carré.", schema: S.rectangle({ carre: true, elo: cm(c) }), reponse: p, unite: "cm", correction: "$P = 4 \\times c = 4 \\times " + L(c) + " = " + L(p) + "$ cm." }; }
          const la = ent(2, 9), lo = net(la + dec(1.1, 9.9)), s = net(lo + la), p = net(2 * s);
          return { enonce: "Calculer le périmètre de ce rectangle.", schema: S.rectangle({ lo: lo, la: la, elo: cm(lo), ela: cm(la) }), reponse: p, unite: "cm", correction: "$P = 2 \\times (L + \\ell) = 2 \\times (" + L(lo) + " + " + L(la) + ") = 2 \\times " + L(s) + " = " + L(p) + "$ cm." };
        },
        3: () => {
          if (Math.random() < 0.35) { const c = Math.random() < 0.5 ? ent(3, 25) : dec(1.1, 9.9), p = net(4 * c); return { enonce: "Ce carré a un périmètre de $" + L(p) + "$ cm. Calculer la longueur de son côté.", schema: S.rectangle({ carre: true, elo: "?" }), reponse: c, unite: "cm", correction: "$P = 4 \\times c$, donc $c = P \\div 4 = " + L(p) + " \\div 4 = " + L(c) + "$ cm." }; }
          const lo = ent(5, 20), la = Math.random() < 0.5 ? ent(2, lo - 1) : net(ent(2, lo - 1) + 0.5), s = net(lo + la), p = net(2 * s);
          return { enonce: "Ce rectangle a un périmètre de $" + L(p) + "$ cm. Calculer sa largeur.", schema: S.rectangle({ lo: lo, la: la, elo: cm(lo), ela: "?" }), reponse: la, unite: "cm", correction: "$P = 2 \\times (L + \\ell)$, donc $L + \\ell = " + L(p) + " \\div 2 = " + L(s) + "$ cm, puis $\\ell = " + L(s) + " - " + L(lo) + " = " + L(la) + "$ cm." };
        }
      }
    },
    {
      id: "pv-aire-rectangle", chap: "pv", titre: "Aire d'un rectangle ou d'un carré", format: "nombre",
      niveaux: {
        1: () => {
          if (facile(1) || Math.random() < 0.4) { const c = facile(1) ? 3 : ent(2, 10); return { enonce: "Calculer l'aire de ce carré.", schema: S.rectangle({ carre: true, elo: cm(c) }), reponse: c * c, unite: "cm²", correction: "$\\mathcal{A} = c \\times c = " + c + " \\times " + c + " = " + c * c + "$ " + u2("cm") + "." }; }
          const lo = ent(3, 10), la = ent(2, lo - 1);
          return { enonce: "Calculer l'aire de ce rectangle.", schema: S.rectangle({ lo: lo, la: la, elo: cm(lo), ela: cm(la) }), reponse: lo * la, unite: "cm²", correction: "$\\mathcal{A} = L \\times \\ell = " + lo + " \\times " + la + " = " + lo * la + "$ " + u2("cm") + "." };
        },
        2: () => {
          if (Math.random() < 0.3) { const c = ent(11, 15); return { enonce: "Calculer l'aire de ce carré.", schema: S.rectangle({ carre: true, elo: cm(c, "m") }), reponse: c * c, unite: "m²", correction: "$\\mathcal{A} = c \\times c = " + c + " \\times " + c + " = " + c * c + "$ " + u2("m") + "." }; }
          const la = ent(2, 9), lo = net(la + dec(1.1, 9.9)), a = net(lo * la);
          return { enonce: "Calculer l'aire de ce rectangle.", schema: S.rectangle({ lo: lo, la: la, elo: cm(lo), ela: cm(la) }), reponse: a, unite: "cm²", correction: "$\\mathcal{A} = L \\times \\ell = " + L(lo) + " \\times " + la + " = " + L(a) + "$ " + u2("cm") + "." };
        },
        3: () => {
          if (Math.random() < 0.4) { const c = ent(2, 15); return { enonce: "Ce carré a une aire de $" + c * c + "$ " + u2("cm") + ". Calculer la longueur de son côté.", schema: S.rectangle({ carre: true, elo: "?" }), reponse: c, unite: "cm", correction: "$c \\times c = " + c * c + "$ et $" + c + " \\times " + c + " = " + c * c + "$, donc $c = " + c + "$ cm." }; }
          const la = Math.random() < 0.5 ? ent(2, 9) : dec(1.1, 9.9), lo = ent(Math.ceil(la) + 1, 12), a = net(lo * la);
          return { enonce: "Ce rectangle a une aire de $" + L(a) + "$ " + u2("cm") + ". Calculer sa largeur.", schema: S.rectangle({ lo: lo, la: la, elo: cm(lo), ela: "?" }), reponse: la, unite: "cm", correction: "$\\mathcal{A} = L \\times \\ell$, donc $\\ell = \\mathcal{A} \\div L = " + L(a) + " \\div " + lo + " = " + L(la) + "$ cm." };
        }
      }
    },
    {
      id: "pv-vol-pave", chap: "pv", titre: "Volume d'un pavé droit ou d'un cube", format: "nombre",
      niveaux: {
        1: () => {
          if (facile(1) || Math.random() < 0.35) { const c = facile(1) ? 2 : ent(2, 5); return { enonce: "Calculer le volume de ce cube.", schema: S.cube({ ec: cm(c) }), reponse: c * c * c, unite: "cm³", correction: "$V = c \\times c \\times c = " + c + " \\times " + c + " \\times " + c + " = " + c * c * c + "$ " + u3("cm") + "." }; }
          const lo = ent(2, 10), la = ent(2, 5), h = ent(2, 5), v = lo * la * h;
          return { enonce: "Calculer le volume de ce pavé droit.", schema: S.pave({ lo: lo, la: la, h: h, elo: cm(lo), ela: cm(la), eh: cm(h) }), reponse: v, unite: "cm³", correction: "$V = L \\times \\ell \\times h = " + lo + " \\times " + la + " \\times " + h + " = " + v + "$ " + u3("cm") + "." };
        },
        2: () => {
          if (Math.random() < 0.3) { const c = ent(6, 10), v = c * c * c; return { enonce: "Calculer le volume de ce cube.", schema: S.cube({ ec: cm(c) }), reponse: v, unite: "cm³", correction: "$V = c \\times c \\times c = " + c + " \\times " + c + " \\times " + c + " = " + c * c + " \\times " + c + " = " + L(v) + "$ " + u3("cm") + "." }; }
          const lo = dec(1.1, 9.9), la = ent(2, 5), h = ent(2, 5), b = net(lo * la), v = net(b * h);
          return { enonce: "Calculer le volume de ce pavé droit.", schema: S.pave({ lo: lo, la: la, h: h, elo: cm(lo), ela: cm(la), eh: cm(h) }), reponse: v, unite: "cm³", correction: "$V = L \\times \\ell \\times h = " + L(lo) + " \\times " + la + " \\times " + h + " = " + L(b) + " \\times " + h + " = " + L(v) + "$ " + u3("cm") + "." };
        },
        3: () => {
          const lo = ent(3, 12), la = ent(2, 8), h = Math.random() < 0.5 ? ent(2, 15) : dec(1.1, 9.9), b = lo * la, v = net(b * h);
          return { enonce: "Ce pavé droit a un volume de $" + L(v) + "$ " + u3("cm") + ". Calculer sa hauteur.", schema: S.pave({ lo: lo, la: la, h: h, elo: cm(lo), ela: cm(la), eh: "?" }), reponse: h, unite: "cm",
            correction: "$V = L \\times \\ell \\times h$. Ici $L \\times \\ell = " + lo + " \\times " + la + " = " + b + "$, donc $h = " + L(v) + " \\div " + b + " = " + L(h) + "$ cm." };
        }
      }
    },
    {
      id: "pv-vol-prisme", chap: "pv", titre: "Volume d'un prisme droit", format: "nombre",
      niveaux: {
        1: () => {
          const b = facile(1) ? 10 : ent(4, 30), h = ent(2, 10);
          return { enonce: "La base de ce prisme droit (en couleur) a une aire de $" + b + "$ " + u2("cm") + ". Calculer le volume du prisme.", schema: S.prisme({ eh: cm(h), eb: b + " cm²" }), reponse: b * h, unite: "cm³", correction: "$V = \\mathcal{B} \\times h = " + b + " \\times " + h + " = " + b * h + "$ " + u3("cm") + "." };
        },
        2: () => {
          for (;;) {
            const a = ent(2, 10), c = ent(2, 10), h = ent(2, 12);
            if ((a * c) % 2) continue;
            const b = a * c / 2;
            return { enonce: "La base de ce prisme droit (en couleur) est un triangle rectangle dont les côtés de l'angle droit mesurent $" + a + "$ cm et $" + c + "$ cm. Calculer le volume du prisme.", schema: S.prisme({ eh: cm(h) }), reponse: b * h, unite: "cm³",
              correction: "Aire de la base : $\\mathcal{B} = \\dfrac{" + a + " \\times " + c + "}{2} = " + b + "$ " + u2("cm") + ". Volume : $V = \\mathcal{B} \\times h = " + b + " \\times " + h + " = " + b * h + "$ " + u3("cm") + "." };
          }
        },
        3: () => {
          const b = ent(4, 40), h = Math.random() < 0.5 ? ent(2, 15) : dec(1.1, 9.9), v = net(b * h);
          return { enonce: "Ce prisme droit a un volume de $" + L(v) + "$ " + u3("cm") + " et sa base (en couleur) a une aire de $" + b + "$ " + u2("cm") + ". Calculer sa hauteur.", schema: S.prisme({ eh: "?", eb: b + " cm²" }), reponse: h, unite: "cm",
            correction: "$V = \\mathcal{B} \\times h$, donc $h = V \\div \\mathcal{B} = " + L(v) + " \\div " + b + " = " + L(h) + "$ cm." };
        }
      }
    },
    {
      id: "pv-vol-cylindre", chap: "pv", titre: "Volume d'un cylindre", format: "nombre",
      niveaux: {
        1: () => tirer(() => {
          const r = facile(1) ? 1 : ent(1, 5), h = ent(2, 10), v = Math.PI * r * r * h;
          return { valeur: v, enonce: "Calculer le volume de ce cylindre." + PI, schema: S.cylindre({ r: r, h: h, er: cm(r), eh: cm(h) }), reponse: au10(v), unite: "cm³", correction: "$V = \\pi \\times r^{2} \\times h = \\pi \\times " + r + "^{2} \\times " + h + " = " + r * r * h + " \\times \\pi " + arrondi(v, u3("cm")) };
        }),
        2: () => tirer(() => {
          const d = 2 * ent(1, 6), r = d / 2, h = ent(2, 15), v = Math.PI * r * r * h;
          return { valeur: v, enonce: "Calculer le volume de ce cylindre." + PI, schema: S.cylindre({ r: r, h: h, ed: cm(d), eh: cm(h) }), reponse: au10(v), unite: "cm³", correction: "Le rayon est $r = " + d + " \\div 2 = " + r + "$ cm. $V = \\pi \\times r^{2} \\times h = \\pi \\times " + r + "^{2} \\times " + h + " = " + r * r * h + " \\times \\pi " + arrondi(v, u3("cm")) };
        }),
        3: () => tirer(() => {
          const r = dec(1.1, 5.9), h = ent(2, 20), r2 = net(r * r), v = Math.PI * r2 * h, u = choix(["cm", "m"]);
          return { valeur: v, enonce: "Calculer le volume de ce cylindre." + PI, schema: S.cylindre({ r: r, h: h, er: cm(r, u), eh: cm(h, u) }), reponse: au10(v), unite: u + "³", correction: "$V = \\pi \\times r^{2} \\times h = \\pi \\times " + L(r) + "^{2} \\times " + h + " = \\pi \\times " + L(r2) + " \\times " + h + " " + arrondi(v, u3(u)) };
        })
      }
    },
    {
      id: "pv-vol-pyramide-cone", chap: "pv", titre: "Volume d'une pyramide ou d'un cône", format: "nombre",
      niveaux: {
        1: () => {
          for (;;) {
            const c = facile(1) ? 3 : ent(2, 6), h = ent(2, 9), b = c * c;
            if ((b * h) % 3) continue;
            return { enonce: "Calculer le volume de cette pyramide à base carrée.", schema: S.pyramide({ lo: c, h: h, elo: cm(c), eh: cm(h) }), reponse: b * h / 3, unite: "cm³",
              correction: "Aire de la base : $\\mathcal{B} = " + c + " \\times " + c + " = " + b + "$ " + u2("cm") + ". $V = \\dfrac{\\mathcal{B} \\times h}{3} = \\dfrac{" + b + " \\times " + h + "}{3} = \\dfrac{" + b * h + "}{3} = " + b * h / 3 + "$ " + u3("cm") + "." };
          }
        },
        2: () => {
          if (Math.random() < 0.5) {
            for (;;) {
              const lo = ent(3, 10), la = ent(2, 8), h = ent(2, 12), b = lo * la;
              if ((b * h) % 3 || lo === la) continue;
              return { enonce: "Calculer le volume de cette pyramide à base rectangulaire.", schema: S.pyramide({ lo: lo, la: la, h: h, elo: cm(lo), ela: cm(la), eh: cm(h) }), reponse: b * h / 3, unite: "cm³",
                correction: "Aire de la base : $\\mathcal{B} = " + lo + " \\times " + la + " = " + b + "$ " + u2("cm") + ". $V = \\dfrac{\\mathcal{B} \\times h}{3} = \\dfrac{" + b + " \\times " + h + "}{3} = \\dfrac{" + b * h + "}{3} = " + b * h / 3 + "$ " + u3("cm") + "." };
            }
          }
          return tirer(() => {
            const r = ent(1, 6), h = ent(2, 12), v = Math.PI * r * r * h / 3;
            return { valeur: v, enonce: "Calculer le volume de ce cône." + PI, schema: S.cone({ r: r, h: h, er: cm(r), eh: cm(h) }), reponse: au10(v), unite: "cm³", correction: "$V = \\dfrac{\\pi \\times r^{2} \\times h}{3} = \\dfrac{\\pi \\times " + r + "^{2} \\times " + h + "}{3} = \\dfrac{" + r * r * h + " \\times \\pi}{3} " + arrondi(v, u3("cm")) };
          });
        },
        3: () => {
          if (Math.random() < 0.5) {
            for (;;) {
              const c = ent(2, 10), h = ent(2, 15), b = c * c, v = b * h / 3;
              if (!Number.isInteger(v)) continue;
              return { enonce: "Cette pyramide à base carrée a un volume de $" + v + "$ " + u3("cm") + ". Calculer sa hauteur.", schema: S.pyramide({ lo: c, h: h, elo: cm(c), eh: "?" }), reponse: h, unite: "cm",
                correction: "$V = \\dfrac{\\mathcal{B} \\times h}{3}$ avec $\\mathcal{B} = " + c + " \\times " + c + " = " + b + "$ " + u2("cm") + ". Donc $h = \\dfrac{3 \\times V}{\\mathcal{B}} = \\dfrac{3 \\times " + v + "}{" + b + "} = \\dfrac{" + 3 * v + "}{" + b + "} = " + h + "$ cm." };
            }
          }
          return tirer(() => {
            const d = 2 * ent(1, 8), r = d / 2, h = ent(3, 20), v = Math.PI * r * r * h / 3;
            return { valeur: v, enonce: "Calculer le volume de ce cône." + PI, schema: S.cone({ r: r, h: h, ed: cm(d), eh: cm(h) }), reponse: au10(v), unite: "cm³", correction: "Le rayon est $r = " + d + " \\div 2 = " + r + "$ cm. $V = \\dfrac{\\pi \\times r^{2} \\times h}{3} = \\dfrac{\\pi \\times " + r + "^{2} \\times " + h + "}{3} = \\dfrac{" + r * r * h + " \\times \\pi}{3} " + arrondi(v, u3("cm")) };
          });
        }
      }
    },
    {
      id: "pv-sphere-boule", chap: "pv", titre: "Aire d'une sphère et volume d'une boule", format: "nombre",
      niveaux: {
        1: () => tirer(() => {
          const r = facile(1) ? 1 : ent(1, 10), a = 4 * Math.PI * r * r;
          return { valeur: a, enonce: "Calculer l'aire de cette sphère." + PI, schema: S.boule({ er: cm(r) }), reponse: au10(a), unite: "cm²", correction: "$\\mathcal{A} = 4 \\times \\pi \\times r^{2} = 4 \\times \\pi \\times " + r + "^{2} = " + 4 * r * r + " \\times \\pi " + arrondi(a, u2("cm")) };
        }),
        2: () => tirer(() => {
          const r = ent(1, 9), v = 4 / 3 * Math.PI * r * r * r;
          return { valeur: v, enonce: "Calculer le volume de cette boule." + PI, schema: S.boule({ er: cm(r) }), reponse: au10(v), unite: "cm³", correction: "$V = \\dfrac{4}{3} \\times \\pi \\times r^{3} = \\dfrac{4}{3} \\times \\pi \\times " + r + "^{3} = \\dfrac{4 \\times " + r * r * r + " \\times \\pi}{3} " + arrondi(v, u3("cm")) };
        }),
        3: () => tirer(() => {
          const d = 2 * ent(1, 10), r = d / 2;
          if (Math.random() < 0.5) { const a = 4 * Math.PI * r * r; return { valeur: a, enonce: "Calculer l'aire de cette sphère." + PI, schema: S.boule({ ed: cm(d) }), reponse: au10(a), unite: "cm²", correction: "Le rayon est $r = " + d + " \\div 2 = " + r + "$ cm. $\\mathcal{A} = 4 \\times \\pi \\times r^{2} = 4 \\times \\pi \\times " + r + "^{2} = " + 4 * r * r + " \\times \\pi " + arrondi(a, u2("cm")) }; }
          const v = 4 / 3 * Math.PI * r * r * r;
          return { valeur: v, enonce: "Calculer le volume de cette boule." + PI, schema: S.boule({ ed: cm(d) }), reponse: au10(v), unite: "cm³", correction: "Le rayon est $r = " + d + " \\div 2 = " + r + "$ cm. $V = \\dfrac{4}{3} \\times \\pi \\times r^{3} = \\dfrac{4}{3} \\times \\pi \\times " + r + "^{3} = \\dfrac{4 \\times " + r * r * r + " \\times \\pi}{3} " + arrondi(v, u3("cm")) };
        })
      }
    },
    {
      id: "pv-conv-longueurs", chap: "pv", titre: "Convertir des longueurs", format: "nombre",
      niveaux: {
        1: () => conversion([["m", "cm"], ["cm", "mm"], ["km", "m"], ["m", "dm"], ["cm", "m"], ["mm", "cm"], ["m", "km"]], LONGUEURS,
          (e, k) => (e > 0 ? ent(2, 60) : k * ent(2, 30))),
        2: () => conversion([["m", "cm"], ["cm", "m"], ["km", "m"], ["m", "km"], ["mm", "cm"], ["dm", "mm"]], LONGUEURS,
          (e) => (e > 0 ? dec(1.1, 9.9) : ent(11, 999))),
        3: () => conversion([["km", "cm"], ["mm", "m"], ["cm", "km"], ["dam", "dm"], ["hm", "m"], ["m", "hm"]], LONGUEURS,
          (e) => (e > 0 ? decimal(9.9, ent(1, 2)) : ent(11, 9999)))
      }
    },
    {
      id: "pv-conv-volumes", chap: "pv", titre: "Convertir des volumes et des contenances", format: "nombre",
      niveaux: {
        1: () => conversion([["dm³", "L"], ["L", "dm³"], ["cm³", "mL"], ["m³", "dm³"], ["L", "cL"], ["L", "mL"], ["m³", "L"]], VOLUMES,
          (e, k) => (e >= 0 ? ent(2, 20) : k * ent(2, 20))),
        2: () => conversion([["L", "cm³"], ["cm³", "L"], ["m³", "L"], ["mL", "L"], ["dm³", "cm³"], ["cL", "mL"], ["cL", "L"]], VOLUMES,
          (e) => (e > 0 ? dec(1.1, 9.9) : ent(11, 999))),
        3: () => conversion([["m³", "cm³"], ["cL", "cm³"], ["dm³", "mL"], ["cm³", "cL"], ["L", "m³"], ["dL", "cm³"]], VOLUMES,
          (e) => (e > 0 ? decimal(9.9, ent(1, 2)) : ent(11, 9999)))
      }
    },
    {
      id: "pv-contenance", chap: "pv", titre: "Volume et contenance d'un récipient", format: "nombre",
      niveaux: {
        1: () => {
          const lo = ent(2, 10), la = ent(2, 5), h = ent(2, 5), v = lo * la * h;
          return { enonce: "Un aquarium a la forme de ce pavé droit. Combien de litres d'eau peut-il contenir ?", schema: S.pave({ lo: lo, la: la, h: h, elo: cm(lo, "dm"), ela: cm(la, "dm"), eh: cm(h, "dm") }), reponse: v, unite: "L",
            correction: "$V = " + lo + " \\times " + la + " \\times " + h + " = " + v + "\\ \\text{dm}^{3}$. Comme $1\\ \\text{dm}^{3} = 1\\ \\text{L}$, l'aquarium contient $" + v + "$ L." };
        },
        2: () => {
          const lo = 10 * ent(3, 8), la = 10 * ent(2, 5), h = 10 * ent(2, 5), v = lo * la * h;
          return { enonce: "Un aquarium a la forme de ce pavé droit. Combien de litres d'eau peut-il contenir ?", schema: S.pave({ lo: lo, la: la, h: h, elo: cm(lo), ela: cm(la), eh: cm(h) }), reponse: v / 1000, unite: "L",
            correction: "$V = " + lo + " \\times " + la + " \\times " + h + " = " + L(v) + "\\ \\text{cm}^{3}$. Comme $1\\ \\text{L} = 1\\,000\\ \\text{cm}^{3}$, l'aquarium contient $" + L(v) + " \\div 1\\,000 = " + L(v / 1000) + "$ L." };
        },
        3: () => {
          if (Math.random() < 0.5) {
            return tirer(() => {
              const r = ent(3, 12), h = ent(10, 30), v = Math.PI * r * r * h, l = v / 1000;
              return { valeur: l, enonce: "Une casserole a la forme de ce cylindre. Combien de litres peut-elle contenir ?" + PI, schema: S.cylindre({ r: r, h: h, er: cm(r), eh: cm(h) }), reponse: au10(l), unite: "L",
                correction: "$V = \\pi \\times r^{2} \\times h = \\pi \\times " + r + "^{2} \\times " + h + " = " + r * r * h + " \\times \\pi \\approx " + L(net(Math.round(v * 10) / 10)) + "\\ \\text{cm}^{3}$. Comme $1\\ \\text{L} = 1\\,000\\ \\text{cm}^{3}$ : $" + L(net(Math.round(v * 10) / 10)) + " \\div 1\\,000 " + arrondi(l, "L") };
            });
          }
          const lo = ent(5, 20) / 10, la = ent(2, 10) / 10, h = ent(2, 10) / 10, v = net(lo * la * h);
          return { enonce: "Une cuve a la forme de ce pavé droit. Combien de litres peut-elle contenir ?", schema: S.pave({ lo: lo, la: la, h: h, elo: cm(lo, "m"), ela: cm(la, "m"), eh: cm(h, "m") }), reponse: net(v * 1000), unite: "L",
            correction: "$V = " + L(lo) + " \\times " + L(la) + " \\times " + L(h) + " = " + L(v) + "\\ \\text{m}^{3}$. Comme $1\\ \\text{m}^{3} = 1\\,000\\ \\text{L}$, la cuve contient $" + L(v) + " \\times 1\\,000 = " + L(net(v * 1000)) + "$ L." };
        }
      }
    }
  ];

  Savoirs.enregistrerTechniques("3e", pv);
})();
