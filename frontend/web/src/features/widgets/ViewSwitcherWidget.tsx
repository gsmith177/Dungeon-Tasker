// ViewSwitcherWidget.tsx
import React from "react";

export const ViewSwitcherWidget: React.FC = () => {
  return (
    <div>
      <h2>View Switcher</h2>
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
  );
};
