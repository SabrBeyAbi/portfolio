window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    // Добавляем задержку в 500мс, чтобы пользователь успел увидеть прелоадер (опционально)
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        
        // Полностью удаляем из DOM через полсекунды, чтобы не мешал кликам
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 500);
});

const burgerBtn = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');
const navLinks = document.querySelectorAll('nav a');

// 1. Открытие/Закрытие по клику на бургер
burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    mobileNav.classList.toggle('open');
    
    // Блокируем скролл страницы, когда меню открыто
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

// 2. Закрытие меню при клике на любую ссылку (чтобы перейти к секции)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    });
});
