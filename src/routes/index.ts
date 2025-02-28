//Get express router
import express from "express";
import getName from "../controllers/index.ts";
import authRouter from "./auth.ts";
import animalRouter from "./animals.ts";
import swaggerRouter from "./swagger.ts";
import handleErrors from "../utilities/index.ts";
import profileRouter from "./profile.ts";

const router = express.Router();

//Get profile route
router.use("/profile", handleErrors(profileRouter), () => {
  swaggerRouter.security = [
    {
      OAuth2: ["read", "write"],
    },
  ];
});

//Get authorization route
router.use("/auth", handleErrors(authRouter));

//Get Animals routes
router.use("/animals", handleErrors(animalRouter));

//Get res for application name
router.get("/", handleErrors(getName));

router.use("/api-docs", handleErrors(swaggerRouter));

export default router;
