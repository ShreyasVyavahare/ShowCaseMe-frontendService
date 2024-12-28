import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

// Helper function to get authorization headers with JWT token
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Unauthorized: No token provided");
    }
    return { "x-auth-token": token };
};

// Function to save or update the user's portfolio
export const savePortfolio = async (data: any) => {
    const headers = getAuthHeaders();
    try {
        const response = await axios.post(`${API_BASE_URL}/portfolio`, data, { headers });
        return response.data; // Return the portfolio data from the API response
    } catch (error: any) {
        // Handle errors and throw a more specific message
        const err = error as any;
        if (err.response) {
            // If the response status is available
            throw new Error(`Error ${err.response.status}: ${err.response.data.message || err.response.statusText}`);
        } else if (err.request) {
            // If the request was made but no response was received
            throw new Error("No response from server");
        } else {
            // Any other error (e.g., invalid request configuration)
            throw new Error(err.message || "An unknown error occurred");
        }
    }
};

export const getFormData = async () => {
    const headers = getAuthHeaders();
    try {
        const response = await axios.get(`${API_BASE_URL}/portfolio`, { headers });
        return response.data; // Return the portfolio data from the API response
    } catch (error: any) {
        // Handle errors and throw a more specific message
        const err = error as any;
        if (err.response) {
            // If the response status is available
            throw new Error(`Error ${err.response.status}: ${err.response.data.message || err.response.statusText}`);
        } else if (err.request) {
            // If the request was made but no response was received
            throw new Error("No response from server");
        } else {
            // Any other error (e.g., invalid request configuration)
            throw new Error(err.message || "An unknown error occurred");
        }
    }
};
// Function to fetch a user's portfolio by their username
export const fetchPortfolio = async (username: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/portfolio/${username}`);
        return response.data; // Return the portfolio data from the API response
    } catch (error) {
        // Handle errors gracefully
        const err = error as any;
        if (err.response) {
            const err = error as any;
            throw new Error(`Error ${err.response.status}: ${err.response.data.message || err.response.statusText}`);
        } else if (err.request) {
            throw new Error("No response from server");
        } else {
            throw new Error(err.message || "An unknown error occurred");
        }
    }
};

export const getUserData = async()=>{
  const response =  await axios.get(`${API_BASE_URL}/auth/user`, { headers: getAuthHeaders() });
    return response.data;
}