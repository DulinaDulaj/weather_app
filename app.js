/*fetch(" https://restcountries.com/v3.1/all")
.then(res =>res.json())
.then(data =>{
    let tblCountry=document.getElementById("tblCountry");
    
    let tblBody=`<tr>
                    <th>Country Name</th>
                    <th>Flag</th>
                 </tr>`;
    
    data.forEach(element => {
        tblBody+=`<tr>
                     <td>${element.name.common}</td>
                     <td>${element.flag}</td>
                  </tr>`
    });
    tblCountry.innerHTML=tblBody;
})*/

/*function searchCountry(){
    let search=document.getElementById("txtSeaarch").value
    fetch(`https://restcountries.com/v3.1/name/${search}`)
    .then(res => res.json())
    .then(data=>{
        data.forEach(element => {
            document.getElementById("name").innerHTML=element.name.official
            document.getElementById("img").innerHTML=`<img src="${element.flags.png}" alt="">`
          

        });
    })
}
findLocation();

document.getElementById("map").innerHTML = <div id="googleMap" style="width:100%;height:800px;"></div>;*/

function findWeather() {
    let txtsearch = document.getElementById("search-bar").value
    fetch(`http://api.weatherapi.com/v1/current.json?key=ed07cfd651c0443d826163606240909&q=${txtsearch}&aqi=no`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("location").innerHTML = data.location.name
            document.getElementById("locationdis").innerHTML = data.location.region + "," + data.location.country + "."
            document.getElementById("weathericon").innerHTML = `<img src="${data.current.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("temp").innerHTML = data.current.temp_c + "°C"
            document.getElementById("description1").innerHTML = data.current.condition.text
            document.getElementById("description2").innerHTML = "Humidity " + data.current.humidity + "%"
            document.getElementById("description3").innerHTML = "Wind Speed " + data.current.wind_mph + "mph/" + data.current.wind_kph + "kph"
            map.setView([data.location.lat, data.location.lon], 13);

            // Add a marker at the user's location
             L.marker([data.location.lat, data.location.lon]).addTo(map)
            .bindPopup(data.location.name)
            .openPopup();
            getLocationName(data.location.lat,data.location.lon);
        })
    forecast();
}

function forecast() {
    let txtsearch = document.getElementById("search-bar").value
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=ed07cfd651c0443d826163606240909&q=${txtsearch}&days=9&aqi=no`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("dateforecast1").innerHTML = data.forecast.forecastday[1].date
            document.getElementById("iconforecast1").innerHTML = `<img src="${data.forecast.forecastday[1].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast1").innerHTML = data.forecast.forecastday[1].day.mintemp_c + "-" + data.forecast.forecastday[1].day.maxtemp_c + "°C"

            document.getElementById("dateforecast2").innerHTML = data.forecast.forecastday[2].date
            document.getElementById("iconforecast2").innerHTML = `<img src="${data.forecast.forecastday[2].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast2").innerHTML = data.forecast.forecastday[2].day.mintemp_c + "-" + data.forecast.forecastday[2].day.maxtemp_c + "°C"

            document.getElementById("dateforecast3").innerHTML = data.forecast.forecastday[3].date
            document.getElementById("iconforecast3").innerHTML = `<img src="${data.forecast.forecastday[3].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast3").innerHTML = data.forecast.forecastday[3].day.mintemp_c + "-" + data.forecast.forecastday[3].day.maxtemp_c + "°C"

            document.getElementById("dateforecast4").innerHTML = data.forecast.forecastday[4].date
            document.getElementById("iconforecast4").innerHTML = `<img src="${data.forecast.forecastday[4].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast4").innerHTML = data.forecast.forecastday[4].day.mintemp_c + "-" + data.forecast.forecastday[4].day.maxtemp_c + "°C"

            document.getElementById("dateforecast5").innerHTML = data.forecast.forecastday[5].date
            document.getElementById("iconforecast5").innerHTML = `<img src="${data.forecast.forecastday[5].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast5").innerHTML = data.forecast.forecastday[5].day.mintemp_c + "-" + data.forecast.forecastday[5].day.maxtemp_c + "°C"

            document.getElementById("dateforecast6").innerHTML = data.forecast.forecastday[6].date
            document.getElementById("iconforecast6").innerHTML = `<img src="${data.forecast.forecastday[6].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast6").innerHTML = data.forecast.forecastday[6].day.mintemp_c + "-" + data.forecast.forecastday[6].day.maxtemp_c + "°C"

            document.getElementById("dateforecast7").innerHTML = data.forecast.forecastday[7].date
            document.getElementById("iconforecast7").innerHTML = `<img src="${data.forecast.forecastday[7].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast7").innerHTML = data.forecast.forecastday[7].day.mintemp_c + "-" + data.forecast.forecastday[7].day.maxtemp_c + "°C"

            document.getElementById("dateforecast8").innerHTML = data.forecast.forecastday[8].date
            document.getElementById("iconforecast8").innerHTML = `<img src="${data.forecast.forecastday[8].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast8").innerHTML = data.forecast.forecastday[8].day.mintemp_c + "-" + data.forecast.forecastday[8].day.maxtemp_c + "°C"
        })

}

const map = L.map('map').setView([0, 0], 2); // Start with zoomed-out map

