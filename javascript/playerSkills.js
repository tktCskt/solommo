
function f_callTheHound ()
{
  this.name = "Call the hound";
  this.level = 0;
  this.cooldDown = 30 - level;
  this.manaCost = 2 + level;
  this.path = "Hunter";
  this.type = "";
  var self = this;
  this.delay = 1000;
  this.nbTics = 3+level;;
  this.tic = 0;
  var value = 10*(level+1);
  this.effect = function() 
  {
    if(self.tic++ < self.nbTics)
    {
      setTimeout(self.effect, self.delay);
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

callTheHound = new f_callTheHound();