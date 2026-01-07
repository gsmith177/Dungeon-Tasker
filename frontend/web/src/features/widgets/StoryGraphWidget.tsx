// StoryGraphWidget.tsx
import React from "react";

export const StoryGraphWidget: React.FC = () => {
  return (
    <div>
      <h2>Story Graph</h2>
      <p>
        This will show a live graph from your Obsidian vault (nodes for NPCs, locations, quests).
      </p>
      <div
        style={{
          background: "#222",
          color: "#ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
          flex: 1,
        }}
      >
        [Graph preview placeholder]
      </div>
      <button>
        Open Obsidian Notebook (dummy)
      </button>
    </div>
  );
};
