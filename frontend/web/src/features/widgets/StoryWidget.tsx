// StoryWidget.tsx
import React from "react";

export const StoryWidget: React.FC = () => {
  return (
    <div>
      <h2>Story</h2>
      <h3>Current arc</h3>
      <ul>
        <li>Find the lost heirloom</li>
        <li>Uncover the cult in Neverwinter</li>
        <li>Stop the ritual before the eclipse</li>
      </ul>

      <h3>Key NPCs</h3>
      <ul>
        <li>Elira, nervous innkeeper</li>
        <li>Ser Joran, suspicious knight</li>
        <li>The Whisperer, unknown patron</li>
      </ul>
    </div>
  );
};
