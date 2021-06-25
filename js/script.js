function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }else{
    document.querySelector('body').classList.add('no-webp');
    }
    });;

"use strict"

// Определение устройства просмотра страницы (Мобильное или ПК)
/*
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    },
};

if (isMobile.any()) {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for (let i = 0; i < menuArrows.length; i++) {
            const menuArrow = menuArrows[i];
            menuArrow.addEventListener('click', function(e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }

} else {
    document.body.classList.add('_pc');
}
// --------------------------------------------------------------------------------

*/
// Прокрутка при клике
const menuLinks = document.querySelectorAll('.nav-link[data-goto]');

if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            
            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            function activeLinkRemove(params) {
                let menuLinkActive= document.querySelector('._active-link');
                if (menuLinkActive) {
                    menuLinkActive.classList.remove('_active-link');
                }
            }
            activeLinkRemove();
            menuLink.closest('li').classList.add('_active-link');
            gotoBlock.scrollIntoView({ block: 'center',  behavior: 'smooth' });
            e.preventDefault();
        }
    }
}
// --------------------------------------------------------------------------------

let partnersSwiper = new Swiper('.swiper-partners', {
    wrapperClass: 'swiper-partners__wrapper',
    slideClass: 'swiper-partners__slide',

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    spaceBetween: 30,
    allowTouchMove: true,
    grabCursor: true,

    slidesPerView: 4,
    /*
    breakpoints: {
        320: {
            centeredSlides: true,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 2,
        },
        993: {
            slidesPerView: 3,
            spaceBetween: 15,            
        }
    },
    */

    direction: 'horizontal',
    // Включение параллакс
    parallax: true,

    loop: true,
    

    // Скорость
    speed: 800,

    // Обновить свайпер
    // при изменении элементов слайдера
    observeParents: true, 

    // Обновить свайпер
    // при изменении дочерних
    // элементов слайда
    jbserveSlideChildren: true, 


    // Навигация
    // Буллеты, текущее положение, прогрессбар
    pagination: {
        el: '.swiper-partners_pagination',
        type: 'bullets', 
        clickable: true, 
        bulletClass: "swiper-partners__bullet",
        bulletActiveClass: "swiper-partners__bullet_active",
    },
})
// --------------------------------------------------------------------------------
let introSwiper = new Swiper('.swiper-intro', {
    wrapperClass: 'swiper-intro__wrapper',
    slideClass: 'swiper-intro__slide',

    allowTouchMove: true,
    grabCursor: true,
    centeredSlides: true,

    slidesPerView: '1',

    direction: 'horizontal',
    // Включение параллакс
    parallax: true,

    // Скорость
    speed: 800,

    // Обновить свайпер
    // при изменении элементов слайдера
    observeParents: true, 

    // Обновить свайпер
    // при изменении дочерних
    // элементов слайда
    jbserveSlideChildren: true, 


    // Навигация
    // Буллеты, текущее положение, прогрессбар
    pagination: {
        el: '.swiper-intro_pagination',
        type: 'bullets', 
        clickable: true, 
        bulletClass: "swiper-intro__bullet",
        bulletActiveClass: "swiper-intro__bullet_active",
    },
});

// Popup скрипт--------------------------------------------------------------------

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

// Та же самая цифра, которая в transition появления попапа
const timeout = 500;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function(e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
};

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function(e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        })
    }
};

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        
        // для случаев если есть попап в попапе (закрывает первый)
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        // --------------------------------------------------------
        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
};


function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        // для проверки, если открывается попап в попапе
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
};

// убирает скролл + добавляет паддинги фиксированным элементам (.lock-padding)
function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.page-wrapper').offsetWidth + 'px';
    if (lockPadding.length > 0) {

        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            console.log(el);
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;        
    }, timeout);
    
};

function bodyUnlock() {
    setTimeout(function () {
        if (lockPadding) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);

};

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

// Определяем метод для браузеров, которые не поддерживают их
(function () {
    //проверяем поддержку
    if (!Element.prototype.closest) {
        //реализуем данный метод
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})();

(function () {
    // проверяем поддержку
    if (!Element.prototype.matches) {
        //определяем свойство(метод)
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();

// Бургер меню


const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener('click', function(e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    }) 
}

// --------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
const forms = document.querySelectorAll('.form-validate');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let inputs = document.querySelectorAll('._req');
            if (inputs.length > 0) {
                for (index = 0; index < inputs.length; index++) {
                    let input = inputs[index];
                    input.classList.remove('_error');
                    if (input.classList.contains('_req')) {
                        if (input.value === "") {
                            input.classList.add('_error');
                        }
                    };
                };
            };
        });
    });
});