/*
const { fetchMyIP } = require('./iss');

fetchMyIP((err, ip) => {
  if (err) {
    console.log('Failed to grab ip!', err);
    return;
  }

  console.log('Grabbed! Returning IP:', ip);
});

const { fetchCoordsByIP } = require('./iss');

fetchCoordsByIP(ip, (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  
  console.log(data);
});

const { fetchISSFlyOverTimes } = require('./iss');
// const coords = { latitude: 49.2824, longitude: -123.0399 };

fetchISSFlyOverTimes(coords, (err, data) => {
  if (err) {
    console.log('[ERROR]', err);
    return;
  }

  console.log(data);
});
*/

const { nextISSTimesForMyLocation } = require('./iss');
const { printFlyOver } = require('./printFlyOver');

nextISSTimesForMyLocation((err, data) => {
  if (err) {
    console.log('[ERROR] getting ISS Times', err);
    return;
  }

  printFlyOver(data);
});