const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.main__menu'),
    menuItem = document.querySelectorAll('.menu__link'),
    overlay = document.querySelector('.overlay');

$(document).ready(function () {
    $('.main__slider').slick({
        speed: 1200,
        autoplay: true,
        dots: true,
        slide: '.main__slider-slide',
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow-left.svg" alt="Prev"</button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow-right.svg" alt="Next"</button>',
        responsive: [{
            breakpoint: 768,
            settings: {
                dots: true,
                arrows: false
            }
        }]
    });

    $('.footer__slider').slick({
        slidesToShow: 5,
        speed: 1200,
        autoplay: true,
        arrows: false,
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
            },
        }]
    });

    initMenu();

});

function initMenu() {
    $('.submenu').hide();
    $('.dropdown a').click(
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
});

menuItem.forEach(item => {
    item.addEventListener('click', () => {
        menu.classList.remove('open');
    })
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 1200) {
        $('.pageup').fadeIn();
    } else {
        $('.pageup').fadeOut();
    }
})

$('.pageup').click(function () {
    var _href = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(_href).offset().top + "px"
    });
    menu.classList.remove('open');
    return false;
});