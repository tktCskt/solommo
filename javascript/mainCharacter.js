var player = {};

function initChar() {
  player = {
    curArea:"Wheatcity",
    name:"Alexstrasza",
    class:"Novice",
    level:1,
    xp:0,
    money:0,

    avPoint:0,
    avTalent:0,

    STR:10,
    bSTR:0,
    mSTR:1,
    fSTR:10,

    DEX:10,
    bDEX:0,
    mDEX:1,
    fDEX:10,

    INT:10,
    bINT:0,
    mINT:1,
    fINT:10,

    WIS:10,
    bWIS:0,
    mWIS:1,
    fWIS:10,

    CON:10,
    bCON:0,
    mCON:1,
    fCON:10,

    AGI:10,
    bAGI:0,
    mAGI:1,
    fAGI:10,

    maxHP:100,
    curHP:100,
    regenHP:1,

    maxMP:10,
    curMP:10,
    regenMP:0.1,

    bDMG:0,
    mDMG:1,

    dead:false,

    chestArmor:"",
    headArmor:"",
    handsArmor:"",
    feetArmor:"",
    legsArmor:"",
    shouldersArmor:"",
    def:0
  }
  updateStat();

  player.curHP = player.maxHP;
  player.curMP = player.maxMP;
  player.weapon = searchByName(listWeapons, 'Sword');
  player.atk = player.weapon.damage;

  displayHPbar();
  displayMPbar();

  gameData.player = player;
}
  
  function addcPoint(value) {
  if (player.avPoint > 0) {
    switch (value) {
      case 'STR':
      player.STR++;
      break;
      case 'DEX':
      player.DEX++;
      break;
      case 'INT':
      player.INT++;
      break;
      case 'WIS':
      player.WIS++;
      break;
      case 'CON':
      player.CON++;
      break;
      case 'AGI':
      player.AGI++;
      break;
    }
    player.avPoint--;
    updateStat();
  } else {
    log("You don't have any point available.", "ERROR");
  }
}


//------------------//
//-   Char sheet   -//
//------------------//

function updateStat() {
  player.fSTR = (player.STR + player.bSTR) * player.mSTR;
  player.fDEX = (player.DEX + player.bDEX) * player.mDEX;
  player.fINT = (player.INT + player.bINT) * player.mINT;
  player.fWIS = (player.WIS + player.bWIS) * player.mWIS;
  player.fCON = (player.CON + player.bCON) * player.mCON;
  player.fAGI = (player.AGI + player.bAGI) * player.mAGI;

  player.mDMG = player.fSTR / 10;

  player.maxMP = player.fINT * 1;
  player.regenMP = player.fINT * 0.01;

  player.maxHP = player.fCON * 10;
  player.regenHP = player.fCON * 0.1;

  displayHPbar();
  displayMPbar();
  updateDisplayCharSheet();
}

function addcPoint(value) {
  if (player.avPoint > 0) {
    switch (value) {
      case 'STR':
      player.STR++;
      break;
      case 'DEX':
      player.DEX++;
      break;
      case 'INT':
      player.INT++;
      break;
      case 'WIS':
      player.WIS++;
      break;
      case 'CON':
      player.CON++;
      break;
      case 'AGI':
      player.AGI++;
      break;
    }
    player.avPoint--;
    updateStat();
  } else {
    log("You don't have any point available.", "ERROR");
  }
}