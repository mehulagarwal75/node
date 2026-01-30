const express = require('express');
const multer = require('multer');

const {
    loginPage,
    checkLogin,
    profilePage,
    logout,
    changePasswordPage,
    changePassword,
    dashboardPage,
    addAdminPage,
    viewAdminPage,
    insertAdmin,
    deleteAdmin,
    editAdminPage,
    updateAdmin,
    verifyEmail,
    otpPage,
    newPasswordPage,
    changeNewPassword,
    otpVerify
} = require('../controllers/admin_controller');

const route = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/admin/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Login Page
route.get('/', loginPage);
route.post('/login', checkLogin);

// Profile-Page
route.get('/profile', profilePage);

// Logout - Admin
route.get('/logout', logout);

//change- password
route.get('/change-password', changePasswordPage);
route.post('/change-password', changePassword);

// forgot password
route.post('/verify-email', verifyEmail);

//otp page
route.get('/otppage', otpPage);
route.post('/otpverify', otpVerify);

// New Password Page
route.get('/newPasswordPage', newPasswordPage);
route.post('/changeNewPassword', changeNewPassword);

// Dashboard
route.get('/dashboard', dashboardPage);

// Admin Management
route.get('/addAdminPage', addAdminPage);
route.get('/viewAdminPage', viewAdminPage);

// Insert Admin
route.post('/insertAdmin', upload.single('profile_image'), insertAdmin);
route.get('/deleteAdmin', deleteAdmin);

// Edit Admin Page & Update Admin
route.get('/editAdmin/:adminId', editAdminPage);
route.post('/editAdmin/:adminId', upload.single('profile_image'), updateAdmin);

module.exports = route;
