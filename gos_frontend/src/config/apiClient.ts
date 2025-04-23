// for managing API requests in the frontend
// centralizes the logic for making API requests, handling responses, and managing errors, 
// including token refresh logic for authentication

import axios from "axios"; // HTTP client, to handle communication with backend server
import queryClient from "./queryClient";
import { navigate } from "../lib/navigation";

// options defines the base configuration for Axios
const options = {
    baseURL: import.meta.env.VITE_API_URL, // Backend API URL from environment variables
    withCredentials: true, // include cookies (e.g. for authentication)
};

// specialized Axios instance for refreshing the access token
const TokenRefreshClient = axios.create(options); // exclusively for refreshing the access token 
TokenRefreshClient.interceptors.response.use((response) => response.data); // only the successful promise fulfilled inerceptor - no error interceptor

const API = axios.create(options); // primary Axios client for all API requests

API.interceptors.response.use( // configured to handle both successful responses and errors
    (response) => response.data, // when successful, only returning response.data instead of the entire response
    async (error) => { // handles errors, including refreshing the access token when it is invalid or expired
      const { config, response } = error;
      const { status, data } = response || {};
  
      // try to refresh the access token behind the scenes
      if (status === 401 && data?.errorCode === "invalid_access_token") {
        try {
          // refresh the access token, then retry the original request
          await TokenRefreshClient.get("/auth/refresh");
          return TokenRefreshClient(config);
        } catch (error) {
          // handle refresh errors by clearing the query cache & redirecting to login
          queryClient.clear(); // clear all queries in the query cache so the data is no longer accessible on the client side
          navigate("/login", {
            state: {
              redirectUrl: window.location.pathname,
            },
          });
        }
      }
  
      return Promise.reject({ status, ...data });
    }
  );
  
  export default API;