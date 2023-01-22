import { Request, Response } from "express";
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
}

export default UserController;
