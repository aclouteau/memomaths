// Outils communs aux modes de jeu : mélange, et questions à choix (« Je complète », « Quel outil ? »).
(function () {
  const m = Savoirs.maths;

  function melanger(liste) {
    const l = liste.slice();
    for (let i = l.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [l[i], l[j]] = [l[j], l[i]];
    }
    return l;
  }

  // Dessine dans zone : la consigne, la question, puis les propositions [{ texte, bonne }] (texte avec $LaTeX$).
  // Après la réponse : la bonne réponse s'illumine, la mauvaise est montrée hachurée avec une croix,
  // puis fini(juste) est appelé.
  function choix(zone, consigne, question, propositions, fini) {
    zone.innerHTML =
      '<p class="consigne">' + consigne + "</p>" +
      '<div class="question' + (question.length > 70 ? " longue" : "") + '">' + m.texte(question) + "</div>" +
      // Propositions en phrases : un peu plus petites pour que la carte tienne sur un téléphone
      '<div class="propositions' + (propositions.some((p) => p.texte.length > 45) ? " longues" : "") + '" role="group" aria-label="Propositions">' +
      propositions.map((p, i) =>
        '<button class="proposition" data-i="' + i + '"><span class="marque" aria-hidden="true"><span class="touche">' + (i + 1) + "</span></span>" +
        '<span class="contenu">' + m.texte(p.texte) + "</span></button>").join("") +
      "</div>";

    const boutons = Array.from(zone.querySelectorAll(".proposition"));

    // Sur ordinateur : touches 1 à 6 pour répondre
    function touche(e) {
      if (!zone.isConnected) { document.removeEventListener("keydown", touche); return; }
      const i = "123456".indexOf(e.key);
      if (i < 0 || e.ctrlKey || e.altKey || e.metaKey || !boutons[i] || boutons[i].disabled) return;
      e.preventDefault();
      boutons[i].click();
    }
    document.addEventListener("keydown", touche);

    boutons.forEach((b) => b.addEventListener("click", () => {
      document.removeEventListener("keydown", touche);
      const choisie = propositions[+b.dataset.i];
      boutons.forEach((autre, i) => {
        autre.disabled = true;
        autre.querySelector(".marque").textContent = "";
        // Après la réponse, chaque proposition montre son explication (« …, car on oublie… »)
        if (propositions[i].complet) autre.querySelector(".contenu").innerHTML = m.texte(propositions[i].complet);
        if (propositions[i].bonne) {
          autre.classList.add("juste");
          autre.querySelector(".marque").textContent = "✓";
          autre.insertAdjacentHTML("afterbegin", '<span class="sr">Bonne réponse : </span>');
        } else if (autre === b) {
          autre.classList.add("faux");
          autre.querySelector(".marque").textContent = "✗";
          autre.insertAdjacentHTML("afterbegin", '<span class="sr">Ta réponse, fausse : </span>');
        } else {
          autre.classList.add("eteinte");
        }
      });
      fini(choisie.bonne);
    }));
  }

  Savoirs.melanger = melanger;
  Savoirs.choix = choix;
})();
