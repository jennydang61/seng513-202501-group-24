import mongoose from "mongoose";//
import bcrypt from "bcryptjs";
import { compareValue, hashValue } from "../utils/bcrypt";
import ConfigSetting from "./config.model";
import { calculateAndUpdateUserStats } from "../services/userStats.service";

export interface UserDocument extends mongoose.Document {
    username: string;
    password: string;
    role: string;
    cashBalance: number;
    portfolioValue: number;
    // leaderboardRank: number;
    portfolio: {
        stock: string;
        quantity: number;
        bookValue: number;          
    }[];
    gainLoss: number; // gain/loss field
    netWorth: number; // net worth field
    createdAt: Date;
    updatedAt: Date;
    comparePassword(val:string): Promise<boolean>;
    omitPassword(): Pick<
        UserDocument, 
        "_id" | "username" | "role" | "cashBalance" | "gainLoss" | "netWorth" | "createdAt" | "updatedAt" 
    >;
}

const userSchema = new mongoose.Schema<UserDocument> (
    {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user"},
    cashBalance: {type: Number, required: true, default: 10000},     // starting is $10 000
    portfolioValue: {type: Number, required: true, default: 0 },
    // leaderboardRank: {type: Number, required: true, default: 0},     // add to leaderboard once they make first purchase
    portfolio: {
        type: [
          {
            stock: { type: String, required: true },  
            quantity: { type: Number, required: true, min:0}, 
            bookValue: { type: Number, required: true },         // bookValue of the stock (= total spent on this stock)
          },
        ],
        required: true,
        default: []  // Initialize the portfolio as an empty array by default
    },
    gainLoss: { type: Number, default: 0 },
    netWorth: { type: Number, default: 0},
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

    if (!this.isNew) {
        return next();
    }

    try {
        // Fetch the startingFunds value from the ConfigSetting model
        const config = await ConfigSetting.findOne({ key: "startingFunds" });
        const startingFunds = config ? config.value : 1000000; // default to 1M if not found

        // Set the cashBalance to the startingFunds value
        this.cashBalance = startingFunds;
        
        // Trigger user stats calculation
        await calculateAndUpdateUserStats();

        next();
        
    } catch (error) {
        console.error("Error fetching startingFunds from ConfigSetting: ", error);   
    }
});

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
