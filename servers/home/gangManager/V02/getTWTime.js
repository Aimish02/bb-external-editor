// servers/home/gangManager/V02/getTWTime.js
async function main(ns) {
  let twTime = 0;
  while (twTime == 0) {
    let startPwr = ns.gang.getOtherGangInformation()["The Black Hand"].power;
    await ns.sleep(10);
    let endPwr = ns.gang.getOtherGangInformation()["The Black Hand"].power;
    if (startPwr != endPwr) {
      twTime = Date.now();
      ns.tprint("twTime:" + twTime);
      ns.write("data/twTime.json", twTime, "w");
      return;
    }
  }
}
export {
  main
};
