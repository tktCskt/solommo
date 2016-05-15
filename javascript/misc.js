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
//-  Quests data   -//
//------------------//


function removeAvailableQuest(name) {
  var i;
  for (i = 0; i < listAvailableQuests.length; i++) {
    if (listAvailableQuests[i].name == name) {
      q = listAvailableQuests[i];
      listAvailableQuests.splice(i, 1);
    }
  }
  return q;
}

function updateProgress(up_quest, nb) {
  if (up_quest.finished == false) {
    var i;
    up_quest.progress += nb;
    
    log("<b>[" + up_quest.name + "]</b>: " + up_quest.progress + "/" + up_quest.number + " " + up_quest.details);
    
    if (up_quest.progress >= up_quest.number) {
      up_quest.finished = true;
    }
    displayQuests();
  }
}

function completeQuestI(iquest) {
  completeQuest(listAcceptedQuests[iquest]);
}

function completeQuest(up_quest) {
  var i = 0;
  var j = 0;
  changecXP(up_quest.rewardXP);
  changecMoney(up_quest.rewardMoney);
  log("You completed the quest <b>[" + up_quest.name + "]</b>. You earned " + up_quest.rewardXP + "xp.", "INFO");
  if (up_quest.unlockedP != "none") {
    for (i = 0; i < nbJobs; i++) {
      if (listJobs[i].name == up_quest.unlockedP) {
        updatejProgress(listJobs[i], 1);
        log("You unlocked " + up_quest.unlockedP + "!", "INFO");
      }
    }
  }
  if (up_quest.unlockedQ.length > 0) {
    for (i = 0; i < listQuests.length; i++) {
      for (j = 0; j < up_quest.unlockedQ.length; j++) {
        if (listQuests[i].name == up_quest.unlockedQ[j].name) {
          listQuests[i].available++;
        }
      }
    }
    i = 0;
    while (i < listQuests.length) {
      if (listQuests[i].available >= 1) {
        listAvailableQuests.push(listQuests[i]);
        listQuests.splice(i, 1);
        i = 0;
        } else {
        i++;
      }
    }
  }
  for (i = 0; i < listAcceptedQuests.length; i++) {
    if (listAcceptedQuests[i].name == up_quest.name) {
      listAcceptedQuests.splice(i, 1);
      c_nbQuests--;
    }
  }
  displayQuests();
}

//------------------//
//-  Quests sheet  -//
//------------------//

var avDisplayedQuests = 0;
var curDisplayedQuests = 0;

function displayQuests() {
  displayQuestsSheet();
  displayCityQuest();
  displayQuickCharQuest();
}

function displayQuestsSheet() {}

//------------------//
//-  Quick quests  -//
//------------------//

function displayQuickCharQuest() {
  var j;
  var minusQuests = 0;
  
  for (j = 0; j < listAcceptedQuests.length; j++) {
    if (document.getElementById('char_curquest' + j).innerHTML == "") curDisplayedQuests++;
    if (listAcceptedQuests[j].progress != listAcceptedQuests[j].number) document.getElementById('char_curquest' + j).innerHTML = "<b>" + listAcceptedQuests[j].name + "</b><br/>&#8250; " + listAcceptedQuests[j].type + " " + listAcceptedQuests[j].number + " " + listAcceptedQuests[j].details + " (" + listAcceptedQuests[j].progress + "/" + listAcceptedQuests[j].number + ")";
    else document.getElementById('char_curquest' + j).innerHTML = "<b>" + listAcceptedQuests[j].name + "</b><br/>&#8250; return to " + listAcceptedQuests[j].areaend;
  }
  for (j; j < curDisplayedQuests; j++) {
    document.getElementById('char_curquest' + j).innerHTML = "";
    minusQuests++;
  }
  curDisplayedQuests -= minusQuests;
}

//------------------//
//-      Zones     -//
//------------------//

