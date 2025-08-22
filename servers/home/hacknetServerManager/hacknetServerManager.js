// servers/home/hacknetServerManager/hacknetServerManager.js
async function main(ns) {
  let numNodes = ns.hacknet.numNodes();
  let numHashes = ns.hacknet.numHashes();
  while (true) {
    numNodes = ns.hacknet.numNodes();
    numHashes = ns.hacknet.numHashes();
    if (numHashes > 0.9 * ns.hacknet.hashCapacity()) {
      ns.hacknet.spendHashes("Sell for Money", "1", Math.trunc((numHashes - 0.9 * ns.hacknet.hashCapacity()) / 4));
    }
    if (ns.getServerMoneyAvailable("home") * 0.1 > ns.hacknet.getPurchaseNodeCost()) {
      ns.hacknet.purchaseNode();
    }
    for (let i = 0; i < numNodes; i++) {
      if (ns.getServerMoneyAvailable("home") * 0.1 > ns.hacknet.getLevelUpgradeCost(i, 1)) {
        ns.hacknet.upgradeLevel(i, 1);
      } else if (ns.getServerMoneyAvailable("home") * 0.1 > ns.hacknet.getRamUpgradeCost(i, 1)) {
        ns.hacknet.upgradeRam(i, 1);
      } else if (ns.getServerMoneyAvailable("home") * 0.1 > ns.hacknet.getCoreUpgradeCost(i, 1)) {
        ns.hacknet.upgradeCore(i, 1);
      } else if (ns.getServerMoneyAvailable("home") * 0.1 > ns.hacknet.getCacheUpgradeCost(i, 1)) {
        ns.hacknet.upgradeCache(i, 1);
      }
    }
    await ns.sleep(1e3);
  }
}
export {
  main
};
