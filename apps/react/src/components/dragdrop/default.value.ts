export const defaultState = {
  data: [],
  history: [],
  currentIndex: -1,
  item: null,
  isSelecting: false,
  isEditing: false,
};

export const defaultRef = {
  dropItem: null,
  elementRefs: {},
  coordinate: { x: 0, y: 0 },
  offset: '',
  direction: '',
  canDrop: true,
};