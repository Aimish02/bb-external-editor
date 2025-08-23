// servers/home/sleeveManager/sleeveManager.js
export async function main(ns) {
  let debug = false;

  await ns.exec("dataCollectors/getSleeveData.js", "home");
  let sleeveArray = JSON.parse(ns.read("data/sleeveData.txt"));
  if (debug == true) {
    ns.tprint("DEBUG: Sleeve array from file");
    ns.tprint(sleeveArray);
    ns.tprint("----------");
  }

await ns.exec("dataCollectors/getPlayerData.js", "home");
let player = JSON.parse(ns.read("data/playerData.txt"));
if (debug == true) {
  ns.tprint("DEBUG: Player data from file");
  ns.tprint(player);
  ns.tprint("----------");
}

  for (let i in sleeveArray) {
    let activeSleeve = sleeveArray[i];
    if (debug == true) {
      ns.tprint("----------");
      ns.tprint("DEBUG: Sleeve Number: " + i + ", Shock Value: " + activeSleeve.shock);
      ns.tprint("DEBUG: Player Karma: " + player.karma);
    }
    if (activeSleeve.shock > 50) {
      ns.sleeve.setToShockRecovery(i);
      if (debug == true) {
        ns.tprint("DEBUG: Sleeve Number: " + i + " assigned to Shock Recovery.");
      }
    } else if (player.karma > -54e3) {
      ns.sleeve.setToCommitCrime(i, "Homicide");
      if (debug == true) {
        ns.tprint("DEBUG: Sleeve Number: " + i + " Commit Crime: Homicide.");
      }
    }
  }
}

