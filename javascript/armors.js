/* Global variables */

var nbChestArmors = 0;
var nbHeadArmors = 0;
var nbHandsArmors = 0;
var nbFeetArmors = 0;
var nbLegsArmors = 0;
var nbShouldersArmors = 0;

var listChestArmors = [];
var listHeadArmors = [];
var listHandsArmors = [];
var listFeetArmors = [];
var listLegsArmors = [];
var listShouldersArmors = [];

/* Constructors */

function Armor(armor, options)
{
  armor.type = "Armor";
  armor.name = options.name;
  armor.def = options.def;
  armor.price = options.price;
}

function ChestArmor(options)
{
  Armor(this,options);
  this.part = "Chest";
  this.id = nbChestArmors++;
}

function HeadArmor(options)
{
  Armor(this,options);
  this.part = "Head";
  this.id = nbHeadArmors++;
}

function HandsArmor(options)
{
  Armor(this,options);
  this.part = "Hands";
  this.id = nbHandsArmors++;
}

function FeetArmor(options)
{
  Armor(this,options);
  this.part = "Feet";
  this.id = nbFeetArmors++;
}

function LegsArmor(options)
{
  Armor(this,options);
  this.part = "Legs";
  this.id = nbLegsArmors++;
}

function ShouldersArmor(options)
{
  Armor(this,options);
  this.part = "Shoulders";
  this.id = nbShouldersArmors++;
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

var listHandsArmorsJSON = {
  "Nothing" : {"name" : "Nothing", "def" : 0, "price" : 0},
  "Leather gloves" : {"name" : "Leather gloves", "def" : 3, "price" : 30},
};

var listFeetArmorsJSON = {
  "Nothing" : {"name" : "Nothing", "def" : 0, "price" : 0},
  "Leather boots" : {"name" : "Leather boots", "def" : 3, "price" : 30},
};

var listLegsArmorsJSON = {
  "Nothing" : {"name" : "Nothing", "def" : 0, "price" : 0},
  "Leather legguards" : {"name" : "Leather legguards", "def" : 3, "price" : 30},
};

var listShouldersArmorsJSON = {
  "Nothing" : {"name" : "Nothing", "def" : 0, "price" : 0},
  "Leather shoulders" : {"name" : "Leather shoulders", "def" : 3, "price" : 30},
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

for (var property in listHandsArmorsJSON) {
  if (listHandsArmorsJSON.hasOwnProperty(property)) {
    listHandsArmors.push(new HandsArmor(listHandsArmorsJSON[property]));
  }
}

for (var property in listFeetArmorsJSON) {
  if (listFeetArmorsJSON.hasOwnProperty(property)) {
    listFeetArmors.push(new FeetArmor(listFeetArmorsJSON[property]));
  }
}

for (var property in listLegsArmorsJSON) {
  if (listLegsArmorsJSON.hasOwnProperty(property)) {
    listLegsArmors.push(new LegsArmor(listLegsArmorsJSON[property]));
  }
}

for (var property in listShouldersArmorsJSON) {
  if (listShouldersArmorsJSON.hasOwnProperty(property)) {
    listShouldersArmors.push(new ShouldersArmor(listShouldersArmorsJSON[property]));
  }
}