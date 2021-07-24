$(document).ready(function () {
    //on-load method to get data from localhost and keep the menu up-to-date
    $("#menu").on("load",updateMenu());

    $('.navbar-toggler').click(function () {
        $('.navbar-toggler').toggleClass('change-navbar')
    })

    /*Navbar fixed position*/
    $(window).scroll(function () {
        let position = $(this).scrollTop();
        if (position >= 1220) {
            $('.navbar-i').addClass('navbar-background');
            $('.navbar-i').addClass('fixed-top');
        }
        else {
            $('.navbar-i').removeClass('navbar-background');
            $('.navbar-i').removeClass('fixed-top');
        }
    })

    /*Smooth scroll*/
    $('nav-item a').click(function () {
        link.preventDefault;
        let target = $(this).attr('href');
        $('html', 'body').animate({
            scrollTop: $(target).offset().top - 25
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