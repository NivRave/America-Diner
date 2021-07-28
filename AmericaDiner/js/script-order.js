/*Custom scripts for the order area*/

$(document).ready(function () {
    //on-load method to get data from localhost and keep the menu up-to-date
    $("#orderMenu").on("load", updateOrderMenu())
    $("#orderForm").on("load", crateOrderForm())

    $(window).scroll(function () {
        let position = $(this).scrollTop();
        if (position >= 200) {
            $('.navbar').addClass('navbar-background');
            $('.navbar').addClass('fixed-top');
        }
        else {
            $('.navbar').removeClass('navbar-background');
            $('.navbar').removeClass('fixed-top');
        }
    });
});

//Clear order form
function clearForm() {
    let menu = JSON.parse(localStorage.getItem('courses'));
    let str = '';
    for (let i = 0; i < menu.length; i++) {
        str = 'orderQuantity' + i;
        document.getElementById(str).value = 0;
    }
}

//Submit order after checking input correctness/validity
function submitOrder() {
    if (checkRequired() == true) {
        let isMember = JSON.parse(localStorage.getItem('isMember'));
        if (isMember == false) {
            submitGuestOrder();
        }
        else {
            submitMemberOrder();
        }
        clearForm();
        updateOrderNum('openOrders', '+');
    }
}

/*Submit a guest/member order*/
function submitGuestOrder() {
    let menu = JSON.parse(localStorage.getItem('courses'));
    var billStr = [];
    var sum = 0;
    for (let i = 0; i < menu.length; i++) {
        let qStr = document.getElementById('orderQuantity' + i);
        if (qStr.value > 0) {
            let orderObj = '{"name":"' + menu[i].name + '","quantity":"' + qStr.value + '","total":"' + menu[i].price * qStr.value + '"}';
            sum += menu[i].price * qStr.value;
            billStr.push(orderObj);
        }
    }
    let f = document.getElementById('shipmentInfoForm');
    let fullName = f.elements['fullName'].value;
    let address = f.elements['address'].value;
    let notes = f.elements['notes'].value;
    let str = '{"fullName":"' + fullName + '","address":"' + address + '","notes":"' + notes + '"}';
    billStr.push(str);
    addNewOrder(billStr);
    alertOrder();
}
function submitMemberOrder() {
    let menu = JSON.parse(localStorage.getItem('courses'));
    var billStr = [];
    var sum = 0;
    for (let i = 0; i < menu.length; i++) {
        let qStr = document.getElementById('orderQuantity' + i);
        if (qStr.value > 0) {
            let orderObj = '{"name":"' + menu[i].name + '","quantity":"' + qStr.value + '","total":"' + menu[i].mprice * qStr.value + '"}';
            sum += menu[i].price * qStr.value;
            billStr.push(orderObj);
        }
    }
    let f = document.getElementById('shipmentInfoForm');
    let fullName = f.elements['fullName'].value;
    let address = f.elements['address'].value;
    let notes = f.elements['notes'].value;
    let str = '{"fullName":"' + fullName + '","address":"' + address + '","notes":"' + notes + '"}';
    billStr.push(str);
    addNewOrder(billStr);
    alertOrder();
}

//Alert the user if his order has been recieved
function alertOrder() {
    alert('Order registered, will be at your place within 30 minutes! Enjoy');
}

//Send the new order to the LS
function addNewOrder(order) {
    let orders = '';
    let num = localStorage.getItem('openOrdersCounter');
    if (localStorage.getItem('openOrders') != null) {
        orders = JSON.parse(localStorage.getItem('openOrders'));
        orders.push(order);
    }
    else {
        orders = createFirstOrder(order);
    }
    localStorage.setItem('openOrders', JSON.stringify(orders));
}

//Assisting method to set the correct JSON format - an array
function createFirstOrder(order) {
    let str = '[' + JSON.stringify(order) + ']';
    return str;
}

