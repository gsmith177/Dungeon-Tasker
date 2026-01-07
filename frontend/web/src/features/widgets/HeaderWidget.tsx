// HeaderWidget.tsx
import React from "react";

export const HeaderWidget: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <h1 className="app-title" style={{ flex: "0 0 auto", margin: 0 }}>Dungeon Tasker</h1>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>
        <p>Campaign: The Lost Mines (dummy)</p>
        <p>Session: 3 · In‑game Day: 14</p>
      </div>
    </div>
  );
};
