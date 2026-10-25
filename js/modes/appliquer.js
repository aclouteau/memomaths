// Mode « Je m'entraîne » (anciennement « J'applique ») : un exercice, l'élève tape un nombre.
// Virgule ou point acceptés ; une unité tapée après le nombre est ignorée.
// Si l'énoncé demande un arrondi, on accepte un écart d'un demi-chiffre sur le dernier rang de la réponse
// (pour 28,3 : de 28,25 à 28,35) ; sinon la réponse doit être exacte.
(function () {
  const m = Savoirs.maths;

  // Lit la réponse tapée comme le ferait un professeur, ou null si ce n'est pas un nombre :
  //   "28,3 cm²" -> 28.3 ; "60 000 000" -> 60000000 ; "x = 7" ou "AC ≈ 28,3" -> la valeur après le signe ;
  //   "3/8" -> 0.375 ; "6×10^7" -> 60000000 ; "1h30" -> 1.5 (heures)
  function lireNombre(saisie) {
    let s = String(saisie).trim().replace(/[\s  ]/g, "").replace(/[−–]/g, "-").replace(/,/g, ".");
    s = s.replace(/^.*[=≈~]/, ""); // ce qui est écrit avant « = » ou « ≈ » (x =, AC ≈…)
    while (/^\(.*\)$/.test(s)) s = s.slice(1, -1); // parenthèses autour de la réponse : « (−9) »
    let t = s.match(/^(\d+)h(\d{1,2})(min)?$/i);
    if (t) return +t[1] + t[2] / 60;
    t = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)/);
    if (t && +t[2] !== 0 && !/[\d/^]/.test(s.slice(t[0].length))) return t[1] / t[2];
    t = s.match(/^(-?\d+(?:\.\d+)?)[x×*]10\^\(?(-?\d+)\)?/i);
    if (t && !/\d/.test(s.slice(t[0].length))) return +t[1] * Math.pow(10, +t[2]);
    const nb = s.match(/^[-+]?(\d+\.?\d*|\.\d+)/);
    // Après le nombre : seulement une unité (pas d'autre chiffre ni d'opération, comme « 15- »)
    if (!nb || /[\d+\-*/×^=]/.test(s.slice(nb[0].length))) return null;
    return parseFloat(nb[0]);
  }

  function decimales(x) {
    const t = String(x);
    return t.includes(".") ? t.split(".")[1].length : 0;
  }

  function versTexte(x) { return String(x).replace(".", ",").replace("-", "−"); }

  // Niveau d'une technique (1 à 3). On monte avec la boîte de répétition espacée (2 réussites : niveau 2,
  // 4 : niveau 3) ; après une erreur on ne redescend que d'un niveau (décision de l'enseignant). Une erreur
  // remet la boîte à 0 (« à revoir » dans le bilan) : le niveau atteint est donc gardé à part, dans la fiche (n).
  const niveauDeBoite = (b) => (b >= 4 ? 3 : b >= 2 ? 2 : 1);
  function niveauTechnique(carte, contexte) {
    const f = contexte && contexte.progression && contexte.progression.fiche("appliquer", carte.id);
    if (!f) return 1;
    return f.n || niveauDeBoite(f.b);
  }
  function noterNiveau(carte, contexte, niveau, juste) {
    const progression = contexte && contexte.progression;
    const f = progression && progression.fiche("appliquer", carte.id);
    if (!f) return;
    f.n = juste ? Math.max(niveau, niveauDeBoite(f.b)) : Math.max(1, niveau - 1);
    progression.enregistrer();
  }

  // Une formule reste d'un seul tenant (« 9 × … = 45 » n'est pas coupé en deux) ; seule une formule plus large
  // que l'écran (long produit de facteurs) peut passer à la ligne après un signe ×
  function couperSiTropLong(zone) {
    const q = zone.querySelector(".question");
    if (q && q.scrollWidth > q.clientWidth + 1) q.classList.add("calcul");
    // Une formule qui ne peut pas se couper (tableau de valeurs) et reste trop large est réduite pour tenir
    if (q) q.querySelectorAll(".katex").forEach((k) => {
      const l = k.getBoundingClientRect().width, dispo = q.clientWidth;
      if (l > dispo && dispo > 0) k.style.fontSize = Math.max(0.6, dispo / l) * 100 + "%";
    });
  }

  // Deux boutons : « Positif » / « Négatif » (format "signe", réponse 1 ou −1), ou deux réponses écrites dans
  // technique.options (format "choix", par exemple « rectangle » / « non rectangle » ; réponse : l'une des deux)
  function afficherSigne(carte, zone, fini, ex, entete) {
    const options = carte.technique.format === "choix" ? carte.technique.options.map((o) => [o, o.charAt(0).toUpperCase() + o.slice(1)]) : [[1, "Positif"], [-1, "Négatif"]];
    zone.innerHTML = entete + '<div class="question">' + m.texte(ex.donnees) + "</div>" +
      '<div class="propositions choix-signe" role="group" aria-label="' + (carte.technique.format === "choix" ? "Réponse" : "Signe") + '">' +
      options.map(([v, t]) =>
        '<button class="proposition" data-signe="' + m.echapper(String(v)) + '"><span class="marque" aria-hidden="true"></span><span class="contenu">' + m.echapper(t) + "</span></button>").join("") +
      "</div>" + '<div class="correction" hidden></div>';
    couperSiTropLong(zone);
    const boutons = Array.from(zone.querySelectorAll("[data-signe]"));
    const vaut = (b) => b.dataset.signe === String(ex.reponse);
    boutons.forEach((b) => b.addEventListener("click", () => {
      const juste = vaut(b);
      boutons.forEach((autre) => {
        autre.disabled = true;
        if (vaut(autre)) { autre.classList.add("juste"); autre.querySelector(".marque").textContent = "✓"; }
        else if (autre === b) { autre.classList.add("faux"); autre.querySelector(".marque").textContent = "✗"; }
        else autre.classList.add("eteinte");
      });
      const correction = zone.querySelector(".correction");
      correction.innerHTML = m.texte(ex.correction);
      correction.hidden = false;
      fini(juste);
    }));
  }

  // Une fraction tapée : "3/4", "-3/4", "3/-4", ou un entier (n/1) ; null si ce n'est pas une fraction
  function lireFraction(numerateur, denominateur) {
    const propre = (s) => String(s).trim().replace(/[\s  ]/g, "").replace(/[−–]/g, "-");
    let n = propre(numerateur), d = propre(denominateur);
    // Sur ordinateur, l'élève peut taper toute la fraction dans la première case
    if (n.includes("/") && !d) [n, d] = n.split("/");
    while (/^\(.*\)$/.test(n)) n = n.slice(1, -1);
    if (!/^[-+]?\d+$/.test(n) || (d !== "" && !/^[-+]?\d+$/.test(d))) return null;
    return { n: parseInt(n, 10), d: d === "" ? 1 : parseInt(d, 10) };
  }
  const pgcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const r = a % b; a = b; b = r; } return a; };
  const fractionLatex = (n, d) => (n * d < 0 ? "-" : "") + (Math.abs(d) === 1 ? Math.abs(n) : "\\dfrac{" + Math.abs(n) + "}{" + Math.abs(d) + "}");
  // Réponse attendue "3/4", "-3/4" ou "2" (résultat entier) → [numérateur, dénominateur]
  const fractionAttendue = (r) => { const [n, d] = String(r).split("/").map(Number); return [n, d || 1]; };

  // Saisie d'une fraction : un numérateur et un dénominateur (pavé numérique du téléphone), et le bouton ± pour le signe.
  // Seule la fraction irréductible est acceptée : une fraction égale mais simplifiable reçoit « Simplifie encore » (sans erreur comptée).
  function afficherFraction(carte, zone, fini, ex, entete) {
    const [rn, rd] = fractionAttendue(ex.reponse);
    zone.innerHTML = entete + '<div class="question">' + m.texte(ex.donnees) + "</div>" +
      '<form class="reponse-num reponse-fraction" novalidate>' +
      '<div class="champ"><span id="libelle-fraction">Ta réponse (une fraction)</span>' +
      '<span class="saisie saisie-fraction" role="group" aria-labelledby="libelle-fraction">' +
      '<button type="button" class="signe" aria-label="Changer le signe de la fraction (plus ou moins)">±</button>' +
      '<span class="moins-fraction" aria-hidden="true" hidden>−</span>' +
      '<span class="fraction-saisie">' +
      '<input class="numerateur" inputmode="numeric" autocomplete="off" enterkeyhint="next" aria-label="Numérateur" aria-describedby="erreur-num">' +
      '<span class="barre-fraction" aria-hidden="true"></span>' +
      '<input class="denominateur" inputmode="numeric" autocomplete="off" enterkeyhint="done" aria-label="Dénominateur" aria-describedby="erreur-num">' +
      "</span></span></div>" +
      '<p id="erreur-num" class="erreur" role="alert"></p>' +
      '<button class="bouton-principal verifier" type="submit">Vérifier</button>' +
      "</form>" + '<div class="correction" hidden></div>';
    couperSiTropLong(zone);
    const form = zone.querySelector("form"), num = form.querySelector(".numerateur"), den = form.querySelector(".denominateur");
    const erreur = form.querySelector(".erreur"), signe = form.querySelector(".signe"), moins = form.querySelector(".moins-fraction");
    [num, den].forEach((c) => c.addEventListener("input", () => { erreur.textContent = ""; }));
    num.addEventListener("keydown", (e) => { if (e.key === "Enter" && !den.value.trim() && !num.value.includes("/")) { e.preventDefault(); den.focus(); } });
    signe.addEventListener("click", () => { moins.hidden = !moins.hidden; signe.setAttribute("aria-pressed", String(!moins.hidden)); erreur.textContent = ""; num.focus(); });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (num.disabled) return;
      if (!num.value.trim()) { erreur.textContent = "Écris d'abord ta réponse."; num.focus(); return; }
      const f = lireFraction(num.value, den.value);
      if (!f) { erreur.textContent = "Écris une fraction avec des nombres entiers, par exemple 3 sur 4."; num.focus(); return; }
      if (f.d === 0) { erreur.textContent = "Le dénominateur ne peut pas être 0."; den.focus(); return; }
      const n = moins.hidden ? f.n : -f.n;
      const egale = n * rd === rn * f.d;
      if (egale && pgcd(n, f.d) > 1) { erreur.textContent = "Simplifie encore."; num.focus(); return; }
      const juste = egale;
      erreur.textContent = "";
      num.disabled = den.disabled = true;
      signe.hidden = true;
      const saisie = form.querySelector(".saisie");
      saisie.classList.add(juste ? "juste" : "faux");
      saisie.insertAdjacentHTML("afterbegin", '<span class="marque" aria-hidden="true">' + (juste ? "✓" : "✗") + "</span>");
      form.querySelector(".verifier").hidden = true;
      const correction = zone.querySelector(".correction");
      correction.innerHTML = (juste ? "" : "<strong>Réponse attendue : " + m.texte("$" + fractionLatex(rn, rd) + "$") + "</strong><br>") + m.texte(ex.correction);
      correction.hidden = false;
      fini(juste);
    });
    num.focus({ preventScroll: true });
  }

  // Saisie d'une expression littérale (développer, factoriser, donner f(x)…) : zone de texte, aperçu mathématique
  // de ce qui est tapé, et quelques touches utiles sur téléphone. Correction par js/moteur/expressions.js :
  // une expression juste mais pas sous la forme demandée reçoit un message (sans erreur comptée).
  function afficherExpression(carte, zone, fini, ex, entete, forme) {
    const X = Savoirs.expressions;
    const touches = ["x", "²", "(", ")", "+", "−"];
    zone.innerHTML = entete + '<div class="question">' + m.texte(ex.donnees) + "</div>" +
      '<form class="reponse-num reponse-expression" novalidate>' +
      '<label class="champ"><span>Ta réponse</span>' +
      '<span class="saisie"><input class="expression" inputmode="text" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done" aria-describedby="erreur-num apercu-expression"></span></label>' +
      '<div class="touches-expression" role="group" aria-label="Touches">' + touches.map((t) => '<button type="button" data-touche="' + t + '">' + t + "</button>").join("") + "</div>" +
      '<p id="apercu-expression" class="apercu-expression" aria-live="polite"></p>' +
      '<p id="erreur-num" class="erreur" role="alert"></p>' +
      '<button class="bouton-principal verifier" type="submit">Vérifier</button>' +
      "</form>" + '<div class="correction" hidden></div>';
    couperSiTropLong(zone);
    const form = zone.querySelector("form"), champ = form.querySelector("input"), erreur = form.querySelector(".erreur"), apercu = form.querySelector(".apercu-expression");
    const majApercu = () => {
      const l = champ.value.trim() ? X.latex(champ.value) : null;
      apercu.innerHTML = l ? m.texte("$" + l + "$") : "";
    };
    champ.addEventListener("input", () => { erreur.textContent = ""; majApercu(); });
    form.querySelectorAll("[data-touche]").forEach((b) => b.addEventListener("click", () => {
      const t = b.dataset.touche === "−" ? "-" : b.dataset.touche, d = champ.selectionStart == null ? champ.value.length : champ.selectionStart, f = champ.selectionEnd == null ? d : champ.selectionEnd;
      champ.value = champ.value.slice(0, d) + t + champ.value.slice(f);
      champ.focus();
      champ.setSelectionRange(d + t.length, d + t.length);
      erreur.textContent = "";
      majApercu();
    }));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (champ.disabled) return;
      if (!champ.value.trim()) { erreur.textContent = "Écris d'abord ta réponse."; champ.focus(); return; }
      const r = X.corriger(champ.value, String(ex.reponse), forme);
      if (r.etat === "illisible" || r.etat === "forme") { erreur.textContent = r.message; champ.focus(); return; }
      const juste = r.etat === "juste";
      erreur.textContent = "";
      champ.disabled = true;
      form.querySelectorAll("[data-touche]").forEach((b) => { b.disabled = true; });
      const saisie = form.querySelector(".saisie");
      saisie.classList.add(juste ? "juste" : "faux");
      saisie.insertAdjacentHTML("afterbegin", '<span class="marque" aria-hidden="true">' + (juste ? "✓" : "✗") + "</span>");
      form.querySelector(".verifier").hidden = true;
      const correction = zone.querySelector(".correction");
      correction.innerHTML = (juste ? "" : "<strong>Réponse attendue : " + m.texte("$" + X.latex(String(ex.reponse)) + "$") + "</strong><br>") + m.texte(ex.correction);
      correction.hidden = false;
      fini(juste);
    });
    champ.focus({ preventScroll: true });
  }

  Savoirs.modes.push({
    id: "appliquer",
    titre: "Je m'entraîne",
    description: "Calcule avec des nombres toujours nouveaux, du plus facile au plus difficile.",
    competence: "appliquer",
    messageFaux: "Pas tout à fait : regarde la correction.",
    lireNombre: lireNombre, // pour les tests
    niveauTechnique: niveauTechnique,

    // Deux sortes de cartes : les techniques des chapitres qui ont un référentiel (donnees/<niveau>/techniques.js),
    // et ailleurs les exemples chiffrés des savoirs (en attendant leurs référentiels)
    cartes: function (jouables, niveau, chapDebloque) {
      const chapitres = new Set(jouables.map((s) => s.chap));
      const ouvert = chapDebloque || ((id) => chapitres.has(id));
      const techniques = ((niveau && niveau.techniques) || []).filter((t) => ouvert(t.chap));
      const avecTechniques = new Set(techniques.map((t) => t.chap));
      return techniques.map((t) => ({ id: t.cle, chap: t.chap, type: "technique", titre: t.titre, reponse: "", technique: t }))
        .concat(jouables.filter((s) => s.exemples && s.exemples.length && !avecTechniques.has(s.chap)));
    },

    // Comme un automatisme : quand le savoir est déjà su dans ce mode, une fois sur deux on ne dit pas
    // lequel utiliser (ni le chapitre) ; c'est à l'élève de le reconnaître. Il est nommé après la réponse.
    etiquetteMasquee: "Automatisme",
    masquer: function (savoir, contexte) {
      return savoir.type !== "technique" && !!contexte.progression && contexte.progression.etat("appliquer", savoir.id) === "su" && Math.random() < 0.5;
    },

    afficher: function (savoir, zone, fini, contexte) {
      const masque = !!(contexte && contexte.masque);
      let ex, entete;
      if (savoir.type === "technique") {
        // Technique : un exercice tiré au hasard, au niveau de l'élève ; après la réponse, le niveau est mis à jour
        const n = niveauTechnique(savoir, contexte);
        const finiTechnique = fini;
        fini = (juste) => { finiTechnique(juste); noterNiveau(savoir, contexte, n, juste); };
        const g = savoir.technique.niveaux[n]();
        ex = { donnees: g.enonce, question: "Ta réponse", reponse: g.reponse, unite: g.unite || "", correction: g.correction };
        // Le format peut changer selon le niveau (décimal, puis fraction…) : l'exercice tiré le précise alors
        const format = g.format || savoir.technique.format;
        savoir.reponse = format === "signe" ? (g.reponse > 0 ? "positif" : "négatif") : format === "choix" ? g.reponse
          : format === "fraction" ? "$" + fractionLatex(...fractionAttendue(g.reponse)) + "$"
            : format === "expression" ? "$" + (Savoirs.expressions.latex(String(g.reponse)) || g.reponse) + "$"
            : "$" + versTexte(g.reponse).replace("−", "-").replace(",", "{,}") + "$";
        entete = '<p class="consigne">Je m\'entraîne</p>' +
          '<p class="titre-savoir">' + m.texte(savoir.titre) + ' <span class="niveau-technique">niveau ' + n + " sur 3</span></p>";
        if (format === "signe" || format === "choix") { afficherSigne(savoir, zone, fini, ex, entete); return; }
        if (format === "fraction") { afficherFraction(savoir, zone, fini, ex, entete); return; }
        if (format === "expression") { afficherExpression(savoir, zone, fini, ex, entete, g.forme || savoir.technique.forme || "quelconque"); return; }
      } else {
        // Savoir : des valeurs tirées au hasard quand il a un générateur (js/modes/calculs.js),
        // pour que l'élève ne mémorise pas un exemple fixe ; sinon un des exemples des données
        const generer = Savoirs.calculs && Savoirs.calculs[savoir.id];
        ex = generer ? generer() : Savoirs.melanger(savoir.exemples)[0];
        entete = '<p class="consigne">Je m\'entraîne</p>' +
          (masque ? '<p class="titre-savoir masque">À toi de trouver le bon savoir</p>' : '<p class="titre-savoir">' + m.texte(savoir.titre) + "</p>");
      }
      // Exercice d'entraînement : seule la valeur arrondie demandée est acceptée (7,2 et pas 7,24, décision de l'enseignant).
      // Exemple d'un savoir : un écart d'un demi-chiffre sur le dernier rang est toléré, comme avant.
      const arrondi = savoir.type !== "technique" && /arrondi/i.test(ex.donnees + " " + ex.question);
      const tolerance = arrondi ? Math.pow(10, -decimales(ex.reponse)) / 2 + 1e-9 : 1e-9;

      zone.innerHTML = entete +
        '<div class="question">' + m.texte(ex.donnees) + "</div>" +
        '<form class="reponse-num" novalidate>' +
        '<label class="champ"><span>' + m.texte(ex.question) + "</span>" +
        // Le pavé numérique de l'iPhone n'a pas de touche « − » : le bouton ± change le signe
        '<span class="saisie"><button type="button" class="signe" aria-label="Changer le signe (plus ou moins)">±</button>' +
        '<input inputmode="decimal" autocomplete="off" enterkeyhint="done" aria-describedby="erreur-num">' +
        (ex.unite ? '<span class="unite">' + m.echapper(ex.unite) + "</span>" : "") + "</span></label>" +
        '<p id="erreur-num" class="erreur" role="alert"></p>' +
        '<button class="bouton-principal verifier" type="submit">Vérifier</button>' +
        "</form>" +
        '<div class="correction" hidden></div>';

      couperSiTropLong(zone);
      const form = zone.querySelector("form");
      const champ = form.querySelector("input");
      const erreur = form.querySelector(".erreur");
      const signe = form.querySelector(".signe");
      champ.addEventListener("input", () => { erreur.textContent = ""; });
      signe.addEventListener("click", () => {
        const v = champ.value.trim();
        champ.value = /^[-−]/.test(v) ? v.replace(/^[-−]\s*/, "") : "-" + v;
        erreur.textContent = "";
        champ.focus();
      });

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (champ.disabled) return;
        const x = lireNombre(champ.value);
        if (x === null) {
          erreur.textContent = champ.value.trim() ? "Écris seulement un nombre (par exemple 12,5)." : "Écris d'abord ta réponse.";
          champ.focus();
          return;
        }
        const juste = Math.abs(x - ex.reponse) <= tolerance;
        champ.disabled = true;
        signe.hidden = true;
        form.querySelector(".saisie").classList.add(juste ? "juste" : "faux");
        form.querySelector(".saisie").insertAdjacentHTML("afterbegin", '<span class="marque" aria-hidden="true">' + (juste ? "✓" : "✗") + "</span>");
        form.querySelector(".verifier").hidden = true;
        const correction = zone.querySelector(".correction");
        correction.innerHTML = (masque ? '<span class="savoir-utilise">Savoir utilisé : ' + m.texte(savoir.titre) + "</span><br>" : "") +
          (juste ? "" : "<strong>Réponse attendue : " + versTexte(ex.reponse) + (ex.unite ? " " + m.echapper(ex.unite) : "") + "</strong><br>") +
          m.texte(ex.correction);
        correction.hidden = false;
        fini(juste);
      });

      // Sur téléphone, le clavier s'ouvre tout de suite ; pas de défilement brusque
      champ.focus({ preventScroll: true });
    }
  });
})();
