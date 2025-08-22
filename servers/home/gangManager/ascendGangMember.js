// servers/home/gangManager/ascendGangMember.js
async function main(ns) {
  let name = ns.args[0];
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
export {
  main
};
