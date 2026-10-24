// Point de rencontre entre le moteur et les fichiers de données.
// Chaque fichier de données appelle Savoirs.enregistrer({ id: "4e", chapitres, savoirs, outils }).
window.Savoirs = {
  niveaux: {},
  modes: [],     // rempli par js/modes/*.js
  catalogue: [], // rempli par donnees/catalogue.js : [{ id, titre, fichiers, themes }]

  enregistrer: function (donnees) {
    Savoirs.niveaux[donnees.id] = donnees;
  },

  // Charge les fichiers d'un niveau la première fois qu'on le choisit.
  // Simples balises <script>, pour que cela marche aussi en ouvrant index.html depuis un fichier.
  charger: function (id) {
    const entree = Savoirs.catalogue.find((n) => n.id === id);
    if (!entree) return Promise.reject(new Error("Niveau inconnu : " + id));
    if (entree.charge) return entree.charge;
    entree.charge = entree.fichiers.reduce((suite, fichier) => suite.then(() => new Promise((ok, echec) => {
      const s = document.createElement("script");
      s.src = fichier;
      s.onload = ok;
      s.onerror = () => echec(new Error("Fichier introuvable : " + fichier));
      document.body.appendChild(s);
    })), Promise.resolve()).then(() => Savoirs.niveaux[id]);
    return entree.charge;
  }
};
