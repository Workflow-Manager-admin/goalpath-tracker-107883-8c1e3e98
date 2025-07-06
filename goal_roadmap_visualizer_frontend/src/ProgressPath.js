import React, { useState } from "react";
import "./ProgressPath.css";

/**
 * PUBLIC_INTERFACE
 * ProgressPath component displays a modern, interactive horizontal roadmap with clickable milestone nodes.
 * Each milestone shows an icon and a title, with hover and click effects for interactivity, following minimalist and rounded dashboard style.
 * 
 * @param {number} progress - Number between 0 and 1 indicating percent complete.
 * @param {Array<{icon: string|React.Component, title: string, completed?: boolean}>} milestones - Array of milestone objects with icon and title.
 */
function ProgressPath({ progress = 0, milestones = [] }) {
  // Default demo icons mapping
  const iconMap = {
    BookIcon: (
      <svg width="1.2em" height="1.2em" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="3.5" width="15" height="13" rx="3.5" fill="#ffb703" stroke="#1877f2" strokeWidth="1.5"/>
        <path d="M7 5.5v10" stroke="#1877f2" strokeWidth="1.1" strokeLinecap="round"/>
      </svg>
    ),
    LaptopIcon: (
      <svg width="1.2em" height="1.2em" viewBox="0 0 20 20" fill="none">
        <rect x="4" y="5" width="12" height="7" rx="2" fill="#1877f2" stroke="#1877f2" strokeWidth="1.1"/>
        <rect x="2.5" y="13" width="15" height="2" rx="1" fill="#e2e2e6" stroke="#adb5bd" strokeWidth="1"/>
      </svg>
    ),
    BriefcaseIcon: (
      <svg width="1.2em" height="1.2em" viewBox="0 0 20 20" fill="none">
        <rect x="3.3" y="7" width="13.4" height="8.4" rx="2.3" fill="#adb5bd" stroke="#242526" strokeWidth="1.2"/>
        <rect x="7.7" y="5" width="4.6" height="2" rx="0.8" fill="#ffb703"/>
      </svg>
    ),
  };

  // Allow highlight on click
  const [activeIdx, setActiveIdx] = useState(null);

  // Calculate percent complete based on input or milestones .completed
  const percent =
    milestones.length && milestones.every(m => 'completed' in m)
      ? (milestones.filter(m => m.completed).length / milestones.length)
      : progress;
  const completedPercentRaw = percent || 0;

  return (
    <div className="progresspath-root">
      <div
        className="progress-container"
        aria-valuenow={Math.round(completedPercentRaw * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-bg" style={{ position: "relative" }}>
          <div
            className="progress-bar"
            style={{
              width: `${Math.max(
                completedPercentRaw * 100,
                milestones &&
                  milestones.every(m => "completed" in m)
                  ? milestones.filter(m => m.completed).length / (milestones.length || 1) * 100
                  : 0
              )}%`,
            }}
          />
          <div className="milestones-row" style={{ pointerEvents: "none" }}>
            {/* Empty for icon/touch layering; real nodes overlaid below */}
          </div>
          <div className="milestones-row clickable-milestones">
            {milestones.map((m, idx) => {
              // Determine appearance (done, start/end, hover/click)
              const isStart = idx === 0;
              const isEnd = idx === milestones.length - 1;
              const isDone = !!m.completed;
              const IconComp =
                typeof m.icon === "string"
                  ? iconMap[m.icon] || (
                      <span role="img" aria-label="milestone" style={{ color: "#ababab" }}>
                        📍
                      </span>
                    )
                  : m.icon;
              return (
                <button
                  tabIndex={0}
                  type="button"
                  key={m.title + idx}
                  className={
                    "milestone-dot interactive" +
                    (isDone ? " done" : "") +
                    (isStart ? " start" : "") +
                    (isEnd ? " end" : "") +
                    (activeIdx === idx ? " active" : "")
                  }
                  aria-label={`Milestone: ${m.title}${isDone ? " (completed)" : ""}`}
                  title={m.title}
                  style={{ pointerEvents: "auto" }}
                  onMouseDown={() => setActiveIdx(idx)}
                  onMouseUp={() => setActiveIdx(null)}
                  onBlur={() => setActiveIdx(null)}
                  onClick={() => {
                    setActiveIdx(idx);
                    // Placeholder for real onClick handler:
                    window.alert(`Clicked: ${m.title}`);
                  }}
                >
                  <span className="milestone-icon">{IconComp}</span>
                  <span className="milestone-label">{m.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="progress-percent-label">
        {Math.round((completedPercentRaw || 0) * 100)}% completed
      </div>
    </div>
  );
}

export default ProgressPath;
