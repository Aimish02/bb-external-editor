// servers/home/nuker/nuker.js
async function main(ns) {
  ns.tprint("Nuker Running.");
  let servList = JSON.parse(ns.read("data/optSortedList.json"));
  let hackablePorts = 0;
  if (ns.fileExists("BruteSSH.exe")) {
    hackablePorts++;
  }
  if (ns.fileExists("FTPCrack.exe")) {
    hackablePorts++;
  }
  if (ns.fileExists("RelaySMTP.exe")) {
    hackablePorts++;
  }
  if (ns.fileExists("HTTPWorm.exe")) {
    hackablePorts++;
  }
  if (ns.fileExists("SQLInject.exe")) {
    hackablePorts++;
  }
  for (let i in servList) {
    let neededPorts = ns.getServerNumPortsRequired(servList[i]);
    let openPorts = 0;
    if (hackablePorts >= neededPorts && !ns.hasRootAccess(servList[i])) {
      if (ns.fileExists("BruteSSH.exe") && openPorts < neededPorts) {
        await ns.brutessh(servList[i]);
        openPorts++;
      }
      if (ns.fileExists("FTPCrack.exe") && openPorts < neededPorts) {
        await ns.ftpcrack(servList[i]);
        openPorts++;
      }
      if (ns.fileExists("RelaySMTP.exe") && openPorts < neededPorts) {
        await ns.relaysmtp(servList[i]);
        openPorts++;
      }
      if (ns.fileExists("HTTPWorm.exe") && openPorts < neededPorts) {
        await ns.httpworm(servList[i]);
        openPorts++;
      }
      if (ns.fileExists("SQLInject.exe") && openPorts < neededPorts) {
        await ns.sqlinject(servList[i]);
        openPorts++;
      }
      try {
        await ns.nuke(servList[i]);
        ns.tprint("Hack complete on " + servList[i] + ".");
      } catch (err) {
      }
    } else {
    }
  }
}
export {
  main
};
