const express = require('express');
const multer = require('multer');

const { dashboardPage, addAdminPage, viewAdminPage, insertAdmin, deleteAdmin, editAdmin, editAdminPage, updateAdmin, loginPage, checkLogin, logout } = require('../controllers/admin.controllers');

const route = express.Router();

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/admin/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: myStorage });

route.get('/', loginPage);
route.post('/login', checkLogin);

route.get('/logout', logout);

route.get('/dashboard', dashboardPage);

route.get('/addAdminPage', addAdminPage);
route.get('/viewAdminPage', viewAdminPage);

// Insert Admin
route.post('/insertAdmin', upload.single('profile_image'), insertAdmin);

// Delete Admin
route.get('/deleteAdmin', deleteAdmin);

// Edit Admin
route.get('/editAdmin/:adminId', editAdminPage);
route.post('/editAdmin/:adminId', upload.single('profile_image'), updateAdmin);
module.exports = route;