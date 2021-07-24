function addCourse(courseObj) {//make sure that is gets a json-formatted object
    var m = localStorage.getItem(JSON.parse('courses'));
    m.push(courseObj);
    saveCurrentMenu(m);
}

function deleteCourse(name) {
    var m = JSON.parse(localStorage.getItem('menu'));
    var c = JSON.parse(localStorage.getItem('courses'));
    let i = searchCourse(name);//can't be -1
    m = remove(i, m);
    c = remove(i, c);
    saveCurrentMenu(m);
    saveCurrentCourses(c);
}

function remove(index, m) {
    var newM = [];
    for (i = 0; i < m.length; i++) {
        if (i == index) continue;
        else {
            newM.push(m[i]);
        }
    }
    return newM;
}

function updateMenu(menuObj) {
    for (c in this.categories) {
        document.getElementById(c).innerHTML = '';
    }
}

function setRemCourses() {
    var str = '';
    let c = JSON.parse(localStorage.getItem('courses'));
    console.log(c);
    for (i = 0; i < c.length; i++) {
        //let course = c[i];
        str += '<option value="' + c[i].name + '">' + c[i].name + '</option>';
    }
    document.getElementById('courseNames').innerHTML = str;
}

function searchCourse(name) {
    var m = JSON.parse(localStorage.getItem('menu'));
    for (i = 0; i < m.length; i++) {
        if (m[i].name == name) {
            return i;
        }
    }
    return -1;
}