function verifyManager(username, password) {
    let list = JSON.parse(localStorage.getItem('users'));
    console.log(list);
    if (searchAdmin(list, username, password) == true) return true;
    else return false;
}

function searchAdmin(list, username, password) {
    for (i = 0; i < list.length; i++) {
        if (list[i].username == username && list[i].password == password && list[i].admin == "1") return true;
    }
    return false;
}