import { Router } from "express";
import {
  walletZodSchemaToAddMoney,
  walletZodSchemaToCreate,
  walletZodSchemaToUpdate,
} from "./wallet.validation";
import requestValidator from "../../middlewares/requestValidator";
import walletControllers from "./wallet.controller";
import checkAuth from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const walletRoute = Router();

walletRoute.get("/", walletControllers.getWalletController);

walletRoute.post(
  "/create",
  requestValidator(walletZodSchemaToCreate),
  walletControllers.createWalletController
);

walletRoute.patch(
  "/add-money/:id",
  checkAuth(Role.USER, Role.AGENT),
  requestValidator(walletZodSchemaToAddMoney),
  walletControllers.addMoneyToWalletController
);

walletRoute.patch(
  "/withdraw-money/:id",
  checkAuth(Role.USER, Role.AGENT),
  requestValidator(walletZodSchemaToAddMoney),
  walletControllers.withdrawMoneyFromWalletController
);

walletRoute.patch(
  "/:id",
  requestValidator(walletZodSchemaToUpdate),
  walletControllers.updateWalletController
);

walletRoute.delete("/:id", walletControllers.updateWalletController);

export default walletRoute;
