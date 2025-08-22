// servers/home/batchManager/V01/batchManager.js
async function main(ns) {
  let batchDelay = 50;
  let host = ns.getHostname();
  let serverList = JSON.parse(ns.read("optSortedList.json"));
  let targetName = chooseTarget(ns, serverList);
  let dtChooseNewTarget = 3e4;
  let tChosePreviousTarget = Date.now();
  let tPrintUpdate = Date.now();
  let dtPrintPrintUpdate = 3e4;
  if (Date.now() - tChosePreviousTarget > dtChooseNewTarget) {
    targetName = chooseTarget(ns, serverList);
    ns.tprint("Chose New Target: " + targetName);
    tChosePreviousTarget = Date.now();
  }
  if (Date.now() - tPrintUpdate > dtPrintPrintUpdate) {
    ns.tprint("Target: " + targetName + ":	Current Security:" + ns.getServerSecurityLevel(targetName) + "	Min Security: " + ns.getServerMinSecurityLevel(targetName) + "	Money:" + ns.formatNumber(ns.getServerMoneyAvailable(targetName), 1, 1e5) + "	MaxMon:" + ns.formatNumber(ns.getServerMaxMoney(targetName), 1, 1e5));
    tPrintUpdate = Date.now();
  }
  let securityMargin = 1;
  let moneyMargin = 0.9;
  let highSecurity = ns.getServerSecurityLevel(targetName) > ns.getServerMinSecurityLevel(targetName) + securityMargin;
  let lowMoney = ns.getServerMoneyAvailable(targetName) < ns.getServerMaxMoney(targetName) * moneyMargin;
  for (let i in serverList) {
    if (serverList[i].includes("hacknet")) {
      continue;
    }
    if (!ns.hasRootAccess(serverList[i])) {
      continue;
    }
    if (!ns.fileExists("Formulas.exe")) {
      earlyHacking(ns, targetName, serverList[i]);
    } else {
      ns.scp("/batch/batch.js", serverList[i], "home");
      ns.exec("/batch/batch.js", "home", 1, targetName, serverList[i], batchDelay, Math.random());
    }
  }
}
function chooseTarget(ns, serverList) {
  let target = ns.args[0] || "n00dles";
  for (let i = 0; i < serverList.length; i++) {
    if (ns.hasRootAccess(serverList[i]) && ns.getHackingLevel() / 2 >= ns.getServerRequiredHackingLevel(serverList[i])) {
      return target = serverList[i];
    }
  }
  return target;
}
async function earlyHacking(ns, target, host) {
  let hostRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
  const moneyThresh = ns.getServerMaxMoney(target) * 0.9;
  const secThresh = ns.getServerMinSecurityLevel(target) + 1;
  const hackCost = 1.7;
  const growCost = 1.75;
  const weakenCost = 1.75;
  if (ns.getServerSecurityLevel(target) > secThresh) {
    runWeakener(ns, target, host);
  } else if (ns.getServerMoneyAvailable(target) < moneyThresh) {
    runGrower(ns, target, host);
  } else {
    runHacker(ns, target, host);
  }
}
function runWeakener(ns, target, host) {
  let weakenCost = 1.75;
  let hostRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
  let weakenThreads = [
    Math.trunc(hostRam / weakenCost),
    Math.trunc((ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target)) / 0.05)
  ];
  if (weakenThreads[0] > 0 && weakenThreads[0] <= weakenThreads[1]) {
    ns.exec("/basic/weaken-server.js", host, weakenThreads[0], target, 0, 0, Math.random());
  } else if (weakenThreads[1] > 0 && weakenThreads[0] > weakenThreads[1]) {
    ns.exec("/basic/weaken-server.js", host, weakenThreads[1], target, 0, 0, Math.random());
    shareComp(ns, host);
  }
}
function runGrower(ns, target, host) {
  let growCost = 1.75;
  let hostRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
  let growThreads = Math.trunc(hostRam / (1.08 * growCost));
  let weakenThreads = Math.trunc(growThreads * 0.08);
  if (growThreads > 0) {
    ns.exec("/basic/grow-server.js", host, growThreads, target, 0, 0, Math.random());
  }
  if (weakenThreads > 0) {
    ns.exec("/basic/weaken-server.js", host, weakenThreads, target, 0, 0, Math.random());
  }
  shareComp(ns, host);
}
function runHacker(ns, target, host) {
  const hackCost = 1.7;
  const growCost = 1.75;
  const weakenCost = 1.75;
  const wtoHRatio = 1 / 25;
  const wtoGRatio = 2 / 25;
  const gtoHRatio = 10;
  let hostRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
  let hackThreads = Math.trunc(hostRam / (hackCost + gtoHRatio * growCost + (wtoHRatio + gtoHRatio * wtoGRatio) * weakenCost));
  let growThreads = gtoHRatio * hackThreads;
  let weakenThreads = Math.trunc((wtoHRatio + gtoHRatio * wtoGRatio) * hackThreads);
  if (hackThreads > 5) {
    ns.exec("/basic/weaken-server.js", host, 3, target, 0, 0, Math.random());
    ns.exec("/basic/grow-server.js", host, 25, target, 0, 0, Math.random());
    ns.exec("/basic/hack-server.js", host, 5, target, 0, 0, Math.random());
    shareComp(ns, host);
  } else if (hackThreads > 0) {
    ns.exec("/basic/hack-server.js", host, hackThreads, target, 0, 0, Math.random());
    ns.exec("/basic/grow-server.js", host, growThreads, target, 0, 0, Math.random());
    if (weakenThreads > 0) {
      ns.exec("/basic/weaken-server.js", host, weakenThreads, target, 0, 0, Math.random());
    }
    shareComp(ns, host);
  } else if (Math.trunc(hostRam / hackCost) > 0) {
    ns.exec("/basic/hack-server.js", host, Math.trunc(hostRam / hackCost), target, 0, 0, Math.random());
    shareComp(ns, host);
  }
}
function shareComp(ns, host) {
  const currentRam = ns.getServerMaxRam(host) - ns.getServerUsedRam(host);
  const shareCost = ns.getScriptRam("/basic/share-server.js");
  const shareThreads = Math.trunc(currentRam / shareCost);
  if (shareThreads > 0) {
    ns.exec("/basic/share-server.js", host, shareThreads);
  }
}
export {
  main
};
