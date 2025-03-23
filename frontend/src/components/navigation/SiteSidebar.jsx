/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { NAVBAR_COLOR_BACKGROUND, NAVBAR_COLOR_BACKGROUND_HOVER, NAVBAR_COLOR_BORDER } from "../../common/settings/settings";
import { Button, Tree, TreeItem, TreeItemContent } from "react-aria-components";
import { useEffect, useState } from "react";
import { getProject } from "../../common/api/APIProject";
import { createDocument } from "../../common/api/APIDocument";

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

  function CustomTreeItem(props) {
    return (
      <TreeItem textValue={props.title} {...props}>
        <CustomTreeItemContent>
          {props.title}
        </CustomTreeItemContent>
        {props.children}
      </TreeItem>
    );
  }

export default function SiteSidebar({children, openProject})
{
    const [openProjectData, setOpenProjectData] = useState(null);  

    useEffect(() => {
        async function getOpenProjectData()
        {
            const data = await getProject(openProject._id);
            console.log(data);
            setOpenProjectData(data);
        }

        getOpenProjectData();
    }, [openProject]);

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

    return (
        <div aria-label="sidebar" css={sidebarCss}>
            {openProject && <div css={css`font-family: "Montserrat"; font-size: 1rem; font-weight: 400; padding: 0.3rem; border-bottom: 1px solid #0f0f0f;`}>{openProject.title}</div>}
            <Tree css={treeCss}
                aria-label="Files"
                selectionMode="none"
                defaultSelectedKeys={['photos']}
                >
                <CustomTreeItem title="Scenes">
                  {openProjectData && openProjectData.documents && openProjectData.documents.filter(document => document.type === "scene").map(document => {
                      return (
                        <CustomTreeItem title={document.title} />
                      )
                  })}
                </CustomTreeItem>
                <CustomTreeItem title="Characters">
                  {openProjectData && openProjectData.documents && openProjectData.documents.filter(document => document.type === "character").map(document => {
                      return (
                        <CustomTreeItem title={document.title} />
                      )
                  })}
                </CustomTreeItem>
                <CustomTreeItem title="Locations">
                  {openProjectData && openProjectData.documents && openProjectData.documents.filter(document => document.type === "scene").map(document => {
                      return (
                        <CustomTreeItem title={document.title} />
                      )
                  })}
                </CustomTreeItem>
                <CustomTreeItem title="Research">
                  {openProjectData && openProjectData.documents && openProjectData.documents.filter(document => document.type === "research").map(document => {
                      return (
                        <CustomTreeItem title={document.title} />
                      )
                  })}
                </CustomTreeItem>
            </Tree>
        </div>
    )
}