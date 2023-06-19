import { StrClassName, StrClassObject } from "./types";

function classNames(...args: (StrClassName | StrClassObject)[]): string {
  const classNames = new Set<StrClassName>();

  for (const arg of args) {
    if (typeof arg === 'string') {
      classNames.add(arg);
    } else if (typeof arg === 'object' && arg !== null) {
      const classObject = arg;
      for (const [className, enabled] of Object.entries(classObject)) {
        if (enabled) {
          classNames.add(className);
        }
      }
    }
  }

  return Array.from(classNames).filter((c) => !!c).join(' ');
}

export default classNames;