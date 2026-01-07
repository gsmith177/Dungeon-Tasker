// MusicWidget.tsx
import React from "react";

export const MusicWidget: React.FC = () => {
  return (
    <div>
      <h2>Music</h2>
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
  );
};
