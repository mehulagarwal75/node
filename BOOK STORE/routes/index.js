const express = require('express');
const router = express.Router();
const bookController = require('../Controllers/book.Controller');
const multer = require('multer');

// --- Multer Config (For File Uploads) ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads'); // Folder to save images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});
const upload = multer({ storage: storage }).single('book_image');


// --- Routes ---
router.get('/', bookController.home);

router.get('/add', bookController.addBookPage);
router.post('/insert', upload, bookController.createBook); 

router.get('/edit/:id', bookController.editBookPage);
router.post('/update/:id', upload, bookController.updateBook); 

router.get('/delete/:id', bookController.deleteBook);

module.exports = router;