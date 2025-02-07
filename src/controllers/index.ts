import { Request, Response } from "express";

//Get the name of web application
export default function getName(req: Request, res: Response) {
  res.send("<html><body><h1>Animal Shelter</h1></body></html>");
}
