import React from 'react';
import ReactDOM from 'react-dom';
import {unregister} from './utils';
import {HelmetProvider} from 'react-helmet-async';
import {ControlsProvider} from 'react-three-gui';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'

import {Home} from './Home';
import {Hook} from './Hook';
import {None} from './None';
import {Note} from './Note';

import './styles.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const App = (
    <HelmetProvider>
        <ControlsProvider>
            <BrowserRouter>
                <Switch>
                    <Route    path="/"     component={Home} exact/>
                    <Route    path="/home" component={Home}  exact/>
                    <Route    path='/hook' component={Hook}/>
                    <Route    path="/note" component={Note}/>
                    <Route    path='/none' component={None}/>
                    <Redirect              to='/none' />
                </Switch>
            </BrowserRouter>
        </ControlsProvider>
    </HelmetProvider>
)

ReactDOM.render( App , document.getElementById('root'));
unregister();
