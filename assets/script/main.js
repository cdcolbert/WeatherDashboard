$(document).ready(function () {

    $(document).keypress(
        function (event) {
            if (event.which == '13') {
                event.preventDefault();
            }
        }
    );

    var m = moment();
    var APIKey = "0e2f3942b1340702e25cff81cbc9b35c";
    var city = $("#search").val();


    if (localStorage.getItem("Cities") === null) {
        var cities = [];
        var oldCities = [];
        localStorage.setItem("Cities", JSON.stringify(cities, oldCities));

    } else {
        var oldCities = JSON.parse(localStorage.getItem("Cities"));
        oldCities.forEach(city => {
            var newBtn = $(`<button type="button" class="btn btn-primary cityButtons"></button>`);
            newBtn.text(city);
            newBtn.appendTo(cityBtns);
        })

    }


    $("#searchBtn").on("click", function () {

        var searchInput = $("#search").val();
        var newBtn = $(`<button type="button" class="btn btn-primary cityButtons" id=${searchInput}></button>`);

        newBtn.text(searchInput);
        newBtn.appendTo(cityBtns);

        var cities = [];
        var oldCities = JSON.parse(localStorage.getItem("Cities"));

        console.log(cities);

        cities.push(searchInput);
        localStorage.setItem("Cities", JSON.stringify([...oldCities, ...cities]));

        city = $("#search").val();
        generateInfo();

    });

    $(document).on("click", ".cityButtons", function (e) {
        city = $(this).text();
        generateInfo();
    });


    function generateInfo() {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
                       
            $("#todaysDate").html(moment().format('LL'));

            var iconID = response.weather[0].icon;
            $('#icon').attr("src", "http://openweathermap.org/img/wn/" + iconID + "@2x.png");
            $("#cityName").text(response.name);
            var tempF = ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2);
            $("#temp").text("Temperature: " + tempF + "°F");
            var wind = ((response.wind.speed * 2.236936).toFixed(1));
            $("#windSpeed").text("Wind Speed: " + wind + "mph");
            $("#humidity").text("Humidity: " + response.main.humidity + "%");

            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + APIKey;
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                $('#uvDiv').css("display", "flex");
                $("#uvIndex").text(response.value);
                if (response.value <= 2) {
                    $('#uvIndex').css("background-color", "#00ff40");
                    $('#uvIndex').css("color", "black");
                } else if (response.value > 2 && response.value <= 5) {
                    $('#uvIndex').css("background-color", "#fffb00");
                    $('#uvIndex').css("color", "black");
                } else if (response.value > 5 && response.value <= 7) {
                    $('#uvIndex').css("background-color", "#ff9100");
                    $('#uvIndex').css("color", "black");
                } else if (response.value > 7 && response.value <= 10) {
                    $('#uvIndex').css("background-color", "#ff0000");
                    $('#uvIndex').css("color", "#ffffff");
                } else {
                    $('#uvIndex').css("background-color", "#ee00ff");
                    $('#uvIndex').css("color", "#ffffff");
                }
            });

            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + response.name + "&appid=" + APIKey;
            $.ajax({
                url: forecastURL,
                method: "GET"
            }).then(function (response) {
                

            });
        });
    }

});