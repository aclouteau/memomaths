// Petite calculatrice, proposée seulement sur les exercices où on l'utiliserait aussi en classe
// (Pythagore avec arrondi, aires de disques avec 3,14, calculs avec beaucoup de décimales).
// Touches : chiffres, virgule, + − × ÷, parenthèses, carré, racine carrée et π (sa vraie valeur, comme
// sur une calculatrice de collège : les énoncés avec π demandent la valeur arrondie au dixième).
(function () {
  const TOUCHES = [
    ["7", "8", "9", "÷", "C"],
    ["4", "5", "6", "×", "⌫"],
    ["1", "2", "3", "−", "("],
    ["0", ",", "²", "+", ")"],
    ["√", "π", "="]
  ];
  const NOMS = { "÷": "divisé par", "×": "multiplié par", "−": "moins", "+": "plus", "C": "tout effacer", "⌫": "effacer le dernier caractère",
    "²": "au carré", "√": "racine carrée de", "(": "parenthèse ouvrante", ")": "parenthèse fermante", ",": "virgule", "=": "égal",
    "π": "pi" };

  // Lecture du calcul : nombres, + − × ÷, parenthèses, √( … ) et ² ; renvoie null si le calcul est incomplet
  function calculer(texte) {
    let i = 0;
    const t = texte.replace(/\s/g, "");
    const voir = () => t[i];
    function nombre() {
      const m = t.slice(i).match(/^\d+(,\d+)?|^,\d+/);
      if (!m) return null;
      i += m[0].length;
      return parseFloat(m[0].replace(",", "."));
    }
    function facteur() {
      let v;
      if (voir() === "−" || voir() === "-") { i++; const f = facteur(); return f === null ? null : -f; }
      if (voir() === "√") { i++; const f = facteur(); return f === null || f < 0 ? null : Math.sqrt(f); }
      if (voir() === "(") { i++; v = somme(); if (v === null) return null; if (voir() === ")") i++; }
      else if (voir() === "π") { i++; v = Math.PI; }
      else v = nombre();
      if (v === null) return null;
      while (voir() === "²") { i++; v = v * v; }
      return v;
    }
    function produit() {
      let v = facteur();
      // « 2π », « 3(4 + 1) » ou « 2√(9) » : multiplication sous-entendue, comme sur une calculatrice de collège
      while (v !== null && (voir() === "×" || voir() === "÷" || voir() === "π" || voir() === "(" || voir() === "√")) {
        const op = voir() === "×" || voir() === "÷" ? t[i++] : "×", f = facteur();
        if (f === null || (op === "÷" && f === 0)) return null;
        v = op === "×" ? v * f : v / f;
      }
      return v;
    }
    function somme() {
      let v = produit();
      while (v !== null && (voir() === "+" || voir() === "−" || voir() === "-")) {
        const op = t[i++], p = produit();
        if (p === null) return null;
        v = op === "+" ? v + p : v - p;
      }
      return v;
    }
    const v = somme();
    return v === null || i < t.length || !isFinite(v) ? null : v;
  }
  // 12 chiffres significatifs au plus, virgule française
  const ecrire = (v) => String(Number(v.toPrecision(12))).replace("-", "−").replace(".", ",");

  Savoirs.calculatrice = function (zone) {
    const bloc = document.createElement("div");
    bloc.className = "calculatrice";
    bloc.innerHTML =
      '<button type="button" class="bouton-secondaire ouvrir-calculatrice" aria-expanded="false">🧮 Calculatrice</button>' +
      '<div class="pave-calculatrice" hidden>' +
      '<div class="ecran-calculatrice" aria-live="polite"><span class="calcul-saisi"></span><span class="calcul-resultat"></span></div>' +
      '<p class="rappel-pi" hidden>Pense à arrondir le résultat comme demandé.</p>' +
      '<div class="touches-calculatrice">' + TOUCHES.map((ligne) => ligne.map((k) =>
        '<button type="button" data-touche="' + k + '"' + (NOMS[k] ? ' aria-label="' + NOMS[k] + '"' : "") +
        (k === "=" ? ' class="egal"' : /[÷×−+²√()]/.test(k) ? ' class="operation"' : "") + ">" + k + "</button>").join("")).join("") +
      "</div></div>";
    zone.appendChild(bloc);

    const ouvrir = bloc.querySelector(".ouvrir-calculatrice"), pave = bloc.querySelector(".pave-calculatrice");
    const saisi = bloc.querySelector(".calcul-saisi"), resultat = bloc.querySelector(".calcul-resultat"), rappelPi = bloc.querySelector(".rappel-pi");
    let texte = "";
    ouvrir.addEventListener("click", () => {
      pave.hidden = !pave.hidden;
      ouvrir.setAttribute("aria-expanded", String(!pave.hidden));
      if (!pave.hidden) pave.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
    bloc.querySelectorAll("[data-touche]").forEach((b) => b.addEventListener("click", () => {
      const k = b.dataset.touche;
      if (k === "C") { texte = ""; resultat.textContent = ""; rappelPi.hidden = true; }
      else if (k === "⌫") texte = texte.slice(0, -1);
      else if (k === "=") {
        const v = calculer(texte);
        resultat.textContent = v === null ? "Calcul incomplet" : "= " + ecrire(v);
        rappelPi.hidden = !texte.includes("π");
        return void (saisi.textContent = texte);
      } else {
        // Après un résultat, une opération continue le calcul à partir de ce résultat
        if (resultat.textContent.startsWith("=") && /[÷×−+²]/.test(k)) texte = resultat.textContent.slice(2);
        else if (resultat.textContent.startsWith("=")) texte = "";
        texte += k === "√" ? "√(" : k;
        resultat.textContent = "";
      }
      saisi.textContent = texte;
    }));
  };
})();
