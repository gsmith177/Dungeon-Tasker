// StoryGraphWidget.tsx
import React from "react";

export const StoryGraphWidget: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <h2 style={{ flex: "0 0 auto", margin: "0 0 0.4rem 0" }}>Story Graph</h2>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>
        <p>
          This will show a live graph from your Obsidian vault (nodes for NPCs, locations, quests).
        </p>
        <div className="graph-preview">[Graph preview placeholder]</div>
        <button>
          Open Obsidian Notebook (dummy)
        </button>
      </div>
    </div>
  );
};
