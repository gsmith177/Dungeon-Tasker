// AudioRecordingWidget.tsx
import React, { useState, useRef, useEffect } from "react";

declare global {
  interface Window {
    electron?: {
      ipcRenderer: {
        send: (channel: string, data: any) => void;
      };
    };
  }
}

interface Recording {
  id: string;
  name: string;
  duration: string;
  timestamp: Date;
  filePath?: string;
}

interface AudioDevice {
  deviceId: string;
  label: string;
}

export const AudioRecordingWidget: React.FC = () => {
  const [recordingState, setRecordingState] = useState<"idle" | "recording" | "paused">("idle");
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioDevices, setAudioDevices] = useState<AudioDevice[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [recordings, setRecordings] = useState<Recording[]>([
    { id: "1", name: "Session 3 – Part 1", duration: "00:45:12", timestamp: new Date() },
    { id: "2", name: "Session 2 – Boss Fight", duration: "00:32:08", timestamp: new Date() },
    { id: "3", name: "Session 1 – Intro", duration: "00:27:54", timestamp: new Date() },
  ]);
  const [showNamingModal, setShowNamingModal] = useState(false);
  const [recordingName, setRecordingName] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load available audio input devices on mount
  useEffect(() => {
    const loadAudioDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter((device) => device.kind === "audioinput");
        setAudioDevices(audioInputs);
        if (audioInputs.length > 0) {
          setSelectedDeviceId(audioInputs[0].deviceId);
        }
      } catch (error) {
        console.error("Failed to enumerate audio devices:", error);
      }
    };

    loadAudioDevices();

    // Listen for device changes
    const handleDeviceChange = () => {
      loadAudioDevices();
    };

    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange);
    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", handleDeviceChange);
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const startRecording = async () => {
    try {
      const constraints = {
        audio: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      chunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };

      mediaRecorder.start();
      setRecordingState("recording");
      setRecordingTime(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Failed to start recording:", error);
      alert("Could not access microphone. Please check permissions.");
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recordingState === "recording") {
      mediaRecorderRef.current.pause();
      setRecordingState("paused");
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recordingState === "paused") {
      mediaRecorderRef.current.resume();
      setRecordingState("recording");
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && (recordingState === "recording" || recordingState === "paused")) {
      mediaRecorderRef.current.stop();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

      mediaRecorderRef.current.onstop = () => {
        streamRef.current?.getTracks().forEach((track) => track.stop());
        setShowNamingModal(true);
      };

      setRecordingState("idle");
    }
  };

  const saveRecording = () => {
    if (!recordingName.trim()) {
      alert("Please enter a recording name.");
      return;
    }

    const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `${recordingName.replace(/[/:*?"<>|]/g, "_")}_${timestamp}.webm`;
    const recordingPath = `data/recordings/${fileName}`;

    const newRecording: Recording = {
      id: Date.now().toString(),
      name: recordingName,
      duration: formatTime(recordingTime),
      timestamp: new Date(),
      filePath: recordingPath,
    };

    setRecordings([newRecording, ...recordings]);
    setShowNamingModal(false);
    setRecordingName("");

    // Send to backend via IPC to save the file
    if (window.electron?.ipcRenderer) {
      window.electron.ipcRenderer.send("save-recording", {
        fileName,
        blob: audioBlob,
        recordingPath,
      });
    } else {
      // Fallback: save to browser's local storage
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      console.log("Recording saved locally:", fileName);
    }

    console.log("Recording saved:", newRecording, "Blob size:", audioBlob.size);
  };

  const openRecording = (recordingId: string) => {
    const recording = recordings.find((r) => r.id === recordingId);
    if (recording && recording.filePath) {
      if (window.electron?.ipcRenderer) {
        window.electron.ipcRenderer.send("open-recording", { filePath: recording.filePath });
      } else {
        console.log("Opening recording:", recording.name, "Path:", recording.filePath);
      }
    }
  };

  const openRecordingLocation = (recordingId: string) => {
    const recording = recordings.find((r) => r.id === recordingId);
    if (recording && recording.filePath) {
      if (window.electron?.ipcRenderer) {
        window.electron.ipcRenderer.send("show-file-location", { filePath: recording.filePath });
      } else {
        console.log("Opening file location for:", recording.name, "Path:", recording.filePath);
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      <h2 style={{ flex: "0 0 auto", margin: "0 0 0.4rem 0" }}>Audio Recording</h2>
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>
        <label style={{ display: "block", marginBottom: "0.75rem" }}>
          Input device:
          <select
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            disabled={recordingState !== "idle"}
            style={{ width: "100%", marginTop: "0.25rem", color: "var(--input-text)" }}
          >
            {audioDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Microphone ${audioDevices.indexOf(device) + 1}`}
              </option>
            ))}
          </select>
        </label>

        <div style={{ marginBottom: "0.75rem" }}>
          <p style={{ margin: "0.5rem 0", fontSize: "0.9rem", color: "var(--widget-title)" }}>
            {recordingState === "idle" ? "00:00:00" : formatTime(recordingTime)}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "0.75rem" }}>
          {recordingState === "idle" && (
            <button onClick={startRecording}>● Start Recording</button>
          )}
          {recordingState === "recording" && (
            <>
              <button onClick={pauseRecording}>⏸ Pause</button>
              <button onClick={stopRecording}>■ Stop</button>
            </>
          )}
          {recordingState === "paused" && (
            <>
              <button onClick={resumeRecording}>▶ Resume</button>
              <button onClick={stopRecording}>■ Stop</button>
            </>
          )}
        </div>

        <h3 style={{ margin: "0.75rem 0 0.5rem 0" }}>Previous recordings</h3>
        <ul style={{ margin: 0, paddingLeft: 0 }}>
          {recordings.map((recording) => (
            <li
              key={recording.id}
              style={{
                marginBottom: "0.5rem",
                cursor: "pointer",
                color: "var(--text)",
                listStyle: "none",
                paddingLeft: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <button
                  onClick={() => openRecording(recording.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text)",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                    textAlign: "left",
                    textDecoration: "underline",
                    flex: 1,
                    fontSize: "0.8125rem",
                  }}
                >
                  {recording.name} ({recording.duration})
                </button>
                <button
                  onClick={() => openRecordingLocation(recording.id)}
                  style={{
                    background: "var(--btn-bg-1)",
                    color: "var(--btn-text-1)",
                    border: "none",
                    borderRadius: "3px",
                    width: "1.5rem",
                    padding: "0.25rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    height: "auto",
                  }}
                >
                  📁
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showNamingModal && (
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
          onClick={() => setShowNamingModal(false)}
        />
      )}

      {showNamingModal && (
        <div
          style={{
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
          }}
        >
          <h3 style={{ marginTop: 0 }}>Name Your Recording</h3>
          <label style={{ display: "block", marginBottom: "1rem" }}>
            Recording name:
            <input
              type="text"
              value={recordingName}
              onChange={(e) => setRecordingName(e.target.value)}
              placeholder="e.g., Session 4 – Part 1"
              style={{ width: "100%", marginTop: "0.25rem", color: "var(--input-text)" }}
              autoFocus
              onKeyPress={(e) => {
                if (e.key === "Enter") saveRecording();
              }}
            />
          </label>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={saveRecording} style={{ flex: 1 }}>
              Save
            </button>
            <button onClick={() => setShowNamingModal(false)} style={{ flex: 1 }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
