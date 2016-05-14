//----------------------//
//-  Main | Tabs main  -//
//----------------------//

function toggleActiveTabGame() {
  document.getElementById('tabs_game').classList.add('btn_active');
  document.getElementById('tabs_char').classList.remove('btn_active');
  document.getElementById('tabs_inventory').classList.remove('btn_active');
  document.getElementById('tabs_craft').classList.remove('btn_active');

  document.getElementById('tabs_content_game').classList.add('tabs_content_active');
  document.getElementById('tabs_content_char').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_inventory').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_craft').classList.remove('tabs_content_active');
}
function toggleActiveTabChar() {
  document.getElementById('tabs_game').classList.remove('btn_active');
  document.getElementById('tabs_char').classList.add('btn_active');
  document.getElementById('tabs_inventory').classList.remove('btn_active');
  document.getElementById('tabs_craft').classList.remove('btn_active');

  document.getElementById('tabs_content_game').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_char').classList.add('tabs_content_active');
  document.getElementById('tabs_content_inventory').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_craft').classList.remove('tabs_content_active');
}
function toggleActiveTabInventory() {
  document.getElementById('tabs_game').classList.remove('btn_active');
  document.getElementById('tabs_char').classList.remove('btn_active');
  document.getElementById('tabs_inventory').classList.add('btn_active');
  document.getElementById('tabs_craft').classList.remove('btn_active');

  document.getElementById('tabs_content_game').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_char').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_inventory').classList.add('tabs_content_active');
  document.getElementById('tabs_content_craft').classList.remove('tabs_content_active');
}
function toggleActiveTabCraft() {
  document.getElementById('tabs_game').classList.remove('btn_active');
  document.getElementById('tabs_char').classList.remove('btn_active');
  document.getElementById('tabs_inventory').classList.remove('btn_active');
  document.getElementById('tabs_craft').classList.add('btn_active');

  document.getElementById('tabs_content_game').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_char').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_inventory').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_craft').classList.add('tabs_content_active');
}

//-----------------------//
//-  Game | Menu items  -//
//-----------------------//

function displayMenuMap() {
  elworldmap = document.getElementById('worldmap_window');
  if (elworldmap.style.display == "inline") elworldmap.style.display = "none";
  else {
    document.getElementById('shop_window').style.display = "none";
    elworldmap.style.display = "inline";
  }
}

function displayMenuTailoring() {
  elTail = document.getElementById('main_char_tailoring_window');
  if (elTail.style.display == "inline") elTail.style.display = "none";
  else {
    document.getElementById('worldmap_window').style.display = "none";
    document.getElementById('shop_window').style.display = "none";
    elTail.style.display = "inline";
  }
  updateJob(Tailoring);
}

function displayMenuShop() {
  elShop = document.getElementById('shop_window');
  if (elShop.style.display == "inline") elShop.style.display = "none";
  else {
    document.getElementById('worldmap_window').style.display = "none";
    displayShopSell();
    elShop.style.display = "inline";
  }
}

function displayMenuGathering() {
  elGath = document.getElementById('gathering_window');
  if (elGath.style.display == "inline") elGath.style.display = "none";
  else {
    document.getElementById('worldmap_window').style.display = "none";
    document.getElementById('shop_window').style.display = "none";
    displayGathering();
    elGath.style.display = "inline";
  }
}

//-------------------------//
//-  Game | Hunting zone  -//
//-------------------------//

function displayNewMonster(i, monster) {
  document.getElementById('monster_frame'+i).style.visibility = "";
  document.getElementById('monster_name' + i).innerHTML = monster.name;
  document.getElementById('monster_curHPbar' + i).style.width = "50px";
  document.getElementById('monster_avatar' + i).src = monster.img;
  document.getElementById('monster_curHP' + i).innerHTML = monster.currHP;
  document.getElementById('monster_maxHP' + i).innerHTML = monster.maxHP;
  document.getElementById('monster_curHPbar' + i).style.backgroundColor = "#006600";
}

//---------------//
//-  Character  -//
//---------------//

function updateDisplayCharSheet() {
  document.getElementById("char_HP").innerHTML = player.maxHP;
  document.getElementById("char_MP").innerHTML = player.maxMP;

  document.getElementById("char_STR").innerHTML = player.fSTR;
  document.getElementById("char_DEX").innerHTML = player.fDEX;
  document.getElementById("char_INT").innerHTML = player.fINT;
  document.getElementById("char_WIS").innerHTML = player.fWIS;
  document.getElementById("char_CON").innerHTML = player.fCON;
  document.getElementById("char_AGI").innerHTML = player.fAGI;

  document.getElementById("char_points").innerHTML = player.avPoint;
}
