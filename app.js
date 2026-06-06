/* ==========================================================================
   INTERACTIVE LOGIC FOR MAHMOUD ASHRAF'S PORTFOLIO
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const themeToggle = document.getElementById('themeToggle');
  const menuBtn = document.getElementById('menuBtn');
  const navLinksContainer = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-links a');
  const header = document.querySelector('header');
  const backToTopBtn = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section');
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillsSection = document.getElementById('skills');

  // --- Dark/Light Theme Switching ---
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // --- Mobile Navigation Menu Toggle ---
  menuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    // Rotate hamburger lines to make an X
    const spans = menuBtn.querySelectorAll('span');
    spans[0].style.transform = navLinksContainer.classList.contains('active') 
      ? 'rotate(45deg) translate(6px, 6px)' 
      : 'none';
    spans[1].style.opacity = navLinksContainer.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinksContainer.classList.contains('active') 
      ? 'rotate(-45deg) translate(5px, -5px)' 
      : 'none';
  });

  // Close Mobile Menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('active');
      const spans = menuBtn.querySelectorAll('span');
      spans.forEach(span => span.style.transform = 'none');
      spans[1].style.opacity = '1';
    });
  });

  // --- Scroll Effects (Header & Back-to-Top) ---
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header Shrink / Blur background
    if (scrollPos > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Show/Hide Back-to-Top
    if (scrollPos > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }

    // Active Nav Link Highlighting based on scroll position
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === currentSection) {
        link.classList.add('active');
      }
    });
  });

  // Scroll to Top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- Intersection Observer for Scroll Entrance Animations ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Animates once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- Animate Skill Progress Bars when Skills Section is visible ---
  const skillsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width;
        });
        observer.unobserve(entry.target); // Animates once
      }
    });
  }, {
    threshold: 0.2
  });

  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
});
