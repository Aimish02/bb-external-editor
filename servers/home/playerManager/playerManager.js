// servers/home/playerManager/playerManager.js
async function main(ns) {
  let debug = true;
  ns.run("playerManager/playerPrioritiesConstructor.js");
  let playerPriorities = JSON.parse(ns.read("data/playerPriorities.json"));
  if (debug == true) {
    ns.tprint("DEBUG: ----------");
    ns.tprint(playerPriorities);
    ns.tprint("-----------------");
  }
  ;
  if (playerPriorities["crime"]) {
    if (debug == true) {
      ns.tprint("Player Priority: Crime");
    }
  }
  if (playerPriorities["faction"]) {
    if (debug == true) {
      ns.tprint("Player Priority: Faction Rep");
    }
    ns.run("playerManager/playerFactionRepFocus.js");
  }
  if (playerPriorities["bladeburner"]) {
    if (debug == true) {
      ns.tprint("Player Priority: Bladeburners");
    }
  }
}
export {
  main
};
