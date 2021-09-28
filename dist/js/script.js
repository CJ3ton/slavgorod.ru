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
    docFilterReset = document.querySelector('#doc-filter__reset');

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

$(document).ready(function () {
    $('#email').blur(function () {
        if ($(this).val() != '') {
            var pattern =
                /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
            if (pattern.test($(this).val())) {
                $(this).css({
                    'border': '1px solid #569b44'
                });
                $('#valid').text('  Корректный адрес');
                //$("#send").removeAttr("disabled");
            } else {
                $(this).css({
                    'border': '1px solid #ff0000'
                });
                $('#valid').text('  Некорректный адрес!');
                //	$("#send").attr("disabled", "disabled")
            }
        } else {
            // $("#send").removeAttr("disabled");
            $('#valid').text('');
            $(this).css({
                'border': ''
            });
        }
    });
    $('#tel').blur(function () {
        if ($(this).val() != '') {
            var pattern =
                /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i;
            if (pattern.test($(this).val())) {
                $(this).css({
                    'border': '1px solid #569b44'
                });
                $('#valid_tel').text('  Корректный номер');
                //$("#send").removeAttr("disabled");
            } else {
                $(this).css({
                    'border': '1px solid #ff0000'
                });
                $('#valid_tel').text('  Некорректный номер!');
                //$("#send").attr("disabled", "disabled")
            }
        } else {
            //$("#send").removeAttr("disabled");
            $('#valid_tel').text('');
            $(this).css({
                'border': ''
            });
        }
    });
    $('#adr_index').bind("change keyup input click", function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, '');
        }
    });
});

jQuery(document).ready(function ($) {
    $('.spoiler__body').hide();
    $('.spoiler__title').click(function () {
        $(this).next().slideToggle();
        $(this).find('.toggle').toggleClass('close');
        $(this).find('.toggle').toggleClass('open');
    });
    });