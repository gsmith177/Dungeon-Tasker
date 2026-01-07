// AudioRecordingWidget.tsx
import React from "react";

export const AudioRecordingWidget: React.FC = () => {
  return (
    <div>
      <h2>Audio Recording</h2>
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
  );
};
