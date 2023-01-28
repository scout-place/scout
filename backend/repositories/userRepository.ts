import bcrypt = require("bcrypt");
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
	async createUser(data: { email: string; username: string; password: string }): Promise<User> {
		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = await bcrypt.hash(data.password, salt);

		return prisma.user
			.create({
				data: {
					...data,
					password: hashedPassword,
				},
			})
			.then((res) => res);
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
