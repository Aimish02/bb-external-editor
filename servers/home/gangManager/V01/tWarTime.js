// servers/home/gangManager/V01/tWarTime.js
async function main(ns) {
  let twTime = 0;
  let dtTW = 0;
  let dtTWIntegrator = 0;
  while (dtTW == 0) {
    let startPwr = ns.gang.getOtherGangInformation()["The Black Hand"].power;
    await ns.sleep(10);
    let endPwr = ns.gang.getOtherGangInformation()["The Black Hand"].power;
    if (startPwr != endPwr && twTime == 0) {
      twTime = Date.now();
      ns.tprint("twTime:" + twTime);
      startPwr = 0;
      endPwr = 0;
    } else if (twTime != 0 && startPwr != endPwr) {
      dtTW = Date.now() - twTime;
      ns.tprint("dtTW:" + dtTW);
      dtTW = 2e4;
    }
  }
  let twTimeJSON = JSON.stringify(twTime);
  ns.write("twTime.json", twTimeJSON, "w");
}
export {
  main
};
