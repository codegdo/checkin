import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { persistedReducer } from './store/reducers';

const composeEnhancers = composeWithDevTools({
  // other options like actionSanitizer, stateSanitizer, actionsDenylist, actionsCreators
});

const store: Store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export { store, persistor };