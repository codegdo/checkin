import { useAction } from './use-action.hook';

export const useLogin = (): any => {
  const { updateSession } = useAction();

  const login = (data: any) => {
    const { user } = data;

    //
    if (user) {
      updateSession({ user });
    }
  };

  return [{}, login];
};
