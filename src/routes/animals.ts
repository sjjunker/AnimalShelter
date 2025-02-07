//Get express router
import express from "express";
const animalRouter = express.Router();

//Get controller
import {
  CreateAnimal,
  UpdateAnimal,
  DeleteAnimal,
  GetAll,
  GetSingle,
} from "../controllers/animals.ts";

//Get res for each controller option
animalRouter.get("/", GetAll);
animalRouter.get("/:id", GetSingle);

//POST, PUT, DELETE methods
animalRouter.post("/", CreateAnimal);
animalRouter.put("/:id", UpdateAnimal);
animalRouter.delete("/:id", DeleteAnimal);

export default animalRouter;
