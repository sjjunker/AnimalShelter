import { NextFunction, Request, Response } from "express";
import express from "express";
import { InitializeDatabase } from "./db/connection.ts";
import bodyParser from "body-parser";
import env from "dotenv";
import router from "./routes/index.ts";
import passport from "passport";
import cookieSession from "cookie-session";

env.config({ path: "AnimalShelter" + "/.env" });

const app = express();
const port = process.env.PORT || 8080;
const host = process.env.HOST || "localhost";

//Middleware
//Cookie Session
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [
      process.env.COOKIE_KEY || "Not the",
      process.env.COOKIE_KEY_TWO || "env keys.",
    ],
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Get the router
app
  .use(bodyParser.json())
  .use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", router);

//Initialize the database
InitializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${host}:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Error initializing database:", error);
  });
