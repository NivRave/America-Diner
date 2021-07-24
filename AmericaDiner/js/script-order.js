$(document).ready(function () {
    //on-load method to get data from localhost and keep the menu up-to-date
    $("#orderMenu").on("load", updateOrderMenu())

    $("#orderForm").on("load", crateOrderForm());


});


function clearForm() {

}

function submitOrder() {
    let m = JSON.parse(JSON.parse(localStorage.getItem('menu')));
    var billStr = [];
    var sum = 0;
    for (i = 0; i < m.length; i++) {
        let qStr = document.getElementById('orderQuantity' + i);
        if (qStr.value > 0) {
            let o = '{"name":"' + m[i].name + '","quantity":"' + qStr.value + '","total":"' + m[i].price * qStr.value + '"}';
            sum += m[i].price * qStr.value;
            billStr.push(o);
        }
    }
    billStr.push('"sum":"'+sum+'"');
    addNewOrder(billStr);
}

function addNewOrder(order) {
    let orders = '';
    if (localStorage.getItem('activeOrders') != null) {
        orders = JSON.parse(JSON.parse(localStorage.getItem('activeOrders')));
        orders.push(order);
    }
    else {
        orders = createFirstOrder(order);
    }
    console.log(orders);
    localStorage.setItem('activeOrders', JSON.stringify(orders));
}

function createFirstOrder(order) {
    let str = '[' + JSON.stringify(order) + ']';
    return str;
}
function saveOrder() {

}

function crateOrderForm() {
    let m = JSON.parse(JSON.parse(localStorage.getItem('menu')));
    for (i = 0; i < m.length; i++) {
        let course = m[i];
        let str1 = '<div class="order-item-name">' + course.name + '</div>';
        let str2 = '<div class="order-item-description">' + course.description + '</div>';
        document.getElementById('courseNames').innerHTML += str1;
        document.getElementById('courseDescription').innerHTML += str2;
        document.getElementById('courseAmount').innerHTML += '<input type="number" class="order-item-quantity" value="0" min="0" id="orderQuantity' + i + '">';
    }
}

function updateOrderMenu() {
    resetMenu();
    let m = JSON.parse(JSON.parse(localStorage.getItem('menu')));
    setOrderMenu(m);
}

function setOrderMenu(courses) {
    for (i = 0; i < courses.length; i++) {
        let course = courses[i];
        let str = '<div class="menu-item d-flex justify-content-between my-3 p-3">' +
            '<div class="menu-item-text" >' +
            '<h3 class="item-name">' + course.name +
            '</h3><h5 class="item-description" >' +
            course.description +
            '</h5><h6 class="item-tags" >' + course.tags +
            '</h6></div >' +
            '<div class="menu-item-price align-self-end">' +
            '<h2 class="item-price">' + course.price + '$' +
            '</h2></div ></div >';
        document.getElementById(course.category).innerHTML += str;
    }
}