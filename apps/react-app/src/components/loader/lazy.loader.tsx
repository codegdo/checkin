import React, { ComponentType, lazy} from 'react';

export const lazyload = <T extends ComponentType<{}>>(factory: () => Promise<{ default: T }>, minLoadTimeMs = 0): React.LazyExoticComponent<T> => {
    return lazy(() => {
      return Promise.all([factory(), new Promise((resolve) => setTimeout(resolve, minLoadTimeMs))]).then(([moduleExports]) => moduleExports);
    });
  }