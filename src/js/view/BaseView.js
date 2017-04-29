import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {loadTheme} from '../Themes';
import LocalStorageManager from '../service/LocalStorageManager';
import '../../main.css';

const localStorageManager = new LocalStorageManager();
const muiTheme = getMuiTheme(loadTheme(localStorageManager.getValue('theme')));

export default class BaseView extends React.Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                { this.props.children }
            </MuiThemeProvider>
        );
    }
}
