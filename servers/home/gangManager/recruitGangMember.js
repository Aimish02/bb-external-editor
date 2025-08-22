// servers/home/gangManager/recruitGangMember.js
async function main(ns) {
  ns.gang.recruitMember("GM_1");
  let myGang = ns.gang.getGangInformation();
  let memberList = ns.gang.getMemberNames();
  while (ns.gang.canRecruitMember()) {
    recruitNewMembers(ns, memberList[memberList.length - 1]);
    memberList = ns.gang.getMemberNames();
    myGang = ns.gang.getGangInformation();
    await ns.sleep(10);
  }
}
function recruitNewMembers(ns, memberName) {
  let parsedName = parseName(ns, memberName);
  let newName;
  let newMemberNumber = Number(parsedName[1]) + 1;
  newName = "GM_" + newMemberNumber;
  ns.gang.recruitMember(newName);
  ns.tprint("Recruited " + newName + " to your gang.");
}
function parseName(ns, name) {
  let splitName = name.split("_");
  return splitName;
}
export {
  main
};
