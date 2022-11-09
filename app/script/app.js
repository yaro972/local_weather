'use strict';

/*
// Global variable
var local = {};

// Url to get data
var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "APPID=b26dd00efbc7410a76d9b6d4e9272b6c";

var units = "metric";
//  var units = "imperial";

// Liste of element of Html saved to improved change
// Image for direction
var imgDirection = document.getElementById("compassDirection");
// Display wind speed element
var windSpeed = document.getElementById("DetailZone-Wind--Speed");
// Display location display
var locationCity = document.getElementById('DetailZone-City--name');
// Time display location 
var timeDisplay = document.getElementById("DetailZone-Time");
// Temperature display Location
var tempDisplay = document.getElementById("DetailZone-temp--temp");
/!**
 * body element
 * @type {ChildNode}
 *!/
var bodyPart = document.documentElement.childNodes[2];
// Main part
var meteoDiv = document.getElementsByClassName("meteo-div");

// Function to store the location
function setLocalisation(pos) {
    local.longitude = pos.coords.longitude;
    local.latitude = pos.coords.latitude;
};

function toDouble(p_number) {
    // Add a 0 to get a number with two digits e.g. 6 -> 06 , 9 -> 09
    var numToDbl = "";

    if (p_number < 10) {
        numToDbl += "0" + p_number;
    } else {
        numToDbl += p_number;
    }

    return numToDbl;
};

// Show the wind direction and the speed
function showWind(direction, speed) {
    // Get the angle of the wind
    direction = -1 * (90 - direction);
    // Rotate the pin to the direction
    imgDirection.style.transform = "rotate(" + direction + "deg)";

    // Add the speed of the wind
    windSpeed.innerHTML = "Speed : " + speed + " meter/sec";
};

// Write the city of the user
function showCity(city) {
    locationCity.innerHTML = city;
};

function displayTime() {
    // Write the time and date
    var tempsEnMs = new Date(Date.now());

    // Time part
    timeDisplay.innerHTML =
        '<p class="DetailZone-Time--hour">' + toDouble(tempsEnMs.getHours()) + ":" + toDouble(tempsEnMs.getMinutes()) + ":" + toDouble(tempsEnMs.getSeconds()) + '</p>' // Format time
        +
        // Date part
        '<p class="DetailZone-Time--date">' + toDouble(tempsEnMs.getDate() + 1) + "/" + toDouble(tempsEnMs.getMonth()) + "/" + toDouble(tempsEnMs.getFullYear()) + '</p>'; // Format date
};

function adjustBackground(weather) {
    // function used to change the background screen
    switch (weather) {
        case "Rain":
            bodyPart.className = " body-rain";
            break;
        
        case "Clear":
        case "Sun":
            bodyPart.className = "body-sun";
            break;

        case 'Clouds':
            bodyPart.className = "body-cloud";
            break;

        case 'Snow':
            bodyPart.className = "body-snow";
            break;

        default:
            console.log('Default case');
            console.log('Error : No background defined for ', weather);
    }
};

function displayTemp(icon, description, temperature, extension) {
    tempDisplay.innerHTML = '<button onclick="changeTemp()" class="btn btn-default btn-lg">' +
        '<img src="http://openweathermap.org/img/w/' +
        icon + '.png" alt="weather of today ' +
        description + '" />' +
        Math.floor(temperature) + extension + '</button>' +
        '<p class="weather-descp">' + description + '</p>';
};

/!**
 *
 * @param {number} longitude
 * @param {number} latitude
 *!/
function getWeather(longitude, latitude) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            // Show position
            showCity(this.response.name);

            //Set temperature
            if (unit == "metric") {
                displayTemp(this.response.weather[0].icon, this.response.weather[0].description, this.response.main.temp, '°C')
            } else {
                displayTemp(this.response.weather[0].icon, this.response.weather[0].description, this.response.main.temp, '°F')
            }


            // Change background images
            adjustBackground(this.response.weather[0].main);

            // Show the direction of the Wind
            showWind(this.response.wind.deg, this.response.wind.speed);
        }

        meteoDiv[0].style.display = "block";
        console.log('Get location');
    };

    // Set the response type to JSON
    xhttp.responseType = "json";

    // Create the full url    
    url += "&lat=" + latitude +
        "&lon=" + longitude +
        "&units=" + unit;
    console.log(url);
    xhttp.open("GET", url, true);
    //Send the request
    xhttp.send();
};

function getLocation() {
    // Call the geolocation

    if (navigator.geolocation) {
        // Geolocation enabled        
        navigator.geolocation.getCurrentPosition(function(pos) {
            // Get latitude and longitude, in the pos object
            // items pos.coords.longitude and
            // pos.coords.latitude

            setLocalisation(pos);

            getWeather(local.longitude, local.latitude, units);
            // to get the weather
            setInterval(function() {
                console.log(local.latitude);
                getWeather(local.longitude, local.latitude, units);

            }, 7200000);
        })

    } else {
        alert("Geolocation is not supported by this browser.");
    }

};

// On click, we change the temperature unit
function changeTemp() {
    if (units == "metric") {
        units = "imperial"; // Farenheit
    } else {
        units = "metric"; // Degres
    }

    getWeather(local.longitude, local.latitude, units);
}

// Get the location
bodyPart.className = "body-night";
getLocation();

// Add time and date

setInterval(function () {
    displayTime();
}, 1000);
*/

