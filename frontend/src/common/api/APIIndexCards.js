import { apiUnrestrictedClient } from "./APIClient";

export async function getAllNotes(projectId)
{
    const response = await apiUnrestrictedClient.get(`projects/${projectId}/indexCards`);
    if(!response)
    {
        console.log("An error occured while fetching notes.");
        return null;
    }

    var {success, data} = await response.data;
    if(!success)
    {
        console.log("An error occured while fetching notes.");
        return null;
    }

    return data;
}

export async function getNote(projectId, noteId)
{
    const response = await apiUnrestrictedClient.get(`projects/${projectId}/indexCards/${noteId}`);
    if(!response)
    {
        console.log("An error occured while fetching note.");
        return null;
    }

    var {success, data} = await response.data;
    if(!success)
    {
        console.log("An error occured while fetching note.");
        return null;
    }

    return data;
}

export async function createNote(projectId, title, content, colour, position)
{
    const response = await apiUnrestrictedClient.post(`projects/${projectId}/indexCards`, {title, content, colour, position});
    if(!response)
    {
        console.log("An error occured while creating note.");
        return null;
    }

    var {success, data} = await response.data;
    if(!success)
    {
        console.log("An error occured while creating note.");
        return null;
    }

    return data;
}

export async function updateNote(projectId, noteId, note)
{
    const response = await apiUnrestrictedClient.put(`projects/${projectId}/indexCards/${noteId}`, {note: note});
    if(!response)
    {
        console.log("An error occured while updating note.");
        return false;
    }

    var {success} = await response.data;
    if(!success)
    {
        console.log("An error occured while updating note.");
        return false;
    }

    return true;
}

export async function deleteNote(projectId, noteId)
{
    const response = await apiUnrestrictedClient.delete(`projects/${projectId}/indexCards/${noteId}`);
    if(!response)
    {
        console.log("An error occured while deleting note.");
        return false;
    }

    var {success} = await response.data;
    if(!success)
    {
        console.log("An error occured while deleting note.");
        return false;
    }

    return true
}