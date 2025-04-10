import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
    username: string;
    password: string;
    role: string;
    cashBalance: number;
    portfolioValue: number;
    leaderboardRank: number;
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
    role: { type: String, default: "user"},
    cashBalance: {type: Number, required: true, default: 10000},     // starting is $10 000
    portfolioValue: {type: Number, default: 0 },
    leaderboardRank: {type: Number, default: 0},               // add to leaderboard once they make first purchase
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