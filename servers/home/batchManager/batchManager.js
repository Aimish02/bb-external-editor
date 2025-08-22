// servers/home/batchManager/batchManager.js
async function main(ns) {
  let debug = false;
  let batchDelay = 20;
  let player = ns.getPlayer();
  let serverList = JSON.parse(ns.read("data/optSortedList.json"));
  let target = chooseTarget(serverList);
  let targetServ = ns.getServer(target);
  let dtHack = ns.formulas.hacking.hackTime(targetServ, player);
  let dtGrow = ns.formulas.hacking.growTime(targetServ, player);
  let dtWeaken = ns.formulas.hacking.weakenTime(targetServ, player);
  let hackDelay = dtWeaken - dtHack - batchDelay * 2;
  let growDelay = dtWeaken - dtGrow - batchDelay;
  let weakenDelay = 0;
  for (let i in serverList) {
    if (ns.hasRootAccess(serverList[i])) {
      ns.scp("/basic/hack-server.js", serverList[i], "home");
      ns.scp("/basic/weaken-server.js", serverList[i], "home");
      ns.scp("/basic/grow-server.js", serverList[i], "home");
      ns.scp("/basic/share-server.js", serverList[i], "home");
      let HGW = calculateThreads(serverList[i], target);
      let startTime = Date.now() + 1e3;
      let server = ns.getServer(serverList[i]);
      let freeRam = server.maxRam - server.ramUsed;
      let batchRam = 1.75 * (HGW["hack"] + HGW["grow"] + HGW["weaken"]);
      if (debug == true) {
        ns.tprint("Server: " + serverList[i]);
        ns.tprint("Target: " + targetServ.hostname);
        ns.tprint("Free Ram: " + freeRam);
        ns.tprint("Batch Ram: " + batchRam);
        ns.tprint("Hack: " + HGW["hack"]);
        ns.tprint("Grow: " + HGW["grow"]);
        ns.tprint("Weaken: " + HGW["weaken"]);
      }
      if (HGW["hack"] <= 0 || HGW["grow"] <= 0 || HGW["weaken"] <= 0 || freeRam < batchRam) {
        continue;
      } else {
        ns.exec("basic/hack-server.js", serverList[i], HGW["hack"], target, startTime, hackDelay, Math.random());
        ns.exec("basic/grow-server.js", serverList[i], HGW["grow"], target, startTime, growDelay, Math.random());
        ns.exec("basic/weaken-server.js", serverList[i], HGW["weaken"], target, startTime, weakenDelay, Math.random());
      }
    }
  }
  function chooseTarget(serverList2) {
    let target2 = "n00dles";
    for (let i in serverList2) {
      let potentialServ = ns.getServer(serverList2[i]);
      let player2 = ns.getPlayer();
      let hackP = ns.formulas.hacking.hackPercent(potentialServ, player2);
      if (ns.hasRootAccess(serverList2[i]) && ns.getHackingLevel() / 2 >= ns.getServerRequiredHackingLevel(serverList2[i]) && hackP > 0) {
        return target2 = serverList2[i];
      }
    }
    return target2;
  }
  function calculateThreads(host, target2) {
    let debug2 = false;
    let HGWThreads = {};
    let hackAmount = 0.1;
    let targetServ2 = ns.getServer(target2);
    let player2 = ns.getPlayer();
    let server = ns.getServer(host);
    let hackP = ns.formulas.hacking.hackPercent(targetServ2, player2);
    let growP = ns.formulas.hacking.growPercent(targetServ2, 1, player2, 1);
    let hackThreads = Math.ceil(hackAmount / hackP);
    let growThreads = Math.ceil(hackAmount / (growP - 1));
    let weakenThreads = Math.ceil(hackThreads * (1 / 25) + growThreads * (2 / 25));
    ;
    let batchRam = 1.75 * (hackThreads + growThreads + weakenThreads);
    let freeRam = server.maxRam - server.ramUsed;
    if (host == "home") {
      freeRam = freeRam - 100;
    }
    let ramRatio = 0.9 * freeRam / batchRam;
    hackThreads = Math.ceil(ramRatio * hackThreads);
    if (hackThreads > 1) {
      hackThreads--;
    }
    weakenThreads = Math.ceil(ramRatio * weakenThreads);
    growThreads = Math.ceil(ramRatio * growThreads);
    batchRam = 1.75 * (hackThreads + growThreads + weakenThreads);
    HGWThreads["hack"] = hackThreads;
    HGWThreads["grow"] = growThreads;
    HGWThreads["weaken"] = weakenThreads;
    let hackChance = ns.formulas.hacking.hackChance(targetServ2, player2);
    if (debug2 == true) {
      ns.tprint("----------");
      ns.tprint("calculateThreads Debug:");
      ns.tprint("target = " + targetServ2.hostname);
      ns.tprint("hackP = " + hackP);
      ns.tprint("growP = " + growP);
      ns.tprint("hackThreads = " + hackThreads);
      ns.tprint("growThreads = " + growThreads);
      ns.tprint("hackChance = " + hackChance);
      ns.tprint("----------");
    }
    return HGWThreads;
  }
}
export {
  main
};
