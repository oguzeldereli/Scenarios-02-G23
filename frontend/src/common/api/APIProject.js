import { apiUnrestrictedClient } from "./APIClient";

export async function getAllProjects()
{
    const response = await apiUnrestrictedClient.get("projects");
    console.log(response);
    if(!response)
    {
        console.log("An error occured while fetching projects.");
        return null;
    }

    var {success, data} = await response.data;
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
    if(!response)
    {
        console.log("An error occured while fetching project.");
        return null;
    }

    var {success, data, documents, notes} = response.data;
    if(!success)
    {
        console.log("An error occured while fetching project.");
        return null;
    }

    return {data, documents, notes};
}

export async function createProject(title)
{
    const response = await apiUnrestrictedClient.post(`projects`, {title: title});
    if(!response)
    {
        console.log("An error occured while creating project.");
        return null;
    }

    var {success, data} = response.data;
    if(!success)
    {
        console.log("An error occured while creating project.");
        return null;
    }

    var project = getProject(data._id);

    return project;
}

export async function updateProject(id, project)
{
    const response = await apiUnrestrictedClient.put(`projects/${id}`, {project: project});
    if(!response)
    {
        console.log("An error occured while updating project.");
        return false;
    }

    var {success} = response.data;
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
    if(!response)
    {
        console.log("An error occured while deleting project.");
        return false;
    }

    var {success} = response.data;
    if(!success)
    {
        console.log("An error occured while deleting project.");
        return false;
    }

    return true;
}