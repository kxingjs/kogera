import React from 'react'
import {PropTypes} from 'prop-types'
import {KXing} from 'kxing';

import VideoStreamLoader from '../service/VideoStreamLoader';

const CAMERA_FRAME_STYLE = 'rgba(50, 50, 50, 0.5)';

export default class CameraRanderComponent extends React.Component {
    constructor() {
        super();
        this._dependencies = {
            videoStreamLoader: new VideoStreamLoader()
        }
    }

    setupCameraDevice() {
        const videoElement = document.querySelector('video');
        videoElement.addEventListener('loadedmetadata', () => {
            this.startSnapshotLoop(videoElement)
        });

        this._dependencies.videoStreamLoader.load()
            .then((mediaStream) => {
                videoElement.srcObject = mediaStream;
            })
            .catch(this.props.onErrorCapture);
    };

    startSnapshotLoop = (videoElement) => {
        const deviceWidth = videoElement.videoWidth;
        const deviceHeight = videoElement.videoHeight;
        const videoWidth = videoElement.width;
        const videoHeight = videoWidth * deviceHeight / deviceWidth;

        const captureDimension = videoWidth < videoHeight ? videoWidth / 1.5 : videoHeight / 1.5;
        const captureX = videoWidth * 0.5 - captureDimension * 0.5;
        const captureY = videoHeight * 0.5 - captureDimension * 0.5;

        const clipProps = [captureX, captureY, captureDimension, captureDimension];

        const canvasElement = document.getElementById('cameraFrame');
        canvasElement.width = videoWidth;
        canvasElement.height = videoHeight;
        const context = canvasElement.getContext('2d');
        context.fillStyle = CAMERA_FRAME_STYLE;
        context.fillRect(0, 0, videoWidth, videoHeight);
        context.clearRect(...clipProps);

        const captureCanvasElement = document.createElement('canvas');
        captureCanvasElement.width = videoWidth;
        captureCanvasElement.height = videoHeight;
        const captureContext = captureCanvasElement.getContext('2d');

        setInterval(() => {
            captureContext.beginPath();
            captureContext.rect(...clipProps);
            captureContext.clip();
            captureContext.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

            this.props.onDidSnapshot(captureContext.getImageData(...clipProps));
        }, this.props.interval);
    };

    getStyles() {
        return {
            cameraWindow: {
                position: 'relative'
            },
            video: {
                position: 'absolute'
            },
            frame: {
                position: 'absolute',
                zIndex: 1,
            }
        }
    }

    componentDidMount() {
        this.setupCameraDevice();
    }

    render() {
        const {cameraWindow, video, frame} = this.getStyles();

        return (
            <div style={cameraWindow}>
                <video
                    autoPlay
                    style={video}
                    width={this.props.width}/>
                <canvas id="cameraFrame" style={frame}/>
            </div>
        )
    }
}
CameraRanderComponent.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    interval: PropTypes.number,
    onDidSnapshot: PropTypes.func.isRequired,
    onErrorCapture: PropTypes.func,
};
