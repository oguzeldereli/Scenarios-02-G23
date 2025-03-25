import React, { useRef, useState, useEffect, useMemo } from "react";
import JoditEditor from "jodit-react";
import "./Editor.css";
import { ToggleButton } from "react-aria-components";
import { getProject, updateProject } from "../../common/api/APIProject";
import { deleteDocument, updateDocument } from "../../common/api/APIDocument";

const Editor = ({setOpenDocument, openDocument, darkModeOn, setTheme, setOpenProject, openProject}) => {
  const editor = useRef(null);
  const [value, setValue] = useState("");
  const [placeholder, setPlaceholder] = useState("Start typing...");

  async function openProjectWithData(id)
  {
      const project = await getProject(id);
      setOpenProject(project);
  }
  
  useEffect(() => {
    if (openDocument && openProject) {
      setValue(openDocument.content);
      setPlaceholder("");
    }
  }, [openDocument, openProject]);

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

  const update = async (value) => {
    if (!openDocument || !openProject) {
      return;
    }

    const newDoc = { ...openDocument, content: value };
    await updateDocument(openProject._id, openDocument._id, newDoc);
  }

  const debounceUpdate = debounce(update, 300);

  const handleChange = async (value) => {
    await debounceUpdate(value);
  }

  const config = useMemo(() => ({
    width: "100%",
    minHeight: "1000px",
    height: "100%",
    theme: darkModeOn ? "dark" : "light",
    toolbar: !darkModeOn, // Hide toolbar in dark modeb
    placeholder: placeholder,
    showXPathInStatusbar: !darkModeOn, // Hide status bar in dark mode
  }), [darkModeOn, placeholder]);

  return (
    <div className="editor-wrapper">
      <div className="editor-header">
        <button className={darkModeOn ? "toggle-button-dark" : "toggle-button"} onClick={() => setTheme((prev) => !prev)}>
          Focus Mode
        </button>
        <button className={"toggle-button"} onClick={() => setOpenDocument(null)}>
          Close Document
        </button>
        <button className={"toggle-button"} onClick={async () => {await deleteDocument(openProject.data._id, openDocument._id); await openProjectWithData(openProject.data._id); setOpenDocument(null);}}>
          Delete Document
        </button>
      </div>
      <div className="editor-container">
        <JoditEditor value={value} onChange={handleChange} key={darkModeOn} ref={editor} config={config} />
      </div>
    </div>
  );
};

export default Editor;
