const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const logger = require("./api/utils/logger");

if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: "./api/config/.env" });

const port = process.env.PORT || 5000;

const app = express();
const db = require("knex")({
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "test1234",
    database: process.env.DB_NAME || "courseyard",
  },
  pool: { min: 0, max: 10 },
});

module.exports.db = db;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev", {
    stream: logger.stream,
  })
);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));
  // eslint-disable-next-line no-console
  logger.info("PRODUCTION");
}

app.use("/api/courses", require("./api/components/courses/courses"));
app.use("/api/auth", require("./api/components/auth/auth"));
app.use("/api/favourites", require("./api/components/favourites/favourites"));

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build/index.html"));
  });
}

app.listen(port, (err) => {
  if (err) throw err;
  // eslint-disable-next-line no-console
  logger.info(`Server running on http://localhost:${port}`);
});