//Save current order state
function saveOrder() {
    let menu = JSON.parse(localStorage.getItem('courses'));
    let orderStr = '[{';
    for (let i = 0; i < menu.length; i++) {
        let amount = document.getElementById('orderQuantity' + i).value;
        orderStr += '"' + i + '":"' + amount + '"';
        if (i + 1 < menu.length) orderStr += ',';
    }
    orderStr += '}]';
    localStorage.setItem('savedOrder', orderStr);
}

//Checks if all required fields a filled in the order form before submittion. Alerts and does not forward the order if not
function checkRequired() {
    var alertStatus='false';
    let alertStr = 'Missing order details! please check';
    let credit = document.getElementById("creditCard");
    let crypto = document.getElementById("crypto");
    let f1 = document.getElementById('shipmentInfoForm');
    let fullName = f1.elements['fullName'].value;
    let address = f1.elements['address'].value;
    let f2 = document.getElementById('creditForm');
    let f3 = document.getElementById('cryptoForm');
    if (credit.checked) {
        if (f2.elements['creditNum'].value == "0" || f2.elements['creditNum'].value == "") {
            alertStatus = 'true';
            alertStr = 'Check payment method!';
        }
    }
    if (crypto.checked) {
        if (f3.elements['cryptoApprovalNum'].value == "0" || f3.elements['cryptoApprovalNum'].value == "")
            alertStatus = 'true';
            alertStr = 'Check payment method!';
    }
    if (checkEmptyMenu() == true) {
        alertStatus = 'true';
        alertStr = ('No items selected, the order is empty!');
    } 
    if (fullName == "" || address == "") {
        alertStr = 'Shipping data missing!';
        alertStatus = 'true';
    }
    if (alertStatus == 'true') {
        alert(alertStr);
        return false;
    }
    else return true;
}

//Checks that an order has at least 1 course in it
function checkEmptyMenu() {
    let menu = JSON.parse(localStorage.getItem('courses'));
    for (let i = 0; i < menu.length; i++) {
        let qStr = document.getElementById('orderQuantity' + i);
        if (qStr.value > 0) return false;
    }
    return true;
}

