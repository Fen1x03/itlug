//  Убираем animation при загрузке страницы
document.querySelectorAll('.lecture-item').forEach(item => {
    item.classList.add('no-animation');
  });
  
  // Откладываем удаление класса, чтобы анимация работала при первом открытии
  setTimeout(() => {
    document.querySelectorAll('.lecture-item').forEach(item => {
      item.classList.remove('no-animation');
    });
  }, 100);
  
  
  // Добавляем слушатель событий на клик по summary, чтобы корректно работала анимация
  document.querySelectorAll('summary').forEach(summary => {
    summary.addEventListener('click', (event) => {
      const details = summary.parentElement;
      if (details.open) {
        // Закрытие
        details.classList.add('closing');
        setTimeout(() => {
          details.classList.remove('closing');
        }, 300); // Время анимации (подбирайте под свою анимацию)
      } else {
        // Открытие
        details.classList.add('opening');
        setTimeout(() => {
          details.classList.remove('opening');
        }, 300); // Время анимации (подбирайте под свою анимацию)
      }
    });
  });