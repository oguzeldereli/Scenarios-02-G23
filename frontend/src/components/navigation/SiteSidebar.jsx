/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { NAVBAR_COLOR_BACKGROUND, NAVBAR_COLOR_BACKGROUND_HOVER, NAVBAR_COLOR_BORDER } from "../../common/settings/settings";
import { Button, Tree, TreeItem, TreeItemContent } from "react-aria-components";

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

export default function SiteSidebar({children})
{
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
            <Tree css={treeCss}
                aria-label="Files"
                selectionMode="none"
                defaultSelectedKeys={['photos']}
                >
                <CustomTreeItem title="Scenes">
                    <CustomTreeItem title="Scene1" />
                </CustomTreeItem>
                <CustomTreeItem title="Characters">
                    <CustomTreeItem title="Character1" />
                    <CustomTreeItem title="Character2" />
                    <CustomTreeItem title="Character3" />
                </CustomTreeItem>
                <CustomTreeItem title="Locations">
                    <CustomTreeItem title="Location1" />
                    <CustomTreeItem title="Location2" />
                </CustomTreeItem>
                <CustomTreeItem title="Research">
                    <CustomTreeItem title="Research1" />
                    <CustomTreeItem title="Research2" />
                    <CustomTreeItem title="Research3" />
                </CustomTreeItem>
            </Tree>
        </div>
    )
}