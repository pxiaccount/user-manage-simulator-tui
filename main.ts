import * as readline from 'readline'
import * as fs from 'fs'

class User {
    username: string;
    favoriteNum: number;
    hobby: string;

    constructor(username: string, favoriteNum: number, hobby: string) {
        this.username = username;
        this.favoriteNum = favoriteNum;
        this.hobby = hobby;
    }

    print() {
        console.log(`Username: ${this.username}`);
        console.log(`Favorite Number: ${this.favoriteNum}`);
        console.log(`Hobby: ${this.hobby}`);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const saveData = (user: User) => {
    let a: User[] = [];

    if (fs.existsSync('data.json')) {
        const olddata = fs.readFileSync('data.json', 'utf-8');
        a = JSON.parse(olddata);
    }

    a.push(user);

    fs.writeFileSync('data.json', JSON.stringify(a, null, 2))
}

const readData = () => {
    let data: any[] = [];

    if (fs.existsSync('data.json')) { 
        const olddata = fs.readFileSync('data.json', 'utf-8');
        data = JSON.parse(olddata);
    }  else {
        console.log("Please add users before list users");
    }

    console.log(data);
}

const del = (usernameToDelete) => {
    const jsonData = fs.readFileSync('data.json', 'utf-8');
    let users: any[] = JSON.parse(jsonData);

    const updateUsers = users.filter(user => user.username !== usernameToDelete);

    fs.writeFileSync('data.json', JSON.stringify(updateUsers, null, 2));
    rl.close();
}

const add = () => {
    rl.question("Please insert username: ", (username) => {
        rl.question("Please insert your favorite number: ", (favNum) => {
            rl.question("Please insert your hobby:", (hobby) => {
                const favNumber = Number(favNum);
                const user = new User(username, favNumber, hobby)

                saveData(user);

                rl.close();
            })
        })
    })
}

console.log("Welcome! Choose an option to continue.");
rl.question("[1] Add user [2] List user [3] Delete user\n", (option) => {
    if (option == "1") {
        add()
    } else if (option == "2") {
        readData()
        rl.close();
    } else if (option == "3") {
        readData();
        rl.question("Which user would you like to delete? (Type username)\n", (optionUsername) => {
            del(optionUsername)
        })
    } else {
        rl.close()
    }
})

