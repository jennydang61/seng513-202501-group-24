import { NOT_FOUND,  OK} from "../constants/http";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";


export const updateUserHandler = catchErrors(
    async (req, res) => {
        const userId = req.userId; 
        let updates = {...req.body};

        const unauthorizedUpdateFields = ["_id", "username", "password", "role", 
            "leaderboardRank",
            "createdAt", "updatedAt", "__v"];
    
        const updateQuery: Record<string, any>  = {};

        for (let field in updates) {   
            if (unauthorizedUpdateFields.includes(field)) {
                delete updates[field];
                continue;
            }         
            
            if (field === "portfolio") {
                const user = await UserModel.findById(userId);
                appAssert(user, NOT_FOUND, "User not found");
                const updatePortfolio = updates[field];

                const stockIndex = user.portfolio.findIndex((stocks: any) => 
                    stocks.stock === updatePortfolio.stock);

                if (stockIndex > -1) {
                    if (updatePortfolio.quantity == 0 ) {
                        user.portfolio.splice(stockIndex, 1);
                        updateQuery.$set = { portfolio: user.portfolio };
                    } else {
                        user.portfolio[stockIndex].quantity = 
                            Number(user.portfolio[stockIndex].quantity) + Number(updatePortfolio.quantity);
                        user.portfolio[stockIndex].bookValue = 
                            user.portfolio[stockIndex].bookValue + (updatePortfolio.price * updatePortfolio.quantity);
                        updateQuery.$set = { portfolio: user.portfolio };
                    }
                } else {
                    if (!updateQuery.$push) {
                        updateQuery.$push = {};
                    }
                    updates[field].bookValue = updates[field].price * updates[field].quantity;
                    updateQuery.$push[field] = updates[field];
                }
            } else {
                if (!updateQuery.$set) {
                    updateQuery.$set = {};
                }
                updateQuery.$set[field] = updates[field];

            }
        }


        const user = await UserModel.findByIdAndUpdate(userId, updateQuery, { new: true, runValidators: true, });

        appAssert(user, NOT_FOUND, "User not found");
        return res.status(OK).json(user.omitPassword());    
    }
)