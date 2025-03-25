/** @jsxImportSource @emotion/react */
import { useState } from "react";
import Corkboard from "../components/corkboard/Corkboard";
import Editor from "../components/textEditor/editor";
import { css } from "@emotion/react";

export default function HomePage({openDocument, openProject, openProjectdata, corkboard, darkModeOn, setTheme})
{
    return (
        <>
            {corkboard && openProject && <Corkboard />}
            {corkboard && !openProject && <div css={css`margin: auto;`}>Open a Project to view corkboard</div>}
            {!corkboard && openDocument && <Editor openDocument={openDocument} openProject={openProject} openProjectdata={openProjectdata} darkModeOn={darkModeOn} setTheme={setTheme}/>}
            {!corkboard && !openDocument && <div css={css`margin: auto;`}>Open a document within any project to view text editor</div>}
        </>
    )
}