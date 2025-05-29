/* 5.6.4 练习：英雄打怪兽的小游戏
  英雄和怪兽都具有攻击力、防御力、生命值、暴击几率（暴击时伤害翻倍）
  攻击伤害 = 攻击力 - 防御力
  伤害最少为1. 
  创建一个英雄和一个怪兽，让它们互相攻击，直到一方死亡，输出整个攻击过程。
*/

function Figure(name, attack, defense, hitPoint, criticalRate) {
  if (new.target === Figure) {
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.hitPoint = hitPoint; // 生命值
    this.criticalRate = criticalRate; // 暴击几率
    this.introduce = function () {
      console.log(
        `${this.name}\t生命：${this.hitPoint}\t攻击：${this.attack}\t防御：${this.defense}\t暴击率：${this.criticalRate}%`
      );
    };
    this.toAttack = function (figure) {
      // 攻击伤害 = 攻击力 - 防御力
      var damage = this.attack - figure.defense;
      figure.hitPoint -= damage;
      if (figure.hitPoint < 0) {
        figure.hitPoint = 0;
      }
      console.log(
        `【${this.name}】攻击【${figure.name}】，造成【${damage}】点伤害，对方当前血量为【${figure.hitPoint}】`
      );
    };
    this.toCritical = function (figure) {
      // 暴击几率（暴击时伤害翻倍）
      var damage = (this.attack - figure.defense) * 2;
      figure.hitPoint -= damage;
      if (figure.hitPoint < 0) {
        figure.hitPoint = 0;
      }
      console.log(
        `暴击！【${this.name}】攻击【${figure.name}】，造成【${damage}】点伤害，对方当前血量为【${figure.hitPoint}】`
      );
    };
  } else {
    // return {
    //   name: name,
    //   attack: attack,
    //   defense: defense,
    //   hitPoint: hitPoint, // 生命值
    //   criticalRate: criticalRate, // 暴击几率
    //   introduce: function () {
    //     console.log(
    //       `${this.name}\t生命：${this.hitPoint}\t攻击：${this.attack}\t防御：${this.defense}\t暴击率：${this.criticalRate}%`
    //     );
    //   },
    // };
  }
}

var cheng = new Figure("成哥", 100, 20, 500, 30);
cheng.introduce();

console.log("VS");

var deng = new Figure("邓哥", 120, 40, 400, 5);
deng.introduce();

cheng.toCritical(deng);

deng.toAttack(cheng);

cheng.toCritical(deng);

deng.toCritical(cheng);

cheng.toCritical(deng);

deng.toAttack(cheng);

cheng.toCritical(deng);

console.log("========================");
cheng.introduce();
deng.introduce();
console.log('游戏结束！');
