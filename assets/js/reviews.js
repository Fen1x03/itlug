class TestimonialsCarousel {
  constructor(elementId, data) {
      this.elementId = elementId;
      this.data = data;
      this.currentIndex = 0;
      this.itemsToShow = 3; // Количество отзывов для одновременного отображения
      this.carouselElement = document.getElementById(this.elementId);
      this.cardContainer = document.createElement('div'); // Контейнер для карточек отзывов
      this.cardContainer.classList.add('testimonials-card-container');
      this.cardWidth = 300; //Ширина testimonial-card
      this.cardMarginRight = 20 // margin-right для testimonial-card
      this.isMobile = window.innerWidth <= 768;
      this.init();
  }
 
  init() {
      this.createCards(); // Создаем карточки и добавляем их в контейнер
      this.startAutoRotation(); // Запускаем автоматическую ротацию
      this.carouselElement.appendChild(this.cardContainer); // Добавляем контейнер в карусель
      this.setCarouselStyle(); // Устанавливаем стиль отображения карусели
  }
   startAutoRotation() {
     setInterval(() => {
         this.next();
     }, 3000); // Автоматическая прокрутка каждые 3 секунды
  }
   next() {
      if (this.isMobile) {
              this.currentIndex = (this.currentIndex + this.itemsToShow) % (this.data.length);
          this.updateCarousel();
      }
  }
 
  createTestimonialCard(testimonial) {
      const card = document.createElement('div');
      card.classList.add('testimonial-card');
      card.innerHTML = `
          <img src="${testimonial.image}" alt="${testimonial.name}" class="testimonial-image">
          <p class="testimonial-text">${testimonial.text}</p>
          <h3 class="testimonial-name">${testimonial.name}</h3>
          <div class="testimonial-rating">
              ${'⭐️'.repeat(testimonial.rating)}
          </div>
      `;
      return card;
  }
 
  createCards() {
     for (let i = 0; i < this.data.length; i++) {
         const card = this.createTestimonialCard(this.data[i]);
          this.cardContainer.appendChild(card);
      }
  }
      setCarouselStyle() {
      this.isMobile = window.innerWidth <= 768;
      if (this.isMobile) {
          this.cardWidth = this.carouselElement.offsetWidth * 0.8; //80% ширины элемента
          this.cardMarginRight = 0; //Убираем отступ
          this.cardContainer.style.flexDirection = 'column'; //Вертикальный столбец
          this.cardContainer.style.alignItems = 'center';
        Array.from(this.cardContainer.children).forEach((card, index) => {
              if (index < this.currentIndex || index >= this.currentIndex + this.itemsToShow) {
                      card.style.display = 'none';
              } else {
                  card.style.display = 'block';
              }
      });
      } else {
          this.cardWidth = 300; //Размер как на десктопе
          this.cardMarginRight = 20;
          this.cardContainer.style.flexDirection = 'row';
          this.cardContainer.style.alignItems = 'flex-start';
              Array.from(this.cardContainer.children).forEach((card, index) => {
                    card.style.display = 'block';
              });
      }
 
      // Обновляем размеры карточек и margin
      Array.from(this.cardContainer.children).forEach(card => {
          card.style.width = this.cardWidth + 'px';
          card.style.marginRight = this.cardMarginRight + 'px';
          card.style.marginBottom = this.isMobile ? '20px' : '0';
      });
  }
 
  updateCarousel() {
        //Определяем нужный стиль для прокрутки
    if (this.isMobile) {
      this.setCarouselStyle(); //
      } else {
          let translateX;
          translateX = -this.currentIndex * (this.cardWidth + this.cardMarginRight) + (this.carouselElement.offsetWidth / 2) - ((this.cardWidth + this.cardMarginRight) / 2); // Adjust center calculation
          this.cardContainer.style.transform = `translateX(${translateX}px)`;
      }
  }
 }

const reviews = [
  { name: 'Алексей Смирнов', rating: 5, text: 'Отличный сервис! Очень доволен!', image: 'https://i.pravatar.cc/80?img=1' },
  { name: 'Мария Иванова', rating: 4, text: 'Хорошо, но есть немного недостатков.', image: 'https://i.pravatar.cc/80?img=2' },
  { name: 'Иван Петров', rating: 5, text: 'Замечательно! Буду рекомендовать!', image: 'https://i.pravatar.cc/80?img=3' },
  { name: 'Елена Сидорова', rating: 3, text: 'Сервис нормальный, но можно лучше.', image: 'https://i.pravatar.cc/80?img=4' },
  { name: 'Дмитрий Кузнецов', rating: 4, text: 'Все хорошо, но можно улучшить удобство.', image: 'https://i.pravatar.cc/80?img=5' },
  { name: 'Ольга Ковалева', rating: 5, text: 'Прекрасный опыт, рекомендую!', image: 'https://i.pravatar.cc/80?img=6' },
  { name: 'Андрей Зайцев', rating: 5, text: 'Отлично, благодарю за помощь!', image: 'https://i.pravatar.cc/80?img=7' },
  { name: 'Светлана Тихонова', rating: 4, text: 'Хороший сервис, мне понравилось.', image: 'https://i.pravatar.cc/80?img=8' },
  { name: 'Николай Федоров', rating: 5, text: 'Замечательно, спасибо!', image: 'https://i.pravatar.cc/80?img=9' },
  { name: 'Анна Петрова', rating: 4, text: 'Очень хорошее впечатление!', image: 'https://i.pravatar.cc/80?img=10' }
];

const carousel = new TestimonialsCarousel('testimonialsCarousel', reviews);