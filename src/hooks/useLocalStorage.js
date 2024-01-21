import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      let item = window.localStorage.getItem(key) || null;

      if (item === null) {
        return initialValue;
      }
      try {
        return JSON.parse(item);
      } catch (error) {
        return item;
      }
    } catch (err) {
      console.log("localstorage failed", err);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      if (typeof value === "object") {
        window.localStorage.setItem(key, JSON.stringify(value));
      } else {
        window.localStorage.setItem(key, value);
      }
    } catch (err) {
      console.log("localstorage setitem err", err);
    }
  };

  return [storedValue, setValue];
}
