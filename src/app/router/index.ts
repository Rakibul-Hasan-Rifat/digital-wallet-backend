import { Router } from "express";
import userRoute from "../modules/user/user.route";
import authRoute from "../modules/auth/auth.route";
import walletRoute from "../modules/wallet/wallet.route";

const route = Router();

const routers = [
    {
        path: "/user",
        module: userRoute
    },
    {
        path: "/auth",
        module: authRoute
    },
    {
        path: "/wallet",
        module: walletRoute
    }
]

routers.forEach(router => {
    route.use(router.path, router.module)
})

export default route;