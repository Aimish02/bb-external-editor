// servers/home/gangManager/V02/setTerritoryClash.js
async function main(ns) {
  let debug = false;
  let otherGangInfo = ns.gang.getOtherGangInformation();
  let sumOfClashWinChance = 0;
  let averageClashWinChance = 0;
  let gangsInPlay = 0;
  if (debug == true) {
    ns.tprint(otherGangInfo);
    ns.tprint(otherGangInfo.length);
  }
  for (let i in otherGangInfo) {
    if (i != "Slum Snakes") {
      otherGangInfo[i].clashWinChance = ns.gang.getChanceToWinClash(i);
      if (otherGangInfo[i].territory > 5e-3) {
        sumOfClashWinChance = sumOfClashWinChance + otherGangInfo[i].clashWinChance;
        gangsInPlay++;
      }
      if (debug == true) {
        ns.tprint(i + " clash win chance is " + otherGangInfo[i].clashWinChance);
        ns.tprint("Sum of clash win chance is " + sumOfClashWinChance);
        ns.tprint("Gangs in play: " + gangsInPlay);
      }
    }
  }
  averageClashWinChance = sumOfClashWinChance / gangsInPlay;
  if (debug == true) {
    ns.tprint("Average clash win chance is " + averageClashWinChance);
  }
  if (averageClashWinChance > 0.6) {
    ns.gang.setTerritoryWarfare(true);
    if (debug == true) {
      ns.tprint("Territory clashes engaged.");
    }
  } else {
    ns.gang.setTerritoryWarfare(false);
    if (debug == true) {
      ns.tprint("Territory clashes disengaged.");
    }
  }
}
export {
  main
};
