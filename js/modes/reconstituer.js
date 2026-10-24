// Mode « Je reconstitue » : les morceaux de la formule et quelques intrus, mélangés.
// L'élève les touche dans l'ordre (avec « Annuler » pour retirer le dernier), puis vérifie.
// Correction : la formule bien écrite.
(function () {
  const m = Savoirs.maths;

  // Forme « normalisée » d'une suite de morceaux, pour accepter les écritures équivalentes :
  // facteurs séparés par × dans un autre ordre (r² × π), termes séparés par + dans un autre ordre,
  // membres d'une égalité échangés (B × h = V), ou maillons d'une suite d'égalités (Thalès) dans un autre ordre.
  // Prudence : pas de réordonnancement dans un membre qui contient un « − » ou un « ÷ » au premier niveau,
  // ni dans une formule avec ⇒, ⇔ ou ≠ (seul l'ordre exact compte alors).
  const RELATIONS = ["\\Longrightarrow", "\\Longleftrightarrow", "\\neq"];

  function couper(morceaux, separateur) {
    const parts = [[]];
    let prof = 0;
    for (const t of morceaux) {
      prof += (t.match(/\(/g) || []).length - (t.match(/\)/g) || []).length;
      if (t === separateur && prof === 0) parts.push([]);
      else parts[parts.length - 1].push(t);
    }
    return parts;
  }

  function normaliserMembre(membre) {
    if (membre.some((t) => t === "-" || t === "\\div")) return membre.join(" ");
    return couper(membre, "+")
      .map((terme) => couper(terme, "\\times").map((f) => f.join(" ")).sort().join(" \\times "))
      .sort().join(" + ");
  }

  function forme(morceaux) {
    if (morceaux.some((t) => RELATIONS.some((r) => t.includes(r)))) return morceaux.join(" ");
    return couper(morceaux, "=").map(normaliserMembre).sort().join(" = ");
  }

  Savoirs.modes.push({
    id: "reconstituer",
    titre: "Je reconstitue",
    description: "Remets les morceaux de la formule dans l'ordre.",
    competence: "reconstituer",
    messageFaux: "Pas tout à fait : voici la formule bien écrite.",
    forme: forme, // pour les tests

    cartes: function (jouables) {
      return jouables.filter((s) => s.morceaux && s.morceaux.length);
    },

    afficher: function (savoir, zone, fini) {
      const tuiles = Savoirs.melanger(savoir.morceaux.concat(savoir.intrus || []));
      const choisis = []; // indices des tuiles touchées, dans l'ordre

      zone.innerHTML =
        '<p class="consigne">Je reconstitue</p>' +
        '<div class="question' + (savoir.question.length > 70 ? " longue" : "") + '">' + m.texte(savoir.question) + "</div>" +
        '<div class="reconstitution" aria-live="polite"><span class="vide">Touche les morceaux dans l\'ordre</span></div>' +
        '<div class="tuiles" role="group" aria-label="Morceaux">' +
        // Une tuile en mots (« nombre total d'issues ») est écrite plus petit pour tenir sur un téléphone
        tuiles.map((t, i) => '<button class="tuile' + (/\\text\{[^}]{12,}/.test(t) ? " longue" : "") + '" data-i="' + i + '">' + m.formule(t) + "</button>").join("") +
        "</div>" +
        '<div class="actions-reco">' +
        '<button class="bouton-secondaire" data-action="annuler" disabled>Annuler</button>' +
        '<button class="bouton-principal" data-action="verifier" disabled>Vérifier</button>' +
        "</div>" +
        '<div class="correction" hidden></div>';

      const cadre = zone.querySelector(".reconstitution");
      const boutons = Array.from(zone.querySelectorAll(".tuile"));
      const annuler = zone.querySelector('[data-action="annuler"]');
      const verifier = zone.querySelector('[data-action="verifier"]');
      let termine = false;

      function maj() {
        cadre.innerHTML = choisis.length
          ? m.formule(choisis.map((i) => tuiles[i]).join(" "))
          : '<span class="vide">Touche les morceaux dans l\'ordre</span>';
        // Formule trop longue pour un téléphone : on la rapetisse plutôt que de la faire défiler
        cadre.classList.remove("serree", "tres-serree");
        if (cadre.scrollWidth > cadre.clientWidth) cadre.classList.add("serree");
        if (cadre.scrollWidth > cadre.clientWidth) cadre.classList.add("tres-serree");
        boutons.forEach((b, i) => { b.disabled = termine || choisis.includes(i); });
        annuler.disabled = termine || !choisis.length;
        verifier.disabled = termine || !choisis.length;
      }

      function valider() {
        if (termine || !choisis.length) return;
        termine = true;
        document.removeEventListener("keydown", touche);
        const reponse = choisis.map((i) => tuiles[i]);
        const exact = reponse.length === savoir.morceaux.length && reponse.every((t, k) => t === savoir.morceaux[k]);
        const juste = exact || (reponse.length === savoir.morceaux.length && forme(reponse) === forme(savoir.morceaux));
        maj();
        cadre.classList.add(juste ? "juste" : "faux");
        cadre.insertAdjacentHTML("afterbegin", '<span class="marque" aria-hidden="true">' + (juste ? "✓" : "✗") + "</span>" +
          '<span class="sr">' + (juste ? "Juste : " : "Ta réponse, fausse : ") + "</span>");
        zone.querySelector(".tuiles").classList.add("eteintes");
        zone.querySelector(".actions-reco").hidden = true;
        // Juste mais dans un autre ordre : on montre aussi l'écriture du cours
        if (juste && !exact) {
          const correction = zone.querySelector(".correction");
          correction.innerHTML = '<span class="aide">Bien vu, c\'est équivalent. Dans le cours, on l\'écrit : </span>' + m.formule(savoir.morceaux.join(" "));
          correction.hidden = false;
        }
        if (!juste) {
          const correction = zone.querySelector(".correction");
          correction.innerHTML = '<span class="marque" aria-hidden="true">✓</span><span class="sr">Bonne réponse : </span>' +
            m.formule(savoir.morceaux.join(" "));
          correction.hidden = false;
        }
        fini(juste);
      }

      // Sur ordinateur : Retour arrière pour annuler, Entrée pour vérifier
      function touche(e) {
        if (!zone.isConnected) { document.removeEventListener("keydown", touche); return; }
        if (e.key === "Backspace" && choisis.length) { e.preventDefault(); choisis.pop(); maj(); }
        if (e.key === "Enter" && choisis.length && !e.target.closest("button")) { e.preventDefault(); valider(); }
      }
      document.addEventListener("keydown", touche);

      boutons.forEach((b, i) => b.addEventListener("click", () => { choisis.push(i); maj(); }));
      annuler.addEventListener("click", () => { choisis.pop(); maj(); });
      verifier.addEventListener("click", valider);
    }
  });
})();
