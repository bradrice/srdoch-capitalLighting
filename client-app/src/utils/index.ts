export const setLocalStorate = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key: string) => {
  if (key !== '') {
    const retString: (string | null) = localStorage.getItem(key);
    if (retString !== null) {
      return JSON.parse(retString);
    }
  }
}
type callbackFn = (args: any) => void;

export const once = (fn: callbackFn) => {
  let done = false;
  return (...args: any[]) => {
    if (!done) {
      done = true;
      fn([...args]);
    }
  };
};
