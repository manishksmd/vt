import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { store } from './store';

import Main from './containers/Main';


export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={Main} />
    </BrowserRouter>
  </Provider>
)

export default App;

