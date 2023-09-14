require("dotenv").config();
require("./db/connection");

const express = require("express");
const cors = require("cors");
const port = process.env.PORT;

const Book = require("./models/bookmodel");
const bookRouter = require("./routes/routes");
const app = express();

app.use(cors());
app.use(express.json());

app.use (bookRouter); 

app.use("/health", (req,res) => {
    res.status(200).json({message: "API is alive"})
});

app.listen(port, () => console.log(`Server is listening on ${port}`))