/**
 * MathKids - Logique Principale de l'Application
 * Gestion de l'état, de la progression, des exercices, quiz et effets visuels
 */

class MathApp {
  constructor() {
    this.state = this.loadState();
    this.currentView = 'home';
    
    // État de l'entraînement
    this.practice = {
      operation: 'addition',
      difficulty: 'facile',
      currentQuestion: null,
      isAnswering: false
    };

    // État du quiz
    this.quiz = {
      active: false,
      questions: [],
      currentIndex: 0,
      score: 0,
      hasAnswered: false
    };

    this.confettiRunning = false;
    this.confettiParticles = [];

    this.init();
  }

  // Initialisation par défaut de l'état
  getDefaultState() {
    return {
      score: 0,
      stars: 0,
      streak: 0,
      maxStreak: 0,
      correctAnswers: 0,
      totalAnswers: 0,
      highScoreQuiz: 0,
      byTopic: {
        addition: 0,
        soustraction: 0,
        multiplication: 0,
        division: 0,
        problemes: 0,
        nombres: 0
      },
      unlockedBadges: [],
      avatar: '🦊',
      soundEnabled: true
    };
  }

  // Sauvegarde dans localStorage
  loadState() {
    try {
      const saved = localStorage.getItem('mathkids_state_v1');
      if (saved) {
        return { ...this.getDefaultState(), ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Impossible d'accéder au localStorage", e);
    }
    return this.getDefaultState();
  }

  saveState() {
    try {
      localStorage.setItem('mathkids_state_v1', JSON.stringify(this.state));
    } catch (e) {
      console.warn("Erreur sauvegarde", e);
    }
    this.updateHeaderStats();
    this.checkBadges();
  }

  init() {
    this.bindEvents();
    this.initConfetti();
    this.updateHeaderStats();
    this.renderTopicsGrid();
    this.renderLessonsTabs();
    this.renderLesson('addition');
    this.renderBadges();
    this.switchView('home');
  }

  // Écouteurs d'événements
  bindEvents() {
    // Navigation Desktop et Mobile
    document.querySelectorAll('[data-view-target]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = btn.getAttribute('data-view-target');
        this.switchView(view);
        window.soundFx.playPop();
      });
    });

