import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/oauth/';

const oauthLogin = async (provider) => {
    try {
        const response = await axios.get(`${API_URL}${provider}`);
        return response.data;
    } catch (error) {
        // Handle error appropriately
        console.error("OAuth login failed:", error);
        throw new Error("OAuth login failed. Please try again.");
    }
};

export default {
    oauthLogin,
};
