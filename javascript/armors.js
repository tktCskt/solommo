nbChestArmors = 0;

function chestArmor(options)
{
  this.type = "Armor";
  this.name = options.name;
  this.def = options.def;
  this.price = options.price;
  this.id = nbChestArmors++;
}

var opts_nothing = {"name" : "Nothing", "def" : 0, "price" : 0};
var opts_rags = {"name" : "Rags", "def" : 1, "price" : 5};
var opts_clothArmor = {"name" : "Cloth armor", "def" : 5, "price" : 50};
var opts_leatherArmor = {"name" : "Leather armor", "def" : 10, "price" : 85};


var listChestArmors = [new chestArmor(opts_nothing), new chestArmor(opts_rags), new chestArmor(opts_clothArmor), new chestArmor(opts_leatherArmor)];
