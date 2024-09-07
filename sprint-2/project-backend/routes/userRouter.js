const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Get All /users
router.get("/", getAllUsers);

// Post new /users
router.post("/", createUser);

// Get by ID /users/:userId
router.get("/:userId", getUserById);

// Put update by ID /users/:userId
router.put("/:userId", updateUser);

// Delete by Id /users/:userId
router.delete("/:userId", deleteUser);

module.exports = router;
