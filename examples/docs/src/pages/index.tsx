import React from 'react';
import ReactDOM from 'react-dom';
import {unregister} from './utils';
import {HelmetProvider} from 'react-helmet-async';
import {ControlsProvider} from 'react-three-gui';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import {Home} from './Home';

import './styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

function Provider ({children}: any) {
  return (
    <HelmetProvider>
      <ControlsProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ControlsProvider>
    </HelmetProvider>
  )
}

ReactDOM.render(
  <Provider>
    <Switch>
      <Route  path="/"     component={Home} exact/>
      <Route  path="/home" component={Home} exact/>
      <Route  path='/none' component={Home}/>
      <Redirect to={window.location.host.match("localhost")?'/none':'/home'}/>
    </Switch>
  </Provider>,
  document.getElementById('root')
);
unregister();
