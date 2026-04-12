// 1. ПЕРЕМЕННЫЕ И НАСТРОЙКИ
const preloader = document.getElementById('preloader');
const hasSeenPreloader = sessionStorage.getItem('preloaderShown');
const burgerBtn = document.getElementById('burgerBtn');
const mobileNav = document.getElementById('mobileNav');
const navLinks = document.querySelectorAll('nav a');

let isUserScrolling = false;

// Отслеживаем ручной скролл пользователя (колесо или тач)
const stopAutoScroll = () => {
    isUserScrolling = true;
};
window.addEventListener('wheel', stopAutoScroll, { once: true });
window.addEventListener('touchmove', stopAutoScroll, { once: true });

// Функция для плавного перехода к якорю
function scrollToHash() {
    if (window.location.hash && !isUserScrolling) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            // Небольшая задержка, чтобы браузер успел отрисовать страницу после блокировки скролла
            setTimeout(() => {
                if (!isUserScrolling) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }
}

// 2. ЛОГИКА ПРЕЛОАДЕРА
if (hasSeenPreloader) {
    // Пользователь уже был на сайте в этой сессии
    if (preloader) preloader.style.display = 'none';
    document.body.classList.remove('no-scroll');
    
    // Сразу пытаемся прокрутить к нужному блоку
    scrollToHash();
} else {
    // Первый вход на сайт
    document.body.classList.add('no-scroll');

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) preloader.classList.add('preloader-hidden');
            
            setTimeout(() => {
                if (preloader) preloader.style.display = 'none';
                document.body.classList.remove('no-scroll');
                
                // Запоминаем, что прелоадер показан
                sessionStorage.setItem('preloaderShown', 'true');

                // Прокручиваем к якорю после исчезновения прелоадера
                scrollToHash();
            }, 500);
        }, 500);
    });
}

// 3. ЛОГИКА БУРГЕР-МЕНЮ
burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    mobileNav.classList.toggle('open');
    
    // Блокируем скролл, только когда открыто мобильное меню
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

// Закрытие меню при клике на ссылки
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    });
});
