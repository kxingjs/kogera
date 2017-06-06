import React from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import {loadTheme} from '../Themes'
import OpenSourceListDialog from '../component/OpenSourceListDialog';
import ThemeSelectDialog from '../component/ThemeSelectDialog';
import LocalStorageManager from '../service/LocalStorageManager'
import PackageJson from '../../../package.json';

const APPBAR_TITLE = 'Settings';

export default class SettingsView extends React.Component {
    state = {
        isOpenSelectThemeDialog: false,
        isOpenOpenSourceDialog: false,
        selectedThemeKey: null,
        settings: {}
    };

    _dependencies = {
        localStorageManager: new LocalStorageManager()
    };

    handleCloseView = () => {
        this.props.history.push('/');
    };

    handleSelectTheme = (selectedThemeKey) => {
        this.setState({
            selectedThemeKey: selectedThemeKey,
            isOpenSelectThemeDialog: false
        });
        this._dependencies.localStorageManager.saveValue('theme', selectedThemeKey);

        // refresh
        window.location.reload();
    };

    handleOpenSelectThemeDialog = () => {
        this.setState({isOpenSelectThemeDialog: true});
    };

    handleCloseSelectThemeDialog = () => {
        this.setState({isOpenSelectThemeDialog: false});
    };

    handleOpenOpenSourcesDialog = () => {
        this.setState({isOpenOpenSourceDialogn: true});
    };

    handleCloseOpenSourcesDialog = () => {
        this.setState({isOpenOpenSourceDialog: false});
    };

    componentWillMount() {
        this.setState({selectedThemeKey: this._dependencies.localStorageManager.getValue('theme')});
    }

    render() {
        const {
            isOpenOpenSourceDialog,
            isOpenSelectThemeDialog,
            selectedThemeKey
        }= this.state;
        return (
            <div>
                <AppBar
                    title={APPBAR_TITLE}
                    iconElementLeft={<IconButton><CloseIcon /></IconButton>}
                    onLeftIconButtonTouchTap={this.handleCloseView}
                />

                <List>
                    <Subheader>General</Subheader>
                    <ListItem
                        primaryText="Theme"
                        secondaryText={loadTheme(selectedThemeKey).displayName}
                        onTouchTap={this.handleOpenSelectThemeDialog}
                    />
                </List>
                <Divider/>
                <List>
                    <Subheader>About</Subheader>
                    <ListItem
                        primaryText="Open sources"
                        secondaryText="Details for open source software"
                        onTouchTap={this.handleOpenOpenSourcesDialog}
                    />
                    <ListItem
                        primaryText="Application version"
                        secondaryText={PackageJson.version}
                    />
                </List>

                <ThemeSelectDialog
                    open={isOpenSelectThemeDialog}
                    handleOpenDialog={this.handleCloseSelectThemeDialog}
                    handleSelectTheme={this.handleSelectTheme}/>

                <OpenSourceListDialog
                    open={isOpenOpenSourceDialog}
                    handleOpenDialog={this.handleCloseOpenSourcesDialog}/>
            </div>
        )
    }
}
