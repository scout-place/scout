import express = require("express");
import WaitlistController from "../controllers/waitlistController";

const waitlistController = new WaitlistController();
const router = express.Router();

router.post("/addToWaitlist", waitlistController.addToWaitlist);
router.post("/removeTopWaitlist", waitlistController.removeTopWaitlist);
router.post("/removeFromWaitlist", waitlistController.removeFromWaitlist);

export default router;
