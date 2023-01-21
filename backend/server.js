import app from "./app";

const server = app.listen(() => {
  console.log(
    "backend is running."
  );
});

module.exports = server;