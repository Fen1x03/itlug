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
  
  
  document.querySelectorAll('summary').forEach(summary => {
    summary.addEventListener('click', (event) => {
      const details = summary.parentElement;
      if (details.open) {
        // Закрытие
        details.classList.add('closing');
        setTimeout(() => {
          details.classList.remove('closing');
        }, 300);
      } else {
        // Открытие
        details.classList.add('opening');
        setTimeout(() => {
          details.classList.remove('opening');
        }, 300);
      }
    });
  });