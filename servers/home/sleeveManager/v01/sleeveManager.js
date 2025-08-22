// servers/home/sleeveManager/v01/sleeveManager.js
async function main(ns) {
  let debug = false;
  let sleeveNumber = ns.sleeve.getNumSleeves();
  if (debug == true) {
    ns.tprint("sleeveNumber: " + sleeveNumber);
  }
  let sleeveArray = [];
  for (let i = 0; i < sleeveNumber; i++) {
    sleeveArray[i] = ns.sleeve.getSleeve(i);
  }
  ;
  if (debug == true) {
    ns.tprint("DEBUG: Sleeve array");
    ns.tprint(sleeveArray);
  }
  for (let i in sleeveArray) {
    let activeSleeve = sleeveArray[i];
    if (debug == true) {
      ns.tprint("----------");
      ns.tprint("DEBUG: Sleeve Number: " + i + ", Shock Value: " + activeSleeve.shock);
      ns.tprint("DEBUG: Player Karma: " + ns.getPlayer().karma);
    }
    if (activeSleeve.shock > 50) {
      ns.sleeve.setToShockRecovery(i);
      if (debug == true) {
        ns.tprint("DEBUG: Sleeve Number: " + i + " assigned to Shock Recovery.");
      }
    } else if (ns.getPlayer().karma > -54e3) {
      ns.sleeve.setToCommitCrime(i, "Homicide");
      if (debug == true) {
        ns.tprint("DEBUG: Sleeve Number: " + i + " Commit Crime: Homicide.");
      }
    }
  }
}
export {
  main
};
