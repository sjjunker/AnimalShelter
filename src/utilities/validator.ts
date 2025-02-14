import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

//Rules
export function contactValidationRules() {
  return [
    body("name").trim().notEmpty().escape().withMessage("Name is required."),

    body("species")
      .trim()
      .notEmpty()
      .escape()
      .isAlpha()
      .withMessage("Species is required."),

    body("age")
      .trim()
      .isLength({ max: 3 })
      .escape()
      .isInt()
      .withMessage("Age is required: Age must be a number."),

    body("constitution")
      .trim()
      .notEmpty()
      .escape()
      .isAlpha()
      .withMessage(
        "Constitution is required: Please provide a behavioral description of animal."
      ),

    body("gender")
      .trim()
      .escape()
      .isIn(["M", "F"])
      .withMessage("Gender is required: Type M or F."),
  ];
}

//Validation
export function validate(req: Request, res: Response, next: NextFunction) {
  const { name, species, age, constitution, gender } = req.body;

  let errors: any = [];

  errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  next();
}
function withMessage(
  arg0: string
): import("express-validator/lib/options").IsEmptyOptions | undefined {
  throw new Error("Function not implemented.");
}
