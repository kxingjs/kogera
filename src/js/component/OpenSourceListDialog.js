import React from 'react'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';

import PackageJson from '../../../package.json';

const OpenSourceListDialog = (props) => {
    const {open, handleOpenDialog} = props;

    return (
        <Dialog
            title="Open sources"
            actions={[
                <FlatButton
                    label="OK"
                    primary={true}
                    onTouchTap={handleOpenDialog}
                />,
            ]}
            open={open}
            onRequestClose={handleOpenDialog}
            autoScrollBodyContent={true}>
            <List>
                {Object.keys(PackageJson.dependencies).map((dependency) => {
                    return (
                        <ListItem
                            key={dependency}
                            primaryText={dependency}
                            secondaryText={PackageJson.dependencies[dependency].replace(/^/g, '')}
                            onTouchTap={() => window.location.href = `https://www.npmjs.com/package/${dependency}`}
                        />
                    )
                })}
            </List>
        </Dialog>
    )
};

export default OpenSourceListDialog;
