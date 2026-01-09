
const express = require('express');
const path = require('path');
const db = require('./config/adv.js'); 
const Advocate = require("./model/adv-model.js");

const PORT = 8080;
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', async (req, res) => {
    const advocates = await Advocate.find();
    return res.render('home', { advocates });
});

app.get('/addAdvocatePage', (req, res) => {
    return res.render('view');
});

app.post('/addAdvocate', async (req, res) => {
    await Advocate.create(req.body);
        console.log("Advocate Added Successfully");
        return res.redirect('/');
});

app.get('/editAdvocate/:id', async (req, res) => {
    const advocate = await Advocate.findById(req.params.id);
    if (advocate) {
        return res.render('edit', { advocate });
    }
    return res.redirect('/');
});

app.post('/updateAdvocate', async (req, res) => {
    const { id } = req.body;
    await Advocate.findByIdAndUpdate(id, req.body);
    console.log("Updated Successfully");
    return res.redirect('/');
});

app.get('/deleteAdvocate', async (req, res) => {
    await Advocate.findByIdAndDelete(req.query.id);
    console.log("Deleted Successfully");
    return res.redirect('/');
});

app.listen(PORT, (err) => {
    if (err) return console.log("Server Error", err);
    console.log(`Server running on port 🚀`);
});

