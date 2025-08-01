import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import route from "./app/router";
import notFound from "./app/middlewares/notFound";
import globalError from "./app/middlewares/globalError";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", route);

app.get("/", (req: Request, res: Response) => {
    res.json({message: "Welcome the world of Digital-Wallet-Backend!"})
})

app.use(globalError)

app.use(notFound)

export default app;