export const UPDATE_LAYOUT_EXTERNAL = 'layout/UPDATE_LAYOUT_EXTERNAL';
export const UPDATE_LAYOUT_INTERNAL = 'layout/UPDATE_LAYOUT_INTERNAL';
export const UPDATE_LAYOUT_GENERAL = 'layout/UPDATE_LAYOUT_GENERAL';
export const UPDATE_LAYOUT = 'layout/UPDATE_LAYOUT';

export interface LayoutState {
  external: { [x: string]: string };
  internal: { [x: string]: string };
  general: { [x: string]: string };
}
