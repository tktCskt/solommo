nbWeapons = 0;

function weapon (options)
{
	this.name = options.name;
	this.price = options.price;
	this.damage = options.damage;
	this.id = nbWeapons++;
}

var opts_fists = {"name":"Fists", "price":0, "damage":4};
var opts_sword = {"name":"Sword", "price":20, "damage":9};

var listWeapons = [new weapon(opts_fists), new weapon(opts_sword)];
