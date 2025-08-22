// servers/home/gangManager/V02/gangManager.js
async function main(ns) {
  let gangToJoin = ns.args[0] || "Slum Snakes";
  let myGang;
  let memberList;
  let karma = ns.heart.break();
  if (karma > -54e3) {
    return;
  }
  let singularityRunningScript = ns.getRunningScript("sing-controller/sing-controller.js", "home");
  let singularityRuntime = singularityRunningScript.onlineRunningTime * 1e3;
  let twTime = Number(JSON.parse(ns.read("twTime.json")));
  if (ns.gang.inGang()) {
    myGang = ns.gang.getGangInformation();
    if (!ns.fileExists("twTime.json") && !ns.isRunning("gangManager/V02/getTWTime.js")) {
      await ns.run("gangManager/V02/getTWTime.js");
      ns.tprint("File Missing: Running getTWTime.js");
    } else if (singularityRuntime < Date.now() - Number(JSON.parse(ns.read("twTime.json"))) && !ns.isRunning("gangManager/V02/getTWTime.js")) {
      await ns.run("gangManager/V02/getTWTime.js");
      ns.tprint("Controller Runtime: " + singularityRuntime);
      ns.tprint("Controller Time since file creation: " + (Date.now() - Number(JSON.parse(ns.read("twTime.json")))));
      ns.tprint("File out of date: Running getTWTime.js");
    }
  } else if (!ns.gang.inGang()) {
    ns.gang.createGang(gangToJoin);
  }
  if (ns.gang.canRecruitMember()) {
    await ns.run("gangManager/V02/recruitGangMember.js");
  }
  await ns.run("gangManager/V02/updateGangMembers.js");
  await ns.run("gangManager/V02/setTerritoryClash.js");
}
export {
  main
};
