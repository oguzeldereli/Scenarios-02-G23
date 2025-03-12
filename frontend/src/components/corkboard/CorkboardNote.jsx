/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Checkbox, Group, Input, TextArea } from "react-aria-components"
import { CORKBOARD_TITLE_BODY_FONT, CORKBOARD_TITLE_COLOR_BORDER, CORKBOARD_TITLE_DEFAULT_FONT } from "../../common/settings/settings";

export default function CorkboardNote()
{
    const corkboardNoteCss = css`
        width: 200px;
        min-height: 150px;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
    `;

    const corkboardNoteTitle = css`
        padding: 0.2rem;
        border-bottom: 1px solid ${CORKBOARD_TITLE_COLOR_BORDER};
        display: flex;
        gap: 0.3rem;

        & .react-aria-Input {
            font-family: "${CORKBOARD_TITLE_DEFAULT_FONT}", sans-serif;
            font-size: 0.6rem;
            font-weight: 600;
            border: none;

            &:focus {
                outline: none;
            }
        }

        & .react-aria-Checkbox {
            display: flex;
            align-items: center;
            gap: 0.571rem;
            font-size: 1.143rem;
            color: black;
            forced-color-adjust: none;

            .checkbox {
                width: 0.8rem;
                height: 0.8rem;
                border: 1px solid black;
                border-radius: 4px;
                transition: all 200ms;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            svg {
                width: 1rem;
                height: 1rem;
                fill: none;
                stroke: white;
                stroke-width: 2px;
                stroke-dasharray: 22px;
                stroke-dashoffset: 66;
                transition: all 200ms;
            }

            &[data-pressed] .checkbox {
                border-color: ${CORKBOARD_TITLE_COLOR_BORDER};
            }

            &[data-focus-visible] .checkbox {
                outline: 1px solid ${CORKBOARD_TITLE_COLOR_BORDER};
                outline-offset: 1px;
            }

            &[data-selected],
            &[data-indeterminate] {
                .checkbox {
                border-color: ${CORKBOARD_TITLE_COLOR_BORDER};
                background: ${CORKBOARD_TITLE_COLOR_BORDER};
                }

                &[data-pressed] .checkbox {
                border-color: black;
                background: black;
                }

                svg {
                stroke-dashoffset: 44;
                }
            }

            &[data-indeterminate] {
                & svg {
                stroke: none;
                fill: ${CORKBOARD_TITLE_COLOR_BORDER};
                }
            }
        }
    `;

    const corkboardNoteBody = css`
        padding: 0.3rem;
        word-wrap: wrap;
        overflow-y: auto;
        font-family: "${CORKBOARD_TITLE_BODY_FONT}", sans-serif;
        font-size: 0.8rem;
        font-weight: normal;
        flex-grow: 1;
        display: flex;

        & .react-aria-TextArea {
            font-family: "${CORKBOARD_TITLE_DEFAULT_FONT}", sans-serif;
            font-size: 0.6rem;
            font-weight: 600;
            border: none;
            overflow-y: auto;
            text-overflow: ellipsis;
            resize: none;
            flex-grow: 1;

            &:focus {
                outline: none;
            }
        }
    `;

    return (    
        <>
        <Group css={corkboardNoteCss}>
            <div css={corkboardNoteTitle}>
                <Checkbox>
                    <div className="checkbox">
                        <svg viewBox="0 0 18 18" aria-hidden="true">
                        <polyline points="1 9 7 14 15 4" />
                        </svg>
                    </div>
                </Checkbox>
                <Input type="text" />
            </div>
            <div css={corkboardNoteBody}>
                <TextArea></TextArea>
            </div>
        </Group>
        </>
    )
}