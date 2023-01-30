import bcrypt = require("bcrypt");

import { Request, Response } from "express";
import { logger } from "../core/logger/logger";
import { UserRepository } from "../repositories/UserRepository";

const userRepository = new UserRepository();

export class UserController {
	async register(req: Request, res: Response): Promise<void> {
		try {
			const { email, username, password } = req.body;
			await userRepository.createUser({ email, username, password });
			logger.info(`New user entry created with username: ${username}`);
			res.status(201).send({ message: "User created successfully" });
		} catch (error) {
			console.error(error);
			logger.error(`User: ${req.body.username} not created!`);
			res.status(500).send({ message: "Internal server error" });
		}
	}

	async login(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = req.body;
			const user = await userRepository.getUserByEmail(email);

			if (!user) {
				logger.error("User does not exist");
				return res.status(400).send({ message: "Invalid email or password" });
			}

			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				logger.error("Password is wrong");
				return res.status(400).send({ message: "Invalid email or password" });
			}
			logger.info(`${email} logged in successfully`);
			return res.status(200).send({ message: "Login successful" });
		} catch (error) {
			logger.error(error);
			return res.status(500).send({ message: "Internal server error" });
		}
	}

	async addToWaitlist(req: Request, res: Response): Promise<Response> {
		try {
			const { email, fullname } = req.body;
			const user = await userRepository.getUserByEmail(email);

			if (user) {
				return res.status(400).send({ message: "Already a user" });
			}

			await userRepository.addToWaitlist(email, fullname);
			return res.status(200).send({ message: "Added to waitlist" });
		} catch (error) {
			console.error(error);
			logger.error(`User: ${req.body.email} not added to waitlist!`);
			return res.status(500).send({ message: "Internal server error" });
		}
	}

	async removeTopWaitlist(_: Request, res: Response): Promise<Response> {
		try {
			await userRepository.takeOffWaitlist();
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
			await userRepository.removeFromWaitlist(email);
			return res.status(200).send({ message: `Removed ${email} off waitlist` });
		} catch (error) {
			console.error(error);
			logger.error(`Did not remove ${req.body.email} from wailist`);
			return res.status(500).send({ message: "Internal server error" });
		}
	}
}

export default UserController;
