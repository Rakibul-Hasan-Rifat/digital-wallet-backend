import { Router } from "express";
import userRoute from "../modules/user/user.route";

const route = Router();

const routers = [
    {
        path: "/user",
        module: userRoute
    }
]

routers.forEach(router => {
    route.use(router.path, router.module)
})

export default route;