/* ============================================================
   Claude AI Promo — main.js
   Semua fitur digabung: theme, cursor, particles, counters,
   scroll reveal, tabs, mobile menu, popup, chat, FAQ accordion
   ============================================================ */

/* ── THEME TOGGLE ─────────────────────────────────────────── */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('claude-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateIcon(saved);
  themeToggle.addEventListener('click', () => {
    const cur  = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('claude-theme', next);
    updateIcon(next);
  });
  function updateIcon(theme) {
    themeToggle.textContent = theme === 'dark' ? '◑' : '◐';
    themeToggle.title = theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap';
  }
}

/* ── CUSTOM CURSOR ────────────────────────────────────────── */
function initCursor() {
  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  document.addEventListener('mousedown', () => { cursor.style.transform = 'translate(-50%,-50%) scale(0.7)'; });
  document.addEventListener('mouseup',   () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });
  document.querySelectorAll('a, button, [onclick], .faq-question').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.2)';
      cursorRing.style.borderColor = 'rgba(217,123,74,0.8)';
      cursorRing.style.width = '52px'; cursorRing.style.height = '52px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorRing.style.borderColor = 'rgba(217,123,74,0.5)';
      cursorRing.style.width = '40px'; cursorRing.style.height = '40px';
    });
  });
  (function animateRing() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  })();
}

/* ── PROGRESS BAR ─────────────────────────────────────────── */
function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = pct + '%';
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
}

