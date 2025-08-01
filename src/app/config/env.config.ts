import { configDotenv } from "dotenv";

configDotenv();

interface EnvironmentVariables {
  PORT: string;
  NODE_ENV: string;
  MONGO_URI: string;
  SALT_ROUND: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
}

const loadEnvVars = (): EnvironmentVariables => {
  const requiredVars = [
    "PORT",
    "NODE_ENV",
    "MONGO_URI",
    "SALT_ROUND",
    "JWT_ACCESS_SECRET",
    "JWT_REFRESH_SECRET",
  ];

  requiredVars.forEach((key) => {
    if (!process.env[key])
      throw new Error(`${key} is not available in '.env' file.`);
  });

  return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as string,
    MONGO_URI: process.env.MONGO_URI as string,
    SALT_ROUND: process.env.SALT_ROUND as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  };
};

const environmentVariables = loadEnvVars();

export default environmentVariables;
