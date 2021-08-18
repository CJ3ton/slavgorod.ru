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
});