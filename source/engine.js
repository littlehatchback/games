classmap = {}

function InitialLoad(){
  gamenum = latest
  Setup(gamenum)
}

function MakeClassname(gamenum){
  return 'game' + gamenum
}

function Setup(gamenum){
  engine = new Engine(gamenum)
}

function DeleteElement(target_id){
  var old = document.getElementById(target_id)
  if (old != null){
    old.outerHTML = ""
  }
}
function SetCanvas(canvas){
  DeleteElement('gamecanvas')
  canvas.id = 'gamecanvas'
  var div = document.getElementById('canvasdiv')
  div.appendChild(canvas)
}

function resize(){
  engine.resize()
}

class Vec2{
  constructor(x,y){
    this.x = x
    this.y = y
  }
}

class Engine{
  constructor(gamenum){
    this.intervalid = null
    this.gameclass = null
    this.canvas = document.createElement('canvas')
    this.dt = 1/60
    SetCanvas(this.canvas)
    this.ctx = this.canvas.getContext("2d")
    this.LoadGame(gamenum)

  }

  LoadGame(gamenum){
    var classname = MakeClassname(gamenum)
    if (classname in classmap){
      this.FinishLoadGame(classname)
      return
    }

    var filename = classname + '.js'

    if ( this.intervalid ){
      clearInterval(intervalid)
    }
    DeleteElement('gamescript')

    var head = document.getElementsByTagName("head")[0],
          done = false;

    var newGame = document.createElement('script')
    var background = "white"
    newGame.type = 'text/javascript'
    newGame.src = 'source/' + filename
    newGame.id = 'gamescript'
    self = this
    newGame.onload = newGame.onreadystatechange = function(){

      if ( !done && (!this.readyState ||
        this.readyState == "loaded" || this.readyState == "complete") ) {
        done = true;
        self.FinishLoadGame(classname); // execute callback function

        // Prevent memory leaks in IE
        newGame.onload = newGame.onreadystatechange = null;
        head.removeChild( newGame );
      }
    };

    document.head.appendChild(newGame);
  }

  SetFont(size){
    var num = size/100 * this.canvas.height
    this.ctx.font = num + "px Arial"
  }

  resize(){
    var w = window.innerWidth
    var h = window.innerHeight
    var x = Math.min(w, h)
    this.canvas.width = x
    this.canvas.height = x
    this.game.onresize()
    this.Update()
  }

  FinishLoadGame(classname){
    this.gameclass = classmap[classname]
    this.game = new this.gameclass(this.ctx, this.canvas, this.dt)
    document.title = this.game.title
    this.resize()
    this.intervalid = window.setInterval(() => this.Update(), 1000/60)
  }

  Update()
  {
    if (this.game){
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.game.gameloop()
    }
  }

  GetPosition(x, y){
    var rx = (x/100) * this.canvas.width
    var ry = (y/100) * this.canvas.height
    return new Vec2(rx,ry)
  }

  DrawText(x, y, text){
    var pos = this.GetPosition(x, y)
    this.ctx.fillText(text, pos.x, pos.y);
  }
}

intervalid = null
gameclass = null
classmap = {}


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