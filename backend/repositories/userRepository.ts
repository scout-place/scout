import bcrypt = require("bcrypt");
import { PrismaClient, User } from "@prisma/client";
import { Waitlist } from "@prisma/client";

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

	async takeOffWaitlist(): Promise<void> {
		await prisma.waitlist.delete({
			where: {
				position: 1,
			},
		});

		await prisma.waitlist.updateMany({
			where: {
				position: {
					gt: 1,
				},
			},
			data: {
				position: {
					decrement: 1,
				},
			},
		});
	}

	async addToWaitlist(email: string, fullname: string): Promise<Waitlist> {
		const highestPosition: number | null = await prisma.waitlist
			.aggregate({ _max: { position: true } })
			.then((result) => result._max.position);

		return prisma.waitlist.create({
			data: {
				email,
				fullname,
				position: (highestPosition ? highestPosition : 0) + 1,
			},
		});
	}

	async removeFromWaitlist(email: string): Promise<void> {
		const pos = await prisma.waitlist.findUnique({
			where: {
				email: email,
			},
		});

		await prisma.waitlist.delete({
			where: {
				email: email,
			},
		});

		if (!pos) {
			return;
		} else {
			await prisma.waitlist.updateMany({
				where: {
					position: {
						gt: pos?.position
					}
				},
				data: {
					position: {
						decrement: 1,
					},
				},
			});
		}
	}
}
