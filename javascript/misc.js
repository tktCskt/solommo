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
    if(player.curArea.isDungeonZone)
    {
      leaveDungeon(player.curArea, false);
    }
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
  var elbarHP = document.getElementById('HUD-character-barcur-HP');
  
  document.getElementById('main-char-curHP').innerHTML = Math.floor(player.curHP);
  document.getElementById('main-char-maxHP').innerHTML = player.maxHP;
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
  document.getElementById('main-char-curMP').innerHTML = Math.floor(player.curMP);
  document.getElementById('main-char-maxMP').innerHTML = player.maxMP;
  document.getElementById('HUD-character-barcur-MP').style.width = player.curMP / player.maxMP * 150 + "px";
}

function displayXPbar() {
  document.getElementById('main-char-level').innerHTML = player.level;
  document.getElementById('main-char-curXP').innerHTML = player.xp;
  document.getElementById('main-char-maxXP').innerHTML = xptolvlup();
  document.getElementById('HUD-character-barcur-XP').style.width = player.xp / xptolvlup() * 150 + "px";
}

//------------------//
//-      Zones     -//
//------------------//

function goto(newZone) {
  newZone = searchByName(listZones, newZone);
  initMonster();
  player.curArea = newZone;
  if (document.getElementById('worldmap-window').style.display != "none") document.getElementById('worldmap-window').style.display = "none";
  document.getElementById('HUD-zone-location').innerHTML = newZone.name;
  if(newZone.isDungeonZone) {
    displayDungeonZone(newZone.name);
    } else if(newZone.isHuntingZone) {
    displayHuntingzone(newZone.name);
    } else {
    displayCityzone(newZone.name);
  }
  
  displayQuests();
}

function gotokingdomcity() {
  goto("Wheatcity");
}

function displayDungeonZone(newZone) {
  var elMap = document.getElementById('idMap');
  var elReturnCity = document.getElementById('idReturnCity');
  elMap.setAttribute("title","You can not leave the dungeon until you're dead or the boss is.");
  elMap.setAttribute("onclick","");
  elReturnCity.setAttribute("title","You can not leave the dungeon until you're dead or the boss is.");
  elReturnCity.setAttribute("onclick","");
  document.getElementById('hunting-zone').style.display = "block";
  document.getElementById('city-zone').style.display = "none";
}

function displayHuntingzone(newZone) {
  document.getElementById('hunting-zone').style.display = "block";
  document.getElementById('city-zone').style.display = "none";
}

function displayCityzone(newZone) {
  document.getElementById('hunting-zone').style.display = "none";
  document.getElementById('city-zone').style.display = "block";
}

function leaveDungeon(dungeon, success) 
{
  dungeon.spawnNumber = 0;
  if(success) 
  {
    log("You finished " + dungeon.name, "INFO");
  }
  else
  {
    log("You failed " + dungeon.name, "INFO");
  }
  var elMap = document.getElementById('idMap');
  var elReturnCity = document.getElementById('idReturnCity');
  elMap.setAttribute("title","Display the map of the world");
  elMap.setAttribute("onclick","displayMenuMap();");
  elReturnCity.setAttribute("title","Return to the main city of the current kingdom");
  elReturnCity.setAttribute("onclick","gotokingdomcity();");
  gotokingdomcity();
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
  var elShopSell = document.getElementById('shop-window-sell');
  var elItem = document.getElementById('shopSG' + gearItems.length);
  elShopSell.removeChild(elItem);
  updateInventory();
  displayShopSell();
}

