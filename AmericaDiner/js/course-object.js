function courseObj (name, description, price, mprice, img, category, sTags) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.mprice = mprice
    this.img = img;
    this.category = category;
    this.sTags = sTags;
}

function courseToJson(course) {
    let c = { "name": course.name, "description": course.description, "price": course.price, "mprice": course.mprice, "img": course.img, "category": course.category, "stags": course.stags };
    return c;
}

createMenu = function (courses) {
    var menuObj = [];
    for (i = 0; i < this.courses.length; i++) {
        let o = { "name": courses[i].name, "description": courses[i].description, "price": courses[i].price, "mprice": courses[i].mprice, "img": courses[i].img, "category": courses[i].category, "stags": courses[i].stags };
        menuObj.push(o);
    }
    
    //saveCurrentMenu(this.menu);
}

function updateCourses(courses) {
    localStorage.setItem('courses', JSON.stringify(courses));
}