const Category = require('../model/category.model');
const SubCategory = require('../model/subcategory.model');
const SubExtraCategory = require('../model/subextracategory.model');
const Product = require('../model/product.model');
const fs = require('fs');
const path = require('path');

// ============= CATEGORY FUNCTIONS =============

const viewCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.render('category/viewscategorypage', { categories });
    } catch (err) {
        console.log("Error fetching categories", err);
        req.flash('error', 'Error Fetching Categories');
        return res.redirect('/dashboard');
    }
}

const addCategoryPage = (req, res) => {
    return res.render('category/addcategorypage');
}

const insertCategory = async (req, res) => {
    try {
        const { categoryName, categoryDescription } = req.body;
        console.log("Insert Category", req.body);

        let categoryImage = "";
        if (req.file) {
            categoryImage = req.file.filename;
        }

        const category = await Category.create({
            categoryName,
            categoryDescription,
            categoryImage
        });

        req.flash('success', 'Category Added Successfully');
        return res.redirect('/viewCategoryPage');
    } catch (err) {
        console.log("Error inserting category", err);
        req.flash('error', 'Error Adding Category');
        return res.redirect('/addCategoryPage');
    }
}

const editCategoryPage = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            req.flash('error', 'Category not found');
            return res.redirect('/viewCategoryPage');
        }
        return res.render('category/editcategorypage', { category });
    } catch (err) {
        console.log("Error fetching category", err);
        req.flash('error', 'Error Fetching Category');
        return res.redirect('/viewCategoryPage');
    }
}

const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { categoryName, categoryDescription } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            req.flash('error', 'Category not found');
            return res.redirect('/viewCategoryPage');
        }

        let categoryImage = category.categoryImage;
        if (req.file) {
            if (category.categoryImage) {
                const imagePath = path.join(__dirname, '../uploads/admin', category.categoryImage);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            categoryImage = req.file.filename;
        }

        await Category.findByIdAndUpdate(categoryId, {
            categoryName,
            categoryDescription,
            categoryImage
        });

        req.flash('success', 'Category Updated Successfully');
        return res.redirect('/viewCategoryPage');
    } catch (err) {
        console.log("Error updating category", err);
        req.flash('error', 'Error Updating Category');
        return res.redirect('/viewCategoryPage');
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.query;
        const category = await Category.findById(categoryId);
        if (!category) {
            req.flash('error', 'Category not found');
            return res.redirect('/viewCategoryPage');
        }

        if (category.categoryImage) {
            const imagePath = path.join(__dirname, '../uploads/admin', category.categoryImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Category.findByIdAndDelete(categoryId);
        req.flash('success', 'Category Deleted Successfully');
        return res.redirect('/viewCategoryPage');
    } catch (err) {
        console.log("Error deleting category", err);
        req.flash('error', 'Error Deleting Category');
        return res.redirect('/viewCategoryPage');
    }
}

// ============= SUB CATEGORY FUNCTIONS =============

const viewSubCategoryPage = async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate('categoryId');
        const categories = await Category.find();
        return res.render('Sub Category/viewsubcategorypage', { subCategories, categories });
    } catch (err) {
        console.log("Error fetching sub categories", err);
        req.flash('error', 'Error Fetching Sub Categories');
        return res.redirect('/dashboard');
    }
}

const addSubCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find();
        return res.render('Sub Category/addsubcategorypage', { categories });
    } catch (err) {
        console.log("Error fetching categories", err);
        req.flash('error', 'Error Fetching Categories');
        return res.redirect('/dashboard');
    }
}

const insertSubCategory = async (req, res) => {
    try {
        const { subCategoryName, categoryId, subCategoryDescription } = req.body;
        console.log("Insert Sub Category", req.body);

        let subCategoryImage = "";
        if (req.file) {
            subCategoryImage = req.file.filename;
        }

        const subCategory = await SubCategory.create({
            subCategoryName,
            categoryId,
            subCategoryDescription,
            subCategoryImage
        });

        req.flash('success', 'Sub Category Added Successfully');
        return res.redirect('/viewSubCategoryPage');
    } catch (err) {
        console.log("Error inserting sub category", err);
        req.flash('error', 'Error Adding Sub Category');
        return res.redirect('/addSubCategoryPage');
    }
}

