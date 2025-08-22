// servers/home/playerManager/V01/pickFactionTarget.js
async function main(ns) {
  let debug = false;
  let targetFaction = {};
  if (debug == true) {
    targetFaction = "DEBUGFaction";
  }
  if (debug == true) {
    ns.tprint("DEBUG: Picking faction target for reputation gain.");
  }
  let player = ns.getPlayer();
  let playerFactions = player.factions;
  let playerOwnedAugmentations = ns.singularity.getOwnedAugmentations(true);
  let factionAvailableAugments = {};
  let playerLackingAugments = {};
  if (debug == true) {
    ns.tprint("DEBUG: Player Factions:");
    ns.tprint(playerFactions);
  }
  if (ns.gang.inGang()) {
    playerFactions = playerFactions.filter((faction) => faction != ns.gang.getGangInformation().faction);
  }
  if (debug == true) {
    ns.tprint("DEBUG: Player Factions minus gang:");
    ns.tprint(playerFactions);
  }
  for (let i in playerFactions) {
    let currentFaction = playerFactions[i];
    factionAvailableAugments[currentFaction] = ns.singularity.getAugmentationsFromFaction(currentFaction);
    if (debug == true) {
      ns.tprint("----------");
      ns.tprint("DEBUG: Faction, " + currentFaction + " has the following augments available:");
      ns.tprint(factionAvailableAugments[currentFaction]);
    }
    playerLackingAugments[currentFaction] = factionAvailableAugments[currentFaction].filter((augment) => !playerOwnedAugmentations.includes(augment));
    if (debug == true) {
      ns.tprint("DEBUG: Player is lacking the following augments:");
      ns.tprint(playerLackingAugments[currentFaction]);
    }
  }
  let downselectedFactions = playerFactions.filter((faction) => playerLackingAugments[faction].length > 0);
  if (debug == true) {
    ns.tprint("DEBUG: Downselected factions, step 1:");
    ns.tprint(downselectedFactions);
    ns.tprint("----------");
  }
  function compareFavor(factionA, factionB) {
    let factionAFavor = ns.singularity.getFactionFavor(factionA);
    let factionBFavor = ns.singularity.getFactionFavor(factionB);
    return factionBFavor - factionAFavor;
  }
  downselectedFactions.sort(compareFavor);
  if (debug == true) {
    ns.tprint("DEBUG: Factions sorted from highest to lowest favor: ");
    ns.tprint(downselectedFactions);
  }
  let factionSecondDownselect = [];
  for (let i in downselectedFactions) {
    let currentFaction = downselectedFactions[i];
    let augmentList = playerLackingAugments[currentFaction];
    let augmentsToRemove = [];
    if (debug = true) {
      ns.tprint("----------");
      ns.tprint("DEBUG: Second downselect.");
      ns.tprint("DEBUG: Current Faction: " + currentFaction);
      ns.tprint("DEBUG: Augment list: " + playerLackingAugments[currentFaction]);
    }
    for (let j in playerLackingAugments[currentFaction]) {
      let augment = augmentList[j];
      let augmentSuppliers = ns.singularity.getAugmentationFactions(augment);
      let filteredSuppliers = downselectedFactions.filter((faction) => augmentSuppliers.includes(faction) && !factionSecondDownselect.includes(faction));
      if (filteredSuppliers.length > 1) {
        augmentsToRemove.push(augment);
      }
      if (debug = true) {
        ns.tprint("DEBUG: Augment: " + augment);
        ns.tprint("DEBUG: Augment Suppliers: " + augmentSuppliers);
        ns.tprint("DEBUG: Filtered suppliers: " + filteredSuppliers);
        ns.tprint("DEBUG: Augments to remove: " + augmentsToRemove);
      }
    }
    if (augmentList.every((augment) => augmentsToRemove.includes(augment))) {
      factionSecondDownselect.push(currentFaction);
    }
    ns.tprint("Additional factions to downselect: " + factionSecondDownselect);
    ns.tprint("----------");
  }
  downselectedFactions = downselectedFactions.filter((faction) => !factionSecondDownselect.includes(faction));
  if (debug == true) {
    ns.tprint("DEBUG: Downselected factions, step 2:");
    ns.tprint(downselectedFactions);
    ns.tprint("----------");
  }
  targetFaction = downselectedFactions[0];
  if (debug == true) {
    ns.tprint("DEBUG: Faction target is " + targetFaction);
  }
  let portData = {};
  portData["handshake"] = "factionTarget";
  portData["data"] = targetFaction;
  if (debug == true) {
    ns.tprint("DEBUG: Data sent to port: ");
    ns.tprint(portData);
  }
  ns.writePort(1, portData);
  return;
}
export {
  main
};
