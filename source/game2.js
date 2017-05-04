{
  class Person {
    constructor(){
      this.energy = 100
      this.energySpeed = 5 //Loss per second.
      this.energyAccel = 0 //Change in speed per second.
      this.timescale = 2
      this.awaketimescale = 1
      this.awake = true
      this.alive = true
      this.timealive = 0
    }

    modEnergy(direction){
      this.energyAccel += Random.Range(-3, 3)
      this.energyAccel = Cap(this.energyAccel, -3, 3)

      this.energySpeed += this.energyAccel * engine.dt * this.timescale
      this.energySpeed = Cap(this.energySpeed, -8, -1)
      this.energy += direction * (this.energySpeed * engine.dt) * this.timescale
    }

    work(){
      this.modEnergy(this.awaketimescale)
    }

    sleep(){
      this.modEnergy(-1)
      if (this.energy >= 99){
        this.wakeup()
      }
    }

    die(){
      this.alive = false
    }

    live(){
      if (this.awake){
        this.work()
      }
      else{
        this.sleep()
      }
    }

    update(){
      if (this.alive){
        this.timealive += engine.dt
        this.live()
        if (this.energy <= 0){
          this.die()
        }

        engine.DrawText(50, 50, "energy")
        engine.DrawText(50, 55, Math.floor(this.energy))

        engine.DrawText(50, 65, "age")
        engine.DrawText(50, 70, Math.floor(this.timealive))
        if (this.awake){
          engine.DrawText(50, 40, 'AWAKE')
        }
        else{
          engine.DrawText(50, 40, 'ASLEEP')
        }
      }

      else{
        engine.DrawText(50, 50, "dead at " + Math.floor(this.timealive))
      }
    }

    wakeup(){
      if (!this.awake){
        this.awake = true
        this.awaketimescale += 0.05 * this.timealive
      }
    }

    gotobed(){
      this.awake = false
    }
  }
  class Game {
    constructor(ctx, canvas, dt){
      this.ctx = ctx
      this.canvas = canvas
      this.dt = dt
      this.author = 'Drew'
      this.title = 'life'
      this.char = new Person()

      engine.MapKey('S', () => this.char.gotobed())
    }

    gameloop() {

      this.ctx.textAlign = "center"
      this.ctx.fontFamily = "Courier New"
      this.ctx.backgroundColor = "black"
      this.ctx.fillStyle = "red"
      engine.DrawText(50, 20, "life", 7)
      engine.DrawText(13.5, 10, "s:sleep", 5)
      this.char.update()
    }
  }
  classmap['game2'] = Game
}