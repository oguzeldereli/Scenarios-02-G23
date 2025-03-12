/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MAIN_COLOR_BACKGROUND, MAIN_CONTENT_FONT_DEFAULT, COLOR_TEXT_DARK } from '../../common/settings/settings';

export default function MainContentContainer({children})
{
    const mainContentContainerCss = css`
        font-family: "${MAIN_CONTENT_FONT_DEFAULT}", sans-serif;
        background-color: ${MAIN_COLOR_BACKGROUND};
        color: ${COLOR_TEXT_DARK};
        font-size: 1rem;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
    `;

    return (
        <main css={mainContentContainerCss}>
            {children}
        </main>
    )
}