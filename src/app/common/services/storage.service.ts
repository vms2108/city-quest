import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  private storageIDKey = 'city-quest';

  public saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getData(key: string): string | null {
    return localStorage.getItem(key);
  }
  public removeData(key: string): void {
    localStorage.removeItem(key);
  }

  public clearData(): void {
    localStorage.clear();
  }

  public getUserId(): string {
    const browserId = JSON.parse(localStorage.getItem(this.storageIDKey)!);
    if (!!browserId) {
      return browserId;
    }
    const newBrowserId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem(this.storageIDKey, JSON.stringify( newBrowserId ));
    return newBrowserId;
  }
}
