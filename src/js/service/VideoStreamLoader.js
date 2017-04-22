export default class VideoStreamLoader {
    constructor() {
        this._devices = [];
    }

    load() {
        return Promise.resolve()
            .then(() => {
                return navigator.mediaDevices.enumerateDevices();
            })
            .then((mediaDeviceInfoList) => {
                console.log('使える入出力デバイスs->', mediaDeviceInfoList);

                const videoDevices = mediaDeviceInfoList.filter((deviceInfo) => {
                    return deviceInfo.kind == 'videoinput';
                }).reverse();
                if (videoDevices.length < 1) {
                    throw new Error('ビデオの入力デバイスがない、、、、、。');
                }

                this._devices = videoDevices;

                return navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                        deviceId: videoDevices[0].deviceId
                    }
                });
            });
    }
};