//Creates the order form from the courses in the LS
function crateOrderForm() {
    let menu = JSON.parse(localStorage.getItem('courses'));
    let str;
    //Set 'light'
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].category == 'light') {
            str = '<div class="row">';
            let course = menu[i];
            str += '<div class="col orderItem"' + i + '><span class="order-item-name">' + course.name + '-</span><span class="orderDescription">' + course.description + '</span></div>';
            if (localStorage.getItem('savedOrder') != null) {
                let orderObj = JSON.parse(localStorage.getItem('savedOrder'));
                str += '<div class="col-1 order-item-description">  <input type = "number" class="order-item-quantity" value = "' + orderObj[0][i] + '"min = "0" id = "orderQuantity' + i + '" > </div>';
            }
            else {
                str += '<div class="col-1 order-item-description">  <input type="number" class="order-item-quantity" value="0" min="0" id="orderQuantity' + i + '"> </div>';
            }
            str += '</div>';
            document.getElementById('orderContainer').innerHTML += str;
        }
    }
    //Set 'dirty'
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].category == 'dirty') {
            str = '<div class="row">';
            let course = menu[i];
            str += '<div class="col orderItem"' + i + '><span class="order-item-name">' + course.name + '-</span><span class="orderDescription">' + course.description + '</span></div>';
            if (localStorage.getItem('savedOrder') != null) {
                let orderObj = JSON.parse(localStorage.getItem('savedOrder'));
                str += '<div class="col-1 order-item-description">  <input type = "number" class="order-item-quantity" value = "' + orderObj[0][i] + '"min = "0" id = "orderQuantity' + i + '" > </div>';
            }
            else {
                str += '<div class="col-1 order-item-description">  <input type="number" class="order-item-quantity" value="0" min="0" id="orderQuantity' + i + '"> </div>';
            }
            str += '</div>';
            document.getElementById('orderContainer').innerHTML += str;
        }
    }
    //Set 'sweet'
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].category == 'sweet') {
            str = '<div class="row">';
            let course = menu[i];
            str += '<div class="col orderItem"' + i + '><span class="order-item-name">' + course.name + '-</span><span class="orderDescription">' + course.description + '</span></div>';
            if (localStorage.getItem('savedOrder') != null) {
                let orderObj = JSON.parse(localStorage.getItem('savedOrder'));
                str += '<div class="col-1 order-item-description">  <input type = "number" class="order-item-quantity" value = "' + orderObj[0][i] + '"min = "0" id = "orderQuantity' + i + '" > </div>';
            }
            else {
                str += '<div class="col-1 order-item-description">  <input type="number" class="order-item-quantity" value="0" min="0" id="orderQuantity' + i + '"> </div>';
            }
            str += '</div>';
            document.getElementById('orderContainer').innerHTML += str;
        }
    }
    //Set 'drinks'
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].category == 'drinks'){
            str = '<div class="row">';
            let course = menu[i];
            str += '<div class="col orderItem"' + i + '><span class="order-item-name">' + course.name + '-</span><span class="orderDescription">' + course.description + '</span></div>';
            if (localStorage.getItem('savedOrder') != null) {
                let orderObj = JSON.parse(localStorage.getItem('savedOrder'));
                str += '<div class="col-1 order-item-description">  <input type = "number" class="order-item-quantity" value = "' + orderObj[0][i] + '"min = "0" id = "orderQuantity' + i + '" > </div>';
            }
            else {
                str += '<div class="col-1 order-item-description">  <input type="number" class="order-item-quantity" value="0" min="0" id="orderQuantity' + i + '"> </div>';
            }
            str += '</div>';
            document.getElementById('orderContainer').innerHTML += str;
        }
    }
    addBottomFormSection();
}

//Adds the bottom section (after the courses) to the order-form
function addBottomFormSection() {
    addShipmentInfo();
    addInfoButton();
    addPaymentInfo();
    addFormButtons();
}

//Adds a button to show current order details
function addInfoButton() {
    document.getElementById('orderContainer').innerHTML += '<input type="button" value="Your order info" id="orderInfo" onclick="addOrderInfo()" />';
    document.getElementById('orderContainer').innerHTML += '<div class="row"><div class="col" id="orderInfoArea">';
    document.getElementById('orderContainer').innerHTML += '</div></div>';
}

//Shows current order info when orderInfo button is clicked
function addOrderInfo() {
    let menu = JSON.parse(localStorage.getItem('courses'));
    document.getElementById('orderInfoArea').innerHTML = '';
    let str = 'null';
    var sum = 0;
    for (let i = 0; i < menu.length; i++) {
        let qStr = document.getElementById('orderQuantity' + i);
        if (qStr.value > 0) {
            if (str == 'null') str = '';
            str += 'Course: ' + menu[i].name + ' Quantity: ' + qStr.value + ' Total: ' + menu[i].price * qStr.value + '</br>';
            sum += menu[i].price * qStr.value;
        }
    }
    if (str != 'null') {
        str += 'Order sum: ' + sum + '$</br>';
        document.getElementById('orderInfoArea').innerHTML += str;
    }
}

