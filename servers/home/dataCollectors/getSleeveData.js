import { setCreationTime } from "./setCreationTime.js";

/** @param {NS} ns **/
export async function main(ns) {

    let sleeveData = [];
    for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
        sleeveData.push(ns.sleeve.getSleeve(i));
    }
    ns.write("data/sleeveData.txt", JSON.stringify(sleeveData), "w");
    setCreationTime(ns, "sleeveData");
}

