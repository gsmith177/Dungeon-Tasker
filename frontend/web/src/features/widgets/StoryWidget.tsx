// StoryWidget.tsx
import React from "react";

export const StoryWidget: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <h2 style={{ flex: "0 0 auto", margin: "0 0 0.4rem 0" }}>Story</h2>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>
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
    </div>
  );
};
