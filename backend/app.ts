import express = require("express");

import userRouter from "./routes/user";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRouter);

app.get("/", (_, res) => {
	res.status(200).send("Hello world");
});

app.set("port", process.env.PORT || port);

export default app;
