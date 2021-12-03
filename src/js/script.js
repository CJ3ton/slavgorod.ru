const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.main__menu'),
    menuItem = document.querySelectorAll('.menu__link'),
    bottom = document.querySelector('.header__bottom'),
    expand = document.querySelector('.header__bottom-expand'),
    overlay = document.querySelector('.overlay'),
    searchDate = document.querySelector('#search_data'),
    searchType = document.querySelector('#search_type'),
    searchNum = document.querySelector('#search_num'),
    searchTxt = document.querySelector('#search_txt'),
    docFilterReset = document.querySelector('#doc-filter__reset'),
    msg = document.querySelector('#msg'),
    msgClose = document.querySelector('.messages__close'),
    msgWindow = document.querySelector('.messages');


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

    $('.messages__slider').slick({
        slidesToShow: 1,
        fade: true,
        speed: 500,
        autoplay: false,
        arrows: true,
        swipeToSlide: true,
        dots: true,
        adaptiveHeight: true,
        slide: '.messages__item',
        prevArrow: '<button type="button" class="message-prev"><i class="fas fa-angle-left"></i></button>',
        nextArrow: '<button type="button" class="message-next"><i class="fas fa-angle-right"></i></button>'
    });

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
            showAnim: 'fold',
            showButtonPanel: true,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional.ru);
    });

    $('.spoiler__title').click(function () {
        $(this).next().slideToggle();
        $(this).toggleClass('open');
    });

    initMenu();
    searchShow();
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

if (msg){
msg.addEventListener('click', (evt) => {
    evt.preventDefault();
    $('.messages__slider').slick('setPosition');
    overlay.classList.toggle('active');
    msgWindow.classList.toggle('open');
});
}

msgClose.addEventListener('click', () => {
    overlay.classList.toggle('active');
    msgWindow.classList.toggle('open');
});

if (docFilterReset) {
    docFilterReset.addEventListener('click', (evt) => {
        evt.preventDefault();
        console.log(searchDate.value);
        searchDate.value = '';
        searchNum.value = '';
        searchType.selectedIndex = 0;
        searchTxt.value = '';
    });
}

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

function searchShow() {
    $('.main__docsearch-title').click(
        function (evt) {
            $('.main__docsearch-block').toggleClass('open');
            $('.main__docsearch-title').toggleClass('open');
            if ($('.main__docsearch-title').hasClass("open")) {
                Cookies.set('search-open', 'open');
            } else {
                Cookies.remove('search-open');
            }
        }
    );
}