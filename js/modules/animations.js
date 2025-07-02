// Intersection Observer for scroll-triggered animations
export class AnimationObserver {
  constructor(options = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };
    
    this.observer = null;
    this.observedElements = new Set();
    
    this.init();
  }

  init() {
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers
      this.fallbackAnimation();
      return;
    }
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.options
    );
  }

  observe() {
    // Find and observe elements with animation classes
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    animatedElements.forEach(element => {
      this.setupElement(element);
      this.observer.observe(element);
      this.observedElements.add(element);
    });
    
    // Auto-detect common elements to animate
    this.autoDetectElements();
  }

  setupElement(element) {
    const animationType = element.getAttribute('data-animate') || 'fadeInUp';
    
    // Add initial styles
    element.style.opacity = '0';
    element.style.transform = this.getInitialTransform(animationType);
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    element.setAttribute('data-animation-type', animationType);
  }

  getInitialTransform(animationType) {
    const transforms = {
      fadeInUp: 'translateY(30px)',
      fadeInDown: 'translateY(-30px)',
      fadeInLeft: 'translateX(-30px)',
      fadeInRight: 'translateX(30px)',
      fadeIn: 'scale(0.95)',
      slideInUp: 'translateY(50px)',
      slideInLeft: 'translateX(-50px)',
      slideInRight: 'translateX(50px)',
      zoomIn: 'scale(0.8)',
      rotateIn: 'rotate(-5deg) scale(0.95)'
    };
    
    return transforms[animationType] || 'translateY(30px)';
  }

  getFinalTransform() {
    return 'translateX(0) translateY(0) scale(1) rotate(0deg)';
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.animateElement(entry.target);
        this.observer.unobserve(entry.target);
        this.observedElements.delete(entry.target);
      }
    });
  }

  animateElement(element) {
    const delay = element.getAttribute('data-delay') || 0;
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = this.getFinalTransform();
      
      // Trigger custom animation event
      element.dispatchEvent(new CustomEvent('animated', {
        detail: { type: element.getAttribute('data-animation-type') }
      }));
    }, parseInt(delay));
  }

  autoDetectElements() {
    // Auto-animate sections
    const sections = document.querySelectorAll('section:not([data-animate])');
    sections.forEach((section, index) => {
      section.setAttribute('data-animate', 'fadeInUp');
      section.setAttribute('data-delay', index * 100);
      this.setupElement(section);
      this.observer.observe(section);
      this.observedElements.add(section);
    });

    // Auto-animate cards
    const cards = document.querySelectorAll('.project-card:not([data-animate]), .stat-card:not([data-animate])');
    cards.forEach((card, index) => {
      card.setAttribute('data-animate', 'fadeInUp');
      card.setAttribute('data-delay', index * 150);
      this.setupElement(card);
      this.observer.observe(card);
      this.observedElements.add(card);
    });

    // Auto-animate skill items
    const skills = document.querySelectorAll('.skills li:not([data-animate])');
    skills.forEach((skill, index) => {
      skill.setAttribute('data-animate', 'fadeInRight');
      skill.setAttribute('data-delay', index * 100);
      this.setupElement(skill);
      this.observer.observe(skill);
      this.observedElements.add(skill);
    });
  }

  fallbackAnimation() {
    // Simple fallback for browsers without IntersectionObserver
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = this.getFinalTransform();
      }, index * 200);
    });
  }

  destroy() {
    if (this.observer) {
      this.observedElements.forEach(element => {
        this.observer.unobserve(element);
      });
      this.observer.disconnect();
    }
    this.observedElements.clear();
  }
}