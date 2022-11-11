class Store {
    /** {number} */
    #temp
    /** {number} */
    #logitude
    /** {number} */
    #latitude
    /** {number} */
    #windSpeed


    constructor() {
    }

    get temp() {
        return this.#temp;
    }

    set temp(value) {
        this.#temp = value;
    }

    get logitude() {
        return this.#logitude;
    }

    set logitude(value) {
        this.#logitude = value;
    }

    get latitude() {
        return this.#latitude;
    }

    set latitude(value) {
        this.#latitude = value;
    }

    get windSpeed() {
        return this.#windSpeed;
    }

    set windSpeed(value) {
        this.#windSpeed = value;
    }
}
