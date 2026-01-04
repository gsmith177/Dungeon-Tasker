import { app, BrowserWindow } from "electron";
import * as path from "path";
import { spawn, ChildProcessWithoutNullStreams } from "child_process";

let mainWindow: BrowserWindow | null = null;
let backendProcess: ChildProcessWithoutNullStreams | null = null;

function startBackend() {
  const ROOT_PATH = "B:\\DEV\\DND Projects\\Dungeon-Tasker";
  const pythonPath = `${ROOT_PATH}\\.venv\\Scripts\\python.exe`;
  const backendPath = `${ROOT_PATH}\\backend`;
  
  console.log(`Python: ${pythonPath}`);
  console.log(`Backend: ${backendPath}`);

  backendProcess = spawn(pythonPath, [
    "-m", "uvicorn", 
    "app.main:app", 
    "--host", "127.0.0.1", 
    "--port", "8000"
  ], {
    cwd: backendPath,
    shell: false
  });

  backendProcess.on('error', (err) => {
    console.error('[SPAWN ERROR]', err.message);
  });

  backendProcess.stdout?.on("data", (data) => {
    console.log(`[backend] ${data}`);
  });

  backendProcess.stderr?.on("data", (data) => {
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
      preload: path.join(__dirname, "../preload/preload.js")
    }
  });

  const startUrl =
    process.env.ELECTRON_START_URL || "http://localhost:5173";

  mainWindow.loadURL(startUrl);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  startBackend();
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
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
