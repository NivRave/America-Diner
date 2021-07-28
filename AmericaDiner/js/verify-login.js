/*User username/password verification scripts*/

//User username/password verification method
function verifyLogin() {
    let f = document.getElementById('loginForm');
    let name = f.elements['uname'].value;
    let password = f.elements['psw'].value;
    checkMemberDb(name, password);
}

//Search the DB for a given uname/pw pair. Alert if incorrect. Updates isMember LS value according to the search result.
function checkMemberDb(name, password) {
    let db = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < db.length; i++) {
        if (db[i].username == name) {
            if (db[i].password == password) {
                localStorage.setItem('isMember', 'true');
                alert('Welcome' + name);
                updateMenu();
                return;
            }
        }
    }
    alert('Wrong username/password, please try again');
}

//Registration verification method. If the username is valid registers a new user.
function checkSignup() {
    localStorage.setItem('isMember', 'false');
    let f = document.getElementById('signupForm');
    let name = f.elements['uname'].value;
    let password = f.elements['psw'].value;
    let db = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < db.length;i++) {
        if (db[i].username == name) {
            alert(''+ name+'is already registered as a username. Please try again');
        }
    }
    let newUser = {"username":name, "password":password, "admin": "0"};
    db.push(newUser);
    localStorage.setItem('users', JSON.stringify(db));
    alert('Welcome to our member club '+name+'! Go grab something to eat');
}
