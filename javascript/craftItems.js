nbCraftItem = 0;

function craftItem(options) {
  this.id = nbCraftItem++;
  this.name = options.name;
  this.price = options.price;
  this.type = "Craft item";
  this.type2 = options.type2;
}
var opts_rabbitHide = {"name":"Rabbit hide", "price":50, "type2":"Hide"};
var opts_carrot = {"name":"Carrot", "price":20, "type2":"Vegetable"};
var opts_chickenFeather = {"name":"Chicken feather", "price":30, "type2":"Feather"};
var opts_chickenEgg = {"name":"Chicken egg", "price":50, "type2":"Egg"};

/*Minerals*/
var opts_iron = {"name":"Iron", "price":10, "type2":"Mineral"};
var opts_copper = {"name":"Copper", "price":20, "type2":"Mineral"};


listCraftItems = [new craftItem(opts_rabbitHide) ,new craftItem(opts_carrot) ,new craftItem(opts_chickenFeather) ,new craftItem(opts_chickenEgg) ,new craftItem(opts_iron) ,new craftItem(opts_copper)];
