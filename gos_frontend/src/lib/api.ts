import API from "../config/apiClient.ts";

export const register = async(data) => API.post("/auth/register", data);
export const login = async(data) => API.post("/auth/login", data);
export const logout = async() => API.get("/auth/logout");

export const getUser = async() => API.get("/user");
export const getAllUsers = async() => API.get("/user/all");
export const getSessions = async() => API.get("/sessions");
export const deleteSession = async(id) => API.delete(`/sessions/${id}`);
export const updateUser = async(data) => API.patch("/update", data);

export const getLeaderboardUsers = async() => API.get("/user/leaderboard");

export const fetchHistoricalStock = async (
    symbol: string,
    interval: '1d' | '1h' = '1d'
  ) => {
    return API.get(`/stocks/historical/${symbol}?interval=${interval}`)};

export const setStartingFund = async(amount) => API.post("/fund", {amount});
export const getStartingFund = async() => API.get("/fund");
export const updateUsername = async (newUsername) =>API.put("/user/username", { newUsername });
export const updatePassword = async (newPassword) =>API.put("/user/password", { newPassword });
export const deleteAccount = async () =>API.delete("/user");