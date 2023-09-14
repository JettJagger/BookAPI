const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
        unique: true
    },
    genre: {
        type: String,
        required: false,
        unique: false
    },
    ISBN: {
        type: Number,
        required: false,
        unique: false
    }
});

const Book = mongoose.model("book", bookSchema)

module.exports = Book;