import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import  login  from './reducers/login.js';

//Search And List Trail Set

//import reducers here 

const rootReducer = combineReducers({
  login
})

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

 const store = createStore( rootReducer, applyMiddleware(thunk));

// we export history because we need it in `reduxstagram.js` to feed into <Router>
// export const history = syncHistoryWithStore(browserHistory, store);



export default store;