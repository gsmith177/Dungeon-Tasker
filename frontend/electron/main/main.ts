// frontend/electron/main/main.ts
import { app, BrowserWindow } from "electron";
import * as path from "path";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";

let mainWindow: BrowserWindow | null = null;
let backendProcess: ChildProcessWithoutNullStreams | null = null;

function startBackend() {
  // Dev: run `python -m uvicorn app.main:app`
  // In production: replace with path to PyInstaller-built exe.
  const backendCmd = process.env.BACKEND_CMD || "python";
  const backendArgs =
    process.env.BACKEND_ARGS?.split(" ") || ["-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "8000"];

  backendProcess = spawn(backendCmd, backendArgs, {
    cwd: path.join(__dirname, "../../../backend"),
    shell: process.platform === "win32",
  });

  backendProcess.stdout.on("data", (data) => {
    console.log(`[backend] ${data}`);
  });

  backendProcess.stderr.on("data", (data) => {
    console.error(`[backend] ${data}`);
  });

  backendProcess.on("close", (code) => {
    console.log(`Backend exited with code ${code}`);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
    },
  });

  const startUrl =
    process.env.ELECTRON_START_URL || "http://localhost:5173"; // dev Vite port

  mainWindow.loadURL(startUrl);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", () => {
  startBackend();
  createWindow();
});

app.on("window-all-closed", () => {
  if (backendProcess) {
    backendProcess.kill();
    backendProcess = null;
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
