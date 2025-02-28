//Import Passport
//Include login, logout, authenticate, etc routes
import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import passport from "passport";
import handleErrors from "../utilities";

//Consent Screen
router.get(
  "/google",
  handleErrors(
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
  )
);

//Redirect
router.get(
  "/google/redirect",
  handleErrors(passport.authenticate("google")),
  (req: Request, res: Response) => {
    res.redirect("/profile");
  }
);

//Logout
router.get(
  "/logout",
  handleErrors((req: Request, res: Response, next: NextFunction) => {
    req.logout((err: Error) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  })
);

export default router;
