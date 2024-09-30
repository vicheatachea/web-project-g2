const connectDB = require("./config/db");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const spotifyRouter = require("./routes/spotifyRouter");


connectDB();
require ("dotenv").config();

app.use(cors())
    .use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connects to MongoDB and authenticates the user
app.use("/api/user", userRouter);

// Connects to Spotify API
app.use("/api/spotify", spotifyRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
