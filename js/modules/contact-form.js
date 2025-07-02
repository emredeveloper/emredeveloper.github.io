// Contact form functionality
export class ContactForm {
  constructor(form) {
    this.form = form;
    this.isSubmitting = false;
    
    this.init();
  }

  init() {
    if (!this.form) return;
    
    this.setupValidation();
    this.setupSubmission();
  }

  setupValidation() {
    const inputs = this.form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    const fieldName = field.getAttribute('name');
    
    // Remove existing error
    this.clearFieldError(field);
    
    // Required field validation
    if (isRequired && !value) {
      this.showFieldError(field, 'Bu alan zorunludur');
      return false;
    }
    
    // Email validation
    if (fieldName === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showFieldError(field, 'Geçerli bir email adresi giriniz');
        return false;
      }
    }
    
    // Message length validation
    if (fieldName === 'message' && value && value.length < 10) {
      this.showFieldError(field, 'Mesaj en az 10 karakter olmalıdır');
      return false;
    }
    
    return true;
  }

  showFieldError(field, message) {
    field.style.borderColor = 'var(--error)';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
      color: var(--error);
      font-size: 0.9rem;
      margin-top: 0.5rem;
    `;
    
    field.parentNode.appendChild(errorDiv);
  }

  clearFieldError(field) {
    field.style.borderColor = 'var(--border)';
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  setupSubmission() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  async handleSubmit() {
    if (this.isSubmitting) return;
    
    // Validate all fields
    const inputs = this.form.querySelectorAll('input, select, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      this.showMessage('Lütfen tüm alanları doğru şekilde doldurunuz.', 'error');
      return;
    }
    
    this.isSubmitting = true;
    this.showLoading(true);
    
    try {
      // Simulate form submission (replace with actual endpoint)
      await this.submitForm();
      this.showMessage('Mesajınız başarıyla gönderildi! En kısa sürede geri dönüş yapacağım.', 'success');
      this.form.reset();
    } catch (error) {
      this.showMessage('Mesaj gönderilemedi. Lütfen tekrar deneyin veya direkt email gönderin.', 'error');
    } finally {
      this.isSubmitting = false;
      this.showLoading(false);
    }
  }

  async submitForm() {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Randomly succeed or fail for demo purposes
        if (Math.random() > 0.3) {
          resolve();
        } else {
          reject(new Error('Network error'));
        }
      }, 2000);
    });
  }

  showLoading(show) {
    const submitBtn = this.form.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    if (show) {
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
      submitBtn.disabled = true;
    } else {
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }
  }

  showMessage(message, type) {
    // Hide all messages first
    const messages = document.querySelectorAll('.form-message');
    messages.forEach(msg => msg.style.display = 'none');
    
    // Show appropriate message
    const messageEl = document.getElementById(`form-${type}`);
    if (messageEl) {
      messageEl.querySelector('p').textContent = message;
      messageEl.style.display = 'block';
      
      // Auto hide after 5 seconds
      setTimeout(() => {
        messageEl.style.display = 'none';
      }, 5000);
    }
    
    // Create toast notification
    this.showToast(message, type);
  }

  showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      background: ${type === 'success' ? 'var(--success)' : 'var(--error)'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--border-radius-small);
      box-shadow: var(--shadow);
      z-index: 1000;
      transform: translateX(100%);
      transition: transform var(--transition);
      max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
    });
    
    // Remove after 4 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}