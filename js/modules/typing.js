// Animated typing effect for hero section
export class TypingEffect {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      texts: [
        'Full Stack Developer',
        'JavaScript Uzmanı',
        'React Geliştiricisi', 
        'Python Developer',
        'Modern Web Çözümleri'
      ],
      typeSpeed: 100,
      deleteSpeed: 50,
      pauseTime: 2000,
      loop: true,
      cursor: true,
      ...options
    };
    
    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.isTyping = false;
    
    this.init();
  }

  init() {
    if (!this.element) return;
    
    // Store original text as fallback
    this.originalText = this.element.textContent;
    
    // Add cursor if enabled
    if (this.options.cursor) {
      this.element.style.position = 'relative';
      this.addCursor();
    }
    
    // Start typing effect
    this.startTyping();
  }

  addCursor() {
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    cursor.style.cssText = `
      animation: blink 1s infinite;
      margin-left: 2px;
      font-weight: normal;
    `;
    
    // Add cursor animation CSS if not exists
    if (!document.querySelector('#typing-cursor-styles')) {
      const style = document.createElement('style');
      style.id = 'typing-cursor-styles';
      style.textContent = `
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    this.element.appendChild(cursor);
    this.cursor = cursor;
  }

  startTyping() {
    if (this.isTyping) return;
    this.isTyping = true;
    this.type();
  }

  type() {
    const currentText = this.options.texts[this.currentTextIndex];
    
    if (this.isDeleting) {
      // Delete characters
      this.currentCharIndex--;
      this.updateText(currentText.substring(0, this.currentCharIndex));
      
      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.options.texts.length;
        setTimeout(() => this.type(), 200);
        return;
      }
      
      setTimeout(() => this.type(), this.options.deleteSpeed);
    } else {
      // Type characters
      this.currentCharIndex++;
      this.updateText(currentText.substring(0, this.currentCharIndex));
      
      if (this.currentCharIndex === currentText.length) {
        if (this.options.loop) {
          setTimeout(() => {
            this.isDeleting = true;
            this.type();
          }, this.options.pauseTime);
        }
        return;
      }
      
      setTimeout(() => this.type(), this.options.typeSpeed);
    }
  }

  updateText(text) {
    if (this.cursor) {
      this.element.textContent = text;
      this.element.appendChild(this.cursor);
    } else {
      this.element.textContent = text;
    }
  }

  destroy() {
    this.isTyping = false;
    this.element.textContent = this.originalText;
    if (this.cursor) {
      this.cursor.remove();
    }
  }
}