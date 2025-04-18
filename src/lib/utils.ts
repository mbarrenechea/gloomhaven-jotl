import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const groupBy = <T>(arr: T[], keys: (keyof T)[]): [string, T[]][] => {
  const gs = arr.reduce(
    (storage, item) => {
      const objKey = keys.map((key) => `${item[key]}`).join(":");
      if (storage[objKey]) {
        storage[objKey].push(item);
      } else {
        storage[objKey] = [item];
      }
      return storage;
    },
    {} as { [key: string]: T[] },
  );

  return Object.entries(gs);
};
