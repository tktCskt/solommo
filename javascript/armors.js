nbChestArmors = 0;

function chestArmor(options)
{
  this.type = "Armor";
  this.name = options.name;
  this.def = options.def;
  this.price = options.price;
  this.id = nbChestArmors++;
}

/* JSON */
var listChestArmorsJSON = {
  "Nothing" : {"name" : "Nothing", "def" : 0, "price" : 0},
  "Rags" : {"name" : "Rags", "def" : 1, "price" : 5},
  "Cloth armor" : {"name" : "Cloth armor", "def" : 5, "price" : 50},
  "Leather armor" : {"name" : "Leather armor", "def" : 10, "price" : 85},
};


var listChestArmors = [];

for (var property in listChestArmorsJSON) {
  if (listChestArmorsJSON.hasOwnProperty(property)) {
    listChestArmors.push(new chestArmor(listChestArmorsJSON[property]));
  }
}
