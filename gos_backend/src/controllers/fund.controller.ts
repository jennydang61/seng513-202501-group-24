import { BAD_REQUEST, OK } from "../constants/http";
import { setInitialFundAmount } from "../services/fund.service";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

export const initialFundHandler = catchErrors(async(req, res) => {
    // validate request
    const { amount } = req.body;
    console.log(typeof amount);
    appAssert(typeof amount === "number" && amount > 0, BAD_REQUEST, "Invalid starting fund amount");
    
    // call service
    const config = await setInitialFundAmount(amount);

    const setAmount = config.value


    // return response with cookies (refresh token)
    return res.status(OK).json({
        message: `Starting fund amount has been updated to ${setAmount}`});
}
);
