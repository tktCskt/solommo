var nbJobs = 0;
var listJobs = [];

/* Constructors */
function recipe(options) {
  this.item = options.item;
  this.ingredients = options.ingredients;
  this.numbers = options.numbers;
  this.level = options.level;
  this.progress = 0;
  this.xp = 0;
}

function job(options) {
  this.name = options.name;
  this.max = 100;
  this.progress = 0;
  this.xp = 0;
  this.details = options.details;
  this.recipes = [];
  id = nbJobs++;
}

/* JSON */
var listJobsJSON = {
  "Tailoring" : {"name":"Tailoring", "details":""},
  "Mining" : {"name":"Mining", "details":"Mineral"},
  "Herbalism" : {"name":"Herbalism", "details":"Plant"},
  "Fishing" : {"name":"Fishing", "details":"Fish"},
  "Woodcutting" : {"name":"Woodcutting", "details":"Wood"},
  "Smithing" : {"name":"Smithing", "details":""}
};

var listTailoringRecipesJSON = {
  "Carrot armor" : {"item" : searchByName(listChestArmors,"Carrot armor"), "ingredients" : [searchByName(listCraftItems,"Rabbit hide"),searchByName(listCraftItems,"Carrot")], "numbers":[1,5], "level":0},
  "Leather armor" : {"item" : searchByName(listChestArmors,"Leather armor"), "ingredients" : [searchByName(listCraftItems,"Chicken egg"),searchByName(listCraftItems,"Carrot"),searchByName(listCraftItems,"Chicken feather")], "numbers":[1,1,1], "level":5},
  "Leather gloves" : {"item" : searchByName(listHandsArmors,"Leather gloves"), "ingredients" : [searchByName(listCraftItems,"Rabbit hide"), searchByName(listCraftItems,"Chicken feather")], "numbers":[2,2], "level":1},
  "Leather boots" : {"item" : searchByName(listFeetArmors,"Leather boots"), "ingredients" : [searchByName(listCraftItems,"Rabbit hide"), searchByName(listCraftItems,"Chicken feather")], "numbers":[3,1], "level":1},
  "Leather legguards" : {"item" : searchByName(listLegsArmors,"Leather legguards"), "ingredients" : [searchByName(listCraftItems,"Rabbit hide"), searchByName(listCraftItems,"Chicken feather")], "numbers":[2,2], "level":2},
  "Leather shoulders" : {"item" : searchByName(listShouldersArmors,"Leather shoulders"), "ingredients" : [searchByName(listCraftItems,"Rabbit hide"), searchByName(listCraftItems,"Chicken feather")], "numbers":[3,1], "level":3},
  "Leather helmet" : {"item" : searchByName(listHeadArmors,"Leather helmet"), "ingredients" : [searchByName(listCraftItems,"Rabbit hide"), searchByName(listCraftItems,"Chicken feather")], "numbers":[3,1], "level":4},
}

var listSmithingRecipesJSON = {
  "Sword1" : {"item":searchByName(listWeapons,"Sword"), "ingredients":[searchByName(listCraftItems,"Iron")], "numbers":[10], "level":0},
  "Sword2" : {"item":searchByName(listWeapons,"Sword2"), "ingredients":[searchByName(listCraftItems,"Iron"),searchByName(listCraftItems,"Copper")], "numbers":[20,10], "level":3},
  "Sword3" : {"item":searchByName(listWeapons,"Sword3"), "ingredients":[searchByName(listCraftItems,"Iron"),searchByName(listCraftItems,"Copper"), searchByName(listCraftItems,"Gold")], "numbers":[30,20,10], "level":5}
}



/*Fonctions pour tous les métiers*/

