import { UserController } from "../../controllers/UserController";
import { UserRepository } from "../../repositories/UserRepository";

import { Request, Response } from "express";
import { User } from "@prisma/client";
import { prismaMock } from "../../singleton";

describe("UserController", () => {
    const id = 13;
    const email = "email@13.com";
    const username = "whacko13";
    const password = "password13";

    let userController: UserController;
    let userRepository: UserRepository;

    let req: Request;
    let res: Response;

    const mockUser: User = {
        id: id,
        email: email,
        username: username,
        password: password,
    };

    beforeEach(async () => {
        userRepository = new UserRepository();
        userController = new UserController();

        req = { body: { id: id, email: email, username: username, password: password } } as Request;
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        } as any;

        prismaMock.user.create.mockResolvedValue(mockUser);
    });

    afterEach(async () => {
        prismaMock.user.delete.mockResolvedValue(mockUser);
    });

    describe("register", () => {
        test("should create user successfully", async () => {
            jest.spyOn(userRepository, "createUser").mockResolvedValue(mockUser);

            expect(prismaMock.user.create).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith({ message: "User created successfully" });
        });

        test("should return 500 when error occurs", async () => {
            jest.spyOn(userRepository, "createUser").mockRejectedValue(new Error());

            await userController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ message: "Internal server error" });
        });
    });
});
