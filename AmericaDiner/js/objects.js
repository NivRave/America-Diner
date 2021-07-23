function restObj(courses, db) {
    this.categories = ['light','dirty','desert','drinks'];
    this.courses=new Map(); /*Map([])???*/
    this.usersDB;
    this.menu;

    /*First, plain restaurant set-up as requested. 1 admin, 1 member, basic courses. more info on the documentation file*/
    this.firstSetUp = function (courses, db){
        this.setCourses(courses);
        this.setDb(db);
        this.setMenu();
    }

    /* Course related methods*/
    this.setCourses = function (courses){
        for (c in courses) {
            addCourse(c);
        }
    }

    this.addCourse = function (course){
        this.courses.set(course.name, course);
        this.addToMenu(course);
    }

    this.addToMenu = function (course) {
        let str = '<div class="menu-item d-flex justify-content-between my-3 p-3">' +
            '< div class="menu-item-text" >' +
            '<h2 class="item-name">' + course.name +
            '</h2>< h4 class="item-description" >' +
            course.description +
            '</h4>< h6 class="item-tags" >' + course.tags +
            '</h6></div >' +
            '<div class="menu-item-price align-self-end">' +
            '<h1 class="item-price">' + course.price +
            '</h1></div ></div >';
        let cat = '#'+course.category;
        document.getElementById(cat).innerHTML += str;
    }
}