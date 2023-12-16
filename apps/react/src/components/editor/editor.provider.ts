import React from "react";

interface ContextValue {}

const EditorContext = React.createContext<ContextValue>({});

export const EditorProvider = EditorContext.Provider;
export default EditorContext;