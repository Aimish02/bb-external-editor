// servers/home/gangManager/getTWTime.js
export async function main(ns) {

  let debug = false;
  if (debug == true) {ns.ui.openTail();}

  let twTime = 0;
  while (twTime == 0) {
    let startPwr = ns.gang.getOtherGangInformation()["The Black Hand"].power;
    await ns.sleep(10);
    let endPwr = ns.gang.getOtherGangInformation()["The Black Hand"].power;
    if (startPwr != endPwr) {
      twTime = Date.now();
      ns.print("twTime:" + twTime);
      ns.write("data/twTime.txt", twTime, "w");
      return;
    }
  }
}

