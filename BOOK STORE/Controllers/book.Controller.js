const Book = require('../model/book.model');
const fs = require('fs');
const path = require('path');

// 1. Home Page (List Books)
exports.home = async (req, res) => {
    try {
        const books = await Book.find();
        res.render('index', { books });
    } catch (err) {
        console.log(err);
    }
};

// 2. Add Book Page (Form)
exports.addBookPage = (req, res) => {
    res.render('add');
};

// 3. Create Book (Process Form)
exports.createBook = async (req, res) => {
    try {
        const { book_name, book_author, book_price, book_lang } = req.body;
        
        // 'req.file' contains the uploaded image info
        const book = new Book({
            book_name,
            book_author,
            book_price,
            book_lang,
            book_image: req.file ? req.file.filename : 'default.jpg' 
        });

        await book.save();
        console.log("Book Added Successfully");
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};

// 4. Edit Book Page
exports.editBookPage = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.render('edit', { book });
    } catch (err) {
        console.log(err);
    }
};

// 5. Update Book
exports.updateBook = async (req, res) => {
    try {
        const { book_name, book_author, book_price, book_lang } = req.body;

        let updateData = {
            book_name,
            book_author,
            book_price,
            book_lang
        };

        // Fetch the current book to get the old image
        const currentBook = await Book.findById(req.params.id);

        // Check if a NEW image was selected
        if (req.file) {
            // Delete the old image if it exists and is not the default
            if (currentBook.book_image && currentBook.book_image !== 'default.jpg') {
                fs.unlink(path.join(__dirname, '../public/uploads', currentBook.book_image), (err) => {
                    if (err) console.log("Failed to delete old image:", err);
                });
            }
            updateData.book_image = req.file.filename;
        }
        // If no new image, keep the existing book_image

        await Book.findByIdAndUpdate(req.params.id, updateData);
        console.log("Book Updated");
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};

// 6. Delete Book
exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        
        // Remove the image file from storage
        if(book && book.book_image) {
            fs.unlink(path.join(__dirname, '../public/uploads', book.book_image), (err) => {
                if(err) console.log("Failed to delete local image:", err);
            });
        }
        
        console.log("Book Deleted");
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};