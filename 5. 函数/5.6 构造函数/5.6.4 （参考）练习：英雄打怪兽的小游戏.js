/* 5.6.4 练习：英雄打怪兽的小游戏
  英雄和怪兽都具有攻击力、防御力、生命值、暴击几率（暴击时伤害翻倍）
  攻击伤害 = 攻击力 - 防御力
  伤害最少为1. 
  创建一个英雄和一个怪兽，让它们互相攻击，直到一方死亡，输出整个攻击过程。
*/

/**
 *
 * @param {*} name 角色名
 * @param {*} attack 攻击力
 * @param {*} defense 防御力
 * @param {*} hitPoint 生命值
 * @param {*} criticalRate 暴击几率（0 ~ 100）
 */
function Character(name, attack, defense, hitPoint, criticalRate) {
  if (new.target === Character) {
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.hitPoint = hitPoint; // 生命值
    this.criticalRate = criticalRate; // 暴击几率
    this.print = function () {
      console.log(
        `${this.name}\t生命：${this.hitPoint}\t攻击：${this.attack}\t防御：${this.defense}\t暴击率：${this.criticalRate}%`
      );
    };
    /**
     * 攻击
     * @param {*} character 攻击对象
     * @returns 生命值是否为0（是否死亡），是返回true，否则返回false
     */
    this.hit = function (character) {
      // 攻击伤害 = 攻击力 - 防御力
      var damage = this.attack - character.defense;

      // 是否暴击
      var isCritical = false;

      var randomNum = Math.random();

      // 暴击条件，随机数 <= 当前角色的暴击率
      if (randomNum <= this.criticalRate) {
        isCritical = true;
        // 暴击几率（暴击时伤害翻倍）
        damage *= 2;
      }

      // 伤害最少为1
      if (damage < 1) {
        damage = 1;
      }

      character.hitPoint -= damage;

      if (character.hitPoint < 0) {
        character.hitPoint = 0;
      }
      console.log(
        `${isCritical ? "暴击！" : ""}【${this.name}】攻击【${
          character.name
        }】，造成【${damage}】点伤害，对方当前血量为【${character.hitPoint}】`
      );

      // 生命值是否为0（是否死亡）
      return character.hitPoint === 0;
    };
  }
}

var hero = new Character("英雄", 100, 20, 500, 30);
hero.print();

console.log("VS");

var monster = new Character("怪兽", 120, 40, 400, 5);
monster.print();

while (true) {
  if (hero.hit(monster)) {
    break;
  }
  if (monster.hit(hero)) {
    break;
  }
}

console.log("========================");
hero.print();
monster.print();
console.log("游戏结束！");
