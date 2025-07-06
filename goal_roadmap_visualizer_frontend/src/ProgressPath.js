import React from "react";
import "./ProgressPath.css";

/**
 * PUBLIC_INTERFACE
 * ProgressPath is a presentational component that shows a horizontal, rounded progress path.
 * - Shows progress as a bar and color dots for milestones.
 * - Minimal, modern, soft shadow and responsive.
 * @param {number} progress - Number between 0 and 1 indicating percent complete.
 * @param {Array<{name: string, completed: boolean}>} milestones - Steps on the user's roadmap.
 */
function ProgressPath({ progress = 0, milestones = [] }) {
  return (
    <div className="progresspath-root">
      <div className="progress-container" aria-valuenow={Math.round(progress*100)} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-bg">
          <div
            className="progress-bar"
            style={{ width: `${Math.max(progress * 100, milestones.filter(m => m.completed).length/(milestones.length||(1))*100)}%` }}
          />
        </div>
        <div className="milestones-row">
          {milestones.map((m, idx) => (
            <div
              className={`milestone-dot${m.completed ? " done" : ""}${idx === 0 ? " start" : ""}${idx === milestones.length - 1 ? " end" : ""}`}
              key={m.name + idx}
              aria-label={`Milestone ${m.name}${m.completed ? " completed" : ""}`}
            >
              <span className="milestone-label">{m.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="progress-percent-label">
        {Math.round((progress || 0) * 100)}% completed
      </div>
    </div>
  );
}
export default ProgressPath;
