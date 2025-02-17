const reviews = [
    { name: 'Алексей Смирнов', rating: 5, text: 'Отличный сервис! Очень доволен!' },
    { name: 'Мария Иванова', rating: 4, text: 'Хорошо, но есть немного недостатков.' },
    { name: 'Иван Петров', rating: 5, text: 'Замечательно! Буду рекомендовать!' },
    { name: 'Елена Сидорова', rating: 3, text: 'Сервис нормальный, но можно лучше.' },
    { name: 'Дмитрий Кузнецов', rating: 4, text: 'Все хорошо, но можно улучшить удобство.' },
    { name: 'Ольга Ковалева', rating: 5, text: 'Прекрасный опыт, рекомендую!' },
    { name: 'Андрей Зайцев', rating: 5, text: 'Отлично, благодарю за помощь!' },
    { name: 'Светлана Тихонова', rating: 4, text: 'Хороший сервис, мне понравилось.' },
    { name: 'Николай Федоров', rating: 5, text: 'Замечательно, спасибо!' },
    { name: 'Анна Петрова', rating: 4, text: 'Очень хорошее впечатление!' }
  ];
  
  let currentSlide = 0;
  const slidesPerView = 3;
  
  document.addEventListener('DOMContentLoaded', () => {
    const carouselInner = document.querySelector('.carousel-inner');
  
    reviews.forEach(review => {
      const slide = document.createElement('div');
      slide.classList.add('carousel-slide');
  
      slide.innerHTML = `
        <div class="review">${review.text}</div>
        <div class="name">${review.name}</div>
        <div class="rating">${'⭐️'.repeat(review.rating)}</div>
      `;
  
      carouselInner.appendChild(slide);
    });
  
    showSlide(currentSlide);
  });
  
  function showSlide(index) {
    const carouselInner = document.querySelector('.carousel-inner');
    const totalSlides = Math.ceil(reviews.length / slidesPerView);
  
    currentSlide = (index + totalSlides) % totalSlides;
    const offset = currentSlide * -100 / slidesPerView;
    carouselInner.style.transform = `translateX(${offset}%)`;
  }
  
  function nextSlide() {
    showSlide(currentSlide + 1);
  }
  
  function prevSlide() {
    showSlide(currentSlide - 1);
  }