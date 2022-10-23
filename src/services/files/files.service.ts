import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  private _ipc: IpcRenderer | undefined;

  constructor() {
    if((<any>window).require) {
      try {
        this._ipc = (<any>window).require('electron').ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('failed to load Electron IPC')
    }
  }

  async getFiles() {
    if (!this._ipc) { return; } else {
      return new Promise<string[]>((resolve, reject) => {
        this._ipc?.once("getFilesResponse", (event, arg) => {
          resolve(arg);
        });
        this._ipc?.send("getFiles");
      });
    }
  }

}
