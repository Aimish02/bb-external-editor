// servers/home/factionManager/purchaseAugmentations.js
async function main(ns) {
  let debug = false;
  let player = ns.getPlayer();
  let playerFactions = player.factions;
  let playerAugmentations = ns.singularity.getOwnedAugmentations(true);
  let augmentationRatio = 0;
  for (let i in playerFactions) {
    let activeFaction = playerFactions[i];
    let factionAugmentations = ns.singularity.getAugmentationsFromFaction(activeFaction);
    let factionRep = ns.singularity.getFactionRep(activeFaction);
    if (debug == true) {
      ns.tprint("----------");
      ns.tprint("Player Factions: " + playerFactions);
      ns.tprint("Faction: " + activeFaction);
      ns.tprint("Faction Augmentations: " + factionAugmentations);
      ns.tprint("Array Length: " + factionAugmentations.length - 1);
      ns.tprint("----------");
    }
    for (let j = factionAugmentations.length - 1; j >= 0; j--) {
      let augmentation = factionAugmentations[j];
      let augRep = ns.singularity.getAugmentationRepReq(augmentation);
      let augPrice = ns.singularity.getAugmentationPrice(augmentation);
      let augBasePrice = ns.singularity.getAugmentationBasePrice(augmentation);
      if (augmentation == "NeuroFlux Governor") {
        continue;
      }
      ;
      augmentationRatio = augPrice / augBasePrice;
      if (!playerAugmentations.includes(augmentation) && factionRep > augRep && ns.getServerMoneyAvailable("home") > augPrice) {
        ns.singularity.purchaseAugmentation(activeFaction, augmentation);
        ns.tprint("Purchased " + augmentation + " from " + activeFaction);
      }
    }
  }
  ns.tprint("Augmentation cost multiplier: " + augmentationRatio);
  let singularityRunningScript = ns.getRunningScript("sing-controller/sing-controller.js", "home");
  let singularityRuntime = singularityRunningScript.onlineRunningTime;
  if (debug == true) {
    ns.tprint("Singularity Runtime: " + singularityRuntime);
  }
  if (augmentationRatio > 25 || ns.getServerMoneyAvailable("home") > 25 * 10 ^ 12 && !playerAugmentations.includes("QLink") || singularityRuntime > 3600 * 3) {
    await ns.run("factionManager/purchaseNeuroFluxGovernors.js");
    ns.singularity.installAugmentations("sing-controller/sing-controller.js");
  }
}
export {
  main
};
