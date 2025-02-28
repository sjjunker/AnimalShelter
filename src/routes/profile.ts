import express from "express";
const router = express.Router();
import {
  GetProfile,
  UpdateProfile,
  DeleteProfile,
  checkAuth,
} from "../controllers/profile";
import {
  ProfileValidate,
  ProfileValidationRules,
} from "../utilities/validator";
import handleErrors from "../utilities";

router.get("/:id", checkAuth, handleErrors(GetProfile));

router.put(
  "/:id",
  checkAuth,
  ProfileValidationRules(),
  ProfileValidate,
  handleErrors(UpdateProfile)
);

router.delete("/:id", checkAuth, handleErrors(DeleteProfile));

export default router;
