// Affichage des maths avec KaTeX : vraies fractions, puissances, racines.
// texte("Aire d'un disque de rayon $r$ ?") : texte français avec du LaTeX entre $…$
// formule("\\dfrac{a}{b}")                 : LaTeX pur (champs morceaux et intrus)
(function () {
  function echapper(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  function formule(latex) {
    if (!window.katex) return '<span class="latex-brut">' + echapper(latex) + "</span>";
    // throwOnError: false : une formule mal écrite s'affiche en rouge au lieu de casser la page
    return katex.renderToString(String(latex), { throwOnError: false, strict: false });
  }

  // La ponctuation et un mot court (une unité : cm, km/h, €…) qui suivent une formule restent
  // sur la même ligne qu'elle : pas de « . » ni de « cm » seuls en début de ligne
  function texte(s) {
    const morceaux = String(s).split(/\$([^$]+)\$/);
    let html = "";
    for (let i = 0; i < morceaux.length; i++) {
      if (i % 2 === 0) { html += echapper(morceaux[i]); continue; }
      const suite = (morceaux[i + 1] || "").match(/^(?: [a-zA-Zµ°€%²³/]{1,5}(?=[\s.,;:!?)]|$))?[.,;:!?)»]*/);
      if (!suite || !suite[0]) { html += formule(morceaux[i]); continue; }
      html += '<span class="insecable">' + formule(morceaux[i]) + echapper(suite[0]) + "</span>";
      morceaux[i + 1] = morceaux[i + 1].slice(suite[0].length);
    }
    return html;
  }

  Savoirs.maths = { texte: texte, formule: formule, echapper: echapper };
})();