// Add the OpenStreetMap tiles layer (the map imagery)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Check if geolocation is available
if (navigator.geolocation) {
    // Request the user's location
   window.onload= navigator.geolocation.getCurrentPosition(showPositionAuto, showError);
   

} else {
    document.getElementById("location-details").textContent = "Geolocation is not supported by this browser.";
}

// Function to display user's location on the map
function showPositionAuto(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // Set the view to the user's location with a suitable zoom level
    map.setView([lat, lon], 13);

    // Add a marker at the user's location
    L.marker([lat, lon]).addTo(map)
        .bindPopup("You are here!")
        .openPopup();

    // Fetch location name using reverse geocoding from Nominatim
    getLocationName(lat, lon);
}

// Function to get location name using Nominatim API
function getLocationName(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const locationDetails = data.address;
            let locationName = '';

            // Construct location name (you can adjust this as needed)
            if (locationDetails.city) {
                locationName += locationDetails.city;
                window.onload = findWeatherAuto(locationName)
                window.onload = forecastAuto(locationName)
                locationName += ','
            }
            if (locationDetails.state) {
                locationName += locationDetails.state + ', ';
            }
            if (locationDetails.country) {
                locationName += locationDetails.country;
            }

            // Show location name on the page
            document.getElementById("location-details").textContent = "Location: " + locationName;
        })
        .catch(error => {
            document.getElementById("location-details").textContent = "Unable to retrieve location name.";
        });
}

// Handle possible errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location-details").textContent = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location-details").textContent = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("location-details").textContent = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location-details").textContent = "An unknown error occurred.";
            break;
    }
}




function findWeatherAuto(locationName) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=ed07cfd651c0443d826163606240909&q=${locationName}&aqi=no`)
        .then(res => res.json())
        .then(data => {

            document.getElementById("location").innerHTML = data.location.name
            document.getElementById("locationdis").innerHTML = data.location.region + "," + data.location.country + "."
            document.getElementById("weathericon").innerHTML = `<img src="${data.current.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("temp").innerHTML = data.current.temp_c + "°C"
            document.getElementById("description1").innerHTML = data.current.condition.text
            document.getElementById("description2").innerHTML = "Humidity " + data.current.humidity + "%"
            document.getElementById("description3").innerHTML = "Wind Speed " + data.current.wind_mph + "mph/" + data.current.wind_kph + "kph"




        })

}

function forecastAuto(locationName) {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=ed07cfd651c0443d826163606240909&q=${locationName}&days=9&aqi=no`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("dateforecast1").innerHTML = data.forecast.forecastday[1].date
            document.getElementById("iconforecast1").innerHTML = `<img src="${data.forecast.forecastday[1].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast1").innerHTML = data.forecast.forecastday[1].day.mintemp_c + "-" + data.forecast.forecastday[1].day.maxtemp_c + "°C"

            document.getElementById("dateforecast2").innerHTML = data.forecast.forecastday[2].date
            document.getElementById("iconforecast2").innerHTML = `<img src="${data.forecast.forecastday[2].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast2").innerHTML = data.forecast.forecastday[2].day.mintemp_c + "-" + data.forecast.forecastday[2].day.maxtemp_c + "°C"

            document.getElementById("dateforecast3").innerHTML = data.forecast.forecastday[3].date
            document.getElementById("iconforecast3").innerHTML = `<img src="${data.forecast.forecastday[3].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast3").innerHTML = data.forecast.forecastday[3].day.mintemp_c + "-" + data.forecast.forecastday[3].day.maxtemp_c + "°C"

            document.getElementById("dateforecast4").innerHTML = data.forecast.forecastday[4].date
            document.getElementById("iconforecast4").innerHTML = `<img src="${data.forecast.forecastday[4].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast4").innerHTML = data.forecast.forecastday[4].day.mintemp_c + "-" + data.forecast.forecastday[4].day.maxtemp_c + "°C"

            document.getElementById("dateforecast5").innerHTML = data.forecast.forecastday[5].date
            document.getElementById("iconforecast5").innerHTML = `<img src="${data.forecast.forecastday[5].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast5").innerHTML = data.forecast.forecastday[5].day.mintemp_c + "-" + data.forecast.forecastday[5].day.maxtemp_c + "°C"

            document.getElementById("dateforecast6").innerHTML = data.forecast.forecastday[6].date
            document.getElementById("iconforecast6").innerHTML = `<img src="${data.forecast.forecastday[6].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast6").innerHTML = data.forecast.forecastday[6].day.mintemp_c + "-" + data.forecast.forecastday[6].day.maxtemp_c + "°C"

            document.getElementById("dateforecast7").innerHTML = data.forecast.forecastday[7].date
            document.getElementById("iconforecast7").innerHTML = `<img src="${data.forecast.forecastday[7].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast7").innerHTML = data.forecast.forecastday[7].day.mintemp_c + "-" + data.forecast.forecastday[7].day.maxtemp_c + "°C"

            document.getElementById("dateforecast8").innerHTML = data.forecast.forecastday[8].date
            document.getElementById("iconforecast8").innerHTML = `<img src="${data.forecast.forecastday[8].day.condition.icon}" alt="" width="70px" height="70px">`
            document.getElementById("tempforecast8").innerHTML = data.forecast.forecastday[8].day.mintemp_c + "-" + data.forecast.forecastday[8].day.maxtemp_c + "°C"
        })

}