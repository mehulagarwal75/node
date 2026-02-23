const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    subExtraCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubExtraCategory',
        required: true
    },
    productDescription: String,
    productPrice: {
        type: Number,
        required: true
    },
    productImage: String,
    productStock: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema, 'Product');
