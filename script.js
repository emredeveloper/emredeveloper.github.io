// Enhanced Portfolio JavaScript

// Initialize AOS and other features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize theme
    initializeTheme();
    
    // Initialize typing effect
    initializeTypingEffect();
    
    // Initialize counters
    initializeCounters();
    
    // Initialize skill bars
    initializeSkillBars();
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize testimonials
    initializeTestimonials();
});

// Theme toggling functionality
function toggleTheme() {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    
    // Update theme toggle icon
    const darkIcon = document.querySelector('.theme-toggle .dark-icon');
    const lightIcon = document.querySelector('.theme-toggle .light-icon');
    
    if (isLight) {
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'inline';
    } else {
        darkIcon.style.display = 'inline';
        lightIcon.style.display = 'none';
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light');
        document.querySelector('.theme-toggle .dark-icon').style.display = 'none';
        document.querySelector('.theme-toggle .light-icon').style.display = 'inline';
    } else {
        document.querySelector('.theme-toggle .dark-icon').style.display = 'inline';
        document.querySelector('.theme-toggle .light-icon').style.display = 'none';
    }
}

// Typing effect for hero section
function initializeTypingEffect() {
    const texts = [
        'Full Stack Developer',
        'JavaScript Uzmanı',
        'Python Developer',
        'React.js Developer',
        'Django Developer',
        'UI/UX Odaklı Developer'
    ];
    
    const typingElement = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    
    if (!typingElement) return;
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// Mobile menu functionality
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (nav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Smooth scrolling
function smoothScrollTo(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = 80;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const nav = document.getElementById('mainNav');
        if (nav.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}

// Statistics counter animation
function initializeCounters() {
    const counterElements = document.querySelectorAll('[data-count]');
    let hasAnimated = false;
    
    function animateCounters() {
        if (hasAnimated) return;
        
        counterElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        });
        
        hasAnimated = true;
    }
    
    // Trigger animation when stats section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    let hasAnimated = false;
    
    function animateSkillBars() {
        if (hasAnimated) return;
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, 200);
        });
        
        hasAnimated = true;
    }
    
    // Trigger animation when skills section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, { threshold: 0.3 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

// Project filtering
function filterProjects(category) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter projects
    projectCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category').split(' ');
        
        if (category === 'all' || cardCategories.includes(category)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// Project modal functionality
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    
    // Project data (in a real app, this would come from an API)
    const projectData = {
        'notlarim': {
            title: 'Notlarım - Kişisel Not Uygulaması',
            description: 'Modern ve kullanıcı dostu arayüzü ile notlarınızı organize etmenizi sağlayan web uygulaması.',
            fullDescription: 'Bu proje, kullanıcıların günlük notlarını, görevlerini ve fikirlerini kolayca organize edebilmesi için geliştirilmiştir. Responsive tasarımı ile tüm cihazlarda mükemmel çalışır.',
            technologies: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JWT Authentication'],
            features: [
                'Kullanıcı kaydı ve girişi',
                'Not oluşturma, düzenleme ve silme',
                'Kategori bazında organizasyon',
                'Arama ve filtreleme',
                'Responsive tasarım',
                'Dark/Light tema desteği'
            ],
            github: 'https://github.com/emredeveloper/notlarim',
            demo: '#',
            image: 'https://raw.githubusercontent.com/emredeveloper/notlarim/main/preview.png'
        },
        // Add more projects...
    };
    
    const project = projectData[projectId];
    if (!project) return;
    
    modalBody.innerHTML = `
        <div class="project-modal-content">
            <img src="${project.image}" alt="${project.title}" class="modal-image">
            <h2>${project.title}</h2>
            <p class="project-description">${project.description}</p>
            <p class="project-full-description">${project.fullDescription}</p>
            
            <div class="project-technologies">
                <h3>Kullanılan Teknolojiler</h3>
                <div class="tech-tags">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            
            <div class="project-features">
                <h3>Özellikler</h3>
                <ul>
                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
            
            <div class="project-links">
                <a href="${project.github}" target="_blank" class="btn btn-primary">
                    <i class="fab fa-github"></i> GitHub'da Görüntüle
                </a>
                <a href="${project.demo}" target="_blank" class="btn btn-secondary">
                    <i class="fas fa-external-link-alt"></i> Canlı Demo
                </a>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Testimonials functionality
let currentTestimonial = 0;

function initializeTestimonials() {
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % 3;
        showTestimonial(currentTestimonial);
    }, 5000);
}

function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    const buttons = document.querySelectorAll('.testimonial-btn');
    
    testimonials.forEach(t => t.classList.remove('active'));
    buttons.forEach(b => b.classList.remove('active'));
    
    if (testimonials[index]) {
        testimonials[index].classList.add('active');
        buttons[index].classList.add('active');
    }
    
    currentTestimonial = index;
}

// Contact form functionality
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formSuccess = document.getElementById('formSuccess');
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Validate form
        if (validateForm()) {
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                form.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Reset form after 5 seconds
                setTimeout(() => {
                    form.style.display = 'block';
                    formSuccess.style.display = 'none';
                    form.reset();
                    clearFormErrors();
                    
                    // Reset button state
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                    submitBtn.disabled = false;
                }, 5000);
            }, 2000);
        } else {
            // Reset button state on validation error
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Clear previous errors
    clearFormErrors();
    
    // Validate name
    if (!name) {
        showFormError('nameError', 'Ad alanı gereklidir');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        showFormError('emailError', 'E-posta alanı gereklidir');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFormError('emailError', 'Geçerli bir e-posta adresi girin');
        isValid = false;
    }
    
    // Validate message
    if (!message) {
        showFormError('messageError', 'Mesaj alanı gereklidir');
        isValid = false;
    }
    
    return isValid;
}

function showFormError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearFormErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Scroll effects
function initializeScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        // Show/hide scroll to top button
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
        
        // Add header scroll effect
        const header = document.querySelector('header');
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Modal close on outside click
window.addEventListener('click', function(e) {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close modal on Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('projectModal');
        if (modal.style.display === 'block') {
            closeProjectModal();
        }
        
        // Close mobile menu
        const nav = document.getElementById('mainNav');
        if (nav.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
});

// Performance optimization - Lazy loading
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// CV Download functionality
function downloadCV() {
    // Track CV download event
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
            'event_category': 'CV',
            'event_label': 'CV Download'
        });
    }
    
    // Show message since we don't have actual CV file
    alert('CV indirme özelliği aktif edilecek. Lütfen daha sonra tekrar deneyin veya emre@gmail.com adresinden CV\'mi talep edebilirsiniz.');
    
    // In a real implementation, you would:
    // window.open('/assets/cv-emre-developer.pdf', '_blank');
}
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);