//------------------//
//- Character data -//
//------------------//

var gameData = {};

//------------------//
//-   Char frame   -//
//------------------//

function changecHP(dmg) {
  player.curHP += dmg;

  if (player.curHP < 0) player.curHP = 0;
  else if (player.curHP > player.maxHP) player.curHP = player.maxHP;

  if (player.dead && player.curHP == player.maxHP) {
    log("You feel well again!", "INFO");
    player.dead = false;
  } else if (player.curHP == 0) {
    log("You died.", "INFO");
    player.dead = true;
  }

  displayHPbar();
}

function changecMP(mana) {
  player.curMP += mana;

  if (player.curMP < 0) player.curMP = 0;
  else if (player.curMP > player.maxMP) player.curMP = player.maxMP;

  displayMPbar();
}

function changecXP(xp) {
  player.xp += xp;

  while (player.xp >= xptolvlup()) lvlup();

  displayXPbar();
}

function xptolvlup() {
  if (player.level == 1) return 100
  else if (player.level == 2) return 130;
  else return player.level * player.level * 20;
}

function lvlup() {
  player.xp = player.xp - (xptolvlup());
  player.level++;

  player.avTalent++;
  player.avPoint += 5;

  changecHP(player.maxHP);
  changecMP(player.maxMP);

  updateDisplayCharSheet();
  updateDisplayTalentSheet();

  log("Level up! You are level <b>" + player.level + "</b>.", "INFO");
}

function displayHPbar() {
  var elbarHP = document.getElementById('HUD_character_barcur_HP');

  document.getElementById('main_char_curHP').innerHTML = Math.floor(player.curHP);
  document.getElementById('main_char_maxHP').innerHTML = player.maxHP;
  elbarHP.style.width = player.curHP / player.maxHP * 150 + "px";

  if (player.dead) {
    elbarHP.style.backgroundColor = "#ff0000";
  } else if (player.curHP / player.maxHP < 0.25) {
    elbarHP.style.backgroundColor = "#E96D37";
  } else if (player.curHP / player.maxHP < 0.5) {
    elbarHP.style.backgroundColor = "#DBA744";
  } else if (player.curHP / player.maxHP < 1) {
    elbarHP.style.backgroundColor = "#7ABA2F";
  } else if (player.curHP == player.maxHP) {
    elbarHP.style.backgroundColor = "#5CAB00";
  }
}

function displayMPbar() {
  document.getElementById('main_char_curMP').innerHTML = Math.floor(player.curMP);
  document.getElementById('main_char_maxMP').innerHTML = player.maxMP;
  document.getElementById('HUD_character_barcur_MP').style.width = player.curMP / player.maxMP * 150 + "px";
}

function displayXPbar() {
  document.getElementById('main_char_level').innerHTML = player.level;
  document.getElementById('main_char_curXP').innerHTML = player.xp;
  document.getElementById('main_char_maxXP').innerHTML = xptolvlup();
  document.getElementById('HUD_character_barcur_XP').style.width = player.xp / xptolvlup() * 150 + "px";
}

//------------------//
//-      Zones     -//
//------------------//

function goto(newZone) {
  player.curArea = searchByName(listZones,newZone);
  if (document.getElementById('worldmap_window').style.display != "none") document.getElementById('worldmap_window').style.display = "none";
  document.getElementById('HUD_zone_location').innerHTML = newZone;
  if (newZone == "Knajo fields") {
    displayHuntingzone("Knajo fields");
  } else if (newZone == "Wheatcity") {
    displayCityzone("Wheatcity");
  }
  displayQuests();
}

function gotokingdomcity() {
  goto("Wheatcity");
}

function displayHuntingzone(newZone) {
  document.getElementById('hunting_zone').style.display = "block";
  document.getElementById('city_zone').style.display = "none";
}

function displayCityzone(newZone) {
  document.getElementById('hunting_zone').style.display = "none";
  document.getElementById('city_zone').style.display = "block";
}

//------------------//
//-      Shop      -//
//------------------//
function calculateSellPrice(item) {
  var totalPrice = item.price;
  return totalPrice;
}

function sellCraftItem(i) {
  changecMoney(calculateSellPrice(listCraftItems[i]));
  nbCraftItems[i]--;
  updateInventory();
  displayShopSell();
}

function sellGearItem(i) {
  changecMoney(calculateSellPrice(gearItems[i]));
  gearItems.splice(i, 1);
  var elShopSell = document.getElementById('shop_window_sell');
  var elItem = document.getElementById('shopSG' + gearItems.length);
  elShopSell.removeChild(elItem);
  updateInventory();
  displayShopSell();
}

