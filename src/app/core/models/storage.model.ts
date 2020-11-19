import { BehaviorSubject } from 'rxjs';

export interface BrowserStorage {
  setItem(key: string, value: any): BehaviorSubject<any>;

  getItem(key: string): BehaviorSubject<any>;

  getItemSync(key: string, encrypted: boolean);

  setItemSync(key: string, value: any, encrypted: boolean);

  removeItem(key: string): void;
}
