import { map } from "./map.js";
import { fetchTemperatureData, getColorForTemperatur } from "./allCountriesTemperature.js";

const seasonSelector = document.getElementById("seasonSelector")
const yearSelector = document.getElementById("yearSelector")

// add the years into year selector dynamically
const years = Array.from(
    { length: 2019 - 1961+1 },
    (x, y) => 1961 + y
)

years.forEach((year)=>{
    const option = document.createElement("option")
    option.value = year;
    option.textContent = year;
    yearSelector.appendChild(option)
})

// event listener for the season selector
seasonSelector.addEventListener("change", ()=>{
    const selectedSeason = seasonSelector.value;
    const selectedYear = yearSelector.value;
    console.log('selectedseon; seletedyear; ', selectedSeason, selectedYear)
    fetchTemperatureData(selectedSeason, selectedYear);
})

// event listener for the year selector
yearSelector.addEventListener("change", ()=>{
    const selectedSeason = seasonSelector.value;
    const selectedYear = yearSelector.value;
    console.log('selectedseon; seletedyear; ', selectedSeason, selectedYear)
    fetchTemperatureData(selectedSeason, selectedYear);
})

// legend for the temperature information
function createTemperatureInfoLegend(map) {
    // creating legend
    let legend = L.control({ position: 'bottomright' });
    
    // add a legend bar/tag that would represent the legend
    legend.onAdd = function (map) {
        let div = L.DomUtil.create('div', 'info_legend');

        // add some styles
        div.style.padding = "10px";
        div.style.background = "rgba(255, 255, 255, 0.8)";
        div.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.2)";
        div.style.borderRadius = "8px";
        div.style.fontSize = "14px";
        div.style.color = "#333";

        // Define temperature ranges and their corresponding labels
        const tempRanges = [
            { min: -Infinity, max: -1.5, label: "Below -1.5", color: getColorForTemperatur(-2.5) },
            { min: -1.5, max: -1.0, label: "-1.5 to -1.0", color: getColorForTemperatur(-1.5) },
            { min: -1.0, max: 0.0, label: "-1.0 to 0.0", color: getColorForTemperatur(-0.7) },
            { min: 0.0, max: 1.0, label: "0.0 to 1.0", color: getColorForTemperatur(0.0) },
            { min: 1.0, max: 1.5, label: "1.0 to 1.5", color: getColorForTemperatur(1.0) },
            { min: 1.5, max: Infinity, label: "Above 1.5", color: getColorForTemperatur(2.5) },
            { min: 1.5, max: Infinity, label: "None", color: getColorForTemperatur(NaN) }
        ];

        // Build the legend items
        const labels = tempRanges.map(range => `
            <div style="display: flex; align-items: center; margin-bottom: 6px;">
                <i style="background: ${range.color}; width: 20px; height: 20px; display: inline-block; margin-right: 10px; border-radius: 3px; border: 1px solid #ccc;"></i>
                <span>${range.label}</span>
            </div>
        `).join("");

        // title for the legend
        const title = `<strong style="margin-bottom: 10px; display: block;">Temperature Range (°C)</strong>`;
        div.innerHTML = title + labels;
        
        return div;
    };

    legend.addTo(map);
}

createTemperatureInfoLegend(map);
