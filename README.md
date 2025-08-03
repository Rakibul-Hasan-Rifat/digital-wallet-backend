# 💸 Digital Wallet Backend

This is a secure and scalable backend API for a **Digital Wallet System**, built using **Node.js**, **Express**, **MongoDB (Mongoose)**, and **TypeScript**. It supports multiple user roles (`user`, `agent`, `admin`) with role-based authorization, real-time wallet operations, and comprehensive transaction logging.

---

## 🌟 Core Features

- **JWT Authentication** for login and protected routes
- **Role-Based Route Access** (`user`, `agent`, `admin`)
- **Auto Wallet Creation** during user registration (default balance: ৳50)
- **Robust Transaction System**: Top-up, Withdraw, Send, Cash-in, Cash-out
- **Full Transaction Logging** with initiator and wallet references
- **Admin Control Panel** for managing users, agents, wallets, and policies
- **Reusable Error Handling & Response Layers**
- **Modular Architecture** for clean separation of concerns

---

## 🧑‍💼 Role-Based Operations

The system is designed with strict role-based access control (RBAC), allowing distinct financial actions based on authenticated roles: `user`, `agent`, and `admin`.

| 💼 Operation     | 🧑 Allowed Roles   | 📝 Description                                                               |
|------------------|---------------------|-------------------------------------------------------------------------------|
| **Top-Up**       | `User`              | Users can fund their own wallets via top-up endpoints.                        |
| **Withdraw**     | `User`, `Agent`     | Allows both users and agents to withdraw balance to external sources.         |
| **Send Money**   | `User`              | Peer-to-peer money transfer between users. Requires validation and balance.   |
| **Cash-In**      | `Agent`             | Agent deposits physical cash into a user's wallet via an authorized endpoint. |
| **Cash-Out**     | `Agent`             | Agent converts user wallet balance into physical cash.                        |
| **Admin Control**| `Admin`             | Manage wallets, suspend accounts, monitor all activities and transactions.    |

> 🔐 All operations are protected with middleware (`checkAuth`) and validated using request schemas. Each transaction is logged with `initiator`, `wallet`, and timestamp fields to maintain a comprehensive audit trail.


---

## 🧱 Folder Structure

```bash
src/
├── app/
│   ├── modules/
│   │   ├── auth/             # Auth routes, controllers, validations
│   │   ├── user/             # User-specific logic and handlers
│   │   ├── wallet/           # Wallet model, operations, controller
│   │   └── transaction/      # Transaction creation, history, validation
│   ├── middlewares/
│   │   ├── checkAuth.ts          # JWT verification & role protection
│   │   ├── globalError.ts        # Centralized error handler
│   │   ├── notFound.ts           # 404 catch-all middleware
│   │   └── requestValidation.ts  # Joi/Zod-based payload validation
│   ├── config/
│   │   └── env.config.ts         # Environment configuration loader
│   ├── interfaces/
│   │   └── index.d.ts            # Type definitions and extension overrides
│   ├── utils/
│   │   ├── AppError.ts           # Custom error class
│   │   ├── asyncCatch.ts         # Async wrapper to catch errors
│   │   ├── createToken.ts        # JWT generation utility
│   │   ├── jwt.ts                # JWT decode/verify logic
│   │   ├── responseSender.ts     # Unified success response sender
│   │   └── setCookie.ts          # Secure cookie configuration helper
│   ├── router/
│   │   └── index.ts              # Main route mapping for modules
│   ├── server.ts                 # Server init and DB connection
│   └── app.ts                    # App config, middleware setup
