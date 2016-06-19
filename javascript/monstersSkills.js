/*
  Skills for monsters.
  name : name of the skill.
  fixed/percentvalue : value fo the skill
  percentProc : the percentage to trigger the skill
  order : when does it trigger in a fight (1 at the begining, 5 at the end)
  effect : a function which determine the effect of the skill
  
  an effect function has the following prototype :
  void function (String monsterName, player, monster[] monsters, int target, int damage)
  
  monsterName is the name of the monster who has the skill.
  monsters are the monsters in the fight
  iMonsterTargeted is an int to know wich monster has been attacked by the player
  playerToMonsterDamage is the amount of damage the player dealt to his target
*/

function monsterSkill(skill, options)
{
  skill.fixedValue = options.fixedValue;
  skill.percentValue = options.percentValue;
  skill.percentProc = options.percentProc;
}

/*
  Skill which heal other monsters.
*/
function healAllies(options)
{
  monsterSkill(this,options);
  this.order = 5;
  this.effect = function(icaster, player, monsters, target, damage)
  {
    if (Math.random() * 100 < this.percentProc) {
      log(monsters[icaster].name + "heal his allies !", "INFO");
      for(var i = 0; i < monsters.length; i++)
      {
        if(monsters[i].exist)
        {
          changemHP(i,this.fixedValue + this.percentValue * monsters[i].maxHP);
        }
      }
    }
  };
}  

/* 
  Skill which can take a hit instead of another ally
*/
function tank(options)
{
  monsterSkill(this,options);
  this.order = 2;
  this.effect = function(icaster,player, monsters, target, damage)
  {
  console.log("lulz "+damage);
    if (damage != 0 && Math.random() * 100 < this.percentProc)
    {
  console.log("test");
      log(monsters[icaster].name + "take the hit to protect his ally !", "INFO");
      changemHP(icaster, damage);
      damage = 0;
    }
    return damage;
  }
}

var opts_healRabbit = {
  fixedValue : 10,
  percentValue : 0,
percentProc : 100   };
var opts_tankRabbit = {
  fixedValue : 0,
  percentValue : 0,
  percentProc : 50 
}
var healRabbit = new healAllies(opts_healRabbit);
var tankRabbit = new tank(opts_tankRabbit);