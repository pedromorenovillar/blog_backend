import { config } from "dotenv";
import express from "express";
import cors from "cors";
import passport from "./config/passport.js";
import cookieParser from "cookie-parser";
import { usersRouter } from "./routes/usersRouter.js";
import { postsRouter } from "./routes/postsRouter.js";
import { commentsRouter } from "./routes/commentsRouter.js";

/* ===========================
   App config 1/2
=========================== */

config(); // <-- Load .env variables from dotenv module
const PORT = process.env.PORT;
const app = express(); // <-- Initialize express

app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    credentials: true,
  }),
); // <-- Allow cors
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
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/comments", commentsRouter);

/* ===========================
   App config 2/2
=========================== */

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    message: err.message,
  });
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening on port ${PORT}.`);
});
