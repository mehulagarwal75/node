const express = require('express');
const passport = require('passport');

const { dashboardPage, addAdminPage, viewAdminPage, insertAdmin, deleteAdmin, editAdminPage, updateAdmin, loginPage, forgotPasswordPage, checkLogin, logout, changePasswordPage, changePassword, profilePage, verifyEmail, OTPPage, OTPVerify, newPasswordPage, changeNewPassword } = require('../controllers/admin.controller');
const { viewCategoryPage, addCategoryPage, insertCategory, editCategoryPage, updateCategory, deleteCategory, viewSubCategoryPage, addSubCategoryPage, insertSubCategory, editSubCategoryPage, updateSubCategory, deleteSubCategory, viewSubExtraCategoryPage, addSubExtraCategoryPage, insertSubExtraCategory, editSubExtraCategoryPage, updateSubExtraCategory, deleteSubExtraCategory, viewProductPage, addProductPage, insertProduct, editProductPage, updateProduct, deleteProduct } = require('../controllers/category.controller');
const upload = require('../middleware/multer');

const route = express.Router();

// Auth
route.get('/', passport.checkAuthIsNotDone, loginPage);
route.post('/login', passport.checkAuthIsNotDone, passport.authenticate("localAuth", {
    failureRedirect: "/"
}), checkLogin);

// change password
route.get('/change-password', passport.checkAuthIsDone, changePasswordPage);
route.post('/change-password', passport.checkAuthIsDone, changePassword);

// forgot password
route.get('/forgot-password', passport.checkAuthIsNotDone, forgotPasswordPage);
route.post('/verify-email', passport.checkAuthIsNotDone, verifyEmail);

// OTP Page
route.get('/otp-page', passport.checkAuthIsNotDone, OTPPage);
route.post('/otp-verify', passport.checkAuthIsNotDone, OTPVerify);

// New Password Page
route.get('/newPasswordPage', passport.checkAuthIsNotDone, newPasswordPage);
route.post('/change-new-password', passport.checkAuthIsNotDone, changeNewPassword);

// Profile
route.get('/profile', passport.checkAuthIsDone, profilePage);

// logout
route.get('/logout', passport.checkAuthIsDone, logout);

route.get('/dashboard', passport.checkAuthIsDone, dashboardPage);

route.get('/addAdminPage', passport.checkAuthIsDone, addAdminPage);
route.get('/viewAdminPage', passport.checkAuthIsDone, viewAdminPage);

// Insert Admin
route.post('/insertAdmin', passport.checkAuthIsDone, upload.single('profile_image'), insertAdmin);

// Delete Admin
route.get('/deleteAdmin', passport.checkAuthIsDone, deleteAdmin);

// Edit Admin
route.get('/editAdmin/:adminId', passport.checkAuthIsDone, editAdminPage);
route.post('/editAdmin/:adminId', passport.checkAuthIsDone, upload.single('profile_image'), updateAdmin);

// ============= CATEGORY ROUTES =============
route.get('/viewCategoryPage', passport.checkAuthIsDone, viewCategoryPage);
route.get('/addCategoryPage', passport.checkAuthIsDone, addCategoryPage);
route.post('/insertCategory', passport.checkAuthIsDone, upload.single('categoryImage'), insertCategory);
route.get('/editCategory/:categoryId', passport.checkAuthIsDone, editCategoryPage);
route.post('/editCategory/:categoryId', passport.checkAuthIsDone, upload.single('categoryImage'), updateCategory);
route.get('/deleteCategory', passport.checkAuthIsDone, deleteCategory);

// ============= SUB CATEGORY ROUTES =============
route.get('/viewSubCategoryPage', passport.checkAuthIsDone, viewSubCategoryPage);
route.get('/addSubCategoryPage', passport.checkAuthIsDone, addSubCategoryPage);
route.post('/insertSubCategory', passport.checkAuthIsDone, upload.single('subCategoryImage'), insertSubCategory);
route.get('/editSubCategory/:subCategoryId', passport.checkAuthIsDone, editSubCategoryPage);
route.post('/editSubCategory/:subCategoryId', passport.checkAuthIsDone, upload.single('subCategoryImage'), updateSubCategory);
route.get('/deleteSubCategory', passport.checkAuthIsDone, deleteSubCategory);

// ============= SUB EXTRA CATEGORY ROUTES =============
route.get('/viewSubExtraCategoryPage', passport.checkAuthIsDone, viewSubExtraCategoryPage);
route.get('/addSubExtraCategoryPage', passport.checkAuthIsDone, addSubExtraCategoryPage);
route.post('/insertSubExtraCategory', passport.checkAuthIsDone, upload.single('subExtraCategoryImage'), insertSubExtraCategory);
route.get('/editSubExtraCategory/:subExtraCategoryId', passport.checkAuthIsDone, editSubExtraCategoryPage);
route.post('/editSubExtraCategory/:subExtraCategoryId', passport.checkAuthIsDone, upload.single('subExtraCategoryImage'), updateSubExtraCategory);
route.get('/deleteSubExtraCategory', passport.checkAuthIsDone, deleteSubExtraCategory);

// ============= PRODUCT ROUTES =============
route.get('/viewProductPage', passport.checkAuthIsDone, viewProductPage);
route.get('/addProductPage', passport.checkAuthIsDone, addProductPage);
route.post('/insertProduct', passport.checkAuthIsDone, upload.single('productImage'), insertProduct);
route.get('/editProduct/:productId', passport.checkAuthIsDone, editProductPage);
route.post('/editProduct/:productId', passport.checkAuthIsDone, upload.single('productImage'), updateProduct);
route.get('/deleteProduct', passport.checkAuthIsDone, deleteProduct);

module.exports = route;