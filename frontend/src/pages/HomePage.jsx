/** @jsxImportSource @emotion/react */
import { useState } from "react";
import Corkboard from "../components/corkboard/Corkboard";
import Editor from "../components/textEditor/editor";
import { css } from "@emotion/react";

export default function HomePage({setOpenDocument, setOpenProject, openDocument, openProject, corkboard, darkModeOn, setTheme})
{
    return (
        <>
            {corkboard && openProject && <Corkboard />}
            {corkboard && !openProject && <div css={css`margin: auto;`}>Open a Project to view corkboard</div>}
            {!corkboard && openDocument && <Editor setOpenProject={setOpenProject} setOpenDocument={setOpenDocument} openDocument={openDocument} openProject={openProject} darkModeOn={darkModeOn} setTheme={setTheme}/>}
            {!corkboard && !openDocument && 
                <div css={css`margin: auto; display: flex; flex-direction: column;`}>
                    {openProject && <span css={css`margin-bottom: 0.3rem; font-family: "Montserrat"; font-size: 2rem; font-weight: bold;`}>Project: {openProject.data.title}</span>}
                    <span>Open a document within any project to view text editor</span>
                </div>
            }
        </>
    )
}