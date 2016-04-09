var nbJobs = 0;

/*TODO a retirer*/
function searchByName(list, name) {
  var i = 0;
  for (i = 0; i < list.length; i++) {
    if (list[i].name == name) {
      return list[i];
    }
  }
}

function log(txt, canal) {
  if (canal == "INFO") fontcolor = "#8080ff";
  else if (canal == "ERROR") fontcolor = "#ff0000";
  else if (canal == "GENERAL") fontcolor = "#c08080";
  else if (canal == "COMMERCE") fontcolor = "#c08080";
  else if (canal == "RECRUITMENT") fontcolor = "#c08080";
  else if (canal == "GUILD") fontcolor = "#40ff40";
  else if (canal == "TEAM") fontcolor = "#ff7f00";
  else if (canal == "WHISP") fontcolor = "#ff80ff";

  txt = "<font color='" + fontcolor + "'>" + txt + "</font>";

  document.getElementById('log5').innerHTML = document.getElementById('log4').innerHTML;
  document.getElementById('log4').innerHTML = document.getElementById('log3').innerHTML;
  document.getElementById('log3').innerHTML = document.getElementById('log2').innerHTML;
  document.getElementById('log2').innerHTML = document.getElementById('log1').innerHTML;
  document.getElementById('log1').innerHTML = txt;
}

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
  this.progress = 1;
  this.xp = 0;
  this.details = options.details;
  this.recipes = [];
  id = nbJobs++;
}

var listJobs = [];
listJobs.push(new job({"name":"Tailoring", "details":""}));
listJobs.push(new job({"name":"Mining", "details":"Mineral"}));
listJobs.push(new job({"name":"Smithing", "details":""}));
//TODO Initialiser ça dans init() => function pour retirer variables globales
/*Tailoring recipes*/
var opts_recipe_clothArmor = {"item" : searchByName(listChestArmors,"Cloth armor"), "ingredients" : [searchByName(listCraftItems,"Rabbit hide"),searchByName(listCraftItems,"Carrot")], "numbers":[2,1], "level":0};
var opts_recipe_leatherArmor = {"item" : searchByName(listChestArmors,"Leather armor"), "ingredients" : [searchByName(listCraftItems,"Chicken egg"),searchByName(listCraftItems,"Carrot"),searchByName(listCraftItems,"Chicken feather")], "numbers":[1,1,1], "level":0};

var Tailoring = searchByName(listJobs,"Tailoring");
Tailoring.recipes.push(new recipe(opts_recipe_clothArmor));
Tailoring.recipes.push(new recipe(opts_recipe_leatherArmor));

/*Smithing recipes*/
var opts_recipe_sword = {"item":searchByName(listWeapons,"Sword"), "ingredients":[searchByName(listCraftItems,"Iron")], "numbers":[10], "level":0};
var opts_recipe_sword2 = {"item":searchByName(listWeapons,"Sword2"), "ingredients":[searchByName(listCraftItems,"Iron"),searchByName(listCraftItems,"Copper")], "numbers":[20,10], "level":3};
var opts_recipe_sword3 = {"item":searchByName(listWeapons,"Sword3"), "ingredients":[searchByName(listCraftItems,"Iron"),searchByName(listCraftItems,"Copper"), searchByName(listCraftItems,"Gold")], "numbers":[30,20,10], "level":5};

var Smithing = searchByName(listJobs,"Smithing");
Smithing.recipes.push(new recipe(opts_recipe_sword));
Smithing.recipes.push(new recipe(opts_recipe_sword2));
Smithing.recipes.push(new recipe(opts_recipe_sword3));

/*Fonctions pour tous les métiers*/
function updatejProgress(job, number) {
  log("+" + number + " in " + job.name, "INFO");
  job.progress += number;
  updateJob("Tailoring");
}


function gather (zone,job)
{
  for(var i=0;i<zone.listResources.length;i++)
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
}


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
  while (job.xp >= 100) {
    job.progress++;
    job.xp -= 100;
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
  updateJob(job.name);
}
