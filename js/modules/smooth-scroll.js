// Smooth scrolling and scroll animations
export class SmoothScroll {
  constructor(options = {}) {
    this.options = {
      duration: 800,
      easing: 'easeInOutCubic',
      offset: 80,
      ...options
    };
    
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupScrollToTop();
  }

  setupSmoothScrolling() {
    // Handle anchor links
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      
      e.preventDefault();
      const targetId = target.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        this.scrollToElement(targetElement);
      }
    });
  }

  setupScrollToTop() {
    // Create scroll to top button
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = '↑';
    scrollButton.setAttribute('aria-label', 'Sayfanın üstüne dön');
    scrollButton.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: none;
      background: var(--primary);
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
      cursor: pointer;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 173, 181, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollButton.style.opacity = '1';
        scrollButton.style.visibility = 'visible';
      } else {
        scrollButton.style.opacity = '0';
        scrollButton.style.visibility = 'hidden';
      }
    });
    
    // Scroll to top on click
    scrollButton.addEventListener('click', () => {
      this.scrollToTop();
    });
  }

  scrollToElement(element) {
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const targetPosition = elementTop - this.options.offset;
    
    this.animateScroll(targetPosition);
  }

  scrollToTop() {
    this.animateScroll(0);
  }

  animateScroll(targetPosition) {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();
    
    const animateStep = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.options.duration, 1);
      
      const easeProgress = this.easeInOutCubic(progress);
      const currentPosition = startPosition + (distance * easeProgress);
      
      window.scrollTo(0, currentPosition);
      
      if (progress < 1) {
        requestAnimationFrame(animateStep);
      }
    };
    
    requestAnimationFrame(animateStep);
  }

  easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
}