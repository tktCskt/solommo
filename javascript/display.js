
//-----------------//
//-   Tabs main   -//
//-----------------//

function toggleActiveTabGame() {
  document.getElementById('tabs_game').classList.add('tabs_btn_active');
  document.getElementById('tabs_char').classList.remove('tabs_btn_active');
  document.getElementById('tabs_craft').classList.remove('tabs_btn_active');

  document.getElementById('tabs_content_game').classList.add('tabs_content_active');
  document.getElementById('tabs_content_char').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_craft').classList.remove('tabs_content_active');
}
function toggleActiveTabChar() {
  document.getElementById('tabs_game').classList.remove('tabs_btn_active');
  document.getElementById('tabs_char').classList.add('tabs_btn_active');
  document.getElementById('tabs_craft').classList.remove('tabs_btn_active');

  document.getElementById('tabs_content_game').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_char').classList.add('tabs_content_active');
  document.getElementById('tabs_content_craft').classList.remove('tabs_content_active');
}
function toggleActiveTabCraft() {
  document.getElementById('tabs_game').classList.remove('tabs_btn_active');
  document.getElementById('tabs_char').classList.remove('tabs_btn_active');
  document.getElementById('tabs_craft').classList.add('tabs_btn_active');

  document.getElementById('tabs_content_game').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_char').classList.remove('tabs_content_active');
  document.getElementById('tabs_content_craft').classList.add('tabs_content_active');
}


//----------------//
//-  Menu items  -//
//----------------//

function displayMenuQuests() {
  elmcquests = document.getElementById('main_char_quests_window');
  if (elmcquests.style.display == "inline") elmcquests.style.display = "none";
  else {
    document.getElementById('main_char_tailoring_window').style.display = "none";
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
    document.getElementById('main_char_quests_window').style.display = "none";
    document.getElementById('main_char_inventory_window').style.display = "none";
    document.getElementById('worldmap_window').style.display = "none";
    document.getElementById('shop_window').style.display = "none";
    elTail.style.display = "inline";
  }
  updateTailoring();
}

function displayMenuShop() {
  elShop = document.getElementById('shop_window');
  if (elShop.style.display == "inline") elShop.style.display = "none";
  else {
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
    document.getElementById('main_char_quests_window').style.display = "none";
    document.getElementById('main_char_inventory_window').style.display = "none";
    document.getElementById('worldmap_window').style.display = "none";
    document.getElementById('main_char_tailoring_window').style.display = "none";
    document.getElementById('shop_window').style.display = "none";
    displayGathering();
    elGath.style.display = "inline";
  }
}
