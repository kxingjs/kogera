import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Theme from '../Theme.js';

import css from '../../main.css';

export default class BaseView extends React.Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(Theme)}>
                { this.props.children }
            </MuiThemeProvider>
        );
    }
}
