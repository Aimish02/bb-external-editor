// servers/home/blackMarket/blackMarket.js
async function main(ns) {
  ns.singularity.purchaseTor();
  let darkWebPrograms = ns.singularity.getDarkwebPrograms();
  for (let i in darkWebPrograms) {
    let program = darkWebPrograms[i];
    let programCost = ns.singularity.getDarkwebProgramCost(program);
    let playerMoney = ns.getServerMoneyAvailable("home");
    if (!ns.fileExists(program) && playerMoney > programCost) {
      ns.singularity.purchaseProgram(program);
      ns.tprint("Purchased " + program + " from the dark web.");
    }
    ;
  }
}
export {
  main
};
