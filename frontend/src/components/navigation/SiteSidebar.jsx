/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { NAVBAR_COLOR_BACKGROUND, NAVBAR_COLOR_BACKGROUND_HOVER, NAVBAR_COLOR_BORDER } from "../../common/settings/settings";
import { Button, DialogTrigger, Input, TextField, Tree, TreeItem, TreeItemContent } from "react-aria-components";
import { useEffect, useState } from "react";
import { getProject } from "../../common/api/APIProject";
import { createDocument, getDocument } from "../../common/api/APIDocument";
import SiteModal from "../common/SiteModal";

function CustomTreeItemContent(props) {
    return (
      <TreeItemContent>
        {(
          { hasChildItems, selectionBehavior, selectionMode }
        ) => (
          <>
            <Button slot="chevron">
              <svg viewBox="0 0 24 24">
                <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </Button>
            {props.children}
          </>
        )}
      </TreeItemContent>
    );
  }

  function  CustomTreeItem(props) {
    return (
      <TreeItem onAction={props.onAction} textValue={props.title} {...props}>
        <CustomTreeItemContent>
          <div css={css`display: flex; justify-content: space-between; align-items: center; width: 100%;`}>
            {props.title}
            {props.buttonAction && props.buttonText &&
            <>
            <Button onPress={props.buttonAction}>
              {props.buttonText}
            </Button>
            </>
            }
            {props.modalView && props.modal !== undefined &&
            <DialogTrigger>
            <Button>
              +
            </Button>
            <SiteModal>
              {(mprops) => props.modal(mprops)}
            </SiteModal>
            </DialogTrigger>}
          </div>
        </CustomTreeItemContent>
        {props.children}
      </TreeItem>
    );
  }

