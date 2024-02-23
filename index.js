const express = require("express");
const app = express();

//to read .env file (npm i dotenv)
require("dotenv").config();

const connectedToDB = require("./config/db");

//connection to database
connectedToDB();

// Middleware
app.use(express.json());

// Routes
// const userRouter = require("./routes/user");
// const postRouter = require("./routes/post");
app.use("/api/users", require("./routes/user"));
app.use("/api/posts", require("./routes/post"));

//Running the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Server is Running in ${process.env.NODE_ENVIRONMENT} mode on port ${PORT}`
  );
});
