$(document).ready(function () {

    $("#openOrders").on("load", getOpenOrders())

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

function getOpenOrders() {
    let orders='';
    if (localStorage.getItem('activeOrders') != null) {
        orders = JSON.parse(localStorage.getItem('activeOrders'));
        setOpenOrders(orders);
    }
    else document.getElementById('openOrders').innerHTML = 'No orders awaiting treatment! Take a break';
}

function setOpenOrders(orders) {
    console.log(orders.length);
    for (let i = 0; i < orders.length; i++) {
        console.log(i);
        createOrderObj(orders[i],i+1);
    }
}

function createOrderObj(order,i) {
    var orderStr = '<tr><th>Order #'+i+'</th></tr>';
    for (let i = 0; i < order.length - 1; i++) {
        let o = JSON.parse(order[i]);
        console.log(o);
        let str = '<tr><td>' + o.quantity + ' ' + o.name + '</td><td>' + o.total + '$</td></tr > ';
        orderStr += str;
    }
    console.log(order.length - 1);
    let o = JSON.parse(order[order.length-1]);
    orderStr += '<tr><td>Total order price:' + o.sum + '$</td></tr>';
    document.getElementById('openOrdersTbl').innerHTML += orderStr;
}