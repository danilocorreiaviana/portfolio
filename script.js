// --- PARTICLES CANVAS ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let width, height, particles, mouse;

function initCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  mouse = { x: width / 2, y: height / 2 };
  particles = [];
  const count = Math.min(Math.floor((width * height) / 12000), 120);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 1,
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, width, height);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const alpha = (1 - dist / 150) * 0.4;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }

  for (const p of particles) {
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 120) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${(1 - dist / 120) * 0.8})`;
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, 0.4)`;
      ctx.fill();
    }
  }

  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
  initCanvas();
});

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

initCanvas();
drawParticles();

// --- TYPEWRITER ---
const typewriterEl = document.getElementById('typewriter');
const phrases = ['Desenvolvedor Front-End', 'Bacharel em Sistemas de Informação', 'Apaixonado por Tecnologia'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewriter() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typewriterEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typewriter, 2000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typewriter, 500);
    return;
  }

  setTimeout(typewriter, isDeleting ? 40 : 80);
}

typewriter();

// --- NAVBAR ---
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveLink();
});

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// --- ACTIVE LINK ---
function updateActiveLink() {
  const sections = document.querySelectorAll('.section, .hero');
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 200;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = section.getAttribute('id');
    }
  });

  navLinkItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// --- SLIDER ---
const slides = document.querySelectorAll('.slide');
const navButtons = document.querySelectorAll('.slider-nav button');
let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

function goToSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === index);
  });
  navButtons.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
  currentIndex = index;
}

function nextSlide() {
  goToSlide((currentIndex + 1) % slides.length);
}

function prevSlide() {
  goToSlide((currentIndex - 1 + slides.length) % slides.length);
}

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
  touchEndX = event.changedTouches[0].clientX;
  handleSwipe();
}

function handleSwipe() {
  const diff = touchEndX - touchStartX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? prevSlide() : nextSlide();
  }
}

