import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const getTabBarStyle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  console.log(routeName);

  let display = (['Setup'].includes(routeName)) ? 'none' : 'flex';
  return { display }
}