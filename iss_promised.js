const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org');
};

const fetchCoordsByIP = ip => {
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = data => {
  const {latitude, longitude} = JSON.parse(data);
  let url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(data => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };