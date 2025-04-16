import ConfigSetting from "../models/config.model"

export const setInitialFundAmount = async(amount: number) => {
    const config = await ConfigSetting.findOneAndUpdate(
        { key: "startingFunds" },
        { value: amount },
        { upsert: true, new: true },
    )

    return config
}