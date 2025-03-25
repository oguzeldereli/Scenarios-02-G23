import React, { useRef, useState, useEffect, useMemo } from "react";
import JoditEditor from "jodit-react";
import "./Editor.css";
import { ToggleButton } from "react-aria-components";
import { updateProject } from "../../common/api/APIProject";
import { updateDocument } from "../../common/api/APIDocument";

const Editor = ({openDocument, darkModeOn, setTheme, openProject, openProjectdata}) => {
  const editor = useRef(null);
  const [value, setValue] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    if (openDocument && openProject) {
      initialized.current = false;
      setValue(openDocument.content);
    }
  }, [openDocument]);

  useEffect(() => {
    async function update() {
      if (!openDocument || !openProject) {
        return;
      }

      if(!initialized.current)
      {
        initialized.current = true;
        return;
      }
  
      const newDoc = { ...openDocument, content: value };
      await updateDocument(openProject._id, openDocument._id, newDoc);
    }
  
    update();
  }, [value]);

  useEffect(() => {
    if (darkModeOn) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkModeOn]);

  const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }

  const debounceSetValue = debounce(setValue, 300);

  const config = useMemo(() => ({
    width: "min(1000px, 100%)",
    minHeight: "1000px",
    height: "100%",
    theme: darkModeOn ? "dark" : "light",
    toolbar: !darkModeOn, // Hide toolbar in dark modeb
    showXPathInStatusbar: !darkModeOn, // Hide status bar in dark mode
  }), [darkModeOn]);

  return (
    <div className="editor-wrapper">
      <div className="editor-header">
        <button className={darkModeOn ? "toggle-button-dark" : "toggle-button"} onClick={() => setTheme((prev) => !prev)}>
          Focus Mode
        </button>
      </div>
      <div className="editor-container">
        <JoditEditor value={value} onChange={debounceSetValue} key={darkModeOn} ref={editor} config={config} />
      </div>
    </div>
  );
};



export default Editor;
