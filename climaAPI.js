const rootURL = 'http://samples.openweathermap.org/data/2.5/weather?appid=79880963a91dcde935fb5c11803fceb2';

export const fetchWeather = (lat,lon) => {

  const url = rootURL+'&lat='+lat+'&lon='+lon;

  return fetch(url)
  .then(res => res.json())
  .then(json => ({
    temp: json.main.temp,
    weather: json.weather[0].main
  }))
  
}