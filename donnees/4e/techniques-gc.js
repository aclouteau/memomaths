// Techniques d'entraînement de 4e : « Grandeurs composées » (gc).
// D'après propositions/referentiels/4e/gc.json (lot 6) : les descriptions de niveau sont la spécification.
// Vitesses vraisemblables selon le moyen de transport (un marcheur ne va pas à 19 m/s).
(function () {
  const { L, T, ent, choix, net, facile, fixe, fixeTexte } = Savoirs.calculsOutils;
  // Moyens de transport et vitesses vraisemblables (km/h)
  const MOBILES = [
    { nom: "Un marcheur", min: 3, max: 6 }, { nom: "Un coureur", min: 8, max: 16 }, { nom: "Un cycliste", min: 12, max: 30 },
    { nom: "Une voiture", min: 40, max: 110 }, { nom: "Un train", min: 60, max: 200 }, { nom: "Un bus", min: 20, max: 60 }
  ];
  const mobile = (v) => choix(MOBILES.filter((m) => v >= m.min && v <= m.max)) || { nom: "Un véhicule" };
  const MIN = [6, 12, 15, 24, 30, 36, 45];
  const duree = (h, m) => (h ? h + " h" : "") + (h && m ? " " : "") + (m ? m + " min" : "");
  const enHeures = (m) => "\\dfrac{" + m + "}{60} = " + L(net(m / 60));

  // ---------- Vitesse moyenne ----------
  function vitesse(niveau) {
    if (niveau === 1) {
      const v = facile(1) ? 10 : choix([ent(4, 6), ent(10, 25), 5 * ent(8, 22), 10 * ent(8, 18)]), t = ent(2, 6), d = v * t;
      return { enonce: mobile(v).nom + " parcourt " + T(d) + " km en " + t + " h. Calculer sa vitesse moyenne.", reponse: v, unite: "km/h",
        correction: "$v = \\dfrac{d}{t} = \\dfrac{" + L(d) + "}{" + t + "} = " + v + "$ km/h." };
    }
    if (niveau === 2) {
      let v, m, d;
      do { m = facile(2) ? 30 : choix(MIN); v = ent(6, 90); d = net(v * m / 60); } while (!Number.isInteger(d) || d < 2 || d > 40);
      return { enonce: mobile(v).nom + " parcourt " + d + " km en " + m + " min. Calculer sa vitesse moyenne en km/h.", reponse: v, unite: "km/h",
        correction: "La durée est $" + enHeures(m) + "$ h. $v = \\dfrac{d}{t} = \\dfrac{" + d + "}{" + L(net(m / 60)) + "} = " + v + "$ km/h. (On peut aussi calculer $" + d + " \\times \\dfrac{60}{" + m + "}$.)" };
    }
    let v, h, m, d;
    do { v = choix([8, 12, 16, 20, 24, 36, 40, 60, 80]); h = ent(1, 4); m = choix([15, 30, 45]); d = net(v * (h + m / 60)); } while (!Number.isInteger(d));
    const t = net(h + m / 60);
    return { enonce: mobile(v).nom + " parcourt " + T(d) + " km en " + duree(h, m) + ". Calculer sa vitesse moyenne.", reponse: v, unite: "km/h",
      correction: "La durée est $" + h + " + \\dfrac{" + m + "}{60} = " + L(t) + "$ h. $v = \\dfrac{d}{t} = \\dfrac{" + L(d) + "}{" + L(t) + "} = " + v + "$ km/h." };
  }

  // ---------- Distance ----------
  function distance(niveau) {
    if (niveau === 1) {
      const simple = facile(1), v = simple ? 10 * ent(1, 9) : choix([ent(3, 20), choix([25, 30, 40, 45, 50, 60, 70, 80, 90])]), t = simple ? 2 : ent(2, 5);
      return { enonce: mobile(v).nom + " avance à " + v + " km/h pendant " + t + " h. Calculer la distance parcourue.", reponse: v * t, unite: "km",
        correction: "$d = v \\times t = " + v + " \\times " + t + " = " + v * t + "$ km." };
    }
    if (niveau === 2) {
      const simple = facile(2), m = simple ? 30 : choix(MIN), v = simple ? 2 * ent(2, 45) : ent(4, 90), d = net(v * m / 60);
      return { enonce: mobile(v).nom + " avance à " + v + " km/h pendant " + m + " min. Calculer la distance parcourue.", reponse: d, unite: "km",
        correction: "La durée est $" + enHeures(m) + "$ h. $d = v \\times t = " + v + " \\times " + L(net(m / 60)) + " = " + L(d) + "$ km." };
    }
    if (Math.random() < 0.5) {
      const [nom, v] = choix([["Un marcheur", ent(1, 2)], ["Un coureur", ent(3, 5)], ["Un cycliste", ent(4, 9)], ["Une voiture", ent(15, 30)]]), m = ent(2, 20), d = v * m * 60;
      return { enonce: nom + " avance à " + v + " m/s pendant " + m + " min. Calculer la distance parcourue en mètres.", reponse: d, unite: "m",
        correction: "La durée est $" + m + " \\times 60 = " + m * 60 + "$ s. $d = v \\times t = " + v + " \\times " + m * 60 + " = " + L(d) + "$ m." };
    }
    let v, h, m, d;
    do { v = 5 * ent(1, 18); h = ent(1, 4); m = choix([12, 15, 24, 30, 45]); d = net(v * (h + m / 60)); } while (d > 400);
    const t = net(h + m / 60);
    return { enonce: mobile(v).nom + " avance à " + v + " km/h pendant " + duree(h, m) + ". Calculer la distance parcourue.", reponse: d, unite: "km",
      correction: "La durée est $" + h + " + \\dfrac{" + m + "}{60} = " + L(t) + "$ h. $d = v \\times t = " + v + " \\times " + L(t) + " = " + L(d) + "$ km." };
  }

  // ---------- Durée ----------
  function dureeTrajet(niveau) {
    if (niveau === 1) {
      const v = facile(1) ? 60 : choix([20, 30, 40, 50, 60, 80, 90, 120]), t = ent(2, 6), d = v * t, n = mobile(v).nom;
      return { enonce: n + " avance à " + v + " km/h. Combien d'heures met-" + (n.startsWith("Une") ? "elle" : "il") + " pour parcourir " + d + " km ?", reponse: t, unite: "h",
        correction: "$t = \\dfrac{d}{v} = \\dfrac{" + d + "}{" + v + "} = " + t + "$ h." };
    }
    if (niveau === 2) {
      let v, d, m;
      do { v = facile(2) ? 60 : choix([20, 30, 40, 50, 60, 80, 90, 100, 120]); d = ent(5, 150); m = net(d / v * 60); } while (!Number.isInteger(m) || m % 60 === 0 && !facile(2));
      const n = mobile(v).nom;
      return { enonce: n + " avance à " + v + " km/h. Combien de minutes met-" + (n.startsWith("Une") ? "elle" : "il") + " pour parcourir " + d + " km ?", reponse: m, unite: "min",
        correction: "$t = \\dfrac{d}{v} = \\dfrac{" + d + "}{" + v + "}$ h, soit $\\dfrac{" + d + "}{" + v + "} \\times 60 = " + m + "$ min." };
    }
    if (Math.random() < 0.5) {
      let v, d, m;
      do { v = ent(2, 15); m = ent(2, 30); d = v * 60 * m; } while (d < 100 || d > 3000);
      const n = v <= 2 ? "Un marcheur" : v <= 5 ? "Un coureur" : v <= 10 ? "Un cycliste" : "Une voiture";
      return { enonce: n + " avance à " + v + " m/s. Combien de minutes met-" + (n.startsWith("Une") ? "elle" : "il") + " pour parcourir " + T(d) + " m ?", reponse: m, unite: "min",
        correction: "$t = \\dfrac{d}{v} = \\dfrac{" + L(d) + "}{" + v + "} = " + L(d / v) + "$ s, soit $" + L(d / v) + " \\div 60 = " + m + "$ min." };
    }
    let v, d, m;
    do { v = choix([12, 15, 18, 24, 25, 30, 36, 45, 48, 72]); d = choix([6, 9, 12, 18, 27, 30, 36, 45, 60]); m = net(d / v * 60); } while (!Number.isInteger(m));
    const n = mobile(v).nom;
    return { enonce: n + " avance à " + v + " km/h. Combien de minutes met-" + (n.startsWith("Une") ? "elle" : "il") + " pour parcourir " + d + " km ?", reponse: m, unite: "min",
      correction: "$t = \\dfrac{d}{v} = \\dfrac{" + d + "}{" + v + "}$ h, soit $\\dfrac{" + d + "}{" + v + "} \\times 60 = " + m + "$ min." };
  }

  // ---------- Convertir une vitesse ----------
  function conversion(niveau) {
    if (niveau === 1) {
      const v = facile(1) ? 10 : ent(1, 30), r = net(v * 3.6);
      return { enonce: "Convertir " + v + " m/s en km/h.", reponse: r, unite: "km/h", correction: "Pour passer de m/s à km/h, on multiplie par $3{,}6$ : $" + v + " \\times 3{,}6 = " + L(r) + "$ km/h." };
    }
    if (niveau === 2) {
      const v = facile(2) ? 36 : 9 * ent(1, 20), r = net(v / 3.6);
      return { enonce: choix(["Convertir " + v + " km/h en m/s.", "Exprimer " + v + " km/h en m/s.", "Une vitesse de " + v + " km/h correspond à combien de m/s ?"]), reponse: r, unite: "m/s",
        correction: "Pour passer de km/h à m/s, on divise par $3{,}6$ : $" + v + " \\div 3{,}6 = " + L(r) + "$ m/s." };
    }
    const type = choix(["ms-mmin", "kmh-mmin", "ms-dec"]);
    if (type === "ms-mmin") { const v = ent(2, 30); return { enonce: "Convertir " + v + " m/s en m/min.", reponse: v * 60, unite: "m/min", correction: "En une minute (60 s), on parcourt 60 fois plus : $" + v + " \\times 60 = " + v * 60 + "$ m/min." }; }
    if (type === "kmh-mmin") { const v = 6 * ent(1, 20), r = v * 1000 / 60; return { enonce: "Convertir " + v + " km/h en m/min.", reponse: r, unite: "m/min", correction: "$" + v + "$ km/h, c'est $" + L(v * 1000) + "$ m en 60 min : $" + L(v * 1000) + " \\div 60 = " + L(r) + "$ m/min." }; }
    const v = ent(5, 49) + 0.5, r = net(v * 3.6);
    return { enonce: "Convertir " + T(v) + " m/s en km/h.", reponse: r, unite: "km/h", correction: "$" + L(v) + " \\times 3{,}6 = " + L(r) + "$ km/h." };
  }

  // ---------- Énergie et coût ----------
  function energie(niveau) {
    if (niveau === 1) {
      const p = ent(2, 9), t = facile(1) ? 1 : ent(2, 12);
      return { enonce: "Un appareil de " + p + " kW fonctionne pendant " + t + " h. Calculer l'énergie consommée en kWh.", reponse: p * t, unite: "kWh",
        correction: "$E = P \\times t = " + p + " \\times " + t + " = " + p * t + "$ kWh." };
    }
    if (niveau === 2) {
      const w = facile(2) ? 1000 * ent(1, 3) : choix([100, 200, 250, 500, 750, 800, 1200, 1500, 2000]), t = ent(2, 10), kw = net(w / 1000), e = net(kw * t);
      const app = w <= 250 ? "Une télévision" : w <= 800 ? "Un ordinateur" : "Un radiateur";
      return { enonce: app + " de " + T(w) + " W fonctionne pendant " + t + " h. Calculer l'énergie consommée en kWh.", reponse: e, unite: "kWh",
        correction: "La puissance est $\\dfrac{" + L(w) + "}{1\\,000} = " + L(kw) + "$ kW. $E = P \\times t = " + L(kw) + " \\times " + t + " = " + L(e) + "$ kWh." };
    }
    if (Math.random() < 0.5) {
      let w, t, e; do { w = 500 * ent(1, 6); t = ent(1, 10); e = net(w / 1000 * t); } while (!Number.isInteger(e) || e < 2);
      const prix = choix([0.15, 0.16, 0.18, 0.2, 0.22, 0.25]), c = net(e * prix);
      return { enonce: "Un radiateur de " + T(w) + " W fonctionne pendant " + t + " h. Le kWh coûte " + fixeTexte(prix, 2) + " €. Calculer le coût de l'énergie consommée.", reponse: c, unite: "€",
        correction: "$E = " + L(net(w / 1000)) + " \\times " + t + " = " + e + "$ kWh. Coût : $" + e + " \\times " + fixe(prix, 2) + " = " + fixe(c, 2) + "$ €." };
    }
    let p, m, e;
    do { p = choix([0.8, 0.9, 1.2, 1.5, 2, 2.4]); m = choix([15, 20, 30, 40, 45]); e = net(p * m / 60); } while (Math.abs(e * 1000 - Math.round(e * 1000)) > 1e-6);
    const t = net(m / 60);
    return { enonce: "Un four de " + T(p) + " kW fonctionne pendant " + m + " min. Calculer l'énergie consommée en kWh.", reponse: e, unite: "kWh",
      correction: "La durée est $\\dfrac{" + m + "}{60}" + (m % 15 === 0 ? " = " + L(t) : "") + "$ h. $E = " + L(p) + (m % 15 === 0 ? " \\times " + L(t) : " \\times \\dfrac{" + m + "}{60}") + " = " + L(e) + "$ kWh." };
  }

  // ---------- Heures et minutes ----------
  const horaire = (m) => Math.floor(m / 60) + " h " + String(m % 60).padStart(2, "0");
  function heuresMinutes(niveau) {
    if (niveau === 1) {
      const h = ent(1, 5), m = facile(1) ? 30 : choix([5, 10, 15, 20, 25, 30, 40, 45, 50]);
      return { enonce: "Convertir " + h + " h " + m + " min en minutes.", reponse: h * 60 + m, unite: "min", correction: "$" + h + " \\times 60 + " + m + " = " + (h * 60 + m) + "$ min." };
    }
    if (niveau === 2) {
      const x = facile(2) ? ent(1, 6) + 0.5 : choix([net(ent(11, 69) / 10), ent(1, 6) + choix([0.25, 0.75])]), r = net(x * 60);
      return { enonce: "Convertir " + T(x) + " h en minutes.", reponse: r, unite: "min", correction: "$" + L(x) + " \\times 60 = " + L(r) + "$ min." };
    }
    if (Math.random() < 0.65) {
      let a, b; do { a = ent(6 * 12, 18 * 12) * 5; b = ent(6 * 12, 19 * 12) * 5; } while (b - a < 25 || b - a > 300 || a % 60 === 0 || b % 60 === 0);
      return { enonce: "Un trajet commence à " + horaire(a) + " et se termine à " + horaire(b) + ". Calculer sa durée en minutes.", reponse: b - a, unite: "min",
        correction: horaire(a) + " correspond à $" + Math.floor(a / 60) + " \\times 60 + " + a % 60 + " = " + a + "$ min depuis minuit, et " + horaire(b) + " à $" + b + "$ min. Durée : $" + b + " - " + a + " = " + (b - a) + "$ min." };
    }
    const a = ent(9 * 12, 17 * 12) * 5, d = 5 * ent(18, 33);
    return { enonce: "Un film dure " + d + " min. Il commence à " + horaire(a) + ". À quelle heure finit-il ? On donne la réponse sous la forme du nombre de minutes écoulées depuis minuit.", reponse: a + d, unite: "min",
      correction: "Début : $" + Math.floor(a / 60) + " \\times 60 + " + a % 60 + " = " + a + "$ min depuis minuit. Fin : $" + a + " + " + d + " = " + (a + d) + "$ min depuis minuit, soit " + horaire(a + d) + "." };
  }

  const gc = [
    { id: "gc-vitesse", chap: "gc", titre: "Calculer une vitesse moyenne", format: "nombre", niveaux: { 1: () => vitesse(1), 2: () => vitesse(2), 3: () => vitesse(3) } },
    { id: "gc-distance", chap: "gc", titre: "Calculer une distance", format: "nombre", niveaux: { 1: () => distance(1), 2: () => distance(2), 3: () => distance(3) } },
    { id: "gc-duree", chap: "gc", titre: "Calculer une durée", format: "nombre", niveaux: { 1: () => dureeTrajet(1), 2: () => dureeTrajet(2), 3: () => dureeTrajet(3) } },
    { id: "gc-conversion", chap: "gc", titre: "Convertir une vitesse", format: "nombre", niveaux: { 1: () => conversion(1), 2: () => conversion(2), 3: () => conversion(3) } },
    { id: "gc-energie", chap: "gc", titre: "Énergie et coût", format: "nombre", niveaux: { 1: () => energie(1), 2: () => energie(2), 3: () => energie(3) } },
    { id: "gc-heures-minutes", chap: "gc", titre: "Heures et minutes", format: "nombre", niveaux: { 1: () => heuresMinutes(1), 2: () => heuresMinutes(2), 3: () => heuresMinutes(3) } }
  ];

  Savoirs.enregistrerTechniques("4e", gc);
})();
