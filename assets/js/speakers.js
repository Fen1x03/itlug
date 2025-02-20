document.addEventListener('DOMContentLoaded', () => {
    const lectorCards = document.querySelectorAll('.lector-card');

    const showCard = (card, delay) => {
        setTimeout(() => {
            card.classList.add('show');
        }, delay);
    };

    lectorCards.forEach((card, index) => {
        showCard(card, index * 200); // Задержка 200ms для каждой карточки
    });
});