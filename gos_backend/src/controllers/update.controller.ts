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

        // sort incoming updates
        for (let field in updates) {   
            if (unauthorizedUpdateFields.includes(field)) {
                delete updates[field];
                continue;
            }         
            
            // if updates include portfolio
            if (field === "portfolio") {
                const user = await UserModel.findById(userId);
                appAssert(user, NOT_FOUND, "User not found");
                const updatePortfolio = updates[field];

                // find if stock exists in portfolio
                const stockIndex = user.portfolio.findIndex((stocks: any) => 
                    stocks.stock === updatePortfolio.stock);

                // if it does, then update the new data at that specific stock , uses mongodb's set operation
                if (stockIndex > -1) {
                    // if the shares are empty, then delete the stock from the portfolio
                    if (updatePortfolio.quantity == 0 ) {
                        user.portfolio.splice(stockIndex, 1);
                        updateQuery.$set = { portfolio: user.portfolio };
                    } else {
                        user.portfolio[stockIndex].quantity = 
                            Number(user.portfolio[stockIndex].quantity) + Number(updatePortfolio.quantity);
                        if (user.portfolio[stockIndex].quantity===0) {
                            user.portfolio[stockIndex].bookValue = 0;
                            user.portfolio[stockIndex].current = 0;
                            user.portfolio[stockIndex].return = 0;
                        } else {
                            user.portfolio[stockIndex].bookValue = 
                                user.portfolio[stockIndex].bookValue + (updatePortfolio.price * updatePortfolio.quantity);
                            user.portfolio[stockIndex].current = updatePortfolio.price * user.portfolio[stockIndex].quantity;
                            user.portfolio[stockIndex].return = (user.portfolio[stockIndex].current - user.portfolio[stockIndex].bookValue) / user.portfolio[stockIndex].bookValue;
                        }
                        updateQuery.$set = { portfolio: user.portfolio };
                    }
                } else {
                    // if not, then add the stock to the portfolio, uses mongodb's push operation
                    if (!updateQuery.$push) {
                        updateQuery.$push = {};
                    }
                    updates[field].bookValue = updates[field].current =  updates[field].price * updates[field].quantity;
                    updates[field].return = 0;
                    updateQuery.$push[field] = updates[field];
                }
            // if the field is not portfolio, then uses mongodb's set operation
            } else {
                if (!updateQuery.$set) {
                    updateQuery.$set = {};
                }
                updateQuery.$set[field] = updates[field];

            }
        }

        // update to the db
        const user = await UserModel.findByIdAndUpdate(userId, updateQuery, { new: true, runValidators: true, });

        appAssert(user, NOT_FOUND, "User not found");
        return res.status(OK).json(user.omitPassword());    
    }
)