/* ── PARTICLES ────────────────────────────────────────────── */
function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize, { passive: true });
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W; this.y = Math.random() * H;
      this.r = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3; this.vy = (Math.random() - 0.5) * 0.3;
      this.a = Math.random() * 0.5 + 0.1;
      const c = ['rgba(91,141,238,','rgba(155,109,255,','rgba(217,123,74,','rgba(79,209,197,'];
      this.c = c[Math.floor(Math.random() * c.length)];
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.c + this.a + ')'; ctx.fill();
    }
  }
  for (let i = 0; i < 80; i++) particles.push(new Particle());
  (function animP() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 100) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(91,141,238,${0.08*(1-d/100)})`; ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animP);
  })();
}

/* ── COUNTERS ─────────────────────────────────────────────── */
function initCounters() {
  function run() {
    document.querySelectorAll('.counter').forEach(el => {
      const target = +el.dataset.target; let current = 0;
      const step = target / 60;
      const t = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current);
        if (current >= target) clearInterval(t);
      }, 20);
    });
  }
  const obs = new IntersectionObserver(e => { if (e[0].isIntersecting) { run(); obs.disconnect(); } }, { threshold: 0.5 });
  obs.observe(document.getElementById('hero'));
}

/* ── SCROLL REVEAL ────────────────────────────────────────── */
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
}

/* ── FEATURE CARD TILT ────────────────────────────────────── */
function initTilt() {
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-6px) perspective(600px) rotateX(${-y*8}deg) rotateY(${x*8}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ── SMOOTH SCROLL ────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('mobileMenu').classList.remove('open');
      }
    });
  });
}

/* ── MOBILE MENU ──────────────────────────────────────────── */
function initMobileMenu() {
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
  });
}

/* ── CAPABILITY TABS ──────────────────────────────────────── */
function initTabs() {
  window.switchTab = function(tab) {
    const el = event.currentTarget || event.target;
    document.querySelectorAll('.cap-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.cap-tab').forEach(t => t.classList.remove('active'));
    const panel = document.getElementById('panel-' + tab);
    if (panel) panel.classList.add('active');
    if (el)    el.classList.add('active');
  };
}

/* ── POPUP SYSTEM ─────────────────────────────────────────── */
function initPopup() {
  const overlay    = document.getElementById('popupOverlay');
  const btnClose   = document.getElementById('popupClose');
  const btnDismiss = document.getElementById('popupDismiss');
  const quoteEl    = document.getElementById('popupQuote');
  const msgs = [
    { title: 'Lanjutkan di Claude yang Asli!',     body: 'Demo ini hanya secuil kemampuan Claude. Di <strong>claude.ai</strong> kamu bisa bertanya apapun, upload file, coding bareng, dan masih banyak lagi — semua gratis!' },
    { title: 'Claude yang Asli Menunggumu',         body: 'Demo ini hanya pucuk gunungnya. Claude yang sebenarnya bisa menulis kode, menganalisis dokumen, brainstorming ide, dan masih banyak lagi.' },
    { title: 'Kamu Bisa Tanya Apapun ke Claude',    body: 'Di claude.ai, kamu bisa upload file, tanya soal coding, minta Claude nulis konten, atau diskusi topik apapun secara mendalam. Semuanya gratis!' },
    { title: 'Lanjutkan Percakapanmu di Claude.ai', body: 'Demo ini menunjukkan secuil kemampuan Claude. Di claude.ai kamu mendapat AI yang bisa mengingat konteks, memahami nuansa, dan benar-benar membantumu.' },
  ];
  window.showPopup = function(userMessage) {
    const m = msgs[Math.floor(Math.random() * msgs.length)];
    document.getElementById('popupTitle').textContent = m.title;
    document.getElementById('popupBody').innerHTML    = m.body;
    if (quoteEl && userMessage) {
      quoteEl.textContent = '"' + (userMessage.length > 60 ? userMessage.slice(0,60) + '…' : userMessage) + '"';
      quoteEl.style.display = 'block';
    } else if (quoteEl) { quoteEl.style.display = 'none'; }
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  window.hidePopup = function() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };
  btnClose.addEventListener('click', hidePopup);
  btnDismiss.addEventListener('click', hidePopup);
  overlay.addEventListener('click', e => { if (e.target === overlay) hidePopup(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hidePopup(); });
}

/* ── DEMO CHAT ────────────────────────────────────────────── */
function initChat() {
  function sendDemo() {
    const input = document.getElementById('demoInput');
    const val   = input.value.trim(); if (!val) return;
    const demo  = document.getElementById('chatDemo');
    demo.querySelector('.chat-typing')?.remove();
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg chat-user'; userMsg.textContent = val;
    demo.appendChild(userMsg);
    const savedVal = val; input.value = '';
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-typing';
    typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    demo.appendChild(typingDiv); demo.scrollTop = demo.scrollHeight;
    setTimeout(() => {
      typingDiv.remove();
      const aiMsg = document.createElement('div');
      aiMsg.className = 'chat-msg chat-ai';
      aiMsg.textContent = 'Pertanyaan yang menarik! Untuk jawaban terbaik dari Claude secara langsung...';
      demo.appendChild(aiMsg); demo.scrollTop = demo.scrollHeight;
      setTimeout(() => window.showPopup(savedVal), 700);
    }, 1300);
  }
  window.sendDemo = sendDemo;
  document.getElementById('demoInput').addEventListener('keypress', e => { if (e.key === 'Enter') sendDemo(); });
}

/* ── FAQ ACCORDION ────────────────────────────────────────── */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    const icon     = item.querySelector('.faq-icon');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // tutup semua lain
      items.forEach(other => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          other.querySelector('.faq-answer').style.maxHeight = '0';
          other.querySelector('.faq-answer').style.opacity   = '0';
          other.querySelector('.faq-icon').style.transform   = 'rotate(0deg)';
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = '0';
        answer.style.opacity   = '0';
        icon.style.transform   = 'rotate(0deg)';
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity   = '1';
        icon.style.transform   = 'rotate(45deg)';
      }
    });
  });

  // Filter tombol kategori
  document.querySelectorAll('.faq-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.faq-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      items.forEach(item => {
        const show = cat === 'all' || item.dataset.cat === cat;
        item.style.display = show ? '' : 'none';
        if (!show && item.classList.contains('open')) {
          item.classList.remove('open');
          item.querySelector('.faq-answer').style.maxHeight = '0';
          item.querySelector('.faq-answer').style.opacity   = '0';
          item.querySelector('.faq-icon').style.transform   = 'rotate(0deg)';
        }
      });
      checkNoResult();
    });
  });

  // Search
  const searchInput = document.getElementById('faqSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = (!q || text.includes(q)) ? '' : 'none';
      });
      checkNoResult();
    });
  }

  function checkNoResult() {
    const noResult  = document.getElementById('faqNoResult');
    if (!noResult) return;
    const anyVisible = [...items].some(i => i.style.display !== 'none');
    noResult.style.display = anyVisible ? 'none' : 'block';
  }
}

/* ── INIT ALL ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCursor();
  initProgressBar();
  initParticles();
  initCounters();
  initScrollReveal();
  initTilt();
  initSmoothScroll();
  initMobileMenu();
  initTabs();
  initPopup();
  initChat();
  initFAQ();
});
