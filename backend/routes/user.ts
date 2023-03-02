import express = require("express");
import UserController from "../controllers/userController";

const userController = new UserController();
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
