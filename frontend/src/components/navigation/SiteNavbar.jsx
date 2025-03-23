/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { MAIN_NAVBAR_FONT_DEFAULT, MAIN_NAVBAR_GAP, MAIN_NAVBAR_PADDING_ITEM, NAVBAR_COLOR_BACKGROUND, NAVBAR_COLOR_BACKGROUND_HOVER, NAVBAR_COLOR_BORDER, COLOR_TEXT_DARK, COLOR_TEXT_LIGHT, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE, CORKBOARD_TITLE_COLOR_BORDER } from "../../common/settings/settings";
import React from "react";

export default function SiteNavbar({children})
{
    const mainNavbarCss = css`
        font-family: ${MAIN_NAVBAR_FONT_DEFAULT};
        background-color: ${NAVBAR_COLOR_BACKGROUND};
        color: ${COLOR_TEXT_DARK};
        border-bottom: 1px solid ${NAVBAR_COLOR_BORDER};
        width: 100%;
        padding: 0;
        margin: 0;
    `;

    const mainNavbarUlCss = css`
        display: flex;
        gap: ${MAIN_NAVBAR_GAP};
        list-style: none;
        padding: 0;
        margin: 0 auto;

        & button {
            background-color: ${NAVBAR_COLOR_BACKGROUND};
            padding: ${MAIN_NAVBAR_PADDING_ITEM};
            font-family: ${DEFAULT_FONT_FAMILY}, sans-serif;
            font-size: ${DEFAULT_FONT_SIZE};
            border: none;
            outline: none;

            &:hover {
                background-color: ${NAVBAR_COLOR_BACKGROUND_HOVER};
                color: ${COLOR_TEXT_LIGHT};
            }

            &[data-selected]
            {
                background-color: ${CORKBOARD_TITLE_COLOR_BORDER};
                color: ${COLOR_TEXT_LIGHT};
            }

            &[data-selected]:hover {
                background-color: ${NAVBAR_COLOR_BACKGROUND_HOVER};
                color: ${COLOR_TEXT_LIGHT};
            }
        }

        & a {
            display: inline-block;
            padding: ${MAIN_NAVBAR_PADDING_ITEM};
            text-decoration: none;
            color: inherit;
            cursor: pointer;
            
            &:visited, &:link {
                color: inherit;
            }

            &:hover {
                background-color: ${NAVBAR_COLOR_BACKGROUND_HOVER};
                color: ${COLOR_TEXT_LIGHT};
            }
        }
    `;

    return (
        <nav css={mainNavbarCss}>
            <ul css={mainNavbarUlCss}>
                {children}
            </ul>
        </nav>
    )
}