function displayShopSell() {
  var elShopSell = document.getElementById('shop_window_sell');
  var elItem;
  var i;
  //Craft items
  for (i = 0; i < nbCraftItem; i++) {
    elItem = document.getElementById('shopSC' + i);
    if (nbCraftItems[i] > 0) {
      if (elItem != null) {
        elItem.innerHTML = nbCraftItems[i] + " " + listCraftItems[i].name + "- " + calculateSellPrice(listCraftItems[i]) + " g/u" + "<br/>";
      } else {
        elItem = document.createElement('span');
        elItem.id = 'shopSC' + i;
        elItem.innerHTML = nbCraftItems[i] + " " + listCraftItems[i].name + "- " + calculateSellPrice(listCraftItems[i]) + " g/u" + "<br/>";
        elShopSell.appendChild(elItem);
        elItem.setAttribute('iItem', i);
        elItem.onclick = function () {
          sellCraftItem(this.getAttribute('iItem'))
        }
      }
    } else {
      if (elItem != null) {
        elShopSell.removeChild(elItem);
      }
    }
  }
  //gear

  for (i = 0; i < gearItems.length; i++) {
    elItem = document.getElementById('shopSG' + i);

    if (elItem != null) {
      elItem.innerHTML = gearItems[i].name + "- " + calculateSellPrice(gearItems[i]) + " g" + "<br/>";
    } else {
      elItem = document.createElement('span');
      elItem.id = 'shopSG' + i;
      elItem.innerHTML = gearItems[i].name + "- " + calculateSellPrice(gearItems[i]) + " g" + "<br/>";
      elShopSell.appendChild(elItem);
      elItem.setAttribute('iItem', i);
      elItem.onclick = function () {
        sellGearItem(this.getAttribute('iItem'));
      }
    }
  }
}

//------------------//
//-    Talents     -//
//------------------//

function updateDisplayTalentSheet() {
}


//------------------//
//-   Equipment    -//
//------------------//

function equipment(item, enchants, quality) {
  this.name = "";
  this.s_quality = "";
  this.modif = 1;

  if (quality >= 6) {
    this.s_quality += "Legendary";
    this.modif = 2;
  } else if (quality >= 5) {
    this.s_quality += "Perfect";
    this.modif = 1.5;
  } else if (quality >= 4) {
    this.s_quality += "Great";
    this.modif = 1.2;
  } else if (quality >= 3) {
    this.s_quality += "";
    this.modif = 1;
  } else if (quality >= 2) {
    this.s_quality += "Passable";
    this.modif = 0.8;
  } else if (quality >= 1) {
    this.s_quality += "Rubbish";
    this.modif = 0.5;
  } else {
    this.s_quality += "Crappy";
    this.modif = 0.0;
  }


  this.name += this.s_quality + " ";
  this.name += item.name; //TODO partie enchant du nom
  this.type = item.type;
  if (item.type = "Armor") this.def = Math.round(item.def * this.modif);
  this.price = Math.round(item.price * this.modif); //TODO ajuster selon qualité/Enchant
}


//------------------//
//-  Hunting zone  -//
//------------------//

var nbZones = 0;

function zone(name, listMonsters, monstersRate, listResources, resourcesRate) {
  this.name = name;
  this.listMonsters = listMonsters;
  this.monstersRate = monstersRate;
  this.listResources = listResources;
  this.resourcesRate = resourcesRate;
  nbZones++;
}

var listZones = [new zone("Wheatcity",[],[],[searchByName(listCraftItems,"Iron")],[50]),
new zone("Knajo fields",[searchByName(listMonsters,"Rabbit"),searchByName(listMonsters,"Chicken"),searchByName(listMonsters,"Blood Rabbit")],[60,95,100],[searchByName(listCraftItems,"Iron"),searchByName(listCraftItems,"Copper")],[75,75])];

