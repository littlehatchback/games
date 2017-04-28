intervalid = null
gameclass = null
classmap = {}
function LoadGame(classname){
  if (classname in classmap){
    FinishLoadGame(classname)
    return
  }

  filename = classname + '.js'

  if ( intervalid ){
    clearInterval(intervalid)
  }
  var oldGame = document.getElementById('gamescript')
  if (oldGame != null){
    oldGame.outerHTML = ""
    delete oldGame
  }

  var head = document.getElementsByTagName("head")[0],
        done = false;

  var newGame = document.createElement('script')
  var dt = 1/60
  var background = "white"
  newGame.type = 'text/javascript'
  newGame.src = 'source/' + filename
  newGame.id = 'gamescript'
  newGame.onload = newGame.onreadystatechange = function(){

    if ( !done && (!this.readyState ||
      this.readyState == "loaded" || this.readyState == "complete") ) {
      done = true;
      FinishLoadGame(classname); // execute callback function

      // Prevent memory leaks in IE
      newGame.onload = newGame.onreadystatechange = null;
      head.removeChild( newGame );
    }
  };

  document.head.appendChild(newGame);
}

function Setup(){
  canvas = document.getElementById("gameCanvas")
  ctx = canvas.getContext("2d")
  dt = 1/60
  background = "white"
  gamenum = latest
  LoadGame('game' + gamenum)
}

function FinishLoadGame(classname){
  gameclass = classmap[classname]
  game = new gameclass(ctx, canvas, dt)
  intervalid = window.setInterval(Update, dt)
}

function Update()
{
  if (game){
  	ctx.clearRect(0, 0, canvas.width, canvas.height)
  	ctx.fillStyle = background
  	ctx.fillRect(0, 0, canvas.width, canvas.height)
  	game.gameloop()
  }
}


function Back()
{
  if (gamenum > 1){
    gamenum -= 1
  }
  LoadGame('game' + gamenum)
}

function Forward()
{
  if (gamenum < latest){
    gamenum += 1
  }
  LoadGame('game' + gamenum)
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}