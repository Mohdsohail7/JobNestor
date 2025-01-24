const express = require("express");
const cors = require("cors");
const { connectDB } = require("./database/init");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json())

// database connection
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on the port: ${PORT}`);
});
