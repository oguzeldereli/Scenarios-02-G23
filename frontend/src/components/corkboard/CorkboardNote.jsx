/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Group,
  Input,
  Radio,
  TextArea,
  TextField,
} from "react-aria-components";
import {
  CORKBOARD_TITLE_BODY_FONT,
  CORKBOARD_TITLE_COLOR_BORDER,
  CORKBOARD_TITLE_DEFAULT_FONT,
} from "../../common/settings/settings";
import { useEffect, useState, useCallback } from "react";
import { getNote, updateNote } from "../../common/api/APIIndexCards";
import { getProject } from "../../common/api/APIProject";

export default function CorkboardNote({ setOpenProject, openProject, note }) {
    const [titleValue, setTitleValue] = useState(note.title || "");
    const [contentValue, setContentValue] = useState(note.content || "");
    const [colorValue, setColorValue] = useState(note.colour || "");

    useEffect(() => {
        setTitleValue(note.title || "");
        setContentValue(note.content || "");
        setColorValue(note.colour || "");
    }, [note]);
      
    async function openProjectWithData(id)
    {
        const project = await getProject(id);
        setOpenProject(project);
    }

    const debounce = (callback, wait) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
        callback(...args);
        }, wait);
    };
    };

    const sendUpdate = debounce(async (updatedFields) => {
        await updateNote(note._id, updatedFields);
    }, 500);

    const handleTitleChange = async (value) => {
        setTitleValue(value);
        setOpenProject((project) => {
            const updatedNotes = project.notes.map(n =>
                n._id === note._id ? { ...n, title: value } : n
            );
            return { ...project, notes: updatedNotes };
        });
        await sendUpdate({ title: value });
    };

    const handleContentChange = async (value) => {
        setContentValue(value);
        setOpenProject((project) => {
            const updatedNotes = project.notes.map(n =>
                n._id === note._id ? { ...n, content: value } : n
            );
            return { ...project, notes: updatedNotes };
        });
        await sendUpdate({ content: value });
    };

    const corkboardNoteCss = css`
    width: 200px;
    min-height: 150px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 3px;
    display: flex;
    flex-direction: column;

    &:focus-within {
        outline: 2px solid ${CORKBOARD_TITLE_COLOR_BORDER};
    }
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
        flex-grow: 1;

        &:focus {
            outline: none;
        }
    }

    & .react-aria-Radio {
        display: flex;
        align-items: center;
        gap: 0.571rem;
        font-size: 1.143rem;
        color: ${CORKBOARD_TITLE_COLOR_BORDER};
        forced-color-adjust: none;

        &:before {
        content: "";
        display: block;
        width: 1.286rem;
        height: 1.286rem;
        box-sizing: border-box;
        border: 0.143rem solid ${CORKBOARD_TITLE_COLOR_BORDER};
        background: white;
        border-radius: 1.286rem;
        transition: all 200ms;
        }

        &[data-pressed]:before {
        border-color: ${CORKBOARD_TITLE_COLOR_BORDER};
        }

        &[data-selected]:before {
        border-color: ${CORKBOARD_TITLE_COLOR_BORDER};
        border-width: 0.429rem;
        }

        &[data-focus-visible]:before {
        outline: 2px solid ${CORKBOARD_TITLE_COLOR_BORDER};
        outline-offset: 2px;
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
    <Group
        css={[
        corkboardNoteCss,
        colorValue && css`
            border-left: 4px solid ${colorValue};
        `,
        ]}
    >
        <div css={corkboardNoteTitle}>
            <Radio value={note._id} aria-label="Select button" />
            <TextField css={css`width: 100%; height: 100%; display: flex;`} value={titleValue} onChange={handleTitleChange}>
                <Input type="text" />
            </TextField>
        </div>
        <div css={corkboardNoteBody}>
            <TextField css={css`width: 100%; height: 100%; display: flex;`} value={contentValue} onChange={handleContentChange}>
                <TextArea />
            </TextField>
        </div>
    </Group>
    );
}
