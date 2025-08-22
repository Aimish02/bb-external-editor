// servers/home/backdoor/backdoor.js
async function main(ns) {
  let debug = false;
  let servList = JSON.parse(ns.read("data/hackSortedList.json"));
  if (debug == true) {
    ns.tprint("servList: " + servList);
  }
  servList.reverse();
  if (debug == true) {
    ns.tprint("Reversed servList: " + servList);
  }
  for (let i in servList) {
    if (servList[i] == "home" || servList[i].includes("pserv") || servList[i].includes("hacknet")) {
      continue;
    }
    if (debug == true) {
      ns.tprint("----------");
      ns.tprint("Checking server: " + servList[i]);
      ns.tprint("Has Root Access: " + ns.hasRootAccess(servList[i]));
      ns.tprint("Server Required Hack: " + ns.getServerRequiredHackingLevel(servList[i]));
      ns.tprint("Backdoor installed: " + ns.getServer(servList[i]).backdoorInstalled);
      ns.tprint("----------");
    }
    if (ns.hasRootAccess(servList[i]) && ns.getHackingLevel() > ns.getServerRequiredHackingLevel(servList[i]) && !ns.getServer(servList[i]).backdoorInstalled) {
      let startTime = Date.now();
      ns.tprint("Attempting Backdoor on " + servList[i]);
      await backdoor(ns, servList[i]);
      ns.tprint("Backdoor complete on " + servList[i]);
      let backdoorTime = (Date.now() - startTime) / 1e3;
      ns.tprint("Backdoor process completion time: " + backdoorTime + " seconds.");
    }
  }
}
async function backdoor(ns, targetServer) {
  let debug = false;
  if (debug == true) {
    ns.tprint("Starting getServPath on " + targetServer);
  }
  let serverPath = await getServerPathRecurs(ns, targetServer, ["home"]);
  if (debug == true) {
    ns.tprint("Connecting through server Path: " + serverPath);
  }
  for (let i in serverPath) {
    await ns.singularity.connect(serverPath[i]);
  }
  await ns.singularity.installBackdoor();
  await ns.singularity.connect("home");
}
async function getServerPathRecurs(ns, targetServer, baseServerPath) {
  let debug = false;
  if (debug == true) {
    ns.tprint("Base Server path: " + baseServerPath);
  }
  let serverPath = baseServerPath;
  let serverOptions = ns.scan(baseServerPath[baseServerPath.length - 1]);
  if (serverOptions.includes(targetServer)) {
    serverPath.push(targetServer);
    ns.tprint("Path found:");
    ns.tprint(serverPath);
    return serverPath;
  }
  for (let i in serverOptions) {
    if (serverOptions[i] == "home" || serverOptions[i] == "darkweb" || serverOptions[i].includes("pserv") || serverOptions[i].includes("hacknet")) {
      if (debug == true) {
        ns.tprint("Skipping " + serverOptions[i]);
      }
      continue;
    }
    if (serverPath.includes(serverOptions[i]) || ns.scan(serverOptions[i]).every((r) => serverPath.includes(r))) {
      if (debug == true) {
        ns.tprint("Skipping " + serverOptions[i] + ". No continuing path.");
      }
      continue;
    }
    let tryServerPath = [...baseServerPath];
    tryServerPath.push(serverOptions[i]);
    if (debug == true) {
      ns.tprint("Attempting getServPath on " + tryServerPath[tryServerPath.length - 1]);
    }
    tryServerPath = await getServerPathRecurs(ns, targetServer, tryServerPath);
    if (tryServerPath == "fail") {
      if (debug == true) {
        ns.tprint("PathFailed: " + serverOptions[i]);
      }
      continue;
    } else if (tryServerPath[tryServerPath.length - 1] == targetServer) {
      return tryServerPath;
    } else {
      continue;
    }
  }
  return "fail";
}
export {
  main
};
