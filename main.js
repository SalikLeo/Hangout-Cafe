const { app, BrowserWindow, dialog, ipcMain, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');

// Disable GPU hardware acceleration to avoid Windows AMD DirectComposition driver warning logs
app.disableHardwareAcceleration();

let mainWindow;

function syncAppIcon(imagePath) {
  if (!imagePath || !fs.existsSync(imagePath)) return;
  try {
    const buildDir = path.join(__dirname, 'build');
    const assetsDir = path.join(__dirname, 'assets');
    if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir, { recursive: true });
    if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

    const ext = path.extname(imagePath).toLowerCase();
    
    // Copy to standard asset and build paths
    try { fs.copyFileSync(imagePath, path.join(buildDir, 'icon.png')); } catch (e) {}
    try { fs.copyFileSync(imagePath, path.join(assetsDir, 'icon.png')); } catch (e) {}
    try { fs.copyFileSync(imagePath, path.join(assetsDir, 'logo.jpg')); } catch (e) {}
    try { fs.copyFileSync(imagePath, path.join(assetsDir, 'logo.png')); } catch (e) {}
    
    if (ext === '.ico') {
      try { fs.copyFileSync(imagePath, path.join(buildDir, 'icon.ico')); } catch (e) {}
      try { fs.copyFileSync(imagePath, path.join(assetsDir, 'icon.ico')); } catch (e) {}
    } else {
      try { fs.copyFileSync(imagePath, path.join(buildDir, 'icon.ico')); } catch (e) {}
      try { fs.copyFileSync(imagePath, path.join(assetsDir, 'icon.ico')); } catch (e) {}
    }

    const img = nativeImage.createFromPath(imagePath);
    if (!img.isEmpty() && mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.setIcon(img);
    }
  } catch (err) {
    console.error('Failed to sync app icon:', err);
  }
}

function getAppIconPath() {
  const customIco = path.join(__dirname, 'build', 'icon.ico');
  if (fs.existsSync(customIco)) return customIco;

  const customLogo = path.join(__dirname, 'assets', 'logo.jpg');
  if (fs.existsSync(customLogo)) return customLogo;

  const buildPng = path.join(__dirname, 'build', 'icon.png');
  if (fs.existsSync(buildPng)) return buildPng;

  const assetsPng = path.join(__dirname, 'assets', 'icon.png');
  if (fs.existsSync(assetsPng)) return assetsPng;

  return undefined;
}

function createWindow() {
  const iconPath = getAppIconPath();
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: iconPath || path.join(__dirname, 'assets', 'logo.jpg')
  });

  mainWindow.maximize();
  mainWindow.loadFile('index.html');
  mainWindow.focus();

  if (iconPath) {
    syncAppIcon(iconPath);
  }

  // Open DevTools in development
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  // Prevent closing if there are hold orders pending
  mainWindow.on('close', async (e) => {
    // If we've already approved closing, let it proceed
    if (mainWindow && mainWindow.__allowClose) return;

    // Avoid re-entrancy / multiple dialogs
    if (mainWindow && mainWindow.__closeCheckInProgress) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    if (!mainWindow) return;
    mainWindow.__closeCheckInProgress = true;

    let holdCount = 0;
    try {
      holdCount = await mainWindow.webContents.executeJavaScript(
        `(() => {
          try {
            const raw = localStorage.getItem('holdOrders');
            if (!raw) return 0;
            const orders = JSON.parse(raw);
            if (!Array.isArray(orders)) return 0;
            return orders.filter(o => o && ((o.status ?? 'pending') === 'pending')).length;
          } catch (e) {
            return 0;
          }
        })()`,
        true
      );
    } catch (err) {
      holdCount = 0;
    }

    if (holdCount > 0) {
      await mainWindow.webContents.executeJavaScript(
        `if (typeof showCustomAlert === 'function') {
          showCustomAlert('Please complete Hold Orders before closing the application.\\n\\nYou have ${holdCount} order(s) still in Hold Orders.', 'Hold Orders Pending');
        }`,
        true
      );
      mainWindow.__closeCheckInProgress = false;
      return;
    }

    // No hold orders, allow closing
    mainWindow.__allowClose = true;
    mainWindow.__closeCheckInProgress = false;
    mainWindow.close();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC Handlers for Settings & Data Management
ipcMain.handle('select-logo-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Select Cafe Logo',
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'ico', 'webp', 'bmp'] }]
  });
  if (!result.canceled && result.filePaths.length > 0) {
    const chosenPath = result.filePaths[0];
    syncAppIcon(chosenPath);

    try {
      const fileBuffer = fs.readFileSync(chosenPath);
      const ext = path.extname(chosenPath).toLowerCase().replace('.', '');
      let mimeType = 'image/jpeg';
      if (ext === 'png') mimeType = 'image/png';
      else if (ext === 'webp') mimeType = 'image/webp';
      else if (ext === 'ico') mimeType = 'image/x-icon';

      const base64Data = `data:${mimeType};base64,${fileBuffer.toString('base64')}`;
      return {
        filePath: chosenPath,
        base64: base64Data
      };
    } catch (e) {
      console.error('Error reading selected logo file:', e);
      return { filePath: chosenPath, base64: null };
    }
  }
  return null;
});

