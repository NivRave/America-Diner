/*Contains the management-related JS methods*/

//Add course method
function addCourse(courseObj) {
    var menu = localStorage.getItem(JSON.parse('courses'));
    menu.push(courseObj);
    saveCurrentMenu(menu);
}

//Delete course method
function deleteCourse(name) {
    var menu = JSON.parse(localStorage.getItem('menu'));
    var courses = JSON.parse(localStorage.getItem('courses'));
    let index = searchCourse(name);
    menu = remove(index, menu);
    courses = remove(index, courses);
    saveCurrentMenu(menu);
    saveCurrentCourses(courses);
}

//Remove a certain index obj from course array
function remove(index, menu) {
    var newMenu = [];
    for (let i = 0; i < menu.length; i++) {
        if (i == index) continue;
        else {
            newMenu.push(menu[i]);
        }
    }
    return newMenu;
}

//Reset categories HTML content
function updateMenu(menuObj) {
    for (c in this.categories) {
        document.getElementById(c).innerHTML = '';
    }
}

//Update the course options for the remove course select item
function setRemCourses() {
    var str = '';
    let courses = JSON.parse(localStorage.getItem('courses'));
    for (let i = 0; i < courses.length; i++) {
        str += '<option value="' + courses[i]['name'] + '">' + courses[i]['name'] + '</option>';
    }
    document.getElementById('courseNames').innerHTML = str;
}

//Returns the index of a given course. Used with select that only contains valid names so -1 will never be returned.
function searchCourse(name) {
    var menu = JSON.parse(localStorage.getItem('menu'));
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].name == name) {
            return i;
        }
    }
    return -1;
}