import { getAuthToken } from "../auth/AuthTokenStore";
import axios from 'axios';
import { API_BASE_URL, API_TIMEOUT, AUTH_METHOD } from "../settings/settings";

export const apiUnrestrictedClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT
});

export const apiRestrictiedClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT
});

apiRestrictiedClient.interceptors.request.use(config => {
    const token = getAuthToken();
    if(!token)
    {
        console.log("No access token available for restricted action.");
        return;
    }
    if(AUTH_METHOD === "JWT-BEARER")
    {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    console.log("An error occurred during request: " + error);
    return Promise.reject(error);
});