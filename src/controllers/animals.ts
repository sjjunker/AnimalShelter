import { Request, Response, NextFunction } from "express";
import { GetDatabase } from "../db/connection.ts";
import { ObjectId } from "mongodb";

//Create a new animal
export async function CreateAnimal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //Get animal attributes from the req
    const animal = {
      name: req.body.name,
      species: req.body.species,
      breed: req.body.breed,
      age: req.body.age,
      constitution: req.body.constitution,
      gender: req.body.gender,
    };

    //Get the collection from the database
    const database = GetDatabase();
    const collection = database.collection("Animals");

    //Add the animal to the collection and return a response
    collection.insertOne(animal).then((response) => {
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json("Error occurred while creating animal");
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

//Update animal
export async function UpdateAnimal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //Get the animal id from the url
    const animalId = new ObjectId(req.params.id);

    //Get the animal attributes from the req
    const animal = {
      name: req.body.name,
      species: req.body.species,
      breed: req.body.breed,
      age: req.body.age,
      constitution: req.body.constitution,
      gender: req.body.gender,
    };

    //Update the animal using the animal id and return a response
    const database = GetDatabase();
    const collection = database.collection("Animals");

    collection
      .updateOne({ _id: animalId }, { $set: animal })
      .then((response) => {
        if (response.modifiedCount > 0) {
          res.status(204).send("Animal updated");
        } else {
          console.log(response);
          res.status(500).json(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function DeleteAnimal(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //Get the animal id from the url
    const animalId = new ObjectId(req.params.id);

    //Delete the animal using the animal id and return a response
    const response = await GetDatabase()
      .collection("Animals")
      .deleteOne({ _id: animalId });

    if (response.deletedCount > 0) {
      res.status(204).send("Animal deleted");
    } else {
      res.status(404).json("Animal not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occurred while deleting animal" });
  }
}

//Get all the animals
export async function GetAll(req: Request, res: Response, next: NextFunction) {
  try {
    const result = GetDatabase().collection("Animals").find();

    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

//Get a single animal using url parameter
export async function GetSingle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const animalId = new ObjectId(req.params.id);
    const result = GetDatabase().collection("Animals").find({ _id: animalId });

    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(404).json(error);
  }
}
