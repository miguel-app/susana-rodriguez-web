/* ==========================================================================
   SUSANA RODRIGUES - MARY KAY TIMEWISE LANDING PAGE INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- CONFIGURATION & WHATSAPP NUMBER ---
  const WHATSAPP_NUMBER = '573215766840'; // Número de WhatsApp de Susana Rodríguez
  const CONSULTANT_NAME = 'Susana Rodríguez';

  // State object for Skin Quiz
  const quizState = {
    skinType: '',
    goal: '',
    age: ''
  };

  // --- MOBILE NAV TOGGLE ---
  const mobileToggle = document.getElementById('mobileToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    const setNavState = (open) => {
      mainNav.classList.toggle('active', open);
      mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      const icon = mobileToggle.querySelector('i');
      if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    };

    mobileToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      setNavState(!mainNav.classList.contains('active'));
    });

    // Close nav on link click
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setNavState(false));
    });

    // Close nav with Escape key or by tapping outside (mobile)
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mainNav.classList.contains('active')) {
        setNavState(false);
        mobileToggle.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (!mainNav.classList.contains('active')) return;
      if (!mainNav.contains(event.target) && !mobileToggle.contains(event.target)) {
        setNavState(false);
      }
    });
  }

  // --- QUIZ INTERACTIVO DE PIEL ---
  const quizSteps = document.querySelectorAll('.quiz-step');
  const progressBar = document.getElementById('progressBar');
  const sumSkin = document.getElementById('sumSkin');
  const sumGoal = document.getElementById('sumGoal');
  const sumAge = document.getElementById('sumAge');
  const btnSendWhatsAppQuiz = document.getElementById('btnSendWhatsAppQuiz');
  const openQuizHeroBtn = document.getElementById('openQuizHero');

  // Option selection
  const quizOptions = document.querySelectorAll('.quiz-option-btn');
  quizOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      const field = btn.getAttribute('data-field');
      const value = btn.getAttribute('data-value');
      
      quizState[field] = value;

      // Find current step
      const currentStepEl = btn.closest('.quiz-step');
      const currentStepNum = parseInt(currentStepEl.getAttribute('data-step'));
      const nextStepNum = currentStepNum + 1;

      if (nextStepNum <= 3) {
        goToQuizStep(nextStepNum);
      } else {
        showQuizResults();
      }
    });
  });

  function goToQuizStep(stepNumber) {
    quizSteps.forEach(step => step.classList.remove('active'));
    const targetStep = document.querySelector(`.quiz-step[data-step="${stepNumber}"]`);
    if (targetStep) {
      targetStep.classList.add('active');
    }

    // Update progress bar
    if (progressBar) {
      const progressPercent = (stepNumber / 3) * 100;
      progressBar.style.width = `${progressPercent}%`;
    }
  }

  function showQuizResults() {
    quizSteps.forEach(step => step.classList.remove('active'));
    const resultStep = document.querySelector('.quiz-step[data-step="result"]');
    if (resultStep) {
      resultStep.classList.add('active');
    }

    if (progressBar) {
      progressBar.style.width = '100%';
    }

    // Fill summary text
    if (sumSkin) sumSkin.textContent = quizState.skinType || 'No especificado';
    if (sumGoal) sumGoal.textContent = quizState.goal || 'No especificado';
    if (sumAge) sumAge.textContent = quizState.age || 'No especificado';

    // Prepare WhatsApp Message
    const message = `Hola ${CONSULTANT_NAME}, acabo de realizar el Diagnóstico de Piel en tu página web:%0A%0A` +
                    `🌸 *Tipo de Piel:* ${quizState.skinType}%0A` +
                    `✨ *Objetivo Principal:* ${quizState.goal}%0A` +
                    `🎂 *Rango de Edad:* ${quizState.age}%0A%0A` +
                    `¿Cuál es la rutina Mary Kay TimeWise® recomendada para mí?`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    
    if (btnSendWhatsAppQuiz) {
      btnSendWhatsAppQuiz.setAttribute('href', whatsappUrl);
    }
  }

  // Hero button to scroll and reset quiz
  if (openQuizHeroBtn) {
    openQuizHeroBtn.addEventListener('click', () => {
      const quizSection = document.getElementById('quiz');
      if (quizSection) {
        quizSection.scrollIntoView({ behavior: 'smooth' });
        // Reset quiz
        goToQuizStep(1);
      }
    });
  }

  // --- FAQ ACCORDION ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all faq items
        faqItems.forEach(i => i.classList.remove('active'));

        // Toggle clicked
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // --- SELECTOR DE RUTINA VISUAL (MAÑANA / NOCHE) ---
  const tabMorning = document.getElementById('tabMorning');
  const tabNight = document.getElementById('tabNight');
  const step3Badge = document.getElementById('step3Badge');
  const step3Ill = document.getElementById('step3Ill');
  const step3IllTag = document.getElementById('step3IllTag');
  const step3Title = document.getElementById('step3Title');
  const step3Howto = document.getElementById('step3Howto');
  const step3Benefits = document.getElementById('step3Benefits');

  if (tabMorning && tabNight) {
    tabMorning.addEventListener('click', () => {
      tabMorning.classList.add('active');
      tabNight.classList.remove('active');

      if (step3Badge) step3Badge.textContent = 'PASO 03 • DÍA';
      if (step3IllTag) step3IllTag.textContent = 'Paso 3: Escudo FPS 30 (Mañana)';
      if (step3Title) step3Title.textContent = '3. Infusión de Día FPS 30 TimeWise®';
      if (step3Howto) step3Howto.innerHTML = '🛡️ <strong>Modo de Uso:</strong> Distribuye uniformemente antes de la exposición al sol. Actúa como capa protectora invisible frente a los rayos UVA/UVB.';
      if (step3Benefits) {
        step3Benefits.innerHTML = `
          <li>✦ Previene el envejecimiento prematuro solar</li>
          <li>✦ Bloquea la contaminación ambiental</li>
          <li>✦ Aporta elasticidad y firmeza</li>
        `;
      }
      if (step3Ill && step3Ill.querySelector('svg')) {
        step3Ill.querySelector('svg').innerHTML = '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>';
      }
    });

    tabNight.addEventListener('click', () => {
      tabNight.classList.add('active');
      tabMorning.classList.remove('active');

      if (step3Badge) step3Badge.textContent = 'PASO 03 • NOCHE';
      if (step3IllTag) step3IllTag.textContent = 'Paso 3: Regeneración Nocturna';
      if (step3Title) step3Title.textContent = '3. Infusión de Noche TimeWise®';
      if (step3Howto) step3Howto.innerHTML = '🌙 <strong>Modo de Uso:</strong> Aplica sobre rostro limpio antes de dormir. Su extracto de manzanilla relaja los rasgos mientras la piel descansa.';
      if (step3Benefits) {
        step3Benefits.innerHTML = `
          <li>✦ Estimula la producción de colágeno nocturna</li>
          <li>✦ Repara el estrés acumulado del día</li>
          <li>✦ Piel radiante y descansada al despertar</li>
        `;
      }
      if (step3Ill && step3Ill.querySelector('svg')) {
        step3Ill.querySelector('svg').innerHTML = '<path d="M12.3 2a10 10 0 0 0-1.9 20 10 10 0 0 0 9.6-7 1 1 0 0 0-1.2-1.3 8 8 0 1 1-7.8-10.4 1 1 0 0 0 1.3-1.3z"/>';
      }
    });
  }

  // --- HEADER SCROLL EFFECT ---
  const siteHeader = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      siteHeader.style.boxShadow = '0 10px 30px rgba(74, 25, 38, 0.1)';
    } else {
      siteHeader.style.boxShadow = 'none';
    }
  });
});
