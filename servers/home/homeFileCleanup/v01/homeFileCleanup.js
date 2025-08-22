// servers/home/homeFileCleanup/v01/homeFileCleanup.js
async function main(ns) {
  let target = ns.args[0] || "home";
  let fileList = ns.ls(target);
  ns.tprint(fileList, ".js");
  for (let i = 0; i < fileList.length; i++) {
    ns.rm(fileList[i], target);
  }
}
export {
  main
};
