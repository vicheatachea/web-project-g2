const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/userRouter");
const spotifyRouter = require("./routes/spotifyRouter");
require ("dotenv").config();

app.use(cors())
    .use(morgan("dev"));

app.use(express.json());

// Connects to MongoDB and authenticates the user
app.use("/api/user", userRouter);

// Connects to Spotify API
app.use("/api/spotify", spotifyRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
