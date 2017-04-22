import React from 'react'
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import BaseView from './view/BaseView'
import TopView from './view/TopView'


window.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <BaseView>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={TopView}/>
                    <Redirect from="*" to="/"/>
                </Switch>
            </BrowserRouter>
        </BaseView>,
        document.querySelector('#content'))
});
