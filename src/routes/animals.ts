//Get express router
import express from "express";
import { animalValidationRules, validate } from "../utilities/validator.ts";
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
  animalValidationRules(),
  validate,
  handleErrors(CreateAnimal)
);

animalRouter.put(
  "/:id",
  animalValidationRules(),
  validate,
  handleErrors(UpdateAnimal)
);

animalRouter.delete("/:id", handleErrors(DeleteAnimal));

export default animalRouter;
