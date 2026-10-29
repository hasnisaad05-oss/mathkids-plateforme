// MathKids - Données pédagogiques et de gamification

const MATH_DATA = {
  // Liste des thèmes
  topics: [
    {
      id: "nombres",
      title: "Les Nombres",
      icon: "🔢",
      color: "#FF8A65",
      description: "Apprends à compter, ordonner et décomposer les nombres."
    },
    {
      id: "addition",
      title: "L'Addition (+)",
      icon: "➕",
      color: "#4CAF50",
      description: "Rassemble des objets et calcule des sommes magiques."
    },
    {
      id: "soustraction",
      title: "La Soustraction (-)",
      icon: "➖",
      color: "#29B6F6",
      description: "Enlève des quantités et découvre combien il en reste."
    },
    {
      id: "multiplication",
      title: "La Multiplication (×)",
      icon: "✖️",
      color: "#AB47BC",
      description: "Multiplie tes forces avec les tables magiques !"
    },
    {
      id: "division",
      title: "La Division (÷)",
      icon: "➗",
      color: "#FFA726",
      description: "Partage équitablement avec tous tes amis."
    },
    {
      id: "problemes",
      title: "Les Énigmes",
      icon: "🧩",
      color: "#26A69A",
      description: "Deviens un super détective des petits problèmes du quotidien."
    }
  ],

  // Cours détaillés et interactifs
  lessons: {
    nombres: {
      title: "Comprendre et compter les nombres",
      emoji: "🔢",
      difficulty: "Niveau Débutant (6-8 ans)",
      intro: "Un nombre sert à compter combien il y a de choses : des pommes, des jouets ou des étoiles !",
      sections: [
        {
          title: "1. Les unités et les dizaines",
          content: "Quand on a 10 unités, on forme une **dizaine** entière ! Par exemple, le nombre 24 c'est : 2 dizaines (20) et 4 unités (4).",
          visual: [
            { label: "Dizaines (paquets de 10)", count: 2, icon: "📦" },
            { label: "Unités", count: 4, icon: "🍎" }
          ],
          tip: "Astuce : Regarde toujours le chiffre le plus à droite pour connaître les unités."
        },
        {
          title: "2. Comparer les nombres",
          content: "Pour savoir quel nombre est le plus grand, regarde d'abord le nombre de dizaines : 35 est plus grand que 28 parce que 3 dizaines > 2 dizaines !",
          visualText: "28 🍎 < 35 🍎",
          tip: "Le crocodile ouvre toujours sa bouche vers le plus grand nombre : 28 < 35 !"
        }
      ]
    },

    addition: {
      title: "L'Addition : réunir et compter ensemble",
      emoji: "➕",
      difficulty: "Tous niveaux (6-10 ans)",
      intro: "L'addition sert à mettre plusieurs quantités ensemble pour savoir combien on en a au total. On utilise le symbole plus (+).",
      sections: [
        {
          title: "1. Le principe du panier commun",
          content: "Si tu as 3 pommes et qu'un ami te donne 2 pommes, tu fais l'opération : 3 + 2 = 5 pommes !",
          visualFormula: { a: 3, b: 2, op: "+", res: 5, icon: "🍏" },
          tip: "Tu peux compter sur tes doigts ou imaginer que tu ajoutes des billes !"
        },
        {
          title: "2. Les compléments à 10 magiques",
          content: "Connaître les amis du 10 te fera calculer ultra-vite :",
          interactiveExamples: [
            "1 + 9 = 10",
            "2 + 8 = 10",
            "3 + 7 = 10",
            "4 + 6 = 10",
            "5 + 5 = 10"
          ],
          tip: "Astuce : 8 + 5 ? Prends 2 de 5 pour faire 10 avec 8, il te reste 3, donc 10 + 3 = 13 !"
        }
      ]
    },

    soustraction: {
      title: "La Soustraction : enlever et trouver la différence",
      emoji: "➖",
      difficulty: "Tous niveaux (6-10 ans)",
      intro: "La soustraction sert à retirer une quantité ou à mesurer ce qu'il manque. On utilise le signe moins (-).",
      sections: [
        {
          title: "1. Enlever des éléments",
          content: "Tu as 7 cookies délicieux. Tu en manges 3. Combien en reste-t-il ? 7 - 3 = 4 cookies !",
          visualFormula: { a: 7, b: 3, op: "-", res: 4, icon: "🍪" },
          tip: "Pour calculer 7 - 3, compte à rebours : 6, 5, 4 !"
        },
        {
          title: "2. La différence entre deux nombres",
          content: "Léo a 10 billes et Maya a 6 billes. Combien de billes Maya doit-elle gagner pour avoir comme Léo ? 10 - 6 = 4 billes.",
          tip: "La soustraction est l'inverse de l'addition : 6 + 4 = 10 donc 10 - 6 = 4 !"
        }
      ]
    },

    multiplication: {
      title: "La Multiplication : l'addition super rapide",
      emoji: "✖️",
      difficulty: "Niveau Moyen à Avancé (7-11 ans)",
      intro: "La multiplication est une façon géniale d'additionner plusieurs fois la même chose sans perdre de temps.",
      sections: [
        {
          title: "1. Les paquets identiques",
          content: "Si tu as 4 sacs de 3 bonbons, au lieu d'écrire 3 + 3 + 3 + 3, on écrit 4 × 3 = 12 bonbons !",
          visualGrid: { rows: 4, cols: 3, icon: "🍬" },
          tip: "4 × 3 donne le même résultat que 3 × 4 = 12 ! Tu peux inverser l'ordre des nombres."
        },
        {
          title: "2. Les secrets des tables faciles",
          content: "• Table de 2 : ce sont les doubles (2, 4, 6, 8, 10...)\n• Table de 5 : les résultats se terminent toujours par 0 ou 5 !\n• Table de 10 : il suffit de rajouter un zéro à la fin (7 × 10 = 70).",
          tip: "N'apprends pas tout d'un coup : maîtrise la table de 2, puis de 5, puis de 10 !"
        }
      ]
    },

    division: {
      title: "La Division : le super pouvoir du partage équitable",
      emoji: "➗",
      difficulty: "Niveau Avancé (8-11 ans)",
      intro: "Diviser, c'est partager équitablement une quantité en plusieurs parts égales pour qu'il n'y ait pas de jaloux !",
      sections: [
        {
          title: "1. Le partage de pizzas ou gâteaux",
          content: "Tu as 12 bonbons et 3 copains. Tu veux donner le même nombre à chacun. 12 ÷ 3 = 4 bonbons par personne !",
          visualFormula: { a: 12, b: 3, op: "÷", res: 4, icon: "🧁" },
          tip: "Pour trouver 12 ÷ 3, demande-toi : 'Dans la table de 3, qu'est-ce qui fait 12 ?' Réponse : 3 × 4 = 12 !"
        },
        {
          title: "2. Et s'il y a un reste ?",
          content: "Si tu as 7 ballons pour 2 enfants : chacun reçoit 3 ballons (2 × 3 = 6) et il reste 1 ballon qu'on garde de côté.",
          tip: "En mathématiques, on écrit : 7 = (2 × 3) + 1. Le reste doit toujours être plus petit que le nombre de parts !"
        }
      ]
    },

    problemes: {
      title: "Les Problèmes : la recette du champion",
      emoji: "🧩",
      difficulty: "Tous niveaux (6-11 ans)",
      intro: "Un problème mathématique est une petite histoire dans laquelle il y a un mystère à résoudre.",
      sections: [
        {
          title: "La méthode en 4 étapes magiques",
          content: "1. **Lis l'histoire** attentivement en dessinant la scène dans ta tête.\n2. **Trouve les nombres importants** et ce que l'on te demande.\n3. **Choisis la bonne opération** (+ pour ajouter, - pour retirer, × pour répéter, ÷ pour partager).\n4. **Écris la réponse** avec une phrase claire qui répond à la question !",
          tip: "Repère les mots magiques : 'en tout' (addition), 'il reste' (soustraction), 'chacun' (multiplication ou division) !"
        }
      ]
    }
  },

  // Petits problèmes rédigés avec feedback
  wordProblems: [
    {
      id: "wp1",
      level: "facile",
      theme: "addition",
      icon: "🍎",
      question: "Thomas ramasse 6 pommes rouges le matin et 5 pommes vertes l'après-midi. Combien de pommes a-t-il ramassées en tout ?",
      options: [10, 11, 12, 13],
      answer: 11,
      explanation: "On réunit les deux récoltes : 6 + 5 = 11 pommes."
    },
    {
      id: "wp2",
      level: "facile",
      theme: "soustraction",
      icon: "🎈",
      question: "Léa avait 9 ballons colorés pour sa fête. 4 ballons se sont envolés dans le ciel. Combien de ballons lui reste-t-il ?",
      options: [4, 5, 6, 7],
      answer: 5,
      explanation: "On enlève les ballons envolés : 9 - 4 = 5 ballons."
    },
    {
      id: "wp3",
      level: "moyen",
      theme: "multiplication",
      icon: "🚗",
      question: "Un parking compte 5 rangées. Dans chaque rangée, il y a 4 voitures garées. Combien y a-t-il de voitures au total ?",
      options: [15, 18, 20, 24],
      answer: 20,
      explanation: "Il y a 5 rangées de 4 voitures : 5 × 4 = 20 voitures."
    },
    {
      id: "wp4",
      level: "moyen",
      theme: "division",
      icon: "🍫",
      question: "Une maman partage équitablement 18 carrés de chocolat entre ses 3 enfants. Combien de carrés reçoit chaque enfant ?",
      options: [5, 6, 7, 8],
      answer: 6,
      explanation: "On partage 18 en 3 parts égales : 18 ÷ 3 = 6 carrés chacun."
    },
    {
      id: "wp5",
      level: "difficile",
      theme: "multiplication",
      icon: "📚",
      question: "Dans une classe, il y a 6 boîtes de feutres. Chaque boîte contient 8 feutres. Combien de feutres y a-t-il en tout ?",
      options: [42, 46, 48, 54],
      answer: 48,
      explanation: "6 boîtes × 8 feutres = 48 feutres en tout."
    },
    {
      id: "wp6",
      level: "difficile",
      theme: "problemes",
      icon: "🪙",
      question: "Lucas a 25 euros dans sa tirelire. Pour son anniversaire, ses grands-parents lui offrent 15 euros. Il s'achète ensuite un livre à 12 euros. Combien lui reste-t-il ?",
      options: [26, 28, 30, 32],
      answer: 28,
      explanation: "D'abord il a : 25 + 15 = 40 euros. Puis il dépense 12 euros : 40 - 12 = 28 euros !"
    }
  ],

  // Quiz questions fixes et variées
  quizQuestions: [
    {
      id: "q1",
      topic: "addition",
      level: "facile",
      question: "Combien font 7 + 8 ?",
      options: ["14", "15", "16", "17"],
      correct: 1,
      explanation: "7 + 8 = 15. Astuce : 7 + 7 = 14, plus 1 = 15 !"
    },
    {
      id: "q2",
      topic: "soustraction",
      level: "facile",
      question: "Combien font 14 - 6 ?",
      options: ["7", "8", "9", "10"],
      correct: 1,
      explanation: "14 - 6 = 8. (Car 8 + 6 = 14)."
    },
    {
      id: "q3",
      topic: "multiplication",
      level: "facile",
      question: "Combien font 6 × 4 ?",
      options: ["20", "22", "24", "26"],
      correct: 2,
      explanation: "6 × 4 = 24. C'est 4 paquets de 6 !"
    },
    {
      id: "q4",
      topic: "division",
      level: "moyen",
      question: "Combien font 24 ÷ 6 ?",
      options: ["3", "4", "5", "6"],
      correct: 1,
      explanation: "24 ÷ 6 = 4. Car 4 × 6 = 24 !"
    },
    {
      id: "q5",
      topic: "nombres",
      level: "moyen",
      question: "Dans le nombre 83, quel est le chiffre des dizaines ?",
      options: ["3", "8", "80", "11"],
      correct: 1,
      explanation: "Dans 83, le 8 représente 8 dizaines (80) et le 3 représente 3 unités."
    },
    {
      id: "q6",
      topic: "multiplication",
      level: "moyen",
      question: "Quel est le résultat de 9 × 7 ?",
      options: ["56", "61", "63", "72"],
      correct: 2,
      explanation: "9 × 7 = 63. Bravo pour la table de 9 !"
    },
    {
      id: "q7",
      topic: "division",
      level: "difficile",
      question: "Combien font 45 ÷ 5 ?",
      options: ["7", "8", "9", "10"],
      correct: 2,
      explanation: "45 ÷ 5 = 9. Car 9 × 5 = 45 !"
    },
    {
      id: "q8",
      topic: "problemes",
      level: "difficile",
      question: "Un robot fait 4 pas en avant, puis 9 pas en avant, puis recule de 3 pas. À quelle case se trouve-t-il ?",
      options: ["10", "11", "12", "13"],
      correct: 0,
      explanation: "4 + 9 = 13 pas, puis 13 - 3 = 10 !"
    }
  ],

  // Badges et Succès à débloquer
  badges: [
    {
      id: "first_star",
      title: "Première Étoile",
      icon: "⭐",
      description: "Termine ton premier exercice ou réponds correctement à une question.",
      condition: (stats) => stats.correctAnswers >= 1
    },
    {
      id: "add_master",
      title: "As de l'Addition",
      icon: "➕",
      description: "Réussis 5 calculs d'addition.",
      condition: (stats) => (stats.byTopic.addition || 0) >= 5
    },
    {
      id: "sub_ninja",
      title: "Ninja du Moins",
      icon: "➖",
      description: "Réussis 5 calculs de soustraction.",
      condition: (stats) => (stats.byTopic.soustraction || 0) >= 5
    },
    {
      id: "mult_wizard",
      title: "Magicien des Tables",
      icon: "✖️",
      description: "Réussis 5 multiplications sans faute.",
      condition: (stats) => (stats.byTopic.multiplication || 0) >= 5
    },
    {
      id: "div_champion",
      title: "Roi du Partage",
      icon: "➗",
      description: "Réussis 5 divisions équitables.",
      condition: (stats) => (stats.byTopic.division || 0) >= 5
    },
    {
      id: "quiz_hero",
      title: "Héros du Grand Quiz",
      icon: "🏆",
      description: "Obtiens au moins 80% de bonnes réponses à un grand quiz.",
      condition: (stats) => stats.highScoreQuiz >= 80
    },
    {
      id: "streak_flame",
      title: "Série Enflammée",
      icon: "🔥",
      description: "Atteins une série de 5 bonnes réponses consécutives.",
      condition: (stats) => stats.maxStreak >= 5
    },
    {
      id: "math_legend",
      title: "Génie des Maths",
      icon: "👑",
      description: "Atteins un total de 100 points d'expérience !",
      condition: (stats) => stats.score >= 100
    }
  ]
};

// Exposer globalement
window.MATH_DATA = MATH_DATA;

