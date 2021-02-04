# WeatherDashboard
# Project Name
> Weather Dashboard

## Table of contents
* [General info](#general-info)
* [Screenshots](#screenshots)
* [Features](#features)
* [Status](#status)
* [Contact](#contact)

## General info
This project is an application that takes the user's input about a locatoin and generates teh current weather and the weather forecast for the next 5 days.  It also displays the UV index for that requested city.  The previous 10 weather searches are stored locally and can be retrieved by clicking the corresponding button displayed on the page.

## Code Examples
Examples of usage:
`$("#searchBtn").on("click", function () {

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
    }); `

## Features
List of features ready and TODOs for future development
* Landing page
* Styling

TODO:
* Fetch weather information
* Display weather information
* Display 5 day forecast

## Status
Release 1.0

Project is: _unfinished_ Project was designed as a homework assignment for a boot camp class.  This is the submission for the assignment.

## Contact
Created by [Corey Colbert](cdcolbert10@gmail.com) - feel free to contact me!