// Service worker : garde une copie de tous les fichiers de MémoMaths sur l'appareil pour qu'il marche hors ligne.
//
// IMPORTANT : à chaque mise en ligne d'une nouvelle version, augmenter VERSION.
// Les appareils voient alors que ce fichier a changé, téléchargent la nouvelle version
// et l'utilisent à la prochaine ouverture.
// Tout nouveau fichier nécessaire doit être ajouté à la liste FICHIERS.
const VERSION = "memomaths-v49";

const POLICES_KATEX = [
  "AMS-Regular", "Caligraphic-Bold", "Caligraphic-Regular", "Fraktur-Bold", "Fraktur-Regular",
  "Main-Bold", "Main-BoldItalic", "Main-Italic", "Main-Regular", "Math-BoldItalic", "Math-Italic",
  "SansSerif-Bold", "SansSerif-Italic", "SansSerif-Regular", "Script-Regular",
  "Size1-Regular", "Size2-Regular", "Size3-Regular", "Size4-Regular", "Typewriter-Regular"
].map((p) => "js/lib/katex/fonts/KaTeX_" + p + ".woff2");

const FICHIERS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/style.css",
  "js/theme.js",
  "js/lib/katex/katex.min.js",
  "js/lib/katex/katex.min.css",
  "js/moteur/espace.js",
  "js/moteur/maths.js",
  "js/moteur/progression.js",
  "js/moteur/profils.js",
  "js/moteur/expressions.js",
  "js/moteur/figures.js",
  "js/moteur/schemas.js",
  "js/modes/commun.js",
  "js/modes/completer.js",
  "js/modes/outil.js",
  "js/modes/reconstituer.js",
  "js/modes/apprendre.js",
  "js/modes/calculs.js",
  "js/modes/calculatrice.js",
  "js/modes/appliquer.js",
  "donnees/catalogue.js",
  "donnees/5e/savoirs.js",
  "donnees/4e/savoirs.js",
  "donnees/4e/techniques.js",
  "donnees/4e/techniques-rel1.js",
  "donnees/4e/techniques-pyth.js",
  "donnees/4e/techniques-stat.js",
  "donnees/4e/techniques-transl.js",
  "donnees/4e/techniques-frac1.js",
  "donnees/4e/techniques-recip.js",
  "donnees/4e/techniques-prop.js",
  "donnees/4e/techniques-rot.js",
  "donnees/4e/techniques-frac2.js",
  "donnees/3e/savoirs.js",
  "donnees/3e/techniques-proba.js",
  "donnees/3e/techniques-rf.js",
  "donnees/3e/techniques-pyth.js",
  "donnees/3e/techniques-prem.js",
  "donnees/3e/techniques-agr.js",
  "donnees/3e/techniques-lit.js",
  "donnees/3e/techniques-homo.js",
  "donnees/3e/techniques-fgen.js",
  "donnees/3e/techniques-thal.js",
  "donnees/3e/techniques-equ.js",
  "donnees/3e/techniques-pv.js",
  "donnees/5e/techniques-rel1.js",
  "donnees/5e/techniques-ench.js",
  "donnees/5e/techniques-tri.js",
  "donnees/5e/techniques-puis.js",
  "donnees/5e/techniques-sym.js",
  "donnees/5e/techniques-lit.js",
  "donnees/5e/techniques-aire.js",
  "donnees/5e/techniques-div.js",
  "donnees/5e/techniques-rat1.js",
  "donnees/5e/techniques-ang.js",
  "js/app.js",
  "icones/icone-180.png",
  "icones/icone-192.png",
  "icones/icone-512.png"
].concat(POLICES_KATEX);

// Installation : on télécharge tout d'un coup (cache: "reload" pour ne pas reprendre une vieille copie du navigateur)
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(FICHIERS.map((f) => new Request(f, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

// Activation : on supprime les copies des anciennes versions
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((cles) => Promise.all(cles.filter((c) => c !== VERSION).map((c) => caches.delete(c))))
      .then(() => self.clients.claim())
  );
});

// Chaque demande de fichier : la copie sur l'appareil d'abord (rapide, et marche sans réseau), sinon le réseau
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((copie) => copie || fetch(e.request))
  );
});
