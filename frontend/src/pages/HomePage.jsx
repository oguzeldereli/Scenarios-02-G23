import { useState } from "react";
import Corkboard from "../components/corkboard/Corkboard";
import Editor from "../components/textEditor/editor";

export default function HomePage({corkboard, darkModeOn, setTheme})
{
    return (
        <>
            {corkboard && <Corkboard />}
            {!corkboard && <Editor darkModeOn={darkModeOn} setTheme={setTheme}/>}
        </>
    )
}