async function main(ns) {
    //Empty function as this is a library file    
    //test
}

export function setCreationTime(ns, dataName){

    let creationTimes = {};
    if(ns.fileExists("data/creationTime.txt")){
        creationTimes = JSON.parse(ns.read("data/creationTime.txt"));
        creationTimes[dataName] = Date.now();
    }
    else{
        creationTimes[dataName] = Date.now();
    }
    ns.write("data/creationTime.txt", JSON.stringify(creationTimes), "w");

}