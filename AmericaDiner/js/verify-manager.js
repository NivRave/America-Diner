/*Manager username/password verification scripts*/

//Manager username/password verification method
function verifyManager(username, password) {
    let list = JSON.parse(localStorage.getItem('users'));
    if (searchAdmin(list, username, password) == true) return true;
    else return false;
}

//Verify that a registered user is an admin
function searchAdmin(list, username, password) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].username == username && list[i].password == password && list[i].admin == "1") return true;
    }
    return false;
}