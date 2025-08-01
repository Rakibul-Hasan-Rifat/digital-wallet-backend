import { Router } from "express";
import authControllers from "./auth.controller";

const authRoute = Router();

authRoute.post("/login", authControllers.authCredentialsLoginController);
authRoute.post("/logout", authControllers.logoutController);

export default authRoute;