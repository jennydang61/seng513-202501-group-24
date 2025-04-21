import { UserDocument } from '../../gos_backend/src/models/user.model';

export const calculateUserStats = (users: UserDocument[], stockPrices: Record<string, number>) => {
    return users.map((user) => {
        let portfolioValue = 0;
        let totalSpent = 0;

        // Calculate portfolio value and total spent
        user.portfolio.forEach((stock) => {
            const currentPrice = stockPrices[stock.stock] || 0; // get current price
            portfolioValue += currentPrice * stock.quantity; // current value of the stock
            totalSpent += stock.price;
        });

        // Calculate gain/loss and net worth
        const gainLoss = portfolioValue - totalSpent;
        const netWorth = user.cashBalance + portfolioValue;

        return {
            username: user.username,
            gainLoss,
            netWorth,
        };
    });
};


export const getTopUsers = (userStats, sortBy = "gainLoss") => {
    return userStats
        .sort((a, b) => b[sortBy] - a[sortBy]) // sort by gainLoss
        .slice(0, 10) // get the top 10 users
}