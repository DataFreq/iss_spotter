const { nextISSTimesForMyLocation } = require('./iss_promised');
const { printFlyOver } = require('./printFlyOver');

nextISSTimesForMyLocation()
  .then((times) => {
    printFlyOver(times);
  })
  .catch((err) => {
    console.log("[ERR] It didn't work", err.message);
  });