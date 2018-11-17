const request = require('request');

const geocodeAddress = (address, callback) => {
  let encodedAddress = encodeURIComponent(address);

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=IB5fRBAeiP0tHsRNS2rcaGQpZL2tHSuZ&location=${encodedAddress}`,
    json: true
  }, (error, response, body)=> {
    if (body.info.statuscode === 400) {
      callback("Input Error: Address doesn't exist");
    } else if (body.info.statuscode === 403) {
      callback("API Key Error: Contact Developer Network");
    } else if (body.info.statuscode === 500) {
      callback("Unknown Error processing request");
    } else if (body.info.statuscode === 0) {
      callback(undefined, {
        latitude: body.results[0].locations[0].latLng.lat,
        longitude: body.results[0].locations[0].latLng.lng
      });
    }
  });
}

module.exports = {
  geocodeAddress
}
