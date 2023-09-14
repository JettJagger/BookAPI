const {Router} = require('express');
const bookRouter = Router();

const Book = require("../models/bookmodel");

const {addaBook, listAllBooks, updateAnAuthor, updateGenre, deleteaBook, updateGenreByName, deleteAllBooks, deleteBooksById, findBookByTitle,} = require ("../controllers/controllers");

bookRouter.post("/books/addaBook", addaBook);
bookRouter.get("/books/listAllBooks", listAllBooks);
bookRouter.put("/books/updateAnAuthor", updateAnAuthor);
bookRouter.put("/books/updateGenre", updateGenre);
bookRouter.delete("/books/deleteaBook", deleteaBook);

// New route to update a books genre by name 
bookRouter.put("/books/updateGenreByName", updateGenreByName);

// New route to delete all entries from database
bookRouter.delete("/books/deleteAllBooks", deleteAllBooks);

// New route to delete a single entry by ID

bookRouter.delete("/books/deleteBooksById", deleteBooksById);

// New route to find book by title
bookRouter.get("/books/findBookByTitle", findBookByTitle);

module.exports = bookRouter;