function updateJob(job) {
  var elTailoring = document.getElementById('tailoring_craft_boxes');
  document.getElementById('tailoring_barcur_XP').style.width = searchByName(listJobs, "Tailoring").xp / 100 * 300 + 'px';
  document.getElementById('tailoring_cur_XP').innerHTML = searchByName(listJobs, "Tailoring").xp;
  document.getElementById('tailoring_max_XP').innerHTML = 100;
  document.getElementById('tailoring_level').innerHTML = searchByName(listJobs, "Tailoring").progress;

  for (var i = 0; i < job.recipes.length; i++) {
    var recipe = job.recipes[i];
    if (job.progress >= recipe.level) {
      var elRecipe = document.getElementById('char_tailoring' + i);
      var isNew = false;

      if (elRecipe == null) {
        isNew = true;
        elRecipe = document.createElement('div');
        elRecipe.setAttribute('class', 'craft_box');
        elRecipe.id = 'char_tailoring' + i;

        elTailoring.appendChild(elRecipe);
      }

      if (isNew) {
        var elRecipeTitle = document.createElement('div');
        elRecipeTitle.setAttribute('class', 'craft_box_title');
        elRecipeTitle.innerHTML = recipe.item.name;

        elRecipe.appendChild(elRecipeTitle);
      }

      var canbecrafted = true;
      for (var j = 0; j < recipe.ingredients.length; j++) {
        var ing_id = recipe.ingredients[j].id;

        if (isNew) {
          var elRecipeIngredient = document.createElement('div');
          elRecipeIngredient.id = 'char_tailoring_ing_' + i + '_' + j;
          elRecipeIngredient.setAttribute('class', 'craft_box_ingredient');

          var elRecipeIngredientTitle = document.createElement('div');
          elRecipeIngredientTitle.setAttribute('class', 'craft_box_ingredient_name');
          elRecipeIngredientTitle.innerHTML = recipe.ingredients[j].name;

          var elRecipeIngredientNumber = document.createElement('div');
          elRecipeIngredientNumber.setAttribute('class', 'craft_box_ingredient_number');
          elRecipeIngredientNumber.id = 'char_tailoring_ingN_' + i + '_' + j;
          elRecipeIngredientNumber.innerHTML = nbCraftItems[ing_id] + "/" + recipe.numbers[j];

          elRecipeIngredient.appendChild(elRecipeIngredientTitle);
          elRecipeIngredient.appendChild(elRecipeIngredientNumber);
          elRecipe.appendChild(elRecipeIngredient);
        }
        else {
          document.getElementById('char_tailoring_ingN_' + i + '_' + j).innerHTML = nbCraftItems[ing_id] + "/" + recipe.numbers[j];
        }

        if (nbCraftItems[ing_id] < recipe.numbers[j]) {
          document.getElementById('char_tailoring_ing_' + i + '_' + j).style.backgroundColor = "#EDE8DB";
          canbecrafted = false;
        }
        else {
          document.getElementById('char_tailoring_ing_' + i + '_' + j).style.backgroundColor = "#D4DCB9";
        }
      }
      if (canbecrafted) elRecipe.style.backgroundColor = "#B9D6AD";
      else elRecipe.style.backgroundColor = "#E7E0CF";

      if (isNew) {
        var elRecipeXP = document.createElement('div');
        elRecipeXP.setAttribute('class', 'craft_box_XP');

        var elRecipeTextXP = document.createElement('span');
        elRecipeTextXP.id = 'tailoring_recipe_XP' + i;

        var elRecipeBarXP = document.createElement('div');
        elRecipeBarXP.setAttribute('class', 'craft_box_bar_XP');
        elRecipeBarXP.innerHTML = "&nbsp;";

        var elRecipeBarcurXP = document.createElement('div');
        elRecipeBarcurXP.setAttribute('class', 'craft_box_barcur_XP');
        elRecipeBarcurXP.id = 'tailoring_recipe_XPcur' + i;
        elRecipeBarcurXP.style.width = recipe.progress / 5 * 100 + 'px';

        elRecipeXP.appendChild(elRecipeBarXP);
        elRecipeXP.appendChild(elRecipeBarcurXP);
        elRecipeBarXP.appendChild(elRecipeTextXP);
        elRecipe.appendChild(elRecipeXP);
      }
      else {
        document.getElementById('tailoring_recipe_XP' + i).innerHTML = recipe.progress;
        document.getElementById('tailoring_recipe_XPcur' + i).style.width = recipe.progress / 5 * 100 + 'px';
      }

      elRecipe.setAttribute('iRecipe', i);
      elRecipe.onclick = function () {
        craft(searchByName(listJobs, "Tailoring"), this.getAttribute('iRecipe'));
      };
    }
  }
}

function displayGathering() {
  var elGathering = document.getElementById('gathering_window');

  var elTxt = document.getElementById("gathering_txt");
  if (elTxt == null)
  {
    elTxt = document.createElement('div');
    elTxt.id = "gathering_txt";
    elTxt.innerHTML = "What resource do you want to gather ?<br/>";
    elGathering.appendChild(elTxt);
  }
  elTxt = document.getElementById("gathering_mining");
  if (elTxt == null)
  {
    elTxt = document.createElement('div');
    elTxt.id = "gathering_mining";
    elGathering.appendChild(elTxt);
  }
  elTxt.innerHTML = "Stones&Metal(lvl "+searchByName(listJobs,"Mining").progress+")<br/>";
  elTxt.onclick = function() {
    gather(player.curArea,searchByName(listJobs,"Mining"));
  };
}

