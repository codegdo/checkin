export const defaultState = {
  dataSource: [],
  currentData: [],
  historyData: [],
  historyIndex: -1,
  isEditing: false,
  isSelecting: false,
};

export const defaultRef = {
  dropItem: null,
  selectedItem: null,
  selectedRef: null,
  elementRef: {},
  eventRef: null,
  coordinate: { x: 0, y: 0 },
  offset: '',
  direction: '',
  canDrop: true,
};