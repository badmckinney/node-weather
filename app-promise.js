const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a:{
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

let encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=IB5fRBAeiP0tHsRNS2rcaGQpZL2tHSuZ&location=${encodedAddress}`

axios.get(geocodeUrl).then((response) => {
  let lat = response.data.results[0].locations[0].latLng.lat;
  let lng = response.data.results[0].locations[0].latLng.lng;
  let weatherUrl = `https://api.darksky.net/forecast/e499db9bc06611cc8be9846e3283a10b/${lat},${lng}`;
  console.log(response.data.results[0].providedLocation.location);
  return axios.get(weatherUrl);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}, but it feels like ${apparentTemperature}`);
}).catch((e) => {
  if (e) {
  console.log(e);
  }
});
