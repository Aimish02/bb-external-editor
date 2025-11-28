export async function main(ns){
    let debug = false;
    ns.disableLog("ALL");


    if (debug == true){ns.ui.openTail();}

//    if (debug == true){
        ns.print("DEBUG: ----------");
        ns.print("DEBUG: Upgrading home server.");
//    }
    
    //Initialize data variables and collect data.
    ns.exec("dataCollectors/getPlayerData.js","home");
    
    let playerData = JSON.parse(ns.read("data/playerData.txt"));
    let playerMoney = playerData.money;
    let homeServer = ns.getServer("home");
    let homeRam = homeServer.maxRam;
    let homeRamCost = ns.singularity.getUpgradeHomeRamCost();
//    if (debug == true){
        ns.print("DEBUG: Home server RAM: " + homeRam);
        ns.print("DEBUG: Home server RAM upgrade cost: " + homeRamCost);
        ns.print("DEBUG: Player Money: " + playerMoney);
//    }
    //----------

    //Main logic
    if ( (.3 * playerMoney) > homeRamCost){
//        if (debug == true){
            ns.print("DEBUG: Upgrading home server RAM.");
//        }
        ns.singularity.upgradeHomeRam();
        let newHomeServer = ns.getServer("home");
        let newHomeRam = newHomeServer.maxRam;
//        if (debug == true){
            ns.print("DEBUG: New Home server RAM: " + newHomeRam);
            ns.print("----------");
//        }
    } else {
//        if (debug == true){
            ns.print("DEBUG: Not enough money to upgrade home server RAM.");
            ns.print("----------");
//        }
    }
    //----------
}