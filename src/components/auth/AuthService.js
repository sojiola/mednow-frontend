import axios from 'axios';

const API_URL = "https://mvp-1-server.mangograss-0c7585f6.centralus.azurecontainerapps.io/api/auth";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // axios automatically parses JSON responses
  } catch (error) {
    // Handle errors appropriately (e.g., log, display message, re-throw)
    console.error("Error registering user:", error);

    // Example: Re-throwing the error for the calling function to handle
    throw error;  // Or return a specific error value/object
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; // axios automatically parses JSON responses
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

