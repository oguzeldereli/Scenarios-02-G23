import React, { useRef, useState, useEffect } from "react";
import JoditEditor from "jodit-react";
import "./Editor.css";

const Editor = () => {
  const editor = useRef(null);
  const [darkModeOn, setTheme] = useState(false);

  useEffect(() => {
    if (darkModeOn) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkModeOn]);

  const config = {
    width: "1000px",
    height: "100vh",
    theme: darkModeOn ? "dark" : "light",
    toolbar: !darkModeOn, // Hide toolbar in dark mode
    showXPathInStatusbar: !darkModeOn, // Hide status bar in dark mode
  };

  return (
    <div className="editor-wrapper">
      <div className="editor-header">
        <button className="toggle-button" onClick={() => setTheme((prev) => !prev)}>
          Focus Mode
        </button>
      </div>
      <div className="editor-container">
        <JoditEditor key={darkModeOn} ref={editor} config={config} />
      </div>
    </div>
  );
};



export default Editor;
