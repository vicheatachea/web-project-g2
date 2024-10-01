const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const {
	registerUser,
	updateUser,
	loginUser,
	deleteUser,
    fetchUserData,
} = require("../controllers/userController");

// Post register /user/register
router.post("/register", registerUser);

// POST login /user/login
router.post("/login", loginUser);

// GET by ID /user/data
router.get("/data", authenticate, fetchUserData);

// PATCH update by ID /user/update/
router.patch("/update", authenticate, updateUser);

// DELETE by Id /user/delete
router.delete("/delete", authenticate, deleteUser);

module.exports = router;
