import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWeekday(datetime: number, timezone: string) {
  return new Date(datetime).toLocaleDateString("en-US", {
    timeZone: timezone,
    weekday: "long",
  });
}

export function getTime(datetime: number, timezone: string) {
  return new Date(datetime).toLocaleTimeString("en-US", {
    timeZone: timezone,
  });
}