function displayShopSell() {
  var elShopSell = document.getElementById('shop-window-sell');
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
  var elJob = document.getElementById('job-craft-boxes');
  elJob.innerHTML = "";
  document.getElementById('job-barcur-XP').style.width = job.xp / ((job.progress+1)*50) * 300 + 'px';
  document.getElementById('job-cur-XP').innerHTML = job.xp;
  document.getElementById('job-max-XP').innerHTML = (job.progress+1)*50;
  document.getElementById('job-level').innerHTML = job.progress;
  
  for (var i = 0; i < job.recipes.length; i++) {
    var recipe = job.recipes[i];
    if (job.progress >= recipe.level) {
      var elRecipe = document.getElementById('char-job' + i);
      var isNew = false;
      
      if (elRecipe == null) {
        isNew = true;
        elRecipe = document.createElement('div');
        elRecipe.setAttribute('class', 'craft-box');
        elRecipe.id = 'char-job' + i;
        
        elJob.appendChild(elRecipe);
      }
      
      if (isNew) {
        var elRecipeTitle = document.createElement('div');
        elRecipeTitle.setAttribute('class', 'craft-box-title');
        elRecipeTitle.innerHTML = recipe.item.name;
        
        elRecipe.appendChild(elRecipeTitle);
      }
      
      var canbecrafted = true;
      for (var j = 0; j < recipe.ingredients.length; j++) {
        var ingId = recipe.ingredients[j].id;
        
        if (isNew) {
          var elRecipeIngredient = document.createElement('div');
          elRecipeIngredient.id = 'char-job-ing-' + i + '-' + j;
          elRecipeIngredient.setAttribute('class', 'craft-box-ingredient');
          
          var elRecipeIngredientTitle = document.createElement('div');
          elRecipeIngredientTitle.setAttribute('class', 'craft-box-ingredient-name');
          elRecipeIngredientTitle.innerHTML = recipe.ingredients[j].name;
          
          var elRecipeIngredientNumber = document.createElement('div');
          elRecipeIngredientNumber.setAttribute('class', 'craft-box-ingredient-number');
          elRecipeIngredientNumber.id = 'char-job-ingN-' + i + '-' + j;
          elRecipeIngredientNumber.innerHTML = nbCraftItems[ingId] + "/" + recipe.numbers[j];
          
          elRecipeIngredient.appendChild(elRecipeIngredientTitle);
          elRecipeIngredient.appendChild(elRecipeIngredientNumber);
          elRecipe.appendChild(elRecipeIngredient);
        }
        else {
          document.getElementById('char-job-ingN-' + i + '-' + j).innerHTML = nbCraftItems[ingId] + "/" + recipe.numbers[j];
        }
        
        if (nbCraftItems[ingId] < recipe.numbers[j]) {
          document.getElementById('char-job-ing-' + i + '-' + j).style.backgroundColor = "#EDE8DB";
          canbecrafted = false;
        }
        else {
          document.getElementById('char-job-ing-' + i + '-' + j).style.backgroundColor = "#D4DCB9";
        }
      }
      if (canbecrafted) elRecipe.style.backgroundColor = "#B9D6AD";
      else elRecipe.style.backgroundColor = "#E7E0CF";
      
      if (isNew) {
        var elRecipeXP = document.createElement('div');
        elRecipeXP.setAttribute('class', 'craft-box-XP');
        
        var elRecipeTextXP = document.createElement('span');
        elRecipeTextXP.id = 'job-recipe-XP' + i;
        
        var elRecipeBarXP = document.createElement('div');
        elRecipeBarXP.setAttribute('class', 'craft-box-bar-XP');
        elRecipeBarXP.innerHTML = "&nbsp;";
        
        var elRecipeBarcurXP = document.createElement('div');
        elRecipeBarcurXP.setAttribute('class', 'craft-box-barcur-XP');
        elRecipeBarcurXP.id = 'job-recipe-XPcur' + i;
        elRecipeBarcurXP.style.width = recipe.progress / 5 * 100 + 'px';
        
        elRecipeXP.appendChild(elRecipeBarXP);
        elRecipeXP.appendChild(elRecipeBarcurXP);
        elRecipeBarXP.appendChild(elRecipeTextXP);
        elRecipe.appendChild(elRecipeXP);
      }
      else {
        document.getElementById('job-recipe-XP' + i).innerHTML = recipe.progress;
        document.getElementById('job-recipe-XPcur' + i).style.width = recipe.progress / 5 * 100 + 'px';
      }
      
      elRecipe.setAttribute('iRecipe', i);
      elRecipe.onclick = function () {
        craft(job, this.getAttribute('iRecipe'));
      };
    }
  }
}

