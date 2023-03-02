import { Request, Response } from "express";
import { logger } from "../core/logger/logger";
import { UserRepository } from "../repositories/userRepository";
import { WaitlistRepository } from "../repositories/waitlistRepository";

const waitlistRepository = new WaitlistRepository();
const userRepository = new UserRepository();

export class WaitlistController {
	async addToWaitlist(req: Request, res: Response): Promise<Response> {
		try {
			const { email, fullname } = req.body;
			const user = await userRepository.getUserByEmail(email);

			if (user) {
				return res.status(400).send({ message: "Already a user" });
			}

			await waitlistRepository.addToWaitlist(email, fullname);
			return res.status(200).send({ message: "Added to waitlist" });
		} catch (error) {
			console.error(error);
			logger.error(`User: ${req.body.email} not added to waitlist!`);
			return res.status(500).send({ message: "Internal server error" });
		}
	}

	async removeTopWaitlist(_: Request, res: Response): Promise<Response> {
		try {
			await waitlistRepository.takeOffWaitlist();
			return res.status(200).send({ message: "Removed first person off waitlist" });
		} catch (error) {
			console.error(error);
			logger.error("Not removed from waitlist.");
			return res.status(500).send({ message: "Internal server error" });
		}
	}

	async removeFromWaitlist(req: Request, res: Response): Promise<Response> {
		try {
			const email = req.body.email;
			await waitlistRepository.removeFromWaitlist(email);
			return res.status(200).send({ message: `Removed ${email} off waitlist` });
		} catch (error) {
			console.error(error);
			logger.error(`Did not remove ${req.body.email} from wailist`);
			return res.status(500).send({ message: "Internal server error" });
		}
	}
}

export default WaitlistController;
