export const localStorageHelper = {
  setItem: (key: string, value: any) => {
    try {
      let valueStringify = value;
      if (typeof value === 'object') {
        valueStringify = JSON.stringify(value);
      }
      localStorage.setItem(key, valueStringify);
    } catch (e) {
      console.error('Set item localStorage failed.');
    }
  },
  getItem: (key: string, options?: { isObject: boolean }) => {
    try {
      if (localStorage !== null && localStorage !== undefined) {
        const value = localStorage.getItem(key);
        if (value && options?.isObject) {
          try {
            return JSON.parse(value);
          } catch (e) {
            return value;
          }
        }
        return value;
      }
    } catch (e) {
      console.log('Get item localStorage failed');
    }
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
  isLogin: () => {
    return !!localStorageHelper.getItem(
      process.env.REACT_APP_ACCESS_TOKEN_KEY!
    );
  },
};
