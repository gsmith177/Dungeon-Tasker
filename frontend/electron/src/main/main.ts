import { app, BrowserWindow } from "electron";
import { screen, ipcMain, shell } from "electron";
import * as path from "path";
import * as fs from "fs";
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
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  
  mainWindow = new BrowserWindow({
    show: false,  // Hide until sized
    x: 0,
    y: 0,
    width,
    height,
    useContentSize: true,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js")
    },
    frame: false,
    resizable: true,
  });
  
  const startUrl = process.env.ELECTRON_START_URL || "http://localhost:5173";
  mainWindow.loadURL(startUrl);

  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
    mainWindow?.maximize();  // Windows snap will work
  });
}


app.whenReady().then(() => {
  startBackend();
  createWindow();

  // IPC handler to save recordings
  ipcMain.on("save-recording", (event, { fileName, blob, recordingPath }) => {
    try {
      const dataDir = path.join(path.dirname(app.getAppPath()), "data", "recordings");
      const fullPath = path.join(dataDir, fileName);

      // Create directory if it doesn't exist
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      // Convert blob to buffer and save
      blob.arrayBuffer().then((arrayBuffer: ArrayBuffer) => {
        const buffer = Buffer.from(arrayBuffer);
        fs.writeFileSync(fullPath, buffer);
        console.log(`Recording saved: ${fullPath}`);
      });
    } catch (error) {
      console.error("Error saving recording:", error);
    }
  });

  // IPC handler to open file location
  ipcMain.on("show-file-location", (event, { filePath }) => {
    try {
      const dataDir = path.join(path.dirname(app.getAppPath()), "data", "recordings");
      const fullPath = path.join(dataDir, path.basename(filePath));
      
      // Check if file exists
      if (fs.existsSync(fullPath)) {
        shell.showItemInFolder(fullPath);
      } else {
        console.error(`File not found: ${fullPath}`);
      }
    } catch (error) {
      console.error("Error opening file location:", error);
    }
  });

  // IPC handler to open and play recording
  ipcMain.on("open-recording", (event, { filePath }) => {
    try {
      const dataDir = path.join(path.dirname(app.getAppPath()), "data", "recordings");
      const fullPath = path.join(dataDir, path.basename(filePath));
      
      // Check if file exists
      if (fs.existsSync(fullPath)) {
        // Open with default media player
        shell.openPath(fullPath);
      } else {
        console.error(`File not found: ${fullPath}`);
      }
    } catch (error) {
      console.error("Error opening recording:", error);
    }
  });

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
