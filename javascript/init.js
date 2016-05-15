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
  initLocalStorage();

  idle();
}

function newGame() {
  player.curArea = searchByName(listZones,"Wheatcity");

  // fetch datas from JSONs
  initQuests();

  createChar();

  // equip basic gear
  changeChestArmor(new equipment(searchByName(listChestArmors, "Rags"), [], 3));

  // initialize inventory
  nbCraftItems = [];
  for (var i = 0; i < nbCraftItem; i++)
    nbCraftItems.push(0);
  gearItems = [];

  // TESTING JOB
  updateJob(searchByName(listJobs,"Tailoring"));

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
  player.curArea = "Wheatcity";

  goto(player.curArea);
}

function initLocalStorage() {
  gameData.player = player;
  gameData.listAcceptedQuests = listAcceptedQuests;
  gameData.listAvailableQuests = listAvailableQuests;
  gameData.listQuests = listQuests;
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
  document.getElementById('main_char_armor').innerHTML = player.armor.name;
  document.getElementById('main_char_armordef').innerHTML = player.armor.def;

  displayQuests();
  updateInventory();

  updateStat();
}

function initMonster() {
  monsters = [];
  for (var i=0; i<3; i++) {
    var thisarea = searchByName(listZones, "Knajo fields");
    var monsterRate = Math.random() * 100;
    for (var j = 0; j < thisarea.listMonsters.length; j++) {
      if (monsterRate <= thisarea.monstersRate[j]) {
        thisarea.monstersRate;
        monsters[i] = Object.assign({}, thisarea.listMonsters[j]);
        break;
      }
    }
    displayNewMonster(i, monsters[i])
  }
}

// 'Reset Game' button's on click
function resetgame() {
  localStorage.clear();
  clearChatLog();
  init();
}
