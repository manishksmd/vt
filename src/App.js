import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
// import { Header } from './components/layout/index';
import { store } from './store';
import Main from './containers/Main';
// import Video from './containers/Video';
// import Chat from './containers/Chat';
// import WhiteBoard from './containers/WhiteBoard';

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
        <Route exact path="/" component={Main} />
    </BrowserRouter>
  </Provider>
)

export default App;
