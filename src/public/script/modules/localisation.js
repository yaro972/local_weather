class Localisation {
    /**  @type {number} */
    #longitude = 0
    /**  @type {number} */
    #latitude = 0

    constructor() {
    }

    get longitude() {
        return this.#longitude;
    }

    set longitude(value) {
        this.#longitude = value;
    }

    get latitude() {
        return this.#latitude;
    }

    set latitude(value) {
        this.#latitude = value;
    }

    setLocalization(){

    }
}

export default Localisation
