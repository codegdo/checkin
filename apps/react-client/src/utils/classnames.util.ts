type Str = string | undefined | null;
type Obj = Record<string, boolean>;

export function classNames(...args: (Str | Obj)[]): string {
    const classNames = new Set<Str>();
  
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