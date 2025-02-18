class Carousel {
  constructor(reviews, slidesPerView = 3, interval = 3000) {
    this.reviews = reviews;
    this.slidesPerView = slidesPerView;
    this.currentSlide = 0;
    this.interval = interval;

    this.carouselInner = document.querySelector('.carousel-inner');
    this.initCarousel();
  }

  initCarousel() {
    this.populateSlides();
    this.cloneSlides();
    this.showSlide(this.currentSlide);
    this.startAutoScroll();
  }

  populateSlides() {
    this.reviews.forEach(review => {
      const slide = document.createElement('div');
      slide.classList.add('carousel-slide');

      const stars = Array(review.rating).fill('<span class="star"></span>').join('');

      slide.innerHTML = `
        <img class="avatar" src="${review.avatar}" alt="Avatar">
        <div class="review">${review.text}</div>
        <div class="name">${review.name}</div>
        <div class="rating">${stars}</div>
      `;

      this.carouselInner.appendChild(slide);
    });
  }

  cloneSlides() {
    const slides = this.carouselInner.children;

    for (let i = 0; i < this.slidesPerView; i++) {
      const clone = slides[i].cloneNode(true);
      this.carouselInner.appendChild(clone);
    }
  }

  showSlide(index) {
    const totalSlides = this.reviews.length;

    this.currentSlide = (index + totalSlides) % totalSlides;
    const offset = this.currentSlide * -100 / this.slidesPerView;
    this.carouselInner.style.transform = `translateX(${offset}%)`;

    // Плавность прокрутки
    this.carouselInner.style.transition = 'transform 0.5s ease-in-out';
  }

  nextSlide() {
    this.showSlide(this.currentSlide + 1);
  }

  prevSlide() {
    this.showSlide(this.currentSlide - 1);
  }

  startAutoScroll() {
    setInterval(() => {
      this.nextSlide();
    }, this.interval);
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
