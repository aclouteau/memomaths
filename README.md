# MémoMaths

MémoMaths aide les élèves de collège à apprendre et retenir les savoirs du cours de maths :
formules, propriétés et théorèmes, définitions, règles de calcul.

- **Pour s'entraîner hors de la classe**, sur téléphone, tablette ou ordinateur, à partir d'un simple lien.
- **Sans compte et sans chronomètre** : pas de record, pas de classement. Une séance = 10 cartes, puis un bilan bienveillant.
- **Répétition espacée** : les savoirs ratés reviennent plus souvent, ceux qui sont sus de plus en plus rarement.
- **Mon bilan** : chaque chapitre est une rosace en vitrail, avec un vitrail par savoir. Il devient bleu quand le savoir est su,
  jaune quand l'élève hésite, et vermillon hachuré quand il est à revoir.
- **Rien n'est envoyé sur internet** : la progression reste dans le navigateur de l'élève (un profil par prénom).

## Changer d'appareil

Menu, « Changer d'appareil » : MémoMaths prépare un code (qui commence par `SAV1-`) et un lien à s'envoyer.
Sur l'autre appareil, on ouvre le lien, ou on colle le code au même endroit. La progression est ajoutée
à celle déjà présente (pour chaque savoir, le résultat le plus récent est gardé) : rien n'est effacé.

## Installer et utiliser hors ligne

Une fois le site ouvert une fois avec internet, il fonctionne sans réseau. Sur téléphone, le navigateur
propose « Ajouter à l'écran d'accueil » : MémoMaths s'ouvre alors comme une application.

## Révisions des années précédentes

En 3e, MémoMaths propose aussi les savoirs de 4e et de 5e (en 4e, ceux de 5e), toujours débloqués,
mais tirés moins souvent que ceux de l'année (réglage `POIDS_REVISION` dans `js/app.js`).
Un savoir présent dans plusieurs années (même `id`) n'apparaît qu'une fois et garde une seule progression.
Dans « Je m'entraîne », les exercices ont des valeurs tirées au hasard à chaque fois. Les chapitres qui ont un
référentiel validé par l'enseignant ont leurs propres techniques, en trois niveaux qui s'adaptent à l'élève
(`donnees/<niveau>/techniques.js` ; pour l'instant : 4e, « Nombres relatifs : multiplication et division ») ;
les autres chapitres utilisent les exemples chiffrés des savoirs (`js/modes/calculs.js`).

## Choisir son niveau et son chapitre

À l'accueil, l'élève choisit son niveau (5e, 4e ou 3e), puis « Jusqu'à quel chapitre ? ». Les acquis des années précédentes sont toujours inclus.
L'enseignant peut donner un lien qui présélectionne un chapitre, par exemple :

```
https://<adresse du site>/#niveau=4e&jusqua=pyth
```

Les identifiants des chapitres sont dans `donnees/<niveau>/savoirs.js` (champ `id` de chaque chapitre).

Avant un contrôle, le lien sous le bouton Jouer (ou « Réviser ce chapitre » dans « Mon bilan ») propose
10 cartes sur un seul chapitre, selon le mode choisi : « Apprendre un seul chapitre » (ses savoirs)
ou « M'entraîner sur un seul chapitre » (ses exercices). Lien direct : `…/#niveau=3e&reviser=thal`.

## Organisation des fichiers

| Dossier ou fichier | Contenu |
|---|---|
| `index.html` | La page (s'ouvre aussi par double-clic) |
| `css/style.css` | L'apparence (mode clair et sombre) |
| `js/app.js` | Les écrans : accueil, séance, fin de séance, bilan, menu |
| `js/modes/` | Les façons de jouer : « Je complète », « Quel outil ? » (puis « Je reconstitue » et « J'applique ») |
| `js/moteur/` | Profils, répétition espacée, affichage des formules |
| `js/lib/katex/` | KaTeX, pour afficher les vraies fractions et puissances |
| `donnees/` | Les savoirs de chaque niveau : 5e, 4e et 3e (format décrit dans `FORMAT-DONNEES.md`) |
| `sw.js` | Mode hors ligne : liste des fichiers gardés sur l'appareil (augmenter `VERSION` à chaque mise en ligne) |
| `icones/` | Icônes de l'application installable (refaites par `outils/creer-icones.ps1`) |
| `outils/serveur-local.ps1` | Petit serveur pour tester sur l'ordinateur (http://localhost:8123) |

## Licences

- Contenu (savoirs, énoncés, icônes) : © A. Clouteau, enseignant de mathématiques,
  sous licence [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr).
- Code de l'application : licence MIT (`LICENSE.txt`).
- Affichage des formules : KaTeX, licence MIT.

Détails : `LICENCES.md`.
