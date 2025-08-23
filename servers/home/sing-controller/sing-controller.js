// servers/home/sing-controller/sing-controller.js
export async function main(ns) {
  let host = ns.getHostname();

  //Run scripts to run on startup, where order matters.
  ns.run("scanner/scanner.js");
  ns.run("nuker/nuker.js");
  ns.run("sleeveManager/sleeveManager.js");
  ns.run("playerManager/playerManager.js");
  //----------

  //Set up timed actions to run in the background.
  let timedActions = {};
  timedActions["scanner"] = getTimedAction("scanner/scanner.js", Math.random() * 120 + 60);
  timedActions["nuker"] = getTimedAction("nuker/nuker.js", Math.random() * 120 + 60);
  timedActions["batchManager"] = getTimedAction("batchManager/batchManager.js", 0.25);
  timedActions["purchaseServers"] = getTimedAction("purchaseServers/purchaseServers.js", Math.random() * 120 + 60);
  timedActions["bladeBurner"] = getTimedAction("bladeBurner/bladeBurner.js", 60);
  timedActions["gangManager"] = getTimedAction("gangManager/gangManager.js", 0.1);
  timedActions["factionManager"] = getTimedAction("factionManager/factionManager.js", Math.random() * 120 + 180);
  timedActions["blackMarket"] = getTimedAction("blackMarket/blackMarket.js", Math.random() * 120 + 60);
  timedActions["backdoor"] = getTimedAction("backdoor/backdoor.js", Math.random() * 60 + 300);
  timedActions["sleeveManager"] = getTimedAction("sleeveManager/sleeveManager.js", Math.random() * 60);
  timedActions["playerManager"] = getTimedAction("playerManager/playerManager.js", Math.random() * 60 + 300);
  timedActions["upgradeHomeServer"] = getTimedAction("upgradeHomeServer/upgradeHomeServer.js", Math.random() * 120 + 300);
  //----------



  //----------
  //Display timers to the user for awareness.
  let keys = Object.keys(timedActions)
  for (let key of keys) {
      ns.tprint(key + " will run every " + timedActions[key].waitTime / 1e3 + " seconds.");
  }
  //----------



  //Main loop to run timed actions.
  while (true) {
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
  //----------

  //Helper function to create a timed action object. 
  function getTimedAction(scriptName, seconds) {
    let timedAction = {};
    timedAction.waitTime = seconds * 1e3;
    timedAction.lastRun = 0;
    timedAction.action = scriptName;
    return timedAction;
  }
  //----------

}
