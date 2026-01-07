// AudioRecordingWidget.tsx
import React from "react";

export const AudioRecordingWidget: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <h2 style={{ flex: "0 0 auto", margin: "0 0 0.4rem 0" }}>Audio Recording</h2>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>
        <p>Input device: <strong>Default Microphone</strong></p>
        <button>● Start Recording</button>
        <button>■ Stop</button>

        <h3>Previous recordings</h3>
        <ul>
          <li>Session 3 – Part 1 (00:45:12)</li>
          <li>Session 2 – Boss Fight (00:32:08)</li>
          <li>Session 1 – Intro (00:27:54)</li>
        </ul>
      </div>
    </div>
  );
};