function displayGathering() {
  var elGathering = document.getElementById('gathering-window');
  
  var elTxt = document.getElementById("gathering-txt");
  if (elTxt == null)
  {
    elTxt = document.createElement('div');
    elTxt.id = "gathering-txt";
    elTxt.innerHTML = "What resource do you want to gather ?<br/>";
    elGathering.appendChild(elTxt);
  }
  elTxt = document.getElementById("gathering-mining");
  if (elTxt == null)
  {
    elTxt = document.createElement('div');
    elTxt.id = "gathering-mining";
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
  this.sQuality = "";
  this.modif = 1;
  
  if (quality >= 6) {
    this.sQuality += "Legendary";
    this.modif = 2;
    } else if (quality >= 5) {
    this.sQuality += "Perfect";
    this.modif = 1.5;
    } else if (quality >= 4) {
    this.sQuality += "Great";
    this.modif = 1.2;
    } else if (quality >= 3) {
    this.sQuality += "";
    this.modif = 1;
    } else if (quality >= 2) {
    this.sQuality += "Passable";
    this.modif = 0.8;
    } else if (quality >= 1) {
    this.sQuality += "Rubbish";
    this.modif = 0.5;
    } else {
    this.sQuality += "Crappy";
    this.modif = 0.0;
  }
  
  if(this.sQuality != "") {
    this.name += this.sQuality + " ";
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
  document.getElementById('main-char-weapon').innerHTML = player.weapon.name;
  document.getElementById('main-char-weaponatk').innerHTML = player.weapon.damage;
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
  document.getElementById('main-char-' + newArmor.part + 'Armor').innerHTML = newArmor.name;
  document.getElementById('main-char-' + newArmor.part + 'Armordef').innerHTML = newArmor.def;
  
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
  document.getElementById('char-gold').innerHTML = player.money;
  document.getElementById('char-gold-shop').innerHTML = player.money;
}

function displayInventory() {
  var elInventory = document.getElementById('tabs-content-inventory');
  
  var inventoryGold = document.createElement('div');
  inventoryGold.setAttribute("class","menu-inventory-gold");
  var inventoryGoldAmount = document.createElement('span');
  inventoryGoldAmount.setAttribute("id","char-gold");
  
  inventoryGold.appendChild(inventoryGoldAmount);
  elInventory.appendChild(inventoryGold);
  
  var elInventoryResources = document.getElementById('menu-inventory-resources');
  elInventoryResources.innerHTML = "";
  
  var elInventoryEquipments = document.getElementById('menu-inventory-equipments');
  elInventoryEquipments.innerHTML = "";
  
  var elItem;
  var i;
  
  //Resources
  for (i = 0; i < nbCraftItem; i++) {
    elItem = document.getElementById('char-cInventory' + i);
    if (nbCraftItems[i] > 0) {
      if (elItem != null) {
        elItem.innerHTML = nbCraftItems[i] + " " + listCraftItems[i].name;
        } else {
        elItem = document.createElement('div');
        elItem.id = 'char-cInventory' + i;
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
    elItem = document.getElementById('char-gInventory' + i)
    
    if (elItem != null) {
      elItem.innerHTML = gearItems[i].name + "<br/>";
      } else {
      elItem = document.createElement('div');
      elItem.id = 'char-gInventory' + i;
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

function monsterDeath(mdMonster, k) {
  log("You defeated the <b>" + monsters[k].name + "</b> and earned " + monsters[k].XP + "xp.", "INFO");
  
  // Process XP and loot
  changecXP(mdMonster.XP);
  var i;
  for (i = 0; i < mdMonster.loots.length; i++) {
    if ((Math.random() * 100 <= mdMonster.loots[i].percentage)) {
      addcItem(mdMonster.loots[i].item, 1);
    }
  }
  
  // Hide this monster frame
  monsters[k].exist = false;
  document.getElementById('monster-frame'+k).style.visibility = "hidden";
  
  // Update Quests
  for (i = 0; i < listAcceptedQuests.length; i++) {
    if (mdMonster.name == listAcceptedQuests[i].details && listAcceptedQuests[i].type == "kill") {
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
  
  var elmbarHP = document.getElementById('monster-curHPbar' + i);
  
  document.getElementById('monster-curHP' + i).innerHTML = monsters[i].currHP;
  document.getElementById('monster-maxHP' + i).innerHTML = monsters[i].maxHP;
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
  if(thisarea.isHuntingZone) {
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
  else if (thisarea.isDungeonZone)
  {
    var respawnNeeded = true;
    for(var i = 0; i < 3; i++)
    {
      if(monsters[i].exist)
      {
        respawnNeeded = false;
      }
    }
    if(respawnNeeded)
    {
      thisarea.spawnNumber++;
      if(thisarea.spawnNumber == thisarea.maxSpawn)
      {
        for(var i = 0; i < Math.min(thisarea.boss.length, 3); i++)
        {
          monsters[i] = Object.assign({}, thisarea.boss[i]);
          displayNewMonster(i, monsters[i]);
        }
      }
      else if(thisarea.spawnNumber > thisarea.maxSpawn)
      {
        leaveDungeon(thisarea,true); 
      }
      else
      {
        for(var i = 0; i < 3; i++)
        {
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
