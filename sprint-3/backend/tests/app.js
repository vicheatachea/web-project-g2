const connectDB = require("../config/db");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRouter = require("../routes/userRouter");

connectDB();
require("dotenv").config();

app.use(cors()).use(morgan("dev"));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

console.log("connecting to", process.env.MONGO_URI);
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("connected to db");
	})
	.catch((error) => {
		console.error(error);
	});

module.exports = app;
