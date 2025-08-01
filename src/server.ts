/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import {Server} from "http";
import mongoose from "mongoose";
import environmentVariables from "./app/config/env.config";
import app from "./app";

let server: Server;

const startServer = async () => {
    try {
        
        await mongoose.connect(environmentVariables.MONGO_URI);
        console.log("The store is connected successfully!");

        server = app.listen(environmentVariables.PORT, () => {
            console.log(`The app is running at http://localhost:${environmentVariables.PORT}`);            
        })
        
    } catch (error: any) {
        console.log(error);
        throw new Error(error.message)
    }
}

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection Error", err);
    
    if(server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
})

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection Error", err);
    
    if(server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
})

process.on("SIGTERM", (err) => {
    console.log("Signal Termination", err);
    
    if(server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
})

process.on("SIGINT", (err) => {
    console.log("Signal Initiliazided", err);
    
    if(server) {
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
})

startServer();