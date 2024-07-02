class Localization {
    _longitude = null;
    _latitude = null;


    constructor(longitude, latitude) {
        this._longitude = longitude;
        this._latitude = latitude;
    }


    get longitude() {
        return this._longitude;
    }

    set longitude(value) {
        this._longitude = value;
    }

    get latitude() {
        return this._latitude;
    }

    set latitude(value) {
        this._latitude = value;
    }
}