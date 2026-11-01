// Techniques d'entraînement de 3e : « Proportionnalité et pourcentages » (pourc, toujours jouable comme pv).
// D'après propositions/referentiels/3e/pourc.json (lot 7) : les descriptions de niveau sont la spécification.
// Schéma : flèche d'une évolution (valeur de départ, « + 20 % », valeur d'arrivée), js/moteur/schemas.js.
// Les montants sont choisis pour tomber juste au centime (pas d'arrondi à faire).
(function () {
  const { L, T, ent, choix, net, facile, fixe, fixeTexte } = Savoirs.calculsOutils;
  const coef = (t, hausse) => net(hausse ? 1 + t / 100 : 1 - t / 100);
  const evol = (t, hausse) => (hausse ? "+ " : "− ") + T(t) + " %";
  // Prix : entier, ou avec deux décimales (107,20 €)
  const euros = (x) => (Number.isInteger(net(x)) ? T(net(x)) : fixeTexte(x, 2));
  const eurosTex = (x) => (Number.isInteger(net(x)) ? L(net(x)) : fixe(x, 2));
  const fleche = (depart, arrivee, etiquette) => Savoirs.schemas.fleche({ valeurs: [depart, arrivee], etiquettes: [etiquette], legendes: ["avant", "après"] });
  const exactCentimes = (x) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;
  const formuleCoef = (t, hausse) => "$1 " + (hausse ? "+" : "-") + " \\dfrac{" + L(t) + "}{100} = " + L(coef(t, hausse)) + "$";

  // ---------- Coefficient multiplicateur ----------
  function coefficient(niveau) {
    if (niveau === 1) {
      const simple = facile(1), t = simple ? 10 : choix([5, 10, 15, 20, 25, 30, 40, 50]), hausse = simple || Math.random() < 0.5, k = coef(t, hausse);
      const ctx = choix([
        "Par quel nombre faut-il multiplier un prix pour " + (hausse ? "l'augmenter" : "le baisser") + " de $" + t + "\\,\\%$ ?",
        "Un loyer " + (hausse ? "augmente" : "baisse") + " de $" + t + "\\,\\%$. Par quel nombre est-il multiplié ?",
        "Le nombre d'habitants d'une ville " + (hausse ? "augmente" : "diminue") + " de $" + t + "\\,\\%$. Quel est le coefficient multiplicateur ?",
        "Un magasin " + (hausse ? "augmente ses prix" : "fait une remise") + " de $" + t + "\\,\\%$. Par quel nombre les prix sont-ils multipliés ?"]);
      return { enonce: ctx, schema: Savoirs.schemas.fleche({ valeurs: ["100 %", (hausse ? 100 + t : 100 - t) + " %"], etiquettes: ["× ?"] }), reponse: k,
        correction: "Coefficient multiplicateur : " + formuleCoef(t, hausse) + "." };
    }
    if (niveau === 2) {
      const simple = facile(2), t = simple ? 10 : ent(1, 15) * 5, hausse = simple || Math.random() < 0.5 || t > 75, k = coef(t, hausse);
      return { enonce: "Multiplier une valeur par $" + L(k) + "$ revient à " + (hausse ? "l'augmenter" : "la diminuer") + " de combien de pour cent ?", reponse: t, unite: "%",
        correction: "$" + L(k) + " = 1 " + (hausse ? "+ " : "- ") + L(t / 100) + "$ : c'est une " + (hausse ? "hausse" : "baisse") + " de $" + t + "\\,\\%$." };
    }
    const t = choix([1.5, 2.5, 3.5, 4.5, 1, 2, 3, 120, 150, 200]), hausse = t > 100 || Math.random() < 0.5, k = coef(t, hausse);
    if (Math.random() < 0.5) return { enonce: "Par quel nombre faut-il multiplier une valeur pour " + (hausse ? "l'augmenter" : "la diminuer") + " de $" + L(t) + "\\,\\%$ ?", reponse: k,
      correction: formuleCoef(t, hausse) + "." };
    return { enonce: "Multiplier une valeur par $" + L(k) + "$ revient à " + (hausse ? "l'augmenter" : "la diminuer") + " de combien de pour cent ?", reponse: t, unite: "%",
      correction: "$" + L(k) + " = 1 " + (hausse ? "+ " : "- ") + L(net(t / 100)) + "$ : c'est une " + (hausse ? "hausse" : "baisse") + " de $" + L(t) + "\\,\\%$." };
  }

  // ---------- Appliquer une hausse ou une baisse ----------
  const OBJETS = ["Un abonnement", "Un vélo", "Un téléphone", "Un billet de train", "Un manteau"];
  function nouvelleValeur(niveau) {
    let p, t, hausse, objet = choix(OBJETS);
    if (niveau === 1) { const simple = facile(1); p = 20 * ent(1, 15); t = simple ? 10 : choix([10, 20, 25, 50]); hausse = simple || Math.random() < 0.5; }
    else if (niveau === 2) { const simple = facile(2); p = simple ? 10 * ent(2, 25) : ent(12, 250); t = simple ? 10 : 5 * ent(1, 8); hausse = simple || Math.random() < 0.5; }
    else {
      t = choix([1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 8, 10, 12]); hausse = Math.random() < 0.5;
      [objet, p] = choix([["Un salaire", 10 * ent(130, 320)], ["Un loyer", 10 * ent(68, 150)], ["Une voiture", 100 * ent(80, 450)]]);
    }
    const k = coef(t, hausse), r = net(p * k);
    return {
      enonce: objet + " " + (objet === "Un salaire" || objet === "Un loyer" ? "est de " : "coûte ") + euros(p) + " €. " + (objet === "Une voiture" ? "Son prix " : "Il ") + (hausse ? "augmente" : "baisse") + " de " + T(t) + " %. Calculer sa nouvelle valeur.",
      schema: fleche(euros(p) + " €", "?", evol(t, hausse)),
      reponse: r, unite: "€",
      correction: "Coefficient multiplicateur : " + formuleCoef(t, hausse) + ". Nouvelle valeur : $" + L(p) + " \\times " + L(k) + " = " + eurosTex(r) + "$ €."
    };
  }

  // ---------- Retrouver la valeur de départ ----------
  function valeurDepart(niveau) {
    let p, t, hausse;
    do {
      if (niveau === 1) { const simple = facile(1); t = simple ? 10 : choix([10, 20, 25, 50]); hausse = true; p = 20 * ent(1, 10); }
      else if (niveau === 2) { const simple = facile(2); t = simple ? 10 : 10 * ent(1, 5); hausse = simple || Math.random() < 0.5; p = 10 * ent(2, 30); }
      else { t = choix([5, 8, 12, 15, 35]); hausse = Math.random() < 0.5; p = ent(20, 400); }
    } while (!exactCentimes(p * coef(t, hausse)));
    const k = coef(t, hausse), a = net(p * k);
    return {
      enonce: "Après " + (hausse ? "une hausse" : "une baisse") + " de " + t + " %, un article coûte " + euros(a) + " €. Quel était son prix avant ?",
      schema: fleche("?", euros(a) + " €", evol(t, hausse)),
      reponse: p, unite: "€",
      correction: "Le prix de départ a été multiplié par $" + L(k) + "$. Prix de départ : $" + eurosTex(a) + " \\div " + L(k) + " = " + L(p) + "$ €."
    };
  }

  // ---------- Pourcentage d'évolution ----------
  function taux(niveau) {
    let p, t, hausse;
    do {
      if (niveau === 1) { t = facile(1) ? 10 : choix([10, 20, 25, 50]); hausse = true; p = 10 * ent(2, 20); }
      else if (niveau === 2) { t = 5 * ent(1, 8); hausse = facile(2) || Math.random() < 0.5; p = 10 * ent(2, 25); }
      else { t = choix([1.5, 2.5, 3.5, 6, 8, 12]); hausse = Math.random() < 0.5; p = ent(20, 500); }
    } while (!exactCentimes(p * coef(t, hausse)) || (niveau < 3 && !Number.isInteger(net(p * coef(t, hausse)))));
    const a = net(p * coef(t, hausse)), e = net(a - p), q = net(e / p);
    return {
      enonce: "Un prix passe de " + euros(p) + " € à " + euros(a) + " €. Calculer le pourcentage de " + (hausse ? "hausse." : "baisse."),
      schema: fleche(euros(p) + " €", euros(a) + " €", "?"),
      reponse: t, unite: "%",
      correction: "$\\dfrac{" + eurosTex(a) + " - " + L(p) + "}{" + L(p) + "} = \\dfrac{" + eurosTex(e) + "}{" + L(p) + "} = " + L(q) + "$, soit une " + (hausse ? "hausse" : "baisse") + " de $" + L(t) + "\\,\\%$."
    };
  }

  // ---------- Évolutions successives ----------
  function successives(niveau) {
    if (niveau < 3) {
      let t1, t2, h1, h2;
      if (niveau === 1) { if (facile(1)) { t1 = t2 = 10; } else { t1 = choix([5, 10, 20, 25, 50]); t2 = choix([5, 10, 20, 25, 50]); } h1 = h2 = true; }
      else if (facile(2)) { t1 = choix([10, 20, 25, 50]); t2 = choix([10, 20, 25, 50]); h1 = h2 = true; }
      else { t1 = choix([10, 20, 25, 50]); t2 = choix([10, 20, 25, 50]); h1 = Math.random() < 0.5; h2 = !h1; }
      const k1 = coef(t1, h1), k2 = coef(t2, h2), k = net(k1 * k2), g = net((k - 1) * 100);
      const quoi = choix(["Un prix", "Un loyer", "Le nombre d'abonnés d'un club"]);
      return {
        enonce: quoi + " subit " + (h1 ? "une hausse" : "une baisse") + " de " + t1 + " %, puis " + (h2 ? "une hausse" : "une baisse") + " de " + t2 + " %. Quel est le pourcentage d'évolution global ? (Donner un nombre négatif pour une baisse.)",
        reponse: g, unite: "%",
        correction: "Coefficient global : $" + L(k1) + " \\times " + L(k2) + " = " + L(k) + " = 1 " + (g >= 0 ? "+ " : "- ") + L(Math.abs(net(k - 1))) + "$ : " + (g === 0 ? "aucune évolution." : (g > 0 ? "une hausse" : "une baisse") + " de $" + L(Math.abs(g)) + "\\,\\%$.")
      };
    }
    const p = 100 * ent(1, 10), t1 = 5 * ent(1, 6), t2 = 5 * ent(1, 6), h1 = Math.random() < 0.5, h2 = Math.random() < 0.5, k1 = coef(t1, h1), k2 = coef(t2, h2), r = net(p * k1 * k2);
    return {
      enonce: "Un prix de " + T(p) + " € subit " + (h1 ? "une hausse" : "une baisse") + " de " + t1 + " %, puis " + (h2 ? "une hausse" : "une baisse") + " de " + t2 + " %. Quel est le prix final ?",
      schema: Savoirs.schemas.fleche({ valeurs: [T(p) + " €", "…", "?"], etiquettes: [evol(t1, h1), evol(t2, h2)] }),
      reponse: r, unite: "€",
      correction: "On multiplie par les deux coefficients : $" + L(p) + " \\times " + L(k1) + " \\times " + L(k2) + " = " + eurosTex(r) + "$ €."
    };
  }

  Savoirs.enregistrerTechniques("3e", [
    { id: "pc-coefficient", chap: "pourc", titre: "Coefficient multiplicateur", format: "nombre", niveaux: { 1: () => coefficient(1), 2: () => coefficient(2), 3: () => coefficient(3) } },
    { id: "pc-nouvelle-valeur", chap: "pourc", titre: "Appliquer une hausse ou une baisse", format: "nombre", calculatrice: [3], niveaux: { 1: () => nouvelleValeur(1), 2: () => nouvelleValeur(2), 3: () => nouvelleValeur(3) } },
    { id: "pc-valeur-depart", chap: "pourc", titre: "Retrouver la valeur de départ", format: "nombre", calculatrice: [3], niveaux: { 1: () => valeurDepart(1), 2: () => valeurDepart(2), 3: () => valeurDepart(3) } },
    { id: "pc-taux", chap: "pourc", titre: "Calculer un pourcentage d'évolution", format: "nombre", calculatrice: [3], niveaux: { 1: () => taux(1), 2: () => taux(2), 3: () => taux(3) } },
    { id: "pc-successives", chap: "pourc", titre: "Évolutions successives", format: "nombre", niveaux: { 1: () => successives(1), 2: () => successives(2), 3: () => successives(3) } }
  ]);
})();
