import "./App.css";
import { useEffect, useState } from "react";
import { Dashboard } from "./features/dashboard/Dashboard";

function App() {
  const [showTitleBar, setShowTitleBar] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nearTop = e.clientY <= 32; // show bar when mouse is near top
      setShowTitleBar(nearTop);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="app-shell">
      {/* Always-present drag strip */}
      <div className="drag-strip" />

      {/* Visual title bar that appears on hover */}
      <div className={`title-bar ${showTitleBar ? "title-bar--visible" : ""}`}>
        <div className="title-bar-left">Dungeon Tasker</div>
        <div className="title-bar-right">{/* future window buttons */}</div>
      </div>

      <div className="app-content">
        <Dashboard />
      </div>

      <div className="resize-grip" />
    </div>
  );
}

export default App;
