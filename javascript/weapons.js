nbWeapons = 0;

function weapon (options)
{
	this.name = options.name;
	this.price = options.price;
	this.damage = options.damage;
	this.id = nbWeapons++;
}

/* JSON */
var listWeaponsJSON = {
  "Fists" : {"name":"Fists", "price":0, "damage":4},
"Sword1" : {"name":"Sword", "price":20, "damage":9},
  "Sword2" : {"name":"Sword2", "price":50, "damage":13},
  "Sword3" : {"name":"Sword3", "price":120, "damage":18}
};


var listWeapons = [];

for (var property in listWeaponsJSON) {
  if (listWeaponsJSON.hasOwnProperty(property)) {
    listWeapons.push(new weapon(listWeaponsJSON[property]));
  }
}
