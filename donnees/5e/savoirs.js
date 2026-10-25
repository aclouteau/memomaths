// Savoirs de 5e : généré à partir des leçons de 5e (2026-2027). Notation $…$ = LaTeX (KaTeX).
Savoirs.enregistrer({
 "id": "5e",
 "titre": "Savoirs de 5e",
 "niveau": "5e",
 "chapitres": [
  {
   "id": "pre",
   "titre": "Acquis de 6e",
   "ordre": 0,
   "annee": "6e"
  },
  {
   "id": "rel1",
   "titre": "Nombres relatifs : repérage et comparaison",
   "ordre": 1,
   "annee": "5e"
  },
  {
   "id": "ench",
   "titre": "Enchaînements d'opérations",
   "ordre": 2,
   "annee": "5e"
  },
  {
   "id": "tri",
   "titre": "Triangle : constructions et droites remarquables",
   "ordre": 3,
   "annee": "5e"
  },
  {
   "id": "puis",
   "titre": "Puissances : carré et cube",
   "ordre": 4,
   "annee": "5e"
  },
  {
   "id": "sym",
   "titre": "Symétrie centrale",
   "ordre": 5,
   "annee": "5e"
  },
  {
   "id": "lit",
   "titre": "Calcul littéral",
   "ordre": 6,
   "annee": "5e"
  },
  {
   "id": "aire",
   "titre": "Aire du triangle, du parallélogramme et du disque",
   "ordre": 7,
   "annee": "5e"
  },
  {
   "id": "div",
   "titre": "Divisibilité",
   "ordre": 8,
   "annee": "5e"
  },
  {
   "id": "rat1",
   "titre": "Nombres rationnels : fractions, comparaison, pourcentages",
   "ordre": 9,
   "annee": "5e"
  },
  {
   "id": "ang",
   "titre": "Angles et parallélisme",
   "ordre": 10,
   "annee": "5e"
  },
  {
   "id": "rel2",
   "titre": "Opérations sur les nombres relatifs",
   "ordre": 11,
   "annee": "5e"
  },
  {
   "id": "sol",
   "titre": "Solides et volumes",
   "ordre": 12,
   "annee": "5e"
  },
  {
   "id": "rat2",
   "titre": "Nombres rationnels : addition et soustraction",
   "ordre": 13,
   "annee": "5e"
  },
  {
   "id": "prop",
   "titre": "Proportionnalité",
   "ordre": 14,
   "annee": "5e"
  },
  {
   "id": "equ",
   "titre": "Équations",
   "ordre": 15,
   "annee": "5e"
  },
  {
   "id": "para",
   "titre": "Parallélogrammes",
   "ordre": 16,
   "annee": "5e"
  },
  {
   "id": "don",
   "titre": "Traitement de données",
   "ordre": 17,
   "annee": "5e"
  },
  {
   "id": "fonc",
   "titre": "Fonctions : premiers pas",
   "ordre": 18,
   "annee": "5e"
  },
  {
   "id": "proba",
   "titre": "Probabilités",
   "ordre": 19,
   "annee": "5e"
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
     "correction": "$7 \\times 4 = 28$ cm²"
    }
   ]
  },
  {
   "id": "perim-rect",
   "chap": "pre",
   "type": "formule",
   "titre": "Périmètre d'un rectangle",
   "question": "Périmètre d'un rectangle de longueur $L$ et de largeur $\\ell$ ?",
   "reponse": "$P = 2 \\times (L + \\ell)$",
   "pieges": [
    "$P = L \\times \\ell$",
    "$P = L + \\ell$",
    "$P = 2 \\times L \\times \\ell$"
   ],
   "exemples": [
    {
     "donnees": "$L = 7$ cm et $\\ell = 4$ cm",
     "question": "Périmètre ?",
     "reponse": 22,
     "unite": "cm",
     "correction": "$2 \\times (7 + 4) = 22$ cm"
    }
   ],
   "morceaux": [
    "P",
    "=",
    "2",
    "\\times",
    "(",
    "L",
    "+",
    "\\ell",
    ")"
   ],
   "intrus": [
    "\\times",
    "4"
   ]
  },
  {
   "id": "aire-carre",
   "chap": "pre",
   "type": "formule",
   "titre": "Aire d'un carré",
   "question": "Aire d'un carré de côté $c$ ?",
   "reponse": "$\\mathcal{A} = c \\times c = c^{2}$",
   "pieges": [
    "$\\mathcal{A} = 4 \\times c$",
    "$\\mathcal{A} = 2 \\times c$",
    "$\\mathcal{A} = c + c$"
   ],
   "exemples": [
    {
     "donnees": "$c = 6$ cm",
     "question": "Aire ?",
     "reponse": 36,
     "unite": "cm²",
     "correction": "$6 \\times 6 = 36$ cm²"
    }
   ],
   "morceaux": [
    "\\mathcal{A}",
    "=",
    "c",
    "\\times",
    "c"
   ],
   "intrus": [
    "+",
    "4"
   ]
  },
  {
   "id": "diametre",
   "chap": "pre",
   "type": "definition",
   "titre": "Rayon et diamètre",
   "question": "Le diamètre d'un cercle vaut ...",
   "reponse": "deux fois son rayon",
   "pieges": [
    "la moitié de son rayon",
    "son rayon plus 2",
    "le carré de son rayon"
   ]
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
   "id": "axe-sym",
   "chap": "pre",
   "type": "definition",
   "titre": "Symétrie axiale",
   "question": "Les points $M$ et $M'$ sont symétriques par rapport à une droite $(d)$ si ...",
   "reponse": "$(d)$ est la médiatrice du segment $[MM']$",
   "pieges": [
    "$(d)$ passe par $M$",
    "$M$ est le milieu de $[M M']$",
    "$(d)$ est parallèle à $(MM')$"
   ]
  },
  {
   "id": "vol-pave6",
   "chap": "pre",
   "type": "formule",
   "titre": "Volume d'un pavé droit",
   "question": "Volume d'un pavé droit de longueur $L$, largeur $\\ell$, hauteur $h$ ?",
   "reponse": "$V = L \\times \\ell \\times h$",
   "pieges": [
    "$V = L + \\ell + h$",
    "$V = 2 \\times (L + \\ell + h)$",
    "$V = L \\times \\ell$"
   ]
  },
  {
   "id": "x10",
   "chap": "pre",
   "type": "regle",
   "titre": "Multiplier par 10, 100, 1 000",
   "question": "Pour multiplier un nombre décimal par 100, on ...",
   "reponse": "décale la virgule de 2 rangs vers la droite : $3{,}7 \\times 100 = 370$",
   "pieges": [
    "ajoute deux zéros à la fin : $3{,}7 \\times 100 = 3{,}700$",
    "décale la virgule de 2 rangs vers la gauche : 0,037",
    "ajoute 100 : 103,7"
   ]
  },
  {
   "id": "rel-oppose",
   "chap": "rel1",
   "type": "definition",
   "titre": "Opposé d'un nombre",
   "question": "Deux nombres sont opposés quand ...",
   "reponse": "leur somme vaut 0 : $a + (-a) = 0$",
   "pieges": [
    "leur produit vaut 1",
    "ils ont la même valeur absolue et le même signe",
    "ils sont à la même distance de 1"
   ],
   "note": "$-a$ n'est pas toujours négatif : si $a = -3$ alors $-a = 3$."
  },
  {
   "id": "rel-absolue",
   "chap": "rel1",
   "type": "definition",
   "titre": "Valeur absolue",
   "question": "La valeur absolue d'un nombre est ...",
   "reponse": "sa distance à 0 (le nombre privé de son signe)",
   "pieges": [
    "son opposé, c'est-à-dire le nombre de signe contraire",
    "le nombre précédé d'un signe $-$ ou d'un signe $+$",
    "son inverse, c'est-à-dire le nombre $1$ divisé par lui"
   ],
   "note": "La valeur absolue de $-5$ est 5, celle de 5 est 5."
  },
  {
   "id": "rel-comp",
   "chap": "rel1",
   "type": "regle",
   "titre": "Comparer des nombres négatifs",
   "question": "De deux nombres négatifs, le plus grand est celui ...",
   "reponse": "dont la valeur absolue est la plus petite ($-2 > -7$)",
   "pieges": [
    "dont la valeur absolue est la plus grande ($-7 > -2$)",
    "qui a le plus de chiffres",
    "qui est écrit en premier"
   ]
  },
  {
   "id": "coord",
   "chap": "rel1",
   "type": "regle",
   "titre": "Coordonnées d'un point",
   "question": "Les coordonnées d'un point s'écrivent dans l'ordre ...",
   "reponse": "$(\\text{abscisse} ; \\text{ordonnée})$ : d'abord l'axe horizontal",
   "pieges": [
    "$(\\text{ordonnée} ; \\text{abscisse})$ : d'abord l'axe vertical",
    "dans n'importe quel ordre, puisque les deux axes sont équivalents",
    "on met toujours le plus grand nombre en premier, puis le plus petit"
   ],
   "note": "$(3 ; -2)$ et $(-2 ; 3)$ ne sont pas le même point."
  },
  {
   "id": "rel-def",
   "chap": "rel1",
   "type": "definition",
   "titre": "Nombre relatif",
   "question": "Un nombre relatif est un nombre ...",
   "reponse": "précédé d'un signe $+$ ou $-$, qui dit de quel côté de zéro il est",
   "pieges": [
    "toujours précédé d'un signe $-$, qui dit seulement que ce nombre est négatif",
    "toujours écrit sans aucun signe quand il est plus grand que zéro, sinon avec une virgule",
    "toujours écrit sans virgule, qu'il soit positif ou qu'il soit négatif"
   ],
   "note": "Exemples : $+3$ et $-3$ sont deux nombres relatifs à la même distance de 0, de part et d'autre."
  },
  {
   "id": "rel-zero",
   "chap": "rel1",
   "type": "propriete",
   "titre": "Le nombre 0",
   "question": "Le nombre $0$ est ...",
   "reponse": "à la fois positif et négatif, et son opposé est lui-même",
   "pieges": [
    "positif seulement, et son opposé est le nombre négatif qui est juste à côté",
    "négatif seulement, et son opposé est le nombre positif qui est juste à côté",
    "ni positif ni négatif, et il n'a donc aucun opposé"
   ],
   "note": "On écrit simplement $0$, jamais $+0$ ni $-0$."
  },
  {
   "id": "rel-opp-opp",
   "chap": "rel1",
   "type": "propriete",
   "titre": "Opposé de l'opposé",
   "question": "L'opposé de l'opposé d'un nombre $a$ est ...",
   "reponse": "ce nombre $a$ lui-même : $-(-a) = a$",
   "pieges": [
    "l'opposé de $a$ : $-(-a) = -a$",
    "toujours un nombre négatif quel que soit $a$",
    "toujours égal à $0$ quel que soit $a$"
   ],
   "note": "Exemple : l'opposé de $-5$ est $5$, et l'opposé de $5$ est de nouveau $-5$."
  },
  {
   "id": "rel-abs-opp",
   "chap": "rel1",
   "type": "propriete",
   "titre": "Opposés et valeur absolue",
   "question": "Deux nombres opposés ont ...",
   "reponse": "la même valeur absolue et des signes contraires",
   "pieges": [
    "la même valeur absolue et le même signe",
    "des valeurs absolues différentes et le même signe",
    "des valeurs absolues différentes et des signes contraires"
   ],
   "note": "Exemple : $7$ et $-7$ sont à la même distance de 0, soit $7$."
  },
  {
   "id": "rel-comp-pos",
   "chap": "rel1",
   "type": "regle",
   "titre": "Comparer un positif et un négatif",
   "question": "De deux nombres de signes contraires, le plus grand est ...",
   "reponse": "le nombre positif (par exemple $-8 < 3$)",
   "pieges": [
    "celui qui a la plus grande valeur absolue (par exemple $-8 < 3$ est faux)",
    "le nombre négatif, car on lit le signe en premier",
    "celui qui s'écrit avec le moins de chiffres"
   ],
   "note": "Sur une droite graduée, les nombres négatifs sont à gauche de 0 et les nombres positifs à droite."
  },
  {
   "id": "rel-dist",
   "chap": "rel1",
   "type": "formule",
   "titre": "Distance entre deux points",
   "question": "Sur une droite graduée, la distance entre deux points d'abscisses $a$ et $b$ (avec $a < b$) est ...",
   "reponse": "$b - a$ (la plus grande abscisse moins la plus petite)",
   "pieges": [
    "$a - b$ (la plus petite abscisse moins la plus grande)",
    "$a + b$ (la somme des deux abscisses)",
    "$a \\times b$ (le produit des deux abscisses)"
   ],
   "note": "Si $a$ et $b$ sont de signes contraires, on peut aussi ajouter leurs valeurs absolues : de $-3$ à $4$, la distance est $3 + 4 = 7$."
  },
  {
   "id": "rel-entier-voisin",
   "chap": "rel1",
   "type": "regle",
   "titre": "Encadrer par des entiers",
   "question": "Le plus grand entier relatif inférieur à $-3{,}2$ est ...",
   "reponse": "$-4$ (et non $-3$, car $-3 > -3{,}2$)",
   "pieges": [
    "$-3$ (la partie entière sans le signe)",
    "$-3{,}3$ (le décimal qui suit)",
    "$4$ (la valeur absolue arrondie)"
   ],
   "note": "Pour un nombre négatif, l'entier inférieur est plus éloigné de zéro que la partie entière."
  },
  {
   "id": "rel-coord-signe",
   "chap": "rel1",
   "type": "regle",
   "titre": "Position selon les signes",
   "question": "Un point d'abscisse négative et d'ordonnée positive est situé ...",
   "reponse": "à gauche de l'axe des ordonnées et au-dessus de l'axe des abscisses",
   "pieges": [
    "à droite de l'axe des ordonnées et au-dessus de l'axe des abscisses",
    "à gauche de l'axe des ordonnées et en dessous de l'axe des abscisses",
    "à droite de l'axe des ordonnées et en dessous de l'axe des abscisses"
   ],
   "note": "L'abscisse se lit sur l'axe horizontal, l'ordonnée sur l'axe vertical."
  },
  {
   "id": "priorites",
   "chap": "ench",
   "type": "regle",
   "titre": "Priorités opératoires",
   "question": "Dans un calcul, quel est l'ordre des priorités ?",
   "reponse": "parenthèses, puis multiplications et divisions, puis additions et soustractions",
   "pieges": [
    "additions et soustractions, puis multiplications et divisions, puis parenthèses",
    "toujours de gauche à droite, sans aucune priorité",
    "multiplications, puis parenthèses, puis divisions, puis additions"
   ],
   "note": "À priorité égale, on calcule de gauche à droite.",
   "exemples": [
    {
     "donnees": "Calculer $5 + 3 \\times 2$",
     "question": "Résultat ?",
     "reponse": 11,
     "unite": "",
     "correction": "$5 + 3 \\times 2 = 5 + 6 = 11$"
    },
    {
     "donnees": "Calculer $36 \\div 6 \\times 3$",
     "question": "Résultat ?",
     "reponse": 18,
     "unite": "",
     "correction": "À priorité égale, de gauche à droite : $6 \\times 3 = 18$"
    }
   ]
  },
  {
   "id": "ecriture-egal",
   "chap": "ench",
   "type": "regle",
   "titre": "Écrire une suite de calculs",
   "question": "Pour poser un calcul en plusieurs étapes, on ...",
   "reponse": "écrit une ligne par étape, avec le signe $=$ seulement entre deux écritures égales",
   "pieges": [
    "enchaîne tous les résultats avec des signes $=$ sur une seule ligne, même quand ils sont différents",
    "n'écrit que le résultat final, sans montrer les étapes intermédiaires",
    "écrit les étapes dans le désordre, en commençant par la dernière opération"
   ],
   "note": "« 3 + 4 = 7 × 2 = 14 » est faux : 3 + 4 n'est pas égal à 14."
  },
  {
   "id": "ench-gauche",
   "chap": "ench",
   "type": "regle",
   "titre": "Opérations de même priorité",
   "question": "Dans un calcul sans parenthèses qui ne contient que des additions et soustractions (ou que des multiplications et divisions), on calcule ...",
   "reponse": "de gauche à droite : $20 - 8 + 3 = 12 + 3 = 15$",
   "pieges": [
    "de droite à gauche : $20 - 8 + 3 = 20 - 11 = 9$",
    "toujours les additions avant les soustractions : $20 - 8 + 3 = 23 - 8 = 15$ par chance",
    "dans n'importe quel ordre, le résultat est toujours le même"
   ],
   "note": "Pour $24 \\div 4 \\times 3$ : $24 \\div 4 = 6$ puis $6 \\times 3 = 18$ (et non $24 \\div 12 = 2$)."
  },
  {
   "id": "ench-paren",
   "chap": "ench",
   "type": "regle",
   "titre": "Parenthèses",
   "question": "Dans un calcul avec des parenthèses, on commence par ...",
   "reponse": "calculer ce qui est entre parenthèses (en commençant par les plus intérieures)",
   "pieges": [
    "calculer les multiplications d'abord, même s'il y a des parenthèses dans le calcul",
    "calculer les additions d'abord, car elles sont plus simples que le reste",
    "calculer de gauche à droite sans s'occuper des parenthèses du calcul"
   ],
   "note": "Avec des parenthèses imbriquées, on utilise parfois des crochets pour mieux les distinguer."
  },
  {
   "id": "ench-implicite",
   "chap": "ench",
   "type": "regle",
   "titre": "Signe × sous-entendu",
   "question": "Quand un nombre est directement devant une parenthèse, comme dans $3(2 + 5)$, cela signifie ...",
   "reponse": "$3 \\times (2 + 5)$ : le signe $\\times$ est sous-entendu",
   "pieges": [
    "$3 + (2 + 5)$ : le signe $+$ est sous-entendu devant la parenthèse",
    "$32 + 5$ : on colle le $3$ au premier nombre de la parenthèse",
    "$3 - (2 + 5)$ : le signe $-$ est sous-entendu devant la parenthèse"
   ],
   "note": "On ne peut pas supprimer le signe $\\times$ entre deux nombres, mais on peut le supprimer devant une parenthèse ou une lettre."
  },
  {
   "id": "ench-barre",
   "chap": "ench",
   "type": "regle",
   "titre": "Barre de fraction",
   "question": "Dans $\\dfrac{3 + 9}{2 + 2}$, la barre de fraction signifie qu'on doit ...",
   "reponse": "calculer le numérateur et le dénominateur avant de diviser : $\\dfrac{12}{4} = 3$",
   "pieges": [
    "diviser d'abord $9$ par $2$, puis additionner : $3 + 4{,}5 + 2$ pour finir",
    "calculer seulement le numérateur : le dénominateur reste inchangé jusqu'à la fin",
    "diviser $3$ par $2$ et $9$ par $2$ séparément, sans aucune parenthèse nulle part"
   ],
   "note": "La barre de fraction joue le rôle de parenthèses : $\\dfrac{3 + 9}{2 + 2} = (3 + 9) \\div (2 + 2)$."
  },
  {
   "id": "ench-assoc",
   "chap": "ench",
   "type": "regle",
   "titre": "Calcul astucieux",
   "question": "Pour calculer $25 \\times 17 \\times 4$ astucieusement, on ...",
   "reponse": "regroupe $25 \\times 4 = 100$, car on peut changer l'ordre",
   "pieges": [
    "calcule $25 \\times 17$ puis $\\times 4$, car l'ordre des nombres est imposé",
    "ajoute $25$ et $4$ avant de multiplier le résultat par $17$",
    "ne peut pas changer l'ordre des nombres, car il y en a trois dans le produit"
   ],
   "note": "Une multiplication peut se faire dans n'importe quel ordre, comme une addition : $25 \\times 17 \\times 4 = 25 \\times 4 \\times 17 = 1\\,700$."
  },
  {
   "id": "ench-noncomm",
   "chap": "ench",
   "type": "propriete",
   "titre": "Soustraction et division",
   "question": "La soustraction et la division sont-elles commutatives (peut-on changer l'ordre des nombres) ?",
   "reponse": "non : $8 - 3 \\neq 3 - 8$ et $8 \\div 2 \\neq 2 \\div 8$",
   "pieges": [
    "oui, toutes les deux : $8 - 3 = 3 - 8$ et $8 \\div 2 = 2 \\div 8$",
    "seulement la soustraction, puisque $8 - 3 = 3 - 8$ en valeur absolue",
    "seulement la division, puisque $8 \\div 2 = 2 \\div 8$ en valeur absolue"
   ],
   "note": "Seules l'addition et la multiplication sont commutatives."
  },
  {
   "id": "ench-div-dec",
   "chap": "ench",
   "type": "regle",
   "titre": "Diviser par un décimal",
   "question": "Pour diviser par un décimal, comme $12 \\div 0{,}25$, on ...",
   "reponse": "multiplie le dividende et le diviseur par 100 : $1\\,200 \\div 25 = 48$",
   "pieges": [
    "multiplie seulement le diviseur par 100 : $12 \\div 25 = 0{,}48$",
    "divise seulement le dividende par 100 : $0{,}12 \\div 0{,}25 = 0{,}48$",
    "ajoute 100 au dividende et au diviseur : $112 \\div 100{,}25$"
   ],
   "note": "Le quotient ne change pas quand on multiplie le dividende et le diviseur par le même nombre."
  },
  {
   "id": "tri-iso",
   "chap": "tri",
   "type": "definition",
   "titre": "Triangle isocèle et équilatéral",
   "question": "Un triangle isocèle est un triangle qui a ...",
   "reponse": "deux côtés de même longueur",
   "pieges": [
    "trois côtés de même longueur",
    "un angle droit",
    "deux côtés parallèles"
   ],
   "note": "Équilatéral : trois côtés de même longueur (il est aussi isocèle)."
  },
  {
   "id": "tri-ang",
   "chap": "tri",
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
   "id": "tri-ineg",
   "chap": "tri",
   "type": "propriete",
   "titre": "Inégalité triangulaire",
   "question": "Pour construire un triangle, il faut que le plus grand côté soit ...",
   "reponse": "plus petit que la somme des deux autres",
   "pieges": [
    "plus grand que la somme des deux autres",
    "plus petit que chacun des deux autres",
    "égal au double du plus petit"
   ],
   "note": "3 cm, 4 cm et 8 cm : impossible car 8 > 3 + 4. S'il est égal à la somme des deux autres, le « triangle » est aplati : ses trois sommets sont alignés."
  },
  {
   "id": "tri-circ",
   "chap": "tri",
   "type": "definition",
   "titre": "Cercle circonscrit",
   "question": "Le centre du cercle circonscrit à un triangle est ...",
   "reponse": "le point de rencontre des trois médiatrices des côtés",
   "pieges": [
    "le point de rencontre des trois hauteurs du triangle",
    "le milieu du plus grand côté du triangle",
    "le point de rencontre des trois bissectrices du triangle"
   ]
  },
  {
   "id": "tri-hauteur",
   "chap": "tri",
   "type": "definition",
   "titre": "Hauteur d'un triangle",
   "question": "Une hauteur d'un triangle est une droite qui ...",
   "reponse": "passe par un sommet et est perpendiculaire à la droite qui porte le côté opposé",
   "pieges": [
    "passe par un sommet et par le milieu du côté opposé à ce sommet (c'est une médiane)",
    "passe par le milieu d'un côté et lui est perpendiculaire (c'est une médiatrice)",
    "passe par un sommet et est parallèle à la droite qui porte le côté opposé"
   ],
   "note": "Une hauteur peut être à l'extérieur du triangle."
  },
  {
   "id": "tri-equi",
   "chap": "tri",
   "type": "propriete",
   "titre": "Triangle équilatéral",
   "question": "Dans un triangle équilatéral, chaque angle mesure ...",
   "reponse": "$60^{\\circ}$ (car $180 \\div 3 = 60$)",
   "pieges": [
    "$45^{\\circ}$ (car il y a trois côtés égaux)",
    "$90^{\\circ}$ (car il y a un angle droit)",
    "$30^{\\circ}$ (car $180 \\div 6 = 30$)"
   ],
   "note": "Un triangle équilatéral a trois côtés égaux et trois angles égaux."
  },
  {
   "id": "tri-iso-ang",
   "chap": "tri",
   "type": "propriete",
   "titre": "Angles d'un triangle isocèle",
   "question": "Dans un triangle isocèle, les deux angles à la base sont ...",
   "reponse": "égaux (les angles opposés aux côtés égaux)",
   "pieges": [
    "supplémentaires (leur somme vaut $180^{\\circ}$)",
    "complémentaires (leur somme vaut $90^{\\circ}$)",
    "égaux à l'angle au sommet principal"
   ],
   "note": "Si l'angle au sommet vaut $40^{\\circ}$, chaque angle à la base vaut $(180 - 40) \\div 2 = 70^{\\circ}$."
  },
  {
   "id": "tri-rect-ang",
   "chap": "tri",
   "type": "propriete",
   "titre": "Triangle rectangle",
   "question": "Dans un triangle rectangle, les deux angles aigus ont pour somme ...",
   "reponse": "$90^{\\circ}$ (ils sont complémentaires)",
   "pieges": [
    "$180^{\\circ}$ (ils sont supplémentaires)",
    "$45^{\\circ}$ (ils sont toujours égaux)",
    "$100^{\\circ}$ (ils sont toujours complémentaires)"
   ],
   "note": "Exemple : si un angle aigu vaut $35^{\\circ}$, l'autre vaut $90 - 35 = 55^{\\circ}$."
  },
  {
   "id": "tri-med",
   "chap": "tri",
   "type": "propriete",
   "titre": "Propriété de la médiatrice",
   "question": "Si un point $M$ est sur la médiatrice d'un segment $[AB]$, alors ...",
   "reponse": "$M$ est à égale distance des extrémités : $MA = MB$",
   "pieges": [
    "$M$ est le milieu du segment : $MA = MB = \\dfrac{AB}{2}$",
    "$M$ est aligné avec $A$ et $B$ : $MA + MB = AB$",
    "$M$ est à égale distance de $A$ et de $B$ seulement s'il est sur $[AB]$"
   ],
   "note": "Réciproque : un point équidistant de $A$ et $B$ est sur la médiatrice de $[AB]$."
  },
  {
   "id": "tri-ortho",
   "chap": "tri",
   "type": "propriete",
   "titre": "Concours des hauteurs",
   "question": "Les trois hauteurs d'un triangle ...",
   "reponse": "se coupent en un même point, appelé orthocentre",
   "pieges": [
    "sont toujours parallèles entre elles dans un triangle",
    "se coupent toujours au centre du cercle circonscrit",
    "se coupent toujours à l'intérieur du triangle, au milieu"
   ],
   "note": "Dans un triangle obtusangle, l'orthocentre est à l'extérieur du triangle."
  },
  {
   "id": "tri-med-conc",
   "chap": "tri",
   "type": "propriete",
   "titre": "Concours des médiatrices",
   "question": "Les trois médiatrices d'un triangle ...",
   "reponse": "se coupent en un même point, centre du cercle circonscrit",
   "pieges": [
    "se coupent en un même point, centre du cercle inscrit dans le triangle",
    "sont toujours parallèles deux à deux, comme les rails du train",
    "se coupent en trois points différents à l'intérieur du triangle"
   ],
   "note": "Ce point est à égale distance des trois sommets : $OA = OB = OC$."
  },
  {
   "id": "tri-aplati",
   "chap": "tri",
   "type": "propriete",
   "titre": "Triangle aplati",
   "question": "Si le plus grand côté d'un triangle est égal à la somme des deux autres, alors ...",
   "reponse": "les trois points sont alignés : pas de vrai triangle",
   "pieges": [
    "le triangle existe, mais il est forcément rectangle en un des sommets",
    "le triangle existe, mais il est forcément isocèle en un des sommets",
    "on peut le construire en dessinant un triangle très allongé et très fin"
   ],
   "note": "Exemple : $AB = 3$, $BC = 4$, $AC = 7$ : $B$ est sur le segment $[AC]$."
  },
  {
   "id": "carre-def",
   "chap": "puis",
   "type": "definition",
   "titre": "Carré et cube",
   "question": "$a^{2}$ et $a^{3}$ signifient ...",
   "reponse": "$a^{2} = a \\times a$ et $a^{3} = a \\times a \\times a$",
   "pieges": [
    "$a^{2} = a \\times 2$ et $a^{3} = a \\times 3$ : on multiplie par l'exposant",
    "$a^{2} = a + a$ et $a^{3} = a + a + a$ : on additionne le nombre",
    "$a^{2} = 2^{a}$ et $a^{3} = 3^{a}$ : on échange le nombre et l'exposant"
   ],
   "morceaux": [
    "a^{2}",
    "=",
    "a",
    "\\times",
    "a"
   ],
   "intrus": [
    "a",
    "\\times",
    "2",
    "+"
   ],
   "exemples": [
    {
     "donnees": "Calculer $5^{2}$",
     "question": "Résultat ?",
     "reponse": 25,
     "unite": "",
     "correction": "$5^{2} = 5 \\times 5 = 25$"
    },
    {
     "donnees": "Calculer $4^{3}$",
     "question": "Résultat ?",
     "reponse": 64,
     "unite": "",
     "correction": "$4 \\times 4 \\times 4 = 64$"
    }
   ]
  },
  {
   "id": "carres-parfaits",
   "chap": "puis",
   "type": "regle",
   "titre": "Carrés parfaits",
   "question": "$12^{2}$ vaut ...",
   "reponse": "144",
   "pieges": [
    "24",
    "122",
    "132"
   ],
   "exemples": [
    {
     "donnees": "Calculer $9^{2}$",
     "question": "Résultat ?",
     "reponse": 81,
     "unite": "",
     "correction": "$9 \\times 9 = 81$"
    }
   ]
  },
  {
   "id": "puiss-prior",
   "chap": "puis",
   "type": "regle",
   "titre": "Puissance et priorités",
   "question": "$2 \\times 5^{2}$ vaut ...",
   "reponse": "50",
   "pieges": [
    "100",
    "20",
    "12"
   ],
   "note": "On calcule la puissance avant le produit : $2 \\times 25 = 50$."
  },
  {
   "id": "puis-carres-liste",
   "chap": "puis",
   "type": "regle",
   "titre": "Carrés à connaître",
   "question": "Les carrés de 13, 14 et 15 valent ...",
   "reponse": "$13^{2} = 169$ ; $14^{2} = 196$ ; $15^{2} = 225$",
   "pieges": [
    "$13^{2} = 156$ ; $14^{2} = 186$ ; $15^{2} = 215$",
    "$13^{2} = 169$ ; $14^{2} = 192$ ; $15^{2} = 225$",
    "$13^{2} = 26$ ; $14^{2} = 28$ ; $15^{2} = 30$"
   ],
   "note": "On peut aussi calculer $13 \\times 13 = 13 \\times 10 + 13 \\times 3 = 130 + 39 = 169$."
  },
  {
   "id": "puis-dix",
   "chap": "puis",
   "type": "regle",
   "titre": "Puissances de 10",
   "question": "$10^{2}$ et $10^{3}$ valent ...",
   "reponse": "$10^{2} = 100$ et $10^{3} = 1\\,000$",
   "pieges": [
    "$10^{2} = 20$ et $10^{3} = 30$",
    "$10^{2} = 1\\,000$ et $10^{3} = 100$",
    "$10^{2} = 100$ et $10^{3} = 10\\,000$"
   ],
   "note": "L'exposant donne le nombre de zéros après le 1."
  },
  {
   "id": "puis-pas-double",
   "chap": "puis",
   "type": "regle",
   "titre": "Carré et double",
   "question": "Le carré d'un nombre est-il son double (par exemple $5^{2}$ et $2 \\times 5$) ?",
   "reponse": "non : $5^{2} = 25$ alors que $2 \\times 5 = 10$",
   "pieges": [
    "oui : $5^{2} = 2 \\times 5 = 10$ quel que soit le nombre",
    "oui : $5^{2} = 5 + 5 = 10$ dans tous les cas",
    "seulement pour 5 : $5^{2} = 10$, mais pas pour 6"
   ],
   "note": "Le carré et le double ne sont égaux que pour le nombre 2 (et pour 0) : $2^{2} = 2 \\times 2 = 4$."
  },
  {
   "id": "puis-dec",
   "chap": "puis",
   "type": "regle",
   "titre": "Carré d'un décimal",
   "question": "$0{,}3^{2}$ vaut ...",
   "reponse": "$0{,}09$ (on calcule $3 \\times 3 = 9$ puis on place deux décimales)",
   "pieges": [
    "$0{,}9$ (on garde un seul chiffre après la virgule du nombre)",
    "$0{,}6$ (on double le nombre au lieu de le multiplier par lui-même)",
    "$9$ (on oublie complètement la virgule dans le résultat du calcul)"
   ],
   "note": "Le carré d'un décimal a deux fois plus de chiffres après la virgule : $1{,}2^{2} = 1{,}44$."
  },
  {
   "id": "puis-aire-carre",
   "chap": "puis",
   "type": "formule",
   "titre": "Aire d'un carré",
   "question": "L'aire d'un carré de côté $c$ s'écrit ...",
   "reponse": "$c^{2}$ ; elle s'exprime en unités d'aire (cm², m²…)",
   "pieges": [
    "$2c$ ; elle s'exprime en unités de longueur (cm, m…)",
    "$4c$ ; elle s'exprime en unités de longueur (cm, m…)",
    "$c^{3}$ ; elle s'exprime en unités de volume (cm³, m³…)"
   ],
   "note": "Exemple : un carré de côté 7 cm a pour aire $7^{2} = 49$ cm²."
  },
  {
   "id": "puis-vol-cube",
   "chap": "puis",
   "type": "formule",
   "titre": "Volume d'un cube",
   "question": "Le volume d'un cube d'arête $a$ s'écrit ...",
   "reponse": "$a^{3}$ ; il s'exprime en unités de volume (cm³, m³…)",
   "pieges": [
    "$3a$ ; il s'exprime en unités de longueur (cm, m…) comme l'arête",
    "$6a^{2}$ ; il s'exprime en unités d'aire (cm², m²…) comme la surface",
    "$a^{2}$ ; il s'exprime en unités d'aire (cm², m²…) comme un carré"
   ],
   "note": "Exemple : un cube d'arête 4 cm a pour volume $4^{3} = 64$ cm³."
  },
  {
   "id": "puis-cubes",
   "chap": "puis",
   "type": "regle",
   "titre": "Cubes à connaître",
   "question": "Les cubes de 2, 3, 4 et 5 valent ...",
   "reponse": "$2^{3} = 8$ ; $3^{3} = 27$ ; $4^{3} = 64$ ; $5^{3} = 125$",
   "pieges": [
    "$2^{3} = 6$ ; $3^{3} = 9$ ; $4^{3} = 12$ ; $5^{3} = 15$",
    "$2^{3} = 8$ ; $3^{3} = 27$ ; $4^{3} = 48$ ; $5^{3} = 125$",
    "$2^{3} = 8$ ; $3^{3} = 81$ ; $4^{3} = 64$ ; $5^{3} = 125$"
   ],
   "note": "Le seul cube exigible par cœur en 5e est $10^{3} = 1\\,000$ ; les autres se calculent ou se connaissent par habitude."
  },
  {
   "id": "puis-somme-carre",
   "chap": "puis",
   "type": "regle",
   "titre": "Carré d'une somme",
   "question": "$(2 + 3)^{2}$ est-il égal à $2^{2} + 3^{2}$ ?",
   "reponse": "non : $(2 + 3)^{2} = 25$ alors que $2^{2} + 3^{2} = 13$",
   "pieges": [
    "oui : $(2 + 3)^{2} = 2^{2} + 3^{2} = 13$ dans tous les cas",
    "oui : les deux écritures donnent toutes les deux 25",
    "oui : les deux écritures donnent toutes les deux 10"
   ],
   "note": "On commence par calculer la parenthèse : $(2 + 3)^{2} = 5^{2} = 25$."
  },
  {
   "id": "sc-def",
   "chap": "sym",
   "type": "definition",
   "titre": "Symétrique par rapport à un point",
   "question": "Le symétrique de $M$ par rapport à $O$ est le point $M'$ tel que ...",
   "reponse": "$O$ est le milieu du segment $[MM']$",
   "pieges": [
    "$(O M')$ est perpendiculaire à $(OM)$",
    "$OM' = 2 \\times OM$",
    "$M'$ est sur la médiatrice de $[OM]$"
   ]
  },
  {
   "id": "sc-cons",
   "chap": "sym",
   "type": "propriete",
   "titre": "Ce que conserve le demi-tour",
   "question": "La symétrie centrale conserve ...",
   "reponse": "les longueurs, l'alignement, les angles et les aires",
   "pieges": [
    "seulement les longueurs, mais ni les angles ni les aires",
    "les longueurs et les aires, mais pas les angles ni l'alignement",
    "la direction des droites uniquement, mais ni les longueurs ni les aires"
   ],
   "note": "L'image d'une droite est une droite parallèle."
  },
  {
   "id": "sc-centre",
   "chap": "sym",
   "type": "definition",
   "titre": "Centre de symétrie d'une figure",
   "question": "Une figure a un centre de symétrie $O$ si ...",
   "reponse": "elle est superposable à elle-même après un demi-tour autour de $O$",
   "pieges": [
    "elle est superposable à elle-même après un pliage suivant une droite quelconque",
    "elle a un angle droit en $O$ et deux côtés de même longueur",
    "$O$ est un sommet de la figure et le milieu d'un côté en même temps"
   ],
   "note": "Axe de symétrie : pliage. Centre de symétrie : demi-tour."
  },
  {
   "id": "sc-demi-tour",
   "chap": "sym",
   "type": "propriete",
   "titre": "Demi-tour",
   "question": "La symétrie centrale de centre $O$ correspond à ...",
   "reponse": "un demi-tour autour du point $O$",
   "pieges": [
    "un quart de tour autour du point $O$",
    "un pliage le long d'une droite passant par $O$",
    "un glissement qui déplace tous les points de la même longueur"
   ],
   "note": "Un demi-tour tourne la figure de $180^{\\circ}$ : l'image est « à l'envers »."
  },
  {
   "id": "sc-centre-fixe",
   "chap": "sym",
   "type": "propriete",
   "titre": "Image du centre",
   "question": "Le symétrique du centre $O$ par rapport à $O$ est ...",
   "reponse": "$O$ lui-même",
   "pieges": [
    "le point $O'$ placé à la même distance de $O$ dans l'autre direction",
    "le milieu du segment $[OO']$ où $O'$ est un point quelconque",
    "un point différent de $O$, toujours situé sur la médiatrice"
   ],
   "note": "Le centre est le seul point qui ne bouge pas."
  },
  {
   "id": "sc-droite",
   "chap": "sym",
   "type": "propriete",
   "titre": "Image d'une droite",
   "question": "L'image d'une droite par une symétrie centrale est ...",
   "reponse": "une droite parallèle à la droite de départ",
   "pieges": [
    "une droite perpendiculaire à la droite de départ",
    "une droite sécante à la droite de départ en $O$",
    "une demi-droite de même origine que la droite de départ"
   ],
   "note": "Si la droite passe par le centre $O$, son image est la même droite."
  },
  {
   "id": "sc-seg",
   "chap": "sym",
   "type": "propriete",
   "titre": "Image d'un segment",
   "question": "L'image d'un segment $[AB]$ par une symétrie centrale est ...",
   "reponse": "un segment $[A'B']$ de même longueur : $A'B' = AB$",
   "pieges": [
    "un segment $[A'B']$ deux fois plus long : $A'B' = 2 \\times AB$",
    "un segment $[A'B']$ de même longueur placé sur la même droite",
    "un segment $[A'B']$ de longueur différente, choisie librement"
   ],
   "note": "Les longueurs, les angles et les aires sont conservés."
  },
  {
   "id": "sc-cercle",
   "chap": "sym",
   "type": "propriete",
   "titre": "Image d'un cercle",
   "question": "L'image d'un cercle de centre $I$ et de rayon $r$ par une symétrie centrale est ...",
   "reponse": "un cercle de même rayon $r$, dont le centre est le symétrique de $I$",
   "pieges": [
    "un cercle de rayon $2r$, dont le centre est le symétrique de $I$ par rapport à $O$",
    "un cercle de même rayon $r$, dont le centre est toujours le même point $I$ de départ",
    "une ellipse dont les deux foyers sont le point $I$ et son symétrique par rapport à $O$"
   ],
   "note": "Si le centre $O$ est le centre du cercle, l'image est le cercle lui-même."
  },
  {
   "id": "sc-para",
   "chap": "sym",
   "type": "propriete",
   "titre": "Parallélogramme",
   "question": "Le centre de symétrie d'un parallélogramme est ...",
   "reponse": "le point d'intersection de ses diagonales (leur milieu commun)",
   "pieges": [
    "le point d'intersection de ses hauteurs (leur point commun) à l'intérieur",
    "le milieu d'un seul de ses côtés (le plus long des quatre côtés)",
    "l'un de ses sommets (celui de l'angle aigu le plus petit)"
   ],
   "note": "Un parallélogramme a un centre de symétrie, mais en général pas d'axe de symétrie."
  },
  {
   "id": "sc-figures",
   "chap": "sym",
   "type": "regle",
   "titre": "Figures à centre de symétrie",
   "question": "Parmi ces figures, lesquelles ont un centre de symétrie : le carré, le triangle équilatéral, le cercle ?",
   "reponse": "le carré et le cercle (pas le triangle équilatéral)",
   "pieges": [
    "le triangle équilatéral et le cercle (pas le carré)",
    "le carré et le triangle équilatéral (pas le cercle)",
    "les trois figures ont toutes un centre de symétrie"
   ],
   "note": "Un polygone régulier a un centre de symétrie si et seulement si son nombre de côtés est pair."
  },
  {
   "id": "sc-unique",
   "chap": "sym",
   "type": "propriete",
   "titre": "Un seul centre",
   "question": "Une figure peut avoir ...",
   "reponse": "au plus un centre de symétrie",
   "pieges": [
    "deux centres de symétrie au maximum, comme les axes de symétrie",
    "autant de centres de symétrie qu'elle a de côtés",
    "un nombre infini de centres de symétrie si elle est assez grande"
   ],
   "note": "Le cercle a un seul centre de symétrie (son centre), mais une infinité d'axes de symétrie."
  },
  {
   "id": "lit-double",
   "chap": "lit",
   "type": "regle",
   "titre": "Écrire une expression",
   "question": "Le triple d'un nombre $n$ s'écrit ...",
   "reponse": "$3n$",
   "pieges": [
    "$3 + n$",
    "$n^{3}$",
    "$n \\div 3$"
   ],
   "note": "$3n$ s'écrit aussi $3 \\times n$. Double : $2n$ ; moitié : $n \\div 2$ ; carré : $n \\times n$ ; successeur : $n + 1$."
  },
  {
   "id": "lit-distrib",
   "chap": "lit",
   "type": "regle",
   "titre": "Développer avec la distributivité",
   "question": "$3 \\times (x + 5)$ s'écrit ...",
   "reponse": "$3x + 15$",
   "pieges": [
    "$3x + 5$ : le facteur 3 ne multiplie que $x$",
    "$3 + 5x$ : le facteur 3 est ajouté à la parenthèse",
    "$x + 15$ : le facteur 3 ne multiplie que le nombre 5"
   ],
   "morceaux": [
    "3",
    "\\times",
    "(",
    "x",
    "+",
    "5",
    ")",
    "=",
    "3x",
    "+",
    "15"
   ],
   "intrus": [
    "5x",
    "+",
    "3x"
   ],
   "exemples": [
    {
     "donnees": "Pour $x = 2$, calculer $3 \\times (x + 5)$",
     "question": "Résultat ?",
     "reponse": 21,
     "unite": "",
     "correction": "$3 \\times (2 + 5) = 3 \\times 7 = 21$"
    }
   ]
  },
  {
   "id": "lit-reduire",
   "chap": "lit",
   "type": "regle",
   "titre": "Réduire une expression",
   "question": "$x + 4x$ vaut ...",
   "reponse": "$5x$",
   "pieges": [
    "$4x^{2}$",
    "$4x$",
    "$5x^{2}$"
   ],
   "note": "On regroupe seulement les termes de même nature : $3x + 2$ ne s'écrit pas $5x$.",
   "morceaux": [
    "x",
    "+",
    "4x",
    "=",
    "5x"
   ],
   "intrus": [
    "4x^{2}",
    "5x^{2}"
   ]
  },
  {
   "id": "lit-perim",
   "chap": "lit",
   "type": "formule",
   "titre": "Périmètre d'un rectangle en lettres",
   "question": "Le périmètre d'un rectangle de longueur $L$ et de largeur $\\ell$ vaut ...",
   "reponse": "$2 \\times (L + \\ell)$",
   "pieges": [
    "$L \\times \\ell$ : c'est la formule de l'aire du rectangle",
    "$2 \\times L + \\ell$ : on oublie de doubler la largeur",
    "$L + \\ell$ : on oublie de doubler la somme des côtés"
   ]
  },
  {
   "id": "lit-test",
   "chap": "lit",
   "type": "regle",
   "titre": "Prouver une égalité",
   "question": "Pour prouver qu'une égalité est toujours vraie, on ...",
   "reponse": "utilise le calcul littéral (une lettre)",
   "pieges": [
    "la teste avec une valeur et on conclut",
    "la teste avec deux valeurs et on conclut",
    "la mesure sur une figure"
   ],
   "note": "Un seul test ne suffit pas. $3n + 1 = 4n$ est vraie pour $n = 1$ seulement."
  },
  {
   "id": "lit-mult",
   "chap": "lit",
   "type": "regle",
   "titre": "Signe × sous-entendu",
   "question": "On peut supprimer le signe $\\times$ entre un nombre et une lettre : $3 \\times x$ s'écrit ...",
   "reponse": "$3x$ (et $x \\times x$ s'écrit $x^{2}$)",
   "pieges": [
    "$3 + x$ (et $x \\times x$ s'écrit $2x$)",
    "$x^{3}$ (et $x \\times x$ s'écrit $2x$)",
    "$3x$ (et $x \\times x$ s'écrit $2x$)"
   ],
   "note": "Le nombre s'écrit toujours devant la lettre : on écrit $3x$ et non $x3$."
  },
  {
   "id": "lit-valeur",
   "chap": "lit",
   "type": "regle",
   "titre": "Remplacer la lettre",
   "question": "Pour calculer $2x + 3$ quand $x = 4$, on ...",
   "reponse": "remplace $x$ par $4$ en gardant $\\times$ : $2 \\times 4 + 3 = 11$",
   "pieges": [
    "écrit $24 + 3 = 27$ en collant les deux chiffres ensemble",
    "écrit $2 + 4 + 3 = 9$ en additionnant tous les nombres de l'expression",
    "écrit $2 \\times (4 + 3) = 14$ en ajoutant des parenthèses au calcul"
   ],
   "note": "On rétablit le signe $\\times$ caché entre le nombre et la lettre : $2x$ devient $2 \\times 4$, pas $24$."
  },
  {
   "id": "lit-x2",
   "chap": "lit",
   "type": "regle",
   "titre": "Carré et double",
   "question": "Pour $x = 5$, $x^{2}$ et $2x$ valent ...",
   "reponse": "$x^{2} = 25$ et $2x = 10$ : ce ne sont pas les mêmes nombres",
   "pieges": [
    "$x^{2} = 10$ et $2x = 10$ : ce sont les mêmes nombres",
    "$x^{2} = 25$ et $2x = 25$ : ce sont les mêmes nombres",
    "$x^{2} = 10$ et $2x = 25$ : c'est l'inverse des vraies valeurs"
   ],
   "note": "$x^{2} = x \\times x$ alors que $2x = 2 \\times x$ : l'exposant n'est pas un coefficient."
  },
  {
   "id": "lit-nature",
   "chap": "lit",
   "type": "regle",
   "titre": "Termes de même nature",
   "question": "On peut additionner $3x$ et $5x$, mais pas $3x$ et $5$ car ...",
   "reponse": "ce ne sont pas des termes de même nature : $3x + 5x = 8x$ mais $3x + 5$ ne se réduit pas",
   "pieges": [
    "ce sont des termes de même nature : $3x + 5 = 8x$ comme d'habitude pour les additions",
    "$5$ est un nombre trop petit pour $3x$ : $3x + 5 = 8x$ seulement si $x$ est plus grand que $5$",
    "la lettre $x$ ne vaut rien dans une somme : $3x + 5 = 8$ dans tous les cas, quelle que soit sa valeur"
   ],
   "note": "On réduit seulement les termes de même nature : $3x + 5x + 2 + 4 = 8x + 6$."
  },
  {
   "id": "lit-fact",
   "chap": "lit",
   "type": "formule",
   "titre": "Factoriser",
   "question": "$k \\times a + k \\times b$ s'écrit aussi ...",
   "reponse": "$k \\times (a + b)$ (on met le facteur commun $k$ en facteur)",
   "pieges": [
    "$k \\times a + b$ (le facteur $k$ disparaît pour le second terme)",
    "$k + (a \\times b)$ (le facteur $k$ s'ajoute au produit)",
    "$(k + a) \\times b$ (le facteur $k$ s'ajoute au premier terme)"
   ],
   "note": "Exemple : $3x + 3 \\times 5 = 3 \\times (x + 5) = 3(x + 5)$."
  },
  {
   "id": "lit-contre",
   "chap": "lit",
   "type": "regle",
   "titre": "Contre-exemple",
   "question": "Pour montrer qu'une égalité est fausse, il suffit de ...",
   "reponse": "trouver une seule valeur de la lettre pour laquelle l'égalité est fausse",
   "pieges": [
    "la tester avec plusieurs valeurs de la lettre qui donnent des résultats différents",
    "montrer qu'elle est vraie pour une valeur de la lettre",
    "la vérifier avec la valeur zéro uniquement, car 0 est la plus simple"
   ],
   "note": "Exemple : $2x = x + 2$ est fausse pour $x = 5$ ($10 \\neq 7$), mais vraie pour $x = 2$."
  },
  {
   "id": "lit-traduire",
   "chap": "lit",
   "type": "regle",
   "titre": "Traduire une phrase",
   "question": "« Le double de la somme de $x$ et de 3 » s'écrit ...",
   "reponse": "$2 \\times (x + 3)$, ou $2(x + 3)$ (les parenthèses entourent la somme)",
   "pieges": [
    "$2x + 3$, car le double ne porte que sur $x$ et il n'y a pas de parenthèses",
    "$2 + x + 3$, car le double est une simple addition de nombres et de lettres",
    "$x + 3 \\times 2$, car la somme passe avant la multiplication dans une phrase"
   ],
   "note": "$2x + 3$ se lit « le double de $x$, augmenté de 3 »."
  },
  {
   "id": "aire-tri",
   "chap": "aire",
   "type": "formule",
   "titre": "Aire d'un triangle",
   "question": "Aire d'un triangle de base $b$ et de hauteur $h$ ?",
   "reponse": "$\\mathcal{A} = \\dfrac{b \\times h}{2}$",
   "pieges": [
    "$\\mathcal{A} = b \\times h$ (on oublie de diviser par 2)",
    "$\\mathcal{A} = \\dfrac{b + h}{2}$ (on additionne au lieu de multiplier)",
    "$\\mathcal{A} = 2 \\times b \\times h$ (on double au lieu de diviser)"
   ],
   "note": "La hauteur est perpendiculaire à la base.",
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
     "correction": "$\\dfrac{8 \\times 5}{2} = 20$ cm²"
    }
   ]
  },
  {
   "id": "aire-para",
   "chap": "aire",
   "type": "formule",
   "titre": "Aire d'un parallélogramme",
   "question": "Aire d'un parallélogramme de base $b$ et de hauteur $h$ ?",
   "reponse": "$\\mathcal{A} = b \\times h$",
   "pieges": [
    "$\\mathcal{A} = b \\times c$ ($c$ : côté oblique)",
    "$\\mathcal{A} = \\dfrac{b \\times h}{2}$",
    "$\\mathcal{A} = 2 \\times (b + h)$"
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
   ],
   "exemples": [
    {
     "donnees": "$b = 6$ cm et $h = 4$ cm",
     "question": "Aire ?",
     "reponse": 24,
     "unite": "cm²",
     "correction": "$6 \\times 4 = 24$ cm²"
    }
   ]
  },
  {
   "id": "aire-disque",
   "chap": "aire",
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
     "correction": "$\\pi \\times 3^{2} = 9\\pi \\approx 28{,}3$ cm²"
    },
    {
     "donnees": "$d = 10$ cm (arrondir au dixième)",
     "question": "Aire ?",
     "reponse": 78.5,
     "unite": "cm²",
     "correction": "$r = 5$ puis $\\pi \\times 5^{2} = 25\\pi \\approx 78{,}5$ cm²"
    }
   ]
  },
  {
   "id": "perim-cercle",
   "chap": "aire",
   "type": "formule",
   "titre": "Périmètre d'un cercle",
   "question": "Périmètre d'un cercle de rayon $r$ ?",
   "reponse": "$P = 2 \\times \\pi \\times r$",
   "pieges": [
    "$P = \\pi \\times r^{2}$ (c'est la formule de l'aire du disque)",
    "$P = \\pi \\times r$ (on oublie le facteur $2$ du diamètre)",
    "$P = 2 \\times r$ (on oublie $\\pi$ complètement)"
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
     "correction": "$2 \\times \\pi \\times 5 = 10\\pi \\approx 31{,}4$ cm"
    }
   ]
  },
  {
   "id": "conv-aire",
   "chap": "aire",
   "type": "regle",
   "titre": "Convertir des aires",
   "question": "$1\\ \\text{m}^{2}$ est égal à ...",
   "reponse": "$100\\ \\text{dm}^{2}$, soit $10\\,000\\ \\text{cm}^{2}$",
   "pieges": [
    "$10\\ \\text{dm}^{2}$, soit $100\\ \\text{cm}^{2}$",
    "$100\\ \\text{dm}^{2}$, soit $1\\,000\\ \\text{cm}^{2}$",
    "$1\\,000\\ \\text{dm}^{2}$, soit $100\\,000\\ \\text{cm}^{2}$"
   ],
   "note": "1 ha = 10 000 m² ; 1 a = 100 m²."
  },
  {
   "id": "aire-rect-carre",
   "chap": "aire",
   "type": "formule",
   "titre": "Aire d'un rectangle",
   "question": "Aire d'un rectangle de longueur $L$ et de largeur $\\ell$ ?",
   "reponse": "$\\mathcal{A} = L \\times \\ell$",
   "pieges": [
    "$\\mathcal{A} = 2 \\times (L + \\ell)$ (c'est le périmètre)",
    "$\\mathcal{A} = L + \\ell$ (on additionne au lieu de multiplier)",
    "$\\mathcal{A} = \\dfrac{L \\times \\ell}{2}$ (c'est pour un triangle)"
   ],
   "note": "Pour $L = 6$ cm et $\\ell = 4$ cm : $6 \\times 4 = 24$ cm². Ne pas confondre avec le périmètre, qui additionne les côtés."
  },
  {
   "id": "aire-carre-c",
   "chap": "aire",
   "type": "formule",
   "titre": "Aire d'un carré",
   "question": "Aire d'un carré de côté $c$ ?",
   "reponse": "$\\mathcal{A} = c \\times c$",
   "pieges": [
    "$\\mathcal{A} = 4 \\times c$ (c'est le périmètre)",
    "$\\mathcal{A} = 2 \\times c$ (on double au lieu de multiplier)",
    "$\\mathcal{A} = c + c$ (on additionne au lieu de multiplier)"
   ],
   "note": "Pour $c = 5$ cm : $5 \\times 5 = 25$ cm². On écrit aussi $c^{2}$.",
   "morceaux": [
    "\\mathcal{A}",
    "=",
    "c",
    "\\times",
    "c"
   ],
   "intrus": [
    "4",
    "+"
   ]
  },
  {
   "id": "perim-carre",
   "chap": "aire",
   "type": "formule",
   "titre": "Périmètre d'un carré",
   "question": "Périmètre d'un carré de côté $c$ ?",
   "reponse": "$P = 4 \\times c$",
   "pieges": [
    "$P = c \\times c$ (c'est l'aire)",
    "$P = 2 \\times c$ (on oublie deux côtés)",
    "$P = 3 \\times c$ (on oublie un côté)"
   ],
   "note": "Le carré a 4 côtés de même longueur. Pour $c = 5$ cm : $4 \\times 5 = 20$ cm.",
   "morceaux": [
    "P",
    "=",
    "4",
    "\\times",
    "c"
   ],
   "intrus": [
    "2",
    "c^{2}"
   ]
  },
  {
   "id": "perim-rect-c",
   "chap": "aire",
   "type": "formule",
   "titre": "Périmètre d'un rectangle",
   "question": "Périmètre d'un rectangle de longueur $L$ et de largeur $\\ell$ ?",
   "reponse": "$P = 2 \\times (L + \\ell)$",
   "pieges": [
    "$P = L \\times \\ell$ (c'est l'aire)",
    "$P = L + \\ell$ (on oublie de doubler)",
    "$P = 2 \\times L + \\ell$ (on oublie de doubler la largeur)"
   ],
   "note": "On fait le tour : deux longueurs et deux largeurs. Pour $L = 6$ cm et $\\ell = 4$ cm : $2 \\times (6 + 4) = 20$ cm.",
   "morceaux": [
    "P",
    "=",
    "2",
    "\\times",
    "(",
    "L",
    "+",
    "\\ell",
    ")"
   ],
   "intrus": [
    "4",
    "L \\times \\ell"
   ]
  },
  {
   "id": "aire-hauteur",
   "chap": "aire",
   "type": "propriete",
   "titre": "Hauteur d'un triangle ou d'un parallélogramme",
   "question": "La hauteur utilisée pour calculer une aire est ...",
   "reponse": "perpendiculaire à la base (elle peut être à l'extérieur)",
   "pieges": [
    "le côté oblique le plus proche de la base du triangle ou du parallélogramme",
    "la distance entre les deux sommets les plus éloignés de la figure",
    "toujours à l'intérieur de la figure, posée sur un de ses côtés"
   ],
   "note": "Dans un triangle obtusangle, une hauteur est à l'extérieur du triangle."
  },
  {
   "id": "aire-pi",
   "chap": "aire",
   "type": "valeur",
   "titre": "La valeur de pi",
   "question": "Une valeur approchée usuelle de $\\pi$ est ...",
   "reponse": "$3{,}14$ (environ $\\dfrac{22}{7}$)",
   "pieges": [
    "$3{,}41$ (environ $\\dfrac{7}{22}$)",
    "$3$ exactement, comme $\\dfrac{3}{1}$",
    "$3{,}10$ exactement, comme $\\dfrac{31}{10}$"
   ],
   "note": "$\\pi$ est le quotient du périmètre d'un cercle par son diamètre."
  },
  {
   "id": "aire-diametre",
   "chap": "aire",
   "type": "propriete",
   "titre": "Rayon et diamètre",
   "question": "Le rayon d'un cercle est ... de son diamètre",
   "reponse": "la moitié",
   "pieges": [
    "le double",
    "le quart",
    "le tiers"
   ],
   "note": "Un cercle de diamètre $10$ cm a un rayon de $5$ cm."
  },
  {
   "id": "aire-perim-diam",
   "chap": "aire",
   "type": "formule",
   "titre": "Périmètre avec le diamètre",
   "question": "Périmètre d'un cercle de diamètre $d$ ?",
   "reponse": "$P = \\pi \\times d$",
   "pieges": [
    "$P = \\pi \\times d^{2}$",
    "$P = \\dfrac{\\pi \\times d}{2}$",
    "$P = 2 \\times \\pi \\times d$"
   ],
   "note": "C'est la même formule que $2 \\times \\pi \\times r$, car $d = 2 \\times r$."
  },
  {
   "id": "aire-compose",
   "chap": "aire",
   "type": "methode",
   "titre": "Figure composée",
   "question": "Pour calculer l'aire d'une figure composée, on ...",
   "reponse": "découpe en figures simples, puis on additionne ou on soustrait les aires",
   "pieges": [
    "additionne les périmètres des figures simples que l'on a trouvées dedans",
    "multiplie les aires des figures simples que l'on a trouvées dedans",
    "calcule seulement l'aire de la plus grande des figures simples"
   ],
   "note": "Une figure en L est un grand rectangle moins un petit, ou deux rectangles côte à côte."
  },
  {
   "id": "aire-demi",
   "chap": "aire",
   "type": "formule",
   "titre": "Aire d'un demi-disque",
   "question": "Aire d'un demi-disque de rayon $r$ ?",
   "reponse": "$\\mathcal{A} = \\dfrac{\\pi \\times r^{2}}{2}$",
   "pieges": [
    "$\\mathcal{A} = \\pi \\times r^{2}$ (c'est celle du disque entier)",
    "$\\mathcal{A} = \\dfrac{\\pi \\times r}{2}$ (on oublie le carré)",
    "$\\mathcal{A} = \\pi \\times \\dfrac{r}{2}$ (on oublie le carré)"
   ],
   "note": "Avec $r = 4$ cm : $\\dfrac{3{,}14 \\times 16}{2} = 25{,}12\\ \\text{cm}^{2}$."
  },
  {
   "id": "div-eucl",
   "chap": "div",
   "type": "regle",
   "titre": "Division euclidienne",
   "question": "Une division euclidienne de $a$ par $b$ s'écrit ...",
   "reponse": "$a = b \\times q + r$ avec $r < b$",
   "pieges": [
    "$a = b \\times q + r$ avec $r > b$ (le reste est trop grand)",
    "$a = b + q + r$ (on additionne au lieu de multiplier)",
    "$a = q \\div b + r$ (on divise au lieu de multiplier)"
   ],
   "note": "$17 = 3 \\times 5 + 2$.",
   "morceaux": [
    "a",
    "=",
    "b",
    "\\times",
    "q",
    "+",
    "r"
   ],
   "intrus": [
    "-",
    "\\div"
   ]
  },
  {
   "id": "div-multiple",
   "chap": "div",
   "type": "definition",
   "titre": "Multiple et diviseur",
   "question": "$21 = 3 \\times 7$ : on dit que ...",
   "reponse": "21 est un multiple de 3 et 3 est un diviseur de 21",
   "pieges": [
    "21 est un diviseur de 3 et 3 est un multiple de 21 (sens inversé)",
    "21 est le quotient de 3 et 3 est le reste (mots confondus)",
    "21 est un multiple de 7 et 3 est le quotient (mots confondus)"
   ]
  },
  {
   "id": "div-crit",
   "chap": "div",
   "type": "regle",
   "titre": "Critères de divisibilité",
   "question": "Un nombre est divisible par 3 quand ...",
   "reponse": "la somme de ses chiffres est divisible par 3",
   "pieges": [
    "son dernier chiffre est divisible par 3 (on ne regarde que le dernier)",
    "son dernier chiffre est 3, 6 ou 9 (on confond avec les multiples de 3)",
    "il est impair (on confond avec les nombres impairs)"
   ],
   "note": "Par 9 : la somme des chiffres est divisible par 9. 12 est divisible par 3 mais pas par 9."
  },
  {
   "id": "div-5-10",
   "chap": "div",
   "type": "regle",
   "titre": "Divisibilité par 2, 5, 10",
   "question": "Un nombre est divisible par 5 quand ...",
   "reponse": "il se termine par 0 ou 5",
   "pieges": [
    "il se termine par 5 seulement",
    "la somme de ses chiffres est 5",
    "il est pair"
   ]
  },
  {
   "id": "div-crit-9",
   "chap": "div",
   "type": "propriete",
   "titre": "Divisibilité par 9",
   "question": "Un nombre est divisible par 9 quand ...",
   "reponse": "la somme de ses chiffres est divisible par 9",
   "pieges": [
    "son dernier chiffre est 9 (comme pour 10 avec le chiffre 0)",
    "la somme de ses chiffres est divisible par 3 seulement",
    "il se termine par 0 ou 9 (comme pour 5 avec 0 ou 5)"
   ],
   "note": "Exemple : $4\\,563$ : $4 + 5 + 6 + 3 = 18$, donc divisible par 9 (et par 3)."
  },
  {
   "id": "div-reste",
   "chap": "div",
   "type": "propriete",
   "titre": "Le reste est plus petit que le diviseur",
   "question": "Dans une division euclidienne par 7, le reste peut valoir ...",
   "reponse": "0, 1, 2, 3, 4, 5 ou 6 (strictement moins que 7)",
   "pieges": [
    "1, 2, 3, 4, 5, 6 ou 7 (jusqu'à 7 compris)",
    "n'importe quel entier, même 20, tant que le quotient reste entier",
    "0, 1, 2, 3 ou 4 (au plus la moitié de 7)"
   ],
   "note": "Si le reste vaut 7, on peut encore ajouter 1 au quotient."
  },
  {
   "id": "div-reste-nul",
   "chap": "div",
   "type": "propriete",
   "titre": "Reste nul",
   "question": "Dans la division euclidienne de $a$ par $b$, si le reste est nul, alors ...",
   "reponse": "$a$ est un multiple de $b$ et $b$ est un diviseur de $a$",
   "pieges": [
    "$a$ est un diviseur de $b$ et $b$ est un multiple de $a$",
    "$a$ et $b$ sont égaux",
    "le quotient est aussi nul"
   ],
   "note": "Exemple : $42 = 6 \\times 7 + 0$."
  },
  {
   "id": "div-un",
   "chap": "div",
   "type": "propriete",
   "titre": "Diviseurs évidents",
   "question": "Tout nombre entier supérieur à 1 a au moins pour diviseurs ...",
   "reponse": "1 et lui-même",
   "pieges": [
    "2 et lui-même",
    "1 et 10",
    "lui-même seulement"
   ],
   "note": "Exemple : les diviseurs de 7 sont 1 et 7 ; ceux de 12 sont 1, 2, 3, 4, 6 et 12."
  },
  {
   "id": "div-multiples-inf",
   "chap": "div",
   "type": "propriete",
   "titre": "Combien de multiples, combien de diviseurs ?",
   "question": "Un nombre entier non nul a ...",
   "reponse": "une infinité de multiples, mais un nombre fini de diviseurs",
   "pieges": [
    "un nombre fini de multiples, mais une infinité de diviseurs possibles",
    "une infinité de multiples et aussi une infinité de diviseurs",
    "autant de multiples que de diviseurs, toujours en même nombre"
   ],
   "note": "Les multiples de 5 : 0, 5, 10, 15, 20, ... ; les diviseurs de 20 : 1, 2, 4, 5, 10, 20."
  },
  {
   "id": "div-quotient",
   "chap": "div",
   "type": "propriete",
   "titre": "Quotient entier",
   "question": "Dans une division euclidienne, le quotient est ...",
   "reponse": "un nombre entier",
   "pieges": [
    "un nombre décimal avec des chiffres après la virgule",
    "toujours inférieur au reste",
    "toujours égal au reste"
   ],
   "note": "Exemple : dans $50 = 7 \\times 7 + 1$, le quotient est $7$, pas $7{,}14$."
  },
  {
   "id": "quotient",
   "chap": "rat1",
   "type": "definition",
   "titre": "Quotient",
   "question": "Le quotient $\\dfrac{a}{b}$ (avec $b \\neq 0$) est le nombre ...",
   "reponse": "qui, multiplié par $b$, donne $a$",
   "pieges": [
    "qui, ajouté à $b$, donne $a$ (on confond avec une soustraction)",
    "égal à $a - b$ (on confond avec une soustraction)",
    "égal à $b \\div a$ (on inverse la division)"
   ]
  },
  {
   "id": "frac-egales",
   "chap": "rat1",
   "type": "regle",
   "titre": "Fractions égales",
   "question": "$\\dfrac{a}{b} = \\dfrac{a \\times k}{b \\times k}$ : on obtient une fraction égale en ...",
   "reponse": "multipliant (ou en divisant) le numérateur et le dénominateur par le même nombre non nul",
   "pieges": [
    "ajoutant (ou en soustrayant) le même nombre au numérateur et au dénominateur, ce qui change la valeur",
    "ne multipliant que le dénominateur par le nombre choisi (cela change la valeur)",
    "ne changeant que le numérateur, comme on veut (cela change la valeur)"
   ],
   "note": "$\\dfrac{3}{4} = \\dfrac{9}{12}$.",
   "morceaux": [
    "\\dfrac{a}{b}",
    "=",
    "\\dfrac{a \\times k}{b \\times k}"
   ],
   "intrus": [
    "\\dfrac{a + k}{b + k}"
   ]
  },
  {
   "id": "frac-comp",
   "chap": "rat1",
   "type": "regle",
   "titre": "Comparer des fractions",
   "question": "Pour comparer $\\dfrac{3}{4}$ et $\\dfrac{2}{3}$ on ...",
   "reponse": "les écrit avec le même dénominateur, puis on compare les numérateurs",
   "pieges": [
    "compare les dénominateurs : le plus grand donne la plus grande fraction",
    "compare seulement les numérateurs",
    "additionne numérateur et dénominateur"
   ],
   "note": "Plus le dénominateur est grand, plus les parts sont petites : $\\dfrac{1}{8} < \\dfrac{1}{5}$."
  },
  {
   "id": "pourcent-frac",
   "chap": "rat1",
   "type": "regle",
   "titre": "Pourcentage et fraction",
   "question": "$25\\,\\%$ est égal à ...",
   "reponse": "$\\dfrac{1}{4}$",
   "pieges": [
    "$\\dfrac{1}{25}$",
    "$\\dfrac{25}{10}$",
    "2,5"
   ],
   "note": "$25\\,\\% = \\dfrac{25}{100} = \\dfrac{1}{4} = 0{,}25$. 10 % = 1/10 ; 50 % = 1/2 ; 1 % = 1/100.",
   "morceaux": [
    "25\\,\\%",
    "=",
    "\\dfrac{25}{100}",
    "=",
    "\\dfrac{1}{4}",
    "=",
    "0{,}25"
   ],
   "intrus": [
    "\\dfrac{1}{25}",
    "2{,}5"
   ]
  },
  {
   "id": "frac-dec",
   "chap": "rat1",
   "type": "regle",
   "titre": "Fractions et décimaux usuels",
   "question": "$\\dfrac{3}{4}$ s'écrit en décimal ...",
   "reponse": "0,75",
   "pieges": [
    "0,34",
    "3,4",
    "0,25"
   ]
  },
  {
   "id": "rat-irred",
   "chap": "rat1",
   "type": "propriete",
   "titre": "Fraction irréductible",
   "question": "Une fraction est irréductible quand ...",
   "reponse": "on ne peut plus la simplifier (plus de diviseur commun autre que 1)",
   "pieges": [
    "son numérateur est plus petit que son dénominateur (elle est alors « propre »)",
    "son dénominateur est un nombre premier (comme 7 ou 13)",
    "son numérateur est égal à 1 (ce sont les seules irréductibles)"
   ],
   "note": "$\\dfrac{3}{4}$ est irréductible ; $\\dfrac{6}{8}$ ne l'est pas, car $6$ et $8$ sont divisibles par $2$."
  },
  {
   "id": "rat-simpl",
   "chap": "rat1",
   "type": "methode",
   "titre": "Simplifier une fraction",
   "question": "Pour simplifier une fraction, on ...",
   "reponse": "divise le numérateur et le dénominateur par un même diviseur commun",
   "pieges": [
    "soustrait le même nombre au numérateur et au dénominateur de la fraction",
    "divise seulement le dénominateur par un diviseur commun aux deux nombres",
    "divise le numérateur par le dénominateur et écrit le résultat"
   ],
   "note": "$\\dfrac{18}{24} = \\dfrac{18 \\div 6}{24 \\div 6} = \\dfrac{3}{4}$."
  },
  {
   "id": "rat-div",
   "chap": "rat1",
   "type": "propriete",
   "titre": "Fraction et division",
   "question": "$\\dfrac{3}{4}$ représente aussi ...",
   "reponse": "la division $3 \\div 4$, c'est-à-dire $0{,}75$",
   "pieges": [
    "la division $4 \\div 3$, c'est-à-dire $1{,}33$",
    "la soustraction $4 - 3 = 1$",
    "le produit $3 \\times 4 = 12$"
   ],
   "note": "Une fraction est un quotient : on divise le numérateur par le dénominateur."
  },
  {
   "id": "rat-sup1",
   "chap": "rat1",
   "type": "propriete",
   "titre": "Fraction plus grande ou plus petite que 1",
   "question": "Une fraction est supérieure à 1 quand ...",
   "reponse": "son numérateur est plus grand que son dénominateur",
   "pieges": [
    "son numérateur est plus petit que son dénominateur",
    "son dénominateur est pair, comme pour $\\dfrac{3}{2}$",
    "son numérateur et son dénominateur sont impairs"
   ],
   "note": "$\\dfrac{7}{5} > 1$ ; $\\dfrac{5}{7} < 1$."
  },
  {
   "id": "rat-quantite",
   "chap": "rat1",
   "type": "methode",
   "titre": "Prendre une fraction d'une quantité",
   "question": "Prendre les $\\dfrac{3}{4}$ de 80, c'est calculer ...",
   "reponse": "$\\dfrac{3}{4} \\times 80 = 3 \\times 80 \\div 4 = 60$",
   "pieges": [
    "$80 \\div 3 \\times 4 = 106{,}67$ (on inverse la fraction)",
    "$80 - \\dfrac{3}{4} = 79{,}25$ (on soustrait la fraction)",
    "$80 + 3 \\div 4 = 80{,}75$ (on ajoute le quotient)"
   ],
   "note": "Prendre $\\dfrac{1}{4}$ d'une quantité, c'est la diviser par $4$."
  },
  {
   "id": "rat-pct-quantite",
   "chap": "rat1",
   "type": "methode",
   "titre": "Prendre un pourcentage d'une quantité",
   "question": "Calculer $25\\,\\%$ de 80, c'est calculer ...",
   "reponse": "$\\dfrac{25}{100} \\times 80 = 20$",
   "pieges": [
    "$25 \\times 80 = 2\\,000$ (on oublie de diviser par 100)",
    "$80 - 25 = 55$ (on soustrait le pourcentage)",
    "$\\dfrac{80}{100} \\times 25 = 20$ en divisant $25$ par $100$ (on confond les rôles)"
   ],
   "note": "$10\\,\\%$ d'une quantité : on la divise par $10$ ; $50\\,\\%$ : on la divise par $2$."
  },
  {
   "id": "ang-def",
   "chap": "ang",
   "figure": {
    "type": "plat",
    "mesures": false,
    "moment": "question"
   },
   "type": "definition",
   "titre": "Angles particuliers",
   "question": "Un angle plat mesure ...",
   "reponse": "$180^{\\circ}$",
   "pieges": [
    "$90^{\\circ}$",
    "$360^{\\circ}$",
    "$45^{\\circ}$"
   ],
   "note": "Angle droit : 90°."
  },
  {
   "id": "ang-opp",
   "chap": "ang",
   "figure": {
    "type": "secantes",
    "marques": "opposes",
    "mesures": false,
    "moment": "question"
   },
   "type": "propriete",
   "titre": "Angles opposés par le sommet",
   "question": "Deux angles opposés par le sommet sont ...",
   "reponse": "égaux",
   "pieges": [
    "supplémentaires (somme 180°)",
    "complémentaires (somme 90°)",
    "toujours droits"
   ]
  },
  {
   "id": "ang-supp",
   "chap": "ang",
   "figure": {
    "type": "adjacents",
    "mesures": true,
    "moment": "apres"
   },
   "type": "definition",
   "titre": "Angles supplémentaires",
   "question": "Deux angles sont supplémentaires quand ...",
   "reponse": "leur somme est égale à $180^{\\circ}$",
   "pieges": [
    "leur somme est égale à $90^{\\circ}$ (ce sont des angles complémentaires)",
    "leur somme est égale à $360^{\\circ}$ (le tour complet)",
    "ils sont égaux (c'est le cas pour des angles opposés)"
   ]
  },
  {
   "id": "ang-alt",
   "chap": "ang",
   "figure": {
    "type": "paralleles",
    "marques": "alternes",
    "mesures": false,
    "moment": "question"
   },
   "type": "propriete",
   "titre": "Alternes-internes et parallélisme",
   "question": "Si deux droites sont parallèles, alors les angles alternes-internes sont ...",
   "reponse": "égaux",
   "pieges": [
    "supplémentaires",
    "complémentaires",
    "toujours droits"
   ],
   "note": "Réciproque : si des angles alternes-internes sont égaux, les droites sont parallèles. Une mesure sur un dessin ne prouve rien."
  },
  {
   "id": "ang-compl",
   "chap": "ang",
   "figure": {
    "type": "complementaires",
    "mesures": true,
    "moment": "apres"
   },
   "type": "propriete",
   "titre": "Angles complémentaires",
   "question": "Deux angles sont complémentaires quand ...",
   "reponse": "leur somme est égale à $90^{\\circ}$",
   "pieges": [
    "leur somme est égale à $180^{\\circ}$ (ce sont des supplémentaires)",
    "leur somme est égale à $360^{\\circ}$ (le tour complet)",
    "ils sont égaux et mesurent chacun $45^{\\circ}$ (cas particulier seulement)"
   ],
   "note": "Le complémentaire de $35^{\\circ}$ est $90 - 35 = 55^{\\circ}$."
  },
  {
   "id": "ang-corr",
   "chap": "ang",
   "figure": {
    "type": "paralleles",
    "marques": "correspondants",
    "mesures": false,
    "moment": "question"
   },
   "type": "propriete",
   "titre": "Angles correspondants",
   "question": "Si deux droites sont parallèles, alors les angles correspondants sont ...",
   "reponse": "égaux",
   "pieges": [
    "supplémentaires",
    "complémentaires",
    "opposés par le sommet"
   ],
   "note": "Les angles correspondants sont du même côté de la sécante, l'un en haut, l'autre en bas."
  },
  {
   "id": "ang-recip",
   "chap": "ang",
   "figure": {
    "type": "paralleles",
    "marques": "alternes",
    "mesures": true,
    "moment": "apres"
   },
   "type": "propriete",
   "titre": "Réciproque pour le parallélisme",
   "question": "Si deux droites coupées par une sécante forment des angles alternes-internes égaux, alors ...",
   "reponse": "ces deux droites sont parallèles",
   "pieges": [
    "ces deux droites sont perpendiculaires",
    "la sécante est perpendiculaire aux deux droites",
    "on ne peut rien dire sur ces deux droites"
   ],
   "note": "On utilise cette propriété pour prouver que deux droites sont parallèles."
  },
  {
   "id": "ang-adj",
   "chap": "ang",
   "figure": {
    "type": "adjacents",
    "mesures": false,
    "moment": "question"
   },
   "type": "propriete",
   "titre": "Angles adjacents",
   "question": "Deux angles adjacents dont les côtés non communs sont alignés sont ...",
   "reponse": "supplémentaires (leur somme vaut $180^{\\circ}$)",
   "pieges": [
    "complémentaires (leur somme vaut $90^{\\circ}$, ils forment un angle droit)",
    "égaux (ce sont alors des angles opposés par le sommet)",
    "alternes-internes (ils sont alors égaux, avec deux parallèles)"
   ],
   "note": "Sur une droite, deux angles adjacents forment ensemble un angle plat."
  },
  {
   "id": "ang-tour",
   "chap": "ang",
   "figure": {
    "type": "tour",
    "mesures": false,
    "moment": "question"
   },
   "type": "propriete",
   "titre": "Angles autour d'un point",
   "question": "La somme des angles autour d'un point (un tour complet) vaut ...",
   "reponse": "$360^{\\circ}$",
   "pieges": [
    "$180^{\\circ}$",
    "$90^{\\circ}$",
    "$270^{\\circ}$"
   ],
   "note": "Quatre angles droits font un tour complet : $4 \\times 90 = 360$."
  },
  {
   "id": "ang-bissectrice",
   "chap": "ang",
   "figure": {
    "type": "bissectrice",
    "mesures": true,
    "moment": "apres"
   },
   "type": "propriete",
   "titre": "Bissectrice",
   "question": "La bissectrice d'un angle est la demi-droite qui ...",
   "reponse": "partage l'angle en deux angles égaux",
   "pieges": [
    "est perpendiculaire à un côté de l'angle",
    "partage l'angle en deux angles supplémentaires",
    "est parallèle à un côté de l'angle"
   ],
   "note": "La bissectrice d'un angle de $80^{\\circ}$ forme deux angles de $40^{\\circ}$."
  },
  {
   "id": "ang-aigu-obtus",
   "chap": "ang",
   "figure": {
    "type": "aigu-droit-obtus",
    "mesures": false,
    "moment": "apres"
   },
   "type": "propriete",
   "titre": "Aigu, droit, obtus",
   "question": "Un angle obtus mesure ...",
   "reponse": "plus de $90^{\\circ}$ et moins de $180^{\\circ}$",
   "pieges": [
    "moins de $90^{\\circ}$ (c'est un angle aigu)",
    "exactement $180^{\\circ}$ (c'est un angle plat)",
    "plus de $180^{\\circ}$ (c'est un angle rentrant)"
   ],
   "note": "Un angle aigu mesure moins de $90^{\\circ}$ ; un angle droit mesure $90^{\\circ}$."
  },
  {
   "id": "rel-add",
   "chap": "rel2",
   "type": "regle",
   "titre": "Addition de deux relatifs de même signe",
   "question": "$(-6) + (-9)$ vaut ...",
   "reponse": "$-15$",
   "pieges": [
    "$-3$",
    "15",
    "3"
   ],
   "exemples": [
    {
     "donnees": "Calculer $(-6) + (-9)$",
     "question": "Résultat ?",
     "reponse": -15,
     "unite": "",
     "correction": "$(-6) + (-9) = -(6 + 9) = -15$"
    }
   ],
   "note": "On additionne les distances à zéro et on garde le signe."
  },
  {
   "id": "rel-add2",
   "chap": "rel2",
   "type": "regle",
   "titre": "Addition de deux relatifs de signes contraires",
   "question": "$(-7) + (+3)$ vaut ...",
   "reponse": "$-4$",
   "pieges": [
    "$-10$",
    "10",
    "4"
   ],
   "exemples": [
    {
     "donnees": "Calculer $(-7) + (+3)$",
     "question": "Résultat ?",
     "reponse": -4,
     "unite": "",
     "correction": "$(-7) + 3 = -(7 - 3) = -4$"
    }
   ],
   "note": "On soustrait les distances à zéro ($7 - 3$) et on garde le signe du plus éloigné de 0."
  },
  {
   "id": "rel-sous",
   "chap": "rel2",
   "type": "regle",
   "titre": "Soustraire un relatif",
   "question": "Soustraire un nombre, c'est ...",
   "reponse": "ajouter son opposé",
   "pieges": [
    "ajouter ce nombre",
    "multiplier par $-1$",
    "diviser par son opposé"
   ],
   "exemples": [
    {
     "donnees": "Calculer $5 - (-2)$",
     "question": "Résultat ?",
     "reponse": 7,
     "unite": "",
     "correction": "$5 - (-2) = 5 + 2 = 7$"
    }
   ],
   "note": "$a - b = a + (-b)$. Soustraire ne fait pas toujours diminuer : $5 - (-2) = 7$.",
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
   ]
  },
  {
   "id": "rel-paren",
   "chap": "rel2",
   "type": "regle",
   "titre": "Les parenthèses et le signe moins",
   "question": "$7 - (2 + 3)$ vaut ...",
   "reponse": "2",
   "pieges": [
    "8",
    "12",
    "6"
   ],
   "note": "On calcule d'abord la parenthèse : $7 - 5 = 2$. $7 - 2 + 3 = 8$ n'est pas la même chose."
  },
  {
   "id": "vol-pave",
   "chap": "sol",
   "type": "formule",
   "titre": "Volume d'un pavé droit",
   "question": "Volume d'un pavé droit de longueur $L$, largeur $\\ell$, hauteur $h$ ?",
   "reponse": "$V = L \\times \\ell \\times h$",
   "pieges": [
    "$V = L + \\ell + h$",
    "$V = 2 \\times (L + \\ell + h)$",
    "$V = L \\times \\ell$"
   ],
   "exemples": [
    {
     "donnees": "$L = 5$ cm, $\\ell = 4$ cm, $h = 3$ cm",
     "question": "Volume ?",
     "reponse": 60,
     "unite": "cm³",
     "correction": "$5 \\times 4 \\times 3 = 60$ cm³"
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
   "id": "vol-cube",
   "chap": "sol",
   "type": "formule",
   "titre": "Volume d'un cube",
   "question": "Volume d'un cube d'arête $a$ ?",
   "reponse": "$V = a^{3}$",
   "pieges": [
    "$V = 3 \\times a$",
    "$V = a^{2}$",
    "$V = 6 \\times a^{2}$"
   ],
   "exemples": [
    {
     "donnees": "$a = 4$ cm",
     "question": "Volume ?",
     "reponse": 64,
     "unite": "cm³",
     "correction": "$4^{3} = 64$ cm³"
    }
   ],
   "morceaux": [
    "V",
    "=",
    "a^{3}"
   ],
   "intrus": [
    "a^{2}",
    "3a"
   ]
  },
  {
   "id": "vol-prisme",
   "chap": "sol",
   "type": "formule",
   "titre": "Volume d'un prisme droit",
   "question": "Volume d'un prisme droit de base d'aire $B$ et de hauteur $h$ ?",
   "reponse": "$V = B \\times h$",
   "pieges": [
    "$V = \\dfrac{1}{3} \\times B \\times h$",
    "$V = P_{\\text{base}} \\times h$",
    "$V = B + h$"
   ],
   "morceaux": [
    "V",
    "=",
    "B",
    "\\times",
    "h"
   ],
   "intrus": [
    "\\dfrac{1}{3}",
    "+"
   ]
  },
  {
   "id": "vol-cyl",
   "chap": "sol",
   "type": "formule",
   "titre": "Volume d'un cylindre",
   "question": "Volume d'un cylindre de rayon $r$ et de hauteur $h$ ?",
   "reponse": "$V = \\pi \\times r^{2} \\times h$",
   "pieges": [
    "$V = 2 \\times \\pi \\times r \\times h$",
    "$V = \\pi \\times r \\times h$",
    "$V = \\dfrac{1}{3} \\times \\pi \\times r^{2} \\times h$"
   ],
   "morceaux": [
    "V",
    "=",
    "\\pi",
    "\\times",
    "r^{2}",
    "\\times",
    "h"
   ],
   "intrus": [
    "2",
    "\\dfrac{1}{3}"
   ],
   "exemples": [
    {
     "donnees": "$r = 2$ cm et $h = 10$ cm (arrondir à l'unité)",
     "question": "Volume ?",
     "reponse": 126,
     "unite": "cm³",
     "correction": "$\\pi \\times 2^{2} \\times 10 = 40\\pi \\approx 126$ cm³"
    }
   ]
  },
  {
   "id": "litre",
   "chap": "sol",
   "type": "regle",
   "titre": "Litres et volumes",
   "question": "1 L est égal à ...",
   "reponse": "$1\\ \\text{dm}^{3}$",
   "pieges": [
    "$1\\ \\text{cm}^{3}$",
    "$10\\ \\text{dm}^{3}$",
    "$100\\ \\text{cm}^{3}$"
   ],
   "note": "Et $1\\ \\text{m}^{3} = 1\\,000$ L. 1 mL = 1 cm³."
  },
  {
   "id": "patron",
   "chap": "sol",
   "type": "regle",
   "titre": "Patrons",
   "question": "Le patron d'un prisme droit est formé de ...",
   "reponse": "deux bases et d'un rectangle pour chaque côté de la base",
   "pieges": [
    "deux bases et d'un seul grand rectangle de même largeur",
    "deux triangles seulement",
    "six rectangles identiques"
   ],
   "note": "Pavé : 6 rectangles. Cylindre : 2 disques et 1 rectangle."
  },
  {
   "id": "frac-add",
   "chap": "rat2",
   "type": "regle",
   "titre": "Additionner des fractions de même dénominateur",
   "question": "$\\dfrac{a}{c} + \\dfrac{b}{c}$ vaut ...",
   "reponse": "$\\dfrac{a + b}{c}$",
   "pieges": [
    "$\\dfrac{a + b}{c + c}$",
    "$\\dfrac{a + b}{c^{2}}$",
    "$\\dfrac{a \\times b}{c}$"
   ],
   "exemples": [
    {
     "donnees": "Calculer $\\dfrac{3}{5} + \\dfrac{4}{5}$ (donner le numérateur de la fraction obtenue)",
     "question": "Numérateur ?",
     "reponse": 7,
     "unite": "",
     "correction": "$\\dfrac{3 + 4}{5} = \\dfrac{7}{5}$"
    }
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
   ]
  },
  {
   "id": "frac-un",
   "chap": "rat2",
   "type": "regle",
   "titre": "Écrire 1 en fraction",
   "question": "1 peut s'écrire ...",
   "reponse": "$\\dfrac{n}{n}$ (avec $n \\neq 0$)",
   "pieges": [
    "$\\dfrac{n}{1}$ seulement",
    "$\\dfrac{0}{n}$",
    "$\\dfrac{1}{n}$"
   ],
   "note": "Par exemple $1 = \\dfrac{5}{5}$. $1 - \\dfrac{2}{3} = \\dfrac{3}{3} - \\dfrac{2}{3} = \\dfrac{1}{3}$."
  },
  {
   "id": "frac-diff",
   "chap": "rat2",
   "type": "regle",
   "titre": "Additionner avec des dénominateurs différents",
   "question": "Pour calculer $\\dfrac{2}{5} + \\dfrac{1}{4}$ on ...",
   "reponse": "met les deux fractions au même dénominateur (20) : $\\dfrac{8}{20} + \\dfrac{5}{20} = \\dfrac{13}{20}$",
   "pieges": [
    "additionne les numérateurs et les dénominateurs : $\\dfrac{2 + 1}{5 + 4} = \\dfrac{3}{9}$",
    "multiplie les deux fractions : $\\dfrac{2 \\times 1}{5 \\times 4} = \\dfrac{2}{20}$",
    "garde le premier dénominateur : $\\dfrac{2 + 1}{5} = \\dfrac{3}{5}$"
   ]
  },
  {
   "id": "prop-def",
   "chap": "prop",
   "type": "definition",
   "titre": "Situation de proportionnalité",
   "question": "Deux grandeurs sont proportionnelles si ...",
   "reponse": "on passe de l'une à l'autre en multipliant toujours par le même nombre (le coefficient)",
   "pieges": [
    "elles augmentent en même temps",
    "on passe de l'une à l'autre en ajoutant toujours le même nombre",
    "les points sont alignés"
   ],
   "note": "Sur un graphique : points alignés avec l'origine."
  },
  {
   "id": "prop-coef",
   "chap": "prop",
   "type": "regle",
   "titre": "Coefficient de proportionnalité",
   "question": "Le coefficient de proportionnalité se calcule en ...",
   "reponse": "divisant une valeur de la seconde grandeur par la valeur correspondante de la première",
   "pieges": [
    "soustrayant la valeur de la première grandeur à celle de la seconde",
    "additionnant la valeur de la première grandeur à celle de la seconde",
    "multipliant une valeur de la seconde grandeur par la valeur correspondante de la première"
   ],
   "exemples": [
    {
     "donnees": "2 kg de pommes coûtent 5 €",
     "question": "Prix de 1 kg ?",
     "reponse": 2.5,
     "unite": "€",
     "correction": "$5 \\div 2 = 2{,}5$ €/kg"
    }
   ]
  },
  {
   "id": "pourcent10",
   "chap": "prop",
   "type": "regle",
   "titre": "Pourcentages simples",
   "question": "Pour calculer $10\\,\\%$ d'une quantité $N$, on ...",
   "reponse": "calcule $N \\div 10$",
   "pieges": [
    "calcule $N \\times 10$",
    "calcule $N \\div 100$",
    "calcule $N \\div 2$"
   ],
   "exemples": [
    {
     "donnees": "Calculer $10\\,\\%$ de 80 €",
     "question": "Résultat ?",
     "reponse": 8,
     "unite": "€",
     "correction": "$80 \\div 10 = 8$ €"
    },
    {
     "donnees": "Calculer $50\\,\\%$ de 36 kg",
     "question": "Résultat ?",
     "reponse": 18,
     "unite": "kg",
     "correction": "$36 \\div 2 = 18$ kg"
    }
   ],
   "note": "50 % = moitié ; 1 % = N ÷ 100.",
   "morceaux": [
    "10\\,\\%",
    "\\text{ de }",
    "N",
    "=",
    "N",
    "\\div",
    "10"
   ],
   "intrus": [
    "\\times",
    "100"
   ]
  },
  {
   "id": "prop-add",
   "chap": "prop",
   "type": "regle",
   "titre": "Ajouter ou multiplier ?",
   "question": "Si 2 kg coûtent 5 €, alors 5 kg coûtent ...",
   "reponse": "12,50 €",
   "pieges": [
    "8 €",
    "10 €",
    "7,50 €"
   ],
   "note": "On multiplie par le coefficient $2{,}5$ ; on n'ajoute pas."
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
   "id": "equ-add",
   "chap": "equ",
   "type": "regle",
   "titre": "Résoudre x + b = c",
   "question": "L'équation $x + b = c$ a pour solution ...",
   "reponse": "$x = c - b$",
   "pieges": [
    "$x = c + b$",
    "$x = b - c$",
    "$x = c \\times b$"
   ],
   "exemples": [
    {
     "donnees": "Résoudre $x + 5 = 12$",
     "question": "Solution ?",
     "reponse": 7,
     "unite": "",
     "correction": "$x = 12 - 5 = 7$"
    }
   ],
   "morceaux": [
    "x",
    "=",
    "c",
    "-",
    "b"
   ],
   "intrus": [
    "+",
    "\\times"
   ]
  },
  {
   "id": "equ-mult",
   "chap": "equ",
   "type": "regle",
   "titre": "Résoudre ax = c",
   "question": "L'équation $a x = c$ (avec $a \\neq 0$) a pour solution ...",
   "reponse": "$x = c \\div a$",
   "pieges": [
    "$x = c - a$",
    "$x = a \\div c$",
    "$x = c \\times a$"
   ],
   "exemples": [
    {
     "donnees": "Résoudre $4x = 20$",
     "question": "Solution ?",
     "reponse": 5,
     "unite": "",
     "correction": "$x = 20 \\div 4 = 5$"
    }
   ],
   "morceaux": [
    "x",
    "=",
    "c",
    "\\div",
    "a"
   ],
   "intrus": [
    "\\times",
    "-"
   ]
  },
  {
   "id": "equ-verif",
   "chap": "equ",
   "type": "regle",
   "titre": "Vérifier et conclure",
   "question": "Après avoir trouvé une solution, on ...",
   "reponse": "la vérifie dans l'équation de départ puis conclut par une phrase",
   "pieges": [
    "passe directement à l'exercice suivant sans rien écrire",
    "ne conclut que si le résultat est un nombre entier",
    "écrit seulement le résultat sans phrase ni vérification"
   ],
   "note": "On pense à l'unité dans la phrase. $2x = 0$ et $x \\div 2 = 0$ ont pour solution 0."
  },
  {
   "id": "para-def",
   "chap": "para",
   "type": "definition",
   "titre": "Parallélogramme",
   "question": "Un parallélogramme est un quadrilatère qui a ...",
   "reponse": "ses côtés opposés parallèles deux à deux",
   "pieges": [
    "quatre côtés de même longueur",
    "quatre angles droits, comme un rectangle",
    "un seul angle droit et deux côtés égaux"
   ]
  },
  {
   "id": "para-diag",
   "chap": "para",
   "type": "propriete",
   "titre": "Propriété des diagonales",
   "question": "Dans un parallélogramme, les diagonales ...",
   "reponse": "ont le même milieu",
   "pieges": [
    "sont perpendiculaires",
    "sont égales",
    "sont parallèles"
   ],
   "note": "Réciproque : si les diagonales d'un quadrilatère ont le même milieu, c'est un parallélogramme."
  },
  {
   "id": "para-cotes",
   "chap": "para",
   "type": "propriete",
   "titre": "Côtés opposés",
   "question": "Dans un parallélogramme, les côtés opposés sont ...",
   "reponse": "égaux deux à deux",
   "pieges": [
    "perpendiculaires",
    "égaux à la diagonale",
    "tous égaux"
   ]
  },
  {
   "id": "rectangle",
   "chap": "para",
   "type": "definition",
   "titre": "Rectangle",
   "question": "Un rectangle est un parallélogramme qui a ...",
   "reponse": "un angle droit (ses diagonales sont alors égales)",
   "pieges": [
    "deux côtés consécutifs égaux",
    "des diagonales perpendiculaires",
    "quatre côtés égaux"
   ]
  },
  {
   "id": "losange",
   "chap": "para",
   "type": "definition",
   "titre": "Losange",
   "question": "Un losange est un parallélogramme qui a ...",
   "reponse": "deux côtés consécutifs égaux",
   "pieges": [
    "un angle droit",
    "des diagonales égales",
    "un seul axe de symétrie"
   ],
   "note": "Ses diagonales sont alors perpendiculaires."
  },
  {
   "id": "carre",
   "chap": "para",
   "type": "definition",
   "titre": "Carré",
   "question": "Un carré est un quadrilatère qui est ...",
   "reponse": "à la fois un rectangle et un losange",
   "pieges": [
    "un rectangle sans être un losange",
    "un losange sans être un rectangle",
    "un parallélogramme qui n'a que deux côtés égaux"
   ]
  },
  {
   "id": "trapeze",
   "chap": "para",
   "type": "definition",
   "titre": "Trapèze",
   "question": "Un trapèze est un quadrilatère qui a ...",
   "reponse": "au moins une paire de côtés opposés parallèles",
   "pieges": [
    "deux paires de côtés opposés parallèles seulement",
    "quatre angles droits",
    "deux côtés égaux"
   ]
  },
  {
   "id": "freq",
   "chap": "don",
   "type": "formule",
   "titre": "Fréquence",
   "question": "Fréquence d'une valeur d'effectif $n$ dans une série d'effectif total $N$ ?",
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
     "question": "Fréquence (décimale) ?",
     "reponse": 0.2,
     "unite": "",
     "correction": "$\\dfrac{5}{25} = 0{,}2$"
    }
   ],
   "note": "La somme des fréquences vaut 1 (100 %)."
  },
  {
   "id": "moyenne",
   "chap": "don",
   "type": "formule",
   "titre": "Moyenne",
   "question": "Moyenne d'une série de valeurs ?",
   "reponse": "$\\text{moyenne} = \\dfrac{\\text{somme des valeurs}}{\\text{nombre de valeurs}}$",
   "pieges": [
    "$\\dfrac{\\text{valeur max} + \\text{valeur min}}{2}$",
    "$\\text{la valeur la plus fréquente}$",
    "$\\dfrac{\\text{somme des valeurs}}{\\text{nombre de valeurs différentes}}$"
   ],
   "exemples": [
    {
     "donnees": "Notes : 8 ; 12 ; 15 ; 10 ; 5",
     "question": "Moyenne ?",
     "reponse": 10,
     "unite": "",
     "correction": "$\\dfrac{50}{5} = 10$"
    }
   ],
   "morceaux": [
    "\\text{moyenne}",
    "=",
    "\\dfrac{\\text{somme des valeurs}}{\\text{nombre de valeurs}}"
   ],
   "intrus": [
    "\\dfrac{\\text{nombre de valeurs}}{\\text{somme des valeurs}}",
    "+"
   ]
  },
  {
   "id": "diagrammes",
   "chap": "don",
   "type": "regle",
   "titre": "Choisir un diagramme",
   "question": "Pour comparer des effectifs de catégories, on utilise de préférence ...",
   "reponse": "un diagramme en barres",
   "pieges": [
    "un diagramme cartésien (courbe)",
    "un diagramme circulaire sans effectif total",
    "un nuage de points"
   ],
   "note": "Circulaire : parts d'un tout. Cartésien : évolution dans le temps."
  },
  {
   "id": "freq-compar",
   "chap": "don",
   "type": "regle",
   "titre": "Comparer des fréquences",
   "question": "Peut-on comparer $30\\,\\%$ de 100 personnes et $20\\,\\%$ de 1 000 personnes sans calculer ?",
   "reponse": "non : il faut tenir compte de l'effectif total (30 contre 200)",
   "pieges": [
    "oui, 30 % est toujours plus grand que 20 %",
    "oui, il faut comparer les effectifs totaux seulement",
    "non, c'est impossible"
   ]
  },
  {
   "id": "fonc-def",
   "chap": "fonc",
   "type": "definition",
   "titre": "Fonction",
   "question": "« $y$ est fonction de $x$ » signifie que ...",
   "reponse": "à chaque valeur de $x$ correspond une seule valeur de $y$",
   "pieges": [
    "à chaque valeur de $y$ correspond une seule valeur de $x$",
    "$y$ est toujours plus grand que $x$",
    "$y$ et $x$ sont proportionnels"
   ]
  },
  {
   "id": "fonc-prop",
   "chap": "fonc",
   "type": "propriete",
   "titre": "Proportionnalité et graphique",
   "question": "Une situation de proportionnalité est représentée par ...",
   "reponse": "des points alignés avec l'origine du repère",
   "pieges": [
    "des points alignés (n'importe où)",
    "une courbe quelconque",
    "des points sur l'axe horizontal"
   ],
   "note": "Points alignés qui ne passent pas par O : ce n'est pas de la proportionnalité."
  },
  {
   "id": "fonc-lire",
   "chap": "fonc",
   "type": "regle",
   "titre": "Lire un graphique distance-temps",
   "question": "Un segment horizontal sur un graphique distance-temps indique ...",
   "reponse": "un arrêt (la distance ne change pas)",
   "pieges": [
    "une vitesse très grande",
    "un retour en arrière",
    "un demi-tour"
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
   "note": "0 : impossible ; 1 : certain."
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
     "correction": "$\\dfrac{3}{8} = 0{,}375$"
    }
   ],
   "morceaux": [
    "P(A)",
    "=",
    "\\dfrac{\\text{nombre d'issues favorables}}{\\text{nombre total d'issues}}"
   ],
   "intrus": [
    "\\dfrac{\\text{nombre total d'issues}}{\\text{nombre d'issues favorables}}",
    "-"
   ]
  },
  {
   "id": "proba-chance",
   "chap": "proba",
   "type": "regle",
   "titre": "Une chance sur quatre",
   "question": "« Une chance sur quatre » s'écrit ...",
   "reponse": "$\\dfrac{1}{4}$",
   "pieges": [
    "$\\dfrac{1}{3}$",
    "0,4",
    "$4\\,\\%$"
   ],
   "note": "$\\dfrac{1}{4} = 0{,}25 = 25\\,\\%$."
  },
  {
   "id": "proba-memoire",
   "chap": "proba",
   "type": "propriete",
   "titre": "La pièce n'a pas de mémoire",
   "question": "Après 5 « pile » de suite, au lancer suivant, la probabilité d'obtenir « face » est ...",
   "reponse": "toujours $\\dfrac{1}{2}$",
   "pieges": [
    "plus grande que $\\dfrac{1}{2}$",
    "plus petite que $\\dfrac{1}{2}$",
    "égale à 1"
   ]
  }
 ],
 "outils": [
  {
   "id": "o1",
   "chap": "aire",
   "enonce": "Quelle est l'aire d'un triangle de base 10 cm et de hauteur 6 cm ?",
   "bon": "aire-tri",
   "explication": "Triangle : base × hauteur ÷ 2.",
   "autres": [
    "aire-para",
    "aire-rect",
    "aire-disque"
   ]
  },
  {
   "id": "o2",
   "chap": "aire",
   "enonce": "Quelle est l'aire d'un parallélogramme de base 9 cm et de hauteur 4 cm ?",
   "bon": "aire-para",
   "explication": "Parallélogramme : base × hauteur (pas de division par 2).",
   "autres": [
    "aire-tri",
    "aire-rect",
    "perim-rect"
   ]
  },
  {
   "id": "o3",
   "chap": "aire",
   "enonce": "Quelle longueur de grillage faut-il pour entourer un bassin circulaire de 3 m de rayon ?",
   "bon": "perim-cercle",
   "explication": "C'est une longueur : le périmètre du cercle, $2 \\times \\pi \\times r$.",
   "autres": [
    "aire-disque",
    "perim-rect",
    "aire-carre"
   ]
  },
  {
   "id": "o4",
   "chap": "aire",
   "enonce": "Quelle quantité de gazon faut-il pour couvrir un terrain circulaire de 4 m de rayon ?",
   "bon": "aire-disque",
   "explication": "C'est une surface : l'aire du disque, $\\pi \\times r^{2}$.",
   "autres": [
    "perim-cercle",
    "aire-rect",
    "aire-tri"
   ]
  },
  {
   "id": "o5",
   "chap": "sol",
   "enonce": "Quel est le volume d'un aquarium de 50 cm sur 30 cm sur 40 cm ?",
   "bon": "vol-pave",
   "explication": "Aquarium : pavé droit, $L \\times \\ell \\times h$.",
   "autres": [
    "vol-cube",
    "vol-prisme",
    "aire-rect"
   ]
  },
  {
   "id": "o6",
   "chap": "sol",
   "enonce": "Quel est le volume d'une boîte de conserve de rayon 4 cm et de hauteur 11 cm ?",
   "bon": "vol-cyl",
   "explication": "Boîte de conserve : cylindre, $\\pi \\times r^{2} \\times h$.",
   "autres": [
    "vol-prisme",
    "vol-pave",
    "aire-disque"
   ]
  },
  {
   "id": "o7",
   "chap": "sol",
   "enonce": "Quel est le volume d'un cube de 5 cm d'arête ?",
   "bon": "vol-cube",
   "explication": "Cube : $a^{3}$.",
   "autres": [
    "vol-pave",
    "aire-carre",
    "vol-prisme"
   ]
  },
  {
   "id": "o8",
   "chap": "ang",
   "enonce": "Dans un triangle, deux angles mesurent $55^{\\circ}$ et $65^{\\circ}$. Combien mesure le troisième ?",
   "bon": "tri-ang",
   "explication": "La somme des angles d'un triangle vaut $180^{\\circ}$.",
   "autres": [
    "ang-supp",
    "ang-opp",
    "ang-alt"
   ]
  },
  {
   "id": "o9",
   "chap": "ang",
   "enonce": "Deux droites parallèles sont coupées par une sécante. Que dire de deux angles alternes-internes ?",
   "bon": "ang-alt",
   "explication": "Droites parallèles : angles alternes-internes égaux.",
   "autres": [
    "ang-opp",
    "ang-supp",
    "tri-ang"
   ]
  },
  {
   "id": "o10",
   "chap": "tri",
   "enonce": "Peut-on construire un triangle de côtés 3 cm, 4 cm et 8 cm ?",
   "bon": "tri-ineg",
   "explication": "$8 > 3 + 4$ : impossible (inégalité triangulaire).",
   "autres": [
    "tri-ang",
    "tri-iso",
    "para-diag"
   ]
  },
  {
   "id": "o11",
   "chap": "rel2",
   "enonce": "Calculer $(-4) + (-9)$.",
   "bon": "rel-add",
   "explication": "Deux négatifs : on additionne les distances à zéro et on garde le signe $-$.",
   "autres": [
    "rel-add2",
    "rel-sous",
    "rel-comp"
   ]
  },
  {
   "id": "o12",
   "chap": "rel2",
   "enonce": "Calculer $6 - (-3)$.",
   "bon": "rel-sous",
   "explication": "Soustraire, c'est ajouter l'opposé : $6 + 3$.",
   "autres": [
    "rel-add",
    "rel-add2",
    "rel-paren"
   ]
  },
  {
   "id": "o13",
   "chap": "rel1",
   "enonce": "Quel est le plus grand : $-3$ ou $-8$ ?",
   "bon": "rel-comp",
   "explication": "Entre deux négatifs, le plus grand est celui dont la valeur absolue est la plus petite.",
   "autres": [
    "rel-absolue",
    "rel-oppose",
    "coord"
   ]
  },
  {
   "id": "o14",
   "chap": "rat2",
   "enonce": "Calculer $\\dfrac{3}{7} + \\dfrac{2}{7}$.",
   "bon": "frac-add",
   "explication": "Même dénominateur : on additionne les numérateurs et on garde le dénominateur.",
   "autres": [
    "frac-diff",
    "frac-comp",
    "frac-egales"
   ]
  },
  {
   "id": "o15",
   "chap": "rat2",
   "enonce": "Calculer $\\dfrac{1}{2} + \\dfrac{1}{3}$.",
   "bon": "frac-diff",
   "explication": "Dénominateurs différents : on les met d'abord au même dénominateur (6).",
   "autres": [
    "frac-add",
    "frac-comp",
    "frac-egales"
   ]
  },
  {
   "id": "o16",
   "chap": "rat1",
   "enonce": "Quelle fraction est la plus grande : $\\dfrac{3}{4}$ ou $\\dfrac{2}{3}$ ?",
   "bon": "frac-comp",
   "explication": "On met les deux fractions au même dénominateur (12) : $\\dfrac{9}{12}$ et $\\dfrac{8}{12}$.",
   "autres": [
    "frac-add",
    "frac-dec",
    "pourcent-frac"
   ]
  },
  {
   "id": "o17",
   "chap": "prop",
   "enonce": "Un kilo de cerises coûte 6 €. Combien coûtent 2,5 kg ?",
   "bon": "prop-coef",
   "explication": "Le prix est proportionnel à la masse : on multiplie par le prix d'un kilo.",
   "autres": [
    "pourcent10",
    "prop-add",
    "moyenne"
   ]
  },
  {
   "id": "o18",
   "chap": "prop",
   "enonce": "Calculer $10\\,\\%$ de 450 €.",
   "bon": "pourcent10",
   "explication": "$10\\,\\% = \\dfrac{1}{10}$ : on divise par 10.",
   "autres": [
    "pourcent-frac",
    "prop-coef",
    "freq"
   ]
  },
  {
   "id": "o19",
   "chap": "equ",
   "enonce": "Résoudre $x + 8 = 20$.",
   "bon": "equ-add",
   "explication": "On retranche 8 aux deux membres : $x = 20 - 8$.",
   "autres": [
    "equ-mult",
    "rel-sous",
    "priorites"
   ]
  },
  {
   "id": "o20",
   "chap": "equ",
   "enonce": "Résoudre $5x = 35$.",
   "bon": "equ-mult",
   "explication": "On divise par 5 : $x = 35 \\div 5$.",
   "autres": [
    "equ-add",
    "prop-coef"
   ]
  },
  {
   "id": "o21",
   "chap": "don",
   "enonce": "Les notes d'un élève sont 12, 15, 9 et 14. Quelle est sa moyenne ?",
   "bon": "moyenne",
   "explication": "On additionne les valeurs, on divise par leur nombre.",
   "autres": [
    "freq",
    "prop-coef",
    "pourcent10"
   ]
  },
  {
   "id": "o22",
   "chap": "don",
   "enonce": "Dans une classe de 25 élèves, 5 vont à vélo. Quelle est la fréquence des élèves à vélo ?",
   "bon": "freq",
   "explication": "Fréquence = effectif ÷ effectif total.",
   "autres": [
    "moyenne",
    "pourcent-frac",
    "proba-f"
   ]
  },
  {
   "id": "o23",
   "chap": "proba",
   "enonce": "On tire au hasard une boule dans un sac qui contient 3 rouges, 2 bleues et 5 vertes. Quelle est la probabilité d'obtenir une bleue ?",
   "bon": "proba-f",
   "explication": "Équiprobabilité : $\\dfrac{2}{10}$ (on compte les boules, pas les couleurs).",
   "autres": [
    "freq",
    "pourcent-frac",
    "proba-def"
   ]
  },
  {
   "id": "o24",
   "chap": "div",
   "enonce": "Un nombre est-il divisible par 9 si la somme de ses chiffres est 18 ?",
   "bon": "div-crit",
   "explication": "Critère de divisibilité par 9 : la somme des chiffres est divisible par 9.",
   "autres": [
    "div-eucl",
    "div-5-10",
    "div-multiple"
   ]
  },
  {
   "id": "o25",
   "chap": "sym",
   "enonce": "On veut construire le symétrique d'un point $M$ par rapport à $O$. Quelle propriété utiliser ?",
   "bon": "sc-def",
   "explication": "$O$ doit être le milieu de $[MM']$.",
   "autres": [
    "axe-sym",
    "sc-cons",
    "mediatrice"
   ]
  },
  {
   "id": "o26",
   "chap": "para",
   "enonce": "Un quadrilatère a ses diagonales de même milieu. Que peut-on dire ?",
   "bon": "para-diag",
   "explication": "Réciproque : diagonales de même milieu, donc parallélogramme.",
   "autres": [
    "rectangle",
    "losange",
    "trapeze"
   ]
  },
  {
   "id": "o27",
   "chap": "lit",
   "enonce": "Écrire l'expression obtenue en ajoutant 3 au double d'un nombre $n$.",
   "bon": "lit-double",
   "explication": "Double de $n$ : $2n$ ; on ajoute 3 : $2n + 3$.",
   "autres": [
    "lit-distrib",
    "lit-reduire",
    "lit-perim"
   ]
  },
  {
   "id": "o28",
   "chap": "ench",
   "enonce": "Calculer $4 + 5 \\times 3$.",
   "bon": "priorites",
   "explication": "La multiplication est prioritaire : $5 \\times 3 = 15$ puis $4 + 15$.",
   "autres": [
    "ecriture-egal",
    "carre-def"
   ]
  },
  {
   "id": "o29",
   "chap": "pre",
   "enonce": "Quelle est l'aire d'une terrasse rectangulaire de 6 m sur 4,5 m ?",
   "bon": "aire-rect",
   "explication": "Rectangle : longueur × largeur, soit $6 \\times 4{,}5 = 27$ m².",
   "autres": [
    "perim-rect",
    "aire-carre",
    "vol-pave6"
   ]
  },
  {
   "id": "o30",
   "chap": "pre",
   "enonce": "Combien de mètres de clôture faut-il pour entourer un jardin rectangulaire de 12 m sur 8 m ?",
   "bon": "perim-rect",
   "explication": "Entourer, c'est le périmètre : $2 \\times (12 + 8) = 40$ m.",
   "autres": [
    "aire-rect",
    "aire-carre",
    "vol-pave6"
   ]
  },
  {
   "id": "o31",
   "chap": "aire",
   "enonce": "Une voile triangulaire a une base de 4 m et une hauteur de 6 m. Quelle est son aire ?",
   "bon": "aire-tri",
   "explication": "Triangle : base × hauteur ÷ 2, soit $4 \\times 6 \\div 2 = 12$ m².",
   "autres": [
    "aire-para",
    "aire-rect",
    "aire-disque"
   ]
  },
  {
   "id": "o32",
   "chap": "aire",
   "enonce": "Un parallélogramme a une base de 7 cm et une hauteur de 3 cm. Quelle est son aire ?",
   "bon": "aire-para",
   "explication": "Parallélogramme : base × hauteur (pas de division par 2), soit 21 cm².",
   "autres": [
    "aire-tri",
    "aire-rect",
    "perim-cercle"
   ]
  },
  {
   "id": "o33",
   "chap": "aire",
   "enonce": "Une roue de vélo a un rayon de 35 cm. Quelle distance parcourt-elle en un tour ?",
   "bon": "perim-cercle",
   "explication": "Un tour de roue, c'est le périmètre du cercle : $2 \\times \\pi \\times r$.",
   "autres": [
    "aire-disque",
    "aire-tri",
    "aire-para"
   ]
  },
  {
   "id": "o34",
   "chap": "aire",
   "enonce": "Quelle est la surface d'une piscine ronde de 2 m de rayon ?",
   "bon": "aire-disque",
   "explication": "C'est une surface : l'aire du disque, $\\pi \\times r^{2}$.",
   "autres": [
    "perim-cercle",
    "aire-tri",
    "aire-para"
   ]
  },
  {
   "id": "o35",
   "chap": "sol",
   "enonce": "Quel est le volume d'une caisse de 60 cm sur 40 cm sur 30 cm ?",
   "bon": "vol-pave",
   "explication": "Pavé droit : $L \\times \\ell \\times h$.",
   "autres": [
    "aire-rect",
    "vol-cube",
    "vol-cyl"
   ]
  },
  {
   "id": "o36",
   "chap": "sol",
   "enonce": "Quel est le volume d'un verre cylindrique de 3 cm de rayon et de 10 cm de hauteur ?",
   "bon": "vol-cyl",
   "explication": "Cylindre : $\\pi \\times r^{2} \\times h$.",
   "autres": [
    "vol-pave",
    "vol-cube",
    "aire-disque"
   ]
  },
  {
   "id": "o37",
   "chap": "sol",
   "enonce": "Un prisme droit a pour base un triangle d'aire 12 cm² et pour hauteur 10 cm. Quel est son volume ?",
   "bon": "vol-prisme",
   "explication": "Prisme droit : aire de la base × hauteur, soit 120 cm³.",
   "autres": [
    "vol-cyl",
    "aire-tri",
    "vol-cube"
   ]
  },
  {
   "id": "o38",
   "chap": "ang",
   "enonce": "Dans un triangle $ABC$, l'angle $\\widehat{A}$ mesure $90^{\\circ}$ et l'angle $\\widehat{B}$ mesure $35^{\\circ}$. Combien mesure $\\widehat{C}$ ?",
   "bon": "tri-ang",
   "explication": "La somme des angles d'un triangle vaut $180^{\\circ}$ : $180 - 90 - 35 = 55^{\\circ}$.",
   "autres": [
    "ang-supp",
    "ang-opp",
    "ang-alt"
   ]
  },
  {
   "id": "o39",
   "chap": "ang",
   "enonce": "Deux angles sont supplémentaires et l'un mesure $70^{\\circ}$. Combien mesure l'autre ?",
   "bon": "ang-supp",
   "explication": "Supplémentaires : la somme vaut $180^{\\circ}$, donc $110^{\\circ}$.",
   "autres": [
    "ang-opp",
    "ang-alt",
    "ang-def"
   ]
  },
  {
   "id": "o40",
   "chap": "ang",
   "enonce": "Deux droites se coupent en $O$ et forment un angle de $40^{\\circ}$. Combien mesure l'angle opposé par le sommet ?",
   "bon": "ang-opp",
   "explication": "Deux angles opposés par le sommet sont égaux : $40^{\\circ}$.",
   "autres": [
    "ang-supp",
    "ang-alt",
    "tri-ang"
   ]
  },
  {
   "id": "o41",
   "chap": "div",
   "enonce": "Le nombre 2 457 est-il divisible par 3 ?",
   "bon": "div-crit",
   "explication": "La somme des chiffres vaut $2 + 4 + 5 + 7 = 18$, divisible par 3 : oui.",
   "autres": [
    "div-5-10",
    "div-eucl",
    "div-multiple"
   ]
  },
  {
   "id": "o42",
   "chap": "div",
   "enonce": "Le nombre 1 340 est-il divisible par 5 ?",
   "bon": "div-5-10",
   "explication": "Il se termine par 0 : oui.",
   "autres": [
    "div-crit",
    "div-eucl",
    "div-multiple"
   ]
  },
  {
   "id": "o43",
   "chap": "div",
   "enonce": "Effectuer la division euclidienne de 47 par 6.",
   "bon": "div-eucl",
   "explication": "On écrit $47 = 6 \\times 7 + 5$ avec un reste $5 < 6$.",
   "autres": [
    "div-multiple",
    "div-crit",
    "quotient"
   ]
  },
  {
   "id": "o44",
   "chap": "tri",
   "enonce": "Comment trouve-t-on le centre du cercle qui passe par les trois sommets d'un triangle ?",
   "bon": "tri-circ",
   "explication": "C'est le cercle circonscrit : son centre est le point de rencontre des trois médiatrices.",
   "autres": [
    "tri-hauteur",
    "tri-iso",
    "tri-ineg"
   ]
  },
  {
   "id": "o45",
   "chap": "lit",
   "enonce": "Développer $4(x + 7)$.",
   "bon": "lit-distrib",
   "explication": "On multiplie chaque terme de la parenthèse : $4x + 28$.",
   "autres": [
    "lit-reduire",
    "lit-double",
    "lit-test"
   ]
  },
  {
   "id": "o46",
   "chap": "lit",
   "enonce": "Réduire $3x + 5x$.",
   "bon": "lit-reduire",
   "explication": "Ce sont des termes de même nature : $(3 + 5)x = 8x$.",
   "autres": [
    "lit-distrib",
    "lit-double",
    "lit-test"
   ]
  },
  {
   "id": "o47",
   "chap": "equ",
   "enonce": "On résout $x + 9 = 20$ et on trouve $x = 11$. Que doit-on faire ensuite ?",
   "bon": "equ-verif",
   "explication": "On vérifie dans l'équation de départ ($11 + 9 = 20$) puis on conclut par une phrase.",
   "autres": [
    "equ-def",
    "equ-add",
    "equ-mult"
   ]
  },
  {
   "id": "o48",
   "chap": "prop",
   "enonce": "6 stylos coûtent 9 €. Combien coûtent 10 stylos ?",
   "bon": "prop-coef",
   "explication": "Coefficient de proportionnalité : $9 \\div 6 = 1{,}5$ €, puis $10 \\times 1{,}5 = 15$ €.",
   "autres": [
    "pourcent10",
    "prop-def",
    "pourcent-frac"
   ]
  },
  {
   "id": "o49",
   "chap": "prop",
   "enonce": "Un jeu coûte 60 €. On obtient $10\\,\\%$ de réduction. Quel est le montant de la réduction ?",
   "bon": "pourcent10",
   "explication": "$10\\,\\%$ : on divise par 10, soit 6 €.",
   "autres": [
    "prop-coef",
    "pourcent-frac",
    "frac-dec"
   ]
  },
  {
   "id": "o50",
   "chap": "rat1",
   "enonce": "Écrire $50\\,\\%$ sous forme de fraction.",
   "bon": "pourcent-frac",
   "explication": "$50\\,\\% = \\dfrac{50}{100} = \\dfrac{1}{2}$.",
   "autres": [
    "pourcent10",
    "frac-dec",
    "frac-comp"
   ]
  },
  {
   "id": "o51",
   "chap": "don",
   "enonce": "Voici cinq notes : 10, 14, 8, 12 et 16. Quelle est la moyenne ?",
   "bon": "moyenne",
   "explication": "On additionne (60) puis on divise par le nombre de notes : $60 \\div 5 = 12$.",
   "autres": [
    "freq",
    "diagrammes",
    "freq-compar"
   ]
  },
  {
   "id": "o52",
   "chap": "don",
   "enonce": "Dans un collège de 400 élèves, 120 sont externes. Quelle est la fréquence des externes ?",
   "bon": "freq",
   "explication": "Effectif ÷ effectif total : $\\dfrac{120}{400} = 0{,}3$, soit $30\\,\\%$.",
   "autres": [
    "moyenne",
    "diagrammes",
    "freq-compar"
   ]
  },
  {
   "id": "o53",
   "chap": "proba",
   "enonce": "On lance un dé équilibré à 6 faces. Quelle est la probabilité d'obtenir un nombre pair ?",
   "bon": "proba-f",
   "explication": "Issues favorables : 2, 4, 6 ; total : 6. Probabilité : $\\dfrac{3}{6} = \\dfrac{1}{2}$.",
   "autres": [
    "freq",
    "proba-chance",
    "moyenne"
   ]
  },
  {
   "id": "o54",
   "chap": "rel2",
   "enonce": "Calculer $(+8) + (-13)$.",
   "bon": "rel-add2",
   "explication": "Signes contraires : on soustrait les distances à zéro ($13 - 8 = 5$) et on garde le signe du plus éloigné de 0 : $-5$.",
   "autres": [
    "rel-add",
    "rel-sous",
    "rel-comp"
   ]
  },
  {
   "id": "o55",
   "chap": "rel2",
   "enonce": "Calculer $20 - (5 + 8)$.",
   "bon": "rel-paren",
   "explication": "On calcule d'abord la parenthèse : $20 - 13 = 7$.",
   "autres": [
    "rel-add",
    "rel-comp",
    "rel-oppose"
   ]
  },
  {
   "id": "o56",
   "chap": "ench",
   "enonce": "Calculer $18 - 2 \\times 5$.",
   "bon": "priorites",
   "explication": "La multiplication est prioritaire : $2 \\times 5 = 10$ puis $18 - 10 = 8$.",
   "autres": [
    "ecriture-egal",
    "x10"
   ]
  },
  {
   "id": "o57",
   "chap": "puis",
   "enonce": "Calculer $3 \\times 2^{2}$.",
   "bon": "puiss-prior",
   "explication": "La puissance d'abord : $2^{2} = 4$, puis $3 \\times 4 = 12$.",
   "autres": [
    "priorites",
    "carre-def",
    "carres-parfaits"
   ]
  },
  {
   "id": "o59",
   "chap": "aire",
   "enonce": "Convertir 3 m² en cm².",
   "bon": "conv-aire",
   "explication": "1 m² $= 10\\,000$ cm², donc 30 000 cm².",
   "autres": [
    "x10",
    "litre"
   ]
  }
 ]
});
