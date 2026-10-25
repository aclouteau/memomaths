// Savoirs de 3e : généré à partir des leçons de 3e (2026-2027). Notation $…$ = LaTeX (KaTeX).
Savoirs.enregistrer({
 "id": "3e",
 "titre": "Savoirs de 3e",
 "niveau": "3e",
 "chapitres": [
  {
   "id": "pre",
   "titre": "Acquis de 4e et 5e",
   "ordre": 0,
   "annee": "4e"
  },
  {
   "id": "pv",
   "titre": "Périmètre, aire et volume",
   "ordre": 0,
   "annee": "3e"
  },
  {
   "id": "proba",
   "titre": "Probabilités",
   "ordre": 1,
   "annee": "3e"
  },
  {
   "id": "rf",
   "titre": "Nombres relatifs et fractions",
   "ordre": 2,
   "annee": "3e"
  },
  {
   "id": "pyth",
   "titre": "Théorème de Pythagore",
   "ordre": 3,
   "annee": "3e"
  },
  {
   "id": "prem",
   "titre": "Nombres premiers et PGCD",
   "ordre": 4,
   "annee": "3e"
  },
  {
   "id": "agr",
   "titre": "Agrandissement et réduction",
   "ordre": 5,
   "annee": "3e"
  },
  {
   "id": "lit",
   "titre": "Calcul littéral",
   "ordre": 6,
   "annee": "3e"
  },
  {
   "id": "homo",
   "titre": "Homothéties et transformations",
   "ordre": 7,
   "annee": "3e"
  },
  {
   "id": "fgen",
   "titre": "Généralités sur les fonctions",
   "ordre": 8,
   "annee": "3e"
  },
  {
   "id": "thal",
   "titre": "Théorème de Thalès",
   "ordre": 9,
   "annee": "3e"
  },
  {
   "id": "equ",
   "titre": "Équations",
   "ordre": 10,
   "annee": "3e"
  },
  {
   "id": "stat",
   "titre": "Statistiques",
   "ordre": 11,
   "annee": "3e"
  },
  {
   "id": "puis",
   "titre": "Puissances",
   "ordre": 12,
   "annee": "3e"
  },
  {
   "id": "flin",
   "titre": "Fonctions linéaires",
   "ordre": 13,
   "annee": "3e"
  },
  {
   "id": "faff",
   "titre": "Fonctions affines",
   "ordre": 14,
   "annee": "3e"
  },
  {
   "id": "trig",
   "titre": "Trigonométrie",
   "ordre": 15,
   "annee": "3e"
  },
  {
   "id": "esp",
   "titre": "Géométrie dans l'espace",
   "ordre": 16,
   "annee": "3e"
  },
  {
   "id": "sembl",
   "titre": "Triangles semblables",
   "ordre": 17,
   "annee": "3e"
  }
 ],
 "savoirs": [
  {
   "id": "aire-rect",
   "chap": "pv",
   "type": "formule",
   "titre": "Aire d'un rectangle",
   "question": "Aire d'un rectangle de longueur $L$ et de largeur $\\ell$ ?",
   "reponse": "$\\mathcal{A} = L \\times \\ell$",
   "pieges": [
    "$\\mathcal{A} = 2 \\times (L + \\ell)$",
    "$\\mathcal{A} = L + \\ell$",
    "$\\mathcal{A} = \\dfrac{L \\times \\ell}{2}$"
   ],
   "morceaux": [
    "\\mathcal{A}",
    "=",
    "L",
    "\\times",
    "\\ell"
   ],
   "intrus": [
    "+",
    "2"
   ],
   "exemples": [
    {
     "donnees": "$L = 7$ cm et $\\ell = 4$ cm",
     "question": "Aire ?",
     "reponse": 28,
     "unite": "cm²",
     "correction": "$\\mathcal{A} = 7 \\times 4 = 28$ cm²"
    }
   ]
  },
  {
   "id": "aire-tri",
   "chap": "pv",
   "type": "formule",
   "titre": "Aire d'un triangle",
   "question": "Aire d'un triangle de base $b$ et de hauteur $h$ ?",
   "reponse": "$\\mathcal{A} = \\dfrac{b \\times h}{2}$",
   "pieges": [
    "$\\mathcal{A} = b \\times h$",
    "$\\mathcal{A} = \\dfrac{b + h}{2}$",
    "$\\mathcal{A} = 2 \\times b \\times h$"
   ],
   "morceaux": [
    "\\mathcal{A}",
    "=",
    "\\dfrac{b \\times h}{2}"
   ],
   "intrus": [
    "b \\times h",
    "\\dfrac{b + h}{2}"
   ],
   "exemples": [
    {
     "donnees": "$b = 8$ cm et $h = 5$ cm",
     "question": "Aire ?",
     "reponse": 20,
     "unite": "cm²",
     "correction": "$\\mathcal{A} = \\dfrac{8 \\times 5}{2} = 20$ cm²"
    }
   ],
   "note": "La hauteur est perpendiculaire à la base ; ce n'est pas un côté du triangle (sauf triangle rectangle)."
  },
  {
   "id": "aire-disque",
   "chap": "pv",
   "type": "formule",
   "titre": "Aire d'un disque",
   "question": "Aire d'un disque de rayon $r$ ?",
   "reponse": "$\\mathcal{A} = \\pi \\times r^{2}$",
   "pieges": [
    "$\\mathcal{A} = 2 \\times \\pi \\times r$",
    "$\\mathcal{A} = \\pi \\times d$",
    "$\\mathcal{A} = r^{2}$"
   ],
   "morceaux": [
    "\\mathcal{A}",
    "=",
    "\\pi",
    "\\times",
    "r^{2}"
   ],
   "intrus": [
    "2",
    "d"
   ],
   "exemples": [
    {
     "donnees": "$r = 3$ cm (arrondir au dixième)",
     "question": "Aire ?",
     "reponse": 28.3,
     "unite": "cm²",
     "correction": "$\\mathcal{A} = \\pi \\times 3^{2} = 9\\pi \\approx 28{,}3$ cm²"
    },
    {
     "donnees": "$d = 10$ cm (arrondir au dixième)",
     "question": "Aire ?",
     "reponse": 78.5,
     "unite": "cm²",
     "correction": "$r = 10 \\div 2 = 5$ puis $\\mathcal{A} = \\pi \\times 5^{2} = 25\\pi \\approx 78{,}5$ cm²"
    }
   ]
  },
  {
   "id": "perim-cercle",
   "chap": "pv",
   "type": "formule",
   "titre": "Périmètre d'un cercle",
   "question": "Périmètre d'un cercle de rayon $r$ ?",
   "reponse": "$P = 2 \\times \\pi \\times r$",
   "pieges": [
    "$P = \\pi \\times r^{2}$",
    "$P = \\pi \\times r$",
    "$P = 2 \\times r$"
   ],
   "morceaux": [
    "P",
    "=",
    "2",
    "\\times",
    "\\pi",
    "\\times",
    "r"
   ],
   "intrus": [
    "r^{2}",
    "d"
   ],
   "exemples": [
    {
     "donnees": "$r = 5$ cm (arrondir au dixième)",
     "question": "Périmètre ?",
     "reponse": 31.4,
     "unite": "cm",
     "correction": "$P = 2 \\times \\pi \\times 5 = 10\\pi \\approx 31{,}4$ cm"
    }
   ]
  },
  {
   "id": "vol-pave",
   "chap": "pv",
   "type": "formule",
   "titre": "Volume d'un pavé droit",
   "question": "Volume d'un pavé droit de longueur $L$, largeur $\\ell$, hauteur $h$ ?",
   "reponse": "$V = L \\times \\ell \\times h$",
   "pieges": [
    "$V = L + \\ell + h$",
    "$V = \\dfrac{1}{3} \\times L \\times \\ell \\times h$",
    "$V = 2 \\times (L \\times \\ell + \\ell \\times h + L \\times h)$"
   ],
   "exemples": [
    {
     "donnees": "$L = 5$ cm, $\\ell = 4$ cm, $h = 3$ cm",
     "question": "Volume ?",
     "reponse": 60,
     "unite": "cm³",
     "correction": "$V = 5 \\times 4 \\times 3 = 60$ cm³"
    }
   ],
   "morceaux": [
    "V",
    "=",
    "L",
    "\\times",
    "\\ell",
    "\\times",
    "h"
   ],
   "intrus": [
    "+",
    "3"
   ]
  },
  {
   "id": "vol-prisme",
   "chap": "pv",
   "type": "formule",
   "titre": "Volume d'un prisme droit ou d'un cylindre",
   "question": "Volume d'un prisme droit (ou d'un cylindre) de base d'aire $B$ et de hauteur $h$ ?",
   "reponse": "$V = B \\times h$",
   "pieges": [
    "$V = \\dfrac{1}{3} \\times B \\times h$",
    "$V = P_{\\text{base}} \\times h$",
    "$V = B + h$"
   ],
   "exemples": [
    {
     "donnees": "cylindre : $r = 2$ cm et $h = 10$ cm (arrondir à l'unité)",
     "question": "Volume ?",
     "reponse": 126,
     "unite": "cm³",
     "correction": "$V = \\pi \\times 2^{2} \\times 10 = 40\\pi \\approx 126$ cm³"
    }
   ],
   "note": "Pour un cylindre, $B = \\pi \\times r^{2}$ donc $V = \\pi \\times r^{2} \\times h$.",
   "morceaux": [
    "V",
    "=",
    "B",
    "\\times",
    "h"
   ],
   "intrus": [
    "+",
    "\\dfrac{1}{3}"
   ]
  },
  {
   "id": "vitesse",
   "chap": "pre",
   "type": "formule",
   "titre": "Vitesse moyenne",
   "question": "Vitesse moyenne $v$ pour une distance $d$ parcourue en un temps $t$ ?",
   "reponse": "$v = \\dfrac{d}{t}$",
   "pieges": [
    "$v = d \\times t$",
    "$v = \\dfrac{t}{d}$",
    "$v = d - t$"
   ],
   "morceaux": [
    "v",
    "=",
    "\\dfrac{d}{t}"
   ],
   "intrus": [
    "\\dfrac{t}{d}",
    "d \\times t"
   ],
   "exemples": [
    {
     "donnees": "$d = 150$ km parcourus en $t = 2$ h",
     "question": "Vitesse moyenne ?",
     "reponse": 75,
     "unite": "km/h",
     "correction": "$v = \\dfrac{150}{2} = 75$ km/h"
    }
   ]
  },
  {
   "id": "distance",
   "chap": "pre",
   "type": "formule",
   "titre": "Distance parcourue",
   "question": "Distance parcourue à la vitesse $v$ pendant le temps $t$ ?",
   "reponse": "$d = v \\times t$",
   "pieges": [
    "$d = \\dfrac{v}{t}$",
    "$d = \\dfrac{t}{v}$",
    "$d = v + t$"
   ],
   "exemples": [
    {
     "donnees": "$v = 90$ km/h pendant $t = 3$ h",
     "question": "Distance ?",
     "reponse": 270,
     "unite": "km",
     "correction": "$d = 90 \\times 3 = 270$ km"
    }
   ],
   "morceaux": [
    "d",
    "=",
    "v",
    "\\times",
    "t"
   ],
   "intrus": [
    "\\div",
    "+"
   ]
  },
  {
   "id": "temps",
   "chap": "pre",
   "type": "formule",
   "titre": "Durée d'un trajet",
   "question": "Durée d'un trajet de distance $d$ à la vitesse $v$ ?",
   "reponse": "$t = \\dfrac{d}{v}$",
   "pieges": [
    "$t = d \\times v$",
    "$t = \\dfrac{v}{d}$",
    "$t = d - v$"
   ],
   "exemples": [
    {
     "donnees": "$d = 120$ km à $v = 80$ km/h",
     "question": "Durée (en heures) ?",
     "reponse": 1.5,
     "unite": "h",
     "correction": "$t = \\dfrac{120}{80} = 1{,}5$ h $= 1$ h 30 min"
    }
   ],
   "morceaux": [
    "t",
    "=",
    "\\dfrac{d}{v}"
   ],
   "intrus": [
    "\\dfrac{v}{d}",
    "\\times"
   ]
  },
  {
   "id": "pourcent",
   "chap": "pre",
   "type": "formule",
   "titre": "Calculer un pourcentage d'une quantité",
   "question": "$t\\,\\%$ d'une quantité $V$ ?",
   "reponse": "$\\dfrac{t}{100} \\times V$",
   "pieges": [
    "$t \\times V$",
    "$\\dfrac{V}{100} + t$",
    "$\\dfrac{100}{t} \\times V$"
   ],
   "exemples": [
    {
     "donnees": "Calculer $20\\,\\%$ de 85 €",
     "question": "Résultat ?",
     "reponse": 17,
     "unite": "€",
     "correction": "$\\dfrac{20}{100} \\times 85 = 17$ €"
    }
   ],
   "morceaux": [
    "\\dfrac{t}{100}",
    "\\times",
    "V"
   ],
   "intrus": [
    "t",
    "+",
    "\\dfrac{100}{t}"
   ]
  },
  {
   "id": "hausse",
   "chap": "pre",
   "type": "formule",
   "titre": "Augmentation en pourcentage",
   "question": "Pour augmenter une valeur de $t\\,\\%$, on la multiplie par ...",
   "reponse": "$1 + \\dfrac{t}{100}$",
   "pieges": [
    "$\\dfrac{t}{100}$",
    "$1 - \\dfrac{t}{100}$",
    "$t$"
   ],
   "exemples": [
    {
     "donnees": "Un article à 40 € augmente de $15\\,\\%$",
     "question": "Nouveau prix ?",
     "reponse": 46,
     "unite": "€",
     "correction": "$40 \\times \\left(1 + \\dfrac{15}{100}\\right) = 40 \\times 1{,}15 = 46$ €"
    }
   ],
   "morceaux": [
    "1",
    "+",
    "\\dfrac{t}{100}"
   ],
   "intrus": [
    "-",
    "\\times",
    "t"
   ]
  },
  {
   "id": "baisse",
   "chap": "pre",
   "type": "formule",
   "titre": "Baisse en pourcentage",
   "question": "Pour diminuer une valeur de $t\\,\\%$, on la multiplie par ...",
   "reponse": "$1 - \\dfrac{t}{100}$",
   "pieges": [
    "$\\dfrac{t}{100}$",
    "$1 + \\dfrac{t}{100}$",
    "$100 - t$"
   ],
   "exemples": [
    {
     "donnees": "Un article à 80 € baisse de $25\\,\\%$",
     "question": "Nouveau prix ?",
     "reponse": 60,
     "unite": "€",
     "correction": "$80 \\times \\left(1 - \\dfrac{25}{100}\\right) = 80 \\times 0{,}75 = 60$ €"
    }
   ],
   "note": "+20 % puis −20 % ne ramène pas à la valeur de départ.",
   "morceaux": [
    "1",
    "-",
    "\\dfrac{t}{100}"
   ],
   "intrus": [
    "+",
    "\\times",
    "t"
   ]
  },
  {
   "id": "priorites",
   "chap": "pre",
   "type": "regle",
   "titre": "Priorités opératoires",
   "question": "Dans un calcul sans parenthèses, que fait-on en premier ?",
   "reponse": "les multiplications et les divisions, avant les additions et les soustractions",
   "pieges": [
    "les additions et les soustractions, avant les multiplications",
    "les opérations de gauche à droite, sans exception",
    "les divisions seulement"
   ],
   "note": "Les parenthèses passent avant tout. À priorité égale : de gauche à droite."
  },
  {
   "id": "equ-regle",
   "chap": "pre",
   "type": "regle",
   "titre": "Règles de résolution",
   "question": "On ne change pas une égalité si on ...",
   "reponse": "ajoute, retranche, multiplie ou divise (par un nombre non nul) les deux membres par un même nombre",
   "pieges": [
    "ajoute un nombre au membre de gauche seulement, sans toucher à celui de droite",
    "divise par $x$ les deux membres, même si $x$ peut valoir 0",
    "multiplie par 0 les deux membres pour simplifier"
   ],
   "exemples": [
    {
     "donnees": "Résoudre $3x + 5 = 11$",
     "question": "Solution ?",
     "reponse": 2,
     "unite": "",
     "correction": "$3x = 11 - 5 = 6$ donc $x = \\dfrac{6}{3} = 2$"
    },
    {
     "donnees": "Résoudre $2(x + 3) = 14$",
     "question": "Solution ?",
     "reponse": 4,
     "unite": "",
     "correction": "$2x + 6 = 14$, $2x = 8$ donc $x = 4$"
    }
   ]
  },
  {
   "id": "echelle",
   "chap": "pre",
   "type": "regle",
   "titre": "Échelle",
   "question": "Une échelle de $\\dfrac{1}{50\\,000}$ signifie que ...",
   "reponse": "1 cm sur le plan représente 50 000 cm dans la réalité",
   "pieges": [
    "1 cm sur le plan représente 50 cm dans la réalité",
    "50 000 cm sur le plan représentent 1 cm dans la réalité",
    "le plan est un agrandissement de la réalité"
   ],
   "exemples": [
    {
     "donnees": "Échelle $\\dfrac{1}{25\\,000}$ ; deux villes sont à 6 cm sur le plan",
     "question": "Distance réelle ?",
     "reponse": 1.5,
     "unite": "km",
     "correction": "$6 \\times 25\\,000 = 150\\,000$ cm $= 1{,}5$ km"
    }
   ]
  },
  {
   "id": "proba-def",
   "chap": "proba",
   "type": "definition",
   "titre": "Valeurs d'une probabilité",
   "question": "Une probabilité est toujours un nombre ...",
   "reponse": "compris entre 0 et 1",
   "pieges": [
    "supérieur à 1",
    "entier",
    "compris entre −1 et 1"
   ],
   "note": "0 : événement impossible ; 1 : événement certain."
  },
  {
   "id": "proba-f",
   "chap": "proba",
   "type": "formule",
   "titre": "Probabilité (équiprobabilité)",
   "question": "Probabilité d'un événement $A$ quand toutes les issues sont équiprobables ?",
   "reponse": "$P(A) = \\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre total d'issues}}$",
   "pieges": [
    "$P(A) = \\dfrac{\\text{nombre total d'issues}}{\\text{nombre d'issues favorables}}$",
    "$P(A) = \\text{nombre d'issues favorables} - \\text{nombre total d'issues}$",
    "$P(A) = \\dfrac{\\text{nombre d'issues non favorables}}{\\text{nombre total d'issues}}$"
   ],
   "exemples": [
    {
     "donnees": "Un sac contient 3 boules rouges et 5 vertes ; on tire une boule au hasard",
     "question": "Probabilité d'obtenir une rouge (décimale) ?",
     "reponse": 0.375,
     "unite": "",
     "correction": "$P = \\dfrac{3}{8} = 0{,}375$"
    }
   ]
  },
  {
   "id": "proba-contraire",
   "chap": "proba",
   "type": "formule",
   "titre": "Événement contraire",
   "question": "$P(\\text{non } A)$ vaut ...",
   "reponse": "$1 - P(A)$",
   "pieges": [
    "$P(A) - 1$",
    "$\\dfrac{1}{P(A)}$",
    "$-P(A)$"
   ],
   "morceaux": [
    "P",
    "(",
    "\\text{non }",
    "A",
    ")",
    "=",
    "1",
    "-",
    "P",
    "(",
    "A",
    ")"
   ],
   "intrus": [
    "+",
    "\\dfrac{1}{P ( A )}"
   ],
   "exemples": [
    {
     "donnees": "$P(A) = 0{,}3$",
     "question": "$P(\\text{non } A)$ ?",
     "reponse": 0.7,
     "unite": "",
     "correction": "$1 - 0{,}3 = 0{,}7$"
    }
   ]
  },
  {
   "id": "proba-freq",
   "chap": "proba",
   "type": "propriete",
   "titre": "Fréquence et probabilité",
   "question": "Quand le nombre d'expériences devient très grand, la fréquence d'un événement ...",
   "reponse": "se rapproche de sa probabilité",
   "pieges": [
    "devient exactement égale à sa probabilité",
    "s'éloigne de sa probabilité",
    "devient égale à 1"
   ],
   "note": "Une série de « pile » ne rend pas « face » plus probable au tirage suivant."
  },
  {
   "id": "proba-arbre",
   "chap": "proba",
   "type": "regle",
   "titre": "Arbre de probabilités",
   "question": "Dans un arbre de probabilités, pour une issue à deux épreuves, on ...",
   "reponse": "multiplie les probabilités le long de la branche, puis on additionne les branches qui mènent au même événement",
   "pieges": [
    "additionne les probabilités le long de la branche, puis multiplie les branches qui mènent au même événement",
    "multiplie toutes les probabilités de toutes les branches de l'arbre, sans distinguer les événements, puis ne garde que le résultat",
    "ne garde que la première branche de l'arbre pour chaque événement, puis additionne les probabilités de tous les événements"
   ]
  },
  {
   "id": "proba-equi",
   "chap": "proba",
   "type": "regle",
   "titre": "Vérifier l'équiprobabilité",
   "question": "On peut utiliser « cas favorables ÷ cas possibles » seulement si ...",
   "reponse": "toutes les issues ont la même probabilité",
   "pieges": [
    "il y a au moins deux issues possibles dans l'expérience",
    "l'expérience est répétée un grand nombre de fois",
    "les issues sont toujours rangées dans l'ordre croissant"
   ],
   "note": "Deux issues ne sont pas forcément équiprobables (la météo de demain)."
  },
  {
   "id": "proba-certain",
   "chap": "proba",
   "type": "propriete",
   "titre": "Événement certain, événement impossible",
   "question": "La probabilité d'un événement certain vaut ...",
   "reponse": "1 ; celle d'un événement impossible vaut 0",
   "pieges": [
    "0 ; celle d'un événement impossible vaut 1",
    "100 ; celle d'un événement impossible vaut 0",
    "0,5 ; celle d'un événement impossible vaut −1"
   ],
   "note": "Exemple : obtenir un nombre inférieur à 7 avec un dé à 6 faces est certain."
  },
  {
   "id": "proba-somme",
   "chap": "proba",
   "type": "propriete",
   "titre": "Somme des probabilités des issues",
   "question": "La somme des probabilités de toutes les issues d'une expérience aléatoire vaut ...",
   "reponse": "1",
   "pieges": [
    "0",
    "le nombre d'issues",
    "100"
   ],
   "note": "Avec 8 issues équiprobables, chacune a la probabilité $\\dfrac{1}{8}$."
  },
  {
   "id": "proba-incomp-def",
   "chap": "proba",
   "type": "definition",
   "titre": "Événements incompatibles",
   "question": "Deux événements sont incompatibles lorsque ...",
   "reponse": "ils ne peuvent pas se réaliser en même temps",
   "pieges": [
    "ils ont exactement la même probabilité de se réaliser",
    "ils se réalisent toujours en même temps, jamais séparément",
    "l'un des deux a une probabilité nulle ou égale à 1"
   ],
   "note": "Exemple : « obtenir un nombre pair » et « obtenir 5 » avec un dé sont incompatibles."
  },
  {
   "id": "proba-remise",
   "chap": "proba",
   "type": "regle",
   "titre": "Avec ou sans remise",
   "question": "Pour la deuxième épreuve d'un tirage de deux billes, le contenu du sac est ...",
   "reponse": "le même si on remet la première bille, et réduit d'une bille sinon",
   "pieges": [
    "toujours le même, qu'on remette la première bille ou non",
    "toujours réduit d'une bille, qu'on remette la première bille ou non",
    "le même si on ne remet pas la première bille, réduit d'une bille sinon"
   ],
   "note": "Sans remise, avec 5 billes dont 2 rouges : $P(\\text{rouge puis rouge}) = \\dfrac{2}{5} \\times \\dfrac{1}{4} = \\dfrac{1}{10}$ ; avec remise, $\\dfrac{2}{5} \\times \\dfrac{2}{5} = \\dfrac{4}{25}$."
  },
  {
   "id": "proba-tableau",
   "chap": "proba",
   "type": "regle",
   "titre": "Dénombrer deux épreuves",
   "question": "Pour dénombrer les issues de deux épreuves successives (deux dés, par exemple), on utilise ...",
   "reponse": "un tableau à double entrée ou un arbre",
   "pieges": [
    "une seule liste sans tenir compte de l'ordre des épreuves",
    "une addition du nombre d'issues de chaque épreuve",
    "un histogramme"
   ],
   "note": "Deux dés équilibrés : $6 \\times 6 = 36$ issues équiprobables."
  },
  {
   "id": "rel-signe-prod",
   "chap": "rf",
   "type": "regle",
   "titre": "Signe d'un produit",
   "question": "Le produit de deux nombres de signes contraires est ...",
   "reponse": "négatif",
   "pieges": [
    "positif",
    "nul",
    "du signe du plus grand"
   ],
   "note": "Même signe : positif. Produit de plusieurs facteurs : nombre pair de facteurs négatifs → positif ; impair → négatif."
  },
  {
   "id": "rel-div-signe",
   "chap": "rf",
   "type": "regle",
   "titre": "Signe d'un quotient",
   "question": "Le quotient de deux nombres de signes contraires est ...",
   "reponse": "négatif",
   "pieges": [
    "positif",
    "nul",
    "du signe du plus grand"
   ],
   "exemples": [
    {
     "donnees": "Calculer $\\dfrac{-12}{3}$",
     "question": "Résultat ?",
     "reponse": -4,
     "unite": "",
     "correction": "$-12 \\div 3 = -4$"
    }
   ]
  },
  {
   "id": "frac-add-meme",
   "chap": "rf",
   "type": "regle",
   "titre": "Additionner des fractions de même dénominateur",
   "question": "$\\dfrac{a}{c} + \\dfrac{b}{c}$ vaut ...",
   "reponse": "$\\dfrac{a + b}{c}$",
   "pieges": [
    "$\\dfrac{a + b}{c + c}$",
    "$\\dfrac{a + b}{c^{2}}$",
    "$\\dfrac{a \\times b}{c}$"
   ],
   "morceaux": [
    "\\dfrac{a}{c}",
    "+",
    "\\dfrac{b}{c}",
    "=",
    "\\dfrac{a + b}{c}"
   ],
   "intrus": [
    "\\dfrac{a + b}{c + c}",
    "\\times"
   ],
   "exemples": [
    {
     "donnees": "Calculer $\\dfrac{3}{7} + \\dfrac{2}{7}$ (numérateur de la réponse)",
     "question": "Numérateur ?",
     "reponse": 5,
     "unite": "",
     "correction": "$\\dfrac{3 + 2}{7} = \\dfrac{5}{7}$"
    }
   ]
  },
  {
   "id": "frac-mult",
   "chap": "rf",
   "type": "formule",
   "titre": "Multiplier deux fractions",
   "question": "$\\dfrac{a}{b} \\times \\dfrac{c}{d}$ vaut ...",
   "reponse": "$\\dfrac{a \\times c}{b \\times d}$",
   "pieges": [
    "$\\dfrac{a + c}{b + d}$",
    "$\\dfrac{a \\times c}{b + d}$",
    "$\\dfrac{a \\times d}{b \\times c}$"
   ],
   "note": "Pas besoin de dénominateur commun pour multiplier.",
   "morceaux": [
    "\\dfrac{a}{b}",
    "\\times",
    "\\dfrac{c}{d}",
    "=",
    "\\dfrac{a \\times c}{b \\times d}"
   ],
   "intrus": [
    "\\dfrac{a \\times d}{b \\times c}",
    "+"
   ]
  },
  {
   "id": "inverse",
   "chap": "rf",
   "type": "definition",
   "titre": "Inverse d'un nombre",
   "question": "L'inverse de $\\dfrac{a}{b}$ (avec $a \\neq 0$) est ...",
   "reponse": "$\\dfrac{b}{a}$",
   "pieges": [
    "$-\\dfrac{a}{b}$",
    "$\\dfrac{a}{b}$",
    "$\\dfrac{1}{a+b}$"
   ],
   "note": "Le produit d'un nombre par son inverse vaut 1. Le nombre 0 n'a pas d'inverse.",
   "morceaux": [
    "\\dfrac{a}{b}",
    "\\times",
    "\\dfrac{b}{a}",
    "=",
    "1"
   ],
   "intrus": [
    "\\dfrac{a}{b}",
    "+",
    "\\dfrac{b}{a}"
   ]
  },
  {
   "id": "frac-div",
   "chap": "rf",
   "type": "regle",
   "titre": "Diviser par une fraction",
   "question": "Diviser par $\\dfrac{c}{d}$ revient à ...",
   "reponse": "multiplier par son inverse $\\dfrac{d}{c}$",
   "pieges": [
    "multiplier par $\\dfrac{c}{d}$",
    "diviser le numérateur et le dénominateur par $c$",
    "soustraire $\\dfrac{c}{d}$"
   ],
   "exemples": [
    {
     "donnees": "Calculer $\\dfrac{2}{3} \\div \\dfrac{4}{5}$ (donner la fraction simplifiée sous forme décimale, arrondie au centième)",
     "question": "Résultat ?",
     "reponse": 0.83,
     "unite": "",
     "correction": "$\\dfrac{2}{3} \\times \\dfrac{5}{4} = \\dfrac{10}{12} = \\dfrac{5}{6} \\approx 0{,}83$"
    }
   ]
  },
  {
   "id": "frac-ordre",
   "chap": "rf",
   "type": "regle",
   "titre": "Écrire une fraction avec un signe négatif",
   "question": "$-\\dfrac{3}{4}$, $\\dfrac{-3}{4}$ et $\\dfrac{3}{-4}$ sont ...",
   "reponse": "trois écritures du même nombre",
   "pieges": [
    "trois nombres différents",
    "deux nombres positifs et un négatif",
    "des nombres inverses"
   ]
  },
  {
   "id": "rel-sous",
   "chap": "rf",
   "type": "regle",
   "titre": "Soustraction de relatifs",
   "question": "Soustraire un nombre, c'est ...",
   "reponse": "ajouter son opposé : $a - b = a + (-b)$",
   "pieges": [
    "ajouter ce nombre lui-même : $a - b = a + b$",
    "multiplier par $-1$ le résultat : $a - b = -a \\times b$",
    "diviser le premier nombre par l'opposé du second"
   ],
   "morceaux": [
    "a",
    "-",
    "b",
    "=",
    "a",
    "+",
    "(",
    "-b",
    ")"
   ],
   "intrus": [
    "a",
    "+",
    "b"
   ],
   "exemples": [
    {
     "donnees": "Calculer $5 - (-2)$",
     "question": "Résultat ?",
     "reponse": 7,
     "unite": "",
     "correction": "$5 - (-2) = 5 + 2 = 7$"
    },
    {
     "donnees": "Calculer $-3 - 5$",
     "question": "Résultat ?",
     "reponse": -8,
     "unite": "",
     "correction": "$-3 - 5 = (-3) + (-5) = -8$"
    }
   ]
  },
  {
   "id": "frac-simpl",
   "chap": "rf",
   "type": "regle",
   "titre": "Simplifier une fraction",
   "question": "Pour simplifier $\\dfrac{a}{b}$ on ...",
   "reponse": "divise le numérateur et le dénominateur par un même nombre",
   "pieges": [
    "ajoute le même nombre en haut et en bas de la fraction",
    "soustrait le même nombre en haut et en bas de la fraction",
    "divise seulement le numérateur, en laissant le dénominateur"
   ]
  },
  {
   "id": "frac-add-diff",
   "chap": "rf",
   "type": "regle",
   "titre": "Additionner des fractions de dénominateurs différents",
   "question": "Pour additionner $\\dfrac{1}{2}$ et $\\dfrac{1}{3}$ on ...",
   "reponse": "les réduit d'abord au même dénominateur : $\\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$",
   "pieges": [
    "additionne les numérateurs et les dénominateurs : $\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{2}{5}$",
    "additionne seulement les dénominateurs et garde le numérateur",
    "multiplie les deux fractions entre elles, puis simplifie"
   ]
  },
  {
   "id": "rel-signe-nb",
   "chap": "rf",
   "type": "regle",
   "titre": "Signe d'un produit de plusieurs facteurs",
   "question": "Un produit de plusieurs facteurs non nuls est négatif quand ...",
   "reponse": "le nombre de facteurs négatifs est impair",
   "pieges": [
    "le nombre de facteurs positifs est impair",
    "il y a au moins un facteur négatif",
    "le nombre de facteurs est impair"
   ],
   "note": "Exemple : $(-2) \\times 3 \\times (-5) = 30$ : deux facteurs négatifs, le produit est positif."
  },
  {
   "id": "frac-prior",
   "chap": "rf",
   "type": "regle",
   "titre": "Barre de fraction et priorités",
   "question": "Dans $\\dfrac{a + b}{c}$, la barre de fraction joue le rôle de ...",
   "reponse": "parenthèses : on calcule d'abord le numérateur, puis on divise",
   "pieges": [
    "parenthèses : on divise d'abord $b$ par $c$, puis on ajoute $a$",
    "multiplication : on multiplie le numérateur par le dénominateur",
    "signe égal : on obtient deux calculs séparés à comparer"
   ],
   "note": "Les parenthèses, puis les puissances, puis les multiplications et divisions, enfin les additions et soustractions."
  },
  {
   "id": "hypotenuse",
   "chap": "pyth",
   "type": "definition",
   "titre": "Hypoténuse",
   "question": "Dans un triangle rectangle, l'hypoténuse est ...",
   "reponse": "le côté opposé à l'angle droit",
   "pieges": [
    "un côté de l'angle droit",
    "le plus petit côté",
    "la hauteur issue de l'angle droit"
   ],
   "note": "C'est aussi le plus long côté du triangle rectangle."
  },
  {
   "id": "pythagore",
   "chap": "pyth",
   "type": "propriete",
   "titre": "Théorème de Pythagore",
   "question": "Si un triangle ABC est rectangle en A, alors ...",
   "reponse": "$BC^{2} = AB^{2} + AC^{2}$",
   "pieges": [
    "$BC = AB + AC$",
    "$AB^{2} = BC^{2} + AC^{2}$",
    "$BC^{2} = AB^{2} - AC^{2}$"
   ],
   "note": "Hypoténuse : on additionne les carrés. Côté de l'angle droit : on soustrait.",
   "morceaux": [
    "BC^{2}",
    "=",
    "AB^{2}",
    "+",
    "AC^{2}"
   ],
   "intrus": [
    "BC",
    "-"
   ],
   "exemples": [
    {
     "donnees": "ABC rectangle en A, $AB = 3$ cm et $AC = 4$ cm",
     "question": "Longueur de $[BC]$ ?",
     "reponse": 5,
     "unite": "cm",
     "correction": "$BC^{2} = 3^{2} + 4^{2} = 25$ donc $BC = \\sqrt{25} = 5$ cm"
    },
    {
     "donnees": "ABC rectangle en A, $BC = 13$ cm et $AB = 5$ cm",
     "question": "Longueur de $[AC]$ ?",
     "reponse": 12,
     "unite": "cm",
     "correction": "$AC^{2} = 13^{2} - 5^{2} = 144$ donc $AC = 12$ cm"
    }
   ]
  },
  {
   "id": "recip",
   "chap": "pyth",
   "type": "propriete",
   "titre": "Réciproque de Pythagore",
   "question": "Si, dans un triangle ABC, on a $BC^{2} = AB^{2} + AC^{2}$, alors ...",
   "reponse": "le triangle ABC est rectangle en A",
   "pieges": [
    "le triangle ABC est équilatéral, puisque les trois côtés sont égaux",
    "$BC = AB + AC$",
    "le triangle ABC est isocèle en A"
   ],
   "note": "La réciproque sert à prouver qu'un triangle est rectangle."
  },
  {
   "id": "contra",
   "chap": "pyth",
   "type": "propriete",
   "titre": "Contraposée de Pythagore",
   "question": "Si, dans un triangle ABC, on a $BC^{2} \\neq AB^{2} + AC^{2}$, alors ...",
   "reponse": "le triangle ABC n'est pas rectangle en A",
   "pieges": [
    "le triangle ABC est rectangle en B",
    "le triangle ABC est équilatéral, puisque les trois côtés sont égaux",
    "on ne peut rien conclure"
   ]
  },
  {
   "id": "pyth-cote",
   "chap": "pyth",
   "type": "regle",
   "titre": "Calculer un côté de l'angle droit",
   "question": "Pour calculer un côté de l'angle droit avec Pythagore, on ...",
   "reponse": "soustrait le carré de l'autre côté au carré de l'hypoténuse, puis prend la racine",
   "pieges": [
    "additionne les carrés des deux autres côtés, puis prend la racine carrée du résultat",
    "soustrait les longueurs des deux autres côtés, sans les élever au carré",
    "additionne les longueurs des deux autres côtés, puis prend la racine du total"
   ]
  },
  {
   "id": "recip-methode",
   "chap": "pyth",
   "type": "regle",
   "titre": "Méthode de la réciproque",
   "question": "Avec la réciproque, on compare ...",
   "reponse": "le carré du plus grand côté et la somme des carrés des deux autres",
   "pieges": [
    "la somme des deux plus petits côtés et le plus grand côté, sans carré",
    "les carrés des deux plus petits côtés entre eux, puis au plus grand côté",
    "le périmètre du triangle et le carré du plus grand côté"
   ]
  },
  {
   "id": "pyth-arrondi",
   "chap": "pyth",
   "type": "regle",
   "titre": "Arrondir à la fin",
   "question": "Quand une longueur n'est pas un nombre décimal exact, on arrondit ...",
   "reponse": "seulement le résultat final, jamais les calculs intermédiaires",
   "pieges": [
    "chaque carré et chaque racine, dès qu'ils ne sont plus des nombres décimaux exacts",
    "la racine carrée, puis on recommence le calcul",
    "les longueurs de l'énoncé, avant de commencer"
   ],
   "note": "Exemple : $BC = \\sqrt{170} \\approx 13{,}0$ cm au dixième."
  },
  {
   "id": "pyth-triplet",
   "chap": "pyth",
   "type": "propriete",
   "titre": "Triplets pythagoriciens",
   "question": "Si $(a\\,;\\,b\\,;\\,c)$ est un triplet pythagoricien, alors pour tout entier $k$ non nul ...",
   "reponse": "$(ka\\,;\\,kb\\,;\\,kc)$ est aussi un triplet pythagoricien",
   "pieges": [
    "$(a + k\\,;\\,b + k\\,;\\,c + k)$ est aussi un triplet pythagoricien",
    "$(ka\\,;\\,b\\,;\\,c)$ est aussi un triplet pythagoricien",
    "seul le triplet $(a\\,;\\,b\\,;\\,c)$ de départ convient"
   ],
   "note": "Exemples : (3 ; 4 ; 5), (5 ; 12 ; 13), (8 ; 15 ; 17), (6 ; 8 ; 10) ; avec $k = 2$, (3 ; 4 ; 5) donne (6 ; 8 ; 10)."
  },
  {
   "id": "pyth-redac",
   "chap": "pyth",
   "type": "regle",
   "titre": "Rédiger avec le théorème",
   "question": "La rédaction d'un calcul de longueur commence par ...",
   "reponse": "« D'après le théorème de Pythagore dans le triangle ABC rectangle en A : … »",
   "pieges": [
    "« Je mesure le triangle avec la règle graduée, donc la longueur vaut environ … cm »",
    "« On mesure la longueur avec la règle graduée : … »",
    "« Comme les deux côtés connus valent …, le troisième vaut … »"
   ],
   "note": "On cite le triangle, l'angle droit, puis l'égalité $BC^{2} = AB^{2} + AC^{2}$ avant de remplacer par les valeurs.",
   "morceaux": [
    "\\text{D'après le théorème de Pythagore}",
    "\\text{dans le triangle ABC rectangle en A}",
    "BC^{2} = AB^{2} + AC^{2}"
   ],
   "intrus": [
    "\\text{On mesure}",
    "BC = AB + AC"
   ]
  },
  {
   "id": "pyth-choix",
   "chap": "pyth",
   "type": "regle",
   "titre": "Quel théorème utiliser ?",
   "question": "Pour calculer une longueur dans un triangle dont on sait qu'il est rectangle, on utilise ...",
   "reponse": "le théorème de Pythagore (direct)",
   "pieges": [
    "la réciproque du théorème de Pythagore",
    "la contraposée du théorème de Pythagore",
    "le théorème de Thalès"
   ],
   "note": "Réciproque : on démontre qu'un triangle est rectangle ; contraposée : on démontre qu'il ne l'est pas."
  },
  {
   "id": "pyth-diag-rect",
   "chap": "pyth",
   "type": "formule",
   "titre": "Diagonale d'un rectangle",
   "question": "La diagonale d'un rectangle de longueur $L$ et de largeur $\\ell$ vaut ...",
   "reponse": "$\\sqrt{L^{2} + \\ell^{2}}$",
   "pieges": [
    "$L + \\ell$",
    "$\\sqrt{L^{2} - \\ell^{2}}$",
    "$\\sqrt{L + \\ell}$"
   ],
   "note": "La diagonale partage le rectangle en deux triangles rectangles dont elle est l'hypoténuse."
  },
  {
   "id": "pyth-espace",
   "chap": "pyth",
   "type": "formule",
   "titre": "Diagonale d'un pavé droit",
   "question": "La grande diagonale d'un pavé droit de dimensions $a$, $b$ et $c$ vaut ...",
   "reponse": "$\\sqrt{a^{2} + b^{2} + c^{2}}$",
   "pieges": [
    "$a + b + c$",
    "$\\sqrt{a^{2} + b^{2}} + c$",
    "$\\sqrt{a^{2} + b^{2} - c^{2}}$"
   ],
   "note": "On applique deux fois le théorème de Pythagore : d'abord dans la base, puis dans un triangle vertical."
  },
  {
   "id": "agrand-k",
   "chap": "agr",
   "type": "propriete",
   "titre": "Agrandissement et réduction de rapport k",
   "question": "Dans un agrandissement ou une réduction de rapport $k$, les aires sont multipliées par ...",
   "reponse": "$k^{2}$",
   "pieges": [
    "$k$",
    "$k^{3}$",
    "$2k$"
   ],
   "note": "Longueurs × k ; angles inchangés ; aires × k² ; volumes × k³.",
   "morceaux": [
    "\\mathcal{A}'",
    "=",
    "k^{2}",
    "\\times",
    "\\mathcal{A}"
   ],
   "intrus": [
    "k",
    "2k"
   ]
  },
  {
   "id": "agr-k",
   "chap": "agr",
   "type": "formule",
   "titre": "Rapport d'agrandissement ou de réduction",
   "question": "Rapport $k$ d'un agrandissement ou d'une réduction ?",
   "reponse": "$k = \\dfrac{\\text{longueur obtenue}}{\\text{longueur de départ}}$",
   "pieges": [
    "$k = \\dfrac{\\text{longueur de départ}}{\\text{longueur obtenue}}$",
    "$k = \\text{longueur obtenue} - \\text{longueur de départ}$",
    "$k = \\text{longueur obtenue} \\times \\text{longueur de départ}$"
   ],
   "morceaux": [
    "k",
    "=",
    "\\dfrac{\\text{longueur obtenue}}{\\text{longueur de départ}}"
   ],
   "intrus": [
    "\\dfrac{\\text{longueur de départ}}{\\text{longueur obtenue}}",
    "-"
   ],
   "exemples": [
    {
     "donnees": "Un côté passe de 4 cm à 10 cm",
     "question": "Rapport $k$ ?",
     "reponse": 2.5,
     "unite": "",
     "correction": "$k = \\dfrac{10}{4} = 2{,}5$"
    }
   ]
  },
  {
   "id": "agr-aire",
   "chap": "agr",
   "type": "regle",
   "titre": "Retrouver k à partir de l'aire",
   "question": "Si les aires sont multipliées par $A$, le rapport $k$ vaut ...",
   "reponse": "$\\sqrt{A}$",
   "pieges": [
    "$A^{2}$",
    "$\\dfrac{A}{2}$",
    "$A$"
   ],
   "exemples": [
    {
     "donnees": "Les aires sont multipliées par 49",
     "question": "Rapport $k$ ?",
     "reponse": 7,
     "unite": "",
     "correction": "$k = \\sqrt{49} = 7$"
    }
   ]
  },
  {
   "id": "agr-sens",
   "chap": "agr",
   "type": "regle",
   "titre": "Agrandissement ou réduction ?",
   "question": "Un rapport $k$ correspond à un agrandissement quand ...",
   "reponse": "$k > 1$",
   "pieges": [
    "$k < 1$",
    "$k < 0$",
    "$k = 1$"
   ],
   "note": "$k < 1$ : réduction ; $k = 1$ : figure identique."
  },
  {
   "id": "agr-vol",
   "chap": "agr",
   "type": "propriete",
   "titre": "Volumes dans un agrandissement",
   "question": "Dans un agrandissement de rapport $k$, les volumes sont multipliés par ...",
   "reponse": "$k^{3}$",
   "pieges": [
    "$k$",
    "$k^{2}$",
    "$3k$"
   ],
   "morceaux": [
    "V'",
    "=",
    "k^{3}",
    "\\times",
    "V"
   ],
   "intrus": [
    "k",
    "3k"
   ],
   "exemples": [
    {
     "donnees": "Rapport $k = 3$ ; volume initial 2 cm³",
     "question": "Nouveau volume ?",
     "reponse": 54,
     "unite": "cm³",
     "correction": "$2 \\times 3^{3} = 54$ cm³"
    }
   ]
  },
  {
   "id": "agr-ech",
   "chap": "agr",
   "type": "definition",
   "titre": "Échelle",
   "question": "Une échelle de $\\dfrac{1}{N}$ correspond à ...",
   "reponse": "une réduction de rapport $\\dfrac{1}{N}$",
   "pieges": [
    "un agrandissement de rapport $N$, car l'échelle donne toujours le rapport",
    "une réduction de rapport $N$, car le dénominateur indique le rapport",
    "une symétrie de rapport $N$, car l'échelle conserve les distances"
   ],
   "note": "Cela suppose $N > 1$."
  },
  {
   "id": "agr-angles",
   "chap": "agr",
   "type": "propriete",
   "titre": "Les angles sont conservés",
   "question": "Dans un agrandissement ou une réduction, les mesures des angles ...",
   "reponse": "ne changent pas",
   "pieges": [
    "sont multipliées par $k$, comme les longueurs",
    "sont multipliées par $k^{2}$, comme les aires",
    "sont divisées par $k$ dans une réduction"
   ],
   "note": "Exemple : un angle droit reste un angle droit, un triangle équilatéral reste équilatéral."
  },
  {
   "id": "agr-long",
   "chap": "agr",
   "type": "propriete",
   "titre": "Les longueurs sont multipliées par k",
   "question": "Dans un agrandissement ou une réduction de rapport $k$, les longueurs sont multipliées par ...",
   "reponse": "$k$",
   "pieges": [
    "$k^{2}$",
    "$k^{3}$",
    "$2k$"
   ],
   "note": "Si $k = 3$, un segment de 4 cm devient un segment de 12 cm."
  },
  {
   "id": "agr-double",
   "chap": "agr",
   "type": "propriete",
   "titre": "Longueurs doublées : volume ×8",
   "question": "Quand on double toutes les longueurs d'un solide, son volume est multiplié par ...",
   "reponse": "8",
   "pieges": [
    "2",
    "4",
    "6"
   ],
   "note": "Car $k = 2$ et $k^{3} = 2^{3} = 8$ ; les aires, elles, sont multipliées par $2^{2} = 4$."
  },
  {
   "id": "agr-unit",
   "chap": "pv",
   "type": "formule",
   "titre": "Unités d'aire",
   "question": "Combien de cm² y a-t-il dans 1 m² ?",
   "reponse": "10 000 cm²",
   "pieges": [
    "100 cm²",
    "1 000 cm²",
    "100 000 cm²"
   ],
   "note": "$1\\ \\text{m} = 100\\ \\text{cm}$ donc $1\\ \\text{m}^{2} = 100 \\times 100 = 10\\,000\\ \\text{cm}^{2}$."
  },
  {
   "id": "agr-forme",
   "chap": "agr",
   "type": "propriete",
   "titre": "Même forme, taille différente",
   "question": "Une figure agrandie ou réduite a ...",
   "reponse": "la même forme que la figure de départ, mais pas la même taille",
   "pieges": [
    "la même taille que la figure de départ, mais pas la même forme",
    "la même forme et la même taille que la figure de départ",
    "une forme et une taille toutes deux différentes de celles de départ"
   ],
   "note": "Un agrandissement ou une réduction d'un carré donne toujours un carré."
  },
  {
   "id": "agr-inverse",
   "chap": "agr",
   "type": "regle",
   "titre": "Passer de la figure obtenue à la figure de départ",
   "question": "Si une figure $F'$ est un agrandissement de rapport $k$ de la figure $F$, alors $F$ est ...",
   "reponse": "une réduction de rapport $\\dfrac{1}{k}$ de $F'$",
   "pieges": [
    "un agrandissement de rapport $k$ de $F'$, la transformation étant la même",
    "une réduction de rapport $-k$ de $F'$",
    "une réduction de rapport $k$ de $F'$"
   ],
   "note": "Exemple : agrandissement de rapport 4, donc retour par une réduction de rapport $\\dfrac{1}{4} = 0{,}25$."
  },
  {
   "id": "frequence",
   "chap": "stat",
   "type": "formule",
   "titre": "Fréquence",
   "question": "Fréquence d'une valeur, d'effectif $n$ dans une série d'effectif total $N$ ?",
   "reponse": "$f = \\dfrac{n}{N}$",
   "pieges": [
    "$f = \\dfrac{N}{n}$",
    "$f = n \\times N$",
    "$f = n - N$"
   ],
   "morceaux": [
    "f",
    "=",
    "\\dfrac{n}{N}"
   ],
   "intrus": [
    "\\dfrac{N}{n}",
    "n \\times N"
   ],
   "exemples": [
    {
     "donnees": "Sur 25 élèves, 5 ont la note 12",
     "question": "Fréquence (en fraction décimale) ?",
     "reponse": 0.2,
     "unite": "",
     "correction": "$f = \\dfrac{5}{25} = 0{,}2$"
    }
   ],
   "note": "La somme des fréquences vaut toujours 1."
  },
  {
   "id": "moyenne",
   "chap": "stat",
   "type": "formule",
   "titre": "Moyenne",
   "question": "Moyenne d'une série de valeurs ?",
   "reponse": "$\\text{moyenne} = \\dfrac{\\text{somme des valeurs}}{\\text{effectif total}}$",
   "pieges": [
    "$\\dfrac{\\text{somme des valeurs}}{\\text{nombre de valeurs différentes}}$",
    "$\\dfrac{\\text{valeur max} + \\text{valeur min}}{2}$",
    "$\\text{valeur du milieu de la série rangée}$"
   ],
   "exemples": [
    {
     "donnees": "Notes : 8 ; 12 ; 15 ; 10 ; 5",
     "question": "Moyenne ?",
     "reponse": 10,
     "unite": "",
     "correction": "$\\dfrac{8 + 12 + 15 + 10 + 5}{5} = \\dfrac{50}{5} = 10$"
    }
   ],
   "morceaux": [
    "\\text{moyenne}",
    "=",
    "\\dfrac{\\text{somme des valeurs}}{\\text{effectif total}}"
   ],
   "intrus": [
    "\\dfrac{\\text{effectif total}}{\\text{somme des valeurs}}",
    "+"
   ]
  },
  {
   "id": "mediane",
   "chap": "stat",
   "type": "definition",
   "titre": "Médiane",
   "question": "La médiane d'une série est la valeur qui ...",
   "reponse": "partage la série rangée en deux groupes de même effectif",
   "pieges": [
    "est la plus fréquente",
    "est la moyenne des valeurs",
    "est la valeur du milieu d'une série non rangée"
   ],
   "note": "Il faut d'abord ranger. Effectif impair : valeur centrale ; pair : milieu des deux valeurs centrales."
  },
  {
   "id": "puiss-prod",
   "chap": "puis",
   "type": "formule",
   "titre": "Produit de puissances",
   "question": "$a^{m} \\times a^{n}$ vaut ...",
   "reponse": "$a^{m+n}$",
   "pieges": [
    "$a^{m \\times n}$",
    "$a^{m-n}$",
    "$(2a)^{m+n}$"
   ],
   "morceaux": [
    "a^{m}",
    "\\times",
    "a^{n}",
    "=",
    "a^{m+n}"
   ],
   "intrus": [
    "a^{m \\times n}",
    "+"
   ],
   "exemples": [
    {
     "donnees": "Calculer $2^{3} \\times 2^{4}$ (donner le nombre)",
     "question": "Résultat ?",
     "reponse": 128,
     "unite": "",
     "correction": "$2^{3} \\times 2^{4} = 2^{7} = 128$"
    }
   ]
  },
  {
   "id": "puiss-quot",
   "chap": "puis",
   "type": "formule",
   "titre": "Quotient de puissances",
   "question": "$\\dfrac{a^{m}}{a^{n}}$ vaut ...",
   "reponse": "$a^{m-n}$",
   "pieges": [
    "$a^{m+n}$",
    "$a^{m \\div n}$",
    "$a^{n-m}$"
   ],
   "exemples": [
    {
     "donnees": "Calculer $\\dfrac{5^{6}}{5^{4}}$ (donner le nombre)",
     "question": "Résultat ?",
     "reponse": 25,
     "unite": "",
     "correction": "$5^{6-4} = 5^{2} = 25$"
    }
   ],
   "morceaux": [
    "\\dfrac{a^{m}}{a^{n}}",
    "=",
    "a^{m-n}"
   ],
   "intrus": [
    "a^{m+n}",
    "a^{n-m}"
   ]
  },
  {
   "id": "puiss-puiss",
   "chap": "puis",
   "type": "formule",
   "titre": "Puissance d'une puissance",
   "question": "$(a^{m})^{n}$ vaut ...",
   "reponse": "$a^{m \\times n}$",
   "pieges": [
    "$a^{m+n}$",
    "$a^{m^{n}}$",
    "$a^{m}\\times n$"
   ],
   "exemples": [
    {
     "donnees": "Calculer $(2^{3})^{2}$ (donner le nombre)",
     "question": "Résultat ?",
     "reponse": 64,
     "unite": "",
     "correction": "$(2^{3})^{2} = 2^{6} = 64$"
    }
   ],
   "morceaux": [
    "(",
    "a^{m}",
    ")^{n}",
    "=",
    "a^{m \\times n}"
   ],
   "intrus": [
    "a^{m+n}"
   ]
  },
  {
   "id": "puiss-neg",
   "chap": "puis",
   "type": "regle",
   "titre": "Exposant négatif",
   "question": "$a^{-n}$ (avec $a \\neq 0$) vaut ...",
   "reponse": "$\\dfrac{1}{a^{n}}$",
   "pieges": [
    "$-a^{n}$",
    "$-\\dfrac{1}{a^{n}}$",
    "$a^{n}$"
   ],
   "exemples": [
    {
     "donnees": "Calculer $2^{-3}$ (donner un décimal)",
     "question": "Résultat ?",
     "reponse": 0.125,
     "unite": "",
     "correction": "$2^{-3} = \\dfrac{1}{2^{3}} = \\dfrac{1}{8} = 0{,}125$"
    }
   ],
   "note": "Un exposant négatif ne rend pas le nombre négatif.",
   "morceaux": [
    "a^{-n}",
    "=",
    "\\dfrac{1}{a^{n}}"
   ],
   "intrus": [
    "-a^{n}",
    "\\dfrac{1}{-a^{n}}"
   ]
  },
  {
   "id": "puiss-zero",
   "chap": "puis",
   "type": "regle",
   "titre": "Exposant zéro",
   "question": "Pour tout nombre $a \\neq 0$, $a^{0}$ vaut ...",
   "reponse": "1",
   "pieges": [
    "0",
    "$a$",
    "impossible à calculer"
   ],
   "morceaux": [
    "a^{0}",
    "=",
    "1"
   ],
   "intrus": [
    "0",
    "a"
   ]
  },
  {
   "id": "puiss-signe",
   "chap": "puis",
   "type": "regle",
   "titre": "Signe d'une puissance",
   "question": "Pour un nombre $a$ positif, $(-a)^{n}$ est positif quand ...",
   "reponse": "$n$ est pair",
   "pieges": [
    "$n$ est impair",
    "$n$ est positif",
    "$n$ est supérieur à $a$"
   ],
   "note": "$(-3)^{2} = 9$ mais $-3^{2} = -9$ (sans parenthèses, le signe moins reste devant)."
  },
  {
   "id": "dix-puiss",
   "chap": "puis",
   "type": "regle",
   "titre": "Puissances de 10",
   "question": "$10^{-3}$ est égal à ...",
   "reponse": "0,001",
   "pieges": [
    "$-1000$",
    "0,0001",
    "$-0{,}001$"
   ],
   "morceaux": [
    "10^{-3}",
    "=",
    "0{,}001"
   ],
   "intrus": [
    "-1000",
    "0{,}0001"
   ]
  },
  {
   "id": "sci-def",
   "chap": "puis",
   "type": "definition",
   "titre": "Notation scientifique",
   "question": "Un nombre est en notation scientifique s'il s'écrit ...",
   "reponse": "$a \\times 10^{n}\\ \\text{avec}\\ 1 \\leq a < 10\\ \\text{et}\\ n\\ \\text{entier relatif}$",
   "pieges": [
    "$a \\times 10^{n}\\ \\text{avec}\\ 0 < a < 1\\ \\text{et}\\ n\\ \\text{entier relatif}$",
    "$a \\times 10^{n}\\ \\text{avec}\\ a\\ \\text{quelconque et}\\ n\\ \\text{entier relatif}$",
    "$a \\times n^{10}\\ \\text{avec}\\ 1 \\leq a < 10\\ \\text{et}\\ n\\ \\text{entier relatif}$"
   ]
  },
  {
   "id": "sci-prod",
   "chap": "puis",
   "type": "regle",
   "titre": "Produit en notation scientifique",
   "question": "Pour calculer $(a \\times 10^{m}) \\times (b \\times 10^{n})$, on ...",
   "reponse": "multiplie $a$ par $b$, additionne les exposants, puis remet en notation scientifique",
   "pieges": [
    "additionne $a$ et $b$, multiplie les exposants, puis remet en notation scientifique",
    "multiplie $a$ par $b$, multiplie les exposants, puis remet en notation scientifique",
    "additionne tout, puis remet en notation scientifique"
   ],
   "exemples": [
    {
     "donnees": "Calculer $(3 \\times 10^{4}) \\times (2 \\times 10^{3})$ (donner le résultat en nombre entier)",
     "question": "Résultat ?",
     "reponse": 60000000,
     "unite": "",
     "correction": "$3 \\times 2 = 6$ et $10^{4+3} = 10^{7}$ donc $6 \\times 10^{7} = 60\\,000\\,000$"
    }
   ]
  },
  {
   "id": "pyr-vol",
   "chap": "pv",
   "type": "formule",
   "titre": "Volume d'une pyramide",
   "question": "Volume d'une pyramide d'aire de base $B$ et de hauteur $h$ ?",
   "reponse": "$V = \\dfrac{1}{3} \\times B \\times h$",
   "pieges": [
    "$V = B \\times h$",
    "$V = \\dfrac{1}{2} \\times B \\times h$",
    "$V = \\dfrac{1}{3} \\times P_{\\text{base}} \\times h$"
   ],
   "morceaux": [
    "V",
    "=",
    "\\dfrac{1}{3}",
    "\\times",
    "B",
    "\\times",
    "h"
   ],
   "intrus": [
    "\\dfrac{1}{2}",
    "+"
   ],
   "exemples": [
    {
     "donnees": "Base carrée de côté 6 cm, hauteur $h = 5$ cm",
     "question": "Volume ?",
     "reponse": 60,
     "unite": "cm³",
     "correction": "$B = 6^{2} = 36$ puis $V = \\dfrac{1}{3} \\times 36 \\times 5 = 60$ cm³"
    }
   ]
  },
  {
   "id": "cone-vol",
   "chap": "pv",
   "type": "formule",
   "titre": "Volume d'un cône de révolution",
   "question": "Volume d'un cône de rayon $r$ et de hauteur $h$ ?",
   "reponse": "$V = \\dfrac{1}{3} \\times \\pi \\times r^{2} \\times h$",
   "pieges": [
    "$V = \\pi \\times r^{2} \\times h$",
    "$V = \\dfrac{1}{3} \\times \\pi \\times r^{2} \\times g$",
    "$V = \\dfrac{1}{3} \\times \\pi \\times r \\times h$"
   ],
   "morceaux": [
    "V",
    "=",
    "\\dfrac{1}{3}",
    "\\times",
    "\\pi",
    "\\times",
    "r^{2}",
    "\\times",
    "h"
   ],
   "intrus": [
    "g",
    "\\dfrac{1}{2}"
   ],
   "exemples": [
    {
     "donnees": "$r = 3$ cm et $h = 5$ cm (arrondir au dixième)",
     "question": "Volume ?",
     "reponse": 47.1,
     "unite": "cm³",
     "correction": "$V = \\dfrac{1}{3} \\times \\pi \\times 3^{2} \\times 5 = 15\\pi \\approx 47{,}1$ cm³"
    }
   ]
  },
  {
   "id": "cone-gen",
   "chap": "esp",
   "type": "propriete",
   "titre": "Génératrice d'un cône",
   "question": "Dans un cône de révolution de hauteur $h$, de rayon $r$ et de génératrice $g$ ...",
   "reponse": "$g^{2} = h^{2} + r^{2}$",
   "pieges": [
    "$g = h + r$",
    "$h^{2} = g^{2} + r^{2}$",
    "$g^{2} = h^{2} - r^{2}$"
   ],
   "note": "C'est le théorème de Pythagore dans le triangle rectangle formé par la hauteur, le rayon et la génératrice.",
   "morceaux": [
    "g^{2}",
    "=",
    "h^{2}",
    "+",
    "r^{2}"
   ],
   "intrus": [
    "-",
    "g"
   ]
  },
  {
   "id": "pyr-red",
   "chap": "esp",
   "type": "propriete",
   "titre": "Réduction d'une pyramide",
   "question": "Quand on réduit une pyramide avec un rapport $k$, son volume est multiplié par ...",
   "reponse": "$k^{3}$",
   "pieges": [
    "$k$",
    "$k^{2}$",
    "$3k$"
   ],
   "morceaux": [
    "V'",
    "=",
    "k^{3}",
    "\\times",
    "V"
   ],
   "intrus": [
    "k",
    "3k"
   ]
  },
  {
   "id": "sembl-def",
   "chap": "sembl",
   "type": "definition",
   "titre": "Triangles semblables",
   "question": "Deux triangles sont semblables si ...",
   "reponse": "leurs angles sont égaux deux à deux",
   "pieges": [
    "ils ont la même aire et le même périmètre",
    "ils ont un seul angle égal, les autres sont différents",
    "ils ont le même périmètre, mais des angles différents"
   ],
   "note": "Leurs côtés homologues sont alors proportionnels."
  },
  {
   "id": "sembl-2ang",
   "chap": "sembl",
   "type": "propriete",
   "titre": "Deux angles égaux suffisent",
   "question": "Pour affirmer que deux triangles sont semblables, il suffit que ...",
   "reponse": "deux angles de l'un soient égaux à deux angles de l'autre",
   "pieges": [
    "un angle de l'un soit égal à un angle de l'autre",
    "un côté de l'un soit égal à un côté de l'autre",
    "leurs périmètres soient égaux"
   ]
  },
  {
   "id": "prem-def",
   "chap": "prem",
   "type": "definition",
   "titre": "Nombre premier",
   "question": "Un nombre premier est un nombre entier qui ...",
   "reponse": "a exactement deux diviseurs : 1 et lui-même",
   "pieges": [
    "n'a aucun diviseur, pas même 1",
    "est impair et n'est pas divisible par 3",
    "a plus de deux diviseurs : 1, lui-même et d'autres"
   ],
   "note": "1 n'est pas premier. 2 est le seul nombre premier pair. 9, 15, 21 sont impairs mais non premiers."
  },
  {
   "id": "prem-decomp",
   "chap": "prem",
   "type": "propriete",
   "titre": "Décomposition en facteurs premiers",
   "question": "Tout entier supérieur ou égal à 2 s'écrit ...",
   "reponse": "comme un produit de nombres premiers, de façon unique (à l'ordre près)",
   "pieges": [
    "comme une somme de nombres premiers, de façon unique",
    "comme un produit de nombres premiers, de plusieurs manières différentes",
    "comme un produit de nombres impairs, de façon unique"
   ],
   "exemples": [
    {
     "donnees": "Décomposer 60 : donner le plus grand facteur premier",
     "question": "Plus grand facteur premier ?",
     "reponse": 5,
     "unite": "",
     "correction": "$60 = 2 \\times 2 \\times 3 \\times 5$"
    }
   ]
  },
  {
   "id": "prem-pgcd",
   "chap": "prem",
   "type": "definition",
   "titre": "PGCD",
   "question": "Le PGCD de deux entiers est ...",
   "reponse": "le plus grand entier qui divise les deux",
   "pieges": [
    "le plus petit entier qui divise les deux",
    "leur produit",
    "leur différence"
   ],
   "exemples": [
    {
     "donnees": "Calculer le PGCD de 48 et 36",
     "question": "PGCD ?",
     "reponse": 12,
     "unite": "",
     "correction": "$48 = 36 \\times 1 + 12$ puis $36 = 12 \\times 3 + 0$ : le dernier reste non nul est 12"
    }
   ]
  },
  {
   "id": "prem-pgcd-fp",
   "chap": "prem",
   "type": "regle",
   "titre": "PGCD avec les facteurs premiers",
   "question": "Avec les décompositions, le PGCD est le produit des facteurs premiers communs, chacun pris avec ...",
   "reponse": "le plus petit exposant",
   "pieges": [
    "le plus grand exposant",
    "la somme des exposants",
    "l'exposant 1 toujours"
   ]
  },
  {
   "id": "prem-irred",
   "chap": "prem",
   "type": "regle",
   "titre": "Fraction irréductible",
   "question": "Pour rendre une fraction irréductible, on ...",
   "reponse": "divise le numérateur et le dénominateur par leur PGCD",
   "pieges": [
    "divise seulement le numérateur par le PGCD, sans toucher au dénominateur",
    "multiplie le numérateur et le dénominateur par leur PGCD",
    "soustrait le PGCD au numérateur et au dénominateur"
   ],
   "exemples": [
    {
     "donnees": "Simplifier $\\dfrac{48}{36}$ : donner le numérateur de la fraction irréductible",
     "question": "Numérateur ?",
     "reponse": 4,
     "unite": "",
     "correction": "$\\dfrac{48 \\div 12}{36 \\div 12} = \\dfrac{4}{3}$"
    }
   ]
  },
  {
   "id": "prem-crit",
   "chap": "prem",
   "type": "regle",
   "titre": "Critères de divisibilité",
   "question": "Un nombre est divisible par 9 quand ...",
   "reponse": "la somme de ses chiffres est divisible par 9",
   "pieges": [
    "son dernier chiffre est 9 ou 0, comme pour les multiples de 9",
    "la somme de ses chiffres est 9 seulement, pas 18 ni 27",
    "il est divisible par 3, ce qui suffit pour qu'il le soit par 9"
   ],
   "note": "Par 2 : dernier chiffre pair. Par 3 : somme des chiffres divisible par 3. Par 5 : se termine par 0 ou 5. Par 10 : se termine par 0."
  },
  {
   "id": "prem-un",
   "chap": "prem",
   "type": "regle",
   "titre": "Le nombre 1",
   "question": "Le nombre 1 est-il premier ?",
   "reponse": "non, car il n'a qu'un seul diviseur : lui-même",
   "pieges": [
    "oui, car il est divisible par 1 et par lui-même",
    "oui, car il est impair et ne se décompose pas",
    "non, car il est divisible par tous les nombres entiers"
   ],
   "note": "Un nombre premier a exactement deux diviseurs : 1 n'en a qu'un."
  },
  {
   "id": "prem-pair",
   "chap": "prem",
   "type": "propriete",
   "titre": "Le seul premier pair",
   "question": "Combien y a-t-il de nombres premiers pairs ?",
   "reponse": "un seul : 2",
   "pieges": [
    "aucun, car un nombre pair est divisible par 2",
    "une infinité, car il y a une infinité de nombres pairs",
    "deux : 2 et 4"
   ],
   "note": "Tout nombre pair supérieur à 2 est divisible par 2 : il a au moins trois diviseurs (1, 2 et lui-même)."
  },
  {
   "id": "prem-test",
   "chap": "prem",
   "type": "regle",
   "titre": "Tester si un nombre est premier",
   "question": "Pour savoir si $N$ est premier, il suffit de tester la divisibilité par les nombres premiers ...",
   "reponse": "dont le carré est inférieur ou égal à $N$",
   "pieges": [
    "inférieurs ou égaux à la moitié de $N$",
    "impairs et strictement inférieurs à $N$",
    "dont le carré est strictement supérieur à $N$"
   ],
   "note": "Exemple : pour $N = 97$, on teste 2, 3, 5 et 7 (car $11^{2} = 121 > 97$) : aucun ne divise 97, donc 97 est premier."
  },
  {
   "id": "prem-entre",
   "chap": "prem",
   "type": "definition",
   "titre": "Premiers entre eux",
   "question": "Deux entiers sont premiers entre eux quand ...",
   "reponse": "leur PGCD est égal à 1",
   "pieges": [
    "ils sont tous les deux des nombres premiers",
    "leur PGCD est un nombre premier",
    "ils n'ont aucun diviseur en commun, pas même 1"
   ],
   "note": "Exemple : 8 et 15 sont premiers entre eux, alors qu'aucun des deux n'est premier."
  },
  {
   "id": "prem-decomp-methode",
   "chap": "prem",
   "type": "regle",
   "titre": "Décomposer en facteurs premiers",
   "question": "Pour décomposer un entier en produit de facteurs premiers, on le divise successivement par ...",
   "reponse": "les nombres premiers 2, 3, 5, 7… dans l'ordre, tant que c'est possible",
   "pieges": [
    "tous les entiers de 2 à $N$, dans l'ordre, qu'ils soient premiers ou non",
    "les nombres impairs seulement, en commençant par 3, puisque 2 est pair",
    "le plus grand diviseur de $N$, puis le plus grand diviseur du quotient"
   ],
   "note": "Exemple : $60 = 2 \\times 30 = 2 \\times 2 \\times 15 = 2 \\times 2 \\times 3 \\times 5 = 2^{2} \\times 3 \\times 5$."
  },
  {
   "id": "prem-exposant",
   "chap": "prem",
   "type": "definition",
   "titre": "Exposant d'un facteur premier",
   "question": "Dans $2^{3} \\times 5$, l'exposant 3 indique ...",
   "reponse": "que le facteur 2 est utilisé 3 fois",
   "pieges": [
    "que le facteur 2 est multiplié par 3",
    "que le nombre est divisible par 3",
    "que le facteur 5 est utilisé 3 fois"
   ],
   "note": "$2^{3} \\times 5 = 2 \\times 2 \\times 2 \\times 5 = 40$."
  },
  {
   "id": "lit-dist",
   "chap": "lit",
   "type": "formule",
   "titre": "Distributivité simple",
   "question": "$k(a + b)$ vaut ...",
   "reponse": "$ka + kb$",
   "pieges": [
    "$ka + b$",
    "$k + ab$",
    "$ka \\times kb$"
   ],
   "morceaux": [
    "k",
    "(",
    "a",
    "+",
    "b",
    ")",
    "=",
    "ka",
    "+",
    "kb"
   ],
   "intrus": [
    "k",
    "+",
    "b"
   ],
   "exemples": [
    {
     "donnees": "Pour $x = 4$ : calculer $3(x + 5)$",
     "question": "Résultat ?",
     "reponse": 27,
     "unite": "",
     "correction": "$3 \\times 9 = 27$ (et $3x + 15 = 27$)"
    }
   ]
  },
  {
   "id": "lit-id1",
   "chap": "lit",
   "type": "formule",
   "titre": "Identité remarquable (a + b)²",
   "question": "$(a + b)^{2}$ vaut ...",
   "reponse": "$a^{2} + 2ab + b^{2}$",
   "pieges": [
    "$a^{2} + b^{2}$",
    "$a^{2} + ab + b^{2}$",
    "$a^{2} - 2ab + b^{2}$"
   ],
   "note": "Il manque le double produit dans $a^{2} + b^{2}$.",
   "morceaux": [
    "(a+b)^{2}",
    "=",
    "a^{2}",
    "+",
    "2ab",
    "+",
    "b^{2}"
   ],
   "intrus": [
    "-",
    "2a^{2}b"
   ],
   "exemples": [
    {
     "donnees": "Avec $a = 3$ et $b = 2$, calculer $(a+b)^{2}$ avec l'identité",
     "question": "Résultat ?",
     "reponse": 25,
     "unite": "",
     "correction": "$9 + 12 + 4 = 25$"
    }
   ]
  },
  {
   "id": "lit-id2",
   "chap": "lit",
   "type": "formule",
   "titre": "Identité remarquable (a − b)²",
   "question": "$(a - b)^{2}$ vaut ...",
   "reponse": "$a^{2} - 2ab + b^{2}$",
   "pieges": [
    "$a^{2} - b^{2}$",
    "$a^{2} - 2ab - b^{2}$",
    "$a^{2} + 2ab + b^{2}$"
   ],
   "note": "Le dernier terme est $+b^{2}$, jamais $-b^{2}$.",
   "morceaux": [
    "(a-b)^{2}",
    "=",
    "a^{2}",
    "-",
    "2ab",
    "+",
    "b^{2}"
   ],
   "intrus": [
    "+",
    "2a^{2}b"
   ]
  },
  {
   "id": "lit-id3",
   "chap": "lit",
   "type": "formule",
   "titre": "Identité remarquable (a + b)(a − b)",
   "question": "$(a + b)(a - b)$ vaut ...",
   "reponse": "$a^{2} - b^{2}$",
   "pieges": [
    "$a^{2} + b^{2}$",
    "$a^{2} - 2ab + b^{2}$",
    "$(a - b)^{2}$"
   ],
   "morceaux": [
    "(a+b)(a-b)",
    "=",
    "a^{2}",
    "-",
    "b^{2}"
   ],
   "intrus": [
    "+",
    "2ab"
   ],
   "exemples": [
    {
     "donnees": "Calculer $51 \\times 49$ avec $(50+1)(50-1)$",
     "question": "Résultat ?",
     "reponse": 2499,
     "unite": "",
     "correction": "$50^{2} - 1^{2} = 2500 - 1 = 2499$"
    }
   ]
  },
  {
   "id": "lit-prouver",
   "chap": "lit",
   "type": "regle",
   "titre": "Prouver avec une lettre",
   "question": "Pour prouver une égalité vraie pour tous les nombres, on ...",
   "reponse": "utilise une lettre, développe, réduit puis conclut",
   "pieges": [
    "la teste avec plusieurs valeurs et on conclut si ça marche",
    "la teste avec un seul nombre bien choisi",
    "la vérifie avec une mesure sur une figure"
   ]
  },
  {
   "id": "lit-dbl",
   "chap": "lit",
   "type": "formule",
   "titre": "Double distributivité",
   "question": "$(a + b)(c + d)$ vaut ...",
   "reponse": "$ac + ad + bc + bd$",
   "pieges": [
    "$ac + bd$ (on multiplie seulement les termes de même rang)",
    "$ac + ad + bc$ (le dernier produit est oublié)",
    "$a + b + c + d$ (les quatre termes sont additionnés)"
   ],
   "morceaux": [
    "(a+b)(c+d)",
    "=",
    "ac",
    "+",
    "ad",
    "+",
    "bc",
    "+",
    "bd"
   ],
   "intrus": [
    "ab",
    "cd"
   ]
  },
  {
   "id": "lit-fact",
   "chap": "lit",
   "type": "regle",
   "titre": "Factoriser",
   "question": "Factoriser une expression, c'est ...",
   "reponse": "l'écrire sous forme d'un produit",
   "pieges": [
    "l'écrire sous forme d'une somme de termes de même nature",
    "la développer en supprimant toutes les parenthèses",
    "la réduire en regroupant les termes semblables"
   ],
   "note": "On utilise un facteur commun ou une identité remarquable à l'envers. Développer : produit → somme. Factoriser : somme → produit. On vérifie en développant."
  },
  {
   "id": "lit-reduire",
   "chap": "lit",
   "type": "definition",
   "titre": "Réduire une expression",
   "question": "Réduire une expression littérale, c'est ...",
   "reponse": "regrouper les termes de même nature (en $x^{2}$, en $x$, constantes)",
   "pieges": [
    "multiplier entre eux tous les termes de l'expression, quelle que soit leur nature",
    "écrire l'expression sous la forme d'un produit de deux facteurs",
    "remplacer $x$ par un nombre choisi pour calculer une valeur"
   ],
   "note": "Exemple : $3x + 5 + 2x - 1 = 5x + 4$."
  },
  {
   "id": "lit-moins",
   "chap": "lit",
   "type": "regle",
   "titre": "Un signe moins devant une parenthèse",
   "question": "Un signe $-$ devant une parenthèse : $-(a - b)$ vaut ...",
   "reponse": "$-a + b$",
   "pieges": [
    "$-a - b$, car on ne change que le premier signe",
    "$a + b$, car deux signes moins donnent un plus",
    "$-ab$, car le signe moins multiplie le contenu"
   ],
   "note": "Le signe $-$ change le signe de chaque terme de la parenthèse : $-(3x - 2) = -3x + 2$."
  },
  {
   "id": "lit-fact-comm",
   "chap": "lit",
   "type": "formule",
   "titre": "Mettre en facteur",
   "question": "Pour factoriser $ka + kb$, on met en facteur ...",
   "reponse": "le facteur commun $k$ : $k(a + b)$",
   "pieges": [
    "le terme $a$ seulement : $a(k + kb)$ en laissant le reste",
    "le produit $kab$ : $kab(a + b)$ pour tout regrouper",
    "rien du tout : une somme ne peut pas se factoriser"
   ],
   "note": "Exemple : $6x + 9 = 3(2x + 3)$."
  },
  {
   "id": "lit-fact-id",
   "chap": "lit",
   "type": "formule",
   "titre": "Factoriser une différence de carrés",
   "question": "$a^{2} - b^{2}$ se factorise en ...",
   "reponse": "$(a + b)(a - b)$",
   "pieges": [
    "$(a - b)^{2}$, car on retire $b$ deux fois",
    "$(a + b)^{2}$, car on additionne les deux termes",
    "$a(a - b)$, en mettant $a$ en facteur"
   ],
   "note": "Exemple : $x^{2} - 25 = (x + 5)(x - 5)$."
  },
  {
   "id": "lit-fact-carre",
   "chap": "lit",
   "type": "formule",
   "titre": "Factoriser un carré",
   "question": "$a^{2} + 2ab + b^{2}$ se factorise en ...",
   "reponse": "$(a + b)^{2}$",
   "pieges": [
    "$(a - b)^{2}$, car il y a un double produit",
    "$(a + b)(a - b)$, car il y a deux termes carrés",
    "$a(a + 2b) + b^{2}$, en mettant $a$ en facteur"
   ],
   "note": "Exemple : $x^{2} + 6x + 9 = (x + 3)^{2}$."
  },
  {
   "id": "lit-terme",
   "chap": "lit",
   "type": "definition",
   "titre": "Les termes d'une somme",
   "question": "Dans $3x + 5$, les nombres $3x$ et $5$ s'appellent ...",
   "reponse": "des termes",
   "pieges": [
    "des facteurs",
    "des coefficients",
    "des variables"
   ],
   "note": "Une somme est faite de termes ; un produit est fait de facteurs."
  },
  {
   "id": "lit-coef",
   "chap": "lit",
   "type": "definition",
   "titre": "Coefficient",
   "question": "Dans le terme $7x$, le nombre 7 s'appelle ...",
   "reponse": "le coefficient de $x$",
   "pieges": [
    "l'exposant de $x$, qui indique la puissance",
    "la variable de ce terme, c'est-à-dire la lettre",
    "le terme constant de l'expression"
   ],
   "note": "Dans $-4x^{2}$, le coefficient de $x^{2}$ est $-4$."
  },
  {
   "id": "lit-fois",
   "chap": "lit",
   "type": "regle",
   "titre": "Le signe × sous-entendu",
   "question": "L'écriture $5x$ signifie ...",
   "reponse": "$5 \\times x$",
   "pieges": [
    "$5 + x$ (5 ajouté à $x$)",
    "$x^{5}$ ($x$ multiplié 5 fois par lui-même)",
    "$50 + x$ (5 et $x$ accolés comme des chiffres)"
   ],
   "note": "On n'écrit pas le signe $\\times$ entre un nombre et une lettre : $5x$, $ab$, $3(x + 1)$."
  },
  {
   "id": "lit-x2",
   "chap": "lit",
   "type": "definition",
   "titre": "Le carré de x",
   "question": "L'écriture $x^{2}$ signifie ...",
   "reponse": "$x \\times x$",
   "pieges": [
    "$2 \\times x$, comme $2x$",
    "$x + x$, comme $2x$",
    "$x \\times 2$, car l'exposant multiplie"
   ],
   "note": "Exemple : si $x = 5$, alors $x^{2} = 25$ et non 10."
  },
  {
   "id": "lit-xx",
   "chap": "lit",
   "type": "regle",
   "titre": "Somme de deux x",
   "question": "La somme $x + x$ vaut ...",
   "reponse": "$2x$",
   "pieges": [
    "$x^{2}$, car il y a deux fois $x$",
    "$2 + x$, car on compte deux objets",
    "$x$, car on ajoute une lettre à elle-même sans changer sa valeur"
   ],
   "note": "Exemple : si $x = 5$, $x + x = 10 = 2x$, alors que $x^{2} = 25$."
  },
  {
   "id": "lit-prod-x",
   "chap": "lit",
   "type": "regle",
   "titre": "Produit de termes en x",
   "question": "Le produit $3x \\times 2x$ vaut ...",
   "reponse": "$6x^{2}$",
   "pieges": [
    "$6x$, car on multiplie les nombres seulement",
    "$5x^{2}$, car on additionne les nombres",
    "$5x$, car on additionne tout ce qui est écrit"
   ],
   "note": "On multiplie les nombres entre eux ($3 \\times 2 = 6$) et les lettres entre elles ($x \\times x = x^{2}$)."
  },
  {
   "id": "lit-dev-def",
   "chap": "lit",
   "type": "definition",
   "titre": "Développer",
   "question": "Développer un produit, c'est ...",
   "reponse": "le transformer en une somme (ou une différence) de termes",
   "pieges": [
    "le transformer en un produit de facteurs plus simples, sans somme restante",
    "calculer sa valeur numérique pour une valeur donnée de la lettre $x$",
    "le diviser par un facteur commun à tous ses termes pour le simplifier"
   ],
   "note": "Exemple : $3(x + 2) = 3x + 6$."
  },
  {
   "id": "lit-fact-x",
   "chap": "lit",
   "type": "regle",
   "titre": "Mettre x en facteur",
   "question": "Pour mettre $x$ en facteur dans $x^{2} - 5x$, on écrit ...",
   "reponse": "$x(x - 5)$",
   "pieges": [
    "$x(x + 5)$, en oubliant le signe moins",
    "$x(x - 5x)$, en ne divisant que le premier terme par $x$",
    "$(x - 5)^{2}$, en confondant avec un carré"
   ],
   "note": "On vérifie en redéveloppant : $x(x - 5) = x^{2} - 5x$."
  },
  {
   "id": "lit-contre-ex",
   "chap": "lit",
   "type": "regle",
   "titre": "Contre-exemple",
   "question": "Pour prouver qu'une égalité est fausse, il suffit ...",
   "reponse": "d'un seul contre-exemple : un nombre pour lequel elle est fausse",
   "pieges": [
    "de la tester avec un nombre pour lequel elle est vraie",
    "de montrer qu'elle est fausse pour tous les nombres sans exception",
    "de la vérifier avec une mesure sur une figure"
   ],
   "note": "$(a + b)^{2} = a^{2} + b^{2}$ est fausse : avec $a = b = 1$, $4 \\neq 2$."
  },
  {
   "id": "lit-puiss-paren",
   "chap": "lit",
   "type": "regle",
   "titre": "Puissance et parenthèses",
   "question": "Les écritures $2x^{2}$ et $(2x)^{2}$ sont-elles égales ?",
   "reponse": "non : $(2x)^{2} = 4x^{2}$, alors que $2x^{2}$ ne contient qu'un facteur 2",
   "pieges": [
    "oui, car on peut toujours enlever les parenthèses d'une puissance sans rien changer au résultat",
    "oui, car l'exposant s'applique toujours uniquement à la lettre $x$, jamais au nombre 2",
    "non : $(2x)^{2} = 2x^{2}$ et $2x^{2} = 4x^{2}$, c'est donc l'inverse de ce qu'on croit"
   ],
   "note": "Pour $x = 3$ : $2x^{2} = 18$ mais $(2x)^{2} = 36$."
  },
  {
   "id": "lit-reduc-ex",
   "chap": "lit",
   "type": "regle",
   "titre": "Termes de natures différentes",
   "question": "L'expression $3x + 2x^{2}$ peut-elle être réduite en un seul terme ?",
   "reponse": "non : $x$ et $x^{2}$ ne sont pas des termes de même nature",
   "pieges": [
    "oui, en additionnant coefficients et exposants : $3x + 2x^{2} = 5x^{3}$",
    "oui, en additionnant les coefficients seulement : $3x + 2x^{2} = 5x^{2}$",
    "oui, en multipliant les coefficients : $3x + 2x^{2} = 6x^{3}$"
   ],
   "note": "On ne peut regrouper que les termes en $x^{2}$ entre eux, ceux en $x$ entre eux, les constantes entre elles."
  },
  {
   "id": "homo-k",
   "chap": "homo",
   "type": "propriete",
   "titre": "Effet d'une homothétie de rapport k",
   "question": "Une homothétie de rapport $k$ multiplie les longueurs par ...",
   "reponse": "la distance à zéro de $k$, et les aires par $k^{2}$",
   "pieges": [
    "$k^{2}$, et les aires par $k^{4}$ (le carré du carré)",
    "la distance à zéro de $k$, et les aires aussi",
    "$2k$, et les aires par $4k$ (le double du double)"
   ],
   "note": "Les angles sont conservés.",
   "exemples": [
    {
     "donnees": "Homothétie de rapport $-3$ ; aire de départ 5 cm²",
     "question": "Aire de l'image ?",
     "reponse": 45,
     "unite": "cm²",
     "correction": "$5 \\times (-3)^{2} = 45$ cm²"
    }
   ]
  },
  {
   "id": "homo-cons",
   "chap": "homo",
   "type": "propriete",
   "titre": "Transformations qui conservent les longueurs",
   "question": "La symétrie axiale, la symétrie centrale, la translation et la rotation conservent ...",
   "reponse": "les longueurs, les angles et les aires",
   "pieges": [
    "seulement les angles, mais ni les longueurs ni les aires",
    "les longueurs mais pas les aires, qui sont modifiées",
    "les directions uniquement, mais ni les angles ni les longueurs"
   ]
  },
  {
   "id": "homo-def",
   "chap": "homo",
   "type": "definition",
   "titre": "Homothétie",
   "question": "Une homothétie est définie par ...",
   "reponse": "un centre $O$ et un rapport $k$ (non nul)",
   "pieges": [
    "un centre et un angle de rotation, comme pour une rotation",
    "une direction et une longueur, comme pour une translation",
    "un axe et un rapport, comme pour une symétrie axiale"
   ]
  },
  {
   "id": "homo-sens",
   "chap": "homo",
   "type": "propriete",
   "titre": "Signe du rapport",
   "question": "Si $k < 0$, l'image $M'$ de $M$ est ...",
   "reponse": "de l'autre côté du centre $O$ par rapport à $M$",
   "pieges": [
    "du même côté de $O$ que $M$, quelle que soit la valeur de $k$",
    "toujours sur le centre $O$, quelle que soit la valeur de $k$",
    "sur la médiatrice du segment $[OM]$, quelle que soit la valeur de $k$"
   ],
   "note": "$k > 0$ : même côté. Distance à zéro de $k$ supérieure à 1 : agrandissement ; inférieure à 1 : réduction."
  },
  {
   "id": "homo-par",
   "chap": "homo",
   "type": "propriete",
   "titre": "Image d'une droite",
   "question": "L'image d'une droite par une homothétie est ...",
   "reponse": "une droite parallèle à la première",
   "pieges": [
    "une droite perpendiculaire à la première, passant par le centre",
    "un cercle de centre $O$ dont le rayon dépend de $k$",
    "un segment dont la longueur est multipliée par $k$"
   ]
  },
  {
   "id": "homo-angles",
   "chap": "homo",
   "type": "propriete",
   "titre": "Les angles sont conservés",
   "question": "Une homothétie conserve ...",
   "reponse": "les angles (mais pas les longueurs)",
   "pieges": [
    "les longueurs (mais pas les angles)",
    "les longueurs et les angles",
    "ni les longueurs ni les angles"
   ],
   "note": "Un triangle rectangle reste rectangle, mais ses côtés sont multipliés par la distance à zéro de $k$."
  },
  {
   "id": "homo-ag-red",
   "chap": "homo",
   "type": "regle",
   "titre": "Agrandissement ou réduction",
   "question": "Une homothétie de rapport $k$ est un agrandissement quand ...",
   "reponse": "la distance à zéro de $k$ est supérieure à 1 (réduction si elle est inférieure à 1)",
   "pieges": [
    "$k > 1$ seulement : un rapport négatif donne toujours une réduction",
    "$k$ est positif (réduction si $k$ est négatif, quelle que soit sa valeur)",
    "la distance à zéro de $k$ vaut 1 (réduction dans tous les autres cas)"
   ],
   "note": "Exemple : $k = -3$ est un agrandissement (de rapport 3, avec retournement) ; $k = -0{,}5$ est une réduction."
  },
  {
   "id": "homo-k-calc",
   "chap": "homo",
   "type": "formule",
   "titre": "Calculer le rapport",
   "question": "Si $M'$ est l'image de $M$ par l'homothétie de centre $O$, alors la distance à zéro de $k$ vaut ...",
   "reponse": "$\\dfrac{OM'}{OM}$",
   "pieges": [
    "$\\dfrac{OM}{OM'}$",
    "$OM' - OM$",
    "$OM \\times OM'$"
   ],
   "note": "Le signe de $k$ est positif si $M$ et $M'$ sont du même côté de $O$, négatif sinon."
  },
  {
   "id": "homo-centre",
   "chap": "homo",
   "type": "propriete",
   "titre": "Le centre est invariant",
   "question": "Le centre $O$ d'une homothétie est ...",
   "reponse": "un point qui ne change pas : son image est lui-même",
   "pieges": [
    "un point qui se déplace de $k$ fois sa distance au centre",
    "un point dont l'image est son symétrique par rapport à une droite",
    "le milieu du segment qui joint un point à son image"
   ],
   "note": "Les points $O$, $M$ et $M'$ sont alignés pour tout point $M$."
  },
  {
   "id": "homo-moins1",
   "chap": "homo",
   "type": "propriete",
   "titre": "Rapport −1",
   "question": "L'homothétie de centre $O$ et de rapport $-1$ est ...",
   "reponse": "la symétrie centrale de centre $O$",
   "pieges": [
    "la symétrie axiale d'un axe passant par le centre",
    "l'identité : tout point reste à sa place",
    "une rotation d'angle 90° autour du centre"
   ],
   "note": "Pour $k = 1$, c'est l'identité ; pour $k = -1$, c'est la symétrie centrale."
  },
  {
   "id": "homo-aligne",
   "chap": "homo",
   "type": "propriete",
   "titre": "Points alignés",
   "question": "Un point $M$, son image $M'$ et le centre $O$ de l'homothétie sont ...",
   "reponse": "toujours alignés",
   "pieges": [
    "jamais alignés, sauf si $k = 1$",
    "alignés seulement si $k > 0$",
    "alignés seulement si $OM = OM'$"
   ],
   "note": "La droite $(OM)$ passe par $M'$ : une homothétie « agrandit » le long des droites issues du centre."
  },
  {
   "id": "fg-image",
   "chap": "fgen",
   "type": "definition",
   "titre": "Image et antécédent",
   "question": "Si $f(a) = b$ alors ...",
   "reponse": "$b$ est l'image de $a$ et $a$ est un antécédent de $b$",
   "pieges": [
    "$a$ est l'image de $b$ et $b$ est un antécédent de $a$",
    "$b$ est l'image de $a$ et $a$ est l'image de $b$",
    "$a$ et $b$ sont égaux et ont la même image"
   ]
  },
  {
   "id": "fg-antec",
   "chap": "fgen",
   "type": "regle",
   "titre": "Chercher un antécédent",
   "question": "Pour trouver l'antécédent de 7 par $f(x) = 2x - 3$, on ...",
   "reponse": "résout l'équation $2x - 3 = 7$",
   "pieges": [
    "calcule $f(7)$",
    "calcule $2 \\times 7 - 3 \\times 7$",
    "résout $2x - 3 = 0$"
   ],
   "note": "On peut aussi lire l'abscisse sur la courbe.",
   "exemples": [
    {
     "donnees": "$f(x) = 2x - 3$ ; antécédent de 7",
     "question": "Antécédent ?",
     "reponse": 5,
     "unite": "",
     "correction": "$2x - 3 = 7$ donc $2x = 10$ et $x = 5$"
    }
   ]
  },
  {
   "id": "fg-point",
   "chap": "fgen",
   "type": "propriete",
   "titre": "Appartenance à la courbe",
   "question": "Un point $A(a ; b)$ est sur la courbe de $f$ si et seulement si ...",
   "reponse": "$f(a) = b$",
   "pieges": [
    "$f(b) = a$",
    "$a = b$",
    "$f(a) = 0$"
   ],
   "morceaux": [
    "A ( a ; b ) \\text{ est sur la courbe}",
    "\\Longleftrightarrow",
    "f(a) = b"
   ],
   "intrus": [
    "f(b) = a",
    "f(a) = 0"
   ]
  },
  {
   "id": "fg-calc",
   "chap": "fgen",
   "type": "regle",
   "titre": "Calculer une image",
   "question": "Pour calculer l'image de 4 par $f(x) = 2x - 3$, on ...",
   "reponse": "remplace $x$ par 4 dans toute l'expression : $2 \\times 4 - 3 = 5$",
   "pieges": [
    "résout l'équation $2x - 3 = 4$ au lieu de remplacer $x$ par 4",
    "remplace $x$ seulement dans $2x$ et oublie le reste : $8 - 3x$",
    "lit l'abscisse du point d'ordonnée 4 sur le graphique de la fonction"
   ],
   "exemples": [
    {
     "donnees": "$f(x) = 2x - 3$ ; calculer $f(4)$",
     "question": "Image ?",
     "reponse": 5,
     "unite": "",
     "correction": "$f(4) = 2 \\times 4 - 3 = 5$"
    }
   ]
  },
  {
   "id": "fg-unique",
   "chap": "fgen",
   "type": "propriete",
   "titre": "Image et antécédents : unicité",
   "question": "Un nombre a ... image(s) et ... antécédent(s) :",
   "reponse": "une seule image, mais éventuellement plusieurs antécédents",
   "pieges": [
    "plusieurs images possibles mais un seul antécédent pour chaque nombre",
    "toujours une seule image et un seul antécédent pour un nombre",
    "toujours exactement deux antécédents pour chaque image"
   ]
  },
  {
   "id": "fg-lire",
   "chap": "fgen",
   "type": "regle",
   "titre": "Lire une image sur un graphique",
   "question": "Pour lire l'image de $a$ sur la courbe, on ...",
   "reponse": "part de $a$ sur l'axe des abscisses et on lit l'ordonnée du point de la courbe",
   "pieges": [
    "part de $a$ sur l'axe des ordonnées et on lit l'abscisse du point de la courbe",
    "part de $a$ sur l'axe des abscisses et on lit l'abscisse du point de la courbe",
    "additionne l'abscisse et l'ordonnée du point de la courbe"
   ]
  },
  {
   "id": "fg-notation",
   "chap": "fgen",
   "type": "definition",
   "titre": "Notation fonctionnelle",
   "question": "L'écriture $f : x \\mapsto 3x + 2$ se lit ...",
   "reponse": "« la fonction $f$ qui, à $x$, associe $3x + 2$ »",
   "pieges": [
    "« $f$ multiplié par $x$, plus 2, fois 3 »",
    "« la fonction $f$ qui, à $3x + 2$, associe $x$ »",
    "« $f$ est le nombre $3x + 2$ pour $x$ égal à zéro »"
   ],
   "note": "$f(x)$ se lit « $f$ de $x$ » : c'est l'image de $x$ par $f$, et non un produit."
  },
  {
   "id": "fg-tableau",
   "chap": "fgen",
   "type": "regle",
   "titre": "Tableau de valeurs",
   "question": "Dans un tableau de valeurs de $f$, la première ligne contient ... et la deuxième ...",
   "reponse": "les valeurs de $x$ ; leurs images $f(x)$",
   "pieges": [
    "les valeurs de $f(x)$ ; les valeurs de $x$ correspondantes",
    "les valeurs de $x$ ; les valeurs de $x$ augmentées de 1",
    "les images ; les valeurs de $f(x)$ divisées par $x$"
   ],
   "note": "Chaque colonne donne un nombre $x$ et son image $f(x)$."
  },
  {
   "id": "fg-neg",
   "chap": "fgen",
   "type": "regle",
   "titre": "Image d'un nombre négatif",
   "question": "Pour calculer $f(-3)$ avec $f(x) = x^{2} + 2x$, on écrit ...",
   "reponse": "$(-3)^{2} + 2 \\times (-3)$, avec des parenthèses",
   "pieges": [
    "$-3^{2} + 2 \\times 3$, sans parenthèses",
    "$(-3)^{2} + 2 \\times 3$, en changeant un signe",
    "$f \\times (-3)$, en multipliant la fonction par $-3$"
   ],
   "note": "$f(-3) = 9 - 6 = 3$."
  },
  {
   "id": "fg-courbe",
   "chap": "fgen",
   "type": "definition",
   "titre": "Courbe représentative",
   "question": "La courbe représentative de $f$ est ...",
   "reponse": "l'ensemble des points de coordonnées $(x ; f(x))$",
   "pieges": [
    "l'ensemble des points de coordonnées $(f(x) ; x)$, abscisse et ordonnée échangées",
    "la droite qui passe par l'origine et par le point d'abscisse 1, quelle que soit $f$",
    "l'ensemble des points de coordonnées $(x ; x)$ situés sur la première bissectrice"
   ],
   "note": "Le point $A(2 ; 7)$ est sur la courbe de $f$ si $f(2) = 7$."
  },
  {
   "id": "fg-zero",
   "chap": "faff",
   "type": "propriete",
   "titre": "Image de 0",
   "question": "Pour $f(x) = ax + b$, l'image de 0 est ...",
   "reponse": "$b$, l'ordonnée du point d'intersection avec l'axe des ordonnées",
   "pieges": [
    "$a$, l'ordonnée du point d'intersection avec l'axe des ordonnées",
    "0, car le produit $a \\times 0$ est nul même s'il y a $b$ ensuite",
    "$a + b$, qui est l'ordonnée du point d'abscisse 1"
   ],
   "note": "Pour $f(x) = 3x + 2$, $f(0) = 2$."
  },
  {
   "id": "fg-plusieurs",
   "chap": "fgen",
   "type": "propriete",
   "titre": "Plusieurs antécédents",
   "question": "Pour $f(x) = x^{2}$, le nombre 9 a ...",
   "reponse": "deux antécédents : 3 et $-3$",
   "pieges": [
    "un seul antécédent : 3, car la racine carrée est unique",
    "aucun antécédent, car 9 n'est pas l'image d'un nombre entier",
    "trois antécédents : 3, $-3$ et 0 qui est neutre"
   ],
   "note": "Les nombres opposés ont la même image par $x \\mapsto x^{2}$."
  },
  {
   "id": "fg-fonction",
   "chap": "fgen",
   "type": "definition",
   "titre": "Qu'est-ce qu'une fonction ?",
   "question": "Une fonction est un procédé qui, à chaque nombre de départ, associe ...",
   "reponse": "un unique nombre d'arrivée, appelé son image",
   "pieges": [
    "un ou plusieurs nombres d'arrivée, appelés ses images possibles",
    "un nombre d'arrivée qui doit toujours être plus grand que le départ",
    "un nombre d'arrivée choisi au hasard à chaque utilisation"
   ],
   "note": "Un programme de calcul est une fonction : à un nombre choisi, il associe un seul résultat."
  },
  {
   "id": "fg-sens",
   "chap": "fgen",
   "type": "regle",
   "titre": "Sens de lecture",
   "question": "Pour trouver l'image, on part de ... ; pour trouver un antécédent, on part de ...",
   "reponse": "l'abscisse (axe horizontal) ; l'ordonnée (axe vertical)",
   "pieges": [
    "l'ordonnée (axe vertical) ; l'abscisse (axe horizontal)",
    "l'abscisse (axe horizontal) ; l'abscisse (axe horizontal)",
    "l'ordonnée (axe vertical) ; l'ordonnée (axe vertical)"
   ],
   "note": "Image : on lit en ordonnée. Antécédent : on lit en abscisse."
  },
  {
   "id": "fg-ant-image",
   "chap": "fgen",
   "type": "regle",
   "titre": "Ne pas confondre les deux calculs",
   "question": "Calculer une image se fait par ... ; chercher un antécédent se fait par ...",
   "reponse": "un calcul direct ; la résolution d'une équation",
   "pieges": [
    "la résolution d'une équation ; un calcul direct",
    "un calcul direct ; encore un calcul direct",
    "la résolution d'une équation ; encore une équation"
   ],
   "note": "Image : $f(4) = \\dots$ Antécédent de 11 : $2x + 3 = 11$."
  },
  {
   "id": "fg-prog",
   "chap": "fgen",
   "type": "propriete",
   "titre": "Programme de calcul et fonction",
   "question": "Le programme « multiplier par 3, puis ajouter 2 » correspond à la fonction ...",
   "reponse": "$x \\mapsto 3x + 2$",
   "pieges": [
    "$x \\mapsto 3 + 2x$, qui change l'ordre des deux nombres",
    "$x \\mapsto 3(x + 2)$, qui additionne avant de multiplier",
    "$x \\mapsto x + 5$, qui additionne les deux nombres"
   ],
   "note": "L'ordre des opérations du programme est celui de l'expression."
  },
  {
   "id": "fg-carre",
   "chap": "fgen",
   "type": "regle",
   "titre": "Image par une fonction carré",
   "question": "Pour $f(x) = x^{2}$, l'image de $-4$ est ...",
   "reponse": "16, car $(-4)^{2} = (-4) \\times (-4) = 16$",
   "pieges": [
    "$-16$, car le signe moins reste devant le résultat",
    "$-8$, car on multiplie $-4$ par 2",
    "8, car on multiplie 4 par 2 sans signe"
   ],
   "note": "Le carré d'un nombre est toujours positif."
  },
  {
   "id": "fg-lin",
   "chap": "flin",
   "type": "propriete",
   "titre": "Fonction linéaire : image de 1",
   "question": "Pour $f(x) = 5x$, l'image de 1 est ...",
   "reponse": "5, qui est le coefficient de $x$",
   "pieges": [
    "1, car 1 est le nombre de départ",
    "6, car on ajoute 5 au nombre 1",
    "0, car 1 est un petit nombre à multiplier"
   ],
   "note": "$f(1) = 5 \\times 1 = 5$ ; $f(2) = 10$."
  },
  {
   "id": "fg-tarif",
   "chap": "fgen",
   "type": "propriete",
   "titre": "Fonction et situation",
   "question": "Un tarif de 3 € par séance avec un abonnement de 10 € correspond à ...",
   "reponse": "$f(x) = 3x + 10$, où $x$ est le nombre de séances",
   "pieges": [
    "$f(x) = 10x + 3$, où $x$ est le nombre de séances",
    "$f(x) = 3 + 10 + x$, où $x$ est le nombre de séances",
    "$f(x) = 13x$, où $x$ est le nombre de séances"
   ],
   "note": "Pour 4 séances : $3 \\times 4 + 10 = 22$ €."
  },
  {
   "id": "thales",
   "chap": "thal",
   "type": "propriete",
   "titre": "Théorème de Thalès",
   "question": "$(MN) \\parallel (BC)$ avec $M \\in [AB]$ et $N \\in [AC]$ : alors ...",
   "reponse": "$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$",
   "pieges": [
    "$\\dfrac{AM}{MB} = \\dfrac{AN}{NC} = \\dfrac{MN}{BC}$",
    "$\\dfrac{AM}{AB} = \\dfrac{AC}{AN} = \\dfrac{BC}{MN}$",
    "$AM \\times AB = AN \\times AC$"
   ],
   "note": "Les rapports sont côté sur côté : $AM/AB$ et non $AM/MB$.",
   "morceaux": [
    "\\dfrac{AM}{AB}",
    "=",
    "\\dfrac{AN}{AC}",
    "=",
    "\\dfrac{MN}{BC}"
   ],
   "intrus": [
    "\\dfrac{AM}{MB}",
    "\\dfrac{AB}{AM}"
   ],
   "exemples": [
    {
     "donnees": "$(MN) \\parallel (BC)$ ; $AM = 2$, $AB = 5$, $AN = 2{,}8$",
     "question": "Longueur $AC$ ?",
     "reponse": 7,
     "unite": "cm",
     "correction": "$\\dfrac{2}{5} = \\dfrac{2{,}8}{AC}$ donc $AC = \\dfrac{2{,}8 \\times 5}{2} = 7$ cm"
    }
   ]
  },
  {
   "id": "thales-pap",
   "chap": "thal",
   "type": "definition",
   "titre": "Configuration en papillon",
   "question": "La configuration en papillon est celle où ...",
   "reponse": "les deux sécantes en $A$ coupent deux parallèles de part et d'autre de $A$",
   "pieges": [
    "les deux droites parallèles sont du même côté de $A$",
    "les droites sécantes sont perpendiculaires en $A$ et coupent deux parallèles",
    "il n'y a pas de droites parallèles, seulement deux sécantes"
   ]
  },
  {
   "id": "thales-recip",
   "chap": "thal",
   "type": "propriete",
   "titre": "Réciproque de Thalès",
   "question": "Si $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$ (avec les points alignés dans le même ordre), alors ...",
   "reponse": "$(MN) \\parallel (BC)$",
   "pieges": [
    "$(MN) \\perp (BC)$ : les droites sont perpendiculaires",
    "$MN = BC$ : les deux segments ont la même longueur",
    "le triangle $AMN$ est isocèle en $A$ et $M$ est le milieu"
   ],
   "morceaux": [
    "\\dfrac{AM}{AB} = \\dfrac{AN}{AC}",
    "\\Longrightarrow",
    "( MN ) \\parallel ( BC )"
   ],
   "intrus": [
    "( MN ) \\perp ( BC )",
    "MN = BC"
   ]
  },
  {
   "id": "thales-contra",
   "chap": "thal",
   "type": "propriete",
   "titre": "Contraposée de Thalès",
   "question": "Si $\\dfrac{AM}{AB} \\neq \\dfrac{AN}{AC}$ alors ...",
   "reponse": "$(MN)$ et $(BC)$ ne sont pas parallèles",
   "pieges": [
    "$(MN)$ et $(BC)$ sont perpendiculaires, par construction",
    "on ne peut pas conclure, il manque des données",
    "les points $M$ et $N$ sont confondus, comme $A$ et $B$"
   ],
   "morceaux": [
    "\\dfrac{AM}{AB} \\neq \\dfrac{AN}{AC}",
    "\\Longrightarrow",
    "( MN ) \\not\\parallel ( BC )"
   ],
   "intrus": [
    "( MN ) \\perp ( BC )"
   ]
  },
  {
   "id": "thales-calc",
   "chap": "thal",
   "type": "regle",
   "titre": "Calculer une longueur avec Thalès",
   "question": "Pour calculer une longueur avec Thalès, on ...",
   "reponse": "écrit l'égalité des rapports puis on utilise le produit en croix",
   "pieges": [
    "additionne les longueurs connues puis on divise le résultat par 2",
    "utilise le théorème de Pythagore puis on prend la racine carrée",
    "mesure la figure à la règle puis on arrondit le résultat obtenu"
   ]
  },
  {
   "id": "thales-rediger",
   "chap": "thal",
   "type": "regle",
   "titre": "Rédiger avec Thalès",
   "question": "Avant d'écrire les rapports, il faut citer ...",
   "reponse": "les droites sécantes et les droites parallèles",
   "pieges": [
    "la mesure de tous les angles de la figure et leur somme",
    "le périmètre du grand triangle et celui du petit triangle",
    "uniquement le résultat final avec son unité, sans justification"
   ]
  },
  {
   "id": "thales-add",
   "chap": "thal",
   "type": "propriete",
   "titre": "Longueur d'un segment coupé",
   "question": "Si $M$ est un point du segment $[AB]$, alors $AB$ est égal à ...",
   "reponse": "$AM + MB$",
   "pieges": [
    "$AM - MB$, la différence des deux longueurs",
    "$AM \\times MB$, le produit des deux longueurs",
    "$MB - AM$, la différence dans l'autre sens"
   ],
   "note": "Exemple : $AM = 3$ cm et $MB = 4$ cm donnent $AB = 7$ cm."
  },
  {
   "id": "thales-ordre",
   "chap": "thal",
   "type": "regle",
   "titre": "Que comparent les rapports ?",
   "question": "Dans les rapports de l'égalité de Thalès, chaque rapport compare ...",
   "reponse": "une longueur du petit triangle à la longueur correspondante du grand triangle",
   "pieges": [
    "deux longueurs du même grand triangle choisies au hasard dans la figure donnée",
    "une longueur du petit triangle à son périmètre tout entier, tous les côtés ajoutés",
    "une longueur du petit triangle à la longueur d'un autre côté du même petit triangle"
   ],
   "note": "$AM$ correspond à $AB$, $AN$ à $AC$ et $MN$ à $BC$."
  },
  {
   "id": "thales-cond",
   "chap": "thal",
   "type": "regle",
   "titre": "Conditions d'utilisation",
   "question": "On peut utiliser le théorème de Thalès quand ...",
   "reponse": "deux droites parallèles coupent deux droites sécantes",
   "pieges": [
    "le triangle a un angle droit et que deux de ses côtés sont égaux",
    "les trois angles de la figure sont connus avant de commencer le calcul",
    "deux droites sont perpendiculaires et que les longueurs sont entières"
   ],
   "note": "Sans droites parallèles, on ne peut pas écrire l'égalité des rapports."
  },
  {
   "id": "thales-prod",
   "chap": "thal",
   "type": "regle",
   "titre": "Produit en croix",
   "question": "Si $\\dfrac{a}{b} = \\dfrac{c}{d}$, alors ...",
   "reponse": "$a \\times d = b \\times c$",
   "pieges": [
    "$a \\times b = c \\times d$, en multipliant en ligne",
    "$a \\times c = b \\times d$, en multipliant les numérateurs",
    "$a + d = b + c$, en additionnant en croix"
   ],
   "note": "Exemple : $\\dfrac{3}{x} = \\dfrac{6}{10}$ donne $6x = 30$, donc $x = 5$."
  },
  {
   "id": "thales-k",
   "chap": "thal",
   "type": "definition",
   "titre": "Le coefficient de réduction",
   "question": "Dans $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC} = k$, le nombre $k$ est ...",
   "reponse": "le coefficient de réduction du triangle $ABC$ au triangle $AMN$",
   "pieges": [
    "l'aire du triangle $AMN$ divisée par l'aire du triangle $ABC$ entier",
    "la différence entre les longueurs $AB$ et $AM$ sur la droite $(AB)$",
    "la longueur $AM$ exprimée en centimètres, quelle que soit la figure"
   ],
   "note": "Chaque côté de $AMN$ est égal à $k$ fois le côté correspondant de $ABC$."
  },
  {
   "id": "thales-perim",
   "chap": "thal",
   "type": "propriete",
   "titre": "Périmètre et Thalès",
   "question": "Le périmètre du triangle $AMN$ est égal à celui de $ABC$ multiplié par ...",
   "reponse": "$k = \\dfrac{AM}{AB}$",
   "pieges": [
    "$k^{2}$, comme pour les aires des deux triangles",
    "$\\dfrac{AB}{AM}$, l'inverse du rapport $k$",
    "$k + 1$, car il faut ajouter un côté"
   ],
   "note": "Les trois côtés sont multipliés par $k$, donc leur somme aussi."
  },
  {
   "id": "thales-recip-egal",
   "chap": "thal",
   "type": "regle",
   "titre": "Utiliser la réciproque",
   "question": "Pour montrer que $(MN)$ et $(BC)$ sont parallèles avec la réciproque, on compare ...",
   "reponse": "les rapports $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$ et on vérifie l'alignement",
   "pieges": [
    "les rapports $\\dfrac{AM}{MB}$ et $\\dfrac{AN}{AC}$ puis on conclut sur le résultat",
    "les longueurs $MN$ et $BC$ en vérifiant seulement qu'elles sont égales entre elles",
    "les angles $\\widehat{AMN}$ et $\\widehat{ABC}$ qui doivent mesurer chacun 90°, droits"
   ],
   "note": "Les points doivent être alignés dans le même ordre."
  },
  {
   "id": "thales-ordre-pts",
   "chap": "thal",
   "type": "regle",
   "titre": "Ordre des points",
   "question": "Pour la réciproque, les points $A$, $M$, $B$ d'une part et $A$, $N$, $C$ d'autre part doivent être ...",
   "reponse": "alignés dans le même ordre sur chaque droite",
   "pieges": [
    "alignés dans l'ordre contraire sur la deuxième droite seulement",
    "équidistants et placés à égale distance du sommet $A$ dans la figure",
    "placés sur deux droites perpendiculaires qui se coupent en $A$"
   ],
   "note": "Si l'ordre n'est pas le même, on ne peut pas conclure."
  },
  {
   "id": "thales-pap-pos",
   "chap": "thal",
   "type": "definition",
   "titre": "Position de A en papillon",
   "question": "Dans la configuration en papillon, le point $A$ est situé ...",
   "reponse": "entre $B$ et $M$ et entre $C$ et $N$",
   "pieges": [
    "à l'extérieur des segments $[BM]$ et $[CN]$ dans la figure",
    "sur la droite $(BC)$ entre les points $B$ et $C$ de la figure",
    "sur la droite $(MN)$ entre les points $M$ et $N$ de la figure"
   ],
   "note": "Les droites $(BC)$ et $(MN)$ sont parallèles et $A$ est entre elles."
  },
  {
   "id": "thales-unite",
   "chap": "thal",
   "type": "regle",
   "titre": "Mêmes unités",
   "question": "Avant d'écrire un rapport, les deux longueurs doivent être exprimées ...",
   "reponse": "dans la même unité",
   "pieges": [
    "en centimètres, toujours, même si elles sont données en mètres",
    "avec le même nombre de chiffres dans leur écriture décimale",
    "en mètres, toujours, même si elles sont données en centimètres"
   ],
   "note": "Exemple : 3 m et 40 cm deviennent 300 cm et 40 cm."
  },
  {
   "id": "thales-pas-egal",
   "chap": "thal",
   "type": "regle",
   "titre": "Rapports différents",
   "question": "Si $\\dfrac{AM}{AB}$ et $\\dfrac{AN}{AC}$ ne sont pas égaux, alors ...",
   "reponse": "les droites $(MN)$ et $(BC)$ ne sont pas parallèles",
   "pieges": [
    "les droites $(MN)$ et $(BC)$ sont parallèles quand même, sans égalité",
    "les droites $(MN)$ et $(BC)$ sont perpendiculaires, par construction",
    "on a $AM = AN$ car le triangle est isocèle en $A$"
   ],
   "note": "C'est la contraposée du théorème de Thalès."
  },
  {
   "id": "eq-produit",
   "chap": "equ",
   "type": "propriete",
   "titre": "Équation produit nul",
   "question": "$A \\times B = 0$ équivaut à ...",
   "reponse": "$A = 0$ ou $B = 0$",
   "pieges": [
    "$A = 0$ et $B = 0$",
    "$A + B = 0$",
    "$A = B$"
   ],
   "note": "Valable seulement quand le second membre est 0 : $(x+3)(x-5) = 8$ ne se résout pas en annulant chaque facteur.",
   "morceaux": [
    "A",
    "\\times",
    "B",
    "=",
    "0",
    "\\Longleftrightarrow",
    "A",
    "=",
    "0",
    "\\text{ ou }",
    "B",
    "=",
    "0"
   ],
   "intrus": [
    "\\text{ et }"
   ]
  },
  {
   "id": "eq-concl",
   "chap": "equ",
   "type": "regle",
   "titre": "Vérifier et conclure",
   "question": "Dans un problème, après la résolution, on ...",
   "reponse": "vérifie que la solution convient à l'énoncé et conclut par une phrase",
   "pieges": [
    "garde toujours les deux solutions trouvées sans les vérifier dans l'énoncé",
    "ne conclut pas par une phrase : le calcul de $x$ suffit",
    "écrit seulement la valeur de $x$ obtenue, sans la comparer à l'énoncé"
   ],
   "note": "Par exemple, une longueur ne peut pas être négative."
  },
  {
   "id": "eq-ax",
   "chap": "equ",
   "type": "regle",
   "titre": "Résoudre ax + b = cx + d",
   "question": "Pour résoudre $ax + b = cx + d$, on ...",
   "reponse": "regroupe les $x$ d'un côté, les nombres de l'autre, réduit puis divise",
   "pieges": [
    "regroupe tout d'un seul côté, sans réduire ni diviser par le coefficient de $x$",
    "divise chaque membre par $x$ puis réduit, ce qui est possible pour toute équation",
    "remplace $x$ par 0 puis calcule la valeur de chaque membre de l'équation"
   ],
   "exemples": [
    {
     "donnees": "Résoudre $3x + 5 = 2x + 9$",
     "question": "Solution ?",
     "reponse": 4,
     "unite": "",
     "correction": "$3x - 2x = 9 - 5$ donc $x = 4$"
    }
   ]
  },
  {
   "id": "eq-carre",
   "chap": "equ",
   "type": "regle",
   "titre": "Équation x² = a",
   "question": "Pour $a > 0$, l'équation $x^{2} = a$ a ...",
   "reponse": "deux solutions, $\\sqrt{a}$ et $-\\sqrt{a}$",
   "pieges": [
    "une seule solution, $\\sqrt{a}$ (c'est la racine carrée de $a$)",
    "deux solutions, $a$ et $-a$ (ce sont deux nombres opposés)",
    "aucune solution si $a$ n'est pas un carré parfait (c'est le cas de $a = 10$)"
   ],
   "exemples": [
    {
     "donnees": "Résoudre $x^{2} = 49$ : donner la solution positive",
     "question": "Solution positive ?",
     "reponse": 7,
     "unite": "",
     "correction": "$x = 7$ ou $x = -7$"
    }
   ]
  },
  {
   "id": "eq-solution",
   "chap": "equ",
   "type": "definition",
   "titre": "Solution d'une équation",
   "question": "Une solution d'une équation est ...",
   "reponse": "une valeur de $x$ qui rend l'égalité vraie",
   "pieges": [
    "une valeur de $x$ qui rend l'égalité fausse",
    "un nombre qui apparaît dans le membre de gauche",
    "un nombre positif qui est plus petit que $x$"
   ],
   "note": "Par exemple, 4 est solution de $3x - 2 = 10$ car $3 \\times 4 - 2 = 10$."
  },
  {
   "id": "eq-balance",
   "chap": "equ",
   "type": "regle",
   "titre": "Ajouter ou soustraire",
   "question": "On peut ajouter ou soustraire aux deux membres d'une équation ...",
   "reponse": "le même nombre",
   "pieges": [
    "n'importe quel nombre dans un seul membre",
    "uniquement un nombre positif dans un membre",
    "le double du nombre dans le membre de droite"
   ],
   "note": "$x + 5 = 12$ donne $x = 12 - 5 = 7$."
  },
  {
   "id": "eq-mult",
   "chap": "equ",
   "type": "regle",
   "titre": "Diviser ou multiplier",
   "question": "On peut multiplier ou diviser les deux membres d'une équation par ...",
   "reponse": "un même nombre différent de zéro",
   "pieges": [
    "un même nombre, même nul si c'est possible",
    "un nombre différent dans chaque membre",
    "le nombre $x$, qui est l'inconnue cherchée"
   ],
   "note": "$3x = 12$ donne $x = 12 \\div 3 = 4$."
  },
  {
   "id": "eq-signe",
   "chap": "equ",
   "type": "regle",
   "titre": "Changer de membre",
   "question": "Quand un terme passe de l'autre côté du signe égal, ...",
   "reponse": "on lui applique l'opération contraire : son signe change",
   "pieges": [
    "il garde le même signe et on le multiplie aussi par 2 dans l'autre membre",
    "il garde toujours son signe dans l'autre membre, même quand il change de côté",
    "on lui applique la même opération et son signe ne change pas du tout"
   ],
   "note": "$x + 5 = 12$ donne $x = 12 - 5$."
  },
  {
   "id": "eq-simple",
   "chap": "equ",
   "type": "regle",
   "titre": "Équation du type x + a = b",
   "question": "Pour résoudre $x + 7 = 12$, on ...",
   "reponse": "soustrait 7 aux deux membres : $x = 5$",
   "pieges": [
    "ajoute 7 aux deux membres : $x = 19$",
    "soustrait 7 à un seul membre : $x = 5$",
    "divise les deux membres par 7 : $x = 12 \\div 7$"
   ],
   "note": "On vérifie : $5 + 7 = 12$."
  },
  {
   "id": "eq-coef",
   "chap": "equ",
   "type": "regle",
   "titre": "Équation du type ax = b",
   "question": "Pour résoudre $4x = 20$, on ...",
   "reponse": "divise les deux membres par 4 : $x = 5$",
   "pieges": [
    "soustrait 4 aux deux membres : $x = 16$",
    "multiplie les deux membres par 4 : $x = 80$",
    "divise seulement le membre de gauche par 4"
   ],
   "note": "On vérifie : $4 \\times 5 = 20$."
  },
  {
   "id": "eq-neg",
   "chap": "equ",
   "type": "regle",
   "titre": "Coefficient négatif",
   "question": "L'équation $-3x = 12$ a pour solution ...",
   "reponse": "$-4$, en divisant les deux membres par $-3$",
   "pieges": [
    "$4$, en divisant les deux membres par $3$ sans le signe",
    "$-9$, en ajoutant $3$ aux deux membres",
    "$-36$, en multipliant les deux membres par $-3$"
   ],
   "note": "On vérifie : $-3 \\times (-4) = 12$."
  },
  {
   "id": "eq-frac",
   "chap": "equ",
   "type": "regle",
   "titre": "Solution fractionnaire",
   "question": "L'équation $2x = 5$ a pour solution ...",
   "reponse": "$\\dfrac{5}{2}$, soit $2{,}5$, en divisant 5 par 2",
   "pieges": [
    "$\\dfrac{2}{5}$, soit $0{,}4$, en divisant 2 par 5",
    "$3$, car 5 divisé par 2 vaut environ 3",
    "$10$, en multipliant 5 par 2 par erreur"
   ],
   "note": "Une solution n'est pas toujours un entier."
  },
  {
   "id": "eq-paren",
   "chap": "equ",
   "type": "regle",
   "titre": "Parenthèses",
   "question": "Pour résoudre $3(x + 2) = 10$, on commence par ...",
   "reponse": "développer : $3x + 6 = 10$",
   "pieges": [
    "supprimer les parenthèses : $3 + x + 2 = 10$",
    "ajouter 3 à chaque membre de l'équation",
    "diviser seulement le terme $x$ par 3 à gauche"
   ],
   "note": "On peut aussi diviser les deux membres par 3 d'abord."
  },
  {
   "id": "eq-regroupe",
   "chap": "equ",
   "type": "regle",
   "titre": "Termes en x des deux côtés",
   "question": "Pour résoudre $5x + 1 = 2x + 10$, on ...",
   "reponse": "regroupe les termes en $x$ d'un côté : $3x = 9$",
   "pieges": [
    "additionne les termes en $x$ des deux membres : $7x + 1 = 10$",
    "supprime le terme $2x$ de droite sans le déplacer : $5x = 9$",
    "regroupe les nombres avec les $x$ du même côté : $x = 11$"
   ],
   "note": "On trouve $x = 3$."
  },
  {
   "id": "eq-impossible",
   "chap": "equ",
   "type": "propriete",
   "titre": "Pas de solution",
   "question": "Si on obtient $0 = 5$ en résolvant une équation, alors ...",
   "reponse": "l'équation n'a aucune solution",
   "pieges": [
    "l'équation a une seule solution : 5",
    "l'équation a pour solution zéro",
    "l'équation a une infinité de solutions"
   ],
   "note": "Si on obtient $0 = 0$, tous les nombres sont solutions."
  },
  {
   "id": "eq-produit-sol",
   "chap": "equ",
   "type": "propriete",
   "titre": "Solutions d'un produit nul",
   "question": "Les solutions de $(x - 2)(x + 5) = 0$ sont ...",
   "reponse": "$2$ et $-5$",
   "pieges": [
    "$-2$ et $5$ : les signes sont changés",
    "$2$ et $5$ : le signe de 5 est oublié",
    "$-2$ et $-5$ : les deux signes sont changés"
   ],
   "note": "$x - 2 = 0$ donne $x = 2$ et $x + 5 = 0$ donne $x = -5$."
  },
  {
   "id": "eq-produit-x",
   "chap": "equ",
   "type": "propriete",
   "titre": "Ne pas diviser par x",
   "question": "Pour résoudre $x^{2} - 4x = 0$, on ...",
   "reponse": "factorise : $x(x - 4) = 0$, donc $x = 0$ ou $x = 4$",
   "pieges": [
    "divise par $x$ : $x - 4 = 0$, donc $x = 4$ seulement",
    "isole $x^{2}$ : $x^{2} = 4x$, donc $x = 4$",
    "écrit $x = 0$ et $x = 4$ sans factoriser"
   ],
   "note": "Diviser par $x$ ferait perdre la solution 0."
  },
  {
   "id": "eq-carre-pos",
   "chap": "equ",
   "type": "propriete",
   "titre": "Deux solutions opposées",
   "question": "L'équation $x^{2} = 36$ a pour solutions ...",
   "reponse": "$6$ et $-6$",
   "pieges": [
    "$6$ seulement (c'est la racine carrée de 36)",
    "$18$ et $-18$ (c'est la moitié de 36)",
    "$36$ et $-36$ (c'est le nombre lui-même)"
   ],
   "note": "Les deux nombres opposés ont le même carré."
  },
  {
   "id": "eq-isoler-carre",
   "chap": "equ",
   "type": "regle",
   "titre": "Isoler x²",
   "question": "Pour résoudre $2x^{2} = 50$, on ...",
   "reponse": "divise par 2 : $x^{2} = 25$, donc $x = 5$ ou $x = -5$",
   "pieges": [
    "prend la racine carrée de 50 puis on divise le résultat par 2",
    "divise 50 par 2 puis on obtient directement $x = 25$ comme solution",
    "soustrait 2 aux deux membres de l'équation : $x^{2} = 48$"
   ],
   "note": "Les deux solutions sont 5 et $-5$."
  },
  {
   "id": "eq-mise",
   "chap": "equ",
   "type": "regle",
   "titre": "Mettre en équation",
   "question": "Pour mettre un problème en équation, on commence par ...",
   "reponse": "choisir l'inconnue $x$ et dire ce qu'elle représente",
   "pieges": [
    "écrire le résultat final sans jamais nommer l'inconnue du problème",
    "résoudre l'équation avant de la poser, de tête, sans écrire",
    "choisir au hasard une valeur de départ pour $x$ et la tester"
   ],
   "note": "Exemple : « Soit $x$ le nombre de séances. »"
  },
  {
   "id": "eq-verif",
   "chap": "equ",
   "type": "regle",
   "titre": "Vérifier une solution",
   "question": "Pour vérifier qu'un nombre est solution, on ...",
   "reponse": "remplace $x$ par ce nombre dans chaque membre et on compare",
   "pieges": [
    "remplace $x$ dans le membre de gauche seulement et on s'arrête là",
    "ajoute ce nombre aux deux membres de l'équation puis on réduit",
    "regarde si ce nombre est positif et entier, rien de plus que cela"
   ],
   "note": "Si les deux résultats sont égaux, le nombre est solution."
  },
  {
   "id": "eq-inconnue",
   "chap": "equ",
   "type": "definition",
   "titre": "Membres d'une équation",
   "question": "Dans $3x + 2 = 5x - 6$, le membre de droite est ...",
   "reponse": "$5x - 6$",
   "pieges": [
    "$3x + 2$, qui est écrit avant le signe égal",
    "$-6$, car c'est le dernier nombre écrit",
    "$5x$, car on ne compte pas le nombre"
   ],
   "note": "Le membre de gauche est $3x + 2$."
  },
  {
   "id": "st-etendue",
   "chap": "stat",
   "type": "definition",
   "titre": "Étendue",
   "question": "L'étendue d'une série est ...",
   "reponse": "la différence entre la plus grande et la plus petite valeur",
   "pieges": [
    "la moyenne entre la plus grande et la plus petite valeur",
    "la valeur du milieu de la série rangée",
    "le nombre de valeurs de la série"
   ],
   "exemples": [
    {
     "donnees": "Série : 3 ; 8 ; 12 ; 15",
     "question": "Étendue ?",
     "reponse": 12,
     "unite": "",
     "correction": "$15 - 3 = 12$"
    }
   ]
  },
  {
   "id": "st-quartiles",
   "chap": "stat",
   "type": "definition",
   "titre": "Quartiles",
   "question": "Le premier quartile $Q_{1}$ est ...",
   "reponse": "la plus petite valeur telle qu'au moins $25\\,\\%$ des valeurs lui soient inférieures ou égales",
   "pieges": [
    "la valeur du milieu de la série rangée, qui la partage en deux groupes",
    "la moyenne de toutes les valeurs inférieures à la médiane",
    "la plus petite valeur telle qu'au moins $50\\,\\%$ des valeurs lui soient inférieures ou égales"
   ],
   "note": "Rang $\\dfrac{N}{4}$ arrondi au supérieur. $Q_{3}$ : rang $\\dfrac{3N}{4}$ arrondi au supérieur."
  },
  {
   "id": "st-pondere",
   "chap": "stat",
   "type": "formule",
   "titre": "Moyenne pondérée",
   "question": "Moyenne d'une série avec effectifs ?",
   "reponse": "$\\dfrac{\\text{somme des (valeur} \\times \\text{effectif)}}{\\text{effectif total}}$",
   "pieges": [
    "$\\dfrac{\\text{somme des valeurs}}{\\text{nombre de valeurs différentes}}$",
    "$\\dfrac{\\text{valeur max} + \\text{valeur min}}{2}$",
    "$\\text{valeur ayant le plus grand effectif}$"
   ],
   "exemples": [
    {
     "donnees": "Notes : 10 (effectif 2) ; 14 (effectif 3)",
     "question": "Moyenne ?",
     "reponse": 12.4,
     "unite": "",
     "correction": "$\\dfrac{10 \\times 2 + 14 \\times 3}{5} = \\dfrac{62}{5} = 12{,}4$"
    }
   ]
  },
  {
   "id": "st-classes",
   "chap": "stat",
   "type": "regle",
   "titre": "Moyenne avec des classes",
   "question": "Pour estimer une moyenne avec des classes, on utilise ...",
   "reponse": "le centre de chaque classe",
   "pieges": [
    "l'extrémité gauche de chaque classe",
    "l'extrémité droite de chaque classe",
    "la classe de plus grand effectif"
   ]
  },
  {
   "id": "st-ranger",
   "chap": "stat",
   "type": "regle",
   "titre": "Ranger avant tout",
   "question": "Pour trouver la médiane ou les quartiles, il faut d'abord ...",
   "reponse": "ranger les valeurs dans l'ordre croissant",
   "pieges": [
    "calculer la moyenne",
    "calculer l'étendue",
    "regrouper les valeurs en classes"
   ]
  },
  {
   "id": "puiss-prod2",
   "chap": "puis",
   "type": "formule",
   "titre": "Puissance d'un produit",
   "question": "$(a \\times b)^{n}$ vaut ...",
   "reponse": "$a^{n} \\times b^{n}$",
   "pieges": [
    "$a^{n} + b^{n}$",
    "$a \\times b^{n}$",
    "$(a \\times b)^{2n}$"
   ],
   "exemples": [
    {
     "donnees": "Calculer $(2 \\times 3)^{2}$",
     "question": "Résultat ?",
     "reponse": 36,
     "unite": "",
     "correction": "$2^{2} \\times 3^{2} = 4 \\times 9 = 36$"
    }
   ],
   "morceaux": [
    "(",
    "a",
    "\\times",
    "b",
    ")^{n}",
    "=",
    "a^{n}",
    "\\times",
    "b^{n}"
   ],
   "intrus": [
    "+",
    "2n"
   ]
  },
  {
   "id": "sci-ex",
   "chap": "puis",
   "type": "definition",
   "titre": "Reconnaître une notation scientifique",
   "question": "Laquelle de ces écritures est en notation scientifique ?",
   "reponse": "$4{,}5 \\times 10^{-4}$",
   "pieges": [
    "$45 \\times 10^{-5}$",
    "$0{,}45 \\times 10^{-3}$",
    "$4{,}5 \\times 10^{4,5}$"
   ]
  },
  {
   "id": "fl-def",
   "chap": "flin",
   "type": "definition",
   "titre": "Fonction linéaire",
   "question": "Une fonction linéaire est une fonction de la forme ...",
   "reponse": "$f(x) = ax$",
   "pieges": [
    "$f(x) = ax + b$ (avec $b \\neq 0$)",
    "$f(x) = x^{2}$",
    "$f(x) = a + x$"
   ],
   "note": "Elle traduit une situation de proportionnalité ; $a$ est le coefficient de proportionnalité.",
   "morceaux": [
    "f(x)",
    "=",
    "ax"
   ],
   "intrus": [
    "+",
    "b",
    "x^{2}"
   ]
  },
  {
   "id": "fl-graph",
   "chap": "flin",
   "type": "propriete",
   "titre": "Courbe d'une fonction linéaire",
   "question": "La représentation graphique d'une fonction linéaire est ...",
   "reponse": "une droite qui passe par l'origine du repère",
   "pieges": [
    "une droite qui ne passe jamais par l'origine",
    "une parabole",
    "une demi-droite horizontale"
   ]
  },
  {
   "id": "fl-a",
   "chap": "flin",
   "type": "propriete",
   "titre": "Coefficient a",
   "question": "Pour la fonction linéaire $f(x) = ax$, le nombre $a$ est égal à ...",
   "reponse": "$f(1)$",
   "pieges": [
    "$f(0)$",
    "$f(x) + x$",
    "$f(x) - x$"
   ],
   "exemples": [
    {
     "donnees": "$f$ linéaire avec $f(4) = 10$",
     "question": "Coefficient $a$ ?",
     "reponse": 2.5,
     "unite": "",
     "correction": "$a = \\dfrac{10}{4} = 2{,}5$"
    }
   ],
   "morceaux": [
    "a",
    "=",
    "\\dfrac{f(x)}{x}"
   ],
   "intrus": [
    "\\dfrac{x}{f(x)}",
    "f(x) + x"
   ],
   "note": "On a aussi $a = \\dfrac{f(x)}{x}$ pour tout $x \\neq 0$."
  },
  {
   "id": "fl-origine",
   "chap": "flin",
   "type": "propriete",
   "titre": "Image de zéro",
   "question": "Pour une fonction linéaire, l'image de 0 est ...",
   "reponse": "0 (c'est $f(0) = 0$)",
   "pieges": [
    "$a$",
    "1",
    "on ne peut pas le savoir"
   ]
  },
  {
   "id": "fa-def",
   "chap": "faff",
   "type": "definition",
   "titre": "Fonction affine",
   "question": "Une fonction affine est de la forme ...",
   "reponse": "$f(x) = ax + b$",
   "pieges": [
    "$f(x) = ax$ uniquement",
    "$f(x) = a x^{2} + b$",
    "$f(x) = a + bx^{2}$"
   ],
   "note": "Cas particulier : $b = 0$, fonction linéaire.",
   "morceaux": [
    "f(x)",
    "=",
    "ax",
    "+",
    "b"
   ],
   "intrus": [
    "ax^{2}",
    "\\times"
   ]
  },
  {
   "id": "fa-ab",
   "chap": "faff",
   "type": "propriete",
   "titre": "Rôle de a et b",
   "question": "Dans $f(x) = ax + b$ : $a$ est ... et $b$ est ...",
   "reponse": "le coefficient directeur (pente) et l'ordonnée à l'origine",
   "pieges": [
    "l'ordonnée à l'origine et le coefficient directeur",
    "l'image de 1 et l'image de 0",
    "l'abscisse et l'ordonnée"
   ],
   "note": "On a $f(0) = b$."
  },
  {
   "id": "fa-graph",
   "chap": "faff",
   "type": "propriete",
   "titre": "Courbe d'une fonction affine",
   "question": "La représentation graphique d'une fonction affine est ...",
   "reponse": "une droite qui passe par $(0 ; b)$",
   "pieges": [
    "toujours une droite par l'origine",
    "une courbe quelconque",
    "une droite verticale"
   ]
  },
  {
   "id": "fa-calc",
   "chap": "faff",
   "type": "formule",
   "titre": "Calculer le coefficient directeur",
   "question": "Coefficient directeur $a$ d'une droite passant par $(x_{1} ; f(x_{1}))$ et $(x_{2} ; f(x_{2}))$ ?",
   "reponse": "$a = \\dfrac{f(x_{2}) - f(x_{1})}{x_{2} - x_{1}}$",
   "pieges": [
    "$a = \\dfrac{x_{2} - x_{1}}{f(x_{2}) - f(x_{1})}$",
    "$a = f(x_{2}) - f(x_{1})$",
    "$a = \\dfrac{f(x_{1}) + f(x_{2})}{2}$"
   ],
   "morceaux": [
    "a",
    "=",
    "\\dfrac{f(x_{2}) - f(x_{1})}{x_{2} - x_{1}}"
   ],
   "intrus": [
    "\\dfrac{x_{2} - x_{1}}{f(x_{2}) - f(x_{1})}",
    "+"
   ],
   "exemples": [
    {
     "donnees": "$f(1) = 5$ et $f(3) = 11$",
     "question": "Coefficient directeur $a$ ?",
     "reponse": 3,
     "unite": "",
     "correction": "$a = \\dfrac{11 - 5}{3 - 1} = 3$"
    }
   ]
  },
  {
   "id": "fa-prop",
   "chap": "faff",
   "type": "regle",
   "titre": "Affine et proportionnelle",
   "question": "Une fonction affine représente une situation de proportionnalité ...",
   "reponse": "seulement si $b = 0$",
   "pieges": [
    "toujours",
    "jamais",
    "seulement si $a = 1$"
   ]
  },
  {
   "id": "trig-cos",
   "chap": "trig",
   "type": "formule",
   "titre": "Cosinus",
   "question": "Dans un triangle rectangle, $\\cos(\\widehat{A})$ vaut ...",
   "reponse": "$\\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$",
   "pieges": [
    "$\\dfrac{\\text{côté opposé}}{\\text{hypoténuse}}$",
    "$\\dfrac{\\text{côté opposé}}{\\text{côté adjacent}}$",
    "$\\dfrac{\\text{hypoténuse}}{\\text{côté adjacent}}$"
   ],
   "morceaux": [
    "\\cos(\\widehat{A})",
    "=",
    "\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}"
   ],
   "intrus": [
    "\\dfrac{\\text{opposé}}{\\text{hypoténuse}}",
    "\\dfrac{\\text{opposé}}{\\text{adjacent}}"
   ],
   "exemples": [
    {
     "donnees": "ABC rectangle en A, $AB = 4$ et $BC = 5$",
     "question": "$\\cos(\\widehat{B})$ ?",
     "reponse": 0.8,
     "unite": "",
     "correction": "$\\cos(\\widehat{B}) = \\dfrac{AB}{BC} = \\dfrac{4}{5} = 0{,}8$"
    }
   ],
   "note": "CAH : Cosinus = Adjacent / Hypoténuse."
  },
  {
   "id": "trig-sin",
   "chap": "trig",
   "type": "formule",
   "titre": "Sinus",
   "question": "Dans un triangle rectangle, $\\sin(\\widehat{A})$ vaut ...",
   "reponse": "$\\dfrac{\\text{côté opposé}}{\\text{hypoténuse}}$",
   "pieges": [
    "$\\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$",
    "$\\dfrac{\\text{côté opposé}}{\\text{côté adjacent}}$",
    "$\\dfrac{\\text{hypoténuse}}{\\text{côté opposé}}$"
   ],
   "morceaux": [
    "\\sin(\\widehat{A})",
    "=",
    "\\dfrac{\\text{opposé}}{\\text{hypoténuse}}"
   ],
   "intrus": [
    "\\dfrac{\\text{adjacent}}{\\text{hypoténuse}}",
    "\\dfrac{\\text{opposé}}{\\text{adjacent}}"
   ],
   "note": "SOH : Sinus = Opposé / Hypoténuse."
  },
  {
   "id": "trig-tan",
   "chap": "trig",
   "type": "formule",
   "titre": "Tangente",
   "question": "Dans un triangle rectangle, $\\tan(\\widehat{A})$ vaut ...",
   "reponse": "$\\dfrac{\\text{côté opposé}}{\\text{côté adjacent}}$",
   "pieges": [
    "$\\dfrac{\\text{côté adjacent}}{\\text{côté opposé}}$",
    "$\\dfrac{\\text{côté opposé}}{\\text{hypoténuse}}$",
    "$\\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$"
   ],
   "morceaux": [
    "\\tan(\\widehat{A})",
    "=",
    "\\dfrac{\\text{opposé}}{\\text{adjacent}}"
   ],
   "intrus": [
    "\\dfrac{\\text{adjacent}}{\\text{opposé}}",
    "\\dfrac{\\text{opposé}}{\\text{hypoténuse}}"
   ],
   "exemples": [
    {
     "donnees": "Côté opposé 3 et côté adjacent 4",
     "question": "$\\tan$ de l'angle ?",
     "reponse": 0.75,
     "unite": "",
     "correction": "$\\dfrac{3}{4} = 0{,}75$"
    }
   ],
   "note": "TOA : Tangente = Opposé / Adjacent."
  },
  {
   "id": "trig-rect",
   "chap": "trig",
   "type": "regle",
   "titre": "Quand utiliser la trigonométrie",
   "question": "La trigonométrie s'utilise ...",
   "reponse": "uniquement dans un triangle rectangle",
   "pieges": [
    "dans n'importe quel triangle",
    "dans un triangle isocèle seulement",
    "uniquement avec des angles de 30°, 45° et 60°"
   ]
  },
  {
   "id": "trig-angle",
   "chap": "trig",
   "type": "regle",
   "titre": "Calculer un angle",
   "question": "Pour retrouver un angle dont on connaît le cosinus, on utilise ...",
   "reponse": "la touche $\\cos^{-1}$ de la calculatrice",
   "pieges": [
    "la touche $\\cos$ de la calculatrice",
    "la touche $\\sqrt{\\ }$ de la calculatrice",
    "la division par 180"
   ],
   "exemples": [
    {
     "donnees": "$\\cos(\\widehat{B}) = 0{,}8$ (arrondir au dixième de degré)",
     "question": "Angle $\\widehat{B}$ ?",
     "reponse": 36.9,
     "unite": "°",
     "correction": "$\\cos^{-1}(0{,}8) \\approx 36{,}9^{\\circ}$"
    }
   ],
   "note": "On l'appelle aussi arccos."
  },
  {
   "id": "trig-mode",
   "chap": "trig",
   "type": "regle",
   "titre": "Réglage de la calculatrice",
   "question": "La calculatrice doit être en mode ...",
   "reponse": "degrés",
   "pieges": [
    "radians",
    "grades",
    "pourcentages"
   ]
  },
  {
   "id": "trig-formule",
   "chap": "trig",
   "type": "regle",
   "titre": "Choisir la bonne formule",
   "question": "Pour choisir cosinus, sinus ou tangente, on repère ...",
   "reponse": "l'angle connu (ou cherché) et les deux côtés concernés",
   "pieges": [
    "les trois angles du triangle",
    "le plus grand côté seulement, sans regarder l'angle",
    "l'aire du triangle et son périmètre"
   ],
   "note": "Les côtés sont nommés adjacent, opposé et hypoténuse."
  },
  {
   "id": "sph-aire",
   "chap": "pv",
   "type": "formule",
   "titre": "Aire d'une sphère",
   "question": "Aire d'une sphère de rayon $R$ ?",
   "reponse": "$\\mathcal{A} = 4 \\times \\pi \\times R^{2}$",
   "pieges": [
    "$\\mathcal{A} = \\dfrac{4}{3} \\times \\pi \\times R^{3}$",
    "$\\mathcal{A} = 2 \\times \\pi \\times R$",
    "$\\mathcal{A} = \\pi \\times R^{2}$"
   ],
   "morceaux": [
    "\\mathcal{A}",
    "=",
    "4",
    "\\times",
    "\\pi",
    "\\times",
    "R^{2}"
   ],
   "intrus": [
    "\\dfrac{4}{3}",
    "R^{3}"
   ],
   "exemples": [
    {
     "donnees": "$R = 5$ cm (arrondir au dixième)",
     "question": "Aire ?",
     "reponse": 314.2,
     "unite": "cm²",
     "correction": "$4 \\times \\pi \\times 25 = 100\\pi \\approx 314{,}2$ cm²"
    }
   ]
  },
  {
   "id": "boule-vol",
   "chap": "pv",
   "type": "formule",
   "titre": "Volume d'une boule",
   "question": "Volume d'une boule de rayon $R$ ?",
   "reponse": "$V = \\dfrac{4}{3} \\times \\pi \\times R^{3}$",
   "pieges": [
    "$V = 4 \\times \\pi \\times R^{2}$",
    "$V = \\dfrac{4}{3} \\times \\pi \\times R^{2}$",
    "$V = \\dfrac{1}{3} \\times \\pi \\times R^{3}$"
   ],
   "morceaux": [
    "V",
    "=",
    "\\dfrac{4}{3}",
    "\\times",
    "\\pi",
    "\\times",
    "R^{3}"
   ],
   "intrus": [
    "R^{2}",
    "4"
   ],
   "exemples": [
    {
     "donnees": "$R = 3$ cm (arrondir au dixième)",
     "question": "Volume ?",
     "reponse": 113.1,
     "unite": "cm³",
     "correction": "$\\dfrac{4}{3} \\times \\pi \\times 27 = 36\\pi \\approx 113{,}1$ cm³"
    }
   ]
  },
  {
   "id": "sph-section",
   "chap": "esp",
   "type": "propriete",
   "titre": "Section d'une sphère par un plan",
   "question": "La section d'une sphère de rayon $R$ par un plan situé à la distance $d$ du centre est ...",
   "reponse": "un cercle de rayon $r$ tel que $R^{2} = d^{2} + r^{2}$",
   "pieges": [
    "un disque de rayon $R$, quelle que soit la distance $d$",
    "un point, sauf si $d = 0$",
    "un cercle de rayon $R + d$"
   ]
  },
  {
   "id": "esp-unites",
   "chap": "pv",
   "type": "regle",
   "titre": "Unités de volume",
   "question": "$1\\ \\text{dm}^{3}$ est égal à ...",
   "reponse": "1 L, soit $1\\,000\\ \\text{cm}^{3}$",
   "pieges": [
    "1 mL",
    "$100\\ \\text{cm}^{3}$",
    "10 L"
   ]
  },
  {
   "id": "sembl-prop",
   "chap": "sembl",
   "type": "propriete",
   "titre": "Triangles semblables et proportionnalité",
   "question": "Si deux triangles sont semblables, alors ...",
   "reponse": "leurs côtés homologues sont proportionnels",
   "pieges": [
    "leurs côtés sont égaux",
    "leurs aires sont égales",
    "leurs périmètres sont égaux"
   ],
   "note": "Les côtés homologues sont ceux qui sont opposés aux angles égaux : on range les côtés par ordre de grandeur."
  },
  {
   "id": "sembl-k",
   "chap": "sembl",
   "type": "propriete",
   "titre": "Rapport de similitude",
   "question": "Si deux triangles semblables ont un rapport $k$, alors les aires sont multipliées par ...",
   "reponse": "$k^{2}$",
   "pieges": [
    "$k$",
    "$k^{3}$",
    "$2k$"
   ]
  },
  {
   "id": "sembl-thales",
   "chap": "sembl",
   "type": "propriete",
   "titre": "Thalès et triangles semblables",
   "question": "Si $(MN) \\parallel (BC)$ avec $M \\in [AB]$ et $N \\in [AC]$ alors les triangles $AMN$ et $ABC$ sont ...",
   "reponse": "semblables",
   "pieges": [
    "égaux",
    "isocèles",
    "rectangles"
   ]
  },
  {
   "id": "sembl-perim",
   "chap": "sembl",
   "type": "regle",
   "titre": "Triangles de même périmètre",
   "question": "Deux triangles de même périmètre sont-ils semblables ?",
   "reponse": "non, pas forcément",
   "pieges": [
    "oui toujours",
    "oui s'ils sont isocèles",
    "oui s'ils ont la même aire"
   ]
  }
 ],
 "outils": [
  {
   "id": "o1",
   "chap": "pyth",
   "enonce": "Un portail rectangulaire mesure 2 m sur 1,5 m. Quelle est la longueur de sa diagonale ?",
   "bon": "pythagore",
   "explication": "La diagonale est l'hypoténuse d'un triangle rectangle de côtés 2 et 1,5.",
   "autres": [
    "thales",
    "trig-cos",
    "aire-rect"
   ]
  },
  {
   "id": "o2",
   "chap": "pyth",
   "enonce": "Un triangle a pour côtés 9, 12 et 15. Est-il rectangle ?",
   "bon": "recip",
   "explication": "On veut prouver qu'un triangle est rectangle : réciproque de Pythagore ($15^{2} = 9^{2} + 12^{2}$).",
   "autres": [
    "pythagore",
    "contra",
    "trig-rect"
   ]
  },
  {
   "id": "o3",
   "chap": "pyth",
   "enonce": "Un triangle a pour côtés 5, 6 et 9. Est-il rectangle ?",
   "bon": "contra",
   "explication": "$9^{2} = 81$ et $5^{2} + 6^{2} = 61$ : les deux nombres sont différents, donc la contraposée donne « pas rectangle ».",
   "autres": [
    "pythagore",
    "thales",
    "aire-tri"
   ]
  },
  {
   "id": "o4",
   "chap": "thal",
   "enonce": "Dans une configuration où $(MN) \\parallel (BC)$, on connaît $AM$, $AB$ et $AN$. On cherche $AC$. Quel outil ?",
   "bon": "thales",
   "explication": "Droites parallèles dans un triangle : théorème de Thalès, puis produit en croix.",
   "autres": [
    "recip",
    "trig-cos",
    "pythagore"
   ]
  },
  {
   "id": "o5",
   "chap": "thal",
   "enonce": "Dans un triangle $ABC$, $M$ est sur $[AB]$ et $N$ sur $[AC]$. On calcule $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$. Que peut-on en déduire ?",
   "bon": "thales-recip",
   "explication": "Égalité des rapports (dans le bon ordre) : réciproque de Thalès, donc $(MN) \\parallel (BC)$.",
   "autres": [
    "thales",
    "pythagore",
    "sembl-def"
   ]
  },
  {
   "id": "o6",
   "chap": "thal",
   "enonce": "Une ombre de 2 m est projetée par un bâton de 1,5 m. Au même moment, l'ombre d'un arbre mesure 9 m. Quelle est sa hauteur ?",
   "bon": "thales",
   "explication": "Rayons du soleil parallèles : configuration de Thalès (triangles semblables).",
   "autres": [
    "trig-tan",
    "pythagore",
    "fl-a"
   ]
  },
  {
   "id": "o7",
   "chap": "trig",
   "enonce": "Dans un triangle $ABC$ rectangle en $B$, on connaît $AB$ et $AC$. On cherche l'angle $\\widehat{A}$. Quel outil ?",
   "bon": "trig-cos",
   "explication": "$AB$ est adjacent à $\\widehat{A}$ et $AC$ est l'hypoténuse : cosinus, puis $\\cos^{-1}$.",
   "autres": [
    "trig-sin",
    "trig-tan",
    "pythagore"
   ]
  },
  {
   "id": "o8",
   "chap": "trig",
   "enonce": "Dans un triangle rectangle, on connaît l'angle $\\widehat{A} = 35^{\\circ}$ et le côté opposé à $\\widehat{A}$ (8 cm). On cherche l'hypoténuse. Quel outil ?",
   "bon": "trig-sin",
   "explication": "Opposé et hypoténuse : sinus.",
   "autres": [
    "trig-cos",
    "trig-tan",
    "pythagore"
   ]
  },
  {
   "id": "o9",
   "chap": "trig",
   "enonce": "Un arbre est vu sous un angle de $40^{\\circ}$ à 15 m de son pied (terrain plat). Quelle est sa hauteur (sans la hauteur des yeux) ?",
   "bon": "trig-tan",
   "explication": "Opposé (hauteur) et adjacent (15 m) : tangente.",
   "autres": [
    "trig-cos",
    "trig-sin",
    "thales"
   ]
  },
  {
   "id": "o10",
   "chap": "esp",
   "enonce": "Quel est le volume d'un ballon de rayon 12 cm ?",
   "bon": "boule-vol",
   "explication": "Ballon : boule, $\\dfrac{4}{3} \\pi R^{3}$.",
   "autres": [
    "sph-aire",
    "cone-vol",
    "vol-prisme"
   ]
  },
  {
   "id": "o11",
   "chap": "esp",
   "enonce": "Quelle quantité de tissu faut-il pour recouvrir un globe de rayon 20 cm ?",
   "bon": "sph-aire",
   "explication": "On cherche une surface : l'aire d'une sphère, $4 \\pi R^{2}$.",
   "autres": [
    "boule-vol",
    "cone-vol",
    "aire-disque"
   ]
  },
  {
   "id": "o12",
   "chap": "esp",
   "enonce": "Quel est le volume d'un cornet de glace (cône) de rayon 3 cm et de hauteur 10 cm ?",
   "bon": "cone-vol",
   "explication": "Cône : $\\dfrac{1}{3} \\pi r^{2} h$.",
   "autres": [
    "pyr-vol",
    "boule-vol",
    "vol-prisme"
   ]
  },
  {
   "id": "o13",
   "chap": "fgen",
   "enonce": "On donne $f(x) = 3x - 1$. Calculer $f(5)$.",
   "bon": "fg-calc",
   "explication": "On remplace $x$ par 5.",
   "autres": [
    "fg-antec",
    "fg-lire",
    "fa-calc"
   ]
  },
  {
   "id": "o14",
   "chap": "fgen",
   "enonce": "On donne $f(x) = 3x - 1$. Quel nombre a pour image 8 ?",
   "bon": "fg-antec",
   "explication": "On cherche un antécédent : on résout $3x - 1 = 8$.",
   "autres": [
    "fg-calc",
    "fg-lire",
    "fa-calc"
   ]
  },
  {
   "id": "o15",
   "chap": "fgen",
   "enonce": "On donne $f(x) = 3x + 1$. Le point $A(2 ; 7)$ est-il sur la courbe de $f$ ?",
   "bon": "fg-point",
   "explication": "On vérifie si $f(2) = 7$.",
   "autres": [
    "fg-calc",
    "fg-antec",
    "fg-unique"
   ]
  },
  {
   "id": "o16",
   "chap": "flin",
   "enonce": "Un tarif est proportionnel à la quantité : 3 kg coûtent 7,50 €. Modéliser par une fonction.",
   "bon": "fl-def",
   "explication": "Proportionnalité : fonction linéaire $f(x) = ax$ avec $a = 2{,}5$.",
   "autres": [
    "fa-def",
    "fg-image",
    "fa-ab"
   ]
  },
  {
   "id": "o17",
   "chap": "faff",
   "enonce": "Un abonnement coûte 12 € de frais d'inscription puis 5 € par mois. Quelle fonction modélise le coût ?",
   "bon": "fa-def",
   "explication": "Frais fixes + prix par mois : fonction affine $f(x) = 5x + 12$.",
   "autres": [
    "fl-def",
    "fg-image",
    "fa-prop"
   ]
  },
  {
   "id": "o18",
   "chap": "faff",
   "enonce": "Une droite passe par $(1 ; 5)$ et $(3 ; 11)$. Comment trouver son coefficient directeur ?",
   "bon": "fa-calc",
   "explication": "Variation des ordonnées sur variation des abscisses.",
   "autres": [
    "fl-a",
    "fa-ab",
    "fg-calc"
   ]
  },
  {
   "id": "o19",
   "chap": "prem",
   "enonce": "Un fleuriste a 48 roses et 36 tulipes. Il veut faire des bouquets identiques sans reste. Combien de bouquets au maximum ?",
   "bon": "prem-pgcd",
   "explication": "On cherche le plus grand diviseur commun de 48 et 36.",
   "autres": [
    "prem-decomp",
    "prem-def",
    "prem-crit"
   ]
  },
  {
   "id": "o20",
   "chap": "prem",
   "enonce": "Rendre irréductible la fraction $\\dfrac{84}{126}$.",
   "bon": "prem-irred",
   "explication": "On divise numérateur et dénominateur par leur PGCD.",
   "autres": [
    "prem-def",
    "prem-crit",
    "prem-decomp"
   ]
  },
  {
   "id": "o21",
   "chap": "stat",
   "enonce": "Les notes d'une classe sont : 8 (×3), 12 (×5), 15 (×2). Quelle est la moyenne ?",
   "bon": "st-pondere",
   "explication": "Moyenne pondérée : on multiplie chaque note par son effectif.",
   "autres": [
    "mediane",
    "st-etendue",
    "frequence"
   ]
  },
  {
   "id": "o22",
   "chap": "stat",
   "enonce": "On donne une série de 11 valeurs rangées. Où se trouve la médiane ?",
   "bon": "mediane",
   "explication": "Effectif impair : la médiane est la valeur centrale (la 6e).",
   "autres": [
    "st-quartiles",
    "st-etendue",
    "moyenne"
   ]
  },
  {
   "id": "o23",
   "chap": "proba",
   "enonce": "On lance deux fois une pièce. Quelle est la probabilité d'obtenir deux « pile » ?",
   "bon": "proba-arbre",
   "explication": "On multiplie les probabilités le long de la branche : $\\dfrac{1}{2} \\times \\dfrac{1}{2}$.",
   "autres": [
    "proba-f",
    "proba-contraire"
   ]
  },
  {
   "id": "o24",
   "chap": "proba",
   "enonce": "La probabilité de gagner est 0,35. Quelle est la probabilité de perdre ?",
   "bon": "proba-contraire",
   "explication": "Événement contraire : $1 - 0{,}35$.",
   "autres": [
    "proba-f",
    "proba-freq"
   ]
  },
  {
   "id": "o25",
   "chap": "lit",
   "enonce": "Développer $(x + 4)^{2}$.",
   "bon": "lit-id1",
   "explication": "Identité remarquable $(a + b)^{2} = a^{2} + 2ab + b^{2}$.",
   "autres": [
    "lit-id2",
    "lit-id3",
    "lit-dist"
   ]
  },
  {
   "id": "o26",
   "chap": "lit",
   "enonce": "Développer $(x - 5)(x + 5)$.",
   "bon": "lit-id3",
   "explication": "Identité remarquable $(a - b)(a + b) = a^{2} - b^{2}$.",
   "autres": [
    "lit-id1",
    "lit-id2",
    "lit-dist"
   ]
  },
  {
   "id": "o27",
   "chap": "lit",
   "enonce": "Factoriser $x^{2} - 9$.",
   "bon": "lit-id3",
   "explication": "Identité remarquable à l'envers : $a^{2} - b^{2} = (a - b)(a + b)$ avec $a = x$ et $b = 3$.",
   "autres": [
    "lit-id1",
    "lit-id2",
    "lit-dbl"
   ]
  },
  {
   "id": "o28",
   "chap": "equ",
   "enonce": "Résoudre $(x + 2)(x - 7) = 0$.",
   "bon": "eq-produit",
   "explication": "Produit nul : $x + 2 = 0$ ou $x - 7 = 0$.",
   "autres": [
    "eq-ax",
    "eq-carre",
    "lit-dbl"
   ]
  },
  {
   "id": "o29",
   "chap": "equ",
   "enonce": "Résoudre $x^{2} = 25$.",
   "bon": "eq-carre",
   "explication": "Deux solutions : 5 et $-5$.",
   "autres": [
    "eq-ax",
    "eq-produit",
    "puiss-signe"
   ]
  },
  {
   "id": "o30",
   "chap": "puis",
   "enonce": "Écrire $\\dfrac{3 \\times 10^{5} \\times 4 \\times 10^{-2}}{6 \\times 10^{2}}$ en notation scientifique.",
   "bon": "sci-prod",
   "explication": "On calcule avec les puissances de 10 et on remet en notation scientifique.",
   "autres": [
    "puiss-prod",
    "sci-def",
    "puiss-quot"
   ]
  },
  {
   "id": "o31",
   "chap": "homo",
   "enonce": "Un triangle est transformé par une homothétie de rapport $-2$. Par combien l'aire est-elle multipliée ?",
   "bon": "homo-k",
   "explication": "Les aires sont multipliées par $k^{2} = 4$.",
   "autres": [
    "homo-sens",
    "agr-vol",
    "sembl-k"
   ]
  },
  {
   "id": "o32",
   "chap": "agr",
   "enonce": "Une maquette est une réduction à l'échelle $\\dfrac{1}{50}$ d'un bâtiment. Par combien l'aire de la maquette est-elle multipliée ?",
   "bon": "agrand-k",
   "explication": "Longueurs × $\\dfrac{1}{50}$ donc aires × $\\left(\\dfrac{1}{50}\\right)^{2}$.",
   "autres": [
    "agr-vol",
    "agr-ech",
    "homo-k"
   ]
  },
  {
   "id": "o33",
   "chap": "pre",
   "enonce": "Un cycliste parcourt 42 km en 1,5 h. Quelle est sa vitesse moyenne ?",
   "bon": "vitesse",
   "explication": "$v = \\dfrac{d}{t}$.",
   "autres": [
    "distance",
    "temps",
    "pourcent"
   ]
  },
  {
   "id": "o34",
   "chap": "pre",
   "enonce": "Un prix de 80 € baisse de $15\\,\\%$. Quel est le nouveau prix ?",
   "bon": "baisse",
   "explication": "Baisse de 15 % : on multiplie par 0,85.",
   "autres": [
    "hausse",
    "pourcent",
    "fl-a"
   ]
  },
  {
   "id": "o35",
   "chap": "trig",
   "enonce": "Un triangle $ABC$ est rectangle en $A$ avec $AB = 9$ cm et $AC = 12$ cm. Calculer $BC$.",
   "bon": "pythagore",
   "explication": "$BC^{2} = 9^{2} + 12^{2} = 225$, donc $BC = 15$ cm.",
   "autres": [
    "trig-cos",
    "thales",
    "aire-tri"
   ]
  },
  {
   "id": "o36",
   "chap": "trig",
   "enonce": "Dans $ABC$ rectangle en $B$, on connaît $AC = 26$ cm et $AB = 10$ cm. Calculer $BC$.",
   "bon": "pyth-cote",
   "explication": "$AC$ est l'hypoténuse : $BC^{2} = 26^{2} - 10^{2} = 576$, donc $BC = 24$ cm.",
   "autres": [
    "recip",
    "thales",
    "trig-sin"
   ]
  },
  {
   "id": "o37",
   "chap": "trig",
   "enonce": "Dans $ABC$, $M \\in [AB]$, $N \\in [AC]$, $(MN) \\parallel (BC)$, avec $AM = 3$, $AB = 7{,}5$ et $MN = 4$. Calculer $BC$.",
   "bon": "thales",
   "explication": "$\\dfrac{AM}{AB} = \\dfrac{MN}{BC}$ donc $BC = \\dfrac{4 \\times 7{,}5}{3} = 10$.",
   "autres": [
    "pythagore",
    "trig-tan",
    "fl-a"
   ]
  },
  {
   "id": "o38",
   "chap": "thal",
   "enonce": "Dans $ABC$, $M \\in [AB]$, $N \\in [AC]$ avec $AM = 2$, $AB = 6$, $AN = 3$, $AC = 10$. Les droites $(MN)$ et $(BC)$ sont-elles parallèles ?",
   "bon": "thales-contra",
   "explication": "$\\dfrac{2}{6} = \\dfrac{1}{3}$ et $\\dfrac{3}{10}$ : les rapports sont différents, donc elles ne sont pas parallèles.",
   "autres": [
    "thales",
    "pythagore",
    "sembl-def"
   ]
  },
  {
   "id": "o39",
   "chap": "thal",
   "enonce": "Dans $ABC$, $M \\in [AB]$, $N \\in [AC]$ avec $AM = 3$, $AB = 5$, $AN = 4{,}5$, $AC = 7{,}5$. Les droites $(MN)$ et $(BC)$ sont-elles parallèles ?",
   "bon": "thales-recip",
   "explication": "$\\dfrac{3}{5} = 0{,}6$ et $\\dfrac{4{,}5}{7{,}5} = 0{,}6$ : égaux, points alignés dans le même ordre, donc parallèles.",
   "autres": [
    "thales",
    "recip",
    "trig-tan"
   ]
  },
  {
   "id": "o40",
   "chap": "trig",
   "enonce": "Une échelle de 5 m forme un angle de $70^{\\circ}$ avec le sol. À quelle hauteur arrive-t-elle ?",
   "bon": "trig-sin",
   "explication": "Hauteur = côté opposé ; échelle = hypoténuse : $\\sin(70^{\\circ}) = \\dfrac{h}{5}$.",
   "autres": [
    "trig-cos",
    "trig-tan",
    "pythagore"
   ]
  },
  {
   "id": "o41",
   "chap": "trig",
   "enonce": "Une rampe de 8 m de long fait un angle de $12^{\\circ}$ avec l'horizontale. Quelle est sa longueur au sol (distance horizontale) ?",
   "bon": "trig-cos",
   "explication": "Côté adjacent et hypoténuse : $\\cos(12^{\\circ}) = \\dfrac{x}{8}$.",
   "autres": [
    "trig-sin",
    "trig-tan",
    "pythagore"
   ]
  },
  {
   "id": "o42",
   "chap": "trig",
   "enonce": "Un poteau de 6 m de haut projette une ombre de 4 m. Quel angle font les rayons du soleil avec le sol ?",
   "bon": "trig-tan",
   "explication": "Opposé (6) et adjacent (4) : $\\tan(\\widehat{A}) = \\dfrac{6}{4}$, puis $\\tan^{-1}$.",
   "autres": [
    "trig-sin",
    "trig-cos",
    "pythagore"
   ]
  },
  {
   "id": "o43",
   "chap": "esp",
   "enonce": "Quel est le volume d'une pyramide à base carrée de 6 cm de côté et de 7 cm de hauteur ?",
   "bon": "pyr-vol",
   "explication": "$\\dfrac{1}{3} \\times 6^{2} \\times 7 = 84$ cm³.",
   "autres": [
    "cone-vol",
    "boule-vol",
    "vol-prisme"
   ]
  },
  {
   "id": "o44",
   "chap": "esp",
   "enonce": "Un cône a pour rayon 5 cm et pour hauteur 12 cm. Quelle est la longueur d'une génératrice ?",
   "bon": "cone-gen",
   "explication": "Pythagore dans le triangle de la coupe : $g^{2} = 5^{2} + 12^{2} = 169$, $g = 13$ cm.",
   "autres": [
    "cone-vol",
    "sph-section",
    "pyr-red"
   ]
  },
  {
   "id": "o45",
   "chap": "esp",
   "enonce": "Une sphère de rayon 13 cm est coupée par un plan situé à 5 cm de son centre. Quel est le rayon de la section ?",
   "bon": "sph-section",
   "explication": "$R^{2} = d^{2} + r^{2}$ : $r^{2} = 169 - 25 = 144$, $r = 12$ cm.",
   "autres": [
    "cone-gen",
    "boule-vol",
    "sph-aire"
   ]
  },
  {
   "id": "o46",
   "chap": "agr",
   "enonce": "Un cube est agrandi avec un rapport 2. Par combien son volume est-il multiplié ?",
   "bon": "agr-vol",
   "explication": "Les volumes sont multipliés par $k^{3} = 8$.",
   "autres": [
    "agrand-k",
    "agr-sens",
    "agr-ech"
   ]
  },
  {
   "id": "o47",
   "chap": "agr",
   "enonce": "Un côté de 6 cm mesure 15 cm après agrandissement. Quel est le rapport ?",
   "bon": "agr-k",
   "explication": "$k = \\dfrac{15}{6} = 2{,}5$.",
   "autres": [
    "agrand-k",
    "agr-vol",
    "agr-sens"
   ]
  },
  {
   "id": "o48",
   "chap": "agr",
   "enonce": "Un agrandissement multiplie les aires par 25. Par combien multiplie-t-il les longueurs ?",
   "bon": "agr-aire",
   "explication": "$k^{2} = 25$ donc $k = \\sqrt{25} = 5$.",
   "autres": [
    "agr-vol",
    "agr-sens",
    "agr-ech"
   ]
  },
  {
   "id": "o49",
   "chap": "lit",
   "enonce": "Développer $3(2x - 5)$.",
   "bon": "lit-dist",
   "explication": "On multiplie chaque terme : $6x - 15$.",
   "autres": [
    "lit-dbl",
    "lit-id1",
    "lit-fact"
   ]
  },
  {
   "id": "o50",
   "chap": "lit",
   "enonce": "Développer $(x + 3)(x + 5)$.",
   "bon": "lit-dbl",
   "explication": "Double distributivité : $x^{2} + 5x + 3x + 15 = x^{2} + 8x + 15$.",
   "autres": [
    "lit-dist",
    "lit-id1",
    "lit-id3"
   ]
  },
  {
   "id": "o51",
   "chap": "lit",
   "enonce": "Développer $(x - 6)^{2}$.",
   "bon": "lit-id2",
   "explication": "$(a - b)^{2} = a^{2} - 2ab + b^{2}$ : $x^{2} - 12x + 36$.",
   "autres": [
    "lit-id1",
    "lit-id3",
    "lit-dist"
   ]
  },
  {
   "id": "o52",
   "chap": "lit",
   "enonce": "Factoriser $6x + 9$.",
   "bon": "lit-fact",
   "explication": "Facteur commun 3 : $3(2x + 3)$.",
   "autres": [
    "lit-dist",
    "lit-id3",
    "lit-dbl"
   ]
  },
  {
   "id": "o53",
   "chap": "equ",
   "enonce": "Résoudre $5x + 4 = 2x + 19$.",
   "bon": "eq-ax",
   "explication": "On regroupe : $3x = 15$, donc $x = 5$.",
   "autres": [
    "eq-produit",
    "eq-carre",
    "lit-dist"
   ]
  },
  {
   "id": "o54",
   "chap": "equ",
   "enonce": "On résout un problème et on trouve $x = -4$ pour la longueur d'un côté en cm. Que doit-on faire ?",
   "bon": "eq-concl",
   "explication": "Une longueur ne peut pas être négative : on explique que la solution ne convient pas.",
   "autres": [
    "eq-ax",
    "eq-produit",
    "eq-carre"
   ]
  },
  {
   "id": "o55",
   "chap": "stat",
   "enonce": "Notes : 4, 9, 12, 15, 17. Quelle est l'étendue ?",
   "bon": "st-etendue",
   "explication": "Plus grande valeur moins plus petite : $17 - 4 = 13$.",
   "autres": [
    "mediane",
    "moyenne",
    "st-quartiles"
   ]
  },
  {
   "id": "o56",
   "chap": "stat",
   "enonce": "Dans une série de 8 valeurs rangées, quelle valeur est le premier quartile $Q_{1}$ ?",
   "bon": "st-quartiles",
   "explication": "Rang $\\dfrac{8}{4} = 2$ : c'est la 2e valeur.",
   "autres": [
    "mediane",
    "st-etendue",
    "moyenne"
   ]
  },
  {
   "id": "o57",
   "chap": "stat",
   "enonce": "Une série de 8 valeurs est rangée. Comment obtient-on la médiane ?",
   "bon": "mediane",
   "explication": "Effectif pair : moyenne de la 4e et de la 5e valeur.",
   "autres": [
    "st-quartiles",
    "moyenne",
    "st-etendue"
   ]
  },
  {
   "id": "o58",
   "chap": "puis",
   "enonce": "Écrire $\\dfrac{3^{7}}{3^{4}}$ sous la forme d'une seule puissance.",
   "bon": "puiss-quot",
   "explication": "Même base : on soustrait les exposants, $3^{3}$.",
   "autres": [
    "puiss-prod",
    "puiss-puiss",
    "puiss-neg"
   ]
  },
  {
   "id": "o59",
   "chap": "puis",
   "enonce": "Écrire $(5^{2})^{3}$ sous la forme d'une seule puissance.",
   "bon": "puiss-puiss",
   "explication": "On multiplie les exposants : $5^{6}$.",
   "autres": [
    "puiss-prod",
    "puiss-quot",
    "puiss-neg"
   ]
  },
  {
   "id": "o60",
   "chap": "puis",
   "enonce": "Écrire $4^{-2}$ sous forme de fraction.",
   "bon": "puiss-neg",
   "explication": "$4^{-2} = \\dfrac{1}{4^{2}} = \\dfrac{1}{16}$.",
   "autres": [
    "puiss-zero",
    "puiss-prod",
    "puiss-signe"
   ]
  },
  {
   "id": "o61",
   "chap": "puis",
   "enonce": "La distance Terre–Soleil est d'environ 150 000 000 km. L'écrire en notation scientifique.",
   "bon": "sci-def",
   "explication": "$1{,}5 \\times 10^{8}$ km.",
   "autres": [
    "dix-puiss",
    "puiss-prod",
    "sci-prod"
   ]
  },
  {
   "id": "o62",
   "chap": "fgen",
   "enonce": "Comment lit-on l'image de 2 sur la courbe d'une fonction ?",
   "bon": "fg-lire",
   "explication": "On part de 2 sur l'axe des abscisses, on monte jusqu'à la courbe et on lit l'ordonnée.",
   "autres": [
    "fg-calc",
    "fg-antec",
    "fg-point"
   ]
  },
  {
   "id": "o63",
   "chap": "flin",
   "enonce": "$f$ est une fonction linéaire telle que $f(5) = 20$. Quel est son coefficient ?",
   "bon": "fl-a",
   "explication": "$a = \\dfrac{f(5)}{5} = 4$.",
   "autres": [
    "fl-origine",
    "fa-def",
    "fg-calc"
   ]
  },
  {
   "id": "o64",
   "chap": "faff",
   "enonce": "Dans $f(x) = -2x + 7$, que représente le nombre 7 ?",
   "bon": "fa-ab",
   "explication": "L'ordonnée à l'origine : $f(0) = 7$.",
   "autres": [
    "fl-a",
    "fa-calc",
    "fg-image"
   ]
  },
  {
   "id": "o65",
   "chap": "faff",
   "enonce": "Un abonnement coûte 12 € d'inscription puis 5 € par mois. Le coût est-il proportionnel au nombre de mois ?",
   "bon": "fa-prop",
   "explication": "Non : $f(x) = 5x + 12$ avec $b \\neq 0$, la droite ne passe pas par l'origine.",
   "autres": [
    "fl-def",
    "fl-a",
    "fg-image"
   ]
  },
  {
   "id": "o66",
   "chap": "proba",
   "enonce": "Une urne contient 5 boules rouges, 3 vertes et 2 bleues. Quelle est la probabilité de tirer une boule verte ?",
   "bon": "proba-f",
   "explication": "$\\dfrac{3}{10}$ (équiprobabilité).",
   "autres": [
    "proba-arbre",
    "proba-contraire"
   ]
  },
  {
   "id": "o67",
   "chap": "proba",
   "enonce": "Une urne contient 3 boules rouges et 2 bleues. On tire deux fois avec remise. Quelle est la probabilité d'obtenir deux rouges ?",
   "bon": "proba-arbre",
   "explication": "On multiplie le long de la branche : $\\dfrac{3}{5} \\times \\dfrac{3}{5} = \\dfrac{9}{25}$.",
   "autres": [
    "proba-contraire",
    "proba-freq"
   ]
  },
  {
   "id": "o69",
   "chap": "prem",
   "enonce": "Décomposer 84 en produit de facteurs premiers.",
   "bon": "prem-decomp",
   "explication": "$84 = 2^{2} \\times 3 \\times 7$.",
   "autres": [
    "prem-def",
    "prem-crit",
    "prem-pgcd"
   ]
  },
  {
   "id": "o70",
   "chap": "prem",
   "enonce": "Le nombre 4 725 est-il divisible par 9 ?",
   "bon": "prem-crit",
   "explication": "$4 + 7 + 2 + 5 = 18$, divisible par 9 : oui.",
   "autres": [
    "prem-def",
    "prem-decomp",
    "prem-pgcd"
   ]
  },
  {
   "id": "o71",
   "chap": "homo",
   "enonce": "Quelles informations faut-il pour construire l'image d'une figure par une homothétie ?",
   "bon": "homo-def",
   "explication": "Un centre $O$ et un rapport $k$.",
   "autres": [
    "homo-k",
    "homo-par",
    "homo-sens"
   ]
  },
  {
   "id": "o72",
   "chap": "homo",
   "enonce": "Dans l'homothétie de centre $O$ et de rapport $-2$, où se trouve l'image de $M$ ?",
   "bon": "homo-sens",
   "explication": "De l'autre côté de $O$, à une distance $2 \\times OM$.",
   "autres": [
    "homo-k",
    "homo-par",
    "homo-cons"
   ]
  },
  {
   "id": "o73",
   "chap": "sembl",
   "enonce": "Le triangle $ABC$ a deux angles de $50^{\\circ}$ et $60^{\\circ}$, le triangle $DEF$ en a deux de $60^{\\circ}$ et $70^{\\circ}$. Sont-ils semblables ?",
   "bon": "sembl-2ang",
   "explication": "Troisième angle de $ABC$ : $70^{\\circ}$ ; de $DEF$ : $50^{\\circ}$. Mêmes angles : semblables.",
   "autres": [
    "thales",
    "sembl-perim",
    "agrand-k"
   ]
  },
  {
   "id": "o74",
   "chap": "sembl",
   "enonce": "Deux triangles sont semblables. Le premier a des côtés de 3, 4 et 5 cm ; le plus petit côté du second mesure 9 cm. Quel est son plus grand côté ?",
   "bon": "sembl-prop",
   "explication": "Côtés homologues proportionnels : $k = \\dfrac{9}{3} = 3$ et $5 \\times 3 = 15$ cm.",
   "autres": [
    "sembl-def",
    "sembl-k",
    "pythagore"
   ]
  },
  {
   "id": "o75",
   "chap": "esp",
   "enonce": "Un prisme droit a une base d'aire 18 cm² et une hauteur de 5 cm. Quel est son volume ?",
   "bon": "vol-prisme",
   "explication": "$B \\times h = 18 \\times 5 = 90$ cm³.",
   "autres": [
    "pyr-vol",
    "cone-vol",
    "boule-vol"
   ]
  },
  {
   "id": "o76",
   "chap": "pre",
   "enonce": "Un prix de 70 € augmente de $20\\,\\%$. Quel est le nouveau prix ?",
   "bon": "hausse",
   "explication": "On multiplie par 1,2 : 84 €.",
   "autres": [
    "baisse",
    "pourcent",
    "frequence"
   ]
  },
  {
   "id": "o77",
   "chap": "pre",
   "enonce": "Un avion vole à 800 km/h pendant 3 h 15 min. Quelle distance parcourt-il ?",
   "bon": "distance",
   "explication": "$d = v \\times t$ avec $t = 3{,}25$ h : 2 600 km.",
   "autres": [
    "vitesse",
    "temps",
    "pourcent"
   ]
  },
  {
   "id": "o78",
   "chap": "pre",
   "enonce": "Un trajet de 150 km est effectué à 60 km/h. Combien de temps dure-t-il ?",
   "bon": "temps",
   "explication": "$t = \\dfrac{d}{v} = 2{,}5$ h, soit 2 h 30 min.",
   "autres": [
    "vitesse",
    "distance",
    "pourcent"
   ]
  },
  {
   "id": "o79",
   "chap": "pre",
   "enonce": "Quelle est l'aire d'un disque de diamètre 10 cm ?",
   "bon": "aire-disque",
   "explication": "Rayon 5 cm : $\\pi \\times 5^{2} \\approx 78{,}5$ cm².",
   "autres": [
    "perim-cercle",
    "aire-tri",
    "aire-rect"
   ]
  },
  {
   "id": "o80",
   "chap": "pre",
   "enonce": "Une piste circulaire a 60 m de diamètre. Quel est le périmètre de la piste ?",
   "bon": "perim-cercle",
   "explication": "$\\pi \\times d = \\pi \\times 60 \\approx 188{,}5$ m.",
   "autres": [
    "aire-disque",
    "aire-rect",
    "vitesse"
   ]
  }
 ]
});
