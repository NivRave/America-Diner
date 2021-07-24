$(document).ready(function () {

    $('.courseNames').click(function(){
        setDelCourses();
    })

    $('.navbar-toggler').click(function () {
        $('.navbar-toggler').toggleClass('change-navbar')
    })

    /*Navbar fixed position*/
    $(window).scroll(function () {
        let position = $(this).scrollTop();
        if (position >= 200) {
            $('.navbar-m').addClass('navbar-background');
            $('.navbar-m').addClass('fixed-top');
        }
        else {
            $('.navbar-m').removeClass('navbar-background');
            $('.navbar-m').removeClass('fixed-top');
        }
    })

    /*Smooth scroll - NOT WORKING!!!!!*/
    $('nav-item a').click(function () {
        link.preventDefault;
        let target = $(this).attr('href');
        $('html', 'body').animate({
            scrollTop: $(target).offset().top - 25
        }, 2000);
    });
});