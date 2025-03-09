import { getAuthToken, isTokenExpired } from "./AuthTokenStore";

export function isAuthorized()
{
    /// TODO: add token refreshing or silent authentication if supported
    return getAuthToken() && !isTokenExpired();
}

export async function authorize()
{
    /// TODO: add authentication based on database
    return null;
}