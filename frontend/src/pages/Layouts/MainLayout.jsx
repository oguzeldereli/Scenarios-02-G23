/** @jsxImportSource @emotion/react */
import { Outlet } from "react-router";
import MainContentContainer from "../../components/layout/MainContentContainer";
import SiteNavbar from "../../components/navigation/SiteNavbar";
import { Button, Input, Label, Link, ListBox, ListBoxItem, MenuItem, TextField, ToggleButton     } from "react-aria-components";
import SiteMenu from "../../components/navigation/SiteMenu";
import SiteMenuItem from "../../components/navigation/SiteMenuItem";
import { css } from "@emotion/react";
import SiteSidebar from "../../components/navigation/SiteSidebar";
import SiteMenuItemModal from "../../components/navigation/SiteMenuItemModal";
import { COLOR_HOVER_LIGHT, NAVBAR_COLOR_BACKGROUND_HOVER } from "../../common/settings/settings";
import { useState } from "react";
import { createProject, deleteProject, getProject } from "../../common/api/APIProject"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faCoffee, faTh, faThLarge, faThList } from '@fortawesome/free-solid-svg-icons'

export default function MainLayout({setOpenDocument, projects, setProjects, openProject, setOpenProject, setCorkboardToggle})
{
    const menuItemContainerCss = css`
        padding: 0.6rem;
        display: flex;
        flex-direction: column;

        & input {
            border: 1px solid #101010;
            padding: 0.4rem 0.6rem;
        }

        & button {
            border: none;
            color: white;
            font-size: 1rem;
            padding: 0.3rem 0.6rem;
            margin-right: 0.3rem;
            background-color: ${NAVBAR_COLOR_BACKGROUND_HOVER};
        }
    `;

    const projectListCss = css`
        
        .react-aria-ListBoxItem {
            display: flex;
            flex-direction: column;
            font-family: "Montserrat", sans-serif;
            font-size: 1rem;
            padding: 0.2rem 0.3rem;
            margin: 0;
            cursor: pointer;
            gap: 2px;

            &:hover {
                background-color: ${COLOR_HOVER_LIGHT};
            }
        }
    `;

    let [newProjectTitle, setNewProjectTitle] = useState('');

    async function openProjectWithData(id)
    {
        const project = await getProject(id);
        setOpenProject(project);
    }

    return (
        <>
        <SiteNavbar>
            <li>
                <SiteMenu label="File">
                    <SiteMenuItemModal title="New Project">
                        {({isOpen, setIsOpen}) => (
                        <div css={menuItemContainerCss}>
                            <div css={css`font-family: "Montserrat", sans-serif; padding-bottom: 0.4rem; font-size: 1.5rem; font-weight: bold;`}>Add Project</div>
                            <TextField css={css`margin: 0;`} placeholder="Enter Title..." value={newProjectTitle} onChange={(e) => setNewProjectTitle(e)}>
                                <Input type="text" aria-label="Title Input" />
                            </TextField>
                            <div css={css`display: flex; padding-top: 0.3rem;`}>
                                <Button onPress={async () => { setIsOpen(false); var newProject = await createProject(newProjectTitle); setOpenProject(newProject);}}>Create</Button>
                                <Button slot="close">Close</Button>
                            </div>
                        </div>
                        )}
                    </SiteMenuItemModal>
                    <SiteMenuItemModal title="Open Project">
                        {({isOpen, setIsOpen}) => (
                        <div css={menuItemContainerCss}>
                            <div css={css`font-family: "Montserrat", sans-serif; padding-bottom: 0.4rem; font-size: 1.5rem; font-weight: bold;`}>Open Project</div>
                            <ListBox items={projects} css={projectListCss}>
                                    {(item) => {
                                        const date = new Date(item.updatedAt);
                                        const readableUpdateDate = date.toLocaleString("en-US", {
                                        weekday: "long",  
                                        year: "numeric", 
                                        month: "long",   
                                        day: "numeric",   
                                        hour: "numeric", 
                                        minute: "numeric", 
                                        second: "numeric",
                                        hour12: true,
                                        });

                                        return (
                                            <ListBoxItem id={item._id} onAction={async () => {setIsOpen(false); await openProjectWithData(item._id);}}>
                                                <span css={css`font-size: 1rem;`}>{item.title}</span>
                                                <span css={css`font-size: 0.6rem;`}>{readableUpdateDate}</span>
                                            </ListBoxItem>
                                        )
                                    }}
                                </ListBox>
                                <Button css={css`margin-top: 0.3rem;`} slot="close">Close</Button>
                        </div>
                        )}
                    </SiteMenuItemModal>
                    {openProject && 
                    <SiteMenuItemModal title="Delete Project">
                        {({isOpen, setIsOpen}) => (
                        <div css={menuItemContainerCss}>
                            <div css={css`font-family: "Montserrat", sans-serif; padding-bottom: 0.4rem; font-size: 1.5rem; font-weight: bold;`}>Delete Project</div>
                            <div css={css`font-family: "Montserrat", sans-serif; padding-bottom: 0.4rem; font-size: 1rem; `}>Are you sure you want to delete {openProject.title}?</div>
                            <div css={css`display: flex;`}>
                                <Button onPress={async () => { setIsOpen(false); await deleteProject(openProject.data._id); setOpenProject(null); setOpenDocument(null)}}>Yes</Button>
                                <Button slot="close">No</Button>
                            </div>  
                        </div>
                        )}
                    </SiteMenuItemModal>
                    }
                    {openProject && 
                    <SiteMenuItemModal title="Close Project">
                        {({isOpen, setIsOpen}) => (
                        <div css={menuItemContainerCss}>
                            <div css={css`font-family: "Montserrat", sans-serif; padding-bottom: 0.4rem; font-size: 1.5rem; font-weight: bold;`}>Close Project</div>
                            <div css={css`font-family: "Montserrat", sans-serif; padding-bottom: 0.4rem; font-size: 1rem; `}>Are you sure you want to close {openProject.title}?</div>
                            <div css={css`display: flex;`}>
                                <Button onPress={async () => { setIsOpen(false); setOpenProject(null); setOpenDocument(null);}}>Yes</Button>
                                <Button slot="close">No</Button>
                            </div>
                        </div>
                        )}
                    </SiteMenuItemModal>
                    }
                </SiteMenu>
            </li>
            <li>
                <SiteMenu label="Edit">
                    <SiteMenuItem onAction={() => alert('open')}>Undo</SiteMenuItem>
                    <SiteMenuItem onAction={() => alert('open')}>Redo</SiteMenuItem>
                    <SiteMenuItem onAction={() => alert('open')}>Cut</SiteMenuItem>
                    <SiteMenuItem onAction={() => alert('open')}>Copy</SiteMenuItem>
                    <SiteMenuItem onAction={() => alert('open')}>Paste</SiteMenuItem>
                    <SiteMenuItem onAction={() => alert('open')}>Delete</SiteMenuItem>
                    <SiteMenuItem onAction={() => alert('open')}>Delete All</SiteMenuItem>
                    <SiteMenuItem onAction={() => alert('open')}>Select</SiteMenuItem>
                    <SiteMenuItem onAction={() => alert('open')}>Select All</SiteMenuItem>
                </SiteMenu>
            </li>
            <li css={css`margin-left: auto;`}>
                <ToggleButton onChange={e => setCorkboardToggle(e)}><FontAwesomeIcon icon={faThLarge} /></ToggleButton>
            </li>
        </SiteNavbar>
        <MainContentContainer>
            <SiteSidebar setOpenProject={setOpenProject} setOpenDocument={setOpenDocument} openProject={openProject} />
            <Outlet />
        </MainContentContainer>
        </>
    )
}