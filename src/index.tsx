import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import Main from './components';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById("index")
);
