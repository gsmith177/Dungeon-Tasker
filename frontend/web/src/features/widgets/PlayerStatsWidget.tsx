// PlayerStatsWidget.tsx
import React, { useState } from "react";

interface Player {
  name: string;
  currentHp: number;
  maxHp: number;
  gold: number;
}

const initialPlayers: Player[] = [
  { name: "Aria",  currentHp: 25, maxHp: 30, gold: 126 },
  { name: "Borin", currentHp: 18, maxHp: 28, gold: 54 },
  { name: "Cairn", currentHp: 10, maxHp: 22, gold: 9 },
  { name: "Dara",  currentHp: 30, maxHp: 30, gold: 211 },
];

export const PlayerStatsWidget: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [editForm, setEditForm] = useState<Player | null>(null);

  const updateHp = (playerName: string, delta: number) => {
    setPlayers(players.map(p => {
      if (p.name === playerName) {
        const newHp = Math.max(0, Math.min(p.maxHp, p.currentHp + delta));
        return { ...p, currentHp: newHp };
      }
      return p;
    }));
  };

  const updateGold = (playerName: string, delta: number) => {
    setPlayers(players.map(p => {
      if (p.name === playerName) {
        const newGold = Math.max(0, p.gold + delta);
        return { ...p, gold: newGold };
      }
      return p;
    }));
  };

  const openEditDialog = (player: Player) => {
    setEditingPlayer(player);
    setEditForm({ ...player });
  };

  const closeEditDialog = () => {
    setEditingPlayer(null);
    setEditForm(null);
  };

  const savePlayerChanges = () => {
    if (!editForm || !editingPlayer) return;
    setPlayers(players.map(p => 
      p.name === editingPlayer.name ? editForm : p
    ));
    closeEditDialog();
  };

  const addPlayer = () => {
    const newPlayer: Player = {
      name: `Player ${players.length + 1}`,
      currentHp: 20,
      maxHp: 20,
      gold: 0
    };
    setPlayers([...players, newPlayer]);
  };

  const removePlayer = (playerName: string) => {
    setPlayers(players.filter(p => p.name !== playerName));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <h2 style={{ flex: "0 0 auto", margin: "0 0 0.4rem 0" }}>Player Stats</h2>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>
        {players.map((p) => (
          <div key={p.name} style={{ marginBottom: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
              <strong>{p.name}</strong>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>HP: {p.currentHp} / {p.maxHp}</span>
              <button onClick={() => updateHp(p.name, 1)} style={{ width: "1.5rem", padding: "0.25rem" }}>▲</button>
              <button onClick={() => updateHp(p.name, -1)} style={{ width: "1.5rem", padding: "0.25rem" }}>▼</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>Gold: {p.gold}</span>
              <button onClick={() => updateGold(p.name, 1)} style={{ width: "1.5rem", padding: "0.25rem" }}>▲</button>
              <button onClick={() => updateGold(p.name, -1)} style={{ width: "1.5rem", padding: "0.25rem" }}>▼</button>
            </div>
          </div>
        ))}

        <details style={{ marginTop: "0.75rem" }}>
          <summary>Edit players</summary>
          <div style={{ marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {players.map(p => (
              <div key={p.name} style={{ display: "flex", gap: "0.25rem" }}>
                <button onClick={() => openEditDialog(p)} style={{ flex: 1, textAlign: "left" }}>
                  Edit {p.name}
                </button>
                <button onClick={() => removePlayer(p.name)} style={{ width: "1.5rem", padding: "0.25rem" }}>✕</button>
              </div>
            ))}
            <button onClick={addPlayer} style={{ marginTop: "0.25rem" }}>+ Add Player</button>
          </div>
        </details>
      </div>

      {editingPlayer && editForm && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "var(--widget-bg)",
          border: "2px solid var(--widget-title)",
          padding: "1.5rem",
          borderRadius: "8px",
          zIndex: 1000,
          maxWidth: "400px",
          width: "90%",
        }}>
          <h3 style={{ marginTop: 0 }}>Edit {editForm.name}</h3>
          
          <label style={{ display: "block", marginBottom: "0.75rem" }}>
            Player Name:
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              style={{ width: "100%", marginTop: "0.25rem", color: "var(--input-text)" }}
            />
          </label>

          <label style={{ display: "block", marginBottom: "0.75rem" }}>
            Max HP:
            <input
              type="number"
              value={editForm.maxHp}
              onChange={(e) => setEditForm({ ...editForm, maxHp: Math.max(1, parseInt(e.target.value) || 1) })}
              style={{ width: "100%", marginTop: "0.25rem", color: "var(--input-text)" }}
            />
          </label>

          <label style={{ display: "block", marginBottom: "0.75rem" }}>
            Current HP:
            <input
              type="number"
              value={editForm.currentHp}
              onChange={(e) => setEditForm({ ...editForm, currentHp: Math.max(0, Math.min(editForm.maxHp, parseInt(e.target.value) || 0)) })}
              style={{ width: "100%", marginTop: "0.25rem", color: "var(--input-text)" }}
            />
          </label>

          <label style={{ display: "block", marginBottom: "1rem" }}>
            Gold:
            <input
              type="number"
              value={editForm.gold}
              onChange={(e) => setEditForm({ ...editForm, gold: Math.max(0, parseInt(e.target.value) || 0) })}
              style={{ width: "100%", marginTop: "0.25rem", color: "var(--input-text)" }}
            />
          </label>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={savePlayerChanges} style={{ flex: 1 }}>Save</button>
            <button onClick={closeEditDialog} style={{ flex: 1 }}>Cancel</button>
          </div>
        </div>
      )}

      {editingPlayer && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={closeEditDialog}
        />
      )}
    </div>
  );
};
