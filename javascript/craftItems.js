nbCraftItem = 0;

function craftItem(options) {
  this.id = nbCraftItem++;
  this.name = options.name;
  this.price = options.price;
  this.type = "Craft item";
  this.type2 = options.type2;
}

/*JSON*/
var listCraftItemsJSON = {
  "Rabbit hide" : {"name":"Rabbit hide", "price":50, "type2":"Hide"},
  "Carrot" : {"name":"Carrot", "price":20, "type2":"Vegetable"},
  "Chicken feather" : {"name":"Chicken feather", "price":30, "type2":"Feather"},
  "Chicken egg" : {"name":"Chicken egg", "price":50, "type2":"Egg"},
  "Iron" : {"name":"Iron", "price":10, "type2":"Mineral"},
  "Copper" : {"name":"Copper", "price":20, "type2":"Mineral"},
  "Gold" : {"name":"Gold", "price":50, "type2":"Mineral"},
  "Basic wood" : {"name":"Basic wood", "price":15, "type2":"Wood"},
  "Solid wood" : {"name":"Solid wood", "price":50, "type2":"Wood"},
  "Fish1" : {"name":"Fish1", "price":10, "type2":"Fish"},
  "Fish2" : {"name":"Fish2", "price":20, "type2":"Fish"},
  "Plant1" : {"name":"Plant1", "price":10, "type2":"Plant"},
  "Plant2" : {"name":"Plant2", "price":20, "type2":"Plant"},
};

listCraftItems = [];

for (var property in listCraftItemsJSON) {
  if (listCraftItemsJSON.hasOwnProperty(property)) {
    listCraftItems.push(new craftItem(listCraftItemsJSON[property]));
  }
}
