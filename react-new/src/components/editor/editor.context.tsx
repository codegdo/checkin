import React, { PropsWithChildren, useCallback, useEffect, useReducer, useState } from 'react';

import { initialState, reducer } from './editor.reducer';
import { EditorContextProps, EditorProps } from './editor.type';

export const EditorContext = React.createContext<EidtorContextProps | null>(null);