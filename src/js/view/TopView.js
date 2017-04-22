import React from 'react'
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DecodeService from '../service/DecodeService';
import {detectUrls} from '../util/UrlDetector';


import CameraRanderComponent from '../component/CameraRanderComponent';

const INIT_STATE = {
    window: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    resultDialog: {
        isOpen: false,
        text: "",
        urls: []
    }
};
const IS_SHOWN_DEBUG_IMAGE = false;
const CAMERA_CAPTURE_INTERVAL = 1000;
const APPBAR_HEIGHT = getMuiTheme().appBar.height;

const APPBAR_TITLE = 'Kogera Reader';

export default class TopView extends React.Component {
    state = INIT_STATE;

    onTakeSnapshot = (imageData) => {
        IS_SHOWN_DEBUG_IMAGE && this.drawDebugImage(imageData);

        try {
            const resultText = DecodeService.decode(imageData);
            const urls = detectUrls(resultText);

            const resultDialogState = Object.assign(this.state.resultDialog, {
                isOpen: true,
                result: resultText,
                urls: urls
            });
            this.setState({resultDialog: resultDialogState});
        } catch (ignore) {
        }
    };

    handleResize = (e) => {
        this.setState({
            window: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        });
    };

    drawDebugImage(imageData) {
        const imageElement = document.getElementById("debugImage");
        const canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        const context = canvas.getContext('2d');
        context.putImageData(imageData, 0, 0);
        imageElement.src = canvas.toDataURL();
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleCloseDialog = () => {
        this.setState({resultDialog: INIT_STATE.resultDialog});
    };

    render() {
        const cameraWidth = this.state.window.width;
        const cameraHeight = this.state.window.height - APPBAR_HEIGHT;

        return (
            <div>
                <AppBar
                    title={APPBAR_TITLE}
                    showMenuIconButton={false}
                    iconElementRight={
                        <IconMenu
                            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
                            <MenuItem primaryText="Config"/>
                        </IconMenu>
                    }
                />
                
                <CameraRanderComponent
                    width={cameraWidth}
                    height={cameraHeight}
                    interval={CAMERA_CAPTURE_INTERVAL}
                    onDidSnapshot={this.onTakeSnapshot}/>

                {IS_SHOWN_DEBUG_IMAGE && <img style={{marginTop: 650}} id="debugImage"/>}

                <Dialog
                    title="Result"
                    actions={[
                        <FlatButton
                            label="OK"
                            primary={true}
                            keyboardFocused={true}
                            onTouchTap={this.handleCloseDialog}
                        />,
                    ]}
                    modal={false}
                    open={this.state.resultDialog.isOpen}
                    onRequestClose={this.handleCloseDialog}
                >
                    {this.state.resultDialog.text}
                    {this.state.resultDialog.urls.map((url) => {
                        return (
                            <RaisedButton
                                label={url}
                                onTouchTap={() => {
                                    window.location.href = url;
                                }}
                            />
                        )
                    })}
                </Dialog>

            </div>
        )
    }
}
