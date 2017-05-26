classmap = {}
engine = null
keymap = {}

function InitialLoad(){
  var gamenum = latest
  Setup(gamenum)
}

function MakeClassname(gamenum){
  return 'game' + gamenum
}

function Setup(gamenum){
  if (engine != null){
    engine.destruct()
  }
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


function testKeyPress(){
  console.log('asjdklasd')
}

class Engine{
  constructor(gamenum){
    this.keymap = {}
    this.intervalid = null
    this.gameclass = null
    this.gamenum = gamenum
    this.canvas = document.createElement('canvas')
    this.dt = 1/60
    SetCanvas(this.canvas)
    this.ctx = this.canvas.getContext("2d")
    this.LoadGame(gamenum)
    window.addEventListener("keydown", () => this.engineKeyPress(event), false);
  }

  engineKeyPress(evt) {
    var charCode = evt.keyCode || evt.which
    var charStr = String.fromCharCode(charCode)

    console.log(charStr + " pressed")
    
    console.log(this.keymap)
    var action = this.keymap[charStr]
    if (action) {
      console.log("doing action")
      action()
    }
  }

  MapKey(key, event){
    console.log('mapping key ' + key)
    this.keymap[key] = event
  }

  destruct(){
    window.removeEventListener("keydown", this.engineKeyPress, false);
    window.clearInterval(this.intervalid)
  }

  LoadGame(gamenum){
    console.log(gamenum)
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

  SetFont(size, family = "Courier New"){
    var num = size/100 * this.canvas.height
    this.ctx.font = num + "px " + family
  }

  resize(){
    var w = window.innerWidth
    var h = window.innerHeight
    var x = Math.min(w, h)
    this.canvas.width = x
    this.canvas.height = x
    this.Update()
  }

  FinishLoadGame(classname){
    this.gameclass = classmap[classname]
    this.game = new this.gameclass(this.ctx, this.canvas, this.dt)
    document.title = this.game.title
    this.intervalid = window.setInterval(() => this.Update(), 1000/60)
    this.resize()
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

  DrawText(x, y, text, size){
    var pos = this.GetPosition(x, y)
    this.SetFont(size)
    this.ctx.fillText(text, pos.x, pos.y);
  }

  DrawCircle(center, r, color, borderWidth, borderColor){
    this.ctx.beginPath();
    this.ctx.arc(center.x, center.y, r, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.lineWidth = borderWidth;
    this.ctx.strokeStyle = borderColor;
    this.ctx.stroke();
  }
}

intervalid = null
gameclass = null
classmap = {}

class Random{
  static Range(min, max){
    return Math.random() * (max - min) + min
  }

  static IRange(min, max){
    return Math.floor(Random.Range(min, max))
  }

  static Choice(array){
    return array[Random.IRange(0, array.length)]
  }
}

function Cap(num, min, max){
  if (num < min){
    return min
  }
  if (num > max){
    return max
  }
  return num
}

function Back()
{
  var newgamenum = Math.max(1, engine.gamenum - 1)
  Setup(newgamenum)
}

function Forward()
{
  var newgamenum = Math.min(latest, engine.gamenum + 1)
  Setup(newgamenum)
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}