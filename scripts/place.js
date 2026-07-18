document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const calculateWindChill = (temp, windSpeed) => 
    (13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16)).toFixed(1);

document.addEventListener("DOMContentLoaded", () => {
    const tempElement = document.getElementById("temp");
    const windElement = document.getElementById("wind");
    const windChillOutput = document.getElementById("windchill");

    const temperature = parseFloat(tempElement.textContent);
    const windSpeed = parseFloat(windElement.textContent);

    if (temperature <= 10 && windSpeed > 4.8) {
        windChillOutput.textContent = `${calculateWindChill(temperature, windSpeed)} °C`;
    } else {
        windChillOutput.textContent = "N/A";
    }
});