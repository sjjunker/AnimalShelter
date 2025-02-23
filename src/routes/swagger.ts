const swaggerRouter = require("express").Router();
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";

swaggerRouter.use("/", swaggerUi.serve);
swaggerRouter.get("/", swaggerUi.setup(swaggerDocument));

export default swaggerRouter;
