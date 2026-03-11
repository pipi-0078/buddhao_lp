// =======================
// Particles Background
// =======================
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
const particleCount = 60;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.3 + 0.05;
    this.color = Math.random() > 0.5 ? "45,212,168" : "212,168,67";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (
      this.x < 0 ||
      this.x > canvas.width ||
      this.y < 0 ||
      this.y > canvas.height
    ) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color},${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  // Draw lines between close particles
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(45,212,168,${0.03 * (1 - dist / 150)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// =======================
// Scroll Reveal
// =======================
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);
revealElements.forEach((el) => revealObserver.observe(el));

// =======================
// Navbar Scroll Effect
// =======================
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// =======================
// FAQ Accordion
// =======================
function toggleFAQ(id) {
  const item = document.getElementById(id);
  const answer = item.querySelector(".faq-answer");
  const chevron = item.querySelector(".faq-chevron");
  const isOpen = answer.classList.contains("open");

  // Close all
  document
    .querySelectorAll(".faq-answer")
    .forEach((a) => a.classList.remove("open"));
  document
    .querySelectorAll(".faq-chevron")
    .forEach((c) => c.classList.remove("open"));

  // Open clicked if it was closed
  if (!isOpen) {
    answer.classList.add("open");
    chevron.classList.add("open");
  }
}

// =======================
// Mobile Menu
// =======================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
let menuOpen = false;

hamburger.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle("open", menuOpen);
  const lines = hamburger.querySelectorAll(".hamburger-line");
  if (menuOpen) {
    lines[0].style.transform = "rotate(45deg) translate(4px, 4px)";
    lines[1].style.opacity = "0";
    lines[2].style.transform = "rotate(-45deg) translate(4px, -4px)";
  } else {
    lines[0].style.transform = "";
    lines[1].style.opacity = "1";
    lines[2].style.transform = "";
  }
});

// Close mobile menu on link click
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    menuOpen = false;
    mobileMenu.classList.remove("open");
    const lines = hamburger.querySelectorAll(".hamburger-line");
    lines[0].style.transform = "";
    lines[1].style.opacity = "1";
    lines[2].style.transform = "";
  });
});

// =======================
// Smooth scroll for anchor links
// =======================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
