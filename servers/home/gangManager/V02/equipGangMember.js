// servers/home/gangManager/V02/equipGangMember.js
async function main(ns) {
  let name = ns.args[0];
  let equipList = ns.gang.getEquipmentNames();
  for (let equip in equipList) {
    let equipType = ns.gang.getEquipmentType(equipList[equip]);
    if (equipList[equip] != "DataJack" && equipList[equip] != "Neuralstimulator" && equipType != "Rootkit" && ns.gang.getEquipmentCost(equipList[equip]) < 0.5 * ns.getServerMoneyAvailable("home")) {
      ns.gang.purchaseEquipment(name, equipList[equip]);
    }
  }
}
export {
  main
};
