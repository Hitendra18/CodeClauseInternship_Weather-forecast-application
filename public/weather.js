const apiKey = "686bbdb894f0b3fc5006cd29d3b6a86c";

console.log(apiKey);
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiUrl2 =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const dateObject = (sec) => {
  const milliseconds = sec * 1000;
  const dateObject = new Date(milliseconds);

  return dateObject;
};
const inTwoDigits = (num) => {
  if (num < 10) {
    const ans = "0" + num;
    return ans;
  } else {
    return num;
  }
};
const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = inTwoDigits(hours) + ":" + minutes + " " + ampm;
  return strTime;
};

let isDataDisplayed = false;

const currentWeather = (city = "delhi") => {
  fetch(apiUrl + city + `&appid=${apiKey}`)
    .then((response) => response.json())
    .then((res) => {
      console.log(res);

      // const todayObj = dateObject(res.dt);
      // dateEl.textContent =
      //   inTwoDigits(todayObj.toLocaleString("en-US", { day: "numeric" })) +
      //   ", " +
      //   todayObj.toLocaleString("en-US", { month: "short" }) +
      //   " " +
      //   todayObj.toLocaleString("en-US", { hour: "numeric" });
      errorMessageEl.classList.add("hide");

      const clock = () => {
        const todayObj = new Date();
        dateEl.textContent =
          inTwoDigits(todayObj.toLocaleString("en-US", { day: "numeric" })) +
          "," +
          todayObj.toLocaleString("en-US", { month: "short" }) +
          " " +
          formatAMPM(todayObj);
      };

      setInterval(() => {
        clock();
      }, 1000);
      currentTempEl.textContent = Math.round(res.main.temp);
      cityEl.innerHTML = `${res.name}<div id="#country"></div>`;
      countryEl.textContent = res.sys.country;
      currentStatusEl.textContent = res.weather[0].description;
      currentFeelsLikeEl.textContent =
        "Feels Like: " + Math.round(res.main.feels_like) + "°C";
      heroImageEl.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
      );
      currentMinMaxCurrentTempEl.textContent =
        Math.round(res.main.temp_min) +
        "°C / " +
        Math.round(res.main.temp_max) +
        "°C";
      currentHumidityEl.textContent = res.main.humidity + " %";
      currentWindEL.textContent = res.wind.speed + " km/h";
      currentVisibilityEl.textContent = res.visibility / 1000 + " km";

      // currentSunriseEl.textContent = dateObject(res.sys.sunrise).toLocaleString(
      //   "en-US",
      //   { hour: "numeric" }
      // );
      const sunriseObj = dateObject(res.sys.sunrise);
      currentSunriseEl.textContent = formatAMPM(sunriseObj);

      // currentSunsetEl.textContent = dateObject(res.sys.sunset).toLocaleString(
      //   "en-US",
      //   { hour: "numeric" }
      // );
      const sunsetObj = dateObject(res.sys.sunset);
      currentSunsetEl.textContent = formatAMPM(sunsetObj);
    })
    .catch(() => {
      console.log("Eneter a valid city.");
      errorMessageEl.classList.remove("hide");
    });
};
// console.log(currentWeather("delhi"));

const forecastWeather = (city = "delhi") => {
  fetch(apiUrl2 + city + `&appid=${apiKey}`)
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      for (let index = 0; index < res.list.length; index = index + 3) {
        weatherForecastEl.innerHTML += `<div class="forecast_weather_tiles">
        <div class="forecast_content">
          <div class="forecast_content_hero">
            <img
              src="https://openweathermap.org/img/wn/${
                res.list[index].weather[0].icon
              }@2x.png"
              alt=""
              style="margin: -15px" />
            <div class="forecast_date">
              <div id="day">${dateObject(res.list[index].dt).toLocaleString(
                "en-US",
                { weekday: "short" }
              )}</div>
              <div id="time">${dateObject(res.list[index].dt).toLocaleString(
                "en-US",
                { hour: "numeric" }
              )}</div> 
            </div>
          </div>
          <div class="forecast_content_temp">
            <div>Temperature</div>
            <div id="forecast-temp">${Math.round(
              res.list[index].main.temp_min
            )}°C / 
              ${Math.round(res.list[index].main.temp_max)}°C</div>
          </div>
          <div class="forecast_content_humidity">
            <div>Humidity</div>
            <div id="forecast-humidity">${res.list[index].main.humidity}%</div>
          </div>
          <div class="forecast_content_wind">
            <div>Wind</div>
            <div id="forecast-wind">${res.list[index].wind.speed}km/h</div>
          </div>
          <div class="forecast_content_feels">
            <div>Feels Like</div>
            <div id="forecast-feels">${Math.round(
              res.list[index].main.feels_like
            )}°C</div>
          </div>
        </div>
      </div>`;
      }
    })
    .catch(() => {
      console.log("Eneter a valid city.");
    });
};
// console.log(forecastWeather("delhi"));

const inputEl = document.getElementById("city-search");
const searchBtnEl = document.getElementById("search-btn");
const dateEl = document.getElementById("today-date");

const cityEl = document.getElementById("city-name");
const countryEl = document.getElementById("country");
const currentTempEl = document.getElementById("current-temp");
const degTempEl = document.getElementById("deg-c");
const fornTempEl = document.getElementById("deg-f");
const currentStatusEl = document.getElementById("weather-status");
const currentFeelsLikeEl = document.getElementById("feels-like");
const heroImageEl = document.getElementById("relevent-image");
const currentMinMaxCurrentTempEl = document.getElementById("temperature-value");
const currentHumidityEl = document.getElementById("humidity-value");
const currentWindEL = document.getElementById("wind-value");
const currentVisibilityEl = document.getElementById("visibility-value");
const currentSunriseEl = document.getElementById("sunrise-value");
const currentSunsetEl = document.getElementById("sunset-value");
const errorMessageEl = document.getElementById("error-message");

const weatherForecastEl = document.getElementById("right-side");
const dayEl = document.getElementById("day");

console.log(currentWeather("delhi"));
console.log(forecastWeather("delhi"));

searchBtnEl.addEventListener("click", () => {
  const city = inputEl.value;
  if (isDataDisplayed === true) {
    weatherForecastEl.innerHTML = ``;
    console.log(currentWeather(city));
    console.log(forecastWeather(city));
  }
  isDataDisplayed = true;
});
