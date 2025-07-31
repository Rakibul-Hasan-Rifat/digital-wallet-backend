import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";
import IUser, { Role, AuthProvider } from "./user.interface";
import environmentVariables from "../../config/env.config";

const authProviderSchema = new Schema<AuthProvider>(
  {
    provider: String,
    providerId: String,
  },
  {
    _id: false,
    versionKey: false,
  }
);

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: String,
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    isActive: { type: Boolean, default: true },
    balance: { type: Number },
    walletId: { type: Schema.Types.ObjectId, ref: "Wallet" },
    authProvider: [authProviderSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(
      this.password as string,
      parseInt(environmentVariables.SALT_ROUND)
    );

    this.password = hashedPassword;
  }

  this.authProvider = [{ provider: "credentials", providerId: this.email }];

  next();
});

const User = model<IUser>("User", userSchema);

export default User;
