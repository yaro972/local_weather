"use strict";


    // When document is loaded
    $('document').ready(function () {
        var TempUnit = false, // Default : fahrenheit
                ConvTemp = 0, // converted temperature,
                h = 0, // Windows height
                footerH = 0, // Footer height
                backlist = {
                    rain: 'images/rain.jpg',
                    sun: 'images/sun.jpeg',
                    cloud: 'images/cloud.jpeg',
                    snow: 'images/snow.jpeg'
                }; // List of background images

// Functions
        var temp = 200,
                Unit = " °F", // Unit
                weather = 'sun'; // Weather of the day; //Initial temperature

// Set the background image
        function changeBackground(bElement, bUrl) {
            return bElement.style.backgroundImage = "url(" + bUrl + ")";
        }

// Function to convert Kelvin to Celsius
        var convKtoC = function (temp) {
            return Math.floor(temp - 273.15);
        };

// Function to convert Kelvin to Farenheit
        var convKtoF = function (temp) {
            return Math.floor(temp * 9 / 5 - 459.69);
        };

// Geolocalisation options
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

// Geolocalisation options
        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

//Function called when geolocalisation is activated
        function success(pos) {
            var crd = pos.coords,
                    url = "http://api.openweathermap.org/data/2.5/weather?",
                    result = "";

            url += "lat=" + crd.latitude + "&lon=" + crd.longitude + "&APPID=b26dd00efbc7410a76d9b6d4e9272b6c";

            $.getJSON(url, function (json) {
                var direct = "";

                $("#DetailZone-City").html(json.name);

                temp = Math.floor(json.main.temp);
                // Default : Farhenheit temperature
                ConvTemp = convKtoF(temp); // Convert to Farhenheit
                $('#ChUnit').text(ConvTemp + Unit); // Write the temperature

                $("#DetailZone-Sky").html(json.weather[0].description);

                if (json.wind.deg === 0) {
                    direct = "N";
                } else if (json.wind.deg > 0 || json.wind.deg < 90) {
                    direct = "NE";
                } else if (json.wind.deg === 90) {
                    direct = "E";
                } else if (json.wind.deg > 90 || json.wind.deg < 180) {
                    direct = "SE";
                } else if (json.wind.deg === 180) {
                    direct = "S";
                } else if (json.wind.deg > 180 || json.wind.deg < 270) {
                    direct = "SW";
                } else if (json.wind.deg > 270) {
                    direct = "W";
                } else if (json.wind.deg > 270 || json.wind.deg < 360) {
                    direct = "NW";
                }
                ;
                direct += " " + json.wind.speed + " m/s";
                $("#DetailZone-Wind").html(direct);

                weather = json.weather[0].main.toLowerCase();

            });
        };

//Function called when geolocalisation is not allowed
        function error(err) {
            console.warn('ERROR(' + err.code + '): ' + err.message);
        }
        ;

// Set icon of weather
        function WeatIcon(weather) {
            switch (weather) {
                case 'rain':
                    $('#iconWeat').css('background-image', 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Gnome-weather-showers.svg/48px-Gnome-weather-showers.svg.png)');
                    $('#iconWeat').css('background-repeat', 'no-repeat');
                    break;
                case 'sun':
                    $('#iconWeat').css('background-image', 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Emojione_2600.svg/64px-Emojione_2600.svg.png)');
                    $('#iconWeat').css('background-repeat', 'no-repeat');
                    break;
                case 'cloud':
                    $('#iconWeat').css('background-image', 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Gnome-weather-few-clouds.svg/48px-Gnome-weather-few-clouds.svg.png)');
                    $('#iconWeat').css('background-repeat', 'no-repeat');
                    break;
                case 'snow':
                    $('#iconWeat').css('background-image', 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Emojione_2744.svg/64px-Emojione_2744.svg.png)');
                    $('#iconWeat').css('background-repeat', 'no-repeat');
                    break;
                default:
                    break;
            }
        }


        // Call the geolocolisation.
        navigator.geolocation.getCurrentPosition(success, error, options);

        // Ajust Background Image
        changeBackground(document.body, backlist[weather]);
        WeatIcon(weather); // And Icon

        // First load
        TempUnit = true; // Active unit = F
        Unit = " °F";
        ConvTemp = convKtoF(temp);
        $(this).text(ConvTemp + Unit);


        // On click, change Unit
        $('.ChangeUnit').click(function () {
            if (TempUnit) {
                // Unit = fahrenheit
                TempUnit = false;
                Unit = " °F";
                ConvTemp = convKtoF(temp);
                $(this).text(ConvTemp + Unit);

            } else if (!TempUnit) {
                // Unit = Celsius
                TempUnit = true;
                Unit = " °C";
                ConvTemp = convKtoC(temp);
                $(this).text(ConvTemp + Unit);
            }
            ;
        });

        //Position footer
        h = window.innerHeight;
        footerH = document.getElementById('footer').offsetHeight;
        $('footer').css('top', h - footerH);
    });
