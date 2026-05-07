// ===========================
// WVS & MTN — Carousel Component
// ===========================

class Carousel {
  constructor(options = {}) {
    this.container = document.querySelector(options.selector || '.carousel-container');
    if (!this.container) return;
    
    this.track = this.container.querySelector('.carousel-track');
    this.slides = this.container.querySelectorAll('.carousel-slide');
    this.dotsContainer = this.container.querySelector('.carousel-indicators');
    this.prevBtn = this.container.querySelector('.carousel-prev');
    this.nextBtn = this.container.querySelector('.carousel-next');
    this.playPauseBtn = this.container.querySelector('.carousel-play-pause');
    
    this.currentIndex = 0;
    this.autoplayInterval = null;
    this.isAutoPlaying = true;
    this.autoplayDelay = options.autoplayDelay || 5000;
    
    this.init();
  }
  
  init() {
    if (!this.track || this.slides.length === 0) return;
    
    // Create dots
    if (this.dotsContainer) {
      this.createDots();
    }
    
    // Add event listeners
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }
    if (this.playPauseBtn) {
      this.playPauseBtn.addEventListener('click', () => this.toggleAutoplay());
    }
    
    // Add dot click listeners
    if (this.dotsContainer) {
      const dots = this.dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => this.goToSlide(idx));
      });
    }
    
    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
    this.container.addEventListener('mouseleave', () => {
      if (this.isAutoPlaying) this.startAutoplay();
    });
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    this.track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    this.track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, false);
    
    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) {
        this.next();
      } else if (touchEndX > touchStartX + 50) {
        this.prev();
      }
    };
    this.handleSwipe = handleSwipe;
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!this.container.closest(':visible')) return;
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
    
    // Start autoplay
    this.startAutoplay();
    
    // Initial slide
    this.updateSlide();
  }
  
  createDots() {
    this.slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
      dot.addEventListener('click', () => this.goToSlide(idx));
      this.dotsContainer.appendChild(dot);
    });
  }
  
  updateSlide() {
    // Update track position
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;
    
    // Update dots
    const dots = this.dotsContainer?.querySelectorAll('.carousel-dot');
    if (dots) {
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === this.currentIndex);
      });
    }
    
    // Update play/pause button
    if (this.playPauseBtn) {
      this.playPauseBtn.textContent = this.isAutoPlaying ? '⏸' : '▶';
    }
  }
  
  next() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlide();
  }
  
  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.updateSlide();
  }
  
  goToSlide(idx) {
    this.currentIndex = idx;
    this.updateSlide();
  }
  
  startAutoplay() {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
    this.autoplayInterval = setInterval(() => this.next(), this.autoplayDelay);
  }
  
  pauseAutoplay() {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
  }
  
  toggleAutoplay() {
    this.isAutoPlaying = !this.isAutoPlaying;
    if (this.isAutoPlaying) {
      this.startAutoplay();
    } else {
      this.pauseAutoplay();
    }
    this.updateSlide();
  }
  
  destroy() {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
    this.prevBtn?.removeEventListener('click', () => this.prev());
    this.nextBtn?.removeEventListener('click', () => this.next());
    this.playPauseBtn?.removeEventListener('click', () => this.toggleAutoplay());
  }
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', () => {
  new Carousel({
    selector: '.carousel-container',
    autoplayDelay: 5000
  });
});

// Also support manual initialization
window.Carousel = Carousel;
