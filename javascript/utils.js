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

function clearChatLog() {
  document.getElementById('log5').innerHTML = "";
  document.getElementById('log4').innerHTML = "";
  document.getElementById('log3').innerHTML = "";
  document.getElementById('log2').innerHTML = "";
  document.getElementById('log1').innerHTML = "";
}
