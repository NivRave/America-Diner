/*Custom scripts for the management area*/

$(document).ready(function () {

    /*On-load methods - initialize orders*/
    $("#openOrders").on("load", getOrders())
    $('#clients-management').on("load", alertOrders())

    //Init courses to delete
    $('.courseNames').click(function(){
        setDelCourses();
    })

    //Navbar toggler
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

    /*Smooth scroll - NOT WORKING!!!!!*/ ///faskfoipsajfpoasjfposaujfpiou FIX IT IITIITTTT
    $('nav-item a').click(function () {
        link.preventDefault;
        let target = $(this).attr('href');
        $('html', 'body').animate({
            scrollTop: $(target).offset().top - 25
        }, 2000);
    });
});

//Basic alert on page loading - greet if no orders awaiting or alert if there are any
function alertOrders() {
    let state = localStorage.getItem('mEntry');
    if (state == '0') {
        localStorage.setItem('mEntry', '1');
        let n1 = localStorage.getItem('openOrdersCounter');
        let n2 = localStorage.getItem('processOrdersCounter');
        if (n1 != 0 || n2 != 0) {
            alert('Welcome manager, you have active orders to attend!');
        }
        else {
            alert('Welcome manager, have a great day!');
        }
    }
}

/*Orders area setup - each method according to it's name*/
function getOrders() {
    getOpenOrders();
    getProcessOrders();
    getFinishedOrders();
}
function getFinishedOrders() {
    let orders = '';
    var ls = localStorage.getItem('finishedOrders');
    if (localStorage.getItem('finishedOrdersCounter') != 0) {
        orders = JSON.parse(ls);
        setOrders(orders, 'finishedOrdersTbl');
    }
    else document.getElementById('finishedOrders').innerHTML = '<h2>No finished orders so far</h2>';
}
function getProcessOrders() {
    let orders = '';
    var ls = localStorage.getItem('processOrders');
    if (localStorage.getItem('processOrdersCounter') != 0) {
        orders = JSON.parse(ls);
        setOrders(orders, 'processOrdersTbl');
    }
    else document.getElementById('processOrders').innerHTML = '<h2>No orders in progress! Check if an open order needs adressing!</h2>';
}
function getOpenOrders() {
    let orders = '';
    var ls = localStorage.getItem('openOrders');
    if (localStorage.getItem('openOrdersCounter') != 0) {
        orders = JSON.parse(ls);
        setOrders(orders,'openOrdersTbl');
    }
    else document.getElementById('openOrders').innerHTML = '<h2>No orders awaiting treatment! Take a break</h2>';
}
//Set orders for the give orderElement (open/progress/finished)
function setOrders(orders,orderElement) {
    for (let i = 0; i < orders.length; i++) {
        createOrderObj(orders[i], i + 1, orderElement);
    }
}
//Assisting method - create an order object
function createOrderObj(order,i,orderElement) {
    var orderStr = '<tr><th>Order #' + i + '</th></tr>';
    let sum = 0;
    for (let i = 0; i < order.length - 1; i++) {
        let orderObj = JSON.parse(order[i]);
        let str = '<tr><td>' + orderObj.quantity + ' ' + orderObj.name + '</td><td>' + orderObj.total + '$</td></tr > ';
        sum = +sum + +orderObj.total;
        orderStr += str;
    }
    let orderObj = JSON.parse(order[order.length - 1]);
    orderStr += '<tr><td>Name:' + orderObj.fullName + '</td></tr>';
    orderStr += '<tr><td>Address:' + orderObj.address + '</td></tr>';
    orderStr += '<tr><td>Notes:' + orderObj.notes + '</td></tr>';
    orderStr += '<tr><td>Total order price:     ' + sum + '$</td></tr>';
    if (orderElement == 'openOrdersTbl') {
        orderStr += '<input type="button" class="order-btn" value="Handle order" onclick="forward1('+i+')"></input>';
    }
    if (orderElement == 'processOrdersTbl') {
        orderStr += '<input type="button" class="order-btn" value="Handle order" onclick="forward2(' + i + ')"></input>';
    }
    if (orderElement == 'finishedOrdersTbl') {
        orderStr += '<input type="button" class="order-btn" value="Clear order" onclick="clearOrder(' + i + ')"></input>';
    }    document.getElementById(orderElement).innerHTML += orderStr;
}
//Activated to clear a finished order
function clearOrder(index) {
    let fOrders = JSON.parse(localStorage.getItem('finishedOrders'));
    let tmp = pull(fOrders);
    localStorage.setItem('finishedOrders', JSON.stringify(orders));
    updateOrderNum('finishedOrders', '-');
    updateOrders();
}

