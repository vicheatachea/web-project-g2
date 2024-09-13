const express = require("express");
const router = express.Router();
const {
	createUser,
	updateUser,
	deleteUser,
} = require("../controllers/userController");

// Post new /users
router.post("/", createUser);

// Put update by ID /users/:userId
router.patch("/", updateUser);

// Delete by Id /users/:userId
router.delete("/", deleteUser);

module.exports = router;
