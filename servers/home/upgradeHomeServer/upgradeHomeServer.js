export async function main(ns){
    let debug = true;
    if (debug == true){
        ns.tprint("DEBUG: ----------");
        ns.tprint("DEBUG: Upgrading home server.");
    }
    
    //Initialize data variables and collect data.
    ns.exec("dataCollectors/getPlayerData.js","home");
    
    let playerData = JSON.parse(ns.read("data/playerData.txt"));
    let playerMoney = playerData.money;
    let homeServer = ns.getServer("home");
    let homeRam = homeServer.maxRam;
    let homeRamCost = ns.singularity.getUpgradeHomeRamCost();
    if (debug == true){
        ns.tprint("DEBUG: Home server RAM: " + homeRam);
        ns.tprint("DEBUG: Home server RAM upgrade cost: " + homeRamCost);
        ns.tprint("DEBUG: Player Money: " + playerMoney);
    }
    //----------

    //Main logic
    if ( (.3 * playerMoney) > homeRamCost){
        if (debug == true){
            ns.tprint("DEBUG: Upgrading home server RAM.");
        }
        ns.singularity.upgradeHomeRam();
        let newHomeServer = ns.getServer("home");
        let newHomeRam = newHomeServer.maxRam;
        if (debug == true){
            ns.tprint("DEBUG: New Home server RAM: " + newHomeRam);
            ns.tprint("----------");
        }
    } else {
        if (debug == true){
            ns.tprint("DEBUG: Not enough money to upgrade home server RAM.");
            ns.tprint("----------");
        }
    }
    //----------
}