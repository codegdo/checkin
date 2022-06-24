import { useStyle } from "./use-style.hook";

export const useScreenOption = (): any => {

  const [headerBar] = useStyle('header-bar');

  const screenOption = {
    headerStyle: headerBar as {
      backgroundColor?: string | undefined;
    },
    headerShadowVisible: false,
    title: ''
  }

  return [screenOption];
};