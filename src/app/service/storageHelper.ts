import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageHelper {
  saveToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getFromLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
