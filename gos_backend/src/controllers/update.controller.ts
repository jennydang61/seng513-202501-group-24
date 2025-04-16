import { NOT_FOUND,  OK} from "../constants/http";
import UserModel from "../models/user.model";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";


export const updateUserHandler = catchErrors(
    async (req, res) => {
        const userId = req.userId; 
        let updates = {...req.body};

        const unauthorizedUpdateFields = ["_id", "username", "password", "role", "leaderboardRank",
            "createdAt", "updatedAt", "__v"];

        const arrayField = ["portfolio"];
        
        const updateQuery: Record<string, any>  = {};

        for (let field in updates) {   
            if (unauthorizedUpdateFields.includes(field)) {
                delete updates[field];
                continue;
            }         
            
            if (arrayField.includes(field)) {
                if (!updateQuery.$push) {
                    updateQuery.$push = {};
                }
                updateQuery.$push[field] = updates[field];
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

