export const defaultState = {
  dataSource: [],
  currentData: [],
  historyData: [],
  historyIndex: -1,
  selectedItem: null,
  isEditing: false,
  isSelecting: false,
};

export const defaultRef = {
  dropItem: null,
  elementRefs: {},
  coordinate: { x: 0, y: 0 },
  offset: '',
  direction: '',
  canDrop: true,
};