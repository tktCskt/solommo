
function f_callTheHound (level)
{
  var self = this;
  self.name = "Call the hound";
  self.level = level;
  self.cooldDown = 30 - self.level;
  self.manaCost = 2 + self.level;
  self.path = "Hunter";
  self.type = "";
  
  self.delay = 1000;
  self.nbTics = 3 + self.level;;
  self.tic = 0;
  var value = 10*(self.level+1);
  self.effect = function(iteration) 
  { 
    // Before the first effect, check if the character has enough MP and use them
    if(iteration === 0)
    {
      if(player.curMP >= self.manaCost)
      {
        changecMP(-self.manaCost);
      }
      else return;
    }
    if(self.tic++ < self.nbTics)
    {
      setTimeout(self.effect, self.delay, ++iteration);
      for(var i = 0; i < monsters.length; i++) 
      {
        if(monsters[i].exist) 
        {
          changemHP(i,-value);
          break;
        }
      }
    }
    else
    {
      self.tic = 0;
    }
  }
}

callTheHound = new f_callTheHound(0);