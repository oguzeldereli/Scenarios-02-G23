import { apiUnrestrictedClient } from "./APIClient";

export async function getAllCharacters(projectId) {
    const response = await apiUnrestrictedClient.get(`projects/${projectId}/characters`);
    if (!response || !response.ok) {
        console.log("An error occurred while fetching characters.");
        return null;
    }
    
    var { success, data } = await response.json();
    if (!success) {
        console.log("An error occurred while fetching characters.");
        return null;
    }
    
    return data;
}

export async function getCharacter(projectId, characterId) {
    const response = await apiUnrestrictedClient.get(`projects/${projectId}/characters/${characterId}`);
    if (!response || !response.ok) {
        console.log("An error occurred while fetching character.");
        return null;
    }
    
    var { success, data } = await response.json();
    if (!success) {
        console.log("An error occurred while fetching character.");
        return null;
    }
    
    return data;
}

export async function createCharacter(projectId, name) {
    const response = await apiUnrestrictedClient.post(`projects/${projectId}/characters`, { name: name });
    if (!response || !response.ok) {
        console.log("An error occurred while creating character.");
        return null;
    }
    
    var { success, data } = await response.json();
    if (!success) {
        console.log("An error occurred while creating character.");
        return null;
    }
    
    return data;
}

export async function updateCharacter(projectId, characterId, character) {
    const response = await apiUnrestrictedClient.put(`projects/${projectId}/characters/${characterId}`, { character: character });
    if (!response || !response.ok) {
        console.log("An error occurred while updating character.");
        return false;
    }
    
    var { success } = await response.json();
    if (!success) {
        console.log("An error occurred while updating character.");
        return false;
    }
    
    return true;
}

export async function deleteCharacter(projectId, characterId) {
    const response = await apiUnrestrictedClient.delete(`projects/${projectId}/characters/${characterId}`);
    if (!response || !response.ok) {
        console.log("An error occurred while deleting character.");
        return false;
    }
    
    var { success } = await response.json();
    if (!success) {
        console.log("An error occurred while deleting character.");
        return false;
    }
    
    return true;
}
