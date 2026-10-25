// Expressions littérales (format de réponse "expression" de « Je m'entraîne ») :
// lire ce que l'élève tape, le comparer exactement à la réponse attendue, vérifier la forme demandée.
//
//   Savoirs.expressions.lire("3(x+2)")            → arbre de l'expression (ou une erreur)
//   Savoirs.expressions.corriger(saisie, attendue, forme) → { etat: "juste" | "forme" | "faux" | "illisible", message }
//   Savoirs.expressions.latex(texte)              → écriture KaTeX (aperçu, réponse attendue)
//
// Lecture : x (et toute lettre), nombres décimaux (virgule ou point), + − - × * · / ÷ ^ ² ³, parenthèses,
// multiplication implicite (3x, 2(x+1), (x+1)(x−1), x(x+2)). Les espaces sont ignorés.
// Équivalence : normalisation polynomiale exacte (coefficients rationnels), donc sans arrondi.
// Formes : "developpee_reduite" (aucune parenthèse, termes semblables réunis), "factorisee" (produit d'au moins
// deux facteurs dont une parenthèse, ou puissance d'une parenthèse), "quelconque" (seule l'équivalence compte).
(function () {
  // ---------- Rationnels [n, d] ----------
  const pgcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const r = a % b; a = b; b = r; } return a || 1; };
  const Q = (n, d) => { if (d === 0) throw new Error("division par zéro"); const g = pgcd(n, d), s = d < 0 ? -1 : 1; return [(s * n) / g, (s * d) / g]; };
  const qAdd = (a, b) => Q(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
  const qMul = (a, b) => Q(a[0] * b[0], a[1] * b[1]);
  const qNul = (a) => a[0] === 0;

  // ---------- Lecture ----------
  function normaliser(texte) {
    return String(texte).toLowerCase()
      .replace(/[\s  ]/g, "").replace(/[−–—]/g, "-").replace(/[×·∙⋅]/g, "*").replace(/÷/g, "/")
      .replace(/²/g, "^2").replace(/³/g, "^3").replace(/,/g, ".");
  }
  function decouper(s) {
    const jetons = [];
    for (let i = 0; i < s.length;) {
      const c = s[i];
      const nb = /^\d+(\.\d+)?|^\.\d+/.exec(s.slice(i));
      if (nb) { jetons.push({ t: "nb", v: nb[0] }); i += nb[0].length; continue; }
      if (/[a-z]/.test(c)) { jetons.push({ t: "var", v: c }); i++; continue; }
      if ("+-*/^()".includes(c)) { jetons.push({ t: c }); i++; continue; }
      throw new Error("caractère « " + c + " »");
    }
    return jetons;
  }
  const decimal = (texte) => { const [e, d = ""] = texte.split("."); return Q(parseInt((e || "0") + d, 10), Math.pow(10, d.length)); };

  function lire(texte) {
    const j = decouper(normaliser(texte));
    if (!j.length) throw new Error("vide");
    let i = 0;
    const voir = () => j[i], prendre = (t) => { if (!j[i] || j[i].t !== t) throw new Error("« " + t + " » attendu"); return j[i++]; };
    function somme() {
      const termes = [];
      let signe = 1;
      if (voir() && (voir().t === "+" || voir().t === "-")) { signe = voir().t === "-" ? -1 : 1; i++; }
      termes.push({ signe: signe, n: produit() });
      while (voir() && (voir().t === "+" || voir().t === "-")) { const s = voir().t === "-" ? -1 : 1; i++; termes.push({ signe: s, n: produit() }); }
      return termes.length === 1 && termes[0].signe === 1 ? termes[0].n : { t: "somme", termes: termes };
    }
    function produit() {
      const facteurs = [{ div: false, n: unaire() }];
      for (;;) {
        const k = voir();
        if (k && (k.t === "*" || k.t === "/")) { i++; facteurs.push({ div: k.t === "/", n: unaire() }); continue; }
        // Multiplication implicite : 3x, 2(x+1), x(x+2), (x+1)(x-1), (x+1)3
        if (k && (k.t === "var" || k.t === "(" || (k.t === "nb" && j[i - 1] && j[i - 1].t === ")"))) { facteurs.push({ div: false, n: puissance(), implicite: true }); continue; }
        break;
      }
      return facteurs.length === 1 ? facteurs[0].n : { t: "produit", facteurs: facteurs };
    }
    function unaire() {
      if (voir() && voir().t === "-") { i++; return { t: "oppose", n: unaire() }; }
      if (voir() && voir().t === "+") { i++; return unaire(); }
      return puissance();
    }
    function puissance() {
      const base = primaire();
      if (voir() && voir().t === "^") {
        i++;
        let e;
        if (voir() && voir().t === "(") { i++; e = prendre("nb"); prendre(")"); } else e = prendre("nb");
        if (!/^\d+$/.test(e.v) || +e.v > 20) throw new Error("exposant");
        return { t: "puissance", base: base, e: +e.v };
      }
      return base;
    }
    function primaire() {
      const k = voir();
      if (!k) throw new Error("expression incomplète");
      if (k.t === "nb") { i++; return { t: "nombre", v: decimal(k.v), texte: k.v }; }
      if (k.t === "var") { i++; return { t: "lettre", v: k.v }; }
      if (k.t === "(") { i++; const n = somme(); prendre(")"); return { t: "parenthese", n: n }; }
      throw new Error("« " + k.t + " » mal placé");
    }
    const arbre = somme();
    if (i < j.length) throw new Error("« " + (j[i].v || j[i].t) + " » en trop");
    return arbre;
  }

  // ---------- Polynômes : Map(monôme → rationnel), monôme écrit "x2y1" (lettres rangées) ----------
  const cle = (m) => Object.keys(m).sort().map((l) => l + m[l]).join("");
  const monome = (k) => { const m = {}; (k.match(/[a-z]\d+/g) || []).forEach((p) => { m[p[0]] = +p.slice(1); }); return m; };
  function pNettoyer(p) { for (const [k, v] of p) if (qNul(v)) p.delete(k); return p; }
  function pAdd(a, b, signe) { const r = new Map(a); for (const [k, v] of b) r.set(k, qAdd(r.get(k) || [0, 1], signe < 0 ? [-v[0], v[1]] : v)); return pNettoyer(r); }
  function pMul(a, b) {
    const r = new Map();
    for (const [ka, va] of a) for (const [kb, vb] of b) {
      const m = monome(ka), mb = monome(kb);
      Object.keys(mb).forEach((l) => { m[l] = (m[l] || 0) + mb[l]; });
      const k = cle(m);
      r.set(k, qAdd(r.get(k) || [0, 1], qMul(va, vb)));
    }
    return pNettoyer(r);
  }
  const constante = (q) => pNettoyer(new Map([["", q]]));
  function polynome(n) {
    switch (n.t) {
      case "nombre": return constante(n.v);
      case "lettre": return new Map([[n.v + "1", [1, 1]]]);
      case "parenthese": return polynome(n.n);
      case "oppose": return pMul(constante([-1, 1]), polynome(n.n));
      case "somme": return n.termes.reduce((acc, t) => pAdd(acc, polynome(t.n), t.signe), new Map());
      case "puissance": { let r = constante([1, 1]); const b = polynome(n.base); for (let k = 0; k < n.e; k++) r = pMul(r, b); return r; }
      case "produit": return n.facteurs.reduce((acc, f) => {
        const p = polynome(f.n);
        if (!f.div) return pMul(acc, p);
        // On ne divise que par un nombre (pas par une expression)
        if (p.size !== 1 || !p.has("")) throw new Error("division par une expression");
        const q = p.get(""); return pMul(acc, constante(Q(q[1], q[0])));
      }, constante([1, 1]));
    }
    throw new Error("expression");
  }
  const egaux = (a, b) => a.size === b.size && [...a].every(([k, v]) => b.has(k) && b.get(k)[0] === v[0] && b.get(k)[1] === v[1]);

  // ---------- Formes ----------
  const sansParenthese = (n) => (n.t === "parenthese" ? sansParenthese(n.n) : n);
  function contient(n, test) {
    if (test(n)) return true;
    return (n.n && contient(n.n, test)) || (n.base && contient(n.base, test)) ||
      (n.termes || []).some((t) => contient(t.n, test)) || (n.facteurs || []).some((f) => contient(f.n, test));
  }
  // Un terme est un monôme réduit : au plus un nombre (et une division par un nombre, 3x/2), chaque lettre une
  // seule fois. Renvoie sa partie littérale ("x2", "" pour un nombre), ou null s'il n'est pas réduit.
  function monomeReduit(n) {
    if (n.t === "oppose") return monomeReduit(n.n);
    const facteurs = n.t === "produit" ? n.facteurs : [{ div: false, n: n }];
    let fois = 0, divise = 0;
    const lettres = new Set();
    for (const f of facteurs) {
      const x = f.n;
      if (x.t === "nombre") { if (f.div) divise++; else fois++; continue; }
      if (f.div) return null;
      const l = x.t === "lettre" ? x.v : x.t === "puissance" && x.base.t === "lettre" ? x.base.v : null;
      if (!l || lettres.has(l)) return null;
      lettres.add(l);
    }
    if (fois > 1 || divise > 1) return null;
    const p = polynome(n);
    return p.size ? [...p.keys()][0] : "0";
  }
  function estDeveloppeeReduite(n) {
    if (contient(n, (x) => x.t === "parenthese")) return { ok: false, raison: "il reste des parenthèses" };
    const termes = n.t === "somme" ? n.termes.map((t) => t.n) : [n];
    const vus = new Set();
    for (const t of termes) {
      const k = monomeReduit(t);
      if (k === null) return { ok: false, raison: "un terme n'est pas réduit" };
      if (vus.has(k)) return { ok: false, raison: "il reste des termes semblables à réunir" };
      vus.add(k);
    }
    return { ok: true };
  }
  const estSomme = (n) => { const x = sansParenthese(n); return x.t === "somme" || (x.t === "puissance" && estSomme(x.base)); };
  // Contenu entier d'une parenthèse : 2x+4 a pour contenu 2 (on peut encore factoriser)
  function contenu(n) {
    const p = polynome(n), coefs = [...p.values()];
    if (!coefs.length || coefs.some((q) => q[1] !== 1)) return 1;
    return coefs.reduce((g, q) => pgcd(g, q[0]), 0);
  }
  function estFactorisee(n) {
    let x = n;
    while (x.t === "oppose" || x.t === "parenthese") x = x.n;
    if (x.t === "puissance" && x.base.t === "parenthese" && estSomme(x.base) && x.e >= 2) return { ok: true, sommes: [x.base] };
    if (x.t !== "produit" || x.facteurs.length < 2 || x.facteurs.some((f) => f.div)) return { ok: false };
    const sommes = x.facteurs.map((f) => (f.n.t === "puissance" ? f.n.base : f.n)).filter((f) => f.t === "parenthese" && estSomme(f));
    return sommes.length ? { ok: true, sommes: sommes } : { ok: false };
  }
  // Une parenthèse dont tous les termes contiennent la même lettre (2x² + 3x) se factorise encore par cette lettre
  function lettreCommune(n) {
    const cles = [...polynome(n).keys()];
    return cles.length > 1 && cles.every((k) => k !== "") && [...new Set(cles.join("").match(/[a-z]/g))].some((l) => cles.every((k) => k.includes(l)));
  }
  const resteAFactoriser = (r) => r.sommes.some((s) => contenu(s) > 1 || lettreCommune(s));

  const MESSAGES = {
    developpee_reduite: "C'est juste, mais ce n'est pas encore développé et réduit",
    factorisee: "C'est juste, mais ce n'est pas encore factorisé"
  };

  // Correction d'une saisie : "juste", "forme" (équivalente mais pas sous la forme demandée : à reprendre),
  // "faux" ou "illisible" (à reprendre)
  function corriger(saisie, attendue, forme) {
    let a, b;
    try { a = lire(saisie); } catch (e) { return { etat: "illisible", message: "Je n'arrive pas à lire cette expression : vérifie les parenthèses et les signes." }; }
    try { b = lire(attendue); } catch (e) { return { etat: "illisible", message: "Réponse attendue illisible : " + attendue }; }
    let pa, pb;
    try { pa = polynome(a); pb = polynome(b); } catch (e) { return { etat: "illisible", message: "Écris ta réponse sans diviser par une expression." }; }
    if (!egaux(pa, pb)) return { etat: "faux" };
    if (forme === "developpee_reduite") {
      const r = estDeveloppeeReduite(a);
      if (!r.ok) return { etat: "forme", message: MESSAGES.developpee_reduite + " : " + r.raison + "." };
    }
    if (forme === "factorisee") {
      const r = estFactorisee(a);
      if (!r.ok) return { etat: "forme", message: MESSAGES.factorisee + " : écris l'expression comme un produit (par exemple avec un facteur devant une parenthèse)." };
      // Plus exigeant que la réponse attendue ? Non : on ne demande de factoriser encore que si la réponse attendue le fait
      const rb = estFactorisee(b);
      if (resteAFactoriser(r) && !(rb.ok && resteAFactoriser(rb))) return { etat: "forme", message: MESSAGES.factorisee + " complètement : une parenthèse contient encore un facteur commun." };
    }
    return { etat: "juste" };
  }

  // ---------- Écriture KaTeX ----------
  function nombreLatex(q, texte) {
    if (texte) return texte.replace(".", "{,}");
    if (q[1] === 1) return String(q[0]);
    return (q[0] < 0 ? "-" : "") + "\\dfrac{" + Math.abs(q[0]) + "}{" + q[1] + "}";
  }
  function versLatex(n) {
    switch (n.t) {
      case "nombre": return nombreLatex(n.v, n.texte);
      case "lettre": return n.v;
      case "parenthese": return "\\left(" + versLatex(n.n) + "\\right)";
      case "oppose": return "-" + versLatex(n.n);
      case "puissance": return versLatex(n.base) + "^{" + n.e + "}";
      case "somme": return n.termes.map((t, k) => (k === 0 ? (t.signe < 0 ? "-" : "") : t.signe < 0 ? " - " : " + ") + versLatex(t.n)).join("");
      case "produit": {
        let s = versLatex(n.facteurs[0].n);
        for (let k = 1; k < n.facteurs.length; k++) {
          const f = n.facteurs[k], prec = n.facteurs[k - 1].n;
          // Division par un nombre : en fraction (x/2, 3x/2, 1/2x) ; sinon le signe ÷
          if (f.div) { s = f.n.t === "nombre" ? "\\dfrac{" + s + "}{" + versLatex(f.n) + "}" : s + " \\div " + versLatex(f.n); continue; }
          // 3x, 2(x+1), x(x+1), (x+1)(x-1) s'écrivent sans signe ; entre deux nombres, ×
          const colle = f.n.t !== "nombre" && f.n.t !== "oppose" && !(f.n.t === "puissance" && f.n.base.t === "nombre") && prec.t !== "oppose";
          s += (colle ? "" : " \\times ") + versLatex(f.n);
        }
        return s;
      }
    }
    return "";
  }
  function latex(texte) { try { return versLatex(lire(texte)); } catch (e) { return null; } }

  // Valeur d'une expression pour des valeurs des lettres ({ x: 3 })
  function evaluer(texte, valeurs) {
    let s = 0;
    for (const [k, q] of polynome(lire(texte))) {
      let t = q[0] / q[1];
      (k.match(/[a-z]\d+/g) || []).forEach((p) => { t *= Math.pow(valeurs[p[0]], +p.slice(1)); });
      s += t;
    }
    return Math.round(s * 1e10) / 1e10;
  }

  Savoirs.expressions = { lire: lire, corriger: corriger, latex: latex, polynome: polynome, evaluer: evaluer, estDeveloppeeReduite: estDeveloppeeReduite, estFactorisee: estFactorisee };
})();
