$(document).ready(function () {

    $('.navbar-toggler').click(function () {
        $('.navbar-toggler').toggleClass('change-navbar')
    })

    /*Navbar fixed position*/
    $(window).scroll(function () {
        let position = $(this).scrollTop();
        if (position >= 1220) {
            $('.navbar').addClass('navbar-background');
            $('.navbar').addClass('fixed-top');
        }
        else {
            $('.navbar').removeClass('navbar-background');
            $('.navbar').removeClass('fixed-top');
        }
    })

    /*Smooth scroll*/
    $('nav-item a').clicl(function () {
        link.preventDefault;
        let targer = $(this).attr('href');
        $('html', 'body').animate({
            scrollTop: $(targer).offset().top - 25
        }, 2000);
    })

    /*Magnific popup gallery*/
    $('.parent-container').magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',

        gallery:{
            enabled: true
        }
    });
});