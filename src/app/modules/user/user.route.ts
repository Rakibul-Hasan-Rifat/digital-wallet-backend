import { Router } from "express";
import userControllers from "./user.controller";
import requestValidator from "../../middlewares/requestValidator";
import { userZodSchemaToCreate } from "./user.validation";

const userRoute = Router();

userRoute.post("/register", requestValidator(userZodSchemaToCreate), userControllers.createUserController);
userRoute.get("/all-users", userControllers.getAllUsersController);
userRoute.patch("/:id", userControllers.updateUserController);
userRoute.delete("/:id", userControllers.deleteUserController);

export default userRoute;