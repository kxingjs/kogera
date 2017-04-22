import {KXing} from 'kxing';

export default class DecodeService {
    static decode(image) {
        return KXing.getReader().decode(image).text;
    }
};
