import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore, history } from './store';
import { Router, Route, Switch } from 'react-router-dom';
import Store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Router history={history}>
            <Switch>
                <Route path="/" component={Store} />
            </Switch>
        </Router>
    </Provider>
    );
  }
}

export default App;
