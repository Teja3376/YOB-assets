// utils/sessionStorage.ts

export function setSession(key: string, value: any) {
  if (typeof window === "undefined") return;

  try {
    const val =
      typeof value === "string" ? value : JSON.stringify(value);
    sessionStorage.setItem(key, val);
  } catch (err) {
    console.error("setSession error:", err);
  }
}

export function getSession<T = any>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    console.error("getSession error:", err);
    return null;
  }
}

export function removeSession(key: string) {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.removeItem(key);
  } catch (err) {
    console.error("removeSession error:", err);
  }
}