const printFlyOver = flyOver => {
  for (const pass of flyOver) {
    const dt = new Date(0);
    dt.setUTCSeconds(pass.risetime);
    const PER = pass.duration;

    console.log(`Next pass @ ${dt} for ${PER} seconds!`);
  }
};

module.exports = { printFlyOver };