
//------------------//
//- Character data -//
//------------------//

var curArea = "";

var cNom = "Alexstrasza";
var cClass = "Novice";
var cLevel = 1;
var cXP = 0;
var cMoney = 0;

var cavPoint = 0;
var cavTalent = 0;

var cSTR = 10;
var cbSTR = 0;
var cmSTR = 1;
var cfSTR;

var cDEX = 10;
var cbDEX = 0;
var cmDEX = 1;
var cfDEX;

var cINT = 10;
var cbINT = 0;
var cmINT = 1;
var cfINT;

var cWIS = 10;
var cbWIS = 0;
var cmWIS = 1;
var cfWIS;

var cCON = 10;
var cbCON = 0;
var cmCON = 1;
var cfCON;

var cAGI = 10;
var cbAGI = 0;
var cmAGI = 1;
var cfAGI;

var cmaxHP;
var ccurHP;
var cregenHP;

var cmaxMP;
var ccurMP;
var cregenMP;

var cbDmg = 0;
var cmDmg = 1;

var dead = false;

var cArmor = "";
var cDef = 0;

var cWeapon = searchByName(listWeapons,"Sword");
var cAtk = cWeapon.damage;

//------------------//
//-      Init      -//
//------------------//

function initChar() {
    updateStat();

    ccurHP = cmaxHP;
    ccurMP = cmaxMP;

    displayHPbar();
    displayMPbar();
}

//------------------//
//-   Char sheet   -//
//------------------//

function updateStat() {
    cfSTR = (cSTR + cbSTR) * cmSTR;
    cfDEX = (cDEX + cbDEX) * cmDEX;
    cfINT = (cINT + cbINT) * cmINT;
    cfWIS = (cWIS + cbWIS) * cmWIS;
    cfCON = (cCON + cbCON) * cmCON;
    cfAGI = (cAGI + cbAGI) * cmAGI;

    cmDmg = cfSTR / 10;

    cmaxMP = cfINT * 1;
    cregenMP = cfINT * 0.01;

    cmaxHP = cfCON * 10;
    cregenHP = cfCON * 0.1;

    displayHPbar();
    displayMPbar();
    updateDisplayCharSheet();
}

function addcPoint(value) {
    if (cavPoint > 0) {
        switch (value) {
            case 'STR':
                cSTR++;
                break;
            case 'DEX':
                cDEX++;
                break;
            case 'INT':
                cINT++;
                break;
            case 'WIS':
                cWIS++;
                break;
            case 'CON':
                cCON++;
                break;
            case 'AGI':
                cAGI++;
                break;
        }
        cavPoint--;
        updateStat();
    } else {
        log("You don't have any point available.", "ERROR");
    }
}

function updateDisplayCharSheet() {
    document.getElementById("char_HP").innerHTML = cmaxHP;
    document.getElementById("char_MP").innerHTML = cmaxMP;

    document.getElementById("char_STR").innerHTML = cfSTR;
    document.getElementById("char_DEX").innerHTML = cfDEX;
    document.getElementById("char_INT").innerHTML = cfINT;
    document.getElementById("char_WIS").innerHTML = cfWIS;
    document.getElementById("char_CON").innerHTML = cfCON;
    document.getElementById("char_AGI").innerHTML = cfAGI;

    document.getElementById("char_points").innerHTML = cavPoint;

    if (cavPoint > 0) document.getElementById("menu_char").innerHTML = "<b>Character (" + cavPoint + ")</b>";
    else document.getElementById("menu_char").innerHTML = "Character";
}

//------------------//
//-   Char frame   -//
//------------------//

function changecHP(dmg) {
    ccurHP += dmg;

    if (ccurHP < 0) ccurHP = 0;
    else if (ccurHP > cmaxHP) ccurHP = cmaxHP;

    if (dead && ccurHP == cmaxHP) {
        log("You feel well again!", "INFO");
        dead = false;
    } else if (ccurHP == 0) {
        log("You died.", "INFO");
        dead = true;
    }

    displayHPbar();
}

function changecMP(mana) {
    ccurMP += mana;

    if (ccurMP < 0) ccurMP = 0;
    else if (ccurMP > cmaxMP) ccurMP = cmaxMP;

    displayMPbar();
}

