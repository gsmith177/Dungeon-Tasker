// PuzzlesWidget.tsx
import React from "react";

export const PuzzlesWidget: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <h2 style={{ flex: "0 0 auto", margin: "0 0 0.4rem 0" }}>Puzzles</h2>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>
        <p>Current puzzle: The Riddle Door</p>
        <details>
          <summary>Show solution (spoiler)</summary>
          <p>The solution is: "Silence".</p>
        </details>

        <h3>Upcoming puzzles</h3>
        <ol>
          <li>Crystal Sigils</li>
          <li>Rune Sequence</li>
          <li>Mirror Maze</li>
        </ol>
      </div>
    </div>
  );
};
