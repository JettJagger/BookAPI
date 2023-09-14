const { handle } = require("express/lib/application");
const Book = require("../models/bookmodel");

function handleErrorResponse(res, error) {
    console.error(error);
    const errorResponse = {
        message: "Error Occurred",
        error: error,
    };
    res.status(418).json(errorResponse);
}


async function addaBook(req, res) {
    console.log("The req body is:",req.body)
    try {
        const newBook = await Book.create({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            ISBN: req.body.ISBN
        })
        const successResponse = {
            message: "Book added",
            newBook: newBook
        };

        res.status(201).json(successResponse);

    } catch (error) {
        handleErrorResponse(res, error);
    }
};

async function listAllBooks(req, res) {
    try {
        console.log("Before search ");
        const listAllBooks = await Book.find({})
        console.log("After search ");
        const successResponse = {
            message: "Success", 
            books: listAllBooks
        };
        res.status(200).json(successResponse);
        
    } catch (error) {
        handleErrorResponse(res, error); 
    }
}

// From here 
async function updateAnAuthor(req,res) {
    const title = req.body.title;
    const newAuthorName = req.body.author;
    try {
        const updatedAuthor = await Book.findOneAndUpdate(
            {title: title},
            {author: newAuthorName},
            {new: true}
        );

        if (!updatedAuthor) {
           res.status(418).json({message: "Title not found"});
           return;
        }

        const successResponse = {
            message: "Author Updated",
            updatedAuthor: updatedAuthor,
        };

        res.status(200).json(successResponse);
    } catch (error) {
        handleErrorResponse(res, error);
    }
}

async function updateGenre(req,res) {
    const title = req.body.title;
    const newGenre = req.body.genre;

    try {
        const updatedGenre = await Book.findOneAndUpdate(
            {title: title},
            {genre: newGenre},
            {new: true}
        );

        if (!updatedGenre) {
            res.status(404).json({message: "Book not found"});
            return;
        }

        const successResponse = {
            message: "Genre updated",
            updatedGenre: updateGenre,
        };
        
        res.status(200).json(successResponse);
    } catch (error) {
        handleErrorResponse(res, error);  
    }
}

async function deleteaBook(req, res) {
    const title = req.body.title;

    try {
        const deletedBook = await Book.findOneAndDelete({title:title});

        if (!deletedBook) {
            res.status(404).json({message: "Book not found"});
            return;
        }

        const successResponse = {
            message: "Book deleted",
            deletedBook: deletedBook,
        };

        res.status(200).json(successResponse);       
    } catch (error) {
        handleErrorResponse(res, error);  
    }
}

// Function to update a genre by name 
async function updateGenreByName(req, res) {
    const {bookName} = req.params;
    const {newGenre} = req.body;

    try {
        const updateByName = await Book.findOneAndUpdate(
            {title: bookName},
            {genre: newGenre},
            {new: true}
        );

        if (!updateByName) {
            res.status(404).json({message: "Book not found"});
            return;
        }

        const successResponse = {
            message: "Genre updated",
            updateByName: updateByName,
        };
        
        res.status(200).json(successResponse);
    } catch (error) {
        handleErrorResponse(res, error);  
    }
}

async function deleteAllBooks(req, res) {
    try {
        await Book.deleteMany({});

        const successResponse = {
            message: "All books deleted",
        };
       
       res.status(200).json(successResponse);
    } catch (error) {
        handleErrorResponse(res, error);  
    }
}

async function deleteBooksById(req, res) {
    const bookId = req.body.id;

    try {
        const deletedBookId = await Book.findByIdAndDelete(bookId);

        if(!deletedBookId) {
            res.status(404).json({message: "Book not found"});
            return;
        }

        const successResponse = {
            message: "Book deleted",
            deletedBookId: deletedBookId,
        };
      
       res.status(200).json(successResponse);
    } catch (error) {
        handleErrorResponse(res, error);
    }
}

async function findBookByTitle(req, res) {
    const bookTitle = req.body.title;

    try {
        const foundBook = await Book.findOne({title: bookTitle});

        if(!foundBook) {
            res.status(404).json({message: "Book not found"});
            return;
        }

        const successResponse = {
            message: "Book found",
            foundBook: foundBook,
        };
        
       res.status(200).json(successResponse);    
    } catch (error) {
        handleErrorResponse(res, error);
    }
}






module.exports = {
    addaBook, 
    listAllBooks,
    updateAnAuthor,
    updateGenre,
    deleteaBook,
    updateGenreByName,
    deleteAllBooks,
    deleteBooksById,
    findBookByTitle,
};