function craft(job, iRecipe) {
  var recipe = job.recipes[iRecipe];
  var i;
  
  var N = job.progress - recipe.level;
  var crappy = Math.max(0, 25 - N);
  var rubbish = Math.max(0, 25 - (N / 2));
  var passable = Math.max(0, 25 - (N / 4));
  var great = 5 + (N / 2.5);
  var legendary = Math.trunc(N / 50);
  var perfect = N / 2 - legendary;
  var normal = 100 - (crappy + rubbish + passable + great + legendary + perfect);
  
  crappy = crappy;
  rubbish = crappy + rubbish;
  passable = rubbish + passable;
  normal = passable + normal;
  great = normal + great;
  perfect = great + perfect;
  legendary = perfect + legendary;
  
  for (i = 0; i < recipe.ingredients.length; i++) {
    ing_id = recipe.ingredients[i].id;
    if (nbCraftItems[ing_id] < recipe.numbers[i]) {
      log("You don't have the ingredients.", "ERROR");
      return;
    }
  }
  
  // TODO Create a formula
  var recipexpearned = 10;
  
  job.xp += recipexpearned;
  while (job.xp >= (job.progress+1)*50) {
    job.xp -= (job.progress+1)*50;
    updatejProgress(job,1);
  }
  if (recipe.progress < 10) { // craft lvl max
    recipe.xp += recipexpearned*2;
    while (recipe.xp >= 100) {
      recipe.progress++;
      recipe.xp -= 100;
    }
  }
  
  log("You crafted a " + recipe.item.name + ".", "INFO");
  log(job.name + ": You earned " + recipexpearned + "xp.", "INFO");
  
  for (i = 0; i < recipe.ingredients.length; i++)
  addcItem(recipe.ingredients[i], -recipe.numbers[i]);
  
  var quality;
  var rand = Math.random() * 100;
  if (rand <= crappy) quality = 0;
  else if (rand <= rubbish) quality = 1;
  else if (rand <= passable) quality = 2;
  else if (rand <= normal) quality = 3;
  else if (rand <= great) quality = 4;
  else if (rand <= perfect) quality = 5;
  else quality = 6;
  
  addgItem(new equipment(recipe.item, [], quality));
  updateJob(job);
}

function updatejProgress(job, number) {
  log("+" + number + " in " + job.name, "INFO");
  job.progress += number;
  updateJob(job);
}

function gather(zone,job)
{
  var i;
  for(i=0;i<zone.listResources.length;i++)
  {
    var K = 0.03;
    if(zone.listResources[i].type2 == job.details)
    {
      var n = K * zone.resourcesRate[i] * Math.sqrt(job.progress);
      var number = Math.trunc(n);
      var r = Math.random();
      if(r < n - number) //
      {
        number++;
      }
      addcItem(zone.listResources[i],number);
    }
  }
  var xpGathering = 10;
  
  log(job.name + ": You earned " + xpGathering + "xp.", "INFO");
  job.xp += xpGathering;
  while (job.xp >= (job.progress+1)*50) {
    job.xp -= (job.progress+1)*50;
    updatejProgress(job,1);
  }
}

function initJobs() {
  console.log("Initialisation des métiers..");
  
  listJobs = [];
  nbJobs = 0;
  for (var property in listJobsJSON) {
    if (listJobsJSON.hasOwnProperty(property)) {
      listJobs.push(new job(listJobsJSON[property]));
    }
  }
  
  /*Tailoring recipes*/
  
  var Tailoring = searchByName(listJobs,"Tailoring");
  
  for (var property in listTailoringRecipesJSON) {
    if (listTailoringRecipesJSON.hasOwnProperty(property)) {
      Tailoring.recipes.push(new recipe(listTailoringRecipesJSON[property]));
    }
  }
  
  /*Smithing recipes*/
  
  var Smithing = searchByName(listJobs,"Smithing");
  
  for (var property in listSmithingRecipesJSON) {
    if (listSmithingRecipesJSON.hasOwnProperty(property)) {
      Smithing.recipes.push(new recipe(listSmithingRecipesJSON[property]));
    }
  }
  
}