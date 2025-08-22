// servers/home/gangManager/V01/gangManager.js
async function main(ns) {
  let gangToJoin = ns.args[0] || "Slum Snakes";
  let myGang;
  let memberList;
  let twTime = 0;
  let dtTW = 0;
  let dtTWIntegrator = 0;
  if (ns.gang.inGang()) {
    myGang = ns.gang.getGangInformation();
  }
  while (!ns.gang.inGang()) {
    ns.gang.createGang(gangToJoin);
    ns.tprint("Your karma is: " + ns.heart.break());
    await ns.sleep(3e4);
  }
  ns.gang.recruitMember("GM_1");
  myGang = ns.gang.getGangInformation();
  memberList = ns.gang.getMemberNames();
  while (true) {
    while (ns.gang.canRecruitMember()) {
      recruitNewMembers(ns, memberList[memberList.length - 1]);
      memberList = ns.gang.getMemberNames();
      myGang = ns.gang.getGangInformation();
      await ns.sleep(10);
    }
    while (dtTW == 0) {
      let startPwr = ns.gang.getOtherGangInformation()["The Black Hand"].power;
      await ns.sleep(10);
      let endPwr = ns.gang.getOtherGangInformation()["The Black Hand"].power;
      if (startPwr != endPwr && twTime == 0) {
        twTime = Date.now();
        ns.tprint("twTime:" + twTime);
        startPwr = 0;
        endPwr = 0;
      } else if (twTime != 0 && startPwr != endPwr) {
        dtTW = Date.now() - twTime;
        ns.tprint("dtTW:" + dtTW);
        dtTW = 2e4;
      }
    }
    for (let i = 0; i < memberList.length; i++) {
      updateMember(ns, memberList[i], twTime);
    }
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
function updateMember(ns, name, twTime) {
  ascendGangMember(ns, name);
  equipMember(ns, name);
  assignMember(ns, name, twTime);
}
function ascendGangMember(ns, name) {
  if (shouldAscendGangMember(ns, name)) {
    ns.gang.ascendMember(name);
  }
}
function shouldAscendGangMember(ns, name) {
  const memberInfo = ns.gang.getMemberInformation(name);
  const nextAscensionStats = ns.gang.getAscensionResult(name);
  if (nextAscensionStats == void 0) {
    return false;
  }
  ;
  const currentAscensionStats = {
    agi: memberInfo.agi_asc_mult,
    cha: memberInfo.cha_asc_mult,
    def: memberInfo.def_asc_mult,
    dex: memberInfo.dex_asc_mult,
    hack: memberInfo.hack_asc_mult,
    respect: memberInfo.earnedRespect,
    str: memberInfo.str_asc_mult
  };
  const ascensionDifference = [
    nextAscensionStats.agi * currentAscensionStats.agi - currentAscensionStats.agi,
    nextAscensionStats.cha * currentAscensionStats.cha - currentAscensionStats.cha,
    nextAscensionStats.def * currentAscensionStats.def - currentAscensionStats.def,
    nextAscensionStats.dex * currentAscensionStats.dex - currentAscensionStats.dex,
    nextAscensionStats.str * currentAscensionStats.str - currentAscensionStats.str
  ];
  let totalAsc = 0;
  for (let number in ascensionDifference) {
    totalAsc += ascensionDifference[number];
  }
  let avgAsc = totalAsc / ascensionDifference.length;
  return avgAsc > 2;
}
function equipMember(ns, name) {
  let equipList = ns.gang.getEquipmentNames();
  for (let equip in equipList) {
    let equipType = ns.gang.getEquipmentType(equipList[equip]);
    if (equipList[equip] != "DataJack" && equipList[equip] != "Neuralstimulator" && equipType != "Rootkit" && ns.gang.getEquipmentCost(equipList[equip]) < 0.05 * ns.getServerMoneyAvailable("home")) {
      ns.gang.purchaseEquipment(name, equipList[equip]);
    }
  }
}
function assignMember(ns, name, twTime) {
  let gangInfo = ns.gang.getGangInformation();
  let timeToTW = (Date.now() - twTime) % 2e4;
  let avgStats = getAverageCombatStats(ns, name);
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
function getAverageCombatStats(ns, name) {
  let memberList = ns.gang.getMemberNames();
  let totalAgi = 0;
  let totalDef = 0;
  let totalDex = 0;
  let totalStr = 0;
  for (let i = 0; i < memberList.length; i++) {
    if (memberList[i] == name) {
      continue;
    } else {
      let memberInfo = ns.gang.getMemberInformation(memberList[i]);
      totalAgi += memberInfo.agi;
      totalDef += memberInfo.def;
      totalDex += memberInfo.dex;
      totalStr += memberInfo.str;
    }
  }
  let avgAgi = totalAgi / (memberList.length - 1);
  let avgDef = totalDef / (memberList.length - 1);
  let avgDex = totalDex / (memberList.length - 1);
  let avgStr = totalStr / (memberList.length - 1);
  return { agi: avgAgi, def: avgDef, dex: avgDex, str: avgStr };
}
export {
  main
};
