{
  class Game {
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

    gameloop() {
      this.count += engine.dt
      this.ctx.textAlign = "center"
      this.backgroundColor = "gray"
      this.ctx.fillStyle = "red"
      engine.DrawText(50, 6, "Your best: " + round(this.bestDelayFromFire, 3), 5)
      engine.DrawText(50, 12, "Your last: " + round(this.lastDelayFromFire, 3), 5)

      if(this.count >= this.countToFireOn) {
        this.delayFromFire += engine.dt
        engine.DrawText(50, 50, 'Fire!', 5)
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
  classmap['game1'] = Game
}
