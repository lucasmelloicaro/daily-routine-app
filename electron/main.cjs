const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 380,
    height: 1500,
    frame: false, // Remove window frame for widget look
    alwaysOnTop: true, // Keep widget on top
    resizable: false,
    transparent: true,
    movable: true, // Allow window to be moved
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Try to load from Vite dev server first, fallback to built files
  try {
    await mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } catch (error) {
    // Fallback to built files if dev server is not running
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Position window on screen
  mainWindow.setPosition(100, 100);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
