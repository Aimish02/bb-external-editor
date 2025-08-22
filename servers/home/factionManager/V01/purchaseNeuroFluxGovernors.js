// servers/home/factionManager/V01/purchaseNeuroFluxGovernors.js
async function main(ns) {
  let player = ns.getPlayer();
  let playerFactions = player.factions;
  let factionWithNeurofluxGovernor;
  for (let i in playerFactions) {
    let activeFaction = playerFactions[i];
    let factionAugmentations = ns.singularity.getAugmentationsFromFaction(activeFaction);
    let factionRep = ns.singularity.getFactionRep(activeFaction);
    let neurofluxGovernorRep = ns.singularity.getAugmentationRepReq("NeuroFlux Governor");
    if (factionAugmentations.includes("NeuroFlux Governor") && factionRep >= neurofluxGovernorRep) {
      factionWithNeurofluxGovernor = activeFaction;
      break;
    }
  }
  if (factionWithNeurofluxGovernor != null) {
    while (ns.getServerMoneyAvailable("home") > ns.singularity.getAugmentationPrice("NeuroFlux Governor") && ns.singularity.getFactionRep(factionWithNeurofluxGovernor) > ns.singularity.getAugmentationRepReq("NeuroFlux Governor")) {
      ns.singularity.purchaseAugmentation(factionWithNeurofluxGovernor, "NeuroFlux Governor");
      ns.tprint("Purchased NeuroFlux Governor from " + factionWithNeurofluxGovernor);
      await ns.sleep(10);
    }
  }
}
export {
  main
};
