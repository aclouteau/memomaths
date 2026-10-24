// Le choix clair / sombre de l'élève est appliqué avant l'affichage, pour éviter un éclair blanc.
// (Fichier séparé : la politique de sécurité de index.html interdit les scripts écrits dans la page.)
try {
  var apparence = localStorage.getItem("savoirs.apparence");
  if (apparence === "clair" || apparence === "sombre") document.documentElement.dataset.theme = apparence;
} catch (e) { /* stockage refusé : on suit le réglage de l'appareil */ }
