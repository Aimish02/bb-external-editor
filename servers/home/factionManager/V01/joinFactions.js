// servers/home/factionManager/V01/joinFactions.js
async function main(ns) {
  let debug = false;
  if (debug == true) ns.tprint("Joining Factions.");
  let factionInvites = ns.singularity.checkFactionInvitations();
  for (let i in factionInvites) {
    ns.singularity.joinFaction(factionInvites[i]);
    ns.tprint("Joined Faction: " + factionInvites[i]);
  }
}
export {
  main
};
