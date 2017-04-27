import React from 'react'
import ReactDOM from 'react-dom';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import BaseView from './view/BaseView'
import TopView from './view/TopView'
import SettingsView from './view/SettingsView'


window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <BaseView>
            <Router basename={location.pathname}>
                <Switch>
                    <Route exact path="/" component={TopView}/>
                    <Route exact path="/settings" component={SettingsView}/>
                    <Redirect from="*" to="/"/>
                </Switch>
            </Router>
        </BaseView>,
        document.querySelector('#content'))
});
