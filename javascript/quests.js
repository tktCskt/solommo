/* Global variables */
var listAcceptedQuests = [];
var listAvailableQuests = [];
var listQuests = [];
var cNbQuests = 0;
var maxQuests = 3;
var nbQuests = 0;
var avDisplayedQuests = 0;
var curDisplayedQuests = 0;

/* Initialization */
function initQuests() {
  console.log("Initialisation des quêtes..");
  listQuests = [];
  listAcceptedQuests = [];
  listAvailableQuests = [];

  fetchJSONFile('resources/quests.json', function(data) {
      listQuests = data;
      listQuests.forEach(function(quest) {
        if (quest.available) {
          listAvailableQuests.push(quest);
        }
      });
      displayQuests();
  });
}

/* Display functions */
function displayQuests() {
  displayCityQuest();
  displayQuickCharQuest();
}

/* Display in progress quests in the quick bar in the game */
function displayQuickCharQuest() {
  var minusQuests = 0;
  var j;

  for (j = 0; j < listAcceptedQuests.length; j++) {
    if (document.getElementById('char-curquest' + j).innerHTML == "") curDisplayedQuests++;
    if (listAcceptedQuests[j].progress != listAcceptedQuests[j].number) document.getElementById('char-curquest' + j).innerHTML = "<b>" + listAcceptedQuests[j].name + "</b><br/>&#8250; " + listAcceptedQuests[j].type + " " + listAcceptedQuests[j].number + " " + listAcceptedQuests[j].details + " (" + listAcceptedQuests[j].progress + "/" + listAcceptedQuests[j].number + ")";
    else document.getElementById('char-curquest' + j).innerHTML = "<b>" + listAcceptedQuests[j].name + "</b><br/>&#8250; return to " + listAcceptedQuests[j].areaend;
  }
  for (j; j < curDisplayedQuests; j++) {
    document.getElementById('char-curquest' + j).innerHTML = "";
    minusQuests++;
  }
  curDisplayedQuests -= minusQuests;
}

/* Display quests in current city */
function displayCityQuest() {
  var elAvQuest = document.getElementById('avcityquest');
  var elQuest;
  elAvQuest.innerHTML = "";

  for (var i = 0; i < listAcceptedQuests.length; i++) {
    if (listAcceptedQuests[i].finished == true && listAcceptedQuests[i].areaend == player.curArea.name) {
      elQuest = document.createElement('span');
      elQuest.id = 'char-avacquest' + i;
      elQuest.className = 'clickable city-available-quest';
      elQuest.setAttribute('iquest', i);
      elQuest.onclick = function () {
        clickFinishedQuest(this.getAttribute('iquest'));
      };
      elQuest.innerHTML = "<b>?</b> " + listAcceptedQuests[i].name + "<br/>";
      elAvQuest.appendChild(elQuest);
    }
  }

  for (i = 0; i < listAvailableQuests.length; i++) {
    elQuest = document.getElementById('char-city-available-quest' + i)
    if (listAvailableQuests[i].available == 1 && listAvailableQuests[i].areabegin == player.curArea.name) {
      elQuest = document.createElement('span');
      elQuest.id = 'char-city-available-quest' + i;
      elQuest.className = 'clickable city-available-quest';
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
  document.getElementById('city-status').style.display = "none";
  document.getElementById('quest-status').style.display = "inline";
  document.getElementById('city-quest-description').innerHTML = listAvailableQuests[i].textbegin;
}

function clickFinishedQuest(i) {
  checkingQuest = i;
  finished = true;
  document.getElementById('city-status').style.display = "none";
  document.getElementById('quest-status').style.display = "inline";
  document.getElementById('city-quest-description').innerHTML = listAcceptedQuests[i].textend;
}

function acceptcheckQuest() {
  if (!finished) acceptQuest(checkingQuest);
  else if (finished) completeQuestI(checkingQuest);
  refusecheckQuest();
}

function refusecheckQuest() {
  checkingQuest = -1;
  document.getElementById('city-status').style.display = "inline";
  document.getElementById('quest-status').style.display = "none";
}

function acceptQuest(i) {
  if (cNbQuests < maxQuests) {
    log("Quest <b>[" + listAvailableQuests[i].name + "]</b> accepted.", "INFO");

    q = removeAvailableQuest(listAvailableQuests[i].name);
    listAcceptedQuests.push(q);
    q.available = 0;
    q.active = 1;
    cNbQuests++;
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

/* Process quests during the game */
function removeAvailableQuest(name) {
  var i;
  for (i = 0; i < listAvailableQuests.length; i++) {
    if (listAvailableQuests[i].name == name) {
      quest = listAvailableQuests[i];
      listAvailableQuests.splice(i, 1);
    }
  }
  return quest;
}

function updateProgress(quest, nb) {
  if (!quest.finished) {
    quest.progress += nb;

    log("<b>[" + quest.name + "]</b>: " + quest.progress + "/" + quest.number + " " + quest.details);

    if (quest.progress >= quest.number) {
      quest.finished = true;
    }
    displayQuests();
  }
}

function completeQuestI(iquest) {
  completeQuest(listAcceptedQuests[iquest]);
}

function completeQuest(quest) {
  var i = 0;
  var j = 0;
  // earn XP and gold rewards
  changecXP(quest.rewardXP);
  changecMoney(quest.rewardMoney);
  log("You completed the quest <b>[" + quest.name + "]</b>. You earned " + quest.rewardXP + "xp.", "INFO");
  // unlock related jobs
  if (quest.unlockedP != "none") {
    for (i = 0; i < nbJobs; i++) {
      if (listJobs[i].name == quest.unlockedP) {
        updatejProgress(listJobs[i], 1);
        log("You unlocked " + quest.unlockedP + "!", "INFO");
      }
    }
  }
  // unlock following quests
  if (quest.unlockedQ.length > 0) {
    // we make related quests available in the general list
    for (i = 0; i < listQuests.length; i++) {
      for (j = 0; j < quest.unlockedQ.length; j++) {
        if (listQuests[i].id == quest.unlockedQ[j]) {
          listQuests[i].available++;
        }
      }
    }
    // we put the quests marked as available in the available list
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
  // remove the quest from the accepted quests
  for (i = 0; i < listAcceptedQuests.length; i++) {
    if (listAcceptedQuests[i].name == quest.name) {
      listAcceptedQuests.splice(i, 1);
      cNbQuests--;
    }
  }
  // update the UI display
  displayQuests();
}
