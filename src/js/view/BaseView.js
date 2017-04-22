import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import * as ColorManipulator from 'material-ui/utils/colorManipulator'
import * as Spacing from 'material-ui/styles/spacing';

import '../../main.css';

const muiTheme = getMuiTheme({
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    svgIcon: {
        color: Colors.darkBlack
    },
    palette: {
        primary1Color: Colors.grey400,
        primary2Color: Colors.grey900,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.orange500,
        accent2Color: Colors.grey100,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.tealA200,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
    }
});

export default class BaseView extends React.Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                { this.props.children }
            </MuiThemeProvider>
        );
    }
}
