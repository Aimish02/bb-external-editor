import { setCreationTime } from "./setCreationTime.js";

/** @param {NS} ns **/
export async function main(ns) {
    let player = ns.getPlayer();
    ns.write("data/playerData.txt", JSON.stringify(player), "w");

setCreationTime(ns, "playerData");


}