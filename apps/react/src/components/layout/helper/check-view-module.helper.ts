import { View } from "@/store/types";
import { ComponentProps } from "../type";

export const checkViewModule = (routeContext?: ComponentProps, viewmodule?: Record<string, View[]>) => {
  if (!routeContext || !viewmodule || !routeContext.module) {
    return false;
  }

  console.log('routeContext', routeContext);

  if(routeContext.module === 'dashboard') {
    return true;
  }

  const moduleViews = viewmodule[routeContext.module];
  
  if (Array.isArray(moduleViews)) {
    if (routeContext.view) {
      const foundView = moduleViews.find(view => view.name === routeContext.view);
      return !!foundView;
    }
    return true; // If routeContext has module and no view specified
  }

  return false; // If moduleViews is not an array
};
