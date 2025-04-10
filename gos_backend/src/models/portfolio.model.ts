import mongoose from "mongoose";


export interface PortfolioDocument extends mongoose.Document {
    username: string;
    portfolioValue: number;
    portfolio: {
        stock: string;
        quantity: number;
        price: number;          
    }[];
}

const portfolioSchema = new mongoose.Schema<PortfolioDocument> (
    {
    username: {type: String, required: true, unique: true, }, 
    portfolioValue: {type: Number, required: true, default: 0},
    portfolio: {
        type: [
          {
            stock: { type: String, required: true },  
            quantity: { type: Number, required: true, min: 1 }, 
            price: { type: Number, required: true, },     
          },
        ],
        required: true,
        default: []  // Initialize the portfolio as an empty array by default
      },
    }
);


const PortfolioModel = mongoose.model<PortfolioDocument>("Portfolio", portfolioSchema);
export default PortfolioModel; 