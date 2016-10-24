'use strict';

// Function to convert Kelvin to Farenheit
function convKtoF(temp) {
    return Math.floor(temp * 9 / 5 - 459.69);
};

// Function to convert Kelvin to Celsius
function convKtoC(temp) {
    return Math.floor(temp - 273.15);
}

function toDouble(p_number) {
    var numToDbl = "";

    if (p_number < 10) {
        numToDbl += "0" + p_number;
    } else {
        numToDbl += p_number;
    }

    return numToDbl;
}

function showWind(direction) {
    direction = -1 * (90 - direction);
    var img = document.getElementById("compassDirection");

    img.style.transform = "rotate(" + direction + "deg)";
}

function getLocation() {
    // Call the geolocation
    if (navigator.geolocation) {
        // Geolocation enabled
        navigator.geolocation.getCurrentPosition(function(pos) {
            // Get latitude and longitude, in the pos object
            // items pos.coords.longitude and
            // pos.coords.latitude

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                   
                    // Show position
                    document.getElementById('DetailZone-City--name').innerHTML = this.response.name;

                    //Set temperature
                    document.getElementById("DetailZone-temp--temp").innerHTML = "<a>" +
                        '<img src="http://openweathermap.org/img/w/' +
                        this.response.weather[0].icon + '.png" alt="weather of today ' +
                        this.response.weather[0].description + '" />' +
                        Math.floor(this.response.main.temp) + "°C</a>" +
                        '<p class="weather-descp">' + this.response.weather[0].description + "</p>";

                    switch (this.response.weather[0].main) {
                        case "Rain":
                            document.documentElement.childNodes[2].className += " body-rain";
                            break;

                        case "Sun":
                            document.documentElement.childNodes[2].className += "body-sun";
                            break;

                        case 'Cloud':
                            document.documentElement.childNodes[2].className += "body-cloud";
                            break;

                        case 'Snow':
                            document.documentElement.childNodes[2].className += "body-snow";
                            break;

                        default:
                            console.log('Default');
                    }

                    // Add time and date

                    setInterval(function() {
                        var tempsEnMs = new Date(Date.now());



                        document.getElementById("DetailZone-Time").innerHTML =
                            '<p class="DetailZone-Time--hour">' + toDouble(tempsEnMs.getHours()) + ":" + toDouble(tempsEnMs.getMinutes()) + ":" + toDouble(tempsEnMs.getSeconds()) + '</p>' // Format time
                            +
                            '<p class="DetailZone-Time--date">' + toDouble(tempsEnMs.getDate() + 1) + "/" + toDouble(tempsEnMs.getMonth()) + "/" + toDouble(tempsEnMs.getFullYear()) + '</p>'; // Format date
                    }, 120);
                    console.log(this.response.wind.deg)
                    showWind(this.response.wind.deg);

                }
            };

            // Set the response type to JSON
            xhttp.responseType = "json";

            // Create the full url
            var url = "http://api.openweathermap.org/data/2.5/weather?" +
                "lat=" + pos.coords.latitude +
                "&lon=" + pos.coords.longitude +
                "&APPID=b26dd00efbc7410a76d9b6d4e9272b6c" +
                "&units=metric";

            xhttp.open("GET", url, true);
            //Send the request
            xhttp.send();

        });

    } else {
        alert("Geolocation is not supported by this browser.");
    }

};


getLocation();