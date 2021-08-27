const request = require('request');

const fetchMyIP = callback => {
  //request to fetch IP from JSON API
  request("https://api.ipify.org", (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, body);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (res.statusCode !== 200) {
      callback(Error(`Status Code ${res.statusCode} when fetching coordinates. Response ${body}`), null);
      return;
    }

    let coords = { 'latitude': JSON.parse(body).latitude, 'longitude': JSON.parse(body).longitude };
    callback(null, coords);
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  let url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (err, res, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (res.statusCode !== 200) {
      callback(Error(`Status Code ${res.statusCode} when reaching ${url}. Response ${body}`), null);
      return;
    }

    const ISS = JSON.parse(body).response;
    callback(null, ISS);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((err, ip) => {
    if (err) return callback(err, null);
    
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) return callback(err, null);

      fetchISSFlyOverTimes(coords, (err, data) => {
        if (err) return callback(err,null);

        callback(null, data);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };