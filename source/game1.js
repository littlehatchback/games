class Game1 {
  constructor(canvas, ctx, dt){
    this.ctx = ctx
    this.canvas = canvas
    this.dt = dt
    this.author = 'Steve'
    this.title = 'FireFast'

    ctx.font = "30px Arial";
    ctx.fillStyle = "red"
    ctx.textAlign = "center"
    backgroundColor = "gray"

    canvas.addEventListener("mousedown", getPosition, false);

    bestDelayFromFire = 0;
    lastDelayFromFire = 0;

    reset()
  }

  gameloop() {
    this.count += dt
    this.ctx.fillStyle = "red"
    this.ctx.fillText("Your best: " + round(this.bestDelayFromFire, 3), this.canvas.width/2,50);
    this.ctx.fillText("Your Last: " + round(this.lastDelayFromFire, 3), this.canvas.width/2,100);

    if(this.count >= this.countToFireOn) {
      this.delayFromFire += dt
      this.ctx.fillText("FIRE!!!!", this.canvas.width/2, this.canvas.height/2);
      this.shouldFire = true
    }
  }

  reset() {
    this.count = 0;
    this.shouldFire = false;
    this.countToFireOn = getRandomInt(.1, 45)
    this.fired = false
    this.delayFromFire = 0
  }

  fire() {
    this.fired = true
    if(this.shouldFire) {
      this.lastDelayFromFire = this.delayFromFire
      if(this.bestDelayFromFire == 0 || this.delayFromFire < this.bestDelayFromFire) {
        this.bestDelayFromFire = this.delayFromFire
      }
      reset()
    } 
    else {
      reset()
    }
  }


  getPosition(event) {
    this.x = event.x;
    this.y = event.y;

    this.x -= this.canvas.offsetLeft;
    this.y -= this.canvas.offsetTop;

      fire()
  }
}

classmap['game1'] = Game1