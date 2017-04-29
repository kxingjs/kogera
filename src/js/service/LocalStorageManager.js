import {FightOrange} from '../Themes';

const SETTING_STORE_KEY = "kogera-reader-storage";
const initStore = {
    theme: FightOrange.key
};

export default class LocalStorageManager {
    _cache;

    getValue(key) {
        if (!this._cache) {
            this._cache = this._load();
        }
        return this._cache[key];
    }

    saveValue(key, value) {
        this._cache = this._load();
        this._cache[key] = value;

        localStorage.setItem(SETTING_STORE_KEY, JSON.stringify(this._cache));
    }

    _load() {
        return Object.assign({},
            initStore,
            JSON.parse(localStorage.getItem(SETTING_STORE_KEY))
        );
    }
}
