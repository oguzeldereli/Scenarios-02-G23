import { AUTH_EXPIRATION_TIME_FORMAT } from "../settings/settings";

let token = null;
let expirationUnixEpoch = null;

export function getAuthToken()
{
    return token;
}

export function getAuthTokenExpiration()
{
    return expirationUnixEpoch;
}

export function setAuthToken(newToken, expiration)
{
    token = newToken;
    expirationUnixEpoch = expiration;
}

export function isTokenEmpty()
{
    return !token;
}

export function getTimeToExpiration()
{
    if (expirationUnixEpoch === null) 
    {
        return null;
    }

    // default to milliseconds
    switch (AUTH_EXPIRATION_TIME_FORMAT) 
    {
        case "EPOCH_SECONDS":
            const unixEpochSeconds = Math.floor(Date.now() / 1000);
            return expirationUnixEpoch - unixEpochSeconds;
        case "EPOCH-MILLISECONDS":
        default:
            const unixEpochMilliseconds = Date.now();
            return expirationUnixEpoch - unixEpochMilliseconds;
    }
}

export function isTokenExpired()
{
    return getTimeToExpiration() <= 0;
}