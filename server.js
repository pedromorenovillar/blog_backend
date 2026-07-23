import { config } from "dotenv";
import express from "express";
import cors from "cors";
import passport from "./config/passport.js";
import cookieParser from "cookie-parser";
import { usersRouter } from "./routes/usersRouter.js";

/* ===========================
   App config 1/2
=========================== */

config(); // <-- Load .env variables from dotenv module
const PORT = process.env.PORT;
const app = express(); // <-- Initialize express

app.use(cors()); // <-- Allow cors
app.use(express.json()); // <-- Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // <-- Parse the data into req.body for post requests
app.use(passport.initialize());
app.use(cookieParser());

/* ===========================
   App routes
=========================== */

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});
app.use("/users", usersRouter);

/* ===========================
   App config 2/2
=========================== */

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening on port ${PORT}.`);
});
