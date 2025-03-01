//Get express router
import express from "express";
import {
  animalValidationRules,
  AnimalValidate,
} from "../utilities/validator.ts";
import handleErrors from "../utilities/index.ts";
import {
  CreateAnimal,
  UpdateAnimal,
  DeleteAnimal,
  GetAll,
  GetSingle,
} from "../controllers/animals.ts";

const animalRouter = express.Router();

animalRouter.get("/", handleErrors(GetAll));

animalRouter.get("/:id", handleErrors(GetSingle));

animalRouter.post(
  "/",
  animalValidationRules(),
  AnimalValidate,
  handleErrors(CreateAnimal)
);

animalRouter.put(
  "/:id",
  animalValidationRules(),
  AnimalValidate,
  handleErrors(UpdateAnimal)
);

animalRouter.delete("/:id", handleErrors(DeleteAnimal));

export default animalRouter;
