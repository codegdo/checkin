import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import { persistedReducer } from './store/reducers';

const { createReduxHistory, routerMiddleware } = createReduxHistoryContext({
  history: createBrowserHistory(),
  //other options if needed
});

const composeEnhancers = composeWithDevTools({
  // other options like actionSanitizer, stateSanitizer, actionsDenylist, actionsCreators
});

const store: Store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk, routerMiddleware))
);
const persistor = persistStore(store);
const history = createReduxHistory(store);

export { store, persistor, history };
