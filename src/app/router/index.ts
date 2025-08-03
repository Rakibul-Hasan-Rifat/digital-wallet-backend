import { Router } from "express";
import userRoute from "../modules/user/user.route";
import authRoute from "../modules/auth/auth.route";
import walletRoute from "../modules/wallet/wallet.route";
import transactionRoute from "../modules/transaction/transaction.route";

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
    },
    {
        path: "/transaction",
        module: transactionRoute
    }
]

routers.forEach(router => {
    route.use(router.path, router.module)
})

export default route;