// StoryGraphWidget.tsx
import React from "react";

export const StoryGraphWidget: React.FC = () => {
  return (
    <div>
      <h2>Story Graph</h2>
      <p>
        This will show a live graph from your Obsidian vault (nodes for NPCs, locations, quests).
      </p>
      <div className="graph-preview">[Graph preview placeholder]</div>
      <button>
        Open Obsidian Notebook (dummy)
      </button>
    </div>
  );
};
