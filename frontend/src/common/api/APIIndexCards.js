import { apiUnrestrictedClient } from "./APIClient";

export async function getAllNotes(projectId)
{
    const response = await apiUnrestrictedClient.get(`projects/${projectId}/indexCards`);
    if(!response)
    {
        console.log("An error occured while fetching notes.");
        return null;
    }

    var {success, data} = response.data;
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

    var {success, data} = response.data;
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

    var {success, data} = response.data;
    if(!success)
    {
        console.log("An error occured while creating note.");
        return null;
    }

    return data;
}

export async function updateNote(noteId, note)
{
    const response = await apiUnrestrictedClient.put(`indexCards/${noteId}`, {...note});
    if(!response)
    {
        console.log("An error occured while updating note.");
        return false;
    }

    var {success, message} = response.data;
    console.log(message);
    if(!success)
    {
        console.log("An error occured while updating note.");
        return false;
    }

    return true;
}

export async function deleteNote(noteId)
{
    const response = await apiUnrestrictedClient.delete(`indexCards/${noteId}`);
    if(!response)
    {
        console.log("An error occured while deleting note.");
        return false;
    }

    var {success} = response.data;
    if(!success)
    {
        console.log("An error occured while deleting note.");
        return false;
    }

    return true
}