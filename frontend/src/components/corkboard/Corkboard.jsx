/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Button, Group, Separator, Toolbar } from "react-aria-components";
import CorkboardNote from "./CorkboardNote";
import { COLOR_TEXT_LIGHT, CORKBOARD_TOOLBAR_DEFAULT_FONT, NAVBAR_COLOR_BACKGROUND, NAVBAR_COLOR_BACKGROUND_HOVER, NAVBAR_COLOR_BORDER } from "../../common/settings/settings";


export default function Corkboard()
{
    const groupCss = css`
        height: 100%;
        width: 100%;
        background-color: #f2efeb;
    `;

    const toolbarCss = css`
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
        padding: 0.3rem;
        background-color: ${NAVBAR_COLOR_BACKGROUND};
        border-bottom: 1px solid ${NAVBAR_COLOR_BORDER};

        .react-aria-Separator {
            align-self: stretch;
            background-color: ${NAVBAR_COLOR_BORDER};

            &[aria-orientation=vertical] {
                width: 1px;
                margin: 0px 0.2rem;
            }
        }

        & .react-aria-Button {
            border: none;
            font-family: "${CORKBOARD_TOOLBAR_DEFAULT_FONT}";
            background-color: ${NAVBAR_COLOR_BACKGROUND};
            padding: 0.5rem;
            cursor: pointer;

            &:disabled {
                cursor: default;
            }

            &:not(:disabled):hover {
                background-color: ${NAVBAR_COLOR_BACKGROUND_HOVER};
                color: ${COLOR_TEXT_LIGHT};
            }
        }
    `;

    const corkboardCss = css`
        padding: 0.3rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
    `;

    return (
        <Group css={groupCss}>
            <Toolbar css={toolbarCss}>
                <Button>New Note</Button>
                <Separator orientation="vertical" />
                <Button isDisabled="true">Color Tag</Button>
                <Button isDisabled="true">Delete Note</Button>
            </Toolbar>
            <Group css={corkboardCss}>
                <CorkboardNote />
                <CorkboardNote />
                <CorkboardNote />
                <CorkboardNote />
                <CorkboardNote />
            </Group>
        </Group>
    )
}