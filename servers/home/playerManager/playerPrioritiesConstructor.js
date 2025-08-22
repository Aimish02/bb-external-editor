// servers/home/playerManager/playerPrioritiesConstructor.js
async function main(ns) {
  let debug = false;
  if (ns.fileExists("data/playerPriorities.json")) {
    if (debug == true) {
      ns.tprint("DEBUG: Player Priorities exists");
    }
    ;
    let importedPlayerPriorities = JSON.parse(ns.read("data/playerPriorities.json"));
    if (importedPlayerPriorities["resetPlayerPriorities"] == true) {
      if (debug = true) {
        ns.tprint("DEBUG: Reseting player priorities file.");
      }
      ;
    } else {
      return;
    }
  }
  let playerPriorities = {};
  playerPriorities["resetPlayerPriorities"] = false;
  playerPriorities["crime"] = false;
  playerPriorities["faction"] = true;
  playerPriorities["bladeburner"] = false;
  if (debug = true) {
    ns.tprint("DEBUG: ----------");
    ns.tprint(playerPriorities);
    ns.tprint("-----------------");
  }
  ;
  let playerPrioritiesJSON = JSON.stringify(playerPriorities);
  ns.write("data/playerPriorities.json", playerPrioritiesJSON, "w");
}
export {
  main
};