//Add payment info section to the order form
function addPaymentInfo() {
    document.getElementById('orderContainer').innerHTML += '<h2>Payment method:</h2>';
    document.getElementById('orderContainer').innerHTML += '<div class="row"><div class="col"><form id="paymentForm"><div class="form-group"><input type="radio" name="payment" value="credit" id="creditCard" onclick="setPaymentMethod()" checked><label for="creditCard" >Credit card</label></br><input type="radio" name="payment" value="cash" id="cash" onclick="setPaymentMethod()"><label for="cash" >Cash</label></br><input type="radio" name="payment" value="crypto" id="crypto" onclick="setPaymentMethod()"><label for="crypto" >Crypto</label></div></form></div></div>';
    document.getElementById('orderContainer').innerHTML += '<div class="row" id="creditData"><div class="col"><form id="creditForm"><div class="form-group"><label for="creditCardNum" >Credit card number</label><input type="text" name="creditNum" placeholder="Credit card number" id="creditCardNum" value="0"></div></form></div></div>';
    document.getElementById('orderContainer').innerHTML += '<div class="row" id="cryptoData"><div class="col"><form id="cryptoForm"><div class="form-group"><label for="cryptoApprovalNum" >Transfer the sum to wallet #wallet-number</label><input type="text" name="cryptoApprovalNum" placeholder="Approval number" id="cryptoApprovalNum"></div></form></div></div>';
}

//Add shipment info to the order form
function addShipmentInfo() {
    document.getElementById('orderContainer').innerHTML += '<div class="row"><div class="col"><form id = "shipmentInfoForm"><div class="form-group"><input type="text" class="form-control input-lg" name="fullName" id="fullName" placeholder="Full name" required/></div><div class="form-group"><input type="text" class="form-control input-lg" name="address" id="address" placeholder="Shipment Address" required/></div><div class="form-group"><input type="text" class="form-control input-lg" name="notes" id="notes" placeholder="Enter special notes for the order"></div></div></div>';
}

//Add the clear/submit/save buttons to the order form
function addFormButtons() {
    document.getElementById('orderContainer').innerHTML += '<div class="row"><div class="col"><input type="button" value="Clear order" id="clearOrder" onclick="clearForm()" /></div><div class="col"><input type="button" value="Submit order" id="submitOrder" onclick="submitOrder()" /></div><div class="col"><input type="button" value="Save order" id="saveOrder" onclick="saveOrder()" /></div></div></div></section>';
}

//Update the correct orderMenu (guest/member)
function updateOrderMenu() {
    resetMenu();
    let isMember = JSON.parse(localStorage.getItem('isMember'));
    let menu = JSON.parse(localStorage.getItem('courses'));
    if (isMember == false) {
        setOrderMenu(menu);
    }
    else {
        setMemberOrderMenu(menu);
    }
}

//Set the order menu guest/member
function setOrderMenu(courses) {
    for (let i = 0; i < courses.length; i++) {
        let course = courses[i];
        let str = '<div class="menu-item d-flex justify-content-between my-3 p-3">' +
            '<div class="menu-item-text" >' +
            '<h3 class="item-name">' + course.name +
            '</h3><h5 class="item-description" >' +
            course.description +
            '</h5><h6 class="item-tags" >' + course.stags +
            '</h6></div >' +
            '<div class="menu-item-price align-self-end">' +
            '<h2 class="item-price">' + course.price + '$' +
            '</h2></div ></div >';
        document.getElementById(course.category).innerHTML += str;
    }
}
function setMemberOrderMenu(courses) {
    for (let i = 0; i < courses.length; i++) {
        let course = courses[i];
        let str = '<div class="menu-item d-flex justify-content-between my-3 p-3">' +
            '<div class="menu-item-text" >' +
            '<h3 class="item-name">' + course.name +
            '</h3><h5 class="item-description" >' +
            course.description +
            '</h5><h6 class="item-tags" >' + course.stags +
            '</h6></div >' +
            '<div class="menu-item-price align-self-end">' +
            '<h2 class="item-price">' + course.mprice + '$' +
            '</h2></div ></div >';
        document.getElementById(course.category).innerHTML += str;
    }
}

//Update the LS value of a give type order counter
function updateOrderNum(orderType, action){
    let ls = JSON.parse(localStorage.getItem('' + orderType + 'Counter'));
    if (action == '+') ls = ls + 1;
    else ls = ls - 1;
    localStorage.setItem('' + orderType + 'Counter', ls);
}