class game1 {
  constructor(ctx, canvas, dt){
    this.ctx = ctx
    this.canvas = canvas
    this.dt = dt
    this.author = 'Steve'
    this.title = 'FireFast'
    this.canvas.addEventListener("mousedown", () => this.fire(), false);

    this.bestDelayFromFire = 0;
    this.lastDelayFromFire = 0;

    this.reset()
  }

  onresize() {
    Engine.SetFont
  }

  gameloop() {
    this.count += engine.dt
    this.ctx.textAlign = "center"
    this.backgroundColor = "gray"
    this.ctx.fillStyle = "red"
    this.ctx.fillText("Your best: " + round(this.bestDelayFromFire, 3), this.canvas.width/2,50);
    this.ctx.fillText("Your Last: " + round(this.lastDelayFromFire, 3), this.canvas.width/2,100);

    if(this.count >= this.countToFireOn) {
      this.delayFromFire += engine.dt
      this.ctx.fillText('FIRE!', this.canvas.width/2, this.canvas.height/2);
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
      this.reset()
    } 
    else {
      this.reset()
    }
  }
}

classmap['game1'] = game1