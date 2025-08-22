// servers/home/scanner/v03/scanner.js
async function main(ns) {
  let servers = scanner(ns);
  for (let i = 0; i < servers.length; i++) {
    let server = ns.getServer(servers[i]);
    ns.tprint(server.hostname + ":	HackReq:" + server.requiredHackingSkill + "	Growth:" + server.serverGrowth + "	MaxMon:" + ns.formatNumber(server.moneyMax, 1, 1e5));
    if (i = 0) {
      ns.write("serverlist.txt", server.hostname, "w");
    } else {
      ns.write("serverlist.txt", server.hostname, "a");
    }
  }
}
function scanner(ns, sortStyle) {
  sortStyle = ns.args[0] || sortStyle || "hack";
  let thisServer = ns.getHostname();
  let targets1 = ns.scan(thisServer);
  let done = 0;
  while (done == 0) {
    let targets3 = targets1;
    for (let i = 0; i < targets1.length; i++) {
      let targets2 = ns.scan(targets1[i]);
      for (let j = 0; j < targets2.length; j++) {
        if (!targets1.includes(targets2[j]) && targets1 != "home") {
          targets1 = targets1.concat(targets2[j]);
          ns.tprint(targets2[2]);
        }
      }
    }
    if (targets3 == targets1) {
      done++;
    }
  }
  if (sortStyle == "hack") {
    targets1 = targets1.sort(reqHackSort);
  } else if (sortStyle == "moneyToMinSec") {
    targets1 = targets1.sort(moneyToSecRatioSort);
  }
  return targets1;
  function reqHackSort(a, b) {
    let reqHackA = ns.getServerRequiredHackingLevel(a);
    let reqHackB = ns.getServerRequiredHackingLevel(b);
    if (reqHackA > reqHackB)
      return -1;
    if (reqHackA < reqHackB)
      return 1;
    return 0;
  }
  function moneyToSecRatioSort(a, b) {
    let moneyToSecRatioA = ns.getServerMaxMoney(a) * ns.getServerGrowth(a) / ns.getServerMinSecurityLevel(a);
    let moneyToSecRatioB = ns.getServerMaxMoney(b) * ns.getServerGrowth(b) / ns.getServerMinSecurityLevel(b);
    if (moneyToSecRatioA > moneyToSecRatioB)
      return -1;
    if (moneyToSecRatioA < moneyToSecRatioB)
      return 1;
    return 0;
  }
}
export {
  main,
  scanner
};
