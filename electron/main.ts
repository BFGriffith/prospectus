import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'
const fs = require('fs');

let electronWindow: BrowserWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
//   app.quit();
// }

app.on('ready', createWindow);

app.on('activate', () => {
  if (electronWindow === null) {
    createWindow()
  }
});

function createWindow() {
  let electronWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Prospectus',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  electronWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );
  electronWindow.webContents.openDevTools() //DEVELOPMENT CONVENIENCE 🚫 deployment
  electronWindow.on('closed', () => {
    // MacOS menu bar application stay active until explicit ⌘＋Q
    if(process.platform !== 'darwin') {
      electronWindow = null
      app.quit();
    }
  });
}

ipcMain.on('getFiles', (event, arg) => {
  const files = fs.readdirSync(__dirname);
  electronWindow.webContents.send('getFilesResponse', files);
})
