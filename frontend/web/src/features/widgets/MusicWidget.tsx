// MusicWidget.tsx
import React from "react";

export const MusicWidget: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <h2 style={{ flex: "0 0 auto", margin: "0 0 0.4rem 0" }}>Music</h2>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>
        <p>Mode: <strong>Combat</strong></p>

        <h3>Playlists</h3>
        <ul>
          <li>Combat Themes</li>
          <li>Exploration Ambience</li>
          <li>Puzzle Tension</li>
        </ul>

        <p>Current track: <em>(none playing)</em></p>

        <div>
          <button>⏮ Prev</button>
          <button>▶ Play</button>
          <button>⏭ Next</button>
          <button>🔀 Shuffle</button>
        </div>

        <details>
          <summary>Audio settings</summary>
          <p>Volume: 80%</p>
          <p>EQ: Light Bass Boost</p>
        </details>
      </div>
    </div>
  );
};
