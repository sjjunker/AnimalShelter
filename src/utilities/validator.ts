import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

//Rules
export function animalValidationRules() {
  return [
    body("name").trim().notEmpty().escape().withMessage("Name is required."),

    body("species")
      .trim()
      .notEmpty()
      .escape()
      .isAlpha()
      .withMessage("Species is required."),

    body("breed")
      .trim()
      .notEmpty()
      .escape()
      .isAlpha()
      .withMessage("Breed is required."),

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
  const { name, species, breed, age, constitution, gender } = req.body;

  let errors: any = [];

  errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  next();
}

//Rules
export function ProfileValidationRules() {
  return [
    body("petNumber")
      .trim()
      .notEmpty()
      .escape()
      .isInt()
      .withMessage("Pet number is required."),

    body("city")
      .trim()
      .notEmpty()
      .escape()
      .isAlpha()
      .withMessage("City is required."),

    body("state")
      .trim()
      .notEmpty()
      .escape()
      .isAlpha()
      .withMessage("State is required."),

    body("familySize")
      .trim()
      .notEmpty()
      .escape()
      .isInt()
      .withMessage("Family size is required."),
  ];
}

//Validation
export function ProfileValidate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { petNumber, cit, state, familySize } = req.body;

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
