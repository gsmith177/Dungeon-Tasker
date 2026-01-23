import React from "react";
import PlaySVG from "./SVGs/MusicWidgetsSVGs/Play.svg";
import PauseSVG from "./SVGs/MusicWidgetsSVGs/Pause.svg";
import NextSVG from "./SVGs/MusicWidgetsSVGs/next.svg";
import ShuffleSVG from "./SVGs/MusicWidgetsSVGs/Shuffle.svg";

interface MusicButtonProps {
  onClick?: () => void;
  title?: string;
  disabled?: boolean;
}

const buttonStyle = {
  background: "transparent",
  border: "none",
  cursor: "pointer" as const,
  padding: "0",
  margin: "0",
  flex: "0 0 auto",
  minWidth: 0,
  aspectRatio: "1 / 1",
  display: "flex" as const,
  alignItems: "center" as const,
  justifyContent: "center" as const,
  width: "auto",
  height: "100%",
};

const imgStyle = {
  width: "100%",
  height: "100%",
  flexShrink: 0,
};

export const PreviousButton: React.FC<MusicButtonProps> = ({
  onClick,
  title = "Previous",
  disabled = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    style={{
      ...buttonStyle,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "default" : "pointer",
    }}
  >
    <img
      src={NextSVG}
      alt={title}
      style={{
        ...imgStyle,
        transform: "scaleX(-1)",
      }}
    />
  </button>
);

export const PlayButton: React.FC<MusicButtonProps> = ({
  onClick,
  title = "Play",
  disabled = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    style={{
      ...buttonStyle,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "default" : "pointer",
    }}
  >
    <img
      src={PlaySVG}
      alt={title}
      style={{
        ...imgStyle,
        /* ADJUST SIZE HERE: Change the scale value (0.75 = 75% size) */
        transform: "scale(0.75)",
      }}
    />
  </button>
);

export const NextButton: React.FC<MusicButtonProps> = ({
  onClick,
  title = "Next",
  disabled = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    style={{
      ...buttonStyle,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "default" : "pointer",
    }}
  >
    <img src={NextSVG} alt={title} style={imgStyle} />
  </button>
);

export const PauseButton: React.FC<MusicButtonProps> = ({
  onClick,
  title = "Pause",
  disabled = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    style={{
      ...buttonStyle,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "default" : "pointer",
    }}
  >
    <img
      src={PauseSVG}
      alt={title}
      style={{
        ...imgStyle,
        /* ADJUST SIZE HERE: Change the scale value (0.75 = 75% size) */
        transform: "scale(0.75)",
      }}
    />
  </button>
);

export const ShuffleButton: React.FC<MusicButtonProps> = ({
  onClick,
  title = "Shuffle",
  disabled = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    title={title}
    style={{
      ...buttonStyle,
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "default" : "pointer",
    }}
  >
    <img src={ShuffleSVG} alt={title} style={imgStyle} />
  </button>
);
