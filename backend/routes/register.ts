import express = require("express");
import UserController from "../controllers/userController";

const userController = new UserController();
const router = express.Router();

router.post("/register", userController.register);

export default router;
