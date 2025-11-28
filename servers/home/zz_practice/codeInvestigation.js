
export async function main(ns){ 

    /*
const runningScripts = ns.ps("home");
ns.tprint(runningScripts);


for (const script of runningScripts) {
  ns.tprint(script);
  ns.tprint(`${script.filename} ${script.threads}`);
  ns.tprint(script.args);
}*/
ns.ui.openTail();
let runningScript = ns.getRunningScript("sing-controller/sing-controller.js", "home");

ns.print("----------");
ns.print("----------");
ns.print(runningScript);
ns.print("----------");
ns.print("----------");


}