const Admin = require('../model/admin.model');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const loginPage = (req, res) => {
    return res.render('auth/login');
}

const forgotPasswordPage = (req, res) => {
    return res.render('auth/forgotpassword');
}

const checkLogin = (req, res) => {
    console.log("Login Successfully");
    return res.redirect('/dashboard');
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log("Logout Error", err);
            return res.redirect('/dashboard');
        }
        return res.redirect('/');
    });
}

const dashboardPage = (req, res) => {
    return res.render('dashboard');
}

const addAdminPage = (req, res) => {
    return res.render('addAdminPage');
}

const viewAdminPage = async (req, res) => {
    try {
        const admins = await Admin.find();
        return res.render('viewAdminPage', {
            admins
        });
    } catch (err) {
        console.log("Error fetching admins", err);
        return res.redirect('/dashboard');
    }
}

const insertAdmin = async (req, res) => {
    try {
        console.log("Insert Admin");
        console.log(req.body);
        console.log(req.file);

        const { fname, lname, email, password, contact, gender, city, hobby, about } = req.body;

        let profile_image = "";
        if (req.file) {
            profile_image = req.file.filename;
        }

        const admin = await Admin.create({
            fname,
            lname,
            email,
            password,
            contact,
            gender,
            city,
            hobby: hobby || [],
            about,
            profile_image
        });

        console.log("Admin Created", admin);
        req.flash('success', 'Admin Added Successfully');
        return res.redirect('/viewAdminPage');
    } catch (err) {
        console.log("Error inserting admin", err);
        req.flash('error', 'Error Adding Admin');
        return res.redirect('/addAdminPage');
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const { adminId } = req.query;
        console.log("Delete Admin", adminId);

        const admin = await Admin.findById(adminId);
        if (!admin) {
            req.flash('error', 'Admin not found');
            return res.redirect('/viewAdminPage');
        }

        if (admin.profile_image) {
            const imagePath = path.join(__dirname, '../uploads/admin', admin.profile_image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Admin.findByIdAndDelete(adminId);
        req.flash('success', 'Admin Deleted Successfully');
        return res.redirect('/viewAdminPage');
    } catch (err) {
        console.log("Error deleting admin", err);
        req.flash('error', 'Error Deleting Admin');
        return res.redirect('/viewAdminPage');
    }
}

const editAdminPage = async (req, res) => {
    try {
        const { adminId } = req.params;
        console.log("Edit Admin", adminId);

        const admin = await Admin.findById(adminId);
        if (!admin) {
            req.flash('error', 'Admin not found');
            return res.redirect('/viewAdminPage');
        }

        return res.render('editAdminPage', {
            admin
        });
    } catch (err) {
        console.log("Error fetching admin for edit", err);
        req.flash('error', 'Error Editing Admin');
        return res.redirect('/viewAdminPage');
    }
}

const updateAdmin = async (req, res) => {
    try {
        const { adminId } = req.params;
        console.log("Update Admin", adminId);
        console.log(req.body);
        console.log(req.file);

        const { fname, lname, email, password, contact, gender, city, hobby, about } = req.body;

        const admin = await Admin.findById(adminId);
        if (!admin) {
            req.flash('error', 'Admin not found');
            return res.redirect('/viewAdminPage');
        }

        let profile_image = admin.profile_image;
        if (req.file) {
            // Delete old image
            if (admin.profile_image) {
                const oldImagePath = path.join(__dirname, '../uploads/admin', admin.profile_image);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            profile_image = req.file.filename;
        }

        await Admin.findByIdAndUpdate(adminId, {
            fname,
            lname,
            email,
            password,
            contact,
            gender,
            city,
            hobby: hobby || [],
            about,
            profile_image
        });

        req.flash('success', 'Admin Updated Successfully');
        return res.redirect('/viewAdminPage');
    } catch (err) {
        console.log("Error updating admin", err);
        req.flash('error', 'Error Updating Admin');
        return res.redirect('/viewAdminPage');
    }
}

const changePasswordPage = (req, res) => {
    return res.render('auth/changepassword');
}

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        console.log("Change Password", req.body);

        if (newPassword !== confirmPassword) {
            req.flash('error', 'New Password and Confirm Password do not match');
            return res.redirect('/change-password');
        }

        const admin = await Admin.findById(req.user.id);
        if (!admin) {
            req.flash('error', 'Admin not found');
            return res.redirect('/change-password');
        }

        if (admin.password !== oldPassword) {
            req.flash('error', 'Old Password is incorrect');
            return res.redirect('/change-password');
        }

        await Admin.findByIdAndUpdate(req.user.id, {
            password: newPassword
        });

        req.flash('success', 'Password Changed Successfully');
        return res.redirect('/dashboard');
    } catch (err) {
        console.log("Error changing password", err);
        req.flash('error', 'Error Changing Password');
        return res.redirect('/change-password');
    }
}

const profilePage = (req, res) => {
    return res.render('profile/profile');
}

const verifyEmail = async (req, res) => {
    try {
        const { email } = req.body;
        console.log("Verify Email", email);

        const admin = await Admin.findOne({ email });
        if (!admin) {
            req.flash('error', 'Email not found');
            return res.redirect('/');
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        console.log("OTP", otp);

        // Send OTP via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mehulagarwal2302@gmail.com',
                pass: 'wpfykzljmhcprvhj'
            }
        });

        const mailOptions = {
            from: 'mehulagarwal2302@gmail.com',
            to: email,
            subject: 'OTP for Password Reset',
            text: `Your OTP is ${otp}`
        };

        await transporter.sendMail(mailOptions);
        
        req.session.otp = otp;
        req.session.email = email;
        req.flash('success', 'OTP sent to your email');
        return res.redirect('/otp-page');

    } catch (err) {
        console.log("Error verifying email", err);
        req.flash('error', 'Error Verifying Email');
        return res.redirect('/');
    }
}

