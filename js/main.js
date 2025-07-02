// Main application entry point
import { ThemeManager } from './modules/theme.js';
import { TypingEffect } from './modules/typing.js';
import { ParticlesManager } from './modules/particles.js';
import { SmoothScroll } from './modules/smooth-scroll.js';
import { AnimationObserver } from './modules/animations.js';
import { ProjectFilter } from './modules/project-filter.js';
import { ContactForm } from './modules/contact-form.js';
import { LanguageManager } from './modules/language.js';

class App {
  constructor() {
    this.modules = {};
    this.init();
  }

  async init() {
    try {
      // Initialize core modules
      this.modules.theme = new ThemeManager();
      this.modules.smoothScroll = new SmoothScroll();
      this.modules.animations = new AnimationObserver();
      this.modules.language = new LanguageManager();
      
      // Initialize feature modules when DOM is ready
      document.addEventListener('DOMContentLoaded', () => {
        this.initFeatures();
      });

      // Register service worker for PWA
      this.registerServiceWorker();
      
    } catch (error) {
      console.error('App initialization failed:', error);
    }
  }

  initFeatures() {
    // Initialize typing effect in hero
    const heroTitle = document.querySelector('.typing-text');
    if (heroTitle) {
      this.modules.typing = new TypingEffect(heroTitle);
    }

    // Initialize particles background
    const particlesContainer = document.querySelector('#particles-js');
    if (particlesContainer) {
      this.modules.particles = new ParticlesManager(particlesContainer);
    }

    // Initialize project filtering
    const projectsSection = document.querySelector('#projects');
    if (projectsSection) {
      this.modules.projectFilter = new ProjectFilter(projectsSection);
    }

    // Initialize contact form
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
      this.modules.contactForm = new ContactForm(contactForm);
    }

    // Initialize scroll animations
    this.modules.animations.observe();
  }

  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
  }
}

// Initialize app
new App();