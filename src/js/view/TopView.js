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
        isOpen: true,
        text: "hoge",
        urls: []
    }
};
const IS_SHOWN_DEBUG_IMAGE = false;
const CAMERA_CAPTURE_INTERVAL = 1000;
const APPBAR_HEIGHT = getMuiTheme().appBar.height;
const URL_PATTERN = /(https?:\/\/[\x21-\x7e]+)/g;
const APPBAR_TITLE = 'Kogera Reader';
const Ids = {
    tempClipboardCopyArea: 'tempClipboardCopyArea',
    debugImage: 'debugImage'
};

export default class TopView extends React.Component {
    state = Object.assign({}, INIT_STATE);

    onTakeSnapshot = (imageData) => {
        IS_SHOWN_DEBUG_IMAGE && this.drawDebugImage(imageData);
        try {
            const resultText = DecodeService.decode(imageData);
            const dialogState = Object.assign({}, this.state.resultDialog, {
                isOpen: true,
                text: resultText,
                urls: detectUrls(resultText)
            });

            this.setState({resultDialog: dialogState});
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
        const imageElement = document.getElementById(Ids.debugImage);
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

    handleCopyToClipBoard(text) {
        const inputElement = document.getElementById(Ids.tempClipboardCopyArea);
        inputElement.value = text;
        inputElement.focus();
        inputElement.setSelectionRange(0, 9999);
        document.execCommand('copy');
        inputElement.blur();
    }

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

                {IS_SHOWN_DEBUG_IMAGE && <img style={{marginTop: 650}} id={Ids.debugImage}/>}

                <Dialog
                    title="Result"
                    actions={[
                        this.state.resultDialog.urls.map((url) => {
                            return (
                                <FlatButton
                                    label='Open'
                                    primary={true}
                                    onTouchTap={() => location.href = url}
                                />)
                        }),
                        <FlatButton
                            label='Copy'
                            primary={true}
                            onTouchTap={() => this.handleCopyToClipBoard(this.state.resultDialog.text)}
                        />,
                        <FlatButton
                            label="Close"
                            primary={true}
                            onTouchTap={this.handleCloseDialog}
                        />
                    ]}
                    modal={false}
                    open={this.state.resultDialog.isOpen}
                    onRequestClose={this.handleCloseDialog}>

                    <span>{this.state.resultDialog.text}</span>

                </Dialog>

                <input
                    id={Ids.tempClipboardCopyArea}
                    type="text"
                    style={{border: 'hidden', color: 'white'}}/>
            </div>
        )
    }
}
