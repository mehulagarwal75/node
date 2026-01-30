const Admin = require('../model/admin.model');
const nodemailer = require('nodemailer');
const fs = require('fs');


// Login Page
module.exports.loginPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId && admin) {
            return res.redirect('/dashboard');
        }

        return res.render('auth/login');
    } catch (err) {
        console.log("Sorry....something went wrong!!!");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}
// Login Logic
module.exports.checkLogin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });

        if (!admin) {
            console.log("Admin not found...");
            return res.redirect('/');
        }

        if (admin.password != req.body.password) {
            console.log("Pasword not matched...");
            return res.redirect('/');
        }

        res.cookie('adminId', admin._id);
        return res.redirect('/dashboard');
    } catch (err) {
        console.log("Sorry....something went wrong!!!");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Verify Email
module.exports.verifyEmail = async (req, res) => {

    console.log(req.body);

    try {
        const admin = await Admin.findOne(req.body);

        if (!admin) {
            console.log("Admin not found....");
            return res.redirect('/');
        }

        // Send OTP

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "itzmekrushik90999@gmail.com",
                pass: "bsdqvpzecrjbkgtt"
            }
        });

        const OTP = Math.floor(100000 + Math.random() * 900000).toString();

        const info = await transporter.sendMail({
            from: '"Admin Panel" <itzmekrushik90999@gmail.com>',

            to: req.body.email,
            subject: "OTP Verification",
            html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Secure Access OTP</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
    :root {
        --primary: #435ebe;
        --primary-light: #6a7cff;
        --primary-dark: #2f3fa3;
        --bg-surface: #f4f6fb;
        --card-bg: #ffffff;
        --text-main: #2b3445;
        --text-muted: #6b7280;
        --border-subtle: #eef2ff;
        --shadow-glow: rgba(67, 94, 190, 0.15);
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body {
        min-height: 100vh;
        background-color: var(--bg-surface);
        /* Modern spotlight gradient background */
        background-image: 
            radial-gradient(circle at 50% 0%, #e0e7ff 0%, transparent 60%),
            radial-gradient(circle at 85% 90%, #ede9fe 0%, transparent 40%);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    /* MAIN CONTAINER */
    .secure-card {
        width: 100%;
        max-width: 480px;
        background: var(--card-bg);
        border-radius: 30px;
        box-shadow: 
            0 20px 60px -10px var(--shadow-glow),
            0 0 0 1px rgba(255,255,255,0.8) inset; /* Glass edge effect */
        overflow: hidden;
        position: relative;
        text-align: center;
    }

    /* Top decorative wave */
    .secure-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 6px;
        background: linear-gradient(90deg, var(--primary), var(--primary-light));
    }

    /* HEADER SECTION */
    .card-header {
        padding: 40px 40px 10px 40px;
    }

    .icon-box {
        width: 70px;
        height: 70px;
        margin: 0 auto 20px;
        background: linear-gradient(135deg, #f0f4ff, #eef2ff);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary);
        font-size: 26px;
        box-shadow: 
            0 8px 20px rgba(67, 94, 190, 0.1),
            inset 0 0 0 1px #dbe4ff;
    }

    .card-header h2 {
        color: var(--text-main);
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 8px;
    }

    .card-header span {
        color: var(--text-muted);
        font-size: 14px;
        font-weight: 500;
    }

    /* BODY SECTION */
    .card-body {
        padding: 20px 40px 40px 40px;
    }

    .greeting {
        font-size: 15px;
        color: var(--text-main);
        margin-bottom: 25px;
        line-height: 1.6;
    }

    /* UNIQUE OTP COMPONENT */
    .otp-display {
        background: var(--primary-dark);
        background: linear-gradient(135deg, var(--primary-dark), var(--primary));
        border-radius: 18px;
        padding: 25px;
        position: relative;
        margin-bottom: 25px;
        box-shadow: 0 10px 25px rgba(47, 63, 163, 0.2);
        overflow: hidden;
    }

    /* Subtle pattern inside OTP box */
    .otp-display::after {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
        background-size: 20px 20px;
        opacity: 0.3;
        pointer-events: none;
    }

    .otp-label {
        display: block;
        color: rgba(255,255,255,0.7);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        margin-bottom: 8px;
        position: relative;
        z-index: 2;
    }

    .otp-value {
        font-family: 'Courier New', Courier, monospace;
        font-size: 38px;
        font-weight: 700;
        color: #ffffff;
        letter-spacing: 8px;
        position: relative;
        z-index: 2;
        text-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }

    /* ACTION BUTTON */
    .action-row {
        display: flex;
        justify-content: center;
        gap: 15px;
        margin-bottom: 25px;
    }

    .copy-btn {
        background: #f0f4ff;
        color: var(--primary);
        border: 1px solid transparent;
        padding: 12px 24px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .copy-btn:hover {
        background: #eef2ff;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(67, 94, 190, 0.1);
        border-color: #dce4ff;
    }

    /* INFO ALERTS */
    .alert-box {
        background: #fff;
        border: 1px dashed var(--border-subtle);
        border-radius: 12px;
        padding: 15px;
        font-size: 13px;
        color: var(--text-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    
    .alert-box i {
        color: #f59e0b; /* Amber for caution */
    }

    .alert-box strong {
        color: var(--text-main);
    }

    /* FOOTER */
    .card-footer {
        background: #f9fafb;
        padding: 20px;
        font-size: 11px;
        color: #9ca3af;
        border-top: 1px solid #f3f4f6;
    }

</style>
</head>
<body>

    <div class="secure-card">
        
        <div class="card-header">
            <div class="icon-box">
                <i class="fas fa-shield-alt"></i>
            </div>
            <h2>Identity Verification</h2>
            <span>Request for Admin Panel Access</span>
        </div>

        <div class="card-body">
            <p class="greeting">
                Hi <strong>${admin.fname}</strong>,<br>
                Use the verification code below to complete your secure login.
            </p>

            <div class="otp-display">
                <span class="otp-label">One-Time Password</span>
                <div class="otp-value">${OTP}</div>
            </div>

            <div class="alert-box">
                <i class="fas fa-clock"></i>
                <span>Code expires in <strong>10 minutes</strong></span>
            </div>
        </div>

        <div class="card-footer">
            <p>If you didn't request this, please ignore this email.</p>
            <p style="margin-top:5px">© 2026 Antique Secure Access</p>
        </div>

    </div>

</body>
</html>

`, // HTML version of the message
        });

        console.log(info.messageId);

        res.cookie("OTP", OTP);
        res.cookie("id", admin.id);

        return res.redirect('/otppage'); // OTP Verify Page

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// OTP Page
module.exports.otpPage = async (req, res) => {
    try {

        const admin = await Admin.findById(req.cookies.adminId);

        if (admin) {
            return res.redirect('/dashboard');
        }

        return res.render('auth/OTPPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// OTP Verify
module.exports.otpVerify = async (req, res) => {
    try {
        console.log("User Side : ", req.body);
        console.log("Developer Side : ", req.cookies);

        if (req.body.adminotp !== req.cookies.OTP) {
            console.log("OTP not match...");
            return res.redirect('/otppage');
        }

        // Change Password
        return res.redirect('/newPasswordPage');

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// New Password Page
module.exports.newPasswordPage = async (req, res) => {
    try {

        const admin = await Admin.findById(req.cookies.adminId);

        if (admin) {
            return res.redirect('/dashboard');
        }

        res.clearCookie('OTP');
        return res.render('auth/newPasswordPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Change New Password Logic
module.exports.changeNewPassword = async (req, res) => {
    try {
        console.log(req.body);

        if (req.body.newPassword !== req.body.confirmPassword) {
            console.log("Password not matched");
            return res.redirect('/newPasswordPage');
        }

        console.log(req.cookies);

        const updatePassword = await Admin.findByIdAndUpdate(req.cookies.id, { password: req.body.newPassword }, { new: true });

        res.clearCookie('id');
        if (updatePassword) {
            console.log("Password Update...");
            return res.redirect('/');
        } else {
            console.log("Password Not Update...");
            return res.redirect('/');
        }

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Profile Page
module.exports.profilePage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        return res.render('profile/profilePage', { admin });
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}
//Logout
module.exports.logout = (req, res) => {
    res.clearCookie('adminId');
    return res.redirect('/');
}

// Change Password Page
module.exports.changePasswordPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        return res.render('auth/changePasswordPage', { admin });
    } catch (err) {
        console.log("Sorry....something went wrong!!!");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}
// Change Password 
module.exports.changePassword = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        console.log(req.body);

        const { current_password, new_password, confirm_password } = req.body;

        if (current_password !== admin.password) {
            console.log("Current Password is incorrect...");
            return res.redirect('/change-password');
        }

        if (new_password === admin.password) {
            console.log("current Password and New Password are matched...🤷‍♂️");
            return res.redirect('/change-password');
        }

        if (new_password !== confirm_password) {
            console.log("New Password and Confirm Password do not match...");
            return res.redirect('/change-password');
        }

        // Update for Change Password
        const adminChangePassword = await Admin.findByIdAndUpdate(admin._id, { password: new_password }, { new: true });

        if (adminChangePassword) {
            console.log("Password changed successfully... Please login again.");
            res.clearCookie('adminId');
        } else {
            console.log("Password not changed... Try again...");
        }

        return res.redirect('/dashboard');

    } catch (err) {
        console.log("Sorry....something went wrong!!!");
        console.log("Error : ", err);
        return res.redirect('/');
    }
};


// Dashboard
module.exports.dashboardPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        return res.render('dashboard', { admin });
    } catch (err) {
        console.log("Sorry....something went wrong!!!");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}
// Add Admin Page
module.exports.addAdminPage = async (req, res) => {

    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        return res.render('addAdminPage', { admin });
    } catch (err) {
        console.log("Sorry....something went wrong!!!");
        console.log("Error : ", err);
        return res.redirect('/dashboard');
    }
}
// View Admin Page
module.exports.viewAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        let allAdmin = await Admin.find();

        allAdmin = allAdmin.filter((subadmin) => subadmin.email != admin.email);

        return res.render('viewAdminPage', { allAdmin, admin });
    } catch (err) {
        console.log("Sorry....something went wrong!!!");
        console.log("Error : ", err);
        return res.redirect('/dashboard');
    }
}
// Insert Admin
module.exports.insertAdmin = async (req, res) => {
    try {

        console.log(req.file);

        req.body.profile_image = req.file.path;

        const addAdmin = await Admin.create(req.body);

        if (addAdmin) {
            console.log("Admin Inserted Successfully..");
        } else {
            console.log("Admin Insertion Failed..");
        }
        return res.redirect('/addAdminPage');
    } catch (err) {
        console.log("Sorry....something went wrong!!!");
        console.log("Error : ", err);
        return res.redirect('/addAdminPage');
    }
}
// Delete Admin
module.exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        const deletedUser = await Admin.findByIdAndDelete(req.query.adminId);

        console.log(deletedUser);

        if (deletedUser) {
            fs.unlink(deletedUser.profile_image, () => { });
            console.log("Admin deleted successfully...");
        } else {
            console.log("Admin deletion failed...");
        }

        return res.redirect('/viewAdminPage');

    } catch (err) {
        console.log("Sorry....something went wrong!!!");
        console.log("Error : ", err);
        return res.redirect('/viewAdminPage');
    }
}
// Update Admin Page
module.exports.editAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        console.log(req.params);

        const singleAdmin = await Admin.findById(req.params.adminId);

        return res.render('editAdminPage', { singleAdmin });

    } catch (err) {
        console.log("Sorry....something went wrong!!!");
        console.log("Error : ", err);
        return res.redirect('/viewAdminPage');
    }
}
// Update Admin
module.exports.updateAdmin = async (req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        console.log(req.file);

        if (req.file) {

            req.body.profile_image = req.file.path;

            const updatedData = await Admin.findByIdAndUpdate(req.params.adminId, req.body);

            if (updatedData) {
                fs.unlink(updatedData.profile_image, () => { });
                console.log("Admin Updated Successfully...");
            } else {
                console.log("Admin Updation Failed...");
            }
        } else {
            const updatedData = await Admin.findByIdAndUpdate(req.params.adminId, req.body, { new: true });

            if (updatedData) {
                console.log("Admin Updated Successfully...");
            } else {
                console.log("Admin Updation Failed...");
            }
        }

        return (req.params.adminId === req.cookies.adminId) ? res.redirect('/profile') : res.redirect('/viewAdminPage');
    } catch (err) {
        console.log("Sorry....something went wrong!!!");
        console.log("Error : ", err);
        return res.redirect('/viewAdminPage');
    }
}