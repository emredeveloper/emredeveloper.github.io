// Project filtering and modal functionality
export class ProjectFilter {
  constructor(container) {
    this.container = container;
    this.projects = [];
    this.currentFilter = 'all';
    
    this.init();
  }

  init() {
    this.setupProjects();
    this.setupFilters();
    this.setupModals();
  }

  setupProjects() {
    const projectCards = this.container.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category') || '';
      this.projects.push({
        element: card,
        categories: categories.split(' ').filter(cat => cat.length > 0)
      });
    });
  }

  setupFilters() {
    const filterButtons = this.container.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        const filter = button.getAttribute('data-filter');
        this.filterProjects(filter);
      });
    });
  }

  filterProjects(filter) {
    this.currentFilter = filter;
    
    this.projects.forEach(project => {
      const shouldShow = filter === 'all' || project.categories.includes(filter);
      
      if (shouldShow) {
        project.element.style.display = 'block';
        project.element.style.opacity = '0';
        project.element.style.transform = 'scale(0.8)';
        
        // Animate in
        requestAnimationFrame(() => {
          project.element.style.transition = 'all 0.3s ease';
          project.element.style.opacity = '1';
          project.element.style.transform = 'scale(1)';
        });
      } else {
        project.element.style.transition = 'all 0.3s ease';
        project.element.style.opacity = '0';
        project.element.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          project.element.style.display = 'none';
        }, 300);
      }
    });
  }

  setupModals() {
    const detailButtons = this.container.querySelectorAll('.project-detail-btn');
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = modal?.querySelector('.modal-close');
    
    if (!modal) return;

    // Project data
    const projectData = {
      notlarim: {
        title: 'Notlarım - Modern Not Alma Uygulaması',
        description: 'React ve Node.js ile geliştirilmiş modern not alma uygulaması. Real-time senkronizasyon, kategorize edilmiş notlar ve gelişmiş arama özellikleri sunar.',
        features: [
          'Real-time senkronizasyon',
          'Kategori bazlı organizasyon',
          'Gelişmiş arama ve filtreleme',
          'Markdown desteği',
          'Responsive tasarım',
          'Dark/Light mode'
        ],
        tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Express.js'],
        github: 'https://github.com/emredeveloper/notlarim',
        demo: 'https://emredeveloper.github.io/notlarim',
        image: 'https://raw.githubusercontent.com/emredeveloper/notlarim/main/preview.png'
      },
      havadurum: {
        title: 'Hava Durumu App - Mobil-First Uygulama',
        description: 'React Native teknolojisi ile geliştirilmiş, anlık hava durumu bilgileri ve 7 günlük tahmin sunan mobil-first uygulama.',
        features: [
          'Anlık hava durumu bilgileri',
          '7 günlük hava tahmini',
          'Konum tabanlı servis',
          'PWA desteği',
          'Offline çalışma',
          'Push bildirimleri'
        ],
        tech: ['React Native', 'API Integration', 'Geolocation', 'PWA'],
        github: 'https://github.com/emredeveloper/havadurumuapp',
        demo: 'https://emredeveloper.github.io/havadurumuapp',
        image: 'https://raw.githubusercontent.com/emredeveloper/havadurumuapp/main/preview.png'
      },
      portfolio: {
        title: 'Portfolio Sitesi - Modern Web Teknolojileri',
        description: 'Modern web standartlarına uygun, responsive ve performanslı kişisel portfolio websitesi. PWA özellikleri ve gelişmiş animasyonlar içerir.',
        features: [
          'Modern responsive tasarım',
          'PWA özellikleri',
          'Dark/Light mode',
          'Smooth animations',
          'SEO optimizasyonu',
          'Performance optimizasyonu'
        ],
        tech: ['HTML5', 'CSS3', 'JavaScript', 'PWA'],
        github: 'https://github.com/emredeveloper/emredeveloper.github.io',
        demo: 'https://emredeveloper.github.io',
        image: 'https://raw.githubusercontent.com/emredeveloper/emredeveloper.github.io/main/preview.png'
      }
    };

    detailButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = button.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
          this.showModal(modalBody, project);
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close modal
    const closeModal = () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    };

    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });
  }

  showModal(modalBody, project) {
    modalBody.innerHTML = `
      <div style="padding: 2rem;">
        <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 1.5rem;" />
        
        <h2 style="color: var(--primary); margin-bottom: 1rem;">${project.title}</h2>
        
        <p style="margin-bottom: 2rem; line-height: 1.6;">${project.description}</p>
        
        <h3 style="color: var(--primary); margin-bottom: 1rem;">🚀 Özellikler</h3>
        <ul style="margin-bottom: 2rem;">
          ${project.features.map(feature => `<li style="margin-bottom: 0.5rem;">${feature}</li>`).join('')}
        </ul>
        
        <h3 style="color: var(--primary); margin-bottom: 1rem;">🛠️ Teknolojiler</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
          ${project.tech.map(tech => `<span style="background: var(--primary); color: white; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.9rem;">${tech}</span>`).join('')}
        </div>
        
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="${project.demo}" target="_blank" class="btn btn-primary" style="text-decoration: none;">
            🌐 Canlı Demo
          </a>
          <a href="${project.github}" target="_blank" class="btn btn-secondary" style="text-decoration: none;">
            📂 GitHub
          </a>
        </div>
      </div>
    `;
  }
}