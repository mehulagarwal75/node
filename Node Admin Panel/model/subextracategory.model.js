const mongoose = require('mongoose');

const subExtraCategorySchema = mongoose.Schema({
    subExtraCategoryName: {
        type: String,
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subExtraCategoryDescription: String,
    subExtraCategoryImage: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SubExtraCategory', subExtraCategorySchema, 'SubExtraCategory');
