export enum Role {
    ADMIN = "ADMIN",
    AGENT = "AGENT",
    USER = "USER"
}

export interface AuthProvider {
    provider: string
    providerId: string
}

export enum AgentStatus {
    SUSPENDED = "SUSPENDED",
    APPROVED = "APPROVED"
}

interface IUser {
    _id?: string
    name: string
    email: string
    password?: string
    phone?: string
    role: Role
    isActive: boolean
    authProvider: AuthProvider[]
    agentStatus?: AgentStatus
}

export default IUser;