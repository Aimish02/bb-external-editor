// servers/home/batch/batch.js
async function main(ns) {
  let target = ns.args[0] || "n00dles";
  let host = ns.args[1] || "home";
  let batchDelay = ns.args[2] || 20;
  let targetServ = ns.getServer(target);
  let player = ns.getPlayer();
  let hackThreads = 1;
  let growThreads = 1;
  let hWeakenThreads = 1;
  let gWeakenThreads = 1;
  let percentMoneyToSteal = 0.2;
  let dtHack = ns.formulas.hacking.hackTime(targetServ, player);
  let dtGrow = ns.formulas.hacking.growTime(targetServ, player);
  let dtWeaken = ns.formulas.hacking.weakenTime(targetServ, player);
  let w1 = 2 * batchDelay;
  let w2 = batchDelay + dtWeaken - dtGrow;
  let w3 = dtWeaken - batchDelay - dtHack;
  let hackP = ns.formulas.hacking.hackPercent(targetServ, player);
  let growP = ns.formulas.hacking.growPercent(targetServ, 1, player, 1) - 1;
  if (Math.trunc(percentMoneyToSteal / hackP) > 1) {
    hackThreads = Math.trunc(percentMoneyToSteal / hackP);
  } else {
    hackThreads = 1;
  }
  if (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target) * 0.9) {
    growThreads = 25;
    hackThreads = 0;
  } else if (hackThreads * hackP / growP > 1) {
    growThreads = Math.ceil(1 + hackThreads * hackP / growP);
  } else {
    growThreads = 1;
  }
  if (ns.getServerSecurityLevel(target) > targetServ.getServerMinSecurityLevel + 1) {
    hWeakenThreads = 25;
    hackThreads = 0;
  } else if (hackThreads * 1 / 25 > 1) {
    hWeakenThreads = Math.ceil(hackThreads * 1 / 25);
  } else {
    hWeakenThreads = 1;
  }
  if (growThreads * 2 / 25 > 1) {
    gWeakenThreads = Math.ceil(growThreads * 2 / 25);
  } else {
    gWeakenThreads = 1;
  }
  let freeRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
  if (host == "home") {
    freeRam = freeRam - 100;
  }
  let batchRam = 1.75 * hWeakenThreads + 1.75 * gWeakenThreads + 1.75 * growThreads + 1.75 * hackThreads;
  if (freeRam < batchRam) {
    let ramRatio = freeRam / batchRam;
    gWeakenThreads = Math.ceil(gWeakenThreads * ramRatio);
    hWeakenThreads = Math.ceil(hWeakenThreads * ramRatio);
    growThreads = Math.ceil((freeRam - 1.75 * (gWeakenThreads + hWeakenThreads)) * ramRatio);
    hackThreads = Math.trunc((freeRam - 1.75 * (gWeakenThreads + hWeakenThreads + growThreads)) / 1.75);
  }
  batchRam = 1.75 * hWeakenThreads + 1.75 * gWeakenThreads + 1.75 * growThreads + 1.7 * hackThreads;
  let startTime = Date.now() + 1e3;
  if (freeRam < batchRam) {
    return;
  }
  if (hackThreads > 0) {
    ns.exec("/basic/hack-server.js", host, hackThreads, target, startTime, w3, Math.random());
  }
  if (hWeakenThreads > 0) {
    ns.exec("/basic/weaken-server.js", host, hWeakenThreads, target, startTime, 0, Math.random());
  }
  if (growThreads > 0) {
    ns.exec("/basic/grow-server.js", host, growThreads, target, startTime, w2, Math.random());
  }
  if (gWeakenThreads > 0) {
    ns.exec("/basic/weaken-server.js", host, gWeakenThreads, target, startTime, w1, Math.random());
  }
}
export {
  main
};
