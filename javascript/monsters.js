function loot(item, percentage)
{
  this.item = item;
  this.percentage = percentage;
}

nbMonsters = 0;

function monster(options)
{
  this.id = nbMonsters++;
  this.name = options.name;
  this.maxHP = options.maxHP;
  this.currHP = this.maxHP;
  this.atk = options.atk;
  this.XP = options.XP;
  this.img = options.img;
  this.exist = true;
  /*Loot */
  this.loots = [];
  for(var i=0; i< options.loot.length; i+=2)
  {
    var l = {"item":listCraftItems[options.loot[i]], "percentage":options.loot[i+1]};
    this.loots.push(l);
  }
}


/* JSON */
var listMonstersJSON = {
  "Rabbit" : {"name":"Rabbit", "maxHP":16, "atk":5, "loot":[0,100,1,100], "XP":10, "img":"images/rabbit.png"},
  "Chicken" : {"name":"Chicken", "maxHP":30, "atk":10, "loot":[2,100,3,50], "XP":25,"img":"images/chicken.png"},
  "Blood rabbit" : {"name":"Blood Rabbit", "maxHP":85, "atk":35, "loot":[], "XP":70, "img":"images/bloodrabbit.png"},
};

/*xp*/
listMonsters = [];

for (var property in listMonstersJSON) {
  if (listMonstersJSON.hasOwnProperty(property)) {
    listMonsters.push(new monster(listMonstersJSON[property]));
  }
}