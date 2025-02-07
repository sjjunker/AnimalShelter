//Get express router
import express from "express";
import getName from "../controllers/index.ts";
import animalRouter from "./animals.ts";
import swaggerRouter from "./swagger.ts";

const router = express.Router();

//Get Animals routes
router.use("/animals", animalRouter).use("/api-docs", swaggerRouter);

//Get res for application name
router.get("/", getName);

export default router;
