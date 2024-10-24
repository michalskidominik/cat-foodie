import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { Cat } from './cat';

@Injectable({
  providedIn: 'root',
})
export class CatService {
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = this.initDB();
  }

  private async initDB(): Promise<IDBPDatabase> {
    return openDB('CatDatabase', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('cats')) {
          db.createObjectStore('cats', { keyPath: 'id', autoIncrement: true });
        }
      },
    });
  }

  async getAll(): Promise<Cat[]> {
    const db = await this.dbPromise;
    console.log('getAll');

    return await db.getAll('cats');
  }

  async get(id: string): Promise<Cat | undefined> {
    const db = await this.dbPromise;
    return await db.get('cats', id);
  }

  async create(cat: Cat): Promise<void> {
    cat.weightDateUpdated = new Date();
    const db = await this.dbPromise;
    await db.add('cats', { ...cat, id: crypto.randomUUID() });
  }

  async edit(id: string, cat: Cat): Promise<void> {
    const db = await this.dbPromise;
    await db.put('cats', { ...cat, id });
  }

  async updateWeight(id: string, weight: number): Promise<void> {
    const db = await this.dbPromise;
    const cat = await db.get('cats', id);
    if (cat) {
      cat.weight = weight;
      cat.weightDateUpdated = new Date();
      await db.put('cats', cat);
    }
  }

  async delete(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('cats', id);
  }
}
