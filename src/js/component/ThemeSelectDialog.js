import React from 'react'

import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';

import Themes from '../Themes'

const ThemeSelectDialog = (props) => {
    const {open, handleOpenDialog, handleSelectTheme} = props;

    return (
        <Dialog
            title="Theme"
            open={open}
            onRequestClose={handleOpenDialog}
            autoScrollBodyContent={true}>
            <List>
                {Themes.map((theme) => {
                    return (
                        <ListItem
                            key={theme.key}
                            primaryText={theme.displayName}
                            onTouchTap={() => handleSelectTheme(theme.key)}/>
                    )
                })}
            </List>
        </Dialog>
    );
};

export default ThemeSelectDialog;
