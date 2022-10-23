"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var fs = require('fs');
var electronWindow;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
//   app.quit();
// }
electron_1.app.on('ready', createWindow);
electron_1.app.on('activate', function () {
    if (electronWindow === null) {
        createWindow();
    }
});
function createWindow() {
    var electronWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        title: 'Prospectus',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    electronWindow.loadURL(url.format({
        pathname: path.join(__dirname, "/../../dist/index.html"),
        protocol: 'file:',
        slashes: true,
    }));
    electronWindow.webContents.openDevTools(); //DEVELOPMENT CONVENIENCE 🚫 deployment
    electronWindow.on('closed', function () {
        // MacOS menu bar application stay active until explicit ⌘＋Q
        if (process.platform !== 'darwin') {
            electronWindow = null;
            electron_1.app.quit();
        }
    });
}
electron_1.ipcMain.on('getFiles', function (event, arg) {
    var files = fs.readdirSync(__dirname);
    electronWindow.webContents.send('getFilesResponse', files);
});
//# sourceMappingURL=main.js.map