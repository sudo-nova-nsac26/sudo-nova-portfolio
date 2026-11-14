"use client";
import { useSyncExternalStore } from "react";
const eventName = "sudo-nova-preferences";
const memory: Record<string,string> = {};
function read(key: string) { try { return memory[key] ?? localStorage.getItem(key); } catch { return memory[key] ?? null; } }
function snapshot() {
  const language = read("sudo-nova-language") === "en" ? "en" : "pt";
  const storedTheme = read("sudo-nova-theme");
  const theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  return `${language}|${theme}`;
}
function subscribe(notify: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: light)");
  window.addEventListener(eventName, notify);
  const onStorage = () => { Object.keys(memory).forEach(key => delete memory[key]); notify(); };
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", notify);
  return () => { window.removeEventListener(eventName, notify); window.removeEventListener("storage", onStorage); media.removeEventListener("change", notify); };
}
export function savePreference(key: "language" | "theme", value: string) {
  const fullKey = `sudo-nova-${key}`;
  memory[fullKey] = value;
  try { localStorage.setItem(fullKey, value); } catch { /* Settings still work for this visit. */ }
  window.dispatchEvent(new Event(eventName));
}
export function usePreferences() {
  const state = useSyncExternalStore(subscribe, snapshot, () => "pt|dark");
  const [language, theme] = state.split("|");
  return { language: language === "en" ? "en" as const : "pt" as const, theme: theme === "light" ? "light" as const : "dark" as const };
}
