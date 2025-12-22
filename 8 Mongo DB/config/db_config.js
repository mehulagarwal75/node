const mongoose = require('mongoose')



// Connect to the local MongoDB database named 'book management'
mongoose.connect('mongodb://localhost:27017/book management').then(()=>{
    console.log("Connected to MongoDB");
}).catch(err => {
    console.log('Connection error:', err)
});