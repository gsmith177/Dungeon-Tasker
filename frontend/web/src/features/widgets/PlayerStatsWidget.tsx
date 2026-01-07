// PlayerStatsWidget.tsx
import React from "react";

const dummyPlayers = [
  { name: "Aria",  hp: "25 / 30", gold: 126 },
  { name: "Borin", hp: "18 / 28", gold: 54 },
  { name: "Cairn", hp: "10 / 22", gold: 9 },
  { name: "Dara",  hp: "30 / 30", gold: 211 },
];

export const PlayerStatsWidget: React.FC = () => {
  return (
    <div>
      <h2>Player Stats</h2>
      {dummyPlayers.map((p) => (
        <div key={p.name}>
          <strong>{p.name}</strong>
          <div>
            HP: {p.hp}{" "}
            <button>▲</button>
            <button>▼</button>
          </div>
          <div>
            Gold: {p.gold}{" "}
            <button>▲</button>
            <button>▼</button>
          </div>
        </div>
      ))}

      <details>
        <summary>Edit players</summary>
        <p>Sub‑menu for adding players, setting max HP, etc. (dummy)</p>
      </details>
    </div>
  );
};
