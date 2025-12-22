const express = require("express");

const PORT = 8000;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

/* 
    CRUD :
        C - Create / Insert / Add
        R - Read / Fetch
        U - Update 
        D - Delete
*/

let allUsers = [
    {
        id: 101,
        name: "Hello",
        email: "h@gmail.com",
        password: "H@1133",
        phone: 78451488858,
        address: "Surat",
    },
    {
        id: 102,
        name: "World",
        email: "w@gmail.com",
        password: "w@1133",
        phone: 78451588858,
        address: "Surat",
    }
];

let id = 103;

app.get("/", (req, res) => {
    return res.render('table', {
        name: "Jaynesh",
        allUsers
    });
});

app.get("/addUserPage", (req, res) => {
    return res.render('form');
});

app.post("/addUser", (req, res) => {
    const user = req.body;

    // user.id = Math.floor(Math.random() * 1000);
    user.id = id;
    id++;

    allUsers.push(user)

    return res.redirect('/');
});

app.get("/editPage", (req, res) => {
    console.log(req.query);

    const user = allUsers.find((user) => user.id == req.query.userId);

    if (!user) {
        return res.redirect('/not-found');
    }

    return res.render('edit', {
        user
    });
});

app.post("/updateUser", (req, res) => {
    console.log(req.body);

    allUsers = allUsers.map((user) => {
        if (user.id == req.body.id) {
            return req.body;
        } else {
            return user;
        }
    })

    return res.redirect('/');
});

app.get("/deleteUser", (req, res) => {
    console.log(req.query); //  Query String {id: 101, name: "Keval"}
    const userId = req.query.userId; // 103

    allUsers = allUsers.filter((user) => user.id != userId);// 103 != 102

    console.log(allUsers);

    return res.redirect('/')
});

app.get('/not-found', (req, res) => {
    return res.render('not_found');
})


// app.get("/about", (req, res) => {
//     res.render('about');
// });


app.listen(PORT, (err) => {
    if (err) {
        console.log("Server not started...", err);
        return false;
    }
    console.log("Server is started...");
});