const mongoose = require('mongoose');

const advocateSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true
         },
         
    role: { 
        type: String, 
        required: true 
         },
    phone: { 
        type: String, 
        required: true 
         },
    address: { 
        type: String, 
        required: true 
         },
    img: {
         type: String,
         required: true
         }
});

const Advocate = mongoose.model('Advocate', advocateSchema);

module.exports = Advocate;