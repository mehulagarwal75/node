const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    subCategoryName: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategoryDescription: String,
    subCategoryImage: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SubCategory', subCategorySchema, 'SubCategory');
