const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");

app.use("/users", userRouter);

const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
