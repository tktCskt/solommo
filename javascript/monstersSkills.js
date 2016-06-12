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
  this.effect = function(monsterName,player, monsters, target, damage)
  {
    if (Math.random() * 100 < this.percentProc) {
      log(monsterName + "heal his allies !", "INFO");
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

var opts_healRabbit = {
  fixedValue : 10,
  percentValue : 0,
percentProc : 100   };
var healRabbit = new healAllies(opts_healRabbit);