    // Bouton de son
    const soundToggle = document.getElementById('sound-toggle-btn');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        const isEnabled = window.soundFx.toggleSound();
        this.state.soundEnabled = isEnabled;
        soundToggle.textContent = isEnabled ? '🔊' : '🔇';
        this.saveState();
      });
      // Restaurer état son
      if (!this.state.soundEnabled) {
        window.soundFx.enabled = false;
        soundToggle.textContent = '🔇';
      }
    }

    // Sélecteur d'opération (Entraînement)
    document.querySelectorAll('.op-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.op-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.practice.operation = btn.getAttribute('data-op');
        window.soundFx.playPop();
        this.generatePracticeQuestion();
      });
    });

    // Sélecteur de difficulté (Entraînement)
    document.querySelectorAll('.diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.practice.difficulty = btn.getAttribute('data-diff');
        window.soundFx.playPop();
        this.generatePracticeQuestion();
      });
    });

    // Fermeture modale
    const closeModalBtn = document.getElementById('close-modal-btn');
    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', () => {
        document.getElementById('reward-modal').classList.remove('active');
        window.soundFx.playPop();
      });
    }

    // Bouton Démarrer Quiz
    const startQuizBtn = document.getElementById('start-quiz-btn');
    if (startQuizBtn) {
      startQuizBtn.addEventListener('click', () => {
        this.startQuiz();
      });
    }

    // Bouton Quiz Suivant
    const nextQuizBtn = document.getElementById('quiz-next-btn');
    if (nextQuizBtn) {
      nextQuizBtn.addEventListener('click', () => {
        this.nextQuizQuestion();
      });
    }

    // Bouton Recommencer Quiz
    const restartQuizBtn = document.getElementById('quiz-restart-btn');
    if (restartQuizBtn) {
      restartQuizBtn.addEventListener('click', () => {
        this.startQuiz();
      });
    }

    // Bouton Reset données pour test ou réinitialisation
    const resetBtn = document.getElementById('reset-progress-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm("Veux-tu vraiment réinitialiser ta progression ?")) {
          this.state = this.getDefaultState();
          this.saveState();
          this.renderBadges();
          this.updateHeaderStats();
          alert("Ta progression a été réinitialisée ! C'est parti pour une nouvelle aventure !");
        }
      });
    }
  }

  // Changement de vue
  switchView(viewName) {
    this.currentView = viewName;

    // Mise à jour des classes active sur les sections
    document.querySelectorAll('.view-section').forEach(sec => {
      sec.classList.remove('active');
    });
    const targetSection = document.getElementById(`view-${viewName}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Mise à jour de la navigation desktop & mobile
    document.querySelectorAll('[data-view-target]').forEach(btn => {
      if (btn.getAttribute('data-view-target') === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Si on arrive sur l'entraînement, générer un exercice si besoin
    if (viewName === 'practice' && !this.practice.currentQuestion) {
      this.generatePracticeQuestion();
    }

    // Si on arrive sur la progression, recalculer l'affichage
    if (viewName === 'progress') {
      this.renderProgressDashboard();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Mise à jour des stats globales dans le header
  updateHeaderStats() {
    const starCount = document.getElementById('header-stars-count');
    const scoreCount = document.getElementById('header-score-count');
    if (starCount) starCount.textContent = this.state.stars;
    if (scoreCount) scoreCount.textContent = this.state.score;
  }

  // Calcul du niveau du joueur
  getPlayerLevel() {
    const score = this.state.score;
    if (score < 25) return { level: 1, title: "Apprenti Calculateur", next: 25, progress: (score / 25) * 100 };
    if (score < 60) return { level: 2, title: "Aventurier des Chiffres", next: 60, progress: ((score - 25) / 35) * 100 };
    if (score < 120) return { level: 3, title: "Explorateur Mathématicien", next: 120, progress: ((score - 60) / 60) * 100 };
    if (score < 200) return { level: 4, title: "Maître du Calcul Mental", next: 200, progress: ((score - 120) / 80) * 100 };
    return { level: 5, title: "Grand Génie des Maths", next: 500, progress: 100 };
  }

  // Rendu de la grille des thèmes sur l'accueil
  renderTopicsGrid() {
    const container = document.getElementById('topics-grid-container');
    if (!container) return;

    container.innerHTML = MATH_DATA.topics.map(t => `
      <div class="topic-card" onclick="window.mathApp.openTopicLesson('${t.id}')">
        <div>
          <span class="topic-badge-icon">${t.icon}</span>
          <h3>${t.title}</h3>
          <p>${t.description}</p>
        </div>
        <div class="topic-card-footer">
          <span class="topic-action-link">Découvrir le cours ➔</span>
          <span style="font-size: 0.85rem; font-weight:700; color: #10B981;">
            ${(this.state.byTopic[t.id] || 0)} réussis
          </span>
        </div>
      </div>
    `).join('');
  }

  openTopicLesson(topicId) {
    window.soundFx.playPop();
    this.switchView('lessons');
    this.renderLesson(topicId);
  }

  // Rendu des onglets de cours
  renderLessonsTabs() {
    const container = document.getElementById('lesson-tabs-container');
    if (!container) return;

    container.innerHTML = MATH_DATA.topics.map((t, idx) => `
      <button class="lesson-tab ${idx === 0 ? 'active' : ''}" data-topic="${t.id}" onclick="window.mathApp.renderLesson('${t.id}')">
        ${t.icon} ${t.title}
      </button>
    `).join('');
  }

  // Rendu dynamique du cours sélectionné
  renderLesson(topicId) {
    const lesson = MATH_DATA.lessons[topicId];
    if (!lesson) return;

    // Onglet actif
    document.querySelectorAll('.lesson-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-topic') === topicId);
    });

    const displayContainer = document.getElementById('lesson-content-display');
    if (!displayContainer) return;

    let sectionsHtml = lesson.sections.map(sec => {
      let visualHtml = '';

      if (sec.visualFormula) {
        const f = sec.visualFormula;
        const iconA = Array(f.a).fill(f.icon).join(' ');
        const iconB = Array(f.b).fill(f.icon).join(' ');
        const iconRes = Array(Math.min(f.res, 15)).fill(f.icon).join(' ');

        visualHtml = `
          <div class="visual-box">
            <div class="visual-items-row">
              <div class="visual-group"><span>${iconA}</span> <strong>(${f.a})</strong></div>
              <span class="visual-operator">${f.op}</span>
              <div class="visual-group"><span>${iconB}</span> <strong>(${f.b})</strong></div>
              <span class="visual-operator">=</span>
              <div class="visual-group" style="background: #E0E7FF; color: #4338CA;">
                <span>${iconRes}</span> <strong>(${f.res})</strong>
              </div>
            </div>
          </div>
        `;
      } else if (sec.visualGrid) {
        const g = sec.visualGrid;
        let gridDots = '';
        for (let r = 0; r < g.rows; r++) {
          gridDots += `<div style="display:flex; gap:8px; justify-content:center; margin:4px 0;">`;
          for (let c = 0; c < g.cols; c++) {
            gridDots += `<span>${g.icon}</span>`;
          }
          gridDots += `</div>`;
        }
        visualHtml = `
          <div class="visual-box">
            <div style="font-weight:700; margin-bottom:8px; color:#4B5563;">${g.rows} rangées de ${g.cols} objets :</div>
            ${gridDots}
          </div>
        `;
      } else if (sec.visual) {
        visualHtml = `
          <div class="visual-box">
            <div class="visual-items-row">
              ${sec.visual.map(item => `
                <div class="visual-group">
                  <span>${Array(item.count).fill(item.icon).join(' ')}</span>
                  <span><strong>${item.count}</strong> ${item.label}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else if (sec.visualText) {
        visualHtml = `
          <div class="visual-box">
            <div style="font-size: 2rem; font-weight:800; color:#4F46E5;">${sec.visualText}</div>
          </div>
        `;
      }

      let interactiveHtml = '';
      if (sec.interactiveExamples) {
        interactiveHtml = `
          <div style="display:flex; flex-wrap:wrap; gap:8px; margin: 12px 0;">
            ${sec.interactiveExamples.map(e => `
              <span style="background:#F1F5F9; font-weight:700; padding:6px 14px; border-radius:99px; color:#1E293B;">${e}</span>
            `).join('')}
          </div>
        `;
      }

      return `
        <div class="lesson-sub-section">
          <h3>${sec.title}</h3>
          <p style="font-size:1.05rem; line-height:1.6; margin-bottom:12px;">${sec.content.replace(/\n/g, '<br>')}</p>
          ${visualHtml}
          ${interactiveHtml}
          ${sec.tip ? `
            <div class="tip-box">
              <span class="tip-icon">💡</span>
              <div>${sec.tip}</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    displayContainer.innerHTML = `
      <div class="lesson-detail-card">
        <div class="lesson-meta">⭐ ${lesson.difficulty}</div>
        <h2>${lesson.emoji} ${lesson.title}</h2>
        <div class="lesson-intro-box">${lesson.intro}</div>
        ${sectionsHtml}
        <div style="text-align:center; margin-top:32px;">
          <button class="btn btn-accent btn-lg" onclick="window.mathApp.startPracticeWithTopic('${topicId}')">
            🎯 S'entraîner sur ce sujet !
          </button>
        </div>
      </div>
    `;
  }

  startPracticeWithTopic(topicId) {
    window.soundFx.playPop();
    const op = (topicId === 'nombres') ? 'addition' : topicId;
    this.practice.operation = op;

    // Màj visuelle du bouton op
    document.querySelectorAll('.op-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-op') === op);
    });

    this.switchView('practice');
    this.generatePracticeQuestion();
  }

  // ==========================================================================
  // Générateur d'exercices d'entraînement
  // ==========================================================================
  generatePracticeQuestion() {
    this.practice.isAnswering = false;
    const op = this.practice.operation;
    const diff = this.practice.difficulty;

    const feedback = document.getElementById('practice-feedback');
    if (feedback) {
      feedback.className = 'feedback-box';
      feedback.innerHTML = 'Choisis la bonne réponse ci-dessous !';
    }

    // Gestion du thème "Problèmes"
    if (op === 'problemes') {
      const filtered = MATH_DATA.wordProblems.filter(p => {
        if (diff === 'facile') return p.level === 'facile';
        if (diff === 'moyen') return p.level === 'moyen';
        return p.level === 'difficile';
      });
      const selected = filtered[Math.floor(Math.random() * filtered.length)] || MATH_DATA.wordProblems[0];

      this.practice.currentQuestion = {
        type: 'wordProblem',
        displayPrompt: selected.question,
        displayMath: selected.icon,
        answer: selected.answer,
        options: this.shuffleArray([...selected.options]),
        explanation: selected.explanation,
        topic: selected.theme
      };
      this.renderPracticeUI();
      return;
    }

    // Paramètres numériques par difficulté
    let maxA = 10, maxB = 10;
    if (diff === 'moyen') { maxA = 30; maxB = 20; }
    if (diff === 'difficile') { maxA = 100; maxB = 50; }

    let a = Math.floor(Math.random() * maxA) + 1;
    let b = Math.floor(Math.random() * maxB) + 1;
    let answer = 0;
    let symbol = '+';

    switch (op) {
      case 'addition':
        symbol = '+';
        answer = a + b;
        break;
      case 'soustraction':
        symbol = '−';
        // Éviter résultats négatifs
        if (a < b) { const tmp = a; a = b; b = tmp; }
        answer = a - b;
        break;
      case 'multiplication':
        symbol = '×';
        if (diff === 'facile') { a = Math.floor(Math.random() * 5) + 1; b = Math.floor(Math.random() * 5) + 1; }
        else if (diff === 'moyen') { a = Math.floor(Math.random() * 9) + 2; b = Math.floor(Math.random() * 9) + 2; }
        else { a = Math.floor(Math.random() * 12) + 2; b = Math.floor(Math.random() * 12) + 2; }
        answer = a * b;
        break;
      case 'division':
        symbol = '÷';
        // Pour une division exacte
        const divisor = (diff === 'facile') ? (Math.floor(Math.random() * 4) + 2) : (Math.floor(Math.random() * 8) + 2);
        const quotient = (diff === 'facile') ? (Math.floor(Math.random() * 5) + 1) : (Math.floor(Math.random() * 10) + 2);
        a = divisor * quotient;
        b = divisor;
        answer = quotient;
        break;
    }

    // Générer 3 faux choix plausibles
    const options = new Set();
    options.add(answer);
    while (options.size < 4) {
      let delta = Math.floor(Math.random() * 5) + 1;
      let wrong = Math.random() > 0.5 ? answer + delta : answer - delta;
      if (wrong >= 0 && wrong !== answer) {
        options.add(wrong);
      }
    }

    this.practice.currentQuestion = {
      type: 'calc',
      a, b, symbol, answer,
      options: this.shuffleArray(Array.from(options)),
      topic: op
    };

    this.renderPracticeUI();
  }

  renderPracticeUI() {
    const q = this.practice.currentQuestion;
    const promptEl = document.getElementById('practice-prompt-text');
    const mathEl = document.getElementById('practice-math-display');
    const gridEl = document.getElementById('practice-answers-grid');
    const streakEl = document.getElementById('practice-streak-counter');

    if (streakEl) {
      streakEl.innerHTML = `🔥 Série : ${this.state.streak}`;
    }

    if (q.type === 'wordProblem') {
      if (promptEl) promptEl.textContent = "Résous cette énigme :";
      if (mathEl) {
        mathEl.style.fontSize = '1.3rem';
        mathEl.style.lineHeight = '1.4';
        mathEl.innerHTML = `<span style="font-size:2.5rem; display:block; margin-bottom:8px;">${q.displayMath}</span> ${q.displayPrompt}`;
      }
    } else {
      if (promptEl) promptEl.textContent = "Quel est le bon résultat ?";
      if (mathEl) {
        mathEl.style.fontSize = '3.4rem';
        mathEl.innerHTML = `${q.a} <span class="op-symbol">${q.symbol}</span> ${q.b} = <span style="color:#6366F1;">?</span>`;
      }
    }

    if (gridEl) {
      gridEl.innerHTML = q.options.map((opt) => `
        <button class="answer-btn" onclick="window.mathApp.handlePracticeAnswer(${opt}, this)">
          ${opt}
        </button>
      `).join('');
    }
  }

  handlePracticeAnswer(selectedVal, btnElement) {
    if (this.practice.isAnswering) return;
    this.practice.isAnswering = true;

    const q = this.practice.currentQuestion;
    const isCorrect = selectedVal === q.answer;
    const feedback = document.getElementById('practice-feedback');

    this.state.totalAnswers++;

    if (isCorrect) {
      // Victoire
      btnElement.classList.add('correct');
      window.soundFx.playSuccess();
      this.triggerConfetti(0.3);

      this.state.score += 10;
      this.state.stars += 1;
      this.state.streak++;
      if (this.state.streak > this.state.maxStreak) {
        this.state.maxStreak = this.state.streak;
      }
      this.state.correctAnswers++;
      this.state.byTopic[q.topic] = (this.state.byTopic[q.topic] || 0) + 1;

      if (feedback) {
        feedback.className = 'feedback-box success';
        feedback.innerHTML = `🎉 Bravo ! C'est exactement ${q.answer} ! (+10 XP, +1 ⭐)`;
      }

      this.saveState();

      // Prochaine question après une courte pause
      setTimeout(() => {
        this.generatePracticeQuestion();
      }, 1400);

    } else {
      // Erreur
      btnElement.classList.add('incorrect');
      window.soundFx.playError();
      this.state.streak = 0;

      // Montrer la bonne réponse
      document.querySelectorAll('.answer-btn').forEach(btn => {
        if (parseInt(btn.textContent.trim(), 10) === q.answer) {
          btn.classList.add('correct');
        }
      });

      if (feedback) {
        feedback.className = 'feedback-box error';
        feedback.innerHTML = `Oh, pas tout à fait ! La bonne réponse était <strong>${q.answer}</strong>. Tu feras mieux à la suivante ! 💪`;
      }

      this.saveState();

      // Permettre de passer au calcul suivant
      setTimeout(() => {
        this.generatePracticeQuestion();
      }, 2200);
    }
  }

  // ==========================================================================
  // Moteur du Grand Quiz
  // ==========================================================================
  startQuiz() {
    window.soundFx.playFanfare();
    this.quiz.active = true;
    this.quiz.score = 0;
    this.quiz.currentIndex = 0;
    this.quiz.hasAnswered = false;

    // Mélanger les questions fixes
    this.quiz.questions = this.shuffleArray([...MATH_DATA.quizQuestions]).slice(0, 5);

    document.getElementById('quiz-intro-card').style.display = 'none';
    document.getElementById('quiz-result-view').style.display = 'none';
    document.getElementById('quiz-question-view').style.display = 'block';

    this.renderCurrentQuizQuestion();
  }

  renderCurrentQuizQuestion() {
    this.quiz.hasAnswered = false;
    const q = this.quiz.questions[this.quiz.currentIndex];
    const total = this.quiz.questions.length;
    const current = this.quiz.currentIndex + 1;

    // Progress bar
    const fill = document.getElementById('quiz-progress-fill');
    if (fill) fill.style.width = `${((current - 1) / total) * 100}%`;

    // Infos
    const countEl = document.getElementById('quiz-counter-text');
    if (countEl) countEl.textContent = `Question ${current} sur ${total}`;

    const scoreEl = document.getElementById('quiz-current-score-text');
    if (scoreEl) scoreEl.textContent = `Score : ${this.quiz.score} pts`;

    // Texte question
    const qText = document.getElementById('quiz-question-title');
    if (qText) qText.textContent = q.question;

    // Cacher l'explication et le bouton suivant
    const expBox = document.getElementById('quiz-explanation-box');
    if (expBox) expBox.style.display = 'none';

    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) nextBtn.style.display = 'none';

    // Rendu options
    const optList = document.getElementById('quiz-options-container');
    if (optList) {
      optList.innerHTML = q.options.map((opt, idx) => `
        <button class="quiz-option-btn" onclick="window.mathApp.handleQuizSelect(${idx}, this)">
          <span style="display:inline-flex; width:28px; height:28px; border-radius:50%; background:#E2E8F0; align-items:center; justify-content:center; font-weight:700; font-size:0.9rem;">
            ${String.fromCharCode(65 + idx)}
          </span>
          <span>${opt}</span>
        </button>
      `).join('');
    }
  }

  handleQuizSelect(selectedIndex, btnElement) {
    if (this.quiz.hasAnswered) return;
    this.quiz.hasAnswered = true;

    const q = this.quiz.questions[this.quiz.currentIndex];
    const isCorrect = selectedIndex === q.correct;
    const allBtns = document.querySelectorAll('.quiz-option-btn');

    if (isCorrect) {
      btnElement.classList.add('selected-correct');
      window.soundFx.playSuccess();
      this.quiz.score += 20;
      this.state.score += 20;
      this.state.stars += 2;
      this.state.correctAnswers++;
      this.state.byTopic[q.topic] = (this.state.byTopic[q.topic] || 0) + 1;
    } else {
      btnElement.classList.add('selected-wrong');
      window.soundFx.playError();
      if (allBtns[q.correct]) {
        allBtns[q.correct].classList.add('selected-correct');
      }
    }

    // Afficher l'explication pédagogique
    const expBox = document.getElementById('quiz-explanation-box');
    if (expBox) {
      expBox.style.display = 'block';
      expBox.innerHTML = `<strong>💡 Explication :</strong> ${q.explanation}`;
    }

    // Bouton suivant
    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) {
      nextBtn.style.display = 'inline-flex';
    }

    this.saveState();
  }

  nextQuizQuestion() {
    window.soundFx.playPop();
    this.quiz.currentIndex++;
    if (this.quiz.currentIndex < this.quiz.questions.length) {
      this.renderCurrentQuizQuestion();
    } else {
      this.endQuiz();
    }
  }

  endQuiz() {
    window.soundFx.playFanfare();
    this.triggerConfetti(1.2);

    document.getElementById('quiz-question-view').style.display = 'none';
    const resultView = document.getElementById('quiz-result-view');
    resultView.style.display = 'block';

    const maxScore = this.quiz.questions.length * 20;
    const pct = Math.round((this.quiz.score / maxScore) * 100);

    if (pct > this.state.highScoreQuiz) {
      this.state.highScoreQuiz = pct;
      this.saveState();
    }

    const titleEl = document.getElementById('quiz-result-title');
    const scoreEl = document.getElementById('quiz-result-score');
    const msgEl = document.getElementById('quiz-result-message');

    if (scoreEl) scoreEl.textContent = `${this.quiz.score} / ${maxScore} pts (${pct}%)`;

    if (pct >= 80) {
      if (titleEl) titleEl.textContent = "🏆 Exceptionnel ! Tu es un champion !";
      if (msgEl) msgEl.textContent = "Tu as réussi ce grand quiz avec brio. Continue comme ça pour décrocher tous les badges !";
    } else if (pct >= 50) {
      if (titleEl) titleEl.textContent = "🌟 Bien joué !";
      if (msgEl) msgEl.textContent = "Tu es sur la très bonne voie. Relis les petits cours pour faire un score parfait la prochaine fois !";
    } else {
      if (titleEl) titleEl.textContent = "🌱 Bel effort !";
      if (msgEl) msgEl.textContent = "Chaque erreur est une chance d'apprendre. Revois les leçons et réessaye, tu vas y arriver !";
    }
  }

  // ==========================================================================
  // Vérification et Attribution des Badges
  // ==========================================================================
  checkBadges() {
    MATH_DATA.badges.forEach(badge => {
      if (!this.state.unlockedBadges.includes(badge.id)) {
        if (badge.condition(this.state)) {
          this.state.unlockedBadges.push(badge.id);
          this.showRewardModal(badge);
        }
      }
    });
  }

  showRewardModal(badge) {
    window.soundFx.playFanfare();
    this.triggerConfetti(1.5);

    const modal = document.getElementById('reward-modal');
    const icon = document.getElementById('modal-badge-icon');
    const title = document.getElementById('modal-badge-title');
    const desc = document.getElementById('modal-badge-desc');

    if (icon) icon.textContent = badge.icon;
    if (title) title.textContent = `Nouveau Badge Débloqué : ${badge.title} !`;
    if (desc) desc.textContent = badge.description;

    if (modal) modal.classList.add('active');
    this.renderBadges();
  }

  renderBadges() {
    const container = document.getElementById('badges-container-grid');
    if (!container) return;

    container.innerHTML = MATH_DATA.badges.map(b => {
      const isUnlocked = this.state.unlockedBadges.includes(b.id);
      return `
        <div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}">
          <span class="badge-icon">${b.icon}</span>
          <h4>${b.title}</h4>
          <p>${b.description}</p>
          <span class="badge-status-tag">
            ${isUnlocked ? '✅ Débloqué' : '🔒 À débloquer'}
          </span>
        </div>
      `;
    }).join('');
  }

  renderProgressDashboard() {
    const levelInfo = this.getPlayerLevel();

    const titleEl = document.getElementById('progress-level-title');
    const tagEl = document.getElementById('progress-level-tag');
    const barEl = document.getElementById('progress-level-fill');
    const detailEl = document.getElementById('progress-xp-detail');

    if (titleEl) titleEl.textContent = levelInfo.title;
    if (tagEl) tagEl.textContent = `Niveau ${levelInfo.level}`;
    if (barEl) barEl.style.width = `${levelInfo.progress}%`;
    if (detailEl) detailEl.textContent = `${this.state.score} XP (Prochain niveau : ${levelInfo.next} XP)`;

    // Stats
    const totalAns = document.getElementById('stat-total-answers');
    const correctPct = document.getElementById('stat-correct-pct');
    const maxStreak = document.getElementById('stat-max-streak');

    if (totalAns) totalAns.textContent = this.state.totalAnswers;
    if (maxStreak) maxStreak.textContent = this.state.maxStreak;
    if (correctPct) {
      const pct = this.state.totalAnswers > 0
        ? Math.round((this.state.correctAnswers / this.state.totalAnswers) * 100)
        : 100;
      correctPct.textContent = `${pct}%`;
    }

    this.renderBadges();
  }

  // ==========================================================================
  // Moteur d'Animation de Confetti (Canvas Natif sans dépendances)
  // ==========================================================================
  initConfetti() {
    this.canvas = document.getElementById('confetti-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  triggerConfetti(durationSec = 0.5) {
    if (!this.canvas || !this.ctx) return;
    this.resizeCanvas();

    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4', '#8B5CF6'];
    const particleCount = 70;

    for (let i = 0; i < particleCount; i++) {
      this.confettiParticles.push({
        x: Math.random() * this.canvas.width,
        y: -10 - Math.random() * 20,
        r: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleInc: Math.random() * 0.08 + 0.05,
        tiltAngle: 0,
        vy: Math.random() * 3 + 2,
        vx: Math.random() * 2 - 1,
        alpha: 1
      });
    }

    if (!this.confettiRunning) {
      this.confettiRunning = true;
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.confettiParticles.length) {
      this.confettiRunning = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.confettiParticles.length - 1; i >= 0; i--) {
      const p = this.confettiParticles[i];
      p.tiltAngle += p.tiltAngleInc;
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.tiltAngle) * 0.8;
      p.tilt = Math.sin(p.tiltAngle) * 12;

      this.ctx.beginPath();
      this.ctx.lineWidth = p.r;
      this.ctx.strokeStyle = p.color;
      this.ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
      this.ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
      this.ctx.stroke();

      if (p.y > this.canvas.height) {
        this.confettiParticles.splice(i, 1);
      }
    }

    requestAnimationFrame(() => this.animateConfetti());
  }

  // Utilitaire mélange aléatoire
  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
}

// Démarrer l'application dès le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
  window.mathApp = new MathApp();
});

