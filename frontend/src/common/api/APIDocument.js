import { apiUnrestrictedClient } from "./APIClient";

export async function getDocument(projectId, documentId)
{
    const response = await apiUnrestrictedClient.get(`projects/${projectId}/documents/${documentId}`);
    if(!response)
    {
        console.log("An error occured while fetching document.");
        return null;
    }

    var {success, data} = response.data;
    if(!success)
    {
        console.log("An error occured while fetching document.");
        return null;
    }

    return data;
}

export async function createDocument(projectId, title, content, type)
{
    const response = await apiUnrestrictedClient.post(`projects/${projectId}/documents`, {title, content, type});
    if(!response)
    {
        console.log("An error occured while creating document.");
        return null;
    }

    var {success, data} = response.data;
    if(!success)
    {
        console.log("An error occured while creating document.");
        return null;
    }

    return data;
}

export async function updateDocument(projectId, documentId, document)
{
    const response = await apiUnrestrictedClient.put(`projects/${projectId}/documents/${documentId}`, document);
    if(!response)
    {
        console.log("An error occured while updating document.");
        return false;
    }

    var {success} = response.data;
    if(!success)
    {
        console.log("An error occured while updating document.");
        return false;
    }

    return true;
}

export async function deleteDocument(projectId, documentId)
{
    const response = await apiUnrestrictedClient.delete(`projects/${projectId}/documents/${documentId}`);
    if(!response)
    {
        console.log("An error occured while deleting document.");
        return false;
    }

    var {success} = response.data;
    if(!success)
    {
        console.log("An error occured while deleting document.");
        return false;
    }

    return true
}