// --- SCROLL REVEAL ---
const revealElements = document.querySelectorAll('.section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// --- TECH MODAL ---
const modalOverlay = document.getElementById('techModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

const techData = {
  react: {
    title: 'React JS',
    image: './assets/images/logos/react_logo.png',
    content: `
      <div class="modal-body-text">
        <p>Site oficial: <a href="https://react.dev" target="_blank">react.dev</a></p>
        <p>O React é uma biblioteca JavaScript utilizada para criar interfaces de usuário interativas e reativas. Ele permite construir aplicativos da web eficientes e de alto desempenho, dividindo a interface em componentes reutilizáveis.</p>
        <h5>Prós:</h5>
        <ul>
          <li><strong>Componentização:</strong> Criação de componentes reutilizáveis, tornando o desenvolvimento mais eficiente.</li>
          <li><strong>Performance:</strong> Virtual DOM otimiza a renderização, resultando em melhor desempenho.</li>
          <li><strong>Ecossistema:</strong> Vasta quantidade de bibliotecas e comunidade ativa.</li>
        </ul>
        <h5>Limitações:</h5>
        <ul>
          <li>Curva de aprendizado inicial para conceitos como componentes, estados e props.</li>
          <li>Complexidade aumenta com a escala do projeto.</li>
          <li>Dependência de bibliotecas externas para funcionalidades específicas.</li>
        </ul>
        <h5>Projetos que utilizam:</h5>
        <div class="modal_projects">
          <img src="./assets/images/logos/facebook_logo.png" alt="Facebook">
          <img src="./assets/images/logos/airbnb_logo.png" alt="Airbnb">
          <img src="./assets/images/logos/netflix_logo.png" alt="Netflix">
          <img src="./assets/images/logos/whatsapp_logo.png" alt="WhatsApp">
          <img src="./assets/images/logos/microsoft_logo.png" alt="Microsoft">
          <img src="./assets/images/logos/dropbox_logo.png" alt="Dropbox">
        </div>
      </div>
    `
  },
  angular: {
    title: 'Angular',
    image: './assets/images/logos/angular_logo.svg',
    content: `
      <div class="modal-body-text">
        <p>Site oficial: <a href="https://angular.dev" target="_blank">angular.dev</a></p>
        <p>Angular é um framework de desenvolvimento web mantido pelo Google, utilizado para criar aplicações single-page (SPA) dinâmicas e escaláveis. Ele oferece uma arquitetura completa com componentes, serviços, roteamento e injeção de dependência.</p>
        <h5>Prós:</h5>
        <ul>
          <li><strong>Estrutura completa:</strong> Solução completa com roteamento, formulários, HTTP client e muito mais integrados.</li>
          <li><strong>TypeScript nativo:</strong> Escrito em TypeScript, oferece tipagem forte e melhor experiência de desenvolvimento.</li>
          <li><strong>RxJS e reatividade:</strong> Programação reativa com Observables para gerenciar fluxos de dados assíncronos.</li>
        </ul>
        <h5>Limitações:</h5>
        <ul>
          <li>Curva de aprendizado íngreme comparado a outras soluções.</li>
          <li>Bundle size maior que alternativas mais leves.</li>
          <li>Complexidade pode ser excessiva para projetos simples.</li>
        </ul>
        <h5>Projetos que utilizam:</h5>
        <div class="modal_projects">
          <img src="./assets/images/logos/google_logo.png" alt="Google">
          <img src="./assets/images/logos/microsoft_logo.png" alt="Microsoft">
          <img src="./assets/images/logos/adobe_logo.png" alt="Adobe">
          <img src="./assets/images/logos/airbnb_logo.png" alt="Airbnb">
        </div>
      </div>
    `
  },
  css: {
    title: 'CSS3',
    image: './assets/images/logos/css_logo.png',
    content: `
      <div class="modal-body-text">
        <p>Site oficial: <a href="https://www.w3.org/Style/CSS/" target="_blank">w3.org/Style/CSS</a></p>
        <p>O CSS (Cascading Style Sheets) é uma linguagem que permite estilizar e formatar os elementos de uma página da web, controlando cor, fonte, tamanho e posicionamento.</p>
        <h5>Prós:</h5>
        <ul>
          <li><strong>Estilização:</strong> Ampla gama de opções de design para páginas visualmente atraentes.</li>
          <li><strong>Separação:</strong> Estilo separado da estrutura HTML, facilitando manutenção.</li>
          <li><strong>Responsividade:</strong> Suporte a design responsivo para diferentes dispositivos.</li>
        </ul>
        <h5>Limitações:</h5>
        <ul>
          <li>Complexidade de layout pode ser desafiadora em designs avançados.</li>
          <li>Diferenças de renderização entre navegadores.</li>
          <li>Curva de aprendizado para dominar propriedades avançadas.</li>
        </ul>
        <h5>Projetos que utilizam:</h5>
        <div class="modal_projects">
          <img src="./assets/images/logos/apple_logo.png" alt="Apple">
          <img src="./assets/images/logos/google_logo.png" alt="Google">
          <img src="./assets/images/logos/amazon_logo.png" alt="Amazon">
          <img src="./assets/images/logos/microsoft_logo.png" alt="Microsoft">
          <img src="./assets/images/logos/adobe_logo.png" alt="Adobe">
          <img src="./assets/images/logos/airbnb_logo.png" alt="Airbnb">
        </div>
      </div>
    `
  }
};

document.querySelectorAll('.tag').forEach(tag => {
  tag.addEventListener('click', () => {
    const tech = tag.dataset.tech;
    const data = techData[tech];
    if (!data) return;

    modalImage.src = data.image;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.content;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// --- CONTACT FORM ---
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.btn-submit');
  const originalText = btn.textContent;

  btn.textContent = 'Enviando...';
  btn.disabled = true;

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: new FormData(form),
    });

    if (res.ok) {
      btn.textContent = 'Mensagem Enviada!';
      btn.style.background = 'linear-gradient(135deg, var(--accent-green), var(--accent-cyan))';
      form.reset();
    } else {
      throw new Error('Erro ao enviar');
    }
  } catch {
    btn.textContent = 'Erro! Tente novamente';
    btn.style.background = 'linear-gradient(135deg, #ff006e, #ff4500)';
  }

  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    btn.disabled = false;
  }, 3000);
});