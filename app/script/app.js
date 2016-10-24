'use strict';

// Global variable
var local = {};

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

// Function to store the location
function setLocalisation(pos) {
    local.longitude = pos.coords.longitude;
    local.latitude = pos.coords.latitude;
};

function toDouble(p_number) {
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

// Write the position of the user
function showCity(city) {
    locationCity.innerHTML = city;
};

function displayTime() {
    var tempsEnMs = new Date(Date.now());

    // Time part
    timeDisplay.innerHTML =
        '<p class="DetailZone-Time--hour">' + toDouble(tempsEnMs.getHours()) + ":" + toDouble(tempsEnMs.getMinutes()) + ":" + toDouble(tempsEnMs.getSeconds()) + '</p>' // Format time
        +
        // Date part
        '<p class="DetailZone-Time--date">' + toDouble(tempsEnMs.getDate() + 1) + "/" + toDouble(tempsEnMs.getMonth()) + "/" + toDouble(tempsEnMs.getFullYear()) + '</p>'; // Format date
};

function adjustBackground(weather) {
    switch (weather) {
        case "Rain":
            bodyPart.className += " body-rain";
            break;

        case "Sun":
            bodyPart.className += "body-sun";
            break;

        case 'Cloud':
            bodyPart.className += "body-cloud";
            break;

        case 'Snow':
            bodyPart.className += "body-snow";
            break;

        default:
            console.log('Default');
    }
};

function displayTemp(icon, description, temperature) {
    tempDisplay.innerHTML = "<a>" +
        '<img src="http://openweathermap.org/img/w/' +
        icon + '.png" alt="weather of today ' +
        description + '" />' +
        Math.floor(temperature) + "°C</a>" +
        '<p class="weather-descp">' + description + "</p>";
};


function getWeather(longitude, latitude, unit) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            // Show position
            showCity(this.response.name);

            //Set temperature
            displayTemp(this.response.weather[0].icon, this.response.weather[0].description, this.response.main.temp)

            // Change background images
            adjustBackground(this.response.weather[0].main);

            // Show the direction of the Wind
            showWind(this.response.wind.deg, this.response.wind.speed);
        }
    };

    // Set the response type to JSON
    xhttp.responseType = "json";

    // Create the full url
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
        "lat=" + latitude +
        "&lon=" + longitude +
        "&APPID=b26dd00efbc7410a76d9b6d4e9272b6c" +
        "&units=" + unit;

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

            getWeather(local.longitude, local.latitude, "metric");
            // to get the weather
            setInterval(function() {
                console.log(local.latitude);
                getWeather(local.longitude, local.latitude, "metric");

            }, 300000);
        })

    } else {
        alert("Geolocation is not supported by this browser.");
    }

};

// Get the location
getLocation();


// Add time and date

setInterval(function() {
    displayTime();
}, 1000);