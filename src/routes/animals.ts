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

animalRouter.get(
  "/:id",
  handleErrors(GetSingle)
  /* #swagger.parameters['id'] = {
        in: 'string',
        description: 'animal id',
        required: 'true',
        type: 'string',
} */
);

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
  /* #swagger.parameters['id'] = {
        in: 'string',
        description: 'animal id',
        required: 'true',
        type: 'string',
} */
);

animalRouter.delete(
  "/:id",
  handleErrors(DeleteAnimal)
  /* #swagger.parameters['id'] = {
        in: 'string',
        description: 'animal id',
        required: 'true',
        type: 'string',
} */
);

export default animalRouter;
