import { Request, Response, NextFunction } from "express";

//Get the name of web application
export default function getName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.send("<html><body><h1>Animal Shelter</h1></body></html>");
    res.status(200);
  } catch (error) {
    res.status(500).json(error);
  }
}
