import API from "../config/apiClient.ts";

export const login = async(data) => API.post("/auth/login", data);

export const getUser = async() => API.get("/user");