export interface ElectronAPI {
  playSound: (command: boolean) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
