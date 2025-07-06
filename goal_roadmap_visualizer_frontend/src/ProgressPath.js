import React, { useState } from "react";
import "./ProgressPath.css";

/**
 * PUBLIC_INTERFACE
 * ProgressPath component displays a modern, interactive horizontal roadmap with clickable milestone nodes.
 * Opening a milestone modal shows description, target date, and status. Styled to fit a minimalist dashboard.
 *
 * @param {number} progress - Number between 0 and 1 indicating percent complete.
 * @param {Array<{icon: string|React.Component, title: string, completed?: boolean, description?: string, targetDate?: string, status?: string}>} milestones - Array of milestone objects.
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

  // Highlight/active index for UI
  const [activeIdx, setActiveIdx] = useState(null);

  // Modal for milestone
  const [modal, setModal] = useState({ open: false, milestone: null });

  // Calculate percent complete based on input or milestones .completed
  const percent =
    milestones.length && milestones.every(m => "completed" in m)
      ? milestones.filter(m => m.completed).length / milestones.length
      : progress;
  const completedPercentRaw = percent || 0;

  // Modal component (minimalist)
  function MilestoneModal({ open, onClose, milestone }) {
    if (!open || !milestone) return null;
    const IconComp =
      typeof milestone.icon === "string"
        ? iconMap[milestone.icon] || (
            <span role="img" aria-label="milestone" style={{ color: "#ababab" }}>📍</span>
          )
        : milestone.icon;
    return (
      <div className="progresspath-modal-overlay" tabIndex={-1} aria-modal="true" role="dialog"
        onClick={onClose}
        style={{
          position: "fixed",
          zIndex: 1200,
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(20, 24, 32, 0.19)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <div
          className="progresspath-modal-content"
          style={{
            background: "var(--white, #fff)",
            borderRadius: "18px",
            boxShadow: "0 4px 32px rgba(24, 28, 70, 0.09), 0 1.5px 7px rgba(30,34,90,0.06)",
            padding: "1.9em 1.5em 1.4em 1.5em",
            minWidth: "310px",
            maxWidth: "96vw",
            width: "360px",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
          onClick={e => e.stopPropagation()}
        >
          <button
            className="progresspath-modal-close"
            onClick={onClose}
            aria-label="Close milestone details"
            style={{
              position: "absolute", top: "12px", right: "16px",
              fontSize: "1.35em", background: "transparent", border: "none",
              color: "var(--secondary, #242526)", cursor: "pointer", opacity: .72, zIndex: 20
            }}
          >×</button>
          <div style={{
            margin: "0.4em 0 .8em 0", padding: 0,
            display: "flex", flexDirection: "column", alignItems: "center"
          }}>
            <div style={{
              marginBottom: "0.5em",
              background: "var(--gray-light, #e9ecef)",
              borderRadius: "50%", width: "46px", height: "46px",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <span className="milestone-icon" style={{ fontSize: "2em" }}>{IconComp}</span>
            </div>
            <h4 style={{
              margin: "0",
              fontWeight: 600,
              fontSize: "1.22em",
              color: "var(--primary, #1877f2)",
              letterSpacing: ".01em"
            }}>{milestone.title}</h4>
          </div>
          <div className="progresspath-modal-details" style={{ width: "100%" }}>
            <p style={{
              margin: "0.65em 0 0.4em 0",
              color: "var(--secondary, #242526)",
              fontSize: "1.03em"
            }}>{milestone.description || <span style={{ opacity: .7 }}>No description</span>}</p>
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "0.98em",
              color: "var(--secondary, #242526)",
              marginTop: "1.1em"
            }}>
              <span>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color: milestone.completed || milestone.status === "Completed" ? "#51b93d" : "#ad8e39",
                    fontWeight: 600
                  }}
                >
                  {milestone.status ? milestone.status : (milestone.completed ? "Completed" : "In Progress")}
                </span>
              </span>
              <span>
                <strong>Target:</strong>{" "}
                <span style={{ color: "#1877f2", fontWeight: 500 }}>
                  {milestone.targetDate || <span style={{ opacity: .54 }}>—</span>}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="progresspath-root">
      <MilestoneModal
        open={modal.open}
        onClose={() => setModal({ open: false, milestone: null })}
        milestone={modal.milestone}
      />
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
              // Use status string for reliable status checking
              let status = "pending";
              if (
                m.status &&
                (m.status.toLowerCase() === "completed" ||
                  m.status.toLowerCase() === "done" ||
                  m.completed)
              ) {
                status = "completed";
              } else if (
                m.status &&
                (m.status.toLowerCase() === "in progress" ||
                  m.status.toLowerCase() === "active" ||
                  m.status.toLowerCase() === "current")
              ) {
                status = "in-progress";
              }
              const IconComp =
                typeof m.icon === "string"
                  ? iconMap[m.icon] || (
                      <span role="img" aria-label="milestone" style={{ color: "#ababab" }}>
                        📍
                      </span>
                    )
                  : m.icon;

              // Accessibility
              let ariaState = "";
              if (status === "completed") ariaState = " (completed)";
              else if (status === "in-progress") ariaState = " (in progress)";
              else ariaState = " (pending)";

              return (
                <button
                  tabIndex={0}
                  type="button"
                  key={(m.title || "") + idx}
                  className={
                    "milestone-dot interactive" +
                    (status === "completed" ? " milestone-completed" : "") +
                    (status === "in-progress" ? " milestone-inprogress" : "") +
                    (status === "pending" ? " milestone-pending" : "") +
                    (isStart ? " start" : "") +
                    (isEnd ? " end" : "") +
                    (activeIdx === idx ? " active" : "")
                  }
                  aria-label={`Milestone: ${m.title}${ariaState}`}
                  title={m.title}
                  style={{ pointerEvents: "auto" }}
                  onMouseDown={() => setActiveIdx(idx)}
                  onMouseUp={() => setActiveIdx(null)}
                  onBlur={() => setActiveIdx(null)}
                  onClick={() => {
                    setActiveIdx(idx);
                    setModal({ open: true, milestone: m });
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
