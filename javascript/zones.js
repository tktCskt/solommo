/* Global variables */

var nbZones = 0;
var listZones = [];

/* Constructors */

function Zone(options) {
  this.name = options.name;
  this.listMonsters = options.listMonsters;
  this.monstersRate = options.monstersRate;
  this.listResources = options.listResources;
  this.resourcesRate = options.resourcesRate;
  nbZones++;
}

/* JSON */

var listZonesJSON = {
  "Wheatcity" : {"name" : "Wheatcity", "listMonsters" : [], "monstersRate" : [], "listResources" : [searchByName(listCraftItems,"Iron")], "resourcesRate" : [50]},
  "Knajo fields" : {"name" : "Knajo fields", "listMonsters" : [searchByName(listMonsters,"Rabbit"),searchByName(listMonsters,"Chicken"),searchByName(listMonsters,"Blood Rabbit")], "monstersRate" : [60,95,100], "listResources" : [searchByName(listCraftItems,"Iron"),searchByName(listCraftItems,"Copper")], "resourcesRate" : [75,75]}
};

/* Init */

for (var property in listZonesJSON) {
  if (listZonesJSON.hasOwnProperty(property)) {
    listZones.push(new Zone(listZonesJSON[property]));
  }
}