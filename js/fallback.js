// Fallback JavaScript for older browsers
(function() {
  'use strict';
  
  // Theme toggle function (legacy support)
  window.toggleTheme = function() {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  };

  // Initialize theme on load
  window.addEventListener('load', function() {
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light');
    }
  });

  // Basic smooth scrolling for older browsers
  window.addEventListener('load', function() {
    var links = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });

})();