"use strict";
import {TempUnit} from "../constants/TempUnits.js";

export class Temp {
    /**
     * @type {string} #unit;
     */
    #unit = '';

    constructor() {
    }

    setMetric() {
        this.#unit = TempUnit.METRIC; // Degres
    }

    setImperial() {
        this.#unit = TempUnit.IMPERIAL; // Farenheit
    }

    changeUnit() {
        if (this.#unit === TempUnits.METRIC) {
            this.setImperial()
        } else {
            this.setMetric()
        }
    }

    /**
     *
     * @returns {string}
     */
    getUnits() {
        return this.#unit
    }

}
