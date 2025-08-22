// servers/home/basic/grow-server.js
async function main(ns) {
  let target = ns.args[0] || "n00dles";
  let delay = ns.args[1] + ns.args[2] - Date.now() || -1;
  if (delay > 0) {
    ns.print("Delay: " + delay + " ms");
    await ns.sleep(delay);
  }
  await ns.grow(target);
}
export {
  main
};
