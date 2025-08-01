import jwt, { JwtPayload } from "jsonwebtoken";

export const generateToken = (payload: JwtPayload, secretKey: string) => {
    const token = jwt.sign(payload, secretKey);
    return token;
}

export const verifyToken = (token: string, secretKey: string) => {
    const verifiedToken = jwt.verify(token, secretKey);
    return verifiedToken;
}