import bcrypt = require("bcrypt");
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
    async createUser(data: { email: string; username: string; password: string }): Promise<User> {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
}
