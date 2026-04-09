// Как только скрипт начал работу — блокируем скролл
document.body.classList.add('no-scroll');

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    setTimeout(() => {
        preloader.classList.add('preloader-hidden');
        
        // Когда прелоадер скрылся, возвращаем скролл
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('no-scroll'); // Разблокируем
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
