function checkLocalStorage() {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch (e) {
    return false;
  }
}

class FallbackStorage {
  fallbackStorage: {
    [key: string]: string;
  } = {};

  valid: boolean = checkLocalStorage();

  setItem(key: string, value: any) {
    const string = typeof value === 'string' ? value : JSON.stringify(value);
    if (this.valid) {
      localStorage.setItem(key, string);
      return;
    }
    this.fallbackStorage[key] = string;
  }

  getItem(key: string) {
    let value = this.valid
      ? localStorage.getItem(key)
      : this.fallbackStorage[key];
    if (!value) return null;
    try {
      const parsed = JSON.parse(value || '');
      return parsed;
    } catch (e) {
      return value || null;
    }
  }

  removeItem(key: string) {
    if (this.valid) {
      localStorage.removeItem(key);
      return;
    }
    delete this.fallbackStorage[key];
  }
}

const storage = new FallbackStorage();

export default storage;
