'use strict';

// var app =(function(){

var meteoLive = {
    url: "http://api.openweathermap.org/data/2.5/weather?",
    appid: "&APPID=b26dd00efbc7410a76d9b6d4e9272b6c",
    error: ""
};

// Function to convert Kelvin to Farenheit
function convKtoF(temp) {
    return Math.floor(temp * 9 / 5 - 459.69);
};

// Function to convert Kelvin to Celsius
function convKtoC(temp) {
    return Math.floor(temp - 273.15);
};


function getLocation() {
    // Call the geolocation
    if (navigator.geolocation) {
        // Geolocation enabled 
        navigator.geolocation.getCurrentPosition(function (pos) {
            // Get latitude and longitude, in the pos object
            // items pos.coords.longitude and pos.coords.latitude            

            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    // document.getElementById("demo").innerHTML =
                    //     this.responseText;
                    // var result=this.responseText;            

                    // Show position
                    document.getElementById('DetailZone-City--name').innerHTML = this.response.name;

                    //Set temperature
                    document.getElementById("DetailZone-temp--temp").innerHTML = "<a>" +
                        '<img src="http://openweathermap.org/img/w/' +
                        this.response.weather[0].icon + '.png" alt="weather of today ' +
                        this.response.weather[0].description + '" />' +
                        Math.floor(this.response.main.temp) + "°C</a>" +
                        '<p class="weather-descp">' + this.response.weather[0].description + "</p>";

                    // Show weather
                    // var weather = document.getElementsByClassName("img-weather").style.display="none";

                    // document.getElementById("DetailZone-Sky").innerHTML =                  '<img src="http://openweathermap.org/img/w/' + 
                    // this.response.weather[0].icon +'.png" alt="weather of today ' 
                    // + this.response.weather[0].description +'" />';

                    switch (this.response.weather[0].main) {
                        case "Rain":
                            // document.getElementById("img-rain").style.display = "block";
                            // document.getElementById("weather-description").innerHTML = this.response.weather[0].description;
                            // document.getElementById("body").className += "body-rain";
                            document.documentElement.childNodes[2].className += " body-rain";
                            break;

                        case "Sun":
                            // document.getElementById("img-sun").style.display = "block";
                            // document.getElementById("weather-description").innerHTML = this.response.weather[0].description;
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
                    console.log(document.getElementsByClassName("img-weather"));

                    console.log(this.response.coord);

                    // Add time and date

                    setInterval(function () {
                        var tempsEnMs = new Date(Date.now());

                        document.getElementById("DetailZone-Time").innerHTML =
                            '<p>' + (tempsEnMs.getHours() + 1) + ":" + tempsEnMs.getMinutes() + ":" + tempsEnMs.getSeconds() + '</p>' // Format time
                            +
                            '<p>' + (tempsEnMs.getDate() + 1) + "/" + tempsEnMs.getMonth() + "/" + tempsEnMs.getFullYear() + '</p>'; // Format date
                    }, 120);

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
        error += "Geolocation is not supported by this browser.";
    }

};



getLocation();