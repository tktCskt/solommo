/* Global variables */

var nbChestArmors = 0;
var nbHeadArmors = 0;

var listChestArmors = [];
var listHeadArmors = [];

/* Constructors */

function ChestArmor(options)
{
  this.type = "Armor";
  this.name = options.name;
  this.def = options.def;
  this.price = options.price;
  this.id = nbChestArmors++;
}

function HeadArmor(options)
{
  this.type = "Head armor";
  this.name = options.name;
  this.def = options.def;
  this.price = options.price;
  this.id = nbHeadArmors++;
}

/* JSON */
var listChestArmorsJSON = {
  "Nothing" : {"name" : "Nothing", "def" : 0, "price" : 0},
  "Rags" : {"name" : "Rags", "def" : 1, "price" : 5},
  "Cloth armor" : {"name" : "Cloth armor", "def" : 5, "price" : 50},
  "Leather armor" : {"name" : "Leather armor", "def" : 10, "price" : 85},
};

var listHeadArmorsJSON = {
  "Nothing" : {"name" : "Nothing", "def" : 0, "price" : 0},
  "Leather helmet" : {"name" : "Leather helmet", "def" : 3, "price" : 30},
};


/* Init */

for (var property in listChestArmorsJSON) {
  if (listChestArmorsJSON.hasOwnProperty(property)) {
    listChestArmors.push(new ChestArmor(listChestArmorsJSON[property]));
  }
}

for (var property in listHeadArmorsJSON) {
  if (listHeadArmorsJSON.hasOwnProperty(property)) {
    listHeadArmors.push(new HeadArmor(listHeadArmorsJSON[property]));
  }
}
