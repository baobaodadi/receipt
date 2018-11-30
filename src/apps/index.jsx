import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import rootReducer from '../reducers';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import rootSaga from '../sagas';
import createSagaMiddleware from 'redux-saga';
import '../style/index.less';

const sagaMiddleware = createSagaMiddleware();


const history = createBrowserHistory();
const middleware = [thunk, sagaMiddleware];

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(applyMiddleware(
    routerMiddleware(history),
    ...middleware,
  )),
);

sagaMiddleware.run(rootSaga);

// const basename=(window.location.hostname === "oa.sogou-inc.com")?'/asset/admin/':'/';

function renderApp() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById('main'),
  );
}

renderApp();

