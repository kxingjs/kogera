import React from 'react'
import {PropTypes} from 'prop-types'
import {KXing} from 'kxing';
import VideoStreamLoader from '../service/VideoStreamLoader';

const CAMERA_FRAME_STYLE = 'rgba(50, 50, 50, 0.5)';

export default class CameraRanderComponent extends React.Component {
    static propTypes = {
        /**
         * width of the component
         */
        width: PropTypes.number.isRequired,

        /**
         * height of the component
         */
        height: PropTypes.number.isRequired,

        /**
         *
         */
        interval: PropTypes.number,

        /**
         * Fired when the `Dialog` is requested to be closed by a click outside the `Dialog` or on the buttons.
         *
         * @param {bool} buttonClicked Determines whether a button click triggered this request.
         */
        onDidSnapshot: PropTypes.func.isRequired,

        /**
         * Fired when the `Dialog` is requested to be closed by a click outside the `Dialog` or on the buttons.
         *
         * @param {object} buttonClicked Determines whether a button click triggered this request.
         */
        onErrorCapture: PropTypes.func,
    };

    static defaultProps = {
        interval: 1000
    };

    constructor(props) {
        super(props);

        this._dependencies = {
            videoStreamLoader: new VideoStreamLoader()
        };
        this._timeoutId = null;
        this._elements = {
            video: null,
            overlayCanvas: null
        };
    }

    startCapture = () => {
        // setup and start capture.
        const videoElement = document.querySelector('video');

        Promise.resolve()
            .then(() => {
                return this._dependencies.videoStreamLoader.load(videoElement);
            })
            .then(() => {

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


                const capture = () => {
                    this._timeoutId = setTimeout(capture, this.props.interval);
                    captureContext.beginPath();
                    captureContext.rect(...clipProps);
                    captureContext.clip();
                    captureContext.drawImage(videoElement, 0, 0, videoWidth, videoHeight);

                    this.props.onDidSnapshot(captureContext.getImageData(...clipProps));
                };
                capture();


            })
            .catch(this.props.onErrorCapture);
    };

    stopCapture = () => {
        this._dependencies.videoStreamLoader.stop();
        clearTimeout(this._timeoutId);
        this._timeoutId = null;
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
        window.addEventListener('focus', this.startCapture);
        window.addEventListener('blur', this.stopCapture);

        this.startCapture();
    }

    componentWillUnmount() {
        window.removeEventListener('focus', this.startCapture);
        window.removeEventListener('blur', this.stopCapture);

        this.stopCapture();
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
