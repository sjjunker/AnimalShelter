//Get express router
import express from "express";
import { contactValidationRules, validate } from "../utilities/validator.ts";
import handleErrors from "../utilities/index.ts";
import {
  CreateAnimal,
  UpdateAnimal,
  DeleteAnimal,
  GetAll,
  GetSingle,
} from "../controllers/animals.ts";

const animalRouter = express.Router();

//Get res for each controller option
animalRouter.get("/", handleErrors(GetAll));
animalRouter.get("/:id", handleErrors(GetSingle));

//POST, PUT, DELETE methods
animalRouter.post(
  "/",
  contactValidationRules(),
  validate,
  handleErrors(CreateAnimal)
);

animalRouter.put(
  "/:id",
  contactValidationRules(),
  validate,
  handleErrors(UpdateAnimal)
);

animalRouter.delete("/:id", handleErrors(DeleteAnimal));

export default animalRouter;
