const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/userRouter");
const spotifyRouter = require("./routes/spotifyRouter");

const app = express();

connectDB();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Placeholder
app.use("/users", userRouter);

// Connects to Spotify API
app.use("/spotify", spotifyRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
