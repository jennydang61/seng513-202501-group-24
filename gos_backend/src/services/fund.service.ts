import ConfigSetting from "../models/config.model"

export const setInitialFundAmount = async(amount: number) => {
    const config = await ConfigSetting.findOneAndUpdate(
        { key: "startingFunds" },
        { value: amount },
        { upsert: true, new: true },
    )

    return config
}

export const getInitialFundAmount = async () => {
    const startingFundsConfig = await ConfigSetting.findOne(
        { key: "startingFunds" },
    )

    const initialFundAmount = startingFundsConfig?.value;

    return initialFundAmount
}