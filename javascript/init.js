//------------------//
//- Initialization -//
//------------------//

window.onload = init;

function init() {
  if (!localStorage.getItem('gameData')) {
    // No data found in the local storage - we make a new game
    log("Welcome to MMO Master!", "INFO");
    newGame();
  }
  else {
    // There's already a save in the local storage - we load it
    log("Welcome back to MMO Master!", "INFO");
    loadGame();
  }

  // display
  initDisplay();
  initMonster();
  initJobs();
  initLocalStorage();

  idle();
}

function newGame() {
  player.curArea = searchByName(listZones,"Wheatcity");

  // fetch datas from JSONs
  initQuests();

  createChar();

  // equip basic gear
  changeArmor(new equipment(searchByName(listChestArmors, "Rags"), [], 3));
  changeArmor(new equipment(searchByName(listHeadArmors, "Nothing"), [], 3));
  changeArmor(new equipment(searchByName(listHandsArmors, "Nothing"), [], 3));
  changeArmor(new equipment(searchByName(listLegsArmors, "Nothing"), [], 3));
  changeArmor(new equipment(searchByName(listFeetArmors, "Nothing"), [], 3));
  changeArmor(new equipment(searchByName(listShouldersArmors, "Nothing"), [], 3));

  // initialize inventory
  nbCraftItems = [];
  for (var i = 0; i < nbCraftItem; i++)
    nbCraftItems.push(0);
  gearItems = [];

  goto(player.curArea);
}

function loadGame() {
  gameData = JSON.parse(localStorage.getItem('gameData'));
  player = gameData.player;
  listAcceptedQuests = gameData.listAcceptedQuests;
  listAvailableQuests = gameData.listAvailableQuests;
  listQuests = gameData.listQuests;
  nbCraftItems = gameData.nbCraftItems;
  gearItems = gameData.gearItems;
  listJobs = gameData.listJobs;
  player.curArea = "Wheatcity";

  goto(player.curArea);
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

// 'Reset Game' button's on click
function resetgame() {
  localStorage.clear();
  clearChatLog();
  init();
}
