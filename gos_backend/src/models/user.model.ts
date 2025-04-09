import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
    username: string;
    password: string;
    // role: "user" || "admin";
    createdAt: Date;
    updatedAt: Date;
    comparePassword(val:string): Promise<boolean>;
    omitPassword(): Pick<
        UserDocument, 
        "_id" | "username" | "createdAt" | "updatedAt" 
    >;
}

const userSchema = new mongoose.Schema<UserDocument> (
    {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // role: { type: String, default: "user"},
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    // hash password
    this.password = await hashValue(this.password);
    next();
})

userSchema.methods.comparePassword = async function (val: string) {
    return compareValue(val, this.password);
}

userSchema.methods.omitPassword = function () {
    const user = this.toObject();
    delete user.password;
    return user;
}

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;