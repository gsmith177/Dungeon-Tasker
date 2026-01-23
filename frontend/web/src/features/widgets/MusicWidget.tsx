// MusicWidget.tsx
import React, { useState } from "react";
import {
  PreviousButton,
  PlayButton,
  NextButton,
  PauseButton,
  ShuffleButton,
} from "./MusicButtons";

export const MusicWidget: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePrevious = () => console.log("Previous");
  const handlePlay = () => {
    setIsPlaying(true);
    console.log("Play");
  };
  const handleNext = () => console.log("Next");
  const handlePause = () => {
    setIsPlaying(false);
    console.log("Pause");
  };
  const handleShuffle = () => console.log("Shuffle");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <h2 style={{ flex: "0 0 auto", margin: "0 0 0.4rem 0" }}>Music</h2>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>
        <p>Mode: <strong>Combat</strong></p>

        <h3>Playlists</h3>
        <ul>
          <li>Combat Themes</li>
          <li>Exploration Ambience</li>
          <li>Puzzle Tension</li>
        </ul>

        <p>Current track: <em>(none playing)</em></p>

        <div style={{ display: "flex", gap: "0.05rem", height: "5rem", marginBottom: "0.5rem" }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <PreviousButton onClick={handlePrevious} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {isPlaying ? (
              <PauseButton onClick={handlePause} />
            ) : (
              <PlayButton onClick={handlePlay} />
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <NextButton onClick={handleNext} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <ShuffleButton onClick={handleShuffle} />
          </div>
        </div>

        <details>
          <summary>Audio settings</summary>
          <p>Volume: 80%</p>
          <p>EQ: Light Bass Boost</p>
        </details>
      </div>
    </div>
  );
};
