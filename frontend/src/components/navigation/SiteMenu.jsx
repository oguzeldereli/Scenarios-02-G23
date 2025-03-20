/** @jsxImportSource @emotion/react */
import { Button, Menu, MenuTrigger, Popover } from "react-aria-components";
import { COLOR_BORDER_MONO, DEFAULT_BORDER_RADIUS, DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE, MENU_BUTTON_FONT_DEFAULT, MENU_BUTTON_PADDING, MENU_MIN_WIDTH, MENU_PADDING } from "../../common/settings/settings";
import { css } from "@emotion/react";

export default function SiteMenu({label, children})
{
    const menuTriggerButtonCss = css`
        font-family: "${MENU_BUTTON_FONT_DEFAULT}", sans-serif; 
        font-size: ${DEFAULT_FONT_SIZE};
        padding: ${MENU_BUTTON_PADDING};
        box-sizing: border-box;
        border: none;
        background: none;
        background-color: transparent;
        cursor: pointer;
    `;

    const menuCss = css`
        max-height: inherit;
        box-sizing: border-box;
        overflow: auto;
        min-width: ${MENU_MIN_WIDTH};
        border: 1px solid ${COLOR_BORDER_MONO};
        border-radius: ${DEFAULT_BORDER_RADIUS};
        font-family: ${DEFAULT_FONT_FAMILY};
        padding: ${MENU_PADDING};
        background-color: white;
        box-sizing: border-box;
        outline: none;
        z-index: 1000;
    `;

     return (
        <MenuTrigger>
            <Button css={menuTriggerButtonCss}>{label}</Button>
            <Popover>
                <Menu css={menuCss}>
                    {children}
                </Menu>
            </Popover>
        </MenuTrigger>
     )
}