const editSubCategoryPage = async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        const subCategory = await SubCategory.findById(subCategoryId).populate('categoryId');
        const categories = await Category.find();
        if (!subCategory) {
            req.flash('error', 'Sub Category not found');
            return res.redirect('/viewSubCategoryPage');
        }
        return res.render('Sub Category/editsubcategorypage', { subCategory, categories });
    } catch (err) {
        console.log("Error fetching sub category", err);
        req.flash('error', 'Error Fetching Sub Category');
        return res.redirect('/viewSubCategoryPage');
    }
}

const updateSubCategory = async (req, res) => {
    try {
        const { subCategoryId } = req.params;
        const { subCategoryName, categoryId, subCategoryDescription } = req.body;

        const subCategory = await SubCategory.findById(subCategoryId);
        if (!subCategory) {
            req.flash('error', 'Sub Category not found');
            return res.redirect('/viewSubCategoryPage');
        }

        let subCategoryImage = subCategory.subCategoryImage;
        if (req.file) {
            if (subCategory.subCategoryImage) {
                const imagePath = path.join(__dirname, '../uploads/admin', subCategory.subCategoryImage);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            subCategoryImage = req.file.filename;
        }

        await SubCategory.findByIdAndUpdate(subCategoryId, {
            subCategoryName,
            categoryId,
            subCategoryDescription,
            subCategoryImage
        });

        req.flash('success', 'Sub Category Updated Successfully');
        return res.redirect('/viewSubCategoryPage');
    } catch (err) {
        console.log("Error updating sub category", err);
        req.flash('error', 'Error Updating Sub Category');
        return res.redirect('/viewSubCategoryPage');
    }
}

const deleteSubCategory = async (req, res) => {
    try {
        const { subCategoryId } = req.query;
        const subCategory = await SubCategory.findById(subCategoryId);
        if (!subCategory) {
            req.flash('error', 'Sub Category not found');
            return res.redirect('/viewSubCategoryPage');
        }

        if (subCategory.subCategoryImage) {
            const imagePath = path.join(__dirname, '../uploads/admin', subCategory.subCategoryImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await SubCategory.findByIdAndDelete(subCategoryId);
        req.flash('success', 'Sub Category Deleted Successfully');
        return res.redirect('/viewSubCategoryPage');
    } catch (err) {
        console.log("Error deleting sub category", err);
        req.flash('error', 'Error Deleting Sub Category');
        return res.redirect('/viewSubCategoryPage');
    }
}

// ============= SUB EXTRA CATEGORY FUNCTIONS =============

const viewSubExtraCategoryPage = async (req, res) => {
    try {
        const subExtraCategories = await SubExtraCategory.find().populate('categoryId').populate('subCategoryId');
        const categories = await Category.find();
        const subCategories = await SubCategory.find();
        return res.render('Sub Category/viewsubextracategorypage', { subExtraCategories, categories, subCategories });
    } catch (err) {
        console.log("Error fetching sub extra categories", err);
        req.flash('error', 'Error Fetching Sub Extra Categories');
        return res.redirect('/dashboard');
    }
}

const addSubExtraCategoryPage = async (req, res) => {
    try {
        const categories = await Category.find();
        const subCategories = await SubCategory.find();
        return res.render('Sub Category/addsubextracategorypage', { categories, subCategories });
    } catch (err) {
        console.log("Error fetching categories", err);
        req.flash('error', 'Error Fetching Categories');
        return res.redirect('/dashboard');
    }
}

const insertSubExtraCategory = async (req, res) => {
    try {
        const { subExtraCategoryName, categoryId, subCategoryId, subExtraCategoryDescription } = req.body;
        console.log("Insert Sub Extra Category", req.body);

        let subExtraCategoryImage = "";
        if (req.file) {
            subExtraCategoryImage = req.file.filename;
        }

        const subExtraCategory = await SubExtraCategory.create({
            subExtraCategoryName,
            categoryId,
            subCategoryId,
            subExtraCategoryDescription,
            subExtraCategoryImage
        });

        req.flash('success', 'Sub Extra Category Added Successfully');
        return res.redirect('/viewSubExtraCategoryPage');
    } catch (err) {
        console.log("Error inserting sub extra category", err);
        req.flash('error', 'Error Adding Sub Extra Category');
        return res.redirect('/addSubExtraCategoryPage');
    }
}

const editSubExtraCategoryPage = async (req, res) => {
    try {
        const { subExtraCategoryId } = req.params;
        const subExtraCategory = await SubExtraCategory.findById(subExtraCategoryId).populate('categoryId').populate('subCategoryId');
        const categories = await Category.find();
        const subCategories = await SubCategory.find();
        if (!subExtraCategory) {
            req.flash('error', 'Sub Extra Category not found');
            return res.redirect('/viewSubExtraCategoryPage');
        }
        return res.render('Sub Category/editsubextracategorypage', { subExtraCategory, categories, subCategories });
    } catch (err) {
        console.log("Error fetching sub extra category", err);
        req.flash('error', 'Error Fetching Sub Extra Category');
        return res.redirect('/viewSubExtraCategoryPage');
    }
}

const updateSubExtraCategory = async (req, res) => {
    try {
        const { subExtraCategoryId } = req.params;
        const { subExtraCategoryName, categoryId, subCategoryId, subExtraCategoryDescription } = req.body;

        const subExtraCategory = await SubExtraCategory.findById(subExtraCategoryId);
        if (!subExtraCategory) {
            req.flash('error', 'Sub Extra Category not found');
            return res.redirect('/viewSubExtraCategoryPage');
        }

        let subExtraCategoryImage = subExtraCategory.subExtraCategoryImage;
        if (req.file) {
            if (subExtraCategory.subExtraCategoryImage) {
                const imagePath = path.join(__dirname, '../uploads/admin', subExtraCategory.subExtraCategoryImage);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            subExtraCategoryImage = req.file.filename;
        }

        await SubExtraCategory.findByIdAndUpdate(subExtraCategoryId, {
            subExtraCategoryName,
            categoryId,
            subCategoryId,
            subExtraCategoryDescription,
            subExtraCategoryImage
        });

        req.flash('success', 'Sub Extra Category Updated Successfully');
        return res.redirect('/viewSubExtraCategoryPage');
    } catch (err) {
        console.log("Error updating sub extra category", err);
        req.flash('error', 'Error Updating Sub Extra Category');
        return res.redirect('/viewSubExtraCategoryPage');
    }
}

const deleteSubExtraCategory = async (req, res) => {
    try {
        const { subExtraCategoryId } = req.query;
        const subExtraCategory = await SubExtraCategory.findById(subExtraCategoryId);
        if (!subExtraCategory) {
            req.flash('error', 'Sub Extra Category not found');
            return res.redirect('/viewSubExtraCategoryPage');
        }

        if (subExtraCategory.subExtraCategoryImage) {
            const imagePath = path.join(__dirname, '../uploads/admin', subExtraCategory.subExtraCategoryImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await SubExtraCategory.findByIdAndDelete(subExtraCategoryId);
        req.flash('success', 'Sub Extra Category Deleted Successfully');
        return res.redirect('/viewSubExtraCategoryPage');
    } catch (err) {
        console.log("Error deleting sub extra category", err);
        req.flash('error', 'Error Deleting Sub Extra Category');
        return res.redirect('/viewSubExtraCategoryPage');
    }
}

// ============= PRODUCT FUNCTIONS =============

const viewProductPage = async (req, res) => {
    try {
        const products = await Product.find().populate('categoryId').populate('subCategoryId').populate('subExtraCategoryId');
        const categories = await Category.find();
        const subCategories = await SubCategory.find();
        const subExtraCategories = await SubExtraCategory.find();
        return res.render('product/viewproductpage', { products, categories, subCategories, subExtraCategories });
    } catch (err) {
        console.log("Error fetching products", err);
        req.flash('error', 'Error Fetching Products');
        return res.redirect('/dashboard');
    }
}

const addProductPage = async (req, res) => {
    try {
        const categories = await Category.find();
        const subCategories = await SubCategory.find();
        const subExtraCategories = await SubExtraCategory.find();
        return res.render('product/addproductpage', { categories, subCategories, subExtraCategories });
    } catch (err) {
        console.log("Error fetching data for product", err);
        req.flash('error', 'Error Fetching Data');
        return res.redirect('/dashboard');
    }
}

const insertProduct = async (req, res) => {
    try {
        const { productName, categoryId, subCategoryId, subExtraCategoryId, productDescription, productPrice, productStock } = req.body;
        console.log("Insert Product", req.body);

        let productImage = "";
        if (req.file) {
            productImage = req.file.filename;
        }

        const product = await Product.create({
            productName,
            categoryId,
            subCategoryId,
            subExtraCategoryId,
            productDescription,
            productPrice,
            productImage,
            productStock
        });

        req.flash('success', 'Product Added Successfully');
        return res.redirect('/viewProductPage');
    } catch (err) {
        console.log("Error inserting product", err);
        req.flash('error', 'Error Adding Product');
        return res.redirect('/addProductPage');
    }
}

const editProductPage = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId).populate('categoryId').populate('subCategoryId').populate('subExtraCategoryId');
        const categories = await Category.find();
        const subCategories = await SubCategory.find();
        const subExtraCategories = await SubExtraCategory.find();
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/viewProductPage');
        }
        return res.render('product/editproductpage', { product, categories, subCategories, subExtraCategories });
    } catch (err) {
        console.log("Error fetching product", err);
        req.flash('error', 'Error Fetching Product');
        return res.redirect('/viewProductPage');
    }
}

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { productName, categoryId, subCategoryId, subExtraCategoryId, productDescription, productPrice, productStock } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/viewProductPage');
        }

        let productImage = product.productImage;
        if (req.file) {
            if (product.productImage) {
                const imagePath = path.join(__dirname, '../uploads/admin', product.productImage);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            productImage = req.file.filename;
        }

        await Product.findByIdAndUpdate(productId, {
            productName,
            categoryId,
            subCategoryId,
            subExtraCategoryId,
            productDescription,
            productPrice,
            productImage,
            productStock
        });

        req.flash('success', 'Product Updated Successfully');
        return res.redirect('/viewProductPage');
    } catch (err) {
        console.log("Error updating product", err);
        req.flash('error', 'Error Updating Product');
        return res.redirect('/viewProductPage');
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.query;
        const product = await Product.findById(productId);
        if (!product) {
            req.flash('error', 'Product not found');
            return res.redirect('/viewProductPage');
        }

        if (product.productImage) {
            const imagePath = path.join(__dirname, '../uploads/admin', product.productImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Product.findByIdAndDelete(productId);
        req.flash('success', 'Product Deleted Successfully');
        return res.redirect('/viewProductPage');
    } catch (err) {
        console.log("Error deleting product", err);
        req.flash('error', 'Error Deleting Product');
        return res.redirect('/viewProductPage');
    }
}

module.exports = {
    // Category
    viewCategoryPage,
    addCategoryPage,
    insertCategory,
    editCategoryPage,
    updateCategory,
    deleteCategory,
    
    // Sub Category
    viewSubCategoryPage,
    addSubCategoryPage,
    insertSubCategory,
    editSubCategoryPage,
    updateSubCategory,
    deleteSubCategory,
    
    // Sub Extra Category
    viewSubExtraCategoryPage,
    addSubExtraCategoryPage,
    insertSubExtraCategory,
    editSubExtraCategoryPage,
    updateSubExtraCategory,
    deleteSubExtraCategory,
    
    // Product
    viewProductPage,
    addProductPage,
    insertProduct,
    editProductPage,
    updateProduct,
    deleteProduct
}
