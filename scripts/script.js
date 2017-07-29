$(() => {

const apiURL = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?',
      iconURL = 'http://openweathermap.org/img/w/',
      ipURL = 'https://cors-anywhere.herokuapp.com/freegeoip.net/json/',
      geo = navigator.geolocation,
      celsius = ' °C',
      fahrenheit = ' °F',
      selTempMax = $('#tempMax'),
      selTempMin = $('#tempMin'),
      selHumidity = $('#humidity'),
      selPressure = $('#pressure'),
      selCity = $('#city');
      selIcon = $('#icon-temp');

let URL,
    city,
    tempAverage,
    tempMax,
    tempMin,
    humidity,
    pressure,
    unit = true,
    icon;

      // if(geo) {
      //   geo.getCurrentPosition(({ coords }) => {
      //   let { latitude, longitude } = coords;
      //   let coordsURL= `lat=${latitude}&lon=${longitude}`;
      //   URL = `${apiURL}${coordsURL}&APPID=cfdc05d02854f871e2eae7e3a0988b1f&units=metric`;
      //   show();
      // }, error => alert(error.message));
      // }

      function getLocation() {
        $.getJSON(ipURL, coords => {
          let { latitude, longitude } = coords;
          console.log(latitude, longitude);
          let coordsURL= `lat=${latitude}&lon=${longitude}`;
          URL = `${apiURL}${coordsURL}&APPID=cfdc05d02854f871e2eae7e3a0988b1f&units=metric`;
          show();
        });
      }

      getLocation();

      function show() {
        $.getJSON(URL, data => {
          city = data.name;
          tempAverage = data.main.temp;
          tempMax = data.main.temp_max;
          tempMin = data.main.temp_min;
          humidity = data.main.humidity;
          pressure = data.main.pressure;
          icon = data.weather[0].icon;
        }).done(() => {
          selCity.html(city);
          //tempAverage
          selTempMax.html(tempMax).append(celsius);
          selTempMin.html(tempMin).append(celsius);
          selHumidity.html(humidity);
          selPressure.html(pressure);
          selIcon.html(`<img src="${iconURL}${icon}.png"><h3>${tempAverage}${celsius}</h3>`);
        });
      }

      selIcon.on("click", () => {
        changeUnit();
      });

      function changeUnit() {
        if(unit) {
          tempMax = convToFah(tempMax);
          tempMin = convToFah(tempMin);
          tempAverage = convToFah(tempAverage);
          selTempMax.html(tempMax).append(fahrenheit);
          selTempMin.html(tempMin).append(fahrenheit);
          selIcon.html(`<img src="${iconURL}${icon}.png"><h3>${tempAverage}${fahrenheit}</h3>`);
          unit = false;
        } else {
          tempMax = convToCel(tempMax);
          tempMin = convToCel(tempMin);
          tempAverage = convToCel(tempAverage);
          selTempMax.html(tempMax).append(celsius);
          selTempMin.html(tempMin).append(celsius);
          selIcon.html(`<img src="${iconURL}${icon}.png"><h3>${tempAverage}${celsius}</h3>`);
          unit = true;
        }
      }

      function convToCel(temperature) {
        return Math.round((temperature - 32) * 5 / 9);
      }
      function convToFah(temperature) {
        return Math.round(temperature * 9 / 5 + 32);
      }


});
