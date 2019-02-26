import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './components/layout/index';


import { store } from './store';

import Main from './containers/Main';
import Video from './containers/Video';
import Chat from './containers/Chat';


export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header className="shadow-sm">
          Sample Header Content!
        </Header>
        <Route exact path="/" component={Main} />
        <Route path="/video" component={Video} />
        <Route path="/chat" component={Chat} />
      </div>



    </BrowserRouter>
  </Provider>
)

export default App;

