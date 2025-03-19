import { apiUnrestrictedClient } from "./APIClient";

export async function getAllProjects()
{
    const response = await apiUnrestrictedClient.get("projects");
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

export async function getProject(id)
{
    const response = await apiUnrestrictedClient.get(`projects/${id}`);
    if(!response || !response.ok)
    {
        console.log("An error occured while fetching project.");
        return null;
    }

    var {success, data} = await response.json();
    if(!success)
    {
        console.log("An error occured while fetching project.");
        return null;
    }

    return data;
}

export async function createProject(title)
{
    const response = await apiUnrestrictedClient.post(`projects`, {title: title});
    if(!response || !response.ok)
    {
        console.log("An error occured while creating project.");
        return null;
    }

    var {success, data} = await response.json();
    if(!success)
    {
        console.log("An error occured while creating project.");
        return null;
    }

    return data;
}

export async function updateProject(id, project)
{
    const response = await apiUnrestrictedClient.put(`projects/${id}`, {project: project});
    if(!response || !response.ok)
    {
        console.log("An error occured while updating project.");
        return false;
    }

    var {success} = await response.json();
    if(!success)
    {
        console.log("An error occured while updating project.");
        return false;
    }

    return true;
}

export async function deleteProject(id)
{
    const response = await apiUnrestrictedClient.delete(`projects/${id}`);
    if(!response || !response.ok)
    {
        console.log("An error occured while deleting project.");
        return false;
    }

    var {success} = await response.json();
    if(!success)
    {
        console.log("An error occured while deleting project.");
        return false;
    }

    return true;
}