'use strict';

// Global variable
var local = {};

// Url to get data
var url = "https://api.openweathermap.org/data/2.5/weather?APPID=b26dd00efbc7410a76d9b6d4e9272b6c";

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
// body element
var bodyPart = document.documentElement.childNodes[2];
// Main part
var meteoDiv = document.getElementsByClassName("meteo-div");

// Function to store the location
function setLocalisation(pos) {
    local.longitude = pos.coords.longitude;
    local.latitude = pos.coords.latitude;
}

function toDouble(p_number) {
    // Add a 0 to get a number with two digits e.g. 6 -> 06 , 9 -> 09
    var numToDbl = "";

    if (p_number < 10) {
        numToDbl += "0" + p_number;
    } else {
        numToDbl += p_number;
    }

    return numToDbl;
}

// Show the wind direction and the speed
function showWind(direction, speed) {
    // Get the angle of the wind
    direction = -1 * (90 - direction);
    // Rotate the pin to the direction
    imgDirection.style.transform = "rotate(" + direction + "deg)";

    // Add the speed of the wind
    windSpeed.innerHTML = "Speed : " + speed + " meter/sec";
}

// Write the city of the user
function showCity(city) {
    locationCity.innerHTML = city;
}

function displayTime() {
    // Write the time and date
    var tempsEnMs = new Date(Date.now());

    // Time part
    timeDisplay.innerHTML =
        '<p class="DetailZone-Time--hour">' + toDouble(tempsEnMs.getHours()) + ":" + toDouble(tempsEnMs.getMinutes()) + ":" + toDouble(tempsEnMs.getSeconds()) + '</p>' // Format time
        +
        // Date part
        '<p class="DetailZone-Time--date">' + toDouble(tempsEnMs.getDate() + 1) + "/" + toDouble(tempsEnMs.getMonth()) + "/" + toDouble(tempsEnMs.getFullYear()) + '</p>'; // Format date
}

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
}

function displayTemp(icon, description, temperature, extension) {
    tempDisplay.innerHTML = '<button onclick="changeTemp()" class="btn btn-default btn-lg">' +
        '<img src="http://openweathermap.org/img/w/' +
        icon + '.png" alt="weather of today ' +
        description + '" />' +
        Math.floor(temperature) + extension + '</button>' +
        '<p class="weather-descp">' + description + '</p>';
}


function getWeather(longitude, latitude, unit) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {

            // Show position
            showCity(this.response.name);

            //Set temperature
            if (unit === "metric") {
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
}

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

}

// On click, we change the temperature unit
function changeTemp() {
    if (units === "metric") {
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

setInterval(function() {
    displayTime();
}, 1000);