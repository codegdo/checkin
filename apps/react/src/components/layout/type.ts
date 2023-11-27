export type ComponentProps = {
  module: string;
  view?: string;
  object?: string;
  action?: string[];
}

export enum AttributeIds {
  MAIN = 'jsx_main',
  MENU = 'jsx_menu',
  SIDEBAR = 'jsx_sidebar'
}