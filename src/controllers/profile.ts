import { Request, Response, NextFunction } from "express";
import { GetDatabase } from "../db/connection.ts";
import { ObjectId } from "mongodb";

//Get a profile
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
