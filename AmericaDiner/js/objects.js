/*This page sets/resets the basic restaurant settings0
 * I used an object for convenience.
 */

//Restaurant object
function restObj(courses, db) {
    this.categories = ['light','dirty','desert','drinks'];
    this.courses=new Map();
    this.menu=[];

    //First, plain restaurant set-up as requested. 1 admin, 1 member, basic courses. more info on the documentation file
    this.firstSetUp = function (courses, db) {
        this.setDefaultLocalStorageVlaues();
        this.setCourses(courses);
        this.createMenu();
    }

    //Clear and set/reset LS key/value pairs
    this.setDefaultLocalStorageVlaues = function () {
        localStorage.clear();
        noMember();
        noAdmin();
        initOrders();
        /*Basic username and admin credentials for testing*/
        localStorage.setItem("users", '[{ "username": "admin", "password": "admin", "admin": "1" }, { "username": "user", "password": "user", "admin": "0" }]');
    }

    //Clear and set/reset orders LS key/value pairs
    function initOrders() {
        localStorage.setItem('openOrdersCounter', '0');
        localStorage.setItem('processOrdersCounter', '0');
        localStorage.setItem('finishedOrdersCounter', '0');
        localStorage.setItem('openOrders', '[]');
        localStorage.setItem('processOrders', '[]');
        localStorage.setItem('finishedOrders', '[]');
    }

        /* Course related methods*/
    //Set courses from give course object
    this.setCourses = function (courses) {
        if (this.courses.length > 0) this.courses = new Map();
        for (let i = 0; i<courses.length;i++) {
            this.addCourse(courses[i]);
        }
        updateCourses(courses);
    }
    //Add a single course
    this.addCourse = function (course){
        this.courses.set(course.name, course);
        this.addToMenu(course);
    }
    //Create a menu object
    this.createMenu = function () {
        var menuObj = [];
        for (let i = 0; i < courses.length; i++) {
            let courseObject = { "name": courses[i].name, "description": courses[i].description, "price": courses[i].price, "mprice": courses[i].mprice, "img": courses[i].img, "category": courses[i].category, "stags": courses[i].stags };
            menuObj.push(courseObject);
        }
        this.menu = menuObj;
        saveCurrentMenu(this.menu);
    }
    //Add a course to menu section html
    this.addToMenu = function (course) {
        let str = '<div class="menu-item d-flex justify-content-between my-3 p-3">' +
            '<div class="menu-item-text" >' +
            '<h2 class="item-name">' + course.name +
            '</h2><h4 class="item-description" >' +
            course.description +
            '</h4><h6 class="item-tags" >' + course.stags +
            '</h6></div >' +
            '<div class="menu-item-price align-self-end">' +
            '<h1 class="item-price">' + course.price+'$' +
            '</h1></div ></div >';
        document.getElementById(course.category).innerHTML += str;
    }
}

//Update menu LS value
function saveCurrentMenu(menuObj) {
    localStorage.setItem("menu", JSON.stringify(menuObj));
}
//Update courses LS value
function saveCurrentCourses(coursesObj) {
    localStorage.setItem("courses", JSON.stringify(coursesObj));
}
//Update active menu
function updateMenu() {
    //noMember();
    noAdmin();
    if (localStorage.getItem('courses') != null) {
        var menu = JSON.stringify(localStorage.getItem('courses'));
        localStorage.setItem('menu', menu);
        repaintMenu();
    }
    else {
        alert('Click the ' + "'Restart restaurant' button below to initiate");
    }
}
//Repaint method for the menu - used to update
function repaintMenu() {
    resetMenu();
    let menu = JSON.parse(localStorage.getItem('courses'));
    let isMember = JSON.parse(localStorage.getItem('isMember'));
    if (isMember==false) {
        setMenu(menu);
    }
    else {
        setMemberMenu(menu);
    }
}
//Reset 4 menu categories
function resetMenu() {
    document.getElementById('light').innerHTML = '<div class="col"><h1 class="primary-color">Light stuff</h1></div>';
    document.getElementById('dirty').innerHTML = '<div class="col"><h1 class="primary-color">Dirty stuff</h1></div>';
    document.getElementById('desert').innerHTML = '<div class="col"><h1 class="primary-color">Sweets</h1></div>';
    document.getElementById('drinks').innerHTML = '<div class="col"><h1 class="primary-color">Drinks</h1></div>';
}
//Set the menu for a guest
function setMenu(courses) {
    for (let i = 0; i < courses.length; i++) {
        let course = courses[i];
        let str = '<div class="menu-item d-flex justify-content-between my-3 p-3">' +
            '<div class="menu-item-text" >' +
            '<h2 class="item-name">' + course.name +
            '</h2><h4 class="item-description" >' +
            course.description +
            '</h4><h6 class="item-tags" >' + course.stags +
            '</h6></div >' +
            '<div class="menu-item-price align-self-end">' +
            '<h1 class="item-price">' + course.price +'$'+
            '</h1></div ></div >';
        document.getElementById(course.category).innerHTML += str;
    } 
}

//Set the menu for a member
function setMemberMenu(courses) {
    for (let i = 0; i < courses.length; i++) {
        let course = courses[i];
        let str = '<div class="menu-item d-flex justify-content-between my-3 p-3">' +
            '<div class="menu-item-text" >' +
            '<h2 class="item-name">' + course.name +
            '</h2><h4 class="item-description" >' +
            course.description +
            '</h4><h6 class="item-tags" >' + course.stags +
            '</h6></div >' +
            '<div class="menu-item-price align-self-end">' +
            '<h1 class="item-price">' + course.mprice + '$' +
            '</h1></div ></div >';
        document.getElementById(course.category).innerHTML += str;
    }
}

//Update photo gallery - only if a course has an image
function updateGallery() {
    let menu = JSON.parse(localStorage.getItem('courses'));
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].img != 'null')
            document.getElementById('gallery').innerHTML += '<div class="col-10 mx-auto col-sm-6 col-lg-4 my-3"><div class="item-container"><img src="img/Dishes/' + menu[i].img + '" class="img-fluid img-thumbnail item-img" alt="Menu item" /><a href="img/Dishes/' + menu[i].img + '"><h1 class="text-center text-outline item-link px-3">' + menu[i].name + '</h1></a></div></div>';
    }
}

//Reset member state
function noMember() {
    localStorage.setItem("isMember", "false");
}

//Reset admin state
function noAdmin() {
    localStorage.setItem("isAdmin", "false");
}