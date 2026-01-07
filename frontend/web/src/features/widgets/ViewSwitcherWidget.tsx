// ViewSwitcherWidget.tsx
import React from "react";

export const ViewSwitcherWidget: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <h2 style={{ flex: "0 0 auto", margin: "0 0 0.4rem 0" }}>View Switcher</h2>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>
        <p>Select layout:</p>
        <div>
          <label><input type="radio" name="view" defaultChecked /> Default</label><br />
          <label><input type="radio" name="view" /> Combat</label><br />
          <label><input type="radio" name="view" /> Story</label><br />
          <label><input type="radio" name="view" /> Puzzles</label>
        </div>

        <div>
          <button>Save current view (dummy)</button>
        </div>
        <div>
          <button>Revert view to default (dummy)</button>
        </div>
      </div>
    </div>
  );
};
