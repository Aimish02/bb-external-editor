// servers/home/factionManager/joinFactions.js
async function main(ns) {
  let debug = false;
  if (debug == true) {ns.ui.openTail();}
  
  ns.print("Joining Factions.");
  let factionInvites = ns.singularity.checkFactionInvitations();
  for (let i in factionInvites) {
    ns.singularity.joinFaction(factionInvites[i]);
    ns.print("Joined Faction: " + factionInvites[i]);
  }
}
export {
  main
};
