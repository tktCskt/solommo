//----------------------//
//-  Main | Tabs main  -//
//----------------------//

function toggleActiveTabGame() {
  document.getElementById('tabs-game').classList.add('btn-active');
  document.getElementById('tabs-char').classList.remove('btn-active');
  document.getElementById('tabs-inventory').classList.remove('btn-active');
  document.getElementById('tabs-craft').classList.remove('btn-active');

  document.getElementById('tabs-content-game').classList.add('tabs-content-active');
  document.getElementById('tabs-content-char').classList.remove('tabs-content-active');
  document.getElementById('tabs-content-inventory').classList.remove('tabs-content-active');
  document.getElementById('tabs-content-craft').classList.remove('tabs-content-active');
}
function toggleActiveTabChar() {
  document.getElementById('tabs-game').classList.remove('btn-active');
  document.getElementById('tabs-char').classList.add('btn-active');
  document.getElementById('tabs-inventory').classList.remove('btn-active');
  document.getElementById('tabs-craft').classList.remove('btn-active');

  document.getElementById('tabs-content-game').classList.remove('tabs-content-active');
  document.getElementById('tabs-content-char').classList.add('tabs-content-active');
  document.getElementById('tabs-content-inventory').classList.remove('tabs-content-active');
  document.getElementById('tabs-content-craft').classList.remove('tabs-content-active');
}
function toggleActiveTabInventory() {
  document.getElementById('tabs-game').classList.remove('btn-active');
  document.getElementById('tabs-char').classList.remove('btn-active');
  document.getElementById('tabs-inventory').classList.add('btn-active');
  document.getElementById('tabs-craft').classList.remove('btn-active');

  document.getElementById('tabs-content-game').classList.remove('tabs-content-active');
  document.getElementById('tabs-content-char').classList.remove('tabs-content-active');
  document.getElementById('tabs-content-inventory').classList.add('tabs-content-active');
  document.getElementById('tabs-content-craft').classList.remove('tabs-content-active');
}
function toggleActiveTabCraft() {
  updateJob(searchByName(listJobs,"Tailoring"));
  document.getElementById('tabs-game').classList.remove('btn-active');
  document.getElementById('tabs-char').classList.remove('btn-active');
  document.getElementById('tabs-inventory').classList.remove('btn-active');
  document.getElementById('tabs-craft').classList.add('btn-active');

  document.getElementById('tabs-content-game').classList.remove('tabs-content-active');
  document.getElementById('tabs-content-char').classList.remove('tabs-content-active');
  document.getElementById('tabs-content-inventory').classList.remove('tabs-content-active');
  document.getElementById('tabs-content-craft').classList.add('tabs-content-active');
}

//-----------------------//
//-  Game | Menu items  -//
//-----------------------//

function displayMenuMap() {
  elworldmap = document.getElementById('worldmap-window');
  if (elworldmap.style.display == "inline") elworldmap.style.display = "none";
  else {
    document.getElementById('shop-window').style.display = "none";
    elworldmap.style.display = "inline";
  }
}

function displayMenuShop() {
  elShop = document.getElementById('shop-window');
  if (elShop.style.display == "inline") elShop.style.display = "none";
  else {
    document.getElementById('worldmap-window').style.display = "none";
    displayShopSell();
    elShop.style.display = "inline";
  }
}

function displayMenuGathering() {
  elGath = document.getElementById('gathering-window');
  if (elGath.style.display == "inline") elGath.style.display = "none";
  else {
    document.getElementById('worldmap-window').style.display = "none";
    document.getElementById('shop-window').style.display = "none";
    displayGathering();
    elGath.style.display = "inline";
  }
}

//-------------------------//
//-  Game | Hunting zone  -//
//-------------------------//

function displayNewMonster(i, monster) {
  document.getElementById('monster-frame'+i).style.visibility = "";
  document.getElementById('monster-name' + i).innerHTML = monster.name;
  document.getElementById('monster-curHPbar' + i).style.width = "50px";
  document.getElementById('monster-avatar' + i).src = monster.img;
  document.getElementById('monster-curHP' + i).innerHTML = monster.currHP;
  document.getElementById('monster-maxHP' + i).innerHTML = monster.maxHP;
  document.getElementById('monster-curHPbar' + i).style.backgroundColor = "#006600";
}

//---------------//
//-  Character  -//
//---------------//

function updateDisplayCharSheet() {
  document.getElementById("char-HP").innerHTML = player.maxHP;
  document.getElementById("char-MP").innerHTML = player.maxMP;

  document.getElementById("char-STR").innerHTML = player.fSTR;
  document.getElementById("char-DEX").innerHTML = player.fDEX;
  document.getElementById("char-INT").innerHTML = player.fINT;
  document.getElementById("char-WIS").innerHTML = player.fWIS;
  document.getElementById("char-CON").innerHTML = player.fCON;
  document.getElementById("char-AGI").innerHTML = player.fAGI;

  document.getElementById("char-points").innerHTML = player.avPoint;
}

function updateDisplayTalents() {
  document.getElementById("availableSkillPoints").innerHTML = player.avTalent;
}