//------------------//
//-   Equipment    -//
//------------------//

function equipGearItems(i) {
  var item = gearItems[i];
  if (item.type == "Armor") {
    gearItems.splice(i, 1);
    changeChestArmor(item);
  }
}

function changeWeapon(newWeapon) {
  player.weapon = newWeapon;
  player.atk = player.weapon.damage;
  document.getElementById('main_char_weapon').innerHTML = player.weapon.name;
  document.getElementById('main_char_weaponatk').innerHTML = player.weapon.damage;
}

function changeChestArmor(newArmor) {
  if (player.armor != "") {
    addgItem(player.armor);
  }
  player.armor = newArmor;
  player.def = player.armor.def;
  document.getElementById('main_char_armor').innerHTML = player.armor.name;
  document.getElementById('main_char_armordef').innerHTML = player.armor.def;
}

//------------------//
//-   Inventory    -//
//------------------//

function changecMoney(n) {
  player.money += n;
  log("You got " + n + " gold coins.", "INFO");
}

var nbCraftItems = [];
var gearItems = [];

function addgItem(item) {
  gearItems.push(item);
  log("You got " + " <b>[" + item.name + "]</b>", "INFO");
  updateInventory();
}

function addcItem(item, number) {
  var i;
  if (number>=0)
  log("You got " + number + " <b>[" + item.name + "]</b>", "INFO");
  else
  log("You lost " + Math.abs(number) + " <b>[" + item.name + "]</b>", "INFO");
  nbCraftItems[item.id] += number;

  updateInventory();

  for (i = 0; i < listAcceptedQuests.length; i++) {
    if (item.name == listAcceptedQuests[i].details && listAcceptedQuests[i].type == "collect") {
      updateProgress(listAcceptedQuests[i], number);
    }
  }
}

function updateInventory() {
  displayInventory();
  displayGold();
}

function displayGold() {
  document.getElementById('char_gold').innerHTML = player.money;
  document.getElementById('char_gold_shop').innerHTML = player.money;
}

function displayInventory() {
  var elInventory = document.getElementById('tabs_content_inventory');

  var inventoryGold = document.createElement('div');
  inventoryGold.setAttribute("class","menu_inventory_gold");
  var inventoryGoldAmount = document.createElement('span');
  inventoryGoldAmount.setAttribute("id","char_gold");

  inventoryGold.appendChild(inventoryGoldAmount);
  elInventory.appendChild(inventoryGold);

  var elInventoryResources = document.getElementById('menu_inventory_resources');
  elInventoryResources.innerHTML = "";

  var elInventoryEquipments = document.getElementById('menu_inventory_equipments');
  elInventoryEquipments.innerHTML = "";

  var elItem;
  var i;

  //Resources
  for (i = 0; i < nbCraftItem; i++) {
    elItem = document.getElementById('char_cInventory' + i);
    if (nbCraftItems[i] > 0) {
      if (elItem != null) {
        elItem.innerHTML = nbCraftItems[i] + " " + listCraftItems[i].name;
      } else {
        elItem = document.createElement('div');
        elItem.id = 'char_cInventory' + i;
        elItem.innerHTML = nbCraftItems[i] + " " + listCraftItems[i].name;
        elInventoryResources.appendChild(elItem);
      }
    } else {
      if (elItem != null) {
        elInventoryResources.removeChild(elItem);
      }
    }
  }

  //Items

  //Equipments
  for (i = 0; i < gearItems.length; i++) {
    elItem = document.getElementById('char_gInventory' + i)

    if (elItem != null) {
      elItem.innerHTML = gearItems[i].name + "<br/>";
    } else {
      elItem = document.createElement('div');
      elItem.id = 'char_gInventory' + i;
      elItem.innerHTML = gearItems[i].name;
      if (gearItems[i].def != null)
        elItem.title += "Defense " + gearItems[i].def;
      if (gearItems[i].damage != null)
        elItem.title += "Damage " + gearItems[i].damage;
      elInventoryEquipments.appendChild(elItem);
    }
    elItem.setAttribute('iItem', i);
    elItem.onclick = function () {
      equipGearItems(this.getAttribute('iItem'));
    }

  }

}

//------------------//
//-    Monsters    -//
//------------------//

