import React, { useContext } from 'react';

export const useWrapperContext = <T>(context: React.Context<T>): T => {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error('Context not found!');
  }

  return ctx;
};
