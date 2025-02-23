//Get express router
import express from "express";
import getName from "../controllers/index.ts";
import authRouter from "./auth.ts";
import animalRouter from "./animals.ts";
import swaggerRouter from "./swagger.ts";
import handleErrors from "../utilities/index.ts";

const router = express.Router();

//TODO:
// Import the login routes
// Import ensure login
// --Use ensure login middleware within each route authentication is needed
// --You don't really need it for the animals route
// --Create a user profile route, and use there

//Get login route
router.use("/auth", handleErrors(authRouter));

//Get Animals routes
router.use("/animals", animalRouter).use("/api-docs", swaggerRouter);

//Get res for application name
router.get("/", handleErrors(getName));

export default router;
