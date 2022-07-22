import { useLocation } from "react-router-dom";

export const useTracking = (route: string | undefined, page: string) => {
  const location = useLocation();

  const setTracking = () => {
    document.body.setAttribute('data-view', `${route}_${page}`);
    console.log(location)
  }

  return [setTracking]
}