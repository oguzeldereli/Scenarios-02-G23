/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { ColorSwatchPicker } from "react-aria-components";

export default function SiteColorSwatchPicker({children, value, onChange})
{

    const colorPickerCss = css`
        display: flex;
        gap: 0.2rem;
        flex-wrap: wrap;

        .react-aria-ColorSwatchPickerItem {
            position: relative;
            outline: none;
            border-radius: 4px;
            width: fit-content;
            forced-color-adjust: none;

            &[data-focus-visible] {
                outline: 2px solid black;
                outline-offset: 2px;
            }

            &[data-selected]::after {
                content: '';
                position: absolute;
                inset: 0;
                border: 2px solid black;
                outline: 2px solid white;
                outline-offset: -4px;
                border-radius: inherit;
            }
        }

        .react-aria-ColorSwatch {
            width: 24px;
            height: 24px;
            border-radius: 4px;
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
        }
    `;
    
    return (
        <ColorSwatchPicker value={value} onChange={onChange} css={colorPickerCss}>
            {children}
        </ColorSwatchPicker>
    )
}
