const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const {
	registerUser,
	updateUser,
	loginUser,
	deleteUser,
} = require("../controllers/userController");

// Post register /user/register
router.post("/register", registerUser);

// POST login /user/login
router.post("/login", loginUser);

// PATCH update by ID /user/update/
router.patch("/update", authenticate, updateUser);

// DELETE by Id /user/delete
router.delete("/delete", authenticate, deleteUser);

module.exports = router;
