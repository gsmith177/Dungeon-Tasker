// PuzzlesWidget.tsx
import React from "react";

export const PuzzlesWidget: React.FC = () => {
  return (
    <div>
      <h2>Puzzles</h2>
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
  );
};
