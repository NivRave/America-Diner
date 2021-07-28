/*Here a course object is implemented.*/
function courseObj(name, description, price, mprice, img, category, stags) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.mprice = mprice
    this.img = img;
    this.category = category;
    this.stags = stags;
}

//Converts a course to JSON format
function courseToJson(course) {
    let courseJSON = { "name": course.name, "description": course.description, "price": course.price, "mprice": course.mprice, "img": course.img, "category": course.category, "stags": course.stags };
    return courseJSON;
}

//Updates the LS with giver courses object
function updateCourses(courses) {
    localStorage.setItem('courses', JSON.stringify(courses));
}