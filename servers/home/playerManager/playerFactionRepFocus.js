// servers/home/playerManager/playerFactionRepFocus.js
async function main(ns) {
  let debug = true;
  if (debug == true) {
    ns.tprint("DEBUG: Player focus is faction reputation gain.");
  }
  ns.clearPort(1);
  await ns.run("playerManager/pickFactionTarget.js");
  let portPeek = ns.peek(1);
  if (portPeek["handshake"] != "factionTarget") {
    ns.tprint("Error -----");
    ns.tprint("Incorrect data on port 1.");
    ns.tprint(portPeek);
    ns.tprint("Error -----");
    return;
  }
  let targetFaction = ns.readPort(1);
  if (debug == true) {
    ns.tprint("DEBUG: Target Faction is " + targetFaction["data"]);
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