function changecXP(xp) {
    cXP += xp;

    while (cXP >= xptolvlup()) lvlup();

    displayXPbar();
}

function xptolvlup() {
    if (cLevel == 1) return 100
    else if (cLevel == 2) return 130;
    else return cLevel * cLevel * 20;
}

function lvlup() {
    cXP = cXP - (xptolvlup());
    cLevel++;

    cavTalent++;
    cavPoint += 5;

    changecHP(cmaxHP);
    changecMP(cmaxMP);

    updateDisplayCharSheet();
    updateDisplayTalentSheet();

    log("Level up! You are level <b>" + cLevel + "</b>.", "INFO");
}

function displayHPbar() {
    var elbarHP = document.getElementById('HUD_character_barcur_HP');

    document.getElementById('main_char_curHP').innerHTML = Math.floor(ccurHP);
    document.getElementById('main_char_maxHP').innerHTML = cmaxHP;
    elbarHP.style.width = ccurHP / cmaxHP * 150 + "px";

    if (dead) {
        elbarHP.style.backgroundColor = "#ff0000";
    } else if (ccurHP / cmaxHP < 0.25) {
        elbarHP.style.backgroundColor = "#E96D37";
    } else if (ccurHP / cmaxHP < 0.5) {
        elbarHP.style.backgroundColor = "#DBA744";
    } else if (ccurHP / cmaxHP < 1) {
        elbarHP.style.backgroundColor = "#7ABA2F";
    } else if (ccurHP == cmaxHP) {
        elbarHP.style.backgroundColor = "#5CAB00";
    }
}

function displayMPbar() {
    document.getElementById('main_char_curMP').innerHTML = Math.floor(ccurMP);
    document.getElementById('main_char_maxMP').innerHTML = cmaxMP;
    document.getElementById('HUD_character_barcur_MP').style.width = ccurMP / cmaxMP * 150 + "px";
}

function displayXPbar() {
    document.getElementById('main_char_level').innerHTML = cLevel;
    document.getElementById('main_char_curXP').innerHTML = cXP;
    document.getElementById('main_char_maxXP').innerHTML = xptolvlup();
    document.getElementById('HUD_character_barcur_XP').style.width = cXP / xptolvlup() * 150 + "px";
}

//------------------//
//-  Quests data   -//
//------------------//

var c_nbQuests = 0;
var maxQuests = 3;
var nbQuests = 0;

function quest(type, details, number, name, XP, areabegin, areaend, available, unlockedP, textbegin, textend, money, unlockedQ) {
    this.id = nbQuests;
    nbQuests++;
    this.type = type;
    this.details = details;
    this.number = number;
    this.name = name;
    this.available = available;
    this.active = 0;
    this.progress = 0;
    this.finished = false;
    this.rewardXP = XP;
    this.rewardMoney = money;
    this.areabegin = areabegin;
    this.areaend = areaend;
    this.unlockedP = unlockedP;
    this.textbegin = textbegin;
    this.textend = textend;
    this.unlockedQ = unlockedQ;
}

