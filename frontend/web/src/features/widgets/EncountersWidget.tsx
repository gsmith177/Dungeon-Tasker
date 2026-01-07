// EncountersWidget.tsx
import React from "react";

export const EncountersWidget: React.FC = () => {
  return (
    <div>
      <h2>Encounters Queue</h2>
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
  );
};
