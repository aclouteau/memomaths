// Mode « J'apprends » : retenir le cours. Pour chaque savoir, c'est l'application qui choisit la forme de la carte
// selon ce que l'élève sait déjà (on passe de la reconnaissance au rappel sans aide) :
//   1. QCM (« Je complète ») tant que le savoir n'est pas su sous cette forme ;
//   2. remettre les morceaux dans l'ordre (« Je reconstitue »), si le savoir en a, tant que ce n'est pas su ;
//   3. rappel sans aide : la question, « Voir la réponse », puis l'élève dit s'il savait.
// Chaque forme garde sa propre progression (completer, reconstituer, rappel), comme avant.
(function () {
  const m = Savoirs.maths;
  const mode = (id) => Savoirs.modes.find((md) => md.id === id);

  // Forme de la carte pour ce savoir : "completer", "reconstituer" ou "rappel".
  // Décisions de l'enseignant pour « Sans aide » : après un « Je ne savais pas », le savoir redescend en QCM
  // la fois suivante (repère q dans la fiche « rappel ») ; après un « Je savais », il revient en QCM une fois
  // sur trois, pour vérifier (la réponse compte alors pour la forme QCM).
  function etape(savoir, progression) {
    if (!progression || progression.etat("completer", savoir.id) !== "su") return "completer";
    if (savoir.morceaux && savoir.morceaux.length && progression.etat("reconstituer", savoir.id) !== "su") return "reconstituer";
    const rappel = progression.fiche("rappel", savoir.id);
    if (rappel && rappel.q) return "completer";
    if (rappel && rappel.b > 0 && Math.random() < 1 / 3) return "completer";
    return "rappel";
  }

  // Après un « Je ne savais pas » : la prochaine carte de ce savoir sera un QCM (puis retour à « Sans aide »)
  function marquerRedescente(savoir, progression, oui) {
    const f = progression && progression.fiche("rappel", savoir.id);
    if (!f) return;
    if (oui) f.q = 1; else delete f.q;
    progression.enregistrer();
  }

  function afficherRappel(savoir, zone, fini) {
    zone.innerHTML =
      '<p class="consigne">Sans aide</p>' +
      '<div class="question' + (savoir.question.length > 70 ? " longue" : "") + '">' + m.texte(savoir.question) + "</div>" +
      '<p class="aide rappel-aide">Cherche la réponse dans ta tête, puis vérifie.</p>' +
      '<button class="bouton-principal voir-reponse">Voir la réponse</button>' +
      '<div class="reponse-rappel" hidden>' + m.texte(savoir.reponse) + "</div>" +
      '<div class="auto-evaluation" hidden><p class="question-auto">Tu savais ?</p><div class="actions-auto">' +
      '<button class="bouton-secondaire" data-savais="0">Je ne savais pas</button>' +
      '<button class="bouton-principal" data-savais="1">Je savais</button></div></div>';
    const voir = zone.querySelector(".voir-reponse");
    voir.addEventListener("click", () => {
      voir.hidden = true;
      zone.querySelector(".rappel-aide").hidden = true;
      zone.querySelector(".reponse-rappel").hidden = false;
      zone.querySelector(".auto-evaluation").hidden = false;
      zone.querySelector('[data-savais="1"]').focus({ preventScroll: true });
    });
    zone.querySelectorAll("[data-savais]").forEach((b) => b.addEventListener("click", () => {
      zone.querySelector(".auto-evaluation").hidden = true;
      fini(b.dataset.savais === "1");
    }));
    voir.focus({ preventScroll: true });
  }

  Savoirs.modes.unshift({
    id: "apprendre",
    titre: "J'apprends",
    description: "Retiens ton cours : formules, propriétés, définitions et règles.",
    competence: "completer",

    // Les cartes : un savoir = une carte (sa forme est choisie au moment de l'afficher)
    cartes: function (jouables) {
      return jouables.filter((s) => s.reponse && s.pieges && s.pieges.length);
    },

    // Compétence utilisée pour la répétition espacée et pour noter la réponse
    competenceDe: function (savoir, progression) { return etape(savoir, progression); },

    afficher: function (savoir, zone, fini, contexte) {
      const e = etape(savoir, contexte && contexte.progression);
      savoir._competence = e;
      savoir._messageFaux = e === "rappel" ? "Pas grave : relis-la bien, elle reviendra bientôt."
        : e === "reconstituer" ? mode("reconstituer").messageFaux : null;
      const progression = contexte && contexte.progression;
      if (e === "rappel") afficherRappel(savoir, zone, (juste) => { fini(juste); marquerRedescente(savoir, progression, !juste); });
      else if (e === "completer") mode(e).afficher(savoir, zone, (juste) => { fini(juste); marquerRedescente(savoir, progression, false); }, contexte);
      else mode(e).afficher(savoir, zone, fini, contexte);
    }
  });
})();
