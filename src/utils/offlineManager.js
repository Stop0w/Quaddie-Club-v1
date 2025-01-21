import { openDB } from 'idb';

const DB_NAME = 'QuaddieClubDB';
const STORE_NAME = 'pendingActions';

class OfflineManager {
  constructor() {
    this.db = null;
    this.initDB();
  }

  async initDB() {
    this.db = await openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      }
    });
  }

  async queueAction(action) {
    await this.db.add(STORE_NAME, {
      action,
      timestamp: Date.now(),
      status: 'pending'
    });

    // Request background sync if supported
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      const registration = await navigator.serviceWorker.ready;
      await registration.sync.register('syncPendingTips');
    }
  }

  async processPendingActions() {
    const tx = this.db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const pendingActions = await store.getAll();

    for (const action of pendingActions) {
      try {
        await this.processAction(action);
        await store.delete(action.id);
      } catch (error) {
        console.error('Failed to process action:', error);
      }
    }
  }

  async processAction(action) {
    // Implementation for processing different types of actions
    switch (action.type) {
      case 'SUBMIT_TIPS':
        return this.processTipsSubmission(action.payload);
      case 'UPDATE_SELECTION':
        return this.processSelectionUpdate(action.payload);
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }
}

export const offlineManager = new OfflineManager();
