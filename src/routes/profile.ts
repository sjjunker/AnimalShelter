import express from "express";
const router = express.Router();
import { GetProfile, checkAuth } from "../controllers/profile";
import handleErrors from "../utilities";

router.get("/", checkAuth, handleErrors(GetProfile));

export default router;
