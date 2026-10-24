// Mode « J'applique » : un exemple du savoir (données + question), l'élève tape un nombre.
// Virgule ou point acceptés ; une unité tapée après le nombre est ignorée.
// Si l'énoncé demande un arrondi, on accepte un écart d'un demi-chiffre sur le dernier rang de la réponse
// (pour 28,3 : de 28,25 à 28,35) ; sinon la réponse doit être exacte.
(function () {
  const m = Savoirs.maths;

  // "28,3 cm²" -> 28.3 ; "60 000 000" -> 60000000 ; null si ce n'est pas un nombre
  function lireNombre(saisie) {
    const s = String(saisie).trim().replace(/[\s  ]/g, "").replace(/[−–]/g, "-").replace(",", ".");
    const nb = s.match(/^[-+]?(\d+\.?\d*|\.\d+)/);
    if (!nb || /\d/.test(s.slice(nb[0].length))) return null;
    return parseFloat(nb[0]);
  }

  function decimales(x) {
    const t = String(x);
    return t.includes(".") ? t.split(".")[1].length : 0;
  }

  function versTexte(x) { return String(x).replace(".", ","); }

  Savoirs.modes.push({
    id: "appliquer",
    titre: "J'applique",
    description: "Utilise le savoir pour calculer.",
    competence: "appliquer",
    messageFaux: "Pas tout à fait : regarde la correction.",
    lireNombre: lireNombre, // pour les tests

    cartes: function (jouables) {
      return jouables.filter((s) => s.exemples && s.exemples.length);
    },

    // Comme un automatisme : quand le savoir est déjà su dans ce mode, une fois sur deux on ne dit pas
    // lequel utiliser (ni le chapitre) ; c'est à l'élève de le reconnaître. Il est nommé après la réponse.
    etiquetteMasquee: "Automatisme",
    masquer: function (savoir, contexte) {
      return !!contexte.progression && contexte.progression.etat("appliquer", savoir.id) === "su" && Math.random() < 0.5;
    },

    afficher: function (savoir, zone, fini, contexte) {
      const masque = !!(contexte && contexte.masque);
      // Des valeurs tirées au hasard quand le savoir a un générateur (js/modes/calculs.js),
      // pour que l'élève ne mémorise pas un exemple fixe ; sinon un des exemples des données
      const generer = Savoirs.calculs && Savoirs.calculs[savoir.id];
      const ex = generer ? generer() : Savoirs.melanger(savoir.exemples)[0];
      const arrondi = /arrondi/i.test(ex.donnees + " " + ex.question);
      const tolerance = arrondi ? Math.pow(10, -decimales(ex.reponse)) / 2 + 1e-9 : 1e-9;

      zone.innerHTML =
        '<p class="consigne">J\'applique</p>' +
        (masque ? '<p class="titre-savoir masque">À toi de trouver le bon savoir</p>' : '<p class="titre-savoir">' + m.texte(savoir.titre) + "</p>") +
        '<div class="question">' + m.texte(ex.donnees) + "</div>" +
        '<form class="reponse-num" novalidate>' +
        '<label class="champ"><span>' + m.texte(ex.question) + "</span>" +
        '<span class="saisie"><input inputmode="decimal" autocomplete="off" enterkeyhint="done" aria-describedby="erreur-num">' +
        (ex.unite ? '<span class="unite">' + m.echapper(ex.unite) + "</span>" : "") + "</span></label>" +
        '<p id="erreur-num" class="erreur" role="alert"></p>' +
        '<button class="bouton-principal" type="submit">Vérifier</button>' +
        "</form>" +
        '<div class="correction" hidden></div>';

      const form = zone.querySelector("form");
      const champ = form.querySelector("input");
      const erreur = form.querySelector(".erreur");
      champ.addEventListener("input", () => { erreur.textContent = ""; });

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
        form.querySelector(".saisie").classList.add(juste ? "juste" : "faux");
        form.querySelector(".saisie").insertAdjacentHTML("afterbegin", '<span class="marque" aria-hidden="true">' + (juste ? "✓" : "✗") + "</span>");
        form.querySelector("button").hidden = true;
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
