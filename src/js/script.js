const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.main__menu'),
    menuItem = document.querySelectorAll('.menu__link'),
    bottom = document.querySelector('.header__bottom'),
    expand = document.querySelector('.header__bottom-expand'),
    overlay = document.querySelector('.overlay');

$(document).ready(function () {
    $('.main__slider').slick({
        speed: 2000,
        autoplay: true,
        dots: true,
        slide: '.main__slider-slide',
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow-left.svg" alt="Prev"</button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow-right.svg" alt="Next"</button>',
        responsive: [{
            breakpoint: 768,
            settings: {
                dots: false,
                arrows: false
            }
        }]
    });

    $('.footer__slider').slick({
        slidesToShow: 5,
        speed: 1200,
        autoplay: true,
        arrows: false,
        swipeToSlide: true,
        slide: '.footer__slider-slide',
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    initMenu();

});

function initMenu() {
    $('.submenu').hide();
    $('.dropdown>a').click(
        function (evt) {
            evt.preventDefault();
            $(this).next().next().slideToggle('normal');
            $(this).parent().toggleClass('open');
        }
    );
}

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('open');
    overlay.classList.toggle('active');
});

expand.addEventListener('click', () => {
    bottom.classList.toggle('expanded');
    expand.classList.toggle('open');
});

menuItem.forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.remove('open');
    });
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 1200) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
});

$('.pageup').click(function () {
    var _href = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(_href).offset().top + "px"
    });
    menu.classList.remove('open');
    return false;
});

$(function () {
    $("#search_data").datepicker();
    jQuery(function ($) {
        $.datepicker.regional.ru = {
            closeText: 'Закрыть',
            prevText: '<Пред',
            nextText: 'След>',
            currentText: 'Сегодня',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
            ],
            monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
            ],
            dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekHeader: 'Нед',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            showOtherMonths: true,
            selectOtherMonths: true,
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            showAnim: 'fold',
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional.ru);
    });
});

function searchShow () {
    $('.main__docsearch-block').hide();
    $('.main__docsearch-title').click(
        function (evt) {
            $('.main__docsearch-block').slideToggle('normal');
            $('.main__docsearch-title').toggleClass('open');
        }
    );
}

searchShow();