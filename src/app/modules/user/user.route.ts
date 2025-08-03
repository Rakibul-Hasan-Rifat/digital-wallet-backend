import { Router } from "express";
import userControllers from "./user.controller";
import requestValidator from "../../middlewares/requestValidator";
import { userZodSchemaToCreate, userZodSchemaToUpdate } from "./user.validation";
import checkAuth from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const userRoute = Router();

userRoute.post("/register", requestValidator(userZodSchemaToCreate), userControllers.createUserController);
userRoute.get("/all-users", checkAuth(Role.ADMIN), userControllers.getAllUsersController);
userRoute.get("/all-agents", checkAuth(Role.ADMIN), userControllers.getAllAgentsController);
userRoute.patch("/:id", checkAuth(Role.ADMIN, Role.USER), requestValidator(userZodSchemaToUpdate), userControllers.updateUserController);
userRoute.delete("/:id", userControllers.deleteUserController);

export default userRoute;