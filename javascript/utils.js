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

var curLog = 0;
var maxLog = 40;

function log(txt, canal) {
  curLog++;

  if (canal == "INFO") fontcolor = "#8080ff";
  else if (canal == "ERROR") fontcolor = "#ff0000";
  else if (canal == "GENERAL") fontcolor = "#c08080";
  else if (canal == "COMMERCE") fontcolor = "#c08080";
  else if (canal == "RECRUITMENT") fontcolor = "#c08080";
  else if (canal == "GUILD") fontcolor = "#40ff40";
  else if (canal == "TEAM") fontcolor = "#ff7f00";
  else if (canal == "WHISP") fontcolor = "#ff80ff";

  txt = "<font color='" + fontcolor + "'>" + txt + "</font>";

  var logHistory = document.getElementById('loghistory');
  var newLog = document.createElement('div');
  newLog.innerHTML = txt;
  logHistory.appendChild(newLog);

  while (curLog > maxLog) {
    logHistory.firstChild.remove();
    curLog--;
  }
}

function clearChatLog() {
  var el = document.getElementById('loghistory');
  while (el.firstChild) {
    el.firstChild.remove();
  }
  curLog = 0;
}