listAcceptedQuests = [];
listAvailableQuests = [];
listQuests = [new quest("kill", "Rabbit", 20, "There's more of them?", 100, "Wheatcity", "Wheatcity", 0, "none", "Hello again, adventurer! We've got even more rabbits than before here. It almost looks like a sabotage...-- Haha, that's silly, everybody likes us here! Could you take care of that again for me, please?", "Oh, thank you my friend but... I have bad news. Do you remember when I spoke to you about sabotage?", 0, "none"), new quest("kill", "Chicken", 5, "A feast for a mayor", 100, "Wheatcity", "Wheatcity", 0, "none", "Hi, I'm Granny Knajo. Would you mind catching some chickens for me with that sword of yours? I got an order from the mayor for tonight; I don't have time for this. Take care, they're the strongest chickens around!", "Oh, thank you for your help dear. You can keep your loot then, I'll just take the meat. Here, have a chicken.", 0, "none"), new quest("collect", "Rabbit hide", 3, "Sewing socks for winter", 100, "Wheatcity", "Wheatcity", 0, "Tailoring", "They announced a strong winter this year. With all these rabbits, we could make some socks and such. Go bring me some rabbit hides. ... What? Yeah, that's the first time seeing you too and so what? My nephew talked about you but he never mentioned you were this chatty. Less talk, more hides, and I'll teach you how to make an armor.", "Hah, once you don't talk, you're effective! Good. There, I'll show you.", 50, "none")];

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
    if (up_quest.unlockedQ != "none") {
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
    curArea = searchByName(listZones,newZone);
    if (document.getElementById('worldmap_window').style.display != "none") document.getElementById('worldmap_window').style.display = "none";
    document.getElementById('HUD_zone_location').innerHTML = newZone;
    if (newZone == "Knajo fields") {
        displayHuntingzone("Knajo fields");
    } else if (newZone == "Wheatcity") {
        displayCityzone("Wheatcity");
    }
    displayQuests();
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
        if (listAcceptedQuests[i].finished == true && listAcceptedQuests[i].areaend == curArea.name) {
            elQuest = document.createElement('span');
            elQuest.id = 'char_avacquest' + i;
            elQuest.className = 'city_available_quest';
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
        if (listAvailableQuests[i].available == 1 && listAvailableQuests[i].areabegin == curArea.name) {
            elQuest = document.createElement('span');
            elQuest.id = 'char_city_available_quest' + i;
            elQuest.className = 'city_available_quest';
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
    document.getElementById("menu_talent").innerHTML = "<b>Talents (" + cavTalent + ")</b>";
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
					new zone("Knajo fields",[],[],[searchByName(listCraftItems,"Iron"),searchByName(listCraftItems,"Copper")],[75,75])];

//------------------//
//-  Jobs / Craft  -//
//------------------//


/*TODO tailoring -> job*/
function updateJob(String_job) {
	var job = searchByName(listJobs,String_job);
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
	gather(curArea,searchByName(listJobs,"Mining"));};

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
    cWeapon = newWeapon;
    cAtk = cWeapon.damage;
    document.getElementById('main_char_weapon').innerHTML = cWeapon.name;
    document.getElementById('main_char_weaponatk').innerHTML = cWeapon.damage;
}

function changeChestArmor(newArmor) {
    if (cArmor != "") {
        addgItem(cArmor);
    }
    cArmor = newArmor;
    cDef = cArmor.def;
    document.getElementById('main_char_armor').innerHTML = cArmor.name;
    document.getElementById('main_char_armordef').innerHTML = cArmor.def;
}

//------------------//
//-   Inventory    -//
//------------------//

function changecMoney(n) {
    cMoney += n;
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
    document.getElementById('char_gold').innerHTML = cMoney;
    document.getElementById('char_gold_shop').innerHTML = cMoney;
}

function displayInventory() {
    var elInventory = document.getElementById('main_char_inventory_window');
    var elItem;
    var i;

    //Craft items
    for (i = 0; i < nbCraftItem; i++) {
        elItem = document.getElementById('char_cInventory' + i);
        if (nbCraftItems[i] > 0) {
            if (elItem != null) {
                elItem.innerHTML = nbCraftItems[i] + " " + listCraftItems[i].name + "<br/>";
            } else {
                elItem = document.createElement('span');
                elItem.id = 'char_cInventory' + i;
                elItem.innerHTML = nbCraftItems[i] + " " + listCraftItems[i].name + "<br/>";
                elInventory.appendChild(elItem);
            }
        } else {
            if (elItem != null) {
                elInventory.removeChild(elItem);
            }
        }
    }

    //gear

    for (i = 0; i < gearItems.length; i++) {
        elItem = document.getElementById('char_gInventory' + i)

        if (elItem != null) {
            elItem.innerHTML = gearItems[i].name + "<br/>";
        } else {
            elItem = document.createElement('span');
            elItem.id = 'char_gInventory' + i;
            elItem.innerHTML = gearItems[i].name + "<br/>";
            elInventory.appendChild(elItem);
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

    // Earn XP
    changecXP(md_monster.XP);
    var i;
    for (i = 0; i < md_monster.loots.length; i++) {
        if ((Math.random() * 100 <= md_monster.loots[i].percentage)) {
            addcItem(md_monster.loots[i].item, 1);
        }
    }

    // Display update
    monsters[k].exist = false;
    document.getElementById('monster_name' + k).innerHTML = "";
    document.getElementById('monster_curHPbar' + k).style.width = "0px";
    document.getElementById('monster_avatar' + k).src = "";
    document.getElementById('monster_curHP' + k).innerHTML = "";
    document.getElementById('monster_maxHP' + k).innerHTML = "";

    // Update Quests
    for (i = 0; i < listAcceptedQuests.length; i++) {
        if (md_monster.name == listAcceptedQuests[i].details && listAcceptedQuests[i].type == "kill") {
            updateProgress(listAcceptedQuests[i], 1);
        }
    }
}

function clickmonster(i) {
    if (dead) log("You can't do that when you're dead.", "ERROR");
    else if (monsters[i].currHP > 0) {
        changemHP(i, -((cAtk + cbDmg) * cmDmg));
        if (monsters[i].currHP > 0) {
            var damage = -monsters[i].atk + cDef;
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
//- Misc functions -//
//------------------//

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

//------------------//
//-   Menu items   -//
//------------------//

function displayMenuChar() {
    elmcstats = document.getElementById('main_char_stats_window');
    if (elmcstats.style.display == "inline") elmcstats.style.display = "none";
    else {
        document.getElementById('main_char_tailoring_window').style.display = "none";
        elmcstats.style.display = "inline";
        document.getElementById('main_char_quests_window').style.display = "none";
        document.getElementById('main_char_inventory_window').style.display = "none";
        document.getElementById('worldmap_window').style.display = "none";
        document.getElementById('shop_window').style.display = "none";
    }
}

function displayMenuQuests() {
    elmcquests = document.getElementById('main_char_quests_window');
    if (elmcquests.style.display == "inline") elmcquests.style.display = "none";
    else {
        document.getElementById('main_char_tailoring_window').style.display = "none";
        document.getElementById('main_char_stats_window').style.display = "none";
        elmcquests.style.display = "inline";
        document.getElementById('main_char_inventory_window').style.display = "none";
        document.getElementById('worldmap_window').style.display = "none";
        document.getElementById('shop_window').style.display = "none";
    }
}

function displayMenuInventory() {
    elmcinventory = document.getElementById('main_char_inventory_window');
    if (elmcinventory.style.display == "inline") elmcinventory.style.display = "none";
    else {
        document.getElementById('main_char_tailoring_window').style.display = "none";
        document.getElementById('main_char_stats_window').style.display = "none";
        document.getElementById('main_char_quests_window').style.display = "none";
        elmcinventory.style.display = "inline";
        document.getElementById('worldmap_window').style.display = "none";
        document.getElementById('shop_window').style.display = "none";
    }
}

function displayMenuMap() {
    elworldmap = document.getElementById('worldmap_window');
    if (elworldmap.style.display == "inline") elworldmap.style.display = "none";
    else {
        document.getElementById('main_char_tailoring_window').style.display = "none";
        document.getElementById('main_char_stats_window').style.display = "none";
        document.getElementById('main_char_quests_window').style.display = "none";
        document.getElementById('main_char_inventory_window').style.display = "none";
        document.getElementById('shop_window').style.display = "none";
        elworldmap.style.display = "inline";
    }
}

function displayMenuTailoring() {
    elTail = document.getElementById('main_char_tailoring_window');
    if (elTail.style.display == "inline") elTail.style.display = "none";
    else {
        document.getElementById('main_char_stats_window').style.display = "none";
        document.getElementById('main_char_quests_window').style.display = "none";
        document.getElementById('main_char_inventory_window').style.display = "none";
        document.getElementById('worldmap_window').style.display = "none";
        document.getElementById('shop_window').style.display = "none";
        elTail.style.display = "inline";
    }
    updateJob("Tailoring");
}

function displayMenuShop() {
    elShop = document.getElementById('shop_window');
    if (elShop.style.display == "inline") elShop.style.display = "none";
    else {
        document.getElementById('main_char_stats_window').style.display = "none";
        document.getElementById('main_char_quests_window').style.display = "none";
        document.getElementById('main_char_inventory_window').style.display = "none";
        document.getElementById('worldmap_window').style.display = "none";
        document.getElementById('main_char_tailoring_window').style.display = "none";
        displayShopSell();
        elShop.style.display = "inline";
    }
}

function displayMenuGathering() {
	elGath = document.getElementById('gathering_window');
    if (elGath.style.display == "inline") elGath.style.display = "none";
    else {
        document.getElementById('main_char_stats_window').style.display = "none";
        document.getElementById('main_char_quests_window').style.display = "none";
        document.getElementById('main_char_inventory_window').style.display = "none";
        document.getElementById('worldmap_window').style.display = "none";
        document.getElementById('main_char_tailoring_window').style.display = "none";
		document.getElementById('shop_window').style.display = "none";
        displayGathering();
        elGath.style.display = "inline";
    }
}

//------------------//
//-      Idle      -//
//------------------//

var idle = function () {
    // character regeneration
    if (ccurHP < cmaxHP) changecHP(cregenHP);
    if (ccurMP < cmaxMP) changecMP(cregenMP);

    // skills regeneration

    // repop
    var i;
    for (i = 0; i < 3; i++) {
        if (monsters[i].exist == 0) {
            if (Math.random() * 100 < 10) {
                monsters[i].exist = true;
                monsters[i].currHP = monsters[i].maxHP;
                document.getElementById('monster_name' + i).innerHTML = monsters[i].name;
                document.getElementById('monster_curHPbar' + i).style.width = "50px";
                document.getElementById('monster_avatar' + i).src = monsters[i].img;
                document.getElementById('monster_curHP' + i).innerHTML = monsters[i].currHP;
                document.getElementById('monster_maxHP' + i).innerHTML = monsters[i].maxHP;
                document.getElementById('monster_curHPbar' + i).style.backgroundColor = "#006600";
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

    // wait 1s
    setTimeout(idle, 1000);
}

var dialogGeneral = ["[1] <b>Chin chong</b>: Sell 3 000 000 000 gold for 1 000$! Check it out in mmomaster-farmgold.com !", "[1] <b>Sayorg the ugly</b>: Someone to play LoL or HotS here?"];
var dialogCommerce = ["[2] <b>Leroy Jenkins</b>: Buy chickens"];
var dialogRecruitment = ["[4] <b>DarkSasuke</b>: I recruit members in my new guild Revenge of Akatsuki. Leader lvl 57. No noob pls!"];

//------------------//
//- Initialization -//
//------------------//

window.onload = init

function init() {
    newgame();
}

function newgame() {
    // create character
    initChar();

    // data
    changeChestArmor(new equipment(searchByName(listChestArmors, "Rags"), [], 3));
    curArea = searchByName(listZones,"Wheatcity");
    for (var i = 0; i < nbCraftItem; i++)
        nbCraftItems.push(0);
    listAvailableQuests.push(new quest("kill", "Rabbit", 2, "The cereal killers", 100, "Wheatcity", "Wheatcity", 1, "none", "Hello there! Are you new here? I am John Knajo. You are searching for a job? There's actually some rabbits annoying us in the corn fields. They're eating our crops and that's bad for business. Kill some of them for me and I will gladly pay you for your help.", "I knew I could count on you; there, take these few coppers and stay around. My family might find some jobs for you too.", 50, [searchByName(listQuests, "There's more of them?"), searchByName(listQuests, "A feast for a mayor"), searchByName(listQuests, "Sewing socks for winter")]));

    // display
    document.getElementById('main_char_name').innerHTML = cNom;
    document.getElementById('main_char_class').innerHTML = cClass;
    displayXPbar();
    displayHPbar();
    document.getElementById('main_char_weapon').innerHTML = cWeapon.name;
    document.getElementById('main_char_weaponatk').innerHTML = cWeapon.damage;
    document.getElementById('main_char_armor').innerHTML = cArmor.name;
    document.getElementById('main_char_armordef').innerHTML = cArmor.def;
    displayQuests();
    updateInventory();

    // monsters
	monsters = [Object.create(searchByName(listMonsters,"Rabbit")),Object.create(searchByName(listMonsters,"Chicken")),Object.create(searchByName(listMonsters,"Rabbit"))]
    for (var i = 0; i < 3; i++) {
        document.getElementById('monster_name' + i).innerHTML = monsters[i].name;
        changemHP(i, 0);
    }

    // TESTING JOB
    updateJob("Tailoring");

    // Begin game
    goto("Wheatcity");
    log("Welcome to MMO Master!", "INFO");

    idle();
}