function monsterDeath(md_monster, k) {
  log("You defeated the <b>" + monsters[k].name + "</b> and earned " + monsters[k].XP + "xp.", "INFO");

  // Process XP and loot
  changecXP(md_monster.XP);
  var i;
  for (i = 0; i < md_monster.loots.length; i++) {
    if ((Math.random() * 100 <= md_monster.loots[i].percentage)) {
      addcItem(md_monster.loots[i].item, 1);
    }
  }

  // Hide this monster frame
  monsters[k].exist = false;
  document.getElementById('monster_frame'+k).style.visibility = "hidden";

  // Update Quests
  for (i = 0; i < listAcceptedQuests.length; i++) {
    if (md_monster.name == listAcceptedQuests[i].details && listAcceptedQuests[i].type == "kill") {
      updateProgress(listAcceptedQuests[i], 1);
    }
  }
}

function clickmonster(i) {
  if (player.dead) log("You can't do that when you're dead.", "ERROR");
  else if (monsters[i].currHP > 0) {
    changemHP(i, -((player.atk + player.bDMG) * player.mDMG));

    if (monsters[i].currHP > 0) {
      var damage = -monsters[i].atk + player.def;
      if (damage > 0) damage = 0;
      changecHP(damage);
    }
  }
}

function changemHP(i, dmg) {
  monsters[i].currHP += dmg;

  if (monsters[i].currHP > monsters[i].maxHP) monsters[i].currHP = monsters[i].maxHP;
  else if (monsters[i].currHP <= 0) {
    monsterDeath(monsters[i], i);
    return;
  }

  var elmbarHP = document.getElementById('monster_curHPbar' + i);

  document.getElementById('monster_curHP' + i).innerHTML = monsters[i].currHP;
  document.getElementById('monster_maxHP' + i).innerHTML = monsters[i].maxHP;
  elmbarHP.style.width = monsters[i].currHP / monsters[i].maxHP * 50 + "px";

  if (monsters[i].currHP / monsters[i].maxHP < 0.25) {
    elmbarHP.style.backgroundColor = "#E75D21";
  } else if (monsters[i].currHP / monsters[i].maxHP < 0.5) {
    elmbarHP.style.backgroundColor = "#DBA744";
  } else if (monsters[i].currHP / monsters[i].maxHP < 1) {
    elmbarHP.style.backgroundColor = "#66A366";
  } else if (monsters[i].currHP == monsters[i].maxHP) {
    elmbarHP.style.backgroundColor = "#006600";
  }
}


//------------------//
//-      Idle      -//
//------------------//

var idle = function () {
  // character regeneration
  if (player.curHP < player.maxHP) changecHP(player.regenHP);
  if (player.curMP < player.maxMP) changecMP(player.regenMP);

  // skills regeneration

  // repop
  for (var i = 0; i < 3; i++) {
    if (!monsters[i].exist) {
      if (Math.random() * 100 < 10) {
        var thisarea = searchByName(listZones, "Knajo fields");
        var monsterRate = Math.random() * 100;
        for (var j = 0; j < thisarea.listMonsters.length; j++) {
          if (monsterRate <= thisarea.monstersRate[j]) {
            thisarea.monstersRate;
            monsters[i] = Object.assign({}, thisarea.listMonsters[j]);
            break;
          }
        }

        monsters[i].exist = true;
        monsters[i].currHP = monsters[i].maxHP;

        displayNewMonster(i, monsters[i]);
      }
    }
  }

  // chat event
  if (Math.random() * 300 < 1) {
    var canal = Math.floor(Math.random() * 3);
    if (canal == 0) log(dialogGeneral[Math.floor(Math.random() * dialogGeneral.length)], "GENERAL");
    else if (canal == 1) log(dialogCommerce[Math.floor(Math.random() * dialogCommerce.length)], "COMMERCE");
    else if (canal == 2) log(dialogRecruitment[Math.floor(Math.random() * dialogRecruitment.length)], "RECRUITMENT");
  }

  // save
  localStorage.setItem('gameData', JSON.stringify(gameData));

  // wait 1s
  setTimeout(idle, 1000);
}

var dialogGeneral = ["[1] <b>Chin chong</b>: Sell 3 000 000 000 gold for 1 000$! Check it out in mmomaster-farmgold.com !", "[1] <b>Sayorg the ugly</b>: Someone to play LoL or HotS here?"];
var dialogCommerce = ["[2] <b>Leroy Jenkins</b>: Buy chickens"];
var dialogRecruitment = ["[4] <b>DarkSasuke</b>: I recruit members in my new guild Revenge of Akatsuki. Leader lvl 57. No noob pls!"];
