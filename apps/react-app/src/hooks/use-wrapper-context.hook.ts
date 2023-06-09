import { useContext } from 'react';

export function useWrapperContext<T>(context: React.Context<T>): T {
  const ctx = useContext(context);

  if (!ctx) {
    throw new Error('Context not found!');
  }

  return ctx;
}