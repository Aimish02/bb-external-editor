// servers/home/purchaseServers/purchaseServers.js
async function main(ns) {
  ns.tprint("Purchasing Servers.");
  const ram = ns.args[0] || 64;
  if (ns.getPurchasedServers().length < ns.getPurchasedServerLimit()) {
    while (ns.getPurchasedServers().length < ns.getPurchasedServerLimit() && ns.getServerMoneyAvailable("home") * 0.3 > ns.getPurchasedServerCost(ram)) {
      let hostname = ns.purchaseServer("pserv-" + ns.getPurchasedServers().length, ram);
      ns.tprint("Purchased: " + hostname);
      await ns.sleep(10);
    }
  } else if (ns.getPurchasedServers().length == ns.getPurchasedServerLimit()) {
    let purchasedServers = ns.getPurchasedServers();
    for (let i in purchasedServers) {
      let server = ns.getServer(purchasedServers[i]);
      let maxRam = ns.getPurchasedServerMaxRam();
      let upgradeCost = ns.getPurchasedServerUpgradeCost(server.hostname, 2 * server.maxRam);
      let currentMoney = ns.getServerMoneyAvailable("home");
      if (server.maxRam < maxRam && upgradeCost < 0.3 * currentMoney) {
        ns.upgradePurchasedServer(purchasedServers[i], 2 * server.maxRam);
        ns.tprint("Upgraded " + server.hostname + " to " + server.maxRam + "GB RAM.");
      }
    }
  }
}
export {
  main
};
