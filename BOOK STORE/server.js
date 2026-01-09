const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/db.config'); // Import your DB connection

const app = express();
const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Important for serving images

// Use Routes
app.use('/', require('./routes/index'));

app.listen(PORT, (err) => {
    if (err) return console.log("Server Error", err);
    console.log(`Server running on port 🚀`);
});