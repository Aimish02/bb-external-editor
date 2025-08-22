// servers/home/scanner/scanner.js
async function main(ns) {
  let thisServer = ns.getHostname();
  let serverList = ns.scan(thisServer);
  let done = 0;
  while (done == 0) {
    let serverListComparison = serverList;
    for (let i = 0; i < serverList.length; i++) {
      let serversToAdd = ns.scan(serverList[i]);
      for (let j = 0; j < serversToAdd.length; j++) {
        if (!serverList.includes(serversToAdd[j])) {
          serverList = serverList.concat(serversToAdd[j]);
        }
      }
    }
    if (serverListComparison == serverList) {
      done = 1;
    }
  }
  let hackSortedList = serverList.sort(reqHackSort);
  let hackSortedJson = JSON.stringify(hackSortedList);
  ns.write("data/hackSortedList.json", hackSortedJson, "w");
  let optSortedList = serverList.sort(moneyToSecRatioSort);
  let optSortedJson = JSON.stringify(optSortedList);
  ns.write("data/optSortedList.json", optSortedJson, "w");
  ns.tprint("Scan files updated.");
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
  main
};
