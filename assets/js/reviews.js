/**
 * Представляет карусель, которая циклически отображает отзывы.
 */
class Reviews {
  /**
   * @private
   * @type {Object[]}
   */
  #reviews = [];

  /**
   * @private
   * @type {number}
   */
  #currentSlide = 0;

  /**
   * @private
   * @type {number}
   */
  #interval = 0;

  /**
   * @private
   * @type {number}
   */
  #autoScrollInterval = 0;

  /**
   * @private
   * @type {HTMLElement}
   */
  #carouselInner = null;

  /**
   * @private
   * @type {boolean}
   */
  #isMobile = false;

  /**
   * @private
   * @type {number}
   */
  #slidesPerView = 0;

  /**
   * Создает экземпляр Carousel.
   * @param {Object[]} reviews - Массив объектов отзывов.
   * @param {string} reviews[].name - Имя автора отзыва.
   * @param {number} reviews[].rating - Рейтинг, выставленный автором отзыва.
   * @param {string} reviews[].text - Текст отзыва.
   * @param {string} reviews[].avatar - URL аватара автора отзыва.
   * @param {number} [interval=3000] - Интервал автопрокрутки в миллисекундах.
   * @param {number} [slidesPerView=3] - Количество слайдов, отображаемых за один раз.
   */
  constructor(reviews, interval = 3000, slidesPerView = 3) {
    this.#reviews = reviews;
    this.#interval = interval;
    this.#isMobile = window.innerWidth <= 420;
    this.#slidesPerView = this.#isMobile ? slidesPerView : slidesPerView;

    this.#carouselInner = document.querySelector('.carousel-inner');
    this.initCarousel();
  }

  /**
   * Инициализирует карусель, заполняя слайды и запуская автопрокрутку.
   */
  initCarousel() {
    this.populateSlides();
    this.updateOrientation();
    this.startAutoScroll();
    window.addEventListener('resize', this.updateOrientation.bind(this));
  }

  /**
   * Обновляет ориентацию карусели в зависимости от ширины устройства.
   */
  updateOrientation() {
    this.#carouselInner.style.flexDirection = this.#isMobile ? 'column' : 'row';
    this.showSlide(this.#currentSlide);
  }

  /**
   * Заполняет карусель слайдами с отзывами.
   */
  populateSlides() {
    this.#carouselInner.innerHTML = '';

    this.#reviews.forEach(review => {
      const slide = document.createElement('div');
      slide.classList.add('carousel-slide');

      const stars = Array(review.rating).fill('<span class="star"></span>').join('');

      slide.innerHTML = `
        <img class="avatar" src="${review.avatar}" alt="Аватар">
        <div class="review-wrap">
          <div class="review">${review.text}</div>
        </div>
        <div class="review-footer">
          <div class="name">${review.name}</div>
          <div class="rating">${stars}</div>
        </div>
      `;

      this.#carouselInner.appendChild(slide);
    });
    const slides = Array.from(this.#carouselInner.children);
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      this.#carouselInner.appendChild(clone);
    });
  }

  /**
   * Отображает указанный слайд.
   * @param {number} index - Индекс слайда для отображения.
   */
  showSlide(index) {
    const totalSlides = this.#carouselInner.children.length;

    this.#currentSlide = (index + totalSlides) % totalSlides;
    const offset = this.#currentSlide * (this.#isMobile ? -246 : -100 / 3);

    this.#carouselInner.style.transform = this.#isMobile ? `translateY(${offset}px)` : `translateX(${offset}%)`;
    this.#carouselInner.style.transition = 'transform 0.5s ease-in-out';

    if (this.#currentSlide >= totalSlides / 2) {
      setTimeout(() => {
        this.#carouselInner.style.transition = 'none';
        this.#carouselInner.style.transform = this.#isMobile ? 'translateY(0)' : 'translateX(0)';
        this.#currentSlide = 0;
        setTimeout(() => {
          this.#carouselInner.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
      }, 500);
    }
  }

  /**
   * Переход к следующему слайду.
   */
  nextSlide() {
    this.showSlide(this.#currentSlide + 1);
  }

  /**
   * Переход к предыдущему слайду.
   */
  prevSlide() {
    this.showSlide(this.#currentSlide - 1);
  }

  /**
   * Запускает функцию автопрокрутки.
   */
  startAutoScroll() {
    this.#autoScrollInterval = setInterval(() => {
      this.nextSlide();
    }, this.#interval);
  }

  /**
   * Останавливает функцию автопрокрутки.
   */
  stopAutoScroll() {
    clearInterval(this.#autoScrollInterval);
  }
}
  
  document.addEventListener('DOMContentLoaded', () => {
    const reviews = [
      { name: 'Алексей Смирнов', rating: 5, text: 'Отличный сервис! Очень доволен!', avatar: './assets/img/reviews/1.jpeg' },
      { name: 'Мария Иванова', rating: 4, text: 'Хорошо, но есть немного недостатков.', avatar: './assets/img/reviews/2.jpeg' },
      { name: 'Иван Петров', rating: 5, text: 'Замечательно! Буду рекомендовать!', avatar: './assets/img/reviews/3.jpeg' },
      { name: 'Елена Сидорова', rating: 3, text: 'Сервис нормальный, но можно лучше.', avatar: './assets/img/reviews/4.jpeg' },
      { name: 'Дмитрий Кузнецов', rating: 4, text: 'Все хорошо, но можно улучшить удобство.', avatar: './assets/img/reviews/5.jpeg' },
      { name: 'Ольга Ковалева', rating: 5, text: 'Прекрасный опыт, рекомендую!', avatar: './assets/img/reviews/6.jpeg' },
      { name: 'Андрей Зайцев', rating: 5, text: 'Отлично, благодарю за помощь!', avatar: './assets/img/reviews/7.jpeg' },
      { name: 'Светлана Тихонова', rating: 4, text: 'Хороший сервис, мне понравилось.', avatar: './assets/img/reviews/8.jpeg' },
      { name: 'Николай Федоров', rating: 5, text: 'Замечательно, спасибо!', avatar: './assets/img/reviews/9.jpeg' },
      { name: 'Анна Петрова', rating: 4, text: 'Очень хорошее впечатление!', avatar: './assets/img/reviews/10.jpeg' }
    ];
  
    window.carousel = new Reviews(reviews);
  });
  