/**
 *
 * @param {string} key
 */
let App = function (key) {
    this.#local = {}
    // Url to get data
    /**
     * @type {module:url.URL}
     */
    this.#url = new URL("http://api.openweathermap.org/data/2.5/weather?" + key)

    this.#units = "metric"; // var units = "Imperial";

    /**
     * body element
     * @type {ChildNode}
     */
    this.#bodyPart = bodyPart;
    this.#meteoDiv = meteoDiv;


    /**
     *
     * @param {Object} pos
     */
    this.setLocalisation = function (pos) {
        this.#local.longitude = pos.coords.longitude;
        this.#local.latitude = pos.coords.latitude;
    }
    /**
     *
     * @param {number} p_number
     * @returns {string}
     */
    this.toDouble = function (p_number) {
        // Add a 0 to get a number with two digits e.g. 6 -> 06 , 9 -> 09
        var numToDbl = "";

        if (p_number < 10) {
            numToDbl += "0" + p_number;
        } else {
            numToDbl += p_number;
        }
        return numToDbl;
    };

    /**
     * Show the wind direction and the speed
     *
     * @param {number} direction
     * @param {number} speed
     */
    this.showWind = function (direction, speed) {
        // Get the angle of the wind
        direction = -1 * (90 - direction);
        // Rotate the pin to the direction
        imgDirection.style.transform = "rotate(" + direction + "deg)";

        // Add the speed of the wind
        windSpeed.innerHTML = "Speed : " + speed + " meter/sec";
    };

    /**
     * Write the city of the user
     * @param {string} city
     */
    this.showCity = function (city) {
        this.#locationCity.innerHTML = city;
    };

    this.displayTime = function () {
        // Write the time and date
        var tempsEnMs = new Date(Date.now());

        // Time part
        this.#timeDisplay.innerHTML =
            '<p class="DetailZone-Time--hour">' + toDouble(tempsEnMs.getHours()) + ":" + toDouble(tempsEnMs.getMinutes()) + ":" + toDouble(tempsEnMs.getSeconds()) + '</p>' // Format time
            +
            // Date part
            '<p class="DetailZone-Time--date">' + toDouble(tempsEnMs.getDate() + 1) + "/" + toDouble(tempsEnMs.getMonth()) + "/" + toDouble(tempsEnMs.getFullYear()) + '</p>'; // Format date
    };
    /**
     *
     * @param {string} weather
     */
    this.adjustBackground = function (weather) {
        // function used to change the background screen
        switch (weather) {
            case "Rain":
                this.setBodyClassName("body-rain");
                break;

            case "Clear":
            case "Sun":
                this.setBodyClassName("body-sun");
                break;

            case 'Clouds':
                this.setBodyClassName("body-cloud");
                break;

            case 'Snow':
                this.setBodyClassName("body-snow");
                break;

            default:
                console.log('Default case');
                console.log('Error : No background defined for ', weather);
        }
    };
    /**
     *
     * @param {string} icon
     * @param {string} description
     * @param {string} temperature
     * @param {string} extension
     */
    this.displayTemp = function (icon, description, temperature, extension) {
        tempDisplay.innerHTML = '<button onclick="changeTemp()" class="btn btn-default btn-lg">' +
            '<img src="http://openweathermap.org/img/w/' +
            icon + '.png" alt="weather of today ' +
            description + '" />' +
            Math.floor(temperature) + extension + '</button>' +
            '<p class="weather-descp">' + description + '</p>';
    };

    this.getWeather = function () {
        var xhttp = new XMLHttpRequest();
        var that = this;

        var temp$ = new Promise((resolve, reject) => {
                // Set the response type to JSON
                xhttp.responseType = "json";

                // Create the full url
                this.#url.searchParam.set("lat", this.#latitude)
                this.#url.searchParam.set("lon", this.#longitude)
                this.#url.searchParam.set("unit", this.#unit)

                console.log(url.toString());
                xhttp.open("GET", this.#url.toString(), true);
                //Send the request
                xhttp.send();


                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        resolve(resolve)
                    }
                    reject();
                }
            }
        )
            .then((response) => {
                this.showCity(response.name)


                // Show position
                that.showCity(response.name);

                //Set temperature
                if (that.#unit === "metric") {
                    that.displayTemp(response.weather[0].icon, response.weather[0].description, response.main.temp, '°C')
                } else {
                    that.displayTemp(response.weather[0].icon, response.weather[0].description, response.main.temp, '°F')
                }


                // Change background images
                that.adjustBackground(response.weather[0].main);

                // Show the direction of the Wind
                that.showWind(response.wind.deg, response.wind.speed);

                that.#meteoDiv[0].style.display = "block";
                console.log('Get location');
            })
            .catch((err)=>{
                throw new Error(err.toString())
            })
    }


    this.getLocation = function () {
        // Call the geolocation

        if (navigator.geolocation) {
            new Promise((resolve, reject) => {
                    // Geolocation enabled
                if ('geolocation' in navigator) {
                    /* geolocation is available */
                    navigator.geolocation.getCurrentPosition(function (pos) {

                        resolve(pos)
                    })
                } else {
                    /* geolocation IS NOT available */
                    reject('geolocation IS NOT available ')
                }

                }
            )
                .then((pos) => {
                        // Get latitude and longitude, in the pos object
                        // items pos.coords.longitude and
                        // pos.coords.latitude

                        this.setLocalisation(pos);

                        this.getWeather();
                        // to get the weather
                        setInterval(function () {
                            console.log(local.latitude);
                            getWeather();

                        }, 7200000);
                    }
                )
        } else {
            throw new Error("Geolocation is not supported by this browser.");
        }
    };

