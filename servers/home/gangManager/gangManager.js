// servers/home/gangManager/gangManager.js
export async function main(ns) {
  let gangToJoin = ns.args[0] || "Slum Snakes";
  let myGang;
  let memberList;
  let karma = ns.heart.break();
  if (karma > -54e3) {
    return;
  }
  let singularityRunningScript = ns.getRunningScript("sing-controller/sing-controller.js", "home");
  let singularityRuntime = singularityRunningScript.onlineRunningTime * 1e3;



  let twTime;
  
  if (ns.gang.inGang()) {
    myGang = ns.gang.getGangInformation();
    if (!ns.fileExists("data/twTime.txt") && !ns.isRunning("gangManager/getTWTime.js")) {
      await ns.run("gangManager/getTWTime.js");
      ns.tprint("File Missing: Running getTWTime.js");
    } 
    twTime = Number(JSON.parse(ns.read("data/twTime.txt")))
    if (singularityRuntime < (Date.now() - twTime) && !ns.isRunning("gangManager/getTWTime.js")) {
      await ns.run("gangManager/getTWTime.js");
      ns.tprint("Controller Runtime: " + singularityRuntime);
      ns.tprint("Controller Time since file creation: " + (Date.now() - twTime));
      ns.tprint("File out of date: Running getTWTime.js");
      twTime = Number(JSON.parse(ns.read("data/twTime.txt")))
    }

  } else if (!ns.gang.inGang()) {
    ns.gang.createGang(gangToJoin);
  }

  if (ns.gang.canRecruitMember()) {
    await ns.run("gangManager/recruitGangMember.js");
  }
  await ns.run("gangManager/updateGangMembers.js");
  await ns.run("gangManager/setTerritoryClash.js");
}

