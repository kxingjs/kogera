export default class VideoStreamLoader {
    /**
     * loaded video devices
     *
     * @type {Array}
     * @private
     */
    _videoDevices = [];

    /**
     *
     * @type {number}
     * @private
     */
    _currentDeviceIndex = 0;

    /**
     *
     * @type {null}
     * @private
     */
    _currentStream = null;

    /**
     * target HtmlVideoElement.
     *
     * @type {null}
     * @private
     */
    _videoElement = null;

    /**
     * load video device with {@link navigator}
     *
     * @param videoElement
     * @returns {Promise.<TResult>}
     * @throws thrown {@link Error} when device didn't provide any video input.
     */
    load(videoElement) {
        this._videoElement = videoElement;

        return Promise.resolve()
            .then(() => {
                return this._getVideoDeviceListPromise();
            })
            .then((videoDevices) => {
                this._videoDevices = videoDevices;
                return this._getVideoStreamPromise();
            })
            .then((videoMediaStream) => {
                this._currentStream = videoMediaStream;
                return this._getLoadedVideoElementPromise(videoMediaStream);
            })
    };

    /**
     *
     * @returns {Promise.<TResult>}
     */
    changeDevice() {
        this.stop();

        this._currentDeviceIndex++;
        this._currentDeviceIndex = this._currentDeviceIndex % this._videoDevices.length;

        return Promise.resolve()
            .then(() => {
                return this._getVideoStreamPromise();
            })
            .then((videoMediaStream) => {
                this._currentStream = videoMediaStream;
                return this._getLoadedVideoElementPromise(videoMediaStream);
            })
    }

    /**
     * stop video in use.
     */
    stop() {
        if(this._currentStream){
            this._currentStream.getVideoTracks()[0].stop();
            this._currentStream = null;
        }
    }
    
    _getVideoStreamPromise() {
        const currentDeviceId = this._videoDevices[this._currentDeviceIndex].deviceId;

        return navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                deviceId: currentDeviceId
            }
        });
    }

    _getVideoDeviceListPromise() {
        return Promise.resolve()
            .then(() => {
                return navigator.mediaDevices.enumerateDevices();
            })
            .then((mediaDeviceInfoList) => {
                const videoDevices = mediaDeviceInfoList.filter((deviceInfo) => {
                    return deviceInfo.kind == 'videoinput';
                }).reverse();

                if (videoDevices.length < 1) {
                    throw new Error('Could not find any video devices.');
                }

                return new Promise((fulfilled, rejected) => {
                    fulfilled(videoDevices);
                });
            });
    }

    _getLoadedVideoElementPromise(videoMediaStream) {
        return new Promise((fulfilled, rejected) => {
            this._videoElement.addEventListener('loadedmetadata', () => {
                fulfilled();
            });
            this._videoElement.srcObject = videoMediaStream;
        })
    }
};