ipcMain.handle('sync-app-logo-data', async (event, base64OrPath) => {
  if (!base64OrPath) return false;
  try {
    if (base64OrPath.startsWith('data:')) {
      const matches = base64OrPath.match(/^data:([^;]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const buffer = Buffer.from(matches[2], 'base64');
        const assetsDir = path.join(__dirname, 'assets');
        const buildDir = path.join(__dirname, 'build');
        if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
        if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir, { recursive: true });

        fs.writeFileSync(path.join(assetsDir, 'logo.jpg'), buffer);
        fs.writeFileSync(path.join(assetsDir, 'logo.png'), buffer);
        fs.writeFileSync(path.join(assetsDir, 'icon.png'), buffer);
        fs.writeFileSync(path.join(assetsDir, 'icon.ico'), buffer);
        fs.writeFileSync(path.join(buildDir, 'icon.png'), buffer);
        fs.writeFileSync(path.join(buildDir, 'icon.ico'), buffer);

        const img = nativeImage.createFromBuffer(buffer);
        if (!img.isEmpty() && mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.setIcon(img);
        }
        return true;
      }
    } else if (fs.existsSync(base64OrPath)) {
      syncAppIcon(base64OrPath);
      return true;
    }
  } catch (err) {
    console.error('sync-app-logo-data error:', err);
  }
  return false;
});

ipcMain.handle('backup-data-file', async (event, dataToSave) => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const datetimeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

  const result = await dialog.showSaveDialog(mainWindow, {
    title: 'Backup Application Data',
    defaultPath: `HangoutCafe-Backup-${datetimeStr}.json`,
    filters: [{ name: 'JSON Backup File', extensions: ['json'] }]
  });

  if (!result.canceled && result.filePath) {
    try {
      const content = typeof dataToSave === 'string' ? dataToSave : JSON.stringify(dataToSave, null, 2);
      fs.writeFileSync(result.filePath, content, 'utf8');
      return { success: true, filePath: result.filePath };
    } catch (err) {
      console.error('Backup write failed:', err);
      return { success: false, error: err.message };
    }
  }
  return { success: false, error: 'Cancelled' };
});

ipcMain.handle('restore-data-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Select Backup File to Restore',
    properties: ['openFile'],
    filters: [{ name: 'JSON Backup File', extensions: ['json', 'bak'] }]
  });

  if (!result.canceled && result.filePaths.length > 0) {
    try {
      const filePath = result.filePaths[0];
      const rawContent = fs.readFileSync(filePath, 'utf8');
      const parsedData = JSON.parse(rawContent);
      return { success: true, data: parsedData, filePath };
    } catch (err) {
      console.error('Restore read failed:', err);
      return { success: false, error: err.message };
    }
  }
  return { success: false, error: 'Cancelled' };
});

// Single-instance lock to ensure new launches bring existing window to front
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

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
}

