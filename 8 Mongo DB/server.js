const mongoose = require("./config/db_config")
const express = require('express')

const PORT = 8880;
const app = express();



app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    return res.render('form'  )
});



app.listen(PORT, (err) => {
    if (err) {
        console.log("Server not started...", err);
        return false;
    }
    console.log("It is listening on its configured port....");
});