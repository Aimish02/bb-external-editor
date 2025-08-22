// servers/home/sing-controller/sing-controller.js
async function main(ns) {
  let host = ns.getHostname();
  ns.run("scanner/scanner.js");
  ns.run("nuker/nuker.js");
  ns.run("sleeveManager/sleeveManager.js");
  ns.run("playerManager/playerManager.js");
  let actionTimers = {};
  actionTimers["scanner"] = Math.random() * 120 + 60;
  actionTimers["nuker"] = Math.random() * 120 + 60;
  actionTimers["batchManager"] = 0.25;
  actionTimers["purchaseServers"] = Math.random() * 120 + 60;
  actionTimers["bladeBurner"] = 60;
  actionTimers["gangManager"] = 0.1;
  actionTimers["factionManager"] = Math.random() * 120 + 180;
  actionTimers["blackMarket"] = Math.random() * 120 + 60;
  actionTimers["backdoor"] = Math.random() * 60 + 300;
  actionTimers["sleeveManager"] = Math.random() * 60;
  actionTimers["playerManager"] = Math.random() * 60 + 300;
  let timeKeys = Object.keys(actionTimers);
  for (let key of timeKeys) {
    ns.tprint(key + " timer: " + actionTimers[key] + " seconds.");
  }
  let timedActions = {};
  timedActions["scanner"] = getTimedAction("scanner/scanner.js", actionTimers["scanner"]);
  timedActions["nuker"] = getTimedAction("nuker/nuker.js", actionTimers["nuker"]);
  timedActions["batchManager"] = getTimedAction("batchManager/batchManager.js", actionTimers["batchManager"]);
  timedActions["purchaseServers"] = getTimedAction("purchaseServers/purchaseServers.js", actionTimers["purchaseServers"]);
  timedActions["bladeBurner"] = getTimedAction("bladeBurner/bladeBurner.js", actionTimers["bladeBurner"]);
  timedActions["gangManager"] = getTimedAction("gangManager/gangManager.js", actionTimers["gangManager"]);
  timedActions["factionManager"] = getTimedAction("factionManager/factionManager.js", actionTimers["factionManager"]);
  timedActions["blackMarket"] = getTimedAction("blackMarket/blackMarket.js", actionTimers["blackMarket"]);
  timedActions["backdoor"] = getTimedAction("backdoor/backdoor.js", actionTimers["backdoor"]);
  timedActions["sleeveManager"] = getTimedAction("sleeveManager/sleeveManager.js", actionTimers["sleeveManager"]);
  timedActions["playerManager"] = getTimedAction("playerManager/playerManager.js", actionTimers["playerManager"]);
  while (true) {
    let keys = Object.keys(timedActions);
    for (let key of keys) {
      if (timedActions[key].lastRun + timedActions[key].waitTime < Date.now() && !ns.isRunning(timedActions[key].action)) {
        try {
          ns.run(timedActions[key].action, 1);
          timedActions[key].lastRun = Date.now();
        } catch (err) {
          ns.tprint("Error running " + timedActions[key].action);
          ns.tprint(err);
        }
      }
    }
    await ns.sleep(10);
  }
  function getTimedAction(scriptName, seconds) {
    let timedAction = {};
    timedAction.waitTime = seconds * 1e3;
    timedAction.lastRun = 0;
    timedAction.action = scriptName;
    return timedAction;
  }
}
export {
  main
};
