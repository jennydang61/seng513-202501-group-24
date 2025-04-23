import mongoose from "mongoose";

export interface ConfigDocument extends mongoose.Document {
  key: string;
  value: any;
  updatedAt: Date;
}

// used for values that require global access, like startingFund value
const configSchema = new mongoose.Schema<ConfigDocument>(
    {
    key: { 
        type: String, 
        required: true, 
        unique: true 
    },
    value: { 
        type: mongoose.Schema.Types.Mixed, 
        required: true 
    }}, 
    {
    timestamps: true,
    }
);

const ConfigSetting = mongoose.model<ConfigDocument>("ConfigSetting", configSchema);
export default ConfigSetting;