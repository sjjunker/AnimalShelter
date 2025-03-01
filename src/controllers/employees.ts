import { Request, Response, NextFunction } from "express";
import { GetDatabase } from "../db/connection.ts";
import { ObjectId } from "mongodb";

//Create a new employee
export async function CreateEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //Get employee attributes from the req
    const employee = {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      position: req.body.position,
    };

    //Get the collection from the database
    const database = GetDatabase();
    const collection = database.collection("Employees");

    //Add the employee to the collection and return a response
    collection.insertOne(employee).then((response) => {
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json("Error occurred while creating employee");
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

//Update employee
export async function UpdateEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //Get the employee id from the url
    const employeeId = new ObjectId(req.params.id);

    //Get the employee attributes from the req
    const employee = {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      position: req.body.position,
    };

    //Update the employee using the employee id and return a response
    const database = GetDatabase();
    const collection = database.collection("Employees");

    collection
      .updateOne({ _id: employeeId }, { $set: employee })
      .then((response) => {
        if (response.modifiedCount > 0) {
          res.status(204).send("employee updated");
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

export async function DeleteEmployee(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //Get the employee id from the url
    const employeeId = new ObjectId(req.params.id);

    //Delete the employee using the employee id and return a response
    const response = await GetDatabase()
      .collection("Employees")
      .deleteOne({ _id: employeeId });

    if (response.deletedCount > 0) {
      res.status(200).send("employee deleted");
    } else {
      res.status(404).json("employee not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occurred while deleting employee" });
  }
}

//Get all the employees
export async function GetAll(req: Request, res: Response, next: NextFunction) {
  try {
    const result = GetDatabase().collection("Employees").find();

    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

//Get a single employee using url parameter
export async function GetSingle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const employeeId = new ObjectId(req.params.id);
    const result = GetDatabase()
      .collection("Employees")
      .find({ _id: employeeId });

    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error);
  }
}
