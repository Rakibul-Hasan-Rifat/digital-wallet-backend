import { Router } from "express";
import { Role } from "../user/user.interface";
import checkAuth from "../../middlewares/checkAuth";
import transactionControllers from "./transaction.controller";
import requestValidator from "../../middlewares/requestValidator";
import { transactionZodSchemaToCreate } from "./transaction.validation";

const transactionRoute = Router();

transactionRoute.get(
  "/",
  checkAuth(Role.ADMIN),
  transactionControllers.getAllTransactionController
);

transactionRoute.get(
  "/:id",
  checkAuth(Role.AGENT, Role.USER),
  transactionControllers.getMyTransactionController
);

transactionRoute.post(
  "/create",
  checkAuth(Role.USER, Role.AGENT),
  requestValidator(transactionZodSchemaToCreate),
  transactionControllers.createTransactionController
);

export default transactionRoute;
