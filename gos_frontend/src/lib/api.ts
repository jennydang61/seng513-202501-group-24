import API from "../config/apiClient.ts";

export const register = async(data) => API.post("/auth/register", data);
export const login = async(data) => API.post("/auth/login", data);
export const logout = async() => API.get("/auth/logout");

export const getUser = async() => API.get("/user");
export const getUsers = async() => API.get("/users");
export const getSessions = async() => API.get("/sessions");
export const deleteSession = async(id) => API.delete(`/sessions/${id}`);