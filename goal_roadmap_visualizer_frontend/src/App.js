import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * The main App component displays a modern, mobile-responsive dashboard layout
 * featuring a sidebar for roadmap navigation and a main content area.
 * Design is minimalist, with soft shadows, rounded corners, and a floating action button.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [roadmaps, setRoadmaps] = useState([
    { id: 1, title: "Career Growth", color: "#ffb703" },
    { id: 2, title: "Learn Spanish", color: "#adb5bd" },
  ]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(roadmaps[0]);
  // Placeholder for timeline/milestones visualization data, can expand in future

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const handleRoadmapSelect = (roadmap) => {
    setSelectedRoadmap(roadmap);
  };

  // PUBLIC_INTERFACE
  const handleAddRoadmap = () => {
    // Placeholder: In the future, this would open a dialog/modal for new roadmap
    const newId = roadmaps.length + 1;
    const newRoadmap = {
      id: newId,
      title: `New Goal ${newId}`,
      color: "#bde0fe",
    };
    setRoadmaps([...roadmaps, newRoadmap]);
    setSelectedRoadmap(newRoadmap);
  };

  return (
    <div className="dashboard-root">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <aside className="sidebar">
        <h1 className="sidebar-title">My Roadmaps</h1>
        <ul className="roadmap-list">
          {roadmaps.map(rm => (
            <li
              key={rm.id}
              className={`roadmap-item${selectedRoadmap && rm.id === selectedRoadmap.id ? ' selected' : ''}`}
              style={{
                borderLeft: `5px solid ${rm.color}`,
              }}
              onClick={() => handleRoadmapSelect(rm)}
              tabIndex={0}
              aria-label={`Select ${rm.title} roadmap`}
              role="button"
            >
              {rm.title}
            </li>
          ))}
        </ul>
        <button
          className="fab"
          onClick={handleAddRoadmap}
          aria-label="Add new roadmap"
          title="Add Roadmap"
        >
          ＋
        </button>
      </aside>
      <main className="main-content">
        <section className="main-card">
          <h2 className="roadmap-title">{selectedRoadmap?.title ?? "Select a Roadmap"}</h2>
          <div className="timeline-placeholder">
            {/* Placeholder for timeline visualization */}
            <span className="timeline-icon" role="img" aria-label="timeline">🗺️</span>
            <p className="timeline-text">
              Timeline and milestones for <strong>{selectedRoadmap?.title}</strong> will appear here.
            </p>
            <p className="dashboard-desc">
              Plan your goals with custom labels, notes, color-coding and track progress visually.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
