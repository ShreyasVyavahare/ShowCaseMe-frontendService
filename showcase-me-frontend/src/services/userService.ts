import API from "./api";

export const login = async (credentials: { email: string; password: string }) => {
    const response = await API.post("/auth/login", credentials);
    return response.data; // Return data without dispatch
};

export const signup = async (details: { username: string; email: string; password: string }) => {
    const response = await API.post("/auth/signup", details);
    return response.data;
};
