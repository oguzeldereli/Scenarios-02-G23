import { apiUnrestrictedClient } from "./APIClient";

export async function getAllLocations(projectId) {
    const response = await apiUnrestrictedClient.get(`projects/${projectId}/locations`);
    if (!response || !response.ok) {
        console.log("An error occurred while fetching locations.");
        return null;
    }
    
    var { success, data } = await response.json();
    if (!success) {
        console.log("An error occurred while fetching locations.");
        return null;
    }
    
    return data;
}

export async function getLocation(projectId, locationId) {
    const response = await apiUnrestrictedClient.get(`projects/${projectId}/locations/${locationId}`);
    if (!response || !response.ok) {
        console.log("An error occurred while fetching location.");
        return null;
    }
    
    var { success, data } = await response.json();
    if (!success) {
        console.log("An error occurred while fetching location.");
        return null;
    }
    
    return data;
}

export async function createLocation(projectId, name) {
    const response = await apiUnrestrictedClient.post(`projects/${projectId}/locations`, { name: name });
    if (!response || !response.ok) {
        console.log("An error occurred while creating location.");
        return null;
    }
    
    var { success, data } = await response.json();
    if (!success) {
        console.log("An error occurred while creating location.");
        return null;
    }
    
    return data;
}

export async function updateLocation(projectId, locationId, location) {
    const response = await apiUnrestrictedClient.put(`projects/${projectId}/locations/${locationId}`, { location: location });
    if (!response || !response.ok) {
        console.log("An error occurred while updating location.");
        return false;
    }
    
    var { success } = await response.json();
    if (!success) {
        console.log("An error occurred while updating location.");
        return false;
    }
    
    return true;
}

export async function deleteLocation(projectId, locationId) {
    const response = await apiUnrestrictedClient.delete(`projects/${projectId}/locations/${locationId}`);
    if (!response || !response.ok) {
        console.log("An error occurred while deleting location.");
        return false;
    }
    
    var { success } = await response.json();
    if (!success) {
        console.log("An error occurred while deleting location.");
        return false;
    }
    
    return true;
}
