import { apiUnrestrictedClient } from "./APIClient";


export async function getAllChapters(projectId)
{
    const response = await apiUnrestrictedClient.get(`projects/${projectId}/chapters`);
    if(!response || !response.ok)
    {
        console.log("An error occured while fetching chapters.");
        return null;
    }

    var {success, data} = await response.json();
    if(!success)
    {
        console.log("An error occured while fetching chapters.");
        return null;
    }

    return data;
}

export async function getChapter(projectId, chapterId)
{
    const response = await apiUnrestrictedClient.get(`projects/${projectId}/chapters/${chapterId}`);
    if(!response || !response.ok)
    {
        console.log("An error occured while fetching chapter.");
        return null;
    }

    var {success, data} = await response.json();
    if(!success)
    {
        console.log("An error occured while fetching chapter.");
        return null;
    }

    return data;
}

export async function createChapter(projectId, title)
{
    const response = await apiUnrestrictedClient.post(`projects/${projectId}/chapters`, {title: title});
    if(!response || !response.ok)
    {
        console.log("An error occured while creating chapter.");
        return null;
    }

    var {success, data} = await response.json();
    if(!success)
    {
        console.log("An error occured while creating chapter.");
        return null;
    }

    return data;
}

export async function updateChapter(projectId, chapterId, chapter)
{
    const response = await apiUnrestrictedClient.put(`projects/${projectId}/chapters/${chapterId}`, {chapter: chapter});
    if(!response || !response.ok)
    {
        console.log("An error occured while updating chapter.");
        return false;
    }

    var {success, data} = await response.json();
    if(!success)
    {
        console.log("An error occured while updating chapter.");
        return false;
    }   

    return true;
}

export async function deleteChapter(projectId, chapterId)
{
    const response = await apiUnrestrictedClient.delete(`projects/${projectId}/chapters/${chapterId}`);
    if(!response || !response.ok)
    {
        console.log("An error occured while deleting chapter.");
        return false;
    }

    var {success} = await response.json();
    if(!success)
    {
        console.log("An error occured while deleting chapter.");
        return false;
    }

    return true;
}