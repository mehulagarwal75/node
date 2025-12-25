const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/BharatLawDirectory')
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log("Database Connection Error:", err));