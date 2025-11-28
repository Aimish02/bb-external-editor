// servers/home/playerManager/playerFactionRepFocus.js
async function main(ns) {
  let debug = false;
  ns.disableLog("ALL");
  if (debug == true){ns.ui.openTail();}

  if (debug == true) {
    ns.print("DEBUG: Player focus is faction reputation gain.");
  }
  ns.clearPort(1);
  await ns.run("playerManager/pickFactionTarget.js");
  let portPeek = ns.peek(1);
  if (portPeek["handshake"] != "factionTarget") {
    ns.print("Error -----");
    ns.print("Incorrect data on port 1.");
    ns.print(portPeek);
    ns.print("Error -----");
    return;
  }
  let targetFaction = ns.readPort(1);
  if (debug == true) {
    ns.print("DEBUG: Target Faction is " + targetFaction["data"]);
  }
  ;
  try {
    ns.singularity.workForFaction(targetFaction["data"], "hacking");
  } catch (err) {
  }
}
export {
  main
};
