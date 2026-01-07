// EncounterMakerWidget.tsx
import React from "react";

export const EncounterMakerWidget: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <h2 style={{ flex: "0 0 auto", margin: "0 0 0.4rem 0" }}>Encounter Maker</h2>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>
        <label>
          Party & context (for AI later):
          <textarea
            placeholder="e.g., 4 players, level 5, low on resources, exploring undead crypt..."
          />
        </label>

        <label>
          Target difficulty (1–10):
          <input type="range" min={1} max={10} defaultValue={5} />
        </label>

        <label style={{ display: "block" }}>
          Encounter name:
          <input type="text" placeholder="e.g., Crypt Guardians" />
        </label>

        <button>
          Generate Encounter (dummy)
        </button>
      </div>
    </div>
  );
};
