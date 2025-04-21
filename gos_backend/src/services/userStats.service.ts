import yahooFinance from "yahoo-finance2";
import UserModel, { UserDocument } from "../models/user.model";
import userRoutes from "../routes/user.route";



export const calculateAndUpdateUserStats = async () => {
    try {
        // Fetch all users
        const users = await UserModel.find();

        // Get all unique stock symbols from user portfolios
        const symbols = Array.from(
            new Set(users.flatMap((user: UserDocument) => user.portfolio.map((stock) => stock.stock)))
        );

        // Fetch current stock prices
        const stockPrices: Record<string, number> = {};
        const quotes = await yahooFinance.quote(symbols);
        quotes.forEach((quote) => {
            stockPrices[quote.symbol] = quote.regularMarketPrice || 0;
        });

        // Calculate stars for each user
        for (const user of users) {

            user.portfolio = user.portfolio.filter((stock) => stock.quantity > 0);
            await user.save(); 
            
            // Skip calculation if the portfolio is empty
            if (user.portfolio.length === 0) {
                user.gainLoss = 0;
                user.netWorth = Number(user.cashBalance.toFixed(2)); // Only cash balance
                await user.save();
                continue;
            }

            let portfolioValue = 0;
            let totalSpent = 0;

            user.portfolio.forEach((stock) => {

                // Skip stocks with invalid quantity
                if (stock.quantity <= 0) {
                    console.warn(`Invalid stock quantity for user ${user.username}: `, stock);
                    return; // Skip this stock
                }
                const currentPrice = stockPrices[stock.stock] || 0;
                portfolioValue += currentPrice * stock.quantity; // Current value of the stock
                totalSpent += stock.price; // Total amount spent on the stock
            });

            // Avoid division by zerio
            const gainLoss = totalSpent > 0 
                ? ((portfolioValue - totalSpent) / totalSpent * 100) // total gainLoss in percentage
                : 0;
            const netWorth = user.cashBalance + portfolioValue;

            // Update user stats in the db
            user.gainLoss = isNaN(gainLoss) ? 0 : gainLoss;
            user.netWorth = isNaN(netWorth) ? 0 : netWorth;
            await user.save();
        }

        console.log("User stats updated successfully.");
    } catch (error) {
        console.error("Failed to calculate and update user stats:", error);
    }
};