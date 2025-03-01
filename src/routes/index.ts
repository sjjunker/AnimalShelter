//Get express router
import express from "express";
import getName from "../controllers/index.ts";
import authRouter from "./auth.ts";
import animalRouter from "./animals.ts";
import swaggerRouter from "./swagger.ts";
import employeeRouter from "./employees.ts";

const router = express.Router();

router.get("/", getName);

router.use("/animals", animalRouter);

router.use("/auth", authRouter);

router.use("/employees", employeeRouter);

router.use("/api-docs", swaggerRouter);

export default router;
