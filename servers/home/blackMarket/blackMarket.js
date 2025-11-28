// servers/home/blackMarket/blackMarket.js
async function main(ns) {

let debug = false;
if (debug == true) {ns.ui.openTail();}

  ns.singularity.purchaseTor();
  let darkWebPrograms = ns.singularity.getDarkwebPrograms();
  for (let i in darkWebPrograms) {
    let program = darkWebPrograms[i];
    let programCost = ns.singularity.getDarkwebProgramCost(program);
    let playerMoney = ns.getServerMoneyAvailable("home");
    if (!ns.fileExists(program) && playerMoney > programCost) {
      ns.singularity.purchaseProgram(program);
      ns.print("Purchased " + program + " from the dark web.");
    }
    ;
  }
}
export {
  main
};
