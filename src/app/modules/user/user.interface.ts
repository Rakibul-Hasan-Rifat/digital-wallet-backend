import { Schema } from "mongoose"

export enum Role {
    ADMIN = "ADMIN",
    AGENT = "AGENT",
    USER = "USER"
}

export interface AuthProvider {
    provider: string
    providerId: string
}

interface IUser {
    _id?: Schema.Types.ObjectId
    name: string
    email: string
    password?: string
    phone?: string
    role: Role
    isActive: boolean
    balance: number
    walletId?: Schema.Types.ObjectId
    authProvider: AuthProvider[]
}

export default IUser;