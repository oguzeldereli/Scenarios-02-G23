import React from 'react';
import Timeline from './Timeline';
import "./PlotOrg.css";

const PlotBoard = () => {
    return (
        <div className="plot-board">
            <div className="chapters">
                <h2>Chapter 1</h2>
                <h2>Chapter 2</h2>
                <h2>Chapter 3</h2>
            </div>
            <div className="timelines">
                <div className="timeline-container">
                    <h3 className="side-heading">Main Plot</h3>
                    <div className="timeline-wrapper">
                        <Timeline color="blue"/>
                    </div>
                </div>
                <div className="timeline-container">
                    <h3 className="side-heading">Character 1</h3>
                    <div className="timeline-wrapper">
                        <Timeline color="green"/>
                    </div>
                </div>
                <div className="timeline-container">
                    <h3 className="side-heading">Character 2</h3>
                    <div className="timeline-wrapper">
                        <Timeline color="red"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlotBoard;