function goto(newZone) {
  newZone = searchByName(listZones, newZone);
  initMonster();
  player.curArea = newZone;
  if (document.getElementById('worldmap_window').style.display != "none") document.getElementById('worldmap_window').style.display = "none";
  document.getElementById('HUD_zone_location').innerHTML = newZone.name;
  if(newZone.isHuntingZone) {
    displayHuntingzone(newZone.name);
    } else {
    displayCityzone(newZone.name);
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
//-    City zone   -//
//------------------//

function displayCityQuest() {
  var elAvQuest = document.getElementById('avcityquest');
  var elQuest;
  var i;
  elAvQuest.innerHTML = "";
  
  for (i = 0; i < listAcceptedQuests.length; i++) {
    if (listAcceptedQuests[i].finished == true && listAcceptedQuests[i].areaend == player.curArea.name) {
      elQuest = document.createElement('span');
      elQuest.id = 'char_avacquest' + i;
      elQuest.className = 'clickable city_available_quest';
      elQuest.setAttribute('iquest', i);
      elQuest.onclick = function () {
        clickFinishedQuest(this.getAttribute('iquest'));
      };
      elQuest.innerHTML = "<b>?</b> " + listAcceptedQuests[i].name + "<br/>";
      elAvQuest.appendChild(elQuest);
    }
  }
  
  for (i = 0; i < listAvailableQuests.length; i++) {
    elQuest = document.getElementById('char_city_available_quest' + i)
    if (listAvailableQuests[i].available == 1 && listAvailableQuests[i].areabegin == player.curArea.name) {
      elQuest = document.createElement('span');
      elQuest.id = 'char_city_available_quest' + i;
      elQuest.className = 'clickable city_available_quest';
      elQuest.setAttribute('iquest', i);
      elQuest.onclick = function () {
        clickQuest(this.getAttribute('iquest'));
      };
      elQuest.innerHTML = "<b>!</b> " + listAvailableQuests[i].name + "<br/>";
      elAvQuest.appendChild(elQuest);
    }
  }
}

var checkingQuest = -1;
var finished = false;

function clickQuest(i) {
  checkingQuest = i;
  finished = false;
  document.getElementById('city_status').style.display = "none";
  document.getElementById('quest_status').style.display = "inline";
  document.getElementById('city_quest_description').innerHTML = listAvailableQuests[i].textbegin;
}

function clickFinishedQuest(i) {
  checkingQuest = i;
  finished = true;
  document.getElementById('city_status').style.display = "none";
  document.getElementById('quest_status').style.display = "inline";
  document.getElementById('city_quest_description').innerHTML = listAcceptedQuests[i].textend;
}

function acceptcheckQuest() {
  if (finished == false) acceptQuest(checkingQuest);
  else if (finished == true) completeQuestI(checkingQuest);
  refusecheckQuest();
}

function refusecheckQuest() {
  checkingQuest = -1;
  document.getElementById('city_status').style.display = "inline";
  document.getElementById('quest_status').style.display = "none";
}

function acceptQuest(i) {
  if (c_nbQuests < maxQuests) {
    log("Quest <b>[" + listAvailableQuests[i].name + "]</b> accepted.", "INFO");
    
    q = removeAvailableQuest(listAvailableQuests[i].name);
    listAcceptedQuests.push(q);
    q.available = 0;
    q.active = 1;
    c_nbQuests++;
    //If it's a collect quest, check inventory
    if (q.type == "collect") {
      var i;
      for (i = 0; i < nbCraftItem; i++) {
        if (listCraftItems[i].name == q.details) {
          updateProgress(q, nbCraftItems[i]);
        }
      }
    }
    
    displayQuests();
    } else {
    log("You can't have more than " + maxQuests + " quests active.", "ERROR");
  }
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



function updateJob(job) {
  var elJob = document.getElementById('job_craft_boxes');
  elJob.innerHTML = "";
  document.getElementById('job_barcur_XP').style.width = job.xp / ((job.progress+1)*50) * 300 + 'px';
  document.getElementById('job_cur_XP').innerHTML = job.xp;
  document.getElementById('job_max_XP').innerHTML = (job.progress+1)*50;
  document.getElementById('job_level').innerHTML = job.progress;
  
  for (var i = 0; i < job.recipes.length; i++) {
    var recipe = job.recipes[i];
    if (job.progress >= recipe.level) {
      var elRecipe = document.getElementById('char_job' + i);
      var isNew = false;
      
      if (elRecipe == null) {
        isNew = true;
        elRecipe = document.createElement('div');
        elRecipe.setAttribute('class', 'craft_box');
        elRecipe.id = 'char_job' + i;
        
        elJob.appendChild(elRecipe);
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
          elRecipeIngredient.id = 'char_job_ing_' + i + '_' + j;
          elRecipeIngredient.setAttribute('class', 'craft_box_ingredient');
          
          var elRecipeIngredientTitle = document.createElement('div');
          elRecipeIngredientTitle.setAttribute('class', 'craft_box_ingredient_name');
          elRecipeIngredientTitle.innerHTML = recipe.ingredients[j].name;
          
          var elRecipeIngredientNumber = document.createElement('div');
          elRecipeIngredientNumber.setAttribute('class', 'craft_box_ingredient_number');
          elRecipeIngredientNumber.id = 'char_job_ingN_' + i + '_' + j;
          elRecipeIngredientNumber.innerHTML = nbCraftItems[ing_id] + "/" + recipe.numbers[j];
          
          elRecipeIngredient.appendChild(elRecipeIngredientTitle);
          elRecipeIngredient.appendChild(elRecipeIngredientNumber);
          elRecipe.appendChild(elRecipeIngredient);
        }
        else {
          document.getElementById('char_job_ingN_' + i + '_' + j).innerHTML = nbCraftItems[ing_id] + "/" + recipe.numbers[j];
        }
        
        if (nbCraftItems[ing_id] < recipe.numbers[j]) {
          document.getElementById('char_job_ing_' + i + '_' + j).style.backgroundColor = "#EDE8DB";
          canbecrafted = false;
        }
        else {
          document.getElementById('char_job_ing_' + i + '_' + j).style.backgroundColor = "#D4DCB9";
        }
      }
      if (canbecrafted) elRecipe.style.backgroundColor = "#B9D6AD";
      else elRecipe.style.backgroundColor = "#E7E0CF";
      
      if (isNew) {
        var elRecipeXP = document.createElement('div');
        elRecipeXP.setAttribute('class', 'craft_box_XP');
        
        var elRecipeTextXP = document.createElement('span');
        elRecipeTextXP.id = 'job_recipe_XP' + i;
        
        var elRecipeBarXP = document.createElement('div');
        elRecipeBarXP.setAttribute('class', 'craft_box_bar_XP');
        elRecipeBarXP.innerHTML = "&nbsp;";
        
        var elRecipeBarcurXP = document.createElement('div');
        elRecipeBarcurXP.setAttribute('class', 'craft_box_barcur_XP');
        elRecipeBarcurXP.id = 'job_recipe_XPcur' + i;
        elRecipeBarcurXP.style.width = recipe.progress / 5 * 100 + 'px';
        
        elRecipeXP.appendChild(elRecipeBarXP);
        elRecipeXP.appendChild(elRecipeBarcurXP);
        elRecipeBarXP.appendChild(elRecipeTextXP);
        elRecipe.appendChild(elRecipeXP);
      }
      else {
        document.getElementById('job_recipe_XP' + i).innerHTML = recipe.progress;
        document.getElementById('job_recipe_XPcur' + i).style.width = recipe.progress / 5 * 100 + 'px';
      }
      
      elRecipe.setAttribute('iRecipe', i);
      elRecipe.onclick = function () {
        craft(job, this.getAttribute('iRecipe'));
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
  
  if(this.s_quality != "") {
    this.name += this.s_quality + " ";
  }
  this.name += item.name; //TODO partie enchant du nom
  this.type = item.type;
  if (item.type == "Armor") {
    this.part = item.part;
    this.def = Math.round(item.def * this.modif);
    } else if (item.type == "Weapon") {
    this.damage = Math.round(item.damage * this.modif);
    } else {
    console.debug("equipment - error : unknown type " + item.type);
    console.debug("error on item : " + item);
  }
  this.price = Math.round(item.price * this.modif); //TODO ajuster selon qualité/Enchant
}

function equipGearItems(i) {
  var item = gearItems[i];
  if (item.type == "Armor") {
    gearItems.splice(i, 1);
    changeArmor(item);
    } else if (item.type == "Weapon") {
    gearItems.splice(i, 1);
    changeWeapon(item);
    } else {
    console.debug("equipGearItems - error : unknown type " + item.type);
    console.debug("error on item : " + item);
  }
}

function changeWeapon(newWeapon) {
  var oldWeapon = player.weapon;
  player.weapon = newWeapon;
  
  if (oldWeapon != "" && oldWeapon.name != "Fists") {
    addgItem(oldWeapon);
    player.atk -= oldWeapon.damage;
    } else {
    updateInventory();
  }
  player.atk += newWeapon.damage;
  document.getElementById('main_char_weapon').innerHTML = player.weapon.name;
  document.getElementById('main_char_weaponatk').innerHTML = player.weapon.damage;
}

function changeArmor(newArmor) {
  var oldArmor = "";
  switch(newArmor.part) {
    case "Chest":
    oldArmor = player.chestArmor;
    player.chestArmor = newArmor;
    break;
    case "Head":
    oldArmor = player.headArmor;
    player.headArmor = newArmor;
    break;
    case "Hands":
    oldArmor = player.handsArmor;
    player.handsArmor = newArmor;
    break;
    case "Feet":
    oldArmor = player.feetArmor;
    player.feetArmor = newArmor;
    break;
    case "Legs":
    oldArmor = player.legsArmor;
    player.legsArmor = newArmor;
    break;
    case "Shoulders":
    oldArmor = player.shouldersArmor;
    player.shouldersArmor = newArmor;
    break;
    default:
    console.debug("changeArmor - error : unknown part for the following object : " + newArmor);
  }
  
  if (oldArmor != "" && oldArmor.name != "Nothing") {
    addgItem(oldArmor);
    player.def -= oldArmor.def;
    } else {
    updateInventory();
  }
  player.def += newArmor.def;
  document.getElementById('main_char_' + newArmor.part + 'Armor').innerHTML = newArmor.name;
  document.getElementById('main_char_' + newArmor.part + 'Armordef').innerHTML = newArmor.def;
  
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
  var thisarea = player.curArea;
  if(thisarea.listMonsters.length > 0) {
    for (var i = 0; i < 3; i++) {
      if (!monsters[i].exist) {
        if (Math.random() * 100 < 25) {
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

var dialogGeneral = ["[1] <b>Chin chong</b>: Sell 3 000 000 000 gold for 1 000$! Check it out in mmomaster-farmgold.com !", "[1] <b>Sayorg the ugly</b>: Someone to play LoL or HotS here?", "<b>Herta</b>: I AM NOT ANGRY OMG !!"];
var dialogCommerce = ["[2] <b>Leroy Jenkins</b>: Buy chickens"];
var dialogRecruitment = ["[4] <b>DarkSasuke</b>: I recruit members in my new guild Revenge of Akatsuki. Leader lvl 57. No noob pls!"];

//------------------//
//- Initialization -//
//------------------//

window.onload = init;

function resetgame() {
  localStorage.clear();
  clearChatLog();
  init();
}

function init() {
  if (!localStorage.getItem('gameData'))
  {
    log("Welcome to MMO Master!", "INFO");
    newgame();
  }
  else
  {
    log("Welcome back to MMO Master!", "INFO");
    gameData = JSON.parse(localStorage.getItem('gameData'));
    player = gameData.player;
    listAcceptedQuests = gameData.listAcceptedQuests;
    listAvailableQuests = gameData.listAvailableQuests;
    listQuests = gameData.listQuests;
    nbCraftItems = gameData.nbCraftItems;
    gearItems = gameData.gearItems;
    listJobs = gameData.listJobs;
    
    player.curArea = "Wheatcity";
  }
  
  // display
  initDisplay();
  initMonster();
  initLocalStorage();
  
  // begin game
  goto(player.curArea);
  
  idle();
}

function initLocalStorage() {
  gameData.player = player;
  gameData.listAcceptedQuests = listAcceptedQuests;
  gameData.listAvailableQuests = listAvailableQuests;
  gameData.listQuests = listQuests;
  gameData.listJobs = listJobs;
  gameData.nbCraftItems = nbCraftItems;
  gameData.gearItems = gearItems;
}

function initDisplay() {
  document.getElementById('main_char_name').innerHTML = player.name;
  document.getElementById('main_char_class').innerHTML = player.class;
  displayXPbar();
  displayHPbar();
  displayMPbar();
  
  document.getElementById('main_char_weapon').innerHTML = player.weapon.name;
  document.getElementById('main_char_weaponatk').innerHTML = player.weapon.damage;
  document.getElementById('main_char_ChestArmor').innerHTML = player.chestArmor.name;
  document.getElementById('main_char_ChestArmordef').innerHTML = player.chestArmor.def;
  document.getElementById('main_char_HeadArmor').innerHTML = player.headArmor.name;
  document.getElementById('main_char_HeadArmordef').innerHTML = player.headArmor.def;
  document.getElementById('main_char_HandsArmor').innerHTML = player.handsArmor.name;
  document.getElementById('main_char_HandsArmordef').innerHTML = player.handsArmor.def;
  document.getElementById('main_char_LegsArmor').innerHTML = player.legsArmor.name;
  document.getElementById('main_char_LegsArmordef').innerHTML = player.legsArmor.def;
  document.getElementById('main_char_FeetArmor').innerHTML = player.feetArmor.name;
  document.getElementById('main_char_FeetArmordef').innerHTML = player.feetArmor.def;
  document.getElementById('main_char_ShouldersArmor').innerHTML = player.shouldersArmor.name;
  document.getElementById('main_char_ShouldersArmordef').innerHTML = player.shouldersArmor.def;
  
  displayQuests();
  updateInventory();
  
  updateStat();
}

function initMonster() {
  monsters = [];
  for(var i = 0; i < 3; i++) {
    monsters[i] = Object.assign({}, searchByName(listMonsters,"Rabbit"));
    monsters[i].exist = false;
    document.getElementById('monster_frame'+i).style.visibility = "hidden";
  }
}

function newgame() {
  player.curArea = searchByName(listZones,"Wheatcity");
  
  // create character
  initChar();
  
  // data
  changeArmor(new equipment(searchByName(listChestArmors, "Rags"), [], 3));
  changeArmor(new equipment(searchByName(listHeadArmors, "Nothing"), [], 3));
  changeArmor(new equipment(searchByName(listHandsArmors, "Nothing"), [], 3));
  changeArmor(new equipment(searchByName(listLegsArmors, "Nothing"), [], 3));
  changeArmor(new equipment(searchByName(listFeetArmors, "Nothing"), [], 3));
  changeArmor(new equipment(searchByName(listShouldersArmors, "Nothing"), [], 3));
  
  nbCraftItems = [];
  for (var i = 0; i < nbCraftItem; i++)
  nbCraftItems.push(0);
  
  gearItems = [];
  initQuests();
  initJobs();
}
