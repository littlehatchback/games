count = 0
shouldFire = false
ctx.font = "30px Arial";
ctx.fillStyle = "red"
ctx.textAlign = "center"

class Game {
  constructor(ctx){
    this.ctx = ctx
    this.author = 'Drew'
    this.title = 'Whatever'
  }
  gameloop()
  {
    count++
    this.ctx.fillText(shouldFire,100,50);
    this.countToFireOn = 500
    if(count >= this.countToFireOn)
    {
      this.ctx.fillText("FIRE!!!!", canvas.width/2, canvas.height/2);
    }
  }
}
