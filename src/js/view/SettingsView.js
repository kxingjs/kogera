import React from 'react'
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import Themes, {loadTheme} from '../Themes'
import OpenSourceListDialog from '../component/OpenSourceListDialog';
import LocalStorageManager from '../service/LocalStorageManager'
import PackageJson from '../../../package.json';

const APPBAR_TITLE = 'Settings';

export default class SettingsView extends React.Component {
    state = {
        selectThemeDialog: {
            isOpen: false
        },
        openSourcesDialog: {
            isOpen: false
        },
        settings: {}
    };

    constructor(props) {
        super(props);

        this._dependencies = {
            localStorageManager: new LocalStorageManager()
        }
    }

    handleCloseView = () => {
        this.props.history.push('/');
    };

    handleSelectTheme = (selectedThemeKey) => {
        const newSettings = Object.assign({}, this.state.settings, {
            themeKey: selectedThemeKey
        });

        this.setState({
            settings: newSettings,
            selectThemeDialog: {
                isOpen: false
            }
        });
        this._dependencies.localStorageManager.saveValue('theme', selectedThemeKey);

        // refresh
        window.location.reload();
    };

    handleOpenSelectThemeDialog = () => {
        this.setState({
            selectThemeDialog: {
                isOpen: true
            }
        })
    };

    handleCloseSelectThemeDialog = () => {
        this.setState({
            selectThemeDialog: {
                isOpen: false
            }
        })
    };

    handleOpenOpenSourcesDialog = () => {
        this.setState({
            openSourcesDialog: {
                isOpen: true
            }
        })
    };

    handleCloseOpenSourcesDialog = () => {
        this.setState({
            openSourcesDialog: {
                isOpen: false
            }
        })
    };

    componentWillMount() {
        this.setState({
            settings: {
                themeKey: this._dependencies.localStorageManager.getValue('theme')
            }
        })
    }

    render() {
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
                        secondaryText={loadTheme(this.state.settings.themeKey).displayName}
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

                <Dialog
                    title="Theme"
                    modal={false}
                    open={this.state.selectThemeDialog.isOpen}
                    onRequestClose={this.handleCloseSelectThemeDialog}
                    autoScrollBodyContent={true}
                >
                    <List>
                        {Themes.map((theme) => {
                            return (
                                <ListItem
                                    key={theme.key}
                                    primaryText={theme.displayName}
                                    onTouchTap={() => {
                                        this.handleSelectTheme(theme.key)
                                    }}
                                />
                            )
                        })}
                    </List>
                </Dialog>

                <OpenSourceListDialog
                    open={this.state.openSourcesDialog.isOpen}
                    handleOpenDialog={this.handleCloseOpenSourcesDialog}/>
            </div>
        )
    }
}
