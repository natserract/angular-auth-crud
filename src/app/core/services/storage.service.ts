import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BrowserStorage } from '../models/storage.model';
import * as CryptoJS from 'crypto-js';

const KEY_ENCRYPT_SECRET = 'pr4bvrw3ghdpbpsxuhnxrhyc4u5q3pjx';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements BrowserStorage {
  private cache: BehaviorSubject<any>[];

  constructor() {
    this.cache = Object.create(null);
  }

  setItem<T>(key: string, value: T): BehaviorSubject<T> {
    try {
      const serializeState = JSON.stringify(value);
      localStorage.setItem(key, serializeState);

      if (this.cache[key]) {
        this.cache[key].next(value);
        return this.cache[key];
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  getItem<T>(key: string): BehaviorSubject<T> {
    try {
      if (this.cache[key]) {
        return this.cache[key];
      } else {
        return this.cache[key] = new BehaviorSubject(
          JSON.parse(localStorage.getItem(key))
        );
      }
    } catch (err) {
      throw new Error('ERROR!:' + err);
    }
  }

  setItemSync(key: string, value: any, encrypted: boolean = false) {
    value = JSON.stringify(value);
    if (encrypted) {
      value = this.encryptData(value);
    }
    localStorage.setItem(key, value);
  }

  getItemSync(key: string, encrypted: boolean = false) {
    let value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    if (encrypted) {
      value = this.decryptData(value);
    }
    return JSON.parse(value);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    if (this.cache[key]) {
      // this.cache[key].next(undefined);
      delete this.cache[key];
    }
  }

  removeAllItem() {
    localStorage.clear();
  }

  private encryptData(data) {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), KEY_ENCRYPT_SECRET).toString();
    } catch (e) {
    }
  }

  private decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, KEY_ENCRYPT_SECRET);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
    }
  }
}
