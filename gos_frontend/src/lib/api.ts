import API from "../config/apiClient.ts";

export const register = async(data) => API.post("/auth/register", data);
export const login = async(data) => API.post("/auth/login", data);

export const getUser = async() => API.get("/user");