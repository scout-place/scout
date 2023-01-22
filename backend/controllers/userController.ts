import bcrypt = require("bcrypt");

import { Request, Response } from "express";
import { User } from "@prisma/client";
import { UserRepository } from "../repositories/UserRepository";

const userRepository = new UserRepository();

export class UserController {
    async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, username, password } = req.body;
            await userRepository.createUser({ email, username, password });
            res.status(201).send({ message: "User created successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const user = await userRepository.getUserByEmail(email);

            if (!user) {
                return res.status(400).send({ message: "Invalid email or password" });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(400).send({ message: "Invalid email or password" });
            }

            return res.status(200).send({ message: "Login successful" });
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Internal server error" });
        }
    }
}

export default UserController;
