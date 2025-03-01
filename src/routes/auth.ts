//Import Passport
//Include login, logout, authenticate, etc routes
import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import passport from "passport";
import handleErrors from "../utilities";
import { Login } from "../controllers/auth";

router.get(
  "/google",
  handleErrors(
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
  )
);

router.get("/google/callback", handleErrors(Login));

router.get(
  "/logout",
  handleErrors((req: Request, res: Response, next: NextFunction) => {
    req.logout((err: Error) => {
      if (err) {
        return next(err);
      }
      res.status(200).redirect("/");
    });
  })
);

export default router;
