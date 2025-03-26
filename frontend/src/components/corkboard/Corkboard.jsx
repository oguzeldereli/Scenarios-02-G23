/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Button, ColorSwatch, ColorSwatchPickerItem, Group, RadioGroup, Separator, Toolbar } from "react-aria-components";
import CorkboardNote from "./CorkboardNote";
import { COLOR_TEXT_LIGHT, CORKBOARD_TOOLBAR_DEFAULT_FONT, NAVBAR_COLOR_BACKGROUND, NAVBAR_COLOR_BACKGROUND_HOVER, NAVBAR_COLOR_BORDER } from "../../common/settings/settings";
import { useEffect, useState } from "react";
import { createNote, deleteNote, updateNote } from "../../common/api/APIIndexCards";
import { getProject } from "../../common/api/APIProject";
import { updateDocument } from "../../common/api/APIDocument";
import SitePopover from "../common/SitePopover";
import SiteColorSwatchPicker from "../common/SiteColorSwatchPicker";

export default function Corkboard({openProject, setOpenProject})
{
    const [selectedNoteId, setSelectedNoteId] = useState("");

    async function openProjectWithData(id)
    {
        const project = await getProject(id);
        setOpenProject(project);
    }

    useEffect(() => {
        openProjectWithData(openProject.data._id);
    }, []);

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

    const [selectedColor, setSelectedColor] = useState(null);
        

    function compareFn(a, b) {
        return a.position - b.position;
    }

    function rgbaToHex({ red, green, blue, alpha }) {
        const alph = Math.round(alpha * 255);
        return (
          "#" +
          [red, green, blue]
            .map(x => x.toString(16).padStart(2, "0"))
            .join("")
        );
      }

      async function changeColor(value) {
        const hex = rgbaToHex(value);
        setSelectedColor(hex);
    
        if (!selectedNoteId) {  
            return;
        }

        await updateNote(selectedNoteId, { colour: hex });
    
        const newNote = {...openProject.notes.find(x => x._id === selectedNoteId)};
        newNote.colour = hex;
        console.log(newNote);
        setOpenProject((project) => {
            const updatedNotes = [
                ...project.notes.filter(x => x._id !== selectedNoteId),
                newNote
            ].sort(compareFn);
        
            return {
                ...project,
                notes: updatedNotes
            };
        });
    }

    return (
        <Group css={groupCss}>
            <Toolbar css={toolbarCss}>
                <Button onPress={async () => {await createNote(openProject.data._id, " ", " ", "#ffffff", openProject.notes[openProject.notes.length - 1].position + 1 || 1); await openProjectWithData(openProject.data._id);}}>New Note</Button>
                <Separator orientation="vertical" />
                <SitePopover label="Color Tag" isDisabled={selectedNoteId === ""}>
                    <SiteColorSwatchPicker value={selectedColor} onChange={changeColor}>
                        <ColorSwatchPickerItem color="#fff">
                            <ColorSwatch />
                        </ColorSwatchPickerItem>
                        <ColorSwatchPickerItem color="#A00">
                            <ColorSwatch />
                        </ColorSwatchPickerItem>
                        <ColorSwatchPickerItem color="#f80">
                            <ColorSwatch />
                        </ColorSwatchPickerItem>
                        <ColorSwatchPickerItem color="#080">
                            <ColorSwatch />
                        </ColorSwatchPickerItem>
                        <ColorSwatchPickerItem color="#08f">
                            <ColorSwatch />
                        </ColorSwatchPickerItem>
                        <ColorSwatchPickerItem color="#088">
                            <ColorSwatch />
                        </ColorSwatchPickerItem>
                        <ColorSwatchPickerItem color="#008">
                            <ColorSwatch />
                        </ColorSwatchPickerItem>
                    </SiteColorSwatchPicker>
                </SitePopover>
                <Button isDisabled={selectedNoteId === ""} onPress={async () => {await deleteNote(selectedNoteId); setOpenProject((project) => ({...project, notes: project.notes.filter(x => x._id !== selectedNoteId)}));}}>Delete Note</Button>
            </Toolbar>
            <RadioGroup css={corkboardCss} value={selectedNoteId} onChange={setSelectedNoteId}>
                {openProject && openProject.notes && [...openProject.notes].sort(compareFn).map(note => <CorkboardNote setOpenProject={setOpenProject} openProject={openProject} key={note._id} note={note}/>)}
            </RadioGroup>
        </Group>
    )
}