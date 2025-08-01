import { configDotenv } from "dotenv";

configDotenv();

interface EnvironmentVariables {
    MONGO_URI: string
    PORT: string
    NODE_ENV: string
}

const loadEnvVars = (): EnvironmentVariables => {

    const requiredVars = ["PORT", "NODE_ENV", "MONGO_URI"];

    requiredVars.forEach(key => {
        if(!process.env[key]) throw new Error(`${key} is not available in '.env' file.`)
    })

    return {
        PORT: process.env.PORT as string,
        NODE_ENV: process.env.NODE_ENV as string,
        MONGO_URI: process.env.MONGO_URI as string,
    }
}

const environmentVariables = loadEnvVars();

export default environmentVariables;