
function LoadGame(filename, callback){
  var oldGame = document.getElementById('gamescript')
  if (oldGame != null){
    oldGame.outerHTML = ""
    delete oldGame
  }

  var head = document.getElementsByTagName("head")[0],
        done = false;

  var newGame = document.createElement('script')
  newGame.type = 'text/javascript'
  newGame.src = 'source/' + filename
  newGame.id = 'gamescript'
  newGame.onload = newGame.onreadystatechange = function(){

    if ( !done && (!this.readyState ||
      this.readyState == "loaded" || this.readyState == "complete") ) {
      done = true;
      FinishLoadGame(); // execute callback function

      // Prevent memory leaks in IE
      newGame.onload = newGame.onreadystatechange = null;
      head.removeChild( newGame );
    }
  };

  document.head.appendChild(newGame);
}

var dt = 1/60
var background = "white"

function Setup(){
  canvas = document.getElementById("gameCanvas")
  ctx = canvas.getContext("2d")
  LoadGame('game1.js')
}

function FinishLoadGame(){
  game = new Game(ctx, canvas, dt)
  window.setInterval(Update, dt)
}

function Update()
{
  if (game){
  	ctx.clearRect(0, 0, canvas.width, canvas.height)
  	ctx.fillRect(0, 0, canvas.width, canvas.height)
  	game.gameloop()
  }
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}