// On click, we change the temperature unit
    this.changeTemp = function () {
        if (this.#units === "metric") {
            this.#units = "imperial"; // Farenheit
        } else {
            this.#units = "metric"; // Degres
        }

        getWeather(local.longitude, local.latitude);
    }
    /**
     *
     * @param {string} bodyNight
     */
    this.setBodyPartClass = function (bodyNight) {
        this.#bodyPart.className = "body-night";
    }

    /**
     *
     * @param {string} imgDirection
     * @param {string} windSpeed
     * @param {string} locationCity
     * @param {string} timeDisplay
     * @param {string} tempDisplay
     * @param {string} meteoDiv
     */
    this.init = function (imgDirection, windSpeed, locationCity, timeDisplay, tempDisplay, meteoDiv) {
        this.#imgDirection = this.getDocument(imgDirection)
        this.#winspeed = this.getDocument(windSpeed);
        this.#locationCity = this.getDocument(locationCity)
        this.#timeDisplay = this.getDocument(timeDisplay);
        this.#tempDisplay = this.getDocument(tempDisplay);
    }
    /**
     *
     * @param {string} el
     */
    this.getDocumentEl = function (el) {
        return document.getElementById(el);
    }
    /**
     *
     * @param {string} name
     */
    this.setBodyClassName = function (name) {
        this.#bodyClassName = name;
    }
};


// Liste of element of Html saved to improved change
// Image for direction
var imgDirection = document.getElementById("compassDirection");
// Display wind speed element
var windSpeed = document.getElementById("DetailZone-Wind--Speed");
// Display location display
var locationCity = document.getElementById('DetailZone-City--name');
// Time display location
var timeDisplay = document.getElementById("DetailZone-Time");
// Temperature display Location
var tempDisplay = document.getElementById("DetailZone-temp--temp");
// body element
var bodyPart = document.documentElement.childNodes[2];
// Main part
var meteoDiv = document.getElementsByClassName("meteo-div");

var app = new App("APPID=b26dd00efbc7410a76d9b6d4e9272b6c")

app.init("compassDirection", "DetailZone-Wind--Speed", 'DetailZone-City--name', "DetailZone-Time", "DetailZone-temp--temp", "meteo-div")

app.setBodyPartClass("body-night")
app.getLocation();

// Add time and date

setInterval(function () {
    app.displayTime();
}, 1000);
