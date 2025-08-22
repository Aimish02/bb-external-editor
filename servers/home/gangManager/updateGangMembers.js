// servers/home/gangManager/updateGangMembers.js
async function main(ns) {
  let memberList = ns.gang.getMemberNames();
  let myGang = ns.gang.getGangInformation();
  for (let i in memberList) {
    await ns.run("gangManager/ascendGangMember.js", 1, memberList[i]);
    await ns.run("gangManager/equipGangMember.js", 1, memberList[i]);
    await ns.run("gangManager/assignGangMember.js", 1, memberList[i]);
  }
}
export {
  main
};