export default function SiteSidebar({setOpenDocument, children, openProject, setOpenProject})
{
    async function changeOpenDocument(id)
    {
        if(!openProject) 
        {
          return null;
        }

        var document = await getDocument(openProject._id, id);
        setOpenDocument(document);
    }

    async function openProjectWithData(id)
    {
        console.log(id);
        const project = await getProject(id);
        setOpenProject(project);
    }

    const sidebarCss = css`
        min-width: 200px;
        height: 100%;
        background-color: ${NAVBAR_COLOR_BACKGROUND };
        border-right: 1px solid ${NAVBAR_COLOR_BORDER};
    `;

    const treeCss = css`
        display: flex;
        flex-direction: column;
        gap: 2px;
        overflow: auto;
        background: inherit;
        forced-color-adjust: none;
        padding: 0.3rem 0;
        outline: none;
        height: 100%;
        box-sizing: border-box;

        .react-aria-TreeItem {
            display: flex;
            align-items: center;
            gap: 0.571rem;
            padding: 0.2rem;
            --padding: 1rem;
            outline: none;
            cursor: default;
            color: black;
            font-size: 0.8rem;
            position: relative;
            transform: translateZ(0);
            font-family: "Montserrat", sans-serif;
            
            &:hover {
                background-color: ${NAVBAR_COLOR_BACKGROUND_HOVER};
                color: white;
            }

            .react-aria-Button[slot=chevron] {
                all: unset;
                display: flex;
                visibility: hidden;
                align-items: center;
                justify-content: center;
                width: 1.3rem;
                height: 100%;
                padding-left: calc((var(--tree-item-level) - 1) * var(--padding));

                svg {
                    rotate: 0deg;
                    transition: rotate 200ms;
                    width: 12px;
                    height: 12px;
                    fill: none;
                    stroke: currentColor;
                    stroke-width: 3px;
                }
            }

            &[data-has-child-items] .react-aria-Button[slot=chevron] {
                visibility: visible;
            }

            &[data-expanded] .react-aria-Button[slot=chevron] svg {
                rotate: 90deg;
            }
        }
    `;

    const modalContentCss = css`
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

    const [sceneTitle, setSceneTitle] = useState("");
    const [characterTitle, setCharacterTitle] = useState("");
    const [locationTitle, setLocationTitle] = useState("");
    const [researchTitle, setResearchTitle] = useState("");

    return (
        <div aria-label="sidebar" css={sidebarCss}>
            {openProject && <div css={css`font-family: "Montserrat"; font-size: 1rem; font-weight: 400; padding: 0.3rem; border-bottom: 1px solid #0f0f0f; color: black;`}>{openProject.data.title}</div>}
            <Tree css={treeCss}
                aria-label="Files"
                selectionMode="none"
                defaultSelectedKeys={['photos']}
                >
                <CustomTreeItem title="Scenes" modalView={openProject} modal={({isOpen, setIsOpen}) => (
                     <div css={modalContentCss}>
                        <div css={css`font-family: "Montserrat", sans-serif; padding-bottom: 0.4rem; font-size: 1.5rem; font-weight: bold;`}>Add Scene</div>
                        <TextField css={css`margin: 0;`} placeholder="Enter Title..." value={sceneTitle} onChange={setSceneTitle}>
                            <Input type="text" aria-label="Title Input" />
                        </TextField>
                        <div css={css`display: flex; padding-top: 0.3rem;`}>
                            <Button slot="close" onPress={async () => { setIsOpen(false); var newDocument = await createDocument(openProject.data._id, sceneTitle, " ", "scene"); await openProjectWithData(openProject.data._id); setOpenDocument(newDocument);}}>Create</Button>
                            <Button slot="close">Close</Button>
                        </div>
                    </div>
                  )}>
                  {openProject && openProject.documents && openProject.documents.filter(document => document.type === "scene").map(document => {
                      return (
                        <CustomTreeItem key={"doc-" + document._id} onAction={() => changeOpenDocument(document._id)} title={document.title} />
                      )
                  })}
                </CustomTreeItem>
                <CustomTreeItem title="Characters" modalView={openProject} modal={({isOpen, setIsOpen}) => (
                     <div css={modalContentCss}>
                        <div css={css`font-family: "Montserrat", sans-serif; padding-bottom: 0.4rem; font-size: 1.5rem; font-weight: bold;`}>Add Character</div>
                        <TextField css={css`margin: 0;`} placeholder="Enter Title..." value={characterTitle} onChange={setCharacterTitle}>
                            <Input type="text" aria-label="Title Input" />
                        </TextField>
                        <div css={css`display: flex; padding-top: 0.3rem;`}>
                            <Button slot="close" onPress={async () => { setIsOpen(false); var newDocument = await createDocument(openProject.data._id, characterTitle, " ", "character"); await openProjectWithData(openProject.data._id); setOpenDocument(newDocument);}}>Create</Button>
                            <Button slot="close">Close</Button>
                        </div>
                    </div>
                  )}>
                  {openProject && openProject.documents && openProject.documents.filter(document => document.type === "character").map(document => {
                      return (
                        <CustomTreeItem key={"doc-" + document._id} onAction={() => changeOpenDocument(document._id)} title={document.title} />
                      )
                  })}
                </CustomTreeItem>
                <CustomTreeItem title="Locations" modalView={openProject} modal={({isOpen, setIsOpen}) => (
                     <div css={modalContentCss}>
                        <div css={css`font-family: "Montserrat", sans-serif; padding-bottom: 0.4rem; font-size: 1.5rem; font-weight: bold;`}>Add Location</div>
                        <TextField css={css`margin: 0;`} placeholder="Enter Title..." value={locationTitle} onChange={setLocationTitle}>
                            <Input type="text" aria-label="Title Input" />
                        </TextField>
                        <div css={css`display: flex; padding-top: 0.3rem;`}>
                            <Button slot="close" onPress={async () => { setIsOpen(false); var newDocument = await createDocument(openProject.data._id, locationTitle, " ", "location"); await openProjectWithData(openProject.data._id); setOpenDocument(newDocument);}}>Create</Button>
                            <Button slot="close">Close</Button>
                        </div>
                    </div>
                  )}>
                  {openProject && openProject.documents && openProject.documents.filter(document => document.type === "location").map(document => {
                      return (
                        <CustomTreeItem key={"doc-" + document._id} onAction={() => changeOpenDocument(document._id)} title={document.title} />
                      )
                  })}
                </CustomTreeItem>
                <CustomTreeItem title="Research" modalView={openProject} modal={({isOpen, setIsOpen}) => (
                     <div css={modalContentCss}>
                        <div css={css`font-family: "Montserrat", sans-serif; padding-bottom: 0.4rem; font-size: 1.5rem; font-weight: bold;`}>Add Research</div>
                        <TextField css={css`margin: 0;`} placeholder="Enter Title..." value={researchTitle} onChange={setResearchTitle}>
                            <Input type="text" aria-label="Title Input" />
                        </TextField>
                        <div css={css`display: flex; padding-top: 0.3rem;`}>
                            <Button slot="close" onPress={async () => { setIsOpen(false); var newDocument = await createDocument(openProject.data._id, researchTitle, " ", "research"); await openProjectWithData(openProject.data._id); setOpenDocument(newDocument);}}>Create</Button>
                            <Button slot="close">Close</Button>
                        </div>
                    </div>
                  )}>
                  {openProject && openProject.documents && openProject.documents.filter(document => document.type === "research").map(document => {
                      return (
                        <CustomTreeItem key={"doc-" + document._id} onAction={() => changeOpenDocument(document._id)} title={document.title} />
                      )
                  })}
                </CustomTreeItem>
            </Tree>
        </div>
    )
}