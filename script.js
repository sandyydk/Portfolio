// ===== Typing Effect =====
const typingTexts = [
  "I build scalable distributed systems",
  "I work with Go, K8s & Cloud",
  "I speak at GopherCon & IndiaFOSS",
  "I love cutting-edge projects",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing-text");

function typeEffect() {
  const currentText = typingTexts[textIndex];

  if (!isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000); // Pause before deleting
      return;
    }
    setTimeout(typeEffect, 60);
  } else {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typingTexts.length;
      setTimeout(typeEffect, 400);
      return;
    }
    setTimeout(typeEffect, 30);
  }
}

typeEffect();

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("back-to-top");

function handleScroll() {
  const scrollY = window.scrollY;

  // Navbar background
  if (scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Back to top button
  if (scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }

  // Active nav link
  updateActiveNav();
}

window.addEventListener("scroll", handleScroll);

// ===== Active Nav Link on Scroll =====
function updateActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const scrollY = window.scrollY + 120;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// ===== Mobile Menu Toggle =====
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active");
  navMenu.classList.toggle("open");
  document.body.style.overflow = navMenu.classList.contains("open")
    ? "hidden"
    : "";
});

// Close menu on link click
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ===== Back to Top =====
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Scroll Animations =====
const observerOptions = {
  root: null,
  rootMargin: "0px 0px -50px 0px",
  threshold: 0.1,
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute("data-delay") || 0;
      setTimeout(() => {
        entry.target.classList.add("animated");
      }, parseInt(delay));
      animationObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll("[data-animate]").forEach((el) => {
  animationObserver.observe(el);
});

// ===== Skill Bar Animation =====
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll(".skill-fill");
        fills.forEach((fill) => {
          const width = fill.getAttribute("data-width");
          setTimeout(() => {
            fill.style.width = width + "%";
          }, 300);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

const skillsSection = document.getElementById("skills");
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// ===== Counter Animation =====
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-count"));
          const duration = 1500;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
        });
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const heroStats = document.querySelector(".hero-stats");
if (heroStats) {
  counterObserver.observe(heroStats);
}

// ===== Project Filter =====
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Update active button
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const category = card.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        card.classList.remove("hidden");
        card.style.animation = "fadeInUp 0.4s ease forwards";
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// ===== Contact Form =====
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector("button[type='submit']");
  const originalHTML = btn.innerHTML;

  btn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
  btn.style.background = "linear-gradient(135deg, #22c55e, #16a34a)";

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = "";
    contactForm.reset();
  }, 3000);
});

// ===== Fade In Up Animation Keyframes =====
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);

// ===== Lightbox for Gallery Images =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

document.querySelectorAll("[data-lightbox]").forEach((thumb) => {
  thumb.addEventListener("click", (e) => {
    e.preventDefault();
    const imgSrc = thumb.href || thumb.querySelector("img")?.src;
    if (imgSrc) {
      lightboxImg.src = imgSrc;
      lightboxImg.alt = thumb.querySelector("img")?.alt || "";
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  lightboxImg.src = "";
}

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox?.classList.contains("active")) closeLightbox();
});

// ===== Smooth Reveal on Page Load =====
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  requestAnimationFrame(() => {
    document.body.style.opacity = "1";
  });
});
