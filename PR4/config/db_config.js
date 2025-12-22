const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/Advocate-Management";

mongoose.connect(URI).then(() => {
    console.log("Database is conncted...");
}).catch(err => {
    console.log("Database is not conncted...😥");
    console.log("Error : ", err);
}).finally(() => {
    console.log("Finally....");
});