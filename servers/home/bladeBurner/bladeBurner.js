// servers/home/bladeBurner/bladeBurner.js
async function main(ns) {
  try {
    upgradeBladeBurnerSkills();
  } catch (err) {
  }
  function chooseBladeburnerGoal() {
    let goals;
    let player = ns.getPlayer();
    if (player.hp.current / player.hp.max < 0.3) {
      ns.bladeburner.startAction("General", "Hyperbolic Regeneration Chamber");
    } else if (ns.bladeburner.getCityChaos() > 5) {
      ns.bladeburner.startAction("General", "Diplomacy");
    }
    ;
  }
  function upgradeBladeBurnerSkills() {
    let skillList = ns.bladeburner.getSkillNames();
    for (let i in skillList) {
      let skill = skillList[i];
      let skillPoints = ns.bladeburner.getSkillPoints();
      let upgradeCost = ns.bladeburner.getSkillUpgradeCost(skill);
      if (skillPoints > upgradeCost) {
        ns.bladeburner.upgradeSkill(skill);
        ns.tprint("Bladeburner skill " + skill + " upgraded.");
      }
    }
  }
}
export {
  main
};
