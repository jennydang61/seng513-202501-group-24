import axios from "axios";
import queryClient from "./queryClient";
import { navigate } from "../lib/navigation";


const options = {
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
};

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data); // only the successful promise fulfilled inerceptor - no error interceptor

const API = axios.create(options);

API.interceptors.response.use(
    (response) => response.data, // when successful, only returning response.data instead of the entire response
    async (error) => {
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