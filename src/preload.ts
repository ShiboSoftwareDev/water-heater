import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  playSound: (command: boolean) =>
    ipcRenderer.send("electronAPI:playSound", command),
});
