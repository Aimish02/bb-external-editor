// servers/home/gangManager/V02/updateGangMembers.js
async function main(ns) {
  let memberList = ns.gang.getMemberNames();
  let myGang = ns.gang.getGangInformation();
  for (let i in memberList) {
    await ns.run("gangManager/V02/ascendGangMember.js", 1, memberList[i]);
    await ns.run("gangManager/V02/equipGangMember.js", 1, memberList[i]);
    await ns.run("gangManager/V02/assignGangMember.js", 1, memberList[i]);
  }
}
export {
  main
};
