import { apiUnrestrictedClient } from "./APIClient";


export async function getAllNotes(projectId)
{
    const response = await apiUnrestrictedClient.get(`projects/${projectId}/notes`);
    if(!response || !response.ok)
    {
        console.log("An error occured while fetching projects.");
        return null;
    }

    var {success, data} = await response.json();
    if(!success)
    {
        console.log("An error occured while fetching projects.");
        return null;
    }

    return data;
}

export async function getNote(projectId, noteId)
{
    const response = await apiUnrestrictedClient.get(`projects/${projectId}/notes/${noteId}`);
    if(!response || !response.ok)
    {
        console.log("An error occured while fetching note.");
        return null;
    }

    var {success, data} = await response.json();
    if(!success)
    {
        console.log("An error occured while fetching note.");
        return null;
    }

    return data;
}

export async function createNote(projectId)
{
    const response = await apiUnrestrictedClient.post(`projects/${projectId}/notes`);
    if(!response || !response.ok)
    {
        console.log("An error occured while creating note.");
        return null;
    }

    var {success, data} = await response.json();
    if(!success)
    {
        console.log("An error occured while creating note.");
        return null;
    }

    return data;
}

export async function updateNote(projectId, noteId, note)
{
    const response = await apiUnrestrictedClient.put(`projects/${projectId}/notes/${noteId}`, {note: note});
    if(!response || !response.ok)
    {
        console.log("An error occured while updating note.");
        return false;
    }

    var {success} = await response.json();
    if(!success)
    {
        console.log("An error occured while updating note.");
        return false;
    }

    return true;
}

export async function deleteNote(projectId, noteId)
{
    const response = await apiUnrestrictedClient.delete(`projects/${projectId}/notes/${noteId}`);
    if(!response || !response.ok)
    {
        console.log("An error occured while deleting note.");
        return false;
    }

    var {success} = await response.json();
    if(!success)
    {
        console.log("An error occured while deleting note.");
        return false;
    }

    return true
}