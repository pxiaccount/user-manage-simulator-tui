"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var fs = require("fs");
var User = /** @class */ (function () {
    function User(username, favoriteNum, hobby) {
        this.username = username;
        this.favoriteNum = favoriteNum;
        this.hobby = hobby;
    }
    User.prototype.print = function () {
        console.log("Username: ".concat(this.username));
        console.log("Favorite Number: ".concat(this.favoriteNum));
        console.log("Hobby: ".concat(this.hobby));
    };
    return User;
}());
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var saveData = function (user) {
    var a = [];
    if (fs.existsSync('data.json')) {
        var olddata = fs.readFileSync('data.json', 'utf-8');
        a = JSON.parse(olddata);
    }
    a.push(user);
    fs.writeFileSync('data.json', JSON.stringify(a, null, 2));
};
var readData = function () {
    var data = [];
    if (fs.existsSync('data.json')) {
        var olddata = fs.readFileSync('data.json', 'utf-8');
        data = JSON.parse(olddata);
    }
    else {
        console.log("Please add users before list users");
    }
    console.log(data);
};
var del = function (usernameToDelete) {
    var jsonData = fs.readFileSync('data.json', 'utf-8');
    var users = JSON.parse(jsonData);
    var updateUsers = users.filter(function (user) { return user.username !== usernameToDelete; });
    fs.writeFileSync('data.json', JSON.stringify(updateUsers, null, 2));
    rl.close();
};
var add = function () {
    rl.question("Please insert username: ", function (username) {
        rl.question("Please insert your favorite number: ", function (favNum) {
            rl.question("Please insert your hobby:", function (hobby) {
                var favNumber = Number(favNum);
                var user = new User(username, favNumber, hobby);
                saveData(user);
                rl.close();
            });
        });
    });
};
console.log("Welcome! Choose an option to continue.");
rl.question("[1] Add user [2] List user [3] Delete user\n", function (option) {
    if (option == "1") {
        add();
    }
    else if (option == "2") {
        readData();
        rl.close();
    }
    else if (option == "3") {
        readData();
        rl.question("Which user would you like to delete? (Type username)\n", function (optionUsername) {
            del(optionUsername);
        });
    }
    else {
        rl.close();
    }
});
