const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const spotifyRouter = require("./routes/spotifyRouter");

app.use(express.json());

// Placeholder
app.use("/users", userRouter);

// Connects to Spotify API
app.use("/spotify", spotifyRouter);

const port = 4000; // This should probably match the frontend port once they are together

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
