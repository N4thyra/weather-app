$(() => {

const apiURL = 'https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?',
      iconURL = 'http://openweathermap.org/img/w/',
      geo = navigator.geolocation,
      celcius = ' °C',
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
    icon;

      if(geo) {
        geo.getCurrentPosition(({ coords }) => {
        let { latitude, longitude } = coords;
        let coordsURL= `lat=${latitude}&lon=${longitude}`;
        URL = `${apiURL}${coordsURL}&APPID=cfdc05d02854f871e2eae7e3a0988b1f&units=metric`;
        show();
      }, error => alert(error.message));
      }

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
          selTempMax.html(tempMax).append(celcius);
          selTempMin.html(tempMin).append(celcius);
          selHumidity.html(humidity);
          selPressure.html(pressure);
          selIcon.html(`<img src="${iconURL}${icon}.png"><h3>${tempAverage}${celcius}</h3>`);
        });
      }



});
