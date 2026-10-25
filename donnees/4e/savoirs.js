// Savoirs de 4e : généré à partir des leçons de 4e (2026-2027). Notation $…$ = LaTeX (KaTeX).
Savoirs.enregistrer({
 "id": "4e",
 "titre": "Savoirs de 4e",
 "niveau": "4e",
 "chapitres": [
  {
   "id": "pre",
   "titre": "Acquis de 6e et 5e",
   "ordre": 0,
   "annee": "5e"
  },
  {
   "id": "rel1",
   "titre": "Nombres relatifs : addition et soustraction",
   "ordre": 1,
   "annee": "4e"
  },
  {
   "id": "pyth",
   "titre": "Théorème de Pythagore",
   "ordre": 2,
   "annee": "4e"
  },
  {
   "id": "stat",
   "titre": "Statistiques",
   "ordre": 3,
   "annee": "4e"
  },
  {
   "id": "rel2",
   "titre": "Nombres relatifs : multiplication et division",
   "ordre": 4,
   "annee": "4e"
  },
  {
   "id": "transl",
   "titre": "Translations",
   "ordre": 5,
   "annee": "4e"
  },
  {
   "id": "frac1",
   "titre": "Fractions : addition et soustraction",
   "ordre": 6,
   "annee": "4e"
  },
  {
   "id": "recip",
   "titre": "Pythagore : réciproque et contraposée",
   "ordre": 7,
   "annee": "4e"
  },
  {
   "id": "prop",
   "titre": "Proportionnalité",
   "ordre": 8,
   "annee": "4e"
  },
  {
   "id": "rot",
   "titre": "Rotations",
   "ordre": 9,
   "annee": "4e"
  },
  {
   "id": "frac2",
   "titre": "Fractions : multiplication et division",
   "ordre": 10,
   "annee": "4e"
  },
  {
   "id": "sembl",
   "titre": "Triangles égaux et triangles semblables",
   "ordre": 11,
   "annee": "4e"
  },
  {
   "id": "puis",
   "titre": "Puissances : exposants positifs et négatifs",
   "ordre": 12,
   "annee": "4e"
  },
  {
   "id": "pyr",
   "titre": "Pyramides",
   "ordre": 13,
   "annee": "4e"
  },
  {
   "id": "equ",
   "titre": "Équations",
   "ordre": 14,
   "annee": "4e"
  },
  {
   "id": "gc",
   "titre": "Grandeurs composées",
   "ordre": 15,
   "annee": "4e"
  },
  {
   "id": "sci",
   "titre": "Puissances : notation scientifique",
   "ordre": 16,
   "annee": "4e"
  },
  {
   "id": "cone",
   "titre": "Cône de révolution",
   "ordre": 17,
   "annee": "4e"
  },
  {
   "id": "proba",
   "titre": "Probabilités",
   "ordre": 18,
   "annee": "4e"
  }
 ],
 "savoirs": [
  {
   "id": "aire-rect",
   "chap": "pre",
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
   "chap": "pre",
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
   "id": "aire-para",
   "chap": "pre",
   "type": "formule",
   "titre": "Aire d'un parallélogramme",
   "question": "Aire d'un parallélogramme de base $b$ et de hauteur $h$ ?",
   "reponse": "$\\mathcal{A} = b \\times h$",
   "pieges": [
    "$\\mathcal{A} = b \\times c$ ($c$ : côté oblique)",
    "$\\mathcal{A} = \\dfrac{b \\times h}{2}$",
    "$\\mathcal{A} = 2 \\times (b + c)$"
   ],
   "exemples": [
    {
     "donnees": "$b = 6$ cm et $h = 4$ cm",
     "question": "Aire ?",
     "reponse": 24,
     "unite": "cm²",
     "correction": "$\\mathcal{A} = 6 \\times 4 = 24$ cm²"
    }
   ],
   "morceaux": [
    "\\mathcal{A}",
    "=",
    "b",
    "\\times",
    "h"
   ],
   "intrus": [
    "+",
    "2"
   ]
  },
  {
   "id": "aire-disque",
   "chap": "pre",
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
   "chap": "pre",
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
   "chap": "pre",
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
   "chap": "pre",
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
   "id": "angles-tri",
   "chap": "pre",
   "type": "propriete",
   "titre": "Somme des angles d'un triangle",
   "question": "Dans un triangle, la somme des mesures des trois angles est égale à ?",
   "reponse": "$180^{\\circ}$",
   "pieges": [
    "$90^{\\circ}$",
    "$360^{\\circ}$",
    "$100^{\\circ}$"
   ],
   "morceaux": [
    "\\widehat{A}",
    "+",
    "\\widehat{B}",
    "+",
    "\\widehat{C}",
    "=",
    "180^{\\circ}"
   ],
   "intrus": [
    "90^{\\circ}",
    "360^{\\circ}"
   ]
  },
  {
   "id": "ineg-tri",
   "chap": "pre",
   "type": "propriete",
   "titre": "Inégalité triangulaire",
   "question": "Dans un triangle ABC, la longueur du côté $[BC]$ est ... la somme $AB + AC$.",
   "reponse": "inférieure ou égale à",
   "pieges": [
    "strictement supérieure à",
    "toujours égale à",
    "sans lien avec"
   ],
   "note": "Si $BC = AB + AC$, les trois points sont alignés (triangle aplati)."
  },
  {
   "id": "mediatrice",
   "chap": "pre",
   "type": "definition",
   "titre": "Médiatrice d'un segment",
   "question": "La médiatrice d'un segment est la droite qui ...",
   "reponse": "passe par le milieu du segment et lui est perpendiculaire",
   "pieges": [
    "passe par une extrémité et lui est perpendiculaire",
    "passe par le milieu du segment et lui est parallèle",
    "coupe le segment en deux parties inégales"
   ]
  },
  {
   "id": "angles-alt",
   "chap": "pre",
   "type": "propriete",
   "titre": "Angles alternes-internes",
   "question": "Deux droites parallèles coupées par une sécante forment des angles alternes-internes ...",
   "reponse": "égaux",
   "pieges": [
    "supplémentaires (de somme 180°)",
    "complémentaires (de somme 90°)",
    "toujours droits"
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
   "id": "rel-zero",
   "chap": "rel1",
   "type": "definition",
   "titre": "Le nombre zéro",
   "question": "Le nombre 0 est ...",
   "reponse": "ni positif ni négatif",
   "pieges": [
    "positif",
    "négatif",
    "à la fois positif et négatif"
   ],
   "note": "Un nombre écrit sans signe est positif, mais 0 est le seul relatif qui n'est ni strictement positif ni strictement négatif."
  },
  {
   "id": "rel-oppose",
   "chap": "rel1",
   "type": "definition",
   "titre": "Opposé d'un nombre",
   "question": "L'opposé de $a$ est le nombre ...",
   "reponse": "$-a$ : leur somme vaut 0",
   "pieges": [
    "$\\dfrac{1}{a}$ : leur produit vaut 1",
    "$|a|$ : toujours positif",
    "$a - 1$"
   ],
   "note": "L'opposé de $-7{,}5$ est $7{,}5$ ; l'opposé de 0 est 0.",
   "morceaux": [
    "a",
    "+",
    "(",
    "-a",
    ")",
    "=",
    "0"
   ],
   "intrus": [
    "1",
    "\\times"
   ]
  },
  {
   "id": "rel-dist",
   "chap": "rel1",
   "type": "definition",
   "titre": "Distance à zéro",
   "question": "La distance à zéro d'un nombre relatif est ...",
   "reponse": "toujours positive ou nulle",
   "pieges": [
    "toujours négative ou nulle",
    "du même signe que le nombre",
    "égale à son opposé"
   ],
   "note": "La distance à zéro de $-3$ est 3, celle de $2$ est 2 : c'est la distance entre l'origine et le point qui représente le nombre."
  },
  {
   "id": "rel-compar",
   "chap": "rel1",
   "type": "propriete",
   "titre": "Comparer deux nombres négatifs",
   "question": "Entre deux nombres négatifs, le plus grand est celui ...",
   "reponse": "dont la distance à zéro est la plus petite",
   "pieges": [
    "dont la distance à zéro est la plus grande",
    "qui s'écrit avec le plus de chiffres",
    "qui est le plus éloigné de la droite"
   ],
   "note": "$-2 > -7$ car $-2$ est plus proche de 0 que $-7$ (distances à zéro : 2 et 7). Tout nombre négatif est inférieur à 0."
  },
  {
   "id": "rel-add-meme",
   "chap": "rel1",
   "type": "regle",
   "titre": "Addition : même signe",
   "question": "Pour additionner deux relatifs de même signe, on ...",
   "reponse": "additionne les distances à zéro et on garde le signe commun",
   "pieges": [
    "soustrait les distances à zéro et on garde le signe commun",
    "additionne les distances à zéro et on prend toujours le signe $+$",
    "soustrait les distances à zéro et on prend le signe du plus petit"
   ],
   "note": "$(-7) + (-4) = -11$ : distances $7 + 4 = 11$, signe commun $-$."
  },
  {
   "id": "rel-add",
   "chap": "rel1",
   "type": "regle",
   "titre": "Addition : signes contraires",
   "question": "Comment additionner deux relatifs de signes contraires, par exemple $(-7) + (+3)$ ?",
   "reponse": "on soustrait les distances à zéro, signe du plus éloigné de 0 : $-4$",
   "pieges": [
    "on additionne les distances à zéro, signe du plus éloigné de 0 : $-10$",
    "on soustrait les distances à zéro, signe du plus proche de 0 : $+4$",
    "on soustrait les distances à zéro, signe du second nombre : $+4$"
   ],
   "note": "Même signe : on additionne les distances à zéro et on garde ce signe."
  },
  {
   "id": "rel-sous",
   "chap": "rel1",
   "type": "regle",
   "titre": "Soustraction de relatifs",
   "question": "Soustraire un nombre, c'est ...",
   "reponse": "ajouter son opposé : $a - b = a + (-b)$",
   "pieges": [
    "ajouter ce nombre : $a - b = a + b$",
    "multiplier par son opposé : $a - b = a \\times (-b)$",
    "ajouter l'inverse : $a - b = a + \\dfrac{1}{b}$"
   ],
   "note": "$(-2) - (-6) = (-2) + (+6) = 4$.",
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
   "id": "rel-sous-neg",
   "chap": "rel1",
   "type": "regle",
   "titre": "Soustraire un nombre négatif",
   "question": "Soustraire un nombre négatif, $a - (-b)$, revient à ...",
   "reponse": "$a + b$",
   "pieges": [
    "$a - b$",
    "$-a - b$",
    "$-a + b$"
   ],
   "note": "$5 - (-2) = 5 + 2 = 7$ (et non 3)."
  },
  {
   "id": "rel-dist-axe",
   "chap": "rel1",
   "type": "propriete",
   "titre": "Distance entre deux points d'une droite graduée",
   "question": "Si $A$ et $B$ ont pour abscisses $x_A$ et $x_B$, la distance $AB$ est ...",
   "reponse": "la plus grande abscisse moins la plus petite",
   "pieges": [
    "la somme des deux abscisses",
    "la plus petite abscisse moins la plus grande",
    "le produit des deux abscisses"
   ],
   "note": "$A(-4)$ et $B(3)$ : $AB = 3 - (-4) = 3 + 4 = 7$.",
   "morceaux": [
    "AB",
    "=",
    "\\text{plus grande abscisse}",
    "-",
    "\\text{plus petite abscisse}"
   ],
   "intrus": [
    "+"
   ]
  },
  {
   "id": "rel-ecr-simpl",
   "chap": "rel1",
   "type": "regle",
   "titre": "Écriture simplifiée",
   "question": "On peut supprimer les parenthèses : $a + (-b)$ s'écrit ...",
   "reponse": "$a - b$",
   "pieges": [
    "$a + b$",
    "$-a - b$",
    "$-a + b$"
   ],
   "note": "Aussi : $a + (+b) = a + b$ et $a - (+b) = a - b$. Exemple : $(+5) + (-3) - (+2) - (-4)$ s'écrit $5 - 3 - 2 + 4$.",
   "morceaux": [
    "a",
    "+",
    "(",
    "-b",
    ")",
    "=",
    "a",
    "-",
    "b"
   ],
   "intrus": [
    "+b"
   ]
  },
  {
   "id": "rel-somme-alg",
   "chap": "rel1",
   "type": "regle",
   "titre": "Somme algébrique",
   "question": "Pour calculer $5 - 9 + 2 - 4$, on peut ...",
   "reponse": "regrouper les termes positifs, puis les termes négatifs",
   "pieges": [
    "calculer toujours de la droite vers la gauche",
    "supprimer tous les signes moins du calcul",
    "additionner tous les nombres sans tenir compte du signe"
   ],
   "note": "On garde à chaque terme son signe : $5 - 9 + 2 - 4 = 5 + 2 - 9 - 4 = 7 - 13 = -6$."
  },
  {
   "id": "rel-commut",
   "chap": "rel1",
   "type": "propriete",
   "titre": "Commutativité",
   "question": "L'addition de relatifs est commutative. La soustraction ...",
   "reponse": "ne l'est pas : $a - b \\neq b - a$",
   "pieges": [
    "l'est aussi : $a - b = b - a$",
    "l'est seulement avec des nombres positifs",
    "l'est seulement avec des nombres entiers"
   ],
   "note": "$5 - 2 = 3$ mais $2 - 5 = -3$. Par contre $a + b = b + a$ et $(a + b) + c = a + (b + c)$."
  },
  {
   "id": "carre-def",
   "chap": "pyth",
   "type": "definition",
   "titre": "Carré d'un nombre",
   "question": "Le carré d'un nombre $a$ est ...",
   "reponse": "$a \\times a$, noté $a^{2}$",
   "pieges": [
    "$a \\times 2$, noté $a^{2}$",
    "$a + a$, noté $a^{2}$",
    "$a \\times a$, noté $2a$"
   ],
   "note": "Le carré d'un nombre est toujours positif ou nul : $(-4)^{2} = 16$."
  },
  {
   "id": "racine-def",
   "chap": "pyth",
   "type": "definition",
   "titre": "Racine carrée",
   "question": "La racine carrée d'un nombre positif $a$ est ...",
   "reponse": "le nombre positif dont le carré est $a$, noté $\\sqrt{a}$",
   "pieges": [
    "le nombre dont le double est $a$, noté $\\sqrt{a}$",
    "le nombre négatif dont le carré est $a$, noté $\\sqrt{a}$",
    "la moitié de $a$, notée $\\sqrt{a}$"
   ],
   "note": "$\\sqrt{25} = 5$ car $5^{2} = 25$ ; $(\\sqrt{13})^{2} = 13$ ; $\\sqrt{7^{2}} = 7$."
  },
  {
   "id": "carres-parfaits",
   "chap": "pyth",
   "type": "regle",
   "titre": "Carrés parfaits",
   "question": "Les carrés parfaits à connaître sont les carrés des entiers ...",
   "reponse": "de 1 à 12 (de 1 à 144)",
   "pieges": [
    "de 1 à 10 (de 1 à 100)",
    "de 1 à 15 (de 1 à 225)",
    "de 1 à 20 (de 1 à 400)"
   ],
   "note": "1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144. Exemple : $\\sqrt{121} = 11$ ; en revanche $\\sqrt{20}$ n'est pas entière : $4 < \\sqrt{20} < 5$."
  },
  {
   "id": "racine-approch",
   "chap": "pyth",
   "type": "regle",
   "titre": "Racine carrée non entière",
   "question": "Si $a$ n'est pas un carré parfait, $\\sqrt{a}$ ...",
   "reponse": "n'est pas entière : on en donne une valeur approchée",
   "pieges": [
    "est entière : la calculatrice donne sa valeur exacte",
    "n'existe pas, car $a$ n'est pas un carré parfait",
    "est égale à la moitié de $a$, à peu près toujours"
   ],
   "note": "$\\sqrt{20} \\approx 4{,}47$ (au centième). La valeur exacte reste $\\sqrt{20}$ ; on peut l'encadrer : $4 < \\sqrt{20} < 5$."
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
   "id": "hyp-longueur",
   "chap": "pyth",
   "type": "propriete",
   "titre": "L'hypoténuse est le plus long côté",
   "question": "Dans un triangle rectangle, l'hypoténuse est ...",
   "reponse": "strictement plus longue que chacun des deux autres côtés",
   "pieges": [
    "toujours égale à la somme des longueurs des deux autres côtés",
    "parfois plus courte que l'un des deux autres côtés",
    "égale à la longueur de l'un des deux autres côtés"
   ],
   "note": "C'est utile pour vérifier un résultat : si on trouve un côté de l'angle droit plus long que l'hypoténuse, il y a une erreur."
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
   "id": "pyth-hyp",
   "chap": "pyth",
   "type": "regle",
   "titre": "Calculer l'hypoténuse",
   "question": "Pour calculer l'hypoténuse avec Pythagore, on ...",
   "reponse": "additionne les carrés des deux côtés de l'angle droit, puis prend la racine",
   "pieges": [
    "additionne les longueurs des deux côtés de l'angle droit, sans les élever au carré",
    "soustrait les carrés des deux côtés de l'angle droit, puis prend la racine",
    "additionne les carrés des deux côtés de l'angle droit, sans prendre la racine"
   ],
   "note": "$BC^{2} = 3^{2} + 4^{2} = 25$, donc $BC = \\sqrt{25} = 5$ cm."
  },
  {
   "id": "pyth-cote",
   "chap": "pyth",
   "type": "regle",
   "titre": "Calculer un côté de l'angle droit",
   "question": "Pour calculer un côté de l'angle droit avec Pythagore, on ...",
   "reponse": "soustrait le carré de l'autre côté au carré de l'hypoténuse, puis prend la racine",
   "pieges": [
    "additionne les carrés des deux autres côtés, puis prend la racine carrée du total",
    "soustrait les longueurs des deux autres côtés, sans les élever au carré, puis conclut",
    "additionne les longueurs des deux autres côtés, puis prend la racine carrée de la somme"
   ]
  },
  {
   "id": "pyth-racine-fin",
   "chap": "pyth",
   "type": "regle",
   "titre": "Ne pas oublier la racine",
   "question": "Si on a trouvé $BC^{2} = 25$, alors ...",
   "reponse": "$BC = \\sqrt{25} = 5$",
   "pieges": [
    "$BC = 25$",
    "$BC = 25^{2} = 625$",
    "$BC = 25 \\div 2 = 12{,}5$"
   ],
   "note": "On calcule d'abord le carré de la longueur, puis on prend la racine carrée : une longueur est positive."
  },
  {
   "id": "pyth-cond",
   "chap": "pyth",
   "type": "regle",
   "titre": "Quand utiliser le théorème",
   "question": "Le théorème de Pythagore s'applique dans un triangle ...",
   "reponse": "dont on sait qu'il est rectangle",
   "pieges": [
    "dont on sait qu'il est isocèle",
    "dont on sait qu'il est équilatéral",
    "quelconque"
   ],
   "note": "Il faut d'abord écrire « On sait que ABC est rectangle en A » : le théorème ne s'applique pas sinon."
  },
  {
   "id": "pyth-cote-form",
   "chap": "pyth",
   "type": "formule",
   "titre": "Carré d'un côté de l'angle droit",
   "question": "Si un triangle ABC est rectangle en A, alors ...",
   "reponse": "$AB^{2} = BC^{2} - AC^{2}$",
   "pieges": [
    "$AB^{2} = BC^{2} + AC^{2}$",
    "$AB^{2} = AC^{2} - BC^{2}$",
    "$AB^{2} = BC - AC^{2}$"
   ],
   "note": "On isole $AB^{2}$ dans $BC^{2} = AB^{2} + AC^{2}$. Comme $BC$ est l'hypoténuse, on retranche toujours à son carré.",
   "morceaux": [
    "AB^{2}",
    "=",
    "BC^{2}",
    "-",
    "AC^{2}"
   ],
   "intrus": [
    "+",
    "AC"
   ]
  },
  {
   "id": "pyth-redac",
   "chap": "pyth",
   "type": "regle",
   "titre": "Rédaction avec Pythagore",
   "question": "Dans la rédaction, quel est l'ordre des trois temps ?",
   "reponse": "On sait que … / D'après le théorème de Pythagore … / Donc …",
   "pieges": [
    "Donc … / On sait que … / D'après le théorème de Pythagore …",
    "D'après le théorème de Pythagore … / Donc … / On sait que …",
    "On calcule … / On mesure … / Donc, d'après le théorème de Pythagore …"
   ]
  },
  {
   "id": "pyth-triplet",
   "chap": "pyth",
   "type": "regle",
   "titre": "Triplets pythagoriciens",
   "question": "Trois nombres entiers $a$, $b$, $c$ tels que $a^{2} + b^{2} = c^{2}$ s'appellent ...",
   "reponse": "un triplet pythagoricien, par exemple $(3 ; 4 ; 5)$",
   "pieges": [
    "un triplet de Thalès, par exemple $(3 ; 4 ; 5)$",
    "un triplet pythagoricien, par exemple $(2 ; 3 ; 4)$",
    "un triplet isocèle, par exemple $(3 ; 4 ; 5)$"
   ],
   "note": "Autres triplets : $(5 ; 12 ; 13)$, $(8 ; 15 ; 17)$, $(7 ; 24 ; 25)$ ; leurs multiples aussi : $(6 ; 8 ; 10)$."
  },
  {
   "id": "effectif",
   "chap": "stat",
   "type": "definition",
   "titre": "Effectif",
   "question": "L'effectif d'une valeur dans une série est ...",
   "reponse": "le nombre de fois où cette valeur apparaît dans la série",
   "pieges": [
    "le nombre de valeurs différentes que contient la série",
    "la proportion de cette valeur dans la série, en pourcentage",
    "la somme de cette valeur et de toutes les autres"
   ],
   "note": "L'effectif total est la somme de tous les effectifs. Exemple : 6 élèves sur 25 ont lu 3 livres, donc l'effectif de la valeur 3 est 6 et l'effectif total est 25."
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
   "note": "La somme des fréquences vaut toujours 1.",
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
   ]
  },
  {
   "id": "freq-somme",
   "chap": "stat",
   "type": "propriete",
   "titre": "Somme des fréquences",
   "question": "La somme de toutes les fréquences d'une série vaut ...",
   "reponse": "1, soit 100 %",
   "pieges": [
    "0,5, soit 50 %",
    "10, soit 1 000 %",
    "l'effectif total"
   ],
   "note": "Cela permet de vérifier un tableau de fréquences : si la somme ne fait pas 1, il y a une erreur."
  },
  {
   "id": "moyenne",
   "chap": "stat",
   "type": "formule",
   "titre": "Moyenne",
   "question": "Moyenne d'une série de valeurs ?",
   "reponse": "$\\text{moyenne} = \\dfrac{\\text{somme des valeurs}}{\\text{effectif total}}$",
   "pieges": [
    "$\\text{moyenne} = \\dfrac{\\text{somme des valeurs}}{\\text{nombre de valeurs différentes}}$",
    "$\\text{moyenne} = \\dfrac{\\text{valeur maximale} + \\text{valeur minimale}}{2}$",
    "$\\text{moyenne} = \\dfrac{\\text{somme des valeurs}}{\\text{valeur maximale}}$"
   ],
   "morceaux": [
    "\\text{moyenne}",
    "=",
    "\\dfrac{\\text{somme des valeurs}}{\\text{effectif total}}"
   ],
   "intrus": [
    "\\dfrac{\\text{effectif total}}{\\text{somme des valeurs}}",
    "+"
   ],
   "exemples": [
    {
     "donnees": "Notes : 8 ; 12 ; 15 ; 10 ; 5",
     "question": "Moyenne ?",
     "reponse": 10,
     "unite": "",
     "correction": "$\\dfrac{8 + 12 + 15 + 10 + 5}{5} = \\dfrac{50}{5} = 10$"
    }
   ]
  },
  {
   "id": "moyenne-pond",
   "chap": "stat",
   "type": "regle",
   "titre": "Moyenne pondérée",
   "question": "Quand les valeurs sont données avec leurs effectifs, pour calculer la moyenne on multiplie chaque valeur par ...",
   "reponse": "son effectif, on additionne les résultats, puis on divise par l'effectif total",
   "pieges": [
    "son effectif, on additionne les résultats, puis on divise par le nombre de valeurs",
    "sa fréquence, on additionne les résultats, puis on divise par l'effectif total",
    "son rang, on additionne les résultats, puis on divise par l'effectif total"
   ],
   "note": "Exemple : 7 (3 fois), 10 (1 fois) : $\\dfrac{7 \\times 3 + 10 \\times 1}{4} = \\dfrac{31}{4} = 7{,}75$."
  },
  {
   "id": "moyenne-classes",
   "chap": "stat",
   "type": "regle",
   "titre": "Moyenne d'une série en classes",
   "question": "Pour une série regroupée en classes, on remplace chaque classe par ...",
   "reponse": "son centre (le milieu de l'intervalle)",
   "pieges": [
    "sa borne inférieure (le début de l'intervalle)",
    "sa borne supérieure (la fin de l'intervalle)",
    "son amplitude (la largeur de l'intervalle)"
   ],
   "note": "Pour la classe $160 \\leqslant t < 170$, le centre est $\\dfrac{160 + 170}{2} = 165$. On obtient une valeur approchée de la moyenne."
  },
  {
   "id": "mediane",
   "chap": "stat",
   "type": "definition",
   "titre": "Médiane",
   "question": "La médiane d'une série est la valeur qui ...",
   "reponse": "partage la série rangée en deux groupes de même effectif",
   "pieges": [
    "est la valeur la plus fréquente de la série, celle d'effectif maximal",
    "est la moyenne de toutes les valeurs de la série, sans les ranger",
    "est la valeur située au milieu de la série, même non rangée"
   ],
   "note": "Il faut d'abord ranger. Effectif impair : valeur centrale ; pair : milieu des deux valeurs centrales."
  },
  {
   "id": "med-methode",
   "chap": "stat",
   "type": "regle",
   "titre": "Trouver la médiane",
   "question": "Pour trouver la médiane, on range les valeurs dans l'ordre croissant. Si l'effectif total est impair, la médiane est ...",
   "reponse": "la valeur du milieu ; s'il est pair, c'est le milieu des deux valeurs centrales",
   "pieges": [
    "la moyenne des valeurs ; s'il est pair, c'est la plus petite des deux valeurs centrales",
    "la valeur la plus fréquente ; s'il est pair, c'est la somme des deux valeurs centrales",
    "la valeur du milieu ; s'il est pair, c'est la plus grande des deux valeurs centrales"
   ],
   "note": "Pour 5 valeurs, c'est la 3e ; pour 6 valeurs, c'est le milieu des 3e et 4e valeurs."
  },
  {
   "id": "indicateur",
   "chap": "stat",
   "type": "propriete",
   "titre": "Choisir moyenne ou médiane",
   "question": "Une valeur isolée très grande modifie fortement ...",
   "reponse": "la moyenne mais pas la médiane",
   "pieges": [
    "la médiane mais pas la moyenne",
    "la moyenne et la médiane de la même façon",
    "ni la moyenne, ni la médiane, ni les effectifs"
   ],
   "note": "Cinq salaires : 1 500 € (4 fois) et 6 000 €. Moyenne : 2 400 € ; médiane : 1 500 € ; la médiane décrit mieux le salaire courant."
  },
  {
   "id": "classe-def",
   "chap": "stat",
   "type": "definition",
   "titre": "Classe",
   "question": "Une classe, en statistiques, est ...",
   "reponse": "un intervalle de valeurs, par exemple $160 \\leqslant t < 170$",
   "pieges": [
    "une valeur isolée de la série rangée, par exemple $t = 165$",
    "un groupe d'individus de la population, par exemple 26 élèves",
    "un nombre de valeurs de la série, par exemple $t < 170$"
   ],
   "note": "On regroupe en classes quand les données sont très nombreuses ou toutes différentes. L'effectif d'une classe est le nombre de valeurs qu'elle contient ; sur un histogramme, la hauteur des rectangles est proportionnelle à l'effectif."
  },
  {
   "id": "rel-signe-prod",
   "chap": "rel2",
   "type": "regle",
   "titre": "Signe d'un produit",
   "question": "Le produit de deux nombres de signes contraires est ...",
   "reponse": "négatif",
   "pieges": [
    "positif",
    "nul",
    "du signe du plus grand"
   ],
   "note": "Même signe : positif. Signes contraires : négatif. Le produit par 0 est toujours 0."
  },
  {
   "id": "rel-prod-dist",
   "chap": "rel2",
   "type": "propriete",
   "titre": "Distance à zéro d'un produit",
   "question": "La distance à zéro du produit de deux relatifs est ...",
   "reponse": "le produit de leurs distances à zéro",
   "pieges": [
    "la somme de leurs distances à zéro",
    "la différence de leurs distances à zéro",
    "le quotient de leurs distances à zéro"
   ],
   "note": "On calcule d'abord comme avec des nombres positifs, puis on choisit le signe. $(-4) \\times 7$ : $4 \\times 7 = 28$, signes contraires, donc $-28$."
  },
  {
   "id": "rel-prod-zero",
   "chap": "rel2",
   "type": "regle",
   "titre": "Produit par zéro",
   "question": "Un produit dont l'un des facteurs vaut 0 est ...",
   "reponse": "nul (égal à 0)",
   "pieges": [
    "du signe de l'autre facteur",
    "égal à l'autre facteur",
    "impossible à calculer"
   ],
   "note": "$(-9) \\times 0 = 0$ et $0 \\times 5 = 0$."
  },
  {
   "id": "rel-prod-impair",
   "chap": "rel2",
   "type": "propriete",
   "titre": "Produit de plusieurs facteurs",
   "question": "Un produit de plusieurs facteurs non nuls est négatif quand ...",
   "reponse": "le nombre de facteurs négatifs est impair",
   "pieges": [
    "le nombre de facteurs négatifs est pair",
    "au moins un facteur est négatif",
    "le nombre de facteurs positifs est impair"
   ],
   "note": "Nombre pair de facteurs négatifs : produit positif. Nombre impair : produit négatif. Exemple : $(-2) \\times 3 \\times (-5) = 30$ (deux facteurs négatifs)."
  },
  {
   "id": "rel-carre-neg",
   "chap": "rel2",
   "type": "regle",
   "titre": "Carré d'un nombre négatif",
   "question": "$(-4)^{2}$ vaut ...",
   "reponse": "16",
   "pieges": [
    "$-16$",
    "$-8$",
    "8"
   ],
   "exemples": [
    {
     "donnees": "Calculer $(-5)^{2}$",
     "question": "Résultat ?",
     "reponse": 25,
     "unite": "",
     "correction": "$(-5)^{2} = (-5) \\times (-5) = 25$"
    }
   ],
   "note": "$(-4)^{2} = (-4) \\times (-4) = 16$."
  },
  {
   "id": "rel-moins-carre",
   "chap": "rel2",
   "type": "regle",
   "titre": "Moins devant un carré",
   "question": "$-5^{2}$ vaut ...",
   "reponse": "$-25$",
   "pieges": [
    "$25$",
    "$-10$",
    "$10$"
   ],
   "note": "L'exposant ne porte que sur 5 : $-5^{2} = -(5 \\times 5) = -25$. Avec des parenthèses, $(-5)^{2} = 25$."
  },
  {
   "id": "rel-carre-pos",
   "chap": "rel2",
   "type": "propriete",
   "titre": "Signe d'un carré",
   "question": "Le carré d'un nombre relatif est toujours ...",
   "reponse": "supérieur ou égal à 0",
   "pieges": [
    "strictement supérieur à 0",
    "du même signe que le nombre",
    "inférieur ou égal à 0"
   ],
   "note": "Deux facteurs égaux ont le même signe, donc leur produit est positif. Le carré de 0 est 0."
  },
  {
   "id": "rel-quotient-def",
   "chap": "rel2",
   "type": "definition",
   "titre": "Quotient",
   "question": "Le quotient $a \\div b$ (avec $b \\neq 0$) est le nombre ...",
   "reponse": "qui, multiplié par $b$, donne $a$",
   "pieges": [
    "qui, additionné à $b$, donne $a$",
    "qui, multiplié par $a$, donne $b$",
    "qui, retranché de $b$, donne $a$"
   ],
   "note": "$(-20) \\div 4 = -5$ car $(-5) \\times 4 = -20$."
  },
  {
   "id": "rel-div-signe",
   "chap": "rel2",
   "type": "regle",
   "titre": "Signe d'un quotient",
   "question": "Le quotient de deux nombres de signes contraires est ...",
   "reponse": "négatif",
   "pieges": [
    "positif",
    "nul",
    "du signe du plus grand"
   ],
   "note": "Même règle de signe que pour le produit. Même signe : positif."
  },
  {
   "id": "rel-div0",
   "chap": "rel2",
   "type": "regle",
   "titre": "Division par zéro",
   "question": "Que peut-on dire de $a \\div 0$ ?",
   "reponse": "c'est impossible : on ne divise jamais par 0",
   "pieges": [
    "c'est égal à 0 car il n'y a plus rien à partager",
    "c'est égal à $a$ car on ne divise pas du tout",
    "c'est égal à 1 car un nombre divisé par lui-même vaut 1"
   ],
   "note": "Mais $0 \\div a = 0$ si $a \\neq 0$."
  },
  {
   "id": "rel-prod-moinsun",
   "chap": "rel2",
   "type": "propriete",
   "titre": "Multiplier par −1",
   "question": "Multiplier un nombre par $-1$ donne ...",
   "reponse": "son opposé",
   "pieges": [
    "son inverse",
    "sa distance à zéro",
    "toujours un nombre négatif"
   ],
   "note": "$(-1) \\times 7 = -7$ et $(-1) \\times (-7) = 7$."
  },
  {
   "id": "rel-prior",
   "chap": "rel2",
   "type": "regle",
   "titre": "Priorités avec des relatifs",
   "question": "Dans $5 + (-3) \\times 4$, on calcule d'abord ...",
   "reponse": "la multiplication $(-3) \\times 4$",
   "pieges": [
    "l'addition $5 + (-3)$, car elle est écrite en premier",
    "la parenthèse $(-3)$, puis on ajoute",
    "le plus petit des trois nombres"
   ],
   "note": "$5 + (-3) \\times 4 = 5 + (-12) = -7$. Priorités : parenthèses, puis multiplications et divisions (de gauche à droite), enfin additions et soustractions."
  },
  {
   "id": "rel-paren-ecriture",
   "chap": "rel2",
   "type": "regle",
   "titre": "Parenthèses autour d'un négatif",
   "question": "On met des parenthèses autour d'un nombre négatif quand il ...",
   "reponse": "suit un signe d'opération",
   "pieges": [
    "commence un calcul",
    "est écrit avec une virgule",
    "est plus petit que $-10$"
   ],
   "note": "On écrit $5 \\times (-3)$ et non $5 \\times -3$ ; mais $-3 \\times 5$ est correct au début d'un calcul."
  },
  {
   "id": "transl-def",
   "chap": "transl",
   "type": "definition",
   "titre": "Translation",
   "question": "Une translation est un glissement défini par ...",
   "reponse": "une direction, un sens et une longueur",
   "pieges": [
    "un centre, un angle et un sens de rotation",
    "un axe de symétrie et une distance",
    "un point fixe et un rapport d'agrandissement"
   ],
   "note": "Une translation est un glissement : la figure se déplace sans tourner ni se retourner."
  },
  {
   "id": "transl-para",
   "chap": "transl",
   "type": "propriete",
   "titre": "Translation et parallélogramme",
   "question": "M' est l'image de M par la translation qui transforme A en B si ...",
   "reponse": "$ABM'M$ est un parallélogramme",
   "pieges": [
    "$ABMM'$ est un parallélogramme",
    "$M$ est le milieu de $[AM']$",
    "$(AB)$ est perpendiculaire à $(MM')$"
   ],
   "note": "Attention à l'ordre des lettres : $ABM'M$, pas $ABMM'$. Si $M$ est sur $(AB)$, le parallélogramme est aplati.",
   "morceaux": [
    "ABM'M",
    "est un",
    "parallélogramme"
   ],
   "intrus": [
    "ABMM'",
    "losange"
   ]
  },
  {
   "id": "transl-sens",
   "chap": "transl",
   "type": "regle",
   "titre": "Sens d'une translation",
   "question": "La translation qui transforme $A$ en $B$ a pour direction, sens et longueur ...",
   "reponse": "la droite $(AB)$, le sens de $A$ vers $B$ et la longueur $AB$",
   "pieges": [
    "la droite $(AB)$, le sens de $B$ vers $A$ et la longueur $AB$",
    "la droite $(AB)$, le sens de $A$ vers $B$ et la longueur $AB \\div 2$",
    "une droite perpendiculaire à $(AB)$, le sens de $A$ vers $B$ et la longueur $AB$"
   ],
   "note": "Une erreur fréquente : inverser le sens, de $B$ vers $A$ au lieu de $A$ vers $B$."
  },
  {
   "id": "transl-cons",
   "chap": "transl",
   "type": "propriete",
   "titre": "Ce que conserve une translation",
   "question": "Une translation conserve ...",
   "reponse": "les longueurs, les angles, les aires, l'alignement et le parallélisme",
   "pieges": [
    "seulement les longueurs, mais pas les angles ni les aires",
    "les longueurs et les angles, mais pas les aires ni l'alignement des points",
    "les longueurs et les aires, mais pas le parallélisme des droites"
   ],
   "note": "Elle ne conserve pas les positions : la figure se déplace, mais elle ne change ni de forme ni de taille."
  },
  {
   "id": "transl-droite",
   "chap": "transl",
   "type": "propriete",
   "titre": "Image d'une droite, d'un segment",
   "question": "L'image d'une droite par une translation est ...",
   "reponse": "une droite parallèle à la droite de départ",
   "pieges": [
    "une droite perpendiculaire à la droite de départ",
    "une droite qui coupe la droite de départ",
    "une droite de longueur différente, mais parallèle"
   ],
   "note": "L'image d'un segment est un segment de même longueur."
  },
  {
   "id": "transl-cercle",
   "chap": "transl",
   "type": "propriete",
   "titre": "Image d'un cercle",
   "question": "L'image d'un cercle par une translation est ...",
   "reponse": "un cercle de même rayon",
   "pieges": [
    "un cercle de rayon double",
    "une ellipse de même rayon",
    "un cercle de même centre"
   ],
   "note": "Le centre du cercle, lui, est déplacé : c'est l'image du centre."
  },
  {
   "id": "transl-figure",
   "chap": "transl",
   "type": "regle",
   "titre": "Image d'une figure",
   "question": "Pour construire l'image d'une figure, on construit ...",
   "reponse": "l'image de chacun de ses sommets, puis on les relie",
   "pieges": [
    "l'image du premier sommet, puis on recopie la figure à côté",
    "l'image de la figure en la retournant, puis on les relie",
    "l'image du centre de la figure uniquement et on recopie"
   ],
   "note": "Erreur fréquente : oublier de translater un des sommets."
  },
  {
   "id": "transl-rep",
   "chap": "transl",
   "type": "regle",
   "titre": "Translation dans un repère",
   "question": "Dans un repère, la translation de $(+a ; +b)$ transforme le point $(x ; y)$ en ...",
   "reponse": "$(x + a ; y + b)$",
   "pieges": [
    "$(x \\times a ; y \\times b)$",
    "$(x + b ; y + a)$",
    "$(x - a ; y - b)$"
   ],
   "note": "Exemple : la translation de $(+3 ; -2)$ envoie $(-4 ; 1)$ sur $(-4 + 3 ; 1 - 2) = (-1 ; -1)$.",
   "morceaux": [
    "(",
    "x + a",
    ";",
    "y + b",
    ")"
   ],
   "intrus": [
    "x \\times a",
    "y - b"
   ],
   "exemples": [
    {
     "donnees": "Translation $(+3 ; -2)$ appliquée à $A(1 ; 4)$",
     "question": "Abscisse de l'image ?",
     "reponse": 4,
     "unite": "",
     "correction": "$1 + 3 = 4$ (et l'ordonnée : $4 + (-2) = 2$)"
    }
   ]
  },
  {
   "id": "transl-depl",
   "chap": "transl",
   "type": "regle",
   "titre": "Déplacement d'une translation",
   "question": "Si la translation transforme $A(x_A ; y_A)$ en $B(x_B ; y_B)$, son déplacement est ...",
   "reponse": "$(x_B - x_A ; y_B - y_A)$",
   "pieges": [
    "$(x_A - x_B ; y_A - y_B)$",
    "$(x_B + x_A ; y_B + y_A)$",
    "$(x_B - y_B ; x_A - y_A)$"
   ],
   "note": "On lit le déplacement de $A$ vers $B$ : arrivée moins départ."
  },
  {
   "id": "frac-egales",
   "chap": "frac1",
   "type": "propriete",
   "titre": "Fractions égales",
   "question": "Pour $k \\neq 0$, $\\dfrac{a}{b}$ est égal à ...",
   "reponse": "$\\dfrac{a \\times k}{b \\times k}$",
   "pieges": [
    "$\\dfrac{a \\times k}{b + k}$",
    "$\\dfrac{a \\div k}{b \\times k}$",
    "$\\dfrac{a \\times b}{b \\times k}$"
   ],
   "note": "On ne change pas la valeur d'une fraction en multipliant (ou en divisant) son numérateur et son dénominateur par un même nombre non nul. Ajouter le même nombre en haut et en bas, ça change la valeur.",
   "morceaux": [
    "\\dfrac{a}{b}",
    "=",
    "\\dfrac{a \\times k}{b \\times k}"
   ],
   "intrus": [
    "\\dfrac{a + k}{b + k}",
    "\\dfrac{a \\times k}{b}"
   ]
  },
  {
   "id": "frac-simpl",
   "chap": "frac1",
   "type": "regle",
   "titre": "Simplifier une fraction",
   "question": "Pour simplifier $\\dfrac{a}{b}$ on ...",
   "reponse": "divise le numérateur et le dénominateur par un même nombre",
   "pieges": [
    "ajoute le même nombre au numérateur et au dénominateur",
    "soustrait le même nombre au numérateur et au dénominateur de la fraction",
    "divise seulement le numérateur par un même nombre"
   ],
   "morceaux": [
    "\\dfrac{a}{b}",
    "=",
    "\\dfrac{a \\div k}{b \\div k}"
   ],
   "intrus": [
    "\\dfrac{a - k}{b - k}"
   ]
  },
  {
   "id": "frac-irred",
   "chap": "frac1",
   "type": "definition",
   "titre": "Fraction irréductible",
   "question": "Une fraction est irréductible quand ...",
   "reponse": "on ne peut plus la simplifier (aucun diviseur commun autre que 1)",
   "pieges": [
    "elle est plus petite que 1 : le numérateur est inférieur au dénominateur",
    "son numérateur et son dénominateur sont des nombres premiers entre eux, donc pairs",
    "on peut la simplifier une seule fois par un même nombre"
   ],
   "note": "Exemple : $\\dfrac{18}{24} = \\dfrac{3}{4}$ et $\\dfrac{3}{4}$ est irréductible. Une fraction comme $\\dfrac{9}{4}$ (plus grande que 1) peut être irréductible."
  },
  {
   "id": "frac-compar",
   "chap": "frac1",
   "type": "regle",
   "titre": "Comparer deux fractions",
   "question": "Pour comparer deux fractions, on les réduit d'abord ...",
   "reponse": "au même dénominateur, puis on compare leurs numérateurs",
   "pieges": [
    "au même dénominateur, puis on compare leurs dénominateurs",
    "au même numérateur, puis on compare leurs dénominateurs",
    "en les additionnant, puis on compare la somme à 1"
   ],
   "note": "Exemple : $\\dfrac{3}{4}$ et $\\dfrac{5}{7}$ deviennent $\\dfrac{21}{28}$ et $\\dfrac{20}{28}$ : $\\dfrac{3}{4}$ est la plus grande."
  },
  {
   "id": "frac-neg-compar",
   "chap": "frac1",
   "type": "propriete",
   "titre": "Fractions négatives",
   "question": "Une fraction positive est ...",
   "reponse": "toujours plus grande que n'importe quelle fraction négative",
   "pieges": [
    "parfois plus petite qu'une fraction négative",
    "toujours plus petite que n'importe quelle fraction négative",
    "plus grande qu'une fraction négative seulement si son numérateur est plus grand"
   ],
   "note": "Entre deux fractions négatives, la plus grande est celle qui est la plus proche de 0 : $-\\dfrac{1}{4} > -\\dfrac{1}{2}$."
  },
  {
   "id": "frac-add-meme",
   "chap": "frac1",
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
   "id": "frac-sous-meme",
   "chap": "frac1",
   "type": "regle",
   "titre": "Soustraire des fractions de même dénominateur",
   "question": "$\\dfrac{a}{c} - \\dfrac{b}{c}$ vaut ...",
   "reponse": "$\\dfrac{a - b}{c}$",
   "pieges": [
    "$\\dfrac{a - b}{c - c}$",
    "$\\dfrac{a - b}{c^{2}}$",
    "$\\dfrac{a \\div b}{c}$"
   ],
   "note": "Le dénominateur ne change pas. Le résultat peut être négatif : $\\dfrac{2}{7} - \\dfrac{5}{7} = \\dfrac{-3}{7} = -\\dfrac{3}{7}$.",
   "morceaux": [
    "\\dfrac{a}{c}",
    "-",
    "\\dfrac{b}{c}",
    "=",
    "\\dfrac{a - b}{c}"
   ],
   "intrus": [
    "\\dfrac{a - b}{c - c}",
    "\\div"
   ]
  },
  {
   "id": "frac-denom",
   "chap": "frac1",
   "type": "regle",
   "titre": "Dénominateur commun",
   "question": "Pour additionner $\\dfrac{a}{b}$ et $\\dfrac{c}{d}$ avec $b \\neq d$, on cherche ...",
   "reponse": "un multiple commun de $b$ et de $d$, qu'on prend comme nouveau dénominateur",
   "pieges": [
    "un diviseur commun de $b$ et de $d$, qu'on prend comme nouveau dénominateur",
    "la somme de $b$ et de $d$, qu'on prend comme nouveau dénominateur",
    "le plus grand de $b$ et de $d$, qu'on garde comme nouveau dénominateur"
   ],
   "note": "Le produit $b \\times d$ convient toujours ; le plus petit multiple commun donne des calculs plus petits : pour $\\dfrac{1}{4} + \\dfrac{1}{6}$, le dénominateur commun 12."
  },
  {
   "id": "frac-add-diff",
   "chap": "frac1",
   "type": "regle",
   "titre": "Additionner des fractions de dénominateurs différents",
   "question": "Pour additionner $\\dfrac{1}{2}$ et $\\dfrac{1}{3}$ on ...",
   "reponse": "les réduit d'abord au même dénominateur : $\\dfrac{3}{6} + \\dfrac{2}{6} = \\dfrac{5}{6}$",
   "pieges": [
    "additionne les numérateurs et les dénominateurs : $\\dfrac{1 + 1}{2 + 3} = \\dfrac{2}{5}$",
    "additionne seulement les dénominateurs : $\\dfrac{1}{2 + 3} = \\dfrac{1}{5}$",
    "multiplie les deux fractions : $\\dfrac{1}{2} \\times \\dfrac{1}{3} = \\dfrac{1}{6}$"
   ]
  },
  {
   "id": "frac-sous-neg",
   "chap": "frac1",
   "type": "regle",
   "titre": "Soustraire une fraction",
   "question": "Soustraire une fraction, c'est ...",
   "reponse": "ajouter son opposée : $\\dfrac{a}{c} + \\dfrac{-b}{c}$",
   "pieges": [
    "ajouter son inverse : $\\dfrac{a}{c} - \\dfrac{b}{c} = \\dfrac{a}{c} + \\dfrac{c}{b}$",
    "soustraire les dénominateurs : $\\dfrac{a}{c} - \\dfrac{b}{c} = \\dfrac{a}{c - c}$",
    "ajouter sa moitié : $\\dfrac{a}{c} - \\dfrac{b}{c} = \\dfrac{a}{c} + \\dfrac{b}{2c}$"
   ],
   "note": "Les règles de signes sont celles des nombres relatifs : $\\dfrac{2}{5} - \\left(-\\dfrac{3}{5}\\right) = \\dfrac{2}{5} + \\dfrac{3}{5} = \\dfrac{5}{5} = 1$."
  },
  {
   "id": "recip",
   "chap": "recip",
   "type": "propriete",
   "titre": "Réciproque de Pythagore",
   "question": "Si, dans un triangle ABC, on a $BC^{2} = AB^{2} + AC^{2}$, alors ...",
   "reponse": "le triangle ABC est rectangle en A",
   "pieges": [
    "le triangle ABC est rectangle en B",
    "le triangle ABC est isocèle en A",
    "le triangle ABC est équilatéral, car $BC = AB + AC$"
   ],
   "note": "La réciproque sert à prouver qu'un triangle est rectangle.",
   "morceaux": [
    "BC^{2} = AB^{2} + AC^{2}",
    "\\Longrightarrow",
    "\\text{ABC est rectangle en A}"
   ],
   "intrus": [
    "BC = AB + AC",
    "\\text{ABC est isocèle en A}"
   ]
  },
  {
   "id": "contra",
   "chap": "recip",
   "type": "propriete",
   "titre": "Contraposée de Pythagore",
   "question": "Si, dans un triangle ABC, on a $BC^{2} \\neq AB^{2} + AC^{2}$, alors ...",
   "reponse": "le triangle ABC n'est pas rectangle en A",
   "pieges": [
    "le triangle ABC n'est pas rectangle en B",
    "le triangle ABC est équilatéral, de côté BC",
    "on ne peut rien conclure sur le triangle"
   ],
   "morceaux": [
    "BC^{2} \\neq AB^{2} + AC^{2}",
    "\\Longrightarrow",
    "\\text{ABC n'est pas rectangle en A}"
   ],
   "intrus": [
    "\\text{ABC est rectangle en B}"
   ]
  },
  {
   "id": "recip-methode",
   "chap": "recip",
   "type": "regle",
   "titre": "Méthode de la réciproque",
   "question": "Avec la réciproque, on compare ...",
   "reponse": "le carré du plus grand côté et la somme des carrés des deux autres",
   "pieges": [
    "la somme des deux plus petits côtés et le plus grand côté, sans carré",
    "les carrés des deux plus petits côtés entre eux, puis au plus grand",
    "le périmètre du triangle et le carré du plus grand côté"
   ]
  },
  {
   "id": "recip-grand",
   "chap": "recip",
   "type": "propriete",
   "titre": "Où est l'angle droit ?",
   "question": "Si un triangle est rectangle, son angle droit est ...",
   "reponse": "opposé au plus grand côté",
   "pieges": [
    "opposé au plus petit côté",
    "adjacent au plus grand côté",
    "situé entre les deux plus petits côtés"
   ],
   "note": "Dans un triangle rectangle, le plus grand côté est l'hypoténuse ; le sommet de l'angle droit est le sommet commun aux deux autres côtés."
  },
  {
   "id": "recip-redac",
   "chap": "recip",
   "type": "regle",
   "titre": "Rédiger avec la réciproque",
   "question": "Dans la rédaction, on écrit ... avant de conclure.",
   "reponse": "« D'une part … D'autre part … On constate que … »",
   "pieges": [
    "« On sait que ABC est rectangle … D'après Pythagore … »",
    "« On mesure les trois côtés … On constate que … »",
    "« Le triangle semble rectangle … Donc … »"
   ],
   "note": "On ne peut pas écrire $BC^{2} = AB^{2} + AC^{2}$ avant de savoir que c'est vrai : on calcule les deux membres séparément.",
   "morceaux": [
    "\\text{D'une part}",
    "\\text{D'autre part}",
    "\\text{On constate que}",
    "\\text{D'après la réciproque}",
    "\\text{Donc}"
   ],
   "intrus": [
    "\\text{On mesure}",
    "\\text{On sait que}"
   ]
  },
  {
   "id": "recip-choix",
   "chap": "recip",
   "type": "regle",
   "titre": "Quel théorème utiliser ?",
   "question": "Pour prouver qu'un triangle est rectangle quand on connaît ses trois longueurs, on utilise ...",
   "reponse": "la réciproque du théorème de Pythagore",
   "pieges": [
    "le théorème de Pythagore direct",
    "la contraposée du théorème de Pythagore",
    "le théorème de Thalès"
   ],
   "note": "Direct : on sait qu'il est rectangle et on cherche une longueur. Réciproque : on prouve qu'il est rectangle (égalité). Contraposée : on prouve qu'il ne l'est pas (inégalité)."
  },
  {
   "id": "recip-mesure",
   "chap": "recip",
   "type": "regle",
   "titre": "Mesurer ne prouve rien",
   "question": "Pour démontrer qu'un triangle est rectangle, on ...",
   "reponse": "calcule avec les longueurs données, on ne mesure pas l'angle",
   "pieges": [
    "mesure l'angle avec le rapporteur, sur la figure faite à main levée",
    "vérifie que la figure à main levée a bien l'air rectangle",
    "compare les longueurs mesurées à la règle sur la figure"
   ],
   "note": "Une figure à main levée ou une mesure peut tromper : seul le calcul avec les longueurs de l'énoncé est une preuve."
  },
  {
   "id": "recip-corde",
   "chap": "recip",
   "type": "regle",
   "titre": "Corde à nœuds",
   "question": "Une corde à 12 nœuds équidistants, tendue en triangle 3 – 4 – 5, permet de tracer ...",
   "reponse": "un angle droit, car $3^{2} + 4^{2} = 5^{2}$",
   "pieges": [
    "un angle plat, car $3 + 4 + 5 = 12$",
    "un triangle équilatéral, car $12 = 3 \\times 4$",
    "un angle droit, car $3 + 4 = 5 + 2$"
   ],
   "note": "C'est la réciproque du théorème de Pythagore : elle sert aux maçons pour tracer des angles droits."
  },
  {
   "id": "prop-def",
   "chap": "prop",
   "type": "definition",
   "titre": "Situation de proportionnalité",
   "question": "Deux grandeurs sont proportionnelles si ...",
   "reponse": "on passe de l'une à l'autre en multipliant toujours par le même nombre",
   "pieges": [
    "les deux grandeurs augmentent en même temps : quand l'une grandit, l'autre aussi",
    "on passe de l'une à l'autre en ajoutant toujours le même nombre",
    "la représentation graphique est une droite quelconque, même sans passer par l'origine"
   ]
  },
  {
   "id": "prop-coef",
   "chap": "prop",
   "type": "regle",
   "titre": "Trouver le coefficient",
   "question": "Pour trouver le coefficient de proportionnalité, on calcule ...",
   "reponse": "le quotient d'une valeur de la 2e ligne par celle de la 1re ligne",
   "pieges": [
    "la différence entre deux valeurs d'une même colonne du tableau",
    "la somme des valeurs de la première et de la deuxième ligne du tableau",
    "le quotient de la première valeur par la dernière valeur de la même ligne"
   ],
   "note": "Exemple : 2 cahiers coûtent 3 € ; $3 \\div 2 = 1{,}5$ €/cahier. Si les quotients ne sont pas tous égaux, ce n'est pas un tableau de proportionnalité."
  },
  {
   "id": "prop-croix",
   "chap": "prop",
   "type": "propriete",
   "titre": "Produit en croix",
   "question": "Si $\\dfrac{a}{b} = \\dfrac{c}{d}$ (nombres non nuls), alors ...",
   "reponse": "$a \\times d = b \\times c$",
   "pieges": [
    "$a \\times b = c \\times d$",
    "$a + d = b + c$",
    "$a \\times c = b \\times d$"
   ],
   "note": "Pour 5 m à 18 € et 8 m à $x$ € : $5 \\times x = 8 \\times 18$, donc $x = 144 \\div 5 = 28{,}8$ €.",
   "morceaux": [
    "a",
    "\\times",
    "d",
    "=",
    "b",
    "\\times",
    "c"
   ],
   "intrus": [
    "+",
    "a \\times b"
   ]
  },
  {
   "id": "prop-unite",
   "chap": "prop",
   "type": "regle",
   "titre": "Passage à l'unité",
   "question": "Le passage à l'unité consiste à ...",
   "reponse": "calculer la valeur pour 1, puis la multiplier par la quantité",
   "pieges": [
    "calculer la valeur pour 10, puis la diviser par la quantité demandée",
    "ajouter la valeur pour 1 à chaque valeur du tableau",
    "calculer la valeur totale, puis la diviser par la quantité demandée"
   ],
   "note": "5 m coûtent 18 € : 1 m coûte $18 \\div 5 = 3{,}6$ €, donc 8 m coûtent $8 \\times 3{,}6 = 28{,}8$ €."
  },
  {
   "id": "prop-graphe",
   "chap": "prop",
   "type": "propriete",
   "titre": "Représentation graphique",
   "question": "Deux grandeurs sont proportionnelles si et seulement si leurs points sont ...",
   "reponse": "alignés avec l'origine du repère (sur une droite passant par O)",
   "pieges": [
    "alignés sur une droite quelconque, même qui ne passe pas par l'origine",
    "alignés sur une droite horizontale, parallèle à l'axe des abscisses",
    "placés sur une courbe qui monte de plus en plus vite"
   ],
   "note": "Le coefficient est le nombre lu pour $x = 1$."
  },
  {
   "id": "pourcent",
   "chap": "prop",
   "type": "formule",
   "titre": "Calculer un pourcentage d'une quantité",
   "question": "$t\\,\\%$ d'une quantité $V$ ?",
   "reponse": "$\\dfrac{t}{100} \\times V$",
   "pieges": [
    "$t \\times V$",
    "$\\dfrac{V}{100} + t$",
    "$\\dfrac{100}{t} \\times V$"
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
   ],
   "exemples": [
    {
     "donnees": "Calculer $20\\,\\%$ de 85 €",
     "question": "Résultat ?",
     "reponse": 17,
     "unite": "€",
     "correction": "$\\dfrac{20}{100} \\times 85 = 17$ €"
    }
   ]
  },
  {
   "id": "hausse",
   "chap": "prop",
   "type": "formule",
   "titre": "Augmentation en pourcentage",
   "question": "Pour augmenter une valeur de $t\\,\\%$, on la multiplie par ...",
   "reponse": "$1 + \\dfrac{t}{100}$",
   "pieges": [
    "$\\dfrac{t}{100}$",
    "$1 - \\dfrac{t}{100}$",
    "$t$"
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
   ],
   "exemples": [
    {
     "donnees": "Un article à 40 € augmente de $15\\,\\%$",
     "question": "Nouveau prix ?",
     "reponse": 46,
     "unite": "€",
     "correction": "$40 \\times \\left(1 + \\dfrac{15}{100}\\right) = 40 \\times 1{,}15 = 46$ €"
    }
   ]
  },
  {
   "id": "baisse",
   "chap": "prop",
   "type": "formule",
   "titre": "Baisse en pourcentage",
   "question": "Pour diminuer une valeur de $t\\,\\%$, on la multiplie par ...",
   "reponse": "$1 - \\dfrac{t}{100}$",
   "pieges": [
    "$\\dfrac{t}{100}$",
    "$1 + \\dfrac{t}{100}$",
    "100 - t"
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
   ],
   "exemples": [
    {
     "donnees": "Un article à 80 € baisse de $25\\,\\%$",
     "question": "Nouveau prix ?",
     "reponse": 60,
     "unite": "€",
     "correction": "$80 \\times \\left(1 - \\dfrac{25}{100}\\right) = 80 \\times 0{,}75 = 60$ €"
    }
   ]
  },
  {
   "id": "taux-evol",
   "chap": "prop",
   "type": "formule",
   "titre": "Taux d'évolution",
   "question": "Le taux d'évolution d'une valeur $V_0$ à une valeur $V_1$ est ...",
   "reponse": "$\\dfrac{V_1 - V_0}{V_0}$",
   "pieges": [
    "$\\dfrac{V_1 - V_0}{V_1}$",
    "$\\dfrac{V_0 - V_1}{V_0}$",
    "$\\dfrac{V_1}{V_0 - V_1}$"
   ],
   "note": "Pour un prix de 40 € à 46 € : $\\dfrac{46 - 40}{40} = 0{,}15$ : hausse de 15 %. Un taux négatif correspond à une baisse.",
   "morceaux": [
    "\\dfrac{V_1 - V_0}{V_0}"
   ],
   "intrus": [
    "\\dfrac{V_1 - V_0}{V_1}"
   ]
  },
  {
   "id": "pourc-succ",
   "chap": "prop",
   "type": "propriete",
   "titre": "Pourcentages successifs",
   "question": "Une hausse de 20 % suivie d'une baisse de 20 % ...",
   "reponse": "ne ramène pas au départ ($1{,}2 \\times 0{,}8 = 0{,}96$)",
   "pieges": [
    "ramène à la valeur de départ, car $20 - 20 = 0$ ($+20 - 20$)",
    "ramène à la valeur de départ, car $1{,}2 \\times 0{,}8 = 1$ en tout",
    "donne une valeur plus grande que la valeur de départ, toujours"
   ],
   "note": "Les pourcentages ne s'additionnent pas : on multiplie les coefficients multiplicateurs."
  },
  {
   "id": "echelle",
   "chap": "prop",
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
   "id": "echelle-unites",
   "chap": "prop",
   "type": "regle",
   "titre": "Échelle et unités",
   "question": "Avec une échelle, la longueur réelle est égale à ...",
   "reponse": "la longueur sur le plan multipliée par le dénominateur (même unité)",
   "pieges": [
    "la longueur sur le plan divisée par le dénominateur de l'échelle (même unité)",
    "la longueur sur le plan multipliée par l'échelle, quelle que soit l'unité",
    "la longueur sur le plan augmentée du dénominateur de l'échelle (même unité)"
   ],
   "note": "Il faut convertir : 4 cm sur une carte à $\\dfrac{1}{50\\,000}$ : $4 \\times 50\\,000 = 200\\,000$ cm $= 2$ km."
  },
  {
   "id": "rot-def",
   "chap": "rot",
   "type": "definition",
   "titre": "Rotation",
   "question": "Une rotation est définie par ...",
   "reponse": "un centre, un angle et un sens",
   "pieges": [
    "une direction, un sens et une longueur",
    "un axe et un point",
    "un centre et un rapport"
   ]
  },
  {
   "id": "rot-cons",
   "chap": "rot",
   "type": "propriete",
   "titre": "Ce que conserve une rotation",
   "question": "Une rotation conserve ...",
   "reponse": "les longueurs, les angles, les aires, l'alignement et le parallélisme",
   "pieges": [
    "les longueurs et les angles, mais pas les aires ni l'alignement des points",
    "les longueurs, les aires et les angles seulement quand l'angle de la rotation est un angle droit",
    "les longueurs et la direction des segments, mais pas les angles"
   ]
  },
  {
   "id": "rot-180",
   "chap": "rot",
   "type": "propriete",
   "titre": "Rotation de 180°",
   "question": "La rotation d'angle $180^{\\circ}$ est ...",
   "reponse": "la symétrie centrale",
   "pieges": [
    "une symétrie axiale",
    "une translation",
    "l'identité (rien ne bouge)"
   ]
  },
  {
   "id": "rot-poly",
   "chap": "rot",
   "type": "formule",
   "titre": "Angle d'une rotation d'un polygone régulier",
   "question": "Un polygone régulier à $n$ côtés est invariant par la rotation de centre O (son centre) et d'angle ...",
   "reponse": "$\\dfrac{360^{\\circ}}{n}$",
   "pieges": [
    "$360^{\\circ} \\times n$",
    "$\\dfrac{180^{\\circ}}{n}$",
    "$360^{\\circ} - n$"
   ],
   "morceaux": [
    "\\text{angle}",
    "=",
    "\\dfrac{360^{\\circ}}{n}"
   ],
   "intrus": [
    "\\dfrac{180^{\\circ}}{n}",
    "\\times"
   ],
   "exemples": [
    {
     "donnees": "Pentagone régulier ($n = 5$)",
     "question": "Angle de la rotation ?",
     "reponse": 72,
     "unite": "°",
     "correction": "$\\dfrac{360}{5} = 72^{\\circ}$"
    }
   ]
  },
  {
   "id": "rot-dist",
   "chap": "rot",
   "type": "propriete",
   "titre": "Distance au centre",
   "question": "Si $M'$ est l'image de $M$ par la rotation de centre $O$, alors ...",
   "reponse": "$OM' = OM$",
   "pieges": [
    "$MM' = OM$",
    "$OM' = 2 \\times OM$",
    "$OM' = OM + MM'$"
   ],
   "note": "Le point et son image sont sur un même cercle de centre $O$.",
   "morceaux": [
    "OM'",
    "=",
    "OM"
   ],
   "intrus": [
    "MM'",
    "2 \\times"
   ]
  },
  {
   "id": "rot-angle",
   "chap": "rot",
   "type": "propriete",
   "titre": "Angle au centre",
   "question": "Si $M'$ est l'image de $M$ par une rotation de centre $O$, l'angle $\\widehat{MOM'}$ mesure ...",
   "reponse": "l'angle de la rotation",
   "pieges": [
    "le double de l'angle de la rotation",
    "la moitié de l'angle de la rotation",
    "toujours $90^{\\circ}$"
   ],
   "note": "Le triangle $OMM'$ est isocèle en $O$."
  },
  {
   "id": "rot-sens",
   "chap": "rot",
   "type": "definition",
   "titre": "Sens direct",
   "question": "Le sens direct (ou trigonométrique) est le sens ...",
   "reponse": "contraire des aiguilles d'une montre",
   "pieges": [
    "des aiguilles d'une montre, quand on regarde l'horloge de face",
    "de lecture, de gauche à droite puis de haut en bas",
    "qui va du bas vers le haut de la feuille"
   ],
   "note": "Le sens des aiguilles d'une montre s'appelle le sens indirect (ou horaire)."
  },
  {
   "id": "rot-centre",
   "chap": "rot",
   "type": "propriete",
   "titre": "Le centre ne bouge pas",
   "question": "Par une rotation de centre $O$, l'image du point $O$ est ...",
   "reponse": "le point $O$ lui-même",
   "pieges": [
    "le symétrique de $O$ par rapport à la droite $(MM')$",
    "un point du cercle de centre $O$ et de rayon 1",
    "un point qui dépend de l'angle de la rotation"
   ],
   "note": "On dit que le centre est le seul point invariant (sauf si la rotation est l'identité)."
  },
  {
   "id": "rot-cercle",
   "chap": "rot",
   "type": "propriete",
   "titre": "Image d'un cercle",
   "question": "L'image d'un cercle de centre $A$ et de rayon $r$ par une rotation est ...",
   "reponse": "un cercle de rayon $r$ dont le centre est l'image de $A$",
   "pieges": [
    "le même cercle, de même centre $A$ et de même rayon $r$, même si $A$ n'est pas le centre de la rotation",
    "un cercle de rayon $2r$ dont le centre est l'image de $A$",
    "une ellipse de même centre que le cercle de départ"
   ],
   "note": "La rotation conserve les longueurs, donc le rayon."
  },
  {
   "id": "rot-quart",
   "chap": "rot",
   "type": "formule",
   "titre": "Quart de tour direct autour de l'origine",
   "question": "Dans un repère orthonormé, l'image de $M(x\\,;\\,y)$ par la rotation de centre $O$ et d'angle $90^{\\circ}$ dans le sens direct est ...",
   "reponse": "$M'(-y\\,;\\,x)$",
   "pieges": [
    "$M'(y\\,;\\,-x)$",
    "$M'(-x\\,;\\,-y)$",
    "$M'(y\\,;\\,x)$"
   ],
   "note": "Exemple : $(2\\,;\\,1)$ devient $(-1\\,;\\,2)$.",
   "morceaux": [
    "M'",
    "(",
    "-y",
    ";",
    "x",
    ")"
   ],
   "intrus": [
    "y",
    "-x"
   ]
  },
  {
   "id": "rot-quart-h",
   "chap": "rot",
   "type": "formule",
   "titre": "Quart de tour horaire autour de l'origine",
   "question": "Dans un repère orthonormé, l'image de $M(x\\,;\\,y)$ par la rotation de centre $O$ et d'angle $90^{\\circ}$ dans le sens des aiguilles d'une montre est ...",
   "reponse": "$M'(y\\,;\\,-x)$",
   "pieges": [
    "$M'(-y\\,;\\,x)$",
    "$M'(-x\\,;\\,-y)$",
    "$M'(x\\,;\\,-y)$"
   ],
   "note": "Exemple : $(2\\,;\\,1)$ devient $(1\\,;\\,-2)$."
  },
  {
   "id": "rot-poly-k",
   "chap": "rot",
   "type": "propriete",
   "titre": "Rotations d'un polygone régulier",
   "question": "Un polygone régulier à $n$ côtés, de centre $O$, est aussi invariant par la rotation de centre $O$ et d'angle ...",
   "reponse": "$k \\times \\dfrac{360^{\\circ}}{n}$, avec $k$ entier",
   "pieges": [
    "$k \\times 360^{\\circ}$, avec $k$ entier",
    "$\\dfrac{360^{\\circ}}{n \\times k}$, avec $k$ entier",
    "$\\dfrac{180^{\\circ}}{n}$ uniquement"
   ],
   "note": "Cela revient à répéter la rotation de base plusieurs fois de suite."
  },
  {
   "id": "frac-mult",
   "chap": "frac2",
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
   "chap": "frac2",
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
   "chap": "frac2",
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
   "id": "frac-simpl-croix",
   "chap": "frac2",
   "type": "regle",
   "titre": "Simplifier avant de multiplier",
   "question": "Pour multiplier deux fractions, il est plus simple de ...",
   "reponse": "simplifier en croix : un numérateur avec le dénominateur de l'autre fraction",
   "pieges": [
    "mettre les deux fractions au même dénominateur avant de multiplier, comme pour une addition",
    "simplifier les deux numérateurs entre eux puis les deux dénominateurs entre eux, avant de multiplier",
    "toujours multiplier d'abord : la simplification est interdite avant d'avoir le résultat final"
   ],
   "note": "Exemple : $\\dfrac{4}{9} \\times \\dfrac{3}{8} = \\dfrac{\\cancel{4}^{1}}{\\cancel{9}_{3}} \\times \\dfrac{\\cancel{3}^{1}}{\\cancel{8}_{2}} = \\dfrac{1}{6}$."
  },
  {
   "id": "frac-de",
   "chap": "frac2",
   "type": "regle",
   "titre": "Prendre une fraction d'une quantité",
   "question": "Prendre $\\dfrac{a}{b}$ d'une quantité $Q$, c'est calculer ...",
   "reponse": "$\\dfrac{a}{b} \\times Q$",
   "pieges": [
    "$\\dfrac{a \\times Q}{b + Q}$",
    "$\\dfrac{a}{b} \\div Q$",
    "$Q - \\dfrac{a}{b}$"
   ],
   "note": "Exemple : les $\\dfrac{3}{4}$ de 20 € valent $\\dfrac{3}{4} \\times 20 = 15$ €.",
   "morceaux": [
    "\\dfrac{a}{b}",
    "\\times",
    "Q"
   ],
   "intrus": [
    "+",
    "\\div"
   ]
  },
  {
   "id": "frac-entier",
   "chap": "frac2",
   "type": "formule",
   "titre": "Multiplier une fraction par un entier",
   "question": "Pour un entier $n$, $n \\times \\dfrac{a}{b}$ vaut ...",
   "reponse": "$\\dfrac{n \\times a}{b}$",
   "pieges": [
    "$\\dfrac{n \\times a}{n \\times b}$",
    "$\\dfrac{a}{n \\times b}$",
    "$\\dfrac{a + n}{b}$"
   ],
   "note": "On peut écrire $n = \\dfrac{n}{1}$. Seul le numérateur est multiplié par $n$."
  },
  {
   "id": "inv-entier",
   "chap": "frac2",
   "type": "definition",
   "titre": "Inverse d'un entier",
   "question": "L'inverse d'un entier non nul $n$ est ...",
   "reponse": "$\\dfrac{1}{n}$",
   "pieges": [
    "$-n$",
    "$n$",
    "$\\dfrac{n}{100}$"
   ],
   "note": "Exemple : l'inverse de 5 est $\\dfrac{1}{5}$, car $5 \\times \\dfrac{1}{5} = 1$."
  },
  {
   "id": "inv-zero",
   "chap": "frac2",
   "type": "propriete",
   "titre": "Zéro n'a pas d'inverse",
   "question": "Le nombre 0 ...",
   "reponse": "n'a pas d'inverse, car aucun nombre multiplié par 0 ne donne 1",
   "pieges": [
    "a pour inverse 0, car $0 \\times 0 = 0$ et il est le seul à le vérifier",
    "a pour inverse 1, car $1$ est l'élément neutre de la multiplication",
    "a pour inverse son opposé, qui est aussi 0"
   ],
   "note": "C'est pour cela qu'on ne peut pas diviser par 0."
  },
  {
   "id": "inv-decimal",
   "chap": "frac2",
   "type": "propriete",
   "titre": "Inverse d'un décimal",
   "question": "L'inverse de $0{,}5$ est ...",
   "reponse": "2, car $0{,}5 = \\dfrac{1}{2}$",
   "pieges": [
    "0,5, car un nombre décimal est son propre inverse",
    "5, car il suffit de décaler la virgule",
    "−0,5, car c'est l'opposé de 0,5"
   ],
   "note": "On écrit d'abord le décimal sous forme de fraction : $0{,}25 = \\dfrac{1}{4}$, donc son inverse est 4."
  },
  {
   "id": "frac-prior",
   "chap": "frac2",
   "type": "regle",
   "titre": "Priorités opératoires",
   "question": "Dans un calcul sans parenthèses avec fractions, on calcule en premier ...",
   "reponse": "les multiplications et les divisions, puis les additions et les soustractions",
   "pieges": [
    "les additions et les soustractions, puis les multiplications et les divisions",
    "ce qui est le plus à gauche, quelle que soit l'opération",
    "ce qui contient le plus petit dénominateur, quelle que soit l'opération"
   ],
   "note": "Les parenthèses sont prioritaires sur tout le reste."
  },
  {
   "id": "frac-resultat",
   "chap": "frac2",
   "type": "regle",
   "titre": "Forme du résultat",
   "question": "Le résultat d'un calcul avec des fractions se donne sous la forme ...",
   "reponse": "d'une fraction irréductible",
   "pieges": [
    "d'une fraction dont le dénominateur est le plus grand possible",
    "d'un nombre décimal arrondi au centième",
    "d'une fraction dont le numérateur est le plus grand possible"
   ],
   "note": "Une fraction est irréductible quand on ne peut plus simplifier : $\\dfrac{6}{9}$ devient $\\dfrac{2}{3}$."
  },
  {
   "id": "frac-reste",
   "chap": "frac2",
   "type": "formule",
   "titre": "La fraction qui reste",
   "question": "Si on utilise une fraction $f$ d'une quantité, la fraction restante est ...",
   "reponse": "$1 - f$",
   "pieges": [
    "$f - 1$",
    "$\\dfrac{1}{f}$",
    "$f$"
   ],
   "note": "Exemple : on dépense $\\dfrac{1}{4}$ d'une somme, il reste $1 - \\dfrac{1}{4} = \\dfrac{3}{4}$."
  },
  {
   "id": "egaux-def",
   "chap": "sembl",
   "type": "definition",
   "titre": "Triangles égaux",
   "question": "Deux triangles sont égaux si ...",
   "reponse": "ils sont superposables (mêmes longueurs, mêmes angles)",
   "pieges": [
    "ils ont la même aire",
    "ils ont le même périmètre",
    "ils ont les mêmes angles seulement"
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
   "id": "agrand-k",
   "chap": "sembl",
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
   "id": "puiss-def",
   "chap": "puis",
   "type": "definition",
   "titre": "Puissance d'un nombre",
   "question": "$a^{n}$ (avec $n$ entier positif) signifie ...",
   "reponse": "le produit de $n$ facteurs égaux à $a$ : $a \\times a \\times \\dots \\times a$",
   "pieges": [
    "$a$ multiplié par $n$ : $a \\times n$",
    "$a$ ajouté $n$ fois à lui-même : $a + a + \\dots + a$",
    "$n$ multiplié par lui-même $a$ fois : $n^{a}$"
   ]
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
   "id": "pyr-def",
   "chap": "pyr",
   "type": "definition",
   "titre": "Pyramide",
   "question": "Une pyramide est un solide formé ...",
   "reponse": "d'une base polygonale et de faces triangulaires qui ont un sommet commun",
   "pieges": [
    "de deux bases parallèles et de faces rectangulaires",
    "d'une base circulaire et d'un sommet commun à toutes les faces",
    "de six faces carrées identiques, comme un cube"
   ]
  },
  {
   "id": "pyr-vol",
   "chap": "pyr",
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
   "id": "pyr-red",
   "chap": "pyr",
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
   "id": "equ-def",
   "chap": "equ",
   "type": "definition",
   "titre": "Équation et solution",
   "question": "Une solution d'une équation est une valeur de l'inconnue qui ...",
   "reponse": "rend l'égalité vraie",
   "pieges": [
    "rend l'égalité fausse",
    "annule le membre de gauche",
    "est toujours un entier"
   ]
  },
  {
   "id": "equ-regle",
   "chap": "equ",
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
   "id": "equ-conclusion",
   "chap": "equ",
   "type": "regle",
   "titre": "Étapes d'un problème",
   "question": "Dans la résolution d'un problème, quel est l'ordre des étapes ?",
   "reponse": "choisir l'inconnue, écrire l'équation, la résoudre, vérifier, conclure par une phrase",
   "pieges": [
    "écrire l'équation, résoudre, conclure, choisir l'inconnue",
    "résoudre, choisir l'inconnue, vérifier",
    "choisir l'inconnue, résoudre, ne pas conclure"
   ]
  },
  {
   "id": "vitesse",
   "chap": "gc",
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
   "chap": "gc",
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
   "chap": "gc",
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
   "id": "energie",
   "chap": "gc",
   "type": "formule",
   "titre": "Énergie électrique",
   "question": "Énergie $E$ (en kWh) consommée par un appareil de puissance $P$ (en kW) pendant $t$ heures ?",
   "reponse": "$E = P \\times t$",
   "pieges": [
    "$E = \\dfrac{P}{t}$",
    "$E = P + t$",
    "$E = \\dfrac{t}{P}$"
   ],
   "exemples": [
    {
     "donnees": "$P = 2$ kW pendant $t = 3$ h",
     "question": "Énergie ?",
     "reponse": 6,
     "unite": "kWh",
     "correction": "$E = 2 \\times 3 = 6$ kWh"
    }
   ],
   "note": "Penser à convertir les W en kW avant de calculer.",
   "morceaux": [
    "E",
    "=",
    "P",
    "\\times",
    "t"
   ],
   "intrus": [
    "\\div",
    "+"
   ]
  },
  {
   "id": "kmh-ms",
   "chap": "gc",
   "type": "regle",
   "titre": "Convertir km/h en m/s",
   "question": "Pour convertir une vitesse de km/h en m/s, on ...",
   "reponse": "divise par 3,6",
   "pieges": [
    "multiplie par 3,6",
    "divise par 60",
    "multiplie par 1 000"
   ],
   "exemples": [
    {
     "donnees": "72 km/h",
     "question": "Vitesse en m/s ?",
     "reponse": 20,
     "unite": "m/s",
     "correction": "$72 \\div 3{,}6 = 20$ m/s"
    }
   ]
  },
  {
   "id": "duree",
   "chap": "gc",
   "type": "regle",
   "titre": "Écrire une durée",
   "question": "2,5 h s'écrit en heures et minutes :",
   "reponse": "2 h 30 min",
   "pieges": [
    "2 h 50 min",
    "2 h 5 min",
    "2 h 25 min"
   ],
   "note": "1 h = 60 min donc 0,5 h = 30 min."
  },
  {
   "id": "sci-def",
   "chap": "sci",
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
   "chap": "sci",
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
   "id": "sci-ex",
   "chap": "sci",
   "type": "definition",
   "titre": "Reconnaître une notation scientifique",
   "question": "Laquelle de ces écritures est en notation scientifique ?",
   "reponse": "$3{,}2 \\times 10^{-5}$",
   "pieges": [
    "$12 \\times 10^{4}$",
    "$0{,}5 \\times 10^{3}$",
    "$32 \\times 10^{-6}$"
   ]
  },
  {
   "id": "cone-gen",
   "chap": "cone",
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
   "id": "cone-vol",
   "chap": "cone",
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
   "reponse": "1 - P(A)",
   "pieges": [
    "P(A) - 1",
    "$\\dfrac{1}{P(A)}$",
    "-P(A)"
   ],
   "exemples": [
    {
     "donnees": "$P(A) = 0{,}3$",
     "question": "$P(\\text{non } A)$ ?",
     "reponse": 0.7,
     "unite": "",
     "correction": "$1 - 0{,}3 = 0{,}7$"
    }
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
  }
 ],
 "outils": [
  {
   "id": "o1",
   "chap": "pyth",
   "enonce": "L'échelle de 5 m est posée contre un mur vertical, son pied à 3 m du mur. À quelle hauteur arrive-t-elle ?",
   "bon": "pythagore",
   "explication": "Le mur et le sol forment un angle droit : on connaît l'hypoténuse (l'échelle) et un côté, on calcule l'autre côté avec Pythagore.",
   "autres": [
    "aire-tri",
    "vitesse",
    "moyenne"
   ]
  },
  {
   "id": "o2",
   "chap": "pyth",
   "enonce": "Un écran rectangulaire mesure 40 cm sur 30 cm. Quelle est la longueur de sa diagonale ?",
   "bon": "pythagore",
   "explication": "La diagonale est l'hypoténuse d'un triangle rectangle de côtés 40 et 30.",
   "autres": [
    "aire-rect",
    "perim-cercle",
    "frequence"
   ]
  },
  {
   "id": "o3",
   "chap": "pyth",
   "enonce": "Dans un triangle ABC rectangle en A, on connaît $AB$ et $BC$. On cherche $AC$. Quel outil ?",
   "bon": "pyth-cote",
   "explication": "$BC$ est l'hypoténuse et on cherche un côté de l'angle droit : on soustrait les carrés.",
   "autres": [
    "hypotenuse",
    "angles-tri",
    "ineg-tri"
   ]
  },
  {
   "id": "o4",
   "chap": "recip",
   "enonce": "Un triangle a pour côtés 5 cm, 12 cm et 13 cm. Est-il rectangle ?",
   "bon": "recip",
   "explication": "On veut prouver qu'un triangle est rectangle : on compare $13^{2}$ et $5^{2} + 12^{2}$ avec la réciproque.",
   "autres": [
    "pythagore",
    "angles-tri",
    "ineg-tri"
   ]
  },
  {
   "id": "o5",
   "chap": "recip",
   "enonce": "Un triangle a pour côtés 4 cm, 6 cm et 8 cm. Est-il rectangle ?",
   "bon": "contra",
   "explication": "$8^{2} = 64$ et $4^{2} + 6^{2} = 52$ : les deux sont différents, on conclut « pas rectangle » avec la contraposée.",
   "autres": [
    "pythagore",
    "ineg-tri",
    "angles-tri"
   ]
  },
  {
   "id": "o6",
   "chap": "pre",
   "enonce": "Quelle est l'aire d'une pièce circulaire de 4 m de rayon ?",
   "bon": "aire-disque",
   "explication": "On cherche l'aire d'un disque : $\\pi \\times r^{2}$.",
   "autres": [
    "perim-cercle",
    "aire-rect",
    "vol-prisme"
   ]
  },
  {
   "id": "o7",
   "chap": "pre",
   "enonce": "Quelle longueur de ruban faut-il pour entourer un cercle de rayon 20 cm ?",
   "bon": "perim-cercle",
   "explication": "On cherche le périmètre d'un cercle : $2 \\times \\pi \\times r$.",
   "autres": [
    "aire-disque",
    "aire-rect",
    "vol-prisme"
   ]
  },
  {
   "id": "o8",
   "chap": "pre",
   "enonce": "On remplit une boîte de 20 cm sur 15 cm sur 10 cm. Quel est son volume ?",
   "bon": "vol-pave",
   "explication": "Un pavé droit : $L \\times \\ell \\times h$.",
   "autres": [
    "aire-rect",
    "vol-prisme",
    "pyr-vol"
   ]
  },
  {
   "id": "o9",
   "chap": "pre",
   "enonce": "Dans un triangle, deux angles mesurent $50^{\\circ}$ et $70^{\\circ}$. Quel est le troisième ?",
   "bon": "angles-tri",
   "explication": "La somme vaut $180^{\\circ}$ : $180 - 50 - 70 = 60$.",
   "autres": [
    "pythagore",
    "angles-alt",
    "ineg-tri"
   ]
  },
  {
   "id": "o10",
   "chap": "stat",
   "enonce": "Voici les notes d'un élève : 12, 15, 9, 14. Quelle est sa note moyenne ?",
   "bon": "moyenne",
   "explication": "On additionne les valeurs puis on divise par l'effectif total.",
   "autres": [
    "mediane",
    "frequence",
    "pourcent"
   ]
  },
  {
   "id": "o11",
   "chap": "stat",
   "enonce": "Dans une classe de 24 élèves, 6 sont gauchers. Quelle est la fréquence des gauchers ?",
   "bon": "frequence",
   "explication": "Fréquence = effectif ÷ effectif total = $\\dfrac{6}{24}$.",
   "autres": [
    "moyenne",
    "pourcent",
    "proba-f"
   ]
  },
  {
   "id": "o12",
   "chap": "prop",
   "enonce": "Un manteau à 120 € est soldé à $-30\\,\\%$. Quel est son nouveau prix ?",
   "bon": "baisse",
   "explication": "Baisse de 30 % : on multiplie par $1 - \\dfrac{30}{100} = 0{,}7$.",
   "autres": [
    "hausse",
    "pourcent",
    "echelle"
   ]
  },
  {
   "id": "o13",
   "chap": "prop",
   "enonce": "Le prix d'un forfait de 50 € augmente de $4\\,\\%$. Quel est le nouveau prix ?",
   "bon": "hausse",
   "explication": "Hausse de 4 % : on multiplie par 1,04.",
   "autres": [
    "baisse",
    "pourcent",
    "vitesse"
   ]
  },
  {
   "id": "o14",
   "chap": "prop",
   "enonce": "Sur un plan à l'échelle $\\dfrac{1}{10\\,000}$, une rue mesure 5 cm. Quelle est sa longueur réelle ?",
   "bon": "echelle",
   "explication": "On multiplie la longueur du plan par 10 000 (même unité).",
   "autres": [
    "pourcent",
    "vitesse",
    "pythagore"
   ]
  },
  {
   "id": "o15",
   "chap": "prop",
   "enonce": "Dans un lycée de 800 élèves, $35\\,\\%$ sont demi-pensionnaires. Combien ?",
   "bon": "pourcent",
   "explication": "$\\dfrac{35}{100} \\times 800$.",
   "autres": [
    "hausse",
    "frequence",
    "proba-f"
   ]
  },
  {
   "id": "o16",
   "chap": "gc",
   "enonce": "Un cycliste parcourt 45 km en 3 h. Quelle est sa vitesse moyenne ?",
   "bon": "vitesse",
   "explication": "$v = \\dfrac{d}{t}$.",
   "autres": [
    "distance",
    "temps",
    "energie"
   ]
  },
  {
   "id": "o17",
   "chap": "gc",
   "enonce": "Un train roule à 120 km/h pendant 2 h 30 min. Quelle distance parcourt-il ?",
   "bon": "distance",
   "explication": "$d = v \\times t$ avec $t = 2{,}5$ h.",
   "autres": [
    "vitesse",
    "temps",
    "energie"
   ]
  },
  {
   "id": "o18",
   "chap": "gc",
   "enonce": "Il y a 180 km à parcourir à 90 km/h. Combien de temps dure le trajet ?",
   "bon": "temps",
   "explication": "$t = \\dfrac{d}{v}$.",
   "autres": [
    "distance",
    "vitesse",
    "kmh-ms"
   ]
  },
  {
   "id": "o19",
   "chap": "gc",
   "enonce": "Un radiateur de 1,5 kW fonctionne 4 h. Quelle énergie consomme-t-il ?",
   "bon": "energie",
   "explication": "$E = P \\times t$.",
   "autres": [
    "vitesse",
    "distance",
    "pourcent"
   ]
  },
  {
   "id": "o20",
   "chap": "pyr",
   "enonce": "Quel est le volume d'une pyramide de base carrée de 4 cm de côté et de 9 cm de hauteur ?",
   "bon": "pyr-vol",
   "explication": "Pyramide : $\\dfrac{1}{3} \\times B \\times h$.",
   "autres": [
    "vol-prisme",
    "cone-vol",
    "vol-pave"
   ]
  },
  {
   "id": "o21",
   "chap": "cone",
   "enonce": "Quel est le volume d'un cône de rayon 3 cm et de hauteur 7 cm ?",
   "bon": "cone-vol",
   "explication": "Cône : $\\dfrac{1}{3} \\times \\pi \\times r^{2} \\times h$.",
   "autres": [
    "pyr-vol",
    "vol-prisme",
    "aire-disque"
   ]
  },
  {
   "id": "o22",
   "chap": "cone",
   "enonce": "Un cône a une hauteur de 4 cm et un rayon de 3 cm. Quelle est la longueur de sa génératrice ?",
   "bon": "cone-gen",
   "explication": "$g^{2} = h^{2} + r^{2}$ (Pythagore dans le triangle rectangle de la coupe).",
   "autres": [
    "cone-vol",
    "pythagore",
    "pyr-vol"
   ]
  },
  {
   "id": "o23",
   "chap": "pyr",
   "enonce": "Une pyramide est réduite avec un rapport $k = \\dfrac{1}{2}$. Par combien son volume est-il multiplié ?",
   "bon": "pyr-red",
   "explication": "Les volumes sont multipliés par $k^{3} = \\dfrac{1}{8}$.",
   "autres": [
    "agrand-k",
    "pyr-vol",
    "pourcent"
   ]
  },
  {
   "id": "o24",
   "chap": "sembl",
   "enonce": "Un agrandissement de rapport 3 est appliqué à une figure. Par combien l'aire est-elle multipliée ?",
   "bon": "agrand-k",
   "explication": "Les aires sont multipliées par $k^{2} = 9$.",
   "autres": [
    "pyr-red",
    "pourcent",
    "prop-def"
   ]
  },
  {
   "id": "o25",
   "chap": "proba",
   "enonce": "On tire au hasard une carte dans un jeu de 32 cartes. Quelle est la probabilité d'obtenir un as ?",
   "bon": "proba-f",
   "explication": "Équiprobabilité : $\\dfrac{4}{32}$.",
   "autres": [
    "frequence",
    "proba-contraire",
    "pourcent"
   ]
  },
  {
   "id": "o26",
   "chap": "proba",
   "enonce": "La probabilité de gagner est 0,35. Quelle est la probabilité de ne pas gagner ?",
   "bon": "proba-contraire",
   "explication": "$1 - 0{,}35 = 0{,}65$.",
   "autres": [
    "proba-f",
    "frequence",
    "hausse"
   ]
  },
  {
   "id": "o27",
   "chap": "equ",
   "enonce": "Un nombre multiplié par 3 puis augmenté de 5 donne 23. Quel est ce nombre ?",
   "bon": "equ-regle",
   "explication": "On pose l'inconnue $x$ et on résout $3x + 5 = 23$.",
   "autres": [
    "pythagore",
    "moyenne",
    "pourcent"
   ]
  },
  {
   "id": "o28",
   "chap": "puis",
   "enonce": "Écrire $10^{5} \\times 10^{-2}$ sous la forme d'une seule puissance de 10.",
   "bon": "puiss-prod",
   "explication": "Même base : on additionne les exposants.",
   "autres": [
    "puiss-quot",
    "puiss-puiss",
    "puiss-neg"
   ]
  },
  {
   "id": "o29",
   "chap": "puis",
   "enonce": "Écrire $\\dfrac{7^{8}}{7^{3}}$ sous la forme d'une seule puissance.",
   "bon": "puiss-quot",
   "explication": "Même base : on soustrait les exposants.",
   "autres": [
    "puiss-prod",
    "puiss-puiss",
    "puiss-neg"
   ]
  },
  {
   "id": "o30",
   "chap": "puis",
   "enonce": "Écrire $\\left(3^{2}\\right)^{4}$ sous la forme d'une seule puissance.",
   "bon": "puiss-puiss",
   "explication": "Puissance d'une puissance : on multiplie les exposants.",
   "autres": [
    "puiss-prod",
    "puiss-quot",
    "puiss-neg"
   ]
  },
  {
   "id": "o31",
   "chap": "frac2",
   "enonce": "Calculer $\\dfrac{3}{4} \\times \\dfrac{2}{5}$.",
   "bon": "frac-mult",
   "explication": "Pour multiplier, pas besoin de dénominateur commun : $\\dfrac{3 \\times 2}{4 \\times 5}$.",
   "autres": [
    "frac-add-meme",
    "frac-add-diff",
    "frac-div"
   ]
  },
  {
   "id": "o32",
   "chap": "frac2",
   "enonce": "Calculer $\\dfrac{3}{4} \\div \\dfrac{2}{5}$.",
   "bon": "frac-div",
   "explication": "On multiplie par l'inverse : $\\dfrac{3}{4} \\times \\dfrac{5}{2}$.",
   "autres": [
    "frac-mult",
    "frac-add-diff",
    "inverse"
   ]
  },
  {
   "id": "o33",
   "chap": "frac1",
   "enonce": "Calculer $\\dfrac{1}{3} + \\dfrac{1}{4}$.",
   "bon": "frac-add-diff",
   "explication": "Dénominateurs différents : on réduit au dénominateur 12.",
   "autres": [
    "frac-add-meme",
    "frac-mult",
    "frac-div"
   ]
  },
  {
   "id": "o34",
   "chap": "sci",
   "enonce": "Un virus mesure $0{,}000\\,000\\,12$ m. Écrire cette longueur en notation scientifique.",
   "bon": "sci-def",
   "explication": "On cherche $a \\times 10^{n}$ avec $1 \\leq a < 10$ : $1{,}2 \\times 10^{-7}$.",
   "autres": [
    "sci-prod",
    "dix-puiss",
    "puiss-neg"
   ]
  },
  {
   "id": "o35",
   "chap": "transl",
   "enonce": "Le point $A(2 ; 3)$ est translaté de $(+4 ; -1)$. Quelles sont les coordonnées de son image ?",
   "bon": "transl-rep",
   "explication": "Dans un repère, on ajoute les coordonnées du déplacement.",
   "autres": [
    "rot-def",
    "transl-para",
    "rot-180"
   ]
  },
  {
   "id": "o36",
   "chap": "rot",
   "enonce": "On fait tourner un carré autour de son centre pour le faire coïncider avec lui-même. Quels angles sont possibles ?",
   "bon": "rot-poly",
   "explication": "Pour un polygone régulier à $n$ côtés : multiples de $\\dfrac{360^{\\circ}}{n}$, soit $90^{\\circ}$ pour un carré.",
   "autres": [
    "transl-def",
    "rot-180",
    "rot-cons"
   ]
  },
  {
   "id": "o37",
   "chap": "pyth",
   "enonce": "Un triangle $ABC$ est rectangle en $A$ avec $AB = 6$ cm et $AC = 8$ cm. Calculer $BC$.",
   "bon": "pythagore",
   "explication": "$BC$ est l'hypoténuse : $BC^{2} = 6^{2} + 8^{2} = 100$, donc $BC = 10$ cm.",
   "autres": [
    "pyth-cote",
    "recip",
    "aire-tri"
   ]
  },
  {
   "id": "o38",
   "chap": "pyth",
   "enonce": "Dans $ABC$ rectangle en $A$, on connaît $BC = 17$ cm et $AB = 8$ cm. Calculer $AC$.",
   "bon": "pyth-cote",
   "explication": "On cherche un côté de l'angle droit : $AC^{2} = 17^{2} - 8^{2} = 225$, donc $AC = 15$ cm.",
   "autres": [
    "angles-tri",
    "ineg-tri",
    "aire-tri"
   ]
  },
  {
   "id": "o39",
   "chap": "recip",
   "enonce": "Un triangle a pour côtés 6 cm, 8 cm et 10 cm. Est-il rectangle ?",
   "bon": "recip",
   "explication": "On veut prouver qu'il est rectangle : $10^{2} = 100$ et $6^{2} + 8^{2} = 100$, donc oui (réciproque).",
   "autres": [
    "pythagore",
    "angles-tri",
    "ineg-tri"
   ]
  },
  {
   "id": "o40",
   "chap": "recip",
   "enonce": "Un triangle a pour côtés 7 cm, 9 cm et 12 cm. Est-il rectangle ?",
   "bon": "contra",
   "explication": "$12^{2} = 144$ et $7^{2} + 9^{2} = 130$ : différents, donc non (contraposée).",
   "autres": [
    "pythagore",
    "ineg-tri",
    "angles-tri"
   ]
  },
  {
   "id": "o41",
   "chap": "pre",
   "enonce": "Peut-on construire un triangle de côtés 5 cm, 6 cm et 12 cm ?",
   "bon": "ineg-tri",
   "explication": "$12 > 5 + 6 = 11$ : impossible (inégalité triangulaire).",
   "autres": [
    "angles-tri",
    "mediatrice",
    "aire-tri"
   ]
  },
  {
   "id": "o42",
   "chap": "pre",
   "enonce": "Deux droites parallèles sont coupées par une sécante. Un angle alterne-interne mesure $65^{\\circ}$. Combien mesure l'autre ?",
   "bon": "angles-alt",
   "explication": "Droites parallèles : angles alternes-internes égaux, donc $65^{\\circ}$.",
   "autres": [
    "angles-tri",
    "ineg-tri",
    "mediatrice"
   ]
  },
  {
   "id": "o43",
   "chap": "stat",
   "enonce": "Une série rangée de 5 notes : 4 ; 9 ; 12 ; 15 ; 18. Quelle est la médiane ?",
   "bon": "mediane",
   "explication": "Effectif impair : la valeur centrale (la 3e), soit 12.",
   "autres": [
    "moyenne",
    "frequence",
    "priorites"
   ]
  },
  {
   "id": "o44",
   "chap": "stat",
   "enonce": "Températures relevées : 8, 10, 7, 12 et 8 °C. Quelle est la température moyenne ?",
   "bon": "moyenne",
   "explication": "Somme 45, divisée par 5 valeurs : 9 °C.",
   "autres": [
    "mediane",
    "frequence",
    "echelle"
   ]
  },
  {
   "id": "o45",
   "chap": "stat",
   "enonce": "Sur 80 voitures, 20 sont rouges. Quelle est la fréquence des voitures rouges ?",
   "bon": "frequence",
   "explication": "Effectif ÷ effectif total : $\\dfrac{20}{80} = 0{,}25$.",
   "autres": [
    "moyenne",
    "mediane",
    "echelle"
   ]
  },
  {
   "id": "o46",
   "chap": "rel2",
   "enonce": "Calculer $(-4) \\times 6$.",
   "bon": "rel-signe-prod",
   "explication": "Signes contraires : le produit est négatif, soit $-24$.",
   "autres": [
    "rel-add",
    "rel-sous",
    "rel-carre-neg"
   ]
  },
  {
   "id": "o47",
   "chap": "rel2",
   "enonce": "Calculer $(-7)^{2}$.",
   "bon": "rel-carre-neg",
   "explication": "$(-7)^{2} = (-7) \\times (-7) = 49$.",
   "autres": [
    "rel-oppose",
    "rel-add",
    "rel-sous"
   ]
  },
  {
   "id": "o48",
   "chap": "rel1",
   "enonce": "Calculer $(-12) + (+5)$.",
   "bon": "rel-add",
   "explication": "Signes contraires : $12 - 5 = 7$, signe du plus éloigné de 0 : $-7$.",
   "autres": [
    "rel-sous",
    "rel-oppose",
    "rel-signe-prod"
   ]
  },
  {
   "id": "o49",
   "chap": "rel1",
   "enonce": "Calculer $4 - (-9)$.",
   "bon": "rel-sous",
   "explication": "Soustraire, c'est ajouter l'opposé : $4 + 9 = 13$.",
   "autres": [
    "rel-add",
    "rel-oppose",
    "rel-signe-prod"
   ]
  },
  {
   "id": "o50",
   "chap": "transl",
   "enonce": "Une translation transforme $A$ en $B$. Comment construire l'image $M'$ d'un point $M$ ?",
   "bon": "transl-para",
   "explication": "$ABM'M$ doit être un parallélogramme.",
   "autres": [
    "transl-rep",
    "rot-def",
    "transl-cons"
   ]
  },
  {
   "id": "o51",
   "chap": "transl",
   "enonce": "Un segment de 5 cm est translaté. Quelle est la longueur de son image ?",
   "bon": "transl-cons",
   "explication": "Une translation conserve les longueurs : 5 cm.",
   "autres": [
    "transl-rep",
    "transl-def",
    "agrand-k"
   ]
  },
  {
   "id": "o52",
   "chap": "rot",
   "enonce": "Pour construire l'image d'un point par une rotation, de quoi a-t-on besoin ?",
   "bon": "rot-def",
   "explication": "D'un centre, d'un angle et d'un sens.",
   "autres": [
    "transl-def",
    "rot-poly",
    "rot-180"
   ]
  },
  {
   "id": "o53",
   "chap": "rot",
   "enonce": "La rotation de centre $O$ et d'angle $180^{\\circ}$ correspond à quelle transformation connue ?",
   "bon": "rot-180",
   "explication": "C'est la symétrie centrale de centre $O$.",
   "autres": [
    "transl-cons",
    "rot-poly",
    "transl-para"
   ]
  },
  {
   "id": "o54",
   "chap": "frac2",
   "enonce": "Simplifier $\\dfrac{18}{24}$.",
   "bon": "frac-simpl",
   "explication": "On divise le numérateur et le dénominateur par 6 : $\\dfrac{3}{4}$.",
   "autres": [
    "frac-add-meme",
    "frac-mult",
    "inverse"
   ]
  },
  {
   "id": "o55",
   "chap": "frac1",
   "enonce": "Calculer $\\dfrac{5}{9} + \\dfrac{2}{9}$.",
   "bon": "frac-add-meme",
   "explication": "Même dénominateur : on additionne les numérateurs, $\\dfrac{7}{9}$.",
   "autres": [
    "frac-add-diff",
    "frac-mult",
    "frac-simpl"
   ]
  },
  {
   "id": "o56",
   "chap": "frac1",
   "enonce": "Calculer $\\dfrac{2}{3} + \\dfrac{1}{5}$.",
   "bon": "frac-add-diff",
   "explication": "Dénominateur commun 15 : $\\dfrac{10}{15} + \\dfrac{3}{15} = \\dfrac{13}{15}$.",
   "autres": [
    "frac-add-meme",
    "frac-mult",
    "frac-simpl"
   ]
  },
  {
   "id": "o57",
   "chap": "frac2",
   "enonce": "Quel est l'inverse de $\\dfrac{3}{7}$ ?",
   "bon": "inverse",
   "explication": "On échange numérateur et dénominateur : $\\dfrac{7}{3}$.",
   "autres": [
    "rel-oppose",
    "frac-div",
    "frac-simpl"
   ]
  },
  {
   "id": "o58",
   "chap": "prop",
   "enonce": "Dans un tableau, 2 correspond à 5, 4 à 10 et 6 à 15. Que peut-on dire ?",
   "bon": "prop-def",
   "explication": "On passe toujours d'une ligne à l'autre en multipliant par 2,5 : c'est une situation de proportionnalité.",
   "autres": [
    "pourcent",
    "hausse",
    "echelle"
   ]
  },
  {
   "id": "o59",
   "chap": "prop",
   "enonce": "Calculer $15\\,\\%$ de 240 €.",
   "bon": "pourcent",
   "explication": "$\\dfrac{15}{100} \\times 240 = 36$ €.",
   "autres": [
    "hausse",
    "baisse",
    "echelle"
   ]
  },
  {
   "id": "o60",
   "chap": "prop",
   "enonce": "Un loyer de 600 € augmente de $5\\,\\%$. Quel est le nouveau loyer ?",
   "bon": "hausse",
   "explication": "On multiplie par 1,05 : 630 €.",
   "autres": [
    "baisse",
    "echelle",
    "prop-def"
   ]
  },
  {
   "id": "o61",
   "chap": "prop",
   "enonce": "Sur une carte à l'échelle $\\dfrac{1}{200\\,000}$, deux villes sont distantes de 4 cm. Quelle est la distance réelle ?",
   "bon": "echelle",
   "explication": "$4 \\times 200\\,000 = 800\\,000$ cm, soit 8 km.",
   "autres": [
    "pourcent",
    "vitesse",
    "hausse"
   ]
  },
  {
   "id": "o62",
   "chap": "equ",
   "enonce": "Résoudre $5x - 3 = 12$.",
   "bon": "equ-regle",
   "explication": "On ajoute 3 aux deux membres : $5x = 15$, puis on divise par 5 : $x = 3$.",
   "autres": [
    "equ-def",
    "priorites",
    "frac-div"
   ]
  },
  {
   "id": "o63",
   "chap": "puis",
   "enonce": "Écrire $3^{-2}$ sous forme de fraction.",
   "bon": "puiss-neg",
   "explication": "$3^{-2} = \\dfrac{1}{3^{2}} = \\dfrac{1}{9}$.",
   "autres": [
    "puiss-zero",
    "puiss-prod",
    "rel-oppose"
   ]
  },
  {
   "id": "o64",
   "chap": "puis",
   "enonce": "Écrire $10^{-4}$ sous forme décimale.",
   "bon": "dix-puiss",
   "explication": "$10^{-4} = 0{,}0001$ (le 1 est au 4e rang après la virgule).",
   "autres": [
    "sci-def",
    "puiss-zero",
    "puiss-signe"
   ]
  },
  {
   "id": "o65",
   "chap": "sci",
   "enonce": "Écrire $(2 \\times 10^{3}) \\times (4 \\times 10^{5})$ en notation scientifique.",
   "bon": "sci-prod",
   "explication": "$2 \\times 4 = 8$ et $10^{3} \\times 10^{5} = 10^{8}$ : $8 \\times 10^{8}$.",
   "autres": [
    "sci-def",
    "puiss-quot",
    "dix-puiss"
   ]
  },
  {
   "id": "o66",
   "chap": "sci",
   "enonce": "Écrire 45 000 000 en notation scientifique.",
   "bon": "sci-def",
   "explication": "On cherche $a \\times 10^{n}$ avec $1 \\leq a < 10$ : $4{,}5 \\times 10^{7}$.",
   "autres": [
    "dix-puiss",
    "puiss-prod",
    "puiss-neg"
   ]
  },
  {
   "id": "o67",
   "chap": "puis",
   "enonce": "Le nombre $(-5)^{7}$ est-il positif ou négatif ?",
   "bon": "puiss-signe",
   "explication": "L'exposant 7 est impair : le résultat est négatif.",
   "autres": [
    "puiss-zero",
    "puiss-neg",
    "puiss-def"
   ]
  },
  {
   "id": "o68",
   "chap": "gc",
   "enonce": "Un guépard court à 108 km/h. Quelle est sa vitesse en m/s ?",
   "bon": "kmh-ms",
   "explication": "On divise par 3,6 : 30 m/s.",
   "autres": [
    "vitesse",
    "duree",
    "distance"
   ]
  },
  {
   "id": "o69",
   "chap": "gc",
   "enonce": "Un film dure 2,25 h. L'exprimer en heures et minutes.",
   "bon": "duree",
   "explication": "0,25 h $= 15$ min : 2 h 15 min.",
   "autres": [
    "temps",
    "kmh-ms",
    "vitesse"
   ]
  },
  {
   "id": "o70",
   "chap": "pre",
   "enonce": "Un prisme droit a pour base un triangle d'aire 15 cm² et pour hauteur 8 cm. Quel est son volume ?",
   "bon": "vol-prisme",
   "explication": "Prisme droit : $B \\times h = 15 \\times 8 = 120$ cm³.",
   "autres": [
    "vol-pave",
    "aire-tri",
    "aire-disque"
   ]
  },
  {
   "id": "o71",
   "chap": "pre",
   "enonce": "Un parallélogramme a une base de 10 cm et une hauteur de 4 cm. Quelle est son aire ?",
   "bon": "aire-para",
   "explication": "Base × hauteur : 40 cm².",
   "autres": [
    "aire-tri",
    "aire-rect",
    "aire-disque"
   ]
  },
  {
   "id": "o72",
   "chap": "pre",
   "enonce": "Un triangle a une base de 9 cm et une hauteur de 4 cm. Quelle est son aire ?",
   "bon": "aire-tri",
   "explication": "Base × hauteur ÷ 2 : 18 cm².",
   "autres": [
    "aire-para",
    "aire-rect",
    "aire-disque"
   ]
  },
  {
   "id": "o73",
   "chap": "proba",
   "enonce": "Un sac contient 4 boules jaunes et 6 noires. Quelle est la probabilité de tirer une boule jaune ?",
   "bon": "proba-f",
   "explication": "$\\dfrac{4}{10} = 0{,}4$ (équiprobabilité).",
   "autres": [
    "frequence",
    "proba-contraire",
    "moyenne"
   ]
  },
  {
   "id": "o74",
   "chap": "proba",
   "enonce": "Un dé a été lancé 6 000 fois : le 6 est sorti 1 010 fois. Que peut-on en dire ?",
   "bon": "proba-freq",
   "explication": "La fréquence ($\\approx 0{,}168$) est proche de la probabilité théorique $\\dfrac{1}{6}$ quand le nombre d'expériences est grand.",
   "autres": [
    "proba-f",
    "proba-contraire",
    "frequence"
   ]
  }
 ]
});
