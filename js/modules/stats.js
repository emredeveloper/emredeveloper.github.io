// Statistics counter animation
export class StatsCounter {
  constructor() {
    this.counters = [];
    this.init();
  }

  init() {
    this.setupCounters();
    this.setupSkillBars();
  }

  setupCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    statNumbers.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      
      this.counters.push({
        element: counter,
        target: target,
        current: 0,
        increment: target / (duration / 16), // 60fps
        hasStarted: false
      });
    });

    // Start counters when they come into view
    this.observeCounters();
  }

  setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill[data-width]');
    
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      
      // Start animation when in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              bar.style.width = width + '%';
            }, 500);
            observer.unobserve(bar);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(bar);
    });
  }

  observeCounters() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = this.counters.find(c => c.element === entry.target);
          if (counter && !counter.hasStarted) {
            counter.hasStarted = true;
            this.animateCounter(counter);
          }
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(counter => {
      observer.observe(counter.element);
    });
  }

  animateCounter(counter) {
    const updateCounter = () => {
      counter.current += counter.increment;
      
      if (counter.current >= counter.target) {
        counter.current = counter.target;
        counter.element.textContent = Math.floor(counter.current);
        return;
      }
      
      counter.element.textContent = Math.floor(counter.current);
      requestAnimationFrame(updateCounter);
    };
    
    requestAnimationFrame(updateCounter);
  }
}