//Forward an order from open to in progress
function forward1(index) {
    let openOrders = JSON.parse(localStorage.getItem('openOrders'));
    let order=pull(openOrders,index - 1);
    if (localStorage.getItem('processOrders') != null) {
        orders = JSON.parse(localStorage.getItem('processOrders'));
        orders.push(order);
        localStorage.setItem('processOrders', JSON.stringify(orders));
    }
    else {
        let orderObj = createFirstOrder(order);
        localStorage.setItem('processOrders', JSON.stringify(orderObj));
    }
    localStorage.setItem('openOrders', JSON.stringify(openOrders));
    updateOrderNum('processOrders','+');
    updateOrderNum('openOrders', '-');
    updateOrders();
}

//Forward an order from in progress to finished
function forward2(index) {
    let openOrders = JSON.parse(localStorage.getItem('processOrders'));
    let order = pull(openOrders, index - 1);
    if (localStorage.getItem('finishedOrders') != null) {
        orders = JSON.parse(localStorage.getItem('finishedOrders'));
        orders.push(order);
        localStorage.setItem('finishedOrders', JSON.stringify(orders));
    }
    else {
        let orderObj = createFirstOrder(order);
        localStorage.setItem('finishedOrders', JSON.stringify(orderObj));
    }
    localStorage.setItem('processOrders', JSON.stringify(openOrders));
    updateOrderNum('finishedOrders', '+');
    updateOrderNum('processOrders', '-');
    updateOrders();
}

//Update the orders form
function updateOrders() {
    resetOrdersMenu();
    getOrders();
}

//Reset all order areas to null
function resetOrdersMenu() {
    document.getElementById('openOrders').innerHTML = '<table class="openOrdersTbl" id="openOrdersTbl"></table >';
    document.getElementById('processOrders').innerHTML = '<table class="processOrdersTbl" id="processOrdersTbl"></table >';
    document.getElementById('finishedOrders').innerHTML = '<table class="finishedOrdersTbl" id="finishedOrdersTbl"></table >';
}

//Assisting method to set the correct JSON format - an array
function createFirstOrder(order) {
    let str = '[' + JSON.stringify(order) + ']';
    return str;
}

//Assisting pull method
function pull(arr, index) {
    let pullObject;
    let j = 0;
    for (let i = 0; i < arr.length; i++) {
        if (i != index) {
            arr[j]=arr[i];
            j++;
        }
        else {
            pullObject = arr[i];
        }
    }
    arr.pop();
    return pullObject;
}

//Update the LS value of a give type order counter
function updateOrderNum(orderType, action){
    let ls = JSON.parse(localStorage.getItem(''+orderType + 'Counter'));
    if (action == '+') ls = ls + 1;
    else ls = ls - 1;
    localStorage.setItem('' + orderType + 'Counter', ls);
}

//Create a new course from the form input
function createCourse() {
    let f = document.getElementById('addCourseForm');
    let name = f.elements['name'].value;
    let description = f.elements['description'].value;
    let price = f.elements['price'].value;
    let mPrice = f.elements['mprice'].value;
    let img = 'null';
    let category = f.elements['category'].value;
    let stags = getTags();
    if (checkNewCourseValidity() == true) {
        createCourse2(name, description, price, mPrice, img, category, stags);
    }
}
function createCourse2(name, description, price, mPrice, img, category, stags) {
    var courses = JSON.parse(localStorage.getItem('courses'));
    let courseObj = new courseObj(name, description, price, mPrice, img, category, stags);
    courseObj = courseToJson(courseObj);
    courses.push(courseObj);
    updateCourses(courses);
    alert('Course added');
}
//A method that adds the correnct tags according to the form
function getTags() {
    let str = "";
    var checkboxes = document.getElementsByName('stag');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) str += checkboxes[i].value;
    }
    return str;
}
//Remove course methods
function setDelCourses() {
    setRemCourses();
}
function removeSelected() {
    var c = document.getElementById('courseNames');
    var name = c.options[c.selectedIndex].text;
    deleteCourse(name);
    setDelCourses();
    alert('Course removed');
}
//Logout method
function adminLogout() {
    localStorage.setItem("isAdmin", "false");
}
//Verify and return true if the new course form is correct
function checkNewCourseValidity() {
    var alertStr = '';
    let f = document.getElementById('addCourseForm');
    let name = f.elements['name'].value;
    let description = f.elements['description'].value;
    let price = f.elements['price'].value;
    let mPrice = f.elements['mprice'].value;
    if (name == "") {
        alertStr = 'Missing course name';
    }
    if (description == "") {
        alertStr = 'Missing course description';
    }
    if (price == 0) {
        alertStr = 'Price = 0';
    }
    if (mPrice == 0) {
        alertStr = 'Member price = 0';
    }
    if (alert == '') return true;
    else {
        alert(alertStr);
        return false;
    }
}