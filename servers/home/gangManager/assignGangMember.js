// servers/home/gangManager/assignGangMember.js
async function main(ns) {
  let name = ns.args[0];
  let twTime = Number(JSON.parse(ns.read("data/twTime.json")));
  let gangInfo = ns.gang.getGangInformation();
  let timeToTW = (Date.now() - twTime) % 2e4;
  let memberInfo = ns.gang.getMemberInformation(name);
  let dStat = 0.75;
  if (timeToTW > 19500 || timeToTW < 500) {
    ns.gang.setMemberTask(name, "Territory Warfare");
  } else {
    let allStatAvg = (memberInfo.agi + memberInfo.def + memberInfo.dex + memberInfo.str) / 4;
    if (gangInfo.wantedPenalty < 0.25) {
      ns.gang.setMemberTask(name, "Vigilante Justice");
    } else if (memberInfo.earnedRespect < 2e5 && allStatAvg > 1e3) {
      ns.gang.setMemberTask(name, "Terrorism");
    } else if (allStatAvg > 1e3) {
      ns.gang.setMemberTask(name, "Human Trafficking");
    } else if (allStatAvg > 250) {
      ns.gang.setMemberTask(name, "Traffick Illegal Arms");
    } else if (allStatAvg > 100) {
      ns.gang.setMemberTask(name, "Armed Robbery");
    } else if (allStatAvg > 50) {
      ns.gang.setMemberTask(name, "Strongarm Civilians");
    } else if (allStatAvg > 20) {
      ns.gang.setMemberTask(name, "Mug People");
    } else {
      ns.gang.setMemberTask(name, "Train Combat");
    }
  }
}
export {
  main
};
