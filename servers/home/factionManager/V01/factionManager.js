// servers/home/factionManager/V01/factionManager.js
async function main(ns) {
  let debug = false;
  if (debug == true) {
    ns.tprint("Running joinFactions from factionManager.");
  }
  await ns.run("factionManager/V01/joinFactions.js");
  if (debug == true) {
    ns.tprint("Running purchaseAugmentations from factionManager.");
  }
  await ns.run("factionManager/V01/purchaseAugmentations.js");
}
export {
  main
};
