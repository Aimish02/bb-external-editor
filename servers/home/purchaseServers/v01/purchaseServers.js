// servers/home/purchaseServers/v01/purchaseServers.js
async function main(ns) {
  const ram = ns.args[0] || 64;
  let i = 0;
  while (i < ns.getPurchasedServerLimit()) {
    if (ns.getServerMoneyAvailable("home") * 0.3 > ns.getPurchasedServerCost(ram)) {
      let hostname = ns.purchaseServer("pserv-" + i, ram);
      ++i;
    }
    await ns.sleep(1e3);
  }
}
export {
  main
};
