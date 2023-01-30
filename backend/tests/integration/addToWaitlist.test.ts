// addToWaitlist.test.ts
import request = require("supertest");
import app from "../../app";

describe("/addToWaitlist", () => {
	it("adds a user to the waitlist", async () => {
		const res = await request(app)
			.post("/api/v1/addToWaitlist")
			.send({ email: "test@testmail.com", fullname: "John Doe" });

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("message", "Added to waitlist");

		// Need to now remove this user, so test will work next time
		await request(app).post("/api/v1/removeFromWaitlist").send({ email: "test@testmail.com" });
	});

	it("returns an error if name is missing", async () => {
		const res = await request(app).post("/api/v1/addToWaitlist").send({});

		expect(res.statusCode).toEqual(500);
		expect(res.body).toHaveProperty("message", "Internal server error");
	});
});
