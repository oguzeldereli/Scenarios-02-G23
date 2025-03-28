import { useState } from "react";
import "./Timeline.css";

const Timeline = ({ color }) => { // takes in color (for line and box)
    const [boxes, setBoxes] = useState({});

    const click = (i) => {
      setBoxes((prev) => ({
        ...prev,
        [i]: prev[i] || ""
      }));
    };
  
    const updateText = (i, event) => {
      setBoxes((prev) => ({
        ...prev,
        [i]: event.target.value
      }));
    };
  
    return (
      <div className="lineAll">
        <div className="line" style={{backgroundColor: color}}>
          {[20, 50, 80].map((pos, i) => (
            <div key={i} className="box" style={{ left: `${pos}%` }}>
              {boxes[i] === undefined ? (
                <button className="plusCircle" onClick={() => click(i)}>
                  <span className="plus">+</span>
                </button>
              ) : (
                <textarea
                  className="textbox"
                  value={boxes[i]}
                  onChange={(e) => updateText(i, e)}
                  rows={1}
                  style={{ border: `3px solid ${color}` }}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default Timeline;
