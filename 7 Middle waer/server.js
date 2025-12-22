const express = require ("express");
const fs = require('fs');
const path = require ('path');



const PORT = 8790;
const app = express();



app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/PUBLIC"));

app.get('/404', (req, res) => {
    return res.render('404.ejs');
})


app.get('/', (req, res) => {
    return res.render('home');
});


app.listen(PORT, (err) => {
    if (err) {
        console.log("Server not started...", err);
        return false;
    }
    console.log("It is listening on its configured port....");
})
