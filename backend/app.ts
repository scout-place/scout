import express = require("express");

const app = express();
const port = 3000;

app.get("/", (_, res) => {
	res.status(200).send("Hello world");
});

app.set("port", process.env.PORT || port);

export default app;
