class Carousel {
    constructor(reviews, interval = 3000) {
      this.reviews = reviews;
      this.currentSlide = 0;
      this.interval = interval;
      this.autoScrollInterval = null;
  
      this.carouselInner = document.querySelector('.carousel-inner');
      this.initCarousel();
    }
  
    initCarousel() {
      this.populateSlides();
      this.updateOrientation();
      this.startAutoScroll();
      window.addEventListener('resize', this.updateOrientation.bind(this));
    }
  
    updateOrientation() {
      const isMobile = window.innerWidth <= 420;
      this.slidesPerView = isMobile ? 3 : 3;
      this.carouselInner.style.flexDirection = isMobile ? 'column' : 'row';
      this.showSlide(this.currentSlide);
    }
  
    populateSlides() {
      this.carouselInner.innerHTML = ''; // Сбросить предыдущий контент
  
      this.reviews.forEach(review => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
  
        const stars = Array(review.rating).fill('<span class="star"></span>').join('');
  
        slide.innerHTML = `
          <img class="avatar" src="${review.avatar}" alt="Avatar">
          <div class="review-wrap">
            <div class="review">${review.text}</div>
          </div>
          <div class="review-footer">
            <div class="name">${review.name}</div>
            <div class="rating">${stars}</div>
          </div>
        `;
  
        this.carouselInner.appendChild(slide);
      });
  
      // Клонируем слайды для циклической прокрутки
      const slides = Array.from(this.carouselInner.children);
      slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        this.carouselInner.appendChild(clone);
      });
    }
  
    showSlide(index) {
      const totalSlides = this.carouselInner.children.length;
      const isMobile = window.innerWidth <= 420;
  
      this.currentSlide = (index + totalSlides) % totalSlides;
      const offset = this.currentSlide * (isMobile ? -246 : -100 / 3);
  
      this.carouselInner.style.transform = isMobile ? `translateY(${offset}px)` : `translateX(${offset}%)`;
      this.carouselInner.style.transition = 'transform 0.5s ease-in-out';
  
      if (this.currentSlide >= totalSlides / 2) {
        setTimeout(() => {
          this.carouselInner.style.transition = 'none';
          this.carouselInner.style.transform = isMobile ? 'translateY(0)' : 'translateX(0)';
          this.currentSlide = 0;
          setTimeout(() => {
            this.carouselInner.style.transition = 'transform 0.5s ease-in-out';
          }, 50);
        }, 500);
      }
    }
  
    nextSlide() {
      this.showSlide(this.currentSlide + 1);
    }
  
    prevSlide() {
      this.showSlide(this.currentSlide - 1);
    }
  
    startAutoScroll() {
      this.autoScrollInterval = setInterval(() => {
        this.nextSlide();
      }, this.interval);
    }
  
    stopAutoScroll() {
      clearInterval(this.autoScrollInterval);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const reviews = [
      { name: 'Алексей Смирнов', rating: 5, text: 'Отличный сервис! Очень доволен!', avatar: 'https://i.pravatar.cc/80?img=1' },
      { name: 'Мария Иванова', rating: 4, text: 'Хорошо, но есть немного недостатков.', avatar: 'https://i.pravatar.cc/80?img=2' },
      { name: 'Иван Петров', rating: 5, text: 'Замечательно! Буду рекомендовать!', avatar: 'https://i.pravatar.cc/80?img=3' },
      { name: 'Елена Сидорова', rating: 3, text: 'Сервис нормальный, но можно лучше.', avatar: 'https://i.pravatar.cc/80?img=4' },
      { name: 'Дмитрий Кузнецов', rating: 4, text: 'Все хорошо, но можно улучшить удобство.', avatar: 'https://i.pravatar.cc/80?img=5' },
      { name: 'Ольга Ковалева', rating: 5, text: 'Прекрасный опыт, рекомендую!', avatar: 'https://i.pravatar.cc/80?img=6' },
      { name: 'Андрей Зайцев', rating: 5, text: 'Отлично, благодарю за помощь!', avatar: 'https://i.pravatar.cc/80?img=7' },
      { name: 'Светлана Тихонова', rating: 4, text: 'Хороший сервис, мне понравилось.', avatar: 'https://i.pravatar.cc/80?img=8' },
      { name: 'Николай Федоров', rating: 5, text: 'Замечательно, спасибо!', avatar: 'https://i.pravatar.cc/80?img=9' },
      { name: 'Анна Петрова', rating: 4, text: 'Очень хорошее впечатление!', avatar: 'https://i.pravatar.cc/80?img=10' }
    ];
  
    window.carousel = new Carousel(reviews);
  });
  