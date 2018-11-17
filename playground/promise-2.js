const request = require('request');
var geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    let encodedAddress = encodeURIComponent(address);

    request({
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=IB5fRBAeiP0tHsRNS2rcaGQpZL2tHSuZ&location=${encodedAddress}`,
      json: true
    }, (error, response, body)=> {
      if (body.info.statuscode === 400) {
        reject("Input Error: Address doesn't exist");
      } else if (body.info.statuscode === 403) {
        reject("API Key Error: Contact Developer Network");
      } else if (body.info.statuscode === 500) {
        reject("Unknown Error processing request");
      } else if (body.info.statuscode === 0) {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].locations[0].latLng.lat,
          longitude: body.results[0].locations[0].latLng.lng
        });
      }
    });
  });
};

geocodeAddress('19146').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
