/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { MenuItem } from "react-aria-components"
import { COLOR_HOVER_LIGHT, DEFAULT_BORDER_RADIUS, DEFAULT_FONT_SIZE } from "../../common/settings/settings";

export default function SiteMenuItem({children})
{
    const menuItemCss = css`
        margin: 2px;
        padding: 0.3rem 0.4rem;
        border-radius: ${DEFAULT_BORDER_RADIUS};
        outline: none;
        cursor: default;
        color: #000;
        font-size: ${DEFAULT_FONT_SIZE};
        position: relative;
        display: grid;
        grid-template-areas: "label kbd"
                            "desc  kbd";
        align-items: center;
        column-gap: 20px;
        forced-color-adjust: none;

        &:hover {
            background-color: ${COLOR_HOVER_LIGHT};
        }
    `;

    return (
        <MenuItem css={menuItemCss}>
            {children}
        </MenuItem>
    )
}