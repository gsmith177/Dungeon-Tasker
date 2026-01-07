// EncountersWidget.tsx
import React from "react";

export const EncountersWidget: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <h2 style={{ flex: "0 0 auto", margin: "0 0 0.4rem 0" }}>Encounters Queue</h2>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>
        <ol>
          <li>
            Goblin Ambush
            <button>▲</button>
            <button>▼</button>
          </li>
          <li>
            Ogre Bridge
            <button>▲</button>
            <button>▼</button>
          </li>
          <li>
            Cult Ritual
            <button>▲</button>
            <button>▼</button>
          </li>
        </ol>
        <p style={{ marginTop: 0 }}><em>Drag or use arrows to reorder (future behavior).</em></p>
      </div>
    </div>
  );
};
