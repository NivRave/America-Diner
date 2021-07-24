function restObj(courses, db) {
    this.categories = ['light','dirty','desert','drinks'];
    this.courses=new Map(); /*Map([])???*/
    //this.usersDB;
    this.menu=[];

    /*First, plain restaurant set-up as requested. 1 admin, 1 member, basic courses. more info on the documentation file*/
    this.firstSetUp = function (courses, db){
        this.setCourses(courses);
        //console.log(this.courses);
        this.createMenu();
        //this.setDb(db);
        //this.setMenu(this.courses);
        localStorage.setItem("isMember", "false");
        localStorage.setItem("isAdmin", "false");
    }

    //this.setMenu = function (courses) {
    //    console.log(courses.length)
    //    for (i = 0; i < courses.length; i++) {
    //        this.menu[i] = JSON.stringify(courses[i]);
    //    }
    //    console.log(this.menu)
    //}

    /* Course related methods*/
    this.setCourses = function (courses) {
        if (this.courses.length > 0) this.courses = new Map();
        for (i = 0; i<courses.length;i++) {
            this.addCourse(courses[i]);
        }
        updateCourses(courses);
    }

    this.addCourse = function (course){
        this.courses.set(course.name, course);
        this.addToMenu(course);
    }

    this.createMenu = function () {
        var menuObj = [];
        console.log(courses.length)
        for (i = 0; i < courses.length; i++) {
            let o = { "name": courses[i].name, "description": courses[i].description, "price": courses[i].price, "mprice": courses[i].mprice, "img": courses[i].img, "category": courses[i].category, "stags": courses[i].stags };
            menuObj.push(o);
        }
        this.menu = menuObj;
        saveCurrentMenu(this.menu);
    }

    this.addToMenu = function (course) {
        let str = '<div class="menu-item d-flex justify-content-between my-3 p-3">' +
            '<div class="menu-item-text" >' +
            '<h2 class="item-name">' + course.name +
            '</h2><h4 class="item-description" >' +
            course.description +
            '</h4><h6 class="item-tags" >' + course.tags +
            '</h6></div >' +
            '<div class="menu-item-price align-self-end">' +
            '<h1 class="item-price">' + course.price+'$' +
            '</h1></div ></div >';
        document.getElementById(course.category).innerHTML += str;
    }
}

function saveCurrentMenu(menuObj) {
    //localStorage.removeItem('menu');
    localStorage.setItem("menu", JSON.stringify(menuObj));
}

function saveCurrentCourses(coursesObj) {
    localStorage.setItem("courses", JSON.stringify(coursesObj));
}

function updateMenu() {
    var m = JSON.stringify(localStorage.getItem('courses'));
    localStorage.setItem('menu', m);
    repaintMenu();
}

function repaintMenu() {
    resetMenu();
    let m = JSON.parse(JSON.parse(localStorage.getItem('menu')));
    setMenu(m);
}

function resetMenu() {
    document.getElementById('light').innerHTML = '<div class="col"><h1 class="primary-color">Light stuff</h1></div>';
    document.getElementById('dirty').innerHTML = '<div class="col"><h1 class="primary-color">Dirty stuff</h1></div>';
    document.getElementById('desert').innerHTML = '<div class="col"><h1 class="primary-color">Sweets</h1></div>';
    document.getElementById('drinks').innerHTML = '<div class="col"><h1 class="primary-color">Drinks</h1></div>';
}

function setMenu(courses) {
    for (i = 0; i < courses.length; i++) {
        let course = courses[i];
        let str = '<div class="menu-item d-flex justify-content-between my-3 p-3">' +
            '<div class="menu-item-text" >' +
            '<h2 class="item-name">' + course.name +
            '</h2><h4 class="item-description" >' +
            course.description +
            '</h4><h6 class="item-tags" >' + course.tags +
            '</h6></div >' +
            '<div class="menu-item-price align-self-end">' +
            '<h1 class="item-price">' + course.price +'$'+
            '</h1></div ></div >';
        document.getElementById(course.category).innerHTML += str;
    } 
}