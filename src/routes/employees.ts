//Get express router
import express from "express";
import {
  EmployeeValidationRules,
  EmployeeValidate,
} from "../utilities/validator.ts";
import handleErrors from "../utilities/index.ts";
import {
  CreateEmployee,
  UpdateEmployee,
  DeleteEmployee,
  GetAll,
  GetSingle,
} from "../controllers/employees.ts";
import { isAuthenticated } from "../controllers/auth.ts";

const employeeRouter = express.Router();

employeeRouter.get("/", isAuthenticated, handleErrors(GetAll));

employeeRouter.get("/:id", isAuthenticated, handleErrors(GetSingle));

employeeRouter.post(
  "/",
  isAuthenticated,
  EmployeeValidationRules(),
  EmployeeValidate,
  handleErrors(CreateEmployee)
);

employeeRouter.put(
  "/:id",
  isAuthenticated,
  EmployeeValidationRules(),
  EmployeeValidate,
  handleErrors(UpdateEmployee)
);

employeeRouter.delete("/:id", isAuthenticated, handleErrors(DeleteEmployee));

export default employeeRouter;
