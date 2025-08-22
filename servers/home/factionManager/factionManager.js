// servers/home/factionManager/factionManager.js
async function main(ns) {
  let debug = false;
  if (debug == true) {
    ns.tprint("Running joinFactions from factionManager.");
  }
  await ns.run("factionManager/joinFactions.js");
  if (debug == true) {
    ns.tprint("Running purchaseAugmentations from factionManager.");
  }
  await ns.run("factionManager/purchaseAugmentations.js");
}
export {
  main
};
