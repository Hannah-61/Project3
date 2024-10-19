import { map } from "./map.js"
let geojson;

// fetch the temperature change data based on the selected season and year
export function fetchTemperatureData(season, year) {
    fetch(
        `http://127.0.0.1:5000//api/data/all-countries?season=${season}&year=${year}`
    ).then((response) => {
        console.log('rsss: ', response);
        return response.json();
    })
        .then((data) => {
            console.log('our data: ', data)
            // filter the data for the selected year
            const filteredData = data.map((countryData) => {
                return {
                    ...countryData,
                    temperatureChange: countryData[`Y${year}`]
                }
            })
            updateMapWithTemperture(filteredData)

        }).catch((error)=>{
            console.log("Error fetching the temperature data: ", error);
        })
}

fetchTemperatureData("DecJanFeb", 1961);

fetch("https://raw.githubusercontent.com/johan/world.geo.json/refs/heads/master/countries.geo.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("network error: ", response.statusText)
        }
        return response.json()
    }).then((geojsonData) => {
        // console.log('our geojson: ', geojsonData)
        geojson = L.geoJSON(geojsonData, {
            // style: styleCountry,
            // onEachFeature
        }).addTo(map)
    })


// get each country
// style that country on map
function updateMapWithTemperture(data) {
    geojson.eachLayer((layer) => {
        const countryName = layer.feature.properties.name;
        const countryData = data.find((index) => index.Area === countryName);
        if (countryData) {
            layer.setStyle({
                fillColor: getColorForTemperatur(countryData.temperatureChange),
                fillOpacity: 0.7,
                weight: 2,
            })
        }
    })
}

// colors for cool temperature: <-1.5 , between >=-1.5, and <=-1.0,  between >-1.0 and 0.0
// colors for the hot temperature: >=0, between 0 and 1.0, between 1.0 and 1.5, >1.5

export function getColorForTemperatur(temperature) {
    let color;

    if (temperature < -1.5) {
        color = 'blue'; // Color for cool temperature: <-1.5
    } else if (temperature >= -1.5 && temperature <= -1.0) {
        color = 'lightblue'; // Color for cool temperature: >=-1.5 and <=-1.0
    } else if (temperature > -1.0 && temperature < 0.0) {
        color = 'cyan'; // Color for cool temperature: >-1.0 and <0.0
    } else if (temperature >= 0 && temperature < 1.0) {
        color = 'yellow'; // Color for hot temperature: >=0 and <1.0
    } else if (temperature >= 1.0 && temperature < 1.5) {
        color = 'orange'; // Color for hot temperature: >=1.0 and <1.5
    } else if (temperature > 1.5) {
        color = 'red'; // Color for hot temperature: >1.5
    } else {
        color = 'gray'; // Default color for any unexpected cases
    }

    return color;
}