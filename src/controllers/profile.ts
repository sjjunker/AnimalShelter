import { Request, Response, NextFunction } from "express";
import { GetDatabase } from "../db/connection.ts";
import { ObjectId } from "mongodb";

//Get a user
export async function GetProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = new ObjectId(req.body.id);
    const result = GetDatabase().collection("Users").find({ _id: userId });

    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function UpdateProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //Get the user id from the url
    const userId = new ObjectId(req.params.id);
    let user = await GetDatabase().collection("Users").findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //Get the profile attributes from the req
    const profile = {
      username: user.username,
      googleId: user.googleId,
      petNumber: req.body.petNumber,
      city: req.body.city,
      state: req.body.state,
      familySize: req.body.familySize,
    };

    //Update the profile using the user id and return a response
    const database = GetDatabase();
    const collection = database.collection("Users");

    collection
      .updateOne({ _id: userId }, { $set: profile })
      .then((response) => {
        if (response.modifiedCount > 0) {
          res.status(204).send("Profile updated");
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

export async function DeleteProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //Get the user id from the url
    const userId = new ObjectId(req.params.id);

    //Delete the animal using the animal id and return a response
    const response = await GetDatabase()
      .collection("Users")
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(200).send("User deleted");
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error occurred while deleting user" });
  }
}

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
}
