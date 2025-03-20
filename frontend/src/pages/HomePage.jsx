import { useState } from "react";
import Corkboard from "../components/corkboard/Corkboard";
import TextEditor from "../components/textEditor/TextEditor";

export default function HomePage()
{

    return (
        <>
            <Corkboard />
            <TextEditor />
        </>
    )
}