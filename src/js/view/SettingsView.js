import React from 'react'
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import PackageJson from '../../../package.json';

const APPBAR_HEIGHT = getMuiTheme().appBar.height;
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

    handleCloseView = () => {
        this.props.history.replace('/');
    };

    handleOpenSelectTheme = () => {
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
                theme: ''
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
                        secondaryText={this.state.settings.theme}
                        onTouchTap={this.handleOpenSelectTheme}
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
                        {[
                            'Fight Orrange',
                            'Bird Grey',
                            'Smart Cute Blue',
                            'Arrow Blue',
                            'Nyamazing Yellow',
                            'Okome Green',
                            'Spiritual Violet',
                            'Smile Pink'
                        ].map((theme) => {
                            return (
                                <ListItem
                                    key={theme}
                                    primaryText={theme}
                                    onTouchTap={this.handleCloseOpenSourcesDialog}
                                />
                            )
                        })}
                    </List>
                </Dialog>

                <Dialog
                    title="Open sources"
                    actions={[
                        <FlatButton
                            label="OK"
                            primary={true}
                            onTouchTap={this.handleCloseOpenSourcesDialog}
                        />,
                    ]}
                    modal={false}
                    open={this.state.openSourcesDialog.isOpen}
                    onRequestClose={this.handleCloseOpenSourcesDialog}
                    autoScrollBodyContent={true}
                >
                    <List>
                        {Object.keys(PackageJson.dependencies).map((dependency, i) => {
                            return (
                                <ListItem
                                    key={dependency}
                                    primaryText={dependency}
                                    secondaryText={PackageJson.dependencies[dependency].replace(/^/g, '')}
                                    onTouchTap={this.handleCloseOpenSourcesDialog}
                                />
                            )
                        })}
                    </List>
                </Dialog>
            </div>
        )
    }
}
