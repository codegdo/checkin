import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const getTabBarStyle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'home';

  console.log(routeName);

  const display = (['setup', 'calendar-modal'].includes(routeName)) ? 'none' : 'flex';
  return { display }
}