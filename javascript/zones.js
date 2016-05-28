/* Global variables */

var nbZones = 0;
var listZones = [];

/* Constructors */

function Zone(zone, options) {
  zone.name = options.name;
  zone.listResources = options.listResources;
  zone.resourcesRate = options.resourcesRate;
  nbZones++;
}

function HuntingZone(options) {
  Zone(this, options);
  this.isHuntingZone = true;
  this.isDungeonZone = false;
  this.listMonsters = options.listMonsters;
  this.monstersRate = options.monstersRate;
}

function SafeZone(options) {
   Zone(this, options); 
   this.isHuntingZone = false;
   this.isDungeonZone = false;
}

function DungeonZone(options) {
   Zone(this, options);
   this.spawnNumber = 0;
   this.maxSpawn = options.maxSpawn;
   this.isHuntingZone = false;
   this.isDungeonZone = true;
   this.listMonsters = options.listMonsters;
   this.monstersRate = options.monstersRate;
   this.boss = options.boss;
}

/* JSON */

var listHuntingZonesJSON = {
  "Knajo fields" : {"name" : "Knajo fields", "listMonsters" : [searchByName(listMonsters,"Rabbit"),searchByName(listMonsters,"Chicken"),searchByName(listMonsters,"Blood Rabbit")], "monstersRate" : [60,95,100], "listResources" : [searchByName(listCraftItems,"Iron"),searchByName(listCraftItems,"Copper")], "resourcesRate" : [75,75]},
  "Wheatcity - Tavern" : {"name" : "Wheatcity - Tavern", "listMonsters" : [searchByName(listMonsters,"Wheatcity's mafia sbire"),searchByName(listMonsters,"Wheatcity's mafia leader")], "monstersRate" : [95,100], "listResources" : [], "resourcesRate" : []}
};

var listSafeZonesJSON = {
  "Wheatcity" : {"name" : "Wheatcity", "listResources" : [searchByName(listCraftItems,"Iron")], "resourcesRate" : [50]}
};

var listDungeonZonesJSON = {
  "Knajo fields - dungeon" : {"name" : "Knajo fields - dungeon", "maxSpawn" : 2, "boss" : [searchByName(listMonsters,"Blood Rabbit")], "listMonsters" : [searchByName(listMonsters,"Rabbit"),searchByName(listMonsters,"Chicken")], "monstersRate" : [70,100], "listResources" : [], "resourcesRate" : []},
};

/* Init */

for (var property in listHuntingZonesJSON) {
  if (listHuntingZonesJSON.hasOwnProperty(property)) {
    listZones.push(new HuntingZone(listHuntingZonesJSON[property]));
  }
}

for (var property in listSafeZonesJSON) {
  if (listSafeZonesJSON.hasOwnProperty(property)) {
    listZones.push(new SafeZone(listSafeZonesJSON[property]));
  }
}

for (var property in listDungeonZonesJSON) {
  if (listDungeonZonesJSON.hasOwnProperty(property)) {
    listZones.push(new DungeonZone(listDungeonZonesJSON[property]));
  }
}



