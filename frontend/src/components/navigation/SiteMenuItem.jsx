/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { MenuItem } from "react-aria-components"
import { COLOR_HOVER_LIGHT, DEFAULT_BORDER_RADIUS, DEFAULT_FONT_SIZE } from "../../common/settings/settings";
import { forwardRef } from "react";

export default function SiteMenuItem({children, onAction})
{   
    const menuItemCss = css`
        margin: 2px;
        border-radius: ${DEFAULT_BORDER_RADIUS};
        outline: none;
        cursor: default;    
        color: #000;
        font-size: ${DEFAULT_FONT_SIZE};
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        column-gap: 20px;
        forced-color-adjust: none;

        &:hover {
            background-color: ${COLOR_HOVER_LIGHT};
        }

        & button {
            width: 100%;
            height: 100%;
            background-color: inherit;
            border: none;
            text-align: start;
            font: inherit;
            margin: 0;
            padding: 0.3rem 0.4rem;
        }
    `;

    return (
        <MenuItem onAction={(e) => { e.stopPropagation(); onAction?.(); }} css={menuItemCss}>    
            {children}
        </MenuItem>
    )
}