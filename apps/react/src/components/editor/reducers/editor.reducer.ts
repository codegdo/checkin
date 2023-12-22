import { Action, ActionType, Ref, Payload, SelectTab, State, UpdateValue } from "../types";

const initialState = {
  data: undefined,
  tab: null,
};

const initialRef = (): Ref => {
  return {};
};

const editorReducer = (state: State, { type, payload }: Action<Payload>) => {
  switch (type) {
    case ActionType.SELECT_TAB: {
      const { tab } = payload as SelectTab;

      return {
        ...state, tab,
      };
    }
    case ActionType.UPDATE_VALUE: {
      const { keyvalue } = payload as UpdateValue;

      return {
        ...state,
        data: { ...state.data, ...keyvalue },
      };
    }
    default:
      return state;
  }
}

const editorTabs = (dataType?: string) => {
  switch (dataType) {
    case 'field':
      return [
        {
          id: 1,
          title: "Content",
          data: [
            {
              type: 'text',
              name: 'title',
              title: 'Title',
              data: null
            },
            {
              type: 'text',
              name: 'description',
              title: 'Description',
              data: null
            }
          ]
        },
        {
          id: 2,
          title: "Design",
          data: []
        },
        {
          id: 3,
          title: "Setting",
          data: []
        }
      ]
    default:
      return [];
  }
}

export { initialState, initialRef, editorTabs, editorReducer }