const OTPPage = (req, res) => {
    return res.render('auth/otp');
}

const OTPVerify = (req, res) => {
    try {
        const { adminOTP } = req.body;
        console.log("OTP Verify", adminOTP);

        if (req.session.otp == adminOTP) {
            req.flash('success', 'OTP Verified');
            return res.redirect('/newPasswordPage');
        } else {
            req.flash('error', 'Invalid OTP');
            return res.redirect('/otp-page');
        }
    } catch (err) {
        console.log("Error verifying OTP", err);
        req.flash('error', 'Error Verifying OTP');
        return res.redirect('/otp-page');
    }
}

const newPasswordPage = (req, res) => {
    return res.render('auth/newpassword');
}

const changeNewPassword = async (req, res) => {
    try {
        const { new_password, conform_password } = req.body;
        console.log("Change New Password", req.body);

        if (new_password !== conform_password) {
            req.flash('error', 'New Password and Confirm Password do not match');
            return res.redirect('/newPasswordPage');
        }

        const admin = await Admin.findOne({ email: req.session.email });
        if (!admin) {
            req.flash('error', 'Admin not found');
            return res.redirect('/newPasswordPage');
        }

        await Admin.findByIdAndUpdate(admin.id, {
            password: new_password
        });

        req.flash('success', 'Password Changed Successfully');
        return res.redirect('/');
    } catch (err) {
        console.log("Error changing new password", err);
        req.flash('error', 'Error Changing Password');
        return res.redirect('/newPasswordPage');
    }
}

module.exports = {
    loginPage,
    forgotPasswordPage,
    checkLogin,
    logout,
    dashboardPage,
    addAdminPage,
    viewAdminPage,
    insertAdmin,
    deleteAdmin,
    editAdminPage,
    updateAdmin,
    changePasswordPage,
    changePassword,
    profilePage,
    verifyEmail,
    OTPPage,
    OTPVerify,
    newPasswordPage,
    changeNewPassword
}
